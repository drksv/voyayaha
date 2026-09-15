import type { TravelMemory } from "@/components/travel/travel-memories-map";

const TRAVEL_API = (
  import.meta.env.VITE_TRAVEL_API_BASE_URL || "https://voyayaha-backend-render.onrender.com"
).replace(/\/$/, "");

async function readJson(response: Response, fallback: string): Promise<any> {
  const text = await response.text();
  let payload: any = null;
  try { payload = text ? JSON.parse(text) : null; } catch {}
  if (!response.ok) {
    const message = payload?.detail || payload?.message || payload?.error || text || fallback;
    throw new Error(`${fallback} (${response.status}): ${typeof message === "string" ? message : JSON.stringify(message)}`);
  }
  return payload;
}

export async function fetchTravelMemories(): Promise<TravelMemory[]> {
  const response = await fetch(`${TRAVEL_API}/travel-memories?per_page=100`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  const posts = await readJson(response, "Travel Memories could not be loaded");
  if (!Array.isArray(posts)) return [];

  return posts.map((post: any) => {
    const metaValue = (key: string) => post?.meta?.[key] ?? post?.acf?.[key] ?? post?.[key] ?? "";
    return {
      id: String(post.id),
      title: post.title?.rendered || post.title || "Travel Memory",
      location: String(metaValue("location")),
      latitude: Number.parseFloat(String(metaValue("latitude"))),
      longitude: Number.parseFloat(String(metaValue("longitude"))),
      date: metaValue("date") || undefined,
      description: post.content?.rendered || post.description || "",
      image: metaValue("image") || post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || undefined,
    } satisfies TravelMemory;
  }).filter((m: TravelMemory) => Number.isFinite(m.latitude) && Number.isFinite(m.longitude));
}

export async function submitTravelMemory(input: {
  title: string;
  location: string;
  latitude: number;
  longitude: number;
  date?: string;
  description?: string;
  photo?: File | null;
}) {
  const form = new FormData();
  form.append("title", input.title);
  form.append("location", input.location);
  form.append("latitude", String(input.latitude));
  form.append("longitude", String(input.longitude));
  if (input.date) form.append("date", input.date);
  if (input.description) form.append("description", input.description);
  if (input.photo) form.append("photo", input.photo);

  // Send through the existing Render backend. Render talks to WordPress server-to-server,
  // avoiding the InfinityFree TLS/CORS problem seen from local Node/browser clients.
  const response = await fetch(`${TRAVEL_API}/travel-memory`, {
    method: "POST",
    body: form,
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  return await readJson(response, "Travel Memory submission failed");
}

export async function fetchVillageExperiences(location: string) {
  const response = await fetch(`/api/village-experiences?location=${encodeURIComponent(location)}`, { headers: { Accept: "application/json" } });
  return readJson(response, "Village Tourism API unavailable");
}

export async function fetchTravelIntel(city: string) {
  const response = await fetch(`/api/travel-intel?city=${encodeURIComponent(city)}`, { headers: { Accept: "application/json" } });
  return readJson(response, "Travel Intel API unavailable");
}

export async function fetchHiddenPlaces(location: string, query: string, limit = 3) {
  const response = await fetch(`/api/hidden-experiences?location=${encodeURIComponent(location)}&query=${encodeURIComponent(query)}&limit=${limit}`, { headers: { Accept: "application/json" } });
  return readJson(response, "Hidden Places AI is unavailable");
}

export async function fetchHiddenSocial(location: string, query: string, limit = 3) {
  const response = await fetch(`/api/social-hidden?location=${encodeURIComponent(location)}&query=${encodeURIComponent(query)}&limit=${limit}`, { headers: { Accept: "application/json" } });
  return readJson(response, "Reddit and YouTube results are unavailable");
}


export type SocialDiscoverySource = {
  source: "reddit" | "youtube";
  title: string;
  description?: string;
  image?: string | null;
  url: string;
  subreddit?: string;
};

export type SocialDiscoveryResult = {
  rank: number;
  name: string;
  latitude: number;
  longitude: number;
  distance_km: number;
  score: number;
  reason: string;
  reddit: SocialDiscoverySource[];
  youtube: SocialDiscoverySource[];
  sources: SocialDiscoverySource[];
  summary?: string;
  why_selected?: string;
  traveller_signals?: string[];
  best_for?: string;
  caveat?: string;
  ai_confidence?: number;
  geocoder_verified?: boolean;
  geocoder?: string;
  geocoder_type?: string;
  source_type?: "social" | "voyayaha_database";
  database_id?: number | string;
  image_url?: string | null;
};

export async function fetchSocialDiscovery(location: string, query: string, radiusKm = 100, limit = 3): Promise<{
  location: string;
  center?: { latitude: number; longitude: number };
  radius_km: number;
  results: SocialDiscoveryResult[];
  sources_checked?: { reddit: number; youtube: number };
  candidates_checked?: number;
  message?: string;
  diagnostics?: Record<string, unknown>;
  degraded?: boolean;
  discovery_version?: string;
}> {
  const response = await fetch(`/api/social-discovery?location=${encodeURIComponent(location)}&query=${encodeURIComponent(query)}&radius_km=${radiusKm}&limit=${limit}`, {
    headers: { Accept: "application/json" },
  });
  return readJson(response, "Social discovery is unavailable");
}

export type ItineraryRequest = {
  location: string;
  budget?: string;
  activity?: string;
  duration?: "half_day" | "full_day" | "multi_day" | string;
  motivation?: string;
  num_days?: number;
};

export type ItineraryStop = {
  day: number;
  title: string;
  intro: string;
  top_places: Array<{ name: string; tip: string }>;
};

export async function generateItinerary(input: ItineraryRequest): Promise<{
  stops: ItineraryStop[];
  itinerary?: ItineraryStop[];
}> {
  const response = await fetch("/api/itinerary", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(input),
  });
  return readJson(response, "Itinerary API unavailable");
}
