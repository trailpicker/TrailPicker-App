import { parseSnapResponse } from "@/lib/trail-routing";
import { orsCoordinateKey } from "@/lib/ors-request-control";
import { queryORS, trailRoutingRequest, TrailRoutingError, orsResultCache } from "@/lib/trail-routing-server";

export async function POST(request: Request) {
  try {
    const body = await trailRoutingRequest(request, "snap");
    const coordinates = [body.point!];
    const result = await orsResultCache.getOrLoad(
      orsCoordinateKey("snap", coordinates),
      async () => {
        try { return parseSnapResponse(await queryORS("snap", coordinates)); }
        catch (error) {
          if (error instanceof TrailRoutingError && error.status === 422) return null;
          throw error;
        }
      },
    );
    if (!result) return Response.json({ error: "No hiking trail within 75 m. The waypoint was left in place." }, { status: 422 });
    return Response.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const status = error instanceof TrailRoutingError ? error.status : 500;
    return Response.json({ error: error instanceof TrailRoutingError ? error.message : "Could not snap to a trail." },
      { status, headers: error instanceof TrailRoutingError && error.retryAfterSeconds
        ? { "Retry-After": String(error.retryAfterSeconds), "Cache-Control": "no-store" }
        : { "Cache-Control": "no-store" } });
  }
}

