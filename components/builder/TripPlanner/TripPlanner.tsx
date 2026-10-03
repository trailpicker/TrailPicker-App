"use client";

import { useState } from "react";
import TripSummaryCard from "./TripSummaryCard";
import TripEditForm from "./TripEditForm";
import TripDayList from "./TripDayList";
import type { CompatibilityIssue } from "@/lib/compatibility";

type TripDay = {
  id: string;
  date: Date;
  minTemperature: number | null;
  conditions: string | null;
  notes: string | null;
};

type Props = {
  build: {
    id: string;
    location: string | null;
    locationLat: number | null;
    locationLng: number | null;
    startDate: Date | null;
    endDate: Date | null;
    people: number;
    minTemperature: number | null;
    conditions: string | null;
    days: TripDay[];
  };
  issues: CompatibilityIssue[];
};

export default function TripPlanner({
  build,
  issues,
}: Props) {
  const [editing, setEditing] = useState(
    !build.startDate,
  );

  return (
    <div className="mx-auto mt-6 max-w-6xl space-y-6 px-3 pb-20 sm:mt-8 sm:px-6">
      {editing ? (
        <TripEditForm
          build={build}
          onSaved={() => setEditing(false)}
          onCancel={
            build.startDate
              ? () => setEditing(false)
              : undefined
          }
        />
      ) : (
        <>
          <TripSummaryCard
            build={build}
            issues={issues}
            onEdit={() => setEditing(true)}
          />

          {build.days.length > 0 ? (
            <TripDayList
              buildId={build.id}
              days={build.days}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
              <p className="font-semibold text-gray-700">
                No itinerary days yet
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Edit your trip and choose a start and end
                date.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}