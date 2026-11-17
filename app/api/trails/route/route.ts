import { parseRouteResponse, type LatLng } from "@/lib/trail-routing";
import { validShapingWaypoints } from "@/lib/route-shaping";
import { orsCoordinateKey } from "@/lib/ors-request-control";
import { queryORS, trailRoutingRequest, TrailRoutingError, orsResultCache } from "@/lib/trail-routing-server";

export async function POST(request: Request) {
  try {
    // Keep access and endpoint validation centralized. The original request is
    // consumed there; clone it to also read optional intermediate coordinates.
    const extra = await request.clone().json().catch(() => null) as unknown;
    const body = await trailRoutingRequest(request, "route");
    const rawVia = extra && typeof extra === "object" ? (extra as Record<string, unknown>).via : undefined;
    if (rawVia !== undefined && !validShapingWaypoints(rawVia)) {
      throw new TrailRoutingError("Invalid route-shaping waypoint coordinates.", 400);
    }
    const via: LatLng[] = (rawVia as LatLng[] | undefined) ?? [];
    const coordinates = [body.from!, ...via, body.to!];
    const result = await orsResultCache.getOrLoad(
      orsCoordinateKey("route", coordinates),
      async () => {
        try { return parseRouteResponse(await queryORS("route", coordinates), body.from!, body.to!); }
        catch (error) {
          // ORS 422 (including provider 404/code 2010) is a missing trail; avoid asking again for the
          // exact same coordinates during the short negative-cache lifetime.
          if (error instanceof TrailRoutingError && error.status === 422) return null;
          throw error;
        }
      },
    );
    if (!result) return Response.json({ error: "No connected hiking trail found for these stops. Use a manual segment instead." }, { status: 422 });
    return Response.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const status = error instanceof TrailRoutingError ? error.status : 500;
    return Response.json({ error: error instanceof TrailRoutingError ? error.message : "Could not follow trails." },
      { status, headers: error instanceof TrailRoutingError && error.retryAfterSeconds
        ? { "Retry-After": String(error.retryAfterSeconds), "Cache-Control": "no-store" }
        : { "Cache-Control": "no-store" } });
  }
}



