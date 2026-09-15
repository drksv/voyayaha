import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

type Trail = { id: number; name: string; lat: number; lon: number; coordinates: number[][] };

export function HikingTrailsMap({ trail }: { trail?: Trail }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    let observer: ResizeObserver | undefined;
    let timer: number | undefined;

    async function init() {
      if (!containerRef.current || mapRef.current) return;
      const mod = await import("leaflet");
      const L = mod.default;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      if (cancelled || !containerRef.current) return;
      const map = L.map(containerRef.current, { zoomControl: true, preferCanvas: true });
      mapRef.current = map;
      layerRef.current = L.layerGroup().addTo(map);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap contributors" }).addTo(map);
      observer = new ResizeObserver(() => map.invalidateSize({ animate: false }));
      observer.observe(containerRef.current);
      draw(L, map);
      timer = window.setTimeout(() => map.invalidateSize({ animate: false }), 50);
    }

    function draw(L: any, map: any) {
      if (!layerRef.current) return;
      layerRef.current.clearLayers();
      if (!trail) { map.setView([20.5937, 78.9629], 5); return; }
      const coords = trail.coordinates?.length ? trail.coordinates : [[trail.lat, trail.lon]];
      const line = L.polyline(coords, { weight: 5 }).addTo(layerRef.current);
      L.marker([trail.lat, trail.lon]).bindPopup(`<strong>${escapeHtml(trail.name)}</strong>`).addTo(layerRef.current);
      const bounds = line.getBounds();
      if (bounds.isValid()) map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
      else map.setView([trail.lat, trail.lon], 13);
    }

    void init();
    return () => { cancelled = true; if (timer) window.clearTimeout(timer); observer?.disconnect(); mapRef.current?.remove(); mapRef.current = null; layerRef.current = null; };
  }, [trail]);

  return <div ref={containerRef} className="leaflet-host h-[520px] min-h-[420px] w-full" aria-label="Hiking trail map" />;
}
function escapeHtml(value: string) { return value.replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[c] ?? c)); }
