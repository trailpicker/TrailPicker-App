"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CircleMarker, MapContainer, TileLayer, Tooltip, useMap } from "react-leaflet";
import type { Destination } from "@/lib/destinations";
import { validCoordinates } from "@/lib/destination-detail";
import { LocateFixed } from "lucide-react";
import "leaflet/dist/leaflet.css";

type MapPoint = { id: string; name: string; latitude: number; longitude: number; difficulty: Destination["difficulty"] };

function fitPoints(map: ReturnType<typeof useMap>, points: MapPoint[]) {
  if (!points.length) return;
  if (points.length === 1) map.setView([points[0].latitude, points[0].longitude], 12, { animate: false });
  else map.fitBounds(points.map(p => [p.latitude, p.longitude] as [number, number]), {
    padding: [35, 35], maxZoom: 11, animate: false,
  });
}

function MapBehavior({ points, selectedId }: { points: MapPoint[]; selectedId: string | null }) {
  const map = useMap();
  const key = useMemo(() => points.map(p => p.id).join("|"), [points]);
  const initialized = useRef(false);
  useEffect(() => {
    // Fit the FILTERED markers on mount and whenever the results change.
    fitPoints(map, points);
    initialized.current = true;
  }, [map, key, points]);
  useEffect(() => {
    if (!initialized.current || !selectedId) return;
    const selected = points.find(p => p.id === selectedId);
    if (selected) map.panTo([selected.latitude, selected.longitude], { animate: true });
  }, [map, points, selectedId]);
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => map.invalidateSize({ pan: false }));
    });
    observer.observe(map.getContainer());
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [map]);
  return null;
}

/** Page scrolls normally. Ctrl+wheel zooms under the pointer. */
function CtrlWheelZoom() {
  const map = useMap();
  const accumulated = useRef(0);
  useEffect(() => {
    const container = map.getContainer();
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey) { accumulated.current = 0; return; }
      event.preventDefault();
      event.stopPropagation();
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? container.clientHeight : 1);
      accumulated.current += delta;
      if (Math.abs(accumulated.current) < 60) return;
      const steps = Math.trunc(accumulated.current / 100) || Math.sign(accumulated.current);
      accumulated.current -= steps * 100;
      const zoom = Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), map.getZoom() - steps));
      if (zoom !== map.getZoom()) map.setZoomAround(map.mouseEventToContainerPoint(event), zoom, { animate: false });
    };
    container.addEventListener("wheel", onWheel, { capture: true, passive: false });
    return () => container.removeEventListener("wheel", onWheel, true);
  }, [map]);
  return <span className="pointer-events-none absolute bottom-4 left-3 z-[800] rounded-lg bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-slate-600 shadow-sm">Ctrl + scroll to zoom</span>;
}

function FitControl({points}: {points: MapPoint[]}) {
  const map = useMap();
  return <div className="absolute right-3 top-3 z-[800]">
    <button type="button" onClick={() => fitPoints(map, points)} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-900">
      <LocateFixed size={15} aria-hidden="true" /> Fit all
    </button>
  </div>;
}

export default function DiscoverSearchMapInner({
  destinations, selectedId, onSelect,
}: {
  destinations: Destination[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const [tileFailure, setTileFailure] = useState(false);
  const points = useMemo<MapPoint[]>(() => destinations.flatMap(destination => {
    const coordinates = validCoordinates(destination);
    return coordinates ? [{
      id: destination.id, name: destination.name,
      latitude: coordinates.latitude, longitude: coordinates.longitude,
      difficulty: destination.difficulty,
    }] : [];
  }), [destinations]);
  const selected = points.find(point => point.id === selectedId) ?? null;
  const externalPoint = selected ?? points[0];
  const external = externalPoint
    ? `https://www.openstreetmap.org/?mlat=${externalPoint.latitude}&mlon=${externalPoint.longitude}#map=12/${externalPoint.latitude}/${externalPoint.longitude}`
    : "https://www.openstreetmap.org/";

  if (!points.length) return <div className="flex h-[380px] items-center justify-center bg-slate-100 p-6 text-center text-sm text-slate-600">These filtered destinations have no verified map coordinates.</div>;

  return <div className="relative isolate">
    <MapContainer center={[points[0].latitude, points[0].longitude]} zoom={10} scrollWheelZoom={false}
      className="relative z-0 h-[380px] w-full sm:h-[500px] lg:h-[560px]" aria-label="Map of filtered BC destinations">
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        referrerPolicy="origin"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        eventHandlers={{ tileerror: () => setTileFailure(true) }}
      />
      <MapBehavior points={points} selectedId={selectedId} />
      <CtrlWheelZoom />
      <FitControl points={points} />
      {points.map(point => <CircleMarker
        key={point.id} center={[point.latitude, point.longitude]}
        radius={selectedId === point.id ? 13 : 10}
        pathOptions={{ color: "#ffffff", weight: selectedId === point.id ? 3 : 2, fillColor: selectedId === point.id ? "#047857" : "#14532d", fillOpacity: 1 }}
        eventHandlers={{ click: () => onSelect(point.id) }}
      >
        <Tooltip direction="top" offset={[0,-7]}>{point.name}</Tooltip>
      </CircleMarker>)}
    </MapContainer>
    <a href={external} target="_blank" rel="noopener noreferrer" className="absolute right-3 top-14 z-[800] rounded-lg border border-slate-200 bg-white/95 px-3 py-2 text-xs font-semibold text-green-900 shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-900">Open in OSM ↗</a>
    {tileFailure && <div role="status" className="absolute inset-x-3 top-24 z-[900] rounded-xl border border-amber-200 bg-white/95 p-3 text-xs leading-5 text-slate-700 shadow-md">
      OpenStreetMap tiles could not load. Destination results remain available in the list. <a className="font-bold text-green-900 underline" href={external} target="_blank" rel="noopener noreferrer">Open map externally</a>.
    </div>}
  </div>;
}
