import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { fetchSocialDiscovery, type SocialDiscoveryResult } from "@/lib/travel-api";

const GENERIC_NON_PLACE_NAMES = new Set([
  "what", "why", "where", "when", "which", "who", "how", "please", "welcome",
  "dont", "don't", "doesnt", "doesn't", "cant", "can't", "wont", "won't",
  "isnt", "isn't", "wasnt", "wasn't", "shouldnt", "shouldn't", "couldnt", "couldn't",
  "help", "thanks", "thank", "hello", "hi", "hey", "anyone", "someone",
  "people", "person", "guys", "everyone", "recommend", "recommendations",
  "suggestion", "suggestions", "advice", "question", "questions", "guide",
  "travel", "travelling", "traveling", "trip", "trips", "weekend", "places",
  "place", "destination", "destinations", "things", "thing", "visit", "visiting",
  "tour", "tourism", "tourist", "tourists", "india", "maharashtra", "mumbai",
  "pune", "thane", "youtube", "reddit", "video", "videos", "shorts",
  "best", "top", "hidden", "secret", "peaceful", "quiet", "beautiful",
  "amazing", "awesome", "good", "great", "near", "around", "from", "with",
  "without", "the", "this", "that", "these", "those", "here", "there",
  "check", "click", "subscribe", "follow", "like", "share", "watch", "video",
  "new", "old", "home", "one", "two", "three", "first", "second", "third"
]);

function isRealPlaceName(name: string, city: string) {
  const normalized = name.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  if (!normalized || normalized === city.toLowerCase().trim()) return false;
  const words = normalized.split(" ");
  if (words.length === 1 && GENERIC_NON_PLACE_NAMES.has(words[0])) return false;
  if (words.every((word) => GENERIC_NON_PLACE_NAMES.has(word))) return false;
  if (/^(what|why|where|when|which|who|how|please|help)\b/.test(normalized)) return false;
  return true;
}

function parseLocation(query: string) {
  const cleaned = query.trim().replace(/[?.!,]+$/, "");
  const match = cleaned.match(/\b(?:in|near|around|from)\s+(.+)$/i);
  if (match?.[1]) return match[1].trim();

  // Also support the simple search shown in the UI: entering only "Pune" or
  // "Mumbai" means that the whole input is the main city.
  const words = cleaned.split(/\s+/).filter(Boolean);
  const generic = new Set(["hidden", "places", "peaceful", "quiet", "offbeat", "travel", "village", "villages", "best"]);
  if (words.length <= 3 && words.length > 0 && !words.every((word) => generic.has(word.toLowerCase()))) {
    return cleaned;
  }
  return "";
}

