"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Droplets, MapPinned, Save, Tent, Plus, Trash2, Search } from "lucide-react";
import type { PlannerDay, Waypoint } from "@/lib/trip-planner";
import { readLogistics } from "@/lib/trip-planner";
import type { PackLine } from "@/lib/pack-analysis";
import {
  BOOKING_STATUSES, calculateWaterLegs, readPrivateResources, type CampBooking,
  type DiscoveredResource, type PrivateTripResources, type ResourceAnnotation,
  type WaterReliability,
} from "@/lib/trip-resources";
import type { TripExport } from "@/lib/trip-resources-export";
import { TRIP_EXPORT_REQUEST, type TripExportRequest } from "@/lib/trip-export-events";
import { saveTripResources } from "@/lib/tracked-build-actions";
import { readFoodPlan } from "@/lib/food-plan";
import { readArrangements } from "@/lib/trip-arrangements";

const inputStyle = "w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-700 focus:outline-none";
const buttonStyle = "inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-40";
const fieldLabel = "block space-y-1 text-xs font-semibold text-gray-700";
const reliabilityLabels: Record<WaterReliability,string> = {
  unknown: "Unknown / not checked", reported: "Personally checked recently", seasonal: "Seasonal / uncertain", unavailable: "Reported dry / unavailable",
};
function newBooking(point?: Waypoint): CampBooking {
  return { id: crypto.randomUUID(), waypointId: point?.id || "", dayId: point?.dayId || "", campground: point?.name || "", status: "to_book", arrival: "", departure: "", provider: "", confirmation: "", notes: "" };
}

