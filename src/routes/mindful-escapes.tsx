import { createFileRoute } from "@tanstack/react-router";

import { CategoryPage } from "@/components/category-page";
import { getCategory } from "@/lib/destinations";

const category = getCategory("mindful-escapes");

export const Route = createFileRoute("/mindful-escapes")({
  head: () => ({
    meta: [
      { title: category.metaTitle },
      { name: "description", content: category.metaDescription },
      { property: "og:title", content: category.metaTitle },
      { property: "og:description", content: category.metaDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <CategoryPage slug="mindful-escapes" />,
});
