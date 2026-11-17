"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  AlertTriangle, ChevronDown, MapPin, SlidersHorizontal, X,
  Route as RouteIcon,
} from "lucide-react";
import { computeRouteMetrics } from "@/lib/route-metrics";
import { classicNaismithMinutes, sacReferenceMinutes } from "@/lib/hiking-time";
import { routeAnalysisScope } from "@/lib/route-analysis-scope";
import {
  analyzeTerrain,
  type BreakSettings, type SustainedSlope,
} from "@/lib/route-analysis-insights";
import type { PlannerDay, Waypoint } from "@/lib/trip-planner";
import { notableTerrainFindings, summarizeGradient } from "@/lib/terrain-gradient-summary";

const PACE_OPTIONS = [
  { label: "Relaxed", pace: 3 },
  { label: "Steady", pace: 4 },
  { label: "Brisk", pace: 5 },
] as const;
const km = (meters: number) => (meters / 1000).toFixed(2);
const wholeMeters = (meters: number) => Math.round(meters).toLocaleString("en-CA");
const duration = (minutes: number) => {
  const rounded = Math.round(minutes);
  const hours = Math.floor(rounded / 60);
  const remaining = rounded % 60;
  return hours ? `${hours}h ${remaining ? `${remaining}m` : ""}`.trim() : `${remaining}m`;
};
const pct = (part: number, total: number) => total > 0 ? Math.round(part / total * 100) : 0;
const formatSlope = (value: number) => `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
function TerrainFindingRow({ title, slope, dayLabels, onInspect }: {
  title: string; slope: SustainedSlope; dayLabels: Map<string, string>;
  onInspect?: (section: SustainedSlope) => void;
}) {
  const day = slope.dayId ? dayLabels.get(slope.dayId) ?? "Unknown day" : "Cross-day / unassigned";
  return <div className="min-w-0 rounded-lg border border-gray-200 bg-white px-3 py-3 sm:px-4">
    <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
      <div className="min-w-[180px] flex-1">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="mt-1 text-[11px] tabular-nums text-gray-500">{day} · km {km(slope.startM)}–{km(slope.endM)}</p>
      </div>
      <div className="grid min-w-0 flex-[2] grid-cols-3 gap-x-3 gap-y-2 sm:max-w-[520px]">
        <div className="min-w-0"><p className="text-[11px] text-gray-500">Avg. gradient</p><p className="mt-0.5 text-sm font-bold tabular-nums text-gray-950">{formatSlope(slope.gradePct)}</p></div>
        <div className="min-w-0"><p className="text-[11px] text-gray-500">Distance</p><p className="mt-0.5 text-sm font-bold tabular-nums text-gray-950">{km(slope.endM - slope.startM)} km</p></div>
        <div className="min-w-0"><p className="text-[11px] text-gray-500">{slope.direction === "climb" ? "Elevation gain" : "Elevation loss"}</p><p className="mt-0.5 text-sm font-bold tabular-nums text-gray-950">{slope.direction === "climb" ? "+" : "−"}{wholeMeters(slope.gainM)} m</p></div>
      </div>
      {onInspect && <button type="button" onClick={() => onInspect(slope)}
        className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg border border-green-200 bg-white px-3 py-1.5 text-xs font-semibold text-green-900 hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700">
        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />Locate on map
      </button>}
    </div>
  </div>;
}

export default function RouteElevationPanel({ points, days, working, paceKmh, onPaceChange, breaks, onBreaksChange, activeDayId, onInspectTerrain }: {
  points: Waypoint[]; days: PlannerDay[]; working: boolean; paceKmh: number; onPaceChange: (value: number) => void;
  breaks: BreakSettings; onBreaksChange: Dispatch<SetStateAction<BreakSettings>>;
  activeDayId: string | null;
  onInspectTerrain?: (section: SustainedSlope) => void;
}) {
  const metrics = useMemo(() => computeRouteMetrics(points, days, paceKmh), [points, days, paceKmh]);
  const terrain = useMemo(() => analyzeTerrain(metrics.profileSections, metrics.profileDayIds), [metrics]);
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const preset = PACE_OPTIONS.find(option => option.pace === paceKmh);
  const breakRate = breaks.style === "minimal" ? 5 : breaks.style === "normal" ? 10
    : breaks.style === "frequent" ? 15 : breaks.customMinutesPerHour;
  const breakLabel = breaks.style === "minimal" ? "Short" : breaks.style === "normal" ? "Normal"
    : breaks.style === "frequent" ? "Frequent" : "Custom";
  const scope = useMemo(() => routeAnalysisScope(metrics, activeDayId, breaks), [metrics, activeDayId, breaks]);
  const fullyElevated = scope.segments > 0 && scope.unroutedSegments === 0 && scope.climbedSegments === scope.segments;
  const dayLabels = useMemo(() => new Map(days.map((day, index) => [day.id, `Day ${index + 1}`])), [days]);
  const shownTerrain = useMemo(() => scope.dayId
    ? analyzeTerrain(
        metrics.profileSections.filter((_, index) => metrics.profileDayIds[index] === scope.dayId),
        metrics.profileDayIds.filter(id => id === scope.dayId),
      )
    : terrain, [metrics, scope.dayId, terrain]);
  const directionalTerrain = useMemo(() => summarizeGradient(shownTerrain.cells), [shownTerrain]);
  const terrainFindings = useMemo(() => notableTerrainFindings(shownTerrain.hardestClimb, directionalTerrain.longestSteepClimb, shownTerrain.hardestDescent), [shownTerrain, directionalTerrain]);
  // All figures, including advanced reference models, now follow the single
  // route-wide day selector. Pace and breaks remain trip preferences.
  const { movingMinutes, breakMinutes: breakEstimate } = scope;
  const routeTimeComplete = scope.complete;
  const totalMinutes = movingMinutes !== null && breakEstimate !== null ? movingMinutes + breakEstimate : null;
  const totalBreakText = movingMinutes !== null && breakEstimate !== null ? duration(breakEstimate) : "Unavailable";
  const timeBarTotal = totalMinutes !== null && totalMinutes > 0 ? totalMinutes : 0;
  const movingShare = timeBarTotal > 0 ? Math.max(0, movingMinutes ?? 0) / timeBarTotal * 100 : 0;
  const breakShare = timeBarTotal > 0 ? Math.max(0, breakEstimate ?? 0) / timeBarTotal * 100 : 0;
  const sampleCoverage = pct(scope.terrainTimeDistanceM, scope.routedDistanceM);
  const referenceModels = fullyElevated ? {
    naismith: classicNaismithMinutes(scope.distanceM, scope.knownAscentM),
    sac: sacReferenceMinutes(scope.distanceM, scope.knownAscentM, scope.knownDescentM),
  } : null;
  // Compare each day using the same timing model and break preferences as the
  // main hiking-time card. The comparison always includes all itinerary days,
  // regardless of the selected analysis scope.
  const dayComparison = useMemo(() => days.map((day, index) => {
    const dayMetrics = metrics.dayMetrics.find(entry => entry.dayId === day.id);
    if (!dayMetrics || dayMetrics.segments === 0) {
      return { id: day.id, label: `Day ${index + 1}`, segments: 0,
        complete: false, total: null };
    }
    const dayScope = routeAnalysisScope(metrics, day.id, breaks);
    const total = dayScope.movingMinutes !== null && dayScope.breakMinutes !== null
      ? dayScope.movingMinutes + dayScope.breakMinutes : null;
    return { id: day.id, label: `Day ${index + 1}`, segments: dayScope.segments,
      complete: dayScope.complete, total };
  }), [days, metrics, breaks]);
  const maxDayMinutes = Math.max(0, ...dayComparison.map(day => day.total ?? 0));
  const routeIssues = scope.issues;
  if (!metrics.segments) return <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50/70 px-5 py-8 text-center">
    <RouteIcon className="mx-auto h-7 w-7 text-gray-400" aria-hidden="true" />
    <h3 className="mt-2 text-base font-semibold text-gray-900">Start by mapping a route</h3>
    <p className="mx-auto mt-1 max-w-md text-sm text-gray-600">Add stops in Route & itinerary to analyze hiking days, slopes and timing.</p>
    <a href="#route" className="mt-3 inline-flex rounded-lg bg-green-900 px-3 py-2 text-sm font-semibold text-white">Open route map</a>
  </div>;

  return <section className="space-y-5 pb-3 sm:space-y-6" aria-label="Route terrain and daily hiking analysis">
    <section aria-label="Hiking time and breaks" className="space-y-4">
      {routeIssues.length > 0 && <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-950" role="status">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <div><strong>Some route estimates are incomplete.</strong> {routeIssues.join(" · ")}.</div>
      </div>}

      <div className={`grid gap-4 xl:gap-5 ${settingsOpen ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]" : "lg:grid-cols-1"} ${settingsOpen && advancedOpen ? "lg:items-start" : "lg:items-stretch"}`} aria-label="Hiking time and settings">
        <section aria-labelledby="route-hiking-time-heading" className="flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 id="route-hiking-time-heading" className="text-lg font-semibold text-gray-950">Hiking time</h3>
            {!settingsOpen && <button type="button" onClick={() => setSettingsOpen(true)} aria-expanded={false}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-green-900 transition-colors hover:border-green-200 hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700">
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
              Show settings
            </button>}
          </div>
          <div className="mt-3">
            <p className="text-4xl font-bold tracking-tight tabular-nums text-gray-950">{totalMinutes !== null ? `~${duration(totalMinutes)}` : "Unavailable"}</p>
            {timeBarTotal === 0 && <p className="mt-1.5 text-xs text-gray-600">
              {movingMinutes !== null ? `${duration(movingMinutes)} moving` : "Moving time unavailable"}
              {totalBreakText !== "Unavailable" ? ` · ${totalBreakText} breaks` : ""}
            </p>}
            {!routeTimeComplete && <p className="mt-2 text-xs font-medium text-amber-800">Partial estimate · Only estimable route sections</p>}
          </div>

          {timeBarTotal > 0 && <div className="mt-4 space-y-2" aria-label="Hiking time breakdown">
            <div className="flex h-3 overflow-hidden rounded-full bg-gray-100" role="img"
              aria-label={`${duration(movingMinutes!)} moving, ${duration(breakEstimate!)} breaks`}>
              <span className="h-full bg-green-800 transition-[width] duration-200" style={{ width: `${movingShare}%` }} />
              {breakShare > 0 && <span className="h-full bg-amber-500 transition-[width] duration-200" style={{ width: `${breakShare}%` }} />}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs">
              <span className="inline-flex items-center gap-2 text-gray-600">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-800" aria-hidden="true" />
                Moving <strong className="font-semibold tabular-nums text-gray-950">{duration(movingMinutes!)}</strong>
              </span>
              <span className="inline-flex items-center gap-2 text-gray-600">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                Breaks <strong className="font-semibold tabular-nums text-gray-950">{duration(breakEstimate!)}</strong>
              </span>
            </div>
          </div>}

          <div className="mt-5 flex flex-1 flex-col justify-end">
            <div className="grid grid-cols-3 gap-x-3 gap-y-2 border-t border-gray-100 pt-4" aria-label="Route fundamentals">
            <div className="min-w-0">
              <p className="text-[11px] text-gray-500">Distance</p>
              <p className="mt-1 text-sm font-bold tabular-nums text-gray-900">{scope.unroutedSegments ? "≥" : ""}{km(scope.distanceM)} <span className="text-[11px] font-medium text-gray-500">km</span></p>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-gray-500">Ascent{!fullyElevated ? " (partial)" : scope.sampleDerivedSegments ? " (estimated)" : ""}</p>
              <p className="mt-1 text-sm font-bold tabular-nums text-gray-900">{scope.climbedSegments ? `+${wholeMeters(scope.knownAscentM)} m` : "Unavailable"}</p>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-gray-500">Descent{!fullyElevated ? " (partial)" : ""}</p>
              <p className="mt-1 text-sm font-bold tabular-nums text-gray-900">{scope.climbedSegments ? `−${wholeMeters(scope.knownDescentM)} m` : "Unavailable"}</p>
            </div>
            </div>
          </div>
        </section>

        {settingsOpen && <section id="route-analysis-settings" aria-label="Hiking settings" className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-5">
            <div className="min-w-0">
              <span className="block text-sm font-bold text-gray-950">Hiking settings</span>
              <span className="mt-1 block text-xs text-gray-500">{preset?.label ?? `${paceKmh.toFixed(1)} km/h`} pace · {breakLabel.toLowerCase()} breaks</span>
            </div>
            <button type="button" onClick={() => setSettingsOpen(false)} aria-label="Close hiking settings"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="space-y-5 border-t border-gray-100 px-4 pb-5 pt-4 sm:px-5" aria-label="Analysis settings">
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-gray-800">Hiking pace</span>
                <span className="text-[11px] tabular-nums text-gray-500">{paceKmh.toFixed(1)} km/h</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1.5" role="group" aria-label="Hiking pace">
                {PACE_OPTIONS.map(option => <button key={option.label} type="button" aria-pressed={option.pace === paceKmh} onClick={() => onPaceChange(option.pace)}
                  className={`min-h-[44px] min-w-0 rounded-lg border px-2 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 ${option.pace === paceKmh ? "border-green-700 bg-green-50 text-green-900" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"}`}>
                  {option.label}
                </button>)}
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-gray-800">Break duration</span>
                <span className="text-[11px] tabular-nums text-gray-500">{breakRate} min/hr</span>
              </div>
              <div className="mt-2 grid grid-cols-4 gap-1.5" role="group" aria-label="Break duration">
                {([ ["minimal", "Short", "5m/hr"], ["normal", "Normal", "10m/hr"], ["frequent", "Frequent", "15m/hr"], ["custom", "Custom", "Adjust"] ] as const).map(([value,label,sub]) => <button key={value} type="button" aria-pressed={breaks.style === value} onClick={() => onBreaksChange(prev => ({...prev,style:value}))}
                  className={`min-h-[44px] min-w-0 rounded-lg border px-1 py-1.5 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 ${breaks.style === value ? "border-green-700 bg-green-50 text-green-900" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"}`}>
                  <span className="block text-[11px] font-semibold">{label}</span>
                  <span className="mt-0.5 block text-[10px] opacity-75">{sub}</span>
                </button>)}
              </div>
              {breaks.style === "custom" && <label className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50/70 px-3 py-2 text-xs text-gray-700">
                <span>Rest minutes per moving hour</span>
                <input type="number" min="0" max="30" step="5" value={breaks.customMinutesPerHour} onChange={event => onBreaksChange(prev => ({...prev,customMinutesPerHour:Math.max(0,Math.min(30,Number(event.target.value)||0))}))}
                  className="w-16 shrink-0 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-right text-xs tabular-nums focus-visible:outline-2 focus-visible:outline-green-700" />
              </label>}
            </div>
          </div>
          <details className="group border-t border-gray-100 px-4 pb-4 pt-4 text-xs text-gray-700 sm:px-5" open={advancedOpen} onToggle={event => setAdvancedOpen(event.currentTarget.open)}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 font-semibold text-green-900 marker:content-none">
              <span>Advanced settings</span><ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="mt-4 space-y-4">
              <label className="flex flex-wrap items-center gap-3 text-xs text-gray-700">Advanced pace · level-trail speed (km/h)
                <select aria-label="Advanced level-trail speed" value={paceKmh} onChange={event => onPaceChange(Number(event.target.value))} className="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs">{[1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,7,8].map(v => <option key={v} value={v}>{v.toFixed(1)}</option>)}</select>
              </label>
              <details className="border-t border-gray-100 pt-3">
                <summary className="cursor-pointer font-semibold text-green-900">How time is calculated & compared</summary>
                <p className="mt-3 leading-5">Primary estimate: Tobler walking-speed curve over sampled 200 m elevation windows, scaled to the selected level-trail pace. Climbing is already included. Sparse sections use a conservative Naismith-style fallback. <strong>{sampleCoverage}%</strong> of mapped distance uses the sampled slope model.</p>
                {referenceModels && <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div><p className="font-semibold">Classic Naismith</p><p className="mt-1 text-lg font-bold tabular-nums">{duration(referenceModels.naismith)}</p><p className="text-[11px] text-gray-500">5 km/h + 600 m ascent/hour</p></div>
                  <div><p className="font-semibold">Swiss Alpine Club</p><p className="mt-1 text-lg font-bold tabular-nums">{duration(referenceModels.sac)}</p><p className="text-[11px] text-gray-500">4 km/h + ascent/400 m/h + descent/800 m/h</p></div>
                </div>}
                <p className="mt-3 text-[11px] leading-5 text-gray-500">Reference methods exclude breaks and are not confidence bounds. Scheduled itinerary stops are not added to hiking time.</p>
              </details>
            </div>
          </details>

        </section>}
      </div>

    </section>

    <section id="route-notable-terrain" className="scroll-mt-24 pt-1" aria-labelledby="route-notable-terrain-heading">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 id="route-notable-terrain-heading" className="text-base font-semibold text-gray-950">Notable climbs & descents</h3>
          <p className="mt-1 text-xs text-gray-500">Find the most demanding sustained slopes, then locate them on your map.</p>
        </div>
      </div>
      {terrainFindings.length > 0 ? <div className="mt-4 space-y-2.5">
        {terrainFindings.map(({title,slope}) => <TerrainFindingRow
          key={`${slope.direction}:${slope.dayId ?? ""}:${slope.startM}:${slope.endM}`}
          title={title} slope={slope} dayLabels={dayLabels} onInspect={onInspectTerrain} />)}
      </div> : <p className="mt-4 rounded-lg bg-gray-50 px-3 py-3 text-xs leading-5 text-gray-600">
        {shownTerrain.analyzedDistanceM > 0
          ? "No sustained climbs or descents meet the 8% gradient over 500 m threshold for this selection."
          : "Not enough reliable elevation samples for sustained-slope analysis. Unmapped and sparse sections are excluded."}
      </p>}
      <details id="route-terrain-method" className="group mt-4 text-xs text-gray-600">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 font-semibold text-green-900 marker:content-none"><span>How terrain sections are identified</span><ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
        <p className="mt-2 leading-5">Sustained sections require at least 500 m at an estimated gradient of 8% or more, calculated from 200 m elevation windows. “Hardest” means the greatest elevation gain among qualifying climbs, not technical trail difficulty. Missing or sparsely sampled sections are excluded. {working ? "Includes your unsaved route draft." : "Based on the saved route."} Inspect the gradient-colored elevation profile beneath the map to see where steep sections occur.</p>
      </details>
    </section>

    {dayComparison.length > 1 && <section id="route-compare-days" className="space-y-3 pt-1" aria-labelledby="route-compare-days-heading">
      <div>
        <h3 id="route-compare-days-heading" className="text-base font-semibold text-gray-950">Compare hiking days</h3>
        <p className="mt-1 text-xs text-gray-500">Estimated hiking time, including breaks, for each day.</p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 sm:px-5">
        <div className="space-y-3">
          {dayComparison.map(day => <div key={day.id} className="space-y-1.5">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="font-semibold text-gray-900">{day.label}</span>
              <span className={`tabular-nums ${day.complete ? "font-semibold text-gray-900" : "text-gray-500"}`}>
                {day.segments === 0 ? "No mapped route" : day.total === null ? "Unavailable" : `${day.complete ? "~" : "≥"}${duration(day.total)}${day.complete ? "" : " · partial"}`}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-gray-100" role="img"
              aria-label={`${day.label}: ${day.segments === 0 ? "no mapped route" : day.total === null ? "time unavailable" : `${duration(day.total)}${day.complete ? " estimated" : " partial estimate"}`}`}>
              {day.total !== null && day.segments > 0 && maxDayMinutes > 0 && <div
                className={`h-full rounded-full ${day.complete ? "bg-green-800" : "bg-amber-500"}`}
                style={{ width: `${Math.min(100, day.total / maxDayMinutes * 100)}%` }} />}
            </div>
          </div>)}
        </div>
        {dayComparison.some(day => day.segments > 0 && !day.complete) && <p className="mt-3 text-[11px] leading-4 text-gray-500">
          Partial days have incomplete trail or elevation data; their bars are not directly comparable with complete days.
        </p>}
      </div>
    </section>}
  </section>;
}



