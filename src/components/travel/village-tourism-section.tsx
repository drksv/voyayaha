import { useEffect, useState } from "react";
import { fetchVillageExperiences } from "@/lib/travel-api";

export function VillageTourismSection({ initialQuery = "" }: { initialQuery?: string }) {
  const [location, setLocation] = useState(initialQuery);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function search(value = location) {
    const query = value.trim();
    if (!query) return;
    setLoading(true); setError("");
    try {
      const result = await fetchVillageExperiences(query);
      const experiences = Array.isArray(result) ? result : result?.experiences || [];
      setItems(experiences.filter((x: any) => x?.name).sort((a: any, b: any) => (a.distance_m ?? Infinity) - (b.distance_m ?? Infinity)).slice(0, 10));
    } catch (e) {
      console.error(e);
      setItems([]);
      setError(e instanceof Error ? e.message : "Village experiences are unavailable right now. Please try again later.");
    } finally { setLoading(false); }
  }

  useEffect(() => { if (initialQuery.trim()) void search(initialQuery); }, [initialQuery]);

  return <section id="village-tourism" className="mt-14 border-t border-border pt-12">
    <div className="rounded-sm border border-border bg-card p-6 sm:p-8">
      <p className="eyebrow text-sunrise">Village Tourism</p>
      <h2 className="mt-2 text-3xl sm:text-4xl">Find village experiences</h2>
      <p className="mt-3 max-w-2xl text-foreground/70">Discover authentic rural experiences near a village, town or city using Voyayaha's live place service.</p>
      <div className="mt-6 flex max-w-2xl gap-3">
        <input value={location} onChange={e => setLocation(e.target.value)} onKeyDown={e => e.key === "Enter" && void search()} placeholder="Enter village or town" className="min-w-0 flex-1 rounded-full border border-border bg-background px-5 py-3 outline-none focus:ring-2 focus:ring-ring" />
        <button onClick={() => void search()} disabled={loading} className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{loading ? "Searching…" : "Search"}</button>
      </div>
      {error && <p className="mt-5 rounded-sm border border-border p-4 text-sm">{error}</p>}
      {!loading && location && !items.length && !error && <p className="mt-5 text-sm text-muted-foreground">No village experiences found. Try a nearby town or city.</p>}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const lat = Number(item.lat), lon = Number(item.lon);
          const viewUrl = Number.isFinite(lat) && Number.isFinite(lon) ? `https://www.google.com/maps/search/?api=1&query=${lat},${lon}` : undefined;
          const distance = Number(item.distance_m);
          return <article key={item.id || `${item.name}-${i}`} className="rounded-sm border border-border bg-background p-5">
            <h3 className="font-display text-2xl">{item.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.address || "Nearby attraction"}</p>
            {Number.isFinite(distance) && <p className="mt-2 text-xs font-semibold text-primary">{(distance / 1000).toFixed(1)} km away</p>}
            {viewUrl && <a href={viewUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">View on map →</a>}
          </article>;
        })}
      </div>
    </div>
  </section>;
}
