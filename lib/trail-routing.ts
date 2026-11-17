/** Pure helpers for trail-following route geometry. No routing-provider dependency. */
export type LatLng = [number, number];
export type TrailSegment = {
  toId: string;
  geometry: LatLng[];
  distanceM: number;
  source: "openrouteservice" | "gpx";
  /** Elevations returned by ORS, one height per simplified geometry vertex. */
  elevationsM?: number[];
  /** Provider-computed cumulative ascent / descent before geometry simplification. */
  ascentM?: number;
  descentM?: number;
};

export const TRAIL_SNAP_RADIUS_M = 75;
export const MAX_TRAIL_VERTICES = 400;

export function validLatLng(value: unknown): value is LatLng {
  return Array.isArray(value) && value.length === 2 &&
    typeof value[0] === "number" && Number.isFinite(value[0]) && Math.abs(value[0]) <= 90 &&
    typeof value[1] === "number" && Number.isFinite(value[1]) && Math.abs(value[1]) <= 180;
}


/** Reject invalid provider elevations; null never masquerades as sea level. */
export function validElevation(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= -500 && value <= 9000;
}

function validAscent(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 200000;
}

export function metersBetween(a: LatLng, b: LatLng): number {
  const radians = Math.PI / 180;
  const dLat = (b[0] - a[0]) * radians;
  const dLon = (b[1] - a[1]) * radians;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * radians) * Math.cos(b[0] * radians) * Math.sin(dLon / 2) ** 2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(Math.max(0, 1 - h)));
}

export function validTrailSegment(value: unknown): value is TrailSegment {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const s = value as Partial<TrailSegment>;
  return typeof s.toId === "string" && !!s.toId && s.toId.length <= 200 &&
    (s.source === "openrouteservice" || s.source === "gpx") && typeof s.distanceM === "number" &&
    Number.isFinite(s.distanceM) && s.distanceM >= 0 && s.distanceM <= 1_000_000 &&
    Array.isArray(s.geometry) && s.geometry.length >= 2 && s.geometry.length <= MAX_TRAIL_VERTICES &&
    s.geometry.every(validLatLng) &&
    (s.elevationsM === undefined ||
      (Array.isArray(s.elevationsM) && s.elevationsM.length === s.geometry.length &&
        s.elevationsM.every(validElevation))) &&
    ((s.ascentM === undefined && s.descentM === undefined) ||
      (s.elevationsM !== undefined && validAscent(s.ascentM) && validAscent(s.descentM)));
}

/** A saved segment is never reused after a stop is moved or reordered. */
export function usableTrailSegment(
  start: { id: string; lat: number; lng: number; trailToNext?: TrailSegment },
  end: { id: string; lat: number; lng: number },
): TrailSegment | null {
  const segment = start.trailToNext;
  if (!validTrailSegment(segment) || segment.toId !== end.id) return null;
  const first = segment.geometry[0];
  const last = segment.geometry[segment.geometry.length - 1];
  if (metersBetween(first, [start.lat, start.lng]) > TRAIL_SNAP_RADIUS_M + 5 ||
      metersBetween(last, [end.lat, end.lng]) > TRAIL_SNAP_RADIUS_M + 5) return null;
  return segment;
}

/** Simplify noisy provider tracks without inventing straight-line trail sections. */
/** Return original indices so elevation and coordinates use identical sampled vertices. */
export function simplifyTrailIndices(
  points: LatLng[], maxVertices = MAX_TRAIL_VERTICES, elevationsM?: readonly number[],
): number[] {
  if (points.length <= maxVertices) return points.map((_, index) => index);
  if (maxVertices < 2) throw new Error("At least two route vertices are required.");
  const project = (p: LatLng) => [p[1] * Math.cos(p[0] * Math.PI / 180), p[0]];
  function shrink(tolerance: number): number[] {
    const keep = new Set([0, points.length - 1]);
    const visit = (a: number, b: number) => {
      if (b <= a + 1) return;
      const [ax, ay] = project(points[a]), [bx, by] = project(points[b]);
      let best = -1, distance = tolerance * tolerance;
      for (let i = a + 1; i < b; i++) {
        const [px, py] = project(points[i]);
        const dx = bx - ax, dy = by - ay;
        const t = dx * dx + dy * dy ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy))) : 0;
        const planarError = (px - ax - t * dx) ** 2 + (py - ay - t * dy) ** 2;
        // Retain meaningful vertical peaks even on geometrically straight paths.
        // Elevation is in metres; ~111 km/degree keeps it comparable to XY error.
        const verticalError = elevationsM
          ? ((elevationsM[i] - elevationsM[a] - t * (elevationsM[b] - elevationsM[a])) / 111195) ** 2
          : 0;
        const d = planarError + verticalError;
        if (d > distance) { distance = d; best = i; }
      }
      if (best > 0) { keep.add(best); visit(a, best); visit(best, b); }
    };
    visit(0, points.length - 1);
    return [...keep].sort((a, b) => a - b);
  }
  let tolerance = 0.000005;
  let indices = points.map((_, i) => i);
  for (let i = 0; i < 24 && indices.length > maxVertices; i++) {
    indices = shrink(tolerance);
    tolerance *= 1.8;
  }
  if (indices.length > maxVertices) throw new Error("Trail geometry is too detailed to display accurately.");
  return indices;
}

