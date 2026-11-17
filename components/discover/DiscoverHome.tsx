import Link from "next/link";
import {
  ArrowRight, Backpack, Bookmark, MapPin, Mountain,
  Search, Sparkles, Tent, UsersRound,
} from "lucide-react";
import { DESTINATIONS, getDestination, type Destination } from "@/lib/destinations";
import { destinationHref } from "@/lib/destination-detail";
import { getDiscoverPhoto, discoverPhotoUrl, discoverPhotoSource } from "@/lib/discover-photos";

// These are editorial picks, not a ranking of current trail safety or availability.
const editorialIds = [
  "elfin-lakes",
  "garibaldi-lake-destination",
  "berg-lake-trail",
  "nels-bight-cape-scott",
];

function getSpotlights(): Destination[] {
  const chosen = editorialIds
    .map(id => getDestination(id))
    .filter((destination): destination is Destination => Boolean(destination));
  // The catalog can change. Fall back to existing featured records, not invented entries.
  for (const destination of DESTINATIONS) {
    if (chosen.length >= 4) break;
    if (destination.featured && !chosen.some(item => item.id === destination.id)) chosen.push(destination);
  }
  return chosen.slice(0, 4);
}

function DestinationCard({ destination }: { destination: Destination }) {
  const photo = getDiscoverPhoto(destination);
  const href = destinationHref(destination.id);
  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md">
      <div className="relative aspect-[1.65/1] overflow-hidden bg-gradient-to-br from-sky-100 via-emerald-100 to-green-700">
        {photo ? (
          <>
            <Link href={href} aria-label={`View ${destination.name}`} className="absolute inset-0 z-0">
              {/* Existing photo URLs and attribution come from TrailPicker's catalog. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={discoverPhotoUrl(photo)}
                alt={photo.representative ? `Representative scenery in ${destination.park}` : photo.description}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.035]"
              />
            </Link>
            <a href={discoverPhotoSource(photo)} target="_blank" rel="noopener noreferrer"
              className="absolute bottom-2 right-2 z-10 max-w-[92%] truncate rounded-md bg-black/65 px-2 py-1 text-[10px] text-white hover:bg-black/80">
              {photo.representative ? "Area photo" : "Photo"} · {photo.author} · {photo.license}
            </a>
          </>
        ) : (
          <Link href={href} className="flex h-full w-full items-center justify-center text-green-900/45" aria-label={`View ${destination.name}`}>
            <Mountain size={46} strokeWidth={1.25} aria-hidden="true" />
          </Link>
        )}
      </div>
      <div className="flex min-h-[145px] flex-col p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <MapPin size={13} className="text-green-700" aria-hidden="true" />
          <span className="min-w-0 truncate">{destination.region}</span>
          <span className="ml-auto shrink-0 rounded-md bg-slate-100 px-2 py-0.5 font-medium capitalize text-slate-600">{destination.difficulty}</span>
        </div>
        <h3 className="mt-2 line-clamp-2 text-base font-bold leading-snug text-slate-900">
          <Link href={href} className="transition hover:text-green-800 focus-visible:underline">{destination.name}</Link>
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-slate-500">{destination.park}</p>
        <p className="mt-auto pt-3 text-xs text-slate-500">{destination.distanceKm === null ? "Distance not listed" : `${Number(destination.distanceKm.toFixed(1))} km listed`}</p>
        <Link href={`${href}#plan-trip-heading`} className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-green-900 px-3 text-sm font-semibold text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-green-700">Plan this destination <ArrowRight size={15} aria-hidden="true" /></Link>
      </div>
    </article>
  );
}

const quickSearches = [
  { label: "Alpine lakes", href: "/discover/search?q=lake" },
  { label: "Garibaldi", href: "/discover/search?q=Garibaldi" },
  { label: "Coastal trails", href: "/discover/search?q=coast" },
];

export default function DiscoverHome() {
  const spotlights = getSpotlights();
  return (
    <main className="min-h-screen bg-gray-50 pb-16 text-slate-900">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-3 px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Discover</h1>
            <p className="mt-1 text-sm text-slate-600">Find places, explore ideas, and start planning.</p>
          </div>
          <nav aria-label="Discover shortcuts" className="flex flex-wrap items-center gap-2">
            <Link href="/discover/saved" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:border-green-300 hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-green-700">
              <Bookmark size={17} aria-hidden="true" /> Saved
            </Link>
            <Link href="/discover/community" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:border-green-300 hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-green-700">
              <UsersRound size={17} aria-hidden="true" /> Community
            </Link>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,.85fr)]">
          <section aria-labelledby="destination-search-heading" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-xl bg-green-50 text-green-800"><Search size={19} aria-hidden="true" /></span>
                <h2 id="destination-search-heading" className="text-lg font-bold">Search destinations</h2>
              </div>
              <span className="text-xs text-slate-500">{DESTINATIONS.length} BC listings</span>
            </div>
            <form method="get" action="/discover/search" role="search" className="mt-4 flex flex-col gap-2 sm:flex-row">
              <label className="flex min-h-12 min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-300 px-3 focus-within:border-green-700 focus-within:ring-1 focus-within:ring-green-700">
                <Search className="shrink-0 text-slate-400" size={18} aria-hidden="true" />
                <span className="sr-only">Search destinations, parks, or trails</span>
                <input name="q" type="search" maxLength={100} placeholder="Try a trail, park, lake, or region…" className="h-11 min-w-0 w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
              </label>
              <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-800 px-5 text-sm font-semibold text-white transition hover:bg-green-900 focus-visible:outline-2 focus-visible:outline-green-700">
                Search <ArrowRight size={16} aria-hidden="true" />
              </button>
            </form>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs text-slate-500">Try:</span>
              {quickSearches.map(item => (
                <Link key={item.label} href={item.href} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-green-300 hover:bg-green-50 hover:text-green-900">{item.label}</Link>
              ))}
              <Link href="/discover/search" className="ml-auto inline-flex items-center gap-1 px-1 py-1.5 text-xs font-semibold text-green-800 hover:underline">Full catalog <ArrowRight size={13} /></Link>
            </div>
          </section>

          <Link href="/discover/find" className="group relative isolate flex min-h-[210px] flex-col justify-between overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 p-5 text-slate-900 shadow-sm transition duration-200 hover:border-green-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-green-700 sm:p-6">
            <div className="pointer-events-none absolute -bottom-12 -right-8 -z-10 text-green-900/10" aria-hidden="true"><Mountain size={230} strokeWidth={0.8} /></div>
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-800"><Sparkles size={17} aria-hidden="true" /> Guided discovery</span>
              <h2 className="mt-3 text-xl font-bold">Not sure where to go?</h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">Choose scenery, trail difficulty, facilities, and more. Get a shortlist with clear reasons.</p>
            </div>
            <span className="mt-5 inline-flex items-center gap-2 self-start rounded-xl bg-green-800 px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-green-900">Find a trip <ArrowRight size={16} aria-hidden="true" /></span>
          </Link>
        </div>

        <section aria-labelledby="spotlights-title" className="mt-9">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="spotlights-title" className="text-xl font-bold">Places worth a look</h2>
              <p className="mt-1 text-sm text-slate-500">A few starting points from the BC destination catalog.</p>
            </div>
            <Link href="/discover/search" className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-green-800 hover:underline">View all destinations <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          {spotlights.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {spotlights.map(destination => <DestinationCard key={destination.id} destination={destination} />)}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">No featured destinations are available in this catalog.</div>
          )}
        </section>

        <section aria-labelledby="community-title" className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800"><UsersRound size={20} aria-hidden="true" /></span>
            <div>
              <h2 id="community-title" className="text-base font-bold">See how others plan and pack</h2>
              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">Browse public itineraries and gear lists, then save or copy what helps.</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Link href="/discover/community" className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-green-800 px-4 text-sm font-semibold text-white transition hover:bg-green-900"><Tent size={16} aria-hidden="true" /> Trips <ArrowRight size={14} /></Link>
            <Link href="/discover/community?type=packs" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"><Backpack size={16} aria-hidden="true" /> Gear lists</Link>
          </div>
        </section>
        <p className="mt-5 text-xs leading-5 text-slate-500">Destination listings are planning leads, not live trail or campsite availability. Check current access, conditions, and permits with the official park operator.</p>
      </div>
    </main>
  );
}
