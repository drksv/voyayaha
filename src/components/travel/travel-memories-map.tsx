import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export type TravelMemory = { id: string; title: string; location: string; latitude: number; longitude: number; date?: string; description?: string; image?: string };

export function TravelMemoriesMap({ memories, selectedLocation, onLocationSelect }: { memories: TravelMemory[]; selectedLocation?: { latitude: number; longitude: number } | null; onLocationSelect?: (location: { latitude: number; longitude: number }) => void; }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any>(null);
  const selectedMarkerRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    let observer: ResizeObserver | undefined;
    let timer: number | undefined;
    let clickHandler: ((e: any) => void) | undefined;

    async function init() {
      if (!ref.current || mapRef.current) return;
      const mod = await import("leaflet");
      const L = mod.default;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      if (cancelled || !ref.current) return;
      const map = L.map(ref.current, { zoomControl: true, preferCanvas: true }).setView([20.5937, 78.9629], 5);
      mapRef.current = map;
      markersRef.current = L.layerGroup().addTo(map);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap contributors" }).addTo(map);
      if (onLocationSelect) {
        clickHandler = (event: any) => onLocationSelect({ latitude: event.latlng.lat, longitude: event.latlng.lng });
        map.on("click", clickHandler);
      }
      observer = new ResizeObserver(() => map.invalidateSize({ animate: false }));
      observer.observe(ref.current);
      renderMarkers(L, map);
      timer = window.setTimeout(() => map.invalidateSize({ animate: false }), 50);
    }

    function renderMarkers(L: any, map: any) {
      if (!markersRef.current) return;
      markersRef.current.clearLayers();
      const valid = memories.filter(m => Number.isFinite(m.latitude) && Number.isFinite(m.longitude));
      valid.forEach(memory => {
        const popup = `<div style="max-width:260px">${memory.image ? `<img src="${escapeHtml(memory.image)}" alt="" style="width:100%;height:128px;object-fit:cover;border-radius:6px;margin-bottom:10px" />` : ""}<strong>${escapeHtml(memory.title)}</strong><div style="font-size:12px;margin-top:3px">${escapeHtml(memory.location)}</div>${memory.date ? `<div style="font-size:11px;margin-top:3px;color:#666">${escapeHtml(memory.date)}</div>` : ""}${memory.description ? `<div style="font-size:13px;margin-top:8px;line-height:1.4">${escapeHtml(stripHtml(memory.description))}</div>` : ""}</div>`;
        L.marker([memory.latitude, memory.longitude]).bindPopup(popup).addTo(markersRef.current);
      });
      if (selectedLocation && Number.isFinite(selectedLocation.latitude) && Number.isFinite(selectedLocation.longitude)) {
        selectedMarkerRef.current?.remove();
        selectedMarkerRef.current = L.marker([selectedLocation.latitude, selectedLocation.longitude]).addTo(map).bindPopup("Your selected travel memory location");
        map.setView([selectedLocation.latitude, selectedLocation.longitude], Math.max(map.getZoom(), 8));
      }
      if (!valid.length && !selectedLocation) map.setView([20.5937, 78.9629], 5);
    }

    void init();
    return () => { cancelled = true; if (timer) window.clearTimeout(timer); observer?.disconnect(); if (mapRef.current && clickHandler) mapRef.current.off("click", clickHandler); mapRef.current?.remove(); mapRef.current = null; markersRef.current = null; selectedMarkerRef.current = null; };
  }, [memories, selectedLocation, onLocationSelect]);

  return <div ref={ref} className="leaflet-host h-[600px] min-h-[420px] w-full" aria-label="Voyayaha Travel Memories map" />;
}
function stripHtml(value: string) { return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(); }
function escapeHtml(value: string) { return value.replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[c] ?? c)); }
