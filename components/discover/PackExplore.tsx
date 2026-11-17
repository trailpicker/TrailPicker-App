import Link from "next/link";
import {ArrowRight, Backpack, Bookmark, FilterX, MapPin, Package, Scale, Search, SlidersHorizontal, Tent, Users, Wallet} from "lucide-react";
import {PACK_CATEGORIES, formattedCad, formattedKg, packBrowseHref, packHref, type PackFilters, summarizePack} from "@/lib/discover-packs";
import PackActions from "./PackActions";
import DiscoverHeader from "./DiscoverHeader";

export type PublicPackCard = {
  id:string; name:string; location:string|null; author:string; people:number;
  updatedAt:string; saves:number; saved:boolean;
  summary: ReturnType<typeof summarizePack>;
};
function PackCard({pack,signedIn}:{pack:PublicPackCard;signedIn:boolean}) {
  return <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-200 hover:shadow-md">
    <div className="flex h-32 items-center justify-center bg-gradient-to-br from-slate-100 via-emerald-50 to-teal-200 text-emerald-800"><Backpack size={50} strokeWidth={1.3} aria-hidden="true"/></div>
    <div className="flex flex-1 flex-col p-5">
      <div className="flex items-start justify-between gap-2"><Link href={packHref(pack.id)} className="line-clamp-2 text-lg font-bold text-slate-900 hover:text-green-800">{pack.name}</Link><span className="inline-flex items-center gap-1 text-xs text-slate-500"><Bookmark size={13}/>{pack.saves}</span></div>
      <p className="mt-1 text-sm text-slate-600">By {pack.author}</p>
      {pack.location&&<p className="mt-2 flex items-start gap-1 text-sm text-slate-600"><MapPin size={15} className="mt-0.5 shrink-0"/>{pack.location}</p>}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-slate-50 p-3"><span className="flex items-center gap-1 text-xs text-slate-500"><Scale size={14}/>Base weight</span><strong className="mt-1 block text-sm">{pack.summary.baseWeightG===null?`${formattedKg(pack.summary.knownBaseG)}+*`:formattedKg(pack.summary.baseWeightG)}</strong></div>
        <div className="rounded-xl bg-slate-50 p-3"><span className="flex items-center gap-1 text-xs text-slate-500"><Wallet size={14}/>Cost (CAD)</span><strong className="mt-1 block text-sm">{pack.summary.costCad===null?`${formattedCad(pack.summary.knownCostCad)}+*`:formattedCad(pack.summary.costCad)}</strong></div>
      </div>
      <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600"><span className="inline-flex items-center gap-1"><Package size={14}/>{pack.summary.itemCount} gear items</span><span className="inline-flex items-center gap-1"><Users size={14}/>{pack.people} {pack.people===1?"person":"people"}</span></p>
      <div className="mt-3 flex flex-wrap gap-1.5">{pack.summary.categories.slice(0,4).map(([category])=><span key={category} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{category}</span>)}{pack.summary.categories.length>4&&<span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">+{pack.summary.categories.length-4}</span>}</div>
      <div className="mt-auto space-y-3 pt-4"><Link href={packHref(pack.id)} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-green-900 px-4 text-sm font-semibold text-white hover:bg-green-800">View gear list <ArrowRight size={16}/></Link><PackActions id={pack.id} saved={pack.saved} signedIn={signedIn}/></div>
    </div>
  </article>;
}
export default function PackExplore({packs,filters,total,totalPages,signedIn}:{packs:PublicPackCard[];filters:PackFilters;total:number;totalPages:number;signedIn:boolean}) {
  const active=Boolean(filters.q||filters.location||filters.people||filters.category||filters.minBaseKg!==null||filters.maxBaseKg!==null||filters.maxCostCad!==null||filters.sort!=="recent");
  return <main className="min-h-screen bg-[#f6f8f7] pb-20 text-slate-900">
    <DiscoverHeader active="community" back/>
    <div className="border-b border-slate-200 bg-white"><div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Community</h1><p className="mt-1 text-sm text-slate-600">Public itineraries and gear lists from other backpackers.</p>
      <nav aria-label="Community content type" className="mt-4 flex flex-wrap gap-2"><Link href="/discover/community" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50"><Tent size={16}/> Trips</Link><Link href="/discover/community?type=packs" aria-current="page" className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-green-800 px-4 text-sm font-semibold text-white"><Backpack size={16}/> Gear lists</Link></nav>
    </div></div>
    <div className="mx-auto max-w-screen-2xl px-4 pt-7 sm:px-6 lg:px-8">
      <div className="mb-6"><h2 className="text-lg font-bold text-slate-900">Browse gear lists</h2><p className="mt-1 text-sm leading-6 text-slate-600">Compare recorded weights and prices, or copy a public setup to your Builder.</p></div>
      <form method="get" action="/discover/community" className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 xl:grid-cols-4">
        <input type="hidden" name="type" value="packs"/>
        <label className="text-xs font-semibold text-slate-600 sm:col-span-2"><span className="mb-1 flex items-center gap-1"><Search size={14}/>Search builds</span><input name="q" type="search" maxLength={100} defaultValue={filters.q} placeholder="Build name or location" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-emerald-700"/></label>
        <label className="text-xs font-semibold text-slate-600"><span className="mb-1 block">Location contains</span><input name="location" maxLength={100} defaultValue={filters.location} placeholder="e.g. Garibaldi" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-emerald-700"/></label>
        <label className="text-xs font-semibold text-slate-600"><span className="mb-1 flex items-center gap-1"><SlidersHorizontal size={14}/>Sort</span><select name="sort" defaultValue={filters.sort} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal"><option value="recent">Newest</option><option value="updated">Recently updated</option><option value="popular">Most saved</option><option value="name">Name A–Z</option><option value="lightest">Lightest base weight</option><option value="cheapest">Lowest recorded cost</option></select></label>
        <label className="text-xs font-semibold text-slate-600"><span className="mb-1 block">Gear category</span><select name="packCategory" defaultValue={filters.category} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal"><option value="">All categories</option>{PACK_CATEGORIES.map(category=><option key={category} value={category}>{category}</option>)}</select></label>
        <label className="text-xs font-semibold text-slate-600"><span className="mb-1 block">People</span><select name="packPeople" defaultValue={filters.people??""} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal"><option value="">Any</option>{[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n}</option>)}</select></label>
        <label className="text-xs font-semibold text-slate-600"><span className="mb-1 block">Min base weight (kg)</span><input name="minBaseKg" inputMode="decimal" type="number" min={0} max={50} step="0.01" defaultValue={filters.minBaseKg??""} placeholder="Any" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal"/></label>
        <label className="text-xs font-semibold text-slate-600"><span className="mb-1 block">Max base weight (kg)</span><input name="maxBaseKg" inputMode="decimal" type="number" min={0} max={50} step="0.01" defaultValue={filters.maxBaseKg??""} placeholder="Any" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal"/></label>
        <label className="text-xs font-semibold text-slate-600"><span className="mb-1 block">Max recorded cost (CAD)</span><input name="maxCostCad" inputMode="decimal" type="number" min={0} max={100000} step="0.01" defaultValue={filters.maxCostCad??""} placeholder="Any" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal"/></label>
        <div className="flex items-end gap-2"><button type="submit" className="min-h-11 flex-1 rounded-xl bg-green-900 px-5 text-sm font-semibold text-white hover:bg-green-800">Apply filters</button>{active&&<Link href="/discover/community?type=packs" aria-label="Clear filters" className="inline-flex min-h-11 items-center rounded-xl border border-slate-200 px-3 text-green-900 hover:bg-emerald-50"><FilterX size={18}/></Link>}</div>
      </form>
      <p className="mt-3 text-xs text-slate-500">Weight filters use complete base-weight data; budget filters require all item prices. Unknown values are excluded from those filters and sorted last.</p>
      <div className="mt-7 flex flex-wrap items-end justify-between gap-3"><div><h3 className="text-xl font-bold">{active?"Matching builds":"Public gear builds"}</h3><p className="mt-1 text-sm text-slate-500">{total} {total===1?"build":"builds"}{total>0?` · Page ${filters.page} of ${totalPages}`:""}</p></div></div>
      {packs.length?<div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{packs.map(pack=><PackCard key={pack.id} pack={pack} signedIn={signedIn}/>)}</div>:<div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center"><Backpack size={32} className="mx-auto text-slate-400"/><h3 className="mt-3 text-lg font-semibold">{active?"No builds match those filters":"No public gear builds yet"}</h3><p className="mt-2 text-sm text-slate-600">{active?"Try fewer restrictions or a different search.":"Builds appear when people choose to publish a gear list."}</p><Link href={active?"/discover/community?type=packs":"/build"} className="mt-5 inline-flex min-h-10 items-center rounded-xl bg-green-900 px-4 text-sm font-semibold text-white">{active?"Clear filters":"Create a build"}</Link></div>}
      {totalPages>1&&<nav aria-label="Build pages" className="mt-8 flex items-center justify-center gap-3">{filters.page>1&&<Link className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold" href={packBrowseHref(filters,{page:filters.page-1})}>Previous</Link>}<span className="text-sm text-slate-500">{filters.page} / {totalPages}</span>{filters.page<totalPages&&<Link className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold" href={packBrowseHref(filters,{page:filters.page+1})}>Next</Link>}</nav>}
      <p className="mt-8 border-t border-slate-200 pt-5 text-xs text-slate-500">Community gear lists contain user-entered data. Gear specs, prices, compatibility findings and completeness should be independently checked before any trip. * A plus sign means one or more values are unknown; displayed totals are known amounts only.</p>
    </div>
  </main>;
}
