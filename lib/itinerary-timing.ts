/**
 * Itinerary timing uses the same routed-leg walking model as Route Analysis.
 * User stop times are immutable commitments, never silently replaced by ETAs.
 * A missing or unverified trail leg breaks the ETA chain instead of becoming a
 * fictitious straight-line hike. No forecast service or persistent time cache.
 */
import tzlookup from "tz-lookup";
import type { PlannerDay, Waypoint } from "./trip-planner";
import { computeRouteMetrics } from "./route-metrics";
import { consolidateOvernightStops, inheritedOvernightForDay, type OvernightDay } from "./overnight-handoffs";
import { approximateDaylight, clockLabel, estimateBreaks, parseClock, type BreakSettings, type DaylightResult } from "./route-analysis-insights";

export type StopTiming = {
  id: string;
  name: string;
  scheduledMinutes: number | null;
  /** Calculated clock-time arrival, not a guarantee. Can exceed 1440 at night. */
  arrivalMinutes: number | null;
  /** Predicted arrival before any waiting, even if the user set a later time. */
  delayMinutes: number;
  /** Minutes to walk from the previous stop, when routed. */
  legMinutes: number | null;
  approximate: boolean;
  missingLeg: boolean;
};
export type DayItineraryTiming = {
  dayId: string;
  stops: StopTiming[];
  solar: DaylightResult | null;
  totalMovingMinutes: number | null;
  totalBreakMinutes: number | null;
  hasStartTime: boolean;
};
export type ItineraryTimingIssue = {
  id: string;
  dayId: string;
  stopId: string;
  category: "schedule" | "daylight";
  severity: "warning" | "info";
  title: string;
  message: string;
  /** Brief version shown beside the stop; full message stays in Compatibility. */
  inlineMessage?: string;
  action: string;
};

/** Small ETA differences are expected on trails and should not create alerts. */
export const ITINERARY_SCHEDULE_TOLERANCE_MINUTES = 15;
/** Larger delays deserve an actual warning rather than a mild advisory. */
export const ITINERARY_SCHEDULE_WARNING_MINUTES = 30;

export const ITINERARY_DEFAULT_BREAKS: BreakSettings = {
  style: "minimal", customMinutesPerHour: 10, lunchMinutes: 0, lunchThresholdMinutes: 240,
};

export function routeDaylight(day: Pick<PlannerDay,"date">, point: Pick<Waypoint,"lat"|"lng"> | undefined): DaylightResult | null {
  if (!point || !Number.isFinite(point.lat) || !Number.isFinite(point.lng)) return null;
  try {
    const zone = tzlookup(point.lat, point.lng);
    return approximateDaylight(day.date, point.lat, point.lng, zone);
  } catch { return null; }
}

/**
 * Stop times are saved as HH:mm, without a day offset. Preserve their local
 * clock value, but interpret an early-morning stop after a late-night ETA as
 * the following day (and a late-evening stop before a just-after-midnight ETA
 * as the previous day). Otherwise keep the itinerary day's clock date so a
 * genuinely too-early commitment still produces a schedule warning.
 */
function scheduledOnTimeline(clockMinutes: number | null, referenceMinutes: number | null): number | null {
  if (clockMinutes === null || referenceMinutes === null) return clockMinutes;
  const dayOffset = Math.floor(referenceMinutes / 1440);
  const localReference = referenceMinutes - dayOffset * 1440;
  const scheduled = clockMinutes + dayOffset * 1440;
  if (localReference >= 18 * 60 && clockMinutes < 6 * 60) return scheduled + 1440;
  if (dayOffset > 0 && localReference < 6 * 60 && clockMinutes >= 18 * 60) return scheduled - 1440;
  return scheduled;
}

/**
 * Each day starts at its earliest stop in saved route order. Times at subsequent
 * stops re-anchor the prediction only if an ETA was unavailable; otherwise a
 * later commitment introduces waiting time, and an earlier one becomes a warning.
 * Stop durations are applied after arrival, not added to the arrival itself.
 */
