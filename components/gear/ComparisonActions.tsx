"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { X, RefreshCw } from "lucide-react";
import { COMPARE_STORAGE_KEY, type SelectedGear } from "@/components/gear/GearCompareSelection";
import { replaceComparedGear } from "@/app/gear/compare/actions";

export function RemoveFromComparison({ productId, selected, buildId }: { productId: string; selected: SelectedGear[]; buildId?: string | null }) {
  const router = useRouter();
  function remove() {
    const remaining = selected.filter(p => p.id !== productId);
    try { sessionStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(remaining)); } catch { /* Storage is optional. */ }
    const params = new URLSearchParams({ ids: remaining.map(p => p.id).join(",") });
    if (buildId) params.set("build", buildId);
    router.push(`/gear/compare?${params}`);
  }
  return <button type="button" onClick={remove} aria-label="Remove from comparison" title="Remove from comparison" className="rounded-full border border-gray-200 bg-white p-2 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"><X className="h-4 w-4" /></button>;
}

export function ReplaceComparedGear({ buildId, newGearId, items }: { buildId: string; newGearId: string; items: Array<{ id: string; name: string }> }) {
  const [itemId, setItemId] = useState(items[0]?.id ?? "");
  const [pending, start] = useTransition();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  if (!items.length) return null;
  function replace() {
    if (!itemId) return;
    const form = new FormData();
    form.set("buildId", buildId);
    form.set("itemId", itemId);
    form.set("newGearId", newGearId);
    setError(""); setMessage("");
    start(async () => {
      try {
        const result = await replaceComparedGear(form);
        setMessage(result.message);
        router.refresh();
      } catch (e) { setError(e instanceof Error ? e.message : "Could not replace this item."); }
    });
  }
  return <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
    <label htmlFor={`replace-${newGearId}`} className="block text-xs font-semibold text-gray-700">Replace in current build</label>
    <select id={`replace-${newGearId}`} value={itemId} onChange={event => setItemId(event.target.value)} disabled={pending} className="mt-2 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-2 py-2 text-xs text-gray-900 focus:border-green-700 focus:outline-none">
      {items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
    </select>
    <button type="button" onClick={replace} disabled={pending || !itemId} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-green-800 px-3 py-2 text-xs font-bold text-green-900 hover:bg-green-50 disabled:opacity-50"><RefreshCw className="h-3.5 w-3.5" />{pending ? "Replacing…" : "Replace selected item"}</button>
    {message && <p role="status" className="mt-2 text-xs text-green-800">{message}</p>}
    {error && <p role="alert" className="mt-2 text-xs text-red-700">{error}</p>}
  </div>;
}
