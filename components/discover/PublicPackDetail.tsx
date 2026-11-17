import Link from "next/link";
import {ArrowLeft, Backpack, CircleHelp, ClipboardCheck, Package, Scale, ShieldAlert, Users, Wallet} from "lucide-react";
import type {CompatibilityIssue} from "@/lib/compatibility";
import {categoryOf, formattedCad, formattedKg, summarizePack} from "@/lib/discover-packs";
import PackActions from "./PackActions";
import RelatedDiscover from "./RelatedDiscover";
import DiscoverSectionNav from "./DiscoverSectionNav";
import type {Destination} from "@/lib/destinations";
import {relatedDestinationHref,relatedTripHref,type RelatedPublicContent} from "@/lib/discover-related";

type GearItem = {
  id:string;quantity:number;isWorn:boolean;isConsumable:boolean;
  customCategory:string|null;gearNameSnapshot:string|null;weightSnapshot:number|null;priceSnapshot:number|null;
  gear:{id:string;name:string;description:string|null;weight_g:number|null;price_cad:number|null;
    brand:{name:string};category:{name:string}}|null;
};
export type PublicPackDetailData = {
  id:string;name:string;location:string|null;people:number;createdAt:Date;updatedAt:Date;
  author:string;items:GearItem[];saves:number;
};
function Metric({label,value,hint,Icon}:{label:string;value:string;hint?:string;Icon:typeof Backpack}) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex items-center gap-2 text-xs text-slate-500"><Icon size={15}/>{label}</div><p className="mt-2 text-xl font-bold text-slate-900">{value}</p>{hint&&<p className="mt-1 text-xs text-slate-500">{hint}</p>}</div>;
}
export default function PublicPackDetail({pack,issues,saved,signedIn,destination,hasTrip,related}:{pack:PublicPackDetailData;issues:CompatibilityIssue[];saved:boolean;signedIn:boolean;destination:Destination|null;hasTrip:boolean;related:RelatedPublicContent}) {
  const summary=summarizePack(pack.items);
  const categories=[...new Set(pack.items.map(item=>categoryOf(item)))].sort((a,b)=>a.localeCompare(b));
  const noteworthy=issues.filter(issue=>issue.severity==="error"||issue.severity==="warning");
  return <main className="min-h-screen bg-[#f6f8f7] pb-20 text-slate-900">
    <header className="bg-[#00802f] text-white"><div className="mx-auto max-w-6xl px-4 py-8 sm:px-6"><Link href="/discover/community?type=packs" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white"><ArrowLeft size={16}/>All community builds</Link><p className="mt-6 text-xs font-bold uppercase tracking-widest text-white/80">Public gear setup</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{pack.name}</h1><p className="mt-2 text-sm text-white/90">By {pack.author}{pack.location?` · ${pack.location}`:""} · {pack.people} {pack.people===1?"person":"people"}</p></div></header>
    <div className="mx-auto max-w-6xl space-y-7 px-4 pt-6 sm:px-6">
      <DiscoverSectionNav active="packs" />
      <section aria-label="Build metrics" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric Icon={Scale} label="Base weight" value={formattedKg(summary.knownBaseG)+(summary.unknownBaseCount?"+*":"")} hint={summary.unknownBaseCount?`${summary.unknownBaseCount} base-weight value(s) missing`:"Excludes worn and consumable"}/>
        <Metric Icon={Wallet} label="Gear cost (CAD)" value={formattedCad(summary.knownCostCad)+(summary.unknownCostCount?"+*":"")} hint={summary.unknownCostCount?`${summary.unknownCostCount} price value(s) missing`:"Listed gear prices, not current quotes"}/>
        <Metric Icon={Backpack} label="Total recorded weight" value={formattedKg(summary.knownTotalG)+(summary.totalWeightG===null?"+*":"")} hint="Base + worn + consumables"/>
        <Metric Icon={Package} label="Gear inventory" value={`${summary.itemCount} items`} hint={`${summary.categoryCount} categories`}/>
      </section>
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <section><div className="flex items-center justify-between gap-3"><div><h2 className="text-xl font-bold">Gear list</h2><p className="mt-1 text-sm text-slate-600">Items are grouped by category. Counts reflect quantity, not distinct product models.</p></div></div>
            <div className="mt-4 space-y-4">{categories.map(category=>{
              const items=pack.items.filter(item=>categoryOf(item)===category);
              const sub=summarizePack(items);
              return <section key={category} className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3"><h3 className="font-bold">{category}</h3><p className="text-xs text-slate-500">{sub.itemCount} items · {formattedKg(sub.knownTotalG)}{sub.totalWeightG===null?"+*":""}</p></div><ul className="divide-y divide-slate-100">{items.map(item=>{
                const weight=item.gear?.weight_g??item.weightSnapshot;
                const price=item.gear?.price_cad??item.priceSnapshot;
                const name=item.gear?.name??item.gearNameSnapshot??"Custom item";
                return <li key={item.id} className="flex flex-wrap items-start justify-between gap-3 px-5 py-4"><div className="min-w-0 flex-1"><div className="font-semibold">{item.gear?<Link href={`/gear/${encodeURIComponent(item.gear.id)}`} className="text-green-900 hover:underline">{name}</Link>:name}</div>{item.gear?.brand.name&&<p className="mt-0.5 text-xs text-slate-500">{item.gear.brand.name}</p>}{item.gear?.description&&<p className="mt-1 line-clamp-2 text-xs text-slate-500">{item.gear.description}</p>}<p className="mt-1 text-xs text-slate-500">Qty {item.quantity}{item.isWorn?" · Worn":""}{item.isConsumable?" · Consumable":""}</p></div><div className="text-right text-xs text-slate-600"><p>{weight===null?"Weight unknown":`${(weight*item.quantity).toLocaleString("en-CA")} g`}</p><p className="mt-1">{price===null?"Price unknown":formattedCad(price*item.quantity)}</p></div></li>;
              })}</ul></section>;
            })}</div>
          </section>
          <RelatedDiscover related={related} title="More from this destination" />
          <section className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-2"><ClipboardCheck size={19} className="text-green-900"/><h2 className="text-lg font-bold">Gear compatibility notes</h2></div><p className="mt-2 text-sm text-slate-600">These are automated checks using the published build’s recorded gear and trip context, not a safety certification.</p>
            {noteworthy.length?<ul className="mt-4 space-y-3">{noteworthy.slice(0,10).map(issue=><li key={issue.id} className="rounded-xl border border-amber-100 bg-amber-50 p-3"><div className="flex items-center gap-2 text-sm font-semibold text-amber-900"><ShieldAlert size={16}/>{issue.category}</div><p className="mt-1 text-sm text-slate-800">{issue.message}</p></li>)}</ul>:<p className="mt-4 flex items-center gap-2 text-sm text-slate-600"><CircleHelp size={17}/>No flagged warnings from the available data. This is not a guarantee of readiness.</p>}
            {issues.length>noteworthy.length&&<p className="mt-3 text-xs text-slate-500">{issues.length-noteworthy.length} additional informational/unknown-data checks are not shown here. Examine the copied setup in Builder for fuller analysis.</p>}
          </section>
        </div>
        <aside className="space-y-4"><section className="rounded-2xl border border-slate-200 bg-white p-5"><h2 className="font-bold">Make it yours</h2><p className="mt-2 text-sm leading-6 text-slate-600">Save this setup or copy its gear into a private, editable build.</p><div className="mt-4"><PackActions id={pack.id} saved={saved} signedIn={signedIn}/></div><p className="mt-3 text-xs text-slate-500">{pack.saves} {pack.saves===1?"save":"saves"} · Updated {pack.updatedAt.toLocaleDateString("en-CA",{timeZone:"UTC"})}</p></section>
          {(destination||hasTrip)&&<section className="rounded-2xl border border-slate-200 bg-white p-5"><h2 className="font-bold">Connected trip &amp; destination</h2><div className="mt-3 flex flex-col items-start gap-3 text-sm font-semibold text-green-900">{hasTrip&&<Link href={relatedTripHref(pack.id)} className="hover:underline">View this build’s itinerary →</Link>}{destination&&<Link href={relatedDestinationHref(destination.id)} className="hover:underline">Explore {destination.name} →</Link>}</div><p className="mt-3 text-xs leading-5 text-slate-500">Links are available only when the public build has itinerary days or an exact catalog destination ID.</p></section>}
          <section className="rounded-2xl border border-slate-200 bg-white p-5"><h2 className="flex items-center gap-2 font-bold"><Users size={17}/>Build details</h2><dl className="mt-3 space-y-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-slate-500">People</dt><dd className="font-semibold">{pack.people}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Categories</dt><dd className="font-semibold">{summary.categoryCount}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Worn</dt><dd className="font-semibold">{formattedKg(summary.knownWornG)}{summary.unknownWornCount?"+*":""}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Consumables</dt><dd className="font-semibold">{formattedKg(summary.knownConsumableG)}{summary.unknownConsumableCount?"+*":""}</dd></div></dl></section>
          <p className="text-xs leading-5 text-slate-500">* Plus means missing values; totals show only known amounts. Published gear lists may not match what someone actually carries, and product prices can change.</p>
        </aside>
      </div>
    </div>
  </main>;
}
