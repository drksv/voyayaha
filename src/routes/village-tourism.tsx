import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { fetchVillageExperiences } from "@/lib/travel-api";

export const Route = createFileRoute("/village-tourism")({ component: VillageTourismPage });

function VillageTourismPage() {
  const [location, setLocation] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function search() {
    if (!location.trim()) return;
    setLoading(true); setError("");
    try {
      const result = await fetchVillageExperiences(location);
      setItems(Array.isArray(result) ? result : result.experiences || []);
    } catch (e) {
      console.error(e);
      setError("Village experiences are unavailable right now. Please try again later.");
    } finally { setLoading(false); }
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">Home</Link>
      <header className="mt-8 max-w-3xl">
        <p className="eyebrow text-sunrise">Village & local</p>
        <h1 className="mt-3 text-4xl sm:text-6xl">Village Tourism</h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/75">
          Discover authentic village experiences, local hosts, crafts, kitchens and rural destinations.
        </p>
      </header>
      <div className="mt-10 flex max-w-2xl gap-3">
        <input value={location} onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()} placeholder="Enter a city or destination"
          className="min-w-0 flex-1 rounded-full border border-border bg-card px-5 py-3 outline-none focus:ring-2 focus:ring-ring" />
        <button onClick={search} className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          {loading ? "Searching…" : "Explore"}
        </button>
      </div>
      {error && <p className="mt-6 rounded-sm border border-border p-4 text-sm">{error}</p>}
      {!items.length && !loading && (
        <div className="mt-10 rounded-sm border border-border bg-secondary/40 p-8">
          <h2 className="font-display text-2xl">Start with a destination</h2>
          <p className="mt-2 text-sm text-muted-foreground">Search for a city or region to discover village and local experiences.</p>
        </div>
      )}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <article key={item.id || item.name || item.title || i} className="overflow-hidden rounded-sm border border-border bg-card">
            {item.image && <img src={item.image} alt={item.name || item.title || "Village experience"} className="h-48 w-full object-cover" loading="lazy" />}
            <div className="p-5">
              <h2 className="font-display text-2xl">{item.name || item.title || item.village || "Village experience"}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{item.location || item.village || ""}</p>
              {item.description && <p className="mt-3 text-sm leading-relaxed text-foreground/75">{item.description}</p>}
              {item.google_maps_url && <a className="mt-4 inline-block text-sm font-semibold text-primary hover:underline" href={item.google_maps_url} target="_blank" rel="noreferrer">View on map →</a>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
