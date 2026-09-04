import { Link } from "@tanstack/react-router";

import { PlaceCard } from "@/components/place-card";
import { categories, destinationsByCategory, getCategory, type CategorySlug } from "@/lib/destinations";

export function CategoryPage({ slug }: { slug: CategorySlug }) {
  const category = getCategory(slug);
  const places = destinationsByCategory(slug);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/discover" className="hover:text-foreground">
              Discover
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">{category.label}</li>
        </ol>
      </nav>

      <header className="mt-8 max-w-3xl">
        <p className="eyebrow text-sunrise">{category.tagline}</p>
        <h1 className="mt-3 text-4xl leading-tight text-foreground sm:text-6xl">
          {category.label}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/75">{category.description}</p>
      </header>

      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to={`/${c.slug}`}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              c.slug === slug
                ? "border-foreground bg-foreground text-background"
                : "border-border text-foreground hover:border-foreground/40"
            }`}
          >
            {c.short}
          </Link>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        {places.length} {places.length === 1 ? "place" : "places"} in this collection
      </p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((place) => (
          <PlaceCard key={place.slug} place={place} />
        ))}
      </div>

      <section className="mt-20 rounded-sm border border-border bg-card p-8 sm:p-12">
        <h2 className="text-2xl text-foreground sm:text-3xl">Make this collection yours</h2>
        <p className="mt-3 max-w-xl text-foreground/75">
          Mark where you've been. Save where you want to go. Remember what moved you.
        </p>
        <Link
          to="/my-voyayaha"
          className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Open My Voyayaha
        </Link>
      </section>
    </div>
  );
}
