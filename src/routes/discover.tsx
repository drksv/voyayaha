import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, MapPin, Mountain, Landmark, Info } from "lucide-react";

import { searchLocalVoyayaha, searchLiveVoyayaha, type SearchResult } from "@/lib/voyayaha-search";
import { categories, searchExamples } from "@/lib/destinations";

type DiscoverSearch = { q?: string };

export const Route = createFileRoute("/discover")({
  validateSearch: (search: Record<string, unknown>): DiscoverSearch => {
    const q = search["q"];
    return typeof q === "string" && q ? { q } : {};
  },
  head: () => ({
    meta: [
      { title: "Discover Meaningful Places to Travel | Voyayaha" },
      {
        name: "description",
        content:
          "Search real Voyayaha destinations, village experiences, hiking trails, sacred places and live travel intelligence.",
      },
    ],
  }),
  component: DiscoverPage,
});

const kindIcon = {
  destination: Landmark,
  village: MapPin,
  hiking: Mountain,
  sacred: Landmark,
  intel: Info,
};

function DiscoverPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [query, setQuery] = useState(q ?? "");
  const [live, setLive] = useState<{ village: any[]; intel: any; errors: string[] } | null>(null);
  const [loadingLive, setLoadingLive] = useState(false);
  const localResults = searchLocalVoyayaha(query);

  useEffect(() => {
    setQuery(q ?? "");
  }, [q]);

  useEffect(() => {
    if (!q?.trim()) {
      setLive(null);
      return;
    }
    let active = true;
    setLoadingLive(true);
    searchLiveVoyayaha(q)
      .then((result) => active && setLive(result))
      .finally(() => active && setLoadingLive(false));
    return () => {
      active = false;
    };
  }, [q]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = query.trim();
    navigate({ to: "/discover", search: value ? { q: value } : {} });
  }

  const village = (live?.village ?? [])
    .filter((x) => x?.name)
    .sort((a, b) => (a.distance_m ?? Infinity) - (b.distance_m ?? Infinity))
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span><span className="text-foreground">Discover</span>
      </nav>

      <header className="mt-8 max-w-4xl">
        <p className="eyebrow text-sunrise">Discover</p>
        <h1 className="mt-3 text-4xl leading-tight text-foreground sm:text-6xl">
          Where do you want to discover?
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/75">
          Search Voyayaha's real destination data, live Village Tourism and Travel Intel services,
          hiking trails and Sacred India.
        </p>
      </header>

      <form onSubmit={submit} className="mt-8 max-w-3xl">
        <div className="flex items-center gap-3 border-b border-foreground/30 pb-3">
          <Search className="size-5 text-muted-foreground" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try Jaipur, Tawang, Kedarnath or Pune"
            className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground"
            aria-label="Search Voyayaha"
          />
          <button type="submit" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
            Search
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {searchExamples.map((ex) => (
            <button key={ex} type="button" onClick={() => setQuery(ex)}
              className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">
              {ex}
            </button>
          ))}
        </div>
      </form>

      {!query.trim() && (
        <section className="mt-14">
          <h2 className="eyebrow text-muted-foreground">Explore by meaning</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((c) => (
              <Link key={c.slug} to={`/${c.slug}`}
                className="rounded-sm border border-border bg-card p-5 hover:border-foreground/30">
                <p className="font-display text-xl text-foreground">{c.short}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {query.trim() && (
        <section className="mt-14">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl sm:text-3xl">Results for “{q}”</h2>
            {loadingLive && <span className="text-sm text-muted-foreground">Checking live services…</span>}
          </div>

          {localResults.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {localResults.map((result: SearchResult) => {
                const Icon = kindIcon[result.kind];
                return (
                  <Link key={result.id} to={result.href as any}
                    className="rounded-sm border border-border bg-card p-5 hover:border-foreground/30">
                    <div className="flex items-center gap-2 text-xs text-sunrise">
                      <Icon className="size-4" />{result.kindLabel}
                    </div>
                    <h3 className="mt-3 font-display text-2xl">{result.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{result.subtitle}</p>
                    {result.description && <p className="mt-3 text-sm leading-relaxed text-foreground/70">{result.description}</p>}
                  </Link>
                );
              })}
            </div>
          )}

          {village.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl">Village & Local</h2>
                <Link to="/village-tourism" className="text-sm font-semibold text-primary">Open Village Tourism →</Link>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {village.map((item, i) => (
                  <article key={item.id || item.name || i} className="rounded-sm border border-border bg-card p-5">
                    <p className="eyebrow text-sunrise">Village Tourism</p>
                    <h3 className="mt-2 font-display text-2xl">{item.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.address || "Nearby attraction"}</p>
                    {item.distance_m != null && <p className="mt-2 text-xs text-muted-foreground">{(item.distance_m / 1000).toFixed(1)} km away</p>}
                  </article>
                ))}
              </div>
            </div>
          )}

          {live?.intel && (
            <div className="mt-12 rounded-sm border border-border bg-card p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow text-sunrise">Travel Intel</p>
                  <h2 className="mt-2 font-display text-3xl">Travel Intel for {live.intel.city ?? q}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Live destination information is available for this city.
                  </p>
                </div>
                <Link to={`/travel-intel?q=${encodeURIComponent(q ?? "")}` as any}
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                  Open Travel Intel
                </Link>
              </div>
            </div>
          )}

          {localResults.length === 0 && village.length === 0 && !live?.intel && !loadingLive && (
            <div className="mt-8 rounded-sm border border-dashed border-border p-8">
              <p className="text-foreground/75">No matching Voyayaha place was found.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a city, trail, pilgrimage site or destination name.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
