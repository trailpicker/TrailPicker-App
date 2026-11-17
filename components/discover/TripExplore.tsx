import Link from "next/link";
import {ArrowRight, Backpack, Bookmark, CalendarDays, Compass, Footprints, MapPin, Mountain, Route, Search, Tent, SlidersHorizontal, FilterX} from "lucide-react";
import type {DiscoverSearch} from "@/lib/discover";
import type {Destination} from "@/lib/destinations";
import type {TripDayPublic, TripFeature} from "@/lib/discover-trips";
import {tripBrowseHref, tripDate, tripDayTitle, tripHref, summarizeTripDays} from "@/lib/discover-trips";
import {getDiscoverPhoto, discoverPhotoUrl, discoverPhotoSource} from "@/lib/discover-photos";
import TripActions from "./TripActions";
import DiscoverHeader from "./DiscoverHeader";

export type PublicTripCard = {
  id: string;
  name: string;
  location: string | null;
  author: string;
  destination: Destination | null;
  startDate: string | null;
  endDate: string | null;
  updatedAt: string;
  people: number;
  days: TripDayPublic[];
  saves: number;
  saved: boolean;
  gearCount: number;
};
type Props = { trips: PublicTripCard[]; filters: DiscoverSearch; feature: TripFeature; regions: string[]; total: number; totalPages: number; signedIn: boolean };
const features = [
  {value: "all", label: "All trips", Icon: Compass},
  {value: "route", label: "With route details", Icon: Route},
  {value: "campsite", label: "Campsite plans", Icon: Tent},
  {value: "gear", label: "With gear lists", Icon: Backpack},
] as const;
function TripCard({trip,signedIn}: {trip: PublicTripCard;signedIn:boolean}) {
  const stats=summarizeTripDays(trip.days);
  const photo=trip.destination ? getDiscoverPhoto(trip.destination) : null;
  const first=trip.days[0];
  return <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-200 hover:shadow-md">
    <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-teal-100 via-emerald-100 to-green-800 text-green-900/40">
      {photo ? <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={discoverPhotoUrl(photo)} alt={photo.representative ? `Area photograph of ${trip.destination?.park}` : photo.description} loading="lazy" referrerPolicy="no-referrer" className="absolute inset-0 h-full w-full object-cover"/>
        <a href={discoverPhotoSource(photo)} target="_blank" rel="noopener noreferrer" title={`${photo.author} · ${photo.license}`} className="absolute bottom-2 right-2 z-10 rounded-md bg-slate-950/70 px-2 py-1 text-[10px] font-semibold text-white">{photo.representative ? "Area photo" : "Photo"} · {photo.author} · {photo.license}</a>
      </> : <Mountain size={56} strokeWidth={1.3} aria-hidden="true"/>}
      <span className="absolute left-3 top-3 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-bold text-green-900 shadow-sm">{stats.dayCount} {stats.dayCount === 1 ? "day" : "days"}</span>
    </div>
    <div className="flex flex-1 flex-col p-5">
      <div className="flex items-start justify-between gap-3"><div className="min-w-0 flex-1"><Link href={tripHref(trip.id)} className="line-clamp-2 text-lg font-bold leading-snug text-slate-900 hover:text-green-800">{trip.name}</Link><p className="mt-2 flex items-start gap-1 text-sm text-slate-600"><MapPin size={15} className="mt-0.5 shrink-0 text-emerald-800"/>{trip.location || trip.destination?.name || "Location not specified"}</p></div><span className="inline-flex items-center gap-1 text-xs text-slate-500"><Bookmark size={13}/>{trip.saves}</span></div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-xl bg-slate-50 p-3"><span className="flex items-center gap-1 text-xs text-slate-500"><Footprints size={13}/> Distance</span><strong className="mt-1 block">{stats.distanceKm === null ? "Not planned" : `${Number(stats.distanceKm.toFixed(1))} km${stats.measuredDistanceDays < stats.dayCount ? "*" : ""}`}</strong></div>
        <div className="rounded-xl bg-slate-50 p-3"><span className="flex items-center gap-1 text-xs text-slate-500"><Mountain size={13}/> Elevation gain</span><strong className="mt-1 block">{stats.elevationGainM === null ? "Not planned" : `${stats.elevationGainM.toLocaleString("en-CA")} m${stats.measuredGainDays < stats.dayCount ? "*" : ""}`}</strong></div>
      </div>
      {first && <p className="mt-4 line-clamp-2 text-sm text-slate-600"><span className="font-semibold text-slate-700">Day 1: </span>{tripDayTitle(first,0)}</p>}
      <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500"><CalendarDays size={13}/> {tripDate(trip.startDate ?? first?.date)}{trip.endDate && trip.endDate !== trip.startDate ? ` – ${tripDate(trip.endDate)}` : ""}</p>
      <p className="mt-1 text-xs text-slate-500">By {trip.author} · {trip.gearCount} gear items · {stats.campsites} campsite entries</p>
      {stats.measuredDistanceDays > 0 && stats.measuredDistanceDays < stats.dayCount && <p className="mt-1 text-[11px] text-slate-500">* Totals include only days with recorded values.</p>}
      <div className="mt-auto space-y-3 pt-4"><Link href={tripHref(trip.id)} className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-900 px-4 text-sm font-bold text-white transition hover:bg-green-800">View itinerary <ArrowRight size={16}/></Link><TripActions id={trip.id} saved={trip.saved} signedIn={signedIn}/></div>
    </div>
  </article>;
}
export default function TripExplore({trips, filters, feature, regions, total, totalPages, signedIn}: Props) {
  const state = {q:filters.q,location:filters.location,region:filters.region,sort:filters.sort};
  const hasFilters=Boolean(filters.q||filters.location||filters.region||feature!=="all"||filters.sort!=="recent");
  return <main className="min-h-screen bg-[#f6f8f7] pb-20 text-slate-900">
    <DiscoverHeader active="community" back/>
    <div className="border-b border-slate-200 bg-white"><div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Community</h1><p className="mt-1 text-sm text-slate-600">Public itineraries and gear lists from other backpackers.</p>
      <nav aria-label="Community content type" className="mt-4 flex flex-wrap gap-2"><Link href="/discover/community" aria-current="page" className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-green-800 px-4 text-sm font-semibold text-white"><Tent size={16}/> Trips</Link><Link href="/discover/community?type=packs" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50"><Backpack size={16}/> Gear lists</Link></nav>
    </div></div>
    <div className="mx-auto max-w-screen-2xl px-4 pt-7 sm:px-6 lg:px-8">
      <section className="mb-6"><h2 className="text-lg font-bold text-slate-900">Browse itineraries</h2><p className="mt-1 text-sm leading-6 text-slate-600">Explore public trips and make a private copy of any itinerary you want to adapt.</p></section>
      <nav aria-label="Trip quick filters" className="mb-5 flex gap-2 overflow-x-auto pb-2">{features.map(({value,label,Icon})=><Link key={value} href={tripBrowseHref(state,feature,{feature:value,page:1})} aria-current={feature===value?"true":undefined} className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border px-4 text-sm font-semibold ${feature===value?"border-green-900 bg-green-900 text-white":"border-slate-200 bg-white text-slate-700 hover:bg-emerald-50"}`}><Icon size={16}/>{label}</Link>)}</nav>
      <form action="/discover/community" method="get" className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-[minmax(200px,1fr)_repeat(3,minmax(120px,auto))_auto]">
<input type="hidden" name="feature" value={feature}/>
        <label className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 px-3"><Search size={16} className="shrink-0 text-slate-500"/><span className="sr-only">Search trips</span><input name="q" type="search" maxLength={100} defaultValue={filters.q} placeholder="Search trips and places…" className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none"/></label>
        <label className="flex items-center rounded-xl border border-slate-200 px-3"><MapPin size={16} className="shrink-0 text-slate-500"/><span className="sr-only">Location contains</span><input name="location" maxLength={100} defaultValue={filters.location} placeholder="Location" className="h-11 w-full min-w-0 bg-transparent pl-2 text-sm outline-none"/></label>
        <label className="flex items-center rounded-xl border border-slate-200 px-3"><span className="sr-only">Region</span><select name="region" defaultValue={filters.region} className="h-11 w-full bg-white text-sm outline-none"><option value="">All regions</option>{regions.map(r=><option key={r} value={r}>{r}</option>)}</select></label>
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3"><SlidersHorizontal size={16} className="shrink-0 text-slate-500"/><span className="sr-only">Sort trips</span><select name="sort" defaultValue={filters.sort} className="h-11 w-full bg-white text-sm outline-none"><option value="recent">Newest</option><option value="updated">Recently updated</option><option value="popular">Most saved</option><option value="name">Name A–Z</option></select></label>
        <button type="submit" className="min-h-11 rounded-xl bg-green-900 px-5 text-sm font-semibold text-white hover:bg-green-800">Search</button>
      </form>
      <div className="mt-7 flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-xl font-bold">{hasFilters?"Matching trips":"Public trips"}</h2><p className="mt-1 text-sm text-slate-500">{total} {total===1?"trip":"trips"}{total>0?` · Page ${filters.page} of ${totalPages}`:""}</p></div>{hasFilters&&<Link href="/discover/community" className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-green-900 hover:bg-emerald-50"><FilterX size={16}/>Clear filters</Link>}</div>
      {trips.length? <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{trips.map(trip=><TripCard key={trip.id} trip={trip} signedIn={signedIn}/>)}</div>:<div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center"><Compass size={32} className="mx-auto text-slate-400"/><h3 className="mt-3 text-lg font-semibold">{hasFilters?"No trips match these filters":"No public trips yet"}</h3><p className="mt-2 text-sm text-slate-600">{hasFilters?"Try fewer filters or another location.":"Trips appear here when their owners publish a build with itinerary days."}</p><Link href={hasFilters?"/discover/community":"/build"} className="mt-5 inline-flex min-h-10 items-center rounded-xl bg-green-900 px-4 text-sm font-semibold text-white">{hasFilters?"Clear filters":"Create your trip"}</Link></div>}
      {totalPages>1&&<nav aria-label="Trip pages" className="mt-8 flex items-center justify-center gap-3">{filters.page>1&&<Link className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold" href={tripBrowseHref(state,feature,{page:filters.page-1})}>Previous</Link>}<span className="text-sm text-slate-500">{filters.page} / {totalPages}</span>{filters.page<totalPages&&<Link className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold" href={tripBrowseHref(state,feature,{page:filters.page+1})}>Next</Link>}</nav>}
      <p className="mt-8 border-t border-slate-200 pt-5 text-xs text-slate-500">Community itineraries are user-submitted, not official routes or current conditions. Confirm access, distances, permits, and hazards independently before a trip.</p>
    </div>
  </main>;
}
