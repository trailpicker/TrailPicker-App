"use client";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, Tooltip, ZoomControl, useMap, useMapEvents } from "react-leaflet";
import { divIcon, DomEvent, type Marker as LeafletMarker } from "leaflet";
import { LocateFixed } from "lucide-react";
import type { Waypoint } from "@/lib/trip-planner";
import { waypointMarkerHtml, waypointType } from "@/lib/waypoint-map";
import { metersBetween, usableTrailSegment, type LatLng } from "@/lib/trail-routing";
import { MAX_ROUTE_SHAPING_WAYPOINTS, shapingInsertIndex, shapingInsertPositions } from "@/lib/route-shaping";
import { coveredMapBottomPx, routeFitPadding } from "@/lib/route-visible-fit";
import { routeLegStyle } from "@/lib/route-leg-style";
import { isSharedOvernightStop } from "@/lib/shared-overnight-stop";
import { clusterProjectedStops, displayStops, spiderfyOffset, type DisplayStop } from "@/lib/route-marker-clustering";
import "leaflet/dist/leaflet.css";

// Separate visuals: saved stops have numbered pins; route-shaping waypoints
// have small blue diamonds that render ONLY when editing.
const insertWaypointIcon = divIcon({
  className: "trailpicker-insert-waypoint-marker",
  html: '<span class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-green-800 bg-white text-xl font-bold leading-none text-green-800 shadow-md hover:bg-green-50">+</span>',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const shapingWaypointIcon = divIcon({
  className: "trailpicker-shaping-waypoint-marker",
  html: '<span style="display:block;width:18px;height:18px;background:#2563eb;border:3px solid white;border-radius:3px;transform:rotate(45deg);box-shadow:0 1px 5px #0008"></span>',
  iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -16],
});

export type MapFocus = { lat: number; lng: number; request: number };
type Props = {
  points: Waypoint[];
  fallback: [number, number] | null;
  onPick?: (lat: number, lng: number) => void;
  onSelect?: (id: string) => void;
  onMove?: (id: string, lat: number, lng: number) => void;
  onInsert?: (afterIndex: number, viaIndex: number, lat: number, lng: number) => void;
  onMoveVia?: (stopId: string, viaIndex: number, lat: number, lng: number) => void;
  onRemoveVia?: (stopId: string, viaIndex: number) => void;
  selectedId?: string | null;
  activeDayId?: string | null;
  expandedDayIds?: readonly string[];
  editing?: boolean;
  compact?: boolean;
  profileDocked?: boolean;
  hoverLocation?: [number, number] | null;
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

/** Day selection emphasizes the corresponding mapped legs without scrolling the map on hover. */
function FocusSelectedDay({ points, activeDayId }: Pick<Props, "points" | "activeDayId">) {
  const map = useMap();
  const previous = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    if (previous.current === undefined) { previous.current = activeDayId ?? null; return; }
    if (previous.current === (activeDayId ?? null)) return;
    previous.current = activeDayId ?? null;
    if (!activeDayId) {
      if (points.length > 1) map.fitBounds(points.map(p => [p.lat, p.lng]), { padding: [38, 38], maxZoom: 14 });
      return;
    }
    const coords: LatLng[] = [];
    for (let i = 0; i < points.length; i++) {
      if (points[i].dayId === activeDayId) coords.push([points[i].lat, points[i].lng]);
      const next = points[i + 1];
      if (next && points[i].dayId === activeDayId && next.dayId === activeDayId) {
        const trail = usableTrailSegment(points[i], next);
        if (trail) coords.push(...trail.geometry);
      }
    }
    if (coords.length > 1) map.fitBounds(coords, { padding: [48, 48], maxZoom: 14 });
    else if (coords.length === 1) map.setView(coords[0], Math.max(map.getZoom(), 12));
  }, [map, points, activeDayId]);
  return null;
}

/**
 * Wheel input scrolls the page normally. Holding Ctrl zooms the map at the
 * pointer instead, without triggering the browser's Ctrl+wheel page zoom.
 * Uses a non-passive native listener because preventDefault is required.
 */
