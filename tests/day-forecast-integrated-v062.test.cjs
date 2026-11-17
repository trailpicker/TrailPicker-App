const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const itinerary = fs.readFileSync(path.join(root, "components/builder/TripPlanner/DayStopsItinerary.tsx"), "utf8");
const weather = fs.readFileSync(path.join(root, "components/builder/TripPlanner/WeatherPanel.tsx"), "utf8");

test("Day Forecast passes solar data into its existing weather panel", () => {
  assert.match(itinerary, /<WeatherPanel[\s\S]*?daylight=\{forecastSolar\}/);
  assert.doesNotMatch(itinerary, /Approximate solar times at the selected forecast location/);
  assert.doesNotMatch(itinerary, /Terrain and weather can reduce usable daylight/);
  assert.doesNotMatch(itinerary, /<Sunset\b/);
});

test("Sunrise and sunset render within the weather card, after its location selector", () => {
  const start = weather.indexOf('aria-label={`Day forecast for');
  const end = weather.indexOf('id={!date ? "weather"', start);
  const dayBranch = weather.slice(start, end);
  const selector = dayBranch.indexOf('label="Day forecast location"');
  const sunrise = dayBranch.indexOf('<Sunrise');
  const sunset = dayBranch.indexOf('<Sunset');
  const closingCard = dayBranch.indexOf('</section>');
  assert.ok(start >= 0 && selector >= 0 && sunrise > selector && sunset > sunrise && closingCard > sunset);
  assert.match(dayBranch, /<p className="mt-1\.5 text-\[11px\] text-gray-500">Times from \{daylight\.zone\}<\/p>/);
  assert.match(dayBranch, /\{daylight && \(/);
});

test("Solar times still render when weather data is out of forecast range", () => {
  const dayBranch = weather.slice(weather.indexOf('aria-label={`Day forecast for'),weather.indexOf('id={!date ? "weather"'));
  assert.ok(dayBranch.indexOf('{daylight && (') > dayBranch.indexOf('!forecastAvailable || !hasNumbers'));
  assert.match(dayBranch, /daylight\.sunriseMinutes/);
  assert.match(dayBranch, /daylight\.sunsetMinutes/);
});

test("Trip-wide WeatherPanel remains unchanged unless an itinerary passes daylight", () => {
  assert.match(weather, /daylight\?: DaylightResult \| null;/);
  assert.equal((itinerary.match(/<WeatherPanel/g)||[]).length,1);
  assert.equal((weather.match(/Times from \{daylight\.zone\}/g)||[]).length,1);
});
