/** One geographic campsite can end a hiking day and start the next.
 * The inherited next-day start is derived from the SAME waypoint ID, not a new
 * saved route stop. Legacy duplicate pins are merged only when they represent
 * a genuine consecutive overnight handoff.
 */
import type { Waypoint } from "./trip-planner";
import { isSharedOvernightStop } from "./shared-overnight-stop";

export type OvernightDay = { id: string; date: Date | string };
export type Handoff = { point: Waypoint; fromDayId: string; toDayId: string; fromDayNumber: number; toDayNumber: number };

export function orderedOvernightDays(days: readonly OvernightDay[]): OvernightDay[] {
  return [...days].sort((a,b) => +new Date(a.date) - +new Date(b.date));
}

/** Removing a legacy duplicate must preserve the outgoing trail leg and the
 * next morning's departure time/notes, rather than losing either. */
export function consolidateOvernightStops(points: readonly Waypoint[], days: readonly OvernightDay[]) {
  const ordered = orderedOvernightDays(days);
  const consecutive = new Map(ordered.slice(0,-1).map((day,i) => [day.id,ordered[i+1].id]));
  const merged: Waypoint[] = [];
  const replacedIds: Record<string,string> = {};
  for (const current of points) {
    const last = merged[merged.length - 1];
    if (last && last.kind === "camp" && current.kind === "camp" && last.dayId &&
        consecutive.get(last.dayId) === current.dayId && isSharedOvernightStop(last,current)) {
      const combined: Waypoint = {
        ...last,
        // The outgoing trail of the second pin becomes the outgoing trail of
        // the canonical pin. This preserves GPX, elevation, and shaping.
        trailToNext: current.trailToNext,
        manualToNext: current.manualToNext,
        viaToNext: current.viaToNext,
        ...(current.time ? { nextDayDepartureTime: current.time } : {}),
        ...(current.note ? { nextDayDepartureNote: current.note } : {}),
        ...(current.resource && !last.resource ? { resource: current.resource } : {}),
      };
      merged[merged.length-1] = combined;
      replacedIds[current.id] = last.id;
    } else {
      merged.push(current);
    }
  }
  return { points: merged, replacedIds };
}

export function inheritedOvernightForDay(points: readonly Waypoint[], days: readonly OvernightDay[], dayId: string): Handoff | null {
  const ordered = orderedOvernightDays(days);
  const index = ordered.findIndex(day => day.id === dayId);
  if (index <= 0) return null;
  const prevId = ordered[index - 1].id;
  const priorDayStops = points.filter(point => point.dayId === prevId);
  const final = priorDayStops[priorDayStops.length - 1];
  if (!final || final.kind !== "camp") return null;
  // An explicitly different trailhead begins another route, e.g. after a
  // shuttle transfer. Do not invent a walking leg from the former campsite.
  const first = points.find(point => point.dayId === dayId);
  if (first?.kind === "trailhead" && !isSharedOvernightStop(final, first)) return null;
  return { point: final, fromDayId: prevId, toDayId: dayId, fromDayNumber: index, toDayNumber: index + 1 };
}

/** One selectable campsite per physical overnight, with the day transition. */
export function campsiteChoices(points: readonly Waypoint[], days: readonly OvernightDay[]) {
  const { points: unique, replacedIds } = consolidateOvernightStops(points,days);
  const ordered = orderedOvernightDays(days);
  return { replacedIds, choices: unique.filter(point=>point.kind==="camp").map(point=>{
    const index=ordered.findIndex(day=>day.id===point.dayId);
    const next=index>=0 && index<ordered.length-1 && inheritedOvernightForDay(unique,ordered,ordered[index+1].id)?.point.id===point.id;
    return { id:point.id, name:point.name, dayId:point.dayId??"", dayLabel:next?`Night ${index+1} · Day ${index+1} → Day ${index+2}`:index>=0?`Day ${index+1}`:"Unassigned" };
  }) };
}
