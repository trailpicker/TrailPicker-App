"use client";

import { type Dispatch, type SetStateAction } from "react";
import { AlertTriangle, Save } from "lucide-react";
import StopSelectPicker from "./StopSelectPicker";
import type { PlannerDay, Waypoint } from "@/lib/trip-planner";
import type { BreakSettings, SustainedSlope } from "@/lib/route-analysis-insights";
import RouteElevationPanel from "./RouteElevationPanel";

/** Hiking time and terrain only; itinerary owns scheduling and daylight checks. */
export default function RouteAnalysisSection({
  points, days, working, readOnly, busy, outdated, reloadDisabled, onReloadSavedRoute, paceKmh, onPaceChange, breaks, onBreaksChange, onSave, activeDayId, onDayChange, onInspectTerrain,
}: {
  points: Waypoint[]; days: PlannerDay[]; working: boolean; readOnly: boolean; busy: boolean;
  outdated: boolean; reloadDisabled: boolean; onReloadSavedRoute: () => void;
  paceKmh: number; onPaceChange: (value: number) => void;
  breaks: BreakSettings; onBreaksChange: Dispatch<SetStateAction<BreakSettings>>;
  onSave: () => void;
  activeDayId: string | null; onDayChange: (dayId: string | null) => void;
  onInspectTerrain?: (section: SustainedSlope) => void;
}) {
  const analysisDayOptions = [
    { value: "", label: "Entire route" },
    ...days.map((day, index) => ({ value: day.id, label: `Day ${index + 1}` })),
  ];
  const scopeDayId = activeDayId && days.some(day => day.id === activeDayId) ? activeDayId : null;

  return (
    <section id="analysis" className="min-w-0 scroll-mt-20 space-y-5 border-b border-gray-200 pb-6" aria-labelledby="route-analysis-heading">
      {outdated && !readOnly && (
        <div role="alert" className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-4 sm:px-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
            <div className="min-w-0 flex-1 space-y-2">
              <div>
                <h3 className="text-sm font-bold text-amber-950">Your saved route changed while you were editing</h3>
                <p className="mt-1 text-sm leading-5 text-amber-950/90">
                  A newer saved route is available. Saving is paused so you don&apos;t overwrite it.
                  Reload the saved version to continue.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <button type="button" onClick={onReloadSavedRoute} disabled={reloadDisabled}
                  className="inline-flex min-h-9 items-center rounded-lg bg-amber-900 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-900 disabled:cursor-not-allowed disabled:opacity-50">
                  Reload saved route
                </button>
                <span className="text-xs font-medium text-amber-900">Reloading discards your unsaved route edits. You&apos;ll be asked to confirm.</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id="route-analysis-heading" className="text-xl font-bold text-gray-950">Route analysis</h2>
          <p className="mt-1 text-sm text-gray-500">Estimate hiking time and understand the terrain ahead.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {days.length > 0 && <div className="min-w-[170px]">
            <StopSelectPicker label="Filter route analysis by day" hideLabel variant="analysis"
              value={scopeDayId ?? ""} options={analysisDayOptions}
              onChange={value => onDayChange(value || null)} />
          </div>}
          {working && !readOnly && <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-900">Unsaved route draft</span>
            <button type="button" onClick={onSave} disabled={busy} className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-green-900 px-3 py-2 text-xs font-semibold text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:opacity-40">
              <Save className="h-4 w-4" aria-hidden="true" />{outdated ? "Resolve conflict to save" : busy ? "Saving unavailable" : "Save route"}
            </button>
          </div>}
        </div>
      </header>

      <RouteElevationPanel points={points} days={days} working={working} paceKmh={paceKmh} onPaceChange={onPaceChange} breaks={breaks} onBreaksChange={onBreaksChange} activeDayId={scopeDayId} onInspectTerrain={onInspectTerrain} />

    </section>
  );
}




