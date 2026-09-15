import { useEffect, useState, type ReactNode } from "react";
import { fetchTravelIntel } from "@/lib/travel-api";

export function TravelIntelSection({ initialCity = "" }: { initialCity?: string }) {
  const [city, setCity] = useState(initialCity);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function check(value = city) {
    const query = value.trim(); if (!query) return;
    setLoading(true); setError("");
    try { setData(await fetchTravelIntel(query)); }
    catch (e) { console.error(e); setData(null); setError(e instanceof Error ? e.message : "Travel Intel is unavailable right now."); }
    finally { setLoading(false); }
  }
  useEffect(() => { if (initialCity.trim()) void check(initialCity); }, [initialCity]);

  const forecast = data?.weather_16_day_forecast || data?.forecast || [];
  const aqi = data?.air_quality || {};
  const traffic = data?.traffic || {};

  return <section id="travel-intel" className="mt-14 border-t border-border pt-12">
    <div className="rounded-sm border border-border bg-card p-6 sm:p-8">
      <p className="eyebrow text-sunrise">Travel Intel</p>
      <h2 className="mt-2 text-3xl sm:text-4xl">Know before you go</h2>
      <p className="mt-3 max-w-2xl text-foreground/70">Check live destination information from Voyayaha's travel-intel service — weather, air quality and traffic.</p>
      <div className="mt-6 flex max-w-2xl gap-3">
        <input value={city} onChange={e => setCity(e.target.value)} onKeyDown={e => e.key === "Enter" && void check()} placeholder="Enter a city" className="min-w-0 flex-1 rounded-full border border-border bg-background px-5 py-3 outline-none focus:ring-2 focus:ring-ring" />
        <button onClick={() => void check()} disabled={loading} className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{loading ? "Loading…" : "Check"}</button>
      </div>
      {error && <p className="mt-5 rounded-sm border border-border p-4 text-sm">{error}</p>}
      {data && <div className="mt-8">
        <h3 className="font-display text-2xl">Travel Intel for {data.city || city}</h3>
        {data.coordinates && <p className="mt-1 text-xs text-muted-foreground">Lat: {data.coordinates.latitude}, Lon: {data.coordinates.longitude}</p>}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <InfoCard title="Air Quality">{aqi.aqi === "N/A" ? "Air quality data not available" : aqi.aqi != null ? `AQI Index: ${aqi.aqi}${aqi.health_note ? ` · ${aqi.health_note}` : ""}` : "Information unavailable"}</InfoCard>
          <InfoCard title="Traffic">{traffic.traffic_level ? `Traffic Level: ${traffic.traffic_level}${traffic.delay_advice ? ` · ${traffic.delay_advice}` : ""}` : "Traffic data not available"}</InfoCard>
          <InfoCard title="Weather">{forecast.length ? `${forecast.length}-day forecast available` : "Forecast unavailable"}</InfoCard>
        </div>
        {forecast.length > 0 && <div className="mt-6 overflow-x-auto rounded-sm border border-border"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-secondary/60"><tr><th className="p-3">Date</th><th className="p-3">Max °C</th><th className="p-3">Min °C</th><th className="p-3">Rain mm</th><th className="p-3">Wind km/h</th></tr></thead><tbody>{forecast.map((day: any, i: number) => <tr key={`${day.date}-${i}`} className="border-t border-border"><td className="p-3">{day.date}</td><td className="p-3">{day.max_temp}</td><td className="p-3">{day.min_temp}</td><td className="p-3">{day.rain_mm}</td><td className="p-3">{day.wind_kmph}</td></tr>)}</tbody></table></div>}
      </div>}
    </div>
  </section>;
}
function InfoCard({ title, children }: { title: string; children: ReactNode }) { return <article className="rounded-sm border border-border bg-background p-5"><p className="eyebrow text-sunrise">{title}</p><p className="mt-3 text-sm leading-relaxed text-foreground/75">{children}</p></article>; }
