# Voyayaha — Cloudflare deployment

## What was added

- `/travel-memories` — Leaflet + OpenStreetMap map, ready for the existing WordPress `travel_memory` REST endpoint.
- `/village-tourism` — connected to the existing Render village experiences endpoint.
- `/travel-intel` — connected to the existing Render travel-intel endpoint.
- `/sacred-india` — filterable starter dataset for sacred destinations.
- `/hiking-trails` — responsive trail page with demo data, ready for the hiking API.
- Home page Travel Tools section and navigation links.
- Leaflet is loaded from the public CDN so no extra npm package is required.

## Before production

Set these environment variables in the Cloudflare deployment:

`VITE_WORDPRESS_API_BASE_URL`
- The origin of the existing WordPress site that contains the `travel_memory` CPT.
- Example: `https://old-wordpress-site.example`
- Do not point this at the new Voyayaha frontend unless WordPress is actually serving that API.

`VITE_TRAVEL_API_BASE_URL`
- Defaults to `https://backend-eqzz.onrender.com`.

The WordPress REST endpoint expected by the map is:

`/wp-json/wp/v2/travel_memory?per_page=100`

The returned posts need latitude and longitude exposed in `post.meta.latitude` and `post.meta.longitude`. If the API returns the posts but not those fields, update the WordPress meta registration to use `show_in_rest => true`.

If WordPress is on a different origin, its REST API must allow browser requests from the new Voyayaha domain (CORS). Do not put WordPress passwords or private API keys in `VITE_*` variables; Vite exposes those values to the browser.

## Cloudflare Pages / Git integration

1. Push this repository to GitHub.
2. In Cloudflare, open **Workers & Pages** and select the existing Voyayaha project.
3. Confirm it is connected to this GitHub repository and the `main` branch.
4. Build command: `npm run build`.
5. Build output: use the output configured by the existing TanStack Start/Cloudflare integration. Do not add a second framework preset or replace `vite.config.ts`.
6. Add the two `VITE_*` variables under the project's environment variables for Preview and Production as appropriate.
7. Save and trigger a new deployment.
8. Test the generated `*.pages.dev` or Cloudflare preview URL before changing `voyayaha.com`.
9. Test `/travel-memories`, `/village-tourism`, `/hiking-trails`, `/travel-intel`, and `/sacred-india`.
10. Only after the preview is correct should you point the production domain to this deployment.

## Important

This repository uses TanStack Start file-based routing. New route files are under `src/routes/`. `src/routeTree.gen.ts` is generated; do not edit it manually.

The old WordPress `[travel_map]` shortcode is not copied into React. Its Leaflet/OpenStreetMap behavior has been recreated in `src/components/travel/travel-memories-map.tsx`.
