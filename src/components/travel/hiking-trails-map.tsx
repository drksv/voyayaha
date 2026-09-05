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

  useEffect(() => {
    let cancelled = false;
    async function init() {
      if (!ref.current || mapRef.current) return;
      const L = await loadLeaflet();
      if (cancelled || !ref.current) return;
      const map = L.map(ref.current).setView(trail ? [trail.lat, trail.lon] : [20.5937, 78.9629], trail ? 12 : 5);
      mapRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap contributors" }).addTo(map);
      layerRef.current = L.layerGroup().addTo(map);
      draw(L, map);
    }
    function draw(L: any, map: any) {
      if (!layerRef.current) return;
      layerRef.current.clearLayers();
      if (!trail) return;
      const coords = trail.coordinates?.length ? trail.coordinates : [[trail.lat, trail.lon]];
      const line = L.polyline(coords, { weight: 5 }).addTo(layerRef.current);
      L.marker([trail.lat, trail.lon]).bindPopup(`<strong>${escapeHtml(trail.name)}</strong>`).addTo(layerRef.current);
      map.fitBounds(line.getBounds(), { padding: [25, 25] });
    }
    init();
    return () => { cancelled = true; mapRef.current?.remove(); mapRef.current = null; layerRef.current = null; };
  }, [trail]);

  return <div ref={ref} className="h-[520px] w-full" aria-label="Hiking trail map" />;
}

function escapeHtml(value: string) { return value.replace(/[&<>"']/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[c] ?? c)); }
let promise: Promise<any> | null = null;
function loadLeaflet() {
  if (promise) return promise;
  promise = new Promise((resolve, reject) => {
    if ((window as any).L) return resolve((window as any).L);
    const script = document.createElement("script"); script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"; script.async = true;
    script.onload = () => resolve((window as any).L); script.onerror = reject; document.head.appendChild(script);
  });
  return promise;
}
