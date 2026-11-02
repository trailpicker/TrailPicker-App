"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Heart, PackageCheck, Check } from "lucide-react";
import { addFavorite, removeFavorite, addOwnedGear, removeOwnedGear } from "@/app/profile/gear/actions";

export default function GearLibraryActions({ gearId, signedIn, owned, favorite }: { gearId: string; signedIn: boolean; owned: boolean; favorite: boolean }) {
  const [pending, start] = useTransition();
  const [error, setError] = useState("");
  if (!signedIn) return <Link href={`/api/auth/signin?callbackUrl=${encodeURIComponent(`/gear/${gearId}`)}`} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold hover:bg-gray-50"><Heart className="h-4 w-4" />Sign in to save gear</Link>;
  function run(action: (form: FormData) => Promise<void>) {
    const form = new FormData(); form.set("gearId", gearId); setError("");
    start(async () => { try { await action(form); } catch (e) { setError(e instanceof Error ? e.message : "Could not update your library."); } });
  }
  return <div><div className="flex flex-wrap gap-2">
    <button type="button" aria-pressed={owned} disabled={pending} onClick={() => run(owned ? removeOwnedGear : addOwnedGear)} className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold disabled:cursor-wait disabled:opacity-60 ${owned ? "border-green-200 bg-green-50 text-green-900" : "border-gray-200 hover:bg-gray-50"}`}>
      {owned ? <Check className="h-4 w-4" /> : <PackageCheck className="h-4 w-4" />}{owned ? "In My Gear" : "I own this"}
    </button>
    <button type="button" aria-pressed={favorite} disabled={pending} onClick={() => run(favorite ? removeFavorite : addFavorite)} className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold disabled:cursor-wait disabled:opacity-60 ${favorite ? "border-rose-200 bg-rose-50 text-rose-700" : "border-gray-200 hover:bg-gray-50"}`}>
      <Heart className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />{favorite ? "Favorited" : "Favorite"}
    </button>
  </div>{pending && <p role="status" className="mt-2 text-xs text-gray-500">Saving…</p>}{error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}</div>;
}