function CtrlWheelZoom() {
  const map = useMap();
  const accumulated = useRef(0);

  useEffect(() => {
    const container = map.getContainer();
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey) {
        accumulated.current = 0;
        return; // leave ordinary scrolling completely untouched
      }

      event.preventDefault();
      event.stopPropagation();
      const delta = event.deltaY * (
        event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? container.clientHeight : 1
      );
      accumulated.current += delta;
      if (Math.abs(accumulated.current) < 60) return;

      // One zoom notch per normal mouse-wheel detent; also supports trackpads.
      const steps = Math.trunc(accumulated.current / 100) || Math.sign(accumulated.current);
      accumulated.current -= steps * 100;
      const zoom = Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), map.getZoom() - steps));
      if (zoom !== map.getZoom()) {
        map.setZoomAround(map.mouseEventToContainerPoint(event), zoom, { animate: false });
      }
    };
    container.addEventListener("wheel", onWheel, { capture: true, passive: false });
    return () => container.removeEventListener("wheel", onWheel, true);
  }, [map]);

  return <div className="trailpicker-ctrl-wheel-hint pointer-events-none absolute bottom-5 left-14 z-[800] rounded-md bg-white/90 px-2.5 py-1.5 text-[11px] font-medium text-gray-700 shadow-sm">
    Ctrl + scroll to zoom
  </div>;
}

/** Leaflet needs an explicit size refresh when the resizable panel changes width. */
function RefreshMapOnResize() {
  const map = useMap();
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    let frame = 0;
    const observer = new ResizeObserver(() => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => map.invalidateSize({ pan: false }));
    });
    observer.observe(map.getContainer());
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [map]);
  return null;
}

function FitRoute({ points, fallback }: Pick<Props, "points" | "fallback">) {
  const map = useMap();
  const toolbar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (toolbar.current) { DomEvent.disableClickPropagation(toolbar.current); DomEvent.disableScrollPropagation(toolbar.current); }
  }, []);
  function fit() {
    // The elevation profile overlays (rather than resizes) the map. Leaflet's
    // default fitBounds otherwise centers part of the route behind the drawer.
    // Reading its rendered bounds also handles resizing and CSS height clamps.
    const mapElement = map.getContainer();
    const dock = mapElement.parentElement?.querySelector<HTMLElement>("[data-route-elevation-dock]");
    const coveredBottom = coveredMapBottomPx(
      mapElement.getBoundingClientRect(), dock?.getBoundingClientRect() ?? null,
    );
    if (points.length > 1) {
      map.fitBounds(points.map(p => [p.lat, p.lng]), {
        ...routeFitPadding(coveredBottom), maxZoom: 14,
      });
    } else if (points.length === 1 || fallback) {
      const center: [number, number] = points.length === 1
        ? [points[0].lat, points[0].lng] : fallback!;
      const zoom = points.length === 1 ? 14 : 12;
      if (coveredBottom > 0) {
        map.setView(center, zoom, { animate: false });
        // Move the location up by half of the occluded area, to the middle of
        // the map that the user can actually see.
        map.panBy([0, coveredBottom / 2], { animate: false });
      } else {
        // Preserve the existing behavior exactly when the profile is closed.
        map.setView(center, zoom);
      }
    }
  }
  return <div ref={toolbar} className="absolute right-3 top-3 z-[1000]">
    <button type="button" onClick={fit} disabled={!points.length && !fallback}
      aria-label="Fit route" title="Fit route"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-green-700 disabled:opacity-50">
      <LocateFixed className="h-4 w-4" aria-hidden="true" />
    </button>
  </div>;
}

