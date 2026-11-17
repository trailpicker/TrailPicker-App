/** Browser-only communication between the build toolbar and the live Trip Route editor. */
import type { Waypoint } from "./trip-planner";

export const GPX_TOOLBAR_PING = "trailpicker:gpx-toolbar-ping";
export const GPX_TOOLBAR_READY = "trailpicker:gpx-toolbar-ready";
export const GPX_TOOLBAR_IMPORT = "trailpicker:gpx-toolbar-import";
export const GPX_TOOLBAR_EXPORT = "trailpicker:gpx-toolbar-export";

export type GpxToolbarImport = {
  buildId: string;
  points: Waypoint[];
  respond: (accepted: boolean, reason?: string) => void;
};
export type GpxToolbarExport = {
  buildId: string;
  respond: (exported: boolean, reason?: string) => void;
};
