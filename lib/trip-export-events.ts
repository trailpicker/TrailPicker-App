/** Browser-only bridge from the build toolbar to the open Trip Planner.
 * Exports may include current, unsaved route and campsite edits. When the
 * Trip Planner isn't mounted, the toolbar loads a saved server snapshot.
 */
import type { TripExport } from "./trip-resources-export";

export const TRIP_EXPORT_REQUEST = "trailpicker:trip-export-request";
export type TripExportRequest = {
  buildId: string;
  respond: (payload: TripExport) => void;
};
