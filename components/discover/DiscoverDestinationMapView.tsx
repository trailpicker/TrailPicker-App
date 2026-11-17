"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Footprints, MapPin, Mountain, Navigation, Route } from "lucide-react";
import type { Destination } from "@/lib/destinations";
import { destinationHref } from "@/lib/destination-detail";
import { getDiscoverPhoto, discoverPhotoUrl } from "@/lib/discover-photos";
import DiscoverSearchMap from "./DiscoverSearchMap";

type Unmapped = Pick<Destination, "id" | "name" | "park" | "region" | "difficulty">;

function Photo({destination}: {destination: Destination}) {
  const [failed, setFailed] = useState(false);
  const photo = getDiscoverPhoto(destination);
  return <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-sky-100 via-emerald-100 to-emerald-700 sm:h-32">
    {photo && !failed ? (
      // Remote Commons images are served directly, as with the existing Discover cards.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={discoverPhotoUrl(photo)} alt={photo.description} loading="lazy" onError={() => setFailed(true)} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
    ) : <div className="flex h-full items-center justify-center text-emerald-900/50"><Mountain size={34} strokeWidth={1.4} aria-hidden="true" /></div>}
  </div>;
}

const difficultyStyle: Record<Destination["difficulty"], string> = {
  easy: "bg-emerald-50 text-emerald-800",
  moderate: "bg-amber-50 text-amber-800",
  hard: "bg-rose-50 text-rose-800",
};

export default function DiscoverDestinationMapView({
  mapped, unmapped,
}: {
  mapped: Destination[];
  unmapped: Unmapped[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // In case the user changes server-side filters while staying in map mode.
  const resultKey = mapped.map(destination => destination.id).join("|");
  useEffect(() => { setSelectedId(null); }, [resultKey]);
  const selected = mapped.find(destination => destination.id === selectedId) ?? null;

  return <section aria-label="Destination map results" className="mt-4">
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm">
      <p className="flex items-center gap-2 font-medium text-slate-700">
        <MapPin size={16} className="text-emerald-700" aria-hidden="true" />
        {mapped.length} of {mapped.length + unmapped.length} matching destinations have mapped locations
      </p>
      <span className="text-xs text-slate-500">Only confirmed catalog coordinates are pinned.</span>
    </div>
    {mapped.length ? <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[minmax(270px,340px)_minmax(0,1fr)] xl:grid-cols-[minmax(290px,380px)_minmax(0,1fr)]">
      <div className="order-2 flex min-h-0 flex-col border-t border-slate-200 lg:order-1 lg:h-[560px] lg:border-r lg:border-t-0">
        {selected && <div className="border-b border-slate-200 p-3 sm:p-4" aria-live="polite">
          <Photo destination={selected} />
          <div className="mt-3 flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0 flex-1"><h3 className="text-base font-bold text-slate-900">{selected.name}</h3><p className="mt-1 text-xs text-slate-500">{selected.park} · {selected.region}</p></div>
            <span className={`shrink-0 rounded-md px-2 py-1 text-xs font-semibold capitalize ${difficultyStyle[selected.difficulty]}`}>{selected.difficulty}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600">
            {selected.distanceKm != null && <span className="inline-flex items-center gap-1"><Footprints size={13} />{selected.distanceKm} km listed</span>}
            {selected.elevationGainM != null && <span className="inline-flex items-center gap-1"><Mountain size={13} />{selected.elevationGainM} m gain</span>}
          </div>
          <Link href={destinationHref(selected.id)} className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-green-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-800">
            Explore destination <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>}
        <div className="max-h-[330px] overflow-y-auto p-2 sm:p-3 lg:max-h-none lg:min-h-0 lg:flex-1" aria-label="Mapped destination list">
          <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Mapped places</p>
          <div className="space-y-1">
            {mapped.map(destination => <div key={destination.id} className={`flex items-stretch gap-2 rounded-xl border transition ${selectedId === destination.id ? "border-emerald-400 bg-emerald-50" : "border-transparent hover:border-slate-200 hover:bg-slate-50"}`}>
              <button type="button" aria-pressed={selectedId === destination.id} onClick={() => setSelectedId(destination.id)} className="min-w-0 flex-1 px-3 py-3 text-left focus-visible:rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-900">
                <span className="block truncate text-sm font-semibold text-slate-900">{destination.name}</span>
                <span className="mt-1 block truncate text-xs text-slate-500">{destination.region} · {destination.park}</span>
              </button>
              <Link href={destinationHref(destination.id)} aria-label={`Open ${destination.name}`} className="flex w-10 shrink-0 items-center justify-center rounded-r-xl text-green-900 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-900"><ArrowRight size={16} /></Link>
            </div>)}
          </div>
        </div>
      </div>
      <div className="order-1 min-w-0 lg:order-2">
        <DiscoverSearchMap destinations={mapped} selectedId={selectedId} onSelect={setSelectedId} />
      </div>
    </div> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
      <Navigation size={30} className="mx-auto text-slate-400" aria-hidden="true" />
      <h3 className="mt-3 font-bold text-slate-900">No mapped locations for this search</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">These destinations don't have verified coordinates in the catalog yet. You can still open any destination below or switch back to Grid.</p>
    </div>}
    {unmapped.length > 0 && <details className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <summary className="cursor-pointer px-4 py-4 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-900">
        <span className="inline-flex items-center gap-2"><Route size={16} className="text-slate-500" aria-hidden="true" /> {unmapped.length} additional {unmapped.length === 1 ? "destination" : "destinations"} without map coordinates</span>
      </summary>
      <p className="border-t border-slate-100 px-4 pt-3 text-xs leading-5 text-slate-600">These are real search results, not missing from Discover. Their locations haven't been verified for map pins.</p>
      <ul className="grid max-h-72 grid-cols-1 gap-x-2 overflow-y-auto px-2 pb-3 pt-2 sm:grid-cols-2 xl:grid-cols-3">
        {unmapped.map(destination => <li key={destination.id}>
          <Link href={destinationHref(destination.id)} className="flex min-h-12 items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-900">
            <span className="min-w-0"><span className="block truncate font-semibold text-slate-800">{destination.name}</span><span className="block truncate text-xs text-slate-500">{destination.region} · {destination.park}</span></span>
            <ArrowRight size={14} className="shrink-0 text-green-800" aria-hidden="true" />
          </Link>
        </li>)}
      </ul>
    </details>}
  </section>;
}
