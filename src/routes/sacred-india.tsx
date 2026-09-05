import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { sacredIndia, sacredCircuits, sacredReligions } from "@/data/sacred-india";

type SacredSearch = { q?: string };

export const Route = createFileRoute("/sacred-india")({
  validateSearch: (search: Record<string, unknown>): SacredSearch => {
    const q = search["q"];
    return typeof q === "string" && q ? { q } : {};
  },
  component: SacredIndiaPage,
});

function SacredIndiaPage() {
  const { q } = Route.useSearch();
  const [religion, setReligion] = useState("All");
  const [circuit, setCircuit] = useState("All");
  const [query, setQuery] = useState(q ?? "");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return sacredIndia.filter((site) =>
      (religion === "All" || site.religion === religion) &&
      (circuit === "All" || site.circuits.includes(circuit)) &&
      (!needle ||
        [site.name, site.city, site.state, site.religion, ...site.circuits]
          .join(" ")
          .toLowerCase()
          .includes(needle)),
    );
  }, [religion, circuit, query]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">Home</Link>
      <header className="mt-8 max-w-4xl">
        <p className="eyebrow text-sunrise">Sacred journeys</p>
        <h1 className="mt-3 text-4xl sm:text-6xl">Sacred India</h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/75">
          Explore a broad, multi-faith catalogue of India's major pilgrimage destinations,
          sacred places and recognised spiritual collections.
        </p>
      </header>

      <div className="mt-10 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <input value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a pilgrimage site, city or state"
          className="rounded-full border border-border bg-card px-5 py-3 outline-none focus:ring-2 focus:ring-ring" />
        <select value={religion} onChange={(e) => setReligion(e.target.value)}
          className="rounded-full border border-border bg-card px-4 py-2.5 text-sm">
          <option>All</option>{sacredReligions.map((x) => <option key={x}>{x}</option>)}
        </select>
        <select value={circuit} onChange={(e) => setCircuit(e.target.value)}
          className="rounded-full border border-border bg-card px-4 py-2.5 text-sm">
          {sacredCircuits.map((x) => <option key={x}>{x}</option>)}
        </select>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Showing {filtered.length} of {sacredIndia.length} sacred destinations
      </p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((site) => (
          <article key={`${site.name}-${site.city}`} className="rounded-sm border border-border bg-card p-6">
            <p className="eyebrow text-sunrise">{site.religion}</p>
            <h2 className="mt-2 font-display text-2xl">{site.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{site.city}, {site.state}</p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/75">{site.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {site.circuits.map((x) => <span key={x} className="rounded-full bg-secondary px-3 py-1 text-xs">{x}</span>)}
            </div>
          </article>
        ))}
      </div>

      {!filtered.length && (
        <div className="mt-8 rounded-sm border border-dashed border-border p-8">
          No sacred destination matches those filters. Try another city, site or circuit.
        </div>
      )}
    </div>
  );
}
