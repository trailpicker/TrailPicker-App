import {
  readWaypoints,
  type PlannerBuild,
  type PlannerDay,
} from "../trip-planner";
export type WeatherPoint = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  elevationM: number | null;
};
export function weatherPoints(build: PlannerBuild): WeatherPoint[] {
  const points: WeatherPoint[] = readWaypoints(build.routeWaypoints).map(
    (p) => ({
      id: p.id,
      name: p.name,
      lat: p.lat,
      lng: p.lng,
      elevationM: p.elevationM,
    }),
  );
  if (build.locationLat !== null && build.locationLng !== null)
    points.unshift({
      id: "trip-location",
      name: build.location || "Trip location",
      lat: build.locationLat,
      lng: build.locationLng,
      elevationM: null,
    });
  return points;
}
export function dayWeatherPoint(
  day: Pick<PlannerDay, "campsite" | "endLocation" | "startLocation">,
  points: WeatherPoint[],
): string | undefined {
  for (const name of [day.campsite, day.endLocation, day.startLocation]) {
    if (!name?.trim()) continue;
    const matches = points.filter(
      (p) => p.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );
    if (matches.length === 1) return matches[0].id;
  }
  return undefined;
}
