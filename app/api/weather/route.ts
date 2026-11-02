import {
  getWeather,
  mountain,
  validateQuery,
  WeatherInputError,
} from "@/lib/weather/service";
export const runtime = "nodejs";
// GeoMet cold-cache sampling involves multiple bounded WMS requests.
export const maxDuration = 60;
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const started = Date.now();
  const headers = { "Cache-Control": "no-store", "Server-Timing": "" };
  try {
    const params = new URL(request.url).searchParams,
      query = validateQuery(params);
    const data =
      params.get("model") === "1"
        ? await mountain(query.lat, query.lng, query.date, query.zone)
        : await getWeather(query, { summary: params.get("view") === "summary" });
    headers["Server-Timing"] = `weather;dur=${Date.now() - started}`;
    return Response.json(data, { headers });
  } catch (error) {
    headers["Server-Timing"] = `weather;dur=${Date.now() - started}`;
    return Response.json(
      {
        error:
          error instanceof WeatherInputError
            ? error.message
            : "Weather is temporarily unavailable. Please retry.",
      },
      { status: error instanceof WeatherInputError ? 400 : 503, headers },
    );
  }
}
