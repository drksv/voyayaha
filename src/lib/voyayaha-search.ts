import { fetchTravelIntel, fetchVillageExperiences } from "@/lib/travel-api";
import { sacredIndia } from "@/data/sacred-india";
import trails from "@/data/hiking-trails.json";
import {
  destinations,
  getCategory,
  type Destination,
} from "@/lib/destinations";

export type SearchKind = "destination" | "village" | "hiking" | "sacred" | "intel";

export type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  kind: SearchKind;
  kindLabel: string;
  href: string;
  description?: string;
};

function norm(value: unknown) {
  return String(value ?? "").toLowerCase();
}

function matches(value: string, q: string) {
  return norm(value).includes(q);
}

export function searchLocalVoyayaha(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/).filter((word) => word.length > 2 && !["near", "the", "and", "for", "in", "at"].includes(word));

  const score = (values: unknown[]) => {
    const haystack = values.map(norm).join(" ").toLowerCase();
    const matched = words.filter((word) => haystack.includes(word)).length;
    return matched === words.length ? matched + 10 : matched;
  };

  const destinationResults: SearchResult[] = destinations
    .map((d) => ({ d, score: score([d.name, d.location, d.region, d.summary, getCategory(d.category).label, ...(d.secondaryCategories ?? [])]) }))
    .filter(({ score: value }) => value > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ d }) => ({
      id: `destination-${d.slug}`,
      title: d.name,
      subtitle: d.location,
      kind: "destination",
      kindLabel: getCategory(d.category).label,
      href: `/places/${d.slug}`,
      description: d.summary,
    }));

  const hikingResults: SearchResult[] = (trails as any[])
    .map((t) => ({ t, score: score([t.name, t.city, t.region, t.surface, t.difficulty]) }))
    .filter(({ score: value }) => value > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ t }) => ({
      id: `hiking-${t.id}`,
      title: t.name,
      subtitle: `${t.city}${t.difficulty ? ` · ${t.difficulty}` : ""}`,
      kind: "hiking",
      kindLabel: "Hiking Trails",
      href: `/hiking-trails?q=${encodeURIComponent(t.city || t.name)}`,
      description: `${t.length_km ?? ""} km trail`,
    }));

  const sacredResults: SearchResult[] = sacredIndia
    .map((s) => ({ s, score: score([s.name, s.city, s.state, s.religion, ...s.circuits]) }))
    .filter(({ score: value }) => value > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(({ s }) => ({
      id: `sacred-${s.name}-${s.city}`,
      title: s.name,
      subtitle: `${s.city}, ${s.state}`,
      kind: "sacred",
      kindLabel: "Sacred India",
      href: `/sacred-india?q=${encodeURIComponent(s.name)}`,
      description: s.description,
    }));

  return [...destinationResults, ...hikingResults, ...sacredResults].slice(0, 20);
}

function extractLivePlace(query: string) {
  const cleaned = query.trim().replace(/\s+/g, " ");
  const match = cleaned.match(/\b(?:near|around|in|at|for|of)\s+(.+)$/i);
  if (match?.[1]) return match[1].trim();
  return cleaned.replace(/^(hidden places|hiking trails|village tourism|travel intel|sacred india|spiritual places)\s*/i, "").trim() || cleaned;
}

export async function searchLiveVoyayaha(query: string) {
  const q = extractLivePlace(query);
  if (!q) return { village: [], intel: null as any, errors: [] as string[] };

  const [villageResult, intelResult] = await Promise.allSettled([
    fetchVillageExperiences(q),
    fetchTravelIntel(q),
  ]);

  const errors: string[] = [];
  let village: any[] = [];
  let intel: any = null;

  if (villageResult.status === "fulfilled") {
    const value = villageResult.value;
    village = Array.isArray(value) ? value : value?.experiences ?? [];
  } else {
    errors.push("Village Tourism");
  }

  if (intelResult.status === "fulfilled") {
    intel = intelResult.value;
  } else {
    errors.push("Travel Intel");
  }

  return { village, intel, errors };
}