export function calculateDayItinerary(
  allPoints: readonly Waypoint[], day: Pick<PlannerDay,"id"|"date">,
  paceKmh = 4, breaks: BreakSettings = ITINERARY_DEFAULT_BREAKS,
  days: readonly OvernightDay[] = [],
): DayItineraryTiming {
  const canonical = consolidateOvernightStops(allPoints, days).points;
  const inherited = inheritedOvernightForDay(canonical, days, day.id);
  const ownStops = canonical.filter(point=>point.dayId===day.id);
  const stops = inherited ? [{...inherited.point, dayId:day.id, time:inherited.point.nextDayDepartureTime??null,
    note:inherited.point.nextDayDepartureNote??null, stayMinutes:0}, ...ownStops] : ownStops;
  const positions = new Map(canonical.map((point,index) => [point.id,index]));
  const legApproximate: boolean[] = stops.map(() => false);
  const legMinutes: (number|null)[] = stops.map((point, index) => {
    if (index === 0) return null;
    const prev = stops[index - 1];
    if (positions.get(point.id) !== (positions.get(prev.id) ?? -2) + 1) return null;
    const metrics = computeRouteMetrics([prev,point],[],paceKmh);
    // A snapped trail is required. Missing elevation gives an explicitly rough
    // distance-based approximation; completely unmapped legs never get an ETA.
    if (metrics.routedSegments !== 1) return null;
    // The route model can estimate distance-only segments, but without an
    // elevation profile that value is approximate rather than terrain-adjusted.
    legApproximate[index] = metrics.estimatedMinutes === null;
    return metrics.routedEstimateMinutes;
  });
  const fullyMapped = stops.length > 1 && legMinutes.slice(1).every(minutes => minutes !== null);
  const moving = fullyMapped ? legMinutes.slice(1).reduce<number>((sum,n)=>sum+(n??0),0) : null;
  const allBreaks = estimateBreaks(moving,breaks);
  // Distribute breaks by cumulative walking progress to avoid charging a full
  // rounded break for every short leg. Lunch appears once around mid-route.
  const legBreaks = legMinutes.map(() => 0);
  if (moving !== null && allBreaks !== null && moving > 0) {
    let cumulative = 0;
    let priorShort = 0;
    let lunchAdded = false;
    for (let i=1; i<legMinutes.length; i++) {
      cumulative += legMinutes[i] ?? 0;
      const cumulativeShort = Math.round(allBreaks.shortMinutes * cumulative / moving);
      legBreaks[i] = cumulativeShort - priorShort;
      priorShort = cumulativeShort;
      if (!lunchAdded && cumulative >= moving/2) {
        legBreaks[i] += allBreaks.lunchMinutes;
        lunchAdded = true;
      }
    }
  } else {
    // For partial routes, account for short rests on known legs without
    // claiming a full-day break estimate or adding an unsupported lunch.
    for (let i=1; i<legMinutes.length; i++) {
      if (legMinutes[i] !== null) legBreaks[i] = estimateBreaks(legMinutes[i], { ...breaks, lunchMinutes: 0 })?.shortMinutes ?? 0;
    }
  }

  let previousLeave: number|null = null;
  const calculated: StopTiming[] = stops.map((stop,index) => {
    const clock = parseClock(stop.time);
    const leg = legMinutes[index];
    let arrival: number|null = null;
    if (index === 0) arrival = clock;
    else if (leg !== null && previousLeave !== null) arrival = previousLeave + leg + legBreaks[index];
    // Infer the calendar day only for midnight rollover. A scheduled time
    // never changes the independently calculated arrival at this stop.
    const scheduled = index === 0 ? clock : scheduledOnTimeline(clock, arrival ?? previousLeave);
    const lateBy = arrival !== null && scheduled !== null ? Math.max(0,arrival-scheduled) : 0;
    const timeForContinuing = arrival === null ? scheduled : scheduled === null ? arrival : Math.max(arrival,scheduled);
    // The first stop time is a departure, so a stay duration there would
    // double-count time already spent before leaving the trailhead.
    previousLeave = timeForContinuing === null ? null : timeForContinuing + (index === 0 ? 0 : (stop.stayMinutes ?? 0));
    const approximate = leg !== null && legApproximate[index];
    return {id:stop.id,name:stop.name,scheduledMinutes:scheduled,arrivalMinutes:arrival,
      delayMinutes:lateBy, legMinutes:leg, approximate, missingLeg:index>0 && leg===null};
  });
  return {
    dayId:day.id, stops:calculated, solar:routeDaylight(day,stops[0]),
    totalMovingMinutes:moving, totalBreakMinutes:allBreaks?.totalMinutes ?? null,
    hasStartTime:stops.length>0 && parseClock(stops[0].time)!==null,
  };
}

