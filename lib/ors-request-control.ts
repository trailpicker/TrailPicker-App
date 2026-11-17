/** Small process-local safeguards for the shared ORS allowance.
 * No API credentials, build IDs or user data are persisted to disk.
 */
import type { LatLng } from "./trail-routing";

export type OrsKind = "route" | "snap";

/** ~11 cm coordinate precision; preserves direction and all shaping points. */
export function orsCoordinateKey(kind: OrsKind, points: readonly LatLng[]): string {
  return `${kind}:${points.map(([lat, lng]) => `${lat.toFixed(6)},${lng.toFixed(6)}`).join(";")}`;
}

export function retryAfterSeconds(header: string | null, now = Date.now(), fallback = 90): number {
  if (!header) return fallback;
  const seconds = /^\d+(?:\.\d+)?$/.test(header.trim())
    ? Number(header)
    : (Date.parse(header) - now) / 1000;
  return Number.isFinite(seconds) && seconds > 0 ? Math.min(3600, Math.max(1, Math.ceil(seconds))) : fallback;
}

export class OrsCooldownError extends Error {
  constructor(public retryAfterSeconds: number) {
    super("Trail routing rate limit reached. Try again later.");
  }
}
export class OrsQueueFullError extends Error {
  constructor() { super("Trail routing is busy. Retry in a moment."); }
}

/** One provider request at a time per server process, with a safe minimum interval. */
export function createOrsTrafficController({
  intervalMs = 1600,
  queueLimit = 12,
  now = () => Date.now(),
  sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms)),
} = {}) {
  let tail: Promise<void> = Promise.resolve();
  let queued = 0;
  let nextStartAt = 0;
  let blockedUntil = 0;
  return {
    cooldown(seconds: number) {
      if (Number.isFinite(seconds) && seconds > 0) blockedUntil = Math.max(blockedUntil, now() + Math.min(3600, seconds) * 1000);
    },
    remainingCooldownSeconds() { return Math.max(0, Math.ceil((blockedUntil - now()) / 1000)); },
    async schedule<T>(job: () => Promise<T>): Promise<T> {
      if (queued >= queueLimit) throw new OrsQueueFullError();
      queued++;
      const previous = tail;
      let release!: () => void;
      tail = new Promise<void>(resolve => { release = resolve; });
      await previous;
      try {
        const remaining = Math.max(0, Math.ceil((blockedUntil - now()) / 1000));
        if (remaining) throw new OrsCooldownError(remaining);
        const delay = Math.max(0, nextStartAt - now());
        if (delay) await sleep(delay);
        const afterWait = Math.max(0, Math.ceil((blockedUntil - now()) / 1000));
        if (afterWait) throw new OrsCooldownError(afterWait);
        nextStartAt = now() + intervalMs;
        return await job();
      } finally {
        queued--;
        release();
      }
    },
  };
}

/** Cache parsed, bounded results (never raw ORS GeoJSON). In-flight requests share one task. */
export function createOrsResultCache({
  maxEntries = 160,
  successTtlMs = 6 * 60 * 60 * 1000,
  missingTtlMs = 5 * 60 * 1000,
  now = () => Date.now(),
} = {}) {
  const entries = new Map<string, { value: unknown; expiresAt: number }>();
  const inFlight = new Map<string, Promise<unknown>>();
  return {
    async getOrLoad<T>(key: string, load: () => Promise<T | null>): Promise<T | null> {
      const hit = entries.get(key);
      if (hit && hit.expiresAt > now()) {
        entries.delete(key);
        entries.set(key, hit); // LRU refresh
        return hit.value as T | null;
      }
      entries.delete(key);
      const pending = inFlight.get(key);
      if (pending) return pending as Promise<T | null>;
      const next = (async () => {
        const value = await load();
        entries.set(key, { value, expiresAt: now() + (value === null ? missingTtlMs : successTtlMs) });
        while (entries.size > maxEntries) entries.delete(entries.keys().next().value!);
        return value;
      })();
      inFlight.set(key, next);
      try { return await next; }
      finally { inFlight.delete(key); }
    },
    size() { return entries.size; },
  };
}
