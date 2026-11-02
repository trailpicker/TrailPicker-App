"use client";

// This is the original Analysis tab FindingCard, extracted for reuse rather
// than replaced by a second card design. The only addition is Ignore/Restore.
import { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronDown, HelpCircle, Info, ShieldAlert, Sparkles } from 'lucide-react';
import type { Finding, FindingLevel } from '@/lib/pack-intelligence';

const tags:Record<FindingLevel,{text:string;icon:typeof Info;style:string}> = {
  critical:{text:'Official alert',icon:ShieldAlert,style:'bg-red-50 text-red-900 border-red-200'},
  review:{text:'Needs review',icon:AlertTriangle,style:'bg-amber-50 text-amber-950 border-amber-200'},
  opportunity:{text:'Improvement',icon:Sparkles,style:'bg-blue-50 text-blue-950 border-blue-200'},
  unknown:{text:'Missing evidence',icon:HelpCircle,style:'bg-gray-50 text-gray-800 border-gray-200'},
};

function FindingCard({f,ignored=false,onToggleIgnore}:{f:Finding;ignored?:boolean;onToggleIgnore?:(f:Finding)=>void}) {
  const [expanded,setExpanded]=useState(false);
  const t=tags[f.level];const Icon=t.icon;
  return <article className={`overflow-hidden rounded-2xl border bg-white ${f.level==='critical'?'border-red-300':'border-gray-200'} ${ignored?'opacity-65':''}`}>
    <button type="button" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)} className="flex w-full items-start gap-3 p-4 text-left sm:p-5">
      <span className={`rounded-xl border p-2 ${t.style}`}><Icon className="h-5 w-5"/></span>
      <span className="min-w-0 flex-1"><span className="text-xs font-semibold text-gray-500">{ignored?'Ignored · ':''}{t.text} · {f.section}</span><span className="mt-1 block text-base font-semibold text-gray-950">{f.title}</span><span className="mt-1 block text-sm leading-relaxed text-gray-600">{f.detail}</span></span>
      <ChevronDown className={`mt-1 h-4 w-4 shrink-0 text-gray-500 transition ${expanded?'rotate-180':''}`}/>
    </button>
    {expanded && <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 text-sm sm:px-5"><p className="font-semibold text-green-900">Next step</p><p className="mt-1 text-gray-800">{f.action}</p><p className="mt-2 text-xs text-gray-500">Evidence: {f.basis}</p>{onToggleIgnore&&<div className="mt-3 flex items-center justify-between gap-3"><p className="text-xs text-gray-500">Ignoring acknowledges this finding; it does not certify the gear.</p><button type="button" onClick={()=>onToggleIgnore(f)} className="shrink-0 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100">{ignored?'Restore':'Ignore'}</button></div>}</div>}
  </article>;
}
export function FindingList({findings,empty,ignoredIds,onToggleIgnore}:{findings:Finding[];empty:string;ignoredIds?:ReadonlySet<string>;onToggleIgnore?:(f:Finding)=>void}) {return findings.length ? <div className="space-y-3">{findings.map(f=><FindingCard key={f.id} f={f} ignored={ignoredIds?.has(f.id)} onToggleIgnore={onToggleIgnore}/>)}</div> : <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5"><CheckCircle2 className="h-5 w-5 shrink-0 text-green-700"/><p className="text-sm text-gray-700">{empty} This is not a certification of safety or completeness.</p></div>;}

