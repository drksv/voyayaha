# Voyayaha — Cloudflare deployment

## What this revision fixes

- **Village Tourism** is inside **Village & Local**.
- **Hiking Trails + Travel Memories** are inside **Hidden Places**.
- **Travel Intel** is inside **Explore / Discover**.
- **Sacred India** is inside **Spiritual Journeys**.
- Old feature URLs redirect to their parent section.
- Travel Intel and Village Tourism no longer call Render directly from the browser. They use same-origin `/api/...` server routes, which removes the browser CORS problem that caused **Failed to fetch**.
- Travel Memories GET and POST now call WordPress directly from the browser. The supplied WordPress plugin enables the required CORS headers; this avoids a Cloudflare/TanStack server-side fetch returning 502 when the deployment cannot reach WordPress.
- Travel Memory POST is sent directly by the browser to the WordPress moderation endpoint `/wp-json/voyayaha/v1/travel-memory`; no Node.js proxy is used.
- Leaflet remains bundled through the installed npm package.
- Travel Memories continues to use the existing WordPress `travel_memory` custom post type and moderation endpoint.

## Production environment variables

These are the only variables required:

`VITE_WORDPRESS_API_BASE_URL=https://voyayaha.com`

`VITE_TRAVEL_API_BASE_URL=https://backend-eqzz.onrender.com`

Both routes also contain these values as defaults, so the site can still use the known existing services if the variables are omitted.

Because `VITE_*` values are embedded during the build, change them in Cloudflare and redeploy.

## Server-side API proxy

The frontend calls:

- `/api/travel-intel?city=Jaipur`
- `/api/village-experiences?location=Jaipur`
- WordPress `/wp-json/wp/v2/travel_memory?per_page=100&_embed=1` for Travel Memories
- WordPress `/wp-json/voyayaha/v1/travel-memory` for Travel Memory submissions

Travel Memory GET/POST are direct browser-to-WordPress requests. The supplied plugin adds the required CORS headers.

## WordPress plugin

Keep the supplied plugin:

`wordpress/voyayaha-travel-memories-api.php`

It must be installed and activated on the WordPress site. It exposes:

`/wp-json/wp/v2/travel_memory`

and:

`/wp-json/voyayaha/v1/travel-memory`

Travel Memory submissions are created as **pending** posts for moderation.

## Cloudflare build

- Build command: `npm run build`
- Do not add another framework preset.
- Keep the existing `vite.config.ts`.
- The project is a TanStack Start application.

## After deployment

Test these pages:

1. `/village-local` — search a village or town.
2. `/hidden-places` — hiking trails and Travel Memories map.
3. `/discover` — Travel Intel; enter a city such as Jaipur.
4. `/spiritual-journeys` — Sacred India.
5. `/my-voyayaha` — personal saved/visited places and notes.

Also test an actual Travel Memory submission. It should create a pending `travel_memory` post in WordPress.

## Important

Do not delete `src/routeTree.gen.ts` before deployment. It is included with the API routes in this package so the new server endpoints are available immediately. If Lovable/TanStack regenerates the file during development, that is fine.


## Travel Memory submission endpoint

The frontend POST goes directly to `https://voyayaha.com/wp-json/voyayaha/v1/travel-memory` (or the host configured in `VITE_WORDPRESS_API_BASE_URL`). The WordPress plugin `wordpress/voyayaha-travel-memories-api.php` must be active and allow the actual frontend origin.
