/** Live ECCC weather smoke test. */
import { getWeather, validateQuery } from "../lib/weather/service";

async function main() {
  const locations = [
    ["Whistler", 50.12, -122.95],
    ["Singing Pass area", 50.07, -122.86],
    ["Toronto", 43.65, -79.38],
  ] as const;

  for (const [name, lat, lng] of locations) {
    const started = Date.now();

    const data = await getWeather(
      validateQuery(
        new URLSearchParams({
          lat: String(lat),
          lng: String(lng),
        })
      )
    );

    if (data.alerts.status !== "ok") {
      throw new Error(`${name}: ECCC alerts unavailable`);
    }

    if (data.hourly.length === 0) {
      throw new Error(`${name}: model temperature samples unavailable`);
    }

    if (data.daily.length === 0) {
      throw new Error(`${name}: no daily model summary`);
    }

    console.log(
      `${name}: ${data.hourly.length} samples, ` +
      `${data.daily.length} days, ` +
      `models=${data.modelsAvailable.join(",")}, ` +
      `first=${data.hourly[0].model} ` +
      `${data.hourly[0].temperature}°C, ` +
      `${Date.now() - started}ms`
    );
  }
}

main().catch((error) => {
  console.error("Weather smoke test failed:", error);
  throw error;
});