function StopMarker({ stop, position, selectedId, activeDayId, expandedDayIds, onSelect, onMove, spiderfied = false, autoOpen = false }: {
  stop: DisplayStop;
  position?: [number, number];
  selectedId?: string | null;
  activeDayId?: string | null;
  expandedDayIds?: readonly string[];
  onSelect?: (id: string) => void;
  onMove?: (id: string, lat: number, lng: number) => void;
  spiderfied?: boolean;
  autoOpen?: boolean;
}) {
  const selectedMember = stop.members.find(({ point }) => point.id === selectedId);
  const { point, order } = selectedMember ?? stop.members[0];
  const selected = !!selectedMember;
  const active = stop.members.some(({ point: item }) => expandedDayIds !== undefined
    ? expandedDayIds.includes(item.dayId ?? "")
    : (!!activeDayId && item.dayId === activeDayId));
  const size = selected ? 38 : ["camp", "water", "resupply"].includes(point.kind) ? 34 : 32;
  const icon = useMemo(() => divIcon({
    html: waypointMarkerHtml(point.kind, order, selected, size),
    className: "trailpicker-stop-icon",
    iconSize: [size, size], iconAnchor: [size / 2, size / 2], popupAnchor: [0, -size / 2],
  }), [point.kind, order, selected, size]);
  const marker = useRef<LeafletMarker | null>(null);
  const label = stop.members.length > 1 ? `${point.name} · ${stop.members.length} linked day stops` : `${order}. ${point.name}`;
  useEffect(() => {
    const element = marker.current?.getElement();
    if (element) {
      element.title = label;
      element.setAttribute("aria-label", `${waypointType(point.kind).label}: ${label}`);
    }
  }, [label, point.kind, icon]);
  useEffect(() => { if (autoOpen) marker.current?.openPopup(); }, [autoOpen]);
  // An overnight handoff remains one marker. To move either underlying stop,
  // select its entry first (on the map or in the itinerary).
  const canDrag = !!onMove && (stop.members.length === 1 || selected);
  return <Marker ref={marker} position={position ?? [stop.lat, stop.lng]}
    icon={icon} title={label} alt={`${waypointType(point.kind).label}: ${label}`} keyboard bubblingMouseEvents={false}
    draggable={canDrag} zIndexOffset={selected ? 1500 : spiderfied ? 800 : active ? 150 : 0}
    eventHandlers={{
      click: () => { if (stop.members.length === 1 || selected) onSelect?.(point.id); },
      dragend: event => {
        const location = (event.target as LeafletMarker).getLatLng();
        onMove?.(point.id, location.lat, location.lng);
      },
    }}>
    <Popup>
      <strong>{point.name}</strong><br />{waypointType(point.kind).label}
      {point.elevationM != null && <> · {point.elevationM} m</>}
      {stop.members.length > 1 && <div className="mt-2 space-y-1">
        <p className="text-xs text-gray-600">Shared overnight location. Choose the itinerary stop to edit:</p>
        {stop.members.map(member => <button key={member.point.id} type="button"
          className={`block w-full rounded px-2 py-1 text-left text-xs ${selectedId === member.point.id ? "bg-green-100 text-green-900" : "hover:bg-gray-100"}`}
          onClick={() => onSelect?.(member.point.id)}>
          Stop {member.order}{member.point.dayId ? " · Trip day stop" : " · Unassigned"}
        </button>)}
      </div>}
      {canDrag && <><br /><span className="text-xs">Drag the pin to adjust its location.</span></>}
    </Popup>
  </Marker>;
}

function markerClusterIcon(count: number) {
  const size = 36;
  return divIcon({
    className: "trailpicker-marker-cluster",
    html: `<div style="box-sizing:border-box;display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border:3px solid white;border-radius:50%;background:#14532d;color:white;box-shadow:0 2px 7px #0005;font:700 13px system-ui">${count}</div>`,
    iconSize: [size, size], iconAnchor: [size / 2, size / 2], popupAnchor: [0, -size / 2],
  });
}

