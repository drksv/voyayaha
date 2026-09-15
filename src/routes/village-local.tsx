import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { CategoryPage } from "@/components/category-page";
import { VillageTourismSection } from "@/components/travel/village-tourism-section";
import { getCategory } from "@/lib/destinations";

const category = getCategory("village-local");
export const Route = createFileRoute("/village-local")({ validateSearch: (search: Record<string, unknown>) => ({ q: typeof search.q === "string" ? search.q : undefined }), head: () => ({ meta: [{ title: category.metaTitle }, { name: "description", content: category.metaDescription }] }), component: VillageLocalPage });
function VillageLocalPage() { const { q } = Route.useSearch(); return <><CategoryPage slug="village-local" /><div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8"><VillageTourismSection initialQuery={q ?? ""} /><Link to="/" className="mt-8 inline-block text-sm font-semibold text-primary hover:underline">Back to home →</Link></div></>; }
