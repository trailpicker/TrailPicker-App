"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, CalendarDays, Check, ChevronDown, ChevronRight, House, LockKeyhole, Package, Plus, Ticket, Trash2, X } from "lucide-react";
import DateRangePicker from "@/components/build/DateRangePicker";
import { saveTripBooking } from "@/lib/tracked-build-actions";
import type { PlannerDay } from "@/lib/trip-planner";
import { readWaypoints } from "@/lib/trip-planner";
import { waypointType } from "@/lib/waypoint-map";
import WaypointIcon from "./WaypointIcon";
import StopSelectPicker from "./StopSelectPicker";
import { campsiteChoices } from "@/lib/overnight-handoffs";
import { readArrangements, type TripArrangement, type ArrangementKind, type ArrangementCategory, type ArrangementStatus } from "@/lib/trip-arrangements";
import { readPrivateResources, type CampBooking, type BookingStatus } from "@/lib/trip-resources";

const fieldStyle = "w-full min-h-11 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700/10";
const labelStyle = "block space-y-1.5 text-xs font-medium text-gray-700";
const buttonStyle = "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-50";
const statusLabel = (status: string) => ({ to_book: "Planned", requested: "Pending", confirmed: "Confirmed", cancelled: "Planned", not_required: "Not required", planned: "Planned", pending: "Pending" } as Record<string,string>)[status] || status;
const toStatus = (status: BookingStatus): ArrangementStatus | "not_required" => status === "confirmed" ? "confirmed" : status === "cancelled" ? "planned" : status === "requested" ? "pending" : status === "not_required" ? "not_required" : "planned";
const fromStatus = (status: ArrangementStatus | "not_required"): BookingStatus => status === "confirmed" ? "confirmed" : status === "cancelled" ? "cancelled" : status === "pending" ? "requested" : status === "not_required" ? "not_required" : "to_book";

