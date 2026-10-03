"use client";
import { useState, useTransition } from "react";
import { saveTripLogistics } from "@/lib/trip-planner-actions";
import { readLogistics, type Logistics } from "@/lib/trip-planner";
import { inputClass, SaveStatus } from "./PlannerFields";
const labels: Record<keyof Logistics,string> = { permits:"Permits",reservations:"Reservations",transportation:"Transportation",parking:"Parking / trailhead access",emergencyContact:"Emergency contact",emergencyPlan:"Emergency plan / exit routes",notes:"Other logistics" };
export default function TripLogistics({ buildId, value }: { buildId: string; value: unknown }) {
  const [pending,start] = useTransition(),[error,setError]=useState(""),[saved,setSaved]=useState(false);
  const logistics = readLogistics(value);
  function submit(f: FormData) { setError("");setSaved(false);start(async()=>{try{await saveTripLogistics(f);setSaved(true);}catch(e){setError(e instanceof Error?e.message:"Could not save logistics.");}}); }
  return <section id="logistics" className="scroll-mt-20 rounded-3xl border border-gray-200 bg-white p-5 sm:p-8"><h2 className="text-xl font-bold">Logistics</h2><p className="mt-1 text-sm text-gray-500">Arrange the practical details. This section and daily reservation references stay private when sharing.</p><form action={submit} onChange={()=>setSaved(false)} className="mt-5 space-y-4"><input type="hidden" name="buildId" value={buildId} /><fieldset disabled={pending} className="space-y-3">{(Object.keys(labels) as (keyof Logistics)[]).map(key=><details key={key} className="rounded-xl border border-gray-200 p-4"><summary className="cursor-pointer text-sm font-semibold">{labels[key]} <span className="ml-2 font-normal text-gray-400">{logistics[key] ? "Added" : "Not set"}</span></summary><label className="mt-3 block"><span className="sr-only">{labels[key]}</span><textarea name={key} defaultValue={logistics[key]} maxLength={5000} rows={3} className={inputClass} /></label></details>)}</fieldset><SaveStatus pending={pending} error={error} saved={saved} /></form></section>;
}
