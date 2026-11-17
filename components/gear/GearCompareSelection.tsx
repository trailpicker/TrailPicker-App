"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { Check, Scale, X } from "lucide-react";

export type SelectedGear = { id: string; name: string; categoryId: string; categoryName: string };
export const COMPARE_STORAGE_KEY = "trailpicker-gear-compare-v1";

function valid(value: unknown): value is SelectedGear {
  if (value === null || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  return ["id", "name", "categoryId", "categoryName"].every(key => typeof data[key] === "string" && (data[key] as string).length > 0 && (data[key] as string).length <= 200);
}

const EMPTY: SelectedGear[] = [];
let cacheRaw: string | null | undefined;
let cache: SelectedGear[] = EMPTY;
let inMemory: SelectedGear[] = EMPTY;
let storageBlocked = false;
const listeners = new Set<() => void>();

function sanitize(raw: string | null): SelectedGear[] {
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return EMPTY;
    const accepted = parsed.filter(valid).slice(0, 4);
    const category = accepted[0]?.categoryId;
    return accepted.filter(p => p.categoryId === category).filter((p, index, items) => items.findIndex(other => other.id === p.id) === index);
  } catch { return EMPTY; }
}

function snapshot() {
  if (typeof window === "undefined") return EMPTY;
  if (storageBlocked) return inMemory;
  try {
    const raw = sessionStorage.getItem(COMPARE_STORAGE_KEY);
    if (raw !== cacheRaw) { cacheRaw = raw; cache = sanitize(raw); }
    return cache;
  } catch { storageBlocked = true; return inMemory; }
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => { listeners.delete(listener); window.removeEventListener("storage", listener); };
}
function writeSelection(value: SelectedGear[]) {
  inMemory = value;
  try {
    sessionStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(value));
    cacheRaw = JSON.stringify(value);
    cache = value;
  } catch { storageBlocked = true; }
  listeners.forEach(listener => listener());
}

type CompareContextType = {
  selected: SelectedGear[];
  toggle: (product: SelectedGear) => void;
  clear: () => void;
};
const CompareContext = createContext<CompareContextType | null>(null);

export default function GearCompareSelection({ children, buildId = null }: { children: ReactNode; buildId?: string | null }) {
  const selected = useSyncExternalStore(subscribe, snapshot, () => EMPTY);
  const [notice, setNotice] = useState("");
  const value = useMemo<CompareContextType>(() => ({
    selected,
    toggle(product) {
      if (selected.some(item => item.id === product.id)) {
        writeSelection(selected.filter(item => item.id !== product.id));
        setNotice("");
        return;
      }
      if (selected.length && selected[0].categoryId !== product.categoryId) {
        setNotice(`Compare products in the same category. Clear your ${selected[0].categoryName} selection first.`);
        return;
      }
      if (selected.length === 4) {
        setNotice("Select up to four products.");
        return;
      }
      setNotice("");
      writeSelection([...selected, product]);
    },
    clear() { writeSelection([]); setNotice(""); },
  }), [selected]);
  const params = new URLSearchParams({ ids: selected.map(item => item.id).join(",") });
  if (buildId) params.set("build", buildId);

  return <CompareContext.Provider value={value}>
    <div className={selected.length ? "pb-28" : ""}>{children}</div>
    {selected.length > 0 && <aside aria-label="Gear comparison selection" className="fixed inset-x-0 bottom-0 z-40 border-t border-green-200 bg-white/95 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-8">
        <div className="flex shrink-0 items-center gap-2 font-semibold text-gray-900"><Scale className="h-5 w-5 text-green-800" /><span>Compare ({selected.length}/4)</span></div>
        <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">{selected.map(item => <button key={item.id} type="button" onClick={() => value.toggle(item)} title={`Remove ${item.name}`} className="inline-flex max-w-40 items-center gap-1 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-900 hover:bg-green-100"><span className="truncate">{item.name}</span><X aria-hidden="true" className="h-3.5 w-3.5 shrink-0" /></button>)}</div>
        <button type="button" onClick={value.clear} className="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100">Clear</button>
        {selected.length >= 2 ? <Link href={`/gear/compare?${params}`} className="rounded-lg bg-green-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800">Compare {selected.length} products</Link> : <span className="text-xs text-gray-500">Select one more</span>}
        {notice && <p role="status" className="w-full text-xs text-amber-800">{notice}</p>}
      </div>
    </aside>}
  </CompareContext.Provider>;
}

export function GearCompareButton({ product, className = "" }: { product: SelectedGear; className?: string }) {
  const context = useContext(CompareContext);
  if (!context) throw new Error("GearCompareButton must be inside GearCompareSelection.");
  const checked = context.selected.some(item => item.id === product.id);
  return <button type="button" aria-pressed={checked} onClick={() => context.toggle(product)} className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${checked ? "border-green-800 bg-green-50 text-green-900" : "border-gray-200 bg-white text-gray-700 hover:border-green-700 hover:text-green-900"} ${className}`}>
    {checked ? <Check aria-hidden="true" className="h-4 w-4" /> : <Scale aria-hidden="true" className="h-4 w-4" />}
    {checked ? "Selected" : "Compare"}
  </button>;
}
