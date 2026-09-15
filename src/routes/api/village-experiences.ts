import { createFileRoute } from "@tanstack/react-router";

const BACKEND = (import.meta.env.VITE_TRAVEL_API_BASE_URL || "https://backend-eqzz.onrender.com").replace(/\/$/, "");

export const Route = createFileRoute("/api/village-experiences")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const incoming = new URL(request.url);
        const location = incoming.searchParams.get("location")?.trim();
        if (!location) return Response.json({ error: "Location is required." }, { status: 400 });
        try {
          const upstream = await fetch(`${BACKEND}/village/experiences?location=${encodeURIComponent(location)}`, {
            headers: { Accept: "application/json" },
          });
          const body = await upstream.text();
          return new Response(body, {
            status: upstream.status,
            headers: { "content-type": upstream.headers.get("content-type") || "application/json" },
          });
        } catch (error) {
          console.error("Village Tourism upstream error:", error);
          return Response.json({ error: "Village Tourism service is temporarily unavailable." }, { status: 502 });
        }
      },
    },
  },
});
