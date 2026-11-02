"use client";

import { useEffect, useLayoutEffect, useRef, useState, useTransition, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import { updateTripDayNote, updateTripDaySummary } from "@/lib/tracked-build-actions";
import WeatherPanel from "./WeatherPanel";
import { dayWeatherPoint } from "@/lib/weather/locations";
import {
  CalendarDays, Check, ChevronDown, Clock3, CloudSun, GripVertical, NotebookPen, Pencil, Plus, Trash2, X,
} from "lucide-react";
import type { PlannerDay, Waypoint } from "@/lib/trip-planner";
import { WAYPOINT_TYPES, waypointType } from "@/lib/waypoint-map";
import type { WeatherPoint } from "@/lib/weather/locations";
import type { RouteWorkspaceControls } from "./TripRoute";
import WaypointIcon from "./WaypointIcon";
import WaypointSearch from "./WaypointSearch";

const STOP_DRAG_TYPE = "application/x-trailpicker-stop";

function draggedStop(event: DragEvent) {
  return event.dataTransfer.getData(STOP_DRAG_TYPE);
}

function canAcceptStop(event: DragEvent) {
  return event.dataTransfer.types.includes(STOP_DRAG_TYPE);
}

function formattedTime(value?: string | null) {
  if (!value || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value)) return null;
  const [h, m] = value.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

function fullDate(value: Date) {
  const date = new Date(value);
  const day = date.getUTCDate();
  const suffix = day % 100 >= 11 && day % 100 <= 13
    ? "th"
    : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[day % 10] ?? "th";
  const weekday = date.toLocaleDateString("en-CA", { weekday: "long", timeZone: "UTC" });
  const month = date.toLocaleDateString("en-CA", { month: "long", timeZone: "UTC" });
  return `${weekday}, ${month} ${day}${suffix}`;
}

type StopDrag = {
  draggingId: string | null;
  hoverStopId: string | null;
  hoverDayId: string | null;
  start: (event: DragEvent<HTMLElement>, id: string) => void;
  end: () => void;
  overStop: (id: string) => void;
  overDay: (id: string) => void;
  clearHover: () => void;
};

function StopItem({
  point, route, days, drag,
}: {
  point: Waypoint;
  route: RouteWorkspaceControls;
  days: PlannerDay[];
  drag: StopDrag;
}) {
  const editing = route.editing && route.editingStopId === point.id;
  const time = formattedTime(point.time);
  const index = route.points.findIndex((p) => p.id === point.id);
  const sameDay = route.points.filter((p) => (p.dayId ?? null) === (point.dayId ?? null));
  const positionInDay = sameDay.findIndex((p) => p.id === point.id);

  return (
    <li
      data-trailpicker-stop-id={point.id}
      className={`rounded-xl border bg-white shadow-sm transition-[background-color,border-color,opacity,transform,box-shadow] duration-200 ease-out motion-reduce:transition-none ${
        drag.draggingId === point.id ? "scale-[0.985] border-green-200 opacity-45" :
        drag.hoverStopId === point.id && drag.draggingId && drag.draggingId !== point.id
          ? "relative translate-y-1.5 border-green-500 bg-green-50/60 ring-2 ring-green-100 before:absolute before:-top-2 before:inset-x-1 before:h-1 before:rounded-full before:bg-green-600"
          : route.selectedId === point.id ? "border-green-300 bg-green-50/30" : "border-gray-200 hover:border-gray-300"
      }`}
      onDragOver={(event) => {
        if (!route.readOnly && canAcceptStop(event)) {
          event.preventDefault();
          event.stopPropagation();
          event.dataTransfer.dropEffect = "move";
          if (drag.draggingId !== point.id) drag.overStop(point.id);
        }
      }}
      onDrop={(event) => {
        if (route.readOnly) return;
        const id = draggedStop(event);
        if (!id) return;
        event.preventDefault();
        event.stopPropagation();
        if (id !== point.id) route.moveStopToDay(id, point.dayId ?? null, point.id);
        drag.clearHover();
      }}
    >
      <div className="flex items-center gap-2 px-2 py-2.5">
        {!route.readOnly && (
          <span
            draggable={!route.pending}
            onDragStart={(event) => drag.start(event, point.id)}
            onDragEnd={drag.end}
            className="cursor-grab rounded p-1 text-gray-400 hover:text-green-800 active:cursor-grabbing"
            title="Drag to move or reorder this stop"
            aria-hidden="true"
          >
            <GripVertical className="h-4 w-4" />
          </span>
        )}
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-2.5 text-left focus-visible:outline-2 focus-visible:outline-green-700"
          onClick={() => route.selectStop(point)}
          aria-label={`Show ${point.name} on the map`}
        >
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: waypointType(point.kind).color }}
          >
            <WaypointIcon kind={point.kind} className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-gray-900">{point.name}</span>
            <span className="block text-xs text-gray-500">
              {index + 1}. {waypointType(point.kind).label}
              {point.elevationM != null ? ` · ${point.elevationM} m` : ""}
            </span>
            {(time || point.note?.trim()) && (
              <span className="mt-1 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-600">
                {time && <span className="inline-flex items-center gap-1 font-medium tabular-nums text-gray-700"><Clock3 className="h-3 w-3" aria-hidden="true" />{time}</span>}
                {point.note?.trim() && <span className="line-clamp-2 break-words">{point.note}</span>}
              </span>
            )}
          </span>
        </button>
        {!route.readOnly && (
          <button
            type="button"
            onClick={() => route.editStop(point.id)}
            disabled={route.pending}
            className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
            aria-label={editing ? `Close editor for ${point.name}` : `Edit ${point.name}`}
            aria-expanded={editing}
            title={editing ? "Close stop editor" : "Edit stop"}
          >
            {editing ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
          </button>
        )}
      </div>

      {editing && (
        <div className="space-y-3 border-t border-gray-100 bg-gray-50/70 p-3">
          <label className="block text-xs font-medium text-gray-600">
            Stop name
            <input
              type="text" maxLength={200} value={point.name}
              disabled={route.pending}
              onChange={(event) => route.updateStop(point.id, { name: event.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-700 focus:outline-none"
            />
          </label>
          <div className="grid gap-2 sm:grid-cols-2">
            <label className="block text-xs font-medium text-gray-600">
              Type
              <select
                value={point.kind} disabled={route.pending}
                onChange={(event) => route.updateStop(point.id, { kind: event.target.value as Waypoint["kind"] })}
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm"
              >
                {WAYPOINT_TYPES.map((type) => (
                  <option key={type.kind} value={type.kind}>{type.label}</option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-medium text-gray-600">
              Day
              <select
                value={point.dayId ?? ""} disabled={route.pending}
                onChange={(event) => route.assignStop(point.id, event.target.value || null)}
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm"
              >
                <option value="">Unassigned</option>
                {days.map((day, i) => <option key={day.id} value={day.id}>Day {i + 1}</option>)}
              </select>
            </label>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs font-medium text-gray-600">
              Time (optional)
              <input
                type="time"
                value={point.time ?? ""}
                disabled={route.pending}
                onChange={(event) => route.updateStop(point.id, { time: event.target.value || null })}
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-700 focus:outline-none"
              />
            </label>
            <p className="self-end text-xs leading-5 text-gray-500">Local time for this stop; shown in your daily itinerary.</p>
            <label className="block text-xs font-medium text-gray-600 sm:col-span-2">
              Stop note (optional)
              <textarea
                rows={3}
                maxLength={500}
                value={point.note ?? ""}
                disabled={route.pending}
                onChange={(event) => route.updateStop(point.id, { note: event.target.value })}
                placeholder="E.g. Lunch break, refill water, check campsite reservation…"
                className="mt-1 w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-700 focus:outline-none"
              />
              <span className="mt-1 block text-right text-[11px] font-normal text-gray-400">{(point.note ?? "").length}/500</span>
            </label>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <div className="flex gap-2">
              <button type="button" disabled={route.pending || positionInDay === 0} onClick={() => route.moveStop(point.id, -1)} className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs disabled:opacity-40">Earlier</button>
              <button type="button" disabled={route.pending || positionInDay === sameDay.length - 1} onClick={() => route.moveStop(point.id, 1)} className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs disabled:opacity-40">Later</button>
            </div>
            <button type="button" disabled={route.pending} onClick={() => route.removeStop(point.id)} className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-40">
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

// Day notes are stored on TripDay.notes. They require no coordinates or
// map marker, and the compact day-details form deliberately leaves them alone.
function DayNote({ day, buildId, readOnly }: { day: PlannerDay; buildId: string; readOnly: boolean }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(day.notes ?? "");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();


  function save() {
    if (pending) return;
    const data = new FormData();
    data.set("buildId", buildId);
    data.set("dayId", day.id);
    data.set("note", draft);
    setError("");
    startTransition(async () => {
      try {
        await updateTripDayNote(data);
        setEditing(false);
        router.refresh();
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Could not save this note.");
      }
    });
  }

  const hasNote = Boolean(day.notes?.trim());
  if (readOnly && !hasNote) return null;

  return (
    <div className="mt-3 border-t border-gray-100 pt-3">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600">
          <NotebookPen className="h-3.5 w-3.5 text-green-800" aria-hidden="true" /> Day note
        </span>
        {!readOnly && !editing && (
          <button type="button" onClick={() => { setDraft(day.notes ?? ""); setError(""); setEditing(true); }}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-green-800 hover:bg-green-50">
            {hasNote ? <Pencil className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {hasNote ? "Edit note" : "Add note"}
          </button>
        )}
      </div>
      {editing ? (
        <div className="mt-2 space-y-2">
          <label className="sr-only" htmlFor={`day-note-${day.id}`}>Note for this day</label>
          <textarea id={`day-note-${day.id}`} value={draft} maxLength={5000} rows={3}
            onChange={(event) => setDraft(event.target.value)} disabled={pending}
            placeholder="Add a reminder, plan, or observation—no map stop needed."
            className="w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-700 focus:outline-none" />
          {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
          <div className="flex items-center justify-end gap-2">
            <button type="button" disabled={pending} onClick={() => { setDraft(day.notes ?? ""); setEditing(false); setError(""); }}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40">Discard</button>
            <button type="button" disabled={pending} onClick={save}
              className="inline-flex items-center gap-1 rounded-lg bg-green-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-800 disabled:opacity-40">
              <Check className="h-3.5 w-3.5" /> {pending ? "Saving…" : "Save note"}
            </button>
          </div>
        </div>
      ) : hasNote ? (
        <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">{day.notes}</p>
      ) : null}
    </div>
  );
}

const DAY_SUBHEADING_MAX = 100;

function InlineDaySummary({ day, buildId, readOnly }: { day: PlannerDay; buildId: string; readOnly: boolean }) {
  const router = useRouter();
  const [draft, setDraft] = useState((day.activities ?? "").slice(0, DAY_SUBHEADING_MAX));
  const [saved, setSaved] = useState((day.activities ?? "").slice(0, DAY_SUBHEADING_MAX));
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  // When the server refreshes an untouched field, display its latest value.
  // Keep a locally edited value until the user saves it.
  const serverSummary = (day.activities ?? "").slice(0, DAY_SUBHEADING_MAX);
  const displayDraft = draft === saved ? serverSummary : draft;

  const changed = displayDraft !== serverSummary;
  function save() {
    if (!changed || pending) return;
    const value = displayDraft.trim();
    const form = new FormData();
    form.set("buildId", buildId);
    form.set("dayId", day.id);
    form.set("summary", value);
    setError("");
    startTransition(async () => {
      try {
        await updateTripDaySummary(form);
        setSaved(value);
        router.refresh();
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Could not save day summary.");
      }
    });
  }

  if (readOnly) return day.activities?.trim() ? <p className="break-words text-sm text-gray-600">{day.activities.slice(0, DAY_SUBHEADING_MAX)}</p> : null;

  return (
    <div className="min-w-0 flex-1">
      <input
        id={`day-summary-${day.id}`}
        type="text"
        aria-label={`Subheading for ${fullDate(day.date)}`}
        maxLength={DAY_SUBHEADING_MAX}
        value={displayDraft}
        disabled={pending}
        onChange={(event) => { setDraft(event.target.value); setError(""); }}
        onBlur={save}
        onKeyDown={(event) => {
          if (event.key === "Enter") { event.preventDefault(); event.currentTarget.blur(); }
        }}
        placeholder="Add a short subheading…"
        className="block w-full min-w-0 border-0 bg-transparent p-0 text-sm leading-5 text-gray-600 placeholder:text-gray-400 outline-none focus:text-gray-900 focus:ring-0 disabled:opacity-60"
      />
      {(error || pending) && (
        <span role="status" className={`mt-0.5 block text-xs ${error ? "text-red-700" : "text-gray-500"}`}>
          {error || "Saving…"}
        </span>
      )}
    </div>
  );
}

function DaySection({
  day, index, stops, route, drag, buildId, weatherPoints,
}: {
  day: PlannerDay;
  index: number;
  stops: Waypoint[];
  route: RouteWorkspaceControls;
  drag: StopDrag;
  buildId: string;
  weatherPoints: WeatherPoint[];
}) {
  const [open, setOpen] = useState(index === 0);
  const [kind, setKind] = useState<Waypoint["kind"]>("waypoint");
  const [forecastOpen, setForecastOpen] = useState(false);
  const selectedInDay = stops.some((point) => point.id === route.selectedId);
  const previousSelected = useRef<string | null>(null);
  const isPlacingHere = route.placingDayId === day.id;
  const dayDate = new Date(day.date).toISOString().slice(0, 10);
  const matchedPoint = dayWeatherPoint(day, weatherPoints);

  useEffect(() => {
    if (selectedInDay && previousSelected.current !== route.selectedId) setOpen(true);
    previousSelected.current = route.selectedId;
  }, [selectedInDay, route.selectedId]);

  return (
    <article
      className={`min-w-0 py-5 transition-colors duration-200 first:pt-1 ${
        drag.draggingId && drag.hoverDayId === day.id && !drag.hoverStopId ? "bg-green-50/40" : ""
      }`}
      onDragOver={(event) => {
        if (!route.readOnly && canAcceptStop(event)) {
          event.preventDefault();
          event.dataTransfer.dropEffect = "move";
          drag.overDay(day.id);
        }
      }}
      onDrop={(event) => {
        if (route.readOnly) return;
        const id = draggedStop(event);
        if (!id) return;
        event.preventDefault();
        route.moveStopToDay(id, day.id);
        drag.clearHover();
        setOpen(true);
      }}
    >
      <div className="flex items-start gap-3 px-1 pb-4 pt-1 sm:px-2">
        <button
          type="button"
          aria-expanded={open}
          aria-label={`${open ? "Collapse" : "Expand"} ${fullDate(day.date)}`}
          onClick={() => {
            if (open) setForecastOpen(false);
            setOpen(!open);
            drag.clearHover();
          }}
          className="mt-0.5 shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-green-700"
        >
          <ChevronDown className={`h-5 w-5 text-gray-600 transition-transform ${open ? "" : "-rotate-90"}`} />
        </button>
        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={() => {
              if (open) setForecastOpen(false);
              setOpen(!open);
              drag.clearHover();
            }}
            className="block text-left text-lg font-bold leading-6 text-gray-950 focus-visible:outline-2 focus-visible:outline-green-700"
          >
            {fullDate(day.date)}
          </button>
          <div className="mt-1">
            <InlineDaySummary key={day.id} day={day} buildId={buildId} readOnly={route.readOnly} />
          </div>
        </div>
      </div>

      {open && (
        <div className="px-1 pb-3 pt-1 sm:px-2">

          <div className="mb-2 flex items-center justify-between gap-2">
            <h4 className="text-sm font-medium text-gray-600">{stops.length} {stops.length === 1 ? "stop" : "stops"}</h4>
            <span className="text-xs text-gray-400">Drag stops between days</span>
          </div>
          {stops.length ? (
            <ol className="space-y-2" aria-label={`Stops for ${fullDate(day.date)}`}>
              {stops.map((stop) => <StopItem key={stop.id} point={stop} route={route} days={route.days} drag={drag} />)}
            </ol>
          ) : (
            <p className="rounded-lg bg-gray-50 px-3 py-4 text-sm text-gray-500">
              No mapped stops yet. Add a stop or write a day note below.
            </p>
          )}
          <DayNote day={day} buildId={buildId} readOnly={route.readOnly} />
          {!route.readOnly && (
            <div className="mt-3 rounded-lg bg-gray-50/80 p-3">
              <div className="flex flex-wrap items-center gap-2">
                <label className="sr-only" htmlFor={`stop-kind-${day.id}`}>Type of stop to add</label>
                <select
                  id={`stop-kind-${day.id}`}
                  value={kind}
                  onChange={(event) => setKind(event.target.value as Waypoint["kind"])}
                  className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm text-gray-800"
                >
                  {WAYPOINT_TYPES.map((type) => <option key={type.kind} value={type.kind}>{type.label}</option>)}
                </select>
                <button
                  type="button" disabled={route.pending}
                  onClick={() => isPlacingHere ? route.stopAdding() : route.startAddingToDay(day.id, kind)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-green-900 px-3 py-2 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" /> {isPlacingHere ? "Cancel" : "Add stop"}
                </button>
              </div>
              {isPlacingHere && (
                <div className="mt-3 space-y-3 border-t border-gray-200 pt-3">
                  <p className="text-xs font-medium text-green-900">Click the map to place this stop, or search for a location:</p>
                  <WaypointSearch near={route.near} onChoose={route.choosePlace} disabled={route.pending} />
                </div>
              )}
            </div>
          )}
          <div className="mt-4 border-t border-gray-200 pt-4">
        <button
          type="button"
          aria-expanded={forecastOpen && open}
          aria-label={`${forecastOpen && open ? "Hide" : "Show"} day forecast for ${fullDate(day.date)}`}
          onClick={() => { setOpen(true); setForecastOpen((value) => !value); }}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-xs font-semibold text-gray-700 hover:border-green-200 hover:bg-green-50"
        >
          <CloudSun className="h-4 w-4 text-green-800" aria-hidden="true" />
          <span>{forecastOpen && open ? "Hide day forecast" : "Show day forecast"}</span>
        </button>
          </div>
          {forecastOpen && (
            <div className="mt-3 mb-4 border-b border-gray-200 pb-4">
              <WeatherPanel
                key={`${dayDate}:${matchedPoint ?? "unmatched"}`}
                points={weatherPoints}
                date={dayDate}
                defaultPointId={matchedPoint}
                planning={{
                  minTemperature: day.minTemperature,
                  conditions: day.conditions,
                  distanceKm: day.distanceKm,
                  elevationGainM: day.elevationGainM,
                  durationMinutes: day.durationMinutes,
                }}
              />
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export default function DayStopsItinerary({
  route, buildId, days, weatherPoints,
}: {
  route: RouteWorkspaceControls;
  buildId: string;
  days: PlannerDay[];
  weatherPoints: WeatherPoint[];
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const dayNodes = useRef<Record<string, HTMLDivElement | null>>({});
  const orderedDays = [...days].sort((a, b) => +new Date(a.date) - +new Date(b.date));
  const validDays = new Set(orderedDays.map((d) => d.id));
  const unassigned = route.points.filter((stop) => !stop.dayId || !validDays.has(stop.dayId));
  const selectedDayId = route.points.find((stop) => stop.id === route.selectedId)?.dayId ?? null;

  // Native drag preview + FLIP animation for cards changing position on drop.
  // No drag-and-drop dependency, no separate stop list or data model.
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [hoverStopId, setHoverStopId] = useState<string | null>(null);
  const [hoverDayId, setHoverDayId] = useState<string | null>(null);
  const previousRects = useRef<Map<string, DOMRect> | null>(null);
  const dragGhost = useRef<HTMLElement | null>(null);

  function clearHover() {
    setHoverStopId(null);
    setHoverDayId(null);
  }

  function startDrag(event: DragEvent<HTMLElement>, id: string) {
    if (route.pending || route.readOnly) { event.preventDefault(); return; }
    event.dataTransfer.setData(STOP_DRAG_TYPE, id);
    event.dataTransfer.effectAllowed = "move";
    const root = scroller.current;
    const rects = new Map<string, DOMRect>();
    root?.querySelectorAll<HTMLElement>("[data-trailpicker-stop-id]").forEach((node) => {
      if (node.dataset.trailpickerStopId) rects.set(node.dataset.trailpickerStopId, node.getBoundingClientRect());
    });
    previousRects.current = rects;
    setDraggingId(id);

    // Drag the card's ghost, rather than an isolated little grip icon.
    const card = (event.currentTarget as HTMLElement).closest<HTMLElement>("[data-trailpicker-stop-id]");
    if (card) {
      const ghost = card.cloneNode(true) as HTMLElement;
      ghost.removeAttribute("data-trailpicker-stop-id");
      ghost.style.cssText = `position:fixed;top:0;left:0;z-index:99999;pointer-events:none;width:${Math.min(card.getBoundingClientRect().width, 430)}px;opacity:.92;box-shadow:0 14px 32px #0002;transform:rotate(1deg);`;
      document.body.appendChild(ghost);
      dragGhost.current = ghost;
      event.dataTransfer.setDragImage(ghost, 24, 24);
      // Browser has captured the ghost image; don't leave a fixed copy on screen.
      requestAnimationFrame(() => {
        ghost.remove();
        if (dragGhost.current === ghost) dragGhost.current = null;
      });
    }
  }

  function endDrag() {
    setDraggingId(null);
    clearHover();
    dragGhost.current?.remove();
    dragGhost.current = null;
    // React applies a successful drop before the next paint. A canceled drag
    // has no reorder, so discard its stale positions after that frame.
    requestAnimationFrame(() => { previousRects.current = null; });
  }

  useLayoutEffect(() => {
    const previous = previousRects.current;
    if (!previous) return;
    previousRects.current = null;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    scroller.current?.querySelectorAll<HTMLElement>("[data-trailpicker-stop-id]").forEach((node) => {
      const old = previous.get(node.dataset.trailpickerStopId || "");
      if (!old) return;
      const next = node.getBoundingClientRect();
      const dx = old.left - next.left;
      const dy = old.top - next.top;
      if (Math.abs(dx) + Math.abs(dy) < 2 || Math.abs(dy) > 1400) return;
      node.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0px, 0px)" }],
        { duration: 260, easing: "cubic-bezier(.22,1,.36,1)" }
      );
    });
  }, [route.points]);

  const drag: StopDrag = {
    draggingId, hoverStopId, hoverDayId,
    start: startDrag,
    end: endDrag,
    overStop: (id) => { setHoverStopId(id); setHoverDayId(null); },
    overDay: (id) => { setHoverDayId(id); setHoverStopId(null); },
    clearHover,
  };

  // A map marker click brings its owning day into view inside the itinerary.
  useEffect(() => {
    const target = selectedDayId ? dayNodes.current[selectedDayId] : null;
    const container = scroller.current;
    if (!target || !container) return;
    if (container.scrollHeight > container.clientHeight + 8) {
      const offset = target.getBoundingClientRect().top - container.getBoundingClientRect().top;
      container.scrollTo({ top: container.scrollTop + offset - 4, behavior: "smooth" });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [route.selectedId, selectedDayId]);

  return (
    <section id="itinerary" className="min-w-0 scroll-mt-20">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-gray-950">Daily itinerary</h3>
          <p className="mt-1 text-sm text-gray-500">Select a stop to find it on the map.</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-gray-500"><CalendarDays className="h-4 w-4" /> {orderedDays.length} days</span>
      </div>
      <div className="min-w-0">
        <div
          ref={scroller} tabIndex={0}
          aria-label="Daily itinerary. Scroll to explore days. Drag stops between days to reorganize your route."
          className="divide-y divide-gray-200 xl:h-[min(82vh,870px)] xl:overflow-y-auto xl:overscroll-contain xl:pr-2 focus-visible:outline-2 focus-visible:outline-green-700"
        >
          {orderedDays.map((day, index) => (
            <div key={day.id} ref={(node) => { dayNodes.current[day.id] = node; }}>
              <DaySection
                day={day} index={index}
                stops={route.points.filter((point) => point.dayId === day.id)}
                route={route} drag={drag}
                buildId={buildId} weatherPoints={weatherPoints}
              />
            </div>
          ))}
          {!orderedDays.length && <p className="rounded-lg border border-dashed border-gray-200 bg-white p-4 text-sm text-gray-600">Set your trip dates to create days.</p>}

          {unassigned.length > 0 && (
            <section className="rounded-xl border border-amber-200 bg-amber-50/40 p-4" aria-label="Unassigned route stops">
              <h4 className="font-semibold text-gray-900">Unassigned stops ({unassigned.length})</h4>
              <p className="mt-1 text-xs text-gray-600">These stops are on your route but don&apos;t belong to a day yet.</p>
              <ol className="mt-3 space-y-2">
                {unassigned.map((stop) => (
                  <li key={stop.id} data-trailpicker-stop-id={stop.id} className={`rounded-xl border bg-white p-3 shadow-sm transition-[opacity,transform,border-color] duration-200 ${draggingId === stop.id ? "opacity-50 scale-[0.985]" : "border-gray-200"}`}>
                    <div className="flex items-center justify-between gap-2">
                      {!route.readOnly && (
                        <span
                          draggable={!route.pending}
                          onDragStart={(event) => startDrag(event, stop.id)}
                          onDragEnd={endDrag}
                          title="Drag into a day"
                          className="cursor-grab text-gray-400 active:cursor-grabbing"
                          aria-hidden="true"
                        >
                          <GripVertical className="h-4 w-4" />
                        </span>
                      )}
                      <button type="button" className="min-w-0 truncate text-left text-sm font-medium text-gray-900 hover:underline" onClick={() => route.selectStop(stop)}>{stop.name}</button>
                      {!route.readOnly && orderedDays.length > 0 && (
                        <select
                          aria-label={`Assign ${stop.name} to a day`}
                          value="" disabled={route.pending}
                          onChange={(event) => route.assignStop(stop.id, event.target.value)}
                          className="max-w-32 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs"
                        >
                          <option value="">Assign day…</option>
                          {orderedDays.map((day, i) => <option key={day.id} value={day.id}>Day {i + 1}</option>)}
                        </select>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}
          {route.editing && !route.readOnly && (
            <p role="status" className="rounded-lg bg-green-50 p-3 text-xs text-green-900">
              Your route has editable changes. Use <strong>Save route</strong> above the map to keep them.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}


