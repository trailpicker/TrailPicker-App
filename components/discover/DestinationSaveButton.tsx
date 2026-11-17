"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { changeSavedDestination } from "@/app/discover/actions";

function SaveSubmit({ saved, compact }: { saved: boolean; compact: boolean }) {
  const { pending } = useFormStatus();
  const Icon = saved ? BookmarkCheck : Bookmark;
  return <button type="submit" disabled={pending} aria-label={saved ? "Remove saved destination" : "Save destination"}
    aria-pressed={saved}
    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border font-semibold transition disabled:opacity-60 ${compact ? "min-h-10 px-3 py-2 text-xs" : "h-11 px-4 text-sm"} ${saved ? "border-emerald-700 bg-emerald-50 text-green-900 hover:bg-emerald-100" : "border-slate-200 bg-white text-green-900 hover:bg-emerald-50"}`}>
    <Icon size={16} aria-hidden="true"/>{!compact && (pending ? "Working…" : saved ? "Saved" : "Save destination")}
  </button>;
}

export default function DestinationSaveButton({ destinationId, saved, signedIn, compact = false }:
  { destinationId: string; saved: boolean; signedIn: boolean; compact?: boolean }) {
  if (!signedIn) return <Link href="/api/auth/signin?callbackUrl=%2Fdiscover%3Fview%3Dsaved"
    aria-label="Sign in to save destination"
    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-slate-200 bg-white font-semibold text-green-900 hover:bg-emerald-50 ${compact ? "min-h-10 px-3 py-2 text-xs" : "h-11 px-4 text-sm"}`}>
    <Bookmark size={16} aria-hidden="true" />{!compact && "Sign in to save"}</Link>;
  return <form action={changeSavedDestination} className="flex items-stretch">
    <input type="hidden" name="destinationId" value={destinationId}/>
    <input type="hidden" name="intent" value={saved ? "unsave" : "save"}/>
    <SaveSubmit saved={saved} compact={compact}/>
  </form>;
}