/** Simplify noisy provider tracks without inventing straight-line trail sections. */
export function simplifyTrail(points: LatLng[], maxVertices = MAX_TRAIL_VERTICES): LatLng[] {
  return simplifyTrailIndices(points, maxVertices).map(index => points[index]);
}

export function parseSnapResponse(data: unknown): { point: LatLng; distanceM: number } | null {
  const root = data as { locations?: Array<null | { location?: unknown; snapped_distance?: unknown }> } | null;
  const result = root?.locations?.[0];
  if (!result || !validLatLng(Array.isArray(result.location) ? [result.location[1], result.location[0]] : null)) return null;
  const point: LatLng = [Number((result.location as number[])[1]), Number((result.location as number[])[0])];
  const distanceM = result.snapped_distance;
  if (typeof distanceM !== "number" || !Number.isFinite(distanceM) || distanceM < 0 || distanceM > TRAIL_SNAP_RADIUS_M + 1) return null;
  return { point, distanceM };
}

/** Parse two- or three-dimensional ORS GeoJSON without trusting malformed elevation values. */
export function parseRouteResponse(
  data: unknown, from: LatLng, to: LatLng,
): { geometry: LatLng[]; distanceM: number; elevationsM?: number[]; ascentM?: number; descentM?: number } | null {
  const root = data as {
    features?: Array<{
      geometry?: { type?: string; coordinates?: unknown };
      properties?: { summary?: { distance?: unknown; ascent?: unknown; descent?: unknown } };
    }>;
  } | null;
  const feature = root?.features?.[0];
  if (feature?.geometry?.type !== "LineString" || !Array.isArray(feature.geometry.coordinates)) return null;
  const coordinates = feature.geometry.coordinates;
  if (coordinates.length < 2 || coordinates.length > 50000) return null;
  const geometry: LatLng[] = [];
  const rawElevations: number[] = [];
  let allElevationsValid = true;
  for (const pair of coordinates) {
    if (!Array.isArray(pair)) return null;
    const point: LatLng = [pair[1], pair[0]];
    if (!validLatLng(point)) return null;
    geometry.push([Number(point[0].toFixed(6)), Number(point[1].toFixed(6))]);
    if (pair.length < 3 || !validElevation(pair[2])) allElevationsValid = false;
    else rawElevations.push(Number(pair[2].toFixed(1)));
  }
  if (metersBetween(geometry[0], from) > TRAIL_SNAP_RADIUS_M + 5 ||
      metersBetween(geometry[geometry.length - 1], to) > TRAIL_SNAP_RADIUS_M + 5) return null;
  const distanceM = feature.properties?.summary?.distance;
  if (typeof distanceM !== "number" || !Number.isFinite(distanceM) || distanceM <= 0 || distanceM > 1_000_000) return null;
  const indices = simplifyTrailIndices(geometry, MAX_TRAIL_VERTICES, allElevationsValid ? rawElevations : undefined);
  const result: { geometry: LatLng[]; distanceM: number; elevationsM?: number[]; ascentM?: number; descentM?: number } = {
    geometry: indices.map(index => geometry[index]), distanceM,
  };
  if (allElevationsValid) {
    result.elevationsM = indices.map(index => rawElevations[index]);
    const { ascent, descent } = feature.properties?.summary ?? {};
    if (validAscent(ascent) && validAscent(descent)) {
      result.ascentM = ascent;
      result.descentM = descent;
    }
  }
  return result;
}
