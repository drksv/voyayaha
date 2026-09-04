import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";

import { PlaceCard } from "@/components/place-card";
import {
  categories,
  destinations,
  searchDestinations,
  searchExamples,
} from "@/lib/destinations";

type DiscoverSearch = { q?: string };

export const Route = createFileRoute("/discover")({
  validateSearch: (search: Record<string, unknown>): DiscoverSearch => {
    const q = search["q"];
    return typeof q === "string" && q ? { q } : {};
  },
  head: () => ({
    meta: [
      { title: "Discover Meaningful Places to Travel | Voyayaha" },
      {
        name: "description",
        content:
          "Search hidden places, spiritual journeys, mindful escapes, villages and heritage sites. Save the ones that matter and build your own travel map.",
      },
      { property: "og:title", content: "Discover Meaningful Places to Travel | Voyayaha" },
      {
        property: "og:description",
        content:
          "Search hidden places, spiritual journeys, mindful escapes, villages and heritage sites worth travelling slowly for.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DiscoverPage,
});

function DiscoverPage() {
  const { q } = Route.useSearch();
  const [query, setQuery] = useState(q ?? "");
  const results = searchDestinations(query);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">Discover</li>
        </ol>
      </nav>

      <header className="mt-8 max-w-3xl">
        <p className="eyebrow text-sunrise">Discover</p>
        <h1 className="mt-3 text-4xl leading-tight text-foreground sm:text-6xl">
          Where do you want to discover?
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/75">
          Every place here was chosen because it means something — not because it ranks well on a
          tourist list.
        </p>
      </header>

      <div className="mt-8 max-w-2xl">
        <label htmlFor="discover-search" className="sr-only">
          Search places
        </label>
        <div className="flex items-center gap-3 border-b border-foreground/30 pb-3">
          <Search className="size-5 text-muted-foreground" aria-hidden="true" />
          <input
            id="discover-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: hidden places near Pune"
            className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {searchExamples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setQuery(ex)}
              className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      <section className="mt-14">
        <h2 className="eyebrow text-muted-foreground">Explore by meaning</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/${c.slug}`}
              className="rounded-sm border border-border bg-card p-5 transition-colors hover:border-foreground/30"
            >
              <p className="font-display text-xl text-foreground">{c.short}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl text-foreground sm:text-3xl">
            {query ? "Search results" : "All places"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {results.length} of {destinations.length}
          </p>
        </div>
        {results.length === 0 ? (
          <p className="mt-8 text-foreground/75">
            Nothing matches that yet. Try a broader word like “village”, “temple” or “quiet”.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((place) => (
              <PlaceCard key={place.slug} place={place} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
