import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { fetchTravelIntel } from "@/lib/travel-api";

type TravelIntelSearch = { q?: string };

export const Route = createFileRoute("/travel-intel")({
  validateSearch: (search: Record<string, unknown>): TravelIntelSearch => {
    const q = search["q"];
    return typeof q === "string" && q ? { q } : {};
  },
  component: TravelIntelPage,
});

function TravelIntelPage() {
  const { q } = Route.useSearch();
  const [city, setCity] = useState(q ?? "");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCity(q ?? "");
    if (q?.trim()) void checkCity(q);
  }, [q]);

  async function checkCity(value: string) {
    if (!value.trim()) return;
    setLoading(true);
    setError("");
    try {
      setData(await fetchTravelIntel(value.trim()));
    } catch (e) {
      console.error(e);
      setData(null);
      setError("City not found or Travel Intel is unavailable right now.");
    } finally {
      setLoading(false);
    }
  }

  async function check() { await checkCity(city); }

  const forecast = Array.isArray(data?.weather_16_day_forecast) ? data.weather_16_day_forecast : [];
  const aqi = data?.air_quality || {};
  const traffic = data?.traffic || {};

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">Home</Link>
      <header className="mt-8 max-w-4xl">
        <p className="eyebrow text-sunrise">Know before you go</p>
        <h1 className="mt-3 text-4xl sm:text-6xl">Travel Intel</h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/75">
          Check destination conditions before you travel — weather, air quality and traffic.
        </p>
      </header>

      <div className="mt-10 flex max-w-3xl gap-3">
        <input value={city} onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && check()}
          placeholder="Enter city name"
          className="min-w-0 flex-1 rounded-full border border-border bg-card px-5 py-3 outline-none focus:ring-2 focus:ring-ring" />
        <button onClick={check}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          {loading ? "Loading…" : "Search"}
        </button>
      </div>

      {error && <p className="mt-6 rounded-sm border border-border p-4 text-sm">{error}</p>}

      {data && (
        <>
          <div className="mt-10 rounded-sm border border-border bg-card p-6">
            <p className="eyebrow text-sunrise">Destination</p>
            <h2 className="mt-2 font-display text-3xl">Travel Intel for {data.city}</h2>
            {data.coordinates && (
              <p className="mt-2 text-sm text-muted-foreground">
                Lat: {data.coordinates.latitude}, Lon: {data.coordinates.longitude}
              </p>
            )}
          </div>

          <section className="mt-8">
            <h2 className="font-display text-3xl">Weather Forecast (Next 16 Days)</h2>
            {forecast.length ? (
              <div className="mt-4 overflow-x-auto rounded-sm border border-border bg-card">
                <table className="w-full min-w-[700px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="p-3">Date</th>
                      <th className="p-3">Max Temp (°C)</th>
                      <th className="p-3">Min Temp (°C)</th>
                      <th className="p-3">Rain (mm)</th>
                      <th className="p-3">Wind (km/h)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {forecast.map((day: any, i: number) => (
                      <tr key={`${day.date ?? "day"}-${i}`} className="border-b border-border/60 last:border-0">
                        <td className="p-3">{day.date}</td>
                        <td className="p-3">{day.max_temp}</td>
                        <td className="p-3">{day.min_temp}</td>
                        <td className="p-3">{day.rain_mm}</td>
                        <td className="p-3">{day.wind_kmph}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-4 rounded-sm border border-border p-5 text-sm text-muted-foreground">Weather data not available.</p>
            )}
          </section>

          <section className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="rounded-sm border border-border bg-card p-6">
              <p className="eyebrow text-sunrise">Air Quality</p>
              <p className="mt-4 text-sm leading-relaxed">
                {aqi.aqi === "N/A" || aqi.aqi == null
                  ? "Air quality data not available"
                  : `AQI Index: ${aqi.aqi} | Air Quality: ${aqi.health_note ?? ""}`}
              </p>
            </article>
            <article className="rounded-sm border border-border bg-card p-6">
              <p className="eyebrow text-sunrise">Traffic Conditions Near Tourist Areas</p>
              <p className="mt-4 text-sm leading-relaxed">
                {traffic.traffic_level
                  ? `Traffic Level: ${traffic.traffic_level} | ${traffic.delay_advice ?? ""}`
                  : "Traffic data not available"}
              </p>
            </article>
          </section>
        </>
      )}
    </div>
  );
}
