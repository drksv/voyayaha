# Voyayaha — Hiking Trails + Travel Memories

## What is included

- 349 hiking trails from the supplied `trails.csv` dataset.
- Trail route geometry is retained and displayed on an interactive Leaflet/OpenStreetMap map.
- Hiking filters: destination, difficulty and surface.
- Trail details include distance, difficulty, terrain, trail grade and distance from city.
- Travel Memories keeps the Leaflet/OpenStreetMap map and adds a public memory form.
- Users can click the map or use browser location to choose coordinates, attach a photo and submit a title/place/date/story.
- Submissions are created as **pending** WordPress `travel_memory` posts so you can moderate them before they become public pins.
- A WordPress plugin is included at `wordpress/voyayaha-travel-memories-api.php`.

## Install the website

1. Replace your current project files with this ZIP or copy these files into your GitHub repository.
2. Keep the repository's `.git` folder if you are working locally.
3. Run `npm install` and then `npm run build`.
4. In Cloudflare, set the environment variables shown in `.env.example`.
5. Redeploy.

## Connect Travel Memories to WordPress

1. In WordPress, install and activate `wordpress/voyayaha-travel-memories-api.php` as a plugin.
2. Make sure your existing `travel_memory` custom post type is still registered with REST enabled (`show_in_rest => true`).
3. Set `VITE_WORDPRESS_API_BASE_URL` to the WordPress site that contains `travel_memory`.
4. The site reads published memories from `/wp-json/wp/v2/travel_memory?per_page=100`.
5. The form submits to `/wp-json/voyayaha/v1/travel-memory` unless `VITE_TRAVEL_MEMORY_SUBMIT_URL` overrides it.
6. New submissions are **pending**. Review and publish them in WordPress; only published memories appear on the public map.

## Important behavior

The user's pin is based on coordinates selected on the map or supplied by browser geolocation. The uploaded photo is attached to that memory and appears in the map popup after approval. The website does not claim to extract GPS coordinates from the photo itself.

## Trail data

The supplied CSV had 349 rows and includes `lat`, `lon`, `length_km`, `difficulty`, `city`, `distance_from_city_km`, `geojson`, `sac_scale` and `surface`. The route data was normalized into `src/data/hiking-trails.json`; both point-array and GeoJSON LineString rows are supported.

Because the source is OpenStreetMap-derived, treat trail access, route condition and safety as information to verify before a hike.

## Cloudflare / CORS

If WordPress is on a different domain from the Voyayaha frontend, WordPress must allow the frontend origin to read the normal REST API. The included submission endpoint sends permissive CORS headers for the submission route. For production, you can tighten the allowed origin to your Voyayaha domain.

Do not put private API keys in `VITE_*` variables.

Do not manually edit `src/routeTree.gen.ts`; TanStack generates it from the files in `src/routes/`.

The original supplied CSV is also retained at `data/trails.csv` for future backend/API use.
