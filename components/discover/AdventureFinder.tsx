import Link from "next/link";
import type {ReactNode} from "react";
import {ArrowRight, Backpack, Check, Compass, Footprints, Info, MapPin, Mountain, Search, Sparkles, Tent, WandSparkles, Waves} from "lucide-react";
import type {Destination} from "@/lib/destinations";
import {destinationHref} from "@/lib/destination-detail";
import {getDiscoverPhoto,discoverPhotoSource,discoverPhotoUrl} from "@/lib/discover-photos";
import {SCENERY_LABELS,type Activity,type Scenery,type FinderPreferences,type FinderMatch} from "@/lib/discover-finder";
import SceneryIcon from "./SceneryIcon";
import DiscoverHeader from "./DiscoverHeader";

const inputClass="mt-2 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10";
function RadioTile({name,value,title,desc,selected}: {name:string;value:string;title:string;desc?:string;selected:boolean}) {
  return <label className="cursor-pointer"><input type="radio" name={name} value={value} defaultChecked={selected} className="peer sr-only"/>
    <span className="flex h-full min-h-[66px] flex-col justify-center rounded-xl border border-slate-200 bg-white p-3.5 transition hover:border-emerald-300 peer-checked:border-emerald-800 peer-checked:bg-emerald-50 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-green-800">
      <span className="text-sm font-semibold text-slate-900">{title}</span>{desc&&<span className="mt-0.5 text-xs leading-5 text-slate-600">{desc}</span>}
    </span></label>;
}
const activities: {value:Activity;label:string;Icon:typeof Compass}[] = [
  {value:"any",label:"Everything",Icon:Compass},
  {value:"hiking",label:"Hiking",Icon:Footprints},
  {value:"backpacking",label:"Backpacking",Icon:Backpack},
  {value:"camping",label:"Camping",Icon:Tent},
  {value:"paddling",label:"Paddling",Icon:Waves},
];
function ActivityTile({value,label,Icon,selected}:{value:Activity;label:string;Icon:typeof Compass;selected:boolean}){
  return <label className="cursor-pointer"><input type="radio" name="activity" value={value} defaultChecked={selected} className="peer sr-only"/>
    <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 peer-checked:border-green-900 peer-checked:bg-green-900 peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-green-800">
      <Icon size={16} aria-hidden="true"/>{label}
    </span></label>;
}
function SceneryTile({scene,selected}:{scene:Scenery;selected:boolean}){
  return <label className="cursor-pointer"><input type="radio" name="scenery" value={scene} defaultChecked={selected} className="peer sr-only"/>
    <span className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 peer-checked:border-green-900 peer-checked:bg-emerald-50 peer-checked:text-green-900 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-green-800">
      <SceneryIcon scene={scene} className="h-4 w-4 shrink-0"/>
      <span>{SCENERY_LABELS[scene]}</span>
    </span></label>;
}
function Field({label,children,hint}:{label:string;children:ReactNode;hint?:string}){
  return <label className="block text-sm font-semibold text-slate-800">{label}{children}{hint&&<span className="mt-1.5 block text-xs font-normal leading-5 text-slate-500">{hint}</span>}</label>;
}
function GroupHeading({title,summary}:{title:string;summary:string}){
  return <header className="mb-5"><h2 className="text-lg font-bold text-slate-900">{title}</h2><p className="mt-0.5 text-xs leading-5 text-slate-500">{summary}</p></header>;
}
function ResultVisual({destination}: {destination:Destination}) {
  const photo=getDiscoverPhoto(destination);
  return <div className="relative aspect-[1.5/1] overflow-hidden bg-gradient-to-br from-teal-100 via-emerald-300 to-emerald-950 sm:aspect-auto sm:min-h-[225px]">
    {photo ? <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={discoverPhotoUrl(photo)} alt={photo.representative?`Representative view of ${destination.park}`:photo.description} loading="lazy" referrerPolicy="no-referrer" className="absolute inset-0 h-full w-full object-cover" />
      <a href={discoverPhotoSource(photo)} target="_blank" rel="noopener noreferrer" className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-1 text-[10px] text-white">{photo.representative?"Area photo":"Photo"} · {photo.author} · {photo.license}</a>
    </> : <div className="flex h-full items-center justify-center text-emerald-950/50"><Mountain size={54} strokeWidth={1.2}/></div>}
  </div>;
}
function MatchCard({match,index}:{match:FinderMatch;index:number}) {
  const d=match.destination;
  return <article className="grid overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
    <ResultVisual destination={d}/>
    <div className="flex flex-col p-5 sm:p-6">
      <p className="text-xs font-semibold text-green-800">Match {index+1} · {d.region}</p>
      <h3 className="mt-2 text-xl font-bold"><Link href={destinationHref(d.id)} className="hover:text-green-800">{d.name}</Link></h3>
      <p className="mt-1 flex items-center gap-1 text-xs text-slate-600"><MapPin size={13}/>{d.park}</p>
      <div className="mt-4 flex flex-wrap gap-2"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize">{d.difficulty}</span><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold">{d.distanceKm===null?"Distance unknown":`${d.distanceKm} km listed distance`}</span></div>
      <div className="mt-4"><p className="text-xs font-bold text-slate-800">Why it fits</p>{match.reasons.length?<ul className="mt-2 space-y-1.5">{match.reasons.map(reason=><li key={reason} className="flex gap-2 text-xs leading-5 text-slate-600"><Check className="mt-0.5 shrink-0 text-emerald-700" size={14}/>{reason}</li>)}</ul>:<p className="mt-2 text-xs leading-5 text-slate-600">A catalog candidate. Add preferences for a closer match.</p>}</div>
      {match.cautions.length>0&&<p className="mt-3 flex gap-1.5 text-xs leading-5 text-amber-800"><Info size={14} className="mt-0.5 shrink-0"/>Details to verify: {match.cautions.slice(0,3).join("; ").toLowerCase()}.</p>}
      <div className="mt-auto flex flex-wrap gap-2 pt-5"><Link href={`${destinationHref(d.id)}#plan-trip-heading`} className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-green-900 px-4 text-sm font-bold text-white hover:bg-green-800">Plan this destination <ArrowRight size={15}/></Link><Link href={destinationHref(d.id)} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-emerald-800 px-4 text-sm font-bold text-emerald-900 hover:bg-emerald-50">Details</Link></div>
    </div>
  </article>;
}
export default function AdventureFinder({preferences,matches,showResults}:{preferences:FinderPreferences;matches:FinderMatch[];showResults:boolean}) {
  return <main className="min-h-screen bg-[#f6f8f7] pb-24 text-slate-900">
    <DiscoverHeader active="find" back/>
    <section className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-4 py-6 sm:px-6">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800"><WandSparkles size={21}/></span>
      <div className="min-w-0 flex-1"><h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Find a trip</h1><p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">Get destination ideas in three quick choices, then refine them if you want.</p></div>
      <Link href="/discover/search" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"><Search size={16}/> Search instead</Link>
    </div></section>
    <div className="mx-auto max-w-5xl px-4 py-7 sm:px-6">
      <form method="get" action="/discover/find#matches" className="space-y-4">
        <input type="hidden" name="show" value="1"/>
        <section aria-labelledby="quick-preferences" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div><h2 id="quick-preferences" className="text-lg font-bold text-slate-900">Start with what interests you</h2><p className="mt-1 text-sm text-slate-600">Three quick choices. You can refine your matches whenever you want.</p></div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">Quick search</span>
          </div>
          <fieldset><legend className="mb-3 text-sm font-semibold">Activity</legend>
            <div className="flex flex-wrap gap-2">{activities.map(({value,label,Icon})=><ActivityTile key={value} value={value} label={label} Icon={Icon} selected={(preferences.activity??(preferences.style==="day"?"hiking":preferences.style==="overnight"?"backpacking":"any"))===value}/>)}</div>
          </fieldset>
          <div className="mt-6 max-w-md"><Field label="Region"><select name="area" defaultValue={preferences.area} className={inputClass}><option value="any">Anywhere in BC</option><option value="vancouver">Vancouver-area regions</option><option value="sea-to-sky">Sea to Sky</option><option value="island">Vancouver Island</option><option value="rockies">Canadian &amp; Northern Rockies</option><option value="interior">BC Interior</option><option value="north">Northern BC &amp; Haida Gwaii</option></select></Field></div>
          <fieldset className="mt-6"><legend className="mb-3 text-sm font-semibold">Scenery</legend><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {(["any","lakes","summits","forest","coast","meadows"] as const).map(scene=><SceneryTile key={scene} scene={scene} selected={preferences.scenery===scene}/>)}</div>
          </fieldset>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
            <p className="text-xs text-slate-500">No need to answer everything to get suggestions.</p>
            <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-900 px-5 text-sm font-bold text-white transition hover:bg-green-800"><Sparkles size={16}/> {showResults?"Update matches":"Show matching trips"} <ArrowRight size={16}/></button>
          </div>
        </section>
        <details id="refine" open={showResults&&([preferences.difficulty!=="any",preferences.distance!=="any",preferences.gain!=="any",preferences.dogs!=="any",preferences.toilets!=="any",preferences.storage!=="any",preferences.priority!=="balanced"].some(Boolean))} className="group rounded-2xl border border-slate-200 bg-white shadow-sm">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 font-semibold text-slate-900 marker:hidden sm:px-7 [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-2"><Compass size={18} className="text-green-800"/> Refine your results <span className="text-xs font-normal text-slate-500">(optional)</span></span>
            <span className="text-sm font-semibold text-green-800 group-open:hidden">Show filters +</span><span className="hidden text-sm font-semibold text-green-800 group-open:inline">Hide filters −</span>
          </summary>
          <div className="space-y-6 border-t border-slate-100 px-5 pb-6 pt-5 sm:px-7">
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Difficulty"><select name="difficulty" defaultValue={preferences.difficulty} className={inputClass}><option value="any">Any difficulty</option><option value="easy">Easy</option><option value="moderate">Moderate</option><option value="hard">Challenging</option></select></Field>
              <Field label="Maximum listed distance" hint="Catalog distance may be one-way, return, or unspecified."><select name="distance" defaultValue={preferences.distance??"any"} className={inputClass}><option value="any">No preference</option><option value="5">Up to 5 km</option><option value="10">Up to 10 km</option><option value="15">Up to 15 km</option><option value="25">Up to 25 km</option></select></Field>
              <Field label="Maximum recorded gain" hint="Gain is missing for many catalog entries."><select name="gain" defaultValue={preferences.gain??"any"} className={inputClass}><option value="any">No preference</option><option value="300">Up to 300 m</option><option value="600">Up to 600 m</option><option value="1000">Up to 1,000 m</option></select></Field>
              <Field label="Bringing a dog?" hint="Only explicitly allowed policies qualify."><select name="dogs" defaultValue={preferences.dogs??"any"} className={inputClass}><option value="any">No requirement</option><option value="yes">Confirmed dog access</option></select></Field>
              <Field label="Need toilets?"><select name="toilets" defaultValue={preferences.toilets??"any"} className={inputClass}><option value="any">No requirement</option><option value="yes">Confirmed toilets</option></select></Field>
              <Field label="Need food storage?"><select name="storage" defaultValue={preferences.storage??"any"} className={inputClass}><option value="any">No requirement</option><option value="yes">Confirmed food storage</option></select></Field>
            </div>
            <fieldset><legend className="mb-3 text-sm font-semibold">What matters most?</legend><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <RadioTile name="priority" value="balanced" title="Balanced matches" desc="A bit of everything" selected={preferences.priority==="balanced"}/>
              <RadioTile name="priority" value="facilities" title="Listed facilities" desc="Toilets and food storage" selected={preferences.priority==="facilities"}/>
              <RadioTile name="priority" value="distance" title="Known distances" desc="Prefer measured trail length" selected={preferences.priority==="distance"}/>
              <RadioTile name="priority" value="featured" title="Catalog highlights" desc="Favor featured places" selected={preferences.priority==="featured"}/>
            </div></fieldset>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4"><p className="max-w-xl text-xs leading-5 text-slate-500">Unknown distance and gain values may still appear, clearly marked. Verify current access and park rules before planning.</p><button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-900 px-5 text-sm font-bold text-white hover:bg-green-800">Apply refinements <ArrowRight size={16}/></button></div>
          </div>
        </details>
      </form>
      {showResults && <section id="matches" aria-live="polite" aria-labelledby="matches-title" className="mt-10 scroll-mt-6"><div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-semibold text-green-800">Your matches</p><h2 id="matches-title" className="mt-1 text-2xl font-bold sm:text-3xl">{matches.length?"Places worth considering":"No confirmed catalog matches"}</h2><p className="mt-2 max-w-2xl text-sm text-slate-600">{matches.length?"Up to four varied suggestions, with reasons and missing information flagged.":"Some requirements may be too specific for our current catalog. Broaden the region, activity, scenery, or confirmed facilities."}</p></div><Link href="/discover/search" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-300 px-4 text-sm font-semibold hover:bg-white"><Search size={15}/> Search everything</Link></div>
        <div className="grid gap-4">{matches.map((match,index)=><MatchCard key={match.destination.id} match={match} index={index}/>)}</div>
        {matches.length>0&&<p className="mt-5 rounded-xl bg-amber-50 p-4 text-xs leading-6 text-amber-900"><Info size={15} className="mr-1 inline"/> These suggestions are not verified hiking routes, campsite assignments, or forecasts. Confirm access, actual distance, park rules, and conditions before leaving.</p>}
      </section>}
    </div>
  </main>;
}
