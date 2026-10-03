import { CalendarCheck2 } from "lucide-react";
import TripDayRow from "./TripDayRow";

type TripDay = {
  id: string;
  date: Date;
  minTemperature: number | null;
  conditions: string | null;
  notes: string | null;
};

export default function TripDayList({
  buildId,
  days,
}: {
  buildId: string;
  days: TripDay[];
}) {
  const completedDays = days.filter(
    (day) =>
      day.notes?.trim() ||
      day.conditions ||
      day.minTemperature != null,
  ).length;

  const progress =
    days.length > 0
      ? Math.round(
          (completedDays / days.length) * 100,
        )
      : 0;

  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-sm">
      <div className="border-b border-gray-200 bg-white px-5 py-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-800">
              <CalendarCheck2 className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-950">
                Day-by-day itinerary
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add your plan, expected low, and weather
                for each day.
              </p>
            </div>
          </div>

          <div className="min-w-40">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-500">
                {completedDays} of {days.length} planned
              </span>

              <span className="font-bold text-green-800">
                {progress}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-green-700 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-3 sm:p-5">
        {days.map((day, index) => (
          <TripDayRow
            key={day.id}
            buildId={buildId}
            day={day}
            dayNumber={index + 1}
          />
        ))}
      </div>
    </section>
  );
}