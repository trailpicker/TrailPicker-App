"use client";
import { useState } from "react";
import TripSummaryCard from "./TripSummaryCard";
import TripEditForm from "./TripEditForm";
import TripDayList from "./TripDayList";
import TripRoute from "./TripRoute";
import TripLogistics from "./TripLogistics";
import { tripTotals, type PlannerBuild } from "@/lib/trip-planner";
import type { CompatibilityIssue } from "@/lib/compatibility";
export default function TripPlanner({ build, issues, readOnly = false }: { build: PlannerBuild; issues: CompatibilityIssue[]; readOnly?: boolean }) {
  const [editing,setEditing]=useState(!readOnly&&!build.startDate);
  const totals=tripTotals(build.days);
  const temperatures=[build.minTemperature,...build.days.map(d=>d.minTemperature)].filter((x):x is number=>x!=null);
  const conditions=[...new Set([build.conditions,...build.days.map(d=>d.conditions)].filter(Boolean))];
  const displayBuild={...build,minTemperature:temperatures.length?Math.min(...temperatures):null};
  return <div className="mx-auto mt-6 max-w-6xl space-y-6 px-3 pb-20 sm:px-6">
    <nav aria-label="Trip sections" className="flex flex-wrap gap-2">{["overview","route","itinerary",...(!readOnly?["logistics"]:[])].map(section=><a key={section} href={`#${section}`} className="rounded-full border bg-white px-4 py-2 text-sm font-semibold capitalize text-green-900 hover:bg-green-50">{section}</a>)}</nav>
    <div id="overview" className="scroll-mt-20">{editing ? <TripEditForm build={build} onSaved={()=>setEditing(false)} onCancel={build.startDate?()=>setEditing(false):undefined} /> : <TripSummaryCard build={displayBuild} issues={issues} onEdit={readOnly?undefined:()=>setEditing(true)} />}</div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[["Distance",totals.measuredDays?`${totals.distanceKm.toFixed(1)} km`:"Not set"],["Elevation gain",build.days.some(d=>d.elevationGainM!=null)?`↑ ${totals.gainM.toLocaleString()} m`:"Not set"],["Elevation loss",build.days.some(d=>d.elevationLossM!=null)?`↓ ${totals.lossM.toLocaleString()} m`:"Not set"],["Walking time",build.days.some(d=>d.durationMinutes!=null)?`${Math.floor(totals.minutes/60)}h ${totals.minutes%60}m`:"Not set"]].map(([label,value])=><div key={label} className="rounded-2xl border bg-white p-4"><p className="text-xs text-gray-500">{label}</p><p className="mt-1 font-bold text-green-950">{value}</p></div>)}</div>
    <p className="text-xs text-gray-500">Totals include entered values only · Distance entered for {totals.measuredDays}/{build.days.length} days · {conditions.length>1?"Mixed weather across itinerary":conditions[0]||"Weather not set"}</p>
    {issues.length > 0 && <details id="compatibility-details" className="scroll-mt-20 rounded-2xl border border-amber-200 bg-amber-50 p-4"><summary className="cursor-pointer text-sm font-semibold text-amber-900">Gear checks for these trip conditions</summary><ul className="mt-3 space-y-2 text-sm text-amber-950">{issues.map(issue=><li key={issue.id}>{issue.message}</li>)}</ul></details>}
    <TripRoute key={JSON.stringify(build.routeWaypoints)} buildId={build.id} value={build.routeWaypoints} lat={build.locationLat} lng={build.locationLng} readOnly={readOnly} />
    <TripDayList buildId={build.id} days={build.days} readOnly={readOnly} />
    {!readOnly && <TripLogistics buildId={build.id} value={build.tripLogistics} />}
  </div>;
}
