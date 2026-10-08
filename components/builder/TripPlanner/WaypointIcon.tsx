import type { Waypoint } from "@/lib/trip-planner";
import { waypointType } from "@/lib/waypoint-map";

export default function WaypointIcon({ kind, className = "h-4 w-4" }: { kind: Waypoint["kind"]; className?: string }) {
  const type = waypointType(kind);
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d={type.path} /></svg>;
}
