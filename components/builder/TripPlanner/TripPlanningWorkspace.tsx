"use client";

import type { PlannerDay } from "@/lib/trip-planner";
import type { PackLine } from "@/lib/pack-analysis";
import type { WeatherPoint } from "@/lib/weather/locations";
import DayStopsItinerary from "./DayStopsItinerary";
import TripRoute from "./TripRoute";

type Props = {
  buildId: string;
  days: PlannerDay[];
  waypoints: unknown;
  lat: number | null;
  lng: number | null;
  weatherPoints: WeatherPoint[];
  readOnly?: boolean;
  buildName: string;
  people: number;
  tripLogistics: unknown;
  packLines: PackLine[];
};

export default function TripPlanningWorkspace({
  buildId, days, waypoints, lat, lng,
  weatherPoints, readOnly = false, buildName, people, tripLogistics, packLines,
}: Props) {
  const sortedDays = [...days].sort((a, b) => +new Date(a.date) - +new Date(b.date));

  return (
    <TripRoute
        header={<div className="mb-5">
          <h2 className="text-xl font-bold text-gray-950">Route & itinerary</h2>
          <p className="mt-1 text-sm text-gray-500">Plan each day, add its stops, and see everything on the map.</p>
        </div>}
        buildId={buildId}
        value={waypoints}
        lat={lat}
        lng={lng}
        readOnly={readOnly}
        buildName={buildName}
        people={people}
        tripLogistics={tripLogistics}
        packLines={packLines}
        days={sortedDays}
        renderItinerary={(route) => (
          <DayStopsItinerary
            route={route}
            buildId={buildId}
            days={sortedDays}
            weatherPoints={weatherPoints}
          />
        )}
      />
  );
}


