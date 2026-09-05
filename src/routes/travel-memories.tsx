import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { TravelMemoriesMap, type TravelMemory } from "@/components/travel/travel-memories-map";
import { fetchTravelMemories, submitTravelMemory } from "@/lib/travel-api";

export const Route = createFileRoute("/travel-memories")({ component: TravelMemoriesPage });

const demoMemories: TravelMemory[] = [
  { id: "demo-hampi", title: "Hampi at Sunrise", location: "Hampi, Karnataka", latitude: 15.335, longitude: 76.46, date: "Demo memory", description: "Preview marker — connect WordPress to load the community map." },
  { id: "demo-varanasi", title: "Varanasi", location: "Varanasi, Uttar Pradesh", latitude: 25.3176, longitude: 82.9739, date: "Demo memory", description: "Preview marker — real approved memories will appear here." },
];

function TravelMemoriesPage() {
  const [memories, setMemories] = useState<TravelMemory[]>(demoMemories);
  const [loading, setLoading] = useState(true);
  const [usingDemo, setUsingDemo] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<{ latitude: number; longitude: number } | null>(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { let active = true; fetchTravelMemories().then(items => { if (!active) return; if (items.length) setMemories(items); else setUsingDemo(true); }).catch(() => { if (active) { setUsingDemo(true); setError("Your Travel Memories could not be loaded yet. Showing the map preview."); } }).finally(() => active && setLoading(false)); return () => { active = false; }; }, []);
  const onLocationSelect = useCallback((loc: { latitude: number; longitude: number }) => setSelected(loc), []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(""); setSubmitting(true);
    const form = new FormData(event.currentTarget);
    if (!selected) { setMessage("Please click the map or use your current location to choose where this memory happened."); setSubmitting(false); return; }
    try {
      await submitTravelMemory({ title: String(form.get("title") || "Travel Memory"), location: String(form.get("location") || ""), latitude: selected.latitude, longitude: selected.longitude, date: String(form.get("date") || ""), description: String(form.get("description") || ""), photo: (form.get("photo") as File)?.size ? form.get("photo") as File : null });
      event.currentTarget.reset(); setSelected(null); setMessage("Thank you! Your travel memory has been submitted for review. Once approved, its pin will appear on the Travel Memories map.");
    } catch (err) { setMessage(err instanceof Error ? err.message : "We could not submit your memory. Please try again."); }
    finally { setSubmitting(false); }
  }

  function useCurrentLocation() { if (!navigator.geolocation) { setMessage("Location services are not available in this browser."); return; } navigator.geolocation.getCurrentPosition(p => setSelected({ latitude: p.coords.latitude, longitude: p.coords.longitude }), () => setMessage("We could not access your location. You can click the map to choose it instead.")); }

  return <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
    <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb"><Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span><span className="text-foreground">My Voyayaha</span></nav>
    <header className="mt-8 max-w-4xl"><p className="eyebrow text-sunrise">My Voyayaha · Your journeys. Your memories.</p><h1 className="mt-3 text-4xl leading-tight sm:text-6xl">My Voyayaha</h1><p className="mt-5 text-lg leading-relaxed text-foreground/75">See where the Voyayaha community has travelled — and add a memory of your own. Each approved memory becomes a pin with its photo and story.</p></header>
    {loading && <p className="mt-8 text-sm text-muted-foreground">Loading memories…</p>}{error && <p className="mt-6 rounded-sm border border-border bg-secondary/40 p-4 text-sm">{error}</p>}{usingDemo && !error && <p className="mt-6 rounded-sm border border-border bg-secondary/40 p-4 text-sm">Map preview mode. The site will use your WordPress API for real memories when it is available. If your WordPress site is not voyayaha.com, set <code>VITE_WORDPRESS_API_BASE_URL</code> in Cloudflare.</p>}
    <div className="mt-8"><TravelMemoriesMap memories={memories} selectedLocation={selected} onLocationSelect={onLocationSelect} /></div>
    <div className="mt-8 grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
      <section className="rounded-sm border border-border bg-card p-6"><p className="eyebrow text-sunrise">Add yours</p><h2 className="mt-2 font-display text-3xl">Pin a travel memory</h2><p className="mt-3 text-sm leading-relaxed text-foreground/70">Click the map at the place you visited, or use your current location. Add a photo and short story. Submissions are held for review before becoming public.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4"><input name="title" required placeholder="Memory title" className="w-full rounded-sm border border-border bg-background px-4 py-3" /><input name="location" required placeholder="Place / destination" className="w-full rounded-sm border border-border bg-background px-4 py-3" /><input name="date" type="date" className="w-full rounded-sm border border-border bg-background px-4 py-3" /><textarea name="description" rows={4} placeholder="What made this place memorable?" className="w-full rounded-sm border border-border bg-background px-4 py-3" /><input name="photo" type="file" accept="image/jpeg,image/png,image/webp" className="w-full text-sm" /><div className="rounded-sm bg-secondary p-4 text-sm">{selected ? <>Selected coordinates: <strong>{selected.latitude.toFixed(5)}, {selected.longitude.toFixed(5)}</strong></> : "No location selected yet."}</div><button type="button" onClick={useCurrentLocation} className="w-full rounded-full border border-border px-5 py-3">Use my current location</button><button disabled={submitting} className="w-full rounded-full bg-foreground px-5 py-3 text-background disabled:opacity-60">{submitting ? "Submitting…" : "Submit travel memory"}</button>{message && <p className="text-sm leading-relaxed text-muted-foreground">{message}</p>}</form>
      </section>
      <section><h2 className="font-display text-3xl">Community memories</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{memories.map(memory => <article key={memory.id} className="rounded-sm border border-border bg-card p-5"><h3 className="font-display text-2xl">{memory.title}</h3><p className="mt-1 text-sm text-muted-foreground">{memory.location}</p>{memory.date && <p className="mt-2 text-xs text-muted-foreground">{memory.date}</p>}</article>)}</div></section>
    </div>
  </div>;
}
