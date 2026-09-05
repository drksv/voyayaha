import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { fetchTravelIntel } from "@/lib/travel-api";

export const Route = createFileRoute("/travel-intel")({ component: TravelIntelPage });

function TravelIntelPage() {
  const [city, setCity] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function check() {
    if (!city.trim()) return;
    setLoading(true); setError("");
    try { setData(await fetchTravelIntel(city)); }
    catch (e) { console.error(e); setError("Travel Intel is unavailable right now."); }
    finally { setLoading(false); }
  }

  const cards = [
    ["Weather", data?.forecast ? "Forecast available" : "Forecast unavailable"],
    ["Air Quality", data?.air_quality ? JSON.stringify(data.air_quality) : "Information unavailable"],
    ["Traffic", data?.traffic ? JSON.stringify(data.traffic) : "Information unavailable"],
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">Home</Link>
      <header className="mt-8 max-w-3xl">
        <p className="eyebrow text-sunrise">Know before you go</p>
        <h1 className="mt-3 text-4xl sm:text-6xl">Travel Intel</h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/75">Check destination conditions before you travel — weather, air quality and traffic.</p>
      </header>
      <div className="mt-10 flex max-w-2xl gap-3">
        <input value={city} onChange={(e) => setCity(e.target.value)} onKeyDown={(e) => e.key === "Enter" && check()}
          placeholder="Enter a city" className="min-w-0 flex-1 rounded-full border border-border bg-card px-5 py-3 outline-none focus:ring-2 focus:ring-ring" />
        <button onClick={check} className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">{loading ? "Loading…" : "Check"}</button>
      </div>
      {error && <p className="mt-6 rounded-sm border border-border p-4 text-sm">{error}</p>}
      {data && <div className="mt-10 grid gap-5 md:grid-cols-3">{cards.map(([title, value]) =>
        <article key={title} className="rounded-sm border border-border bg-card p-6">
          <p className="eyebrow text-sunrise">{title}</p><p className="mt-4 text-sm leading-relaxed text-foreground/75">{value}</p>
        </article>)}</div>}
    </div>
  );
}
