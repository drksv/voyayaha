import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import trails from "@/data/hiking-trails.json";
import { HikingTrailsMap } from "@/components/travel/hiking-trails-map";

export const Route = createFileRoute("/hiking-trails")({ component: HikingTrailsPage });
type Trail = (typeof trails)[number];

function HikingTrailsPage() {
  const [city, setCity] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [surface, setSurface] = useState("All");
  const [selectedId, setSelectedId] = useState(trails[0]?.id ?? 1);
  const cities = useMemo(() => Array.from(new Set(trails.map(t => t.city).filter(Boolean))).sort(), []);
  const surfaces = useMemo(() => Array.from(new Set(trails.map(t => t.surface).filter(s => s && s !== "unknown"))).sort(), []);
  const filtered = useMemo(() => trails.filter(t => (!city || t.city.toLowerCase().includes(city.toLowerCase())) && (difficulty === "All" || t.difficulty === difficulty) && (surface === "All" || t.surface === surface)), [city, difficulty, surface]);
  const selected = filtered.find(t => t.id === selectedId) ?? filtered[0];

  return <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
    <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">Home</Link>
    <header className="mt-8 max-w-4xl"><p className="eyebrow text-sunrise">Walk farther</p><h1 className="mt-3 text-4xl sm:text-6xl">Hiking Trails</h1><p className="mt-5 text-lg leading-relaxed text-foreground/75">Explore {trails.length} mapped trails from your supplied trail dataset. Search by destination, difficulty and surface, then open the route on the map.</p></header>
    <div className="mt-10 grid gap-3 md:grid-cols-4">
      <input value={city} onChange={e => setCity(e.target.value)} list="trail-cities" placeholder="Search destination" className="rounded-full border border-border bg-card px-5 py-3 outline-none focus:ring-2 focus:ring-ring" />
      <datalist id="trail-cities">{cities.map(c => <option key={c} value={c} />)}</datalist>
      <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="rounded-full border border-border bg-card px-5 py-3"><option>All</option><option>Easy</option><option>Moderate</option><option>Hard</option></select>
      <select value={surface} onChange={e => setSurface(e.target.value)} className="rounded-full border border-border bg-card px-5 py-3"><option>All</option>{surfaces.map(s => <option key={s}>{s}</option>)}</select>
      <div className="rounded-full border border-border bg-secondary px-5 py-3 text-sm">{filtered.length} trails found</div>
    </div>
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
      <div className="overflow-hidden rounded-sm border border-border bg-secondary"><HikingTrailsMap trail={selected} /></div>
      <aside className="rounded-sm border border-border bg-card p-6">{selected ? <TrailDetails trail={selected} /> : <p className="text-sm text-muted-foreground">No trails match your filters.</p>}</aside>
    </div>
    <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.slice(0, 60).map(t => <button key={t.id} onClick={() => setSelectedId(t.id)} className={`text-left rounded-sm border p-5 transition ${selected?.id === t.id ? "border-foreground bg-secondary" : "border-border bg-card hover:bg-secondary"}`}><h2 className="font-display text-2xl">{t.name}</h2><p className="mt-1 text-sm text-muted-foreground">{t.city}</p><div className="mt-4 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-secondary px-3 py-1">{t.difficulty}</span><span className="rounded-full bg-secondary px-3 py-1">{t.length_km} km</span>{t.surface && t.surface !== "unknown" && <span className="rounded-full bg-secondary px-3 py-1">{t.surface}</span>}</div></button>)}
    </section>
  </div>;
}
function TrailDetails({ trail }: { trail: Trail }) { return <><p className="eyebrow text-sunrise">Trail details</p><h2 className="mt-2 font-display text-3xl">{trail.name}</h2><p className="mt-1 text-sm text-muted-foreground">{trail.city}{trail.distance_from_city_km != null ? ` · ${trail.distance_from_city_km} km from city` : ""}</p><dl className="mt-6 grid grid-cols-2 gap-4 text-sm"><div><dt className="text-muted-foreground">Distance</dt><dd className="mt-1 font-medium">{trail.length_km} km</dd></div><div><dt className="text-muted-foreground">Difficulty</dt><dd className="mt-1 font-medium">{trail.difficulty || "Not listed"}</dd></div><div><dt className="text-muted-foreground">Terrain</dt><dd className="mt-1 font-medium">{trail.surface || "Not listed"}</dd></div><div><dt className="text-muted-foreground">Trail grade</dt><dd className="mt-1 font-medium">{trail.sac_scale || "Not listed"}</dd></div></dl><p className="mt-6 text-xs leading-relaxed text-muted-foreground">The route geometry and metadata are from the supplied dataset. Verify current trail conditions, access restrictions and safety information locally before hiking.</p></>; }
