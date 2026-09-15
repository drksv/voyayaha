import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/category-page";
import { SacredIndiaSection } from "@/components/travel/sacred-india-section";
import { getCategory } from "@/lib/destinations";
const category = getCategory("spiritual-journeys");
export const Route = createFileRoute("/spiritual-journeys")({ validateSearch: (search: Record<string, unknown>) => ({ q: typeof search.q === "string" ? search.q : undefined }), head: () => ({ meta: [{ title: category.metaTitle }, { name: "description", content: category.metaDescription }] }), component: SpiritualJourneysPage });
function SpiritualJourneysPage() { const { q } = Route.useSearch(); return <><CategoryPage slug="spiritual-journeys" /><div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8"><SacredIndiaSection initialQuery={q ?? ""} /></div></>; }