/** Clustering applies ONLY to the saved-stop display layer, never route geometry. */
function StopMarkerLayer({ points, selectedId, activeDayId, expandedDayIds, onSelect, onMove }: Pick<Props, "points" | "selectedId" | "activeDayId" | "expandedDayIds" | "onSelect" | "onMove">) {
  const map = useMap();
  const [zoom, setZoom] = useState(() => map.getZoom());
  const [spiderfied, setSpiderfied] = useState<string | null>(null);
  const [openAfterSelection, setOpenAfterSelection] = useState<string | null>(null);
  useMapEvents({
    zoomend() { setZoom(map.getZoom()); setSpiderfied(null); },
    movestart() { setSpiderfied(null); },
  });
  const visibleStops = useMemo(() => displayStops(points), [points]);
  const byKey = useMemo(() => new Map(visibleStops.map(stop => [stop.key, stop])), [visibleStops]);
  // A selected stop always remains visible and on top of any nearby cluster.
  const selectedStop = visibleStops.find(stop => stop.members.some(({ point }) => point.id === selectedId));
  const clusters = useMemo(() => clusterProjectedStops(visibleStops
    .filter(stop => stop.key !== selectedStop?.key)
    .map(stop => {
      const projected = map.project([stop.lat, stop.lng], zoom);
      return { key: stop.key, x: projected.x, y: projected.y };
    }), 39), [visibleStops, selectedStop?.key, zoom, map]);
  const expanded = clusters.find(cluster => cluster.key === spiderfied && cluster.keys.length > 1);

  const selectStop = (id: string) => {
    setSpiderfied(null);
    setOpenAfterSelection(id);
    onSelect?.(id);
  };

  return <>
    {clusters.map(cluster => {
      if (cluster.keys.length === 1) {
        const stop = byKey.get(cluster.keys[0]);
        return stop && <StopMarker key={stop.key} stop={stop} selectedId={selectedId}
          activeDayId={activeDayId} expandedDayIds={expandedDayIds} onSelect={selectStop} onMove={onMove} />;
      }
      const center = map.unproject([cluster.x, cluster.y], zoom);
      if (expanded?.key === cluster.key) {
        return <Fragment key={cluster.key}>
          {cluster.keys.map((key, index) => {
            const stop = byKey.get(key);
            if (!stop) return null;
            const [offsetX, offsetY] = spiderfyOffset(index);
            const separated = map.unproject([cluster.x + offsetX, cluster.y + offsetY], zoom);
            const position: [number, number] = [separated.lat, separated.lng];
            return <Fragment key={key}>
              <Polyline interactive={false} positions={[[stop.lat, stop.lng], position]}
                pathOptions={{ color: "#64748b", weight: 1.5, opacity: 0.7, dashArray: "3 4" }} />
              <StopMarker stop={stop} position={position} spiderfied selectedId={selectedId}
                activeDayId={activeDayId} expandedDayIds={expandedDayIds} onSelect={selectStop}
                onMove={undefined} />
            </Fragment>;
          })}
        </Fragment>;
      }
      const count = cluster.keys.length;
      return <Marker key={cluster.key} position={[center.lat, center.lng]}
        icon={markerClusterIcon(count)} title={`${count} nearby stops. Click to ${zoom >= 16 ? "expand" : "zoom in"}.`}
        alt={`${count} nearby map stops`} keyboard bubblingMouseEvents={false}
        eventHandlers={{ click: () => {
          if (zoom >= 16 || zoom >= map.getMaxZoom()) {
            setSpiderfied(cluster.key);
          } else {
            map.flyTo([center.lat, center.lng], Math.min(zoom + 2, 16, map.getMaxZoom()), { duration: 0.3 });
          }
        } }} />;
    })}
    {selectedStop && <StopMarker key={`selected-${selectedStop.key}`} stop={selectedStop}
      selectedId={selectedId} activeDayId={activeDayId} expandedDayIds={expandedDayIds}
      onSelect={selectStop} onMove={onMove} autoOpen={openAfterSelection !== null && selectedStop.members.some(member => member.point.id === openAfterSelection)} />}
  </>;
}

