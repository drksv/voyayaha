# Voyayaha frontend fix — Hidden Places / Peaceful Search

This revision fixes the Discover page so searches such as:

- hidden places in Pune
- hidden places near Pune
- peaceful places in Mumbai

actually trigger the Hidden Places Explorer.

## What was wrong

The Discover page was checking the URL search parameter (`q`) instead of the live search input (`query`). Typing into the search box therefore never mounted the Hidden Places Explorer. The frontend already contained the proxy routes for the new Render endpoints, so no replacement of the existing backend `llm.py` or `social.py` is required.

## Backend expected

The connected Render backend should contain these non-destructive endpoints:

- `GET /chat/experiences-hidden`
- `GET /social-hidden`

and the existing endpoints remain unchanged.

## Cloudflare/Lovable environment variable

Set:

`VITE_TRAVEL_API_BASE_URL=https://backend-eqzz.onrender.com`

The frontend proxy routes use that value to call Render.


## Current Hidden Places behavior

The Hidden Places search now shows only the three verified social-discovery place cards. The older local "Places to explore" grid and raw Reddit/YouTube result grid are intentionally removed from this page. Supporting social URLs appear only inside each of the three place cards.
