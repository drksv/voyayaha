import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

import { PlaceCard } from "@/components/place-card";
import { destinations, getDestination, type Destination } from "@/lib/destinations";
import { useMyVoyayaha } from "@/lib/my-voyayaha";

export const Route = createFileRoute("/my-voyayaha")({
  head: () => ({
    meta: [
      { title: "My Voyayaha — Your Personal Travel Map | Voyayaha" },
      {
        name: "description",
        content:
          "Mark where you've been. Save where you want to go. Remember what moved you. Your personal map of meaningful places.",
      },
      { property: "og:title", content: "My Voyayaha — Your Personal Travel Map" },
      {
        property: "og:description",
        content:
          "Mark where you've been, save where you want to go, and keep the memories that moved you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MyVoyayahaPage,
});

function resolve(slugs: string[]): Destination[] {
  return slugs.map((s) => getDestination(s)).filter((d): d is Destination => Boolean(d));
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-sm border border-border bg-card p-6">
      <p className="font-display text-4xl text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function MyVoyayahaPage() {
  const { saved, visited, notes, hydrated } = useMyVoyayaha();
  const savedPlaces = resolve(saved);
  const visitedPlaces = resolve(visited);
  const noteEntries = Object.entries(notes);
  const regions = new Set(visitedPlaces.map((p) => p.region));

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <header className="max-w-3xl">
        <p className="eyebrow text-sunrise">My Voyayaha</p>
        <h1 className="mt-3 text-4xl leading-tight text-foreground sm:text-6xl">
          Mark where you've been. Save where you want to go. Remember what moved you.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/75">
          Your personal map of meaningful places. Everything you save here stays on this device for
          now — accounts and a shared travel map arrive with the next release.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-4">
        <Stat value={hydrated ? visitedPlaces.length : 0} label="Places visited" />
        <Stat value={hydrated ? savedPlaces.length : 0} label="Places to go" />
        <Stat value={hydrated ? noteEntries.length : 0} label="Memories written" />
        <Stat value={hydrated ? regions.size : 0} label="Regions travelled" />
      </div>

      <section className="mt-16">
        <h2 className="text-2xl text-foreground sm:text-3xl">My travel map</h2>
        <div className="mt-4 rounded-sm border border-border bg-secondary/40 p-6 sm:p-8">
          <p className="text-sm text-muted-foreground">
            A geographic map view is coming. For now, here's your travel by region.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from(new Set(destinations.map((d) => d.region))).map((region) => {
              const been = visitedPlaces.filter((p) => p.region === region).length;
              const want = savedPlaces.filter((p) => p.region === region).length;
              return (
                <div key={region} className="rounded-sm border border-border bg-card p-5">
                  <p className="flex items-center gap-2 font-display text-lg text-foreground">
                    <MapPin className="size-4 text-sunrise" aria-hidden="true" />
                    {region}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {been} visited · {want} saved
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl text-foreground sm:text-3xl">Places I want to visit</h2>
        {hydrated && savedPlaces.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedPlaces.map((p) => (
              <PlaceCard key={p.slug} place={p} />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-sm border border-dashed border-border p-8">
            <p className="text-foreground/75">
              Nothing saved yet. Tap the bookmark on any place to keep it here.
            </p>
            <Link
              to="/discover"
              className="mt-5 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Start discovering
            </Link>
          </div>
        )}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl text-foreground sm:text-3xl">Places I've visited</h2>
        {hydrated && visitedPlaces.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visitedPlaces.map((p) => (
              <PlaceCard key={p.slug} place={p} />
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-sm border border-dashed border-border p-8 text-foreground/75">
            Mark a place as “I've been here” on any place page and it will appear here.
          </p>
        )}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl text-foreground sm:text-3xl">My memories</h2>
        {hydrated && noteEntries.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {noteEntries.map(([slug, note]) => {
              const place = getDestination(slug);
              return (
                <figure key={slug} className="rounded-sm border border-border bg-card p-6">
                  <blockquote className="text-lg leading-relaxed text-foreground/85">
                    “{note}”
                  </blockquote>
                  <figcaption className="mt-4 text-xs text-muted-foreground">
                    {place ? (
                      <Link to="/places/$slug" params={{ slug }} className="hover:text-foreground">
                        {place.name}
                      </Link>
                    ) : (
                      slug
                    )}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        ) : (
          <p className="mt-4 rounded-sm border border-dashed border-border p-8 text-foreground/75">
            Write a memory on any place page and it will be collected here as your travel journal.
          </p>
        )}
      </section>
    </div>
  );
}
