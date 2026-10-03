"use client";

import type { ReactNode } from "react";
import { useState, useTransition } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CloudSun,
  Droplets,
  Footprints,
  MapPin,
  Mountain,
  NotebookPen,
  Route,
  TentTree,
  ThermometerSun,
} from "lucide-react";

import { updateTripDay } from "@/app/build/actions";
import { plannedDay, type PlannerDay } from "@/lib/trip-planner";
import { Field, SaveStatus, inputClass } from "./PlannerFields";

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (!hours) return `${mins}m`;
  if (!mins) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

function weatherLabel(value: string | null) {
  if (!value) return "Weather not set";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
      <span className="text-green-800">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function MiniDetail({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5 text-sm text-gray-600">
      <span className="shrink-0 text-gray-400">{icon}</span>
      <span className="truncate">{children}</span>
    </span>
  );
}

function FormSection({
  icon,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800">
          {icon}
        </span>
        <div>
          <h4 className="font-bold text-gray-950">{title}</h4>
          {description && (
            <p className="mt-0.5 text-xs leading-5 text-gray-500">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function ReadOnlyItem({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  if (value === null || value === undefined || value === "") return null;

  return (
    <div className="rounded-xl bg-gray-50 px-4 py-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
        {label}
      </p>
      <div className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-700">
        {value}
      </div>
    </div>
  );
}

export default function TripDayRow({
  buildId,
  day,
  dayNumber,
  readOnly = false,
}: {
  buildId: string;
  day: PlannerDay;
  dayNumber: number;
  readOnly?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  function submit(formData: FormData) {
    setError("");

    start(async () => {
      try {
        await updateTripDay(formData);
        setOpen(false);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Could not save. Try again.",
        );
      }
    });
  }

  const isPlanned = plannedDay(day);

  const date = new Date(day.date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    weekday: "short",
    timeZone: "UTC",
  });

  const route =
    day.startLocation || day.endLocation
      ? `${day.startLocation || "Start not set"} → ${day.endLocation || "End not set"}`
      : "Plan this day";

  const hasStats =
    day.distanceKm != null ||
    day.elevationGainM != null ||
    day.elevationLossM != null ||
    day.durationMinutes != null;

  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white transition-all duration-200 ${
        open
          ? "border-green-200 shadow-[0_12px_35px_rgba(0,0,0,0.07)]"
          : "border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md"
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`day-${day.id}`}
        onClick={() => setOpen(!open)}
        className="group w-full p-4 text-left sm:p-5"
      >
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl ${
              isPlanned
                ? "bg-green-900 text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            <span className="text-[9px] font-bold uppercase tracking-wider opacity-70">
              Day
            </span>
            <span className="text-lg font-black leading-none">{dayNumber}</span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-green-800">
                <CalendarDays className="h-3.5 w-3.5" />
                {date}
              </span>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${
                  isPlanned
                    ? "bg-green-50 text-green-800"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {isPlanned && <CheckCircle2 className="h-3 w-3" />}
                {isPlanned ? "Routed" : "Needs route"}
              </span>
            </div>

            <h3 className="mt-2 break-words text-base font-bold leading-snug text-gray-950 sm:text-lg">
              {route}
            </h3>

            {hasStats ? (
              <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
                {day.distanceKm != null && (
                  <Stat
                    icon={<Footprints className="h-4 w-4" />}
                    label="Distance"
                    value={`${day.distanceKm} km`}
                  />
                )}

                {day.elevationGainM != null && (
                  <Stat
                    icon={<Mountain className="h-4 w-4" />}
                    label="Gain"
                    value={`+${day.elevationGainM.toLocaleString()} m`}
                  />
                )}

                {day.elevationLossM != null && (
                  <Stat
                    icon={<Mountain className="h-4 w-4 rotate-180" />}
                    label="Loss"
                    value={`-${day.elevationLossM.toLocaleString()} m`}
                  />
                )}

                {day.durationMinutes != null && (
                  <Stat
                    icon={<Clock3 className="h-4 w-4" />}
                    label="Time"
                    value={formatDuration(day.durationMinutes)}
                  />
                )}
              </div>
            ) : (
              <div className="mt-3 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-400">
                Add distance, elevation and time to complete this day.
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-gray-100 pt-3">
              {day.campsite && (
                <MiniDetail icon={<TentTree className="h-4 w-4" />}>
                  {day.campsite}
                </MiniDetail>
              )}

              {day.waterSource && (
                <MiniDetail icon={<Droplets className="h-4 w-4" />}>
                  {day.waterSource}
                </MiniDetail>
              )}

              <MiniDetail icon={<CloudSun className="h-4 w-4" />}>
                {weatherLabel(day.conditions)}
              </MiniDetail>

              {day.minTemperature != null && (
                <MiniDetail icon={<ThermometerSun className="h-4 w-4" />}>
                  Low {day.minTemperature}°C
                </MiniDetail>
              )}
            </div>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition group-hover:border-green-200 group-hover:text-green-800">
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </span>
        </div>
      </button>

      {open &&
        (readOnly ? (
          <div
            id={`day-${day.id}`}
            className="border-t border-gray-100 bg-gray-50/70 p-4 sm:p-5"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <ReadOnlyItem label="Activities" value={day.activities} />
              <ReadOnlyItem
                label="Trail conditions"
                value={day.trailConditions}
              />
              <ReadOnlyItem
                label="Water carry"
                value={
                  day.waterCarryL != null ? `${day.waterCarryL} L` : null
                }
              />
              <ReadOnlyItem label="Notes" value={day.notes} />
            </div>
          </div>
        ) : (
          <form
            id={`day-${day.id}`}
            action={submit}
            className="space-y-4 border-t border-gray-100 bg-gray-50/70 p-4 sm:p-5"
          >
            <fieldset disabled={pending} className="space-y-4">
              <input type="hidden" name="buildId" value={buildId} />
              <input type="hidden" name="dayId" value={day.id} />

              <FormSection
                icon={<Route className="h-4 w-4" />}
                title="Route"
                description="Where the day starts, ends, and how much ground you expect to cover."
              >
                <Field
                  name="startLocation"
                  label="Start"
                  value={day.startLocation}
                />
                <Field
                  name="endLocation"
                  label="End"
                  value={day.endLocation}
                />
                <Field
                  name="distanceKm"
                  label="Distance (km)"
                  type="number"
                  min={0}
                  max={1000}
                  step="any"
                  value={day.distanceKm}
                />
                <Field
                  name="durationMinutes"
                  label="Estimated time (minutes)"
                  type="number"
                  min={0}
                  max={1440}
                  value={day.durationMinutes}
                />
                <Field
                  name="elevationGainM"
                  label="Elevation gain (m)"
                  type="number"
                  min={0}
                  max={20000}
                  value={day.elevationGainM}
                />
                <Field
                  name="elevationLossM"
                  label="Elevation loss (m)"
                  type="number"
                  min={0}
                  max={20000}
                  value={day.elevationLossM}
                />
              </FormSection>

              <FormSection
                icon={<TentTree className="h-4 w-4" />}
                title="Overnight"
                description="Camp, hut, hotel, or wherever civilization permits you to collapse."
              >
                <Field
                  name="campsite"
                  label="Campsite / accommodation"
                  value={day.campsite}
                />
                <Field
                  name="reservation"
                  label="Reservation / tent pad (private)"
                  value={day.reservation}
                />
              </FormSection>

              <FormSection
                icon={<CloudSun className="h-4 w-4" />}
                title="Conditions"
                description="Expected weather and trail conditions for this specific day."
              >
                <Field
                  name="minTemperature"
                  label="Expected low (°C)"
                  type="number"
                  min={-100}
                  max={60}
                  value={day.minTemperature}
                />

                <label className="block space-y-1.5 text-sm">
                  <span className="font-medium text-gray-700">Weather</span>
                  <select
                    name="conditions"
                    defaultValue={day.conditions ?? ""}
                    className={inputClass}
                  >
                    <option value="">Unknown</option>
                    <option value="dry">Dry</option>
                    <option value="rain">Rain</option>
                    <option value="snow">Snow</option>
                  </select>
                </label>

                <div className="sm:col-span-2">
                  <Field
                    name="trailConditions"
                    label="Trail conditions / warnings"
                    value={day.trailConditions}
                  />
                </div>
              </FormSection>

              <FormSection
                icon={<Droplets className="h-4 w-4" />}
                title="Water & activities"
                description="Water planning plus anything you actually intend to do besides walk."
              >
                <Field
                  name="waterSource"
                  label="Water source"
                  value={day.waterSource}
                />
                <Field
                  name="waterCarryL"
                  label="Water to carry (L)"
                  type="number"
                  min={0}
                  max={100}
                  step="any"
                  value={day.waterCarryL}
                />
                <div className="sm:col-span-2">
                  <Field
                    name="activities"
                    label="Planned activities"
                    value={day.activities}
                  />
                </div>
              </FormSection>

              <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
                <div className="mb-4 flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800">
                    <NotebookPen className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-950">Notes</h4>
                    <p className="mt-0.5 text-xs leading-5 text-gray-500">
                      Anything important that does not fit neatly into a box,
                      as human plans tend to do.
                    </p>
                  </div>
                </div>

                <textarea
                  name="notes"
                  rows={4}
                  maxLength={5000}
                  defaultValue={day.notes ?? ""}
                  className={inputClass}
                  placeholder="Optional notes for this day..."
                />
              </section>
            </fieldset>

            <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <SaveStatus pending={pending} error={error} />

              <button
                type="button"
                disabled={pending}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        ))}
    </article>
  );
}
