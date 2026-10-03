"use client";

import {
  CalendarDays,
  Check,
  ChevronDown,
  CloudSun,
  FileText,
  Pencil,
  Thermometer,
  X,
} from "lucide-react";

import {
  useState,
  useTransition,
} from "react";

import { updateTripDay } from "@/app/build/actions";

type TripDay = {
  id: string;
  date: Date;
  minTemperature: number | null;
  conditions: string | null;
  notes: string | null;
};

const conditionMeta: Record<
  string,
  {
    icon: string;
    label: string;
    className: string;
  }
> = {
  dry: {
    icon: "☀️",
    label: "Dry",
    className: "bg-amber-50 text-amber-800",
  },
  rain: {
    icon: "🌧️",
    label: "Rain",
    className: "bg-blue-50 text-blue-800",
  },
  snow: {
    icon: "❄️",
    label: "Snow",
    className: "bg-sky-50 text-sky-800",
  },
};

export default function TripDayRow({
  buildId,
  day,
  dayNumber,
}: {
  buildId: string;
  day: TripDay;
  dayNumber: number;
}) {
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] =
    useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateTripDay(formData);
      setOpen(false);
    });
  }

  const dateLabel = new Date(
    day.date,
  ).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const condition = day.conditions
    ? conditionMeta[day.conditions]
    : null;

  const hasPlan = Boolean(
    day.notes?.trim() ||
      day.conditions ||
      day.minTemperature != null,
  );

  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white transition ${
        open
          ? "border-green-300 shadow-sm ring-2 ring-green-700/5"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-start gap-4 px-4 py-4 text-left sm:px-5"
      >
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
            hasPlan
              ? "bg-green-900 text-white"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {hasPlan ? (
            <Check className="h-5 w-5" />
          ) : (
            dayNumber
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                Day {dayNumber}
              </p>

              <p className="mt-0.5 font-bold text-gray-950">
                {dateLabel}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {condition && (
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${condition.className}`}
                >
                  {condition.icon} {condition.label}
                </span>
              )}

              {day.minTemperature != null && (
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                  {day.minTemperature}°C low
                </span>
              )}

              <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-500">
                <Pencil className="h-3 w-3" />
                {open ? "Close" : "Edit"}
              </span>
            </div>
          </div>

          {day.notes ? (
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
              {day.notes}
            </p>
          ) : (
            <p className="mt-3 text-sm text-gray-400">
              No plan added yet.
            </p>
          )}
        </div>

        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-gray-300 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <form
          action={handleSubmit}
          className="border-t border-gray-100 bg-gray-50 p-4 sm:p-5"
        >
          <input
            type="hidden"
            name="dayId"
            value={day.id}
          />

          <input
            type="hidden"
            name="buildId"
            value={buildId}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500">
                <Thermometer className="h-4 w-4" />
                Expected low
              </span>

              <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/10">
                <input
                  name="minTemperature"
                  type="number"
                  defaultValue={
                    day.minTemperature ?? undefined
                  }
                  placeholder="-5"
                  className="w-full py-2.5 text-sm outline-none"
                />

                <span className="text-sm text-gray-400">
                  °C
                </span>
              </div>
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500">
                <CloudSun className="h-4 w-4" />
                Conditions
              </span>

              <select
                name="conditions"
                defaultValue={
                  day.conditions ?? ""
                }
                className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              >
                <option value="">Unknown</option>
                <option value="dry">
                  ☀️ Dry
                </option>
                <option value="rain">
                  🌧️ Rain
                </option>
                <option value="snow">
                  ❄️ Snow
                </option>
              </select>
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500">
              <FileText className="h-4 w-4" />
              Plan for this day
            </span>

            <textarea
              name="notes"
              defaultValue={day.notes ?? ""}
              placeholder="Example: Leave at 8:00 AM, hike to camp, set up the tent, collect water and cook dinner..."
              rows={4}
              className="w-full resize-y rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm leading-6 outline-none placeholder:text-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
            />
          </label>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-green-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Check className="h-4 w-4" />
              {isPending ? "Saving..." : "Save day"}
            </button>
          </div>
        </form>
      )}
    </article>
  );
}