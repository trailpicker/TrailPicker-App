"use client";

import { useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, CalendarDays, ClipboardList, LockKeyhole, Users } from "lucide-react";
import { startDestinationPlan } from "@/app/discover/actions";
import { discoverTripPreview } from "@/lib/discover-trip";
import type { Destination } from "@/lib/destinations";

function SubmitPlanButton({disabled}: {disabled: boolean}) {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={disabled || pending} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50">
    {pending ? "Creating your trip..." : "Create trip & open planner"}
    {!pending && <ArrowRight size={17} aria-hidden="true" />}
  </button>;
}

const inputClass = "min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10";
const dateFormat = new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric", timeZone: "UTC" });

export default function DestinationTripForm({destination}: {destination: Destination}) {
  const [name, setName] = useState(`${destination.name.slice(0, 92)} trip`);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [people, setPeople] = useState("1");
  const [seed, setSeed] = useState(true);
  const preview = useMemo(() => discoverTripPreview(destination.name, start, end), [destination.name, start, end]);
  const peopleNumber = Number(people);
  const invalid = Boolean(preview.error) || !name.trim() || name.length > 100 ||
    !Number.isInteger(peopleNumber) || peopleNumber < 1 || peopleNumber > 100;

  return <section aria-labelledby="plan-trip-heading" className="scroll-mt-24 overflow-hidden rounded-2xl border border-emerald-900/15 bg-white shadow-sm">
    <div className="bg-green-900 px-5 py-5 text-white">
      <h2 id="plan-trip-heading" className="flex items-center gap-2 text-lg font-bold"><CalendarDays size={20} aria-hidden="true" />Plan your trip</h2>
      <p className="mt-1 text-sm text-white/80">Start a trip with {destination.name} already selected.</p>
    </div>
    <form action={startDestinationPlan} className="space-y-4 p-5">
      <input type="hidden" name="destinationId" value={destination.id} />
      <input type="hidden" name="discoverPlan" value="1" />
      <div>
        <label htmlFor={`trip-name-${destination.id}`} className="mb-1.5 block text-xs font-semibold text-slate-700">Trip name</label>
        <input id={`trip-name-${destination.id}`} name="name" value={name} maxLength={100} required onChange={event => setName(event.target.value)} className={inputClass} />
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between"><span className="text-xs font-semibold text-slate-700">Trip dates</span><span className="text-xs text-slate-500">Optional</span></div>
        <div className="grid grid-cols-2 gap-2">
          <div><label htmlFor={`trip-start-${destination.id}`} className="mb-1 block text-xs text-slate-500">Start</label>
            <input id={`trip-start-${destination.id}`} type="date" name="startDate" value={start} onChange={event => setStart(event.target.value)} className={inputClass} /></div>
          <div><label htmlFor={`trip-end-${destination.id}`} className="mb-1 block text-xs text-slate-500">End</label>
            <input id={`trip-end-${destination.id}`} type="date" name="endDate" min={start || undefined} value={end} onChange={event => setEnd(event.target.value)} className={inputClass} /></div>
        </div>
        {preview.error && <p role="alert" className="mt-2 text-xs font-semibold text-rose-700">{preview.error}</p>}
      </div>
      <div>
        <label htmlFor={`trip-people-${destination.id}`} className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700"><Users size={14} aria-hidden="true" />Travellers</label>
        <input id={`trip-people-${destination.id}`} type="number" inputMode="numeric" name="people" min="1" max="100" step="1" required value={people} onChange={event => setPeople(event.target.value)} className={inputClass} />
      </div>
      <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <input type="checkbox" name="seedItinerary" value="1" checked={seed} onChange={event => setSeed(event.target.checked)} className="mt-0.5 h-4 w-4 accent-green-800" />
        <span className="min-w-0"><span className="block text-xs font-bold text-slate-800">Add starter itinerary</span>
          <span className="mt-0.5 block text-xs leading-5 text-slate-500">Editable day descriptions, not a verified hiking route.</span></span>
      </label>
      {preview.count > 0 && <section aria-label="Itinerary preview" className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">
        <h3 className="flex items-center gap-1.5 text-xs font-bold text-green-900"><ClipboardList size={14} aria-hidden="true" />{preview.count} {preview.count === 1 ? "day" : "days"} in your planner</h3>
        {seed ? <ol className="mt-2 space-y-2">{preview.days.map(item => <li key={item.day} className="flex gap-2 text-xs leading-5 text-slate-700">
          <span className="shrink-0 font-bold text-green-900">Day {item.day}</span>
          <span className="text-slate-400">{dateFormat.format(new Date(`${item.date}T00:00:00Z`))}</span>
          <span className="min-w-0">{item.activities}</span>
        </li>)}</ol> : <p className="mt-2 text-xs text-slate-600">Blank editable day records will be created.</p>}
        {preview.count > preview.days.length && <p className="mt-2 text-[11px] text-slate-500">Showing the first two and last day. All {preview.count} dates will be added.</p>}
      </section>}
      <SubmitPlanButton disabled={invalid} />
      <p className="flex items-start gap-1.5 text-xs leading-5 text-slate-500"><LockKeyhole size={14} className="mt-0.5 shrink-0" aria-hidden="true" />New Discover plans start private. Dates and day notes can be edited in Trip Planner.</p>
      <p className="text-xs leading-5 text-slate-500">Official park information and access cautions are copied to Trip Logistics. No route, campsite or booking is assumed.</p>
    </form>
  </section>;
}

