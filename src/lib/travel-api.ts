import type { TravelMemory } from "@/components/travel/travel-memories-map";

const WORDPRESS_BASE = import.meta.env.VITE_WORDPRESS_API_BASE_URL?.replace(/\/$/, "") || "";
const RENDER_BASE = import.meta.env.VITE_TRAVEL_API_BASE_URL?.replace(/\/$/, "") || "https://backend-eqzz.onrender.com";
const MEMORY_SUBMIT_URL = import.meta.env.VITE_TRAVEL_MEMORY_SUBMIT_URL?.replace(/\/$/, "") || (WORDPRESS_BASE ? `${WORDPRESS_BASE}/wp-json/voyayaha/v1/travel-memory` : "");

export async function fetchTravelMemories(): Promise<TravelMemory[]> {
  if (!WORDPRESS_BASE) return [];
  const response = await fetch(`${WORDPRESS_BASE}/wp-json/wp/v2/travel_memory?per_page=100`);
  if (!response.ok) throw new Error(`Travel Memories API returned ${response.status}`);
  const posts = await response.json();
  return posts.map((post: any) => ({
    id: String(post.id), title: post.title?.rendered || "Travel Memory", location: post.meta?.location || "",
    latitude: Number.parseFloat(post.meta?.latitude), longitude: Number.parseFloat(post.meta?.longitude),
    date: post.meta?.date || undefined, description: post.content?.rendered || "", image: post.meta?.image || undefined,
  })).filter((m: TravelMemory) => Number.isFinite(m.latitude) && Number.isFinite(m.longitude));
}

export async function submitTravelMemory(input: { title: string; location: string; latitude: number; longitude: number; date?: string; description?: string; photo?: File | null; }) {
  if (!MEMORY_SUBMIT_URL) throw new Error("Travel Memory submission is not configured. Add VITE_WORDPRESS_API_BASE_URL or VITE_TRAVEL_MEMORY_SUBMIT_URL.");
  const form = new FormData();
  form.append("title", input.title); form.append("location", input.location); form.append("latitude", String(input.latitude)); form.append("longitude", String(input.longitude));
  if (input.date) form.append("date", input.date); if (input.description) form.append("description", input.description); if (input.photo) form.append("photo", input.photo);
  const response = await fetch(MEMORY_SUBMIT_URL, { method: "POST", body: form });
  if (!response.ok) { const text = await response.text(); throw new Error(text || `Travel Memory submission returned ${response.status}`); }
  return response.json();
}

export async function fetchVillageExperiences(location: string) { const r = await fetch(`${RENDER_BASE}/village/experiences?location=${encodeURIComponent(location)}`); if (!r.ok) throw new Error(`Village API returned ${r.status}`); return r.json(); }
export async function fetchTravelIntel(city: string) { const r = await fetch(`${RENDER_BASE}/travel-intel?city=${encodeURIComponent(city)}`); if (!r.ok) throw new Error(`Travel Intel API returned ${r.status}`); return r.json(); }
