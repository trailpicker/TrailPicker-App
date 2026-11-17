import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CalendarClock, Compass, ExternalLink,
  Footprints, Info, MapPin, Mountain, PawPrint, Route, ShieldAlert, Tent,
  Toilet, Trees, Warehouse,
} from "lucide-react";
import type { Destination } from "@/lib/destinations";
import type { RelatedDestination } from "@/lib/destination-detail";
import {
  destinationHref, distanceLabel, dogsLabel, facilityLabel,
  officialUrl, openStreetMapLink, openStreetMapSearch,
  permitLabel, validCoordinates,
} from "@/lib/destination-detail";
import DestinationTripForm from "./DestinationTripForm";
import DiscoverLocationMap from "./DiscoverLocationMap";
import DestinationDetailHero from "./DestinationDetailHero";
import ShareDestinationButton from "./ShareDestinationButton";
import DestinationSaveButton from "./DestinationSaveButton";
import RelatedDiscover from "./RelatedDiscover";
import DiscoverSectionNav from "./DiscoverSectionNav";
import type { RelatedPublicContent } from "@/lib/discover-related";

type Props = {
  destination: Destination;
  campgrounds: RelatedDestination[];
  places: Destination[];
  saved: boolean;
  signedIn: boolean;
  related: RelatedPublicContent;
};
const difficultyTone: Record<Destination["difficulty"], string> = {
  easy: "bg-emerald-50 text-emerald-800",
  moderate: "bg-amber-50 text-amber-800",
  hard: "bg-rose-50 text-rose-800",
};
const labelKind = (kind: string | undefined) => (kind ?? "campground").replaceAll("-", " ").replace(/\b\w/g, letter => letter.toUpperCase());
const labelActivity = (activity: string) => activity.replaceAll("-", " ").replace(/\b\w/g, letter => letter.toUpperCase());

function Stat({ icon: Icon, label, value }: { icon: typeof Compass; label: string; value: string }) {
  return <div className="flex min-h-24 flex-col justify-center rounded-2xl border border-slate-200 bg-white p-4">
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500"><Icon size={15} className="text-emerald-700" aria-hidden="true" />{label}</span>
    <strong className="mt-2 break-words text-lg font-bold tracking-tight text-slate-900">{value}</strong>
  </div>;
}

function Fact({ icon: Icon, label, value, caution }: { icon: typeof Compass; label: string; value: string; caution?: boolean }) {
  return <div className="flex items-start gap-3 border-b border-slate-100 py-3.5 last:border-b-0">
    <Icon size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-emerald-700" />
    <div className="min-w-0 flex-1"><dt className="text-xs font-medium text-slate-500">{label}</dt><dd className={`mt-0.5 text-sm font-semibold ${caution ? "text-amber-800" : "text-slate-900"}`}>{value}</dd></div>
  </div>;
}

function RelatedCard({ item }: { item: RelatedDestination }) {
  const { destination, straightLineKm, relation } = item;
  return <Link href={destinationHref(destination.id)} className="group flex min-h-28 items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-300 hover:shadow-sm">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Tent size={19} aria-hidden="true" /></div>
    <div className="min-w-0 flex-1"><h3 className="line-clamp-2 font-semibold text-slate-900 group-hover:text-green-800">{destination.name}</h3>
      <p className="mt-1 text-xs text-slate-500">{relation === "same-park" ? `In ${destination.park}` : destination.park}{straightLineKm !== null ? ` · about ${straightLineKm.toFixed(1)} km away` : ""}</p>
      <p className="mt-1 text-xs text-slate-600">{destination.summary}</p>
    </div><ArrowRight size={16} className="mt-1 shrink-0 text-slate-400 group-hover:text-emerald-700" aria-hidden="true" />
  </Link>;
}

