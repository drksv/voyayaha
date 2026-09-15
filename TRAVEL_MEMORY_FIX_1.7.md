# Voyayaha Travel Memories — v1.7

## What changed
- Travel Memory GET and POST now use the same-origin TanStack server proxy first.
- The proxy calls the Voyayaha custom WordPress endpoint `/wp-json/voyayaha/v1/travel-memory`.
- If local Node rejects the WordPress certificate chain, the proxy retries using a narrowly scoped development-only HTTPS fallback (`rejectUnauthorized: false`).
- Production keeps normal TLS certificate verification unless `WORDPRESS_ALLOW_INSECURE_TLS=true` is explicitly configured.
- Browser submission still has a direct WordPress fallback for deployments where the server proxy is unavailable.
- The previous generic "WordPress is reachable..." message is replaced with the actual transport error when available.

## Important
The TLS fallback is intended to get local development working while the underlying certificate-chain issue is fixed. For production, the preferred permanent solution is to install/serve the complete certificate chain on voyayaha.com.
