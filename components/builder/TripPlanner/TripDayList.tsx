import { Route } from "lucide-react";
import TripDayRow from "./TripDayRow";
import { plannedDay, type PlannerDay } from "@/lib/trip-planner";

export default function TripDayList({
  buildId,
  days,
  readOnly = false,
}: {
  buildId: string;
  days: PlannerDay[];
  readOnly?: boolean;
}) {
  const sorted = [...days].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const completed = days.filter(plannedDay).length;
  const progress = days.length ? Math.round((completed / days.length) * 100) : 0;

  return (
    <section
      id="itinerary"
      className="scroll-mt-20 rounded-[28px] border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
    >
      <div className="mb-6 flex flex-col gap-5 border-b border-gray-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-900 text-white">
            <Route className="h-5 w-5" />
          </span>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-green-700">
              Daily plan
            </p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
              Itinerary
            </h2>
            <p className="mt-1 max-w-xl text-sm leading-6 text-gray-500">
              Build the trip day by day with route, elevation, camp, water,
              weather, and notes.
            </p>
          </div>
        </div>

        {days.length > 0 && (
          <div className="min-w-[190px] rounded-2xl bg-gray-50 px-4 py-3">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="font-medium text-gray-500">Route progress</span>
              <span className="font-bold text-green-900">
                {completed}/{days.length}
              </span>
            </div>

            <div
              role="progressbar"
              aria-label="Days with start, end and distance"
              aria-valuemin={0}
              aria-valuemax={days.length}
              aria-valuenow={completed}
              className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200"
            >
              <div
                className="h-full rounded-full bg-green-800 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {sorted.map((day, index) => (
          <TripDayRow
            key={`${day.id}-${new Date(day.date).toISOString()}`}
            buildId={buildId}
            day={day}
            dayNumber={index + 1}
            readOnly={readOnly}
          />
        ))}

        {!days.length && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
            <Route className="mx-auto h-7 w-7 text-gray-300" />
            <p className="mt-3 font-semibold text-gray-700">
              No itinerary days yet
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Choose trip dates and TrailPicker will create the daily plan.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
