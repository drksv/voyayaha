import { useEffect, useMemo, useState } from "react";
import { sacredIndia, sacredReligions, sacredCircuits } from "@/data/sacred-india";

export function SacredIndiaSection({ initialQuery = "" }: { initialQuery?: string }) {
  const [religion, setReligion] = useState("All");
  const [circuit, setCircuit] = useState("All");
  const [query, setQuery] = useState(initialQuery);
  useEffect(() => { setQuery(initialQuery); }, [initialQuery]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sacredIndia.filter(site => (religion === "All" || site.religion === religion) && (circuit === "All" || site.circuits.includes(circuit)) && (!q || `${site.name} ${site.city} ${site.state} ${site.religion} ${site.circuits.join(" ")}`.toLowerCase().includes(q)));
  }, [religion, circuit, query]);

  return <section id="sacred-india" className="mt-14 border-t border-border pt-12">
    <div className="rounded-sm border border-border bg-card p-6 sm:p-8">
      <p className="eyebrow text-sunrise">Sacred India</p><h2 className="mt-2 text-3xl sm:text-4xl">Places of devotion across faiths</h2>
      <p className="mt-3 max-w-3xl text-foreground/70">Explore a broad collection of Indian pilgrimage destinations and established sacred circuits. A site can belong to more than one circuit.</p>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search pilgrimage sites" className="rounded-full border border-border bg-background px-5 py-3 outline-none focus:ring-2 focus:ring-ring" />
        <select value={religion} onChange={e => setReligion(e.target.value)} className="rounded-full border border-border bg-background px-4 py-3">{sacredReligions.map(x => <option key={x}>{x}</option>)}</select>
        <select value={circuit} onChange={e => setCircuit(e.target.value)} className="rounded-full border border-border bg-background px-4 py-3">{sacredCircuits.map(x => <option key={x}>{x}</option>)}</select>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">{filtered.length} destinations</p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(site => <article key={`${site.name}-${site.city}`} className="rounded-sm border border-border bg-background p-5"><p className="eyebrow text-sunrise">{site.religion}</p><h3 className="mt-2 font-display text-2xl">{site.name}</h3><p className="mt-1 text-sm text-muted-foreground">{site.city}, {site.state}</p><p className="mt-3 text-sm leading-relaxed text-foreground/70">{site.description}</p><div className="mt-4 flex flex-wrap gap-2">{site.circuits.map(x => <span key={x} className="rounded-full bg-secondary px-3 py-1 text-xs">{x}</span>)}</div></article>)}</div>
    </div>
  </section>;
}
