import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { sacredIndia } from "@/data/sacred-india";

export const Route = createFileRoute("/sacred-india")({ component: SacredIndiaPage });

function SacredIndiaPage() {
  const [religion, setReligion] = useState("All");
  const [circuit, setCircuit] = useState("All");
  const filtered = useMemo(() => sacredIndia.filter((site) =>
    (religion === "All" || site.religion === religion) &&
    (circuit === "All" || site.circuits.includes(circuit))
  ), [religion, circuit]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">Home</Link>
      <header className="mt-8 max-w-3xl">
        <p className="eyebrow text-sunrise">Sacred journeys</p>
        <h1 className="mt-3 text-4xl sm:text-6xl">Sacred India</h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/75">Explore India's sacred destinations across faiths, traditions and pilgrimage circuits.</p>
      </header>
      <div className="mt-10 flex flex-wrap gap-3">
        <select value={religion} onChange={(e) => setReligion(e.target.value)} className="rounded-full border border-border bg-card px-4 py-2.5 text-sm">
          {["All", "Hindu", "Buddhist", "Jain", "Sikh"].map((x) => <option key={x}>{x}</option>)}
        </select>
        <select value={circuit} onChange={(e) => setCircuit(e.target.value)} className="rounded-full border border-border bg-card px-4 py-2.5 text-sm">
          {["All", "Char Dham", "Jyotirlinga", "Shakti Peetha", "Buddhist Circuit", "Jain Circuit", "Sikh Circuit", "Pilgrimage"].map((x) => <option key={x}>{x}</option>)}
        </select>
      </div>
      <p className="mt-8 text-sm text-muted-foreground">{filtered.length} destinations</p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((site) => <article key={site.name} className="rounded-sm border border-border bg-card p-6">
          <p className="eyebrow text-sunrise">{site.religion}</p>
          <h2 className="mt-2 font-display text-2xl">{site.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{site.city}, {site.state}</p>
          <p className="mt-4 text-sm leading-relaxed text-foreground/75">{site.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">{site.circuits.map((x) => <span key={x} className="rounded-full bg-secondary px-3 py-1 text-xs">{x}</span>)}</div>
        </article>)}
      </div>
    </div>
  );
}
