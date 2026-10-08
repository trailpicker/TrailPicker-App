"use client";
import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from "react-leaflet";
import { divIcon, DomEvent, type Marker as LeafletMarker } from "leaflet";
import { LocateFixed } from "lucide-react";
import type { Waypoint } from "@/lib/trip-planner";
import { waypointMarkerHtml, waypointType } from "@/lib/waypoint-map";
import "leaflet/dist/leaflet.css";

export type MapFocus = { lat: number; lng: number; request: number };
type Props = {
  points: Waypoint[];
  fallback: [number, number] | null;
  onPick?: (lat: number, lng: number) => void;
  onSelect?: (id: string) => void;
  onMove?: (id: string, lat: number, lng: number) => void;
  selectedId?: string | null;
  focus?: MapFocus | null;
};

function Controls({ points, onPick, focus }: Pick<Props, "points" | "onPick" | "focus">) {
  const map = useMap();
  const initialized = useRef(false);
  useMapEvents({ click(event) { onPick?.(event.latlng.lat, event.latlng.lng); } });
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    if (points.length > 1) map.fitBounds(points.map(p => [p.lat, p.lng]), { padding: [44, 44], maxZoom: 14 });
    else if (points.length === 1) map.setView([points[0].lat, points[0].lng], 13);
  }, [map, points]);
  useEffect(() => {
    if (focus) map.setView([focus.lat, focus.lng], Math.max(map.getZoom(), 14));
  }, [map, focus]);
  useEffect(() => {
    const container = map.getContainer();
    const previous = container.style.cursor;
    container.style.cursor = onPick ? "crosshair" : "";
    return () => { container.style.cursor = previous; };
  }, [map, onPick]);
  return null;
}

function FitRoute({ points, fallback }: Pick<Props, "points" | "fallback">) {
  const map = useMap();
  const toolbar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (toolbar.current) { DomEvent.disableClickPropagation(toolbar.current); DomEvent.disableScrollPropagation(toolbar.current); }
  }, []);
  function fit() {
    if (points.length > 1) map.fitBounds(points.map(p => [p.lat, p.lng]), { padding: [44, 44], maxZoom: 14 });
    else if (points.length === 1) map.setView([points[0].lat, points[0].lng], 14);
    else if (fallback) map.setView(fallback, 12);
  }
  return <div ref={toolbar} className="absolute right-3 top-3 z-[1000]">
    <button type="button" onClick={fit} disabled={!points.length && !fallback} className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50">
      <LocateFixed className="h-4 w-4" aria-hidden="true" />Fit route
    </button>
  </div>;
}

function StopMarker({ point, order, selected, onSelect, onMove }: {
  point: Waypoint; order: number; selected: boolean;
  onSelect?: (id: string) => void; onMove?: (id: string, lat: number, lng: number) => void;
}) {
  const marker = useRef<LeafletMarker | null>(null);
  const icon = useMemo(() => divIcon({
    html: waypointMarkerHtml(point.kind, order, selected),
    className: "trailpicker-stop-icon",
    iconSize: [34, 34], iconAnchor: [17, 17], popupAnchor: [0, -22],
  }), [point.kind, order, selected]);
  useEffect(() => {
    const element = marker.current?.getElement();
    if (element) {
      element.title = `${order}. ${point.name}`;
      element.setAttribute("aria-label", `${order}. ${waypointType(point.kind).label}: ${point.name}`);
    }
  }, [point.name, point.kind, order, icon]);
  return <Marker ref={marker} position={[point.lat, point.lng]} icon={icon} title={`${order}. ${point.name}`} alt={`${waypointType(point.kind).label}: ${point.name}`} keyboard bubblingMouseEvents={false}
    draggable={!!onMove} zIndexOffset={selected ? 1000 : 0} eventHandlers={{
      click: () => onSelect?.(point.id),
      dragend: event => {
        const position = (event.target as LeafletMarker).getLatLng();
        onMove?.(point.id, position.lat, position.lng);
      },
    }}>
    <Popup><strong>{order}. {point.name}</strong><br />{waypointType(point.kind).label}{point.elevationM != null && <> · {point.elevationM} m</>}{onMove && <><br /><span>Drag the pin to adjust its location.</span></>}</Popup>
  </Marker>;
}

export default function RouteMapInner({ points, fallback, onPick, onSelect, onMove, selectedId, focus }: Props) {
  return <MapContainer center={fallback ?? [49.7, -123.1]} zoom={fallback ? 12 : 9} scrollWheelZoom={false} className="relative z-0 h-[420px] w-full sm:h-[480px]">
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
    <Controls points={points} onPick={onPick} focus={focus} />
    <FitRoute points={points} fallback={fallback} />
    {points.length > 1 && <Polyline interactive={false} positions={points.map(p => [p.lat, p.lng])} pathOptions={{ color: "#166534", weight: 3, dashArray: "6 8", opacity: 0.7 }} />}
    {points.map((point, index) => <StopMarker key={point.id} point={point} order={index + 1} selected={selectedId === point.id} onSelect={onSelect} onMove={onMove} />)}
    {!points.length && fallback && <Marker position={fallback} icon={divIcon({ html: waypointMarkerHtml("waypoint", 1, false), className: "trailpicker-stop-icon", iconSize: [34, 34], iconAnchor: [17, 17] })} title="Trip location"><Popup>Trip location · add your first route stop here or explore the map.</Popup></Marker>}
  </MapContainer>;
}
