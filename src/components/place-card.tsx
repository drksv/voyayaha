import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, MapPin } from "lucide-react";

import { getCategory, type Destination } from "@/lib/destinations";
import { useMyVoyayaha } from "@/lib/my-voyayaha";

export function SaveButton({
  slug,
  label = true,
  className = "",
}: {
  slug: string;
  label?: boolean;
  className?: string;
}) {
  const { isSaved, toggle, hydrated } = useMyVoyayaha();
  const saved = hydrated && isSaved(slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug, "saved");
      }}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved places" : "Save this place"}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
        saved
          ? "border-sunrise bg-sunrise text-sunrise-foreground"
          : "border-border bg-card/90 text-foreground hover:border-foreground/40"
      } ${className}`}
    >
      {saved ? <BookmarkCheck className="size-3.5" /> : <Bookmark className="size-3.5" />}
      {label && (saved ? "Saved" : "Save")}
    </button>
  );
}

export function PlaceCard({
  place,
  size = "default",
}: {
  place: Destination;
  size?: "default" | "large";
}) {
  const category = getCategory(place.category);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card">
      <Link
        to="/places/$slug"
        params={{ slug: place.slug }}
        className="block overflow-hidden"
        aria-label={place.name}
      >
        <img
          src={place.image}
          alt={place.imageAlt}
          loading="lazy"
          width={1280}
          height={900}
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
            size === "large" ? "h-72 sm:h-96" : "h-56"
          }`}
        />
      </Link>
      <div className="absolute top-3 right-3">
        <SaveButton slug={place.slug} label={false} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-sunrise">{category.label}</p>
        <h3 className={`mt-2 ${size === "large" ? "text-2xl" : "text-xl"} text-foreground`}>
          <Link to="/places/$slug" params={{ slug: place.slug }}>
            {place.name}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5" aria-hidden="true" />
          {place.location}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-foreground/75">{place.summary}</p>
        <Link
          to="/places/$slug"
          params={{ slug: place.slug }}
          className="mt-4 inline-block text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
        >
          Read the place
        </Link>
      </div>
    </article>
  );
}
