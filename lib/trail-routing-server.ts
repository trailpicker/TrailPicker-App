import "server-only";
import { requireBuildAccess } from "@/lib/build-access";
import { TRAIL_SNAP_RADIUS_M, validLatLng, type LatLng } from "@/lib/trail-routing";
import { buildORSRequest } from "@/lib/ors-request";
import { createOrsTrafficController, createOrsResultCache, retryAfterSeconds,
  OrsCooldownError, OrsQueueFullError } from "@/lib/ors-request-control";

export class TrailRoutingError extends Error {
  constructor(message: string, public status: number, public retryAfterSeconds?: number) { super(message); }
}

export async function trailRoutingRequest(request: Request, expected: "snap" | "route") {
  if (!process.env.ORS_API_KEY) throw new TrailRoutingError("Trail routing is not configured. Set ORS_API_KEY on the server.", 503);
  if (Number(request.headers.get("content-length") ?? 0) > 2048) throw new TrailRoutingError("Route request too large.", 413);
  let body: Record<string, unknown>;
  try { body = await request.json(); }
  catch { throw new TrailRoutingError("Invalid route request.", 400); }
  if (!body || typeof body !== "object" || typeof body.buildId !== "string" || !body.buildId || body.buildId.length > 200) {
    throw new TrailRoutingError("Missing build ID.", 400);
  }
  if (expected === "snap") {
    if (!validLatLng(body.point)) throw new TrailRoutingError("Invalid waypoint coordinates.", 400);
  } else {
    if (!validLatLng(body.from) || !validLatLng(body.to)) throw new TrailRoutingError("Invalid route coordinates.", 400);
  }
  try { await requireBuildAccess(body.buildId); }
  catch { throw new TrailRoutingError("You cannot edit this build.", 403); }
  return body as { buildId: string; point?: LatLng; from?: LatLng; to?: LatLng };
}

// Cache parsed route/snap results only, not large raw GeoJSON payloads.
// Shared between both endpoints in one Node process; resets on server restart.
export const orsResultCache = createOrsResultCache();
const orsTraffic = createOrsTrafficController();

/** Call the matching ORS endpoint with the media type it actually produces. */
export async function queryORS(kind: "snap" | "route", coordinates: LatLng[]) {
  const { url, options } = buildORSRequest(
    kind,
    coordinates,
    process.env.ORS_API_KEY!,
    TRAIL_SNAP_RADIUS_M,
  );

  return orsTraffic.schedule(async () => {
    let response: Response;
    try {
      response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(12000),
        cache: "no-store",
      });
    } catch (error) {
      console.error("openrouteservice connection failed:", error);
      throw new TrailRoutingError("Trail routing is temporarily unavailable.", 503);
    }

    if (!response.ok) {
      const details = await response.text().catch(() => "");
      console.error("openrouteservice routing error:", {
        kind, status: response.status, details: details.slice(0, 1000),
      });
      if (response.status === 401 || response.status === 403) {
        throw new TrailRoutingError("Routing API key was rejected or access is denied. Check ORS_API_KEY.", 503);
      }
      if (response.status === 429) {
        const seconds = retryAfterSeconds(response.headers.get("Retry-After"));
        orsTraffic.cooldown(seconds);
        throw new TrailRoutingError("Trail routing rate limit reached. Try again later.", 429, seconds);
      }
      if (response.status === 406) {
        throw new TrailRoutingError("The routing provider rejected the response format. Check ORS request headers.", 502);
      }
      // ORS uses HTTP 404 / code 2010 when a waypoint is outside its routable
      // hiking graph. This is a missing trail, not a missing API endpoint.
      if (response.status === 404 && kind === "route") {
        let code: unknown;
        try { code = (JSON.parse(details) as { error?: { code?: unknown } }).error?.code; }
        catch { /* Keep genuine endpoint errors distinguishable. */ }
        if (code === 2010) {
          throw new TrailRoutingError("No routable hiking trail found near one or more waypoints. Move the waypoint closer to a mapped trail or use a manual segment.", 422);
        }
      }
      if (response.status === 400 || response.status === 404) {
        throw new TrailRoutingError("The routing provider rejected the request or endpoint. Check server logs.", 502);
      }
      if (response.status === 422) {
        throw new TrailRoutingError(
          kind === "snap" ? "No hiking trail found within the snapping radius." : "No connected hiking route found for those stops.",
          422,
        );
      }
      throw new TrailRoutingError("Trail routing provider is temporarily unavailable.", 503);
    }

    try {
      return await response.json() as unknown;
    } catch {
      throw new TrailRoutingError("Routing provider returned an invalid JSON response.", 502);
    }
  }).catch(error => {
    if (error instanceof OrsCooldownError) throw new TrailRoutingError(error.message, 429, error.retryAfterSeconds);
    if (error instanceof OrsQueueFullError) throw new TrailRoutingError(error.message, 503);
    throw error;
  });

}
