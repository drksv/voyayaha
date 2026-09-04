import { useCallback, useEffect, useState } from "react";

export type PlaceState = "saved" | "visited";

type Store = {
  saved: string[];
  visited: string[];
  notes: Record<string, string>;
};

const KEY = "voyayaha:my";
const EVENT = "voyayaha:my-change";
const empty: Store = { saved: [], visited: [], notes: {} };

function read(): Store {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<Store>;
    return {
      saved: parsed.saved ?? [],
      visited: parsed.visited ?? [],
      notes: parsed.notes ?? {},
    };
  } catch {
    return empty;
  }
}

function write(next: Store) {
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVENT));
}

export function useMyVoyayaha() {
  const [store, setStore] = useState<Store>(empty);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const sync = () => setStore(read());
    sync();
    setHydrated(true);
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((slug: string, list: PlaceState) => {
    const current = read();
    const has = current[list].includes(slug);
    const next: Store = {
      ...current,
      [list]: has ? current[list].filter((s) => s !== slug) : [...current[list], slug],
    };
    if (list === "visited" && !has) {
      next.saved = next.saved.filter((s) => s !== slug);
    }
    write(next);
  }, []);

  const setNote = useCallback((slug: string, note: string) => {
    const current = read();
    const notes = { ...current.notes };
    if (note.trim()) notes[slug] = note.trim();
    else delete notes[slug];
    write({ ...current, notes });
  }, []);

  return {
    hydrated,
    saved: store.saved,
    visited: store.visited,
    notes: store.notes,
    isSaved: (slug: string) => store.saved.includes(slug),
    isVisited: (slug: string) => store.visited.includes(slug),
    toggle,
    setNote,
  };
}
