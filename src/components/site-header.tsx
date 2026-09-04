import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";

import { categories } from "@/lib/destinations";
import { useMyVoyayaha } from "@/lib/my-voyayaha";

const navLinks = [
  { to: "/discover", label: "Discover" },
  ...categories.map((c) => ({ to: `/${c.slug}` as const, label: c.label })),
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { saved, visited, hydrated } = useMyVoyayaha();
  const count = saved.length + visited.length;

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({ to: "/discover", search: query ? { q: query } : {} });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 sm:px-8">
        <Link to="/" className="mr-auto flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight text-foreground">Voyayaha</span>
          <span className="hidden text-[0.68rem] tracking-[0.2em] text-muted-foreground uppercase sm:inline">
            Discover
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen((o) => !o)}
            aria-label="Search places"
            aria-expanded={searchOpen}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Search className="size-4" />
          </button>
          <Link
            to="/my-voyayaha"
            className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-secondary sm:inline-flex"
          >
            My Voyayaha
            {hydrated && count > 0 && (
              <span className="rounded-full bg-sunrise px-1.5 text-[0.68rem] font-bold text-sunrise-foreground">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/discover"
            className="hidden rounded-full bg-primary px-4 py-1.5 text-sm text-primary-foreground transition-opacity hover:opacity-90 md:inline-block"
          >
            Explore
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="rounded-full p-2 text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-card">
          <form onSubmit={submitSearch} className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
            <label htmlFor="header-search" className="sr-only">
              Where do you want to discover?
            </label>
            <div className="flex items-center gap-3 border-b border-border pb-2">
              <Search className="size-4 text-muted-foreground" />
              <input
                id="header-search"
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Where do you want to discover?"
                className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" className="text-sm font-semibold text-sunrise">
                Search
              </button>
            </div>
          </form>
        </div>
      )}

      {menuOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-2 sm:px-8" aria-label="Mobile">
            {[...navLinks, { to: "/my-voyayaha" as const, label: "My Voyayaha" }].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border/60 py-3 text-base text-foreground last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
