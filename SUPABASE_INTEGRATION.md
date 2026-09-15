# Voyayaha database integration

The frontend does NOT contain Supabase credentials. It calls the Render backend, and Render securely queries Supabase.

Hidden Places priority:
1. Reddit + YouTube discovery.
2. Voyayaha curated Supabase database for missing slots.

Deploy the matching backend first, configure Supabase in Render, then deploy this frontend.
