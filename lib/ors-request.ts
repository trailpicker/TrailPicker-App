/**
 * Pure OpenRouteService request builder, shared by the server and regression tests.
 * Input point order in TrailPicker is [latitude, longitude]; ORS requires [longitude, latitude].
 * Never call this from the client or embed a real API key in browser code.
 */
export type ORSRequestKind = "snap" | "route";

type Coordinate = readonly [latitude: number, longitude: number];

export function buildORSRequest(
  kind: ORSRequestKind,
  coordinates: ReadonlyArray<Coordinate>,
  apiKey: string,
  snapRadiusM: number,
) {
  const path = kind === "snap"
    ? "snap/foot-hiking/json"
    : "directions/foot-hiking/geojson";

  const locations = coordinates.map(([lat, lng]) => [lng, lat]);
  const input = kind === "snap"
    ? { locations, radius: snapRadiusM }
    : { coordinates: locations, instructions: false, elevation: true };

  return {
    url: `https://api.heigit.org/openrouteservice/v2/${path}`,
    options: {
      method: "POST" as const,
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
        // /geojson produces application/geo+json. Sending only application/json
        // caused the provider's 406 / error 2007 response.
        Accept: kind === "route" ? "application/geo+json" : "application/json",
      },
      body: JSON.stringify(input),
    },
  };
}

