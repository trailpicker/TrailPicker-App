import type { Waypoint } from "@/lib/trip-planner";

export const WAYPOINT_TYPES = [
  { kind: "trailhead", label: "Trailhead", color: "#166534", path: "M5 21V3m0 0h13l-3 4 3 4H5" },
  { kind: "camp", label: "Campsite", color: "#b45309", path: "m3 20 9-16 9 16H3Zm6 0 3-6 3 6M9 3l3 1 3-1" },
  { kind: "water", label: "Water", color: "#0369a1", path: "M12 3s-7 8-7 12a7 7 0 0 0 14 0c0-4-7-12-7-12Z" },
  { kind: "waypoint", label: "Stop", color: "#475569", path: "M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0ZM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" },
] as const;

export function waypointType(kind: Waypoint["kind"]) {
  return WAYPOINT_TYPES.find(type => type.kind === kind) ?? WAYPOINT_TYPES[3];
}

export function nextWaypointName(points: Waypoint[], kind: Waypoint["kind"]) {
  const label = waypointType(kind).label;
  const used = new Set(points.map(point => point.name.trim().toLocaleLowerCase()));
  let n = 1;
  while (used.has(`${label} ${n}`.toLocaleLowerCase())) n++;
  return `${label} ${n}`;
}

export function validCoordinates(lat: unknown, lng: unknown): lat is number {
  return typeof lat === "number" && Number.isFinite(lat) && Math.abs(lat) <= 90 &&
    typeof lng === "number" && Number.isFinite(lng) && Math.abs(lng) <= 180;
}

export function moveWaypoint(points: Waypoint[], index: number, delta: -1 | 1): Waypoint[] {
  const next = index + delta;
  if (index < 0 || index >= points.length || next < 0 || next >= points.length) return points;
  const result = [...points];
  [result[index], result[next]] = [result[next], result[index]];
  return result;
}

export function routeForSave(points: Waypoint[]): Waypoint[] {
  if (points.length > 200) throw new Error("A route can have up to 200 stops.");
  const ids = new Set<string>();
  return points.map(point => {
    if (!point.id || point.id.length > 200 || ids.has(point.id)) throw new Error("One of the stops has an invalid ID. Reload the route and try again.");
    ids.add(point.id);
    if (!validCoordinates(point.lat, point.lng)) throw new Error("One of the stops has an invalid map position.");
    if (!WAYPOINT_TYPES.some(type => type.kind === point.kind)) throw new Error("Choose a valid stop type.");
    const name = point.name.trim();
    if (!name || name.length > 200) throw new Error("Give each stop a name between 1 and 200 characters.");
    if (point.elevationM !== null && (!Number.isFinite(point.elevationM) || point.elevationM < -500 || point.elevationM > 9000)) {
      throw new Error("Optional elevation must be between -500 and 9000 m.");
    }
    return { id: point.id, name, kind: point.kind, lat: point.lat, lng: point.lng, elevationM: point.elevationM };
  });
}

export type PlaceResult = { id: string; name: string; detail: string; lat: number; lng: number };
const record = (value: unknown): Record<string, unknown> | null => value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;

export function parsePlaceResults(value: unknown): PlaceResult[] {
  const root = record(value);
  if (!root || !Array.isArray(root.features)) return [];
  const results: PlaceResult[] = [];
  const seen = new Set<string>();
  for (const feature of root.features) {
    const row = record(feature), geometry = record(row?.geometry), properties = record(row?.properties);
    if (!properties || geometry?.type !== "Point" || !Array.isArray(geometry.coordinates)) continue;
    const [lng, lat] = geometry.coordinates;
    if (!validCoordinates(lat, lng)) continue;
    const name = [properties.name, properties.street, properties.city].find(text => typeof text === "string" && text.trim());
    if (typeof name !== "string") continue;
    const detail = [...new Set([properties.city, properties.state, properties.country].filter((text): text is string => typeof text === "string" && text.trim() !== "" && text !== name))].join(", ");
    const id = `${String(properties.osm_type ?? "place")}:${String(properties.osm_id ?? "")}:${lat}:${lng}`;
    if (seen.has(id)) continue;
    seen.add(id);
    results.push({ id, name: name.trim().slice(0, 200), detail: detail.slice(0, 400), lat, lng: lng as number });
    if (results.length === 6) break;
  }
  return results;
}

// Only fixed SVG paths, colors, and a numeric order enter marker HTML.
// Names from search/user input are rendered by React, never interpolated here.
export function waypointMarkerHtml(kind: Waypoint["kind"], order: number, selected: boolean) {
  const type = waypointType(kind);
  const count = Math.max(1, Math.min(200, Math.trunc(Number.isFinite(order) ? order : 1)));
  return `<div style="position:relative;display:flex;align-items:center;justify-content:center;width:34px;height:34px;border:2px solid white;border-radius:50%;background:${type.color};box-shadow:0 2px 6px #0004${selected ? ",0 0 0 4px #ffffffcc,0 0 0 6px " + type.color : ""}"><svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${type.path}"/></svg><span style="position:absolute;right:-7px;bottom:-5px;display:flex;align-items:center;justify-content:center;min-width:17px;height:17px;padding:0 3px;border:1px solid #e2e8f0;border-radius:9px;background:white;color:#334155;font:700 10px system-ui">${count}</span></div>`;
}
