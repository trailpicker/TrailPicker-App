"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useTransition, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import { updateTripDayNote, updateTripDaySummary } from "@/lib/tracked-build-actions";
import WeatherPanel from "./WeatherPanel";
import { dayWeatherPoint } from "@/lib/weather/locations";
import {
  AlertTriangle, Check, ChevronDown, Clock3, CloudSun, GripVertical, NotebookPen, Pencil, Plus, Sunrise, Trash2, X,
} from "lucide-react";
import type { PlannerDay, Waypoint } from "@/lib/trip-planner";
import { WAYPOINT_TYPES, waypointType } from "@/lib/waypoint-map";
import { consolidateOvernightStops, inheritedOvernightForDay, type Handoff } from "@/lib/overnight-handoffs";
import type { WeatherPoint } from "@/lib/weather/locations";
import type { RouteWorkspaceControls } from "./TripRoute";
import { calculateDayItinerary, itineraryTimingIssues, routeDaylight, ITINERARY_SCHEDULE_WARNING_MINUTES, type StopTiming, type ItineraryTimingIssue } from "@/lib/itinerary-timing";
import { clockLabel } from "@/lib/route-analysis-insights";
import WaypointIcon from "./WaypointIcon";
import WaypointSearch from "./WaypointSearch";
import StopTimePicker from "./StopTimePicker";
import StopSelectPicker from "./StopSelectPicker";

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


const resourceInput = "mt-1 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-700 focus:outline-none";
const reliabilityOptions = [
  { value: "unknown", label: "Unknown / not checked" },
  { value: "reported", label: "Personally checked recently" },
  { value: "seasonal", label: "Seasonal / uncertain" },
  { value: "unavailable", label: "Reported dry / unavailable" },
];

