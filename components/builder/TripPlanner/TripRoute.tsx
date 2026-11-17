"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState, useTransition, type CSSProperties, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  Mountain,
  Pencil,
  RotateCcw,
  Ellipsis,
  Route,
  X,
} from "lucide-react";
import { readWaypoints, type Waypoint, type PlannerDay } from "@/lib/trip-planner";
import { consolidateOvernightStops } from "@/lib/overnight-handoffs";
import { saveTripRoute, saveRouteTimingPreferences } from "@/lib/tracked-build-actions";
import { markBuildDirty, clearBuildDirty } from "@/lib/build-save-status";
import { readRouteTimingPreferences, type RouteTimingPreferences } from "@/lib/route-timing-preferences";
import {
  WAYPOINT_TYPES,
  nextWaypointName,
  routeForSave,
  validCoordinates,
  waypointType,
  type PlaceResult,
} from "@/lib/waypoint-map";
import WaypointIcon from "./WaypointIcon";
import { metersBetween, usableTrailSegment, validTrailSegment, type TrailSegment, type LatLng } from "@/lib/trail-routing";
import { orsCoordinateKey, retryAfterSeconds } from "@/lib/ors-request-control";
import { missingTrailLegs } from "@/lib/route-request-planner";
import { MAX_ROUTE_SHAPING_WAYPOINTS } from "@/lib/route-shaping";
import type { MapFocus } from "./RouteMapInner";
import ResizableRouteLayout from "./ResizableRouteLayout";
import RouteProfileDock from "./RouteProfileDock";
import ResizableElevationDock from "./ResizableElevationDock";
import { buildRouteExplorer, locationAtDistance, type ExplorerSample } from "@/lib/route-explorer";
import { type BreakSettings, type SustainedSlope } from "@/lib/route-analysis-insights";
import RouteAnalysisSection from "./RouteAnalysisSection";
import { exportGpx } from "@/lib/gpx-route";
import { GPX_TOOLBAR_PING, GPX_TOOLBAR_READY, GPX_TOOLBAR_IMPORT, GPX_TOOLBAR_EXPORT, type GpxToolbarImport, type GpxToolbarExport } from "@/lib/gpx-toolbar-events";
import { computeRouteMetrics, type RouteMetrics } from "@/lib/route-metrics";
import type { PackLine } from "@/lib/pack-analysis";
import { readLogistics } from "@/lib/trip-planner";
import { readPrivateResources } from "@/lib/trip-resources";
import { readArrangements } from "@/lib/trip-arrangements";
import { readFoodPlan } from "@/lib/food-plan";
import type { TripExport } from "@/lib/trip-resources-export";
import { TRIP_EXPORT_REQUEST, type TripExportRequest } from "@/lib/trip-export-events";
import { ROUTE_WATER_POINTS_CHANGED, ROUTE_WATER_POINTS_REQUEST, type RouteWaterPointsChanged, type RouteWaterPointsRequest } from "@/lib/route-water-events";

export type RouteWorkspaceControls = {
  metrics: RouteMetrics;
  paceKmh: number;
  breakSettings: BreakSettings;
  points: Waypoint[];
  days: PlannerDay[];
  selectedId: string | null;
  activeDayId: string | null;
  expandedDayIds: readonly string[];
  setDayExpanded: (id: string, open: boolean) => void;
  focusDay: (id: string | null) => void;
  editingStopId: string | null;
  editing: boolean;
  pending: boolean;
  readOnly: boolean;
  placingDayId: string | null;
  kind: Waypoint["kind"];
  near: [number, number] | null;
  selectStop: (point: Waypoint) => void;
  selectOvernightStart: (point: Waypoint, nextDayId: string) => void;
  editStop: (id: string) => void;
  editOvernightStart: (point: Waypoint, nextDayId: string) => void;
  updateStop: (id: string, data: Partial<Waypoint>) => void;
  assignStop: (id: string, dayId: string | null) => void;
  removeStop: (id: string) => void;
  moveStop: (id: string, delta: -1 | 1) => void;
  moveStopToDay: (id: string, dayId: string | null, beforeId?: string) => void;
  startAddingToDay: (dayId: string, kind: Waypoint["kind"]) => void;
  stopAdding: () => void;
  choosePlace: (place: PlaceResult) => void;
};

const RouteMap = dynamic(() => import("./RouteMapInner"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] animate-pulse bg-gray-100 sm:h-[480px]" />
  ),
});

