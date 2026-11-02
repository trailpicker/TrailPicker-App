/** Bounded per-server-instance TTL cache, single-flight fetches, capped concurrency. */
export class WeatherCache {
  private values = new Map<string, { value: unknown; at: number }>();
  private pending = new Map<
    string,
    Promise<{ value: unknown; at: number; stale: boolean }>
  >();
  constructor(
    private limit = 256,
    private clock = Date.now,
  ) {}
  async get<T>(
    key: string,
    ttl: number,
    staleFor: number,
    load: () => Promise<T>,
  ): Promise<{ value: T; at: number; stale: boolean }> {
    const old = this.values.get(key),
      now = this.clock();
    if (old && now - old.at < ttl)
      return { ...old, value: old.value as T, stale: false };
    const pending = this.pending.get(key);
    if (pending)
      return pending as Promise<{ value: T; at: number; stale: boolean }>;
    if (this.pending.size >= 64)
      throw Error("Weather service busy. Try again shortly.");
    const work = (async () => {
      try {
        const value = await load(),
          at = this.clock();
        this.values.delete(key);
        this.values.set(key, { value, at });
        while (this.values.size > this.limit)
          this.values.delete(this.values.keys().next().value!);
        return { value, at, stale: false };
      } catch (e) {
        if (old && this.clock() - old.at < ttl + staleFor)
          return { value: old.value as T, at: old.at, stale: true };
        throw e;
      } finally {
        this.pending.delete(key);
      }
    })();
    this.pending.set(key, work);
    return work;
  }
}
let running = 0;
const queue: (() => void)[] = [];
export async function limited<T>(work: () => Promise<T>): Promise<T> {
  if (running >= 6) {
    if (queue.length >= 64) throw Error("Weather service busy.");
    await new Promise<void>((r) => queue.push(r));
  } else running++;
  try {
    return await work();
  } finally {
    const next = queue.shift();
    if (next) next();
    else running--;
  }
}
