"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Check, MapPin, Pencil, Plus, Trash2, X } from "lucide-react";
import { readWaypoints, type Waypoint } from "@/lib/trip-planner";
import { saveTripRoute } from "@/lib/trip-planner-actions";
import { WAYPOINT_TYPES, moveWaypoint, nextWaypointName, routeForSave, validCoordinates, waypointType, type PlaceResult } from "@/lib/waypoint-map";
import { inputClass } from "@/components/builder/TripPlanner/PlannerFields";
import WaypointIcon from "@/components/builder/TripPlanner/WaypointIcon";
import WaypointSearch from "@/components/builder/TripPlanner/WaypointSearch";
import type { MapFocus } from "@/components/builder/TripPlanner/RouteMapInner";
const RouteMap = dynamic(() => import("@/components/builder/TripPlanner/RouteMapInner"), { ssr: false, loading: () => <div className="h-[420px] animate-pulse bg-gray-100 sm:h-[480px]" /> });

export default function TripRoute({ buildId, value, lat, lng, readOnly = false }: {
  buildId: string; value: unknown; lat: number | null; lng: number | null; readOnly?: boolean;
}) {
  const [points, setPoints] = useState(() => readWaypoints(value));
  const committed = useRef(readWaypoints(value));
  const [editing, setEditing] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [kind, setKind] = useState<Waypoint["kind"]>("waypoint");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [moveId, setMoveId] = useState<string | null>(null);
  const [focus, setFocus] = useState<MapFocus | null>(null);
  const sequence = useRef(0);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [pending, start] = useTransition();
  const router = useRouter();
  const fallback: [number, number] | null = validCoordinates(lat, lng) ? [lat as number, lng as number] : null;
  const selected = points.find(point => point.id === selectedId);
  const dirty = JSON.stringify(points) !== JSON.stringify(committed.current);
  const canEdit = editing && !readOnly;
  const near: [number, number] | null = selected ? [selected.lat, selected.lng] : points.length ? [points[points.length - 1].lat, points[points.length - 1].lng] : fallback;

  useEffect(() => {
    if (!canEdit || !dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [canEdit, dirty]);

  function changed() { setSaved(false); setError(""); }
  function patch(id: string, data: Partial<Waypoint>) {
    if (!canEdit || pending) return;
    setPoints(current => current.map(point => point.id === id ? { ...point, ...data, id: point.id } : point));
    changed();
  }
  function addStop(latitude: number, longitude: number, name?: string, recenter = false) {
    if (!canEdit || pending || !validCoordinates(latitude, longitude)) return;
    if (points.length >= 200) { setError("A route can have up to 200 stops."); return; }
    const id = crypto.randomUUID();
    setPoints(current => [...current, { id, name: name?.trim().slice(0, 200) || nextWaypointName(current, kind), lat: latitude, lng: longitude, kind, elevationM: null }]);
    setSelectedId(id); setPlacing(false); setMoveId(null); changed();
    if (recenter) setFocus({ lat: latitude, lng: longitude, request: ++sequence.current });
  }
  function choosePlace(place: PlaceResult) { addStop(place.lat, place.lng, place.name, true); }
  function pick(latitude: number, longitude: number) {
    if (!canEdit || pending) return;
    if (moveId) { patch(moveId, { lat: latitude, lng: longitude }); setMoveId(null); }
    else if (placing) addStop(latitude, longitude);
  }
  function select(point: Waypoint) {
    setSelectedId(point.id);
    setFocus({ lat: point.lat, lng: point.lng, request: ++sequence.current });
  }
  function cancel() {
    if (pending || (dirty && !window.confirm("Discard your unsaved route changes?"))) return;
    setPoints(committed.current); setEditing(false); setPlacing(false); setMoveId(null); setSelectedId(null); setError(""); setSaved(false);
  }
  function save() {
    if (!canEdit || pending) return;
    let route: Waypoint[];
    try { route = routeForSave(points); } catch (e) { setError(e instanceof Error ? e.message : "Check the route stops."); return; }
    setError("");
    start(async () => {
      try {
        const form = new FormData(); form.set("buildId", buildId); form.set("waypoints", JSON.stringify(route));
        await saveTripRoute(form);
        committed.current = route; setPoints(route); setSaved(true); setEditing(false); setPlacing(false); setMoveId(null); setSelectedId(null);
        router.refresh();
      } catch (e) { setError(e instanceof Error ? e.message : "Could not save the route. Your changes are still here—try again."); }
    });
  }
  const elevations = points.map(point => point.elevationM);
  const profileReady = points.length >= 2 && elevations.every((height): height is number => height !== null);
  const heights = elevations.filter((height): height is number => height !== null);
  const min = heights.length ? Math.min(...heights) : 0, max = heights.length ? Math.max(...heights) : 0;

  return <section id="route" className="scroll-mt-20 overflow-hidden rounded-3xl border border-gray-200 bg-white">
    <header className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-8">
      <div><h2 className="text-xl font-bold text-gray-950">Route</h2><p className="mt-1 text-sm text-gray-500">Your stops, in travel order.</p></div>
      {!readOnly && (editing ? <div className="flex items-center gap-2">
        <button type="button" disabled={pending} onClick={cancel} className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 disabled:opacity-40">Cancel</button>
        <button type="button" disabled={pending || !dirty} onClick={save} className="flex items-center gap-1.5 rounded-xl bg-green-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"><Check className="h-4 w-4" aria-hidden="true" />{pending ? "Saving…" : "Save route"}</button>
      </div> : <button type="button" onClick={() => { setEditing(true); setSaved(false); setError(""); }} className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"><Pencil className="h-4 w-4" aria-hidden="true" />Edit route</button>)}
    </header>
    {canEdit && <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 bg-gray-50/70 px-5 py-3 sm:px-8">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Stop type to add">{WAYPOINT_TYPES.map(type => <button key={type.kind} type="button" disabled={pending} aria-pressed={kind === type.kind} onClick={() => { setKind(type.kind); setPlacing(true); setMoveId(null); }}
        className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition disabled:opacity-40 ${kind === type.kind ? "border-green-700 bg-white text-green-900 shadow-sm" : "border-transparent text-gray-500 hover:bg-white hover:text-gray-900"}`}><WaypointIcon kind={type.kind} />{type.label}</button>)}</div>
      <button type="button" disabled={pending} onClick={() => { setPlacing(!placing); setMoveId(null); }} className="flex items-center gap-1.5 text-xs font-semibold text-green-800 disabled:opacity-40"><Plus className="h-4 w-4" aria-hidden="true" />{placing ? "Stop placing" : "Place on map"}</button>
    </div>}
    {(placing || moveId) && canEdit && <div role="status" className="flex items-center justify-between gap-3 bg-green-50 px-5 py-2 text-xs text-green-900 sm:px-8"><span>{moveId ? "Click the new position on the map." : `Click the map to add a ${waypointType(kind).label.toLowerCase()}.`}</span><button type="button" disabled={pending} aria-label="Cancel map placement" onClick={() => { setPlacing(false); setMoveId(null); }}><X className="h-4 w-4" /></button></div>}
    <div className="grid border-t border-gray-100 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0"><RouteMap points={points} fallback={fallback} selectedId={selectedId} focus={focus}
        onPick={canEdit && !pending && (placing || moveId) ? pick : undefined}
        onSelect={setSelectedId}
        onMove={canEdit && !pending ? (id, a, b) => { if (validCoordinates(a, b)) { patch(id, { lat: a, lng: b }); setSelectedId(id); } } : undefined} /></div>
      <aside className="flex max-h-[640px] min-w-0 flex-col border-t border-gray-100 bg-gray-50/50 lg:max-h-[480px] lg:border-l lg:border-t-0">
        {canEdit && <div className="border-b border-gray-100 p-4"><h3 className="mb-2 text-xs font-bold text-gray-500">Add a {waypointType(kind).label.toLowerCase()} by name</h3><WaypointSearch near={near} onChoose={choosePlace} disabled={pending} /></div>}
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <div className="mb-3 flex items-center justify-between text-xs text-gray-500"><h3 className="font-semibold">Stops</h3><span>{points.length} / 200</span></div>
          {!points.length ? <div className="rounded-xl border border-dashed border-gray-200 bg-white px-4 py-8 text-center"><MapPin className="mx-auto mb-2 h-5 w-5 text-gray-300" aria-hidden="true" /><p className="text-sm font-medium text-gray-600">No stops yet</p><p className="mt-1 text-xs leading-5 text-gray-400">{canEdit ? "Choose an icon and click the map, or search for a place above." : readOnly ? "The owner hasn’t added route stops." : "Edit the route to add your first stop."}</p></div> : <ol className="space-y-2" aria-label="Route stops">
            {points.map((point, index) => <li key={point.id} className={`overflow-hidden rounded-xl border bg-white ${selectedId === point.id ? "border-green-700 ring-1 ring-green-700/10" : "border-gray-200"}`}>
              <div className="flex items-center gap-1 pr-2"><button type="button" onClick={() => select(point)} aria-pressed={selectedId === point.id} className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 text-left">
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: waypointType(point.kind).color }}><WaypointIcon kind={point.kind} /><span className="absolute -bottom-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full border border-gray-200 bg-white px-0.5 text-[9px] font-bold text-gray-600">{index + 1}</span></span>
                <span className="min-w-0"><span className="block truncate text-sm font-semibold text-gray-800">{point.name || "Unnamed stop"}</span><span className="mt-0.5 block text-xs text-gray-400">{waypointType(point.kind).label}{point.elevationM != null ? ` · ${point.elevationM} m` : ""}</span></span>
              </button>{canEdit && <div className="flex shrink-0 flex-col"><button type="button" disabled={pending || index === 0} aria-label={`Move ${point.name || "stop"} earlier`} onClick={() => { setPoints(current => moveWaypoint(current, index, -1)); changed(); }} className="rounded p-1 text-gray-400 hover:bg-gray-100 disabled:opacity-20"><ArrowUp className="h-3.5 w-3.5" /></button><button type="button" disabled={pending || index === points.length - 1} aria-label={`Move ${point.name || "stop"} later`} onClick={() => { setPoints(current => moveWaypoint(current, index, 1)); changed(); }} className="rounded p-1 text-gray-400 hover:bg-gray-100 disabled:opacity-20"><ArrowDown className="h-3.5 w-3.5" /></button></div>}</div>
              {canEdit && selectedId === point.id && <div className="space-y-3 border-t border-gray-100 px-3 pb-3 pt-3">
                <label className="block text-xs font-medium text-gray-500">Stop name<input value={point.name} maxLength={200} disabled={pending} onChange={e => patch(point.id, { name: e.target.value })} className={`${inputClass} mt-1`} /></label>
                <label className="block text-xs font-medium text-gray-500">Type<select aria-label="Stop type" value={point.kind} disabled={pending} onChange={e => patch(point.id, { kind: e.target.value as Waypoint["kind"] })} className={`${inputClass} mt-1`}>{WAYPOINT_TYPES.map(type => <option key={type.kind} value={type.kind}>{type.label}</option>)}</select></label>
                <div className="flex items-center justify-between gap-2"><button type="button" disabled={pending} onClick={() => { setMoveId(point.id); setPlacing(false); }} className="flex items-center gap-1 text-xs font-semibold text-green-800 disabled:opacity-40"><MapPin className="h-3.5 w-3.5" />Move on map</button><button type="button" disabled={pending} onClick={() => { setPoints(current => current.filter(p => p.id !== point.id)); setSelectedId(null); setMoveId(null); changed(); }} className="flex items-center gap-1 text-xs font-medium text-red-700 disabled:opacity-40"><Trash2 className="h-3.5 w-3.5" />Remove</button></div>
                <details className="text-xs text-gray-400"><summary className="cursor-pointer py-1">More details</summary><label className="mt-2 block text-xs text-gray-500">Elevation (m, optional)<input type="number" min={-500} max={9000} step="any" value={point.elevationM ?? ""} disabled={pending} onChange={e => patch(point.id, { elevationM: Number.isFinite(e.target.valueAsNumber) ? e.target.valueAsNumber : null })} className={`${inputClass} mt-1`} /></label><p className="mt-2 break-words font-mono">{point.lat.toFixed(6)}, {point.lng.toFixed(6)}</p></details>
              </div>}
            </li>)}
          </ol>}
        </div>
      </aside>
    </div>
    <footer className="space-y-3 border-t border-gray-100 px-5 py-4 sm:px-8">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">{WAYPOINT_TYPES.map(type => <span key={type.kind} className="flex items-center gap-1.5 text-xs text-gray-500"><span style={{ color: type.color }}><WaypointIcon kind={type.kind} className="h-3.5 w-3.5" /></span>{type.label}</span>)}</div>
      <p className="text-xs leading-5 text-gray-400">Dashed lines connect stops directly, not along trails.{canEdit ? " Drag pins to adjust them, then save your route." : ""}</p>
      {profileReady && <details className="text-xs text-gray-500"><summary className="cursor-pointer font-semibold">Waypoint elevations · {min}–{max} m</summary><svg viewBox="0 0 600 100" role="img" aria-label="Elevation at each waypoint in travel order, not by distance" className="mt-2 h-24 w-full"><polyline fill="none" stroke="#166534" strokeWidth="3" points={points.map((point, i) => `${10 + i * 580 / (points.length - 1)},${85 - ((point.elevationM! - min) / Math.max(1, max - min)) * 70}`).join(" ")} /></svg></details>}
      {error && <p role="alert" className="text-sm font-medium text-red-700">{error}</p>}
      <p role="status" aria-live="polite" className="text-xs text-green-800">{pending ? "Saving route…" : saved ? "Route saved." : canEdit && dirty ? "Unsaved changes" : ""}</p>
    </footer>
  </section>;
}