/** Route-owned annotations, not a second campsite or water record. */
function ResourceDetailsEditor({ point, route }: { point: Waypoint; route: RouteWorkspaceControls }) {
  const isWater = point.kind === "water";
  const patch = (resource: NonNullable<Waypoint["resource"]>) => route.updateStop(point.id, {
    resource: { ...point.resource, ...resource },
  });
  return <div className="space-y-3 rounded-lg border border-gray-200 bg-white p-3">
    <p className="text-xs leading-5 text-gray-500">{isWater
      ? "Water observations are planning notes, not a guarantee of safe or available water."
      : "Resource notes are saved with this itinerary stop."}</p>
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="block text-xs font-medium text-gray-600">
        {isWater ? "Water observations" : point.kind === "camp" ? "Campsite facilities / observations" : "Resupply details"}
        <textarea className={resourceInput} rows={2} maxLength={750} disabled={route.pending}
          value={point.resource?.detail ?? ""} onChange={e => patch({ detail: e.target.value })}
          placeholder={isWater ? "Water type, flow, conditions…" : point.kind === "camp" ? "Platforms, toilets, food storage, site rules…" : "Pickup, opening hours, supplies…"} />
      </label>
      <label className="block text-xs font-medium text-gray-600">Access / restrictions
        <textarea className={resourceInput} rows={2} maxLength={350} disabled={route.pending}
          value={point.resource?.access ?? ""} onChange={e => patch({ access: e.target.value })}
          placeholder="Seasonal access, restrictions, requirements…" />
      </label>
    </div>
    {isWater && <div className="grid items-end gap-3 sm:grid-cols-2">
      <StopSelectPicker label="Water reliability" value={point.resource?.waterReliability ?? "unknown"}
        disabled={route.pending} options={reliabilityOptions}
        onChange={value => patch({ waterReliability: value as NonNullable<Waypoint["resource"]>["waterReliability"], refillConfirmed: false })} />
      <label className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-700">
        <input type="checkbox" checked={!!point.resource?.refillConfirmed}
          disabled={route.pending || point.resource?.waterReliability === "unavailable"}
          onChange={e => patch({ refillConfirmed: e.target.checked })} />
        Include as a planned refill (verify availability before travel)
      </label>
    </div>}
    <div className="flex flex-wrap items-end gap-4">
      <label className="block text-xs font-medium text-gray-600">Last checked (optional)
        <input type="date" className={`${resourceInput} w-auto`} value={point.resource?.checkedOn ?? ""}
          disabled={route.pending} onChange={e => patch({ checkedOn: e.target.value })}/>
      </label>
      {point.resource?.sourceUrl && <a className="pb-2 text-xs font-medium text-green-800 underline" href={point.resource.sourceUrl}
        target="_blank" rel="noopener noreferrer">Source · {point.resource.sourceName || "map listing"}</a>}
    </div>
    <p className="text-[11px] text-gray-500">Save route to keep these waypoint details.</p>
  </div>;
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
  point, route, days, drag, timing, warnings, firstInDay, sunriseMinutes, inherited,
}: {
  point: Waypoint;
  route: RouteWorkspaceControls;
  days: PlannerDay[];
  drag: StopDrag;
  timing?: StopTiming; warnings: ItineraryTimingIssue[]; firstInDay: boolean; sunriseMinutes: number | null; inherited?: Handoff;
}) {
  // The inherited Day 2 start is the SAME saved waypoint as the Day 1 campsite.
  // Keep its editor scoped to the day being viewed so the Day 1 editor does
  // not also open when editing the next morning's departure.
  const [resourceOpen, setResourceOpen] = useState(false);
  const editing = route.editing && route.editingStopId === point.id &&
    (route.activeDayId === (inherited?.toDayId ?? point.dayId ?? null));
  const time = formattedTime(inherited ? point.nextDayDepartureTime : point.time);
  const predicted = inherited || timing?.arrivalMinutes == null ? null : clockLabel(timing.arrivalMinutes);
  const index = route.points.findIndex((p) => p.id === point.id);
  const sameDay = route.points.filter((p) => (p.dayId ?? null) === (point.dayId ?? null));
  const positionInDay = sameDay.findIndex((p) => p.id === point.id);

  return (
    <li
      data-trailpicker-stop-id={inherited ? undefined : point.id}
      data-trailpicker-inherited-id={inherited ? point.id : undefined}
      className={`rounded-xl border bg-white shadow-sm transition-[background-color,border-color,opacity,transform,box-shadow] duration-200 ease-out motion-reduce:transition-none ${!inherited && drag.draggingId === point.id ? "scale-[0.985] border-green-200" :
          !inherited && drag.hoverStopId === point.id && drag.draggingId && drag.draggingId !== point.id
            ? "relative translate-y-1.5 border-green-500 bg-green-50/60 ring-2 ring-green-100 before:absolute before:-top-2 before:inset-x-1 before:h-1 before:rounded-full before:bg-green-600"
            : (route.selectedId === point.id && route.activeDayId === (inherited?.toDayId ?? point.dayId ?? null)) ? "border-green-300 bg-green-50/30" : "border-gray-200 hover:border-gray-300"
        }`}
      onDragOver={(event) => {
        if (!inherited && !route.readOnly && canAcceptStop(event)) {
          event.preventDefault();
          event.stopPropagation();
          event.dataTransfer.dropEffect = "move";
          if (drag.draggingId !== point.id) drag.overStop(point.id);
        }
      }}
      onDrop={(event) => {
        if (inherited || route.readOnly) return;
        const id = draggedStop(event);
        if (!id) return;
        event.preventDefault();
        event.stopPropagation();
        if (id !== point.id) route.moveStopToDay(id, point.dayId ?? null, point.id);
        drag.end();
      }}
    >
      <div className="flex items-center gap-2 px-2 py-2.5">
        {!route.readOnly && (inherited ? (
          <span className="w-6 shrink-0" aria-hidden="true" />
        ) : (
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
        ))}
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-2.5 text-left focus-visible:outline-2 focus-visible:outline-green-700"
          onClick={() => inherited ? route.selectOvernightStart(point, inherited.toDayId) : route.selectStop(point)}
          aria-label={`Focus ${point.name} on the map`}
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
              {inherited ? `Start · Shared with Day ${inherited.fromDayNumber}` : `${index + 1}. ${waypointType(point.kind).label}`}
              {!inherited && point.elevationM != null ? ` · ${point.elevationM} m` : ""}
            </span>
            {!inherited && (point.note?.trim() || point.resource?.detail || point.kind === "water") && (
              <span className="mt-1 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-600">
                {point.note?.trim() && <span className="line-clamp-2 break-words">{point.note}</span>}
                {point.resource?.detail && <span className="line-clamp-2 break-words">{point.resource.detail}</span>}
                {point.kind === "water" && <span>{point.resource?.refillConfirmed ? "Refill location checked by user" : `Water: ${point.resource?.waterReliability ?? "unknown"}; not a confirmed refill`}</span>}
              </span>
            )}
          </span>
        </button>
        <div className="shrink-0 text-right">
          {time ? (
            <div className="text-xs font-semibold tabular-nums text-gray-800" title={firstInDay ? "Scheduled departure" : "Scheduled arrival"}>{time}</div>
          ) : predicted !== null ? (
            <div className="text-xs font-medium tabular-nums text-gray-700">{predicted}</div>
          ) : null}
          {(time || predicted !== null) && (
            <div className="mt-0.5 text-[10px] text-gray-500">
              {time
                ? firstInDay
                  ? "Departure"
                  : predicted === null
                    ? "Scheduled"
                    : null
                : timing?.approximate
                  ? "Est. · rough"
                  : "Est. arrival"}
            </div>
          )}
          {time && predicted !== null && !firstInDay && (
            <div className={`mt-0.5 text-[10px] tabular-nums ${timing && Math.round(timing.delayMinutes) > ITINERARY_SCHEDULE_WARNING_MINUTES ? "text-amber-800" : "text-gray-500"}`}>Est. {predicted}</div>
          )}
          {!inherited && !time && predicted === null && !route.readOnly && (
            <button type="button" onClick={() => route.editStop(point.id)} disabled={route.pending}
              className="inline-flex items-center gap-1 whitespace-nowrap text-[11px] font-medium text-green-800 hover:underline disabled:opacity-50"
              aria-label={`Add a scheduled time to ${point.name}`}>
              <Clock3 className="h-3 w-3" aria-hidden="true" /> Add time
            </button>
          )}
        </div>
        {!route.readOnly && (
          <button
            type="button"
            onClick={() => inherited ? route.editOvernightStart(point, inherited.toDayId) : route.editStop(point.id)}
            disabled={route.pending}
            className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
            aria-label={editing ? `Close editor for ${point.name}` : `Edit ${point.name}`}
            aria-expanded={editing}
            title={editing ? "Close stop editor" : inherited ? "Edit shared campsite" : "Edit stop"}
          >
            {editing ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
          </button>
        )}
      </div>

      {warnings.length > 0 && (
        <div className="space-y-2 border-t border-gray-100 px-3 py-2" role="status">
          {warnings.map((warning) => {
            const earlyDeparture = warning.title === "Departure before sunrise";
            return (
              <div key={warning.id} className="flex items-start gap-2 py-0.5">
                {earlyDeparture ? (
                  <Sunrise className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" aria-hidden="true" />
                ) : (
                  <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${warning.severity === "warning" ? "text-amber-700" : "text-gray-500"}`} aria-hidden="true" />
                )}
                <div className="min-w-0">
                  <p className={`text-xs font-semibold ${earlyDeparture ? "text-gray-700" : warning.severity === "warning" ? "text-amber-900" : "text-gray-700"}`}>
                    {earlyDeparture ? "Early departure" : warning.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-gray-600">
                    {earlyDeparture && time && sunriseMinutes !== null
                      ? `${time} departure · Sunrise at ${clockLabel(sunriseMinutes)}`
                      : warning.inlineMessage ?? warning.message.replace(/^Day \d+: /, "")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {editing && (inherited ? (
        <div className="space-y-3 rounded-b-[11px] border-t border-gray-100 bg-gray-50/70 p-3">
          <label className="block text-xs font-medium text-gray-600">
            Campsite name
            <input type="text" maxLength={200} value={point.name} disabled={route.pending}
              onChange={event => route.updateStop(point.id, { name: event.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-700 focus:outline-none" />
          </label>
          <StopTimePicker label="Next morning departure (optional)" value={point.nextDayDepartureTime}
            disabled={route.pending} onChange={value => route.updateStop(point.id, { nextDayDepartureTime: value })} />
          <label className="block text-xs font-medium text-gray-600">
            Departure note (optional)
            <textarea rows={2} maxLength={500} value={point.nextDayDepartureNote ?? ""}
              disabled={route.pending} onChange={event => route.updateStop(point.id, { nextDayDepartureNote: event.target.value })}
              placeholder="Morning departure or access details…"
              className="mt-1 w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-700 focus:outline-none" />
          </label>
          <button type="button" className="text-xs font-semibold text-green-800 hover:underline"
            aria-expanded={resourceOpen} onClick={() => setResourceOpen(v => !v)}>
            {resourceOpen ? "Hide campsite details" : "Campsite details"}
          </button>
          {resourceOpen && <ResourceDetailsEditor point={point} route={route} />}
        </div>
      ) : (
        <div className="space-y-3 rounded-b-[11px] border-t border-gray-100 bg-gray-50/70 p-3">
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
            <StopSelectPicker
              label="Type"
              value={point.kind}
              disabled={route.pending}
              options={WAYPOINT_TYPES.map(type => ({
                value: type.kind,
                label: type.label,
                icon: <span style={{ color: type.color }}><WaypointIcon kind={type.kind} className="h-4 w-4" /></span>,
              }))}
              onChange={(next) => {
                const kind = next as Waypoint["kind"];
                route.updateStop(point.id, { kind, ...(!["camp", "water", "resupply"].includes(kind) ? { resource: undefined } : {}) });
              }}
            />
            <StopSelectPicker
              label="Day"
              value={point.dayId ?? ""}
              disabled={route.pending}
              options={[{ value: "", label: "Unassigned" }, ...days.map((day, i) => ({ value: day.id, label: `Day ${i + 1}` }))]}
              onChange={next => route.assignStop(point.id, next || null)}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <StopTimePicker
              label={firstInDay ? "Departure time (optional)" : "Scheduled arrival (optional)"}
              value={point.time}
              disabled={route.pending}
              onChange={(time) => route.updateStop(point.id, { time })}
            />
            {!firstInDay && <label className="block text-xs font-medium text-gray-600">
              Time at stop (minutes, optional)
              <input type="number" inputMode="numeric" min={0} max={240} step={5}
                value={point.stayMinutes ?? 0} disabled={route.pending}
                onChange={(event) => {
                  if (event.target.value === "") return route.updateStop(point.id, { stayMinutes: 0 });
                  route.updateStop(point.id, { stayMinutes: Math.max(0, Math.min(240, Math.round(Number(event.target.value) || 0))) });
                }}
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-700 focus:outline-none" />
            </label>}
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
          {["camp", "water", "resupply"].includes(point.kind) && <div className="space-y-2">
            <button type="button" className="flex w-full items-center justify-between border-t border-gray-200 pt-3 text-left text-xs font-semibold text-green-800"
              aria-expanded={resourceOpen} onClick={() => setResourceOpen(v => !v)}>
              <span>{point.kind === "water" ? "Water source details" : point.kind === "camp" ? "Campsite details" : "Resupply details"}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${resourceOpen ? "rotate-180" : ""}`} />
            </button>
            {resourceOpen && <ResourceDetailsEditor point={point} route={route} />}
          </div>}
          <div className="flex flex-wrap justify-between gap-2">
            <div className="flex gap-2">
              <button type="button" disabled={route.pending || positionInDay === 0} onClick={() => route.moveStop(point.id, -1)} className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-800 hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-300 disabled:opacity-100">Earlier</button>
              <button type="button" disabled={route.pending || positionInDay === sameDay.length - 1} onClick={() => route.moveStop(point.id, 1)} className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-800 hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-300 disabled:opacity-100">Later</button>
            </div>
            <button type="button" disabled={route.pending} onClick={() => route.removeStop(point.id)} className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-40">
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          </div>
        </div>
      ))}
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
    <div className="min-w-0">
      <div className="flex min-h-12 items-center justify-between gap-3 rounded-lg px-2 py-2">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600">
          <NotebookPen className="h-[18px] w-[18px] shrink-0 text-green-800" aria-hidden="true" /> Day note
        </span>
        {!readOnly && !editing && (
          <button type="button" onClick={() => { setDraft(day.notes ?? ""); setError(""); setEditing(true); }}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-1 py-1.5 text-sm font-semibold text-green-800 hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-green-700">
            {hasNote ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {hasNote ? "Edit note" : "Add note"}
          </button>
        )}
      </div>
      {editing ? (
        <div className="mt-2 space-y-2 px-2">
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
        <p className="mt-1 whitespace-pre-wrap break-words px-2 text-sm leading-6 text-gray-700">{day.notes}</p>
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
  day, index, stops, handoff, route, drag, buildId, weatherPoints, open, setOpen,
}: {
  day: PlannerDay;
  index: number;
  stops: Waypoint[];
  handoff: Handoff | null;
  route: RouteWorkspaceControls;
  drag: StopDrag;
  buildId: string;
  weatherPoints: WeatherPoint[];
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [kind, setKind] = useState<Waypoint["kind"]>("waypoint");
  const [forecastOpen, setForecastOpen] = useState(false);
  const [forecastPointId, setForecastPointId] = useState<string | null>(null);
  const selectedInDay = stops.some((point) => point.id === route.selectedId) || (handoff?.point.id === route.selectedId && route.activeDayId === day.id);
  const previousSelected = useRef<string | null>(null);
  const isPlacingHere = route.placingDayId === day.id;
  const isFocused = route.activeDayId === day.id;
  const dayDate = new Date(day.date).toISOString().slice(0, 10);
  const matchedPoint = dayWeatherPoint(day, weatherPoints);
  const forecastPoint = weatherPoints.find(point => point.id === (forecastPointId ?? matchedPoint ?? weatherPoints[0]?.id));
  const forecastSolar = routeDaylight(day, forecastPoint ?? stops[0]);
  const computed = route.metrics.dayMetrics.find(item => item.dayId === day.id);
  // Sample-derived climbing totals help the preview, but must not silently replace
  // manually entered planning values (or pretend to be provider-certified totals).
  const sampleEstimated = !!computed && computed.sampleDerivedSegments > 0;
  const complete = computed && computed.segments > 0 && computed.estimatedMinutes !== null && !sampleEstimated;
  const dayTiming = useMemo(() => calculateDayItinerary(route.points, day, route.paceKmh, route.breakSettings, route.days),
    [route.points, day, route.paceKmh, route.breakSettings, route.days]);
  const timingById = new Map(dayTiming.stops.map(stop => [stop.id, stop]));
  const timingIssues = itineraryTimingIssues(dayTiming, `Day ${index + 1}`);
  const timingIssuesById = new Map<string, ItineraryTimingIssue[]>();
  for (const issue of timingIssues) timingIssuesById.set(issue.stopId, [...(timingIssuesById.get(issue.stopId) ?? []), issue]);

  useEffect(() => {
    if (selectedInDay && previousSelected.current !== route.selectedId) setOpen(true);
    previousSelected.current = route.selectedId;
  }, [selectedInDay, route.selectedId]);

  return (
    <article
      className={`min-w-0 rounded-lg pb-4 ${index === 0 ? "pt-1" : "pt-4"} transition-colors duration-200 ${isFocused ? "bg-green-50/45" : ""} ${drag.draggingId && drag.hoverDayId === day.id && !drag.hoverStopId ? "bg-green-50/40" : ""
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
        drag.end();
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
            {computed && computed.segments > 0 && (
              <p className="mt-1.5 text-xs leading-5 text-green-900" aria-label="Automatically calculated daily route statistics">
                <span className="font-semibold">Route:</span> {computed.straightLineDistanceM ? "≥ " : ""}{(computed.distanceM / 1000).toFixed(2)} km
                {computed.climbedSegments > 0
                  ? ` · ${sampleEstimated ? "est. " : ""}↑ ${Math.round(computed.knownAscentM)} m · ↓ ${Math.round(computed.knownDescentM)} m`
                  : " · elevation unknown"}
                {complete
                  ? ` · ${Math.floor(computed.estimatedMinutes! / 60)}h ${computed.estimatedMinutes! % 60}m · ${computed.difficulty}`
                  : sampleEstimated && computed.estimatedMinutes !== null
                    ? ` · ~${Math.floor(computed.estimatedMinutes / 60)}h ${computed.estimatedMinutes % 60}m (sample-based estimate)`
                    : " · partial data, difficulty unknown"}
              </p>
            )}
          </div>
        </div>
      </div>

      {open && (
        <div className="px-1 pb-2 pt-1 sm:px-2">

          <div className="mb-2 flex items-center justify-between gap-2">
            <h4 className="text-sm font-medium text-gray-600">{stops.length + (handoff ? 1 : 0)} {stops.length + (handoff ? 1 : 0) === 1 ? "stop" : "stops"}</h4>
            <span className="text-xs text-gray-400">Drag stops between days</span>
          </div>
          {stops.length || handoff ? (
            <ol className="space-y-2" aria-label={`Stops for ${fullDate(day.date)}`}>
              {handoff && <StopItem key={`inherited-${handoff.point.id}-${day.id}`}
                point={route.points.find(item => item.id === handoff.point.id) ?? handoff.point}
                inherited={handoff} route={route} days={route.days} drag={drag}
                warnings={[]} firstInDay sunriseMinutes={dayTiming.solar?.sunriseMinutes ?? null} />}
              {stops.map((stop, stopIndex) => <StopItem key={stop.id} point={stop} route={route} days={route.days} drag={drag}
                timing={timingById.get(stop.id)} warnings={timingIssuesById.get(stop.id) ?? []}
                sunriseMinutes={dayTiming.solar?.sunriseMinutes ?? null} firstInDay={stopIndex === 0 && !handoff} />)}
            </ol>
          ) : (
            <p className="rounded-lg bg-gray-50 px-3 py-4 text-sm text-gray-500">
              No mapped stops yet. Add a stop or write a day note below.
            </p>
          )}
          {!route.readOnly && (
            <div className="mt-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="min-w-0 flex-1">
                  <StopSelectPicker
                    label="Type of stop to add"
                    hideLabel
                    value={kind}
                    options={WAYPOINT_TYPES.map((type) => ({
                      value: type.kind,
                      label: type.label,
                      icon: (
                        <span style={{ color: type.color }}>
                          <WaypointIcon kind={type.kind} className="h-4 w-4" />
                        </span>
                      ),
                    }))}
                    onChange={(nextKind) => setKind(nextKind as Waypoint["kind"])}
                  />
                </div>
                <button
                  type="button" disabled={route.pending}
                  onClick={() => isPlacingHere ? route.stopAdding() : route.startAddingToDay(day.id, kind)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-green-900 px-3 py-2 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" /> {isPlacingHere ? "Cancel" : "Add stop"}
                </button>
              </div>
              {isPlacingHere && (
                <div className="mt-3 space-y-3 pt-2">
                  <p className="text-xs font-medium text-green-900">Click the map to place this stop, or search for a location:</p>
                  <WaypointSearch near={route.near} onChoose={route.choosePlace} disabled={route.pending} />
                </div>
              )}
            </div>
          )}
          <div className="mt-4 space-y-1">
            <DayNote day={day} buildId={buildId} readOnly={route.readOnly} />
            <div>
              <button
                type="button"
                aria-expanded={forecastOpen}
                aria-controls={`day-forecast-${day.id}`}
                aria-label={`${forecastOpen ? "Hide" : "Show"} day forecast for ${fullDate(day.date)}`}
                onClick={() => setForecastOpen((value) => !value)}
                className="flex min-h-12 w-full items-center justify-between gap-3 rounded-lg px-2 py-2 text-left text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-green-700"
              >
                <span className="inline-flex items-center gap-2">
                  <CloudSun className="h-[18px] w-[18px] shrink-0 text-green-800" aria-hidden="true" />
                  Day forecast
                </span>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${forecastOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {forecastOpen && (
                <div id={`day-forecast-${day.id}`} className="mt-2 px-2">
                  <WeatherPanel
                    key={`${dayDate}:${matchedPoint ?? "unmatched"}`}
                    points={weatherPoints}
                    date={dayDate}
                    defaultPointId={matchedPoint}
                    onLocationChange={point => setForecastPointId(point.id)}
                    daylight={forecastSolar}
                    planning={{
                      minTemperature: day.minTemperature,
                      conditions: day.conditions,
                      distanceKm: complete ? Number((computed.distanceM / 1000).toFixed(2)) : day.distanceKm,
                      elevationGainM: complete ? Math.round(computed.knownAscentM) : day.elevationGainM,
                      durationMinutes: complete ? computed.estimatedMinutes : day.durationMinutes,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
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
  const itineraryPoints = consolidateOvernightStops(route.points,orderedDays).points;
  const validDays = new Set(orderedDays.map((d) => d.id));
  const unassigned = route.points.filter((stop) => !stop.dayId || !validDays.has(stop.dayId));
  const inheritedSelection = route.activeDayId && inheritedOvernightForDay(itineraryPoints,orderedDays,route.activeDayId);
  const selectedDayId = inheritedSelection?.point.id === route.selectedId ? route.activeDayId : (route.points.find((stop) => stop.id === route.selectedId)?.dayId ?? null);

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

  const endDrag = useCallback(() => {
    setDraggingId(null);
    setHoverStopId(null);
    setHoverDayId(null);
    dragGhost.current?.remove();
    dragGhost.current = null;
    // React applies a successful drop before the next paint. A canceled drag
    // has no reorder, so discard its stale positions after that frame.
    requestAnimationFrame(() => { previousRects.current = null; });
  }, []);

  // Native dragend can be skipped if a drop causes the dragged React node to
  // unmount. Window-level drop/dragend provide a cleanup path in those cases.
  useEffect(() => {
    window.addEventListener("drop", endDrag);
    window.addEventListener("dragend", endDrag);
    return () => {
      window.removeEventListener("drop", endDrag);
      window.removeEventListener("dragend", endDrag);
    };
  }, [endDrag]);

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

  // Selecting a day from the elevation dock keeps the matching itinerary in view.
  useEffect(() => {
    const target = route.activeDayId ? dayNodes.current[route.activeDayId] : null;
    const container = scroller.current;
    if (!target || !container || container.scrollHeight <= container.clientHeight + 8) return;
    const offset = target.getBoundingClientRect().top - container.getBoundingClientRect().top;
    container.scrollTo({ top: container.scrollTop + offset - 4, behavior: "smooth" });
  }, [route.activeDayId]);

  return (
    <section id="itinerary" className="min-w-0 scroll-mt-20 xl:h-[min(82vh,870px)]">
      <div className="min-w-0 xl:h-full">
        <div
          ref={scroller} tabIndex={0}
          aria-label="Daily itinerary. Scroll to explore days. Drag stops between days to reorganize your route."
          className="xl:h-full xl:overflow-y-auto xl:overscroll-contain xl:pr-2 focus-visible:outline-2 focus-visible:outline-green-700"
        >
          {orderedDays.map((day, index) => (
            <div key={day.id} ref={(node) => { dayNodes.current[day.id] = node; }}>
              <DaySection
                day={day} index={index}
                stops={itineraryPoints.filter((point) => point.dayId === day.id)}
                handoff={inheritedOvernightForDay(itineraryPoints,orderedDays,day.id)}
                route={route} drag={drag}
                open={route.expandedDayIds.includes(day.id)}
                setOpen={(next) => route.setDayExpanded(day.id, next)}
                buildId={buildId} weatherPoints={weatherPoints}
              />
            </div>
          ))}
          {!orderedDays.length && <p className="rounded-lg border border-dashed border-gray-200 bg-white p-4 text-sm text-gray-600">Set your trip dates to create days.</p>}

          {unassigned.length > 0 && (
            <section className="mt-5 rounded-xl border border-amber-200 bg-amber-50/40 p-4" aria-label="Unassigned route stops">
              <h4 className="font-semibold text-gray-900">Unassigned stops ({unassigned.length})</h4>
              <p className="mt-1 text-xs text-gray-600">These stops are on your route but don&apos;t belong to a day yet.</p>
              <ol className="mt-3 space-y-2">
                {unassigned.map((stop) => (
                  <li key={stop.id} data-trailpicker-stop-id={stop.id} className={`rounded-xl border bg-white p-3 shadow-sm transition-[opacity,transform,border-color] duration-200 ${draggingId === stop.id ? "scale-[0.985] border-green-200" : "border-gray-200"}`}>
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
                        <div className="w-32 shrink-0">
                          <StopSelectPicker
                            label={`Assign ${stop.name} to a day`}
                            hideLabel
                            placeholder="Assign day"
                            variant="action"
                            value=""
                            disabled={route.pending}
                            options={orderedDays.map((day, i) => ({
                              value: day.id,
                              label: `Day ${i + 1} · ${new Date(day.date).toLocaleDateString("en-CA", { month: "short", day: "numeric", timeZone: "UTC" })}`,
                            }))}
                            onChange={(dayId) => { if (dayId) route.assignStop(stop.id, dayId); }}
                          />
                        </div>
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







