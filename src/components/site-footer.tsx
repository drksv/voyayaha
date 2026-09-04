import { Link } from "@tanstack/react-router";

import { categories } from "@/lib/destinations";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl text-foreground">Voyayaha</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Discover places that mean something. Find hidden places, spiritual journeys, mindful
            escapes and authentic local experiences — then save, experience and remember them your
            way.
          </p>
        </div>
        <div>
          <h2 className="eyebrow text-muted-foreground">Explore by meaning</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/${c.slug}`}
                  className="text-foreground/80 transition-colors hover:text-foreground"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow text-muted-foreground">Your travel</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                to="/my-voyayaha"
                className="text-foreground/80 transition-colors hover:text-foreground"
              >
                My Voyayaha
              </Link>
            </li>
            <li>
              <Link
                to="/discover"
                className="text-foreground/80 transition-colors hover:text-foreground"
              >
                All places
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="hairline">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-muted-foreground sm:px-8">
          © {new Date().getFullYear()} Voyayaha. Travel slowly, and leave places better.
        </p>
      </div>
    </footer>
  );
}
