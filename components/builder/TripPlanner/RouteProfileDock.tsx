"use client";

import { useId, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { PlannerDay, Waypoint } from "@/lib/trip-planner";
import { gradeAtDistance, locationAtDistance, type ExplorerRoute, type ExplorerSample } from "@/lib/route-explorer";
import { buildTerrainStrokes, preserveProfileExtrema, terrainStrokeColor } from "@/lib/route-profile-visual";
import { analyzeTerrain } from "@/lib/route-analysis-insights";

const LEFT = 55;
const RIGHT = 9;
const TOP = 11;
const BOTTOM = 8;

const fmtDistance = (meters: number) => `${(meters / 1000).toFixed(2)} km`;

function profilePath(samples: readonly ExplorerSample[], x: (d: number) => number, y: (h: number) => number): string {
  return samples.map((p, i) => `${i ? "L" : "M"}${x(p.distanceM).toFixed(1)} ${y(p.elevationM).toFixed(1)}`).join(" ");
}

export default function RouteProfileDock({
  route, days, points, activeDayId, selectedId, hover, onHover, onDayChange, profileMode, onProfileModeChange, focusedRange,
}: {
  route: ExplorerRoute;
  days: readonly PlannerDay[];
  points: readonly Waypoint[];
  activeDayId: string | null;
  selectedId: string | null;
  hover: ExplorerSample | null;
  onHover: (value: ExplorerSample | null) => void;
  onDayChange: (dayId: string | null) => void;
  profileMode: "elevation" | "gradient";
  onProfileModeChange: (mode: "elevation" | "gradient") => void;
  focusedRange?: { startM: number; endM: number } | null;
}) {
  const gradientId = useId().replace(/:/g, "");
  // Reuse the same 200 m sampled terrain classification as Route Analysis.
  // Sparse sections are left unclassified rather than invented or interpolated.
  const terrain = useMemo(() => analyzeTerrain(
    route.sections.map(section => section.samples),
    route.sections.map(section => section.dayId),
  ), [route]);
  const terrainStrokes = useMemo(() => buildTerrainStrokes(
    route.sections.map(section => section.samples), terrain.cells,
  ), [route, terrain]);
  const visibleTerrainCells = useMemo(() => activeDayId
    ? terrain.cells.filter(cell => cell.dayId === activeDayId)
    : terrain.cells, [terrain, activeDayId]);
  const steepDistanceM = visibleTerrainCells.reduce((meters, cell) =>
    meters + (cell.band === "steep" ? cell.endM - cell.startM : 0), 0);
  const plot = useRef<HTMLDivElement>(null);
  // No guessed 680px SVG on first paint. Measure the actual chart before
  // drawing it, so hydration and drawer resizing never cause a stretched flash.
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  useLayoutEffect(() => {
    const element = plot.current;
    if (!element) return;
    const measure = (width: number, height: number) => {
      const next = { width: Math.max(80, Math.round(width)), height: Math.max(65, Math.round(height)) };
      setDimensions(previous => previous?.width === next.width && previous?.height === next.height ? previous : next);
    };
    // Synchronous layout measurement occurs before the browser paints the graph.
    const box = element.getBoundingClientRect();
    measure(box.width, box.height);
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => measure(entry.contentRect.width, entry.contentRect.height));
    observer.observe(element);
    return () => observer.disconnect();
  }, [route.sections.length]);
  const width = dimensions?.width ?? 0;
  const height = dimensions?.height ?? 0;
  const graphWidth = Math.max(1, width - LEFT - RIGHT);
  const graphHeight = Math.max(1, height - TOP - BOTTOM);
  const { min, max, hasHeights } = useMemo(() => {
    let min = Infinity, max = -Infinity;
    for (const section of route.sections) for (const sample of section.samples) {
      min = Math.min(min, sample.elevationM);
      max = Math.max(max, sample.elevationM);
    }
    return { min: Number.isFinite(min) ? min : 0, max: Number.isFinite(max) ? max : 0, hasHeights: Number.isFinite(min) };
  }, [route]);
  // Label actual altitude in metres, with sensible round intervals in between.
  // The extra chart inset keeps labels inside the SVG when the profile is resized.
  const elevationTicks = useMemo(() => {
    if (!hasHeights) return [];
    if (max - min < 2) return [Math.round(min)];
    const range = max - min;
    const targetStep = range / 3;
    const scale = 10 ** Math.floor(Math.log10(targetStep));
    const step = ([1, 2, 5, 10].find(n => n * scale >= targetStep) ?? 10) * scale;
    const ticks = [Math.round(min)];
    for (let altitude = Math.ceil(min / step) * step; altitude < max; altitude += step) {
      if (altitude > min + step * 0.08 && altitude < max - step * 0.08) ticks.push(altitude);
    }
    ticks.push(Math.round(max));
    return Array.from(new Set(ticks));
  }, [min, max, hasHeights]);
  const padding = Math.max(25, (max - min) * 0.08);
  const low = min - padding;
  const high = max + padding;
  const x = (distanceM: number) => LEFT + distanceM / Math.max(route.distanceM, 1) * graphWidth;
  const y = (heightM: number) => TOP + (high - heightM) / Math.max(high - low, 1) * graphHeight;
  const selectedStop = points.find(point => point.id === selectedId);
  const selectedDistance = selectedStop ? route.stopDistances[selectedStop.id] : undefined;
  const selectedPosition = selectedDistance === undefined ? null : locationAtDistance(route, selectedDistance);
  const inspection = hover ?? selectedPosition;
  const gradeCell = inspection && profileMode === "gradient"
    ? terrain.cells.find(cell => inspection.distanceM >= cell.startM && inspection.distanceM < cell.endM)
    : null;
  const grade = profileMode === "gradient" ? gradeCell?.gradePct ?? null : inspection ? gradeAtDistance(route, inspection.distanceM) : null;
  const stopMarkers = points.filter(point => point.kind === "camp" || point.kind === "water").slice(0, 36);

  function inspectDistance(distanceM: number) {
    const position = locationAtDistance(route, Math.max(0, Math.min(route.distanceM, distanceM)));
    onHover(position);
  }

  function move(event: PointerEvent<SVGSVGElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const fractionalX = (event.clientX - bounds.left) / bounds.width * width;
    inspectDistance((fractionalX - LEFT) / graphWidth * route.distanceM);
  }

  function keyDown(event: KeyboardEvent<SVGSVGElement>) {
    if (!(["ArrowRight", "ArrowLeft", "Home", "End"] as string[]).includes(event.key)) return;
    event.preventDefault();
    const current = hover?.distanceM ?? selectedDistance ?? 0;
    const next = event.key === "Home" ? 0 : event.key === "End" ? route.distanceM :
      current + (event.key === "ArrowRight" ? 100 : -100);
    inspectDistance(next);
  }

  return <div id="route-elevation-profile" className="flex h-full min-h-0 min-w-0 flex-col border-t border-gray-200 bg-white px-3 pb-1 pt-2.5 sm:px-4" aria-label="Map-linked elevation profile">
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <div className="flex min-w-0 items-center gap-2">
        <span className="text-xs font-bold text-gray-900">Elevation profile</span>
        {hasHeights && <span className="text-[11px] tabular-nums text-gray-500">{Math.round(min).toLocaleString()}–{Math.round(max).toLocaleString()} m</span>}
      </div>
      <div className="inline-flex shrink-0 items-center rounded-lg border border-gray-200 bg-gray-50 p-0.5" role="group" aria-label="Elevation profile display mode">
        {(["elevation", "gradient"] as const).map(mode => <button key={mode} type="button"
          aria-pressed={profileMode === mode} onClick={() => onProfileModeChange(mode)}
          className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 ${profileMode === mode ? "bg-white text-green-900 shadow-sm ring-1 ring-gray-200" : "text-gray-500 hover:text-gray-900"}`}>
          {mode === "elevation" ? "Elevation" : "Gradient"}
        </button>)}
      </div>
    </div>
    <div className="mt-1.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
      <div className="flex max-w-full min-w-0 items-center gap-1 overflow-x-auto" role="group" aria-label="Highlight a hiking day">
        <button type="button" aria-pressed={!activeDayId} onClick={() => onDayChange(null)} className={`whitespace-nowrap rounded-md px-2.5 py-1 text-[11px] font-semibold ${!activeDayId ? "bg-green-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>Full route</button>
        {days.map((day, index) => <button type="button" key={day.id} aria-pressed={activeDayId === day.id} onClick={() => onDayChange(activeDayId === day.id ? null : day.id)} className={`whitespace-nowrap rounded-md px-2.5 py-1 text-[11px] font-semibold ${activeDayId === day.id ? "bg-green-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>Day {index + 1}</button>)}
      </div>
      {inspection ? <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] tabular-nums text-gray-700" role="status" aria-live="off">
        <span><strong className="font-semibold text-gray-950">{fmtDistance(inspection.distanceM)}</strong> from start</span>
        <span><strong className="font-semibold text-gray-950">{Math.round(inspection.elevationM).toLocaleString()} m</strong> altitude</span>
        {grade !== null && <span><strong className="font-semibold text-gray-950">{grade > 0 ? "+" : ""}{grade.toFixed(1)}%</strong> {profileMode === "gradient" && gradeCell ? "200 m grade" : "grade"}</span>}
      </div> : <span className="text-[11px] text-gray-500">Hover to inspect the mapped trail</span>}
    </div>
    {profileMode === "gradient" && <div className="mt-1.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[10px] text-gray-600" aria-label="Gradient legend">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {([ ["gentle", "Gentle <5%"], ["moderate", "Moderate 5–12%"], ["steep", "Steep ≥12%"] ] as const).map(([band, label]) => <span key={band} className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: terrainStrokeColor(band) }} aria-hidden="true" />{label}</span>)}
        <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-3 bg-slate-400" aria-hidden="true" />Unclassified</span>
      </div>
      <span className="tabular-nums">{visibleTerrainCells.length ? `${fmtDistance(steepDistanceM)} steep · 200 m estimates` : "No reliable slope windows"}</span>
    </div>}
    {route.sections.length ? <>
      <div ref={plot} className="mx-auto mt-1 min-h-[70px] w-full max-w-[900px] flex-1 overflow-hidden">
      {/* A data plot has independently scaled distance/elevation axes. "meet"
          letterboxes the plot whenever ResizeObserver sees a transient panel size,
          making a narrow graph flash before the final dimensions arrive. */}
      {dimensions && <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="block h-full w-full cursor-crosshair" role="slider" tabIndex={0}
        aria-label={`${profileMode === "gradient" ? "Gradient-colored elevation" : "Elevation"} along mapped route. Use left and right arrows to inspect in 100-metre steps.`}
        aria-valuemin={0} aria-valuemax={Math.round(route.distanceM)} aria-valuenow={Math.round(inspection?.distanceM ?? 0)}
        aria-valuetext={inspection ? `${fmtDistance(inspection.distanceM)}, altitude ${Math.round(inspection.elevationM)} metres${grade !== null ? `, ${grade.toFixed(1)} percent grade` : ""}${profileMode === "gradient" ? `, ${gradeCell?.band ?? "unclassified"} terrain` : ""}` : "No location selected"}
        onPointerMove={move} onPointerLeave={() => onHover(null)} onBlur={() => onHover(null)} onKeyDown={keyDown}>
        <defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#15803d" stopOpacity="0.19"/><stop offset="1" stopColor="#15803d" stopOpacity="0.01"/></linearGradient></defs>
        {elevationTicks.map((tick) => <g key={`elevation-${tick}`} aria-hidden="true">
          <line x1={LEFT} x2={width - RIGHT} y1={y(tick)} y2={y(tick)} stroke="#cbd5e1" strokeOpacity="0.56" strokeWidth="0.8" strokeDasharray="3 6" />
          <text x={LEFT - 9} y={y(tick) + 3.5} textAnchor="end" fontSize="10.5" fill="#64748b">{tick.toLocaleString()} m</text>
        </g>)}
        {focusedRange && focusedRange.endM > focusedRange.startM && <g aria-hidden="true">
          <rect x={x(focusedRange.startM)} y={TOP} width={Math.max(0, x(focusedRange.endM) - x(focusedRange.startM))} height={graphHeight} fill="#f59e0b" fillOpacity="0.09" />
          {[focusedRange.startM, focusedRange.endM].map(distanceM => <line key={distanceM} x1={x(distanceM)} x2={x(distanceM)} y1={TOP} y2={TOP + graphHeight} stroke="#b45309" strokeWidth="1" strokeDasharray="3 4" opacity="0.75" />)}
        </g>}
        {route.sections.map((section, i) => {
          const compact = preserveProfileExtrema(section.samples, Math.max(90, Math.floor(550 / route.sections.length)));
          const line = profilePath(compact as ExplorerSample[], x, y);
          const baseline = TOP + graphHeight;
          const included = !activeDayId || activeDayId === section.dayId;
          return <g key={i} opacity={included ? 1 : 0.16}>
            <path d={`${line} L${x(compact[compact.length - 1].distanceM).toFixed(1)} ${baseline} L${x(compact[0].distanceM).toFixed(1)} ${baseline} Z`} fill={`url(#${gradientId})`} />
            <path d={line} fill="none" stroke={profileMode === "gradient" ? "#94a3b8" : "#166534"} strokeWidth={included ? 2.35 : 1.6} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </g>;
        })}
        {profileMode === "gradient" && terrainStrokes.map((stroke, index) => <path key={`grade-${index}`}
          d={profilePath(stroke.points, x, y)} fill="none" stroke={terrainStrokeColor(stroke.band)}
          strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
          opacity={!activeDayId || activeDayId === stroke.dayId ? 1 : 0.16} />)}
        {stopMarkers.map((stop) => {
          const distance = route.stopDistances[stop.id];
          if (!Number.isFinite(distance)) return null;
          const position = locationAtDistance(route, distance);
          if (!position) return null;
          return <circle key={stop.id} cx={x(distance)} cy={y(position.elevationM)} r={stop.id === selectedId ? 4.5 : 2.6} fill={stop.kind === "camp" ? "#a16207" : "#0369a1"} stroke="white" strokeWidth="1.5"><title>{stop.name}</title></circle>;
        })}
        {inspection && <g aria-hidden="true">
          <line x1={x(inspection.distanceM)} y1={TOP} x2={x(inspection.distanceM)} y2={TOP + graphHeight} stroke="#64748b" strokeWidth="1" strokeDasharray="3 4" opacity="0.65" />
          <circle cx={x(inspection.distanceM)} cy={y(inspection.elevationM)} r="4.5" fill="white" stroke={profileMode === "gradient" && gradeCell ? terrainStrokeColor(gradeCell.band) : "#166534"} strokeWidth="2.4" />
        </g>}
        <line x1={LEFT} x2={width-RIGHT} y1={TOP+graphHeight} y2={TOP+graphHeight} stroke="#d1d5db" strokeWidth="0.8" />
      </svg>}
      </div>
      <div className="mx-auto flex w-full max-w-[900px] shrink-0 items-center justify-between text-[11px] tabular-nums text-gray-500" style={{ paddingLeft: LEFT, paddingRight: RIGHT }}>
        <span>0 km</span><span>{fmtDistance(route.distanceM)}</span>
      </div>
    </> : <div className="flex min-h-20 items-center justify-between gap-3 py-2 text-xs text-gray-500">
      <span>{route.distanceM > 0 ? "Elevation unavailable for the mapped route. The map and itinerary still work." : "Add a mapped route with elevation data to inspect the profile."}</span>
    </div>}
  </div>;
}

