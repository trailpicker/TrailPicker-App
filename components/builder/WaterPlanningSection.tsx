"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Droplets, Save, ChevronDown } from "lucide-react";
import type { Waypoint } from "@/lib/trip-planner";
import { calculateWaterLegs, readPrivateResources, type ResourceSettings } from "@/lib/trip-resources";
import { saveTripWaterSettings } from "@/lib/tracked-build-actions";
import {
  ROUTE_WATER_POINTS_CHANGED, ROUTE_WATER_POINTS_REQUEST,
  type RouteWaterPointsChanged, type RouteWaterPointsRequest,
} from "@/lib/route-water-events";

const input = "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-700 focus:outline-none";

export default function WaterPlanningSection({ buildId, routePoints, logistics }: {
  buildId: string; routePoints: Waypoint[]; logistics: unknown;
}) {
  const router = useRouter();
  const saved = readPrivateResources(logistics).settings;
  const serverKey = JSON.stringify(saved);
  const [settings, setSettings] = useState<ResourceSettings>(() => saved);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<RouteWaterPointsChanged | null>(null);

  useEffect(() => {
    if (!dirty) setSettings(readPrivateResources(logistics).settings);
    // Server props are authoritative only when local settings aren't dirty.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverKey]);
  useEffect(() => {
    setSource(null);
    const update = (event: Event) => {
      const detail = (event as CustomEvent<RouteWaterPointsChanged>).detail;
      if (detail?.buildId === buildId) setSource(detail);
    };
    window.addEventListener(ROUTE_WATER_POINTS_CHANGED, update);
    const request: RouteWaterPointsRequest = { buildId, respond: setSource };
    window.dispatchEvent(new CustomEvent(ROUTE_WATER_POINTS_REQUEST, { detail: request }));
    return () => window.removeEventListener(ROUTE_WATER_POINTS_CHANGED, update);
  }, [buildId]);
  const points = source?.buildId === buildId ? source.points : routePoints;
  const legs = useMemo(() => calculateWaterLegs(points, settings), [points, settings]);
  const refills = points.filter(p => p.kind === "water" && p.resource?.refillConfirmed && p.resource?.waterReliability !== "unavailable").length;
  const update = (key: keyof ResourceSettings, value: string, min: number, max: number) => {
    const n = Number(value);
    if (value.trim() === "" || !Number.isFinite(n)) return;
    setSettings(current => ({ ...current, [key]: Math.max(min, Math.min(max, n)) }));
    setDirty(true); setMessage("");
  };
  async function save() {
    if (!dirty || saving) return;
    setSaving(true); setMessage("");
    try {
      const form = new FormData();
      form.set("buildId", buildId);
      form.set("waterSettings", JSON.stringify(settings));
      await saveTripWaterSettings(form);
      setDirty(false); setMessage("Water settings saved.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save water settings.");
    } finally { setSaving(false); }
  }
  return <section aria-label="Water planning" className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><h3 className="flex items-center gap-2 text-base font-bold text-gray-950"><Droplets className="h-4 w-4 text-blue-700"/>Water planning</h3>
        <p className="mt-1 text-xs text-gray-500">Carry estimates based on your mapped route and selected refill stops.</p></div>
      <div className="flex flex-wrap items-center gap-2">
        {dirty && <><span className="text-xs font-medium text-amber-800">Unsaved settings</span>
          <button type="button" onClick={save} disabled={saving}
            className="inline-flex items-center gap-1 rounded-lg bg-green-900 px-3 py-2 text-xs font-semibold text-white disabled:opacity-40"><Save className="h-3.5 w-3.5"/>{saving ? "Saving…" : "Save water"}</button></>}
        <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          onClick={() => setOpen(value => !value)} aria-expanded={open}><ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}/>Water settings</button>
      </div>
    </div>
    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-700">
      <span>Capacity: <strong>{settings.capacityL} L</strong></span>
      <span>Reserve: <strong>{settings.reserveL} L</strong></span>
      <span>Planned refill stops: <strong>{refills}</strong></span>
    </div>
    {open && <div className="mt-4 grid gap-3 border-t border-gray-100 pt-3 sm:grid-cols-3">
      {([ ["rateLph", "Usage assumption (L/hour)", 0.1, 2, 0.1],
          ["reserveL", "Reserve (L)", 0, 5, 0.25],
          ["capacityL", "Carry capacity (L)", 0.25, 20, 0.25] ] as const).map(([key, label, min, max, step]) =>
        <label className="block space-y-1 text-xs font-medium text-gray-700" key={key}>{label}
          <input type="number" inputMode="decimal" min={min} max={max} step={step} className={input}
            value={settings[key]} onChange={e => update(key, e.target.value, min, max)}/>
        </label>)}
      <p role="status" className="text-xs text-gray-600 sm:col-span-3">{message || (dirty ? "Save your new water settings before leaving the page." : "Saved water settings")}</p>
    </div>}
    {!legs.length ? <p className="mt-3 text-xs text-gray-500">Add at least two itinerary stops to estimate water between them.</p> :
      <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-xs"><thead><tr className="border-b border-gray-200 text-gray-600"><th className="py-2 pr-3">From → to</th><th className="py-2 pr-3">Trail distance</th><th className="py-2 pr-3">Moving hours</th><th className="py-2">Estimated need</th></tr></thead><tbody>
        {legs.map((leg, i) => <tr key={i} className="border-b border-gray-100"><td className="py-2 pr-3 font-medium">{leg.from} → {leg.to}</td><td className="py-2 pr-3">{leg.distanceKm === null ? "Unknown" : `${leg.distanceKm} km`}</td><td className="py-2 pr-3">{leg.movingHours === null ? "Unknown" : `${leg.movingHours} h`}</td><td className="py-2">
          {leg.requiredL === null ? <span className="text-gray-500">Incomplete route data</span> : <span className={leg.exceedsCapacity ? "font-semibold text-amber-800" : "font-semibold text-gray-900"}>{leg.requiredL} L including reserve{leg.exceedsCapacity ? " · Above capacity" : ""}</span>}
          <span className="block text-gray-500">{leg.note}</span>
        </td></tr>)}
      </tbody></table></div>}
    {source?.draft && <p className="mt-2 text-xs text-amber-800">Estimates use unsaved route edits. Save route to keep the waypoint changes.</p>}
    <p className="mt-3 text-xs leading-5 text-gray-500">Planning estimates only. Check water availability and safety independently; conditions and needs can vary. Unverified water sources are not guaranteed refills.</p>
  </section>;
}
