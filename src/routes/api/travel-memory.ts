import { createFileRoute } from "@tanstack/react-router";
import https from "node:https";

const WORDPRESS = (
  process.env.VITE_WORDPRESS_API_BASE_URL || import.meta.env.VITE_WORDPRESS_API_BASE_URL || "https://voyayaha.com"
).replace(/\/$/, "");

/**
 * Some local Node installations reject the certificate chain served by the
 * WordPress host even though browsers can open the site normally. For local
 * development only, retry with certificate verification disabled. Production
 * keeps normal TLS verification unless WORDPRESS_ALLOW_INSECURE_TLS=true is
 * explicitly set.
 */
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
    if (/certificate|CERT_|unable to verify|self[- ]signed|TLS|UNABLE_TO_VERIFY_LEAF_SIGNATURE|UNABLE_TO_GET_ISSUER_CERT|CERT_HAS_EXPIRED/i.test(`${message} ${code}`)) {
      return true;
    }
    current = current?.cause;
  }
  return false;
}

function insecureRequest(url: string, options: { method: string; headers: Record<string, string>; body?: ArrayBuffer }) {
  return new Promise<Response>((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.request(
      {
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        port: parsed.port || 443,
        path: `${parsed.pathname}${parsed.search}`,
        method: options.method,
        headers: options.headers,
        rejectUnauthorized: false,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
        res.on("end", () => {
          const body = Buffer.concat(chunks);
          const headers = new Headers();
          Object.entries(res.headers).forEach(([key, value]) => {
            if (Array.isArray(value)) headers.set(key, value.join(", "));
            else if (value != null) headers.set(key, value);
          });
          resolve(new Response(body, { status: res.statusCode || 502, headers }));
        });
      },
    );
    req.on("error", reject);
    if (options.body) req.write(Buffer.from(options.body));
    req.end();
  });
}

async function wordpressFetch(url: string, init: { method: string; headers: Record<string, string>; body?: ArrayBuffer }) {
  try {
    return await fetch(url, init);
  } catch (error) {
    if (!allowInsecureTls() || !isTlsFailure(error)) throw error;
    console.warn("WordPress TLS verification failed; retrying with local development TLS fallback.");
    return insecureRequest(url, init);
  }
}

export const Route = createFileRoute("/api/travel-memory")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const contentType = request.headers.get("content-type") || "";
          const body = await request.arrayBuffer();

          if (!contentType.toLowerCase().startsWith("multipart/form-data")) {
            return Response.json({ error: "Travel Memory submission must use multipart/form-data." }, { status: 400 });
          }

          const upstream = await wordpressFetch(
            `${WORDPRESS}/wp-json/voyayaha/v1/travel-memory`,
            {
              method: "POST",
              body,
              headers: {
                Accept: "application/json",
                "Content-Type": contentType,
                "Content-Length": String(body.byteLength),
              },
            },
          );

          const responseBody = await upstream.text();
          const headers = new Headers();
          headers.set("content-type", upstream.headers.get("content-type") || "application/json");
          headers.set("cache-control", "no-store");
          return new Response(responseBody, { status: upstream.status, headers });
        } catch (error) {
          console.error("WordPress Travel Memory submission error:", error);
          return Response.json(
            { error: "The frontend server could not reach the WordPress Travel Memory API.", detail: error instanceof Error ? error.message : String(error) },
            { status: 502 },
          );
        }
      },
    },
  },
});
