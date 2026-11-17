"use client";

import {useFormStatus} from "react-dom";
import {Bookmark, Copy} from "lucide-react";
import {changeSavedBuild, copyPublicBuild} from "@/app/discover/actions";

function Submit({kind, label}: {kind:"save"|"copy";label:string}) {
  const {pending}=useFormStatus();
  const Icon=kind === "save" ? Bookmark : Copy;
  return <button type="submit" disabled={pending} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-green-900 transition hover:border-emerald-400 hover:bg-emerald-50 disabled:opacity-60"><Icon size={16} aria-hidden="true"/>{pending?"Working…":label}</button>;
}
export default function PackActions({id,saved,signedIn}: {id:string;saved:boolean;signedIn:boolean}) {
  return <div className="flex flex-wrap gap-2">
    <form action={changeSavedBuild}><input type="hidden" name="buildId" value={id}/><input type="hidden" name="intent" value={saved?"unsave":"save"}/><Submit kind="save" label={saved?"Saved":"Save build"}/></form>
    <form action={copyPublicBuild}><input type="hidden" name="buildId" value={id}/><Submit kind="copy" label="Copy build"/></form>
    {!signedIn&&<p className="w-full text-xs text-slate-500">Sign in to save or copy a build. Copies are private.</p>}
  </div>;
}