export default function TripResourcesSection({
  buildId, buildName, people, days, points, logistics, packLines, draft, canEditRoute, busy,
  onUpdatePoint, onAddPoint,
}: {
  buildId: string; buildName: string; people: number;
  days: PlannerDay[]; points: Waypoint[]; logistics: unknown; packLines: PackLine[];
  draft: boolean; canEditRoute: boolean; busy: boolean;
  onUpdatePoint: (id: string, patch: Partial<Waypoint>) => void;
  onAddPoint: (place: DiscoveredResource) => void;
}) {
  const router = useRouter();
  const saved = useMemo(() => readPrivateResources(logistics), [logistics]);
  const [privatePlan, setPrivatePlan] = useState<PrivateTripResources>(saved);
  const [changed, setChanged] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<DiscoveredResource[]>([]);
  const [searchError, setSearchError] = useState("");
  const [centerId, setCenterId] = useState("");
  const [radius, setRadius] = useState(3000);
  const serverSig = JSON.stringify(logistics ?? null);
  // External restore/import refreshes only overwrite saved data, never local edits.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (!changed) setPrivatePlan(readPrivateResources(logistics)); }, [serverSig]);
  useEffect(() => { setResults([]); setSearchError(""); }, [buildId]);
  const trip = useMemo(() => readLogistics(logistics), [logistics]);
  const camps = points.filter(point => point.kind === "camp");
  const annotated = points.filter(point => ["camp","water","resupply"].includes(point.kind));
  const waterLegs = calculateWaterLegs(points, privatePlan.settings);
  const payload: TripExport = { name: buildName, people, days, points, logistics: trip, bookings: privatePlan.bookings, arrangements: readArrangements(logistics), packLines, foodPlan: readFoodPlan(logistics) };
  // The toolbar owns all export actions. Keep the current Trip Planner state
  // available to it without moving the route/resource draft into global state.
  const exportRef = useRef(payload);
  exportRef.current = payload;
  useEffect(() => {
    const onRequest = (event: Event) => {
      const detail = (event as CustomEvent<TripExportRequest>).detail;
      if (detail?.buildId === buildId) detail.respond(exportRef.current);
    };
    window.addEventListener(TRIP_EXPORT_REQUEST, onRequest);
    return () => window.removeEventListener(TRIP_EXPORT_REQUEST, onRequest);
  }, [buildId]);
  const setPlan = (next: PrivateTripResources) => { setPrivatePlan(next); setChanged(true); setMessage(""); };
  const updateBooking = (id: string, patch: Partial<CampBooking>) => setPlan({ ...privatePlan, bookings: privatePlan.bookings.map(item => item.id === id ? { ...item, ...patch } : item) });
  const changeResource = (point: Waypoint, patch: Partial<ResourceAnnotation>) => {
    if (!canEditRoute || busy) return;
    onUpdatePoint(point.id, { resource: { ...point.resource, ...patch } });
  };
  async function save() {
    if (saving || busy || !changed) return;
    setMessage(""); setSaving(true);
    try {
      const form = new FormData();
      form.set("buildId", buildId);
      form.set("resources", JSON.stringify(privatePlan));
      await saveTripResources(form);
      setChanged(false);
      setMessage("Water preferences and campsite bookings saved.");
      router.refresh();
    } catch (reason) { setMessage(reason instanceof Error ? reason.message : "Save failed. Edits remain here."); }
    finally { setSaving(false); }
  }
  async function search() {
    const point = points.find(item => item.id === centerId) || points[0];
    if (!point || searching) return;
    setSearching(true); setSearchError(""); setResults([]);
    try {
      const qs = new URLSearchParams({ buildId, lat: String(point.lat), lng: String(point.lng), radius: String(radius) });
      const response = await fetch(`/api/trip-resources?${qs}`, { cache: "no-store" });
      const data = await response.json() as { results?: DiscoveredResource[]; error?: string };
      if (!response.ok) throw new Error(data.error || "Could not search map data.");
      setResults(Array.isArray(data.results) ? data.results : []);
    } catch (reason) { setSearchError(reason instanceof Error ? reason.message : "Discovery unavailable."); }
    finally { setSearching(false); }
  }
  return (
    <section id="resources" aria-labelledby="trip-resources-heading" className="min-w-0 scroll-mt-20 space-y-6 border-b border-gray-200 pb-8">
      <header>
        <h2 id="trip-resources-heading" className="flex items-center gap-2 text-xl font-bold text-gray-950"><Tent className="h-5 w-5 text-green-800"/>Campsites & water</h2>
        <p className="mt-1 text-sm text-gray-500">Track overnight stops, water-source reliability, resupply, bookings and field notes. Route changes update water-leg estimates immediately.</p>
      </header>
      <section className="rounded-xl border border-gray-200 bg-white p-4" aria-label="Route resource stops">
        <h3 className="text-base font-bold text-gray-900">Route resources</h3>
        <p className="my-2 text-xs leading-5 text-gray-600">Add campsites, water points and resupply stops from Route & itinerary. To change annotations here, choose <strong>Edit route</strong> on the map, then save the route.</p>
        {!annotated.length && <p className="text-sm text-gray-500">No campsite, water or resupply stops yet.</p>}
        <div className="space-y-3">
          {annotated.map(point => (
            <div key={point.id} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div><strong className="text-sm text-gray-950">{point.name}</strong><span className="ml-2 text-xs text-gray-500">{point.kind}</span></div>
                {point.resource?.sourceUrl && <a href={point.resource.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-green-800 underline">Source · {point.resource.sourceName || "map listing"}</a>}
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <label className={fieldLabel}>Facilities / observations
                  <textarea value={point.resource?.detail || ""} maxLength={750} rows={2} disabled={!canEditRoute || busy} onChange={event => changeResource(point, { detail: event.target.value })} className={inputStyle} placeholder={point.kind === "camp" ? "Platforms, toilets, food storage, site rules…" : point.kind === "resupply" ? "Pickup location, opening hours, supplies…" : "Water type, conditions, observations…"}/>
                </label>
                <label className={fieldLabel}>Access / restrictions
                  <textarea value={point.resource?.access || ""} maxLength={350} rows={2} disabled={!canEditRoute || busy} onChange={event => changeResource(point, { access: event.target.value })} className={inputStyle} placeholder="Permit, seasonal access, restrictions (verify officially)…"/>
                </label>
                {point.kind === "water" && <>
                  <label className={fieldLabel}>Reliability status
                    <select value={point.resource?.waterReliability || "unknown"} disabled={!canEditRoute || busy} onChange={event => changeResource(point, { waterReliability: event.target.value as WaterReliability, refillConfirmed: false })} className={inputStyle}>
                      {Object.entries(reliabilityLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                    </select>
                  </label>
                  <label className="flex items-center gap-2 self-end pb-2 text-xs font-semibold text-gray-700">
                    <input type="checkbox" checked={Boolean(point.resource?.refillConfirmed)} disabled={!canEditRoute || busy || point.resource?.waterReliability === "unavailable"} onChange={event => changeResource(point, { refillConfirmed: event.target.checked })} /> Include as a planned refill (you must personally verify availability)
                  </label>
                </>}
                <label className={fieldLabel}>Date last checked
                  <input type="date" disabled={!canEditRoute || busy} value={point.resource?.checkedOn || ""} onChange={event => changeResource(point, { checkedOn: event.target.value })} className={inputStyle}/>
                </label>
              </div>
            </div>
          ))}
        </div>
        {draft && <p className="mt-3 text-xs font-semibold text-amber-800">Resource stop changes are in your unsaved route draft. Use Save route above to keep them.</p>}
      </section>
      <section className="rounded-xl border border-gray-200 bg-white p-4" aria-label="Water segment estimates">
        <h3 className="flex items-center gap-2 text-base font-bold text-gray-900"><Droplets className="h-4 w-4 text-blue-700"/>Water carry estimates</h3>
        <p className="my-2 text-xs leading-5 text-gray-600">Adjustable planning assumptions, not a medical hydration recommendation. Estimates use verified routed distances and climbs, plus a reserve. Unknown trail geometry or climb means the leg is <strong>unestimated</strong>. Starts with an assumed full carry; no mapped water point is guaranteed potable or flowing.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {([ ["rateLph", "Usage assumption (L/hour)",0.1,2,0.1],["reserveL","Reserve (L)",0,5,0.25],["capacityL","Carry capacity (L)",0.25,20,0.25] ] as const).map(([key,label,min,max,step]) => <label className={fieldLabel} key={key}>{label}
            <input type="number" min={min} max={max} step={step} value={privatePlan.settings[key]} onChange={event => setPlan({ ...privatePlan, settings: { ...privatePlan.settings,[key]: Number(event.target.value) } })} className={inputStyle}/>
          </label>)}
        </div>
        {!waterLegs.length ? <p className="mt-3 text-sm text-gray-500">Add a route with at least two stops to estimate water between mapped stops.</p> :
          <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-xs"><thead><tr className="border-b border-gray-200 text-gray-600"><th className="py-2 pr-3">From → to</th><th className="py-2 pr-3">Trail distance</th><th className="py-2 pr-3">Moving hours</th><th className="py-2">Suggested plan</th></tr></thead><tbody>{waterLegs.map((leg,i)=><tr key={i} className="border-b border-gray-100"><td className="py-2 pr-3 font-medium">{leg.from} → {leg.to}</td><td className="py-2 pr-3">{leg.distanceKm === null ? "Unknown" : `${leg.distanceKm} km`}</td><td className="py-2 pr-3">{leg.movingHours === null ? "Unknown" : `${leg.movingHours} h`}</td><td className="py-2">{leg.requiredL === null ? "Incomplete route data" : <span className={leg.exceedsCapacity ? "font-semibold text-red-700" : "text-gray-700"}>{leg.requiredL} L including reserve{leg.exceedsCapacity ? " · Above your carry capacity" : ""}</span>}<div className="text-gray-500">{leg.note}</div></td></tr>)}</tbody></table></div>}
        <p className="mt-3 text-xs leading-5 text-amber-900">Treat or otherwise verify water safety and check seasonal availability from an authoritative source. Change the plan if refill locations are unavailable. Water requirements vary widely by person, weather and exertion.</p>
      </section>
      <section className="rounded-xl border border-gray-200 bg-white p-4" aria-label="Find nearby campsites and water">
        <h3 className="flex items-center gap-2 text-base font-bold text-gray-900"><MapPinned className="h-4 w-4"/>Discover nearby mapped resources</h3>
        <p className="my-2 text-xs leading-5 text-gray-600">Search voluntarily sends the selected stop’s coordinates to an OpenStreetMap Overpass server. Listings are community-mapped, may be old or inaccessible, and do not verify campsite legality, reservations or water quality.</p>
        <div className="flex flex-wrap items-end gap-3">
          <label className={`${fieldLabel} grow`}>Search near
            <select className={inputStyle} disabled={!points.length} value={centerId} onChange={event=>setCenterId(event.target.value)}>
              {points.map((point,i)=><option key={point.id} value={point.id}>{i+1}. {point.name}</option>)}
            </select>
          </label>
          <label className={fieldLabel}>Radius
            <select className={inputStyle} value={radius} onChange={event=>setRadius(Number(event.target.value))}><option value={1000}>1 km</option><option value={3000}>3 km</option><option value={5000}>5 km</option></select>
          </label>
          <button type="button" onClick={search} disabled={searching || !points.length} className={buttonStyle}><Search className="h-4 w-4"/>{searching ? "Searching…" : "Search mapped sites"}</button>
        </div>
        {searchError && <p role="alert" className="mt-2 text-xs text-red-700">{searchError}</p>}
        {!!results.length && <div className="mt-3 max-h-80 space-y-2 overflow-y-auto">{results.map(item=><div key={item.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 py-2">
          <div className="min-w-0"><p className="text-sm font-semibold">{item.name} <span className="font-normal text-gray-500">· {item.kind}</span></p><p className="text-xs text-gray-500">{item.access}{item.kind === "water" ? ` · ${item.waterReliability} water reliability` : ""}</p><a className="text-xs text-green-800 underline" href={item.sourceUrl} target="_blank" rel="noopener noreferrer">View OpenStreetMap feature</a></div>
          <button type="button" disabled={busy || points.length >= 200 || points.some(p=>p.resource?.sourceUrl===item.sourceUrl)} onClick={()=>{ if(window.confirm(`Add ${item.name} at the end of the current route? The connection will be a straight-line placeholder until you adjust and save the route.`)) onAddPoint(item); }} className={buttonStyle}><Plus className="h-3 w-3"/>Add stop</button>
        </div>)}</div>}
        {!searching && !searchError && !results.length && <p className="mt-2 text-xs text-gray-500">No results loaded. Search near an existing stop to begin.</p>}
        <p className="mt-3 text-xs text-gray-500">Data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline">OpenStreetMap contributors · ODbL</a>. Reservations: <a href="https://bcparks.ca/reservations/" target="_blank" rel="noopener noreferrer" className="underline">BC Parks official information</a>.</p>
      </section>
      <section className="rounded-xl border border-gray-200 bg-white p-4" aria-label="Campsite reservation tracker">
        <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-base font-bold text-gray-900">Campsite reservations</h3><button className={buttonStyle} type="button" disabled={privatePlan.bookings.length >= 40} onClick={()=>setPlan({ ...privatePlan, bookings: [...privatePlan.bookings,newBooking()] })}><Plus className="h-4 w-4"/>Track booking</button></div>
        <p className="mt-2 text-xs leading-5 text-gray-600">Record reservation status, dates, operator and private confirmation details. This is a personal tracker, <strong>not</strong> a real-time booking system. Official availability and booking rules must be checked separately.</p>
        <div className="mt-3 space-y-3">
          {privatePlan.bookings.map((booking,i)=><div className="rounded-xl border border-gray-200 bg-gray-50 p-3" key={booking.id}>
            <div className="mb-2 flex items-center justify-between gap-2"><strong className="text-sm">Reservation {i+1}</strong><button type="button" className="text-red-700" aria-label={`Remove reservation ${i+1}`} onClick={()=>setPlan({ ...privatePlan, bookings: privatePlan.bookings.filter(item=>item.id!==booking.id) })}><Trash2 className="h-4 w-4"/></button></div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <label className={fieldLabel}>Campsite stop
                <select value={booking.waypointId} className={inputStyle} onChange={event=>{const stop=camps.find(p=>p.id===event.target.value); updateBooking(booking.id,{ waypointId:event.target.value, campground: stop?.name || booking.campground, dayId: stop?.dayId || booking.dayId });}}><option value="">Manual / not mapped</option>{camps.map(p=><option value={p.id} key={p.id}>{p.name}</option>)}</select>
              </label>
              <label className={fieldLabel}>Campground name
                <input className={inputStyle} value={booking.campground} maxLength={200} onChange={event=>updateBooking(booking.id,{campground:event.target.value})}/>
              </label>
              <label className={fieldLabel}>Trip day
                <select className={inputStyle} value={booking.dayId} onChange={event=>updateBooking(booking.id,{dayId:event.target.value})}><option value="">Unassigned</option>{days.map((d,index)=><option key={d.id} value={d.id}>Day {index+1}</option>)}</select>
              </label>
              <label className={fieldLabel}>Status
                <select className={inputStyle} value={booking.status} onChange={event=>updateBooking(booking.id,{status:event.target.value as CampBooking["status"]})}>{BOOKING_STATUSES.map(status=><option key={status} value={status}>{status.replaceAll("_"," ")}</option>)}</select>
              </label>
              <label className={fieldLabel}>Arrival
                <input type="date" className={inputStyle} value={booking.arrival} onChange={event=>updateBooking(booking.id,{arrival:event.target.value})}/>
              </label>
              <label className={fieldLabel}>Departure
                <input type="date" className={inputStyle} value={booking.departure} onChange={event=>updateBooking(booking.id,{departure:event.target.value})}/>
              </label>
              <label className={fieldLabel}>Booking provider
                <input className={inputStyle} value={booking.provider} maxLength={150} placeholder="BC Parks, hut operator…" onChange={event=>updateBooking(booking.id,{provider:event.target.value})}/>
              </label>
              <label className={fieldLabel}>Confirmation (private)
                <input className={inputStyle} value={booking.confirmation} maxLength={120} onChange={event=>updateBooking(booking.id,{confirmation:event.target.value})}/>
              </label>
              <label className={fieldLabel}>Booking notes (private)
                <input className={inputStyle} value={booking.notes} maxLength={750} onChange={event=>updateBooking(booking.id,{notes:event.target.value})}/>
              </label>
            </div>
          </div>)}
          {!privatePlan.bookings.length && <p className="text-sm text-gray-500">No bookings tracked yet. Add a reservation or connect it to an existing campsite stop.</p>}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3"><button type="button" className="inline-flex items-center gap-2 rounded-lg bg-green-900 px-4 py-2 text-xs font-semibold text-white disabled:opacity-40" disabled={saving || busy || !changed} onClick={save}><Save className="h-4 w-4"/>{saving ? "Saving…" : "Save water & bookings"}</button><span role="status" className="text-xs text-gray-600">{message || (changed ? "Unsaved water settings or booking changes" : "Saved settings")}</span></div>
      </section>
    </section>
  );
}