export default function TripRoute({
  buildId,
  value,
  lat,
  lng,
  readOnly = false,
  days = [],
  renderItinerary,
  header, buildName = "Trip", people = 1, tripLogistics = null, packLines = [],
}: {
  buildId: string;
  value: unknown;
  lat: number | null;
  lng: number | null;
  readOnly?: boolean;
  days?: PlannerDay[];
  renderItinerary?: (route: RouteWorkspaceControls) => ReactNode;
  header?: ReactNode;
  buildName?: string;
  people?: number;
  tripLogistics?: unknown;
  packLines?: PackLine[];
}) {
  // Server props can change after import, restore, undo, or a route save.
  // Keep a stable fingerprint so unrelated router refreshes do not reset edits.
  const serverRouteKey = JSON.stringify(readWaypoints(value));
  const [points, setPoints] = useState(() => readWaypoints(value));
  const [committed, setCommitted] = useState(() => readWaypoints(value));
  const lastServerRouteKey = useRef(serverRouteKey);
  const [outdated, setOutdated] = useState(false);
  const [editing, setEditing] = useState(false);
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const toolsMenuRef = useRef<HTMLDivElement | null>(null);
  const [paceKmh, setPaceKmh] = useState(() => readRouteTimingPreferences(tripLogistics).paceKmh);
  const [breakSettings, setBreakSettings] = useState<BreakSettings>(() => readRouteTimingPreferences(tripLogistics).breaks);
  // Only user changes should autosave. Loading existing settings must not write back defaults.
  const initialTimingKey = JSON.stringify(readRouteTimingPreferences(tripLogistics));
  const persistedTimingKey = useRef(initialTimingKey);
  const latestTimingRef = useRef<RouteTimingPreferences>(readRouteTimingPreferences(tripLogistics));
  const timingSaveInFlight = useRef(false);
  const flushTimingRef = useRef<() => Promise<void>>(async () => {});
  const lastServerTimingKey = useRef(initialTimingKey);
  const [placing, setPlacing] = useState(false);
  const [kind, setKind] = useState<Waypoint["kind"]>("waypoint");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeDayId, setActiveDayId] = useState<string | null>(null);
  const [expandedDayIds, setExpandedDayIds] = useState<string[]>(() => {
    const first = [...days].sort((a,b) => +new Date(a.date) - +new Date(b.date))[0];
    return first ? [first.id] : [];
  });
  const previousDayIds = useRef(days.map(day => day.id));
  // Preserve expansion preferences across re-renders; discard removed days and
  // expand the first day only when the itinerary was previously empty.
  useEffect(() => {
    const current = days.map(day => day.id);
    const previous = previousDayIds.current;
    if (current.join('|') === previous.join('|')) return;
    previousDayIds.current = current;
    setExpandedDayIds(ids => {
      const kept = ids.filter(id => current.includes(id));
      if (previous.length === 0 && current.length > 0) {
        const first = [...days].sort((a,b) => +new Date(a.date) - +new Date(b.date))[0];
        return first ? [first.id] : [];
      }
      return kept;
    });
  }, [days]);
  const [hoverProfile, setHoverProfile] = useState<ExplorerSample | null>(null);
  const [focusedTerrainRange, setFocusedTerrainRange] = useState<{ startM: number; endM: number } | null>(null);
  // Elevation is optional in the route workspace; the map opens at full size.
  const [elevationOpen, setElevationOpen] = useState(false);
  const [profileMode, setProfileMode] = useState<"elevation" | "gradient">("elevation");
  const [elevationHeight, setElevationHeight] = useState(235);
  const [editingStopId, setEditingStopId] = useState<string | null>(null);
  const [focus, setFocus] = useState<MapFocus | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [placingDayId, setPlacingDayId] = useState<string | null>(null);
  const [followTrails, setFollowTrails] = useState(() => {
    const saved = readWaypoints(value);
    return saved.length < 2 || !saved.slice(0, -1).every(point => point.manualToNext === true);
  });
  const [snappingCount, setSnappingCount] = useState(0);
  const [routing, setRouting] = useState(false);
  const [routingMessage, setRoutingMessage] = useState("");
  const [retryRouting, setRetryRouting] = useState(0);
  const previousEdits = useRef<Waypoint[][]>([]);
  const snapVersion = useRef(0);
  const attemptedRoute = useRef("");
  // Reuse route geometry during this edit session, even after moving a stop away
  // and back. On the server, parsed ORS results have a longer process-local cache.
  const recentRoutes = useRef(new Map<string, TrailSegment>());
  const cooldownUntil = useRef(0);
  const snapControllers = useRef(new Set<AbortController>());
  const [pending, start] = useTransition();
  const router = useRouter();
  useEffect(() => () => {
    // Don't leave obsolete snap requests running when leaving the planner.
    for (const controller of snapControllers.current) controller.abort();
    snapControllers.current.clear();
  }, []);

  const fallback: [number, number] | null = validCoordinates(lat, lng)
    ? [lat as number, lng as number]
    : null;

  const selected = points.find((point) => point.id === selectedId);
  const dirty = JSON.stringify(points) !== JSON.stringify(committed);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("trailpicker:route-edit-state", {detail:{buildId, dirty, pending}}));
  }, [buildId, dirty, pending]);
  const metrics = useMemo(() => computeRouteMetrics(points, days, paceKmh), [points, days, paceKmh]);
  const timingPreferences: RouteTimingPreferences = useMemo(() => ({ paceKmh, breaks: breakSettings }), [paceKmh, breakSettings]);
  const timingKey = JSON.stringify(timingPreferences);
  latestTimingRef.current = timingPreferences;

  // A restore/undo can replace the saved preferences. An ordinary server refresh
  // must not overwrite local edits that are waiting to be saved.
  const serverTimingKey = JSON.stringify(readRouteTimingPreferences(tripLogistics));
  useEffect(() => {
    if (serverTimingKey === lastServerTimingKey.current) return;
    lastServerTimingKey.current = serverTimingKey;
    if (timingSaveInFlight.current || JSON.stringify(latestTimingRef.current) !== persistedTimingKey.current) return;
    const savedPreferences = readRouteTimingPreferences(tripLogistics);
    persistedTimingKey.current = serverTimingKey;
    latestTimingRef.current = savedPreferences;
    setPaceKmh(savedPreferences.paceKmh);
    setBreakSettings(savedPreferences.breaks);
  }, [serverTimingKey, tripLogistics]);

  useEffect(() => {
    if (readOnly) return;
    const saveLatest = async () => {
      if (timingSaveInFlight.current) return;
      timingSaveInFlight.current = true;
      try {
        // Changes made while a save is running are saved *after* it finishes.
        // This also handles changing back to a previous pace while saving.
        while (JSON.stringify(latestTimingRef.current) !== persistedTimingKey.current) {
          const snapshot = latestTimingRef.current;
          const snapshotKey = JSON.stringify(snapshot);
          const form = new FormData();
          form.set("buildId", buildId);
          form.set("settings", snapshotKey);
          try {
            await saveRouteTimingPreferences(form);
            persistedTimingKey.current = snapshotKey;
          } catch (error) {
            // A stale failed save should not prevent a newer selection from saving.
            if (JSON.stringify(latestTimingRef.current) === snapshotKey) throw error;
          }
        }
        clearBuildDirty(buildId, "route-timing");
      } catch {
        // The shared save indicator displays the error. A subsequent edit retries.
      } finally {
        timingSaveInFlight.current = false;
      }
    };
    flushTimingRef.current = saveLatest;
    if (timingKey === persistedTimingKey.current) {
      if (!timingSaveInFlight.current) clearBuildDirty(buildId, "route-timing");
      return;
    }
    markBuildDirty(buildId, "route-timing", "Hiking settings waiting to save…");
    const timeout = window.setTimeout(() => { void saveLatest(); }, 450);
    return () => window.clearTimeout(timeout);
  }, [buildId, readOnly, timingKey]);
  // If someone navigates immediately after editing a setting, flush the last
  // pending value rather than dropping the debounced autosave on unmount.
  useEffect(() => () => {
    if (!readOnly && JSON.stringify(latestTimingRef.current) !== persistedTimingKey.current) {
      void flushTimingRef.current();
    }
  }, [buildId, readOnly]);
  // The compatibility bar shares the same checks as the itinerary, including
  // unsaved edits and the currently selected pace / break preferences.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('trailpicker:route-timing', {
      detail:{buildId,points,paceKmh,breakSettings},
    }));
  }, [buildId,points,paceKmh,breakSettings]);
  const explorer = useMemo(() => buildRouteExplorer(points), [points]);
  const canEdit = editing && !readOnly;

  const near: [number, number] | null = selected
    ? [selected.lat, selected.lng]
    : points.length
      ? [points[points.length - 1].lat, points[points.length - 1].lng]
      : fallback;

  // An explicit import/restore/undo discards the old draft before the fresh
  // server props arrive. This event is dispatched by BuildDataTools.
  useEffect(() => {
    const onReplaced = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== buildId) return;
      setPoints(committed);
      setEditing(false);
      setToolsMenuOpen(false);
      setPlacing(false);
      setPlacingDayId(null);
      setSelectedId(null);
      setEditingStopId(null);
      setFocus(null);
      setError("");
      setSaved(false);
      setOutdated(false);
      snapVersion.current++;
      previousEdits.current = [];
      attemptedRoute.current = "";
      setRoutingMessage("");
      const saved = readWaypoints(value);
      setFollowTrails(saved.length < 2 || !saved.slice(0, -1).every(point => point.manualToNext === true));
    };
    window.addEventListener("trailpicker:build-replaced", onReplaced);
    return () => window.removeEventListener("trailpicker:build-replaced", onReplaced);
  }, [buildId, committed]);

  useEffect(() => {
    if (lastServerRouteKey.current === serverRouteKey) return;
    lastServerRouteKey.current = serverRouteKey;
    const nextRoute = JSON.parse(serverRouteKey) as Waypoint[];
    // Defer React state synchronization until after the effect. Preserve a
    // locally edited draft if the server route changes underneath it.
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setCommitted(nextRoute);
      if (editing && dirty) {
        setOutdated(true);
        setError(""); // Conflict is explained by the actionable banner in Route Analysis.
        return;
      }
      setPoints(nextRoute);
      setEditing(false);
      setToolsMenuOpen(false);
      setPlacing(false);
      setPlacingDayId(null);
      setSelectedId(null);
      setEditingStopId(null);
      setFocus(null);
      setError("");
      setSaved(false);
      setOutdated(false);
      snapVersion.current++;
      previousEdits.current = [];
      attemptedRoute.current = "";
      setRoutingMessage("");
      setFollowTrails(nextRoute.length < 2 || !nextRoute.slice(0, -1).every(point => point.manualToNext === true));
    });
    return () => { cancelled = true; };
  }, [serverRouteKey, editing, dirty]);

  // Routing tools are intentionally secondary. Close the popover on outside
  // interaction or Escape without affecting map editing or route state.
  useEffect(() => {
    if (!toolsMenuOpen) return;
    const outside = (event: PointerEvent) => {
      if (!toolsMenuRef.current?.contains(event.target as Node)) setToolsMenuOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setToolsMenuOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [toolsMenuOpen]);

  useEffect(() => {
    if (!canEdit || !dirty) return;

    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [canEdit, dirty]);

  function rateLimitRemaining() {
    return Math.max(0, Math.ceil((cooldownUntil.current - Date.now()) / 1000));
  }
  function rememberRateLimit(response: Response) {
    const wait = retryAfterSeconds(response.headers.get("Retry-After"));
    cooldownUntil.current = Math.max(cooldownUntil.current, Date.now() + wait * 1000);
    return wait;
  }
  function rememberRoutedLeg(key: string, segment: TrailSegment) {
    const cache = recentRoutes.current;
    cache.delete(key);
    cache.set(key, segment);
    while (cache.size > 120) cache.delete(cache.keys().next().value!);
  }

  function rememberEdit() {
    previousEdits.current = [...previousEdits.current.slice(-19), points.map(point => ({ ...point }))];
    snapVersion.current++;
    // Previous edits no longer need their pending snap responses.
    for (const controller of snapControllers.current) controller.abort();
    snapControllers.current.clear();
  }

  function undoEdit() {
    if (!canEdit || pending || routing || snappingCount) return;
    const previous = previousEdits.current.pop();
    if (!previous) return;
    snapVersion.current++;
    setPoints(previous);
    setSaved(false);
    setError("");
  }

  // Snap an edited marker without exposing the routing-provider key to the browser.
  // A version check discards responses after undo, cancel, reorder, or another edit.
  async function snapStop(id: string, raw: LatLng, version: number) {
    if (!followTrails) return;
    const remaining = rateLimitRemaining();
    if (remaining) { setRoutingMessage(`Trail routing paused. Try again in about ${remaining}s.`); return; }
    const controller = new AbortController();
    snapControllers.current.add(controller);
    setSnappingCount(n => n + 1);
    try {
      const response = await fetch("/api/trails/snap", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buildId, point: raw }),
        signal: controller.signal,
      });
      if (response.status === 429) rememberRateLimit(response);
      const payload: unknown = await response.json();
      if (version !== snapVersion.current) return;
      if (!response.ok) {
        setRoutingMessage((payload as { error?: string }).error ?? "No nearby routable hiking trail found. Kept the original stop position.");
        return;
      }
      const value = payload as { point?: LatLng };
      if (!Array.isArray(value.point) || !validCoordinates(value.point[0], value.point[1])) return;
      setPoints(current => current.map((point, index) => {
        if (point.id === id && metersBetween([point.lat, point.lng], raw) < 0.2) {
          return { ...point, lat: value.point![0], lng: value.point![1], trailToNext: undefined };
        }
        if (index + 1 < current.length && current[index + 1].id === id) return { ...point, trailToNext: undefined };
        return point;
      }));
    } catch {
      if (!controller.signal.aborted && version === snapVersion.current) setRoutingMessage("Trail snapping is unavailable. Your original stop location has been preserved.");
    } finally {
      snapControllers.current.delete(controller);
      setSnappingCount(n => Math.max(0, n - 1));
    }
  }

  // Shaping waypoints are coordinates on a route segment, NOT saved stops.
  // They snap to nearby hiking trails, but never enter the itinerary list.
  async function snapShapingWaypoint(stopId: string, viaIndex: number, raw: LatLng, version: number) {
    if (!followTrails) return;
    const remaining = rateLimitRemaining();
    if (remaining) { setRoutingMessage(`Trail routing paused. Try again in about ${remaining}s.`); return; }
    const controller = new AbortController();
    snapControllers.current.add(controller);
    setSnappingCount(n => n + 1);
    try {
      const response = await fetch("/api/trails/snap", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buildId, point: raw }),
        signal: controller.signal,
      });
      if (response.status === 429) rememberRateLimit(response);
      const payload: unknown = await response.json();
      if (version !== snapVersion.current) return;
      if (!response.ok) {
        setRoutingMessage((payload as { error?: string }).error ?? "No nearby hiking trail found. Kept the shaping waypoint in place.");
        return;
      }
      const snapped = (payload as { point?: LatLng }).point;
      if (!Array.isArray(snapped) || !validCoordinates(snapped[0], snapped[1])) return;
      setPoints(current => current.map(point => {
        const previous = point.viaToNext?.[viaIndex];
        if (point.id !== stopId || !previous || metersBetween(previous, raw) >= 0.2) return point;
        const viaToNext = [...point.viaToNext!];
        viaToNext[viaIndex] = [snapped[0], snapped[1]];
        return { ...point, viaToNext, trailToNext: undefined };
      }));
    } catch {
      if (!controller.signal.aborted && version === snapVersion.current) setRoutingMessage("Waypoint snapping unavailable; original shaping position preserved.");
    } finally {
      snapControllers.current.delete(controller);
      setSnappingCount(n => Math.max(0, n - 1));
    }
  }

  // Re-route only invalid/missing adjacent sections. Reuse saved and recent
  // geometry even when optional elevation metadata was not provided by ORS.
  const topologyKey = points.map(p => `${p.id}:${p.lat}:${p.lng}:${p.manualToNext === true}:${JSON.stringify(p.viaToNext ?? [])}`).join("|");
  useEffect(() => {
    if (!canEdit || !followTrails || pending || snappingCount > 0) { setRouting(false); return; }
    // Seed the edit-session cache with valid tracks already present in the build.
    for (let i = 0; i < points.length - 1; i++) {
      const from = points[i], to = points[i + 1];
      const segment = usableTrailSegment(from, to);
      if (segment?.source === "openrouteservice") {
        rememberRoutedLeg(orsCoordinateKey("route", [[from.lat, from.lng], ...(from.viaToNext ?? []), [to.lat, to.lng]]), segment);
      }
    }
    const missing = missingTrailLegs(points);
    if (!missing.length) { setRouting(false); return; }
    const key = `${topologyKey}|${retryRouting}`;
    if (attemptedRoute.current === key) return;
    attemptedRoute.current = key;
    const remaining = rateLimitRemaining();
    if (remaining) {
      setRoutingMessage(`Trail routing paused due to rate limits. Try again in about ${remaining}s. Missing links remain approximate.`);
      setRouting(false);
      return;
    }
    let alive = true;
    let completed = false;
    const controller = new AbortController();
    setRouting(true);
    const timer = window.setTimeout(async () => {
      const updates = new Map<string, TrailSegment>();
      let failures = 0;
      let reason = "";
      let rateLimited = false;
      let serviceUnavailable = false;
      let attempted = 0;
      for (const { from, to } of missing) {
        if (!alive) return;
        const routeKey = orsCoordinateKey("route", [[from.lat, from.lng], ...(from.viaToNext ?? []), [to.lat, to.lng]]);
        const cached = recentRoutes.current.get(routeKey);
        if (cached) {
          const segment = { ...cached, toId: to.id };
          if (usableTrailSegment({ ...from, trailToNext: segment }, to)) {
            updates.set(from.id, segment);
            continue;
          }
          recentRoutes.current.delete(routeKey);
        }
        attempted++;
        try {
          const response = await fetch("/api/trails/route", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ buildId, from: [from.lat, from.lng], via: from.viaToNext ?? [], to: [to.lat, to.lng] }),
            signal: controller.signal,
          });
          if (response.status === 429) {
            const seconds = rememberRateLimit(response);
            reason = `Provider rate limit reached. Retry in about ${seconds}s.`;
            rateLimited = true;
            break; // Do NOT send the other pending segments to a throttled provider.
          }
          if (!response.ok) {
            failures++;
            if (!reason) {
              const data = await response.json().catch(() => ({})) as { error?: unknown };
              if (typeof data.error === "string" && data.error.length < 250) reason = data.error;
            }
            if (response.status === 503 || response.status === 502) {
              serviceUnavailable = true;
              break;
            }
            continue;
          }
          const result = await response.json() as {
            geometry: LatLng[]; distanceM: number; elevationsM?: number[]; ascentM?: number; descentM?: number;
          };
          const segment: TrailSegment = {
            toId: to.id, geometry: result.geometry, distanceM: result.distanceM,
            ...(result.elevationsM ? { elevationsM: result.elevationsM } : {}),
            ...(result.ascentM !== undefined && result.descentM !== undefined
              ? { ascentM: result.ascentM, descentM: result.descentM } : {}),
            source: "openrouteservice",
          };
          if (validTrailSegment(segment) && usableTrailSegment({ ...from, trailToNext: segment }, to)) {
            updates.set(from.id, segment);
            rememberRoutedLeg(routeKey, segment);
          } else failures++;
        } catch {
          if (!alive) return;
          failures++;
        }
      }
      if (!alive) return;
      completed = true;
      if (updates.size) setPoints(current => {
        const currentKey = current.map(p => `${p.id}:${p.lat}:${p.lng}:${p.manualToNext === true}:${JSON.stringify(p.viaToNext ?? [])}`).join("|");
        if (currentKey !== topologyKey) return current;
        return current.map(p => updates.has(p.id) ? { ...p, trailToNext: updates.get(p.id) } : p);
      });
      const unrequested = missing.length - updates.size - failures;
      if (rateLimited || serviceUnavailable) {
        setRoutingMessage(`${reason || "Trail routing is temporarily unavailable."} ${Math.max(0, unrequested)} remaining segment${unrequested === 1 ? " was" : "s were"} not routed. Dashed links are approximate, not verified trails.`);
      } else {
        setRoutingMessage(failures ? `${failures} segment${failures === 1 ? "" : "s"} could not follow trails. ${reason || "No connected trail was found."} Dashed lines are approximate, not verified paths.` : "");
      }
      setRouting(false);
    }, 450);
    return () => { alive = false; controller.abort(); window.clearTimeout(timer); if (!completed) attemptedRoute.current = ""; };
  }, [canEdit, followTrails, pending, snappingCount, points, topologyKey, retryRouting, buildId]);

  function changeMode(next: boolean) {
    if (!canEdit || pending || routing || snappingCount) return;
    rememberEdit();
    setToolsMenuOpen(false);
    setFollowTrails(next);
    setRoutingMessage("");
    setPoints(current => current.map((point, i) => ({
      ...point,
      trailToNext: undefined,
      manualToNext: next ? undefined : i < current.length - 1 ? true : undefined,
    })));
    changed();
  }

  function changed() {
    setSaved(false);
    if (!outdated) setError("");
  }

  function patch(id: string, data: Partial<Waypoint>) {
    if (!canEdit || pending) return;

    rememberEdit();
    setPoints((current) => current.map((point, index) => {
      if (point.id === id) {
        const moved = data.lat !== undefined || data.lng !== undefined;
        return { ...point, ...data, id: point.id, ...(moved ? { trailToNext: undefined } : {}) };
      }
      if ((data.lat !== undefined || data.lng !== undefined) && current[index + 1]?.id === id)
        return { ...point, trailToNext: undefined };
      return point;
    }));
    changed();
  }

  function addStop(
    latitude: number,
    longitude: number,
    name?: string,
    recenter = false
  ) {
    if (!canEdit || pending || !validCoordinates(latitude, longitude)) return;

    if (points.length >= 200) {
      setError("A route can have up to 200 stops.");
      return;
    }

    rememberEdit();
    const version = snapVersion.current;
    const id = crypto.randomUUID();

    setPoints((current) => [
      ...current.map((p, i) => i === current.length - 1 ? { ...p, trailToNext: undefined, manualToNext: followTrails ? undefined : true } : p),
      {
        id,
        name: name?.trim().slice(0, 200) || nextWaypointName(current, kind),
        lat: latitude,
        lng: longitude,
        kind,
        elevationM: null,
        ...(placingDayId ? { dayId: placingDayId } : {}),
      },
    ]);

    if (followTrails) void snapStop(id, [latitude, longitude], version);
    setSelectedId(id);
    setPlacing(false);
    setPlacingDayId(null);
    changed();

    if (recenter) {
      setFocus((previous) => ({
        lat: latitude,
        lng: longitude,
        request: (previous?.request ?? 0) + 1,
      }));
    }
  }

  function insertShapingWaypoint(afterIndex: number, viaIndex: number, latitude: number, longitude: number) {
    if (!canEdit || pending || !validCoordinates(latitude, longitude)) return;
    const before = points[afterIndex];
    if (!before || !points[afterIndex + 1]) return;
    if ((before.viaToNext?.length ?? 0) >= MAX_ROUTE_SHAPING_WAYPOINTS) {
      setError(`A route section can have at most ${MAX_ROUTE_SHAPING_WAYPOINTS} shaping waypoints.`);
      return;
    }
    rememberEdit();
    const version = snapVersion.current;
    setPoints(current => current.map((point, i) => {
      if (i !== afterIndex) return point;
      const viaToNext = [...(point.viaToNext ?? [])];
      viaToNext.splice(viaIndex, 0, [latitude, longitude]);
      return { ...point, viaToNext, trailToNext: undefined };
    }));
    changed();
    if (followTrails) void snapShapingWaypoint(before.id, viaIndex, [latitude, longitude], version);
  }

  function moveShapingWaypoint(stopId: string, viaIndex: number, latitude: number, longitude: number) {
    if (!canEdit || pending || !validCoordinates(latitude, longitude)) return;
    const before = points.find(point => point.id === stopId);
    if (!before?.viaToNext?.[viaIndex]) return;
    rememberEdit();
    const version = snapVersion.current;
    setPoints(current => current.map(point => {
      if (point.id !== stopId || !point.viaToNext?.[viaIndex]) return point;
      const viaToNext = [...point.viaToNext];
      viaToNext[viaIndex] = [latitude, longitude];
      return { ...point, viaToNext, trailToNext: undefined };
    }));
    changed();
    if (followTrails) void snapShapingWaypoint(stopId, viaIndex, [latitude, longitude], version);
  }

  function removeShapingWaypoint(stopId: string, viaIndex: number) {
    if (!canEdit || pending) return;
    const before = points.find(point => point.id === stopId);
    if (!before?.viaToNext?.[viaIndex]) return;
    rememberEdit();
    setPoints(current => current.map(point => {
      if (point.id !== stopId || !point.viaToNext?.[viaIndex]) return point;
      const viaToNext = point.viaToNext.filter((_, i) => i !== viaIndex);
      return { ...point, viaToNext: viaToNext.length ? viaToNext : undefined, trailToNext: undefined };
    }));
    changed();
  }

  // Moving a saved stop into a different position changes which segment owns
  // its shaping waypoints. Retain only via-points on unchanged stop pairs.
  function resetChangedSections(original: Waypoint[], reordered: Waypoint[]): Waypoint[] {
    const nextById = new Map(original.slice(0, -1).map((point, i) => [point.id, original[i + 1].id]));
    return reordered.map((point, i) => ({
      ...point,
      viaToNext: reordered[i + 1]?.id === nextById.get(point.id) ? point.viaToNext : undefined,
      trailToNext: undefined,
      manualToNext: followTrails ? undefined : i < reordered.length - 1 ? true : undefined,
    }));
  }

  function choosePlace(place: PlaceResult) {
    addStop(place.lat, place.lng, place.name, true);
  }

  function pick(latitude: number, longitude: number) {
    if (!canEdit || pending) return;

    if (placing) addStop(latitude, longitude);
  }

  function select(point: Waypoint, dayOverride?: string) {
    setSelectedId(point.id);
    setActiveDayId(dayOverride ?? point.dayId ?? null);
    setHoverProfile(null);
    setFocus((previous) => ({
      lat: point.lat,
      lng: point.lng,
      request: (previous?.request ?? 0) + 1,
    }));
  }

  // Day changes only highlight assigned map markers. The camera does not jump
  // around as someone scrolls the itinerary; clicking a stop still focuses it.

  function cancel() {
    if (
      pending ||
      (dirty && !window.confirm("Discard your unsaved route changes?"))
    ) {
      return;
    }

    snapVersion.current++;
    previousEdits.current = [];
    setToolsMenuOpen(false);
    setPoints(committed);
    setFollowTrails(committed.length < 2 || !committed.slice(0, -1).every(point => point.manualToNext === true));
    setEditing(false);
    setPlacing(false);
    setPlacingDayId(null);
    setSelectedId(null);
    setEditingStopId(null);
    setError("");
    setSaved(false);
    setOutdated(false);
  }

  function save() {
    if (!canEdit || pending || outdated || routing || snappingCount > 0) return;

    let route: Waypoint[];

    try {
      route = routeForSave(consolidateOvernightStops(followTrails ? points : points.map((point, index) => ({
        ...point, trailToNext: undefined, manualToNext: index < points.length - 1 ? true : undefined,
      })), days).points);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Check the route stops."
      );
      return;
    }

    setError("");

    start(async () => {
      try {
        const form = new FormData();
        form.set("buildId", buildId);
        form.set("waypoints", JSON.stringify(route));

        await saveTripRoute(form);

        snapVersion.current++;
        previousEdits.current = [];
        setCommitted(route);
        setPoints(route);
        setSaved(true);
        setEditing(false);
        setToolsMenuOpen(false);
        setPlacing(false);
        setPlacingDayId(null);
        setSelectedId(null);
        setEditingStopId(null);
        router.refresh();
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "Could not save the route. Your changes are still here. Try again."
        );
      }
    });
  }

  function startAddingToDay(dayId: string, nextKind: Waypoint["kind"]) {
    if (readOnly || pending) return;
    setEditing(true);
    setKind(nextKind);
    setPlacingDayId(dayId);
    setPlacing(true);
    setError("");
    setSaved(false);
  }

  function assignStop(id: string, dayId: string | null) {
    if (readOnly || pending) return;
    setEditing(true);
    setPoints((current) => current.map((point) => point.id === id ? { ...point, dayId } : point));
    changed();
  }

  function editStop(id: string) {
    if (readOnly || pending) return;
    const point = points.find((p) => p.id === id);
    if (!point) return;
    // Shared campsites can be edited from either day. The same waypoint ID
    // must not cause both day editors to open or prevent switching days.
    if (editingStopId === id && activeDayId === (point.dayId ?? null)) {
      setEditingStopId(null);
      return;
    }
    setEditing(true);
    setEditingStopId(id);
    setPlacing(false);
    setPlacingDayId(null);
    select(point);
  }

  function editOvernightStart(point: Waypoint, nextDayId: string) {
    if (readOnly || pending || !points.some(item => item.id === point.id)) return;
    if (editingStopId === point.id && activeDayId === nextDayId) {
      setEditingStopId(null);
      return;
    }
    setEditing(true);
    setEditingStopId(point.id);
    setPlacing(false);
    setPlacingDayId(null);
    select(point, nextDayId);
  }

  function removeStop(id: string) {
    if (!canEdit || pending) return;
    rememberEdit();
    setPoints((current) => resetChangedSections(current, current.filter((p) => p.id !== id)));
    if (selectedId === id) setSelectedId(null);
    if (editingStopId === id) setEditingStopId(null);
    changed();
  }

  function moveStop(id: string, delta: -1 | 1) {
    if (!canEdit || pending) return;
    rememberEdit();
    // Change route order within the stop's own day, not across another day.
    setPoints((current) => {
      const point = current.find((item) => item.id === id);
      if (!point) return current;
      const sameDay = current.filter((item) => (item.dayId ?? null) === (point.dayId ?? null));
      const position = sameDay.findIndex((item) => item.id === id);
      const neighbor = sameDay[position + delta];
      if (!neighbor) return current;
      const first = current.findIndex((item) => item.id === point.id);
      const second = current.findIndex((item) => item.id === neighbor.id);
      const reordered = [...current];
      [reordered[first], reordered[second]] = [reordered[second], reordered[first]];
      return resetChangedSections(current, reordered);
    });
    changed();
  }

  // Drag a stop inside a day, into another day, or from the unassigned list.
  // The same waypoint array drives both the timeline and the Leaflet markers.
  function moveStopToDay(id: string, dayId: string | null, beforeId?: string) {
    if (readOnly || pending) return;
    if (dayId && !days.some((day) => day.id === dayId)) return;
    setEditing(true);
    rememberEdit();
    setPoints((current) => {
      const moving = current.find((point) => point.id === id);
      if (!moving) return current;
      const remaining = current.filter((point) => point.id !== id);
      const updated = { ...moving, dayId };
      const target = beforeId
        ? remaining.findIndex((point) => point.id === beforeId && (point.dayId ?? null) === dayId)
        : -1;
      let insertAt = target;
      if (insertAt < 0) {
        const lastInDay = remaining.findLastIndex((point) => (point.dayId ?? null) === dayId);
        if (lastInDay >= 0) {
          insertAt = lastInDay + 1;
        } else {
          const dayPosition = days.findIndex((day) => day.id === dayId);
          const following = remaining.findIndex((point) => {
            const position = days.findIndex((day) => day.id === point.dayId);
            return dayPosition >= 0 && position > dayPosition;
          });
          insertAt = following >= 0 ? following : remaining.length;
        }
      }
      remaining.splice(insertAt, 0, updated);
      return resetChangedSections(current, remaining);
    });
    setSelectedId(id);
    changed();
  }

  const routeControls: RouteWorkspaceControls = {
    metrics, paceKmh, breakSettings, points, days, selectedId, activeDayId, expandedDayIds,
    setDayExpanded: (id, open) => setExpandedDayIds(current => open
      ? current.includes(id) ? current : [...current, id]
      : current.filter(dayId => dayId !== id)),
    focusDay: (id) => { setActiveDayId(id); setSelectedId(null); setHoverProfile(null); }, editingStopId, editing: canEdit, pending, readOnly,
    placingDayId: placing ? placingDayId : null,
    kind, near,
    selectStop: select, selectOvernightStart:(point,nextDayId)=>select(point,nextDayId), editStop, editOvernightStart, updateStop: patch, assignStop,
    removeStop, moveStop, moveStopToDay, startAddingToDay,
    stopAdding: () => { setPlacing(false); setPlacingDayId(null); },
    choosePlace,
  };

  function inspectTerrainSection(section: SustainedSlope) {
    const midpoint = (section.startM + section.endM) / 2;
    // Only locate intervals supported by the same sampled trail data used by the map profile.
    const position = locationAtDistance(explorer, midpoint);
    if (!position) return;
    setActiveDayId(section.dayId ?? null);
    setSelectedId(null);
    setHoverProfile(position);
    setFocusedTerrainRange({ startM: section.startM, endM: section.endM });
    setElevationOpen(true);
    setProfileMode("gradient");
    setFocus(previous => ({ lat: position.lat, lng: position.lng, request: (previous?.request ?? 0) + 1 }));
    document.getElementById("route")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function replaceFromGpx(next: Waypoint[]): boolean {
    if (readOnly || pending || routing || snappingCount > 0 || outdated) return false;
    snapVersion.current++;
    previousEdits.current = [];
    attemptedRoute.current = "";
    setFollowTrails(true);
    setEditing(true);
    setPoints(next);
    setSelectedId(null);
    setEditingStopId(null);
    setPlacing(false);
    setPlacingDayId(null);
    setOutdated(false);
    setSaved(false);
    setError("");
    setRoutingMessage("");
    return true;
  }

  // The global Import / Export toolbar communicates with the mounted route
  // editor. Retain draft-aware GPX export without duplicating controls here.
  useEffect(() => {
    const importRequested = (event: Event) => {
      const detail = (event as CustomEvent<GpxToolbarImport>).detail;
      if (detail?.buildId !== buildId) return;
      const accepted = replaceFromGpx(detail.points);
      detail.respond(accepted, accepted ? undefined : "Route editing is currently unavailable. Finish saving or routing and try again.");
      if (accepted) document.getElementById("route")?.scrollIntoView({ block: "start", behavior: "smooth" });
    };
    const exportRequested = (event: Event) => {
      const detail = (event as CustomEvent<GpxToolbarExport>).detail;
      if (detail?.buildId !== buildId) return;
      if (points.length < 2) {
        detail.respond(false, "Add at least two route stops before exporting GPX.");
        return;
      }
      try {
        const url = URL.createObjectURL(new Blob([exportGpx(points, buildName)], { type: "application/gpx+xml;charset=utf-8" }));
        const link = document.createElement("a");
        link.href = url;
        link.download = "trailpicker-route.gpx";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 5000);
        detail.respond(true);
      } catch {
        detail.respond(false, "Could not export this GPX route.");
      }
    };
    const ready = (event?: Event) => {
      if (event && (event as CustomEvent<string>).detail !== buildId) return;
      window.dispatchEvent(new CustomEvent(GPX_TOOLBAR_READY, { detail: buildId }));
    };
    window.addEventListener(GPX_TOOLBAR_IMPORT, importRequested);
    window.addEventListener(GPX_TOOLBAR_EXPORT, exportRequested);
    window.addEventListener(GPX_TOOLBAR_PING, ready);
    ready();
    return () => {
      window.removeEventListener(GPX_TOOLBAR_IMPORT, importRequested);
      window.removeEventListener(GPX_TOOLBAR_EXPORT, exportRequested);
      window.removeEventListener(GPX_TOOLBAR_PING, ready);
    };
  }, [buildId, buildName, points, readOnly, pending, routing, snappingCount, outdated]);

  // The retired resource panel used to own these bridges. Keep the
  // live route export and consumables water estimates attached to the route
  // itself, including while the user is editing an unsaved draft.
  const liveExport: TripExport = {
    name: buildName, people, days, points,
    logistics: readLogistics(tripLogistics),
    bookings: readPrivateResources(tripLogistics).bookings,
    arrangements: readArrangements(tripLogistics),
    packLines, foodPlan: readFoodPlan(tripLogistics),
  };
  const liveExportRef = useRef(liveExport);
  liveExportRef.current = liveExport;
  const routeWaterRef = useRef<RouteWaterPointsChanged>({ buildId, points, draft: dirty });
  routeWaterRef.current = { buildId, points, draft: dirty };
  useEffect(() => {
    if (readOnly) return;
    const onExport = (event: Event) => {
      const request = (event as CustomEvent<TripExportRequest>).detail;
      if (request?.buildId === buildId) request.respond(liveExportRef.current);
    };
    const onWaterRequest = (event: Event) => {
      const request = (event as CustomEvent<RouteWaterPointsRequest>).detail;
      if (request?.buildId === buildId) request.respond(routeWaterRef.current);
    };
    window.addEventListener(TRIP_EXPORT_REQUEST, onExport);
    window.addEventListener(ROUTE_WATER_POINTS_REQUEST, onWaterRequest);
    return () => {
      window.removeEventListener(TRIP_EXPORT_REQUEST, onExport);
      window.removeEventListener(ROUTE_WATER_POINTS_REQUEST, onWaterRequest);
    };
  }, [buildId, readOnly]);
  useEffect(() => {
    if (!readOnly) window.dispatchEvent(new CustomEvent(ROUTE_WATER_POINTS_CHANGED, { detail: routeWaterRef.current }));
  }, [buildId, points, dirty, readOnly]);

  return (
    <>
    <section id="route" data-route-unsaved={dirty ? "true" : "false"} aria-label="Route map and stops" className="min-w-0 scroll-mt-20 border-b border-gray-200 pb-6">
      {header}
      <ResizableRouteLayout enabled={Boolean(renderItinerary)}>
      <div className="min-w-0">
      {/* One full-height map pane. Isolate its high-z-index Leaflet layers and elevation drawer so they cannot paint over the sticky navbar. */}
      <div
        className="relative isolate z-0 min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white xl:h-[min(82vh,870px)]"
        style={{ "--route-profile-inset": elevationOpen ? `min(${elevationHeight + 12}px, calc(100% - 170px))` : "0px" } as CSSProperties}
      >
      <div className="pointer-events-none absolute left-3 right-28 top-3 z-[1100] flex flex-col items-start gap-2">
        <div className="pointer-events-auto flex flex-wrap items-center gap-2" aria-label="Route workspace controls">
          {!readOnly && (
            editing ? (
              <>
                <button
                  type="button"
                  disabled={pending || routing || snappingCount > 0 || !dirty || outdated}
                  onClick={save}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-green-900 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-green-800 disabled:opacity-40"
                >
                  <Check className="h-4 w-4" aria-hidden="true" />
                  {outdated ? "Resolve conflict" : pending ? "Saving…" : "Save route"}
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={cancel}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-40"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  aria-label="Undo route edit"
                  title="Undo route edit"
                  disabled={!previousEdits.current.length || pending || routing || snappingCount > 0}
                  onClick={undoEdit}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-40"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                </button>
                <div className="relative" ref={toolsMenuRef}>
                  <button
                    type="button"
                    aria-label="More route editing tools"
                    title="More route editing tools"
                    aria-haspopup="true"
                    aria-expanded={toolsMenuOpen}
                    aria-controls="route-editing-more-menu"
                    disabled={pending}
                    onClick={() => setToolsMenuOpen(open => !open)}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-white text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-40 ${toolsMenuOpen ? "border-green-700" : "border-gray-200"}`}
                  >
                    <Ellipsis className="h-4 w-4" aria-hidden="true" />
                  </button>
                  {toolsMenuOpen && (
                    <div id="route-editing-more-menu" role="group" aria-label="Route editing options"
                      className="absolute left-0 top-full z-[1200] mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                      <p className="px-2 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Routing mode</p>
                      <button type="button" aria-pressed={followTrails}
                        disabled={pending || routing || snappingCount > 0}
                        onClick={() => { if (!followTrails) changeMode(true); else setToolsMenuOpen(false); }}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-medium hover:bg-gray-50 disabled:opacity-40 ${followTrails ? "bg-green-50 text-green-900" : "text-gray-700"}`}>
                        <span className="flex items-center gap-2"><Route className="h-3.5 w-3.5" aria-hidden="true" /> Follow trails</span>
                        {followTrails && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                      </button>
                      <button type="button" aria-pressed={!followTrails}
                        disabled={pending || routing || snappingCount > 0}
                        onClick={() => { if (followTrails) changeMode(false); else setToolsMenuOpen(false); }}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-medium hover:bg-gray-50 disabled:opacity-40 ${!followTrails ? "bg-green-50 text-green-900" : "text-gray-700"}`}>
                        <span>Straight lines</span>
                        {!followTrails && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                      </button>
                      {followTrails && routingMessage && (
                        <>
                          <div className="my-2 border-t border-gray-100" />
                          <button type="button" disabled={pending || routing || snappingCount > 0}
                            onClick={() => { attemptedRoute.current = ""; setRetryRouting(n => n + 1); setToolsMenuOpen(false); }}
                            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-amber-900 hover:bg-amber-50 disabled:opacity-40">
                            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Retry routing
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setToolsMenuOpen(false);
                  setEditing(true);
                  setSaved(false);
                  setError("");
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 shadow-sm hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-green-700"
              >
                <Pencil className="h-4 w-4" aria-hidden="true" />
                Edit route
              </button>
            )
          )}
          {/* The optional elevation drawer always follows the edit toolbar, never leads it. */}
          <button
            type="button"
            aria-controls="route-elevation-profile"
            aria-expanded={elevationOpen}
            aria-pressed={elevationOpen}
            onClick={() => {
              if (elevationOpen) setHoverProfile(null);
              setElevationOpen(open => !open);
            }}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-green-700 ${elevationOpen ? "border-green-700 bg-green-50 text-green-900 hover:bg-green-100" : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"}`}
          >
            <Mountain className="h-4 w-4" aria-hidden="true" />
            Elevation profile
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${elevationOpen ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
        </div>
        {placing && canEdit && (
          <div role="status" className="pointer-events-auto flex items-center gap-2 rounded-lg border border-green-200 bg-white px-3 py-2 text-xs text-green-900 shadow-sm">
            <span>Click the map to add a {waypointType(kind).label.toLowerCase()}.</span>
            <button type="button" disabled={pending} aria-label="Cancel map placement"
              onClick={() => { setPlacing(false); setPlacingDayId(null); }}
              className="rounded p-0.5 hover:bg-gray-100">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      <RouteMap
            points={points}
            fallback={fallback}
            selectedId={selectedId}
            compact
            profileDocked
            activeDayId={activeDayId}
            expandedDayIds={expandedDayIds}
            editing={canEdit}
            hoverLocation={hoverProfile ? [hoverProfile.lat, hoverProfile.lng] : null}
            focus={focus}
            onPick={
              canEdit && !pending && placing
                ? pick
                : undefined
            }
            onSelect={(id) => {
              const point = points.find((item) => item.id === id);
              if (point) select(point);
            }}
            onInsert={canEdit && !pending && !placing && snappingCount === 0 ? insertShapingWaypoint : undefined}
            onMoveVia={canEdit && !pending ? moveShapingWaypoint : undefined}
            onRemoveVia={canEdit && !pending ? removeShapingWaypoint : undefined}
            onMove={
              canEdit && !pending
                ? (id, a, b) => {
                    if (validCoordinates(a, b)) {
                      patch(id, { lat: a, lng: b });
                      const version = snapVersion.current;
                      if (followTrails) void snapStop(id, [a, b], version);
                      setSelectedId(id);
                    }
                  }
                : undefined
            }
          />
        {elevationOpen && <ResizableElevationDock onHeightChange={setElevationHeight}>
          <RouteProfileDock route={explorer} days={days} points={points} activeDayId={activeDayId}
            selectedId={selectedId} hover={hoverProfile} onHover={setHoverProfile}
            focusedRange={focusedTerrainRange}
            profileMode={profileMode} onProfileModeChange={setProfileMode}
            onDayChange={(id) => { setActiveDayId(id); setSelectedId(null); setHoverProfile(null); setFocusedTerrainRange(null); }} />
        </ResizableElevationDock>}
      </div>

      <footer className="space-y-2 pt-3">
        {canEdit && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {WAYPOINT_TYPES.map((type) => (
            <span
              key={type.kind}
              className="flex items-center gap-1.5 text-xs text-gray-500"
            >
              <span style={{ color: type.color }}>
                <WaypointIcon
                  kind={type.kind}
                  className="h-3.5 w-3.5"
                />
              </span>
              {type.label}
            </span>
          ))}
        </div>
        )}

        <p className="text-xs leading-5 text-gray-500">
          Solid green sections are mapped hiking paths or imported GPX tracks (not independently verified).
          Dashed sections are direct connections, not verified trails.
          {canEdit ? " Click + or a route line to add a shaping waypoint, drag blue diamond handles, or drag saved stops." : ""}
        </p>
        {canEdit && (routing || snappingCount > 0 || routingMessage) && (
          <p role="status" aria-live="polite" className="text-xs text-amber-800">
            {snappingCount > 0 ? "Snapping route handles and stops to nearby trails…" : routing ? "Finding hiking paths between stops…" : routingMessage}
          </p>
        )}

        {error && !outdated && (
          <p role="alert" className="text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <p
          role="status"
          aria-live="polite"
          className="text-xs text-green-800"
        >
          {pending
            ? "Saving route…"
            : saved
              ? "Route saved."
              : canEdit && dirty && !outdated
                ? "Unsaved changes"
                : ""}
        </p>
      </footer>
      </div>
      {renderItinerary?.(routeControls)}
      </ResizableRouteLayout>
    </section>
    <RouteAnalysisSection points={points} days={days} working={dirty} readOnly={readOnly}
      busy={pending || routing || snappingCount > 0 || outdated}
      outdated={outdated} reloadDisabled={pending} onReloadSavedRoute={cancel}
      paceKmh={paceKmh} onPaceChange={setPaceKmh} breaks={breakSettings} onBreaksChange={setBreakSettings} onSave={save}
      activeDayId={activeDayId} onDayChange={(id) => { setActiveDayId(id); setSelectedId(null); setHoverProfile(null); setFocusedTerrainRange(null); }}
      onInspectTerrain={inspectTerrainSection} />
    </>
  );
}






