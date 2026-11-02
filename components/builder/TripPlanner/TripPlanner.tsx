
"use client";

import { useEffect, useState } from "react";
import WeatherPanel from "./WeatherPanel";
import { weatherPoints } from "@/lib/weather/locations";
import TripSummaryCard from "./TripSummaryCard";
import TripEditForm from "./TripEditForm";
import TripPlanningWorkspace from "./TripPlanningWorkspace";
import TripLogistics from "./TripLogistics";
import { type PlannerBuild } from "@/lib/trip-planner";
import type { CompatibilityIssue } from "@/lib/compatibility";

export default function TripPlanner({
  build,
  issues,
  readOnly = false,
}: {
  build: PlannerBuild;
  issues: CompatibilityIssue[];
  readOnly?: boolean;
}) {
  const [editing, setEditing] = useState(!readOnly && !build.startDate);
  // A full replace/restore invalidates editor defaults, including the
  // destination picker. Close that editor before the refreshed server props arrive.
  useEffect(() => {
    const onReplaced = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== build.id) return;
      setEditing(false);
    };
    window.addEventListener("trailpicker:build-replaced", onReplaced);
    return () => window.removeEventListener("trailpicker:build-replaced", onReplaced);
  }, [build.id]);

  const points = weatherPoints(build);

  const temperatures = [
    build.minTemperature,
    ...build.days.map((d) => d.minTemperature),
  ].filter((x): x is number => x != null);

  const displayBuild = {
    ...build,
    minTemperature: temperatures.length
      ? Math.min(...temperatures)
      : null,
  };

  return (
    <div className="mx-auto mt-4 max-w-screen-2xl space-y-8 px-4 pb-20">
      {/* Section navigation */}
      <nav
        aria-label="Trip sections"
        className="border-b border-gray-200"
      >
        <div className="flex items-center gap-8 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            "overview",
            "route",
            "forecast",
            ...(!readOnly ? ["logistics"] : []),
          ].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className="shrink-0 border-b-2 border-transparent px-1 py-3 text-sm font-medium capitalize text-gray-600 transition-colors hover:border-green-700 hover:text-green-900"
            >
              {section === "route" ? "Route & itinerary" : section}
            </a>
          ))}
        </div>
      </nav>

      {/* Overview */}
      <div id="overview" className="scroll-mt-20">
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
          <TripSummaryCard
            build={displayBuild}
            issues={issues}
            onEdit={
              readOnly ? undefined : () => setEditing(true)
            }
          />
        )}
      </div>

      {/* One connected route and day-planning workspace */}
      <TripPlanningWorkspace
        buildId={build.id}
        waypoints={build.routeWaypoints}
        lat={build.locationLat}
        lng={build.locationLng}
        days={build.days}
        weatherPoints={points}
        readOnly={readOnly}
      />

      {/* Weather */}
      <WeatherPanel
        points={points}
        tripStart={
          build.startDate
            ? new Date(build.startDate).toISOString().slice(0, 10)
            : undefined
        }
        tripEnd={
          build.endDate
            ? new Date(build.endDate).toISOString().slice(0, 10)
            : undefined
        }
      />

      {/* Logistics */}
      {!readOnly && (
        <TripLogistics
          buildId={build.id}
          value={build.tripLogistics}
        />
      )}
    </div>
  );
}

