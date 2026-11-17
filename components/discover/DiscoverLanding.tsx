"use client";

import { useFormStatus } from "react-dom";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight, Backpack, Bookmark, CalendarDays, Check, Compass, Copy, LayoutGrid, Map as MapIcon,
  FilterX, Footprints, MapPin, Mountain, Search, SlidersHorizontal, ChevronRight, Waves, Tent, Sparkles, ExternalLink, Route,
} from "lucide-react";
import { changeSavedBuild, copyPublicBuild } from "@/app/discover/actions";
import type { Destination } from "@/lib/destinations";
import { discoverUrl, type DiscoverSearch, type DiscoverCategory, type DiscoverActivity } from "@/lib/discover";
import { getDiscoverPhoto, discoverPhotoUrl, discoverPhotoSource } from "@/lib/discover-photos";
import { destinationHref } from "@/lib/destination-detail";
import DestinationSaveButton from "./DestinationSaveButton";
import DiscoverHeader from "./DiscoverHeader";
import DiscoverDestinationMapView from "./DiscoverDestinationMapView";

export type DiscoverEntry = {
  id: string;
  name: string;
  location: string | null;
  author: string;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
  people: number;
  itemCount: number;
  baseWeightG: number | null;
  unknownBaseWeights: number;
  dayCount: number;
  distanceKm: number | null;
  elevationGainM: number | null;
  partialDistance: boolean;
  saves: number;
  saved: boolean;
};

type Props = {
  entries: DiscoverEntry[];
  destinations: Destination[];
  mapDestinations?: Destination[];
  unmappedDestinations?: Pick<Destination, "id" | "name" | "park" | "region" | "difficulty">[];
  featuredDestinations: Destination[];
  regions: string[];
  filters: DiscoverSearch;
  total: number;
  totalPages: number;
  signedIn: boolean;
  savedDestinationIds?: readonly string[];
};

