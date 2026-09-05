# Voyayaha revised build — September 2026

This revision preserves the existing real data/API architecture and makes the requested integration fixes.

## Changed

- Kept the real Render backend:
  - Village Tourism: `/village/experiences?location=`
  - Travel Intel: `/travel-intel?city=`
- Added a global Discover search that searches the project's real local datasets (destinations, 349 hiking trails, Sacred India) and also checks the live Village Tourism and Travel Intel services.
- Search results link into the correct feature page.
- Added query hand-off to Village Tourism, Travel Intel, Hiking Trails and Sacred India so a search can open with the searched place already loaded.
- Fixed Hiking Trails Leaflet sizing with a stable map lifecycle, explicit 600px rendering surface, ResizeObserver and `invalidateSize()`.
- Fixed Travel Memories Leaflet sizing and made the map lifecycle stable when memories or selected coordinates change.
- Travel Memories submission now falls back to `https://voyayaha.com` as the WordPress base when `VITE_WORDPRESS_API_BASE_URL` is not supplied. The environment variable still overrides this fallback.
- Replaced the old My Voyayaha page route with a redirect to Travel Memories; the navigation now presents Travel Memories as **My Voyayaha**.
- Grouped navigation:
  - Village & Local → Village Tourism
  - Hidden Places → Hiking Trails
  - Explore → Travel Intel, Discover, Mindful Escapes, Heritage
  - Spiritual Journeys → Sacred India
  - My Voyayaha → Travel Memories
- Expanded Sacred India from 6 entries to a broad 107-site multi-faith catalogue covering Hindu, Buddhist, Jain, Sikh, Muslim and Christian pilgrimage/heritage destinations.
- Sacred India supports multiple circuits per destination and dynamically derives circuit/religion filters, including Chota Char Dham, Bada Char Dham, Jyotirlinga, Shakti Peetha, Buddhist Circuit, Jain Circuit, Sikh Circuit, Sufi Shrines, Christian Heritage and Pilgrimage.

## Cloudflare

Recommended variables:

`VITE_WORDPRESS_API_BASE_URL=https://voyayaha.com`

`VITE_TRAVEL_API_BASE_URL=https://backend-eqzz.onrender.com`

`VITE_TRAVEL_MEMORY_SUBMIT_URL=https://voyayaha.com/wp-json/voyayaha/v1/travel-memory`

If your WordPress site is hosted somewhere other than `voyayaha.com`, set the first and third variables to the correct WordPress URL/endpoint.

Because Vite embeds `VITE_*` variables at build time, redeploy after changing them.

## Validation

The source was inspected and TypeScript parsing was checked. A complete production build could not be run in this environment because the uploaded project did not include installed dependencies and package installation could not complete from the available network/cache. No `node_modules` directory is included in the revised ZIP; Cloudflare/npm install should install dependencies during deployment.
