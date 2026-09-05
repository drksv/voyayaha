import { useEffect, useRef } from "react";

export type TravelMemory = {
  id: string;
  title: string;
  location: string;
  latitude: number;
  longitude: number;
  date?: string;
  description?: string;
  image?: string;
};

export function TravelMemoriesMap({
  memories,
  selectedLocation,
  onLocationSelect,
}: {
  memories: TravelMemory[];
  selectedLocation?: { latitude: number; longitude: number } | null;
  onLocationSelect?: (location: { latitude: number; longitude: number }) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  const selectionMarkerRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    let resizeObserver: ResizeObserver | undefined;

    async function init() {
      if (!mapRef.current || leafletMapRef.current) return;
      const L = await loadLeaflet();
      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);
      leafletMapRef.current = map;
      markersLayerRef.current = L.layerGroup().addTo(map);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      if (onLocationSelect) {
        map.on("click", (event: any) => {
          onLocationSelect({ latitude: event.latlng.lat, longitude: event.latlng.lng });
        });
      }

      resizeObserver = new ResizeObserver(() => map.invalidateSize());
      resizeObserver.observe(mapRef.current);
      renderMarkers(L, map);
    }

    async function renderMarkers(L: any, map: any) {
      if (!markersLayerRef.current) return;
      markersLayerRef.current.clearLayers();
      const valid = memories.filter((memory) => Number.isFinite(memory.latitude) && Number.isFinite(memory.longitude));

      valid.forEach((memory) => {
        L.marker([memory.latitude, memory.longitude])
          .bindPopup(`
            <div style="max-width:260px">
              ${memory.image ? `<img src="${escapeHtml(memory.image)}" alt="" style="width:100%;height:128px;object-fit:cover;border-radius:6px;margin-bottom:10px" />` : ""}
              <strong>${escapeHtml(memory.title)}</strong>
              <div style="font-size:12px;margin-top:3px">${escapeHtml(memory.location)}</div>
              ${memory.date ? `<div style="font-size:11px;margin-top:3px;color:#666">${escapeHtml(memory.date)}</div>` : ""}
              ${memory.description ? `<div style="font-size:13px;margin-top:8px;line-height:1.4">${escapeHtml(stripHtml(memory.description))}</div>` : ""}
            </div>
          `)
          .addTo(markersLayerRef.current);
      });

      if (selectedLocation) updateSelectionMarker(L, map, selectedLocation);
    }

    function updateSelectionMarker(L: any, map: any, location: { latitude: number; longitude: number }) {
      selectionMarkerRef.current?.remove();
      selectionMarkerRef.current = L.marker([location.latitude, location.longitude]).addTo(map).bindPopup("Your selected travel memory location").openPopup();
    }

    init();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      leafletMapRef.current?.remove();
      leafletMapRef.current = null;
      markersLayerRef.current = null;
      selectionMarkerRef.current = null;
    };
  }, [memories, selectedLocation, onLocationSelect]);

  return (
    <div
      ref={mapRef}
      className="w-full overflow-hidden rounded-sm border border-border bg-secondary"
      style={{ height: "600px" }}
      aria-label="Voyayaha Travel Memories map"
    />
  );
}

function stripHtml(value: string) { return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(); }

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return entities[character];
  });
}

let leafletPromise: Promise<any> | null = null;
function loadLeaflet(): Promise<any> {
  if (leafletPromise) return leafletPromise;
  leafletPromise = new Promise((resolve, reject) => {
    const existing = (window as any).L;
    if (existing) return resolve(existing);
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => resolve((window as any).L);
    script.onerror = () => reject(new Error("Unable to load Leaflet"));
    document.head.appendChild(script);
  });
  return leafletPromise;
}
