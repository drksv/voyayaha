import { useCallback, useEffect, useState, type FormEvent } from "react";
import { TravelMemoriesMap, type TravelMemory } from "@/components/travel/travel-memories-map";
import { fetchTravelMemories, submitTravelMemory } from "@/lib/travel-api";

export function TravelMemoriesSection() {
  const [memories, setMemories] = useState<TravelMemory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<{ latitude: number; longitude: number } | null>(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { let active = true; fetchTravelMemories().then(items => { if (active) setMemories(items); }).finally(() => active && setLoading(false)); return () => { active = false; }; }, []);
  const onLocationSelect = useCallback((loc: { latitude: number; longitude: number }) => setSelected(loc), []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage("");
    if (!selected) { setMessage("Please click the map or use your current location to choose where this memory happened."); return; }
    setSubmitting(true);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    try {
      await submitTravelMemory({ title: String(form.get("title") || "Travel Memory"), location: String(form.get("location") || ""), latitude: selected.latitude, longitude: selected.longitude, date: String(form.get("date") || ""), description: String(form.get("description") || ""), photo: (form.get("photo") as File)?.size ? form.get("photo") as File : null });
      formElement.reset(); setSelected(null); setMessage("Thank you! Your travel memory has been submitted for review.");
    } catch (err) { setMessage(err instanceof Error ? err.message : "We could not submit your memory. Please try again."); }
    finally { setSubmitting(false); }
  }
  function useCurrentLocation() { if (!navigator.geolocation) { setMessage("Location services are not available in this browser."); return; } navigator.geolocation.getCurrentPosition(p => setSelected({ latitude: p.coords.latitude, longitude: p.coords.longitude }), () => setMessage("We could not access your location. Click the map to choose it instead.")); }

  return <section id="travel-memories" className="mt-14 border-t border-border pt-12">
    <div className="rounded-sm border border-border bg-card p-6 sm:p-8">
      <p className="eyebrow text-sunrise">Travel Memories</p><h2 className="mt-2 text-3xl sm:text-4xl">Your journeys. Your memories. Your map.</h2>
      <p className="mt-3 max-w-3xl text-foreground/70">Click anywhere on the map to pin a memory, or use your current location. Approved community memories appear on the map.</p>
      {loading && <p className="mt-5 text-sm text-muted-foreground">Loading memories…</p>}
      <div className="mt-6 min-w-0 overflow-hidden rounded-sm border border-border"><TravelMemoriesMap memories={memories} selectedLocation={selected} onLocationSelect={onLocationSelect} /></div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-sm border border-border bg-background p-6"><h3 className="font-display text-2xl">Pin a travel memory</h3><input name="title" required placeholder="Memory title" className="w-full rounded-sm border border-border bg-card px-4 py-3" /><input name="location" required placeholder="Place / destination" className="w-full rounded-sm border border-border bg-card px-4 py-3" /><input name="date" type="date" className="w-full rounded-sm border border-border bg-card px-4 py-3" /><textarea name="description" rows={4} placeholder="What made this place memorable?" className="w-full rounded-sm border border-border bg-card px-4 py-3" /><input name="photo" type="file" accept="image/jpeg,image/png,image/webp" className="w-full text-sm" /><div className="rounded-sm bg-secondary p-4 text-sm">{selected ? <>Selected coordinates: <strong>{selected.latitude.toFixed(5)}, {selected.longitude.toFixed(5)}</strong></> : "Click the map to choose a location."}</div><button type="button" onClick={useCurrentLocation} className="w-full rounded-full border border-border px-5 py-3">Use my current location</button><button disabled={submitting} className="w-full rounded-full bg-foreground px-5 py-3 text-background disabled:opacity-60">{submitting ? "Submitting…" : "Submit travel memory"}</button>{message && <p className="text-sm leading-relaxed text-muted-foreground">{message}</p>}</form>
        <div><h3 className="font-display text-2xl">Community memories</h3>{memories.length ? <div className="mt-5 grid gap-4 sm:grid-cols-2">{memories.map(m => <article key={m.id} className="rounded-sm border border-border bg-background p-5"><h4 className="font-display text-xl">{m.title}</h4><p className="mt-1 text-sm text-muted-foreground">{m.location}</p></article>)}</div> : <p className="mt-4 text-sm text-muted-foreground">No approved community memories yet.</p>}</div>
      </div>
    </div>
  </section>;
}
