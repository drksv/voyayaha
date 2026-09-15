import { createFileRoute } from "@tanstack/react-router";
import https from "node:https";

const WORDPRESS = (
  process.env.VITE_WORDPRESS_API_BASE_URL || import.meta.env.VITE_WORDPRESS_API_BASE_URL || "https://voyayaha.com"
).replace(/\/$/, "");

function allowInsecureTls() {
  return process.env.WORDPRESS_ALLOW_INSECURE_TLS === "true" || process.env.NODE_ENV !== "production";
}

function isTlsFailure(error: unknown): boolean {
  const seen = new Set<unknown>();
  let current: any = error;
  while (current && !seen.has(current)) {
    seen.add(current);
    const message = current instanceof Error ? current.message : String(current);
    const code = current?.code ? String(current.code) : "";
    if (/certificate|CERT_|unable to verify|self[- ]signed|TLS|UNABLE_TO_VERIFY_LEAF_SIGNATURE|UNABLE_TO_GET_ISSUER_CERT|CERT_HAS_EXPIRED/i.test(`${message} ${code}`)) return true;
    current = current?.cause;
  }
  return false;
}

function insecureGet(url: string) {
  return new Promise<Response>((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.request(
      {
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        port: parsed.port || 443,
        path: `${parsed.pathname}${parsed.search}`,
        method: "GET",
        headers: { Accept: "application/json" },
        rejectUnauthorized: false,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
        res.on("end", () => {
          const headers = new Headers();
          Object.entries(res.headers).forEach(([key, value]) => {
            if (Array.isArray(value)) headers.set(key, value.join(", "));
            else if (value != null) headers.set(key, value);
          });
          resolve(new Response(Buffer.concat(chunks), { status: res.statusCode || 502, headers }));
        });
      },
    );
    req.on("error", reject);
    req.end();
  });
}

async function wordpressGet(url: string) {
  try {
    return await fetch(url, { headers: { Accept: "application/json" } });
  } catch (error) {
    if (!allowInsecureTls() || !isTlsFailure(error)) throw error;
    console.warn("WordPress TLS verification failed; retrying with local development TLS fallback.");
    return insecureGet(url);
  }
}

export const Route = createFileRoute("/api/travel-memories")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const upstream = await wordpressGet(`${WORDPRESS}/wp-json/voyayaha/v1/travel-memory?per_page=100`);
          const body = await upstream.text();
          return new Response(body, {
            status: upstream.status,
            headers: { "content-type": upstream.headers.get("content-type") || "application/json", "cache-control": "no-store" },
          });
        } catch (error) {
          console.error("WordPress Travel Memories error:", error);
          return Response.json(
            { error: "WordPress Travel Memories service is temporarily unavailable.", detail: error instanceof Error ? error.message : String(error) },
            { status: 502 },
          );
        }
      },
    },
  },
});
