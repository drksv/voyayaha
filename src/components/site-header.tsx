import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Menu, Search, X } from "lucide-react";
import { useMyVoyayaha } from "@/lib/my-voyayaha";
import trails from "@/data/hiking-trails.json";
import { sacredIndia } from "@/data/sacred-india";
import voyayahaLogo from "@/assets/voyayaha-logo.jpeg";

const navLinks = [
  { to: "/village-local", label: "Village & Local" },
  { to: "/hidden-places", label: "Hidden Places" },
  { to: "/discover", label: "Explore" },
  { to: "/spiritual-journeys", label: "Spiritual Journeys" },
  { to: "/my-voyayaha", label: "My Voyayaha" },
] as const;

function searchDestination(query: string) {
  const q = query.toLowerCase().trim();
  const sacredMatch = sacredIndia.some(site => `${site.name} ${site.city} ${site.state} ${site.religion} ${site.circuits.join(" ")}`.toLowerCase().includes(q));
  const hikingMatch = trails.some(trail => `${trail.name} ${trail.city}`.toLowerCase().includes(q));
  if (sacredMatch || /\btemple|pilgrim|pilgrimage|sacred|spiritual|shrine|jyotirling|shakti|char dham|dham|gurdwara|sikh|buddhist|buddha|jain|dargah|sufi|church|christian\b/.test(q)) return "/spiritual-journeys" as const;
  if (hikingMatch || /\bhike|hiking|trail|trek|trekking|mountain|walk|climb\b/.test(q)) return "/hidden-places" as const;
  if (/\bvillage|rural|local|craft|artisan|homestay|farm|handicraft|kitchen\b/.test(q)) return "/village-local" as const;
  return "/discover" as const;
}

function cleanSearchQuery(query: string) {
  return query.replace(/^(village tourism|village|local experiences|hiking trails|hiking|trail|trekking|travel intel|travel information|sacred india|sacred|pilgrimage|pilgrim|temple|shrine|spiritual)\s*[:,-]?\s*/i, "").trim() || query.trim();
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { saved, visited, hydrated } = useMyVoyayaha();
  const count = saved.length + visited.length;

  useEffect(() => { if (searchOpen) inputRef.current?.focus(); }, [searchOpen]);

  function submitSearch(e: FormEvent) {
    e.preventDefault();
    const value = query.trim();
    if (!value) return;
    const target = searchDestination(value);
    const searchValue = cleanSearchQuery(value);
    setSearchOpen(false); setMenuOpen(false);
    navigate({ to: target, search: { q: searchValue } as any });
  }

  return <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
    <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 sm:px-8">
      <Link to="/" aria-label="Voyayaha home" className="mr-auto flex items-center">
        <img src={voyayahaLogo} alt="Voyayaha — Discover Beyond the Usual" className="h-12 w-[120px] object-contain sm:h-14 sm:w-[140px]" />
      </Link>
      <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">{navLinks.map(link => <Link key={link.to} to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>{link.label}</Link>)}</nav>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => setSearchOpen(o => !o)} aria-label="Search places" aria-expanded={searchOpen} className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"><Search className="size-4" /></button>
        <Link to="/my-voyayaha" className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-foreground hover:bg-secondary sm:inline-flex">My Voyayaha{hydrated && count > 0 && <span className="rounded-full bg-sunrise px-1.5 text-[0.68rem] font-bold text-sunrise-foreground">{count}</span>}</Link>
        <Link to="/discover" className="hidden rounded-full bg-primary px-4 py-1.5 text-sm text-primary-foreground hover:opacity-90 md:inline-block">Explore</Link>
        <button type="button" onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? "Close menu" : "Open menu"} className="rounded-full p-2 text-foreground hover:bg-secondary lg:hidden">{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
      </div>
    </div>
    {searchOpen && <div className="border-t border-border bg-card"><form onSubmit={submitSearch} className="mx-auto max-w-7xl px-5 py-4 sm:px-8"><div className="flex items-center gap-3 border-b border-border pb-2"><Search className="size-4 text-muted-foreground" /><input id="header-search" ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search a place, trail, village or pilgrimage" className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground" /><button type="submit" className="text-sm font-semibold text-sunrise">Search</button></div></form></div>}
    {menuOpen && <div className="border-t border-border bg-card"><nav className="mx-auto flex max-w-7xl flex-col px-5 py-2 sm:px-8" aria-label="Mobile">{navLinks.map(link => <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="border-b border-border/60 py-3 text-base text-foreground last:border-0">{link.label}</Link>)}</nav></div>}
  </header>;
}
