import { createFileRoute } from "@tanstack/react-router";

import { categories, destinations } from "@/lib/destinations";

export const Route = createFileRoute("/api/public/sitemap")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const paths = [
          "/",
          "/discover",
          "/my-voyayaha",
          ...categories.map((c) => `/${c.slug}`),
          ...destinations.map((d) => `/places/${d.slug}`),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (p) =>
      `  <url><loc>${origin}${p}</loc><changefreq>weekly</changefreq><priority>${p === "/" ? "1.0" : "0.7"}</priority></url>`,
  )
  .join("\n")}
</urlset>`;
        return new Response(body, {
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