export default function DestinationDetail({ destination, campgrounds, places, saved, signedIn, related }: Props) {
  const coords = validCoordinates(destination);
  const source = officialUrl(destination.sourceUrl);
  const booking = officialUrl(destination.bookingUrl);
  const campground = !destination.kind || destination.kind === "campground";
  const hasFacilityData = campground || destination.toilet != null || destination.foodStorage != null;
  const activities = destination.activities ?? (campground ? ["backpacking", "camping"] : []);
  return <main className="min-h-screen bg-[#f6f8f7] pb-20 text-slate-900">
    <header className="bg-[#00802f] text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-5 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex min-w-0 flex-wrap items-center gap-1.5 text-sm text-white/85">
          <Link href="/discover/search" className="rounded-md py-1 font-semibold hover:text-white hover:underline">Discover</Link><span aria-hidden="true">/</span>
          <Link href={`/discover/search?region=${encodeURIComponent(destination.region)}`} className="rounded-md py-1 hover:text-white hover:underline">{destination.region}</Link><span aria-hidden="true">/</span>
          <span aria-current="page" className="max-w-full truncate font-semibold text-white">{destination.name}</span>
        </nav>
      </div>
    </header>

    <div className="mx-auto max-w-screen-xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="mb-4"><DiscoverSectionNav active="destinations" /></div>
      <Link href="/discover/search" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-green-900 hover:underline"><ArrowLeft size={16} aria-hidden="true" />All destinations</Link>
      <DestinationDetailHero destination={destination} />
      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-green-900">{labelKind(destination.kind)}</span>
            <span className={`rounded-md px-2.5 py-1 ${difficultyTone[destination.difficulty]}`}>{labelActivity(destination.difficulty)}</span>
            {destination.featured && <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700">Featured</span>}
          </div>
          <h1 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">{destination.name}</h1>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600"><MapPin size={16} className="text-green-800" aria-hidden="true" />{destination.park} <span className="text-slate-300">·</span> {destination.region}, British Columbia</p>
        </div>
        <div className="flex flex-wrap items-center gap-2"><a href="#plan-trip-heading" className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-green-900 px-4 text-sm font-semibold text-white transition hover:bg-green-800">Plan this destination <ArrowRight size={16} aria-hidden="true"/></a><DestinationSaveButton destinationId={destination.id} saved={saved} signedIn={signedIn}/><ShareDestinationButton /></div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">{activities.map(activity => <span key={activity} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">{labelActivity(activity)}</span>)}</div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Footprints} label="Listed distance" value={distanceLabel(destination.distanceKm, destination.distanceType)} />
        <Stat icon={Mountain} label="Elevation gain" value={destination.elevationGainM === null ? "Not provided" : `${destination.elevationGainM.toLocaleString("en-CA")} m`} />
        <Stat icon={Route} label="Destination type" value={labelKind(destination.kind)} />
        <Stat icon={Trees} label="Region" value={destination.region} />
      </div>
      {destination.distanceKm !== null && !destination.distanceType && <p className="mt-2 text-xs text-slate-500">The source data does not specify whether the listed distance is one-way, return, or loop. Confirm the route before planning.</p>}

      <div className="mt-8 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="min-w-0 space-y-7">
          <section aria-labelledby="overview-heading" className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 id="overview-heading" className="text-xl font-bold tracking-tight">About this destination</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">{destination.summary}</p>
            <div className="mt-5 flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              <Info size={18} className="mt-0.5 shrink-0 text-emerald-700" aria-hidden="true" />
              <p>Access routes, trailheads and journey times are not mapped in this catalog. Use the official destination source for approach options and current notices.</p>
            </div>
          </section>

          {destination.caution && <section aria-labelledby="notice-heading" className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5 sm:p-6">
            <h2 id="notice-heading" className="inline-flex items-center gap-2 text-base font-bold text-amber-950"><ShieldAlert size={19} aria-hidden="true" />Important information</h2>
            <p className="mt-2 text-sm leading-7 text-amber-950/85">{destination.caution}</p>
            <p className="mt-2 text-xs text-amber-950/70">This is catalog guidance, not a live park advisory. Check official updates before travelling.</p>
          </section>}

          <section aria-labelledby="map-heading" className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex flex-wrap items-start justify-between gap-3 px-5 pb-4 pt-5 sm:px-6">
              <div><h2 id="map-heading" className="text-xl font-bold tracking-tight">Location map</h2><p className="mt-1 text-xs text-slate-500">Map data © OpenStreetMap contributors</p></div>
              <a href={coords ? openStreetMapLink(coords) : openStreetMapSearch(destination)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-green-900 hover:bg-slate-50">Open map <ExternalLink size={14} aria-hidden="true" /></a>
            </div>
            {coords ? <>
              <DiscoverLocationMap coords={coords} title={`Location of ${destination.name}`}/>
              <p className="border-t border-slate-100 px-5 py-3 text-xs leading-5 text-slate-500 sm:px-6">Marker: stored destination coordinates ({coords.latitude.toFixed(5)}, {coords.longitude.toFixed(5)}). Not necessarily a trailhead, campsite entrance, or safe route. No trail line is implied.</p>
            </> : <div className="flex min-h-[225px] flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 to-emerald-50 px-6 py-8 text-center">
              <MapPin size={32} className="text-emerald-700/60" aria-hidden="true" />
              <h3 className="text-base font-bold text-slate-800">Map pin not yet available</h3>
              <p className="max-w-md text-sm leading-6 text-slate-600">This listing has no verified coordinates. Search for the destination in OpenStreetMap using the link above, and confirm the route with its official source.</p>
            </div>}
          </section>

          <RelatedDiscover related={related} title="Community trips & gear for this destination" showEmpty />

          {campgrounds.length > 0 && <section aria-labelledby="camp-heading">
            <div className="mb-3 flex flex-wrap items-end justify-between gap-3"><div><h2 id="camp-heading" className="text-xl font-bold tracking-tight">{campground ? "Other places to camp" : "Camping near this destination"}</h2><p className="mt-1 text-sm text-slate-500">Explore other recorded camping areas in this park and nearby</p></div></div>
            <div className="grid gap-3 sm:grid-cols-2">{campgrounds.map(item => <RelatedCard key={item.destination.id} item={item} />)}</div>
            <p className="mt-2 text-xs text-slate-500">Distances are straight-line estimates, not travel times or trail connections. Check actual access with the park operator.</p>
          </section>}

          {places.length > 0 && <section aria-labelledby="other-heading">
            <h2 id="other-heading" className="mb-3 text-xl font-bold tracking-tight">More to explore in {destination.park}</h2>
            <div className="grid gap-3 sm:grid-cols-2">{places.map(place => <Link key={place.id} href={destinationHref(place.id)} className="group flex min-h-24 items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-300 hover:shadow-sm"><span className="min-w-0"><span className="block truncate text-sm font-bold text-slate-900 group-hover:text-green-800">{place.name}</span><span className="mt-1 block text-xs text-slate-500">{labelKind(place.kind)} · {labelActivity(place.difficulty)}</span></span><ArrowRight size={17} className="shrink-0 text-emerald-700" aria-hidden="true" /></Link>)}</div>
          </section>}
        </div>

        <aside className="min-w-0 space-y-5 lg:sticky lg:top-6" aria-label="Planning and destination details">
          <DestinationTripForm destination={destination} />

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-base font-bold">Access &amp; rules</h2>
            <dl className="mt-2">
              <Fact icon={PawPrint} label="Dogs" value={dogsLabel(destination.dogs)} caution={destination.dogs === "check-current-rules"} />
              <Fact icon={CalendarClock} label="Camping or park permits" value={permitLabel(destination.reservations)} caution={destination.reservations === "check-current-rules"} />
              {campground && <Fact icon={Tent} label="Listed tent sites" value={destination.tentSites === null ? "Not provided" : String(destination.tentSites)} />}
            </dl>
            <p className="mt-3 text-xs leading-5 text-slate-500">Rules vary by activity and season. A camping reservation is not the same as a day-use permit.</p>
          </section>

          {hasFacilityData && <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-base font-bold">Facilities</h2>
            <dl className="mt-2">
              {destination.toilet != null && <Fact icon={Toilet} label="Toilets" value={facilityLabel(destination.toilet)} caution={destination.toilet === "unknown" || destination.toilet === "seasonal"} />}
              {destination.foodStorage != null && <Fact icon={Warehouse} label="Provided food storage" value={facilityLabel(destination.foodStorage)} caution={destination.foodStorage === "unknown" || destination.foodStorage === "seasonal"} />}
              {destination.toilet == null && destination.foodStorage == null && <p className="py-2 text-sm text-slate-500">Facilities have not been assessed.</p>}
            </dl>
            {!campground && <p className="mt-2 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-950">These facilities may be at a nearby designated campground rather than along the hike. Read the location notes and official source.</p>}
            <p className="mt-2 text-xs leading-5 text-slate-500">“Not confirmed” means the catalog cannot establish availability, not that a facility is absent. “Seasonal” is not a year-round guarantee.</p>
          </section>}

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-base font-bold">Official information &amp; booking</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Confirm access, advisories, permitted activities and current regulations with the park or operator.</p>
            <div className="mt-4 space-y-2">
              {source ? <a href={source} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-green-900 hover:bg-emerald-50">Destination source <ExternalLink size={16} aria-hidden="true" /></a> : <p className="text-xs text-slate-500">No destination source linked.</p>}
              {booking && <a href={booking} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-green-900 hover:bg-emerald-50">Reservation information <ExternalLink size={16} aria-hidden="true" /></a>}
            </div>
          </section>
        </aside>
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5 text-sm text-slate-500">
        <Link href="/discover/search" className="inline-flex items-center gap-2 font-semibold text-green-900 hover:underline"><ArrowLeft size={16} aria-hidden="true" />Back to Discover</Link>
        <p>Destination information is a planning reference, not live trail conditions.</p>
      </div>
    </div>
  </main>;
}

