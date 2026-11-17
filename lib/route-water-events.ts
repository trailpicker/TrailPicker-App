import type { Waypoint } from "./trip-planner";
/** Only same-page Trip Planner components exchange unsaved route drafts. */
export const ROUTE_WATER_POINTS_REQUEST = "trailpicker:water-points-request";
export const ROUTE_WATER_POINTS_CHANGED = "trailpicker:water-points-changed";
export type RouteWaterPointsChanged = { buildId: string; points: Waypoint[]; draft: boolean };
export type RouteWaterPointsRequest = { buildId: string; respond: (payload: RouteWaterPointsChanged) => void };
