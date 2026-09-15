import { createFileRoute } from "@tanstack/react-router";

const BACKEND = (
  import.meta.env.VITE_TRAVEL_API_BASE_URL || "https://backend-eqzz.onrender.com"
).replace(/\/$/, "");

export const Route = createFileRoute("/api/itinerary")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.text();
          const upstream = await fetch(`${BACKEND}/chat/experiences`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body,
          });
          const text = await upstream.text();
          return new Response(text, {
            status: upstream.status,
            headers: { "content-type": upstream.headers.get("content-type") || "application/json" },
          });
        } catch (error) {
          console.error("Itinerary upstream error:", error);
          return Response.json(
            { stops: [], itinerary: [], error: "Itinerary service is temporarily unavailable." },
            { status: 502 },
          );
        }
      },
    },
  },
});
