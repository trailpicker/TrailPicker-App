import Link from "next/link";
import {ArrowLeft, ArrowRight, Backpack, CalendarDays, Compass, ExternalLink, Footprints, MapPin, Mountain, Route, Tent, Users} from "lucide-react";
import type {Destination} from "@/lib/destinations";
import {getDiscoverPhoto, discoverPhotoUrl, discoverPhotoSource} from "@/lib/discover-photos";
import {openStreetMapLink, validCoordinates} from "@/lib/destination-detail";
import {publicTripDay, summarizeTripDays, tripDate, tripDayTitle, type TripDayPublic} from "@/lib/discover-trips";
import TripActions from "./TripActions";
import DiscoverLocationMap from "./DiscoverLocationMap";
import {publicRouteWaypoints} from "@/lib/discover-public-route";
import RelatedDiscover from "./RelatedDiscover";
import DiscoverSectionNav from "./DiscoverSectionNav";
import {relatedPackHref,relatedDestinationHref,type RelatedPublicContent} from "@/lib/discover-related";

type Props={
  id:string; name:string;location:string|null;author:string;destination:Destination|null;
  startDate:Date|null;endDate:Date|null;people:number;
  days:TripDayPublic[];saves:number;saved:boolean;signedIn:boolean;
  gearCount:number;related:RelatedPublicContent;waypoints:unknown;
};
function Stat({title,value,icon:Icon}: {title:string;value:string;icon:typeof Compass}) {
 return <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="flex items-center gap-1 text-xs font-medium text-slate-500"><Icon size={14}/>{title}</p><p className="mt-1 text-lg font-bold text-slate-950">{value}</p></div>;
}
export default function PublicTripDetail({id,name,location,author,destination,startDate,endDate,people,days,saves,saved,signedIn,gearCount,related,waypoints}:Props) {
  const publicDays=days.map(publicTripDay);
  const route=publicRouteWaypoints(waypoints,days.flatMap(day=>day.id?[day.id]:[]));
  const unassigned=route.filter(point=>!point.dayId||!days.some(day=>day.id===point.dayId));
  const stats=summarizeTripDays(publicDays);
  const photo=destination?getDiscoverPhoto(destination):null;
  // Never expose an arbitrary user-entered precise location on a public browse page.
  const coords=destination?validCoordinates(destination):null;
  return <main className="min-h-screen bg-[#f6f8f7] pb-20 text-slate-900">
    <div className="bg-[#00802f] px-4 py-5 text-white"><div className="mx-auto max-w-screen-xl"><Link href="/discover/community" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"><ArrowLeft size={16}/>Back to Trips</Link></div></div>
    <div className="mx-auto max-w-screen-xl px-4 pt-6 sm:px-6">
      <div className="mb-5"><DiscoverSectionNav active="trips" /></div>
      <div className={`relative flex flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-900 to-green-950 p-6 sm:p-8 ${photo ? "min-h-[210px] sm:min-h-[260px]" : ""}`}>
        {photo&&<>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={discoverPhotoUrl(photo)} alt={photo.representative?`Representative area photography in ${destination?.park}`:photo.description} className="absolute inset-0 h-full w-full object-cover" referrerPolicy="no-referrer"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true"/>
          <a href={discoverPhotoSource(photo)} target="_blank" rel="noopener noreferrer" className="absolute right-3 top-3 rounded-md bg-black/70 px-2 py-1 text-[11px] text-white">{photo.representative?"Area photo · ":"Photo · "}{photo.author} · {photo.license}</a>
        </>}
        <div className="relative max-w-3xl text-white"><p className="mb-2 text-xs font-bold uppercase tracking-wider">Public community itinerary</p><h1 className="text-3xl font-bold sm:text-4xl">{name}</h1><p className="mt-2 flex items-center gap-1.5 text-sm"><MapPin size={16}/>{location||destination?.name||"Location not specified"}</p></div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <Stat title="Itinerary" value={`${stats.dayCount} ${stats.dayCount===1?"day":"days"}`} icon={CalendarDays}/>
        <Stat title="Distance entered" value={stats.distanceKm===null?"Not planned":`${Number(stats.distanceKm.toFixed(1))} km${stats.measuredDistanceDays<stats.dayCount?"*":""}`} icon={Footprints}/>
        <Stat title="Elevation entered" value={stats.elevationGainM===null?"Not planned":`${stats.elevationGainM.toLocaleString("en-CA")} m${stats.measuredGainDays<stats.dayCount?"*":""}`} icon={Mountain}/>
        <Stat title="Travellers" value={String(people)} icon={Users}/>
        <Stat title="Saved by" value={String(saves)} icon={Compass}/>
      </div>
      <div className="mt-6 grid gap-7 lg:grid-cols-[minmax(0,1fr)_310px]">
        <div className="min-w-0 space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-2"><div><h2 className="text-xl font-bold">Day-by-day itinerary</h2><p className="mt-1 text-xs text-slate-500">Shared by {author} · {tripDate(startDate??days[0]?.date)}{endDate?` – ${tripDate(endDate)}`:""}</p></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">Read-only</span></div>
            <ol className="mt-5 space-y-3">{publicDays.map((day,index)=><li key={`${index}-${String(day.date)}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="flex flex-wrap items-start justify-between gap-2"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Day {index+1} · {tripDate(day.date)}</p><h3 className="mt-1 text-base font-bold text-slate-900">{tripDayTitle(day,index)}</h3></div><span className="text-xs text-slate-500">{day.distanceKm===null?"Distance not set":`${day.distanceKm} km`}</span></div>
              {day.activities&&<p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">{day.activities}</p>}
              {day.id&&route.some(point=>point.dayId===day.id)&&<div className="mt-3 border-t border-slate-200 pt-3"><p className="text-xs font-semibold text-green-900">Mapped stops</p><ol className="mt-2 space-y-1.5">{route.filter(point=>point.dayId===day.id).map((point,stopIndex)=><li key={point.id} className="text-xs text-slate-600">{stopIndex+1}. {point.name}{point.time?` · ${point.time}`:""}</li>)}</ol></div>}
              <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600">{day.campsite&&<div className="flex items-center gap-1"><Tent size={13}/><dt className="font-semibold">Camp:</dt><dd>{day.campsite}</dd></div>}{day.elevationGainM!==null&&<div><dt className="inline font-semibold">Gain: </dt><dd className="inline">{day.elevationGainM} m</dd></div>}{day.durationMinutes!=null&&<div><dt className="inline font-semibold">Planned time: </dt><dd className="inline">{Math.round(day.durationMinutes)} min</dd></div>}</dl>
            </li>)}</ol>
          </section>
          {(coords||route.length>0)&&<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="flex flex-wrap items-center justify-between gap-3 p-5"><div><h2 className="text-xl font-bold">Published route & location</h2><p className="mt-1 text-xs text-slate-500">{route.length?`${route.length} saved stops · dashed lines connect points directly, not along trails`:"Catalog destination pin, not a trailhead or mapped trail"}</p></div><a href={openStreetMapLink(coords??{latitude:route[0].lat,longitude:route[0].lng})} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-green-900">Open map <ExternalLink size={14}/></a></div><DiscoverLocationMap coords={coords} points={route} title="Published itinerary route" height="trip"/>{unassigned.length>0&&<div className="border-t border-slate-100 p-4"><p className="text-xs font-bold text-slate-800">Other mapped stops</p><ol className="mt-2 grid gap-1">{unassigned.map(point=><li key={point.id} className="text-xs text-slate-600">{point.name}{point.time?` · ${point.time}`:""}</li>)}</ol></div>}</section>}
          <RelatedDiscover related={related} title="More from this destination" />
          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950"><h2 className="font-bold">Use this as a starting point</h2><p className="mt-2 leading-6">This is a community-contributed plan. Trip information and distances may be incomplete or outdated. Confirm current access, park restrictions, route suitability, permits, and weather before travelling.</p>{(stats.measuredDistanceDays!==stats.dayCount||stats.measuredGainDays!==stats.dayCount)&&<p className="mt-2 text-xs">* Total route statistics only include days with recorded values; they are not complete trip totals.</p>}</section>
        </div>
        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start"><section className="rounded-2xl border border-slate-200 bg-white p-5"><h2 className="text-lg font-bold">Make this trip yours</h2><p className="mt-2 text-sm leading-6 text-slate-600">Copy this trip to create your own private, editable itinerary and gear list.</p><div className="mt-4"><TripActions id={id} saved={saved} signedIn={signedIn}/></div><div className="mt-4 border-t border-slate-100 pt-4">{gearCount>0?<Link href={relatedPackHref(id)} className="inline-flex items-center gap-2 text-sm font-semibold text-green-900 hover:underline">View this trip’s gear list <ArrowRight size={15}/></Link>:<p className="text-xs text-slate-500">No public gear list attached to this trip.</p>}</div></section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5"><h2 className="text-base font-bold">Trip details</h2><dl className="mt-3 space-y-3 text-sm"><div className="flex justify-between gap-3"><dt className="text-slate-500">Start</dt><dd className="text-right font-semibold">{tripDate(startDate)}</dd></div><div className="flex justify-between gap-3"><dt className="text-slate-500">End</dt><dd className="text-right font-semibold">{tripDate(endDate)}</dd></div><div className="flex justify-between gap-3"><dt className="text-slate-500">Gear entries</dt><dd className="font-semibold">{gearCount}</dd></div><div className="flex justify-between gap-3"><dt className="text-slate-500">Campsite entries</dt><dd className="font-semibold">{stats.campsites}</dd></div></dl>{destination&&<Link href={relatedDestinationHref(destination.id)} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green-900 hover:underline">Explore the destination <ArrowRight size={15}/></Link>}</section>
        </aside>
      </div>
    </div>
  </main>;
}