export function itineraryTimingIssues(day: DayItineraryTiming, label: string): ItineraryTimingIssue[] {
  const issues:ItineraryTimingIssue[]=[];
  for (const stop of day.stops) {
    const delay = Math.round(stop.delayMinutes);
    if (delay <= ITINERARY_SCHEDULE_TOLERANCE_MINUTES) continue;
    const significant = delay > ITINERARY_SCHEDULE_WARNING_MINUTES;
    issues.push({
      id:`itinerary-late-${day.dayId}-${stop.id}`,dayId:day.dayId,stopId:stop.id,
      category:"schedule",severity:significant?"warning":"info",
      title:significant?"Scheduled arrival may be too early":"Tight arrival schedule",
      message:`${label}: ${stop.name} · Scheduled ${clockLabel(stop.scheduledMinutes!)} · Est. ${clockLabel(stop.arrivalMinutes!)} (${delay} min later)`,
      inlineMessage:`Scheduled ${clockLabel(stop.scheduledMinutes!)} · Est. ${clockLabel(stop.arrivalMinutes!)} (${delay} min later)`,
      action:"Allow more hiking time, change the departure time, or revise this stop's schedule.",
    });
  }
  const first=day.stops[0], solar=day.solar;
  if (first && first.scheduledMinutes!==null && solar?.sunriseMinutes!==null && solar?.sunriseMinutes!==undefined && first.scheduledMinutes < solar.sunriseMinutes) {
    issues.push({id:`itinerary-sunrise-${day.dayId}`,dayId:day.dayId,stopId:first.id,category:"daylight",severity:"info",title:"Departure before sunrise",
      message:`${label}: scheduled departure is before approximate sunrise (${clockLabel(solar.sunriseMinutes)}).`,
      action:"Plan for darkness if departing before sunrise; verify local conditions.",});
  }
  // A single meaningful daylight finding per day avoids an alert for every
  // subsequent stop after sunset. Only a calculated arrival can trigger it.
  if (solar?.sunsetMinutes!==null && solar?.sunsetMinutes!==undefined) {
    const sunset=solar.sunsetMinutes;
    const late=day.stops.find((stop,index)=>index>0 && stop.arrivalMinutes!==null && stop.arrivalMinutes>sunset);
    if (late) issues.push({id:`itinerary-sunset-${day.dayId}`,dayId:day.dayId,stopId:late.id,category:"daylight",severity:"warning",title:"Arrival after sunset",
      message:`${label}: ${late.name} · Est. ${clockLabel(late.arrivalMinutes!)} · Sunset ${clockLabel(sunset)}`,
      inlineMessage:`Est. ${clockLabel(late.arrivalMinutes!)} · Sunset ${clockLabel(sunset)}`,
      action:"Consider an earlier departure, more time, or a shorter route. Sunset varies with terrain and weather.",});
    else {
      const last=day.stops.at(-1);
      if (last && last.arrivalMinutes!==null && last.arrivalMinutes>=sunset-45) issues.push({
        id:`itinerary-daylight-tight-${day.dayId}`,dayId:day.dayId,stopId:last.id,category:"daylight",severity:"info",title:"Limited daylight margin",
        message:`${label}: estimated finish leaves about ${Math.max(0,Math.round(sunset-last.arrivalMinutes))} minutes before approximate sunset.`,
        action:"Consider an earlier departure or additional time for unexpected delays.",
      });
    }
  }
  return issues;
}

export function analyzeItineraryTimings(
  allPoints: readonly Waypoint[], days: readonly Pick<PlannerDay,"id"|"date">[],
  paceKmh=4, breaks:BreakSettings=ITINERARY_DEFAULT_BREAKS,
) {
  const ordered=[...days].sort((a,b)=>new Date(a.date).getTime()-new Date(b.date).getTime());
  const schedule=ordered.map(day=>calculateDayItinerary(allPoints,day,paceKmh,breaks,ordered));
  const issues=schedule.flatMap((day,index)=>itineraryTimingIssues(day,`Day ${index+1}`));
  return {days:schedule,issues};
}


