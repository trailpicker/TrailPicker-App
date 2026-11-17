import Link from "next/link";
import { Bookmark, Compass, MapPin, Backpack, CalendarDays, Search, ArrowRight, Trash2 } from "lucide-react";
import { changeSavedBuild, changeSavedDestination } from "@/app/discover/actions";
import DiscoverHeader from "./DiscoverHeader";
import { filterSavedEntries, savedHref, savedUrl, type SavedEntry, type SavedSearch, type SavedType } from "@/lib/discover-saved";

const PAGE_SIZE = 12;
const tabs: { type: SavedType; name: string }[] = [
  {type:"all", name:"All saved"}, {type:"destinations",name:"Destinations"},
  {type:"trips",name:"Trips"}, {type:"packs",name:"Builds"},
];
const icons = {destination:MapPin,trip:CalendarDays,pack:Backpack};

export default function SavedLibrary({entries,search,signedIn}: {
  entries: SavedEntry[]; search:SavedSearch; signedIn:boolean;
}) {
  const filtered = filterSavedEntries(entries,search);
  const totalPages = Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
  const page = Math.min(search.page,totalPages);
  const shown = filtered.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE);
  return <main className="min-h-screen bg-[#f6f8f7] pb-20 text-slate-900">
    <DiscoverHeader active="saved" back/>
    <div className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-screen-xl items-center gap-3 px-4 py-6 sm:px-6"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800"><Bookmark size={21}/></span><div><h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Saved</h1><p className="mt-1 text-sm text-slate-600">Your bookmarked destinations, trips, and gear lists.</p></div></div></div>
    <div className="mx-auto max-w-screen-xl px-4 py-7 sm:px-6">
      {!signedIn ? <section className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
        <Bookmark className="mx-auto text-emerald-700" size={35} />
        <h2 className="mt-3 text-xl font-bold">Sign in to see your saved items</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">Bookmarks are kept with your account, so they remain available when you sign in again.</p>
        <Link href="/api/auth/signin?callbackUrl=%2Fdiscover%2Fsaved" className="mt-5 inline-flex rounded-xl bg-green-900 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800">Sign in</Link>
      </section> : <>
        <nav aria-label="Saved categories" className="flex flex-wrap gap-2">
          {tabs.map(tab => <Link key={tab.type} href={savedUrl(tab.type,search.q)}
            aria-current={search.type === tab.type ? "page" : undefined}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${search.type === tab.type ? "border-green-900 bg-green-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-emerald-50"}`}>
            {tab.name}{tab.type === "all" ? ` (${entries.length})` : ""}
          </Link>)}
        </nav>
        <form action="/discover/saved" method="get" className="mt-6 flex flex-wrap gap-2">
          <input type="hidden" name="savedType" value={search.type} />
          <label className="flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 sm:max-w-xl">
            <Search size={18} className="shrink-0 text-slate-400" aria-hidden="true" />
            <span className="sr-only">Search saved items</span>
            <input name="q" defaultValue={search.q} maxLength={100} placeholder="Search your saved items" className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none"/>
          </label>
          <button type="submit" className="rounded-xl bg-green-900 px-5 py-2 text-sm font-semibold text-white hover:bg-green-800">Search</button>
          {search.q && <Link href={savedUrl(search.type)} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Clear</Link>}
        </form>
        <div className="mt-5 flex items-center justify-between gap-3 text-sm text-slate-600"><p>{filtered.length} {filtered.length === 1 ? "saved item" : "saved items"}</p><p>Newest saved first</p></div>
        {shown.length ? <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map(item => {
            const Icon = icons[item.kind]; const href = savedHref(item,search.type);
            const typeLabel = item.kind === "destination" ? "Destination" : item.hasDays && item.hasItems ? "Trip + gear" : item.hasDays ? "Trip" : "Gear build";
            return <article key={`${item.kind}:${item.id}`} className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800"><Icon size={15} aria-hidden="true" />{typeLabel}</span>
              <h2 className="mt-3 break-words text-lg font-bold">{item.name}</h2>
              <p className="mt-1 text-sm text-slate-600">{item.subtitle}</p>
              <p className="mt-3 text-xs text-slate-500">Saved {new Date(item.savedAt).toLocaleDateString("en-CA",{timeZone:"UTC",year:"numeric",month:"short",day:"numeric"})}</p>
              {!item.available && <p className="mt-3 text-xs text-amber-800">This listing is no longer available. You can remove the bookmark.</p>}
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                {href && <Link href={href} className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-green-900 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800">Open <ArrowRight size={15}/></Link>}
                <form action={item.kind === "destination" ? changeSavedDestination : changeSavedBuild}>
                  <input type="hidden" name={item.kind === "destination" ? "destinationId" : "buildId"} value={item.id}/>
                  <input type="hidden" name="intent" value="unsave" />
                  <button type="submit" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-rose-50" aria-label={`Remove ${item.name} from Saved`}><Trash2 size={15}/> Remove</button>
                </form>
              </div>
            </article>;
          })}
        </div> : <section className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <Compass size={32} className="mx-auto text-emerald-700"/>
          <h2 className="mt-3 text-lg font-bold">{search.q ? "No matching saved items" : "Nothing saved here yet"}</h2>
          <p className="mt-2 text-sm text-slate-600">Explore destinations, public trips, and gear lists to add bookmarks.</p>
          <Link href="/discover/search" className="mt-4 inline-flex rounded-xl bg-green-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800">Explore destinations</Link>
        </section>}
        {totalPages > 1 && <nav aria-label="Saved pages" className="mt-7 flex items-center justify-center gap-3">
          {page > 1 && <Link href={savedUrl(search.type,search.q,page-1)} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold">Previous</Link>}
          <span className="text-sm text-slate-600">{page} / {totalPages}</span>
          {page < totalPages && <Link href={savedUrl(search.type,search.q,page+1)} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold">Next</Link>}
        </nav>}
      </>}
    </div>
  </main>;
}
