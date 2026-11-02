"use client";

import type { WeatherResult } from "./service";

// The trip forecast, day expansion and pack analysis often request the same
// waypoint. Share both completed responses and requests within this tab.
const MAX_ENTRIES = 32;
const FRESH_FOR_MS = 90_000;
const saved = new Map<string, { data: WeatherResult; at: number }>();
const pending = new Map<string, Promise<WeatherResult>>();

export async function loadWaypointWeather(url: string, force = false): Promise<WeatherResult> {
  if (!force) {
    const hit = saved.get(url);
    if (hit && Date.now() - hit.at < FRESH_FOR_MS) return hit.data;
  }
  const current = pending.get(url);
  if (current) return current;

  const work = (async () => {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      const body = await response.json().catch(() => null) as { error?: string } | null;
      throw new Error(body?.error || `Forecast unavailable (${response.status}).`);
    }
    const data = await response.json() as WeatherResult;
    saved.delete(url);
    saved.set(url, { data, at: Date.now() });
    while (saved.size > MAX_ENTRIES) saved.delete(saved.keys().next().value!);
    return data;
  })();
  pending.set(url, work);
  try {
    return await work;
  } finally {
    if (pending.get(url) === work) pending.delete(url);
  }
}
