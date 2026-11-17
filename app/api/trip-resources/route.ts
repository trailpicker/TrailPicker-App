import { requireBuildAccess } from "@/lib/build-access";
import { parseOsmResources } from "@/lib/trip-resources";

/** Explicit opt-in discovery. OSM locations are leads, not verified access or potable water. */
export const runtime = "nodejs";
const cache = new Map<string, { expires: number; value: ReturnType<typeof parseOsmResources> }>();
const lastSearch = new Map<string, number>();
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const buildId = params.get("buildId") ?? "";
  try { await requireBuildAccess(buildId); }
  catch { return Response.json({ error: "You do not have access to this trip." }, { status: 403 }); }
  const lat = Number(params.get("lat")), lng = Number(params.get("lng")), radius = Number(params.get("radius") ?? "3000");
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || !Number.isInteger(radius) || radius < 300 || radius > 5000 || lat < 48 || lat > 60.5 || lng < -140 || lng > -113) {
    return Response.json({ error: "Choose a valid BC map position and a radius of 300–5000 m." }, { status: 400 });
  }
  const key = `${lat.toFixed(3)},${lng.toFixed(3)},${radius}`;
  const stored = cache.get(key);
  if (stored && stored.expires > Date.now()) return Response.json({ results: stored.value, source: "OpenStreetMap", cached: true });
  const previous = lastSearch.get(buildId) ?? 0;
  if (Date.now() - previous < 30000) return Response.json({ error: "Try the resource search again in about 30 seconds." }, { status: 429 });
  lastSearch.set(buildId, Date.now());
  const api = process.env.OVERPASS_API_URL ?? "https://overpass-api.de/api/interpreter";
  if (api !== "https://overpass-api.de/api/interpreter" && !/^https:\/\/[-a-z0-9.]+(?:\/[\w/-]+)?$/i.test(api)) return Response.json({ error: "Invalid configured map data endpoint." }, { status: 503 });
  const around = `(around:${radius},${lat.toFixed(5)},${lng.toFixed(5)})`;
  const query = `[out:json][timeout:15];(nwr["tourism"~"^(camp_site|camp_pitch)$"]${around};nwr["amenity"="drinking_water"]${around};nwr["natural"="spring"]${around};);out center 80;`;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 17500);
    let response: Response;
    try { response = await fetch(api, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "TrailPicker/0.4 (trail logistics resource discovery)" }, body: new URLSearchParams({ data: query }).toString(), signal: controller.signal, cache: "no-store" }); }
    finally { clearTimeout(timeout); }
    if (!response.ok) throw new Error(`Map data service unavailable (${response.status}).`);
    const data: unknown = await response.json();
    const results = parseOsmResources(data);
    if (cache.size > 100) cache.delete(cache.keys().next().value!);
    cache.set(key, { expires: Date.now() + 12 * 60 * 60 * 1000, value: results });
    return Response.json({ results, source: "OpenStreetMap", cached: false }, { headers: { "Cache-Control": "private, max-age=600" } });
  } catch {
    return Response.json({ error: "Map data is temporarily unavailable. You can still add campsite and water stops manually." }, { status: 503 });
  }
}
