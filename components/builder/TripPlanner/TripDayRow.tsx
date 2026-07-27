"use client";
//components/builder/TripPlanner/TripDayRow.tsx
import { useState, useTransition } from "react";
import { updateTripDay } from "@/app/build/actions";

type TripDay = {
  id: string;
  date: Date;
  minTemperature: number | null;
  conditions: string | null;
  notes: string | null;
};

const conditionIcons: Record<string, string> = {
  dry: "☀️",
  rain: "🌧️",
  snow: "❄️",
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
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateTripDay(formData);
      setOpen(false);
    });
  }

  const dateLabel = day.date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className="px-6 py-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-400 w-16 shrink-0">
            Night {dayNumber}
          </span>
          <span className="text-sm font-medium">{dateLabel}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-500">
          {day.conditions && <span>{conditionIcons[day.conditions]}</span>}
          {day.minTemperature != null && <span>{day.minTemperature}°C</span>}
          <span className="text-gray-300">{open ? "−" : "+"}</span>
        </div>
      </button>

      {open && (
        <form action={handleSubmit} className="mt-3 flex flex-wrap items-end gap-3">
          <input type="hidden" name="dayId" value={day.id} />
          <input type="hidden" name="buildId" value={buildId} />

          <div>
            <label className="block text-[10px] font-semibold uppercase text-gray-400 mb-1">
              Low (°C)
            </label>
            <input
              name="minTemperature"
              type="number"
              defaultValue={day.minTemperature ?? undefined}
              className="w-20 rounded-md border px-2 py-1 text-sm"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase text-gray-400 mb-1">
              Conditions
            </label>
            <select
              name="conditions"
              defaultValue={day.conditions ?? ""}
              className="rounded-md border px-2 py-1 text-sm cursor-pointer"
            >
              <option value="">Unknown</option>
              <option value="dry">Dry</option>
              <option value="rain">Rain</option>
              <option value="snow">Snow</option>
            </select>
          </div>

          <div className="flex-1 min-w-[140px]">
            <label className="block text-[10px] font-semibold uppercase text-gray-400 mb-1">
              Notes
            </label>
            <input
              name="notes"
              defaultValue={day.notes ?? ""}
              placeholder="e.g. summit day"
              className="w-full rounded-md border px-2 py-1 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="rounded-md bg-green-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-800 transition disabled:opacity-60 cursor-pointer"
          >
            {isPending ? "..." : "Save"}
          </button>
        </form>
      )}
    </div>
  );
}