function SubmitButton({ icon, children, className = "" }: {
  icon: "bookmark" | "copy";
  children: ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();
  const Icon = icon === "bookmark" ? Bookmark : Copy;
  return <button type="submit" disabled={pending} className={`${className} inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition disabled:cursor-wait disabled:opacity-60 sm:text-sm`}>
    <Icon size={15} aria-hidden="true" />{pending ? "Working…" : children}
  </button>;
}

function fmtDate(value: string | null): string {
  if (!value) return "Dates not set";
  return new Date(value).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

function fmtDistance(value: number | null): string {
  return value === null ? "Not planned" : `${Number(value.toFixed(1))} km`;
}

function EntryCard({ entry, view, signedIn }: { entry: DiscoverEntry; view: DiscoverSearch["view"]; signedIn: boolean }) {
  const isPack = view === "packs" || (view === "saved" && !entry.dayCount);
  return <article className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-emerald-800">
          <span className="rounded-md bg-emerald-50 px-2 py-1">{isPack ? "Pack list" : "Trip plan"}</span>
          {entry.dayCount > 0 && <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-600">{entry.dayCount} {entry.dayCount === 1 ? "day" : "days"}</span>}
        </div>
        <Link href={`/build/${encodeURIComponent(entry.id)}${isPack ? "" : "?tab=trip"}`} className="mt-3 block break-words text-lg font-bold text-slate-950 hover:text-green-800">
          {entry.name}
        </Link>
        <p className="mt-2 flex items-start gap-1.5 text-sm text-slate-600"><MapPin size={15} className="mt-0.5 shrink-0 text-emerald-700" aria-hidden="true" />{entry.location || "Location not specified"}</p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1 text-xs text-slate-500" title="Number of saves"><Bookmark size={13} aria-hidden="true" />{entry.saves}</span>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-2">
      <div className="rounded-xl bg-slate-50 p-3"><span className="flex items-center gap-1.5 text-xs text-slate-500"><Footprints size={13} />Distance</span><p className="mt-1 text-sm font-bold text-slate-900">{fmtDistance(entry.distanceKm)}{entry.partialDistance ? "*" : ""}</p></div>
      <div className="rounded-xl bg-slate-50 p-3"><span className="flex items-center gap-1.5 text-xs text-slate-500"><Mountain size={13} />Elevation gain</span><p className="mt-1 text-sm font-bold text-slate-900">{entry.elevationGainM === null ? "Not planned" : `${entry.elevationGainM.toLocaleString("en-CA")} m`}</p></div>
      <div className="rounded-xl bg-slate-50 p-3"><span className="flex items-center gap-1.5 text-xs text-slate-500"><Backpack size={13} />Gear</span><p className="mt-1 text-sm font-bold text-slate-900">{entry.itemCount} {entry.itemCount === 1 ? "item" : "items"}</p></div>
      <div className="rounded-xl bg-slate-50 p-3"><span className="flex items-center gap-1.5 text-xs text-slate-500"><Backpack size={13} />Base weight</span><p className="mt-1 text-sm font-bold text-slate-900">{entry.baseWeightG === null ? "Unknown" : `${(entry.baseWeightG / 1000).toFixed(2)} kg`}{entry.unknownBaseWeights ? "*" : ""}</p></div>
    </div>
    <div className="mt-4 space-y-1.5 text-xs text-slate-500">
      <p className="flex items-center gap-1.5"><CalendarDays size={13} aria-hidden="true" />{fmtDate(entry.startDate)}{entry.endDate && entry.endDate !== entry.startDate ? ` – ${fmtDate(entry.endDate)}` : ""}</p>
      <p>Shared by {entry.author} · Added {fmtDate(entry.createdAt)} · Updated {fmtDate(entry.updatedAt)}</p>
      {entry.partialDistance && <p>* Distance includes only days with planned distances.</p>}
      {entry.unknownBaseWeights > 0 && <p>* Weight is missing for {entry.unknownBaseWeights} base items.</p>}
    </div>
    <div className="mt-auto flex flex-wrap gap-2 border-t border-slate-100 pt-4 sm:flex-nowrap">
      <Link href={`/build/${encodeURIComponent(entry.id)}${isPack ? "" : "?tab=trip"}`} className="inline-flex min-h-10 flex-1 items-center justify-center gap-1 rounded-xl bg-green-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-800 sm:text-sm">Open <ArrowRight size={15} aria-hidden="true" /></Link>
      <form action={changeSavedBuild}>
        <input type="hidden" name="buildId" value={entry.id} />
        <input type="hidden" name="intent" value={entry.saved ? "unsave" : "save"} />
        <SubmitButton icon="bookmark" className={`border ${entry.saved ? "border-emerald-700 bg-emerald-50 text-emerald-900 hover:bg-emerald-100" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}>{entry.saved ? "Saved" : "Save"}</SubmitButton>
      </form>
      <form action={copyPublicBuild}>
        <input type="hidden" name="buildId" value={entry.id} />
        <SubmitButton icon="copy" className="border border-slate-200 text-slate-700 hover:bg-slate-50">Copy</SubmitButton>
      </form>
    </div>
    {!signedIn && <p className="mt-2 text-xs text-slate-500">Sign in to save or copy this plan.</p>}
  </article>;
}

function isHttpUrl(value: string | null): value is string {
  if (!value) return false;
  try { return ["https:", "http:"].includes(new URL(value).protocol); }
  catch { return false; }
}
const formatKind = (kind?: string) => (kind ?? "campground").replaceAll("-", " ").replace(/\b\w/g, c => c.toUpperCase());
const difficultyStyle: Record<Destination["difficulty"], string> = {
  easy: "bg-emerald-50 text-emerald-800", moderate: "bg-amber-50 text-amber-800", hard: "bg-rose-50 text-rose-800",
};

function DestinationVisual({ destination, large = false }: { destination: Destination; large?: boolean }) {
  const [failed, setFailed] = useState(false);
  const photo = getDiscoverPhoto(destination);
  const fallbackIcon = destination.kind === "waterfall" || destination.kind === "coastal" ? Waves : destination.kind === "trail" ? Route : destination.kind === "campground" ? Tent : Mountain;
  const FallbackIcon = fallbackIcon;
  return <div className={`relative isolate w-full overflow-hidden bg-gradient-to-br from-sky-200 via-emerald-100 to-green-800 ${large ? "aspect-[1.5/1] min-h-[200px] sm:aspect-[1.65/1]" : "aspect-[1.62/1]"}`}>
    {photo && !failed ? <>
      {/* Remote Commons images use a browser URL; no Next image-host configuration needed. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={discoverPhotoUrl(photo)}
        alt={photo.representative ? `Representative scenery in ${destination.park}: ${photo.description}` : photo.description}
        loading={large ? "eager" : "lazy"}
        onError={() => setFailed(true)}
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
      />
      <a href={discoverPhotoSource(photo)} target="_blank" rel="noopener noreferrer" title={`${photo.description} by ${photo.author}, ${photo.license}${photo.representative ? "; representative park view" : ""}`} className="absolute bottom-2 right-2 z-10 rounded-md bg-slate-950/60 px-2 py-1 text-[10px] font-medium text-white/90 backdrop-blur-sm hover:bg-slate-950/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
        {photo.representative ? "Area photo · " : "Photo · "}{photo.author} · {photo.license}
      </a>
    </> : <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-green-950/50">
      <div className="absolute bottom-[-58%] left-[-20%] h-[110%] w-[95%] rotate-[-29deg] rounded-[50%] bg-green-900/15" aria-hidden="true" />
      <div className="absolute bottom-[-66%] right-[-24%] h-[115%] w-[95%] rotate-[27deg] rounded-[50%] bg-emerald-950/20" aria-hidden="true" />
      <FallbackIcon className="relative h-11 w-11 text-green-900/50" strokeWidth={1.5} aria-hidden="true" />
      <span className="relative text-[11px] font-medium">Photo not available</span>
    </div>}
  </div>;
}

function DestinationMeta({destination}: {destination: Destination}) {
  return <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-medium text-slate-600">
    {destination.distanceKm !== null && <span className="inline-flex items-center gap-1.5"><Footprints size={14} className="text-emerald-700" aria-hidden="true" />{Number(destination.distanceKm.toFixed(1))} km{destination.distanceType ? ` ${destination.distanceType === "round-trip" ? "return" : destination.distanceType}` : " listed"}</span>}
    {destination.elevationGainM !== null && <span className="inline-flex items-center gap-1.5"><Mountain size={14} className="text-emerald-700" aria-hidden="true" />{destination.elevationGainM.toLocaleString("en-CA")} m gain</span>}
  </div>;
}

function DestinationCard({destination, saved, signedIn}: {destination: Destination; saved: boolean; signedIn: boolean}) {
  return <article className="group flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg">
    <DestinationVisual destination={destination} />
    <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
        <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-700">{formatKind(destination.kind)}</span>
        <span className={`rounded-md px-2 py-1 ${difficultyStyle[destination.difficulty]}`}>{destination.difficulty[0].toUpperCase() + destination.difficulty.slice(1)}</span>
      </div>
      <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-snug text-slate-950"><Link href={destinationHref(destination.id)} className="hover:text-green-800 focus-visible:underline">{destination.name}</Link></h3>
      <p className="mt-1.5 flex items-start gap-1.5 text-xs text-slate-500"><MapPin size={14} className="mt-0.5 shrink-0 text-emerald-700" aria-hidden="true" />{destination.park} · {destination.region}</p>
      <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-slate-600">{destination.summary}</p>
      <div className="mt-3"><DestinationMeta destination={destination}/></div>
      <div className="mt-auto flex items-center gap-2 pt-5">
        <Link href={`${destinationHref(destination.id)}#plan-trip-heading`} className="inline-flex min-h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-green-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-green-800 sm:text-sm">Plan this destination <ArrowRight size={15} aria-hidden="true" /></Link>
        <DestinationSaveButton destinationId={destination.id} saved={saved} signedIn={signedIn} compact/>
        {isHttpUrl(destination.sourceUrl) && <a href={destination.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Official information for ${destination.name}`} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800"><ExternalLink size={16} aria-hidden="true" /></a>}
      </div>
    </div>
  </article>;
}

function SpotlightCard({destination, saved, signedIn}: {destination: Destination; saved: boolean; signedIn: boolean}) {
  return <article className="group relative isolate flex flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
    <DestinationVisual destination={destination} large />
    <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 rounded-md bg-green-50 px-2 py-1 text-[11px] font-bold text-green-800"><Sparkles size={12} /> Featured</span>
        <span className="text-xs font-semibold text-slate-500">{formatKind(destination.kind)}</span>
      </div>
      <h3 className="mt-2 text-xl font-bold text-slate-950"><Link href={destinationHref(destination.id)} className="hover:text-green-800 focus-visible:underline">{destination.name}</Link></h3>
      <p className="mt-1 flex items-start gap-1 text-xs text-slate-500"><MapPin size={13} className="mt-0.5 shrink-0" />{destination.region} · {destination.park}</p>
      <div className="mt-3"><DestinationMeta destination={destination}/></div>
      <div className="mt-auto flex gap-2 pt-4">
        <Link href={`${destinationHref(destination.id)}#plan-trip-heading`} className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-green-900 px-3 py-2 text-sm font-semibold text-white hover:bg-green-800">Plan this destination <ArrowRight size={14} aria-hidden="true" /></Link>
        <DestinationSaveButton destinationId={destination.id} saved={saved} signedIn={signedIn} compact/>
      </div>
    </div>
  </article>;
}

const activities: {value: DiscoverActivity; label: string; Icon: typeof Compass}[] = [
  {value: "all", label: "Everything", Icon: Compass},
  {value: "hiking", label: "Hiking", Icon: Footprints},
  {value: "backpacking", label: "Backpacking", Icon: Backpack},
  {value: "camping", label: "Camping", Icon: Tent},
  {value: "paddling", label: "Paddling", Icon: Waves},
];
const categories: {value: DiscoverCategory; label: string}[] = [
  {value: "all", label: "All places"}, {value: "trail", label: "Trails"}, {value: "lake", label: "Lakes"},
  {value: "summit", label: "Summits"}, {value: "waterfall", label: "Waterfalls"},
  {value: "campground", label: "Campgrounds"}, {value: "coastal", label: "Coastal"},
  {value: "viewpoint", label: "Viewpoints"}, {value: "other", label: "Other places"},
];
const popularRegions = ["Lower Mainland", "Sea to Sky", "Vancouver Island", "Canadian Rockies"] as const;

export default function DiscoverLanding({entries, destinations, mapDestinations = [], unmappedDestinations = [], featuredDestinations, regions, filters, total, totalPages, signedIn, savedDestinationIds = []}: Props) {
  const savedDestinations = new Set(savedDestinationIds);
  const [q, setQ] = useState(filters.q);
  const [location, setLocation] = useState(filters.location);
  const [sort, setSort] = useState(filters.sort);
  const [region, setRegion] = useState(filters.region);
  const [difficulty, setDifficulty] = useState(filters.difficulty);
  const [category, setCategory] = useState(filters.category);
  const searchRef = useRef<HTMLInputElement>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  useEffect(() => {
    setQ(filters.q); setLocation(filters.location); setSort(filters.sort); setRegion(filters.region);
    setDifficulty(filters.difficulty); setCategory(filters.category);
  }, [filters.q, filters.location, filters.sort, filters.region, filters.difficulty, filters.category]);
  const isDestinationView = filters.view === "destinations";
  const isMapView = isDestinationView && filters.display === "map";
  const defaultSort = isDestinationView ? "popular" : "recent";
  const clear = discoverUrl(filters, {q: "", location: "", region: "", difficulty: "all", activity: "all", category: "all", sort: defaultSort, page: 1});
  const hasFilters = Boolean(filters.q || filters.location || filters.region || filters.difficulty !== "all" || filters.activity !== "all" || filters.category !== "all" || filters.sort !== defaultSort);
  const searchTitle = isDestinationView ? "Explore BC destinations" : filters.view === "saved" ? "Your saved plans" : filters.view === "packs" ? "Public gear builds" : "Public trips";

  return <main className="min-h-screen bg-[#f6f8f7] pb-20 text-slate-900">
    <DiscoverHeader active="search" back/>
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <div><h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Search destinations</h1><p className="mt-1 text-sm text-slate-600">Filter the complete BC catalog by region, activity, and recorded trail details.</p></div>
        <Link href="/discover/find" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 text-sm font-semibold text-green-900 transition hover:bg-green-100"><Sparkles size={16}/> Help me choose <ArrowRight size={15}/></Link>
      </div>
    </div>
    <div className="mx-auto max-w-screen-2xl px-4 pt-7 sm:px-6 lg:px-8">
      {isDestinationView && featuredDestinations.length > 0 && <section aria-labelledby="featured-heading" className="mb-9">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-xs font-medium text-green-800">British Columbia</p><h2 id="featured-heading" className="mt-1 text-2xl font-bold sm:text-[28px]">Featured destinations</h2><p className="mt-1 text-sm text-slate-500">A few places to start exploring.</p></div>
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-green-900">{total} BC destinations</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">{featuredDestinations.map(destination => <SpotlightCard key={destination.id} destination={destination} saved={savedDestinations.has(destination.id)} signedIn={signedIn}/>)}</div>
      </section>}

      {isDestinationView && <section aria-label="Browse by activity" className="mb-6">
        <div className="mb-3 flex items-center justify-between gap-3"><h2 className="text-sm font-bold text-slate-900 sm:text-base">What do you want to explore?</h2><span className="hidden text-xs text-slate-500 sm:inline">Choose an activity</span></div>
        <div className="flex gap-2 overflow-x-auto pb-1">{activities.map(({value, label, Icon}) => <Link key={value} href={discoverUrl(filters, {activity: value, page: 1})} aria-current={filters.activity === value ? "true" : undefined} className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800 ${filters.activity === value ? "border-green-900 bg-green-900 text-white shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"}`}><Icon size={16} aria-hidden="true"/>{label}</Link>)}</div>
      </section>}

      <section aria-label="Search and filters">
        <form method="GET" action="/discover/search" role="search" className={`grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 ${isDestinationView ? "lg:grid-cols-[minmax(220px,1fr)_repeat(4,minmax(125px,auto))_auto]" : "md:grid-cols-[minmax(0,1fr)_minmax(0,0.65fr)_auto_auto]"}`}>
          {isDestinationView && <input type="hidden" name="activity" value={filters.activity}/>}
          {isMapView && <input type="hidden" name="display" value="map"/>} 
          <label className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 px-3 focus-within:border-green-700 focus-within:ring-1 focus-within:ring-green-700"><Search size={17} className="shrink-0 text-slate-500" aria-hidden="true"/><span className="sr-only">Search names and locations</span><input ref={searchRef} name="q" value={q} onChange={e=>setQ(e.target.value)} maxLength={100} type="search" placeholder={isDestinationView ? "Search parks, trails, lakes…" : "Search trips, builds, places…"} className="h-11 w-full min-w-0 bg-transparent text-sm outline-none" /></label>
          {isDestinationView ? <>
            <label className="flex min-w-0 items-center rounded-xl border border-slate-200 px-3"><span className="sr-only">Destination category</span><select name="category" value={category} onChange={e=>setCategory(e.target.value as DiscoverCategory)} className="h-11 w-full min-w-0 bg-white text-sm outline-none">{categories.map(item=><option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
            <label className="flex min-w-0 items-center rounded-xl border border-slate-200 px-3"><span className="sr-only">Region</span><select name="region" value={region} onChange={e=>setRegion(e.target.value)} className="h-11 w-full min-w-0 bg-white text-sm outline-none"><option value="">All regions</option>{regions.map(value=><option key={value} value={value}>{value}</option>)}</select></label>
            <label className="flex min-w-0 items-center rounded-xl border border-slate-200 px-3"><span className="sr-only">Difficulty</span><select name="difficulty" value={difficulty} onChange={e=>setDifficulty(e.target.value as DiscoverSearch["difficulty"])} className="h-11 w-full min-w-0 bg-white text-sm outline-none"><option value="all">Any difficulty</option><option value="easy">Easy</option><option value="moderate">Moderate</option><option value="hard">Hard</option></select></label>
          </> : <label className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 px-3 focus-within:border-green-700"><MapPin size={17} className="shrink-0 text-slate-500" aria-hidden="true"/><span className="sr-only">Filter by location</span><input name="location" value={location} onChange={e=>setLocation(e.target.value)} maxLength={100} placeholder="Location contains…" className="h-11 min-w-0 w-full bg-transparent text-sm outline-none" /></label>}
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3"><SlidersHorizontal size={16} className="shrink-0 text-slate-500" aria-hidden="true"/><span className="sr-only">Sort results</span><select name="sort" value={sort} onChange={e=>setSort(e.target.value as DiscoverSearch["sort"])} className="h-11 w-full min-w-0 bg-white text-sm outline-none">{isDestinationView ? <><option value="popular">Featured first</option><option value="name">Name A–Z</option><option value="distance">Shortest distance</option></> : <><option value="recent">Newest</option><option value="updated">Recently updated</option><option value="popular">Most saved</option><option value="name">Name A–Z</option></>}</select></label>
          <button type="submit" className="min-h-11 rounded-xl bg-green-900 px-5 text-sm font-semibold text-white transition hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800">Search</button>
        </form>
      </section>

      {isDestinationView && <nav aria-label="Quick region filters" className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="mr-1 font-semibold text-slate-500">Popular regions</span>
        {popularRegions.filter(value => regions.includes(value)).map(value=><Link key={value} href={discoverUrl(filters, {region: filters.region === value ? "" : value, page: 1})} className={`rounded-full border px-3 py-1.5 font-semibold transition ${filters.region === value ? "border-emerald-700 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-green-900"}`}>{value}<ChevronRight className="ml-1 inline h-3 w-3" aria-hidden="true"/></Link>)}
      </nav>}

      <div className="mt-8 flex flex-wrap items-end justify-between gap-3">
        <div><h2 className="text-xl font-bold">{isDestinationView ? (hasFilters ? "Matching destinations" : "All destinations") : searchTitle}</h2><p className="mt-1 text-sm text-slate-500">{total} {total === 1 ? "result" : "results"}{!isMapView && total > 0 && ` · Page ${filters.page} of ${totalPages}`}</p></div>
        <div className="flex flex-wrap items-center gap-3">
          {hasFilters && <Link href={clear} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"><FilterX size={16} aria-hidden="true"/>Clear filters</Link>}
          {isDestinationView && <nav aria-label="Search result view" className="inline-flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <Link href={discoverUrl(filters, {display: "grid", page: 1})} aria-current={!isMapView ? "page" : undefined} className={`inline-flex min-h-9 items-center gap-2 rounded-lg px-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-900 ${!isMapView ? "bg-green-900 text-white shadow-sm" : "text-slate-600 hover:bg-emerald-50"}`}><LayoutGrid size={16} aria-hidden="true"/>Grid</Link>
            <Link href={discoverUrl(filters, {display: "map", page: 1})} aria-current={isMapView ? "page" : undefined} className={`inline-flex min-h-9 items-center gap-2 rounded-lg px-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-900 ${isMapView ? "bg-green-900 text-white shadow-sm" : "text-slate-600 hover:bg-emerald-50"}`}><MapIcon size={16} aria-hidden="true"/>Map</Link>
          </nav>}
        </div>
      </div>

      {isMapView && total > 0 ? <DiscoverDestinationMapView mapped={mapDestinations} unmapped={unmappedDestinations} /> : (isDestinationView ? destinations.length : entries.length) > 0 ? <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{isDestinationView ? destinations.map(destination=><DestinationCard key={destination.id} destination={destination} saved={savedDestinations.has(destination.id)} signedIn={signedIn}/>) : entries.map(entry=><EntryCard key={entry.id} entry={entry} view={filters.view} signedIn={signedIn}/>)}</div> : <section className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
        <Compass size={30} className="mx-auto text-slate-400" aria-hidden="true"/>
        <h3 className="mt-3 text-lg font-bold">{filters.view === "saved" && !signedIn ? "Sign in to see saved plans" : hasFilters ? "No results match those filters" : filters.view === "saved" ? "Nothing saved yet" : isDestinationView ? "No destinations available" : "No public plans yet"}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{filters.view === "saved" && !signedIn ? "Your saved trips and gear lists appear here once you sign in." : hasFilters ? "Try another activity, region, or a broader search." : filters.view === "saved" ? "Bookmark a public trip or build and it will appear here." : isDestinationView ? "The destination catalog is empty." : "Only builds explicitly shared publicly appear here. Create a trip or pack list to get started."}</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {hasFilters && <Link href={clear} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50">Clear filters</Link>}
          {filters.view === "saved" && !signedIn ? <Link href="/api/auth/signin?callbackUrl=%2Fdiscover%2Fsaved" className="rounded-xl bg-green-900 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800">Sign in</Link> : <Link href="/discover/find" className="rounded-xl bg-green-900 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800">Find a destination</Link>}
        </div>
      </section>}

      {!isMapView && totalPages > 1 && <nav aria-label="Discover pages" className="mt-7 flex items-center justify-center gap-3">
        {filters.page > 1 && <Link href={discoverUrl(filters, {page: filters.page - 1})} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50">Previous</Link>}
        <span className="text-sm text-slate-500">{filters.page} / {totalPages}</span>
        {filters.page < totalPages && <Link href={discoverUrl(filters, {page: filters.page + 1})} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50">Next</Link>}
      </nav>}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5 text-xs text-slate-500">
        <p>Check current access, weather, and permits before heading out. Photos may represent the wider park, not a specific campsite.</p>
        <div className="flex items-center gap-3"><Link href="/profile/builds" className="font-semibold text-green-900 hover:underline">My builds</Link><button type="button" onClick={async()=>{
          try {await navigator.clipboard.writeText(window.location.href);setCopiedLink(true);window.setTimeout(()=>setCopiedLink(false),1800);}catch {searchRef.current?.focus();}
        }} className="inline-flex items-center gap-1 font-semibold text-green-900 hover:underline">{copiedLink?<Check size={13}/>:<Copy size={13}/>} {copiedLink?"Link copied":"Share this search"}</button></div>
      </div>
    </div>
  </main>;
}

