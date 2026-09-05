import { useEffect, useRef } from "react";

type Trail = {
  id: number;
  name: string;
  lat: number;
  lon: number;
  coordinates: number[][];
};

export function HikingTrailsMap({ trail }: { trail?: Trail }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const trailRef = useRef<Trail | undefined>(trail);

  useEffect(() => {
    trailRef.current = trail;
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;
    draw((window as any).L, map, layer, trail);
    requestAnimationFrame(() => map.invalidateSize(true));
    const timer = window.setTimeout(() => map.invalidateSize(true), 150);
    return () => window.clearTimeout(timer);
  }, [trail]);

  useEffect(() => {
    let cancelled = false;
    let observer: ResizeObserver | undefined;

    async function init() {
      if (!ref.current || mapRef.current) return;
      const L = await loadLeaflet();
      if (cancelled || !ref.current) return;

      const map = L.map(ref.current, {
        center: trailRef.current ? [trailRef.current.lat, trailRef.current.lon] : [20.5937, 78.9629],
        zoom: trailRef.current ? 12 : 5,
        preferCanvas: true,
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const layer = L.layerGroup().addTo(map);
      layerRef.current = layer;
      draw(L, map, layer, trailRef.current);

      observer = new ResizeObserver(() => map.invalidateSize(true));
      observer.observe(ref.current);

      requestAnimationFrame(() => map.invalidateSize(true));
      window.setTimeout(() => map.invalidateSize(true), 200);
    }

    init();
    return () => {
      cancelled = true;
      observer?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  return (
    <div
      ref={ref}
      className="h-[600px] min-h-[600px] w-full"
      style={{ height: "600px", width: "100%", minWidth: 0 }}
      aria-label="Hiking trail map"
    />
  );
}

function draw(L: any, map: any, layer: any, trail?: Trail) {
  layer.clearLayers();
  if (!trail) return;

  const coords = trail.coordinates?.length ? trail.coordinates : [[trail.lat, trail.lon]];
  const line = L.polyline(coords, { weight: 5 });
  line.addTo(layer);

  L.marker([trail.lat, trail.lon])
    .bindPopup(`<strong>${escapeHtml(trail.name)}</strong>`)
    .addTo(layer);

  if (coords.length > 1) {
    map.fitBounds(line.getBounds(), { padding: [30, 30], maxZoom: 15 });
  } else {
    map.setView([trail.lat, trail.lon], 14);
  }
  requestAnimationFrame(() => map.invalidateSize(true));
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[c] ?? c));
}

let promise: Promise<any> | null = null;
function loadLeaflet() {
  if (promise) return promise;
  promise = new Promise((resolve, reject) => {
    if ((window as any).L) return resolve((window as any).L);
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => resolve((window as any).L);
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return promise;
}
