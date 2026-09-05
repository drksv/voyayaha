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
  const memoriesRef = useRef(memories);
  const selectRef = useRef(onLocationSelect);

  useEffect(() => { memoriesRef.current = memories; }, [memories]);
  useEffect(() => { selectRef.current = onLocationSelect; }, [onLocationSelect]);

  useEffect(() => {
    let cancelled = false;
    let resizeObserver: ResizeObserver | undefined;

    async function init() {
      if (!mapRef.current || leafletMapRef.current) return;
      const L = await loadLeaflet();
      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [20.5937, 78.9629],
        zoom: 5,
        preferCanvas: true,
      });
      leafletMapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);

      map.on("click", (event: any) => {
        selectRef.current?.({
          latitude: event.latlng.lat,
          longitude: event.latlng.lng,
        });
      });

      resizeObserver = new ResizeObserver(() => map.invalidateSize(true));
      resizeObserver.observe(mapRef.current);

      renderMarkers(L, map);
      requestAnimationFrame(() => map.invalidateSize(true));
      window.setTimeout(() => map.invalidateSize(true), 150);
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
  }, []);

  useEffect(() => {
    const map = leafletMapRef.current;
    const L = (window as any).L;
    if (!map || !L) return;
    renderMarkers(L, map);
  }, [memories]);

  useEffect(() => {
    const map = leafletMapRef.current;
    const L = (window as any).L;
    if (!map || !L || !selectedLocation) return;
    updateSelectionMarker(L, map, selectedLocation);
  }, [selectedLocation]);

  function renderMarkers(L: any, map: any) {
    const layer = markersLayerRef.current;
    if (!layer) return;
    layer.clearLayers();

    const valid = memoriesRef.current.filter(
      (memory) => Number.isFinite(memory.latitude) && Number.isFinite(memory.longitude),
    );

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
        .addTo(layer);
    });
  }

  function updateSelectionMarker(L: any, map: any, location: { latitude: number; longitude: number }) {
    selectionMarkerRef.current?.remove();
    selectionMarkerRef.current = L.marker([location.latitude, location.longitude])
      .addTo(map)
      .bindPopup("Your selected travel memory location")
      .openPopup();
    map.panTo([location.latitude, location.longitude]);
    requestAnimationFrame(() => map.invalidateSize(true));
  }

  return (
    <div
      ref={mapRef}
      className="w-full min-w-0 overflow-hidden rounded-sm border border-border bg-secondary"
      style={{ height: "600px", width: "100%", minHeight: "600px", minWidth: 0 }}
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
