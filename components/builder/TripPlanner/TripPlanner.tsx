"use client";
//components/builder/TripPlanner/TripPlanner.tsx
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

export default function TripPlanner({ build, issues }: Props) {
  const [editing, setEditing] = useState(!build.startDate);

  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-8 pb-16">
      {editing ? (
        <TripEditForm
          build={build}
          onSaved={() => setEditing(false)}
          onCancel={build.startDate ? () => setEditing(false) : undefined}
        />
      ) : (
        <TripSummaryCard build={build} issues={issues} onEdit={() => setEditing(true)} />
      )}

      {!editing && build.days.length > 0 && (
        <TripDayList buildId={build.id} days={build.days} />
      )}
    </div>
  );
}