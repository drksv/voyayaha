import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, MapPin, Share2 } from "lucide-react";

import { PlaceCard, SaveButton } from "@/components/place-card";
import {
  destinations,
  getCategory,
  getDestination,
  type Destination,
} from "@/lib/destinations";
import { useMyVoyayaha } from "@/lib/my-voyayaha";

export const Route = createFileRoute("/places/$slug")({
  loader: ({ params }) => {
    const place = getDestination(params.slug);
    if (!place) throw notFound();
    return { place };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Place not found | Voyayaha" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { place } = loaderData;
    const title = `${place.name}, ${place.location} | Voyayaha`;
    return {
      meta: [
        { title },
        { name: "description", content: place.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: place.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            name: place.name,
            description: place.summary,
            address: { "@type": "PostalAddress", addressLocality: place.location },
            touristType: getCategory(place.category).label,
          }),
        },
      ],
    };
  },
  notFoundComponent: PlaceNotFound,
  component: PlaceDetail,
});

function PlaceNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
      <h1 className="text-4xl text-foreground">We haven't mapped this place yet</h1>
      <p className="mt-4 text-foreground/75">
        The page you're looking for isn't part of our collection. Try discovering something else.
      </p>
      <Link
        to="/discover"
        className="mt-8 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        Browse all places
      </Link>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl text-foreground sm:text-3xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-foreground/80">
          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-sunrise" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PlaceDetail() {
  const { place } = Route.useLoaderData();
  const category = getCategory(place.category);
  const { isVisited, toggle, hydrated, notes, setNote } = useMyVoyayaha();
  const visited = hydrated && isVisited(place.slug);
  const [note, setNoteDraft] = useState("");
  const [copied, setCopied] = useState(false);

  const nearby = place.nearby
    .map((slug) => getDestination(slug))
    .filter((d): d is Destination => Boolean(d));
  const related = destinations
    .filter((d) => d.slug !== place.slug && d.category === place.category)
    .slice(0, 3);

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: place.name, text: place.summary, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* dismissed */
    }
  }

  const savedNote = hydrated ? notes[place.slug] : undefined;

  return (
    <article>
      <div className="relative">
        <img
          src={place.image}
          alt={place.imageAlt}
          width={1280}
          height={900}
          className="h-[52vh] min-h-80 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone/85 via-stone/25 to-transparent" />
        <div className="absolute bottom-0 w-full">
          <div className="mx-auto max-w-5xl px-5 pb-10 sm:px-8">
            <nav aria-label="Breadcrumb" className="text-xs text-stone-foreground/80">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to={`/${category.slug}`} className="hover:underline">
                    {category.label}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-stone-foreground">{place.name}</li>
              </ol>
            </nav>
            <p className="eyebrow mt-5 text-stone-foreground/85">{category.label}</p>
            <h1 className="mt-2 max-w-3xl text-4xl leading-tight text-stone-foreground sm:text-6xl">
              {place.name}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-stone-foreground/90">
              <MapPin className="size-4" aria-hidden="true" />
              {place.location} · {place.region}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="flex flex-wrap items-center gap-3 border-b border-border py-5">
          <SaveButton slug={place.slug} />
          <button
            type="button"
            onClick={() => toggle(place.slug, "visited")}
            aria-pressed={visited}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              visited
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-foreground hover:border-foreground/40"
            }`}
          >
            <Check className="size-3.5" />
            {visited ? "You've been here" : "I've been here"}
          </button>
          <button
            type="button"
            onClick={share}
            className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-foreground/40"
          >
            <Share2 className="size-3.5" />
            {copied ? "Link copied" : "Share"}
          </button>
        </div>

        <p className="mt-10 max-w-3xl text-xl leading-relaxed text-foreground/85 sm:text-2xl">
          {place.summary}
        </p>

        <Section title="Why it is special">
          <List items={place.whySpecial} />
        </Section>

        <Section title="What to experience">
          <List items={place.experiences} />
        </Section>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="eyebrow text-sunrise">Best time to visit</h2>
            <p className="mt-3 leading-relaxed text-foreground/80">{place.bestTime}</p>
          </div>
          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="eyebrow text-sunrise">How to reach</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/80">
              {place.howToReach.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        </div>

        {place.significance && (
          <Section title="Spiritual & cultural significance">
            <blockquote className="border-l-2 border-sunrise pl-5 text-lg leading-relaxed text-foreground/85">
              {place.significance}
            </blockquote>
          </Section>
        )}

        <Section title="Local experiences">
          <List items={place.localExperiences} />
        </Section>

        <Section title="Traveler memories">
          <div className="grid gap-4 sm:grid-cols-2">
            {place.memories.map((m) => (
              <figure key={m.traveler} className="rounded-sm border border-border bg-card p-6">
                <blockquote className="text-lg leading-relaxed text-foreground/85">
                  “{m.note}”
                </blockquote>
                <figcaption className="mt-4 text-xs text-muted-foreground">
                  {m.traveler} · {m.when}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-6 rounded-sm border border-border bg-secondary/50 p-6">
            <h3 className="text-xl text-foreground">Add your own memory</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Kept privately in your My Voyayaha journal.
            </p>
            {savedNote && (
              <p className="mt-4 rounded-sm border border-border bg-card p-4 text-sm text-foreground/80">
                {savedNote}
              </p>
            )}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <label htmlFor="memory" className="sr-only">
                Your memory of this place
              </label>
              <textarea
                id="memory"
                rows={2}
                value={note}
                onChange={(e) => setNoteDraft(e.target.value)}
                placeholder="What moved you here?"
                className="flex-1 rounded-sm border border-border bg-card p-3 text-sm outline-none focus:border-foreground/40"
              />
              <button
                type="button"
                onClick={() => {
                  setNote(place.slug, note);
                  setNoteDraft("");
                }}
                className="self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Save memory
              </button>
            </div>
          </div>
        </Section>

        {nearby.length > 0 && (
          <Section title="Nearby discoveries">
            <div className="grid gap-6 sm:grid-cols-2">
              {nearby.map((d) => (
                <PlaceCard key={d.slug} place={d} />
              ))}
            </div>
          </Section>
        )}

        {related.length > 0 && (
          <Section title={`More in ${category.label}`}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((d) => (
                <PlaceCard key={d.slug} place={d} />
              ))}
            </div>
          </Section>
        )}
      </div>
    </article>
  );
}
