# Travel Memory submission fix 1.3

The browser no longer POSTs directly to WordPress. It submits the multipart form to the same-origin TanStack Start route `/api/travel-memory`. That server route forwards the multipart body unchanged to:

`https://voyayaha.com/wp-json/voyayaha/v1/travel-memory`

This avoids browser CORS/preflight failures while preserving the existing WordPress moderation workflow.

The WordPress Voyayaha Travel Memories API plugin v1.2 must remain active.
