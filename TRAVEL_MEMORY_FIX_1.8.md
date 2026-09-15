# Voyayaha Travel Memory Fix 1.8

The local Node runtime reports `TypeError: fetch failed` with the TLS certificate error stored in `error.cause.code` (`UNABLE_TO_VERIFY_LEAF_SIGNATURE`). Earlier versions only inspected the outer error message, so the insecure development fallback never ran.

1.8 now detects nested TLS causes/codes and retries the WordPress request with Node's HTTPS client and `rejectUnauthorized: false` in development. Browser-to-WordPress fallback has been removed so the browser no longer produces misleading CORS errors.

Browser flow:
`Browser -> /api/travel-memory -> Node -> WordPress`

The production path keeps normal TLS verification unless `WORDPRESS_ALLOW_INSECURE_TLS=true` is explicitly set.
