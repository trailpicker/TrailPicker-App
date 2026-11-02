
"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Pencil,
  X,
} from "lucide-react";
import { readWaypoints, type Waypoint, type PlannerDay } from "@/lib/trip-planner";
import { saveTripRoute } from "@/lib/tracked-build-actions";
import {
  WAYPOINT_TYPES,
  nextWaypointName,
  routeForSave,
  validCoordinates,
  waypointType,
  type PlaceResult,
} from "@/lib/waypoint-map";
import WaypointIcon from "./WaypointIcon";
import type { MapFocus } from "./RouteMapInner";
import ResizableRouteLayout from "./ResizableRouteLayout";

export type RouteWorkspaceControls = {
  points: Waypoint[];
  days: PlannerDay[];
  selectedId: string | null;
  editingStopId: string | null;
  editing: boolean;
  pending: boolean;
  readOnly: boolean;
  placingDayId: string | null;
  kind: Waypoint["kind"];
  near: [number, number] | null;
  selectStop: (point: Waypoint) => void;
  editStop: (id: string) => void;
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
}: {
  buildId: string;
  value: unknown;
  lat: number | null;
  lng: number | null;
  readOnly?: boolean;
  days?: PlannerDay[];
  renderItinerary?: (route: RouteWorkspaceControls) => ReactNode;
}) {
  // Server props can change after import, restore, undo, or a route save.
  // Keep a stable fingerprint so unrelated router refreshes do not reset edits.
  const serverRouteKey = JSON.stringify(readWaypoints(value));
  const [points, setPoints] = useState(() => readWaypoints(value));
  const [committed, setCommitted] = useState(() => readWaypoints(value));
  const lastServerRouteKey = useRef(serverRouteKey);
  const [outdated, setOutdated] = useState(false);
  const [editing, setEditing] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [kind, setKind] = useState<Waypoint["kind"]>("waypoint");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingStopId, setEditingStopId] = useState<string | null>(null);
  const [focus, setFocus] = useState<MapFocus | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [placingDayId, setPlacingDayId] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const router = useRouter();

  const fallback: [number, number] | null = validCoordinates(lat, lng)
    ? [lat as number, lng as number]
    : null;

  const selected = points.find((point) => point.id === selectedId);
  const dirty = JSON.stringify(points) !== JSON.stringify(committed);
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
      setPlacing(false);
      setPlacingDayId(null);
      setSelectedId(null);
      setEditingStopId(null);
      setFocus(null);
      setError("");
      setSaved(false);
      setOutdated(false);
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
        setError("The saved route changed while you were editing. Cancel to load the latest route before saving.");
        return;
      }
      setPoints(nextRoute);
      setEditing(false);
      setPlacing(false);
      setPlacingDayId(null);
      setSelectedId(null);
      setEditingStopId(null);
      setFocus(null);
      setError("");
      setSaved(false);
      setOutdated(false);
    });
    return () => { cancelled = true; };
  }, [serverRouteKey, editing, dirty]);

  useEffect(() => {
    if (!canEdit || !dirty) return;

    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [canEdit, dirty]);

  function changed() {
    setSaved(false);
    if (!outdated) setError("");
  }

  function patch(id: string, data: Partial<Waypoint>) {
    if (!canEdit || pending) return;

    setPoints((current) =>
      current.map((point) =>
        point.id === id ? { ...point, ...data, id: point.id } : point
      )
    );
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

    const id = crypto.randomUUID();

    setPoints((current) => [
      ...current,
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

  function choosePlace(place: PlaceResult) {
    addStop(place.lat, place.lng, place.name, true);
  }

  function pick(latitude: number, longitude: number) {
    if (!canEdit || pending) return;

    if (placing) addStop(latitude, longitude);
  }

  function select(point: Waypoint) {
    setSelectedId(point.id);
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

    setPoints(committed);
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
    if (!canEdit || pending || outdated) return;

    let route: Waypoint[];

    try {
      route = routeForSave(points);
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

        setCommitted(route);
        setPoints(route);
        setSaved(true);
        setEditing(false);
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
    // The pencil is a toggle, independent of which marker is selected.
    if (editingStopId === id) {
      setEditingStopId(null);
      return;
    }
    const point = points.find((p) => p.id === id);
    if (!point) return;
    setEditing(true);
    setEditingStopId(id);
    setPlacing(false);
    setPlacingDayId(null);
    select(point);
  }

  function removeStop(id: string) {
    if (!canEdit || pending) return;
    setPoints((current) => current.filter((p) => p.id !== id));
    if (selectedId === id) setSelectedId(null);
    if (editingStopId === id) setEditingStopId(null);
    changed();
  }

  function moveStop(id: string, delta: -1 | 1) {
    if (!canEdit || pending) return;
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
      return reordered;
    });
    changed();
  }

  // Drag a stop inside a day, into another day, or from the unassigned list.
  // The same waypoint array drives both the timeline and the Leaflet markers.
  function moveStopToDay(id: string, dayId: string | null, beforeId?: string) {
    if (readOnly || pending) return;
    if (dayId && !days.some((day) => day.id === dayId)) return;
    setEditing(true);
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
      return remaining;
    });
    setSelectedId(id);
    changed();
  }

  const routeControls: RouteWorkspaceControls = {
    points, days, selectedId, editingStopId, editing: canEdit, pending, readOnly,
    placingDayId: placing ? placingDayId : null,
    kind, near,
    selectStop: select, editStop, updateStop: patch, assignStop,
    removeStop, moveStop, moveStopToDay, startAddingToDay,
    stopAdding: () => { setPlacing(false); setPlacingDayId(null); },
    choosePlace,
  };

  const elevations = points.map((point) => point.elevationM);
  const profileReady =
    points.length >= 2 &&
    elevations.every((height): height is number => height !== null);

  const heights = elevations.filter(
    (height): height is number => height !== null
  );

  const min = heights.length ? Math.min(...heights) : 0;
  const max = heights.length ? Math.max(...heights) : 0;

  return (
    <section
      aria-label="Route map and stops"
      className="min-w-0"
    >
      <ResizableRouteLayout enabled={Boolean(renderItinerary)}>
      <div className="min-w-0">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-gray-950">Route map</h2>
          <p className="mt-1 text-sm text-gray-500">
            Explore waypoints and adjust your route.
          </p>
        </div>

        {!readOnly &&
          (editing ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={pending}
                onClick={cancel}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={pending || !dirty || outdated}
                onClick={save}
                className="flex items-center gap-1.5 rounded-lg bg-green-900 px-3 py-2 text-xs font-semibold text-white hover:bg-green-800 disabled:opacity-40"
              >
                <Check className="h-4 w-4" aria-hidden="true" />
                {pending ? "Saving…" : "Save route"}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setEditing(true);
                setSaved(false);
                setError("");
              }}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-green-700"
            >
              <Pencil className="h-4 w-4" aria-hidden="true" />
              Edit route
            </button>
          ))}
      </header>

      {placing && canEdit && (
        <div
          role="status"
          className="mb-3 flex items-center justify-between gap-3 rounded-lg bg-green-50 px-4 py-2 text-xs text-green-900"
        >
          <span>
            {`Click the map to add a ${waypointType(kind).label.toLowerCase()}.`}
          </span>
          <button
            type="button"
            disabled={pending}
            aria-label="Cancel map placement"
            onClick={() => {
              setPlacing(false);
              setPlacingDayId(null);
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Original route map, full-size in the unified workspace. */}
      <div className="grid min-w-0 grid-cols-1 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="min-w-0">
          <RouteMap
            points={points}
            fallback={fallback}
            selectedId={selectedId}
            compact
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
            onMove={
              canEdit && !pending
                ? (id, a, b) => {
                    if (validCoordinates(a, b)) {
                      patch(id, { lat: a, lng: b });
                      setSelectedId(id);
                    }
                  }
                : undefined
            }
          />
        </div>

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
          Dashed lines connect stops directly, not along trails.
          {canEdit
            ? " Drag pins to adjust them, then save your route."
            : ""}
        </p>

        {profileReady && (
          <details className="text-xs text-gray-500">
            <summary className="cursor-pointer font-semibold">
              Waypoint elevations · {min}–{max} m
            </summary>
            <svg
              viewBox="0 0 600 100"
              role="img"
              aria-label="Elevation at each waypoint in travel order, not by distance"
              className="mt-2 h-24 w-full"
            >
              <polyline
                fill="none"
                stroke="#166534"
                strokeWidth="3"
                points={points
                  .map(
                    (point, i) =>
                      `${10 + (i * 580) / (points.length - 1)},${
                        85 -
                        ((point.elevationM! - min) /
                          Math.max(1, max - min)) *
                          70
                      }`
                  )
                  .join(" ")}
              />
            </svg>
          </details>
        )}

        {error && (
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
              : canEdit && dirty
                ? "Unsaved changes"
                : ""}
        </p>
      </footer>
      </div>
      {renderItinerary?.(routeControls)}
      </ResizableRouteLayout>
    </section>
  );
}


