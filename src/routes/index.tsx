import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Bookmark, Camera, Compass, MapPin, Search } from "lucide-react";

import { PlaceCard } from "@/components/place-card";
import heroDawn from "@/assets/hero-dawn.jpg";
import {
  categories,
  destinations,
  destinationsByCategory,
  searchExamples,
  travelerDiscoveries,
} from "@/lib/destinations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Voyayaha — Discover Places That Mean Something" },
      {
        name: "description",
        content:
          "Find hidden places, spiritual journeys, mindful escapes and authentic village experiences — then save, experience and remember them your way.",
      },
      { property: "og:title", content: "Voyayaha — Discover Places That Mean Something" },
      {
        property: "og:description",
        content:
          "A travel discovery platform for hidden, spiritual, mindful, cultural and village places worth travelling slowly for.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function SectionHeading({
  eyebrow,
  title,
  blurb,
  to,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  blurb?: string;
  to?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <p className="eyebrow text-sunrise">{eyebrow}</p>
        <h2 className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl">{title}</h2>
        {blurb && <p className="mt-4 leading-relaxed text-foreground/75">{blurb}</p>}
      </div>
      {to && linkLabel && (
        <Link
          to={to}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3"
        >
          {linkLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const featured = destinations.filter((d) => d.featured).slice(0, 3);
  const spiritual = destinationsByCategory("spiritual-journeys").slice(0, 3);
  const mindful = destinationsByCategory("mindful-escapes").slice(0, 3);
  const village = destinationsByCategory("village-local").slice(0, 2);

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <img
          src={heroDawn}
          alt="A traveller on ancient stone steps facing a temple tower at sunrise"
          width={1920}
          height={1200}
          className="h-[82vh] min-h-[32rem] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone/90 via-stone/45 to-stone/25" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-5 pb-14 sm:px-8 sm:pb-20">
            <h1 className="max-w-3xl text-4xl leading-[1.05] text-stone-foreground sm:text-6xl lg:text-7xl">
              Discover places that mean something.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-foreground/90">
              Find hidden places, spiritual journeys, mindful escapes and authentic local
              experiences — then save, experience and remember them your way.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/discover", search: query ? { q: query } : {} });
              }}
              className="mt-8 max-w-2xl"
            >
              <label htmlFor="hero-search" className="sr-only">
                Where do you want to discover?
              </label>
              <div className="flex items-center gap-3 rounded-full border border-stone-foreground/25 bg-background/95 px-5 py-3">
                <Search className="size-5 text-muted-foreground" aria-hidden="true" />
                <input
                  id="hero-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Where do you want to discover?"
                  className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground"
                >
                  Search
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {searchExamples.slice(0, 4).map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() =>
                      navigate({ to: "/discover", search: { q: ex } })
                    }
                    className="rounded-full border border-stone-foreground/30 px-3 py-1.5 text-xs text-stone-foreground/90 hover:bg-stone-foreground/10"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </form>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/discover"
                className="rounded-full bg-sunrise px-6 py-3 text-sm font-semibold text-sunrise-foreground hover:opacity-90"
              >
                Explore Places
              </Link>
              <Link
                to="/my-voyayaha"
                className="rounded-full border border-stone-foreground/40 px-6 py-3 text-sm font-semibold text-stone-foreground hover:bg-stone-foreground/10"
              >
                Create My Voyayaha
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by meaning */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <SectionHeading
          eyebrow="Explore by meaning"
          title="Not by star rating. Not by package price."
          blurb="Five ways to travel with intent. Choose the feeling first, and the place will follow."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/${c.slug}`}
              className="group flex flex-col justify-between rounded-sm border border-border bg-card p-6 transition-colors hover:border-foreground/30"
            >
              <p className="font-display text-2xl text-foreground">{c.short}</p>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{c.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary group-hover:gap-3">
                {c.label}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured discoveries */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <SectionHeading
          eyebrow="Featured discoveries"
          title="Places our travelers keep returning to"
          to="/discover"
          linkLabel="See all places"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((place) => (
            <PlaceCard key={place.slug} place={place} />
          ))}
        </div>
      </section>

      {/* Go beyond the obvious */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-sunrise">Go beyond the obvious</p>
            <h2 className="mt-3 text-3xl leading-tight text-foreground sm:text-5xl">
              The best places rarely appear on the first page of a tourist list.
            </h2>
            <p className="mt-6 leading-relaxed text-foreground/75">
              Voyayaha is built for the traveler who wants the village behind the monument, the
              shrine that still holds silence, the trail that ends in nothing but light. We
              document places carefully — how to reach them, when to go, and what to respect when
              you arrive.
            </p>
            <Link
              to="/hidden-places"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3"
            >
              Start with hidden places
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <dl className="grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: Compass,
                title: "Documented, not listed",
                body: "Every place carries context: significance, season, access and local etiquette.",
              },
              {
                icon: MapPin,
                title: "Local first",
                body: "Experiences are hosted by people who live there, not by intermediaries.",
              },
              {
                icon: Bookmark,
                title: "Saved for later",
                body: "Keep a shortlist of places you intend to reach, not a browser full of tabs.",
              },
              {
                icon: Camera,
                title: "Remembered after",
                body: "Photos and notes you add become your own record of the journey.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-sm border border-border bg-card p-6">
                <item.icon className="size-5 text-sunrise" aria-hidden="true" />
                <dt className="mt-4 font-display text-xl text-foreground">{item.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Spiritual journeys */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <SectionHeading
          eyebrow="Spiritual journeys"
          title="Sacred places, walked slowly"
          blurb="Temples, pilgrimage circuits, ashrams and river ghats — approached with attention rather than as a checklist."
          to="/spiritual-journeys"
          linkLabel="All spiritual journeys"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {spiritual.map((place) => (
            <PlaceCard key={place.slug} place={place} />
          ))}
        </div>
      </section>

      {/* Mindful escapes */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionHeading
            eyebrow="Mindful escapes"
            title="Somewhere quiet, on purpose"
            blurb="Restorative places where the itinerary is deliberately thin."
            to="/mindful-escapes"
            linkLabel="All mindful escapes"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mindful.map((place) => (
              <PlaceCard key={place.slug} place={place} />
            ))}
          </div>
        </div>
      </section>

      {/* Village & local */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <SectionHeading
          eyebrow="Village & local"
          title="Travel that happens at someone's table"
          blurb="Crafts, kitchens, homestays and community experiences where the host is the destination."
          to="/village-local"
          linkLabel="All village experiences"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {village.map((place) => (
            <PlaceCard key={place.slug} place={place} size="large" />
          ))}
        </div>
      </section>

      {/* My Voyayaha */}
      <section className="bg-stone text-stone-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow text-sunrise">My Voyayaha</p>
            <h2 className="mt-3 text-3xl leading-tight sm:text-5xl">
              Mark where you've been. Save where you want to go. Remember what moved you.
            </h2>
            <p className="mt-6 leading-relaxed text-stone-foreground/80">
              Your own travel map, built one place at a time — the shrine you sat in for an hour,
              the village kitchen you keep talking about, the trail you still want to walk.
            </p>
            <Link
              to="/my-voyayaha"
              className="mt-8 inline-block rounded-full bg-sunrise px-6 py-3 text-sm font-semibold text-sunrise-foreground hover:opacity-90"
            >
              Create My Voyayaha
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Places I've visited", value: "Ticked off, with the date and the weather" },
              { label: "Places I want to visit", value: "A shortlist that survives the browser" },
              { label: "Places I've saved", value: "Collections by mood, region or season" },
              { label: "Memories", value: "Your notes and photos, kept beside the place" },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-sm border border-stone-foreground/15 bg-stone-foreground/5 p-6"
              >
                <p className="font-display text-xl">{card.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone-foreground/70">
                  {card.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traveler discoveries */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <SectionHeading
          eyebrow="Traveler discoveries"
          title="Recommended by people who went"
          blurb="Short notes left by travelers after their visit — the detail no guidebook prints."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {travelerDiscoveries.map((d) => (
            <figure
              key={`${d.slug}-${d.traveler}`}
              className="flex flex-col overflow-hidden rounded-sm border border-border bg-card"
            >
              <img
                src={d.image}
                alt={d.imageAlt}
                loading="lazy"
                width={1280}
                height={900}
                className="h-36 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <blockquote className="text-sm leading-relaxed text-foreground/85">
                  “{d.note}”
                </blockquote>
                <figcaption className="mt-4 text-xs text-muted-foreground">
                  {d.traveler} · {d.when}
                  <br />
                  <Link
                    to="/places/$slug"
                    params={{ slug: d.slug }}
                    className="text-primary hover:underline"
                  >
                    {d.place}
                  </Link>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-secondary/50">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
          <h2 className="text-3xl leading-tight text-foreground sm:text-5xl">
            Your next meaningful journey is waiting.
          </h2>
          <Link
            to="/discover"
            className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Start Discovering
          </Link>
        </div>
      </section>
    </div>
  );
}