type Draft = {
  id: string; kind: ArrangementKind; category: ArrangementCategory | "campsite";
  name: string; status: ArrangementStatus | "not_required"; startDate: string; endDate: string;
  provider: string; confirmation: string; bookingUrl: string; notes: string; dayId: string; waypointId: string;
};
type Selection = { source: "camp" | "arrangement"; id: string } | null;
const emptyDraft = (): Draft => ({ id: "", kind: "reservation", category: "campsite", name: "", status: "planned", startDate: "", endDate: "", provider: "", confirmation: "", bookingUrl: "", notes: "", dayId: "", waypointId: "" });
const fromArrangement = (row: TripArrangement): Draft => ({ ...row, status: row.status === "cancelled" ? "planned" : row.status, waypointId: row.waypointId ?? "" });
const fromCamp = (row: CampBooking): Draft => ({ id: row.id, kind: "reservation", category: "campsite", name: row.campground, status: toStatus(row.status), startDate: row.arrival, endDate: row.departure, provider: row.provider, confirmation: row.confirmation, bookingUrl: row.bookingUrl || "", notes: row.notes, dayId: row.dayId, waypointId: row.waypointId });
const LEGACY_CATEGORIES = ["shuttle", "ferry", "parking"] as const;
const pastCategoryName = (category: string) => category.charAt(0).toUpperCase() + category.slice(1);
const CampgroundIcon = ({ compact = false }: { compact?: boolean }) => (
  <span aria-hidden="true" className={`flex shrink-0 items-center justify-center rounded-full text-white ${compact ? "h-7 w-7" : "h-8 w-8"}`} style={{ backgroundColor:waypointType("camp").color }}>
    <WaypointIcon kind="camp" className={compact ? "h-4 w-4" : "h-[18px] w-[18px]"}/>
  </span>
);
const ReservationCategoryIcon = ({ category }: { category: string }) => {
  if (category === "campsite") return <CampgroundIcon compact/>;
  const Icon = category === "hut" ? House : category === "rental" ? Package : BookOpen;
  return <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
    <Icon className="h-4 w-4" />
  </span>;
};
const rentalDuration = (start: string, end: string) => {
  if (!start || !end) return "";
  const from = Date.parse(`${start}T00:00:00Z`);
  const to = Date.parse(`${end}T00:00:00Z`);
  if (!Number.isFinite(from) || !Number.isFinite(to) || to < from) return "";
  const days = Math.round((to - from) / 86400000);
  return days === 0 ? "Same-day rental" : `${days} calendar ${days === 1 ? "day" : "days"}`;
};
const BOOKING_STEPS = [
  { value: "not_required", label: "Not required" },
  { value: "planned", label: "Planned" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
] as const;

/** Four-stage progress selector: draggable, click-to-select and keyboard accessible. */
function BookingStatusBar({ value, onChange, disabled = false }: {
  value: Draft["status"];
  onChange: (status: Draft["status"]) => void;
  disabled?: boolean;
}) {
  // An older cancelled entry opens at Planned. The old stored value remains
  // unchanged until its owner explicitly saves edits.
  const index = Math.max(0, BOOKING_STEPS.findIndex(step => step.value === value));
  const currentIndex = value === "cancelled" ? 1 : index;
  return <div className="space-y-1.5">
    <label htmlFor="booking-status-progress" className="block text-xs font-medium text-gray-700">Status</label>
    <div className="relative h-10 select-none">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-2 top-[18px] h-1 rounded-full bg-gray-200" />
      <div aria-hidden="true" className="pointer-events-none absolute left-2 top-[18px] h-1 rounded-full bg-green-700 transition-[width]" style={{ width: `calc((100% - 16px) * ${currentIndex} / 3)` }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-2 top-[12px] flex justify-between">
        {BOOKING_STEPS.map((step, i) => <span key={step.value} className={`h-4 w-4 rounded-full border-[3px] bg-white transition-colors ${i <= currentIndex ? "border-green-700" : "border-gray-300"}`} />)}
      </div>
      <input
        id="booking-status-progress"
        type="range"
        min={0}
        max={BOOKING_STEPS.length - 1}
        step={1}
        value={currentIndex}
        disabled={disabled}
        aria-valuetext={BOOKING_STEPS[currentIndex].label}
        onChange={event => onChange(BOOKING_STEPS[Number(event.currentTarget.value)].value)}
        className="absolute inset-0 z-10 h-10 w-full cursor-ew-resize opacity-0 disabled:cursor-not-allowed"
      />
    </div>
    <div className="grid grid-cols-4 gap-1">
      {BOOKING_STEPS.map((step, i) => <button
        key={step.value}
        type="button"
        disabled={disabled}
        aria-pressed={currentIndex === i}
        onClick={() => onChange(step.value)}
        className={`rounded-md px-0.5 py-1.5 text-center text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 sm:text-xs ${currentIndex === i ? "bg-green-50 text-green-900" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"} disabled:opacity-50`}
      >{step.label}</button>)}
    </div>
  </div>;
}

const dateString = (date: Date | string | null | undefined) => {
  if (!date) return "";
  const value = new Date(date);
  return Number.isFinite(value.getTime()) ? value.toISOString().slice(0, 10) : "";
};

export default function PermitReservationManager({ buildId, value, days, waypoints }: {
  buildId: string; value: unknown; days: PlannerDay[]; waypoints: unknown;
}) {
  const router = useRouter();
  const [arrangements, setArrangements] = useState(() => readArrangements(value));
  const [camps, setCamps] = useState(() => readPrivateResources(value).bookings);
  const [selected, setSelected] = useState<Selection>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const signature = JSON.stringify(value ?? null);
  useEffect(() => {
    // Keep the open form intact when another panel triggers a refresh.
    if (draft) return;
    setArrangements(readArrangements(value));
    setCamps(readPrivateResources(value).bookings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);
  const savedStops = readWaypoints(waypoints);
  const { choices: campsites, replacedIds } = campsiteChoices(savedStops, days);
  const orderedDays = [...days].sort((a,b) => +new Date(a.date) - +new Date(b.date));
  const rows = [...camps.map(row => ({ id: row.id, source: "camp" as const, draft: fromCamp(row) })), ...arrangements.map(row => ({ id: row.id, source: "arrangement" as const, draft: fromArrangement(row) }))];
  const confirmed = rows.filter(row => row.draft.status === "confirmed").length;
  const overnight = draft?.kind === "reservation" && ["campsite", "hut"].includes(draft.category);
  const linkedStop = campsites.find(stop => stop.id === (replacedIds[draft?.waypointId ?? ""] ?? draft?.waypointId));
  const categoryOptions = [
    {value:"campsite",label:"Campsite"},
    {value:"hut",label:"Hut / shelter"},
    {value:"rental",label:"Equipment rental"},
    {value:"other",label:"Other"},
    ...(draft && LEGACY_CATEGORIES.includes(draft.category as typeof LEGACY_CATEGORIES[number]) ? [{value:draft.category,label:`Previously saved: ${pastCategoryName(draft.category)}`}] : []),
  ].filter(option => option.value !== "campsite" || !selected || selected.source === "camp");

  function edit(source: "camp" | "arrangement", entry: Draft, id: string) {
    setSelected({ source, id }); setDraft(entry);
    setDetailsOpen(!!(entry.provider || entry.confirmation || entry.bookingUrl || entry.notes));
    setError("");
  }
  function closeEditor() { setDraft(null); setSelected(null); setDetailsOpen(false); setError(""); }
  function chooseCampsite(id: string) {
    const stop = campsites.find(point => point.id === id);
    const index = stop ? orderedDays.findIndex(day => day.id === stop.dayId) : -1;
    const checkIn = index >= 0 ? dateString(orderedDays[index].date) : "";
    const checkOut = index >= 0 && index + 1 < orderedDays.length ? dateString(orderedDays[index + 1].date) : "";
    setDraft(current => current ? {
      ...current, waypointId: id, dayId: stop?.dayId || "",
      name: stop?.name && (!current.name || current.name === campsites.find(point => point.id === current.waypointId)?.name) ? stop.name : current.name,
      startDate: current.startDate || checkIn, endDate: current.endDate || checkOut,
    } : current);
    setError("");
  }
  function update<K extends keyof Draft>(key: K, value: Draft[K]) { setDraft(current => current ? { ...current, [key]: value } : current); setError(""); }

  async function persist(operation: "upsert" | "delete") {
    if (!draft || busy) return;
    if (operation === "upsert" && !draft.name.trim()) { setError("Enter a permit or reservation name."); return; }
    if (operation === "upsert" && !selected && draft.kind === "reservation" && draft.category === "campsite" && !linkedStop) { setError("Add a campsite in Route & itinerary, then select it here before saving."); return; }
    if (operation === "upsert" && draft.startDate && draft.endDate && draft.endDate < draft.startDate) { setError("The end date must be on or after the start date."); return; }
    if (operation === "delete" && !window.confirm(`Delete ${draft.name || "this entry"}?`)) return;
    const isCamp = draft.kind === "reservation" && draft.category === "campsite";
    const source = operation === "delete" ? selected?.source : isCamp ? "camp" : "arrangement";
    if (!source) return;
    if (selected && operation === "upsert" && selected.source !== source) {
      setError("To change a campsite booking into another type, delete it and create a new entry.");
      return;
    }
    const id = draft.id || crypto.randomUUID();
    const payload: TripArrangement | CampBooking = source === "camp" ? {
      id, waypointId: replacedIds[draft.waypointId] ?? draft.waypointId, dayId: draft.dayId,
      campground: draft.name.trim(), status: fromStatus(draft.status),
      arrival: draft.startDate, departure: draft.endDate,
      provider: draft.provider, confirmation: draft.confirmation, notes: draft.notes,
      ...(draft.bookingUrl ? { bookingUrl: draft.bookingUrl } : {}),
    } : {
      id, kind: draft.kind, category: draft.kind === "permit" ? "other" : draft.category as ArrangementCategory,
      name: draft.name.trim(), status: draft.status as ArrangementStatus, startDate: draft.startDate,
      endDate: draft.endDate, provider: draft.provider, confirmation: draft.confirmation,
      bookingUrl: draft.bookingUrl, notes: draft.notes, dayId: draft.dayId,
      ...(draft.kind === "reservation" && draft.category === "hut" && draft.waypointId ? {waypointId: draft.waypointId} : {}),
    };
    setBusy(true); setError("");
    try {
      const form = new FormData();
      form.set("buildId", buildId); form.set("operation", operation);
      form.set("source", source); form.set("booking", JSON.stringify(payload));
      const result = await saveTripBooking(form);
      if (result) { setCamps(result.bookings); setArrangements(result.arrangements); }
      closeEditor(); router.refresh();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not save. Your edits are still here."); }
    finally { setBusy(false); }
  }

  return <div className="space-y-3" data-permit-reservations>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-gray-500">{rows.length ? `${rows.length} entries · ${confirmed} confirmed` : "Keep permits and bookings organized by entry."}</p>
      <button type="button" disabled={!!draft || busy || rows.length >= 80} onClick={() => { setSelected(null); setDraft(emptyDraft()); setDetailsOpen(false); setError(""); }} className={buttonStyle}><Plus className="h-4 w-4"/> Add entry</button>
    </div>
    {rows.map(({source,id,draft:entry}) => <button key={`${source}:${id}`} type="button" disabled={busy} onClick={() => edit(source,entry,id)} className="flex w-full items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 text-left hover:border-gray-300 hover:bg-gray-50/60 disabled:opacity-50">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center">{entry.kind === "permit" ? <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600"><Ticket className="h-4 w-4"/></span> : <ReservationCategoryIcon category={entry.category}/>}</span>
      <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-gray-950">{entry.name || "Untitled campsite"}</span><span className="mt-0.5 block truncate text-xs text-gray-500">{source === "camp" ? "Campsite" : entry.kind === "permit" ? "Permit" : entry.category === "hut" ? "Hut / shelter" : entry.category === "rental" ? "Equipment rental" : entry.kind === "other" ? "Other" : "Reservation"}{entry.startDate ? ` · ${entry.startDate}${entry.endDate && entry.endDate !== entry.startDate ? ` – ${entry.endDate}` : ""}` : ""}{entry.provider ? ` · ${entry.provider}` : ""}</span></span>
      <span className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold ${entry.status === "confirmed" ? "bg-green-50 text-green-800" : "bg-gray-100 text-gray-600"}`}>{statusLabel(entry.status)}</span>
      <ChevronRight className="h-4 w-4 shrink-0 text-gray-400"/>
    </button>)}
    {!rows.length && !draft && <p className="rounded-lg border border-dashed border-gray-200 px-4 py-5 text-center text-sm text-gray-500">No permits or reservations added yet.</p>}
    {draft && <section className="mx-auto w-full max-w-4xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6" aria-label={selected ? "Edit booking" : "New booking"}>
      <header className="mb-5 flex items-start justify-between gap-3">
        <div><h4 className="text-base font-bold text-gray-950">{selected ? "Edit entry" : "New entry"}</h4><p className="mt-1 text-xs text-gray-500">{draft.kind === "permit" ? "Permit details and validity dates" : "Reservation and booking details"}</p></div>
        <button type="button" disabled={busy} onClick={closeEditor} className={buttonStyle}><X className="h-4 w-4"/> Close</button>
      </header>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <StopSelectPicker label="Type" value={draft.kind} disabled={busy || selected?.source === "camp"} options={[{value:"reservation",label:"Reservation"},{value:"permit",label:"Permit"},{value:"other",label:"Other"}]} onChange={next => {
            const kind=next as ArrangementKind;
            setDraft(current=>current ? {...current,kind,category:kind === "reservation" ? "campsite" : "other",waypointId:"",dayId:""} : current);
            setError("");
          }}/>
          {draft.kind === "reservation" && <StopSelectPicker label="Category" value={draft.category} disabled={busy || selected?.source === "camp"} options={categoryOptions} onChange={next => {
            const category=next as Draft["category"];
            setDraft(current=>current ? {...current,category,waypointId:["campsite","hut"].includes(category)?current.waypointId:"",dayId:["campsite","hut"].includes(category)?current.dayId:""} : current);
            setError("");
          }}/ >}
        </div>
        {overnight && <div className="space-y-2">
          <StopSelectPicker label="Itinerary campground" value={linkedStop?.id ?? ""} placeholder="Select a campsite from your itinerary" disabled={busy} options={campsites.map(stop => ({ value: stop.id, label: stop.name, detail:stop.dayLabel, icon: <CampgroundIcon compact/> }))} onChange={chooseCampsite}/>
          {!campsites.length && <p className="text-xs text-gray-500">No campsite stops yet. Add one in Route &amp; itinerary first, then link the reservation here.</p>}
          {linkedStop && <button type="button" disabled={busy} onClick={() => { setDraft(current => current ? {...current, waypointId:"", dayId:""} : current); setError(""); }} className="text-xs font-medium text-gray-500 hover:text-gray-900 hover:underline">Clear link</button>}
        </div>}
        <label className={labelStyle}>{draft.kind === "permit" ? "Permit name" : draft.kind === "other" ? "Arrangement name" : overnight ? "Booking name" : "Reservation name"}
          <input className={fieldStyle} value={draft.name} maxLength={200} placeholder={draft.kind === "permit" ? "e.g. Backcountry camping permit" : draft.category === "rental" ? "e.g. Bear canister rental" : overnight ? "Select a campground or enter the booking name" : "Enter a name"} onChange={event=>update("name",event.target.value)}/>
        </label>
        <div className="space-y-1.5"><span className="block text-xs font-medium text-gray-700">{draft.kind === "permit" ? "Permit validity dates" : draft.category === "rental" ? "Rental duration" : overnight ? "Check-in and check-out dates" : "Reservation dates"}</span>
          <div className="rounded-lg border border-gray-200 bg-white px-3 py-1.5"><DateRangePicker startName="bookingStartDate" endName="bookingEndDate" startValue={draft.startDate} endValue={draft.endDate} onChange={(startDate,endDate)=>{setDraft(current=>current?{...current,startDate,endDate}:current);setError("");}} allowPast label={draft.category === "rental" ? "Rental duration" : "Reservation dates"}/></div>
          {draft.category === "rental" && draft.kind === "reservation" && rentalDuration(draft.startDate, draft.endDate) && <p className="text-xs text-gray-500">{rentalDuration(draft.startDate, draft.endDate)} · Pickup {draft.startDate} · Return {draft.endDate}</p>}
        </div>
        <BookingStatusBar value={draft.status} disabled={busy} onChange={next=>update("status",next)}/>
        <div className="border-t border-gray-200 pt-3"><button type="button" disabled={busy} onClick={()=>setDetailsOpen(open=>!open)} aria-expanded={detailsOpen} aria-controls="booking-additional-details" className="flex min-h-9 w-full items-center justify-between text-left text-xs font-semibold text-gray-700 hover:text-gray-950"><span>Additional details <span className="font-normal text-gray-500">(optional)</span></span><ChevronDown className={`h-4 w-4 transition-transform ${detailsOpen?"rotate-180":""}`}/></button>
          {detailsOpen && <div id="booking-additional-details" className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className={labelStyle}>Provider / operator<input className={fieldStyle} value={draft.provider} maxLength={150} placeholder="e.g. BC Parks" onChange={event=>update("provider",event.target.value)}/></label>
            <label className={labelStyle}>Confirmation number <span className="font-normal text-gray-400">(private)</span><input className={fieldStyle} value={draft.confirmation} maxLength={120} placeholder="Optional" onChange={event=>update("confirmation",event.target.value)}/></label>
            <label className={`${labelStyle} sm:col-span-2`}>Booking or permit link<input type="url" className={fieldStyle} value={draft.bookingUrl} maxLength={500} placeholder="https://…" onChange={event=>update("bookingUrl",event.target.value)}/></label>
            <label className={`${labelStyle} sm:col-span-2`}>Notes<textarea className={`${fieldStyle} min-h-20 resize-y`} rows={2} maxLength={750} placeholder="Optional booking instructions" value={draft.notes} onChange={event=>update("notes",event.target.value)}/></label>
          </div>}
        </div>
      </div>
      {error && <p className="mt-3 text-xs text-red-700" role="alert">{error}</p>}
      <footer className="mt-5 flex items-center justify-between gap-3 border-t border-gray-200 pt-4">
        {selected ? <button type="button" disabled={busy} className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 hover:underline" onClick={()=>void persist("delete")}><Trash2 className="h-4 w-4"/> Delete</button> : <span/>}
        <div className="flex gap-2"><button type="button" disabled={busy} onClick={closeEditor} className={buttonStyle}>Cancel</button><button type="button" disabled={busy || !draft.name.trim()} onClick={()=>void persist("upsert")} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-green-900 px-4 py-2 text-xs font-semibold text-white hover:bg-green-800 disabled:opacity-50">{busy ? "Saving…" : <><Check className="h-4 w-4"/> Save entry</>}</button></div>
      </footer>
    </section>}
    <p className="flex items-center gap-1.5 text-xs leading-5 text-gray-500"><LockKeyhole className="h-3.5 w-3.5"/> Booking details stay private. This records a plan; it does not make a reservation.</p>
  </div>;
}