export default function RouteMapInner({ points, fallback, onPick, onSelect, onMove, onInsert, onMoveVia, onRemoveVia, selectedId, activeDayId, expandedDayIds, editing = false, compact = false, profileDocked = false, hoverLocation, focus }: Props) {
  const [mapBlocked,setMapBlocked] = useState(false);
  const first = points[0] ? [points[0].lat,points[0].lng] : fallback;
  const external = first ? `https://www.openstreetmap.org/?mlat=${first[0]}&mlon=${first[1]}#map=12/${first[0]}/${first[1]}` : "https://www.openstreetmap.org/";
  return <MapContainer center={fallback ?? [49.7, -123.1]} zoom={fallback ? 12 : 9} zoomControl={false} scrollWheelZoom={false} className={profileDocked ? "trailpicker-route-map relative z-0 h-[500px] w-full sm:h-[600px] xl:h-full" : compact ? "relative z-0 h-[480px] w-full sm:h-[580px] xl:h-[min(75vh,760px)]" : "relative z-0 h-[420px] w-full sm:h-[480px]"}>
    <TileLayer referrerPolicy="origin" eventHandlers={{tileerror:()=>setMapBlocked(true)}} url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
    {mapBlocked && <div role="status" className="absolute inset-x-3 top-16 z-[1000] rounded-lg border border-amber-200 bg-white/95 px-3 py-2 text-xs text-slate-700 shadow-md">Map tiles unavailable. Route stops are still listed in the itinerary. <a href={external} target="_blank" rel="noopener noreferrer" className="font-semibold text-green-900 underline">Open map externally</a></div>}
    <FocusSelectedDay points={points} activeDayId={activeDayId} />
    <Controls points={points} onPick={onPick} focus={focus} />
    <RefreshMapOnResize />
    <CtrlWheelZoom />
    <ZoomControl position="bottomleft" />
    <FitRoute points={points} fallback={fallback} />
    {points.slice(0, -1).map((point, i) => {
      const next = points[i + 1];
      if (isSharedOvernightStop(point, next)) return null;
      const via = point.viaToNext ?? [];
      const trail = usableTrailSegment(point, next);
      // Straight-line fallback still passes through the shaping waypoints.
      const path: LatLng[] = trail?.geometry ?? [[point.lat, point.lng], ...via, [next.lat, next.lng]];
      const insertions = onInsert && via.length < MAX_ROUTE_SHAPING_WAYPOINTS
        ? shapingInsertPositions(path, via) : [];
      return <Fragment key={`${point.id}-${next.id}`}>
      <Polyline key={trail ? "mapped" : "direct"} interactive={!!onInsert && via.length < MAX_ROUTE_SHAPING_WAYPOINTS}
        eventHandlers={onInsert && via.length < MAX_ROUTE_SHAPING_WAYPOINTS ? {
          click: event => {
            const clicked: LatLng = [event.latlng.lat, event.latlng.lng];
            onInsert(i, shapingInsertIndex(path, via, clicked), clicked[0], clicked[1]);
          },
        } : undefined}
        bubblingMouseEvents={false}
        positions={path}
        pathOptions={routeLegStyle({
          mapped: !!trail,
          editing,
          activeDayId,
          expandedDayIds,
          startDayId: point.kind === "camp" && next.kind !== "trailhead" && point.dayId !== next.dayId ? next.dayId : point.dayId,
          endDayId: next.dayId,
        })} />
      {insertions.map((position, viaIndex) => (
        <Marker
          key={`insert-${point.id}-${viaIndex}`}
          position={position}
          icon={insertWaypointIcon}
          title={`Add route-shaping waypoint ${viaIndex + 1} between ${point.name} and ${next.name}`}
          alt="Add route-shaping waypoint"
          keyboard
          bubblingMouseEvents={false}
          eventHandlers={{ click: () => onInsert?.(i, viaIndex, position[0], position[1]) }}
        >
          <Tooltip direction="top" offset={[0, -16]}>Add route-shaping waypoint</Tooltip>
        </Marker>
      ))}
      {onMoveVia && via.map((position, viaIndex) => (
        <Marker
          key={`via-${point.id}-${viaIndex}`}
          position={position}
          icon={shapingWaypointIcon}
          title={`Route shaping waypoint ${viaIndex + 1}`}
          alt="Route-shaping waypoint; drag to change route"
          keyboard
          draggable
          bubblingMouseEvents={false}
          eventHandlers={{
            dragend: event => {
              const location = (event.target as LeafletMarker).getLatLng();
              onMoveVia(point.id, viaIndex, location.lat, location.lng);
            },
          }}
        >
          <Popup>
            <strong>Route-shaping waypoint {viaIndex + 1}</strong>
            <p className="mt-1 text-xs">Drag the blue diamond to guide the hiking route. Not a saved stop.</p>
            {onRemoveVia && <button type="button" className="mt-2 rounded bg-red-50 px-2 py-1 text-xs font-semibold text-red-800" onClick={() => onRemoveVia(point.id, viaIndex)}>Remove waypoint</button>}
          </Popup>
        </Marker>
      ))}
      {trail && metersBetween([point.lat, point.lng], trail.geometry[0]) > 3 &&
        <Polyline interactive={false} positions={[[point.lat, point.lng], trail.geometry[0]]}
          pathOptions={{ color: "#d97706", weight: 2, dashArray: "3 5", opacity: 0.9 }} />}
      {trail && metersBetween([next.lat, next.lng], trail.geometry[trail.geometry.length - 1]) > 3 &&
        <Polyline interactive={false} positions={[trail.geometry[trail.geometry.length - 1], [next.lat, next.lng]]}
          pathOptions={{ color: "#d97706", weight: 2, dashArray: "3 5", opacity: 0.9 }} />}
      </Fragment>;
    })}
    {hoverLocation && <CircleMarker center={hoverLocation} radius={6} interactive={false}
      pathOptions={{ color: "#ffffff", weight: 2.5, fillColor: "#14532d", fillOpacity: 1, opacity: 1 }} />}
    <StopMarkerLayer points={points} selectedId={selectedId} activeDayId={activeDayId} expandedDayIds={expandedDayIds} onSelect={onSelect} onMove={onMove} />
    {!points.length && fallback && <Marker position={fallback} icon={divIcon({ html: waypointMarkerHtml("waypoint", 1, false, 32), className: "trailpicker-stop-icon", iconSize: [32, 32], iconAnchor: [16, 16] })} title="Trip location"><Popup>Trip location · add your first route stop here or explore the map.</Popup></Marker>}
  </MapContainer>;
}



