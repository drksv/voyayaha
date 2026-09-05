import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { useMyVoyayaha } from "@/lib/my-voyayaha";

type NavItem = { to: string; label: string };

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Village & Local",
    items: [
      { to: "/village-local", label: "Village & Local" },
      { to: "/village-tourism", label: "Village Tourism" },
    ],
  },
  {
    label: "Hidden Places",
    items: [
      { to: "/hidden-places", label: "Hidden Places" },
      { to: "/hiking-trails", label: "Hiking Trails" },
    ],
  },
  {
    label: "Explore",
    items: [
      { to: "/discover", label: "Discover" },
      { to: "/travel-intel", label: "Travel Intel" },
      { to: "/mindful-escapes", label: "Mindful Escapes" },
      { to: "/heritage", label: "Heritage" },
    ],
  },
  {
    label: "Spiritual Journeys",
    items: [
      { to: "/spiritual-journeys", label: "Spiritual Journeys" },
      { to: "/sacred-india", label: "Sacred India" },
    ],
  },
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
    const value = query.trim();
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({ to: "/discover", search: value ? { q: value } : {} });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-3 px-5 sm:px-8">
        <Link to="/" className="mr-auto flex items-baseline gap-2 shrink-0">
          <span className="font-display text-2xl tracking-tight text-foreground">Voyayaha</span>
          <span className="hidden text-[0.68rem] tracking-[0.2em] text-muted-foreground uppercase xl:inline">Discover</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navGroups.map((group) => (
            <details key={group.label} className="group relative">
              <summary className="cursor-pointer list-none rounded-full px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
                {group.label}
              </summary>
              <div className="absolute right-0 top-full z-50 mt-1 min-w-48 rounded-sm border border-border bg-card p-1 shadow-lg">
                {group.items.map((item) => (
                  <Link key={item.to} to={item.to as any}
                    className="block rounded-sm px-4 py-2.5 text-sm text-foreground hover:bg-secondary">
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
          <Link to="/travel-memories"
            className="rounded-full px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
            My Voyayaha
            {hydrated && count > 0 && <span className="ml-1.5 rounded-full bg-sunrise px-1.5 text-[0.68rem] font-bold text-sunrise-foreground">{count}</span>}
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setSearchOpen((o) => !o)} aria-label="Search places"
            aria-expanded={searchOpen} className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Search className="size-4" />
          </button>
          <button type="button" onClick={() => setMenuOpen((o) => !o)} aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="rounded-full p-2 text-foreground hover:bg-secondary lg:hidden">
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-card">
          <form onSubmit={submitSearch} className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
            <label htmlFor="header-search" className="sr-only">Where do you want to discover?</label>
            <div className="flex items-center gap-3 border-b border-border pb-2">
              <Search className="size-4 text-muted-foreground" />
              <input id="header-search" ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a place, village, trail or pilgrimage site"
                className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground" />
              <button type="submit" className="text-sm font-semibold text-sunrise">Search</button>
            </div>
          </form>
        </div>
      )}

      {menuOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-2 sm:px-8" aria-label="Mobile">
            {navGroups.map((group) => (
              <div key={group.label} className="border-b border-border/60 py-2">
                <p className="px-1 py-2 text-sm font-semibold text-foreground">{group.label}</p>
                {group.items.map((item) => (
                  <Link key={item.to} to={item.to as any} onClick={() => setMenuOpen(false)}
                    className="block py-2 text-sm text-muted-foreground">
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link to="/travel-memories" onClick={() => setMenuOpen(false)}
              className="py-3 text-base font-semibold text-foreground">
              My Voyayaha
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
