# Voyayaha frontend/backend integration

Set `VITE_TRAVEL_API_BASE_URL` to the exact Render backend URL before building.
The frontend uses same-origin `/api/*` routes, so browser CORS is avoided for normal app calls.
The Render backend still has explicit CORS for direct API use.

Required Render backend start command:
`uvicorn main:app --host 0.0.0.0 --port $PORT`

Required frontend build:
`npm run build`

## Hidden Places search contract

The Hidden Places page uses `/api/social-discovery` only. A request such as `Pune` is interpreted as the main city; `peaceful places in Mumbai` is interpreted as Mumbai plus the user's interest. The route requests a 100 km radius and a maximum of 3 results.

The UI shows only the three place cards. Raw Reddit/YouTube results are not rendered as a separate list. Their URLs are supporting evidence inside each recommended place.
