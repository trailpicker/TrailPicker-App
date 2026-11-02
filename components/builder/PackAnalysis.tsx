"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Backpack, CloudSun, Compass, Info, RefreshCw, Scale, ShieldCheck, Weight } from 'lucide-react';
import type { CompatItem } from '@/lib/compatibility';
import type { PlannerBuild } from '@/lib/trip-planner';
import { weatherPoints } from '@/lib/weather/locations';
import { loadWaypointWeather } from '@/lib/weather/client-cache';
import { evaluatePackIntelligence, parseEcccEvidence, projectConsumables, type Finding, type ForecastEvidence, type IntelligenceItem } from '@/lib/pack-intelligence';
import { simulateExclusions } from '@/lib/pack-analysis';
import { useIgnoredFindings } from './useIgnoredFindings';
import { FindingList } from './AnalysisFindingCard';

type Tab = 'insights'|'weather'|'optimize'|'planning'|'stats';
const grams = (n:number) => n>=1000 ? `${(n/1000).toFixed(2)} kg` : `${Math.round(n).toLocaleString('en-CA')} g`;
const money=(n:number)=>new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(n);
const dateKey=(d:Date|string)=>{const dt=new Date(d);return Number.isNaN(dt.valueOf())?'':dt.toISOString().slice(0,10);};
const subtabs:{key:Tab;name:string;icon:typeof Info}[] = [
  {key:'insights',name:'Compatibility',icon:ShieldCheck},{key:'weather',name:'Weather',icon:CloudSun},
  {key:'optimize',name:'Optimization',icon:Scale},{key:'planning',name:'Pack planning',icon:Compass},{key:'stats',name:'Statistics',icon:Weight},
];

