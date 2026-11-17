/** GPX 1.1 track interchange for TrailPicker. Browser DOMParser is used only when importing. */
import { metersBetween, simplifyTrailIndices, usableTrailSegment, validElevation, validLatLng, type LatLng, type TrailSegment } from "./trail-routing";
import type { Waypoint } from "./trip-planner";

export const GPX_MAX_BYTES = 4_000_000;
const MAX_TRACK_POINTS = 50_000;
const MAX_SEGMENTS = 199; // contiguous route links can share endpoints; route save limits 200 stops
const GPX_NS = "http://www.topografix.com/GPX/1/1";
const GPX_10_NS = "http://www.topografix.com/GPX/1/0";
const TP_NS = "https://trailpicker.app/ns/gpx/1";

type TrackPoint = { coord: LatLng; height: number | null };
function children(node: Element): Element[] {
  return Array.from(node.childNodes).filter((child): child is Element => child.nodeType === 1);
}
export type GpxImport = { points: Waypoint[]; trackPoints: number; segments: number; distanceM: number; hasCompleteElevation: boolean; approximateSegments: number };
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const fix = (number: number, digits: number) => Number(number.toFixed(digits)).toString();
function newWaypoint(point: TrackPoint, name: string, dayId: string | null): Waypoint {
  return { id: crypto.randomUUID(), name: name.slice(0, 200), kind: "waypoint", lat: point.coord[0], lng: point.coord[1], elevationM: point.height, ...(dayId ? { dayId } : {}) };
}
function gainLoss(points: TrackPoint[]): { ascentM: number; descentM: number } {
  // Dead band reduces spurious climb from GPX GPS/barometric measurement noise.
  let ascentM = 0, descentM = 0, anchor = points[0].height!;
  for (let i = 1; i < points.length; i++) {
    const elevation = points[i].height!;
    const delta = elevation - anchor;
    if (Math.abs(delta) >= 3) {
      if (delta > 0) ascentM += delta;
      else descentM -= delta;
      anchor = elevation;
    }
  }
  return { ascentM: Math.round(ascentM), descentM: Math.round(descentM) };
}

