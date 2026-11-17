"use client";

import {useFormStatus} from "react-dom";
import type {ReactNode} from "react";
import {Bookmark, Copy} from "lucide-react";
import {changeSavedBuild, copyPublicBuild} from "@/app/discover/actions";

function ActionButton({kind, children}: {kind: "save" | "copy"; children: ReactNode}) {
  const {pending} = useFormStatus();
  const Icon = kind === "save" ? Bookmark : Copy;
  return <button type="submit" disabled={pending} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-green-900 transition hover:border-emerald-400 hover:bg-emerald-50 disabled:opacity-50"><Icon size={16} aria-hidden="true" />{pending ? "Working…" : children}</button>;
}

export default function TripActions({id, saved, signedIn}: {id: string; saved: boolean; signedIn: boolean}) {
  return <div className="flex flex-wrap items-center gap-2">
    <form action={changeSavedBuild}>
      <input type="hidden" name="buildId" value={id}/>
      <input type="hidden" name="intent" value={saved ? "unsave" : "save"}/>
      <ActionButton kind="save">{saved ? "Saved" : "Save trip"}</ActionButton>
    </form>
    <form action={copyPublicBuild}>
      <input type="hidden" name="buildId" value={id}/>
      <ActionButton kind="copy">Copy to my planner</ActionButton>
    </form>
    {!signedIn && <p className="w-full text-xs text-slate-500">Sign in to save or copy. Copies are private and editable.</p>}
  </div>;
}