function SectionHeading({title,description}:{title:string;description:string}) {return <div><h2 className="text-xl font-bold text-gray-950">{title}</h2><p className="mt-1 text-sm text-gray-600">{description}</p></div>;}
export default function PackAnalysis({items,trip,buildId,readOnly=false}:{items:CompatItem[];trip:PlannerBuild;buildId:string;readOnly?:boolean}) {
  const [tab,setTab]=useState<Tab>('insights');
  const [level,setLevel]=useState<'all'|'review'|'other'>('all');
  const [showIgnored,setShowIgnored]=useState(false);
  const points=useMemo(()=>weatherPoints(trip),[trip]);
  const [pointId,setPointId]=useState<string>(()=>points.find(p=>p.id!=='trip-location')?.id??points[0]?.id??'');
  const point=points.find(p=>p.id===pointId)??points[0];
  const [evidence,setEvidence]=useState<ForecastEvidence|null>(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const [excluded,setExcluded]=useState<string[]>([]);
  const [fraction,setFraction]=useState(0.2);
  const [showAllItems,setShowAllItems]=useState(false);
  const dates=useMemo(()=>{
    const planned=trip.days.map(d=>dateKey(d.date)).filter(Boolean);
    if(planned.length)return planned;
    if(!trip.startDate||!trip.endDate)return [];
    const start=new Date(trip.startDate).valueOf(),end=new Date(trip.endDate).valueOf();
    if(!Number.isFinite(start)||!Number.isFinite(end)||end<start)return [];
    return Array.from({length:Math.min(11,Math.floor((end-start)/86400000)+1)},(_,i)=>dateKey(new Date(start+i*86400000)));
  },[trip.days,trip.startDate,trip.endDate]);
  const actualEvidence=evidence&&point&&evidence.point.lat===point.lat&&evidence.point.lng===point.lng?evidence:null;
  const result=useMemo(()=>evaluatePackIntelligence(trip,items as IntelligenceItem[],trip.days,actualEvidence),[trip,items,actualEvidence]);
  const forecastMatched=actualEvidence?.days??[];
  const sourceItems=result.pack.lines;
  const simulation=useMemo(()=>simulateExclusions(result.pack,new Set(excluded)),[result.pack,excluded]);
  const remaining=useMemo(()=>evaluatePackIntelligence(trip,items.filter(i=>!excluded.includes(i.id)) as IntelligenceItem[],trip.days,actualEvidence),[trip,items,excluded,actualEvidence]);
  const {ignoredIds,toggleIgnore,storageError}=useIgnoredFindings(buildId,result.findings,!readOnly);
  const activeFindings=result.findings.filter(f=>!ignoredIds.has(f.id));
  const visibleFindings=(section?:Finding['section'])=>result.findings.filter(f=>(!section||f.section===section)&&(showIgnored||!ignoredIds.has(f.id)));
  const shownFindings=visibleFindings().filter(f=>level==='all'||(level==='review'?f.level==='critical'||f.level==='review':f.level==='opportunity'||f.level==='unknown'));
  const summary={critical:activeFindings.filter(f=>f.level==='critical').length,review:activeFindings.filter(f=>f.level==='review').length,unknown:activeFindings.filter(f=>f.level==='unknown').length,opportunity:activeFindings.filter(f=>f.level==='opportunity').length};
  const nights=result.plannedNights;
  const daily=projectConsumables(result.pack.consumableGrams,nights??0,fraction);

  async function loadWeather(){
    if(!point||loading)return;
    setLoading(true);setError('');setEvidence(null);
    try{
      const url=`/api/weather?lat=${encodeURIComponent(point.lat)}&lng=${encodeURIComponent(point.lng)}&view=summary`;
      const raw:unknown=await loadWaypointWeather(url);
      setEvidence(parseEcccEvidence(raw,{name:point.name,lat:point.lat,lng:point.lng,elevationM:point.elevationM},dates));
    }catch(e){setError(e instanceof Error?e.message:'Unable to load ECCC model data.');}
    finally{setLoading(false);}
  }
  return <div className="mx-auto max-w-6xl space-y-6 px-3 pb-20 pt-6 sm:px-6">
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-green-800">Gear intelligence · v0.3</p><h1 className="mt-1 text-2xl font-bold text-gray-950 sm:text-3xl">Advanced Pack Analysis</h1><p className="mt-2 max-w-2xl text-sm text-gray-600">Compatibility first. Identify trip-specific concerns, inspect the evidence, and test changes to your kit.</p></div>
      <Link href={`/build/${buildId}`} className="rounded-lg border border-green-800 px-4 py-2 text-sm font-semibold text-green-900 hover:bg-green-50">{readOnly?'View gear':'Edit gear'}</Link>
    </header>

    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Analysis findings summary">
      {[{title:'Official alerts',n:summary.critical,style:'text-red-800'},{title:'Needs review',n:summary.review,style:'text-amber-800'},{title:'Improvements',n:summary.opportunity,style:'text-blue-800'},{title:'Missing evidence',n:summary.unknown,style:'text-gray-800'}].map(s=><div key={s.title} className="rounded-2xl border border-gray-200 bg-white p-4"><p className="text-xs font-semibold text-gray-500">{s.title}</p><p className={`mt-2 text-2xl font-bold tabular-nums ${s.style}`}>{s.n}</p></div>)}
    </div>
    <p className="text-xs leading-5 text-gray-500">{ignoredIds.size} acknowledged · Counts exclude ignored findings. Finding counts describe checks against recorded data, not a safety score. A zero count does not establish that the pack is safe or complete. Official alerts are only included after live retrieval for the selected point.</p>

    {!readOnly&&ignoredIds.size>0&&<div className="flex justify-end"><button type="button" onClick={()=>setShowIgnored(v=>!v)} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50">{showIgnored?'Hide ignored':`Show ignored (${ignoredIds.size})`}</button></div>}
    {storageError&&<p role="alert" className="text-sm text-amber-800">Could not save your ignored findings in this browser. Please check your browser storage settings.</p>}

    <nav aria-label="Analysis sections" className="flex gap-1 overflow-x-auto border-b border-gray-200 pb-1">
      {subtabs.map(({key,name,icon:Icon})=><button type="button" key={key} onClick={()=>setTab(key)} aria-current={tab===key?'page':undefined} className={`inline-flex shrink-0 items-center gap-2 rounded-t-xl px-3 py-3 text-sm font-semibold transition sm:px-4 ${tab===key?'bg-green-800 text-white':'text-gray-600 hover:bg-gray-100'}`}><Icon className="h-4 w-4"/>{name}</button>)}
    </nav>

    {tab==='insights' && <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3"><SectionHeading title="Compatibility findings" description="Gear specifications, trip duration, planned conditions, and any loaded ECCC evidence."/><div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 text-xs font-semibold">{(['all','review','other'] as const).map(k=><button key={k} onClick={()=>setLevel(k)} className={`rounded-md px-3 py-2 ${level===k?'bg-green-800 text-white':'text-gray-600'}`}>{k==='all'?'All':k==='review'?'Needs review':'Other'}</button>)}</div></div>
      {actualEvidence&&<p className="rounded-xl bg-blue-50 p-3 text-sm text-blue-900">ECCC model data loaded for <strong>{actualEvidence.point.name}</strong>. {forecastMatched.length} trip-day model summaries available. Only this point was sampled, not your entire route.</p>}
      <FindingList findings={shownFindings} empty="No active findings in this filter." ignoredIds={ignoredIds} onToggleIgnore={readOnly?undefined:toggleIgnore}/>
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">Equipment temperature ratings may use different testing standards. Forecast grids cannot resolve all alpine microclimates. TrailPicker flags things to verify; it cannot certify trip readiness.</div>
    </section>}

    {tab==='weather' && <section className="space-y-4">
      <SectionHeading title="Weather compatibility" description="Request coordinate-based ECCC HRDPS/RDPS/GDPS model data when needed. A new request is not made every time you open Analysis."/>
      {points.length?<div className="rounded-2xl border border-gray-200 bg-white p-5">
        <label htmlFor="weather-point" className="block text-sm font-semibold text-gray-800">Point to check</label>
        <div className="mt-2 flex flex-wrap gap-2"><select id="weather-point" className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm" value={point?.id??''} onChange={e=>{setPointId(e.target.value);setEvidence(null);setError('');}}>{points.map(p=><option key={p.id} value={p.id}>{p.name}{p.elevationM!=null?` · ${Math.round(p.elevationM)}m`:''}</option>)}</select>
        <button type="button" disabled={loading} onClick={loadWeather} className="inline-flex items-center gap-2 rounded-xl bg-green-800 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"><RefreshCw className={`h-4 w-4 ${loading?'animate-spin':''}`}/>{loading?'Checking ECCC…':actualEvidence?'Refresh forecast':'Check ECCC forecast'}</button></div>
        <p className="mt-3 text-xs text-gray-500">One selected Canadian point per request. Weather uses the existing server-side ECCC cache and may take several seconds on a cold request.</p>
        {error&&<p role="alert" className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">{error} No forecast-based all-clear is available.</p>}
        {actualEvidence&&<div className="mt-5 space-y-3"><div className="flex flex-wrap gap-2 text-xs font-semibold"><span className="rounded-lg bg-gray-100 px-3 py-2">{actualEvidence.alertsStatus==='ok'?`${actualEvidence.alerts.length} official alerts returned`:'Alert status unavailable'}</span><span className="rounded-lg bg-gray-100 px-3 py-2">{forecastMatched.length} matching trip dates</span><span className="rounded-lg bg-gray-100 px-3 py-2">Updated {new Date(actualEvidence.loadedAt).toLocaleTimeString('en-CA',{hour:'numeric',minute:'2-digit'})}</span></div>
          {forecastMatched.length?<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{forecastMatched.map(d=><div key={d.date} className="rounded-xl border border-gray-200 p-4"><p className="text-sm font-bold text-gray-900">{d.date}</p><p className="mt-1 text-sm text-gray-600">Sampled low/high: {d.low==null?'?':`${d.low}°C`} / {d.high==null?'?':`${d.high}°C`}</p><p className="mt-1 text-sm text-gray-600">Max gust: {d.gust==null?'Unknown':`${d.gust} km/h`} · Precip probability: {d.pop==null?'Unknown':`${d.pop}%`}</p><p className="mt-2 text-xs text-gray-500">{d.model} · {d.samples} samples</p></div>)}</div>:<p className="text-sm text-amber-800">No selected trip dates fall within the returned forecast samples. No trip-day weather assessment can be made.</p>}
          <p className="text-xs text-gray-500">Daily lows/highs are minima/maxima of sampled model points, not official daily highs or lows. No avalanche assessment. Review ECCC warnings and local conditions.</p>
        </div>}
      </div>:<div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">No map coordinates in this trip. Add a trip location or waypoint in the Trip Planner to get location-specific weather.</div>}
      <FindingList findings={visibleFindings('weather')} ignoredIds={ignoredIds} onToggleIgnore={readOnly?undefined:toggleIgnore} empty="No weather concerns flagged using the evidence currently available."/>
    </section>}

    {tab==='optimize' && <section className="space-y-4">
      <SectionHeading title="Pack optimization" description="Examine review prompts, then compare removing items as a hypothetical scenario. Nothing in your build is changed."/>
      <FindingList findings={visibleFindings('optimization')} ignoredIds={ignoredIds} onToggleIgnore={readOnly?undefined:toggleIgnore} empty="No straightforward duplication opportunities detected."/>
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 className="text-base font-semibold text-gray-950">What-if pack comparison</h3><p className="mt-1 text-sm text-gray-600">Select items to test a hypothetical kit. Any new compatibility findings are shown below.</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">{[{label:'Known carried weight',value:grams(result.pack.carriedGrams),note:'Current subtotal'},{label:'After selections',value:grams(simulation.remainingCarried),note:'Hypothetical subtotal'},{label:'Known weight difference',value:grams(simulation.knownSavedCarried),note:'Excludes unknown weights'}].map(s=><div key={s.label} className="rounded-xl bg-gray-50 p-4"><p className="text-xs font-medium text-gray-600">{s.label}</p><p className="mt-2 text-xl font-bold text-gray-950">{s.value}</p><p className="text-xs text-gray-500">{s.note}</p></div>)}</div>
        <div className="mt-3 divide-y divide-gray-100">{sourceItems.slice(0,showAllItems?undefined:8).map(i=><label key={i.id} className="flex cursor-pointer items-center gap-3 py-3"><input type="checkbox" checked={excluded.includes(i.id)} onChange={()=>setExcluded(old=>old.includes(i.id)?old.filter(v=>v!==i.id):[...old,i.id])} className="h-4 w-4 accent-green-800"/><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-gray-900">{i.name}</span><span className="text-xs text-gray-500">{i.category} · {i.quantity} × · {i.weightClass}</span></span><span className="text-sm tabular-nums text-gray-700">{i.grams==null?'Weight unknown':grams(i.grams)}</span></label>)}</div>
        {sourceItems.length>8&&<button className="mt-3 text-sm font-semibold text-green-800 underline" type="button" onClick={()=>setShowAllItems(!showAllItems)}>{showAllItems?'Show fewer':'Show all items'}</button>}
        {excluded.length>0&&<button className="ml-4 mt-3 text-sm font-semibold text-gray-600 underline" onClick={()=>setExcluded([])} type="button">Reset comparison</button>}
        {excluded.length>0&&<div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4"><h4 className="text-sm font-bold text-amber-950">Compatibility after hypothetical removal</h4><p className="mt-1 text-sm text-amber-900">{remaining.findings.filter(f=>f.level==='review'||f.level==='critical').length} flagged concerns in the hypothetical setup, compared with {result.findings.filter(f=>f.level==='review'||f.level==='critical').length} in the current setup.</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-950">{remaining.findings.filter(f=>f.level==='review'||f.level==='critical').slice(0,5).map(f=><li key={f.id}>{f.title}</li>)}</ul>{simulation.missingWeightCount>0&&<p className="mt-2 text-xs text-amber-950">Some removed items have unknown weights; savings are incomplete.</p>}</div>}
        <p className="mt-4 text-xs leading-5 text-gray-500">This does not recommend removing safety equipment. Cost of alternatives, product substitutability, and safe packing decisions cannot be inferred from category and mass alone.</p>
      </div>
    </section>}

    {tab==='planning'&&<section className="space-y-4">
      <SectionHeading title="Trip load and consumables" description="A planning model, never an automatic estimate of how much food or fuel you'll use."/>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">{[{label:'Planned nights',value:nights==null?'Not set':String(nights)},{label:'Known starting carried',value:grams(result.pack.carriedGrams)},{label:'Recorded consumables',value:grams(result.pack.consumableGrams)}].map(s=><div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-4"><p className="text-xs text-gray-500">{s.label}</p><p className="mt-2 text-xl font-bold">{s.value}</p></div>)}</div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5"><label className="block text-sm font-semibold text-gray-900" htmlFor="rate">Hypothetical fraction of starting consumables used per day: {Math.round(fraction*100)}%</label><input className="mt-3 w-full accent-green-800" id="rate" type="range" min="0" max="1" step="0.05" value={fraction} onChange={e=>setFraction(Number(e.target.value))}/><div className="mt-4 space-y-3">{daily.map(d=>{const carried=result.pack.baseGrams+d.remainingGrams;return <div key={d.day} className="flex items-center gap-3"><span className="w-12 text-xs text-gray-600">Day {d.day}</span><div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-green-700" style={{width:`${result.pack.carriedGrams?100*carried/result.pack.carriedGrams:0}%`}}/></div><span className="w-20 text-right text-xs font-semibold tabular-nums text-gray-700">{grams(carried)}</span></div>;})}</div><p className="mt-4 text-xs leading-5 text-gray-500">Assumes linear use of a percentage of the *initial* consumable mass each day, no resupply, and constant base weight. Does not infer caloric needs, hydration requirements or fuel demand. Worn items are excluded.</p></div>
      <FindingList findings={visibleFindings('planning')} ignoredIds={ignoredIds} onToggleIgnore={readOnly?undefined:toggleIgnore} empty="No specific planning suggestions based on current data."/>
    </section>}

    {tab==='stats'&&<section className="space-y-4"><SectionHeading title="Supporting pack statistics" description="The numbers are here when useful, but they don't replace compatibility decisions."/><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[{label:'Base',v:grams(result.pack.baseGrams)},{label:'Consumable',v:grams(result.pack.consumableGrams)},{label:'Worn',v:grams(result.pack.wornGrams)},{label:'Known cost',v:money(result.pack.knownCostCad)}].map(s=><div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-4"><p className="text-xs text-gray-500">{s.label}</p><p className="mt-2 text-lg font-bold">{s.v}</p></div>)}</div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5"><h3 className="font-semibold">Category weight breakdown</h3><div className="mt-4 space-y-3">{result.pack.categories.map(c=><div key={c.name}><div className="mb-1 flex justify-between text-sm"><span>{c.name}{c.unknownWeightCount?` · ${c.unknownWeightCount} unknown`:''}</span><strong>{grams(c.knownGrams)}</strong></div><div className="h-2 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-green-700" style={{width:`${result.pack.totalGrams?100*c.knownGrams/result.pack.totalGrams:0}%`}}/></div></div>)}</div></div><p className="text-xs text-gray-500">{result.pack.unknownWeightUnits>0?`${result.pack.unknownWeightUnits} units have unknown weights. All mass totals shown are incomplete.`:'All listed item units have known weights.'} {result.pack.unknownPriceUnits>0?` ${result.pack.unknownPriceUnits} units have unknown prices.`:''}</p>
    </section>}

    <footer className="flex items-start gap-2 border-t border-gray-200 pt-4 text-xs leading-5 text-gray-500"><Backpack className="mt-0.5 h-4 w-4 shrink-0"/><p>TrailPicker Analysis is a planning aid, not professional mountaineering, avalanche, or safety advice. Product data may be incomplete; verify equipment ratings, local conditions, route hazards and official warnings before departure.</p></footer>
  </div>;
}