export function HiddenPlacesExplorer({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SocialDiscoveryResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function search(value = query) {
    const q = value.trim();
    if (!q) {
      setResults([]);
      setError("Enter a city or a request such as “peaceful places in Mumbai”.");
      return;
    }

    const location = parseLocation(q);
    if (!location) {
      setResults([]);
      setError("Please include a city, for example “peaceful places in Mumbai” or simply “Pune”.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await fetchSocialDiscovery(location, q, 100, 3);
      // Defense in depth: never render an LLM/parser false positive as a place.
      // The backend applies the same rule, but the UI also protects the user
      // if an older Render deployment is accidentally still serving responses.
      const backendIsCurrent = response?.discovery_version === "3.2-global-place-gated-db";
      const verifiedResults = backendIsCurrent && Array.isArray(response?.results)
        ? response.results.filter((item) => {
            // Do not trust an old/incorrect backend response merely because it
            // contains a name. Every card must be explicitly geocoder-verified,
            // backed by at least one Reddit/YouTube source, and inside 100 km.
            const distanceOk = Number.isFinite(Number(item?.distance_km)) && Number(item.distance_km) <= 100;
            const hasEvidence = Array.isArray(item?.sources) && item.sources.length > 0;
            const isDatabasePlace = item?.source_type === "voyayaha_database";
            return item?.geocoder_verified === true && distanceOk && (hasEvidence || isDatabasePlace) && isRealPlaceName(item?.name || "", location);
          })
        : [];
      const topThree = verifiedResults.slice(0, 3);
      setResults(topThree);
      if (!backendIsCurrent) {
        setError("The Hidden Places backend is still running an older version. Deploy the revised global backend ZIP first, then redeploy the frontend.");
      } else if (topThree.length === 0) {
        setError(
          response?.message ||
          `Voyayaha could not verify social recommendations within 100 km of ${location}. Try a broader request such as “hidden places near ${location}”.`
        );
      } else if (topThree.length < 3) {
        setError(
          response?.message ||
          `Voyayaha verified ${topThree.length} social recommendation${topThree.length === 1 ? "" : "s"} within 100 km of ${location}.`
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Social discovery is temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (initialQuery.trim()) void search(initialQuery);
  }, [initialQuery]);

  return (
    <section className="mt-14 border-t border-border pt-12" aria-label="AI Hidden Places discovery">
      <div className="rounded-sm border border-border bg-card p-6 sm:p-8">
        <p className="eyebrow text-sunrise">Hidden Places</p>
        <h2 className="mt-2 text-3xl sm:text-4xl">Find places beyond the usual list</h2>
        <p className="mt-3 max-w-3xl text-foreground/70">
          Voyayaha first researches Reddit and YouTube to identify places travellers are actually discussing. If fewer than three strong discoveries are verified, Voyayaha fills the remaining slots from its own curated place database.
        </p>

        <form
          className="mt-6 flex max-w-3xl gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            void search();
          }}
        >
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. peaceful places in Mumbai"
            aria-label="Search hidden places"
            className="min-w-0 flex-1 rounded-full border border-border bg-background px-5 py-3 outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {loading ? "Researching…" : "Explore"}
          </button>
        </form>

        {error && <p className="mt-5 rounded-sm border border-border p-4 text-sm">{error}</p>}

        {results.length > 0 && (
          <div className="mt-10">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow text-sunrise">AI verified social discovery</p>
                <h3 className="mt-2 font-display text-2xl">Top 3 within 100 km</h3>
                <p className="mt-2 text-sm text-foreground/70">
                  Ranked from traveller evidence, recent social interest, relevance and verified distance. Reddit and YouTube are supporting evidence — the places are the recommendations.
                </p>
              </div>
              <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">Traveller discovery → Voyayaha database</span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {results.map((item) => (
                <article key={`${item.rank}-${item.name}`} className="rounded-sm border border-border bg-background p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="eyebrow text-sunrise">#{item.rank} · {item.distance_km} km</p>
                    <span className="text-xs text-muted-foreground">{item.source_type === "voyayaha_database" ? "Voyayaha database" : `score ${item.score}`}</span>
                  </div>
                  <h4 className="mt-2 font-display text-xl">{item.name}</h4>
                  {item.summary && <p className="mt-3 text-sm leading-relaxed text-foreground/80">{item.summary}</p>}
                  {item.why_selected && (
                    <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                      <strong>Why Voyayaha picked it:</strong> {item.why_selected}
                    </p>
                  )}
                  {item.traveller_signals && item.traveller_signals.length > 0 && (
                    <ul className="mt-4 space-y-1 text-xs text-muted-foreground">
                      {item.traveller_signals.slice(0, 3).map((signal, i) => <li key={i}>• {signal}</li>)}
                    </ul>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full border border-border px-2 py-1">Reddit {item.reddit.length}</span>
                    <span className="rounded-full border border-border px-2 py-1">YouTube {item.youtube.length}</span>
                    {item.best_for && <span className="rounded-full border border-border px-2 py-1">Best for: {item.best_for}</span>}
                  </div>
                  {item.caveat && <p className="mt-3 text-xs leading-relaxed text-muted-foreground"><strong>Note:</strong> {item.caveat}</p>}

                  {item.sources.length > 0 && (
                    <details className="mt-4 text-sm">
                      <summary className="cursor-pointer font-semibold">{item.source_type === "voyayaha_database" ? "See Voyayaha record" : "See supporting evidence"}</summary>
                      <div className="mt-3 space-y-2">
                        {item.sources.slice(0, 6).map((source, i) => (
                          <a key={`${source.source}-${i}`} href={source.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-xs leading-relaxed underline">
                            <ExternalLink className="mt-0.5 size-3 shrink-0" />
                            <span>{source.source === "youtube" ? "YouTube" : source.source === "reddit" ? "Reddit" : "Voyayaha"}: {source.title}</span>
                          </a>
                        ))}
                      </div>
                    </details>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
