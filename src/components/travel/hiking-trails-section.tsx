import { useEffect, useMemo, useState } from "react";
import trails from "@/data/hiking-trails.json";
import { HikingTrailsMap } from "@/components/travel/hiking-trails-map";

type Trail = (typeof trails)[number];

export function HikingTrailsSection({ initialQuery = "" }: { initialQuery?: string }) {
  const [city, setCity] = useState(initialQuery);
  const [difficulty, setDifficulty] = useState("All");
  const [surface, setSurface] = useState("All");
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const cities = useMemo(() => Array.from(new Set(trails.map(t => t.city).filter(Boolean))).sort(), []);
  const surfaces = useMemo(() => Array.from(new Set(trails.map(t => t.surface).filter(s => s && s !== "unknown"))).sort(), []);
  const filtered = useMemo(() => trails.filter(t => (!city || t.city.toLowerCase().includes(city.toLowerCase()) || t.name.toLowerCase().includes(city.toLowerCase())) && (difficulty === "All" || t.difficulty === difficulty) && (surface === "All" || t.surface === surface)), [city, difficulty, surface]);
  const selected = filtered.find(t => t.id === selectedId) ?? filtered[0];

  useEffect(() => { if (filtered.length && !filtered.some(t => t.id === selectedId)) setSelectedId(filtered[0]?.id); }, [filtered, selectedId]);

  return <section id="hiking-trails" className="mt-14 border-t border-border pt-12">
    <div className="rounded-sm border border-border bg-card p-6 sm:p-8">
      <p className="eyebrow text-sunrise">Hiking Trails</p>
      <h2 className="mt-2 text-3xl sm:text-4xl">Walk farther</h2>
      <p className="mt-3 text-foreground/70">Explore {trails.length} mapped trails from the supplied trail dataset.</p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <input value={city} onChange={e => setCity(e.target.value)} list="embedded-trail-cities" placeholder="Search destination or trail" className="rounded-full border border-border bg-background px-5 py-3 outline-none focus:ring-2 focus:ring-ring" />
        <datalist id="embedded-trail-cities">{cities.map(c => <option key={c} value={c} />)}</datalist>
        <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="rounded-full border border-border bg-background px-5 py-3"><option>All</option><option>Easy</option><option>Moderate</option><option>Hard</option></select>
        <select value={surface} onChange={e => setSurface(e.target.value)} className="rounded-full border border-border bg-background px-5 py-3"><option>All</option>{surfaces.map(s => <option key={s}>{s}</option>)}</select>
        <div className="rounded-full border border-border bg-secondary px-5 py-3 text-sm">{filtered.length} trails found</div>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
        <div className="min-w-0 rounded-sm border border-border bg-secondary"><HikingTrailsMap trail={selected} /></div>
        <aside className="rounded-sm border border-border bg-background p-6">{selected ? <TrailDetails trail={selected} /> : <p className="text-sm text-muted-foreground">No trails match your filters.</p>}</aside>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.slice(0, 60).map(t => <button key={t.id} onClick={() => setSelectedId(t.id)} className={`text-left rounded-sm border p-5 transition ${selected?.id === t.id ? "border-foreground bg-secondary" : "border-border bg-background hover:bg-secondary"}`}><h3 className="font-display text-2xl">{t.name}</h3><p className="mt-1 text-sm text-muted-foreground">{t.city}</p><div className="mt-4 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-secondary px-3 py-1">{t.difficulty}</span><span className="rounded-full bg-secondary px-3 py-1">{t.length_km} km</span></div></button>)}</div>
    </div>
  </section>;
}
function TrailDetails({ trail }: { trail: Trail }) { return <><p className="eyebrow text-sunrise">Trail details</p><h3 className="mt-2 font-display text-3xl">{trail.name}</h3><p className="mt-1 text-sm text-muted-foreground">{trail.city}{trail.distance_from_city_km != null ? ` · ${trail.distance_from_city_km} km from city` : ""}</p><dl className="mt-6 grid grid-cols-2 gap-4 text-sm"><div><dt className="text-muted-foreground">Distance</dt><dd className="mt-1 font-medium">{trail.length_km} km</dd></div><div><dt className="text-muted-foreground">Difficulty</dt><dd className="mt-1 font-medium">{trail.difficulty || "Not listed"}</dd></div><div><dt className="text-muted-foreground">Terrain</dt><dd className="mt-1 font-medium">{trail.surface || "Not listed"}</dd></div><div><dt className="text-muted-foreground">Trail grade</dt><dd className="mt-1 font-medium">{trail.sac_scale || "Not listed"}</dd></div></dl></>; }
