import { createFileRoute } from "@tanstack/react-router";

const BACKEND = (import.meta.env.VITE_TRAVEL_API_BASE_URL || "https://backend-eqzz.onrender.com").replace(/\/$/, "");

export const Route = createFileRoute("/api/travel-intel")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const incoming = new URL(request.url);
        const city = incoming.searchParams.get("city")?.trim();
        if (!city) return Response.json({ error: "City is required." }, { status: 400 });
        try {
          const upstream = await fetch(`${BACKEND}/travel-intel?city=${encodeURIComponent(city)}`, {
            headers: { Accept: "application/json" },
          });
          const body = await upstream.text();
          return new Response(body, {
            status: upstream.status,
            headers: { "content-type": upstream.headers.get("content-type") || "application/json" },
          });
        } catch (error) {
          console.error("Travel Intel upstream error:", error);
          return Response.json({ error: "Travel Intel service is temporarily unavailable." }, { status: 502 });
        }
      },
    },
  },
});
