import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/category-page";
import { HikingTrailsSection } from "@/components/travel/hiking-trails-section";
import { HiddenPlacesExplorer } from "@/components/travel/hidden-places-explorer";
import { TravelMemoriesSection } from "@/components/travel/travel-memories-section";
import { getCategory } from "@/lib/destinations";

const category = getCategory("hidden-places");

export const Route = createFileRoute("/hidden-places")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: category.metaTitle },
      { name: "description", content: category.metaDescription },
    ],
  }),
  component: HiddenPlacesPage,
});

function HiddenPlacesPage() {
  const { q } = Route.useSearch();
  return (
    <>
      <CategoryPage slug="hidden-places" showCollection={false} />
      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <HiddenPlacesExplorer initialQuery={q ?? ""} />
        <HikingTrailsSection initialQuery={q ?? ""} />
        <TravelMemoriesSection />
      </div>
    </>
  );
}