/** Call in the browser. Refuses multi-track ambiguity, invalid XML, oversized tracks and unknown coordinates. */
export function importGpx(xml: string, dayId: string | null = null): GpxImport {
  if (typeof xml !== "string" || new Blob([xml]).size > GPX_MAX_BYTES) throw new Error("The GPX file must be 4 MB or smaller.");
  if (/<!\s*(?:DOCTYPE|ENTITY)/i.test(xml)) throw new Error("GPX files with document declarations or entities are not supported.");
  if (typeof DOMParser === "undefined") throw new Error("GPX import requires a browser.");
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const errors = doc.getElementsByTagName("parsererror");
  if (errors.length || doc.documentElement.localName !== "gpx" || ![GPX_NS, GPX_10_NS, ""].includes(doc.documentElement.namespaceURI ?? "")) {
    throw new Error("This is not a valid GPX 1.0 or 1.1 document.");
  }
  const segments = Array.from(doc.getElementsByTagNameNS("*", "trkseg"));
  if (!segments.length) {
    // Route files use rte/rtept rather than trk/trkseg.
    const rte = Array.from(doc.getElementsByTagNameNS("*", "rte"));
    if (rte.length !== 1) throw new Error("Import a GPX with one track or route. Waypoint-only GPX files cannot become routes.");
    segments.push(rte[0]);
  }
  if (segments.length > MAX_SEGMENTS) throw new Error(`GPX has too many track segments (maximum ${MAX_SEGMENTS}).`);
  // Match standard GPX waypoints back to trail stops, preserving labels on round trip.
  const named = Array.from(doc.getElementsByTagNameNS("*", "wpt")).slice(0, 200).map(node => {
    const lat = Number(node.getAttribute("lat")), lng = Number(node.getAttribute("lon"));
    const name = children(node).find(el => el.localName === "name")?.textContent?.trim().slice(0, 200) ?? "";
    return validLatLng([lat, lng]) && name ? { coord: [lat, lng] as LatLng, name } : null;
  }).filter((item): item is { coord: LatLng; name: string } => item !== null);
  const namedWaypoint = (point: TrackPoint, fallback: string) => {
    const label = named.find(candidate => metersBetween(candidate.coord, point.coord) <= 1)?.name ?? fallback;
    return newWaypoint(point, label, dayId);
  };
  const result: Waypoint[] = [];
  let trackPoints = 0, distanceM = 0, approximateSegments = 0;
  let hasCompleteElevation = true;
  for (const [index, segment] of segments.entries()) {
    const elements = children(segment).filter(n => n.localName === "trkpt" || n.localName === "rtept");
    trackPoints += elements.length;
    if (trackPoints > MAX_TRACK_POINTS) throw new Error("GPX has more than 50,000 track points.");
    if (elements.length < 2) throw new Error(`GPX segment ${index + 1} has fewer than two track points.`);
    const coordinates: TrackPoint[] = elements.map(node => {
      const lat = Number(node.getAttribute("lat")), lng = Number(node.getAttribute("lon"));
      if (!node.hasAttribute("lat") || !node.hasAttribute("lon") || !validLatLng([lat, lng])) throw new Error("GPX contains invalid latitude or longitude.");
      const elevation = children(node).find(el => el.localName === "ele")?.textContent?.trim();
      const height = elevation != null && elevation !== "" ? Number(elevation) : null;
      if (height !== null && !validElevation(height)) throw new Error("GPX contains an invalid elevation sample.");
      return { coord: [Number(lat.toFixed(6)), Number(lng.toFixed(6))], height };
    });
    const approximate = Array.from(segment.getElementsByTagNameNS(TP_NS, "approximate")).some(el => el.textContent?.trim() === "true");
    const completeElevation = !approximate && coordinates.every(p => p.height !== null);
    if (!completeElevation) hasCompleteElevation = false;
    const first = coordinates[0], last = coordinates[coordinates.length - 1];
    const previous = result[result.length - 1];
    if (!previous || metersBetween([previous.lat, previous.lng], first.coord) > 1) {
      if (previous) previous.manualToNext = true; // Explicit gap; never bridge separate GPX segments as trail.
      result.push(namedWaypoint(first, index === 0 ? "GPX trailhead" : `Segment ${index + 1} start`));
    }
    let segmentDistance = 0;
    for (let i = 1; i < coordinates.length; i++) segmentDistance += metersBetween(coordinates[i - 1].coord, coordinates[i].coord);
    if (segmentDistance <= 0 || segmentDistance > 1_000_000) throw new Error("GPX has a zero-length or oversized route segment.");
    distanceM += segmentDistance;
    if (approximate) { approximateSegments++; result[result.length - 1].manualToNext = true; }
    else {
      const indexes = simplifyTrailIndices(coordinates.map(p => p.coord), 400, completeElevation ? coordinates.map(p => p.height!) : undefined);
      const segmentData: Omit<TrailSegment, "toId"> = {
        source: "gpx", geometry: indexes.map(i => coordinates[i].coord), distanceM: Math.round(segmentDistance * 10) / 10,
        ...(completeElevation ? { elevationsM: indexes.map(i => coordinates[i].height!), ...gainLoss(coordinates) } : {}),
      };
      result[result.length - 1].trailToNext = { ...segmentData, toId: "pending" };
    }
    const end = namedWaypoint(last, index === segments.length - 1 ? "GPX finish" : `Segment ${index + 1} end`);
    result.push(end);
    if (!approximate) result[result.length - 2].trailToNext!.toId = end.id;
    if (result.length > 200) throw new Error("GPX route exceeds the 200-stop limit.");
  }
  return { points: result, trackPoints, segments: segments.length, distanceM, hasCompleteElevation, approximateSegments };
}

/** Portable GPX track. Unmapped connections are marked with an extension instead of pretending they are verified trails. */
export function exportGpx(points: readonly Waypoint[], name = "TrailPicker route"): string {
  const lines = [`<?xml version="1.0" encoding="UTF-8"?>`, `<gpx version="1.1" creator="TrailPicker" xmlns="${GPX_NS}" xmlns:tp="${TP_NS}">`, `<metadata><name>${esc(name)}</name></metadata>`];
  for (const point of points) {
    if (!validLatLng([point.lat, point.lng])) continue;
    lines.push(`<wpt lat="${fix(point.lat, 6)}" lon="${fix(point.lng, 6)}">${point.elevationM != null && validElevation(point.elevationM) ? `<ele>${fix(point.elevationM, 1)}</ele>` : ""}<name>${esc(point.name)}</name></wpt>`);
  }
  lines.push(`<trk><name>${esc(name)}</name>`);
  for (let i = 0; i < points.length - 1; i++) {
    const from = points[i], to = points[i + 1];
    const route = from.manualToNext ? null : usableTrailSegment(from, to);
    const coordinates = route?.geometry ?? [[from.lat, from.lng], [to.lat, to.lng]] as LatLng[];
    const heights = route?.elevationsM;
    lines.push("<trkseg>");
    for (const [index, coord] of coordinates.entries()) {
      lines.push(`<trkpt lat="${fix(coord[0], 6)}" lon="${fix(coord[1], 6)}">${heights && validElevation(heights[index]) ? `<ele>${fix(heights[index], 1)}</ele>` : ""}</trkpt>`);
    }
    if (!route) lines.push("<extensions><tp:approximate>true</tp:approximate></extensions>");
    lines.push("</trkseg>");
  }
  lines.push("</trk></gpx>");
  return lines.join("\n");
}
