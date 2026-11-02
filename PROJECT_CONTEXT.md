# PROJECT CONTEXT

> Generated automatically. Treat source files as authoritative; summaries are derived metadata.

- Generated: 2026-11-02T18:31:08.742Z
- Root: `trailpicker`
- Files scanned: 153
- Files included with readable text: 152
- Total included source lines: 18,509
- Total scanned size: 2.3 MB
- Max file size: 293.0 KB


## PROJECT STRUCTURE

```text
├── .github/
│   └── workflows/
│       └── ci.yml
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   └── weather/
│   │       └── route.ts
│   ├── build/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   ├── actions.ts
│   │   └── page.tsx
│   ├── gear/
│   │   ├── [id]/
│   │   │   ├── [subcategory]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   └── review-actions.ts
│   ├── profile/
│   │   ├── builds/
│   │   │   └── page.tsx
│   │   ├── edit/
│   │   │   └── page.tsx
│   │   ├── favorites/
│   │   │   └── page.tsx
│   │   ├── gear/
│   │   │   ├── actions.ts
│   │   │   └── page.tsx
│   │   ├── reviews/
│   │   │   └── page.tsx
│   │   ├── actions.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── settings/
│   │   ├── export/
│   │   │   └── route.ts
│   │   ├── actions.ts
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── build/
│   │   ├── CreateTripDetails.tsx
│   │   ├── DateRangePicker.tsx
│   │   ├── DestinationPicker.tsx
│   │   ├── LocationMap.tsx
│   │   └── LocationPicker.tsx
│   ├── builder/
│   │   ├── TripPlanner/
│   │   │   ├── DayStopsItinerary.tsx
│   │   │   ├── PlannerFields.tsx
│   │   │   ├── ResizableRouteLayout.tsx
│   │   │   ├── RouteMapInner.tsx
│   │   │   ├── TripEditForm.tsx
│   │   │   ├── TripLogistics.tsx
│   │   │   ├── TripPlanner.tsx
│   │   │   ├── TripPlanningWorkspace.tsx
│   │   │   ├── TripRoute.tsx
│   │   │   ├── TripSummaryCard.tsx
│   │   │   ├── WaypointIcon.tsx
│   │   │   ├── WaypointSearch.tsx
│   │   │   └── WeatherPanel.tsx
│   │   ├── AddCustomItemForm.tsx
│   │   ├── AddGearButton.tsx
│   │   ├── AnalysisFindingCard.tsx
│   │   ├── build-data-utils.ts
│   │   ├── BuildDataTools.tsx
│   │   ├── BuildHeader.tsx
│   │   ├── BuildRow.tsx
│   │   ├── BuildSaveStatus.tsx
│   │   ├── BuildSettings.tsx
│   │   ├── CompatibilityBar.tsx
│   │   ├── CompatibilityDetails.tsx
│   │   ├── ConsumablesTimeline.tsx
│   │   ├── CostSummary.tsx
│   │   ├── GearPicker.tsx
│   │   ├── ItemCategoryToggle.tsx
│   │   ├── PrivateBuildNotice.tsx
│   │   ├── PublicBuildView.tsx
│   │   ├── QuantityStepper.tsx
│   │   ├── RemoveGearButton.tsx
│   │   ├── ShareBar.tsx
│   │   ├── useIgnoredCompatibility.ts
│   │   ├── useIgnoredFindings.ts
│   │   └── WeightSummary.tsx
│   ├── filters/
│   │   ├── BrandFilter.tsx
│   │   ├── FilterSection.tsx
│   │   ├── RangeFilter.tsx
│   │   └── SortHeader.tsx
│   ├── gear/
│   │   ├── GearLibraryActions.tsx
│   │   ├── ProductBuildButton.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── ProductGallery.tsx
│   │   └── ReviewEditor.tsx
│   ├── profile/
│   │   ├── BuildCard.tsx
│   │   ├── DeleteBuildButton.tsx
│   │   └── GearLibraryCard.tsx
│   ├── settings/
│   │   ├── DisplayPreferencesProvider.tsx
│   │   └── SettingsClient.tsx
│   ├── Navbar.tsx
│   ├── NavbarNavigation.tsx
│   └── ProfileDropdown.tsx
├── data/
│   └── destinations.json
├── lib/
│   ├── weather/
│   │   ├── cache.ts
│   │   ├── canada.json
│   │   ├── client-cache.ts
│   │   ├── core.ts
│   │   ├── locations.ts
│   │   ├── model-forecast.ts
│   │   ├── presentation.ts
│   │   ├── service.ts
│   │   └── tz-lookup.d.ts
│   ├── build-access.ts
│   ├── build-history-actions.ts
│   ├── build-history.ts
│   ├── build-save-status.ts
│   ├── build-settings-actions.ts
│   ├── build-validation.ts
│   ├── build-visibility-actions.ts
│   ├── build-visibility.ts
│   ├── calculations.ts
│   ├── compatibility.ts
│   ├── consumables-model.ts
│   ├── destinations.ts
│   ├── finding-dismissals.ts
│   ├── gear-display.ts
│   ├── gear-selection-actions.ts
│   ├── guest-build-token.ts
│   ├── itinerary-links.ts
│   ├── pack-analysis.ts
│   ├── pack-intelligence.ts
│   ├── prisma.ts
│   ├── profile.ts
│   ├── tracked-build-actions.ts
│   ├── trip-planner-actions.ts
│   ├── trip-planner.ts
│   ├── trip.ts
│   ├── use-build-autosave.ts
│   ├── user-preferences.ts
│   └── waypoint-map.ts
├── prisma/
│   ├── migrations/
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   ├── seed-compatibility-specs.ts
│   └── seed.ts
├── tests/
│   ├── fixtures/
│   │   └── weather/
│   │       ├── alerts.json
│   │       ├── city.json
│   │       └── model.json
│   ├── build-history-transaction.test.cjs
│   ├── build-validation.test.cjs
│   ├── builder-ownership.test.cjs
│   ├── compatibility.test.mjs
│   ├── consumables-model.test.mjs
│   ├── pack-analysis.test.mjs
│   ├── pack-intelligence.test.mjs
│   ├── trip-planner.test.cjs
│   ├── user-preferences.test.mjs
│   ├── weather-client-cache.test.ts
│   ├── weather-ui.test.ts
│   └── weather.test.ts
├── tools/
│   ├── generate-docs.ts
│   └── weather-smoke.ts
├── .gitignore
├── auth.ts
├── docs.config.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── prisma.config.ts
├── README.md
└── tsconfig.json
```

## PACKAGE SUMMARY

- Name: trailpicker
- Version: 0.1.0
- Scripts: dev, build, start, lint, docs, test:weather, test, typecheck
- Package type: not specified

## INTERNAL IMPORTS / DEPENDENCIES

- `app/build/page.tsx` → `app/build/actions.ts` (import: `./actions`)
- `app/layout.tsx` → `app/globals.css` (import: `./globals.css`)
- `app/profile/edit/page.tsx` → `app/profile/actions.ts` (import: `../actions`)
- `components/build/CreateTripDetails.tsx` → `components/build/DestinationPicker.tsx` (import: `./DestinationPicker`)
- `components/build/CreateTripDetails.tsx` → `components/build/DateRangePicker.tsx` (import: `./DateRangePicker`)
- `components/build/DestinationPicker.tsx` → `components/build/LocationPicker.tsx` (import: `./LocationPicker`)
- `components/build/LocationPicker.tsx` → `components/build/LocationMap.tsx` (import: `./LocationMap`)
- `components/builder/BuildDataTools.tsx` → `components/builder/build-data-utils.ts` (import: `./build-data-utils`)
- `components/builder/CompatibilityBar.tsx` → `components/builder/useIgnoredFindings.ts` (import: `./useIgnoredFindings`)
- `components/builder/CompatibilityDetails.tsx` → `components/builder/AnalysisFindingCard.tsx` (import: `./AnalysisFindingCard`)
- `components/builder/CompatibilityDetails.tsx` → `components/builder/useIgnoredFindings.ts` (import: `./useIgnoredFindings`)
- `components/builder/PublicBuildView.tsx` → `components/builder/TripPlanner/TripPlanner.tsx` (import: `./TripPlanner/TripPlanner`)
- `components/builder/TripPlanner/DayStopsItinerary.tsx` → `components/builder/TripPlanner/WeatherPanel.tsx` (import: `./WeatherPanel`)
- `components/builder/TripPlanner/DayStopsItinerary.tsx` → `components/builder/TripPlanner/TripRoute.tsx` (import: `./TripRoute`)
- `components/builder/TripPlanner/DayStopsItinerary.tsx` → `components/builder/TripPlanner/WaypointIcon.tsx` (import: `./WaypointIcon`)
- `components/builder/TripPlanner/DayStopsItinerary.tsx` → `components/builder/TripPlanner/WaypointSearch.tsx` (import: `./WaypointSearch`)
- `components/builder/TripPlanner/TripPlanner.tsx` → `components/builder/TripPlanner/WeatherPanel.tsx` (import: `./WeatherPanel`)
- `components/builder/TripPlanner/TripPlanner.tsx` → `components/builder/TripPlanner/TripSummaryCard.tsx` (import: `./TripSummaryCard`)
- `components/builder/TripPlanner/TripPlanner.tsx` → `components/builder/TripPlanner/TripEditForm.tsx` (import: `./TripEditForm`)
- `components/builder/TripPlanner/TripPlanner.tsx` → `components/builder/TripPlanner/TripPlanningWorkspace.tsx` (import: `./TripPlanningWorkspace`)
- `components/builder/TripPlanner/TripPlanner.tsx` → `components/builder/TripPlanner/TripLogistics.tsx` (import: `./TripLogistics`)
- `components/builder/TripPlanner/TripPlanningWorkspace.tsx` → `components/builder/TripPlanner/DayStopsItinerary.tsx` (import: `./DayStopsItinerary`)
- `components/builder/TripPlanner/TripPlanningWorkspace.tsx` → `components/builder/TripPlanner/TripRoute.tsx` (import: `./TripRoute`)
- `components/builder/TripPlanner/TripRoute.tsx` → `components/builder/TripPlanner/WaypointIcon.tsx` (import: `./WaypointIcon`)
- `components/builder/TripPlanner/TripRoute.tsx` → `components/builder/TripPlanner/RouteMapInner.tsx` (import: `./RouteMapInner`)
- `components/builder/TripPlanner/TripRoute.tsx` → `components/builder/TripPlanner/ResizableRouteLayout.tsx` (import: `./ResizableRouteLayout`)
- `components/builder/TripPlanner/TripRoute.tsx` → `components/builder/TripPlanner/RouteMapInner.tsx` (import: `./RouteMapInner`)
- `components/profile/BuildCard.tsx` → `components/profile/DeleteBuildButton.tsx` (import: `./DeleteBuildButton`)
- `lib/build-validation.ts` → `lib/trip-planner.ts` (import: `./trip-planner`)
- `lib/finding-dismissals.ts` → `lib/pack-intelligence.ts` (import: `./pack-intelligence`)
- `lib/itinerary-links.ts` → `lib/trip-planner.ts` (import: `./trip-planner`)
- `lib/itinerary-links.ts` → `lib/waypoint-map.ts` (import: `./waypoint-map`)
- `lib/pack-intelligence.ts` → `lib/pack-analysis.ts` (import: `./pack-analysis`)
- `lib/pack-intelligence.ts` → `lib/compatibility.ts` (import: `./compatibility`)
- `lib/pack-intelligence.ts` → `lib/trip-planner.ts` (import: `./trip-planner`)
- `lib/weather/client-cache.ts` → `lib/weather/service.ts` (import: `./service`)
- `lib/weather/locations.ts` → `lib/trip-planner.ts` (import: `../trip-planner`)
- `lib/weather/model-forecast.ts` → `lib/weather/core.ts` (import: `./core`)
- `lib/weather/presentation.ts` → `lib/weather/core.ts` (import: `./core`)
- `lib/weather/presentation.ts` → `lib/weather/service.ts` (import: `./service`)
- `lib/weather/service.ts` → `lib/weather/canada.json` (import: `./canada.json`)
- `lib/weather/service.ts` → `lib/weather/cache.ts` (import: `./cache`)
- `lib/weather/service.ts` → `lib/weather/core.ts` (import: `./core`)
- `lib/weather/service.ts` → `lib/weather/core.ts` (import: `./core`)
- `lib/weather/service.ts` → `lib/weather/model-forecast.ts` (import: `./model-forecast`)
- `tests/compatibility.test.mjs` → `lib/compatibility.ts` (import: `../lib/compatibility.ts`)
- `tests/consumables-model.test.mjs` → `lib/consumables-model.ts` (import: `../lib/consumables-model.ts`)
- `tests/pack-analysis.test.mjs` → `lib/pack-analysis.ts` (import: `../lib/pack-analysis.ts`)
- `tests/pack-intelligence.test.mjs` → `lib/pack-intelligence.ts` (import: `../lib/pack-intelligence.ts`)
- `tests/user-preferences.test.mjs` → `lib/user-preferences.ts` (import: `../lib/user-preferences.ts`)
- `tests/weather-client-cache.test.ts` → `lib/weather/client-cache.ts` (import: `../lib/weather/client-cache`)
- `tests/weather-ui.test.ts` → `lib/weather/model-forecast.ts` (import: `../lib/weather/model-forecast`)
- `tests/weather-ui.test.ts` → `lib/weather/presentation.ts` (import: `../lib/weather/presentation`)
- `tests/weather-ui.test.ts` → `lib/weather/service.ts` (import: `../lib/weather/service`)
- `tests/weather.test.ts` → `lib/weather/core.ts` (import: `../lib/weather/core`)
- `tests/weather.test.ts` → `lib/weather/cache.ts` (import: `../lib/weather/cache`)
- `tests/weather.test.ts` → `lib/weather/service.ts` (import: `../lib/weather/service`)
- `tests/weather.test.ts` → `lib/weather/locations.ts` (import: `../lib/weather/locations`)
- `tests/weather.test.ts` → `app/api/weather/route.ts` (import: `../app/api/weather/route`)
- `tools/weather-smoke.ts` → `lib/weather/service.ts` (import: `../lib/weather/service`)

## UNRESOLVED RELATIVE IMPORTS

- `next-env.d.ts` → `./.next/dev/types/routes.d.ts`
- `next-env.d.ts` → `./.next/dev/types/root-params.d.ts`
- `prisma/seed-compatibility-specs.ts` → `../app/generated/prisma/client`
- `prisma/seed.ts` → `../app/generated/prisma/client`

## TODO / FIXME / HACK

- tools/generate-docs.ts:281 **TODO** |FIXME|HACK|XXX)\b[:\-]?\s*(.*)$/i);
- tools/generate-docs.ts:357 **TODO** / FIXME / HACK\n\n${todos.length ? todos.map(item => `- ${item}`).join('\n') : '_None detected._'}`);

## SKIPPED FILES

- `lib/weather/canada.json` — File exceeds maxFileBytes (293.0 KB).

## FILE INDEX

| File | Size | Lines | Status |
|---|---:|---:|---|
| `.github/workflows/ci.yml` | 1001 B | 35 | Included |
| `.gitignore` | 503 B | 44 | Included |
| `app/api/auth/[...nextauth]/route.ts` | 74 B | 2 | Included |
| `app/api/weather/route.ts` | 1.2 KB | 36 | Included |
| `app/build/[id]/page.tsx` | 11.3 KB | 262 | Included |
| `app/build/actions.ts` | 19.0 KB | 441 | Included |
| `app/build/page.tsx` | 4.3 KB | 116 | Included |
| `app/gear/[id]/[subcategory]/page.tsx` | 461 B | 10 | Included |
| `app/gear/[id]/page.tsx` | 1.7 KB | 24 | Included |
| `app/gear/page.tsx` | 409 B | 10 | Included |
| `app/gear/review-actions.ts` | 2.5 KB | 53 | Included |
| `app/globals.css` | 1.8 KB | 89 | Included |
| `app/layout.tsx` | 1.5 KB | 53 | Included |
| `app/page.tsx` | 2.1 KB | 120 | Included |
| `app/profile/actions.ts` | 2.8 KB | 61 | Included |
| `app/profile/builds/page.tsx` | 3.4 KB | 39 | Included |
| `app/profile/edit/page.tsx` | 2.8 KB | 25 | Included |
| `app/profile/favorites/page.tsx` | 3.3 KB | 39 | Included |
| `app/profile/gear/actions.ts` | 5.2 KB | 126 | Included |
| `app/profile/gear/page.tsx` | 5.7 KB | 74 | Included |
| `app/profile/layout.tsx` | 4.8 KB | 100 | Included |
| `app/profile/page.tsx` | 5.4 KB | 40 | Included |
| `app/profile/reviews/page.tsx` | 2.2 KB | 12 | Included |
| `app/settings/actions.ts` | 3.9 KB | 100 | Included |
| `app/settings/export/route.ts` | 1.6 KB | 49 | Included |
| `app/settings/page.tsx` | 1.4 KB | 43 | Included |
| `auth.ts` | 345 B | 10 | Included |
| `components/build/CreateTripDetails.tsx` | 10.6 KB | 332 | Included |
| `components/build/DateRangePicker.tsx` | 12.6 KB | 174 | Included |
| `components/build/DestinationPicker.tsx` | 11.9 KB | 410 | Included |
| `components/build/LocationMap.tsx` | 2.4 KB | 113 | Included |
| `components/build/LocationPicker.tsx` | 8.5 KB | 240 | Included |
| `components/builder/AddCustomItemForm.tsx` | 2.5 KB | 78 | Included |
| `components/builder/AddGearButton.tsx` | 875 B | 50 | Included |
| `components/builder/AnalysisFindingCard.tsx` | 3.2 KB | 30 | Included |
| `components/builder/build-data-utils.ts` | 3.3 KB | 103 | Included |
| `components/builder/BuildDataTools.tsx` | 25.1 KB | 532 | Included |
| `components/builder/BuildHeader.tsx` | 1.5 KB | 48 | Included |
| `components/builder/BuildRow.tsx` | 9.9 KB | 210 | Included |
| `components/builder/BuildSaveStatus.tsx` | 1.1 KB | 20 | Included |
| `components/builder/BuildSettings.tsx` | 5.8 KB | 118 | Included |
| `components/builder/CompatibilityBar.tsx` | 3.5 KB | 63 | Included |
| `components/builder/CompatibilityDetails.tsx` | 2.3 KB | 51 | Included |
| `components/builder/ConsumablesTimeline.tsx` | 18.1 KB | 421 | Included |
| `components/builder/CostSummary.tsx` | 839 B | 23 | Included |
| `components/builder/GearPicker.tsx` | 12.6 KB | 253 | Included |
| `components/builder/ItemCategoryToggle.tsx` | 2.6 KB | 90 | Included |
| `components/builder/PrivateBuildNotice.tsx` | 1008 B | 17 | Included |
| `components/builder/PublicBuildView.tsx` | 5.8 KB | 187 | Included |
| `components/builder/QuantityStepper.tsx` | 2.4 KB | 88 | Included |
| `components/builder/RemoveGearButton.tsx` | 652 B | 36 | Included |
| `components/builder/ShareBar.tsx` | 3.0 KB | 82 | Included |
| `components/builder/TripPlanner/DayStopsItinerary.tsx` | 32.5 KB | 703 | Included |
| `components/builder/TripPlanner/PlannerFields.tsx` | 1.7 KB | 66 | Included |
| `components/builder/TripPlanner/ResizableRouteLayout.tsx` | 5.4 KB | 130 | Included |
| `components/builder/TripPlanner/RouteMapInner.tsx` | 7.9 KB | 165 | Included |
| `components/builder/TripPlanner/TripEditForm.tsx` | 14.7 KB | 512 | Included |
| `components/builder/TripPlanner/TripLogistics.tsx` | 10.7 KB | 309 | Included |
| `components/builder/TripPlanner/TripPlanner.tsx` | 4.2 KB | 144 | Included |
| `components/builder/TripPlanner/TripPlanningWorkspace.tsx` | 1.4 KB | 52 | Included |
| `components/builder/TripPlanner/TripRoute.tsx` | 19.3 KB | 619 | Included |
| `components/builder/TripPlanner/TripSummaryCard.tsx` | 6.0 KB | 187 | Included |
| `components/builder/TripPlanner/WaypointIcon.tsx` | 463 B | 8 | Included |
| `components/builder/TripPlanner/WaypointSearch.tsx` | 5.0 KB | 80 | Included |
| `components/builder/TripPlanner/WeatherPanel.tsx` | 33.3 KB | 633 | Included |
| `components/builder/useIgnoredCompatibility.ts` | 2.7 KB | 60 | Included |
| `components/builder/useIgnoredFindings.ts` | 2.4 KB | 51 | Included |
| `components/builder/WeightSummary.tsx` | 2.6 KB | 86 | Included |
| `components/filters/BrandFilter.tsx` | 2.6 KB | 99 | Included |
| `components/filters/FilterSection.tsx` | 1.2 KB | 51 | Included |
| `components/filters/RangeFilter.tsx` | 2.1 KB | 109 | Included |
| `components/filters/SortHeader.tsx` | 1.5 KB | 77 | Included |
| `components/gear/GearLibraryActions.tsx` | 2.3 KB | 25 | Included |
| `components/gear/ProductBuildButton.tsx` | 1.1 KB | 12 | Included |
| `components/gear/ProductDetails.tsx` | 10.2 KB | 61 | Included |
| `components/gear/ProductGallery.tsx` | 1.9 KB | 23 | Included |
| `components/gear/ReviewEditor.tsx` | 3.4 KB | 24 | Included |
| `components/Navbar.tsx` | 1.3 KB | 35 | Included |
| `components/NavbarNavigation.tsx` | 7.3 KB | 108 | Included |
| `components/profile/BuildCard.tsx` | 3.5 KB | 34 | Included |
| `components/profile/DeleteBuildButton.tsx` | 461 B | 19 | Included |
| `components/profile/GearLibraryCard.tsx` | 5.9 KB | 30 | Included |
| `components/ProfileDropdown.tsx` | 6.8 KB | 230 | Included |
| `components/settings/DisplayPreferencesProvider.tsx` | 581 B | 24 | Included |
| `components/settings/SettingsClient.tsx` | 17.6 KB | 312 | Included |
| `data/destinations.json` | 57.9 KB | 1599 | Included |
| `docs.config.json` | 589 B | 20 | Included |
| `eslint.config.mjs` | 576 B | 20 | Included |
| `lib/build-access.ts` | 3.3 KB | 79 | Included |
| `lib/build-history-actions.ts` | 8.7 KB | 213 | Included |
| `lib/build-history.ts` | 11.6 KB | 303 | Included |
| `lib/build-save-status.ts` | 2.9 KB | 55 | Included |
| `lib/build-settings-actions.ts` | 991 B | 21 | Included |
| `lib/build-validation.ts` | 2.8 KB | 62 | Included |
| `lib/build-visibility-actions.ts` | 847 B | 18 | Included |
| `lib/build-visibility.ts` | 822 B | 21 | Included |
| `lib/calculations.ts` | 1.1 KB | 50 | Included |
| `lib/compatibility.ts` | 30.3 KB | 466 | Included |
| `lib/consumables-model.ts` | 1.3 KB | 38 | Included |
| `lib/destinations.ts` | 1.3 KB | 57 | Included |
| `lib/finding-dismissals.ts` | 2.6 KB | 65 | Included |
| `lib/gear-display.ts` | 1.2 KB | 22 | Included |
| `lib/gear-selection-actions.ts` | 572 B | 16 | Included |
| `lib/guest-build-token.ts` | 1.6 KB | 37 | Included |
| `lib/itinerary-links.ts` | 1.8 KB | 46 | Included |
| `lib/pack-analysis.ts` | 5.8 KB | 160 | Included |
| `lib/pack-intelligence.ts` | 15.1 KB | 181 | Included |
| `lib/prisma.ts` | 471 B | 20 | Included |
| `lib/profile.ts` | 1.5 KB | 44 | Included |
| `lib/tracked-build-actions.ts` | 2.9 KB | 32 | Included |
| `lib/trip-planner-actions.ts` | 7.1 KB | 101 | Included |
| `lib/trip-planner.ts` | 4.3 KB | 48 | Included |
| `lib/trip.ts` | 1.9 KB | 65 | Included |
| `lib/use-build-autosave.ts` | 5.0 KB | 98 | Included |
| `lib/user-preferences.ts` | 2.3 KB | 59 | Included |
| `lib/waypoint-map.ts` | 5.8 KB | 130 | Included |
| `lib/weather/cache.ts` | 1.9 KB | 63 | Included |
| `lib/weather/canada.json` | 1.5 MB | — | Skipped: File exceeds maxFileBytes (293.0 KB). |
| `lib/weather/client-cache.ts` | 1.3 KB | 39 | Included |
| `lib/weather/core.ts` | 12.5 KB | 432 | Included |
| `lib/weather/locations.ts` | 1.2 KB | 46 | Included |
| `lib/weather/model-forecast.ts` | 6.1 KB | 115 | Included |
| `lib/weather/presentation.ts` | 2.4 KB | 37 | Included |
| `lib/weather/service.ts` | 10.1 KB | 152 | Included |
| `lib/weather/tz-lookup.d.ts` | 101 B | 4 | Included |
| `next-env.d.ts` | 296 B | 8 | Included |
| `next.config.ts` | 259 B | 15 | Included |
| `package.json` | 1.1 KB | 43 | Included |
| `postcss.config.mjs` | 94 B | 8 | Included |
| `prisma/migrations/migration_lock.toml` | 128 B | 4 | Included |
| `prisma/schema.prisma` | 7.1 KB | 364 | Included |
| `prisma/seed-compatibility-specs.ts` | 1.8 KB | 43 | Included |
| `prisma/seed.ts` | 21.7 KB | 313 | Included |
| `prisma.config.ts` | 283 B | 15 | Included |
| `README.md` | 1.4 KB | 37 | Included |
| `tests/build-history-transaction.test.cjs` | 3.7 KB | 83 | Included |
| `tests/build-validation.test.cjs` | 2.4 KB | 39 | Included |
| `tests/builder-ownership.test.cjs` | 12.4 KB | 173 | Included |
| `tests/compatibility.test.mjs` | 12.9 KB | 219 | Included |
| `tests/consumables-model.test.mjs` | 919 B | 22 | Included |
| `tests/fixtures/weather/alerts.json` | 3.9 KB | 1 | Included |
| `tests/fixtures/weather/city.json` | 34.8 KB | 1 | Included |
| `tests/fixtures/weather/model.json` | 649 B | 28 | Included |
| `tests/pack-analysis.test.mjs` | 5.0 KB | 114 | Included |
| `tests/pack-intelligence.test.mjs` | 5.5 KB | 77 | Included |
| `tests/trip-planner.test.cjs` | 5.1 KB | 18 | Included |
| `tests/user-preferences.test.mjs` | 1.4 KB | 39 | Included |
| `tests/weather-client-cache.test.ts` | 734 B | 22 | Included |
| `tests/weather-ui.test.ts` | 2.0 KB | 31 | Included |
| `tests/weather.test.ts` | 12.5 KB | 374 | Included |
| `tools/generate-docs.ts` | 16.1 KB | 428 | Included |
| `tools/weather-smoke.ts` | 1.2 KB | 49 | Included |
| `tsconfig.json` | 834 B | 47 | Included |

## SOURCE FILES

### `.github/workflows/ci.yml`

```yaml
name: TrailPicker checks
on:
  push:
  pull_request:
jobs:
  verify:
    runs-on: ubuntu-latest
    env:
      DATABASE_URL: postgresql://trailpicker:trailpicker@localhost:5432/trailpicker
      AUTH_SECRET: local-ci-placeholder-not-for-production-123456
    services:
      postgres:
        image: postgres:17
        env:
          POSTGRES_USER: trailpicker
          POSTGRES_PASSWORD: trailpicker
          POSTGRES_DB: trailpicker
        ports:
          - 5432:5432
        options: >-
          --health-cmd "pg_isready -U trailpicker -d trailpicker"
          --health-interval 10s --health-timeout 5s --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      # Export did not include package-lock.json. Once committed, prefer npm ci.
      - run: npm install
      - run: npx prisma generate
      - run: npm run typecheck
      - run: npm run lint
      - run: npm test
      - run: npm run build

```

### `.gitignore`

```text
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

/app/generated/prisma

```

### `app/api/auth/[...nextauth]/route.ts`

```typescript
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

### `app/api/weather/route.ts`

```typescript
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

```

### `app/build/[id]/page.tsx`

```typescript
import { getBuildViewAccess } from "@/lib/build-visibility";
import PrivateBuildNotice from "@/components/builder/PrivateBuildNotice";
import PublicBuildView from "@/components/builder/PublicBuildView";
import { claimCurrentBuild } from "@/app/build/actions";
import { currentBuildUserId } from "@/lib/build-access";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { calculateWeightBreakdown, calculateTotalCost } from "@/lib/calculations";
import { type BuildForCompat, type CompatItem } from "@/lib/compatibility";
import WeightSummary from "@/components/builder/WeightSummary";
import BuildRow from "@/components/builder/BuildRow";
import BuildHeader from "@/components/builder/BuildHeader";
import CostSummary from "@/components/builder/CostSummary";
import ShareBar from "@/components/builder/ShareBar";
import CompatibilityBar from "@/components/builder/CompatibilityBar";
import CompatibilityDetails from "@/components/builder/CompatibilityDetails";
import {
  evaluateCompatibility,
} from "@/lib/compatibility";
import TripPlanner from "@/components/builder/TripPlanner/TripPlanner";
import { evaluatePackIntelligence, type IntelligenceItem } from "@/lib/pack-intelligence";

export default async function BuildPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { id } = await params;
  const view = await getBuildViewAccess(id);
  if (view.status === "missing") notFound();
  if (view.status === "private") return <PrivateBuildNotice buildId={id} />;
  const access = view.access;
  const canClaim = view.canEdit && access?.userId === null && !!(await currentBuildUserId());
  const { tab } = await searchParams;

  const activeTab = tab === "trip" ? "trip" : "gear";

  const build = await prisma.build.findUnique({
    where: view.canEdit && access ? { id, userId: access.userId } : { id, isPublic: true },
    include: {
      items: {
        include: {
          gear: {
            include: {
              brand: true,
              category: true,
              subcategory: true,
              images: true,
              specifications: true, // For explicitly labelled shelter sleeping capacity.
            },
          },
        },
      },
      days: { orderBy: { date: "asc" } },
    },
  });

  if (!build) notFound();

  const { base, consumable, worn, total } = calculateWeightBreakdown(build.items);
  const totalCost = calculateTotalCost(build.items);
  // Ownership belongs to the signed-in build owner, not the public viewer.
  const ownedGearIds = view.canEdit && access?.userId
    ? new Set((await prisma.ownedGear.findMany({
      where: { userId: access.userId, gearId: { in: build.items.flatMap(item => item.gearId ? [item.gearId] : []) } },
      select: { gearId: true },
    })).map(item => item.gearId))
    : new Set<string>();
  const costToBuy = calculateTotalCost(build.items.filter(item => !item.gearId || !ownedGearIds.has(item.gearId)));

  const compatBuild: BuildForCompat = {
    people: build.people,
    minTemperature: build.minTemperature,
    conditions: build.conditions,
    startDate: build.startDate,
    endDate: build.endDate,
  };

  const compatItems: CompatItem[] = build.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    isConsumable: item.isConsumable,
    isWorn: item.isWorn,
    customCategory: item.customCategory,
    gearNameSnapshot: item.gearNameSnapshot,
    weightSnapshot: item.weightSnapshot,
    priceSnapshot: item.priceSnapshot,
    gear: item.gear
      ? {
        id: item.gear.id,
        name: item.gear.name,
        weight_g: item.gear.weight_g,
        price_cad: item.gear.price_cad,
        capacity_l: item.gear.capacity_l,
        specifications: item.gear.specifications.map(spec => ({ key: spec.key, value: spec.value, unit: spec.unit })),
        frame_type: item.gear.frame_type,
        waterproof: item.gear.waterproof,
        temperature_rating: item.gear.temperature_rating,
        season: item.gear.season,
        category: { name: item.gear.category.name },
        subcategory: item.gear.subcategory
          ? { name: item.gear.subcategory.name, slug: item.gear.subcategory.slug }
          : null,
      }
      : null,
  }));
  const issues = evaluateCompatibility(compatBuild, compatItems, build.days);
  const intelligenceFindings = evaluatePackIntelligence(build, compatItems as IntelligenceItem[], build.days).findings;
  const analysisReviewCount = intelligenceFindings.filter(f => f.level === "critical" || f.level === "review").length;

  if (!view.canEdit) {
    const publicBuild = {
      id: build.id, name: build.name,
      location: build.location, locationLat: build.locationLat, locationLng: build.locationLng,
      startDate: build.startDate, endDate: build.endDate,
      people: build.people, minTemperature: build.minTemperature, conditions: build.conditions,
      routeWaypoints: build.routeWaypoints,
      days: build.days.map(day => ({
        id: day.id, date: day.date, minTemperature: day.minTemperature,
        conditions: day.conditions, notes: null,
        startLocation: day.startLocation, endLocation: day.endLocation,
        distanceKm: day.distanceKm, elevationGainM: day.elevationGainM,
        elevationLossM: day.elevationLossM, durationMinutes: day.durationMinutes,
        campsite: day.campsite, reservation: null, waterSource: day.waterSource,
        waterCarryL: day.waterCarryL, trailConditions: day.trailConditions,
        activities: day.activities,
      })),
      items: build.items.map(item => ({
        id: item.id, quantity: item.quantity, isWorn: item.isWorn,
        isConsumable: item.isConsumable, customCategory: item.customCategory,
        gearNameSnapshot: item.gearNameSnapshot, weightSnapshot: item.weightSnapshot,
        priceSnapshot: item.priceSnapshot,
        gear: item.gear ? {
          id: item.gear.id, name: item.gear.name, weight_g: item.gear.weight_g,
          price_cad: item.gear.price_cad, category: { name: item.gear.category.name },
        } : null,
      })),
    };
    return <PublicBuildView build={publicBuild} activeTab={activeTab}
      compatBuild={compatBuild} compatItems={compatItems}
      issueCount={analysisReviewCount} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {canClaim && (
        <form action={claimCurrentBuild} className="mx-5 mt-4 flex items-center justify-between gap-3 max-md:flex-wrap rounded-md border border-green-200 bg-green-50 p-3 text-sm">
          <input type="hidden" name="buildId" value={build.id} />
          <span>This guest build is saved in this browser for 30 days.</span>
          <button type="submit" className="rounded-md bg-green-800 px-3 py-2 font-medium text-white">Save to my account</button>
        </form>
      )}
      <BuildHeader
        buildId={build.id}
        name={build.name}
        active={activeTab}
        issueCount={analysisReviewCount}
      />

      <div className="mx-auto mt-4 max-w-screen-2xl px-4">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <CompatibilityBar
            buildId={build.id}
            trip={build}
            items={compatItems}
            totalWeight={total}
          />

          <div className="border-t border-gray-100">
            <ShareBar
              buildId={build.id}
              buildName={build.name}
              isPublic={build.isPublic}
              createdAt={build.createdAt}
              updatedAt={build.updatedAt}
            />
          </div>

        </div>
      </div>
      <main className="max-w-screen-2xl mx-auto p-2">

        {activeTab === "trip" ? (

          <TripPlanner
            build={{
              id: build.id,
              location: build.location,
              locationLat: build.locationLat,
              locationLng: build.locationLng,
              startDate: build.startDate,
              endDate: build.endDate,
              people: build.people,
              minTemperature: build.minTemperature,
              conditions: build.conditions,
              days: build.days,
              routeWaypoints: build.routeWaypoints,
              tripLogistics: build.tripLogistics,
            }}
            issues={issues}
            items={compatItems}
          />

        ) : (

          <>
            <div className="mt-10 overflow-hidden rounded-xl bg-white">
              <div className="grid max-md:hidden grid-cols-[180px_minmax(0,1fr)_100px_100px_100px] p-3 text-xs bg-gray-50 font-light text-gray-600">
                <div>Component</div>
                <div>Selection</div>
                <div className="text-center pr-5">Weight</div>
                <div className="text-center pr-5">Price</div>
                <div></div>
              </div>

              <BuildRow name="Backpack" gearLink="/gear/packs" selectCategory="packs" categoryName="Packs" buildId={build.id} ownedGearIds={ownedGearIds}
                items={build.items.filter((i) => i.gear?.category.name === "Packs" || i.customCategory === "Packs")} />
              <BuildRow name="Shelter" gearLink="/gear/shelter" selectCategory="shelter" categoryName="Shelter" buildId={build.id} ownedGearIds={ownedGearIds}
                items={build.items.filter((i) => i.gear?.category.name === "Shelter" || i.customCategory === "Shelter")} />
              <BuildRow name="Sleep System" gearLink="/gear/sleep" selectCategory="sleep" categoryName="Sleep" buildId={build.id} ownedGearIds={ownedGearIds}
                items={build.items.filter((i) => i.gear?.category.name === "Sleep" || i.customCategory === "Sleep")} />
              <BuildRow name="Cooking" gearLink="/gear/cooking" selectCategory="cooking" categoryName="Cooking" buildId={build.id} ownedGearIds={ownedGearIds}
                items={build.items.filter((i) => i.gear?.category.name === "Cooking" || i.customCategory === "Cooking")} />
              <BuildRow name="Water" gearLink="/gear/water" selectCategory="water" categoryName="Water" buildId={build.id} ownedGearIds={ownedGearIds}
                items={build.items.filter((i) => i.gear?.category.name === "Water" || i.customCategory === "Water")} />
              <BuildRow name="Clothing" gearLink="/gear/clothing" selectCategory="clothing" categoryName="Clothing" buildId={build.id} ownedGearIds={ownedGearIds}
                items={build.items.filter((i) => i.gear?.category.name === "Clothing" || i.customCategory === "Clothing")} />
              <BuildRow name="Electronics" gearLink="/gear/electronics" selectCategory="electronics" categoryName="Electronics" buildId={build.id} ownedGearIds={ownedGearIds}
                items={build.items.filter((i) => i.gear?.category.name === "Electronics" || i.customCategory === "Electronics")} />
              <BuildRow name="Miscellaneous" gearLink="/gear/misc" selectCategory="misc" categoryName="Misc" buildId={build.id} ownedGearIds={ownedGearIds}
                items={build.items.filter((i) => i.gear?.category.name === "Misc" || i.customCategory === "Misc")} />

              <CostSummary totalCost={totalCost} costToBuy={costToBuy} />
            </div>

            <WeightSummary
              base={base}
              consumable={consumable}
              worn={worn}
              total={total}
            />

            <CompatibilityDetails
              buildId={build.id}
              trip={build}
              items={compatItems}
            />
          </>

        )}

      </main>

    </div>
  );
}


```

### `app/build/actions.ts`

```typescript
"use server";

import { saveTripDetails, saveTripDay } from "@/lib/trip-planner-actions";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getDateRange } from "@/lib/trip";
import { currentBuildUserId, hasGuestBuildAccess, requireBuildAccess, requireBuildItemAccess, setCurrentBuild } from "@/lib/build-access";
import { guestBuildCookieName } from "@/lib/guest-build-token";
import { getDestination } from "@/lib/destinations";
import { Prisma } from "@/app/generated/prisma/client";
import { randomUUID } from "node:crypto";
import { remapRouteDays, validatedRoute } from "@/lib/itinerary-links";
import { getBuildSnapshot, lockBuild, mutateBuildWithRevision, recordBuildRevision } from "@/lib/build-history";
import { combinedQuantity, formNumber, formText, parseBuildDetails, parseLogistics, MAX_GEAR_QUANTITY } from "@/lib/build-validation";

function asRecord(value: unknown): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) throw new Error("Invalid TrailPicker import file.");
  return value as Record<string, unknown>;
}

function optionalText(value: unknown, max: number) {
  if (value == null || value === "") return null;
  if (typeof value !== "string" || value.length > max) throw new Error("Invalid TrailPicker import file.");
  return value;
}

function optionalNumber(value: unknown, min: number, max: number, integer = false) {
  if (value == null || value === "") return null;
  if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max || (integer && !Number.isInteger(value))) {
    throw new Error("Invalid TrailPicker import file.");
  }
  return value;
}

function importDate(value: unknown) {
  if (value == null || value === "") return null;
  if (typeof value !== "string") throw new Error("Invalid TrailPicker import file.");
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error("Invalid TrailPicker import date.");
  return date;
}

function importItem(value: unknown) {
  const item = asRecord(value);
  const quantity = optionalNumber(item.quantity, 1, 999, true) ?? 1;
  const gearId = optionalText(item.gearId, 200);
  const gearName = optionalText(item.gearName, 200);
  const gearNameSnapshot = optionalText(item.gearNameSnapshot, 200);
  return {
    gearId,
    gearName,
    quantity,
    isConsumable: item.isConsumable === true,
    isWorn: item.isWorn === true,
    customCategory: optionalText(item.customCategory, 100),
    gearNameSnapshot,
    weightSnapshot: optionalNumber(item.weightSnapshot, 0, 1_000_000, true),
    priceSnapshot: optionalNumber(item.priceSnapshot, 0, 1_000_000),
  };
}

function importDay(value: unknown) {
  const day = asRecord(value);
  const sourceId = optionalText(day.id, 200);
  const date = importDate(day.date);
  if (!date) throw new Error("Imported itinerary day is missing a date.");
  const text = (key: string, max = 5000) => optionalText(day[key], max);
  return {
    sourceId,
    date,
    minTemperature: optionalNumber(day.minTemperature, -100, 60, true),
    conditions: text("conditions", 20),
    notes: text("notes"),
    startLocation: text("startLocation", 500),
    endLocation: text("endLocation", 500),
    distanceKm: optionalNumber(day.distanceKm, 0, 1000),
    elevationGainM: optionalNumber(day.elevationGainM, 0, 20000, true),
    elevationLossM: optionalNumber(day.elevationLossM, 0, 20000, true),
    durationMinutes: optionalNumber(day.durationMinutes, 0, 1440, true),
    campsite: text("campsite"),
    reservation: text("reservation"),
    waterSource: text("waterSource"),
    waterCarryL: optionalNumber(day.waterCarryL, 0, 100),
    trailConditions: text("trailConditions"),
    activities: text("activities"),
  };
}

export async function getBuildExport(buildId: string) {
  const access = await requireBuildAccess(buildId);
  const snapshot = await getBuildSnapshot(access.id, access.userId);

  return {
    format: "trailpicker-build",
    version: 3,
    exportedAt: new Date().toISOString(),
    ...snapshot,
  };
}

export async function importBuildItems(formData: FormData) {
  const buildId = formData.get("buildId")?.toString() ?? "";
  const access = await requireBuildAccess(buildId);
  const raw = formData.get("payload");
  const mode = formData.get("mode") === "replace" ? "replace" : "merge";

  if (typeof raw !== "string" || raw.length > 2_000_000) throw new Error("Import file is missing or too large.");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("That file is not valid JSON.");
  }
  const payload = asRecord(parsed);
  if (payload.format != null && payload.format !== "trailpicker-build") throw new Error("That JSON file is not a TrailPicker build export.");
  if (!Array.isArray(payload.items) || payload.items.length > 1000) throw new Error("Import must contain no more than 1,000 gear items.");
  if (payload.days != null && (!Array.isArray(payload.days) || payload.days.length > 366)) throw new Error("Import must contain no more than 366 itinerary days.");

  const items = payload.items.map(importItem);
  const days = Array.isArray(payload.days) ? payload.days.map(importDay) : null;
  if (days && new Set(days.map(day => day.date.toISOString().slice(0, 10))).size !== days.length) {
    throw new Error("Imported itinerary contains duplicate dates.");
  }
  if (mode === "replace") {
    const ids = items.map(item => item.gearId).filter((id): id is string => Boolean(id));
    if (new Set(ids).size !== ids.length) throw new Error("Replacement import contains the same gear item more than once.");
  }
  // Reject invalid route objects before the database transaction rather than
  // storing values that readWaypoints later silently removes from the UI.
  const importRoute = mode === "replace" ? validatedRoute(payload.routeWaypoints) : null;
  const importLogistics = mode === "replace" ? parseLogistics(payload.tripLogistics) : null;
  const requestedGearIds = [...new Set(items.map((item) => item.gearId).filter((id): id is string => Boolean(id)))];
  const existingGear = requestedGearIds.length
    ? await prisma.gear.findMany({ where: { id: { in: requestedGearIds } }, select: { id: true } })
    : [];
  const existingGearIds = new Set(existingGear.map((gear) => gear.id));
  let unassignedStops = 0;

  await mutateBuildWithRevision(access.id, access.userId, "import",
    mode === "replace" ? `Imported and replaced build with ${items.length} gear items` : `Imported ${items.length} gear items`,
    async (tx) => {
    if (mode === "replace") {
      const startDate = importDate(payload.startDate);
      const endDate = importDate(payload.endDate);
      if ((startDate == null) !== (endDate == null) ||
          (startDate && endDate && (endDate < startDate || endDate.getTime() - startDate.getTime() > 365 * 86_400_000))) {
        throw new Error("Imported trip dates are invalid or exceed 366 days.");
      }

      const name = optionalText(payload.name, 100) ?? "Imported build";
      const people = optionalNumber(payload.people, 1, 100, true) ?? 1;
      const location = optionalText(payload.location, 500);
      const locationLat = optionalNumber(payload.locationLat, -90, 90);
      const locationLng = optionalNumber(payload.locationLng, -180, 180);
      if ((locationLat == null) !== (locationLng == null)) throw new Error("Imported coordinates must include latitude and longitude.");

      const importedRows = days
        ? days.map(({ sourceId, ...day }) => ({ ...day, id: randomUUID(), buildId: access.id, sourceId }))
        : startDate && endDate
          ? getDateRange(startDate, endDate).map((date) => ({ id: randomUUID(), buildId: access.id, date, sourceId: null }))
          : [];
      const linked = remapRouteDays(importRoute,
        days?.map((day) => ({ id: day.sourceId, date: day.date })) ?? [],
        importedRows,
      );
      unassignedStops = linked.unassignedCount;

      await tx.build.update({
        where: { id: access.id, userId: access.userId },
        data: {
          name,
          destinationId: optionalText(payload.destinationId, 200),
          location,
          locationLat,
          locationLng,
          startDate,
          endDate,
          people,
          minTemperature: optionalNumber(payload.minTemperature, -100, 60, true),
          conditions: optionalText(payload.conditions, 50),
          routeWaypoints: linked.points == null ? Prisma.DbNull : JSON.parse(JSON.stringify(linked.points)),
          tripLogistics: importLogistics == null ? Prisma.DbNull : importLogistics,
        },
      });

      await tx.buildItem.deleteMany({ where: { buildId: access.id } });
      await tx.tripDay.deleteMany({ where: { buildId: access.id } });

      if (importedRows.length) {
        await tx.tripDay.createMany({ data: importedRows.map(({ sourceId, ...row }) => {
          void sourceId;
          return row;
        }) });
      }
    }

    for (const item of items) {
      const gearId = item.gearId && existingGearIds.has(item.gearId) ? item.gearId : null;
      if (mode === "merge" && gearId) {
        const existing = await tx.buildItem.findUnique({
          where: { buildId_gearId: { buildId: access.id, gearId } },
          select: { quantity: true },
        });
        combinedQuantity(existing?.quantity ?? 0, item.quantity);
        await tx.buildItem.upsert({
          where: { buildId_gearId: { buildId: access.id, gearId } },
          update: {
            quantity: { increment: item.quantity },
            isConsumable: item.isConsumable,
            isWorn: item.isWorn,
          },
          create: {
            buildId: access.id,
            gearId,
            quantity: item.quantity,
            isConsumable: item.isConsumable,
            isWorn: item.isWorn,
          },
        });
      } else {
        await tx.buildItem.create({
          data: {
            buildId: access.id,
            gearId,
            quantity: item.quantity,
            isConsumable: item.isConsumable,
            isWorn: item.isWorn,
            customCategory: item.customCategory,
            gearNameSnapshot: gearId ? item.gearNameSnapshot : item.gearNameSnapshot ?? item.gearName ?? "Imported item",
            weightSnapshot: item.weightSnapshot,
            priceSnapshot: item.priceSnapshot,
          },
        });
      }
    }
  });
  revalidatePath(`/build/${access.id}`);
  revalidatePath("/profile/builds");

  return { mode, itemCount: items.length, dayCount: days?.length ?? 0, unassignedStops };
}

export async function duplicateBuild(formData: FormData) {
  const buildId = formData.get("buildId") as string;

  const access = await requireBuildAccess(buildId);
  const ownerId = await currentBuildUserId();
  const original = await prisma.build.findUnique({
    where: { id: buildId, userId: access.userId },
    include: { items: true, days: true },
  });

  if (!original) throw new Error("Build not found.");

  if (original.items.some(item => !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > MAX_GEAR_QUANTITY)) {
    throw new Error("This build contains an invalid gear quantity. Correct it before duplicating.");
  }
  const copiedDays = original.days.map((day) => ({ ...day, newId: randomUUID() }));
  const mappedRoute = remapRouteDays(
    validatedRoute(original.routeWaypoints),
    original.days,
    copiedDays.map((day) => ({ id: day.newId, date: day.date })),
  );
  const copy = await prisma.$transaction(async (tx) => {
    const created = await tx.build.create({
    data: {
      name: `${original.name} (copy)`,
      userId: ownerId,
      locationLat: original.locationLat,
      locationLng: original.locationLng,
      location: original.location,
      destinationId: original.destinationId,
      startDate: original.startDate,
      endDate: original.endDate,
      people: original.people,
      minTemperature: original.minTemperature,
      conditions: original.conditions,
      routeWaypoints: mappedRoute.points == null ? undefined : JSON.parse(JSON.stringify(mappedRoute.points)),
      tripLogistics: original.tripLogistics ?? undefined,
      days: { create: copiedDays.map(({ id, newId, buildId, createdAt, updatedAt, ...day }) => {
          // These fields belong to the original day, not the duplicated day.
          void id;
          void buildId;
          void createdAt;
          void updatedAt;
          return { ...day, id: newId };
        }) },
      items: {
        create: original.items.map((item) => ({
          gearId: item.gearId,
          quantity: item.quantity,
          isConsumable: item.isConsumable,
          isWorn: item.isWorn,
          customCategory: item.customCategory,
          gearNameSnapshot: item.gearNameSnapshot,
          weightSnapshot: item.weightSnapshot,
          priceSnapshot: item.priceSnapshot,
        })),
      },
    },
    });
    await recordBuildRevision(created.id, ownerId, "copy", `Created from ${original.name}`, tx);
    return created;
  });
  await setCurrentBuild(copy.id, !ownerId);
  redirect(`/build/${copy.id}`);
}
export async function setItemCategory(formData: FormData) {
  const buildId = formText(formData, "buildId", 200, true)!;
  const itemId = formText(formData, "itemId", 200, true)!;
  const category = formText(formData, "category", 20, true);
  if (!category || !["base", "worn", "consumable"].includes(category)) throw new Error("Invalid gear category.");
  const item = await requireBuildItemAccess(buildId, itemId);
  await mutateBuildWithRevision(buildId, item.accessUserId, "gear", "Changed gear category", async tx => {
    await tx.buildItem.update({
      where: { id: itemId, buildId, build: { userId: item.accessUserId } },
      data: { isWorn: category === "worn", isConsumable: category === "consumable" },
    });
  });
  revalidatePath(`/build/${buildId}`);
}

export async function addCustomItem(formData: FormData) {
  const buildId = formText(formData, "buildId", 200, true)!;
  const access = await requireBuildAccess(buildId);
  const category = formText(formData, "category", 100);
  const name = formText(formData, "name", 200, true)!;
  const weight = formNumber(formData, "weight_g", 0, 1_000_000, true);
  const price = formNumber(formData, "price_cad", 0, 1_000_000);
  await mutateBuildWithRevision(buildId, access.userId, "gear", `Added custom item: ${name}`, async tx => {
    await tx.buildItem.create({
      data: { buildId, customCategory: category, gearNameSnapshot: name, weightSnapshot: weight, priceSnapshot: price },
    });
  });
  redirect(`/build/${buildId}`);
}

export async function updateQuantity(formData: FormData) {
  const itemId = formText(formData, "itemId", 200, true)!;
  const buildId = formText(formData, "buildId", 200, true)!;
  const rawDelta = formText(formData, "delta", 2, true);
  if (rawDelta !== "1" && rawDelta !== "-1") throw new Error("Invalid quantity change.");
  const item = await requireBuildItemAccess(buildId, itemId);
  const delta = Number(rawDelta);
  await mutateBuildWithRevision(buildId, item.accessUserId, "gear", "Changed gear quantity", async tx => {
    // Conditional atomic update: concurrent requests cannot overwrite each other.
    const result = await tx.buildItem.updateMany({
      where: { id: itemId, buildId, build: { userId: item.accessUserId },
        quantity: delta === 1 ? { lt: MAX_GEAR_QUANTITY } : { gt: 1 } },
      data: { quantity: delta === 1 ? { increment: 1 } : { decrement: 1 } },
    });
    if (result.count !== 1 && delta === 1) throw new Error(`Maximum quantity is ${MAX_GEAR_QUANTITY}.`);
  });
  revalidatePath(`/build/${buildId}`);
}
export async function claimCurrentBuild(formData?: FormData) {
  const userId = await currentBuildUserId();
  if (!userId) return;
  const cookieStore = await cookies();
  const submittedId = formData?.get("buildId");
  const buildId = typeof submittedId === "string" ? submittedId : cookieStore.get("currentBuild")?.value;
  if (!buildId || !(await hasGuestBuildAccess(buildId))) return;
  const result = await prisma.$transaction(async tx => {
    await lockBuild(tx, buildId);
    return tx.build.updateMany({ where: { id: buildId, userId: null }, data: { userId } });
  });
  if (result.count) {
    cookieStore.delete(guestBuildCookieName(buildId));
    revalidatePath(`/build/${buildId}`);
    revalidatePath("/profile/builds");
  }
}
export async function createBuild(formData: FormData) {
  const ownerId = await currentBuildUserId();
  // Logged-in users may choose a default; guests always start private.
  const newBuildPublic = ownerId
    ? (await prisma.userSettings.findUnique({
        where: { userId: ownerId }, select: { defaultBuildPublic: true },
      }))?.defaultBuildPublic === true
    : false;
  const parsed = parseBuildDetails(formData);
  const selected = getDestination(parsed.destinationId);
  const location = selected ? `${selected.name}, ${selected.park}` : parsed.location;
  const locationLat = selected?.latitude ?? parsed.latitude;
  const locationLng = selected?.longitude ?? parsed.longitude;
  const build = await prisma.$transaction(async tx => {
    const created = await tx.build.create({
      data: {
        name: parsed.name,
        destinationId: selected?.id ?? null,
        location, locationLat, locationLng, ...parsed.dates,
        people: parsed.people, minTemperature: parsed.minTemperature,
        conditions: parsed.conditions, userId: ownerId, isPublic: newBuildPublic,
      },
    });
    if (created.startDate && created.endDate) {
      await tx.tripDay.createMany({
        data: getDateRange(created.startDate, created.endDate).map(date => ({ buildId: created.id, date })),
        skipDuplicates: true,
      });
    }
    await recordBuildRevision(created.id, ownerId, "create", "Created build", tx);
    return created;
  });
  await setCurrentBuild(build.id, !ownerId);
  redirect(`/build/${build.id}`);
}
export async function addGear(formData: FormData) {
  const buildId = formText(formData, "buildId", 200, true)!;
  const gearId = formText(formData, "gearId", 200, true)!;
  const access = await requireBuildAccess(buildId);
  await mutateBuildWithRevision(buildId, access.userId, "gear", "Added gear", async tx => {
    const existing = await tx.buildItem.findUnique({
      where: { buildId_gearId: { buildId, gearId } }, select: { quantity: true },
    });
    combinedQuantity(existing?.quantity ?? 0, 1);
    await tx.buildItem.upsert({
      where: { buildId_gearId: { buildId, gearId } },
      update: { quantity: { increment: 1 } },
      create: { buildId, gearId },
    });
  });
  redirect(`/build/${buildId}`);
}

export async function removeGear(formData: FormData) {
  const buildId = formText(formData, "buildId", 200, true)!;
  const itemId = formText(formData, "itemId", 200, true)!;
  const item = await requireBuildItemAccess(buildId, itemId);
  await mutateBuildWithRevision(buildId, item.accessUserId, "gear", "Removed gear", async tx => {
    await tx.buildItem.delete({ where: { id: itemId, buildId, build: { userId: item.accessUserId } } });
  });
  redirect(`/build/${buildId}`);
}

export async function updateTripDetails(formData: FormData) { return saveTripDetails(formData); }
export async function updateTripDay(formData: FormData) { return saveTripDay(formData); }

```

### `app/build/page.tsx`

```typescript
// app/build/page.tsx
import { createBuild } from "./actions";
import CreateTripDetails from "@/components/build/CreateTripDetails";

const features = [
  {
    label: "Add gear",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    label: "Track weight",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 0a4 4 0 100 8 4 4 0 000-8zm-7 15a7 7 0 0114 0" />
      </svg>
    ),
  },
  {
    label: "Optimize pack",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

export default function BuildPage() {
  return (
    <main
      className="min-h-[calc(100vh-64px)] flex items-center px-6 py-16 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.1) 100%), url('/garibaldi-lake.jpg')",
        backgroundPosition: "center 30%",
      }}
    >
      <div className="mx-auto grid w-full max-w-6xl items-start gap-14 lg:grid-cols-[1fr_1.05fr]">
        {/* Left — pitch */}
        <div className="lg:sticky lg:top-40 lg:self-start">
          <span className="inline-block rounded-full border border-white/30 bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
            Trip Builder
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-white drop-shadow-md leading-[1.1]">
            Plan your next backpacking trip
          </h1>

          <p className="mt-5 text-lg text-white/85 max-w-md drop-shadow-sm">
            Build your perfect setup, track weight, compare costs, and get
            ready for the trail.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            {features.map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur px-4 py-3 text-white"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-700 text-white">
                  {feature.icon}
                </span>
                <span className="text-sm font-semibold">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form card */}
        <div className="self-start min-w-0 rounded-3xl bg-white shadow-2xl border overflow-hidden">
          <div className="bg-green-900 px-8 py-5 flex items-center justify-between">
            <p className="trip-card text-lg font-bold text-white">Set Up Your Trip</p>
          </div>

          <form action={createBuild} className="px-8 py-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Trip Name
              </label>

              <input
                name="name"
                placeholder="My Summer Backpack"
                className="
                  w-full rounded-xl border px-4 py-3 text-lg
                  outline-none transition
                  focus:ring-2 focus:ring-green-700 focus:border-green-700
                "
                required
              />
            </div>

            <CreateTripDetails />

            <button
              className="
                w-full rounded-xl bg-green-900 py-3.5 text-lg font-semibold text-white
                hover:bg-green-800 transition cursor-pointer
                flex items-center justify-center gap-2
              "
            >
              Create Trip
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
```

### `app/gear/[id]/[subcategory]/page.tsx`

```typescript
import OriginalGearPicker, { type GearBrowseSearch } from "@/components/builder/GearPicker";

export default async function GearSubcategoryPage({ params, searchParams }: {
  params: Promise<{ id: string; subcategory: string }>;
  searchParams: Promise<GearBrowseSearch>;
}) {
  const [{ id, subcategory }, filters] = await Promise.all([params, searchParams]);
  return <OriginalGearPicker categorySlug={id} subcategorySlug={subcategory} filters={filters} />;
}

```

### `app/gear/[id]/page.tsx`

```typescript
import GearPicker, { type GearBrowseSearch } from "@/components/builder/GearPicker";
import ProductDetails from "@/components/gear/ProductDetails";
import { currentBuildUserId, findAccessibleBuild } from "@/lib/build-access";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function GearDetailPage({params,searchParams}:{params:Promise<{id:string}>;searchParams:Promise<GearBrowseSearch>}) {
  const {id}=await params;
  const category=await prisma.category.findUnique({where:{slug:id.toLowerCase()},select:{id:true}});
  if(category)return <GearPicker categorySlug={id} filters={await searchParams}/>;
  const gear=await prisma.gear.findUnique({where:{id},include:{brand:true,category:true,subcategory:true,images:{orderBy:[{isPrimary:"desc"},{id:"asc"}]},prices:{include:{retailer:true}},specifications:true,reviews:{orderBy:{createdAt:"desc"},include:{user:{select:{name:true,username:true}}}}}});
  if(!gear)notFound();
  const userId=await currentBuildUserId();
  const candidate=(await cookies()).get("currentBuild")?.value;
  const access=candidate?await findAccessibleBuild(candidate):null;
  const [owned,favorite,build]=await Promise.all([
    userId?prisma.ownedGear.findUnique({where:{userId_gearId:{userId,gearId:id}},select:{id:true}}):null,
    userId?prisma.favorite.findUnique({where:{userId_gearId:{userId,gearId:id}},select:{id:true}}):null,
    access?prisma.build.findUnique({where:{id:access.id,userId:access.userId},select:{id:true,name:true}}):null,
  ]);
  return <ProductDetails gear={gear} userId={userId} owned={Boolean(owned)} favorite={Boolean(favorite)} build={build}/>;
}

```

### `app/gear/page.tsx`

```typescript
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

// The obsolete all-gear listing is retired. Keep old bookmarks useful.
export default async function GearPage() {
  const category = await prisma.category.findFirst({ orderBy: { createdAt: "asc" }, select: { slug: true } });
  if (!category) notFound();
  redirect(`/gear/${encodeURIComponent(category.slug)}`);
}

```

### `app/gear/review-actions.ts`

```typescript
"use server";

import { currentBuildUserId } from "@/lib/build-access";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function userId() {
  const id = await currentBuildUserId();
  if (!id) throw new Error("Sign in to manage your reviews.");
  return id;
}
function text(form: FormData, key: string, max: number) {
  const value = form.get(key);
  if (typeof value !== "string" || value.trim().length > max) throw new Error(`Invalid ${key}.`);
  return value.trim();
}
function refresh(gearId: string) {
  revalidatePath(`/gear/${gearId}`);
  revalidatePath("/gear", "layout");
  revalidatePath("/profile/reviews");
}

export async function saveGearReview(form: FormData) {
  const owner = await userId();
  const gearId = text(form, "gearId", 200);
  if (!gearId) throw new Error("Choose a product.");
  const rating = Number(form.get("rating"));
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new Error("Choose a rating from 1 to 5.");
  const title = text(form, "title", 120);
  const body = text(form, "body", 4000);
  if (body.length < 10) throw new Error("Write at least 10 characters about your experience.");
  if (!await prisma.gear.findUnique({ where: { id: gearId }, select: { id: true } })) throw new Error("This product is no longer available.");
  await prisma.$transaction(async tx => {
    // The existing schema has no review unique key. Serialize writes for this
    // member/product pair without needing a database migration.
    await tx.$queryRaw`SELECT 1 AS locked FROM pg_advisory_xact_lock(hashtext(${owner}), hashtext(${gearId}))`;
    const existing = await tx.review.findFirst({ where: { userId: owner, gearId }, orderBy: { createdAt: "desc" }, select: { id: true } });
    if (existing) await tx.review.updateMany({ where: { id: existing.id, userId: owner, gearId }, data: { rating, title: title || null, body } });
    else await tx.review.create({ data: { userId: owner, gearId, rating, title: title || null, body } });
  });
  refresh(gearId);
}

export async function deleteGearReview(form: FormData) {
  const owner = await userId();
  const reviewId = text(form, "reviewId", 200);
  if (!reviewId) throw new Error("Choose a review.");
  const review = await prisma.review.findFirst({ where: { id: reviewId, userId: owner }, select: { gearId: true } });
  if (!review) throw new Error("Review not found.");
  await prisma.review.deleteMany({ where: { id: reviewId, userId: owner } });
  refresh(review.gearId);
}

```

### `app/globals.css`

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

html {
  overflow-y: scroll;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}

.range-slider {
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    #2563eb 0%,
    #2563eb var(--progress),
    #d1d5db var(--progress),
    #d1d5db 100%
  );
  cursor: pointer;
}

.range-slider::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 999px;
}

.range-slider::-webkit-slider-thumb {
  appearance: none;
  margin-top: -5px;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: white;
  border: 2px solid #2563eb;
  cursor: pointer;
}

.range-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: white;
  border: 2px solid #2563eb;
  cursor: pointer;
}

/* Make native and accessible button controls feel clickable site-wide. */
@layer base {
  button:not(:disabled):not([aria-disabled="true"]),
  input:is([type="button"], [type="submit"], [type="reset"]):not(:disabled):not([aria-disabled="true"]),
  [role="button"]:not([aria-disabled="true"]):not(:disabled),
  summary {
    cursor: pointer;
  }
}

/* Disabled controls stay disabled even when they have cursor-pointer utilities. */
button:is(:disabled, [aria-disabled="true"]),
input:is([type="button"], [type="submit"], [type="reset"]):is(:disabled, [aria-disabled="true"]),
[role="button"]:is(:disabled, [aria-disabled="true"]) {
  cursor: not-allowed;
}


```

### `app/layout.tsx`

```typescript
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { preferencesFromRow } from "@/lib/user-preferences";
import { DisplayPreferencesProvider } from "@/components/settings/DisplayPreferencesProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TrailPicker",
  description:
    "Build and compare backpacking gear with live weight and cost calculations.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user?.email
    ? await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { settings: true },
      })
    : null;
  const { weightUnit, distanceUnit, temperatureUnit } = preferencesFromRow(user?.settings);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <DisplayPreferencesProvider preferences={{ weightUnit, distanceUnit, temperatureUnit }}>
          <Navbar />
          <main className="flex-1">{children}</main>
        </DisplayPreferencesProvider>
      </body>
    </html>
  );
}

```

### `app/page.tsx`

```typescript
import Link from "next/link";
import { prisma } from "@/lib/prisma";


export default async function Home() {

  const popularGear = await prisma.gear.findMany({
    take: 4,
    include: {
      brand: true,
      category: true,
    },
  });


  return (
    <main>

      {/* Hero */}

      <section className="px-8 py-20 text-center">

        <h1 className="text-5xl font-bold">
          Build Your Perfect Backpacking Kit
        </h1>


        <p className="mt-5 text-lg text-gray-600">
          Compare gear, calculate weight,
          and create your ultimate trail setup.
        </p>


        <Link
          href="/gear"
          className="inline-block mt-8 rounded-lg bg-black px-6 py-3 text-white"
        >
          Browse Gear
        </Link>

      </section>



      {/* Categories */}

      <section className="px-8 py-12">

        <h2 className="text-3xl font-bold mb-6">
          Browse Categories
        </h2>


        <div className="grid gap-4 md:grid-cols-4">

          {[
            "Packs",
            "Shelter",
            "Sleep",
            "Cooking",
          ].map((category)=>(
            <div
              key={category}
              className="border rounded-xl p-6 text-center"
            >
              {category}
            </div>
          ))}

        </div>

      </section>



      {/* Popular Gear */}

      <section className="px-8 py-12">

        <h2 className="text-3xl font-bold mb-6">
          Popular Gear
        </h2>


        <div className="grid gap-6 md:grid-cols-4">

          {popularGear.map((item)=>(
            <Link
              key={item.id}
              href={`/gear/${item.id}`}
              className="border rounded-xl p-5 hover:shadow-lg"
            >

              <h3 className="font-bold">
                {item.name}
              </h3>


              <p className="text-gray-600">
                {item.brand.name}
              </p>


              <p className="mt-3">
                {item.weight_g}g
              </p>


            </Link>
          ))}

        </div>

      </section>



    </main>
  );
}
```

### `app/profile/actions.ts`

```typescript
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { mutateBuildWithRevision } from "@/lib/build-history";
import { duplicateBuild } from "@/app/build/actions";

async function currentUser() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("You must be signed in.");
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) throw new Error("User not found.");
  return user;
}

export async function deleteBuild(formData: FormData) {
  const user = await currentUser();
  const buildId = String(formData.get("buildId") || "");
  await prisma.build.deleteMany({ where: { id: buildId, userId: user.id } });
  revalidatePath("/profile");
  revalidatePath("/profile/builds");
}

export async function renameBuild(formData: FormData) {
  const user = await currentUser();
  const buildId = String(formData.get("buildId") || "");
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Build name is required.");
  await mutateBuildWithRevision(buildId, user.id, "settings", "Renamed build", async tx => {
    const result = await tx.build.updateMany({ where: { id: buildId, userId: user.id }, data: { name: name.slice(0, 80) } });
    if (result.count !== 1) throw new Error("Build not found.");
  });
  revalidatePath("/profile");
  revalidatePath("/profile/builds");
}

export async function duplicateProfileBuild(formData: FormData) {
  const user = await currentUser();
  const buildId = String(formData.get("buildId") || "");
  // Reuse the canonical copy implementation, preserving routes, all day fields,
  // logistics and remapped day IDs. Never maintain a second partial copy path.
  const owned = await prisma.build.findFirst({ where: { id: buildId, userId: user.id }, select: { id: true } });
  if (!owned) throw new Error("Build not found.");
  return duplicateBuild(formData);
}

export async function updateProfile(formData: FormData) {
  const user = await currentUser();
  const name = String(formData.get("name") || "").trim();
  const username = String(formData.get("username") || "").trim().toLowerCase();
  const bio = String(formData.get("bio") || "").trim();
  const location = String(formData.get("location") || "").trim();
  if (!name) throw new Error("Display name is required.");
  if (username && !/^[a-z0-9_]{3,24}$/.test(username)) throw new Error("Username must be 3–24 letters, numbers, or underscores.");
  await prisma.user.update({ where: { id: user.id }, data: { name, username: username || null, bio: bio || null, location: location || null, isProfilePublic: formData.get("isProfilePublic") === "on" } });
  revalidatePath("/profile", "layout");
  redirect("/profile");
}

```

### `app/profile/builds/page.tsx`

```typescript
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import BuildCard from "@/components/profile/BuildCard";
import { buildStatus } from "@/lib/profile";
import { Plus, Search } from "lucide-react";

type Params = { view?: string; sort?: string; q?: string };

export default async function BuildsPage({ searchParams }: { searchParams: Promise<Params> }) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin?callbackUrl=/profile/builds");
  const params = await searchParams;
  const builds = await prisma.build.findMany({
    where: { user: { email: session.user.email }, ...(params.q ? { name: { contains: params.q, mode: "insensitive" } } : {}) },
    orderBy: params.sort === "trip" ? { startDate: "asc" } : params.sort === "name" ? { name: "asc" } : { updatedAt: "desc" },
    include: { items: { include: { gear: { select: { weight_g: true, price_cad: true } } } } },
  });
  const account = await prisma.user.findUnique({
    where: { email: session.user.email }, select: { settings: { select: { weightUnit: true } } },
  });
  const weightUnit = account?.settings?.weightUnit === "imperial" ? "imperial" : "metric";
  const visible = params.view && params.view !== "all" ? builds.filter((build) => buildStatus(build) === params.view) : builds;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold text-green-700">Pack library</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">My Builds</h2><p className="mt-2 text-sm text-slate-500">{visible.length} {visible.length === 1 ? "build" : "builds"}</p></div><Link href="/build" className="flex items-center justify-center gap-2 rounded-xl bg-green-900 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800"><Plus className="h-4 w-4" />New build</Link></div>
      <form className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:grid-cols-[1fr_auto_auto]">
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3"><Search className="h-4 w-4 text-slate-400" /><input name="q" defaultValue={params.q} placeholder="Search builds" className="w-full py-2.5 text-sm outline-none" /></label>
        <select name="view" defaultValue={params.view || "all"} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="all">All builds</option><option value="upcoming">Upcoming</option><option value="past">Past</option><option value="undated">No dates</option></select>
        <select name="sort" defaultValue={params.sort || "recent"} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="recent">Recently edited</option><option value="trip">Trip date</option><option value="name">Name</option></select>
        <button className="sr-only">Apply filters</button>
      </form>
      {visible.length ? <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{visible.map((build) => <BuildCard key={build.id} build={build} weightUnit={weightUnit} />)}</div> : <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center"><h3 className="text-xl font-bold text-slate-900">No builds found</h3><p className="mt-2 text-sm text-slate-500">Try another filter or create a new backpacking trip.</p></div>}
    </div>
  );
}

```

### `app/profile/edit/page.tsx`

```typescript
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateProfile } from "../actions";

export default async function EditProfilePage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin?callbackUrl=/profile/edit");
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { name: true, username: true, bio: true, location: true, isProfilePublic: true } });
  if (!user) redirect("/profile");
  const input = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15";
  return (
    <div className="max-w-2xl"><p className="text-sm font-semibold text-green-700">Account identity</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Edit profile</h2><p className="mt-2 text-sm text-slate-500">Choose what represents you across TrailPicker.</p>
      <form action={updateProfile} className="mt-6 space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <label className="block text-sm font-semibold text-slate-800">Display name<input name="name" required defaultValue={user.name || ""} className={input} /></label>
        <label className="block text-sm font-semibold text-slate-800">Username<input name="username" defaultValue={user.username || ""} placeholder="minjae" pattern="[A-Za-z0-9_]{3,24}" className={input} /><span className="mt-1 block text-xs font-normal text-slate-500">3–24 letters, numbers, or underscores.</span></label>
        <label className="block text-sm font-semibold text-slate-800">Location<input name="location" defaultValue={user.location || ""} placeholder="Coquitlam, BC" maxLength={80} className={input} /></label>
        <label className="block text-sm font-semibold text-slate-800">Bio<textarea name="bio" defaultValue={user.bio || ""} placeholder="Backpacker, gear optimizer, and weekend trail hunter." maxLength={240} rows={4} className={input} /></label>
        <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4"><input type="checkbox" name="isProfilePublic" defaultChecked={user.isProfilePublic} className="mt-1 h-4 w-4 accent-green-800" /><span><span className="block text-sm font-semibold text-slate-900">Public profile</span><span className="mt-0.5 block text-xs text-slate-500">Reserved for public profile pages in a later release.</span></span></label>
        <div className="flex justify-end gap-3"><a href="/profile" className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</a><button className="rounded-xl bg-green-900 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800">Save changes</button></div>
      </form>
    </div>
  );
}

```

### `app/profile/favorites/page.tsx`

```typescript
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import GearLibraryCard from "@/components/profile/GearLibraryCard";
import { Heart, Search } from "lucide-react";

type Params = { q?: string; category?: string };

export default async function FavoritesPage({ searchParams }: { searchParams: Promise<Params> }) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin?callbackUrl=/profile/favorites");
  const params = await searchParams;
  const favorites = await prisma.favorite.findMany({
    where: {
      user: { email: session.user.email },
      gear: {
        ...(params.category && params.category !== "all" ? { category: { slug: params.category } } : {}),
        ...(params.q ? { name: { contains: params.q, mode: "insensitive" as const } } : {}),
      },
    },
    orderBy: { createdAt: "desc" },
    include: { gear: { include: { brand: true, category: true, images: true } } },
  });
  const categories = await prisma.category.findMany({ where: { gear: { some: { favorites: { some: { user: { email: session.user.email } } } } } }, orderBy: { name: "asc" } });

  return (
    <div>
      <div><p className="text-sm font-semibold text-green-700">Saved for later</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Favorites</h2><p className="mt-2 text-sm text-slate-500">Gear you’re considering, separate from equipment you own.</p></div>
      <form className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:grid-cols-[1fr_auto_auto]">
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3"><Search className="h-4 w-4 text-slate-400" /><input name="q" defaultValue={params.q} placeholder="Search favorites" className="w-full py-2.5 text-sm outline-none" /></label>
        <select name="category" defaultValue={params.category || "all"} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="all">All categories</option>{categories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}</select>
        <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">Apply</button>
      <Link href="/profile/favorites" className="self-center px-2 text-xs text-slate-500 hover:underline">Clear filters</Link></form>
      {favorites.length ? <div className="mt-6 grid gap-4 xl:grid-cols-2">{favorites.map((item) => <GearLibraryCard key={item.id} gear={item.gear} addedAt={item.createdAt} mode="favorite" />)}</div> : <div className="mt-6 rounded-3xl border border-dashed border-pink-200 bg-white p-12 text-center"><Heart className="mx-auto h-9 w-9 text-pink-300" /><h3 className="mt-3 text-xl font-bold text-slate-900">{params.q || (params.category && params.category !== "all") ? "No matching favorites" : "Nothing saved yet"}</h3><p className="mt-2 text-sm text-slate-500">{params.q || (params.category && params.category !== "all") ? "Try another search or clear your filters." : "Open a product and choose Favorite to save it here."}</p><Link href="/gear/packs" className="mt-5 inline-flex rounded-xl bg-green-900 px-4 py-2.5 text-sm font-semibold text-white">Explore gear</Link></div>}
    </div>
  );
}

```

### `app/profile/gear/actions.ts`

```typescript
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { mutateBuildWithRevision } from "@/lib/build-history";
import { combinedQuantity } from "@/lib/build-validation";

async function userId() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("You must be signed in.");
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) throw new Error("User not found.");
  return user.id;
}

function gearIdFrom(formData: FormData) {
  const gearId = formData.get("gearId");
  if (typeof gearId !== "string" || !gearId || gearId.length > 200) throw new Error("Gear item is required.");
  return gearId;
}

async function requireGear(gearId: string) {
  if (!await prisma.gear.findUnique({ where: { id: gearId }, select: { id: true } })) throw new Error("This product is no longer available.");
}

function refreshGearPages(gearId: string) {
  revalidatePath("/profile", "layout");
  revalidatePath("/profile/gear");
  revalidatePath("/profile/favorites");
  revalidatePath(`/gear/${gearId}`);
}

export async function addOwnedGear(formData: FormData) {
  const userIdValue = await userId();
  const gearId = gearIdFrom(formData);
  await requireGear(gearId);
  await prisma.ownedGear.upsert({
    where: { userId_gearId: { userId: userIdValue, gearId } },
    update: {},
    create: { userId: userIdValue, gearId },
  });
  refreshGearPages(gearId);
}

export async function removeOwnedGear(formData: FormData) {
  const userIdValue = await userId();
  const gearId = gearIdFrom(formData);
  await prisma.ownedGear.deleteMany({ where: { userId: userIdValue, gearId } });
  refreshGearPages(gearId);
}

export async function addFavorite(formData: FormData) {
  const userIdValue = await userId();
  const gearId = gearIdFrom(formData);
  await requireGear(gearId);
  await prisma.favorite.upsert({
    where: { userId_gearId: { userId: userIdValue, gearId } },
    update: {},
    create: { userId: userIdValue, gearId },
  });
  refreshGearPages(gearId);
}

export async function removeFavorite(formData: FormData) {
  const userIdValue = await userId();
  const gearId = gearIdFrom(formData);
  await prisma.favorite.deleteMany({ where: { userId: userIdValue, gearId } });
  refreshGearPages(gearId);
}

export async function moveFavoriteToGear(formData: FormData) {
  const userIdValue = await userId();
  const gearId = gearIdFrom(formData);
  await requireGear(gearId);
  await prisma.$transaction([
    prisma.ownedGear.upsert({ where: { userId_gearId: { userId: userIdValue, gearId } }, update: {}, create: { userId: userIdValue, gearId } }),
    prisma.favorite.deleteMany({ where: { userId: userIdValue, gearId } }),
  ]);
  refreshGearPages(gearId);
}

export async function addGearToCurrentBuild(formData: FormData) {
  const userIdValue = await userId();
  const gearId = gearIdFrom(formData);
  await requireGear(gearId);
  const buildId = (await cookies()).get("currentBuild")?.value;
  if (!buildId) redirect("/profile/builds");
  const build = await prisma.build.findFirst({ where: { id: buildId, userId: userIdValue }, select: { id: true } });
  if (!build) redirect("/profile/builds");
  await mutateBuildWithRevision(build.id, userIdValue, "gear", "Added gear from library", async tx => {
    const existing = await tx.buildItem.findUnique({ where: { buildId_gearId: { buildId: build.id, gearId } }, select: { quantity: true } });
    combinedQuantity(existing?.quantity ?? 0, 1);
    await tx.buildItem.upsert({
      where: { buildId_gearId: { buildId: build.id, gearId } },
      update: { quantity: { increment: 1 } },
      create: { buildId: build.id, gearId },
    });
  });
  revalidatePath(`/build/${build.id}`);
  redirect(`/build/${build.id}`);
}


export async function updateOwnedGearDetails(form: FormData) {
  const owner = await userId();
  const gearId = gearIdFrom(form);
  const priceValue = form.get("purchasedPrice");
  if (typeof priceValue !== "string") throw new Error("Invalid purchase price.");
  const priceText = priceValue.trim();
  const purchasedPrice = priceText ? Number(priceText) : null;
  if (purchasedPrice !== null && (!Number.isFinite(purchasedPrice) || purchasedPrice < 0 || purchasedPrice > 1000000)) throw new Error("Enter a purchase price from $0 to $1,000,000 CAD.");
  const dateValue = form.get("purchasedAt");
  if (typeof dateValue !== "string") throw new Error("Invalid purchase date.");
  const dateText = dateValue.trim();
  const purchasedAt = dateText ? new Date(dateText + "T00:00:00.000Z") : null;
  if (purchasedAt && (!/^\d{4}-\d{2}-\d{2}$/.test(dateText) || Number.isNaN(purchasedAt.getTime()) || purchasedAt.toISOString().slice(0,10) !== dateText)) throw new Error("Enter a valid purchase date.");
  const notes = form.get("notes");
  if (typeof notes !== "string" || notes.trim().length > 2000) throw new Error("Notes must be 2,000 characters or fewer.");
  const result = await prisma.ownedGear.updateMany({ where: { userId: owner, gearId }, data: { purchasedPrice, purchasedAt, notes: notes.trim() || null } });
  if (result.count !== 1) throw new Error("This item is not in your gear closet.");
  refreshGearPages(gearId);
}

```

### `app/profile/gear/page.tsx`

```typescript
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import GearLibraryCard from "@/components/profile/GearLibraryCard";
import { PackageOpen, Plus, Search } from "lucide-react";

type Params = { category?: string; q?: string; sort?: string };

export default async function MyGearPage({ searchParams }: { searchParams: Promise<Params> }) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin?callbackUrl=/profile/gear");
  const params = await searchParams;
  const currentBuild = (await cookies()).get("currentBuild")?.value;

  const owned = await prisma.ownedGear.findMany({
    where: {
      user: { email: session.user.email },
      gear: {
        ...(params.category && params.category !== "all" ? { category: { slug: params.category } } : {}),
        ...(params.q ? { name: { contains: params.q, mode: "insensitive" as const } } : {}),
      },
    },
    orderBy: params.sort === "name" ? { gear: { name: "asc" as const } } : { createdAt: "desc" as const },
    include: { gear: { include: { brand: true, category: true, images: true } } },
  });

  const [categories, activeBuild] = await Promise.all([
    prisma.category.findMany({
      where: {
        gear: {
          some: {
            ownedGear: {
              some: { user: { email: session.user.email } },
            },
          },
        },
      },
      orderBy: { name: "asc" },
    }),
    currentBuild ? prisma.build.findFirst({ where: { id: currentBuild, user: { email: session.user.email } }, select: { name: true } }) : null,
  ]);
  const totalWeight = owned.reduce((sum, item) => sum + (item.gear.weight_g || 0), 0);
  const totalValue = owned.reduce((sum, item) => sum + (item.gear.price_cad || 0), 0);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-sm font-semibold text-green-700">Gear Closet</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">My Gear</h2><p className="mt-2 text-sm text-slate-500">Equipment you actually own, ready to reuse across trips.</p></div>
        <Link href="/gear/packs" className="flex items-center justify-center gap-2 rounded-xl bg-green-900 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800"><Plus className="h-4 w-4" />Browse gear</Link>
      </div>

      <p className="mt-5 text-xs text-slate-400">{params.q || (params.category && params.category !== "all") ? "Totals for matching gear." : "Totals for your gear closet."}</p>
      <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-medium text-slate-500">Items</p><p className="mt-1 text-xl font-bold text-slate-950">{owned.length}</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-medium text-slate-500">Total weight</p><p className="mt-1 text-xl font-bold text-slate-950">{(totalWeight / 1000).toFixed(2)} kg</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-medium text-slate-500">Retail value (CAD)</p><p className="mt-1 text-xl font-bold text-slate-950">${totalValue.toFixed(0)}</p></div>
      </div>

      {activeBuild && <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">“Add to current build” will add gear to <b>{activeBuild.name}</b>.</p>}

      <form className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:grid-cols-[1fr_auto_auto_auto]">
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3"><Search className="h-4 w-4 text-slate-400" /><input name="q" defaultValue={params.q} placeholder="Search your gear" className="w-full py-2.5 text-sm outline-none" /></label>
        <select name="category" defaultValue={params.category || "all"} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="all">All categories</option>{categories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}</select>
        <select name="sort" defaultValue={params.sort || "newest"} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="newest">Recently added</option><option value="name">Name</option></select>
        <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">Apply</button>
      <Link href="/profile/gear" className="self-center px-2 text-xs text-slate-500 hover:underline">Clear filters</Link></form>

      {owned.length ? <div className="mt-6 grid gap-4 xl:grid-cols-2">{owned.map((item) => <GearLibraryCard key={item.id} gear={item.gear} addedAt={item.createdAt} mode="owned" hasCurrentBuild={Boolean(activeBuild)} details={{ purchasedPrice: item.purchasedPrice, purchasedAt: item.purchasedAt, notes: item.notes }} />)}</div> : <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center"><PackageOpen className="mx-auto h-9 w-9 text-slate-300" /><h3 className="mt-3 text-xl font-bold text-slate-900">{params.q || (params.category && params.category !== "all") ? "No matching gear" : "Your gear closet is empty"}</h3><p className="mt-2 text-sm text-slate-500">{params.q || (params.category && params.category !== "all") ? "Try another search or clear your filters." : "Open any product and choose “I own this.”"}</p><Link href="/gear/packs" className="mt-5 inline-flex rounded-xl bg-green-900 px-4 py-2.5 text-sm font-semibold text-white">Browse gear</Link></div>}
    </div>
  );
}

```

### `app/profile/layout.tsx`

```typescript
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Backpack, Heart, LayoutDashboard, Settings, Star, UserRound } from "lucide-react";

const links = [
  { href: "/profile", label: "Overview", icon: LayoutDashboard },
  { href: "/profile/builds", label: "My Builds", icon: Backpack },
  { href: "/profile/gear", label: "My Gear", icon: UserRound },
  { href: "/profile/favorites", label: "Favorites", icon: Heart },
  { href: "/profile/reviews", label: "Reviews", icon: Star, disabled: false },
];

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin?callbackUrl=/profile");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      username: true,
      image: true,
      location: true,
      createdAt: true,
      _count: { select: { builds: true, ownedGear: true, favorites: true } },
    },
  });

  if (!user) redirect("/api/auth/signin?callbackUrl=/profile");
  const displayName = user.name || "TrailPicker explorer";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      <section className="border-b border-green-950/10 bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-9 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-center gap-5">
            {user.image ? (
              <Image src={user.image} alt="" width={80} height={80} unoptimized className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white/15" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-600 text-3xl font-bold ring-4 ring-white/15">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight">{displayName}</h1>
              <p className="mt-1 text-sm text-emerald-100/80">
                {user.username ? `@${user.username}` : "Choose a username"}
                {user.location ? ` · ${user.location}` : ""}
                {` · Joined ${user.createdAt.toLocaleDateString(undefined, { month: "short", year: "numeric" })}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 max-sm:flex-wrap">
            <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur">
              {[
                [user._count.builds, "Builds"],
                [user._count.ownedGear, "Gear"],
                [user._count.favorites, "Favorites"],
              ].map(([value, label]) => (
                <div key={label} className="min-w-20 px-3 py-1 text-center">
                  <p className="text-lg font-bold">{value}</p>
                  <p className="text-xs text-emerald-100/75">{label}</p>
                </div>
              ))}
            </div>
            <Link href="/profile/edit" className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-green-950 shadow-sm hover:bg-emerald-50">
              Edit profile
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-7 px-5 py-8 sm:px-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside>
          <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm lg:flex-col">
            {links.map(({ href, label, icon: Icon, disabled }) =>
              disabled ? (
                <span key={href} title="Coming later" className="flex shrink-0 cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400">
                  <Icon className="h-4 w-4" /> {label}<span className="ml-auto text-[10px] uppercase">Soon</span>
                </span>
              ) : (
                <Link key={href} href={href} className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-green-900">
                  <Icon className="h-4 w-4" /> {label}
                </Link>
              )
            )}
            <Link href="/settings" className="mt-0 flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 lg:mt-2 lg:border-t lg:border-slate-100 lg:pt-4">
              <Settings className="h-4 w-4" /> Settings
            </Link>
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}

```

### `app/profile/page.tsx`

```typescript
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import BuildCard from "@/components/profile/BuildCard";
import { buildStatus, summarizeBuild, weightLabel } from "@/lib/profile";
import { ArrowRight, Backpack, CalendarClock, CircleCheckBig, Heart, PackageCheck, Plus } from "lucide-react";

export default async function ProfileOverview() {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin?callbackUrl=/profile");
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { name: true, settings: { select: { weightUnit: true } }, _count: { select: { ownedGear: true, favorites: true } }, builds: { orderBy: { updatedAt: "desc" }, take: 6, include: { items: { include: { gear: { select: { weight_g: true, price_cad: true } } } } } } } });
  if (!user) redirect("/api/auth/signin?callbackUrl=/profile");
  const upcoming = user.builds.filter((build) => buildStatus(build) === "upcoming").sort((a, b) => a.startDate!.getTime() - b.startDate!.getTime())[0];
  const recent = user.builds.slice(0, 3);
  const weightUnit = user.settings?.weightUnit === "imperial" ? "imperial" : "metric";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-green-700">Dashboard</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Welcome back, {user.name?.split(" ")[0] || "explorer"}</h2></div><Link href="/build" className="flex items-center gap-2 rounded-xl bg-green-900 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800"><Plus className="h-4 w-4" />New trip</Link></div>

      {upcoming ? (() => { const totals = summarizeBuild(upcoming); return (
        <section className="overflow-hidden rounded-3xl bg-green-900 text-white shadow-lg">
          <div className="grid gap-6 p-7 md:grid-cols-[1fr_auto] md:items-end"><div><div className="flex items-center gap-2 text-sm font-semibold text-white"><CalendarClock className="h-4 w-4" />Upcoming trip</div><h3 className="mt-3 text-3xl font-bold">{upcoming.name}</h3><p className="mt-2 text-emerald-100/75">{upcoming.location || "Location not set"}</p><div className="mt-6 flex flex-wrap gap-3"><span className="rounded-xl bg-white/10 px-4 py-2 text-sm">Base <b>{weightLabel(totals.base, weightUnit)}</b></span><span className="rounded-xl bg-white/10 px-4 py-2 text-sm">Total <b>{weightLabel(totals.total, weightUnit)}</b></span><span className="rounded-xl bg-white/10 px-4 py-2 text-sm"><b>{totals.itemCount}</b> items</span></div></div><Link href={`/build/${upcoming.id}`} className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-green-900 hover:bg-emerald-100">Continue packing <ArrowRight className="h-4 w-4" /></Link></div>
        </section>); })() : (
        <section className="rounded-3xl border border-dashed border-emerald-300 bg-emerald-50/60 p-8 text-center"><CircleCheckBig className="mx-auto h-9 w-9 text-emerald-700" /><h3 className="mt-3 text-xl font-bold text-slate-950">No upcoming trip yet</h3><p className="mt-1 text-sm text-slate-600">Create a trip and your next packing plan will appear here.</p><Link href="/build" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-900 px-4 py-2.5 text-sm font-semibold text-white"><Plus className="h-4 w-4" />Create a trip</Link></section>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/profile/gear" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-300"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800"><PackageCheck className="h-5 w-5" /></span><span><span className="block text-lg font-bold text-slate-950">My Gear</span><span className="text-sm text-slate-500">{user._count.ownedGear} owned items</span></span><ArrowRight className="ml-auto h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-700" /></Link>
        <Link href="/profile/favorites" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-pink-300"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-100 text-pink-700"><Heart className="h-5 w-5" /></span><span><span className="block text-lg font-bold text-slate-950">Favorites</span><span className="text-sm text-slate-500">{user._count.favorites} saved items</span></span><ArrowRight className="ml-auto h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-pink-600" /></Link>
      </div>

      <section><div className="mb-4 flex items-center justify-between"><div><h3 className="mt-1 text-2xl font-bold text-slate-950">Recent builds</h3></div><Link href="/profile/builds" className="flex items-center gap-1 text-sm font-semibold text-green-800 hover:underline">View all <ArrowRight className="h-4 w-4" /></Link></div>
        {recent.length ? <div className="grid gap-4 xl:grid-cols-3">{recent.map((build) => <BuildCard key={build.id} build={build} weightUnit={weightUnit} />)}</div> : <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500"><Backpack className="mx-auto mb-3 h-8 w-8 text-slate-300" />Your saved builds will appear here.</div>}
      </section>
    </div>
  );
}

```

### `app/profile/reviews/page.tsx`

```typescript
import Link from "next/link";
import { redirect } from "next/navigation";
import { Star } from "lucide-react";
import { currentBuildUserId } from "@/lib/build-access";
import { prisma } from "@/lib/prisma";

export default async function MyReviewsPage(){
  const userId=await currentBuildUserId();if(!userId)redirect("/api/auth/signin?callbackUrl=/profile/reviews");
  const reviews=await prisma.review.findMany({where:{userId},orderBy:{createdAt:"desc"},include:{gear:{select:{id:true,name:true,brand:{select:{name:true}}}}}});
  return <div><p className="text-sm font-semibold text-green-700">Your experience</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">My Reviews</h2><p className="mt-2 text-sm text-slate-500">Manage the reviews you’ve shared with other TrailPicker members.</p>{reviews.length?<div className="mt-6 space-y-4">{reviews.map(review=><article key={review.id} className="rounded-2xl border border-gray-200 bg-white p-5"><p className="text-xs text-green-700">{review.gear.brand.name}</p><Link href={`/gear/${review.gearId}`} className="mt-1 block font-semibold hover:text-green-800">{review.gear.name}</Link><p className="mt-3 flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-amber-400 text-amber-400"/>{review.rating} / 5 <span className="ml-2 text-xs text-gray-400">{review.createdAt.toLocaleDateString("en-CA",{timeZone:"UTC"})}</span></p>{review.title&&<h3 className="mt-3 break-words text-sm font-semibold">{review.title}</h3>}{review.body&&<p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-gray-600">{review.body}</p>}<Link href={`/gear/${review.gearId}#reviews`} className="mt-4 inline-block text-sm font-semibold text-green-800 hover:underline">Edit or delete review</Link></article>)}</div>:<div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center"><Star className="mx-auto h-8 w-8 text-gray-300"/><p className="mt-3 font-semibold">No reviews yet</p><p className="mt-2 text-sm text-gray-500">Open a product you’ve used and share your experience.</p><Link href="/gear/packs" className="mt-4 inline-block text-sm font-semibold text-green-800">Browse gear</Link></div>}</div>;
}

```

### `app/settings/actions.ts`

```typescript
"use server";

import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { DistanceUnit, TemperatureUnit, WeightUnit } from "@/lib/user-preferences";

export type SettingsActionState = { status: "idle" | "success" | "error"; message: string };

async function requireUser() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Please sign in to manage account settings.");
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }, select: { id: true, email: true },
  });
  if (!user) throw new Error("Your account could not be found.");
  return user;
}

export async function saveSettings(
  _previous: SettingsActionState,
  data: FormData,
): Promise<SettingsActionState> {
  try {
    const user = await requireUser();
    const weightUnit = data.get("weightUnit");
    const distanceUnit = data.get("distanceUnit");
    const temperatureUnit = data.get("temperatureUnit");
    if (
      (weightUnit !== "metric" && weightUnit !== "imperial") ||
      (distanceUnit !== "metric" && distanceUnit !== "imperial") ||
      (temperatureUnit !== "c" && temperatureUnit !== "f")
    ) return { status: "error", message: "Choose valid measurement units." };

    const defaultBuildPublic = data.get("defaultBuildPublic") === "on";
    const isProfilePublic = data.get("isProfilePublic") === "on";

    await prisma.$transaction(async (tx) => {
      await tx.userSettings.upsert({
        where: { userId: user.id },
        update: {
          weightUnit: weightUnit as WeightUnit,
          distanceUnit: distanceUnit as DistanceUnit,
          temperatureUnit: temperatureUnit as TemperatureUnit,
          defaultBuildPublic,
        },
        create: {
          userId: user.id,
          weightUnit: weightUnit as WeightUnit,
          distanceUnit: distanceUnit as DistanceUnit,
          temperatureUnit: temperatureUnit as TemperatureUnit,
          defaultBuildPublic,
        },
      });
      await tx.user.update({ where: { id: user.id }, data: { isProfilePublic } });
    });
    revalidatePath("/", "layout");
    revalidatePath("/profile", "layout");
    revalidatePath("/settings");
    return { status: "success", message: "Settings saved. Your display preferences will apply after a page refresh." };
  } catch (error) {
    console.error("Settings could not be saved", error);
    return { status: "error", message: "Could not save settings. Please try again." };
  }
}

export async function deleteMyAccount(
  _previous: SettingsActionState,
  data: FormData,
): Promise<SettingsActionState> {
  if (data.get("confirmation") !== "DELETE MY ACCOUNT") {
    return { status: "error", message: 'Type "DELETE MY ACCOUNT" to confirm.' };
  }
  let user;
  try {
    user = await requireUser();
    // In Auth.js database-session mode, sign out BEFORE deleting the User:
    // the adapter needs the current Session row to revoke it cleanly.
    await signOut({ redirect: false });
  } catch (error) {
    console.error("Could not verify or sign out before deletion", error);
    return { status: "error", message: "Could not confirm your session. Account was not deleted." };
  }
  try {
    // These relations lack onDelete: Cascade in the existing schema.
    await prisma.$transaction(async (tx) => {
      await tx.favorite.deleteMany({ where: { userId: user.id } });
      await tx.review.deleteMany({ where: { userId: user.id } });
      await tx.build.deleteMany({ where: { userId: user.id } });
      // Owned gear, linked login accounts, settings, and remaining sessions cascade.
      await tx.user.delete({ where: { id: user.id } });
    });
  } catch (error) {
    console.error("Account deletion failed", error);
    return { status: "error", message: "Deletion failed without removing your account. You've been signed out; sign back in to try again." };
  }
  redirect("/");
}

```

### `app/settings/export/route.ts`

```typescript
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return new Response("Sign in required.", {
      status: 401, headers: { "Cache-Control": "private, no-store" },
    });
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true, email: true, username: true, bio: true, location: true,
      isProfilePublic: true, createdAt: true, settings: true,
      builds: {
        orderBy: { createdAt: "asc" },
        include: {
          items: { include: { gear: { select: { id: true, name: true } } } },
          days: { orderBy: { date: "asc" } },
        },
      },
      ownedGear: { include: { gear: { select: { id: true, name: true } } } },
      favorites: { include: { gear: { select: { id: true, name: true } } } },
      reviews: { include: { gear: { select: { id: true, name: true } } } },
    },
  });
  if (!user) return new Response("Account not found.", {
    status: 404, headers: { "Cache-Control": "private, no-store" },
  });

  const json = JSON.stringify({
    format: "trailpicker-account-export",
    version: 1,
    exportedAt: new Date().toISOString(),
    account: user,
  }, null, 2);
  return new Response(json, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="trailpicker-account-${new Date().toISOString().slice(0, 10)}.json"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

```

### `app/settings/page.tsx`

```typescript
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { preferencesFromRow } from "@/lib/user-preferences";
import SettingsClient from "@/components/settings/SettingsClient";

export const metadata = {
  title: "Settings | TrailPicker",
  description: "Manage your TrailPicker account, units, trip privacy and data.",
};

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin?callbackUrl=/settings");
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true, email: true, username: true, image: true,
      isProfilePublic: true, createdAt: true, settings: true,
      accounts: { select: { provider: true } },
      _count: { select: { builds: true, ownedGear: true } },
    },
  });
  if (!user) redirect("/api/auth/signin?callbackUrl=/settings");

  return (
    <SettingsClient
      user={{
        name: user.name,
        email: user.email,
        username: user.username,
        image: user.image,
        isProfilePublic: user.isProfilePublic,
        joined: user.createdAt.toISOString(),
        providers: [...new Set(user.accounts.map(account => account.provider))],
        buildCount: user._count.builds,
        gearCount: user._count.ownedGear,
      }}
      initialPreferences={preferencesFromRow(user.settings)}
    />
  );
}

```

### `auth.ts`

```typescript
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  session: { strategy: "database" },
});
```

### `components/build/CreateTripDetails.tsx`

```typescript

"use client";

import { useRef, useState } from "react";
import { ArrowLeft, Check, MapPin, Pencil, Plus } from "lucide-react";
import DestinationPicker from "./DestinationPicker";
import DateRangePicker from "./DateRangePicker";

type Destination = {
  id: string;
  name: string;
  lat: string;
  lng: string;
};

const emptyDestination: Destination = {
  id: "",
  name: "",
  lat: "",
  lng: "",
};

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-800 transition hover:border-green-300 hover:bg-green-50 hover:text-green-900";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-green-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800";

const labelClass =
  "mb-1.5 block text-sm font-medium text-gray-700";

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/10";

export default function CreateTripDetails() {
  const [open, setOpen] = useState(false);
  const [choosingDestination, setChoosingDestination] = useState(false);
  const [destination, setDestination] =
    useState<Destination>(emptyDestination);
  const [pickerSession, setPickerSession] = useState(0);
  const [pickerError, setPickerError] = useState("");
  const pickerContainer = useRef<HTMLDivElement>(null);

  function openPicker() {
    setPickerError("");
    setPickerSession((value) => value + 1);
    setChoosingDestination(true);
  }

  function confirmDestination() {
    const parentForm = pickerContainer.current?.closest("form");
    if (!parentForm) return;

    const values = new FormData(parentForm);

    const next: Destination = {
      id: String(
        values.get("candidateDestinationId") ?? ""
      ).trim(),
      name: String(
        values.get("candidateLocation") ?? ""
      ).trim(),
      lat: String(
        values.get("candidateLat") ?? ""
      ).trim(),
      lng: String(
        values.get("candidateLng") ?? ""
      ).trim(),
    };

    if (!next.name) {
      setPickerError(
        "Choose a destination or a custom wilderness location first."
      );
      return;
    }

    if (
      (next.lat === "") !== (next.lng === "") ||
      (next.lat !== "" &&
        (!Number.isFinite(Number(next.lat)) ||
          !Number.isFinite(Number(next.lng)) ||
          Math.abs(Number(next.lat)) > 90 ||
          Math.abs(Number(next.lng)) > 180))
    ) {
      setPickerError("Choose a location with valid coordinates.");
      return;
    }

    setDestination(next);
    setChoosingDestination(false);
    setPickerError("");
  }

  return (
    <section className="min-w-0">
      {/* Actual values submitted when creating the trip */}
      <input
        type="hidden"
        name="destinationId"
        value={destination.id}
      />
      <input
        type="hidden"
        name="location"
        value={destination.name}
      />
      <input
        type="hidden"
        name="locationLat"
        value={destination.lat}
      />
      <input
        type="hidden"
        name="locationLng"
        value={destination.lng}
      />

      {/* Optional details disclosure */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls="additional-trip-details"
        onClick={() => setOpen((value) => !value)}
        className="group flex w-full cursor-pointer items-center justify-between border-b border-gray-200 py-3 text-left transition-colors hover:border-gray-400"
      >
        <span className="text-sm font-medium text-gray-900">
          Additional trip details
          <span className="ml-2 text-xs font-normal text-gray-400">
            Optional
          </span>
        </span>

        <Plus
          aria-hidden="true"
          className={`h-4 w-4 text-gray-500 transition-transform duration-300 ease-in-out ${
            open ? "rotate-45" : "rotate-0"
          }`}
        />
      </button>

      {/* Animated accordion */}
      <div
        id="additional-trip-details"
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out motion-reduce:transition-none ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="space-y-5 pt-5">
            {/* Keep dates and travelers mounted while picking a destination */}
            <div
              className={
                choosingDestination ? "hidden" : "space-y-5"
              }
            >
              {/* Destination */}
              <div>
                <label className={labelClass}>
                  Destination
                </label>

                <div className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 bg-gray-50/60 p-3 sm:flex-nowrap">
                  <MapPin
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-green-800"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="break-words text-sm font-semibold text-gray-900">
                      {destination.name ||
                        "No destination selected"}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      {destination.name
                        ? destination.id
                          ? "Popular destination"
                          : "Custom wilderness location"
                        : "Optional"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={openPicker}
                    className={`${secondaryButton} shrink-0`}
                  >
                    <Pencil
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                    {destination.name ? "Change" : "Choose"}
                  </button>
                </div>

                {destination.name && (
                  <button
                    type="button"
                    onClick={() =>
                      setDestination(emptyDestination)
                    }
                    className="mt-2 text-xs text-gray-500 underline-offset-2 hover:text-gray-800 hover:underline"
                  >
                    Remove destination
                  </button>
                )}
              </div>

              {/* Dates and travelers */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="min-w-0">
                  <label className={labelClass}>
                    Trip dates
                  </label>

                  <div className="rounded-lg border border-gray-200 bg-white px-3 py-2">
                    <DateRangePicker
                      startName="startDate"
                      endName="endDate"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="create-trip-people"
                    className={labelClass}
                  >
                    Travelers
                  </label>

                  <input
                    id="create-trip-people"
                    name="people"
                    type="number"
                    min={1}
                    max={100}
                    defaultValue={1}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Destination selection view */}
            {choosingDestination && (
              <div
                ref={pickerContainer}
                className="space-y-4 animate-in fade-in duration-300"
              >
                <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
                  <h3 className="text-base font-semibold text-gray-900">
                    Choose destination
                  </h3>

                  <button
                    type="button"
                    onClick={() =>
                      setChoosingDestination(false)
                    }
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                </div>

                <DestinationPicker
                  key={pickerSession}
                  destinationField="candidateDestinationId"
                  nameField="candidateLocation"
                  latField="candidateLat"
                  lngField="candidateLng"
                  initialDestinationId={
                    destination.id || undefined
                  }
                  initialName={destination.name}
                  initialLat={
                    destination.lat === ""
                      ? null
                      : Number(destination.lat)
                  }
                  initialLng={
                    destination.lng === ""
                      ? null
                      : Number(destination.lng)
                  }
                />

                {pickerError && (
                  <p
                    role="alert"
                    className="text-sm text-red-700"
                  >
                    {pickerError}
                  </p>
                )}

                <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setChoosingDestination(false)
                    }
                    className={secondaryButton}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={confirmDestination}
                    className={primaryButton}
                  >
                    <Check className="h-4 w-4" />
                    Use this destination
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

```

### `components/build/DateRangePicker.tsx`

```typescript
"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
    startName: string;
    endName: string;
    initialStart?: string;
    initialEnd?: string;
};

// Date-only values belong to the user's calendar, not UTC.
function parseDate(value?: string): Date | null {
    if (!value) return null;
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match) return null;
    const [, y, m, d] = match.map(Number);
    const date = new Date(y, m - 1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d ? date : null;
}
function dateValue(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function monthOf(date: Date) { return new Date(date.getFullYear(), date.getMonth(), 1); }
function sameDay(a: Date | null, b: Date | null) { return !!a && !!b && dateValue(a) === dateValue(b); }
function shortDate(date: Date, year = false) {
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric", ...(year ? { year: "numeric" } : {}) });
}
function duration(start: Date, end: Date) {
    // Count calendar days correctly even across daylight saving changes.
    return Math.round((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / 86400000);
}

export default function DateRangePicker({ startName, endName, initialStart, initialEnd }: Props) {
    const [start, setStart] = useState(() => parseDate(initialStart));
    const [end, setEnd] = useState(() => {
        const a = parseDate(initialStart), b = parseDate(initialEnd);
        return a && b && b >= a ? b : null;
    });
    const [viewMonth, setViewMonth] = useState(() => monthOf(parseDate(initialStart) ?? new Date()));
    const [hover, setHover] = useState<Date | null>(null);
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 380, maxHeight: 600 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const id = useId();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nights = start && end ? duration(start, end) : null;
    const summary = nights !== null ? `${nights + 1} ${nights === 0 ? "day" : "days"} · ${nights} ${nights === 1 ? "night" : "nights"}` : "Choose your departure and return dates";
    const label = start && end
        ? `${shortDate(start, start.getFullYear() !== end.getFullYear())} – ${shortDate(end, true)}`
        : start ? `${shortDate(start)} – select return date` : "Select trip dates";

    function close() { setOpen(false); setHover(null); triggerRef.current?.focus(); }
    function updatePosition() {
        const trigger = triggerRef.current;
        if (!trigger) return;
        const rect = trigger.getBoundingClientRect();
        const margin = 12;
        const width = Math.min(380, window.innerWidth - margin * 2);
        const height = Math.min(panelRef.current?.getBoundingClientRect().height ?? 420, window.innerHeight - margin * 2);
        const below = window.innerHeight - rect.bottom - margin - 8;
        const above = rect.top - margin - 8;
        const placeAbove = below < height && above > below;
        const available = Math.max(0, placeAbove ? above : below);
        const maxHeight = Math.max(120, available);
        const top = placeAbove ? Math.max(margin, rect.top - Math.min(height, maxHeight) - 8) : Math.min(rect.bottom + 8, window.innerHeight - Math.min(height, maxHeight) - margin);
        setPosition({ top: Math.max(margin, top), left: Math.max(margin, Math.min(rect.left, window.innerWidth - width - margin)), width, maxHeight: Math.min(maxHeight, window.innerHeight - margin * 2) });
    }
    useLayoutEffect(() => { if (open) updatePosition(); }, [open, viewMonth, start, end]);
    useEffect(() => {
        if (!open) return;
        const frame = requestAnimationFrame(() => {
            const target = panelRef.current?.querySelector<HTMLButtonElement>('button[data-day][aria-pressed="true"]:not(:disabled), button[data-today]:not(:disabled), button[data-day]:not(:disabled)');
            (target ?? panelRef.current)?.focus();
        });
        function outside(event: PointerEvent) {
            if (!triggerRef.current?.contains(event.target as Node) && !panelRef.current?.contains(event.target as Node)) {
                setOpen(false); setHover(null);
            }
        }
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);
        document.addEventListener("pointerdown", outside);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
            document.removeEventListener("pointerdown", outside);
        };
    }, [open]);

    function select(day: Date) {
        setHover(null);
        if (!start || end || day < start) { setStart(day); setEnd(null); }
        else setEnd(day);
    }
    const preview = start && !end && hover && hover >= start ? hover : end;
    const monthDays = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    const totalCells = Math.ceil((viewMonth.getDay() + monthDays) / 7) * 7;
    const cells = Array.from({ length: totalCells }, (_, i) => new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i - viewMonth.getDay() + 1));
    const focusStyle = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2";

    return (
        <div>
            <input type="hidden" name={startName} value={start ? dateValue(start) : ""} />
            <input type="hidden" name={endName} value={end ? dateValue(end) : ""} />
            <button ref={triggerRef} type="button" aria-haspopup="dialog" aria-expanded={open} aria-controls={open ? id : undefined}
                onClick={() => { if (open) close(); else { setViewMonth(monthOf(start ?? new Date())); setOpen(true); } }}
                className={`flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-lg text-left ${focusStyle}`}>
                <span><span className={`block text-sm font-medium ${start ? "text-slate-900" : "text-slate-500"}`}>{label}</span>
                    {nights !== null && <span className="mt-1 block text-xs text-slate-500">{summary}</span>}</span>
                <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-green-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="3" y="5" width="18" height="16" rx="3" /><path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2" />
                </svg>
            </button>
            {open && typeof document !== "undefined" && createPortal(
                <div ref={panelRef} id={id} role="dialog" aria-label="Choose trip dates" tabIndex={-1}
                    style={{ position: "fixed", ...position, overflowY: "auto" }}
                    className="z-[999] rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-[0_16px_48px_-12px_rgba(15,23,42,0.25)]"
                    onKeyDown={event => {
                        if (event.key === "Escape") { event.preventDefault(); close(); }
                        if (event.key === "Tab") {
                            const buttons = Array.from(panelRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? []);
                            const first = buttons[0], last = buttons[buttons.length - 1];
                            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
                            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
                        }
                    }}>
                    <div className="mb-4 flex items-center justify-between">
                        <button type="button" aria-label="Previous month" onClick={() => { setHover(null); setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1)); }} className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-xl text-slate-600 hover:bg-slate-100 ${focusStyle}`}>‹</button>
                        <p aria-live="polite" className="text-base font-semibold tracking-tight">{viewMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</p>
                        <button type="button" aria-label="Next month" onClick={() => { setHover(null); setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1)); }} className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-xl text-slate-600 hover:bg-slate-100 ${focusStyle}`}>›</button>
                    </div>
                    <p className="mb-3 text-center text-xs text-slate-500">{start && !end ? "Now choose your return date" : "Choose your departure date"}</p>
                    <div className="mb-2 grid grid-cols-7 text-center text-[10px] font-semibold tracking-wide text-slate-500">
                        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => <span key={day}>{day}</span>)}
                    </div>
                    <div className="grid grid-cols-7 gap-y-1" onMouseLeave={() => setHover(null)}>
                        {cells.map(day => {
                            const isStart = sameDay(day, start), isEnd = sameDay(day, end);
                            const selected = isStart || isEnd;
                            const between = !!start && !!preview && day > start && day < preview;
                            const previewEnd = !end && sameDay(day, preview);
                            const connected = !!start && !!preview && preview > start;
                            const isPast = day < today;
                            const outside = day.getMonth() !== viewMonth.getMonth();
                            const isToday = sameDay(day, today);
                            return <div key={dateValue(day)} className={`flex h-11 items-center justify-center ${between ? "bg-green-50" : ""} ${connected && isStart ? "rounded-l-full bg-green-50" : ""} ${connected && (isEnd || previewEnd) ? "rounded-r-full bg-green-50" : ""}`}>
                                <button type="button" data-day={dateValue(day)} data-today={isToday ? "true" : undefined}
                                    aria-label={`${day.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}${isStart ? ", departure date" : ""}${isEnd ? ", return date" : ""}`}
                                    aria-pressed={selected} disabled={isPast} onClick={() => select(day)} onMouseEnter={() => setHover(day)} onFocus={() => setHover(day)}
                                    className={`relative flex h-10 w-10 max-w-full items-center justify-center rounded-full text-sm transition-colors ${focusStyle} ${selected ? "bg-green-800 font-semibold text-white shadow-sm" : isPast ? "cursor-not-allowed text-slate-300" : `${outside ? "text-slate-400" : "text-slate-700"} cursor-pointer hover:bg-green-100`} ${isToday && !selected ? "ring-1 ring-inset ring-green-700" : ""} ${previewEnd ? "bg-green-100" : ""}`}>
                                    {day.getDate()}
                                </button>
                            </div>;
                        })}
                    </div>
                    <div className="mt-4 border-t border-slate-100 pt-4">
                        <div aria-live="polite" className="mb-3"><p className="text-sm font-semibold">{start ? label : "Your next adventure"}</p><p className="mt-1 text-xs text-slate-500">{summary}</p></div>
                        <div className="flex items-center justify-between">
                            {start ? <button type="button" onClick={() => { setStart(null); setEnd(null); setHover(null); }} className={`rounded-md px-2 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 ${focusStyle}`}>Clear dates</button> : <span />}
                            <button type="button" disabled={!start || !end} onClick={close} className={`rounded-lg bg-green-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-900 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 ${focusStyle}`}>Done</button>
                        </div>
                    </div>
                </div>, document.body
            )}
        </div>
    );
}

```

### `components/build/DestinationPicker.tsx`

```typescript
"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Map,
  MapPin,
  Search,
  TentTree,
} from "lucide-react";

import LocationPicker from "./LocationPicker";

import {
  DESTINATIONS,
  getDestination,
  getDestinationRegions,
  type Destination,
} from "@/lib/destinations";

type Props = {
  destinationField?: string;
  nameField: string;
  latField: string;
  lngField: string;
  initialDestinationId?: string | null;
  initialName?: string;
  initialLat?: number | null;
  initialLng?: number | null;
};

const dogLabels = {
  "not-allowed": "No dogs",
  leashed: "Dogs leashed",
  "under-control": "Dogs allowed",
  "check-current-rules": "Check dog rules",
};

const difficultyStyles = {
  easy: "bg-emerald-100 text-emerald-800",
  moderate: "bg-amber-100 text-amber-800",
  hard: "bg-rose-100 text-rose-800",
};

function DestinationCard({
  destination,
  selected,
  onSelect,
}: {
  destination: Destination;
  selected: boolean;
  onSelect: () => void;
}) {
  const toiletLabel =
    destination.toilet === "yes"
      ? "Toilet"
      : destination.toilet === "no"
        ? "No toilet"
        : "Toilet: check";

  const storageLabel =
    destination.foodStorage === "yes"
      ? "Food storage"
      : destination.foodStorage === "seasonal"
        ? "Seasonal storage"
        : destination.foodStorage === "no"
          ? "No storage"
          : "Storage: check";

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-green-700 bg-green-50 ring-2 ring-green-700/15"
          : "border-gray-200 bg-white hover:border-green-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-bold text-gray-950">
              {destination.name}
            </p>

            {destination.featured && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-800">
                Popular
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-gray-500">
            {destination.park} · {destination.region}
          </p>
        </div>

        {selected ? (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-800 text-white">
            <Check className="h-3.5 w-3.5" />
          </span>
        ) : (
          <TentTree className="h-5 w-5 shrink-0 text-gray-300" />
        )}
      </div>

      <p className="mt-3 text-xs leading-5 text-gray-600">
        {destination.summary}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-medium">
        <span
          className={`rounded-full px-2 py-1 capitalize ${
            difficultyStyles[destination.difficulty]
          }`}
        >
          {destination.difficulty}
        </span>

        {destination.distanceKm !== null && (
          <span className="rounded-full bg-gray-100 px-2 py-1">
            {destination.distanceKm} km in
          </span>
        )}

        <span className="rounded-full bg-gray-100 px-2 py-1">
          {toiletLabel}
        </span>

        <span className="rounded-full bg-gray-100 px-2 py-1">
          {storageLabel}
        </span>

        <span className="rounded-full bg-gray-100 px-2 py-1">
          {dogLabels[destination.dogs]}
        </span>
      </div>
    </button>
  );
}

export default function DestinationPicker({
  destinationField = "destinationId",
  nameField,
  latField,
  lngField,
  initialDestinationId,
  initialName,
  initialLat,
  initialLng,
}: Props) {
  const initialDestination = getDestination(
    initialDestinationId,
  );

  const [mode, setMode] = useState<"popular" | "custom">(
    initialDestination || !initialName
      ? "popular"
      : "custom",
  );

  const [selectedId, setSelectedId] = useState(
    initialDestination?.id ?? "",
  );

  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [dogsOnly, setDogsOnly] = useState(false);

  const selected = getDestination(selectedId);
  const regions = getDestinationRegions();

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return DESTINATIONS.filter((destination) => {
      const searchable =
        `${destination.name} ${destination.park} ${destination.region}`.toLowerCase();

      const dogFriendly =
        destination.dogs === "leashed" ||
        destination.dogs === "under-control";

      return (
        (region === "All" ||
          destination.region === region) &&
        (difficulty === "All" ||
          destination.difficulty === difficulty) &&
        (!dogsOnly || dogFriendly) &&
        (!search || searchable.includes(search))
      );
    }).sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        a.name.localeCompare(b.name),
    );
  }, [difficulty, dogsOnly, query, region]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1">
        <button
          type="button"
          onClick={() => setMode("popular")}
          className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold ${
            mode === "popular"
              ? "bg-white text-green-900 shadow-sm"
              : "text-gray-500"
          }`}
        >
          <TentTree className="h-4 w-4" />
          Popular destinations
        </button>

        <button
          type="button"
          onClick={() => setMode("custom")}
          className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold ${
            mode === "custom"
              ? "bg-white text-green-900 shadow-sm"
              : "text-gray-500"
          }`}
        >
          <Map className="h-4 w-4" />
          Custom wilderness trip
        </button>
      </div>

      {mode === "popular" ? (
        <>
          <input
            type="hidden"
            name={destinationField}
            value={selected?.id ?? ""}
          />

          <input
            type="hidden"
            name={nameField}
            value={
              selected
                ? `${selected.name}, ${selected.park}`
                : ""
            }
          />

          <input
            type="hidden"
            name={latField}
            value={selected?.latitude ?? ""}
          />

          <input
            type="hidden"
            name={lngField}
            value={selected?.longitude ?? ""}
          />

          <div className="grid gap-2 md:grid-cols-[1fr_auto_auto]">
            <label className="flex items-center gap-2 rounded-xl border bg-white px-3">
              <Search className="h-4 w-4 text-gray-400" />

              <input
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Search campground or park"
                className="w-full py-2.5 text-sm outline-none"
              />
            </label>

            <select
              value={region}
              onChange={(event) =>
                setRegion(event.target.value)
              }
              className="rounded-xl border bg-white px-3 py-2.5 text-sm"
            >
              <option value="All">All regions</option>

              {regions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={difficulty}
              onChange={(event) =>
                setDifficulty(event.target.value)
              }
              className="rounded-xl border bg-white px-3 py-2.5 text-sm"
            >
              <option value="All">All difficulty</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <label className="flex w-fit cursor-pointer items-center gap-2 text-xs font-medium text-gray-600">
            <input
              type="checkbox"
              checked={dogsOnly}
              onChange={(event) =>
                setDogsOnly(event.target.checked)
              }
              className="h-4 w-4 accent-green-800"
            />
            Dog-friendly only
          </label>

          <div className="grid max-h-[430px] gap-3 overflow-y-auto pr-1 md:grid-cols-2">
            {filtered.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                selected={destination.id === selectedId}
                onSelect={() =>
                  setSelectedId(destination.id)
                }
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="rounded-xl bg-gray-100 px-4 py-6 text-center text-sm text-gray-500">
              No destinations match those filters.
            </p>
          )}

          {selected ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-green-800" />

                <div>
                  <p className="font-semibold text-green-950">
                    Selected: {selected.name}
                  </p>

                  {selected.caution && (
                    <p className="mt-1 text-xs leading-5 text-green-900/75">
                      {selected.caution}
                    </p>
                  )}

                  <div className="mt-2 flex gap-3 text-xs font-semibold">
                    <a
                      href={selected.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-800 underline"
                    >
                      Official information
                    </a>

                    {selected.bookingUrl && (
                      <a
                        href={selected.bookingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-800 underline"
                      >
                        Book campsite
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-900">
              Choose a destination to continue.
            </p>
          )}
        </>
      ) : (
        <>
          <input
            type="hidden"
            name={destinationField}
            value=""
          />

          <div className="rounded-xl border bg-white p-3">
            <p className="mb-2 text-xs text-gray-500">
              Search for any wilderness location, then adjust
              it on the map if needed.
            </p>

            <LocationPicker
              nameField={nameField}
              latField={latField}
              lngField={lngField}
              initialName={initialName}
              initialLat={initialLat ?? undefined}
              initialLng={initialLng ?? undefined}
            />
          </div>
        </>
      )}
    </div>
  );
}
```

### `components/build/LocationMap.tsx`

```typescript
"use client";

import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
    useMap,
} from "react-leaflet";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: unknown })._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


type LatLng = {
    lat: number;
    lng: number;
};


function ClickHandler({
    onPick,
}: {
    onPick: (pos: LatLng) => void;
}) {
    useMapEvents({
        click(e) {
            onPick({
                lat: e.latlng.lat,
                lng: e.latlng.lng,
            });
        },
    });

    return null;
}


function FlyTo({
    position,
}: {
    position: LatLng | null;
}) {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(
                [position.lat, position.lng],
                12,
                {
                    duration: 0.8,
                }
            );
        }
    }, [position, map]);

    return null;
}


export default function LocationMap({
    position,
    onPick,
}: {
    position: LatLng | null;
    onPick: (pos: LatLng) => void;
}) {

    return (
        // components/build/LocationMap.tsx — only the className on MapContainer changes
<MapContainer
    key={position ? `${position.lat}-${position.lng}` : "default"}
    center={position ? [position.lat, position.lng] : [49.28, -123.12]}
    zoom={position ? 12 : 6}
    scrollWheelZoom={false}
    className="h-[400px] w-full rounded-xl"
>

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />

            <ClickHandler onPick={onPick} />

            <FlyTo position={position} />

            {position && (
                <Marker
                    position={[
                        position.lat,
                        position.lng,
                    ]}
                />
            )}

        </MapContainer>
    );
}
```

### `components/build/LocationPicker.tsx`

```typescript
// components/build/LocationPicker.tsx
"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("./LocationMap"), { ssr: false });

type LatLng = { lat: number; lng: number };
type Suggestion = { display_name: string; lat: string; lon: string };

export default function LocationPicker({
    nameField,
    latField,
    lngField,
    initialName,
    initialLat,
    initialLng,
}: {
    nameField: string;
    latField: string;
    lngField: string;
    initialName?: string;
    initialLat?: number;
    initialLng?: number;
}) {
    const [query, setQuery] = useState(initialName ?? "");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [position, setPosition] = useState<LatLng | null>(
        initialLat != null && initialLng != null
            ? {
                lat: initialLat,
                lng: initialLng,
            }
            : null,
    );
    const [placeName, setPlaceName] = useState(initialName ?? "");
    const [showMap, setShowMap] = useState(false);

    const [listCoords, setListCoords] = useState({ top: 0, left: 0, width: 0 });
    const [mapCoords, setMapCoords] = useState({ top: 0, left: 0, width: 0 });

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const mapTriggerRef = useRef<HTMLButtonElement>(null);
    const mapPanelRef = useRef<HTMLDivElement>(null);

    function updateListCoords() {
        if (!inputRef.current) return;
        const rect = inputRef.current.getBoundingClientRect();
        setListCoords({
            top: rect.bottom + window.scrollY + 4,
            left: rect.left + window.scrollX,
            width: Math.max(rect.width, 288),
        });
    }

    function updateMapCoords() {
        if (!mapTriggerRef.current) return;
        const triggerRect = mapTriggerRef.current.getBoundingClientRect();
        const popupWidth = 460;

        const card = mapTriggerRef.current.closest(".trip-card");
        const cardRect = card ? card.getBoundingClientRect() : null;

        let left = cardRect
            ? cardRect.left + window.scrollX + cardRect.width / 2 - popupWidth / 2
            : triggerRect.left + window.scrollX + triggerRect.width / 2 - popupWidth / 2;

        // clamp so it never overflows the viewport horizontally
        const minLeft = 8;
        const maxLeft = window.scrollX + window.innerWidth - popupWidth - 8;
        left = Math.min(Math.max(left, minLeft), maxLeft);

        setMapCoords({
            top: triggerRect.bottom + window.scrollY + 8,
            left,
            width: popupWidth,
        });
    }

    useLayoutEffect(() => {
        if (suggestions.length > 0) updateListCoords();
    }, [suggestions.length]);

    useLayoutEffect(() => {
        if (showMap) updateMapCoords();
    }, [showMap]);

    useEffect(() => {
        if (suggestions.length === 0 && !showMap) return;

        function handleScrollOrResize() {
            updateListCoords();
            updateMapCoords();
        }

        function handleClickOutside(e: MouseEvent) {
            const target = e.target as Node;

            if (
                !inputRef.current?.contains(target) &&
                !listRef.current?.contains(target)
            ) {
                setSuggestions([]);
            }

            if (
                !mapTriggerRef.current?.contains(target) &&
                !mapPanelRef.current?.contains(target)
            ) {
                setShowMap(false);
            }
        }

        window.addEventListener("scroll", handleScrollOrResize, true);
        window.addEventListener("resize", handleScrollOrResize);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScrollOrResize, true);
            window.removeEventListener("resize", handleScrollOrResize);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [suggestions.length, showMap]);

    function handleQueryChange(value: string) {
        setQuery(value);
        setPlaceName(value);

        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (value.trim().length < 3) {
            setSuggestions([]);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5`
                );
                setSuggestions(await res.json());
            } catch {
                setSuggestions([]);
            }
        }, 400);
    }

    function selectSuggestion(s: Suggestion) {
        setPosition({ lat: parseFloat(s.lat), lng: parseFloat(s.lon) });
        setPlaceName(s.display_name);
        setQuery(s.display_name);
        setSuggestions([]);
        setShowMap(true);
    }

    async function handleMapPick(pos: LatLng) {
        setPosition(pos);
        setShowMap(true);

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.lat}&lon=${pos.lng}`
            );
            const data = await res.json();

            if (data.display_name) {
                setPlaceName(data.display_name);
                setQuery(data.display_name);
            } else {
                setPlaceName("Pinned location");
                setQuery("Pinned location");
            }
        } catch {
            setPlaceName("Pinned location");
            setQuery("Pinned location");
        }
    }

    return (
        <div>
            <input type="hidden" name={nameField} value={placeName} />
            <input type="hidden" name={latField} value={position ? position.lat : ""} />
            <input type="hidden" name={lngField} value={position ? position.lng : ""} />

            <div>
                <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    placeholder="Garibaldi Provincial Park"
                    className="w-full rounded-lg border-0 bg-transparent px-0 py-0.5 text-sm outline-none focus:ring-0 placeholder:text-gray-300"
                />

                {suggestions.length > 0 && typeof document !== "undefined" && createPortal(
                    <ul
                        ref={listRef}
                        style={{ position: "absolute", top: listCoords.top, left: listCoords.left, width: listCoords.width }}
                        className="z-[999] rounded-lg border bg-white shadow-lg"
                    >
                        {suggestions.map((s, i) => (
                            <li key={i}>
                                <button
                                    type="button"
                                    onClick={() => selectSuggestion(s)}
                                    className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-50 cursor-pointer truncate"
                                >
                                    {s.display_name}
                                </button>
                            </li>
                        ))}
                    </ul>,
                    document.body
                )}
            </div>

            <button
                ref={mapTriggerRef}
                type="button"
                onClick={() => setShowMap(!showMap)}
                className="mt-1 text-[11px] font-medium text-green-700 hover:text-green-800 cursor-pointer"
            >
                {showMap ? "Hide map" : "Pick on map"}
            </button>

            {showMap && typeof document !== "undefined" && createPortal(
                <div
                    ref={mapPanelRef}
                    style={{ position: "absolute", top: mapCoords.top, left: mapCoords.left, width: mapCoords.width }}
                    className="z-[999] rounded-xl border border-gray-200 bg-white p-2 shadow-xl"
                >
                    <LocationMap position={position} onPick={handleMapPick} />
                </div>,
                document.body
            )}
        </div>
    );
}
```

### `components/builder/AddCustomItemForm.tsx`

```typescript
"use client";

import { useState } from "react";
import { addCustomItem } from "@/lib/tracked-build-actions";

type Props = {
    buildId: string;
    category: string;
};

export default function AddCustomItemForm({
    buildId,
    category,
}: Props) {
    const [open, setOpen] = useState(false);

    if (!open) {
        return (
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-block text-sm text-gray-500 cursor-pointer hover:text-gray-700 hover:underline"
            >
                + Add custom item
            </button>
        );
    }

    return (
        <form
            action={addCustomItem}
            className="mt-2 max-md:w-full max-md:min-w-0 max-md:flex-none flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3"
        >
            <input type="hidden" name="buildId" value={buildId} />
            <input type="hidden" name="category" value={category} />

            <input
                name="name"
                placeholder="Item name"
                required
                className="flex-1 min-w-[140px] max-md:basis-full max-md:min-w-0 rounded-md border border-gray-300 px-2 py-1 max-md:min-h-9 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                name="weight_g"
                type="number"
                placeholder="Weight (g)"
                className="w-24 max-md:min-w-0 max-md:flex-1 rounded-md border border-gray-300 px-2 py-1 max-md:min-h-9 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                name="price_cad"
                type="number"
                step="0.01"
                placeholder="Price ($)"
                className="w-24 rounded-md border border-gray-300 px-2 py-1 max-md:min-h-9 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-2">
                <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white cursor-pointer hover:bg-blue-700 transition"
                >
                    Add
                </button>

                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-1 text-sm text-gray-500 cursor-pointer hover:text-gray-700"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

```

### `components/builder/AddGearButton.tsx`

```typescript
"use client";

import { addGear } from "@/lib/tracked-build-actions";


export default function AddGearButton({
    buildId,
    gearId,
}: {
    buildId:string;
    gearId:string;
}) {

    return (
        <form
            action={addGear}
        >

            <input
                type="hidden"
                name="buildId"
                value={buildId}
            />

            <input
                type="hidden"
                name="gearId"
                value={gearId}
            />


            <button
                className="
                rounded-lg
                bg-green-700
                px-3
                py-1
                text-white
                hover:bg-green-800
                cursor-pointer
                transition
                "
            >
                Add
            </button>

        </form>
    );
}

```

### `components/builder/AnalysisFindingCard.tsx`

```typescript
"use client";

// This is the original Analysis tab FindingCard, extracted for reuse rather
// than replaced by a second card design. The only addition is Ignore/Restore.
import { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronDown, HelpCircle, Info, ShieldAlert, Sparkles } from 'lucide-react';
import type { Finding, FindingLevel } from '@/lib/pack-intelligence';

const tags:Record<FindingLevel,{text:string;icon:typeof Info;style:string}> = {
  critical:{text:'Official alert',icon:ShieldAlert,style:'bg-red-50 text-red-900 border-red-200'},
  review:{text:'Needs review',icon:AlertTriangle,style:'bg-amber-50 text-amber-950 border-amber-200'},
  opportunity:{text:'Improvement',icon:Sparkles,style:'bg-blue-50 text-blue-950 border-blue-200'},
  unknown:{text:'Missing evidence',icon:HelpCircle,style:'bg-gray-50 text-gray-800 border-gray-200'},
};

function FindingCard({f,ignored=false,onToggleIgnore}:{f:Finding;ignored?:boolean;onToggleIgnore?:(f:Finding)=>void}) {
  const [expanded,setExpanded]=useState(false);
  const t=tags[f.level];const Icon=t.icon;
  return <article className={`overflow-hidden rounded-2xl border bg-white ${f.level==='critical'?'border-red-300':'border-gray-200'} ${ignored?'opacity-65':''}`}>
    <button type="button" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)} className="flex w-full items-start gap-3 p-4 text-left sm:p-5">
      <span className={`rounded-xl border p-2 ${t.style}`}><Icon className="h-5 w-5"/></span>
      <span className="min-w-0 flex-1"><span className="text-xs font-semibold text-gray-500">{ignored?'Ignored · ':''}{t.text} · {f.section}</span><span className="mt-1 block text-base font-semibold text-gray-950">{f.title}</span><span className="mt-1 block text-sm leading-relaxed text-gray-600">{f.detail}</span></span>
      <ChevronDown className={`mt-1 h-4 w-4 shrink-0 text-gray-500 transition ${expanded?'rotate-180':''}`}/>
    </button>
    {expanded && <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 text-sm sm:px-5"><p className="font-semibold text-green-900">Next step</p><p className="mt-1 text-gray-800">{f.action}</p><p className="mt-2 text-xs text-gray-500">Evidence: {f.basis}</p>{onToggleIgnore&&<div className="mt-3 flex items-center justify-between gap-3"><p className="text-xs text-gray-500">Ignoring acknowledges this finding; it does not certify the gear.</p><button type="button" onClick={()=>onToggleIgnore(f)} className="shrink-0 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100">{ignored?'Restore':'Ignore'}</button></div>}</div>}
  </article>;
}
export function FindingList({findings,empty,ignoredIds,onToggleIgnore}:{findings:Finding[];empty:string;ignoredIds?:ReadonlySet<string>;onToggleIgnore?:(f:Finding)=>void}) {return findings.length ? <div className="space-y-3">{findings.map(f=><FindingCard key={f.id} f={f} ignored={ignoredIds?.has(f.id)} onToggleIgnore={onToggleIgnore}/>)}</div> : <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5"><CheckCircle2 className="h-5 w-5 shrink-0 text-green-700"/><p className="text-sm text-gray-700">{empty} This is not a certification of safety or completeness.</p></div>;}


```

### `components/builder/build-data-utils.ts`

```typescript
export type ImportPreview = {
  name: string;
  itemCount: number;
  dayCount: number;
  version: number | null;
  fullBuild: boolean;
};

export type SelectedImport = {
  fileName: string;
  size: number;
  text: string;
  preview: ImportPreview;
};

export type HistoryEntry = {
  id: string;
  action: string;
  summary: string;
  createdAt: string;
  itemCount: number;
  dayCount: number;
  name: string;
  isCurrent: boolean;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function inspectImport(text: string): ImportPreview {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("That file is not valid JSON.");
  }

  if (!isRecord(parsed) || !Array.isArray(parsed.items)) {
    throw new Error("This doesn’t look like a TrailPicker export.");
  }
  if (parsed.format != null && parsed.format !== "trailpicker-build") {
    throw new Error("This file was not exported by TrailPicker.");
  }

  const version = typeof parsed.version === "number" ? parsed.version : null;
  return {
    name: typeof parsed.name === "string" && parsed.name.trim() ? parsed.name.trim() : "Imported build",
    itemCount: parsed.items.length,
    dayCount: Array.isArray(parsed.days) ? parsed.days.length : 0,
    version,
    fullBuild: version === 2 || version === 3 || Array.isArray(parsed.days) || "routeWaypoints" in parsed || "tripLogistics" in parsed,
  };
}

export function bytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function safeFileName(name: string) {
  const base = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${base || "trailpicker-build"}.json`;
}


export function relativeTime(value: string) {
  const date = new Date(value);
  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (seconds < 45) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function dayLabel(value: string) {
  const date = new Date(value);
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const diff = Math.round((start - target) / 86_400_000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: date.getFullYear() === now.getFullYear() ? undefined : "numeric" });
}

export function historyGroups(entries: HistoryEntry[]) {
  const groups: { label: string; entries: HistoryEntry[] }[] = [];
  for (const entry of entries) {
    const label = dayLabel(entry.createdAt);
    const last = groups[groups.length - 1];
    if (last?.label === label) last.entries.push(entry);
    else groups.push({ label, entries: [entry] });
  }
  return groups;
}


```

### `components/builder/BuildDataTools.tsx`

```typescript
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Backpack,
  CheckCircle2,
  Clock3,
  Download,
  FileDown,
  FileJson2,
  FileUp,
  History,
  Loader2,
  MapPinned,
  PackageOpen,
  RotateCcw,
  UploadCloud,
  X,
} from "lucide-react";
import { getBuildExport, importBuildItems } from "@/lib/tracked-build-actions";
import { getBuildHistory, restoreBuildRevision, undoLastBuildChange } from "@/lib/tracked-build-actions";

type Tool = "import" | "export" | "history";
type ImportMode = "merge" | "replace";
import { inspectImport, bytes, safeFileName, relativeTime, historyGroups, type SelectedImport, type HistoryEntry } from "./build-data-utils";

function historyIcon(action: string) {
  if (action === "import") return FileUp;
  if (action === "restore") return RotateCcw;
  if (action === "route" || action === "trip" || action === "itinerary" || action === "logistics") return MapPinned;
  if (action === "gear") return Backpack;
  return Clock3;
}

const toolTitle: Record<Tool, string> = {
  import: "Import build",
  export: "Export build",
  history: "History",
};

export default function BuildDataTools({
  buildId,
  buildName,
  createdAt,
  updatedAt,
  buttonClassName,
}: {
  buildId: string;
  buildName: string;
  createdAt: Date;
  updatedAt: Date;
  buttonClassName: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [tool, setTool] = useState<Tool>("import");
  const [selectedImport, setSelectedImport] = useState<SelectedImport | null>(null);
  const [importMode, setImportMode] = useState<ImportMode>("merge");
  const [importError, setImportError] = useState<string | null>(null);
  const [importNotice, setImportNotice] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historyNotice, setHistoryNotice] = useState<string | null>(null);
  const [confirmRestore, setConfirmRestore] = useState<string | null>(null);
  const [restoring, setRestoring] = useState<string | null>(null);

  async function loadHistory() {
    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const entries = await getBuildHistory(buildId);
      setHistory(entries);
    } catch {
      setHistoryError("Couldn’t load history.");
    } finally {
      setHistoryLoading(false);
    }
  }

  function open(nextTool: Tool) {
    setTool(nextTool);
    setImportError(null);
    setImportNotice(null);
    setExportNotice(null);
    setHistoryError(null);
    setHistoryNotice(null);
    setConfirmRestore(null);
    dialog.current?.showModal();
    if (nextTool === "history") void loadHistory();
  }

  async function readImportFile(file: File) {
    setImportError(null);
    setImportNotice(null);
    if (file.size > 2_000_000) {
      setSelectedImport(null);
      setImportError("File is too large. Maximum size is 2 MB.");
      return;
    }
    try {
      const text = await file.text();
      const preview = inspectImport(text);
      setSelectedImport({ fileName: file.name, size: file.size, text, preview });
    } catch (error) {
      setSelectedImport(null);
      setImportError(error instanceof Error ? error.message : "Couldn’t read that file.");
    }
  }

  async function runImport() {
    if (!selectedImport || importing) return;
    setImporting(true);
    setImportError(null);
    setImportNotice(null);
    try {
      const formData = new FormData();
      formData.set("buildId", buildId);
      formData.set("payload", selectedImport.text);
      formData.set("mode", importMode);
      const result = await importBuildItems(formData);
      setImportNotice(
        (result.mode === "replace"
          ? `Imported ${result.itemCount} item${result.itemCount === 1 ? "" : "s"}.`
          : `Added ${result.itemCount} item${result.itemCount === 1 ? "" : "s"}.`) +
          (result.unassignedStops ? ` ${result.unassignedStops} route stop${result.unassignedStops === 1 ? " was" : "s were"} left unassigned because the original day IDs were unavailable.` : ""),
      );
      setSelectedImport(null);
      if (fileInput.current) fileInput.current.value = "";
      setHistory([]);
      if (result.mode === "replace") window.dispatchEvent(new CustomEvent("trailpicker:build-replaced", { detail: buildId }));
      router.refresh();
    } catch (error) {
      setImportError(error instanceof Error ? error.message : "Import failed.");
    } finally {
      setImporting(false);
    }
  }

  async function runExport() {
    if (exporting) return;
    setExporting(true);
    setExportNotice(null);
    try {
      const data = await getBuildExport(buildId);
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = safeFileName(buildName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setExportNotice("Downloaded.");
    } catch {
      setExportNotice("Export failed. Try again.");
    } finally {
      setExporting(false);
    }
  }

  async function restore(entry: HistoryEntry) {
    if (restoring || entry.isCurrent) return;
    setRestoring(entry.id);
    setHistoryError(null);
    try {
      const result = await restoreBuildRevision(buildId, entry.id);
      setConfirmRestore(null);
      setHistoryNotice(`Version restored.${result.unassignedStops ? ` ${result.unassignedStops} route stop${result.unassignedStops === 1 ? " is" : "s are"} now unassigned (older history without day IDs).` : ""}`);
      await loadHistory();
      window.dispatchEvent(new CustomEvent("trailpicker:build-replaced", { detail: buildId }));
      router.refresh();
    } catch {
      setHistoryError("Couldn’t restore that version.");
    } finally {
      setRestoring(null);
    }
  }

  async function undoLastChange() {
    if (restoring || history.length < 2) return;
    setRestoring("undo");
    setHistoryError(null);
    setHistoryNotice(null);
    try {
      const result = await undoLastBuildChange(buildId);
      setHistoryNotice(`Last change undone.${result.unassignedStops ? ` ${result.unassignedStops} route stop${result.unassignedStops === 1 ? " is" : "s are"} now unassigned.` : ""}`);
      await loadHistory();
      window.dispatchEvent(new CustomEvent("trailpicker:build-replaced", { detail: buildId }));
      router.refresh();
    } catch (error) {
      setHistoryError(error instanceof Error ? error.message : "Couldn’t undo the last change.");
    } finally {
      setRestoring(null);
    }
  }

  return (
    <>
      <button type="button" onClick={() => open("import")} className={buttonClassName}>
        <FileUp className="h-4 w-4" aria-hidden="true" />
        Import
      </button>
      <button type="button" onClick={() => open("export")} className={buttonClassName}>
        <FileDown className="h-4 w-4" aria-hidden="true" />
        Export
      </button>
      <button type="button" onClick={() => open("history")} className={buttonClassName}>
        <History className="h-4 w-4" aria-hidden="true" />
        History
      </button>

      <dialog
        ref={dialog}
        aria-labelledby="build-data-title"
        className="fixed inset-0 m-auto max-h-[88vh] w-[calc(100%_-_2rem)] max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-gray-950/45"
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
          if (outside) event.currentTarget.close();
        }}
      >
        <div className="flex max-h-[88vh] flex-col">
          <header className="flex items-center justify-between gap-4 border-b border-gray-200 px-6 py-5">
            <h2 id="build-data-title" className="text-lg font-semibold text-gray-950">{toolTitle[tool]}</h2>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close"
              className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div className="overflow-y-auto px-6 py-6">
            {tool === "import" && (
              <div className="space-y-5">
                <input
                  ref={fileInput}
                  type="file"
                  accept="application/json,.json"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void readImportFile(file);
                  }}
                />

                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    const file = event.dataTransfer.files?.[0];
                    if (file) void readImportFile(file);
                  }}
                  className="group flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-9 text-center transition hover:border-green-600 hover:bg-green-50/40"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-green-800 shadow-sm ring-1 ring-gray-200">
                    <UploadCloud className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="mt-3 text-sm font-semibold text-gray-900">Choose a JSON file</span>
                  <span className="mt-1 text-xs text-gray-500">or drop it here</span>
                </button>

                {selectedImport && (
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-green-800 ring-1 ring-gray-200">
                        <FileJson2 className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">{selectedImport.fileName}</p>
                        <p className="text-xs text-gray-500">{bytes(selectedImport.size)} · {selectedImport.preview.version ? `v${selectedImport.preview.version}` : "legacy"}</p>
                      </div>
                      <button type="button" onClick={() => setSelectedImport(null)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700" aria-label="Remove file">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid gap-3 p-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs text-gray-500">Build</p>
                        <p className="mt-1 truncate text-sm font-medium text-gray-900">{selectedImport.preview.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Gear</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedImport.preview.itemCount} item{selectedImport.preview.itemCount === 1 ? "" : "s"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Trip</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedImport.preview.fullBuild ? `${selectedImport.preview.dayCount} day${selectedImport.preview.dayCount === 1 ? "" : "s"}` : "Gear only"}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedImport && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setImportMode("merge")}
                      className={`rounded-xl border p-4 text-left transition ${importMode === "merge" ? "border-green-700 bg-green-50 ring-1 ring-green-700/10" : "border-gray-200 hover:bg-gray-50"}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <PackageOpen className="h-5 w-5 text-green-800" />
                        {importMode === "merge" && <CheckCircle2 className="h-5 w-5 text-green-700" />}
                      </div>
                      <p className="mt-3 text-sm font-semibold text-gray-900">Add gear</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">Keep this build and add the imported gear.</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setImportMode("replace")}
                      className={`rounded-xl border p-4 text-left transition ${importMode === "replace" ? "border-amber-500 bg-amber-50 ring-1 ring-amber-500/10" : "border-gray-200 hover:bg-gray-50"}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <RotateCcw className="h-5 w-5 text-amber-700" />
                        {importMode === "replace" && <CheckCircle2 className="h-5 w-5 text-amber-600" />}
                      </div>
                      <p className="mt-3 text-sm font-semibold text-gray-900">Replace build</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">Replace the current gear and trip data.</p>
                    </button>
                  </div>
                )}

                {importError && <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{importError}</p>}
                {importNotice && <p role="status" className="flex items-start gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />{importNotice}</p>}

                <div className="flex justify-end border-t border-gray-100 pt-5">
                  <button
                    type="button"
                    onClick={runImport}
                    disabled={!selectedImport || importing}
                    className="inline-flex min-w-28 items-center justify-center gap-2 rounded-lg bg-green-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />}
                    {importing ? "Importing…" : importMode === "replace" ? "Replace" : "Import"}
                  </button>
                </div>
              </div>
            )}

            {tool === "export" && (
              <div className="space-y-5">
                <div className="rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800">
                      <Download className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-gray-950">{buildName}</p>
                      <p className="mt-1 text-sm text-gray-500">Gear, trip details, route, logistics, and itinerary.</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={runExport}
                    disabled={exporting}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-900 disabled:opacity-60"
                  >
                    {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
                    {exporting ? "Preparing…" : "Download JSON"}
                  </button>
                </div>

                <p className="text-xs text-gray-500">
                  Created {createdAt.toLocaleString()} · Updated {updatedAt.toLocaleString()}
                </p>

                {exportNotice && (
                  <p role="status" className={`rounded-lg px-4 py-3 text-sm ${exportNotice === "Downloaded." ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"}`}>
                    {exportNotice}
                  </p>
                )}
              </div>
            )}

            {tool === "history" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => void undoLastChange()}
                    disabled={historyLoading || history.length < 2 || Boolean(restoring)}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {restoring === "undo" ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
                    Undo last change
                  </button>
                  <button
                    type="button"
                    onClick={() => void loadHistory()}
                    disabled={historyLoading}
                    className="rounded-lg px-3 py-2 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50"
                  >
                    Refresh
                  </button>
                </div>

                {historyError && (
                  <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    {historyError}
                  </p>
                )}
                {historyNotice && (
                  <p role="status" className="flex items-start gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    {historyNotice}
                  </p>
                )}

                {historyLoading && history.length === 0 && (
                  <div className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-12 text-sm text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading…
                  </div>
                )}

                {!historyLoading && !historyError && history.length === 0 && (
                  <div className="rounded-xl border border-dashed border-gray-300 px-6 py-10 text-center">
                    <History className="mx-auto h-7 w-7 text-gray-400" />
                    <p className="mt-3 text-sm font-semibold text-gray-800">No history yet</p>
                  </div>
                )}

                {history[0] && (
                  <section>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">Current</p>
                    <div className="rounded-xl border border-green-200 bg-green-50/60 p-4">
                      <div className="flex items-start gap-3">
                        {(() => {
                          const Icon = historyIcon(history[0].action);
                          return (
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-800">
                              <Icon className="h-4 w-4" />
                            </span>
                          );
                        })()}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-950">{history[0].summary}</p>
                          <p className="mt-1 text-xs text-gray-500" title={new Date(history[0].createdAt).toLocaleString()}>
                            {relativeTime(history[0].createdAt)} · {history[0].itemCount} gear · {history[0].dayCount} day{history[0].dayCount === 1 ? "" : "s"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {historyGroups(history.slice(1)).map((group) => (
                  <section key={group.label}>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">{group.label}</p>
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                      {group.entries.map((entry, index) => {
                        const Icon = historyIcon(entry.action);
                        const confirming = confirmRestore === entry.id;
                        return (
                          <div key={entry.id} className={index === 0 ? "" : "border-t border-gray-100"}>
                            <div className="flex items-start gap-3 px-4 py-3.5">
                              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                                <Icon className="h-4 w-4" />
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900">{entry.summary}</p>
                                <p className="mt-1 text-xs text-gray-500" title={new Date(entry.createdAt).toLocaleString()}>
                                  {new Date(entry.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} · {entry.itemCount} gear · {entry.dayCount} day{entry.dayCount === 1 ? "" : "s"}
                                </p>
                              </div>
                              {!confirming && (
                                <button
                                  type="button"
                                  onClick={() => { setConfirmRestore(entry.id); setHistoryNotice(null); }}
                                  disabled={Boolean(restoring)}
                                  className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:opacity-40"
                                >
                                  Restore
                                </button>
                              )}
                            </div>

                            {confirming && (
                              <div className="flex flex-col gap-3 border-t border-amber-100 bg-amber-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-xs font-medium text-amber-900">Restore this version?</p>
                                <div className="flex shrink-0 gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setConfirmRestore(null)}
                                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-white/70"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => void restore(entry)}
                                    disabled={Boolean(restoring)}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
                                  >
                                    {restoring === entry.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RotateCcw className="h-3.5 w-3.5" />}
                                    Restore
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}

```

### `components/builder/BuildHeader.tsx`

```typescript
import Link from "next/link";

type Props = {
  buildId: string;
  name: string;
  active: "gear" | "analysis" | "trip";
  issueCount: number;
};

export default function BuildHeader({ buildId, name, active, issueCount }: Props) {
  const tabs = [
    { key: "gear" as const, label: "Gear", href: `/build/${buildId}` },
    { key: "trip" as const, label: "Trip Planner", href: `/build/${buildId}?tab=trip` },
  ];

  return (
    <div className="w-full bg-green-700 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-6 pt-6 pb-0">
        <h1 className="text-3xl font-bold text-white text-center mb-5 max-md:break-words max-md:[overflow-wrap:anywhere]">{name}</h1>

        <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={t.href}
              className={`
                relative px-3 py-2.5 text-sm sm:px-5 font-semibold rounded-t-lg transition
                ${active === t.key
                  ? "bg-gray-50 text-green-800"
                  : "text-white/80 hover:text-white hover:bg-white/10"}
              `}
            >
              {t.label}
              {t.key === "gear" && issueCount > 0 && (
                <span className="ml-2 rounded-full bg-amber-400 text-amber-950 text-[10px] font-bold px-1.5 py-0.5">
                  {issueCount}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}



```

### `components/builder/BuildRow.tsx`

```typescript
import { openGearSelection } from "@/lib/gear-selection-actions";
import Link from "next/link";
import RemoveGearButton from "@/components/builder/RemoveGearButton";
import QuantityStepper from "@/components/builder/QuantityStepper";
import AddCustomItemForm from "@/components/builder/AddCustomItemForm";
import ItemFlagToggle from "@/components/builder/ItemCategoryToggle";
import Image from "next/image";

type Props = {
    name: string;
    gearLink: string;
    selectCategory: string;
    categoryName: string;
    buildId: string;
    ownedGearIds: ReadonlySet<string>;

    items: {
        id: string;
        quantity: number;
        isConsumable: boolean;
        isWorn: boolean;
        gearNameSnapshot: string | null;
        weightSnapshot: number | null;
        priceSnapshot: number | null;
        gear: {
            id: string;
            name: string;
            weight_g: number | null;
            price_cad: number | null;

            images: {
                id: string;
                url: string;
                isPrimary: boolean;
            }[];
        } | null;
    }[];
};

export default function BuildRow({
    name,
    gearLink,
    selectCategory,
    categoryName,
    buildId,
    ownedGearIds,
    items,
}: Props) {
    return (
        <div
            className="
            grid
            grid-cols-[180px_minmax(0,1fr)_100px_100px_100px]
            max-md:grid-cols-1 max-md:gap-3
            items-start
            border-t
            border-gray-400
            px-3
            py-4
            hover:bg-gray-50
            bg-gray-50
            transition
            "
        >
            {/* Component */}
            <Link
                href={gearLink}
                className="font-semibold text-blue-500 underline text-sm hover:text-blue-700 transition"
            >
                {name}
            </Link>

            <div className="col-span-4 max-md:col-span-1 max-md:min-w-0">
                {items.length === 0 ? (
                    <div className="flex items-center gap-4 max-md:flex-wrap max-md:items-start max-md:gap-3">
                        <form action={openGearSelection.bind(null, buildId, selectCategory)}><button type="submit" className="
                inline-block
                rounded-lg
                bg-blue-500
                px-3
                py-1.5
                text-white
                text-sm
                hover:bg-blue-700
                transition
            "
                        >Add Gear</button></form>

                        <AddCustomItemForm
                            buildId={buildId}
                            category={categoryName}
                        />
                    </div>
                ) : (
                    <div>
                        <div className="divide-y divide-gray-100">
                            {items.map((item) => {
                                const itemName =
                                    item.gear?.name ?? item.gearNameSnapshot ?? "Custom item";
                                const weight =
                                    item.gear?.weight_g ?? item.weightSnapshot;
                                const price =
                                    item.gear?.price_cad ?? item.priceSnapshot;
                                const isOwned = Boolean(item.gear && ownedGearIds.has(item.gear.id));

                                return (
                                    <div
                                        key={item.id}
                                        className="grid grid-cols-[minmax(0,1fr)_100px_100px_100px] max-md:grid-cols-2 max-md:gap-x-3 max-md:gap-y-3 items-center py-4 first:pt-0 last:pb-0"
                                    >
                                        <div className="flex items-center gap-3 min-w-0 max-md:col-span-2 max-md:items-start">

                                            {item.gear?.images[0] && (
                                                <div className="
                                                    relative
                                                    w-12
                                                    aspect-square
                                                    rounded-lg
                                                    overflow-hidden
                                                    bg-white
                                                    border
                                                    border-gray-200
                                                    shrink-0
                                                ">
                                                    <Image
                                                        src={item.gear.images[0].url}
                                                        alt={itemName}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            )}

                                            <div className="flex flex-wrap items-center gap-2 min-w-0 max-md:flex-1 max-md:gap-y-2">
                                                {item.gear ? (
                                                    <Link
                                                        href={`/gear/${item.gear.id}`}
                                                        className="block font-bold truncate hover:underline hover:text-blue-600 max-md:w-full max-md:whitespace-normal max-md:break-words max-md:[overflow-wrap:anywhere]"
                                                    >
                                                        {itemName}
                                                    </Link>
                                                ) : (
                                                    <span className="block font-bold italic text-gray-700 truncate max-md:w-full max-md:whitespace-normal max-md:break-words max-md:[overflow-wrap:anywhere]">
                                                        {itemName}
                                                    </span>
                                                )}

                                                <QuantityStepper
                                                    itemId={item.id}
                                                    buildId={buildId}
                                                    quantity={item.quantity}
                                                />

                                                <ItemFlagToggle
                                                    itemId={item.id}
                                                    buildId={buildId}
                                                    isConsumable={item.isConsumable}
                                                    isWorn={item.isWorn}
                                                />

                                            </div>
                                        </div>

                                        <div className="text-center pr-5 max-md:pr-0 max-md:text-left max-md:break-words">
                                            <span className="hidden max-md:block max-md:text-xs max-md:text-gray-500">Weight</span>
                                            {weight != null ? `${weight * item.quantity}g` : "—"}
                                        </div>

                                        <div className="text-center pr-5 max-md:pr-0 max-md:text-left max-md:break-words">
                                            <span className="hidden max-md:block max-md:text-xs max-md:text-gray-500">Price</span>
                                            {price != null
                                                ? `$${(price * item.quantity).toFixed(2)}`
                                                : "—"}
                                        </div>

                                        <div className="flex items-center justify-end gap-1 max-md:col-span-2 max-md:gap-2 max-md:[&_button]:min-h-9 max-md:[&_button]:min-w-9">
                                            {item.gear && (isOwned ? (
                                                <span title="Already in My Gear" className="inline-flex items-center rounded-md bg-green-50 px-2.5 py-1.5 text-xs font-semibold text-green-800">
                                                    Owned
                                                </span>
                                            ) : (
                                                <Link
                                                    href={`/gear/${item.gear.id}`}
                                                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 transition max-md:min-h-9 max-md:inline-flex max-md:items-center"
                                                >
                                                    Buy
                                                </Link>
                                            ))}
                                            <RemoveGearButton itemId={item.id} buildId={buildId} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-2 flex items-center gap-4 max-md:flex-wrap max-md:items-start max-md:gap-3">
                            <form action={openGearSelection.bind(null, buildId, selectCategory)}><button type="submit" className="inline-block text-sm text-blue-600 hover:underline"
                            >+ Add Additional</button></form>

                            <AddCustomItemForm buildId={buildId} category={categoryName} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}



```

### `components/builder/BuildSaveStatus.tsx`

```typescript
"use client";

import { useEffect, useSyncExternalStore } from "react";
import { getSaveStatus, serverSaveStatus, subscribeSaveStatus } from "@/lib/build-save-status";

export default function BuildSaveStatus({ buildId }: { buildId: string }) {
  const status = useSyncExternalStore(subscribeSaveStatus, () => getSaveStatus(buildId), serverSaveStatus);
  useEffect(() => {
    if (status.state === "saved") return;
    const beforeUnload = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [status.state]);
  return <span role="status" aria-live="polite" aria-atomic="true" title={status.message} className="inline-flex shrink-0 items-center gap-1.5 text-[10px] font-semibold tracking-wide">
    STATUS:
    <span aria-hidden="true" className={`h-2 w-2 rounded-full ${status.state === "saved" ? "bg-green-600" : status.state === "error" ? "bg-red-600" : "bg-amber-500"} ${status.state === "saving" ? "animate-pulse" : ""}`} />
    <span className="sr-only">{status.message}</span>
  </span>;
}

```

### `components/builder/BuildSettings.tsx`

```typescript
"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Settings2, X, LockKeyhole, Globe2 } from "lucide-react";
import { setBuildVisibility } from "@/lib/tracked-build-actions";
import { renameBuild } from "@/lib/tracked-build-actions";

export default function BuildSettings({ buildId, buildName, isPublic, buttonClassName }: {
  buildId: string;
  buildName: string;
  isPublic: boolean;
  buttonClassName: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState(buildName);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const cleanName = name.trim();

  function open() {
    setName(buildName);
    setError(null);
    setNotice(null);
    dialog.current?.showModal();
  }

  function saveName(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!cleanName || cleanName.length > 100) {
      setError("Enter a build name between 1 and 100 characters.");
      return;
    }
    setError(null);
    setNotice(null);
    startTransition(async () => {
      try {
        await renameBuild(buildId, cleanName);
        setNotice("Build name saved.");
        router.refresh();
      } catch {
        setError("Couldn’t save the build name. Please try again.");
      }
    });
  }

  function changeVisibility(next: boolean) {
    if (next === isPublic || pending) return;
    setError(null);
    setNotice(null);
    startTransition(async () => {
      try {
        await setBuildVisibility(buildId, next);
        setNotice(next ? "Build is now public." : "Build is now private.");
        router.refresh();
      } catch {
        setError("Couldn’t save visibility. Please try again.");
      }
    });
  }

  return <>
    <button type="button" onClick={open} className={buttonClassName} aria-haspopup="dialog">
      <Settings2 className="h-4 w-4" aria-hidden="true" />
      Settings
    </button>
    <dialog ref={dialog} aria-labelledby="build-settings-title"
      className="fixed inset-0 m-auto max-h-[85vh] w-[calc(100%_-_2rem)] max-w-lg overflow-y-auto rounded-2xl border border-gray-200 bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-gray-950/35"
      onClick={e => { if (e.target === e.currentTarget) {
        const rect = e.currentTarget.getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) e.currentTarget.close();
      } }}>
      <header className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
        <div>
          <h2 id="build-settings-title" className="text-lg font-semibold">Build settings</h2>
          <p className="mt-1 text-xs text-gray-500">Name and sharing</p>
        </div>
        <button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="Close settings"
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-green-700">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </header>
      <div className="space-y-7 px-6 py-6">
        <form onSubmit={saveName}>
          <label htmlFor="build-settings-name" className="text-sm font-semibold">Build name</label>
          <div className="mt-2 flex gap-2">
            <input id="build-settings-name" value={name} onChange={e => setName(e.target.value)} maxLength={100} required disabled={pending}
              className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10 disabled:opacity-50" />
            <button type="submit" disabled={pending || !cleanName || cleanName === buildName}
              className="rounded-lg bg-green-800 px-4 py-2 text-sm font-medium text-white hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-40">Save</button>
          </div>
        </form>
        <section>
          <h3 className="text-sm font-semibold">Visibility</h3>
          <div role="group" aria-label="Build visibility" className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1">
            {[{ value: false, label: "Private", Icon: LockKeyhole }, { value: true, label: "Public", Icon: Globe2 }].map(({ value, label, Icon }) =>
              <button key={label} type="button" aria-pressed={isPublic === value} disabled={pending} onClick={() => changeVisibility(value)}
                className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-green-700 disabled:cursor-wait ${isPublic === value ? "bg-white text-green-900 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />{label}
              </button>)}
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            {isPublic ? "Anyone with the link can view this build. Only you can edit it." : "Only you can view and edit this build."}
          </p>
          <p className="mt-2 text-xs leading-5 text-gray-400">Public sharing includes gear, trip dates, location, and itinerary notes. Visibility changes save automatically.</p>
        </section>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <p role="status" aria-live="polite" className="text-sm text-green-800">{pending ? "Saving…" : notice}</p>
      </div>
      <footer className="flex justify-end border-t border-gray-100 px-6 py-4">
        <button type="button" onClick={() => dialog.current?.close()} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Done</button>
      </footer>
    </dialog>
  </>;
}

```

### `components/builder/CompatibilityBar.tsx`

```typescript
"use client";
import { evaluatePackIntelligence, type IntelligenceItem } from "@/lib/pack-intelligence";
import type { PlannerBuild } from "@/lib/trip-planner";
import { useIgnoredFindings } from "./useIgnoredFindings";
import BuildSaveStatus from "@/components/builder/BuildSaveStatus";
import Link from "next/link";
import type { CompatItem } from "@/lib/compatibility";

type Props = {
  buildId?: string;
  trip: PlannerBuild;
  items: CompatItem[];
  totalWeight: number;
};

const styles = {
  ok: { bar: "bg-emerald-50 border-emerald-200 text-emerald-900", dot: "bg-emerald-500", label: "No issues detected" },
  warning: { bar: "bg-amber-50 border-amber-200 text-amber-900", dot: "bg-amber-500", label: "Action recommended" },
  error: { bar: "bg-red-50 border-red-200 text-red-900", dot: "bg-red-500", label: "Fix compatibility issue" },
  incomplete: { bar: "bg-slate-50 border-slate-200 text-slate-900", dot: "bg-slate-500", label: "Verify missing specs" },
  notes: { bar: "bg-sky-50 border-sky-200 text-sky-900", dot: "bg-sky-500", label: "Planning advice" },
};

export default function CompatibilityBar({ buildId, trip, items, totalWeight }: Props) {
  const findings = evaluatePackIntelligence(trip, items as IntelligenceItem[], trip.days).findings;
  const { ignoredIds } = useIgnoredFindings(buildId ?? "", findings, !!buildId);
  const active = findings.filter(f => !ignoredIds.has(f.id));
  const summary = {
    errors: active.filter(f => f.level === "critical").length,
    warnings: active.filter(f => f.level === "review").length,
    unknowns: active.filter(f => f.level === "unknown").length,
    total: active.length,
  };
  const status = summary.errors ? "error" : summary.warnings ? "warning" : summary.unknowns ? "incomplete" : summary.total ? "notes" : "ok";
  const style = styles[findings.length && active.length === 0 ? "notes" : status];
  // Details render only in the gear tab. The bar also renders on trip/analysis tabs.
  const detailsHref = buildId ? `/build/${encodeURIComponent(buildId)}?tab=gear#compatibility-details` : "#compatibility-details";

  return (
    <div className={`flex items-center justify-between gap-3 border px-5 py-3 text-sm max-md:flex-wrap ${style.bar}`}>
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <span aria-hidden="true" className={`h-2 w-2 rounded-full ${style.dot}`} />
        <span className="font-semibold">{findings.length && !active.length ? "All findings acknowledged" : style.label}</span>
        <span className="text-xs opacity-80">
          {summary.errors > 0 ? `${summary.errors} issue${summary.errors === 1 ? "" : "s"} · ` : ""}
          {summary.warnings > 0 ? `${summary.warnings} warning${summary.warnings === 1 ? "" : "s"} · ` : ""}
          {summary.unknowns > 0 ? `${summary.unknowns} unknown${summary.unknowns === 1 ? "" : "s"} · ` : ""}
          {summary.total === 0 ? "No active findings (not a safety guarantee)" : `${summary.total} active finding${summary.total === 1 ? "" : "s"}`}
        </span>
        {ignoredIds.size > 0 && <span className="text-xs opacity-80">{ignoredIds.size} ignored</span>}
        {findings.length > 0 && <Link href={detailsHref} className="font-semibold underline underline-offset-2">See what to fix</Link>}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-md bg-white/60 px-3 py-1 text-xs font-semibold">
          Known weight: {(totalWeight / 1000).toFixed(1)} kg
        </span>
        {buildId && <BuildSaveStatus buildId={buildId} />}
      </div>
    </div>
  );
}


```

### `components/builder/CompatibilityDetails.tsx`

```typescript
"use client";

import { useState } from "react";
import type { CompatItem } from "@/lib/compatibility";
import type { PlannerBuild } from "@/lib/trip-planner";
import { evaluatePackIntelligence, type IntelligenceItem } from "@/lib/pack-intelligence";
import { FindingList } from "./AnalysisFindingCard";
import { useIgnoredFindings } from "./useIgnoredFindings";

type Props = {
  buildId?: string;
  trip: PlannerBuild;
  items: CompatItem[];
  readOnly?: boolean;
};

export default function CompatibilityDetails({ buildId, trip, items, readOnly = false }: Props) {
  const findings = evaluatePackIntelligence(trip, items as IntelligenceItem[], trip.days).findings;
  const { ignoredIds, toggleIgnore, storageError } = useIgnoredFindings(buildId ?? "", findings, !!buildId && !readOnly);
  const [showIgnored, setShowIgnored] = useState(false);
  const active = findings.filter(f => !ignoredIds.has(f.id));
  const shown = showIgnored ? findings : active;

  return (
    <section id="compatibility-details" className="mt-10 scroll-mt-24" aria-labelledby="compatibility-title">
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-8">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Compatibility
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {active.length} active · {ignoredIds.size} acknowledged
          </p>
        </div>
        {!readOnly && ignoredIds.size > 0 && <button type="button" onClick={() => setShowIgnored(v => !v)} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50">
          {showIgnored ? "Hide ignored" : `Show ignored (${ignoredIds.size})`}
        </button>}
      </div>
      {storageError && <p role="alert" className="mt-3 text-sm text-amber-800">Could not save ignored findings in this browser.</p>}
      <div className="mt-4">
        <FindingList
          findings={shown}
          ignoredIds={ignoredIds}
          onToggleIgnore={!readOnly && buildId ? toggleIgnore : undefined}
          empty={findings.length ? "All current findings are acknowledged. They may still need attention." : "No analysis findings flagged this build."}
        />
      </div>
    </section>
  );
}

```

### `components/builder/ConsumablesTimeline.tsx`

```typescript
"use client";

import { useId, useMemo, useState } from "react";
import {
  AlertTriangle,
  ChevronUp,
  Info,
  Pencil,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";

import type { PackAnalysis } from "@/lib/pack-analysis";
import type { PlannerBuild } from "@/lib/trip-planner";
import { projectConsumableLoad } from "@/lib/consumables-model";
import { useDisplayPreferences } from "@/components/settings/DisplayPreferencesProvider";
import { weightText } from "@/lib/user-preferences";

type Props = {
  pack: PackAnalysis;
  trip: PlannerBuild;
};

const INITIAL_VISIBLE_DAYS = 10;

function numberOfDays(trip: PlannerBuild): number {
  if (trip.days.length) {
    return Math.min(31, Math.max(1, trip.days.length));
  }

  if (!trip.startDate || !trip.endDate) return 1;

  const from = new Date(trip.startDate).valueOf();
  const to = new Date(trip.endDate).valueOf();

  if (!Number.isFinite(from) || !Number.isFinite(to) || to < from) {
    return 1;
  }

  return Math.min(31, Math.max(1, Math.round((to - from) / 86_400_000) + 1));
}

export default function ConsumablesTimeline({ pack, trip }: Props) {
  const { weightUnit } = useDisplayPreferences();
  const formatWeight = (grams: number) => weightText(grams, weightUnit);
  const days = numberOfDays(trip);
  const settingsId = useId();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showAllDays, setShowAllDays] = useState(false);

  // String inputs let someone clear a field while editing, without making
  // the mass model receive NaN or an out-of-range value.
  const [dailyInput, setDailyInput] = useState<string | null>(null);
  const [resupplyDay, setResupplyDay] = useState(0);
  const [resupplyInput, setResupplyInput] = useState("0");

  const defaultDaily = Math.min(
    100_000,
    Math.round(pack.consumableGrams / days)
  );
  const dailyUse = dailyInput === null ? defaultDaily : Number(dailyInput || 0);
  const activeResupplyDay =
    resupplyDay >= 2 && resupplyDay <= days ? resupplyDay : 0;
  const resupplyGrams = Number(resupplyInput || 0);
  const effectiveResupply = activeResupplyDay ? resupplyGrams : 0;

  const timeline = useMemo(
    () =>
      projectConsumableLoad(
        pack.consumableGrams,
        days,
        dailyUse,
        activeResupplyDay || null,
        effectiveResupply
      ),
    [pack.consumableGrams, days, dailyUse, activeResupplyDay, effectiveResupply]
  );

  const unknownConsumables = pack.lines
    .filter((line) => line.weightClass === "consumable" && line.grams === null)
    .reduce((sum, line) => sum + line.quantity, 0);

  const firstShortfall = timeline.find((day) => day.unmetGrams > 0);
  const startingLoad = pack.baseGrams + pack.consumableGrams;
  const endingLoad =
    pack.baseGrams + (timeline.at(-1)?.remainingGrams ?? pack.consumableGrams);

  // Bars show base weight (gray) plus the consumables present at the START
  // of that day (green), including any resupply before that day.
  const dailyLoads = timeline.map((day) => ({
    ...day,
    supplies: day.startingGrams + day.addedGrams,
    carried: pack.baseGrams + day.startingGrams + day.addedGrams,
  }));
  const maxCarried = Math.max(1, ...dailyLoads.map((day) => day.carried));
  const visibleLoads = showAllDays
    ? dailyLoads
    : dailyLoads.slice(0, INITIAL_VISIBLE_DAYS);

  function resetAssumptions() {
    setDailyInput(null);
    setResupplyDay(0);
    setResupplyInput("0");
  }

  return (
    <section
      aria-labelledby="consumables-heading"
      className="min-w-0 border-b border-gray-200 pb-8 text-gray-800"
    >
      {/* Same section typography and understated metadata as Trip Planner. */}
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id="consumables-heading" className="text-xl font-bold text-gray-950">
            Consumables
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            See how your estimated carried weight changes as supplies are used
            and replenished during the trip.
          </p>
        </div>
        <span className="shrink-0 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
          {days} {days === 1 ? "day" : "days"} modeled
        </span>
      </header>

      {/* One connected panel, matching Trip Planner's divided sections. */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-2 gap-x-5 gap-y-5 border-b border-gray-200 px-4 py-5 sm:grid-cols-3 sm:gap-x-8 sm:px-5">
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-500">Starting pack</p>
            <p className="mt-1 text-2xl font-bold tracking-tight tabular-nums text-gray-950">
              {formatWeight(startingLoad)}
            </p>
            <p className="mt-1 text-xs text-gray-500">Base + recorded supplies</p>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-500">End of trip</p>
            <p className="mt-1 text-2xl font-bold tracking-tight tabular-nums text-green-800">
              {formatWeight(endingLoad)}
            </p>
            <p className="mt-1 text-xs text-gray-500">After day {days}</p>
          </div>
          <div className="col-span-2 min-w-0 border-t border-gray-100 pt-4 sm:col-span-1 sm:border-l sm:border-t-0 sm:py-0 sm:pl-7">
            <p className="text-xs font-medium text-gray-500">Recorded consumables</p>
            <p className="mt-1 text-2xl font-bold tracking-tight tabular-nums text-gray-950">
              {formatWeight(pack.consumableGrams)}
            </p>
            <p className="mt-1 text-xs text-gray-500">At the trailhead</p>
          </div>
        </div>

        {/* An editable row styled like the collapsible Trip Logistics rows. */}
        <div className="border-b border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-950">
                  Consumption &amp; resupply
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {formatWeight(dailyUse)} per day
                  {activeResupplyDay
                    ? ` · ${formatWeight(effectiveResupply)} added before day ${activeResupplyDay}`
                    : " · No resupply"}
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-expanded={settingsOpen}
              aria-controls={settingsId}
              onClick={() => setSettingsOpen((open) => !open)}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-800 transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              {settingsOpen ? (
                <>
                  <ChevronUp aria-hidden="true" className="h-4 w-4" />
                  Close
                </>
              ) : (
                <>
                  <Pencil aria-hidden="true" className="h-4 w-4" />
                  Edit assumptions
                </>
              )}
            </button>
          </div>

          <div
            id={settingsId}
            hidden={!settingsOpen}
            className="border-t border-gray-100 bg-gray-50/60 px-4 pb-5 pt-4 sm:px-5"
          >
            <div className="grid gap-4 md:grid-cols-3">
              <label className="block min-w-0">
                <span className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Daily consumption (g)
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={100_000}
                  step={10}
                  value={dailyInput ?? String(defaultDaily)}
                  onChange={(event) => {
                    const value = event.currentTarget.value;
                    if (
                      value === "" ||
                      (Number.isFinite(Number(value)) &&
                        Number(value) >= 0 &&
                        Number(value) <= 100_000)
                    ) {
                      setDailyInput(value);
                    }
                  }}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors hover:border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                />
              </label>
              <label className="block min-w-0">
                <span className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Resupply before
                </span>
                <select
                  value={activeResupplyDay}
                  disabled={days === 1}
                  onChange={(event) => setResupplyDay(Number(event.currentTarget.value))}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors hover:border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-700/10 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option value={0}>No resupply</option>
                  {Array.from({ length: days - 1 }, (_, index) => index + 2).map(
                    (day) => (
                      <option key={day} value={day}>
                        Day {day}
                      </option>
                    )
                  )}
                </select>
              </label>
              <label className="block min-w-0">
                <span className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Resupply amount (g)
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={1_000_000}
                  step={10}
                  disabled={!activeResupplyDay}
                  value={resupplyInput}
                  onChange={(event) => {
                    const value = event.currentTarget.value;
                    if (
                      value === "" ||
                      (Number.isFinite(Number(value)) &&
                        Number(value) >= 0 &&
                        Number(value) <= 1_000_000)
                    ) {
                      setResupplyInput(value);
                    }
                  }}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors hover:border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-700/10 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                />
              </label>
            </div>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
              <p className="max-w-xl text-xs leading-5 text-gray-500">
                Daily use starts as an even division of recorded supplies, not
                a recommended amount. Edits update this estimate only.
              </p>
              <button
                type="button"
                onClick={resetAssumptions}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 transition-colors hover:text-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
              >
                <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
                Reset assumptions
              </button>
            </div>
          </div>
        </div>

        {/* Readable, proportional bars distinguish fixed gear from supplies. */}
        <div className="px-4 py-5 sm:px-5 sm:py-6">
          <div className="flex flex-wrap items-start justify-between gap-x-5 gap-y-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-950">
                Estimated weight by day
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Pack weight at the start of each day, before daily use.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-600" aria-label="Chart legend">
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-gray-300" />
                Base weight
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-green-700" />
                Consumables
              </span>
            </div>
          </div>

          {startingLoad === 0 && effectiveResupply === 0 ? (
            <div className="mt-5 rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-7 text-center text-sm text-gray-500">
              Add items with recorded weights to see a meaningful weight projection.
            </div>
          ) : (
            <div
              role="list"
              aria-label="Estimated starting pack weight for each displayed trip day"
              className="mt-6 space-y-3"
            >
              {visibleLoads.map((day) => {
                const basePercent = (pack.baseGrams / maxCarried) * 100;
                const suppliesPercent = (day.supplies / maxCarried) * 100;

                return (
                  <div
                    key={day.day}
                    role="listitem"
                    aria-label={`Day ${day.day}: ${formatWeight(day.carried)} carried${
                      day.addedGrams > 0
                        ? `, including ${formatWeight(day.addedGrams)} resupply`
                        : ""
                    }`}
                    className="grid grid-cols-[3.3rem_minmax(0,1fr)_5.7rem] items-center gap-2.5 sm:grid-cols-[4rem_minmax(0,1fr)_7rem] sm:gap-4"
                  >
                    <span className="text-xs font-medium text-gray-600">
                      Day {day.day}
                    </span>
                    <div className="min-w-0">
                      <div aria-hidden="true" className="flex h-3 w-full overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full shrink-0 bg-gray-300 transition-[width] duration-300"
                          style={{ width: `${basePercent}%` }}
                        />
                        <div
                          className="h-full shrink-0 bg-green-700 transition-[width] duration-300"
                          style={{ width: `${suppliesPercent}%` }}
                        />
                      </div>
                      {day.addedGrams > 0 && (
                        <span className="mt-1 block text-[11px] font-medium text-green-800">
                          + {formatWeight(day.addedGrams)} resupply
                        </span>
                      )}
                    </div>
                    <span className="text-right text-xs font-semibold tabular-nums text-gray-900">
                      {formatWeight(day.carried)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {dailyLoads.length > INITIAL_VISIBLE_DAYS &&
            !(startingLoad === 0 && effectiveResupply === 0) && (
              <button
                type="button"
                aria-expanded={showAllDays}
                onClick={() => setShowAllDays((shown) => !shown)}
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
              >
                {showAllDays
                  ? "Show fewer days"
                  : `Show all ${dailyLoads.length} days`}
              </button>
            )}
        </div>
      </div>

      {/* Keep warnings and model limitations distinct from trip-day results. */}
      {unknownConsumables > 0 && (
        <div
          role="status"
          className="mt-4 flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
        >
          <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            {unknownConsumables} consumable {unknownConsumables === 1 ? "unit has" : "units have"} unknown weight.
            Your starting load may be incomplete.
          </p>
        </div>
      )}

      {firstShortfall && (
        <div
          role="status"
          className="mt-4 flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
        >
          <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Recorded consumable mass runs short by day <strong>{firstShortfall.day}</strong> with
            these assumptions. This is a weight projection, not a check of food,
            water, or fuel sufficiency.
          </p>
        </div>
      )}

      <p className="mt-5 flex items-start gap-2 border-t border-gray-100 pt-4 text-xs leading-5 text-gray-500">
        <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          Estimates use recorded consumable mass and your assumptions. Worn
          weight is excluded; the model does not calculate nutritional,
          hydration, or fuel requirements or verify resupply availability.
          Trips are modeled for up to 31 days.
        </span>
      </p>
    </section>
  );
}

```

### `components/builder/CostSummary.tsx`

```typescript
type Props = {
  totalCost: number;
  costToBuy: number;
};

const money = (value: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(value);

export default function CostSummary({ totalCost, costToBuy }: Props) {
  return (
    <div className="flex flex-wrap items-baseline justify-end gap-x-8 gap-y-2 border-t border-gray-400 bg-gray-50 px-4 py-4">
      <div className="flex items-baseline gap-2 text-sm text-gray-500">
        <span>Total gear value</span>
        <span className="font-semibold tabular-nums text-gray-800">{money(totalCost)}</span>
      </div>
      <div className="flex items-baseline gap-2 text-sm text-gray-700">
        <span>To buy</span>
        <strong className="text-xl font-bold tabular-nums text-gray-900">{money(costToBuy)}</strong>
      </div>
    </div>
  );
}

```

### `components/builder/GearPicker.tsx`

```typescript
import { prisma } from "@/lib/prisma";
import { findAccessibleBuild, requireBuildPageAccess } from "@/lib/build-access";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AddGearButton from "@/components/builder/AddGearButton";
import BrandFilter from "@/components/filters/BrandFilter";
import FilterSection from "@/components/filters/FilterSection";
import RangeFilter from "@/components/filters/RangeFilter";
import SortHeader from "@/components/filters/SortHeader";

export type GearBrowseSearch = Record<string, string | string[] | undefined>;
const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";
function limit(value: string | string[] | undefined, integer = false) {
  const text = first(value).trim();
  const number = Number(text);
  if (!text || !Number.isFinite(number) || number < 0) return undefined;
  return integer ? Math.min(Math.floor(number), 2147483647) : number;
}

export default async function OriginalGearPicker({ categorySlug, subcategorySlug, filters }: {
  categorySlug: string; subcategorySlug?: string; filters: GearBrowseSearch;
}) {
  const explicitBuild = first(filters.build);
  const cookieBuild = (await cookies()).get("currentBuild")?.value;
  // Navigation state chooses a candidate; ownership proof authorizes it.
  const access = explicitBuild
    ? await requireBuildPageAccess(explicitBuild)
    : cookieBuild ? await findAccessibleBuild(cookieBuild) : null;
  const build = access ? await prisma.build.findUnique({
    where: { id: access.id, userId: access.userId }, select: { id: true, name: true },
  }) : null;
  const categoryData = await prisma.category.findUnique({
    where: { slug: categorySlug.toLowerCase() },
    include: { subcategories: {
      orderBy: { name: "asc" },
      include: { gear: {
        where: { images: { some: {} } }, take: 1, orderBy: { name: "asc" },
        select: { name: true, images: { take: 1, orderBy: [{ isPrimary: "desc" }, { id: "asc" }] } },
      } },
    } },
  });
  if (!categoryData) notFound();
  const selected = subcategorySlug ? categoryData.subcategories.find(item => item.slug === subcategorySlug) : undefined;
  if (subcategorySlug && !selected) notFound();
  const scope = { categoryId: categoryData.id, ...(selected ? { subcategoryId: selected.id } : {}) };
  const sort = first(filters.sort);
  const direction = first(filters.direction) === "desc" ? "desc" as const : "asc" as const;
  const brands = (Array.isArray(filters.brand) ? filters.brand : [filters.brand ?? ""]).flatMap(item => item.split(",")).filter(Boolean);
  const maxWeight = limit(filters.maxWeight, true);
  const maxPrice = limit(filters.maxPrice);
  const [availableBrands, gear] = await Promise.all([
    prisma.brand.findMany({ where: { gear: { some: scope } }, orderBy: { name: "asc" } }),
    prisma.gear.findMany({
      where: {
        ...scope,
        ...(brands.length ? { brand: { name: { in: brands } } } : {}),
        ...(maxWeight !== undefined ? { weight_g: { lte: maxWeight } } : {}),
        ...(maxPrice !== undefined ? { price_cad: { lte: maxPrice } } : {}),
      },
      orderBy: sort === "weight" ? { weight_g: direction } : sort === "price" ? { price_cad: direction } : undefined,
      include: { brand: true, reviews: true, images: true },
    }),
  ]);
  const base = `/gear/${encodeURIComponent(categoryData.slug)}`;
  function typeHref(slug: string) {
    const query = new URLSearchParams();
    for (const key of ["brand", "maxWeight", "maxPrice", "sort", "direction", "build"]) {
      const value = filters[key];
      if (value) query.set(key, Array.isArray(value) ? value.join(",") : value);
    }
    return `${base}${slug ? "/" + encodeURIComponent(slug) : ""}${query.size ? "?" + query : ""}`;
  }
  const tiles = !selected && categoryData.subcategories.length > 0 ? <nav aria-label="Subcategories" className="mb-6">
    <h2 className="mb-3 text-center text-lg font-semibold">Shop by category</h2>
    <div className="flex flex-wrap justify-center gap-3">
{categoryData.subcategories.map(type => <Link
  key={type.id}
  href={typeHref(type.slug)}
  className="w-28 shrink-0 rounded-lg border border-gray-200 bg-white p-2 text-center">
      <div className="relative mx-auto h-20 w-20">
        {type.gear[0]?.images[0] ? <Image src={type.gear[0].images[0].url} alt={type.gear[0].name} fill sizes="80px" className="object-contain p-1" />
          : <div className="flex h-full items-center justify-center text-xs text-gray-400">No photo</div>}
      </div><span className="text-xs font-semibold">{type.name}</span>
    </Link>)}
    </div>
  </nav> : null;
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-[110rem] mx-auto px-8 py-8">

                <h1 className="text-3xl font-bold mb-8">
                    Choose {selected?.name ?? categoryData.name}
                </h1>

                {build && <p className="mb-4 text-sm text-gray-500">Adding to {build.name} · <Link href={`/build/${build.id}`} className="text-blue-600 hover:underline">Back to build</Link></p>}
                {tiles}
                <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">

                    {/* Filters */}
                    <aside className="border-r pr-6">

                        <h2 className="font-bold text-xl mb-4">
                            Filters
                        </h2>


                        <div className="space-y">
                            <FilterSection title="BRAND">
                                <BrandFilter
                                    brands={availableBrands}
                                />
                            </FilterSection>


                            <FilterSection title="WEIGHT">
                                <RangeFilter
                                    min={0}
                                    max={3000}
                                    unit="g"
                                    param="maxWeight"
                                />
                            </FilterSection>

                            <FilterSection title="PRICE">
                                <RangeFilter
                                    min={0}
                                    max={1000}
                                    unit="CAD"
                                    param="maxPrice"
                                />
                            </FilterSection>
                        </div>
                    </aside>

                    {/* Gear */}
                    <div role="region" aria-label="Products" className="min-w-0 overflow-x-auto rounded-lg">
                        <p className="mb-8 text-lg font-bold text-black">
                            {gear.length} Compatible Products
                        </p>
                        <div className="grid min-w-[850px] grid-cols-[2.3fr_90px_90px_100px_90px_90px_90px_90px] px-5 py-3 text-xs font-semibold tracking-wide text-gray-500 border-b border-gray-400">
                            <div>Product</div>
                            <SortHeader
                                label="Weight"
                                value="weight"
                            />
                            <div className="text-center">Capacity</div>
                            <div className="text-center">Frame</div>
                            <div className="text-center">Waterproof</div>
                            <div className="text-center">Rating</div>
                            <SortHeader
                                label="Price"
                                value="price"
                            />
                            <div></div>
                        </div>

                        <div className="divide-y divide-gray-200">
                            {gear.map((item) => {
                                const averageRating =
                                    item.reviews.length > 0
                                        ? (
                                            item.reviews.reduce(
                                                (sum, review) => sum + review.rating,
                                                0
                                            ) / item.reviews.length
                                        ).toFixed(1)
                                        : null;

                                return (
                                    <div
                                        key={item.id}
                                        className="grid grid-cols-[2.3fr_90px_90px_100px_90px_90px_90px_90px] items-center px-5 py-2 hover:bg-gray-50"
                                    >
                                        <div className="flex items-center gap-3">

                                            <Link href={`/gear/${item.id}`} aria-label={`View ${item.name}`} className="
                                                    relative
                                                    w-12
                                                    aspect-square
                                                    rounded-lg
                                                    overflow-hidden
                                                    bg-white
                                                    border
                                                    border-gray-200
                                                    shrink-0
                                                ">
                                                {item.images[0] && (
                                                    <Image
                                                        src={item.images[0].url}
                                                        alt={item.name}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                )}
                                            </Link>


                                            <div>
                                                <h2 className="font-semibold hover:text-blue-600">
                                                    <Link href={`/gear/${item.id}`}>{item.name}</Link>
                                                </h2>

                                                <p className="text-[13px] text-gray-500">
                                                    {item.brand.name}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="text-center">
                                            {item.weight_g ?? "—"}g
                                        </div>

                                        <div className="text-center">
                                            {item.capacity_l ?? "—"}L
                                        </div>

                                        <div className="text-center">
                                            {item.frame_type ?? "—"}
                                        </div>

                                        <div className="text-center">
                                            {item.waterproof === null || item.waterproof === undefined
                                                ? "—"
                                                : item.waterproof
                                                    ? "Yes"
                                                    : "No"}
                                        </div>
                                        <div className="text-center">
                                            {averageRating
                                                ? `★ ${averageRating}`
                                                : "—"}
                                        </div>
                                        <div className="text-center">
                                            ${item.price_cad ?? "—"}
                                        </div>

                                        <div className="flex justify-end">
                                            {build ? <AddGearButton buildId={build.id} gearId={item.id} /> : <Link href="/build" className="text-sm text-blue-600 hover:underline">Create build</Link>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

```

### `components/builder/ItemCategoryToggle.tsx`

```typescript
"use client";

import { useOptimistic, useTransition } from "react";
import { setItemCategory } from "@/lib/tracked-build-actions";

type Category = "base" | "worn" | "consumable";

type Props = {
    itemId: string;
    buildId: string;
    isConsumable: boolean;
    isWorn: boolean;
};

export default function ItemCategoryToggle({
    itemId,
    buildId,
    isConsumable,
    isWorn,
}: Props) {
    const [isPending, startTransition] = useTransition();

    const initial: Category = isWorn
        ? "worn"
        : isConsumable
            ? "consumable"
            : "base";

    const [optimisticCategory, setOptimisticCategory] = useOptimistic(
        initial,
        (_state: Category, next: Category) => next
    );

    function select(category: Category) {
        const next = optimisticCategory === category ? "base" : category;

        startTransition(async () => {
            setOptimisticCategory(next);

            const formData = new FormData();
            formData.append("itemId", itemId);
            formData.append("buildId", buildId);
            formData.append("category", next);

            await setItemCategory(formData);
        });
    }

    return (
        <div
            className={`
                inline-flex items-center rounded-full border border-gray-200 bg-gray-50 p-0.5
                transition ${isPending ? "opacity-60" : ""}
            `}
        >
            <button
                type="button"
                onClick={() => select("worn")}
                aria-pressed={optimisticCategory === "worn"}
                className={`
                    rounded-full px-2 py-0.5 max-md:min-h-9 max-md:px-3 text-[10px] font-semibold
                    cursor-pointer transition whitespace-nowrap
                    ${optimisticCategory === "worn"
                        ? "bg-amber-400 text-amber-950"
                        : "text-gray-400 hover:text-gray-600"
                    }
                `}
            >
                Worn
            </button>

            <button
                type="button"
                onClick={() => select("consumable")}
                aria-pressed={optimisticCategory === "consumable"}
                className={`
                    rounded-full px-2 py-0.5 max-md:min-h-9 max-md:px-3 text-[10px] font-semibold
                    cursor-pointer transition whitespace-nowrap
                    ${optimisticCategory === "consumable"
                        ? "bg-emerald-400 text-emerald-950"
                        : "text-gray-400 hover:text-gray-600"
                    }
                `}
            >
                Consumable
            </button>
        </div>
    );
}

```

### `components/builder/PrivateBuildNotice.tsx`

```typescript
import Link from "next/link";

export default function PrivateBuildNotice({ buildId }: { buildId: string }) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">This build is private</h1>
        <p className="mt-3 text-sm leading-6 text-gray-600">Only the owner can view this build. Sign in with the account that created it to continue.</p>
        <div className="mt-6 flex flex-col gap-3">
          <Link href={`/api/auth/signin?callbackUrl=${encodeURIComponent(`/build/${buildId}`)}`} className="rounded-lg bg-green-800 px-4 py-3 text-sm font-medium text-white">Sign in</Link>
          <Link href="/build" className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700">Create your own build</Link>
        </div>
      </section>
    </main>
  );
}

```

### `components/builder/PublicBuildView.tsx`

```typescript

import Link from "next/link";
import TripPlanner from "./TripPlanner/TripPlanner";
import type { PlannerBuild } from "@/lib/trip-planner";
import { evaluateCompatibility } from "@/lib/compatibility";
import BuildHeader from "@/components/builder/BuildHeader";
import CompatibilityDetails from "@/components/builder/CompatibilityDetails";
import WeightSummary from "@/components/builder/WeightSummary";
import { calculateWeightBreakdown, calculateTotalCost } from "@/lib/calculations";
import type { BuildForCompat, CompatItem } from "@/lib/compatibility";

type Item = {
  id: string;
  quantity: number;
  isWorn: boolean;
  isConsumable: boolean;
  customCategory: string | null;
  gearNameSnapshot: string | null;
  weightSnapshot: number | null;
  priceSnapshot: number | null;
  gear: {
    id: string;
    name: string;
    weight_g: number | null;
    price_cad: number | null;
    category: { name: string };
  } | null;
};

type Build = PlannerBuild & {
  name: string;
  items: Item[];
};

// Server-rendered display only: no mutation forms or editing components.
export default function PublicBuildView({
  build,
  activeTab,
  compatBuild,
  compatItems,
  issueCount,
}: {
  build: Build;
  activeTab: "gear" | "trip";
  compatBuild: BuildForCompat;
  compatItems: CompatItem[];
  issueCount: number;
}) {
  const weight = calculateWeightBreakdown(build.items);
  const totalCost = calculateTotalCost(build.items);

  const categories = [
    ...new Set(
      build.items.map(
        (item) => item.gear?.category.name ?? item.customCategory ?? "Other"
      )
    ),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <BuildHeader
        buildId={build.id}
        name={build.name}
        active={activeTab}
        issueCount={issueCount}
      />

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">
          <p>Public build · Read-only · Only the owner can edit.</p>
          <Link href="/build" className="font-semibold underline">
            Create your own build
          </Link>
        </div>

        {activeTab === "gear" ? (
          <>
            {categories.length === 0 && (
              <p className="rounded-xl bg-white p-6 text-gray-500">
                No gear added yet.
              </p>
            )}

            {categories.map((category) => (
              <section
                key={category}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <h2 className="mb-3 text-lg font-semibold">{category}</h2>

                <ul className="divide-y divide-gray-100">
                  {build.items
                    .filter(
                      (item) =>
                        (item.gear?.category.name ??
                          item.customCategory ??
                          "Other") === category
                    )
                    .map((item) => {
                      const name =
                        item.gear?.name ??
                        item.gearNameSnapshot ??
                        "Custom item";

                      const grams =
                        item.gear?.weight_g ?? item.weightSnapshot;

                      const price =
                        item.gear?.price_cad ?? item.priceSnapshot;

                      return (
                        <li
                          key={item.id}
                          className="flex flex-wrap items-center justify-between gap-3 py-3"
                        >
                          <div>
                            {item.gear ? (
                              <Link
                                href={`/gear/${item.gear.id}`}
                                className="font-semibold hover:underline"
                              >
                                {name}
                              </Link>
                            ) : (
                              <span className="font-semibold">{name}</span>
                            )}

                            <p className="mt-1 text-sm text-gray-500">
                              Quantity: {item.quantity}
                              {item.isWorn ? " · Worn" : ""}
                              {item.isConsumable ? " · Consumable" : ""}
                            </p>
                          </div>

                          <div className="text-sm text-gray-600">
                            {grams == null
                              ? "Weight unknown"
                              : `${grams * item.quantity} g`}
                            {" · "}
                            {price == null
                              ? "Price unknown"
                              : `CAD $${(price * item.quantity).toFixed(2)}`}
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </section>
            ))}

            <p className="text-lg font-semibold">
              Total cost: CAD ${totalCost.toFixed(2)}
            </p>

            <WeightSummary {...weight} />

            <CompatibilityDetails
              trip={build}
              items={compatItems}
              readOnly
            />
          </>
        ) : (
          <TripPlanner
            build={{
              ...build,
              tripLogistics: undefined,
              days: build.days.map((day) => ({
                ...day,
                reservation: null,
              })),
            }}
            issues={evaluateCompatibility(
              compatBuild,
              compatItems,
              build.days
            )}
            items={compatItems}
            readOnly
          />
        )}
      </main>
    </div>
  );
}

```

### `components/builder/QuantityStepper.tsx`

```typescript
"use client";

import { useOptimistic, useTransition } from "react";
import { updateQuantity } from "@/lib/tracked-build-actions";

type Props = {
    itemId: string;
    buildId: string;
    quantity: number;
};

export default function QuantityStepper({
    itemId,
    buildId,
    quantity,
}: Props) {
    const [isPending, startTransition] = useTransition();

    const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
        quantity,
        (_state: number, newValue: number) => newValue
    );

    function change(delta: number) {
        const next = Math.max(1, optimisticQuantity + delta);

        startTransition(async () => {
            setOptimisticQuantity(next);

            const formData = new FormData();
            formData.append("itemId", itemId);
            formData.append("buildId", buildId);
            formData.append("delta", delta.toString());

            await updateQuantity(formData);
        });
    }

    return (
        <div
            className={`
            flex items-center rounded-full border border-gray-300 bg-white shrink-0
            transition
            ${isPending ? "opacity-60" : ""}
            `}
        >
            <button
                type="button"
                onClick={() => change(-1)}
                disabled={optimisticQuantity <= 1}
                aria-label="Decrease quantity"
                className="
                w-6 h-6 max-md:w-9 max-md:h-9
                flex items-center justify-center
                text-gray-500
                hover:text-red-600
                disabled:opacity-30
                disabled:hover:text-gray-500
                transition
                cursor-pointer
                "
            >
                −
            </button>

            <span className="w-6 text-center text-xs font-semibold text-gray-700 select-none">
                {optimisticQuantity}
            </span>

            <button
                type="button"
                onClick={() => change(1)}
                aria-label="Increase quantity"
                className="
                w-6 h-6 max-md:w-9 max-md:h-9
                flex items-center justify-center
                text-gray-500
                hover:text-green-700
                transition
                cursor-pointer
                "
            >
                +
            </button>
        </div>
    );
}

```

### `components/builder/RemoveGearButton.tsx`

```typescript
"use client";

import { removeGear } from "@/lib/tracked-build-actions";

type Props = {
  itemId: string;
  buildId: string;
};

export default function RemoveGearButton({
  itemId,
  buildId,
}: Props) {
  return (
    <form action={removeGear}>
      <input type="hidden" name="itemId" value={itemId} />
      <input type="hidden" name="buildId" value={buildId} />

      <button
        className="
          ml-2
          text-gray-400
          hover:text-red-600
          text-2xl
          font-semibold
          cursor-pointer
          transition
        "
        title="Remove item"
      >
        ×
      </button>
    </form>
  );
}

```

### `components/builder/ShareBar.tsx`

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, CopyCheck, Plus, Save } from "lucide-react";
import BuildSettings from "@/components/builder/BuildSettings";
import BuildDataTools from "@/components/builder/BuildDataTools";
import { duplicateBuild } from "@/lib/tracked-build-actions";

type Props = {
  buildId: string;
  buildName: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const btnClass =
  "flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50";

export default function ShareBar({ buildId, buildName, isPublic, createdAt, updatedAt }: Props) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/build/${buildId}` : `/build/${buildId}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // The URL remains selectable if clipboard permission is blocked.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5 px-5 py-4">
      <div className="flex min-w-[280px] max-md:min-w-0 max-md:basis-full flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 shadow-inner shadow-gray-100/70">
        <button
          type="button"
          onClick={copyLink}
          title={isPublic ? "Copy public link" : "Copy private link"}
          className="shrink-0 rounded-md p-1 text-gray-400 transition hover:bg-white hover:text-green-800"
        >
          {copied ? <CopyCheck className="h-4 w-4 text-green-700" /> : <Copy className="h-4 w-4" />}
        </button>
        <input
          readOnly
          value={shareUrl}
          onFocus={(event) => event.currentTarget.select()}
          className="w-full max-md:min-w-0 truncate bg-transparent text-sm text-gray-700 outline-none"
        />
        <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${isPublic ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-600"}`}>
          {isPublic ? "Public" : "Private"}
        </span>
      </div>

      <BuildDataTools
        buildId={buildId}
        buildName={buildName}
        createdAt={createdAt}
        updatedAt={updatedAt}
        buttonClassName={btnClass}
      />

      <BuildSettings buildId={buildId} buildName={buildName} isPublic={isPublic} buttonClassName={btnClass} />

      <form action={duplicateBuild}>
        <input type="hidden" name="buildId" value={buildId} />
        <button type="submit" className={btnClass}>
          <Save className="h-4 w-4" aria-hidden="true" />
          Save As
        </button>
      </form>

      <Link href="/build" className={btnClass}>
        <Plus className="h-4 w-4" aria-hidden="true" />
        New Build
      </Link>
    </div>
  );
}

```

### `components/builder/TripPlanner/DayStopsItinerary.tsx`

```typescript
"use client";

import { useEffect, useLayoutEffect, useRef, useState, useTransition, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import { updateTripDayNote, updateTripDaySummary } from "@/lib/tracked-build-actions";
import WeatherPanel from "./WeatherPanel";
import { dayWeatherPoint } from "@/lib/weather/locations";
import {
  CalendarDays, Check, ChevronDown, Clock3, CloudSun, GripVertical, NotebookPen, Pencil, Plus, Trash2, X,
} from "lucide-react";
import type { PlannerDay, Waypoint } from "@/lib/trip-planner";
import { WAYPOINT_TYPES, waypointType } from "@/lib/waypoint-map";
import type { WeatherPoint } from "@/lib/weather/locations";
import type { RouteWorkspaceControls } from "./TripRoute";
import WaypointIcon from "./WaypointIcon";
import WaypointSearch from "./WaypointSearch";

const STOP_DRAG_TYPE = "application/x-trailpicker-stop";

function draggedStop(event: DragEvent) {
  return event.dataTransfer.getData(STOP_DRAG_TYPE);
}

function canAcceptStop(event: DragEvent) {
  return event.dataTransfer.types.includes(STOP_DRAG_TYPE);
}

function formattedTime(value?: string | null) {
  if (!value || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value)) return null;
  const [h, m] = value.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

function fullDate(value: Date) {
  const date = new Date(value);
  const day = date.getUTCDate();
  const suffix = day % 100 >= 11 && day % 100 <= 13
    ? "th"
    : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[day % 10] ?? "th";
  const weekday = date.toLocaleDateString("en-CA", { weekday: "long", timeZone: "UTC" });
  const month = date.toLocaleDateString("en-CA", { month: "long", timeZone: "UTC" });
  return `${weekday}, ${month} ${day}${suffix}`;
}

type StopDrag = {
  draggingId: string | null;
  hoverStopId: string | null;
  hoverDayId: string | null;
  start: (event: DragEvent<HTMLElement>, id: string) => void;
  end: () => void;
  overStop: (id: string) => void;
  overDay: (id: string) => void;
  clearHover: () => void;
};

function StopItem({
  point, route, days, drag,
}: {
  point: Waypoint;
  route: RouteWorkspaceControls;
  days: PlannerDay[];
  drag: StopDrag;
}) {
  const editing = route.editing && route.editingStopId === point.id;
  const time = formattedTime(point.time);
  const index = route.points.findIndex((p) => p.id === point.id);
  const sameDay = route.points.filter((p) => (p.dayId ?? null) === (point.dayId ?? null));
  const positionInDay = sameDay.findIndex((p) => p.id === point.id);

  return (
    <li
      data-trailpicker-stop-id={point.id}
      className={`rounded-xl border bg-white shadow-sm transition-[background-color,border-color,opacity,transform,box-shadow] duration-200 ease-out motion-reduce:transition-none ${
        drag.draggingId === point.id ? "scale-[0.985] border-green-200 opacity-45" :
        drag.hoverStopId === point.id && drag.draggingId && drag.draggingId !== point.id
          ? "relative translate-y-1.5 border-green-500 bg-green-50/60 ring-2 ring-green-100 before:absolute before:-top-2 before:inset-x-1 before:h-1 before:rounded-full before:bg-green-600"
          : route.selectedId === point.id ? "border-green-300 bg-green-50/30" : "border-gray-200 hover:border-gray-300"
      }`}
      onDragOver={(event) => {
        if (!route.readOnly && canAcceptStop(event)) {
          event.preventDefault();
          event.stopPropagation();
          event.dataTransfer.dropEffect = "move";
          if (drag.draggingId !== point.id) drag.overStop(point.id);
        }
      }}
      onDrop={(event) => {
        if (route.readOnly) return;
        const id = draggedStop(event);
        if (!id) return;
        event.preventDefault();
        event.stopPropagation();
        if (id !== point.id) route.moveStopToDay(id, point.dayId ?? null, point.id);
        drag.clearHover();
      }}
    >
      <div className="flex items-center gap-2 px-2 py-2.5">
        {!route.readOnly && (
          <span
            draggable={!route.pending}
            onDragStart={(event) => drag.start(event, point.id)}
            onDragEnd={drag.end}
            className="cursor-grab rounded p-1 text-gray-400 hover:text-green-800 active:cursor-grabbing"
            title="Drag to move or reorder this stop"
            aria-hidden="true"
          >
            <GripVertical className="h-4 w-4" />
          </span>
        )}
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-2.5 text-left focus-visible:outline-2 focus-visible:outline-green-700"
          onClick={() => route.selectStop(point)}
          aria-label={`Show ${point.name} on the map`}
        >
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: waypointType(point.kind).color }}
          >
            <WaypointIcon kind={point.kind} className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-gray-900">{point.name}</span>
            <span className="block text-xs text-gray-500">
              {index + 1}. {waypointType(point.kind).label}
              {point.elevationM != null ? ` · ${point.elevationM} m` : ""}
            </span>
            {(time || point.note?.trim()) && (
              <span className="mt-1 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-600">
                {time && <span className="inline-flex items-center gap-1 font-medium tabular-nums text-gray-700"><Clock3 className="h-3 w-3" aria-hidden="true" />{time}</span>}
                {point.note?.trim() && <span className="line-clamp-2 break-words">{point.note}</span>}
              </span>
            )}
          </span>
        </button>
        {!route.readOnly && (
          <button
            type="button"
            onClick={() => route.editStop(point.id)}
            disabled={route.pending}
            className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
            aria-label={editing ? `Close editor for ${point.name}` : `Edit ${point.name}`}
            aria-expanded={editing}
            title={editing ? "Close stop editor" : "Edit stop"}
          >
            {editing ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
          </button>
        )}
      </div>

      {editing && (
        <div className="space-y-3 border-t border-gray-100 bg-gray-50/70 p-3">
          <label className="block text-xs font-medium text-gray-600">
            Stop name
            <input
              type="text" maxLength={200} value={point.name}
              disabled={route.pending}
              onChange={(event) => route.updateStop(point.id, { name: event.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-700 focus:outline-none"
            />
          </label>
          <div className="grid gap-2 sm:grid-cols-2">
            <label className="block text-xs font-medium text-gray-600">
              Type
              <select
                value={point.kind} disabled={route.pending}
                onChange={(event) => route.updateStop(point.id, { kind: event.target.value as Waypoint["kind"] })}
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm"
              >
                {WAYPOINT_TYPES.map((type) => (
                  <option key={type.kind} value={type.kind}>{type.label}</option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-medium text-gray-600">
              Day
              <select
                value={point.dayId ?? ""} disabled={route.pending}
                onChange={(event) => route.assignStop(point.id, event.target.value || null)}
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm"
              >
                <option value="">Unassigned</option>
                {days.map((day, i) => <option key={day.id} value={day.id}>Day {i + 1}</option>)}
              </select>
            </label>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs font-medium text-gray-600">
              Time (optional)
              <input
                type="time"
                value={point.time ?? ""}
                disabled={route.pending}
                onChange={(event) => route.updateStop(point.id, { time: event.target.value || null })}
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-700 focus:outline-none"
              />
            </label>
            <p className="self-end text-xs leading-5 text-gray-500">Local time for this stop; shown in your daily itinerary.</p>
            <label className="block text-xs font-medium text-gray-600 sm:col-span-2">
              Stop note (optional)
              <textarea
                rows={3}
                maxLength={500}
                value={point.note ?? ""}
                disabled={route.pending}
                onChange={(event) => route.updateStop(point.id, { note: event.target.value })}
                placeholder="E.g. Lunch break, refill water, check campsite reservation…"
                className="mt-1 w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-700 focus:outline-none"
              />
              <span className="mt-1 block text-right text-[11px] font-normal text-gray-400">{(point.note ?? "").length}/500</span>
            </label>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <div className="flex gap-2">
              <button type="button" disabled={route.pending || positionInDay === 0} onClick={() => route.moveStop(point.id, -1)} className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs disabled:opacity-40">Earlier</button>
              <button type="button" disabled={route.pending || positionInDay === sameDay.length - 1} onClick={() => route.moveStop(point.id, 1)} className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs disabled:opacity-40">Later</button>
            </div>
            <button type="button" disabled={route.pending} onClick={() => route.removeStop(point.id)} className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-40">
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

// Day notes are stored on TripDay.notes. They require no coordinates or
// map marker, and the compact day-details form deliberately leaves them alone.
function DayNote({ day, buildId, readOnly }: { day: PlannerDay; buildId: string; readOnly: boolean }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(day.notes ?? "");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();


  function save() {
    if (pending) return;
    const data = new FormData();
    data.set("buildId", buildId);
    data.set("dayId", day.id);
    data.set("note", draft);
    setError("");
    startTransition(async () => {
      try {
        await updateTripDayNote(data);
        setEditing(false);
        router.refresh();
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Could not save this note.");
      }
    });
  }

  const hasNote = Boolean(day.notes?.trim());
  if (readOnly && !hasNote) return null;

  return (
    <div className="mt-3 border-t border-gray-100 pt-3">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600">
          <NotebookPen className="h-3.5 w-3.5 text-green-800" aria-hidden="true" /> Day note
        </span>
        {!readOnly && !editing && (
          <button type="button" onClick={() => { setDraft(day.notes ?? ""); setError(""); setEditing(true); }}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-green-800 hover:bg-green-50">
            {hasNote ? <Pencil className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {hasNote ? "Edit note" : "Add note"}
          </button>
        )}
      </div>
      {editing ? (
        <div className="mt-2 space-y-2">
          <label className="sr-only" htmlFor={`day-note-${day.id}`}>Note for this day</label>
          <textarea id={`day-note-${day.id}`} value={draft} maxLength={5000} rows={3}
            onChange={(event) => setDraft(event.target.value)} disabled={pending}
            placeholder="Add a reminder, plan, or observation—no map stop needed."
            className="w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-700 focus:outline-none" />
          {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
          <div className="flex items-center justify-end gap-2">
            <button type="button" disabled={pending} onClick={() => { setDraft(day.notes ?? ""); setEditing(false); setError(""); }}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40">Discard</button>
            <button type="button" disabled={pending} onClick={save}
              className="inline-flex items-center gap-1 rounded-lg bg-green-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-800 disabled:opacity-40">
              <Check className="h-3.5 w-3.5" /> {pending ? "Saving…" : "Save note"}
            </button>
          </div>
        </div>
      ) : hasNote ? (
        <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">{day.notes}</p>
      ) : null}
    </div>
  );
}

const DAY_SUBHEADING_MAX = 100;

function InlineDaySummary({ day, buildId, readOnly }: { day: PlannerDay; buildId: string; readOnly: boolean }) {
  const router = useRouter();
  const [draft, setDraft] = useState((day.activities ?? "").slice(0, DAY_SUBHEADING_MAX));
  const [saved, setSaved] = useState((day.activities ?? "").slice(0, DAY_SUBHEADING_MAX));
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  // When the server refreshes an untouched field, display its latest value.
  // Keep a locally edited value until the user saves it.
  const serverSummary = (day.activities ?? "").slice(0, DAY_SUBHEADING_MAX);
  const displayDraft = draft === saved ? serverSummary : draft;

  const changed = displayDraft !== serverSummary;
  function save() {
    if (!changed || pending) return;
    const value = displayDraft.trim();
    const form = new FormData();
    form.set("buildId", buildId);
    form.set("dayId", day.id);
    form.set("summary", value);
    setError("");
    startTransition(async () => {
      try {
        await updateTripDaySummary(form);
        setSaved(value);
        router.refresh();
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Could not save day summary.");
      }
    });
  }

  if (readOnly) return day.activities?.trim() ? <p className="break-words text-sm text-gray-600">{day.activities.slice(0, DAY_SUBHEADING_MAX)}</p> : null;

  return (
    <div className="min-w-0 flex-1">
      <input
        id={`day-summary-${day.id}`}
        type="text"
        aria-label={`Subheading for ${fullDate(day.date)}`}
        maxLength={DAY_SUBHEADING_MAX}
        value={displayDraft}
        disabled={pending}
        onChange={(event) => { setDraft(event.target.value); setError(""); }}
        onBlur={save}
        onKeyDown={(event) => {
          if (event.key === "Enter") { event.preventDefault(); event.currentTarget.blur(); }
        }}
        placeholder="Add a short subheading…"
        className="block w-full min-w-0 border-0 bg-transparent p-0 text-sm leading-5 text-gray-600 placeholder:text-gray-400 outline-none focus:text-gray-900 focus:ring-0 disabled:opacity-60"
      />
      {(error || pending) && (
        <span role="status" className={`mt-0.5 block text-xs ${error ? "text-red-700" : "text-gray-500"}`}>
          {error || "Saving…"}
        </span>
      )}
    </div>
  );
}

function DaySection({
  day, index, stops, route, drag, buildId, weatherPoints,
}: {
  day: PlannerDay;
  index: number;
  stops: Waypoint[];
  route: RouteWorkspaceControls;
  drag: StopDrag;
  buildId: string;
  weatherPoints: WeatherPoint[];
}) {
  const [open, setOpen] = useState(index === 0);
  const [kind, setKind] = useState<Waypoint["kind"]>("waypoint");
  const [forecastOpen, setForecastOpen] = useState(false);
  const selectedInDay = stops.some((point) => point.id === route.selectedId);
  const previousSelected = useRef<string | null>(null);
  const isPlacingHere = route.placingDayId === day.id;
  const dayDate = new Date(day.date).toISOString().slice(0, 10);
  const matchedPoint = dayWeatherPoint(day, weatherPoints);

  useEffect(() => {
    if (selectedInDay && previousSelected.current !== route.selectedId) setOpen(true);
    previousSelected.current = route.selectedId;
  }, [selectedInDay, route.selectedId]);

  return (
    <article
      className={`min-w-0 py-5 transition-colors duration-200 first:pt-1 ${
        drag.draggingId && drag.hoverDayId === day.id && !drag.hoverStopId ? "bg-green-50/40" : ""
      }`}
      onDragOver={(event) => {
        if (!route.readOnly && canAcceptStop(event)) {
          event.preventDefault();
          event.dataTransfer.dropEffect = "move";
          drag.overDay(day.id);
        }
      }}
      onDrop={(event) => {
        if (route.readOnly) return;
        const id = draggedStop(event);
        if (!id) return;
        event.preventDefault();
        route.moveStopToDay(id, day.id);
        drag.clearHover();
        setOpen(true);
      }}
    >
      <div className="flex items-start gap-3 px-1 pb-4 pt-1 sm:px-2">
        <button
          type="button"
          aria-expanded={open}
          aria-label={`${open ? "Collapse" : "Expand"} ${fullDate(day.date)}`}
          onClick={() => {
            if (open) setForecastOpen(false);
            setOpen(!open);
            drag.clearHover();
          }}
          className="mt-0.5 shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-green-700"
        >
          <ChevronDown className={`h-5 w-5 text-gray-600 transition-transform ${open ? "" : "-rotate-90"}`} />
        </button>
        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={() => {
              if (open) setForecastOpen(false);
              setOpen(!open);
              drag.clearHover();
            }}
            className="block text-left text-lg font-bold leading-6 text-gray-950 focus-visible:outline-2 focus-visible:outline-green-700"
          >
            {fullDate(day.date)}
          </button>
          <div className="mt-1">
            <InlineDaySummary key={day.id} day={day} buildId={buildId} readOnly={route.readOnly} />
          </div>
        </div>
      </div>

      {open && (
        <div className="px-1 pb-3 pt-1 sm:px-2">

          <div className="mb-2 flex items-center justify-between gap-2">
            <h4 className="text-sm font-medium text-gray-600">{stops.length} {stops.length === 1 ? "stop" : "stops"}</h4>
            <span className="text-xs text-gray-400">Drag stops between days</span>
          </div>
          {stops.length ? (
            <ol className="space-y-2" aria-label={`Stops for ${fullDate(day.date)}`}>
              {stops.map((stop) => <StopItem key={stop.id} point={stop} route={route} days={route.days} drag={drag} />)}
            </ol>
          ) : (
            <p className="rounded-lg bg-gray-50 px-3 py-4 text-sm text-gray-500">
              No mapped stops yet. Add a stop or write a day note below.
            </p>
          )}
          <DayNote day={day} buildId={buildId} readOnly={route.readOnly} />
          {!route.readOnly && (
            <div className="mt-3 rounded-lg bg-gray-50/80 p-3">
              <div className="flex flex-wrap items-center gap-2">
                <label className="sr-only" htmlFor={`stop-kind-${day.id}`}>Type of stop to add</label>
                <select
                  id={`stop-kind-${day.id}`}
                  value={kind}
                  onChange={(event) => setKind(event.target.value as Waypoint["kind"])}
                  className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm text-gray-800"
                >
                  {WAYPOINT_TYPES.map((type) => <option key={type.kind} value={type.kind}>{type.label}</option>)}
                </select>
                <button
                  type="button" disabled={route.pending}
                  onClick={() => isPlacingHere ? route.stopAdding() : route.startAddingToDay(day.id, kind)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-green-900 px-3 py-2 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" /> {isPlacingHere ? "Cancel" : "Add stop"}
                </button>
              </div>
              {isPlacingHere && (
                <div className="mt-3 space-y-3 border-t border-gray-200 pt-3">
                  <p className="text-xs font-medium text-green-900">Click the map to place this stop, or search for a location:</p>
                  <WaypointSearch near={route.near} onChoose={route.choosePlace} disabled={route.pending} />
                </div>
              )}
            </div>
          )}
          <div className="mt-4 border-t border-gray-200 pt-4">
        <button
          type="button"
          aria-expanded={forecastOpen && open}
          aria-label={`${forecastOpen && open ? "Hide" : "Show"} day forecast for ${fullDate(day.date)}`}
          onClick={() => { setOpen(true); setForecastOpen((value) => !value); }}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-xs font-semibold text-gray-700 hover:border-green-200 hover:bg-green-50"
        >
          <CloudSun className="h-4 w-4 text-green-800" aria-hidden="true" />
          <span>{forecastOpen && open ? "Hide day forecast" : "Show day forecast"}</span>
        </button>
          </div>
          {forecastOpen && (
            <div className="mt-3 mb-4 border-b border-gray-200 pb-4">
              <WeatherPanel
                key={`${dayDate}:${matchedPoint ?? "unmatched"}`}
                points={weatherPoints}
                date={dayDate}
                defaultPointId={matchedPoint}
                planning={{
                  minTemperature: day.minTemperature,
                  conditions: day.conditions,
                  distanceKm: day.distanceKm,
                  elevationGainM: day.elevationGainM,
                  durationMinutes: day.durationMinutes,
                }}
              />
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export default function DayStopsItinerary({
  route, buildId, days, weatherPoints,
}: {
  route: RouteWorkspaceControls;
  buildId: string;
  days: PlannerDay[];
  weatherPoints: WeatherPoint[];
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const dayNodes = useRef<Record<string, HTMLDivElement | null>>({});
  const orderedDays = [...days].sort((a, b) => +new Date(a.date) - +new Date(b.date));
  const validDays = new Set(orderedDays.map((d) => d.id));
  const unassigned = route.points.filter((stop) => !stop.dayId || !validDays.has(stop.dayId));
  const selectedDayId = route.points.find((stop) => stop.id === route.selectedId)?.dayId ?? null;

  // Native drag preview + FLIP animation for cards changing position on drop.
  // No drag-and-drop dependency, no separate stop list or data model.
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [hoverStopId, setHoverStopId] = useState<string | null>(null);
  const [hoverDayId, setHoverDayId] = useState<string | null>(null);
  const previousRects = useRef<Map<string, DOMRect> | null>(null);
  const dragGhost = useRef<HTMLElement | null>(null);

  function clearHover() {
    setHoverStopId(null);
    setHoverDayId(null);
  }

  function startDrag(event: DragEvent<HTMLElement>, id: string) {
    if (route.pending || route.readOnly) { event.preventDefault(); return; }
    event.dataTransfer.setData(STOP_DRAG_TYPE, id);
    event.dataTransfer.effectAllowed = "move";
    const root = scroller.current;
    const rects = new Map<string, DOMRect>();
    root?.querySelectorAll<HTMLElement>("[data-trailpicker-stop-id]").forEach((node) => {
      if (node.dataset.trailpickerStopId) rects.set(node.dataset.trailpickerStopId, node.getBoundingClientRect());
    });
    previousRects.current = rects;
    setDraggingId(id);

    // Drag the card's ghost, rather than an isolated little grip icon.
    const card = (event.currentTarget as HTMLElement).closest<HTMLElement>("[data-trailpicker-stop-id]");
    if (card) {
      const ghost = card.cloneNode(true) as HTMLElement;
      ghost.removeAttribute("data-trailpicker-stop-id");
      ghost.style.cssText = `position:fixed;top:0;left:0;z-index:99999;pointer-events:none;width:${Math.min(card.getBoundingClientRect().width, 430)}px;opacity:.92;box-shadow:0 14px 32px #0002;transform:rotate(1deg);`;
      document.body.appendChild(ghost);
      dragGhost.current = ghost;
      event.dataTransfer.setDragImage(ghost, 24, 24);
      // Browser has captured the ghost image; don't leave a fixed copy on screen.
      requestAnimationFrame(() => {
        ghost.remove();
        if (dragGhost.current === ghost) dragGhost.current = null;
      });
    }
  }

  function endDrag() {
    setDraggingId(null);
    clearHover();
    dragGhost.current?.remove();
    dragGhost.current = null;
    // React applies a successful drop before the next paint. A canceled drag
    // has no reorder, so discard its stale positions after that frame.
    requestAnimationFrame(() => { previousRects.current = null; });
  }

  useLayoutEffect(() => {
    const previous = previousRects.current;
    if (!previous) return;
    previousRects.current = null;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    scroller.current?.querySelectorAll<HTMLElement>("[data-trailpicker-stop-id]").forEach((node) => {
      const old = previous.get(node.dataset.trailpickerStopId || "");
      if (!old) return;
      const next = node.getBoundingClientRect();
      const dx = old.left - next.left;
      const dy = old.top - next.top;
      if (Math.abs(dx) + Math.abs(dy) < 2 || Math.abs(dy) > 1400) return;
      node.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0px, 0px)" }],
        { duration: 260, easing: "cubic-bezier(.22,1,.36,1)" }
      );
    });
  }, [route.points]);

  const drag: StopDrag = {
    draggingId, hoverStopId, hoverDayId,
    start: startDrag,
    end: endDrag,
    overStop: (id) => { setHoverStopId(id); setHoverDayId(null); },
    overDay: (id) => { setHoverDayId(id); setHoverStopId(null); },
    clearHover,
  };

  // A map marker click brings its owning day into view inside the itinerary.
  useEffect(() => {
    const target = selectedDayId ? dayNodes.current[selectedDayId] : null;
    const container = scroller.current;
    if (!target || !container) return;
    if (container.scrollHeight > container.clientHeight + 8) {
      const offset = target.getBoundingClientRect().top - container.getBoundingClientRect().top;
      container.scrollTo({ top: container.scrollTop + offset - 4, behavior: "smooth" });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [route.selectedId, selectedDayId]);

  return (
    <section id="itinerary" className="min-w-0 scroll-mt-20">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-gray-950">Daily itinerary</h3>
          <p className="mt-1 text-sm text-gray-500">Select a stop to find it on the map.</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-gray-500"><CalendarDays className="h-4 w-4" /> {orderedDays.length} days</span>
      </div>
      <div className="min-w-0">
        <div
          ref={scroller} tabIndex={0}
          aria-label="Daily itinerary. Scroll to explore days. Drag stops between days to reorganize your route."
          className="divide-y divide-gray-200 xl:h-[min(82vh,870px)] xl:overflow-y-auto xl:overscroll-contain xl:pr-2 focus-visible:outline-2 focus-visible:outline-green-700"
        >
          {orderedDays.map((day, index) => (
            <div key={day.id} ref={(node) => { dayNodes.current[day.id] = node; }}>
              <DaySection
                day={day} index={index}
                stops={route.points.filter((point) => point.dayId === day.id)}
                route={route} drag={drag}
                buildId={buildId} weatherPoints={weatherPoints}
              />
            </div>
          ))}
          {!orderedDays.length && <p className="rounded-lg border border-dashed border-gray-200 bg-white p-4 text-sm text-gray-600">Set your trip dates to create days.</p>}

          {unassigned.length > 0 && (
            <section className="rounded-xl border border-amber-200 bg-amber-50/40 p-4" aria-label="Unassigned route stops">
              <h4 className="font-semibold text-gray-900">Unassigned stops ({unassigned.length})</h4>
              <p className="mt-1 text-xs text-gray-600">These stops are on your route but don&apos;t belong to a day yet.</p>
              <ol className="mt-3 space-y-2">
                {unassigned.map((stop) => (
                  <li key={stop.id} data-trailpicker-stop-id={stop.id} className={`rounded-xl border bg-white p-3 shadow-sm transition-[opacity,transform,border-color] duration-200 ${draggingId === stop.id ? "opacity-50 scale-[0.985]" : "border-gray-200"}`}>
                    <div className="flex items-center justify-between gap-2">
                      {!route.readOnly && (
                        <span
                          draggable={!route.pending}
                          onDragStart={(event) => startDrag(event, stop.id)}
                          onDragEnd={endDrag}
                          title="Drag into a day"
                          className="cursor-grab text-gray-400 active:cursor-grabbing"
                          aria-hidden="true"
                        >
                          <GripVertical className="h-4 w-4" />
                        </span>
                      )}
                      <button type="button" className="min-w-0 truncate text-left text-sm font-medium text-gray-900 hover:underline" onClick={() => route.selectStop(stop)}>{stop.name}</button>
                      {!route.readOnly && orderedDays.length > 0 && (
                        <select
                          aria-label={`Assign ${stop.name} to a day`}
                          value="" disabled={route.pending}
                          onChange={(event) => route.assignStop(stop.id, event.target.value)}
                          className="max-w-32 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs"
                        >
                          <option value="">Assign day…</option>
                          {orderedDays.map((day, i) => <option key={day.id} value={day.id}>Day {i + 1}</option>)}
                        </select>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}
          {route.editing && !route.readOnly && (
            <p role="status" className="rounded-lg bg-green-50 p-3 text-xs text-green-900">
              Your route has editable changes. Use <strong>Save route</strong> above the map to keep them.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}



```

### `components/builder/TripPlanner/PlannerFields.tsx`

```typescript
export const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-green-700 focus:ring-4 focus:ring-green-700/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400";

export function Field({
  name,
  label,
  value,
  type = "text",
  min,
  max,
  step,
}: {
  name: string;
  label: string;
  value?: string | number | null;
  type?: string;
  min?: number;
  max?: number;
  step?: number | string;
}) {
  return (
    <label className="block space-y-1.5 text-sm">
      <span className="font-medium text-gray-700">{label}</span>
      <input
        className={inputClass}
        name={name}
        type={type}
        defaultValue={value ?? ""}
        min={min}
        max={max}
        step={step}
        maxLength={type === "text" ? 5000 : undefined}
      />
    </label>
  );
}

export function SaveStatus({
  pending,
  error,
  saved,
}: {
  pending: boolean;
  error: string;
  saved?: boolean;
}) {
  return (
    <div aria-live="polite" className="flex flex-col items-start text-sm">
      {error ? (
        <p role="alert" className="mb-2 font-medium text-red-700">
          {error}
        </p>
      ) : saved ? (
        <p className="mb-2 font-medium text-green-700">Saved.</p>
      ) : null}

      <button
        disabled={pending}
        className="rounded-xl bg-green-900 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-900/15 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
    </div>
  );
}

```

### `components/builder/TripPlanner/ResizableRouteLayout.tsx`

```typescript
"use client";

import { Children, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { GripVertical } from "lucide-react";

const DEFAULT_MAP_WIDTH = 58;
const MIN_MAP_WIDTH = 45;
const MAX_MAP_WIDTH = 70;
const STORAGE_KEY = "trailpicker:route-itinerary:map-width";

function clamp(value: number) {
  return Math.min(MAX_MAP_WIDTH, Math.max(MIN_MAP_WIDTH, value));
}

/** The desktop divider can be dragged, resized by keyboard, or double-clicked to reset. */
export default function ResizableRouteLayout({
  children,
  enabled = true,
}: {
  children: ReactNode;
  enabled?: boolean;
}) {
  const [mapWidth, setMapWidth] = useState(DEFAULT_MAP_WIDTH);
  const currentWidth = useRef(DEFAULT_MAP_WIDTH);
  const dragging = useRef(false);
  const [isResizing, setIsResizing] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const restoreWidth = () => {
    try {
      const stored = Number(window.localStorage.getItem(STORAGE_KEY));
      if (Number.isFinite(stored) && stored >= MIN_MAP_WIDTH && stored <= MAX_MAP_WIDTH) {
        currentWidth.current = stored;
        setMapWidth(stored);
      }
    } catch { /* Private browsing can disable storage; resizing still works. */ }
    };
    // Browser callback avoids an extra synchronous render in the effect.
    const id = window.requestAnimationFrame(restoreWidth);
    return () => window.cancelAnimationFrame(id);
  }, []);

  function applyWidth(next: number, save = false) {
    const value = clamp(next);
    currentWidth.current = value;
    setMapWidth(value);
    if (save) {
      try { window.localStorage.setItem(STORAGE_KEY, String(value)); } catch { /* no-op */ }
    }
  }

  function resizeFromPointer(clientX: number) {
    const bounds = container.current?.getBoundingClientRect();
    if (!bounds || !bounds.width) return;
    applyWidth(((clientX - bounds.left) / bounds.width) * 100);
  }

  if (!enabled) return <div className="min-w-0">{children}</div>;

  const [map, itinerary] = Children.toArray(children);
  return (
    <div
      ref={container}
      style={{ "--trailpicker-map-width": `${mapWidth}%` } as CSSProperties}
      className={`grid min-w-0 grid-cols-1 items-start gap-y-5 xl:grid-cols-[minmax(0,var(--trailpicker-map-width))_14px_minmax(0,1fr)] xl:gap-y-0 motion-reduce:transition-none ${isResizing ? "" : "xl:transition-[grid-template-columns] xl:duration-200 xl:ease-out"}`}
    >
      <div id="trip-route-map-pane" className="min-w-0 xl:pr-2">{map}</div>

      <div
        role="separator"
        aria-label="Resize map and itinerary panels"
        aria-orientation="vertical"
        aria-controls="trip-route-map-pane itinerary"
        aria-valuemin={MIN_MAP_WIDTH}
        aria-valuemax={MAX_MAP_WIDTH}
        aria-valuenow={Math.round(mapWidth)}
        aria-valuetext={`Map ${Math.round(mapWidth)} percent, itinerary ${Math.round(100 - mapWidth)} percent`}
        tabIndex={0}
        title="Drag to resize · Double-click to reset · Arrow keys also work"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          dragging.current = true;
          setIsResizing(true);
          event.currentTarget.setPointerCapture(event.pointerId);
          resizeFromPointer(event.clientX);
          event.preventDefault();
        }}
        onPointerMove={(event) => {
          if (dragging.current) resizeFromPointer(event.clientX);
        }}
        onPointerUp={(event) => {
          if (!dragging.current) return;
          resizeFromPointer(event.clientX);
          dragging.current = false;
          setIsResizing(false);
          applyWidth(currentWidth.current, true);
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        onPointerCancel={() => { dragging.current = false; setIsResizing(false); }}
        onLostPointerCapture={() => { dragging.current = false; setIsResizing(false); }}
        onDoubleClick={() => applyWidth(DEFAULT_MAP_WIDTH, true)}
        onKeyDown={(event) => {
          const steps: Record<string, number> = { ArrowLeft: -3, ArrowRight: 3 };
          if (event.key in steps) {
            event.preventDefault();
            applyWidth(currentWidth.current + steps[event.key], true);
          } else if (event.key === "Home") {
            event.preventDefault();
            applyWidth(MIN_MAP_WIDTH, true);
          } else if (event.key === "End") {
            event.preventDefault();
            applyWidth(MAX_MAP_WIDTH, true);
          }
        }}
        className="group relative hidden min-h-[420px] cursor-col-resize touch-none select-none items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-green-700 xl:flex"
      >
        <div className="h-full w-px bg-gray-200 transition-colors group-hover:bg-green-700 group-focus-visible:bg-green-700" />
        <span className="absolute flex h-11 w-5 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 shadow-sm transition-colors group-hover:border-green-700 group-hover:text-green-800 group-focus-visible:border-green-700 group-focus-visible:text-green-800">
          <GripVertical aria-hidden="true" className="h-4 w-4" />
        </span>
      </div>

      <div className="min-w-0 xl:pl-2">{itinerary}</div>
    </div>
  );
}

```

### `components/builder/TripPlanner/RouteMapInner.tsx`

```typescript
"use client";
import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from "react-leaflet";
import { divIcon, DomEvent, type Marker as LeafletMarker } from "leaflet";
import { LocateFixed } from "lucide-react";
import type { Waypoint } from "@/lib/trip-planner";
import { waypointMarkerHtml, waypointType } from "@/lib/waypoint-map";
import "leaflet/dist/leaflet.css";

export type MapFocus = { lat: number; lng: number; request: number };
type Props = {
  points: Waypoint[];
  fallback: [number, number] | null;
  onPick?: (lat: number, lng: number) => void;
  onSelect?: (id: string) => void;
  onMove?: (id: string, lat: number, lng: number) => void;
  selectedId?: string | null;
  activeDayId?: string | null;
  compact?: boolean;
  focus?: MapFocus | null;
};

function Controls({ points, onPick, focus }: Pick<Props, "points" | "onPick" | "focus">) {
  const map = useMap();
  const initialized = useRef(false);
  useMapEvents({ click(event) { onPick?.(event.latlng.lat, event.latlng.lng); } });
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    if (points.length > 1) map.fitBounds(points.map(p => [p.lat, p.lng]), { padding: [44, 44], maxZoom: 14 });
    else if (points.length === 1) map.setView([points[0].lat, points[0].lng], 13);
  }, [map, points]);
  useEffect(() => {
    if (focus) map.setView([focus.lat, focus.lng], Math.max(map.getZoom(), 14));
  }, [map, focus]);
  useEffect(() => {
    const container = map.getContainer();
    const previous = container.style.cursor;
    container.style.cursor = onPick ? "crosshair" : "";
    return () => { container.style.cursor = previous; };
  }, [map, onPick]);
  return null;
}

/**
 * Wheel input scrolls the page normally. Holding Ctrl zooms the map at the
 * pointer instead, without triggering the browser's Ctrl+wheel page zoom.
 * Uses a non-passive native listener because preventDefault is required.
 */
function CtrlWheelZoom() {
  const map = useMap();
  const accumulated = useRef(0);

  useEffect(() => {
    const container = map.getContainer();
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey) {
        accumulated.current = 0;
        return; // leave ordinary scrolling completely untouched
      }

      event.preventDefault();
      event.stopPropagation();
      const delta = event.deltaY * (
        event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? container.clientHeight : 1
      );
      accumulated.current += delta;
      if (Math.abs(accumulated.current) < 60) return;

      // One zoom notch per normal mouse-wheel detent; also supports trackpads.
      const steps = Math.trunc(accumulated.current / 100) || Math.sign(accumulated.current);
      accumulated.current -= steps * 100;
      const zoom = Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), map.getZoom() - steps));
      if (zoom !== map.getZoom()) {
        map.setZoomAround(map.mouseEventToContainerPoint(event), zoom, { animate: false });
      }
    };
    container.addEventListener("wheel", onWheel, { capture: true, passive: false });
    return () => container.removeEventListener("wheel", onWheel, true);
  }, [map]);

  return <div className="pointer-events-none absolute bottom-5 left-3 z-[800] rounded-md bg-white/90 px-2.5 py-1.5 text-[11px] font-medium text-gray-700 shadow-sm">
    Ctrl + scroll to zoom
  </div>;
}

/** Leaflet needs an explicit size refresh when the resizable panel changes width. */
function RefreshMapOnResize() {
  const map = useMap();
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    let frame = 0;
    const observer = new ResizeObserver(() => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => map.invalidateSize({ pan: false }));
    });
    observer.observe(map.getContainer());
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [map]);
  return null;
}

function FitRoute({ points, fallback }: Pick<Props, "points" | "fallback">) {
  const map = useMap();
  const toolbar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (toolbar.current) { DomEvent.disableClickPropagation(toolbar.current); DomEvent.disableScrollPropagation(toolbar.current); }
  }, []);
  function fit() {
    if (points.length > 1) map.fitBounds(points.map(p => [p.lat, p.lng]), { padding: [44, 44], maxZoom: 14 });
    else if (points.length === 1) map.setView([points[0].lat, points[0].lng], 14);
    else if (fallback) map.setView(fallback, 12);
  }
  return <div ref={toolbar} className="absolute right-3 top-3 z-[1000]">
    <button type="button" onClick={fit} disabled={!points.length && !fallback} className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50">
      <LocateFixed className="h-4 w-4" aria-hidden="true" />Fit route
    </button>
  </div>;
}

function StopMarker({ point, order, selected, onSelect, onMove }: {
  point: Waypoint; order: number; selected: boolean;
  onSelect?: (id: string) => void; onMove?: (id: string, lat: number, lng: number) => void;
}) {
  const marker = useRef<LeafletMarker | null>(null);
  const icon = useMemo(() => divIcon({
    html: waypointMarkerHtml(point.kind, order, selected),
    className: "trailpicker-stop-icon",
    iconSize: [34, 34], iconAnchor: [17, 17], popupAnchor: [0, -22],
  }), [point.kind, order, selected]);
  useEffect(() => {
    const element = marker.current?.getElement();
    if (element) {
      element.title = `${order}. ${point.name}`;
      element.setAttribute("aria-label", `${order}. ${waypointType(point.kind).label}: ${point.name}`);
    }
  }, [point.name, point.kind, order, icon]);
  return <Marker ref={marker} position={[point.lat, point.lng]} icon={icon} title={`${order}. ${point.name}`} alt={`${waypointType(point.kind).label}: ${point.name}`} keyboard bubblingMouseEvents={false}
    draggable={!!onMove} zIndexOffset={selected ? 1000 : 0} eventHandlers={{
      click: () => onSelect?.(point.id),
      dragend: event => {
        const position = (event.target as LeafletMarker).getLatLng();
        onMove?.(point.id, position.lat, position.lng);
      },
    }}>
    <Popup><strong>{order}. {point.name}</strong><br />{waypointType(point.kind).label}{point.elevationM != null && <> · {point.elevationM} m</>}{onMove && <><br /><span>Drag the pin to adjust its location.</span></>}</Popup>
  </Marker>;
}

export default function RouteMapInner({ points, fallback, onPick, onSelect, onMove, selectedId, activeDayId, compact = false, focus }: Props) {
  return <MapContainer center={fallback ?? [49.7, -123.1]} zoom={fallback ? 12 : 9} scrollWheelZoom={false} className={compact ? "relative z-0 h-[480px] w-full sm:h-[580px] xl:h-[min(75vh,760px)]" : "relative z-0 h-[420px] w-full sm:h-[480px]"}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
    <Controls points={points} onPick={onPick} focus={focus} />
    <RefreshMapOnResize />
    <CtrlWheelZoom />
    <FitRoute points={points} fallback={fallback} />
    {points.length > 1 && <Polyline interactive={false} positions={points.map(p => [p.lat, p.lng])} pathOptions={{ color: "#166534", weight: 3, dashArray: "6 8", opacity: 0.7 }} />}
    {points.map((point, index) => <StopMarker key={point.id} point={point} order={index + 1} selected={selectedId === point.id || (!!activeDayId && point.dayId === activeDayId)} onSelect={onSelect} onMove={onMove} />)}
    {!points.length && fallback && <Marker position={fallback} icon={divIcon({ html: waypointMarkerHtml("waypoint", 1, false), className: "trailpicker-stop-icon", iconSize: [34, 34], iconAnchor: [17, 17] })} title="Trip location"><Popup>Trip location · add your first route stop here or explore the map.</Popup></Marker>}
  </MapContainer>;
}

```

### `components/builder/TripPlanner/TripEditForm.tsx`

```typescript

"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { ArrowLeft, Check, MapPin, Pencil, X } from "lucide-react";
import DestinationPicker from "@/components/build/DestinationPicker";
import DateRangePicker from "@/components/build/DateRangePicker";
import { updateTripDetails } from "@/lib/tracked-build-actions";
import { useBuildAutosave } from "@/lib/use-build-autosave";

type DestinationSelection = {
  id: string;
  name: string;
  lat: string;
  lng: string;
};

type Props = {
  build: {
    id: string;
    destinationId?: string | null;
    location: string | null;
    locationLat: number | null;
    locationLng: number | null;
    startDate: Date | null;
    endDate: Date | null;
    people: number;
    minTemperature: number | null;
    conditions: string | null;
    days?: { date: Date }[];
  };
  onSaved: () => void;
  onCancel?: () => void;
};

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/10";

const labelClass =
  "mb-1.5 block text-sm font-medium text-gray-700";

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-800 transition hover:border-green-300 hover:bg-green-50 hover:text-green-900 disabled:opacity-50";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-green-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50";

function iso(date: Date | null | undefined) {
  return date ? new Date(date).toISOString().slice(0, 10) : "";
}

export default function TripEditForm({
  build,
  onSaved,
  onCancel,
}: Props) {
  const [error, setError] = useState("");
  const [pickerError, setPickerError] = useState("");
  const [choosingDestination, setChoosingDestination] =
    useState(false);
  const [pickerSession, setPickerSession] = useState(0);
  const [isPending, startTransition] = useTransition();
  const pickerRef = useRef<HTMLFormElement>(null);

  const [destination, setDestination] =
    useState<DestinationSelection>(() => ({
      id: build.destinationId ?? "",
      name: build.location ?? "",
      lat:
        build.locationLat == null
          ? ""
          : String(build.locationLat),
      lng:
        build.locationLng == null
          ? ""
          : String(build.locationLng),
    }));

  const [willRemoveDays, setWillRemoveDays] = useState(false);

  const originalStart = iso(build.startDate);
  const originalEnd = iso(build.endDate);

  const autosave = useBuildAutosave({
    buildId: build.id,
    resource: "trip-details",
    save: updateTripDetails,
    onError: setError,
    canAutosave: (data) =>
      String(data.get("startDate") ?? "") === originalStart &&
      String(data.get("endDate") ?? "") === originalEnd,
  });
  const { formRef } = autosave;

  // Watch the hidden date inputs from DateRangePicker.
  // Show confirmation only if existing itinerary days
  // would actually be removed.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    function checkDateRange() {
      if (!form) return;

      const data = new FormData(form);
      const start = String(data.get("startDate") ?? "");
      const end = String(data.get("endDate") ?? "");

      const datesChanged =
        start !== originalStart || end !== originalEnd;

      const removesDays =
        datesChanged &&
        (build.days ?? []).some((day) => {
          const date = iso(day.date);
          return !start || !end || date < start || date > end;
        });

      setWillRemoveDays((previous) =>
        previous === removesDays ? previous : removesDays
      );
    }

    const observer = new MutationObserver(checkDateRange);

    observer.observe(form, {
      subtree: true,
      attributes: true,
      attributeFilter: ["value"],
    });

    form.addEventListener("input", checkDateRange);
    form.addEventListener("change", checkDateRange);

    checkDateRange();

    return () => {
      observer.disconnect();
      form.removeEventListener("input", checkDateRange);
      form.removeEventListener("change", checkDateRange);
    };
  }, [formRef, build.days, originalStart, originalEnd]);

  function openDestinationPicker() {
    setPickerError("");
    setPickerSession((current) => current + 1);
    setChoosingDestination(true);
  }

  function confirmDestination() {
    if (!pickerRef.current) return;

    const values = new FormData(pickerRef.current);

    const next: DestinationSelection = {
      id: String(
        values.get("candidateDestinationId") ?? ""
      ).trim(),
      name: String(
        values.get("candidateLocation") ?? ""
      ).trim(),
      lat: String(values.get("candidateLat") ?? "").trim(),
      lng: String(values.get("candidateLng") ?? "").trim(),
    };

    if (!next.name) {
      setPickerError(
        "Choose a destination or select a custom location first."
      );
      return;
    }

    if (
      (next.lat === "") !== (next.lng === "") ||
      (next.lat !== "" &&
        (!Number.isFinite(Number(next.lat)) ||
          !Number.isFinite(Number(next.lng)) ||
          Math.abs(Number(next.lat)) > 90 ||
          Math.abs(Number(next.lng)) > 180))
    ) {
      setPickerError(
        "Choose a location with valid coordinates."
      );
      return;
    }

    // Only confirming updates the actual trip form.
    // Browsing and cancelling do not change its location.
    setDestination(next);
    setChoosingDestination(false);
    setPickerError("");
    setError("");
  }

  function handleSubmit(formData: FormData) {
    if (choosingDestination) return;

    startTransition(async () => {
      setError("");

      try {
        await autosave.saveNow(formData);
        onSaved();
      } catch (cause) {
        setError(
          cause instanceof Error
            ? cause.message
            : "Could not save trip."
        );
      }
    });
  }

  return (
    <section
      aria-label="Edit trip details"
      className={`mx-auto w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 ${
        choosingDestination
          ? "max-w-screen-2xl"
          : "max-w-5xl"
      }`}
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-gray-900">
            {choosingDestination
              ? "Choose destination"
              : "Trip Details"}
          </h2>

          {choosingDestination && (
            <p className="mt-1 text-sm text-gray-500">
              Search the catalogue or select a custom
              wilderness location.
            </p>
          )}
        </div>

        {choosingDestination ? (
          <button
            type="button"
            onClick={() => setChoosingDestination(false)}
            className={secondaryButton}
          >
            <ArrowLeft
              className="h-4 w-4"
              aria-hidden="true"
            />
            Back to details
          </button>
        ) : (
          onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className={secondaryButton}
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Close
            </button>
          )
        )}
      </div>

      {/* Main trip details form */}
      {/* Keep mounted while browsing so unsaved field
          values are not lost. */}

      <form
        ref={formRef}
        action={handleSubmit}
        className={
          choosingDestination ? "hidden" : "space-y-5"
        }
      >
        <fieldset
          disabled={isPending}
          className="space-y-5"
        >
          <input
            type="hidden"
            name="buildId"
            value={build.id}
          />
          <input
            type="hidden"
            name="destinationId"
            value={destination.id}
          />
          <input
            type="hidden"
            name="location"
            value={destination.name}
          />
          <input
            type="hidden"
            name="locationLat"
            value={destination.lat}
          />
          <input
            type="hidden"
            name="locationLng"
            value={destination.lng}
          />

          {/* Destination summary */}
          <div>
            <label className={labelClass}>
              Destination
            </label>

            <div className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 bg-gray-50/60 p-3 sm:flex-nowrap">
              <MapPin
                className="h-5 w-5 shrink-0 text-green-800"
                aria-hidden="true"
              />

              <div className="min-w-0 flex-1">
                <p className="break-words text-sm font-semibold text-gray-900">
                  {destination.name ||
                    "No destination selected"}
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  {destination.id
                    ? "Popular destination"
                    : "Custom wilderness location"}
                </p>
              </div>

              <button
                type="button"
                onClick={openDestinationPicker}
                disabled={isPending}
                className={`${secondaryButton} shrink-0`}
              >
                <Pencil
                  className="h-4 w-4"
                  aria-hidden="true"
                />
                Change
              </button>
            </div>
          </div>

          {/* Dates, travelers and weather */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                Trip dates
              </label>

              <div className="rounded-lg border border-gray-200 bg-white px-3 py-2">
                <DateRangePicker
                  startName="startDate"
                  endName="endDate"
                  initialStart={originalStart}
                  initialEnd={originalEnd}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="trip-people"
                className={labelClass}
              >
                Travelers
              </label>

              <input
                id="trip-people"
                name="people"
                type="number"
                min={1}
                max={100}
                required
                defaultValue={build.people}
                className={inputClass}
              />
            </div>
          </div>

          {/* Conditional date warning */}
          {willRemoveDays && (
            <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
              <input
                name="confirmDateChange"
                type="checkbox"
                value="yes"
                className="mt-0.5 h-4 w-4 accent-green-800"
              />

              <span>
                I understand that itinerary days outside
                the new date range will be removed.
                Stops assigned to those days will be kept but become unassigned.
                Days within the range will be kept.
              </span>
            </label>
          )}

          {error && (
            <p
              role="alert"
              className="text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-end gap-2 border-t border-gray-100 pt-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className={secondaryButton}
              >
                Close
              </button>
            )}

            <button
              type="submit"
              disabled={isPending}
              className={primaryButton}
            >
              <Check
                className="h-4 w-4"
                aria-hidden="true"
              />
              {isPending
                ? "Saving…"
                : "Save changes"}
            </button>
          </div>
        </fieldset>
      </form>

      {/* Separate destination selection view */}
      {choosingDestination && (
        <div>
          <form
            key={pickerSession}
            ref={pickerRef}
            onSubmit={(event) => {
              event.preventDefault();
              confirmDestination();
            }}
            className="space-y-4"
          >
            <DestinationPicker
              destinationField="candidateDestinationId"
              nameField="candidateLocation"
              latField="candidateLat"
              lngField="candidateLng"
              initialDestinationId={
                destination.id || undefined
              }
              initialName={destination.name}
              initialLat={
                destination.lat === ""
                  ? null
                  : Number(destination.lat)
              }
              initialLng={
                destination.lng === ""
                  ? null
                  : Number(destination.lng)
              }
            />

            {pickerError && (
              <p
                role="alert"
                className="text-sm text-red-700"
              >
                {pickerError}
              </p>
            )}

            <div className="flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={() =>
                  setChoosingDestination(false)
                }
                className={secondaryButton}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={primaryButton}
              >
                <Check
                  className="h-4 w-4"
                  aria-hidden="true"
                />
                Use this destination
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

```

### `components/builder/TripPlanner/TripLogistics.tsx`

```typescript
"use client";

import { useEffect, useRef, useState } from "react";
import {
  CarFront,
  Check,
  ChevronDown,
  LockKeyhole,
  NotebookPen,
  Shield,
  Ticket,
  type LucideIcon,
} from "lucide-react";
import { saveTripLogistics } from "@/lib/tracked-build-actions";
import { readLogistics, type Logistics } from "@/lib/trip-planner";
import { useBuildAutosave } from "@/lib/use-build-autosave";

type FieldSpec = {
  key: keyof Logistics;
  label: string;
  placeholder: string;
};

type LogisticsSection = {
  id: "bookings" | "access" | "safety" | "other";
  title: string;
  description: string;
  icon: LucideIcon;
  fields: readonly FieldSpec[];
};

// The form still submits all seven original field names. No schema or
// server-action changes are needed to use this layout with existing trips.
const SECTIONS: readonly LogisticsSection[] = [
  {
    id: "bookings",
    title: "Permits & reservations",
    description: "Access permits, campsite bookings and confirmation details",
    icon: Ticket,
    fields: [
      {
        key: "permits",
        label: "Permits",
        placeholder: "Permit type, number, pickup location or requirements…",
      },
      {
        key: "reservations",
        label: "Reservations",
        placeholder: "Campsite bookings, dates, confirmation numbers…",
      },
    ],
  },
  {
    id: "access",
    title: "Getting there",
    description: "Transportation, parking and trailhead access",
    icon: CarFront,
    fields: [
      {
        key: "transportation",
        label: "Transportation",
        placeholder: "Driving, shuttle arrangements, pickups or drop-offs…",
      },
      {
        key: "parking",
        label: "Parking & trailhead access",
        placeholder: "Parking area, fees, road conditions or access notes…",
      },
    ],
  },
  {
    id: "safety",
    title: "Emergency information",
    description: "Your contact details and backup or exit plans",
    icon: Shield,
    fields: [
      {
        key: "emergencyContact",
        label: "Emergency contact",
        placeholder: "Name, contact number and relevant details…",
      },
      {
        key: "emergencyPlan",
        label: "Emergency plan & exit routes",
        placeholder: "Exit points, alternate routes, communication or check-in plan…",
      },
    ],
  },
  {
    id: "other",
    title: "Other notes",
    description: "Anything else you'll want handy on the trip",
    icon: NotebookPen,
    fields: [
      {
        key: "notes",
        label: "Trip notes",
        placeholder: "Additional logistics or reminders…",
      },
    ],
  },
];

type SectionId = LogisticsSection["id"];

function compactText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function sectionPreview(section: LogisticsSection, values: Logistics): string {
  const filled = section.fields
    .map(({ key, label }) => {
      const content = compactText(values[key]);
      return content ? `${label}: ${content}` : null;
    })
    .filter((preview): preview is string => preview !== null);

  return filled.length ? filled.join("  ·  ") : section.description;
}

function TripLogisticsEditor({
  buildId,
  value,
}: {
  buildId: string;
  value: unknown;
}) {
  const [values, setValues] = useState<Logistics>(() => readLogistics(value));
  const [expanded, setExpanded] = useState<SectionId | null>(() =>
    Object.values(readLogistics(value)).some((entry) => entry.trim())
      ? null
      : "bookings"
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const committed = useRef(readLogistics(value));
  const externalReset = useRef(false);
  const serverSignature = JSON.stringify(value ?? null);
  useEffect(() => {
    const onReplace = (event: Event) => {
      if ((event as CustomEvent<string>).detail === buildId) externalReset.current = true;
    };
    window.addEventListener("trailpicker:build-replaced", onReplace);
    return () => window.removeEventListener("trailpicker:build-replaced", onReplace);
  }, [buildId]);
  useEffect(() => {
    const next = readLogistics(value);
    if (externalReset.current || JSON.stringify(values) === JSON.stringify(committed.current)) {
      committed.current = next;
      setValues(next);
      setSaving(false);
      setError("");
      externalReset.current = false;
    }
    // Apply new server data without clobbering edits that haven't saved yet.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverSignature]);

  const autosave = useBuildAutosave({
    buildId,
    resource: "logistics",
    save: saveTripLogistics,
    onError: (message) => {
      setError(message);
      if (message) setSaving(false);
    },
    onSaved: () => setSaving(false),
  });
  const { formRef } = autosave;

  function changeField(key: keyof Logistics, next: string) {
    setValues((current) => ({ ...current, [key]: next }));
    setSaving(true);
    setError("");
  }

  return (
    <section
      id="logistics"
      aria-labelledby="logistics-heading"
      className="min-w-0 scroll-mt-20 border-b border-gray-200 pb-6 text-gray-800"
    >
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="logistics-heading" className="text-xl font-bold text-gray-950">
            Logistics
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Permits, access details and other practical trip information.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500">
          <span role="status" aria-live="polite" className={error ? "text-red-700" : "inline-flex items-center gap-1.5"}>
            {error ? (
              <span role="alert">Couldn’t save. Edit to retry.</span>
            ) : saving ? (
              "Saving…"
            ) : (
              <><Check aria-hidden="true" className="h-3.5 w-3.5 text-green-700" /> Saved</>
            )}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <LockKeyhole aria-hidden="true" className="h-3.5 w-3.5" />
            Private when sharing
          </span>
        </div>
      </header>

      <form ref={formRef}>
        <input type="hidden" name="buildId" value={buildId} />

        {/* A single divided list, rather than a collection of separate cards. */}
        <div className="border-y border-gray-200">
          {SECTIONS.map((section) => {
            const open = expanded === section.id;
            const Icon = section.icon;
            const hasContent = section.fields.some(({ key }) =>
              Boolean(values[key].trim())
            );
            const editorId = `logistics-${section.id}`;

            return (
              <div
                key={section.id}
                className="border-b border-gray-200 last:border-b-0"
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={editorId}
                    onClick={() => setExpanded(open ? null : section.id)}
                    className="group flex w-full items-start gap-3 py-4 text-left outline-none transition-colors hover:bg-gray-50/50 focus-visible:bg-green-50/50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-700 sm:gap-4 sm:px-2"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 group-hover:text-green-900">
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-gray-950">
                        {section.title}
                      </span>
                      <span
                        className={`mt-1 block break-words text-xs leading-5 ${
                          hasContent ? "text-gray-600" : "text-gray-500"
                        } ${open ? "" : "line-clamp-2"}`}
                      >
                        {open ? section.description : sectionPreview(section, values)}
                      </span>
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`mt-2 h-4 w-4 shrink-0 text-gray-400 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>

                {/* Keep every input mounted even when its row is collapsed.
                    saveTripLogistics replaces all seven values on each save. */}
                <div
                  id={editorId}
                  hidden={!open}
                  className="pb-5 pl-0 sm:pl-[3.75rem] sm:pr-7"
                >
                  <div
                    className={`grid gap-4 ${
                      section.fields.length > 1 ? "md:grid-cols-2" : ""
                    }`}
                  >
                    {section.fields.map((field) => (
                      <label key={field.key} className="block min-w-0">
                        <span className="mb-1.5 block text-xs font-semibold text-gray-700">
                          {field.label}
                        </span>
                        <textarea
                          name={field.key}
                          value={values[field.key]}
                          onChange={(event) =>
                            changeField(field.key, event.target.value)
                          }
                          rows={3}
                          maxLength={5000}
                          placeholder={field.placeholder}
                          className="w-full resize-y rounded-lg border border-gray-200 bg-white px-3.5 py-3 text-sm leading-6 text-gray-900 outline-none transition-colors placeholder:text-gray-400 hover:border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </form>
    </section>
  );
}

export default function TripLogistics(props: {
  buildId: string;
  value: unknown;
}) {
  // If the client navigates between builds without remounting the page,
  // reset the editor and autosave baseline for the new build.
  return <TripLogisticsEditor key={props.buildId} {...props} />;
}


```

### `components/builder/TripPlanner/TripPlanner.tsx`

```typescript

"use client";

import { useEffect, useMemo, useState } from "react";
import ConsumablesTimeline from "@/components/builder/ConsumablesTimeline";
import { analyzePack, type PackInputItem } from "@/lib/pack-analysis";
import WeatherPanel from "./WeatherPanel";
import { weatherPoints } from "@/lib/weather/locations";
import TripSummaryCard from "./TripSummaryCard";
import TripEditForm from "./TripEditForm";
import TripPlanningWorkspace from "./TripPlanningWorkspace";
import TripLogistics from "./TripLogistics";
import { type PlannerBuild } from "@/lib/trip-planner";
import type { CompatibilityIssue } from "@/lib/compatibility";

export default function TripPlanner({
  build,
  issues,
  items,
  readOnly = false,
}: {
  build: PlannerBuild;
  issues: CompatibilityIssue[];
  items: PackInputItem[];
  readOnly?: boolean;
}) {
  const [editing, setEditing] = useState(!readOnly && !build.startDate);
  // A full replace/restore invalidates editor defaults, including the
  // destination picker. Close that editor before the refreshed server props arrive.
  useEffect(() => {
    const onReplaced = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== build.id) return;
      setEditing(false);
    };
    window.addEventListener("trailpicker:build-replaced", onReplaced);
    return () => window.removeEventListener("trailpicker:build-replaced", onReplaced);
  }, [build.id]);

  const points = weatherPoints(build);
  const pack = useMemo(() => analyzePack(items), [items]);
  const temperatures = [
    build.minTemperature,
    ...build.days.map((d) => d.minTemperature),
  ].filter((x): x is number => x != null);

  const displayBuild = {
    ...build,
    minTemperature: temperatures.length
      ? Math.min(...temperatures)
      : null,
  };

  return (
    <div className="mx-auto mt-4 max-w-screen-2xl space-y-8 px-4 pb-20">
      {/* Section navigation */}
      <nav
        aria-label="Trip sections"
        className="border-b border-gray-200"
      >
        <div className="flex items-center gap-8 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            "overview",
            "route",
            "weather",
            "consumables",
            ...(!readOnly ? ["logistics"] : []),
          ].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className="shrink-0 border-b-2 border-transparent px-1 py-3 text-sm font-medium capitalize text-gray-600 transition-colors hover:border-green-700 hover:text-green-900"
            >
              {section === "route" ? "Route & itinerary" : section}
            </a>
          ))}
        </div>
      </nav>

      {/* Overview */}
      <div id="overview" className="scroll-mt-20">
        {editing ? (
          <TripEditForm
            build={build}
            onSaved={() => setEditing(false)}
            onCancel={
              build.startDate
                ? () => setEditing(false)
                : undefined
            }
          />
        ) : (
          <TripSummaryCard
            build={displayBuild}
            issues={issues}
            onEdit={
              readOnly ? undefined : () => setEditing(true)
            }
          />
        )}
      </div>

      {/* One connected route and day-planning workspace */}
      <TripPlanningWorkspace
        buildId={build.id}
        waypoints={build.routeWaypoints}
        lat={build.locationLat}
        lng={build.locationLng}
        days={build.days}
        weatherPoints={points}
        readOnly={readOnly}
      />

      {/* Weather */}
      <WeatherPanel
        points={points}
        tripStart={
          build.startDate
            ? new Date(build.startDate).toISOString().slice(0, 10)
            : undefined
        }
        tripEnd={
          build.endDate
            ? new Date(build.endDate).toISOString().slice(0, 10)
            : undefined
        }
      />

      {/* Consumables */}
      <div id="consumables" className="scroll-mt-20">
        <ConsumablesTimeline pack={pack} trip={build} />
      </div>

      {/* Logistics */}
      {!readOnly && (
        <TripLogistics
          buildId={build.id}
          value={build.tripLogistics}
        />
      )}
    </div>
  );
}


```

### `components/builder/TripPlanner/TripPlanningWorkspace.tsx`

```typescript
"use client";

import type { PlannerDay } from "@/lib/trip-planner";
import type { WeatherPoint } from "@/lib/weather/locations";
import DayStopsItinerary from "./DayStopsItinerary";
import TripRoute from "./TripRoute";

type Props = {
  buildId: string;
  days: PlannerDay[];
  waypoints: unknown;
  lat: number | null;
  lng: number | null;
  weatherPoints: WeatherPoint[];
  readOnly?: boolean;
};

export default function TripPlanningWorkspace({
  buildId, days, waypoints, lat, lng,
  weatherPoints, readOnly = false,
}: Props) {
  const sortedDays = [...days].sort((a, b) => +new Date(a.date) - +new Date(b.date));

  return (
    <section id="route" className="min-w-0 scroll-mt-20 border-b border-gray-200 pb-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-950">Route & itinerary</h2>
        <p className="mt-1 text-sm text-gray-500">
          Plan each day, add its stops, and see everything on the map.
        </p>
      </div>
      <TripRoute
        buildId={buildId}
        value={waypoints}
        lat={lat}
        lng={lng}
        readOnly={readOnly}
        days={sortedDays}
        renderItinerary={(route) => (
          <DayStopsItinerary
            route={route}
            buildId={buildId}
            days={sortedDays}
            weatherPoints={weatherPoints}
          />
        )}
      />
    </section>
  );
}


```

### `components/builder/TripPlanner/TripRoute.tsx`

```typescript

"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Pencil,
  X,
} from "lucide-react";
import { readWaypoints, type Waypoint, type PlannerDay } from "@/lib/trip-planner";
import { saveTripRoute } from "@/lib/tracked-build-actions";
import {
  WAYPOINT_TYPES,
  nextWaypointName,
  routeForSave,
  validCoordinates,
  waypointType,
  type PlaceResult,
} from "@/lib/waypoint-map";
import WaypointIcon from "./WaypointIcon";
import type { MapFocus } from "./RouteMapInner";
import ResizableRouteLayout from "./ResizableRouteLayout";

export type RouteWorkspaceControls = {
  points: Waypoint[];
  days: PlannerDay[];
  selectedId: string | null;
  editingStopId: string | null;
  editing: boolean;
  pending: boolean;
  readOnly: boolean;
  placingDayId: string | null;
  kind: Waypoint["kind"];
  near: [number, number] | null;
  selectStop: (point: Waypoint) => void;
  editStop: (id: string) => void;
  updateStop: (id: string, data: Partial<Waypoint>) => void;
  assignStop: (id: string, dayId: string | null) => void;
  removeStop: (id: string) => void;
  moveStop: (id: string, delta: -1 | 1) => void;
  moveStopToDay: (id: string, dayId: string | null, beforeId?: string) => void;
  startAddingToDay: (dayId: string, kind: Waypoint["kind"]) => void;
  stopAdding: () => void;
  choosePlace: (place: PlaceResult) => void;
};

const RouteMap = dynamic(() => import("./RouteMapInner"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] animate-pulse bg-gray-100 sm:h-[480px]" />
  ),
});

export default function TripRoute({
  buildId,
  value,
  lat,
  lng,
  readOnly = false,
  days = [],
  renderItinerary,
}: {
  buildId: string;
  value: unknown;
  lat: number | null;
  lng: number | null;
  readOnly?: boolean;
  days?: PlannerDay[];
  renderItinerary?: (route: RouteWorkspaceControls) => ReactNode;
}) {
  // Server props can change after import, restore, undo, or a route save.
  // Keep a stable fingerprint so unrelated router refreshes do not reset edits.
  const serverRouteKey = JSON.stringify(readWaypoints(value));
  const [points, setPoints] = useState(() => readWaypoints(value));
  const [committed, setCommitted] = useState(() => readWaypoints(value));
  const lastServerRouteKey = useRef(serverRouteKey);
  const [outdated, setOutdated] = useState(false);
  const [editing, setEditing] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [kind, setKind] = useState<Waypoint["kind"]>("waypoint");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingStopId, setEditingStopId] = useState<string | null>(null);
  const [focus, setFocus] = useState<MapFocus | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [placingDayId, setPlacingDayId] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const router = useRouter();

  const fallback: [number, number] | null = validCoordinates(lat, lng)
    ? [lat as number, lng as number]
    : null;

  const selected = points.find((point) => point.id === selectedId);
  const dirty = JSON.stringify(points) !== JSON.stringify(committed);
  const canEdit = editing && !readOnly;

  const near: [number, number] | null = selected
    ? [selected.lat, selected.lng]
    : points.length
      ? [points[points.length - 1].lat, points[points.length - 1].lng]
      : fallback;

  // An explicit import/restore/undo discards the old draft before the fresh
  // server props arrive. This event is dispatched by BuildDataTools.
  useEffect(() => {
    const onReplaced = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== buildId) return;
      setPoints(committed);
      setEditing(false);
      setPlacing(false);
      setPlacingDayId(null);
      setSelectedId(null);
      setEditingStopId(null);
      setFocus(null);
      setError("");
      setSaved(false);
      setOutdated(false);
    };
    window.addEventListener("trailpicker:build-replaced", onReplaced);
    return () => window.removeEventListener("trailpicker:build-replaced", onReplaced);
  }, [buildId, committed]);

  useEffect(() => {
    if (lastServerRouteKey.current === serverRouteKey) return;
    lastServerRouteKey.current = serverRouteKey;
    const nextRoute = JSON.parse(serverRouteKey) as Waypoint[];
    // Defer React state synchronization until after the effect. Preserve a
    // locally edited draft if the server route changes underneath it.
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setCommitted(nextRoute);
      if (editing && dirty) {
        setOutdated(true);
        setError("The saved route changed while you were editing. Cancel to load the latest route before saving.");
        return;
      }
      setPoints(nextRoute);
      setEditing(false);
      setPlacing(false);
      setPlacingDayId(null);
      setSelectedId(null);
      setEditingStopId(null);
      setFocus(null);
      setError("");
      setSaved(false);
      setOutdated(false);
    });
    return () => { cancelled = true; };
  }, [serverRouteKey, editing, dirty]);

  useEffect(() => {
    if (!canEdit || !dirty) return;

    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [canEdit, dirty]);

  function changed() {
    setSaved(false);
    if (!outdated) setError("");
  }

  function patch(id: string, data: Partial<Waypoint>) {
    if (!canEdit || pending) return;

    setPoints((current) =>
      current.map((point) =>
        point.id === id ? { ...point, ...data, id: point.id } : point
      )
    );
    changed();
  }

  function addStop(
    latitude: number,
    longitude: number,
    name?: string,
    recenter = false
  ) {
    if (!canEdit || pending || !validCoordinates(latitude, longitude)) return;

    if (points.length >= 200) {
      setError("A route can have up to 200 stops.");
      return;
    }

    const id = crypto.randomUUID();

    setPoints((current) => [
      ...current,
      {
        id,
        name: name?.trim().slice(0, 200) || nextWaypointName(current, kind),
        lat: latitude,
        lng: longitude,
        kind,
        elevationM: null,
        ...(placingDayId ? { dayId: placingDayId } : {}),
      },
    ]);

    setSelectedId(id);
    setPlacing(false);
    setPlacingDayId(null);
    changed();

    if (recenter) {
      setFocus((previous) => ({
        lat: latitude,
        lng: longitude,
        request: (previous?.request ?? 0) + 1,
      }));
    }
  }

  function choosePlace(place: PlaceResult) {
    addStop(place.lat, place.lng, place.name, true);
  }

  function pick(latitude: number, longitude: number) {
    if (!canEdit || pending) return;

    if (placing) addStop(latitude, longitude);
  }

  function select(point: Waypoint) {
    setSelectedId(point.id);
    setFocus((previous) => ({
      lat: point.lat,
      lng: point.lng,
      request: (previous?.request ?? 0) + 1,
    }));
  }

  // Day changes only highlight assigned map markers. The camera does not jump
  // around as someone scrolls the itinerary; clicking a stop still focuses it.

  function cancel() {
    if (
      pending ||
      (dirty && !window.confirm("Discard your unsaved route changes?"))
    ) {
      return;
    }

    setPoints(committed);
    setEditing(false);
    setPlacing(false);
    setPlacingDayId(null);
    setSelectedId(null);
    setEditingStopId(null);
    setError("");
    setSaved(false);
    setOutdated(false);
  }

  function save() {
    if (!canEdit || pending || outdated) return;

    let route: Waypoint[];

    try {
      route = routeForSave(points);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Check the route stops."
      );
      return;
    }

    setError("");

    start(async () => {
      try {
        const form = new FormData();
        form.set("buildId", buildId);
        form.set("waypoints", JSON.stringify(route));

        await saveTripRoute(form);

        setCommitted(route);
        setPoints(route);
        setSaved(true);
        setEditing(false);
        setPlacing(false);
        setPlacingDayId(null);
        setSelectedId(null);
        setEditingStopId(null);
        router.refresh();
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "Could not save the route. Your changes are still here. Try again."
        );
      }
    });
  }

  function startAddingToDay(dayId: string, nextKind: Waypoint["kind"]) {
    if (readOnly || pending) return;
    setEditing(true);
    setKind(nextKind);
    setPlacingDayId(dayId);
    setPlacing(true);
    setError("");
    setSaved(false);
  }

  function assignStop(id: string, dayId: string | null) {
    if (readOnly || pending) return;
    setEditing(true);
    setPoints((current) => current.map((point) => point.id === id ? { ...point, dayId } : point));
    changed();
  }

  function editStop(id: string) {
    if (readOnly || pending) return;
    // The pencil is a toggle, independent of which marker is selected.
    if (editingStopId === id) {
      setEditingStopId(null);
      return;
    }
    const point = points.find((p) => p.id === id);
    if (!point) return;
    setEditing(true);
    setEditingStopId(id);
    setPlacing(false);
    setPlacingDayId(null);
    select(point);
  }

  function removeStop(id: string) {
    if (!canEdit || pending) return;
    setPoints((current) => current.filter((p) => p.id !== id));
    if (selectedId === id) setSelectedId(null);
    if (editingStopId === id) setEditingStopId(null);
    changed();
  }

  function moveStop(id: string, delta: -1 | 1) {
    if (!canEdit || pending) return;
    // Change route order within the stop's own day, not across another day.
    setPoints((current) => {
      const point = current.find((item) => item.id === id);
      if (!point) return current;
      const sameDay = current.filter((item) => (item.dayId ?? null) === (point.dayId ?? null));
      const position = sameDay.findIndex((item) => item.id === id);
      const neighbor = sameDay[position + delta];
      if (!neighbor) return current;
      const first = current.findIndex((item) => item.id === point.id);
      const second = current.findIndex((item) => item.id === neighbor.id);
      const reordered = [...current];
      [reordered[first], reordered[second]] = [reordered[second], reordered[first]];
      return reordered;
    });
    changed();
  }

  // Drag a stop inside a day, into another day, or from the unassigned list.
  // The same waypoint array drives both the timeline and the Leaflet markers.
  function moveStopToDay(id: string, dayId: string | null, beforeId?: string) {
    if (readOnly || pending) return;
    if (dayId && !days.some((day) => day.id === dayId)) return;
    setEditing(true);
    setPoints((current) => {
      const moving = current.find((point) => point.id === id);
      if (!moving) return current;
      const remaining = current.filter((point) => point.id !== id);
      const updated = { ...moving, dayId };
      const target = beforeId
        ? remaining.findIndex((point) => point.id === beforeId && (point.dayId ?? null) === dayId)
        : -1;
      let insertAt = target;
      if (insertAt < 0) {
        const lastInDay = remaining.findLastIndex((point) => (point.dayId ?? null) === dayId);
        if (lastInDay >= 0) {
          insertAt = lastInDay + 1;
        } else {
          const dayPosition = days.findIndex((day) => day.id === dayId);
          const following = remaining.findIndex((point) => {
            const position = days.findIndex((day) => day.id === point.dayId);
            return dayPosition >= 0 && position > dayPosition;
          });
          insertAt = following >= 0 ? following : remaining.length;
        }
      }
      remaining.splice(insertAt, 0, updated);
      return remaining;
    });
    setSelectedId(id);
    changed();
  }

  const routeControls: RouteWorkspaceControls = {
    points, days, selectedId, editingStopId, editing: canEdit, pending, readOnly,
    placingDayId: placing ? placingDayId : null,
    kind, near,
    selectStop: select, editStop, updateStop: patch, assignStop,
    removeStop, moveStop, moveStopToDay, startAddingToDay,
    stopAdding: () => { setPlacing(false); setPlacingDayId(null); },
    choosePlace,
  };

  const elevations = points.map((point) => point.elevationM);
  const profileReady =
    points.length >= 2 &&
    elevations.every((height): height is number => height !== null);

  const heights = elevations.filter(
    (height): height is number => height !== null
  );

  const min = heights.length ? Math.min(...heights) : 0;
  const max = heights.length ? Math.max(...heights) : 0;

  return (
    <section
      aria-label="Route map and stops"
      className="min-w-0"
    >
      <ResizableRouteLayout enabled={Boolean(renderItinerary)}>
      <div className="min-w-0">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-gray-950">Route map</h2>
          <p className="mt-1 text-sm text-gray-500">
            Explore waypoints and adjust your route.
          </p>
        </div>

        {!readOnly &&
          (editing ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={pending}
                onClick={cancel}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={pending || !dirty || outdated}
                onClick={save}
                className="flex items-center gap-1.5 rounded-lg bg-green-900 px-3 py-2 text-xs font-semibold text-white hover:bg-green-800 disabled:opacity-40"
              >
                <Check className="h-4 w-4" aria-hidden="true" />
                {pending ? "Saving…" : "Save route"}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setEditing(true);
                setSaved(false);
                setError("");
              }}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-green-700"
            >
              <Pencil className="h-4 w-4" aria-hidden="true" />
              Edit route
            </button>
          ))}
      </header>

      {placing && canEdit && (
        <div
          role="status"
          className="mb-3 flex items-center justify-between gap-3 rounded-lg bg-green-50 px-4 py-2 text-xs text-green-900"
        >
          <span>
            {`Click the map to add a ${waypointType(kind).label.toLowerCase()}.`}
          </span>
          <button
            type="button"
            disabled={pending}
            aria-label="Cancel map placement"
            onClick={() => {
              setPlacing(false);
              setPlacingDayId(null);
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Original route map, full-size in the unified workspace. */}
      <div className="grid min-w-0 grid-cols-1 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="min-w-0">
          <RouteMap
            points={points}
            fallback={fallback}
            selectedId={selectedId}
            compact
            focus={focus}
            onPick={
              canEdit && !pending && placing
                ? pick
                : undefined
            }
            onSelect={(id) => {
              const point = points.find((item) => item.id === id);
              if (point) select(point);
            }}
            onMove={
              canEdit && !pending
                ? (id, a, b) => {
                    if (validCoordinates(a, b)) {
                      patch(id, { lat: a, lng: b });
                      setSelectedId(id);
                    }
                  }
                : undefined
            }
          />
        </div>

      </div>

      <footer className="space-y-2 pt-3">
        {canEdit && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {WAYPOINT_TYPES.map((type) => (
            <span
              key={type.kind}
              className="flex items-center gap-1.5 text-xs text-gray-500"
            >
              <span style={{ color: type.color }}>
                <WaypointIcon
                  kind={type.kind}
                  className="h-3.5 w-3.5"
                />
              </span>
              {type.label}
            </span>
          ))}
        </div>
        )}

        <p className="text-xs leading-5 text-gray-500">
          Dashed lines connect stops directly, not along trails.
          {canEdit
            ? " Drag pins to adjust them, then save your route."
            : ""}
        </p>

        {profileReady && (
          <details className="text-xs text-gray-500">
            <summary className="cursor-pointer font-semibold">
              Waypoint elevations · {min}–{max} m
            </summary>
            <svg
              viewBox="0 0 600 100"
              role="img"
              aria-label="Elevation at each waypoint in travel order, not by distance"
              className="mt-2 h-24 w-full"
            >
              <polyline
                fill="none"
                stroke="#166534"
                strokeWidth="3"
                points={points
                  .map(
                    (point, i) =>
                      `${10 + (i * 580) / (points.length - 1)},${
                        85 -
                        ((point.elevationM! - min) /
                          Math.max(1, max - min)) *
                          70
                      }`
                  )
                  .join(" ")}
              />
            </svg>
          </details>
        )}

        {error && (
          <p role="alert" className="text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <p
          role="status"
          aria-live="polite"
          className="text-xs text-green-800"
        >
          {pending
            ? "Saving route…"
            : saved
              ? "Route saved."
              : canEdit && dirty
                ? "Unsaved changes"
                : ""}
        </p>
      </footer>
      </div>
      {renderItinerary?.(routeControls)}
      </ResizableRouteLayout>
    </section>
  );
}



```

### `components/builder/TripPlanner/TripSummaryCard.tsx`

```typescript

"use client";

import {
    AlertTriangle,
    CalendarDays,
    CloudRain,
    CloudSnow,
    CloudSun,
    MapPin,
    Pencil,
    Thermometer,
    Route,
} from "lucide-react";

import {
    formatDateRange,
    getDaysUntil,
    getNights,
} from "@/lib/trip";

import type { CompatibilityIssue } from "@/lib/compatibility";
import { useDisplayPreferences } from "@/components/settings/DisplayPreferencesProvider";
import { temperatureText, distanceText } from "@/lib/user-preferences";

type Props = {
    build: {
        id: string;
        location: string | null;
        locationLat: number | null;
        locationLng: number | null;
        startDate: Date | null;
        endDate: Date | null;
        people: number;
        minTemperature: number | null;
        conditions: string | null;
        days?: Array<{ distanceKm: number | null }>;
    };
    issues: CompatibilityIssue[];
    onEdit?: () => void;
};

const conditions = {
    dry: {
        label: "Dry conditions",
        Icon: CloudSun,
    },
    rain: {
        label: "Rain expected",
        Icon: CloudRain,
    },
    snow: {
        label: "Snow expected",
        Icon: CloudSnow,
    },
} as const;

export default function TripSummaryCard({
    build,
    issues,
    onEdit,
}: Props) {
    const { temperatureUnit, distanceUnit } = useDisplayPreferences();
    const measuredDays = build.days?.filter(day => day.distanceKm != null) ?? [];
    const recordedDistanceKm = measuredDays.reduce((sum, day) => sum + (day.distanceKm ?? 0), 0);
    const nights = getNights(
        build.startDate,
        build.endDate,
    );

    const daysUntil = getDaysUntil(build.startDate);

    const condition =
        build.conditions &&
        build.conditions in conditions
            ? conditions[
                  build.conditions as keyof typeof conditions
              ]
            : null;

    const issueCount = issues.filter(
        (issue) =>
            issue.severity === "warning" ||
            issue.severity === "error",
    ).length;

    const countdown =
        daysUntil == null
            ? null
            : daysUntil > 1
              ? `${daysUntil} days away`
              : daysUntil === 1
                ? "Tomorrow"
                : daysUntil === 0
                  ? "Starts today"
                  : "Trip date passed";

    const ConditionIcon = condition?.Icon;

    return (
        <section
            aria-label="Trip overview"
            className="border-b border-gray-200 pb-6 pt-2"
        >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="min-w-0">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-1 shrink-0 rounded-full bg-green-700" />

                        <h2 className="min-w-0 break-words text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            {formatDateRange(build.startDate, build.endDate)}
                        </h2>
                    </div>

                    {build.location && (
                        <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="h-4 w-4 shrink-0" />
                            <span>{build.location}</span>
                        </p>
                    )}

                    <p className="mt-2 text-sm text-gray-500">
                        {nights} night
                        {nights === 1 ? "" : "s"}
                        {" · "}
                        {build.people} traveler
                        {build.people === 1 ? "" : "s"}
                    </p>
                </div>

                {onEdit && (
                    <button
                        type="button"
                        onClick={onEdit}
                        className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-800 transition hover:border-green-300 hover:bg-green-50 hover:text-green-900"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit trip
                    </button>
                )}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600">
                {countdown && (
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-gray-400" />
                        <span>{countdown}</span>
                    </div>
                )}

                {condition && ConditionIcon && (
                    <div className="flex items-center gap-2">
                        <ConditionIcon className="h-4 w-4 text-gray-400" />
                        <span>{condition.label}</span>
                    </div>
                )}

                {measuredDays.length > 0 && (
                    <div className="flex items-center gap-2">
                        <Route className="h-4 w-4 text-gray-400" />
                        <span>Recorded distance {distanceText(recordedDistanceKm, distanceUnit)}</span>
                    </div>
                )}

                {build.minTemperature != null && (
                    <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-gray-400" />
                        <span>
                            Low {temperatureText(build.minTemperature, temperatureUnit)}
                        </span>
                    </div>
                )}

                {issueCount > 0 && (
                    <div className="flex items-center gap-2 text-amber-700">
                        <AlertTriangle className="h-4 w-4" />
                        <span>
                            {issueCount} gear issue
                            {issueCount === 1 ? "" : "s"} to review
                        </span>
                    </div>
                )}
            </div>
        </section>
    );
}

```

### `components/builder/TripPlanner/WaypointIcon.tsx`

```typescript
import type { Waypoint } from "@/lib/trip-planner";
import { waypointType } from "@/lib/waypoint-map";

export default function WaypointIcon({ kind, className = "h-4 w-4" }: { kind: Waypoint["kind"]; className?: string }) {
  const type = waypointType(kind);
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d={type.path} /></svg>;
}

```

### `components/builder/TripPlanner/WaypointSearch.tsx`

```typescript
"use client";
import { useEffect, useRef, useState } from "react";
import { Search, LoaderCircle, MapPin } from "lucide-react";
import { parsePlaceResults, type PlaceResult } from "@/lib/waypoint-map";

type Props = { near: [number, number] | null; onChoose: (place: PlaceResult) => void; disabled?: boolean };

export default function WaypointSearch({ near, onChoose, disabled = false }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const request = useRef<AbortController | null>(null);
  const cache = useRef(new Map<string, PlaceResult[]>());
  const lastSearch = useRef(0);
  useEffect(() => () => { request.current?.abort(); request.current = null; }, []);

  async function search(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = query.trim();
    if (disabled || busy || text.length < 2) return;
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    const key = `${text.toLocaleLowerCase()}:${near?.map(n => n.toFixed(2)).join(",") ?? ""}`;
    const cached = cache.current.get(key);
    if (cached) { setResults(cached); setMessage(cached.length ? "" : "No places found. Try a nearby town or place the stop on the map."); return; }
    if (Date.now() - lastSearch.current < 1000) { setMessage("Wait a moment before searching again."); return; }
    lastSearch.current = Date.now();
    setBusy(true);
    setResults([]);
    setMessage("");
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const endpoint = process.env.NEXT_PUBLIC_WAYPOINT_SEARCH_URL || "https://photon.komoot.io/api/";
      const url = new URL(endpoint, window.location.origin);
      url.searchParams.set("q", text);
      url.searchParams.set("limit", "6");
      if (near) { url.searchParams.set("lat", String(near[0])); url.searchParams.set("lon", String(near[1])); }
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error("Search failed.");
      const found = parsePlaceResults(await response.json());
      if (request.current !== controller || controller.signal.aborted) return;
      if (cache.current.size >= 20) cache.current.delete(cache.current.keys().next().value!);
      cache.current.set(key, found);
      setResults(found);
      setMessage(found.length ? "" : "No places found. Try a nearby town or place the stop on the map.");
    } catch {
      if (request.current === controller) setMessage("Place search is unavailable. You can still add stops by clicking the map.");
    } finally {
      clearTimeout(timeout);
      if (request.current === controller) setBusy(false);
    }
  }

  return <div className="space-y-2">
    <form onSubmit={search} className="flex gap-2">
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">Search for a place</span>
        <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden="true" />
        <input type="search" value={query} maxLength={200} onChange={e => {
          setQuery(e.target.value); setResults([]); setMessage("");
          request.current?.abort(); request.current = null; setBusy(false);
        }} disabled={disabled} placeholder="Lake, campground, trailhead…" className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10" />
      </label>
      <button type="submit" disabled={disabled || busy || query.trim().length < 2} aria-label="Search places" className="rounded-xl bg-green-900 px-3 text-sm font-semibold text-white disabled:opacity-40">
        {busy ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : "Search"}
      </button>
    </form>
    <p role="status" aria-live="polite" className="text-xs text-gray-500">{busy ? "Searching…" : message}</p>
    {results.length > 0 && <ul aria-label="Place search results" className="overflow-hidden rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
      {results.map(place => <li key={place.id}><button type="button" disabled={disabled} onClick={() => { onChoose(place); setResults([]); }} className="flex w-full items-start gap-2 px-3 py-3 text-left hover:bg-green-50 disabled:opacity-40">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-700" aria-hidden="true" />
        <span className="min-w-0"><span className="block text-sm font-medium text-gray-900">{place.name}</span><span className="mt-0.5 block text-xs text-gray-500">{place.detail}</span></span>
      </button></li>)}
    </ul>}
    <p className="text-[10px] text-gray-400">Place search: <a href="https://photon.komoot.io/" target="_blank" rel="noreferrer" className="underline">Photon</a> / <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="underline">OpenStreetMap</a></p>
  </div>;
}

```

### `components/builder/TripPlanner/WeatherPanel.tsx`

```typescript
"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AlertTriangle, ChevronDown, CircleHelp, Cloud, CloudRain, CloudSnow, CloudSun, ExternalLink, MapPin, RefreshCw, Sun, Wind } from "lucide-react";
import type { WeatherResult } from "@/lib/weather/service";
import type { WeatherPoint } from "@/lib/weather/locations";
import { loadWaypointWeather } from "@/lib/weather/client-cache";
import { comparePlan, forecastHints, tripDayForecast, localHour, type PlanningInputs } from "@/lib/weather/presentation";
import { dateKey } from "@/lib/weather/core";
import { useDisplayPreferences } from "@/components/settings/DisplayPreferencesProvider";
import { temperatureNumber, windText } from "@/lib/user-preferences";

type Snapshot = { key: string; data?: WeatherResult; error?: string };

const number = (value: number | null | undefined, unit = "") =>
  value == null ? "—" : `${Math.round(value)}${unit}`;
const shortDate = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("en-CA", {
    timeZone: "UTC", weekday: "short", month: "short", day: "numeric",
  });
const timeLabel = (iso: string | null | undefined, zone: string) =>
  iso ? new Date(iso).toLocaleString("en-CA", {
    timeZone: zone, month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  }) : "Unavailable";

// Model-based icons: never present unknown cloud cover as "sunny".
// The PoP layer cannot establish precipitation type; temperature is only a rough hint.
type ModelSample = WeatherResult["hourly"][number];
type SkyKind = "sun" | "partly" | "cloud" | "rain" | "snow" | "mixed" | "precip" | "unknown";
type SkyCondition = { kind: SkyKind; label: string; detail: string };

function skyCondition(samples: readonly ModelSample[]): SkyCondition {
  const wet = samples.filter(s => s.pop != null && s.pop >= 60)
    .sort((a, b) => (b.pop ?? 0) - (a.pop ?? 0));
  if (wet.length) {
    const temperature = wet[0].temperature;
    if (temperature == null) return { kind: "precip", label: "Precipitation possible", detail: "Based on model precipitation probability" };
    if (temperature <= -1) return { kind: "snow", label: "Snow possible", detail: "Precipitation chance + air temperature estimate" };
    if (temperature >= 3) return { kind: "rain", label: "Rain possible", detail: "Precipitation chance + air temperature estimate" };
    return { kind: "mixed", label: "Rain or snow possible", detail: "Precipitation chance + near-freezing air temperature" };
  }
  const cloud = samples.map(s => s.cloudCover)
    .filter((v): v is number => typeof v === "number" && v >= 0 && v <= 100);
  if (cloud.length) {
    const average = cloud.reduce((sum, value) => sum + value, 0) / cloud.length;
    if (average < 20) return { kind: "sun", label: "Mostly clear", detail: "Estimated from model cloud cover" };
    if (average < 70) return { kind: "partly", label: "Partly cloudy", detail: "Estimated from model cloud cover" };
    return { kind: "cloud", label: "Cloudy", detail: "Estimated from model cloud cover" };
  }
  return { kind: "unknown", label: "Sky conditions unavailable", detail: "Cloud and precipitation data not available for this sample" };
}

function SkyIcon({ kind, className = "h-8 w-8" }: { kind: SkyKind; className?: string }) {
  const props = { className, "aria-hidden": true as const };
  switch (kind) {
    case "sun": return <Sun {...props} className={`${className} text-amber-600`} />;
    case "partly": return <CloudSun {...props} className={`${className} text-amber-600`} />;
    case "cloud": return <Cloud {...props} className={`${className} text-slate-500`} />;
    case "rain": return <CloudRain {...props} className={`${className} text-blue-600`} />;
    case "snow": return <CloudSnow {...props} className={`${className} text-sky-600`} />;
    case "mixed": return <CloudSnow {...props} className={`${className} text-sky-600`} />;
    case "precip": return <CloudRain {...props} className={`${className} text-blue-600`} />;
    default: return <CircleHelp {...props} className={`${className} text-gray-400`} />;
  }
}

export default function WeatherPanel({ points, date, defaultPointId, tripStart, tripEnd, planning, gearIssueCount = 0 }: {
  points: WeatherPoint[];
  date?: string;
  defaultPointId?: string;
  tripStart?: string;
  tripEnd?: string;
  planning?: PlanningInputs;
  gearIssueCount?: number;
}) {
  const { temperatureUnit, distanceUnit } = useDisplayPreferences();
  const temp = (value: number | null | undefined, withUnit = false) => {
    const converted = temperatureNumber(value, temperatureUnit);
    return converted == null ? "—" : `${Math.round(converted)}°${withUnit ? (temperatureUnit === "f" ? "F" : "C") : ""}`;
  };
  const wind = (value: number | null | undefined) => windText(value, distanceUnit);
  const controlId = useId();
  const [selected, setSelected] = useState(defaultPointId || points[0]?.id || "");
  const [revision, setRevision] = useState(0);
  const forceNext = useRef(false);
  const [snapshot, setSnapshot] = useState<Snapshot>({ key: "" });
  const [updating, setUpdating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const point = points.find(p => p.id === selected) ||
    points.find(p => p.id === defaultPointId) || points[0];
  const coordinates = point ? new URLSearchParams({
    lat: String(point.lat), lng: String(point.lng), ...(date ? { date } : {}),
  }).toString() : "";
  const summaryUrl = coordinates ? `/api/weather?${coordinates}&view=summary` : "";
  const detailUrl = coordinates ? `/api/weather?${coordinates}` : "";

  useEffect(() => {
    if (!summaryUrl) return;
    let active = true;
    const force = forceNext.current;
    forceNext.current = false;
    void loadWaypointWeather(summaryUrl, force)
      .then(data => {
        if (!active) return;
        setSnapshot({ key: coordinates, data });
      })
      .catch(error => {
        if (!active) return;
        setSnapshot(previous => ({
          key: coordinates,
          // Keep a previous forecast only for a failed refresh of this point.
          data: previous.key === coordinates ? previous.data : undefined,
          error: error instanceof Error ? error.message : "Forecast unavailable.",
        }));
      })
      .finally(() => { if (active) setUpdating(false); });
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setUpdating(true);
        forceNext.current = true;
        setRevision(n => n + 1);
      }
    }, 10 * 60_000);
    return () => { active = false; window.clearInterval(interval); };
  }, [summaryUrl, coordinates, revision]);

  const isLoading = updating || (Boolean(summaryUrl) && snapshot.key !== coordinates);
  const data = snapshot.key === coordinates ? snapshot.data : undefined;
  const error = snapshot.key === coordinates ? snapshot.error : undefined;

  async function loadDetails() {
    if (!detailUrl || detailsLoading) return;
    if (data?.sampleDensity === "detail") { setShowDetails(value => !value); return; }
    setDetailsLoading(true);
    setDetailsError("");
    try {
      const detailed = await loadWaypointWeather(detailUrl);
      // A request may finish after a waypoint change. Never display it for another point.
      if (currentCoordinates.current !== coordinates) return;
      setSnapshot({ key: coordinates, data: detailed });
      setShowDetails(true);
    } catch (cause) {
      if (currentCoordinates.current === coordinates)
        setDetailsError(cause instanceof Error ? cause.message : "Detailed samples unavailable.");
    } finally {
      setDetailsLoading(false);
    }
  }
  const currentCoordinates = useRef(coordinates);
  useEffect(() => { currentCoordinates.current = coordinates; }, [coordinates]);

  const zone = data?.query.zone || "UTC";
  const days = useMemo(() => data?.daily || [], [data?.daily]);
  const day = date ? days.find(item => item.date === date) : undefined;
  const tripDays = tripStart ? days.filter(item => item.date >= tripStart && item.date <= (tripEnd || tripStart)) : [];
  const visibleDays = date ? [] : tripDays.length ? tripDays : days.slice(0, 10);
  const hours = data?.hourly.filter(hour => !date || dateKey(hour.time, zone) === date) || [];
  const nearest = hours[0] || data?.hourly[0];
  const relevant = date ? tripDayForecast(data, date)
    : tripDays.length ? tripDayForecast(data, tripDays[0].date)
    : days[0] ? tripDayForecast(data, days[0].date) : null;
  const hints = relevant ? forecastHints(relevant) : [];
  const changes = planning && relevant ? comparePlan(relevant, planning) : [];
  const risks = data?.assessment;
  const warningCount = data?.alerts.items.length || 0;
  const featuredSky = skyCondition(date ? hours : nearest ? [nearest] : []);
  const daySky = (dayDate: string) => skyCondition(
    data?.hourly.filter(hour => dateKey(hour.time, zone) === dayDate) ?? [],
  );

  // The itinerary only needs a quick glance. Keep the detailed model dashboard
  // below for the main Weather section (where `date` is not provided).
  if (date) {
    const forecastAvailable = !!data && !data.forecastStale && !!day;
    const hasNumbers = forecastAvailable && [day.high, day.low, day.pop, day.wind].some(value => value != null);
    const condition = forecastAvailable && hours.length ? featuredSky : {
      kind: "unknown" as const,
      label: "Conditions unavailable",
      detail: "No sky-condition samples for this date",
    };
    const actualAlerts = data?.alerts.items ?? [];
    const alertsUnknown = data?.alerts.status === "unavailable";

    return (
      <section aria-label={`Day forecast for ${shortDate(date)}`} className="min-w-0 text-sm text-gray-800">
        <div className="rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-3 sm:px-4">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <div className="flex min-w-0 items-center gap-2">
              <SkyIcon kind={condition.kind} className="h-5 w-5 shrink-0" />
              <span className="font-semibold text-gray-900">Day forecast</span>
              {isLoading && <span role="status" className="text-xs text-gray-500">Updating…</span>}
            </div>
            <span className="text-xs text-gray-500">Model estimate</span>
          </div>

          {!point ? (
            <p className="mt-2 text-xs text-gray-600">Add a Canadian trip location or route waypoint to see weather.</p>
          ) : !data ? (
            <p role={error ? "alert" : "status"} className="mt-3 text-xs text-gray-600">
              {error ? "Forecast couldn't be loaded. Try reopening this day forecast." : "Loading forecast…"}
            </p>
          ) : !forecastAvailable ? (
            <p className="mt-3 text-sm text-gray-600">Forecast not available for this day.</p>
          ) : (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
              <div className="flex min-w-0 items-center gap-3">
                <SkyIcon kind={condition.kind} className="h-9 w-9 shrink-0" />
                <div>
                  <p className="text-xl font-semibold tabular-nums tracking-tight text-gray-950">
                    {temp(day.high)} <span className="font-normal text-gray-400">/</span> {temp(day.low)}
                  </p>
                  <p className="text-xs text-gray-500">{hasNumbers ? condition.label : "Forecast values unavailable"}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-700">
                <span className="inline-flex items-center gap-1.5">
                  <CloudRain aria-hidden="true" className="h-4 w-4 text-gray-500" />
                  Precip. {number(day.pop, "%")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Wind aria-hidden="true" className="h-4 w-4 text-gray-500" />
                  Wind {wind(day.wind)}
                </span>
              </div>
            </div>
          )}

          {point && (
            <div className="mt-3 flex min-w-0 items-center gap-2 border-t border-gray-200 pt-3">
              <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-gray-500" />
              <label htmlFor={controlId} className="sr-only">Day forecast location</label>
              <select
                id={controlId}
                aria-label="Day forecast location"
                value={point.id}
                onChange={event => {
                  setSelected(event.target.value);
                  setShowDetails(false);
                  setDetailsError("");
                }}
                className="min-w-0 w-full rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-xs text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
              >
                {points.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          )}
          {point && !defaultPointId && (
            <p className="mt-2 text-xs text-amber-900">
              No unique waypoint matches this day&apos;s plan. Select the correct forecast location above.
            </p>
          )}
          {error && data && <p role="status" className="mt-2 text-xs text-amber-800">Could not refresh; showing previously loaded data.</p>}
          {alertsUnknown && (
            <p role="status" className="mt-2 text-xs text-amber-900">Official weather alert status couldn&apos;t be checked.</p>
          )}
          {actualAlerts.length > 0 && (
            <div className="mt-3 border-t border-amber-200 pt-2 text-xs text-amber-950">
              <p className="flex items-center gap-1.5 font-semibold">
                <AlertTriangle aria-hidden="true" className="h-4 w-4" />
                {actualAlerts.length} active ECCC {actualAlerts.length === 1 ? "alert" : "alerts"} at this location
              </p>
              <p className="mt-1">Current alerts may not apply to your future trip date.</p>
              {actualAlerts.map(alert => (
                <details key={alert.id} className="mt-2">
                  <summary className="cursor-pointer font-medium">{alert.title} · {alert.area}</summary>
                  <p className="mt-1 whitespace-pre-wrap leading-relaxed">{alert.text}</p>
                </details>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      id={!date ? "weather" : undefined}
      aria-label={date ? `Weather for ${shortDate(date)}` : "Trip forecast"}
      className={`scroll-mt-20 min-w-0 text-sm text-gray-800 ${!date ? "border-b border-gray-200 pb-6" : ""}`}
    >
      {/* Match Route's flat section heading; only forecast content uses cards. */}
      <header className="mb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-950">
              {date ? `Weather · ${shortDate(date)}` : "Weather"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Model forecasts for your route waypoints.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {gearIssueCount > 0 && (
              <a
                href="#compatibility-details"
                className="inline-flex min-h-9 items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-green-900 hover:bg-gray-50"
              >
                Gear checks ({gearIssueCount})
              </a>
            )}
            <button
              type="button"
              disabled={!point || isLoading}
              onClick={() => {
                setUpdating(true);
                forceNext.current = true;
                setShowDetails(false);
                setRevision(n => n + 1);
              }}
              className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw aria-hidden="true" className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Updating…" : "Refresh"}
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-3 rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-green-800" />
            <label htmlFor={controlId} className="text-xs font-semibold text-gray-700">
              Forecast location
            </label>
            {point ? (
              <select
                id={controlId}
                value={point.id}
                onChange={event => {
                  setSelected(event.target.value);
                  setShowDetails(false);
                  setDetailsError("");
                }}
                className="min-w-0 max-w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
              >
                {points.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}{item.elevationM == null ? "" : ` · ${item.elevationM} m`}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-sm text-gray-500">No route waypoints available</span>
            )}
          </div>
          {point && (
            <span className="text-xs tabular-nums text-gray-500">
              {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
            </span>
          )}
        </div>
        {data && (
          <p className="mt-3 text-xs text-gray-500" aria-live="polite">
            {isLoading ? "Checking for updated model data…" : `Checked ${timeLabel(data.generated, zone)}`}
            {data.sampleDensity === "summary" ? " · Quick overview" : " · Detailed samples"}
          </p>
        )}
      </header>

      {!point ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-gray-600">
          Add a Canadian route waypoint to see the forecast.
        </div>
      ) : !data ? (
        <div role={error ? "alert" : "status"} className="rounded-xl border border-gray-200 p-6 text-gray-700">
          {error ? (
            <p>{error} Use Refresh to try again.</p>
          ) : (
            <>
              <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
              <div className="mt-4 h-10 w-40 animate-pulse rounded bg-gray-100" />
              <p className="mt-4 text-xs text-gray-500">Loading model samples for {point.name}…</p>
            </>
          )}
        </div>
      ) : (
        <div className="min-w-0">
          {error && (
            <p role="alert" className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-950">
              Unable to update: {error}. Showing the previous forecast.
            </p>
          )}

          {/* Official alerts remain visible, never hidden behind disclosure controls. */}
          {data.alerts.status !== "ok" ? (
            <p role="alert" className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              Official alert status could not be checked. Do not assume there are no warnings.
            </p>
          ) : warningCount > 0 ? (
            <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-amber-950">
              <p className="flex items-center gap-2 font-semibold">
                <AlertTriangle aria-hidden="true" className="h-4 w-4 shrink-0" />
                {warningCount} active ECCC {warningCount === 1 ? "alert" : "alerts"}
              </p>
              <p className="mt-1 text-xs">Alerts apply to current conditions at this point, not a future trip date.</p>
              {data.alerts.items.map(alert => (
                <details key={alert.id} className="mt-3 border-t border-amber-200 pt-3">
                  <summary className="cursor-pointer font-medium">{alert.title} · {alert.area}</summary>
                  <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed">{alert.text}</p>
                </details>
              ))}
            </div>
          ) : null}

          {/* Primary overview: one important reading, three supporting measurements. */}
          <div className="grid min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,1fr)]">
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {date ? `Sampled forecast · ${shortDate(date)}` : "Next sampled forecast"}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {date ? "High and low from available model samples" : timeLabel(nearest?.time, zone)}
                  </p>
                </div>
                <div className="flex min-w-0 max-w-[160px] flex-col items-end gap-1 text-right" title={featuredSky.detail}>
                  <SkyIcon kind={featuredSky.kind} className="h-12 w-12" />
                  <span className="text-xs font-medium leading-snug text-gray-600">{featuredSky.label}</span>
                </div>
              </div>
              <p className="mt-6 text-5xl font-semibold tabular-nums tracking-tight text-gray-950 sm:text-6xl">
                {date ? temp(day?.high) : temp(nearest?.temperature, true)}
                {date && (
                  <span className="ml-2 text-2xl font-medium text-gray-400 sm:text-3xl">
                    / {temp(day?.low)}
                  </span>
                )}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                {date ? "Sampled high / low" : "Temperature at the next available model time"}
              </p>
            </div>
            <div className="grid grid-cols-3 border-t border-gray-200 bg-gray-50/60 lg:grid-cols-1 lg:border-l lg:border-t-0">
              <div className="min-w-0 px-3 py-5 sm:px-5 lg:py-4">
                <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                  <Wind aria-hidden="true" className="h-4 w-4" /> Wind
                </p>
                <p className="mt-2 text-lg font-semibold tabular-nums text-gray-950 sm:text-xl">
                  {wind(date ? day?.wind : nearest?.wind)}
                </p>
              </div>
              <div className="min-w-0 border-l border-gray-200 px-3 py-5 sm:px-5 lg:border-l-0 lg:border-t lg:py-4">
                <p className="text-xs font-medium text-gray-500">Gusts</p>
                <p className="mt-2 text-lg font-semibold tabular-nums text-gray-950 sm:text-xl">
                  {wind(date ? day?.gust : nearest?.gust)}
                </p>
              </div>
              <div className="min-w-0 border-l border-gray-200 px-3 py-5 sm:px-5 lg:border-l-0 lg:border-t lg:py-4">
                <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                  <CloudRain aria-hidden="true" className="h-4 w-4" /> Precip. chance
                </p>
                <p className="mt-2 text-lg font-semibold tabular-nums text-gray-950 sm:text-xl">
                  {number(date ? day?.pop : nearest?.pop, "%")}
                </p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-gray-500">
            TrailPicker provides model-based weather estimates, not live observations or official safety advice. Actual conditions may differ. Terrain and avalanche hazards are not assessed. Cloud cover and precipitation icons are model estimates, not confirmed conditions. “—” means unavailable data.
          </p>

          {/* Days use easy-to-scan tiles instead of a dense data table. */}
          {!date && (
            <section className="mt-8" aria-label="Forecast by day">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-gray-950">
                    {tripDays.length ? "Forecast for your trip" : "Upcoming forecast"}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">Daily values sampled from available forecast models.</p>
                </div>
                <span className="text-xs text-gray-500">{visibleDays.length} {visibleDays.length === 1 ? "day" : "days"}</span>
              </div>
              {visibleDays.length ? (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {visibleDays.map(item => (
                    <div key={item.date} className="min-w-[155px] flex-1 rounded-xl border border-gray-200 bg-white px-4 py-4">
                      <p className="text-sm font-semibold text-gray-950">{shortDate(item.date)}</p>
                      <div className="mt-3 flex min-h-[65px] flex-col items-start gap-1" title={daySky(item.date).detail}>
                        <SkyIcon kind={daySky(item.date).kind} className="h-8 w-8" />
                        <span className="text-xs leading-tight text-gray-600">{daySky(item.date).label}</span>
                      </div>
                      <p className="mt-3 text-xl font-bold tabular-nums tracking-tight text-gray-950">
                        {temp(item.high)}
                        <span className="ml-1 text-base font-medium text-gray-400">/ {temp(item.low)}</span>
                      </p>
                      <div className="mt-4 space-y-2 border-t border-gray-100 pt-3 text-xs text-gray-600">
                        <p className="flex items-center justify-between gap-2">
                          <span>Wind</span><span className="font-medium tabular-nums text-gray-800">{wind(item.wind)}</span>
                        </p>
                        <p className="flex items-center justify-between gap-2">
                          <span>Precip.</span><span className="font-medium tabular-nums text-gray-800">{number(item.pop, "%")}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-gray-600">No forecast samples available.</p>
              )}
              {tripStart && !tripDays.length && (
                <p className="mt-3 text-xs text-amber-900">
                  Your trip dates are outside the available forecast. The upcoming days shown are not predictions for your trip.
                </p>
              )}
            </section>
          )}

          {/* Risk screening is supportive information, not a safety clearance. */}
          <section className="mt-8 rounded-xl border border-gray-200 bg-gray-50/70 p-5 sm:p-6" aria-label="Weather considerations">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle aria-hidden="true" className="h-4 w-4 text-gray-600" />
                <h3 className="text-base font-bold text-gray-950">Weather considerations</h3>
              </div>
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700">
                {risks?.level || "Unknown"}
              </span>
            </div>
            {risks?.reasons.length ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-700">
                {risks.reasons.slice(0, 5).map((reason, index) => (
                  <li key={`${reason}-${index}`}>{reason}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-gray-600">
                No issues flagged in the available temperature and wind samples. This is not a safety assessment.
              </p>
            )}
            {hints.length > 0 && <p className="mt-3 text-gray-700">{hints.join(" ")}</p>}
          </section>

          {date && planning && (
            <section className="mt-6 rounded-xl border border-gray-200 p-5" aria-label="Plan comparison">
              <h3 className="font-bold text-gray-950">Compared with your trip plan</h3>
              <p className="mt-2 text-gray-600">
                Planned minimum: {temp(planning.minTemperature, true)} · Sampled minimum: {temp(day?.low, true)}
              </p>
              {changes.length > 0 && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-amber-900">
                  {changes.map(change => <li key={change}>{change}</li>)}
                </ul>
              )}
              <p className="mt-3 text-xs text-gray-500">Forecasts never overwrite saved trip conditions.</p>
            </section>
          )}

          {/* Full model time steps are only fetched when the user requests them. */}
          <section className="mt-8 overflow-hidden rounded-xl border border-gray-200" aria-label="Model time steps">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5">
              <div>
                <h3 className="font-bold text-gray-950">Model time steps</h3>
                <p className="mt-1 text-xs text-gray-500">
                  {data.sampleDensity === "summary"
                    ? "Load detailed samples to explore forecast changes over time."
                    : `${hours.length} model samples available for this selection.`}
                </p>
              </div>
              <button
                type="button"
                disabled={detailsLoading}
                onClick={() => { void loadDetails(); }}
                aria-expanded={showDetails}
                className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-60"
              >
                {detailsLoading ? "Loading details…" : data.sampleDensity === "detail" ? showDetails ? "Hide time steps" : "Show time steps" : "Load time steps"}
                <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${showDetails ? "rotate-180" : ""}`} />
              </button>
            </div>
            {detailsError && <p role="alert" className="px-4 pb-3 text-xs text-amber-900">{detailsError}</p>}
            {showDetails && (
              <div className="overflow-x-auto border-t border-gray-200 px-4 py-2 sm:px-5">
                {hours.length > 0 ? (
                  <table className="w-full min-w-[580px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-xs text-gray-500">
                        <th scope="col" className="py-3 pr-3 font-semibold">Local time</th>
                        <th scope="col" className="px-3 py-3 font-semibold">Temp.</th>
                        <th scope="col" className="px-3 py-3 font-semibold">Wind</th>
                        <th scope="col" className="px-3 py-3 font-semibold">Gusts</th>
                        <th scope="col" className="px-3 py-3 font-semibold">Precip.</th>
                        <th scope="col" className="py-3 pl-3 font-semibold">Model</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hours.map(hour => (
                        <tr key={hour.time} className="border-b border-gray-100 last:border-0">
                          <th scope="row" className="whitespace-nowrap py-3 pr-3 font-medium text-gray-900">
                            {shortDate(dateKey(hour.time, zone))} · {localHour(hour.time, zone)}
                          </th>
                          <td className="px-3 py-3 tabular-nums">{temp(hour.temperature, true)}</td>
                          <td className="px-3 py-3 tabular-nums">{wind(hour.wind)}</td>
                          <td className="px-3 py-3 tabular-nums">{wind(hour.gust)}</td>
                          <td className="px-3 py-3 tabular-nums">{number(hour.pop, "%")}</td>
                          <td className="py-3 pl-3 text-xs text-gray-600">{hour.model}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="py-3 text-gray-600">No time steps were returned for this date.</p>
                )}
              </div>
            )}
          </section>

          <footer className="mt-6 border-t border-gray-100 pt-4 text-xs leading-relaxed text-gray-500">
            <p>
              Source: Environment and Climate Change Canada (ECCC) GeoMet · {data.modelsAvailable.join(" / ") || "Model unavailable"}.
            </p>
            <a
              href="https://eccc-msc.github.io/open-data/msc-geomet/readme_en/"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1 font-semibold text-green-800 underline underline-offset-2"
            >
              ECCC model documentation <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </footer>
        </div>
      )}
    </section>
  );
}


```

### `components/builder/useIgnoredCompatibility.ts`

```typescript
"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { CompatibilityIssue } from "@/lib/compatibility";

const EVENT = "trailpicker:compatibility-ignored";
const storageKey = (buildId: string) => `trailpicker:compatibility-ignored:v1:${buildId}`;

/** A changed issue, item or trip context must be acknowledged again. */
export function issueFingerprint(issue: CompatibilityIssue, context: string) {
  return JSON.stringify([context, issue.id, issue.severity, issue.kind, issue.message, issue.basis, issue.action, issue.itemIds]);
}

export function useIgnoredCompatibility(buildId: string | undefined, issues: readonly CompatibilityIssue[], context: string) {
  const key = buildId ? storageKey(buildId) : null;
  const fingerprints = useMemo(() => new Map(issues.map(issue => [issue.id, issueFingerprint(issue, context)])), [issues, context]);

  const subscribe = useCallback((onChange: () => void) => {
    if (!key) return () => {};
    const onStorage = (event: StorageEvent) => { if (event.key === key) onChange(); };
    window.addEventListener("storage", onStorage);
    window.addEventListener(EVENT, onChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(EVENT, onChange);
    };
  }, [key]);

  const getSnapshot = useCallback(() => {
    try { return key ? window.localStorage.getItem(key) ?? "[]" : "[]"; }
    catch { return "[]"; }
  }, [key]);
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  const ignored = useMemo(() => {
    let saved: unknown;
    try { saved = JSON.parse(raw); } catch { saved = []; }
    const current = new Set(fingerprints.values());
    return new Set(Array.isArray(saved) ? saved.filter((value): value is string => typeof value === "string" && current.has(value)) : []);
  }, [raw, fingerprints]);

  const toggle = (issue: CompatibilityIssue) => {
    if (!key) return;
    const fingerprint = fingerprints.get(issue.id);
    if (!fingerprint) return;
    // Read the latest storage state to avoid overwriting another mounted panel.
    let saved: unknown;
    try { saved = JSON.parse(window.localStorage.getItem(key) ?? "[]"); } catch { saved = []; }
    const current = new Set(fingerprints.values());
    const next = new Set<string>(Array.isArray(saved) ? saved.filter((v): v is string => typeof v === "string" && current.has(v)) : []);
    if (next.has(fingerprint)) next.delete(fingerprint);
    else next.add(fingerprint);
    try {
      window.localStorage.setItem(key, JSON.stringify([...next]));
      window.dispatchEvent(new Event(EVENT));
    } catch { /* Storage may be blocked; don't claim a dismissal was saved. */ }
  };

  return { ignored, toggle, fingerprints, canIgnore: Boolean(key), ready: true };
}

```

### `components/builder/useIgnoredFindings.ts`

```typescript
"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import type { Finding } from "@/lib/pack-intelligence";
import { findingAcknowledgementId, findingFingerprint, isFindingIgnored, parseIgnoredFindings } from "@/lib/finding-dismissals";

const CHANGE_EVENT = "trailpicker:ignored-findings-changed";
const storageKey = (buildId: string) => `trailpicker:ignored-findings:v1:${buildId}`;

/** Private-to-this-browser acknowledgement. Public/read-only builds cannot be dismissed. */
export function useIgnoredFindings(buildId: string, findings: readonly Finding[], canIgnore: boolean) {
  const key = canIgnore ? storageKey(buildId) : null;
  const [storageError, setStorageError] = useState(false);
  const subscribe = useCallback((onChange: () => void) => {
    if (!key) return () => {};
    const fromOtherTab = (event: StorageEvent) => { if (event.key === key) onChange(); };
    const fromThisTab = () => onChange();
    window.addEventListener("storage", fromOtherTab);
    window.addEventListener(CHANGE_EVENT, fromThisTab);
    return () => {
      window.removeEventListener("storage", fromOtherTab);
      window.removeEventListener(CHANGE_EVENT, fromThisTab);
    };
  }, [key]);
  const getSnapshot = useCallback(() => {
    try { return key ? window.localStorage.getItem(key) ?? "{}" : "{}"; }
    catch { return "{}"; }
  }, [key]);
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => "{}");
  const records = useMemo(() => parseIgnoredFindings(raw), [raw]);
  const ignoredIds = useMemo(() => new Set(findings.filter(f => isFindingIgnored(f, records)).map(f => f.id)), [findings, records]);

  const toggleIgnore = useCallback((finding: Finding) => {
    if (!key) return;
    try {
      // Read at interaction time so two mounted panels cannot overwrite each other.
      const latest = parseIgnoredFindings(window.localStorage.getItem(key));
      const fingerprint = findingFingerprint(finding);
      const acknowledgementId = findingAcknowledgementId(finding);
      if (latest[acknowledgementId] === fingerprint) delete latest[acknowledgementId];
      else latest[acknowledgementId] = fingerprint;
      window.localStorage.setItem(key, JSON.stringify(latest));
      setStorageError(false);
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      setStorageError(true); // Never claim a warning was ignored when storage failed.
    }
  }, [key]);
  return { ignoredIds, toggleIgnore, storageError };
}

```

### `components/builder/WeightSummary.tsx`

```typescript
type Props = {
    base: number;
    consumable: number;
    worn: number;
    total: number;
};

function toLb(grams: number) {
    return (grams / 453.592).toFixed(2);
}

export default function WeightSummary({
    base,
    consumable,
    worn,
    total,
}: Props) {
    const basePct = total > 0 ? (base / total) * 100 : 0;
    const wornPct = total > 0 ? (worn / total) * 100 : 0;
    const consumablePct = total > 0 ? (consumable / total) * 100 : 0;

    return (
        <section className="mt-10 border-t border-gray-200 pt-6">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Weight Breakdown
                    </h2>

                    <p className="mt-1 text-3xl font-bold text-gray-900">
                        {total}
                        <span className="text-lg font-medium text-gray-900">g</span>
                        <span className="ml-2 text-base font-medium text-gray-400">
                            ({toLb(total)} lb)
                        </span>
                    </p>
                </div>


            </div>

            <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${basePct}%` }}
                />
                <div
                    className="h-full bg-amber-400 transition-all"
                    style={{ width: `${wornPct}%` }}
                />
                <div
                    className="h-full bg-emerald-400 transition-all"
                    style={{ width: `${consumablePct}%` }}
                />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
                <Stat dot="bg-blue-500" label="Base" grams={base} />
                <Stat dot="bg-amber-400" label="Worn" grams={worn} />
                <Stat dot="bg-emerald-400" label="Consumable" grams={consumable} />
            </div>
        </section>
    );
}

function Stat({
    dot,
    label,
    grams,
}: {
    dot: string;
    label: string;
    grams: number;
}) {
    return (
        <div className="flex items-center gap-2 max-md:flex-wrap">
            <span className={`h-2 w-2 rounded-full ${dot}`} />
            <span className="text-gray-500">{label}</span>
            <span className="font-semibold text-gray-900">{grams}g</span>
            <span className="text-gray-400">({toLb(grams)} lb)</span>
        </div>
    );
}



```

### `components/filters/BrandFilter.tsx`

```typescript
"use client";

import {
    useRouter,
    useSearchParams,
} from "next/navigation";

type Props = {
    brands: {
        id: string;
        name: string;
    }[];
};

export default function BrandFilter({ brands }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selected =
        searchParams.get("brand")?.split(",") ?? [];
    const allSelected =
        selected.length === 0;

    function toggleBrand(brand: string) {
        const params =
            new URLSearchParams(searchParams);

        let updated =
            [...selected];

        if (updated.includes(brand)) {
            updated = updated.filter(
                (item) => item !== brand
            );
        } else {
            updated.push(brand);
        }

        if (updated.length === 0) {
            params.delete("brand");
        } else {
            params.set(
                "brand",
                updated.join(",")
            );
        }

        router.push(
            `?${params.toString()}`
        );
    }

    function selectAll() {
        const params =
            new URLSearchParams(searchParams);
        params.delete("brand");

        router.push(
            `?${params.toString()}`
        );
    }

    return (
        <div>
            <div className="space-">
                <label className="flex items-center gap-2 rounded-lg px-3 py-1 hover:bg-gray-100 cursor-pointer transition text-[14px]">

                    <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={selectAll}
                        className="h-4 w-4 rounded"
                    />

                    <span className="font-medium">
                        All
                    </span>
                </label>

                {brands.map((brand) => (
                    <label
                        key={brand.id}
                        className="flex items-center gap-2 rounded-lg px-3 py-1 hover:bg-gray-100 cursor-pointer transition text-[15px]"
                    >
                        <input
                            type="checkbox"
                            checked={selected.includes(brand.name)}
                            onChange={() => toggleBrand(brand.name)}
                            className="h-4 w-4 rounded"
                        />

                        <span>
                            {brand.name}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}
```

### `components/filters/FilterSection.tsx`

```typescript
"use client";

import { useState } from "react";

type Props = {
    title: string;
    children: React.ReactNode;
};

export default function FilterSection({
    title,
    children,
}: Props) {
    const [open, setOpen] = useState(true);

    return (
        <div className="border-b last:border-0 pb-2 mb-2 border-gray-300">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between font-bold text-[15px] mb-1 cursor-pointer"
            >
                <span>
                    {title}
                </span>

                <span className="text-xl">
                    {open ? "−" : "+"}
                </span>
            </button>


            <div
                className={`
                    overflow-hidden
                    transition-all
                    duration-300
                    ease-in-out
                    ${open
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }
                `}
            >
                <div className="pb-2">
                    {children}
                </div>
            </div>

        </div>
    );
}
```

### `components/filters/RangeFilter.tsx`

```typescript
"use client";

import { useState } from "react";
import {
    useRouter,
    useSearchParams,
} from "next/navigation";


type Props = {
    min: number;
    max: number;
    unit: string;
    param: string;
};


export default function RangeFilter({
    min,
    max,
    unit,
    param,
}: Props) {

    const router = useRouter();
    const searchParams = useSearchParams();


    const urlValue =
        Number(searchParams.get(param))
        || max;


    const [value, setValue] =
        useState(urlValue);


    function updateValue(newValue: number) {

        setValue(newValue);


        const params =
            new URLSearchParams(searchParams);


        if (newValue >= max) {

            params.delete(param);

        } else {

            params.set(
                param,
                newValue.toString()
            );

        }


        router.push(
            `?${params.toString()}`
        );
    }


    return (
        <div className="space-y-3">

            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) =>
                    updateValue(
                        Number(e.target.value)
                    )
                }
                className="range-slider"
                style={{
                    ["--progress" as string]: `${((value - min) / (max - min)) * 100}%`,
                }}
            />


            <div className="flex items-center gap-2">

                <input
                    type="number"
                    value={value}
                    onChange={(e) =>
                        updateValue(
                            Number(e.target.value)
                        )
                    }
                    className="w-full rounded bg-gray-100 px-2 py-1 text-sm border-0"
                />


                <span className="text-sm text-gray-500">
                    {unit}
                </span>

            </div>

        </div>
    );
}
```

### `components/filters/SortHeader.tsx`

```typescript
"use client";

import {
    useRouter,
    useSearchParams,
} from "next/navigation";

type Props = {
    label: string;
    value: string;
};

export default function SortHeader({
    label,
    value,
}: Props) {

    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSort = searchParams.get("sort");

    const currentDirection =
        searchParams.get("direction");


    function sort() {
        const params =
            new URLSearchParams(searchParams);


        if (currentSort === value) {

            params.set(
                "direction",
                currentDirection === "asc"
                    ? "desc"
                    : "asc"
            );

        } else {

            params.set(
                "sort",
                value
            );

            params.set(
                "direction",
                "asc"
            );
        }


        router.push(
            `?${params.toString()}`
        );
    }


    return (
        <button
            onClick={sort}
            className="text-center hover:text-blue-600 cursor-pointer transition"
        >
            {label}

            {currentSort === value && (
                <span className="ml-1">
                    {currentDirection === "desc"
                        ? "↓"
                        : "↑"}
                </span>
            )}
        </button>
    );
}
```

### `components/gear/GearLibraryActions.tsx`

```typescript
"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Heart, PackageCheck, Check } from "lucide-react";
import { addFavorite, removeFavorite, addOwnedGear, removeOwnedGear } from "@/app/profile/gear/actions";

export default function GearLibraryActions({ gearId, signedIn, owned, favorite }: { gearId: string; signedIn: boolean; owned: boolean; favorite: boolean }) {
  const [pending, start] = useTransition();
  const [error, setError] = useState("");
  if (!signedIn) return <Link href={`/api/auth/signin?callbackUrl=${encodeURIComponent(`/gear/${gearId}`)}`} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold hover:bg-gray-50"><Heart className="h-4 w-4" />Sign in to save gear</Link>;
  function run(action: (form: FormData) => Promise<void>) {
    const form = new FormData(); form.set("gearId", gearId); setError("");
    start(async () => { try { await action(form); } catch (e) { setError(e instanceof Error ? e.message : "Could not update your library."); } });
  }
  return <div><div className="flex flex-wrap gap-2">
    <button type="button" aria-pressed={owned} disabled={pending} onClick={() => run(owned ? removeOwnedGear : addOwnedGear)} className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold disabled:cursor-wait disabled:opacity-60 ${owned ? "border-green-200 bg-green-50 text-green-900" : "border-gray-200 hover:bg-gray-50"}`}>
      {owned ? <Check className="h-4 w-4" /> : <PackageCheck className="h-4 w-4" />}{owned ? "In My Gear" : "I own this"}
    </button>
    <button type="button" aria-pressed={favorite} disabled={pending} onClick={() => run(favorite ? removeFavorite : addFavorite)} className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold disabled:cursor-wait disabled:opacity-60 ${favorite ? "border-rose-200 bg-rose-50 text-rose-700" : "border-gray-200 hover:bg-gray-50"}`}>
      <Heart className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />{favorite ? "Favorited" : "Favorite"}
    </button>
  </div>{pending && <p role="status" className="mt-2 text-xs text-gray-500">Saving…</p>}{error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}</div>;
}

```

### `components/gear/ProductBuildButton.tsx`

```typescript
"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { addGear } from "@/app/build/actions";

export default function ProductBuildButton({ buildId, gearId }: { buildId: string; gearId: string }) {
  const [pending,start]=useTransition();const [error,setError]=useState("");
  function submit(form: FormData) { setError("");start(async()=>{try {await addGear(form);}catch(e){if(e&&typeof e==="object"&&"digest" in e&&typeof e.digest==="string"&&e.digest.startsWith("NEXT_REDIRECT;"))throw e;setError(e instanceof Error?e.message:"Could not add gear.");}}); }
  return <form action={submit}><input type="hidden" name="buildId" value={buildId}/><input type="hidden" name="gearId" value={gearId}/><button disabled={pending} className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-900 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800 disabled:cursor-wait disabled:opacity-60"><Plus className="h-4 w-4"/>{pending?"Adding…":"Add to build"}</button>{error&&<p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}</form>;
}

```

### `components/gear/ProductDetails.tsx`

```typescript
import Link from "next/link";
import { ArrowUpRight, Star, Scale } from "lucide-react";
import ProductGallery from "@/components/gear/ProductGallery";
import GearLibraryActions from "@/components/gear/GearLibraryActions";
import ReviewEditor from "@/components/gear/ReviewEditor";
import ProductBuildButton from "@/components/gear/ProductBuildButton";
import { gearMoney, gearWeight, reviewStats, safeGearUrl } from "@/lib/gear-display";

export type Product = {
  id:string;name:string;description:string|null;weight_g:number|null;price_cad:number|null;capacity_l:number|null;frame_type:string|null;waterproof:boolean|null;temperature_rating:number|null;season:string|null;material:string|null;
  brand:{name:string};category:{name:string;slug:string};subcategory:{name:string;slug:string}|null;
  images:Array<{id:string;url:string;isPrimary:boolean}>;
  specifications:Array<{id:string;key:string;value:string;unit:string|null}>;
  prices:Array<{id:string;price:number;currency:string;url:string|null;inStock:boolean;lastUpdated:Date;retailer:{name:string}}>;
  reviews:Array<{id:string;userId:string;rating:number;title:string|null;body:string|null;createdAt:Date;user:{name:string|null;username:string|null}}>;
};
function Stars({rating}:{rating:number}){return <span aria-label={`${rating} out of 5 stars`} className="inline-flex gap-0.5">{[1,2,3,4,5].map(n=><Star key={n} aria-hidden="true" className={`h-3.5 w-3.5 ${n<=rating?"fill-amber-400 text-amber-400":"text-gray-200"}`}/>)}</span>;}
const date=(value:Date)=>value.toLocaleDateString("en-CA",{year:"numeric",month:"short",day:"numeric",timeZone:"UTC"});

export default function ProductDetails({gear,userId,owned,favorite,build}:{gear:Product;userId:string|null;owned:boolean;favorite:boolean;build:{id:string;name:string}|null}) {
  const stats=reviewStats(gear.reviews);
  const ownReview=gear.reviews.find(review=>review.userId===userId)??null;
  const prices=[...gear.prices].sort((a,b)=>Number(b.currency==="CAD")-Number(a.currency==="CAD")||Number(b.inStock)-Number(a.inStock)||a.price-b.price);
  const cadPrices=prices.filter(price=>price.currency==="CAD"&&price.inStock);
  const best=cadPrices[0]?.price??gear.price_cad;
  const categoryHref=`/gear/${encodeURIComponent(gear.category.slug)}`;
  const specs:Array<[string,string]>=[];
  if(gear.weight_g!==null)specs.push(["Weight",gearWeight(gear.weight_g)]);
  if(gear.capacity_l!==null)specs.push(["Capacity",`${gear.capacity_l} L`]);
  if(gear.frame_type)specs.push(["Frame",gear.frame_type]);
  if(gear.waterproof!==null)specs.push(["Waterproof",gear.waterproof?"Yes":"No"]);
  if(gear.temperature_rating!==null)specs.push(["Temperature rating",`${gear.temperature_rating} °C`]);
  if(gear.season)specs.push(["Season",gear.season]);
  if(gear.material)specs.push(["Material",gear.material]);
  for(const spec of gear.specifications){if(!specs.some(([key])=>key.toLowerCase()===spec.key.toLowerCase()))specs.push([spec.key,`${spec.value}${spec.unit?` ${spec.unit}`:""}`]);}
  return <div className="min-h-screen bg-gray-50"><main className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-8">
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-xs text-gray-500"><Link href={categoryHref} className="hover:text-green-800">{gear.category.name}</Link>{gear.subcategory&&<><span aria-hidden="true">/</span><Link href={`${categoryHref}/${encodeURIComponent(gear.subcategory.slug)}`} className="hover:text-green-800">{gear.subcategory.name}</Link></>}<span aria-hidden="true">/</span><span aria-current="page" className="text-gray-800">{gear.name}</span></nav>
    <div className="grid items-start gap-7 md:grid-cols-2 lg:gap-12">
      <ProductGallery name={gear.name} images={gear.images}/>
      <div className="min-w-0 py-2"><p className="text-xs font-semibold uppercase tracking-wider text-green-800">{gear.brand.name}</p><h1 className="mt-2 break-words text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">{gear.name}</h1><p className="mt-2 text-sm text-gray-500">{gear.subcategory?.name??gear.category.name}</p>
        <Link href="#reviews" className="mt-4 inline-flex items-center gap-2 text-sm hover:underline"><Star className="h-4 w-4 fill-amber-400 text-amber-400"/>{stats.count?<><b>{stats.average.toFixed(1)}</b><span className="text-gray-500">({stats.count} review{stats.count===1?"":"s"})</span></>:<span className="text-gray-500">No reviews yet</span>}</Link>
        <div className="mt-6 border-y border-gray-200 py-5"><p className="text-3xl font-bold tracking-tight">{gearMoney(best)}</p><p className="mt-1 text-xs text-gray-500">{cadPrices.length?"Lowest listed in-stock CAD offer. Shipping and taxes may vary.":best!==null?"Catalog price · retailer prices may vary":"No price has been added for this product."}</p><p className="mt-4 flex items-center gap-2 text-sm text-gray-600"><Scale className="h-4 w-4"/>{gearWeight(gear.weight_g)}</p></div>
        <div className="mt-5">{build?<><p className="mb-2 text-xs text-gray-500">Adding to <Link href={`/build/${build.id}`} className="font-medium text-green-800 hover:underline">{build.name}</Link></p><ProductBuildButton buildId={build.id} gearId={gear.id}/></>:<Link href="/build" className="inline-flex w-full justify-center rounded-lg bg-green-900 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800">Create a build</Link>}</div>
        <div className="mt-3"><GearLibraryActions gearId={gear.id} signedIn={Boolean(userId)} owned={owned} favorite={favorite}/></div>
        <div className="mt-5 flex flex-wrap gap-4 text-xs text-gray-500"><Link href="/profile/gear" className="hover:text-green-800">My Gear</Link><Link href="/profile/favorites" className="hover:text-green-800">Favorites</Link><Link href="#retailers" className="hover:text-green-800">Compare prices</Link><Link href="#specifications" className="hover:text-green-800">Specifications</Link></div>
      </div>
    </div>
    <div className="mt-9 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section id="retailers" className="scroll-mt-20 overflow-hidden rounded-xl border border-gray-200 bg-white"><div className="border-b border-gray-100 px-5 py-4"><h2 className="text-lg font-semibold">Compare prices</h2><p className="mt-1 text-xs text-gray-500">Listed offers, with each retailer’s currency and availability.</p></div>{prices.length?<ul className="divide-y divide-gray-100">{prices.map(price=>{const url=safeGearUrl(price.url);return <li key={price.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"><div className="min-w-0"><p className="font-medium">{price.retailer.name}</p><p className="mt-1 text-xs text-gray-500"><span className={price.inStock?"text-green-700":"text-gray-500"}>{price.inStock?"Listed in stock":"Out of stock"}</span> · Updated {date(price.lastUpdated)}</p></div><div className="flex items-center gap-3"><b className="text-sm">{gearMoney(price.price,price.currency)}</b>{url?<a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold hover:bg-gray-50">View <ArrowUpRight className="h-3 w-3"/></a>:<span className="text-xs text-gray-400">No link</span>}</div></li>})}</ul>:<p className="p-5 text-sm text-gray-500">No retailer offers yet.</p>}</section>
      <section id="specifications" className="scroll-mt-20 overflow-hidden rounded-xl border border-gray-200 bg-white"><h2 className="border-b border-gray-100 px-5 py-4 text-lg font-semibold">Specifications</h2>{specs.length?<dl className="divide-y divide-gray-100">{specs.map(([key,value])=><div key={key} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 px-5 py-3 text-sm"><dt className="text-gray-500">{key}</dt><dd className="break-words font-medium">{value}</dd></div>)}</dl>:<p className="p-5 text-sm text-gray-500">No specifications yet.</p>}</section>
    </div>
    {gear.description&&<section className="mt-6 rounded-xl border border-gray-200 bg-white p-5 sm:p-6"><h2 className="text-lg font-semibold">About this product</h2><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-gray-600">{gear.description}</p></section>}
    <section id="reviews" className="mt-6 scroll-mt-20 rounded-xl border border-gray-200 bg-white p-5 sm:p-6"><h2 className="text-lg font-semibold">Community reviews</h2><div className="mt-5 grid items-start gap-7 lg:grid-cols-[260px_minmax(0,1fr)]">
      <div>{stats.count?<><p className="text-4xl font-bold">{stats.average.toFixed(1)}<span className="ml-2 text-sm font-normal text-gray-400">/ 5</span></p><p className="mt-1 text-xs text-gray-500">Based on {stats.count} review{stats.count===1?"":"s"}</p><div className="mt-4 space-y-2">{stats.buckets.map(bucket=><div key={bucket.rating} className="flex items-center gap-2 text-xs text-gray-500"><span>{bucket.rating} star</span><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100"><div className="h-full bg-amber-400" style={{width:`${bucket.count/stats.count*100}%`}}/></div><span className="w-4 text-right">{bucket.count}</span></div>)}</div></>:<p className="text-sm text-gray-500">Be the first to review this gear.</p>}<p className="mt-5 text-xs leading-5 text-gray-400">Ratings are from TrailPicker members.</p></div>
      <div className="min-w-0">{userId?<ReviewEditor key={ownReview?.id??"new"} gearId={gear.id} review={ownReview}/>:<p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600"><Link href={`/api/auth/signin?callbackUrl=${encodeURIComponent(`/gear/${gear.id}#reviews`)}`} className="font-semibold text-green-800 hover:underline">Sign in</Link> to write a review.</p>}
        <div className="mt-5 divide-y divide-gray-100">{gear.reviews.map(review=><article key={review.id} className="py-5"><div className="flex flex-wrap items-center justify-between gap-2"><span className="text-sm font-semibold">{review.user.username?`@${review.user.username}`:review.user.name??"TrailPicker member"}{review.userId===userId&&<span className="ml-2 text-xs font-normal text-green-700">You</span>}</span><span className="text-xs text-gray-400">{date(review.createdAt)}</span></div><div className="mt-2"><Stars rating={review.rating}/></div>{review.title&&<h3 className="mt-2 break-words text-sm font-semibold">{review.title}</h3>}{review.body&&<p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-gray-600">{review.body}</p>}</article>)}</div>
      </div>
    </div></section>
  </main></div>;
}

```

### `components/gear/ProductGallery.tsx`

```typescript
"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { safeGearUrl } from "@/lib/gear-display";

export default function ProductGallery({ name, images }: { name: string; images: Array<{ id: string; url: string; isPrimary: boolean }> }) {
  const photos = images.filter(image => safeGearUrl(image.url)).sort((a,b) => Number(b.isPrimary)-Number(a.isPrimary));
  const [selected, setSelected] = useState(0);
  const [failed, setFailed] = useState<string[]>([]);
  const image = photos[selected] ?? photos[0];
  const unavailable = !image || failed.includes(image.id);
  return <div>
    <div className="relative flex aspect-square max-h-[520px] items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white">
      {unavailable ? <div className="text-center text-gray-400"><ImageOff className="mx-auto h-12 w-12" /><p className="mt-3 text-sm">Photo unavailable</p></div> : <Image src={safeGearUrl(image.url)!} alt={name} fill priority sizes="(max-width: 767px) 90vw, 45vw" className="object-contain p-6 sm:p-10" onError={() => setFailed(previous => [...previous, image.id])} />}
    </div>
    {photos.length > 1 && <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Product photos">{photos.map((photo,index) => <button key={photo.id} type="button" onClick={() => setSelected(index)} aria-label={`View photo ${index+1}`} aria-pressed={photo.id===image?.id} className={`relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border bg-white ${photo.id===image?.id ? "border-green-700 ring-1 ring-green-700" : "border-gray-200 hover:border-gray-400"}`}>
      {failed.includes(photo.id) ? <ImageOff className="mx-auto h-5 w-5 text-gray-300" /> : <Image src={safeGearUrl(photo.url)!} alt="" fill sizes="64px" className="object-contain p-2" onError={() => setFailed(previous => [...previous,photo.id])} />}
    </button>)}</div>}
  </div>;
}

```

### `components/gear/ReviewEditor.tsx`

```typescript
"use client";

import { useState, useTransition } from "react";
import { Star } from "lucide-react";
import { saveGearReview, deleteGearReview } from "@/app/gear/review-actions";

type Review = { id: string; rating: number; title: string | null; body: string | null };
export default function ReviewEditor({ gearId, review }: { gearId: string; review: Review | null }) {
  const [rating,setRating] = useState(review?.rating ?? 0);
  const [pending,start] = useTransition(); const [error,setError]=useState("");const [saved,setSaved]=useState(false);
  function submit(form: FormData) { setError("");setSaved(false);start(async()=>{try { await saveGearReview(form);setSaved(true); }catch(e){setError(e instanceof Error?e.message:"Could not save review.");}}); }
  function remove() { if (!review || !window.confirm("Delete your review?")) return; const form=new FormData();form.set("reviewId",review.id);setError("");start(async()=>{try{await deleteGearReview(form);setRating(0);setSaved(false);}catch(e){setError(e instanceof Error?e.message:"Could not delete review.");}}); }
  return <form action={submit} onChange={()=>setSaved(false)} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
    <h3 className="font-semibold">{review ? "Your review" : "Write a review"}</h3><p className="mt-1 text-xs text-gray-500">Share your own experience with this product. Your review is public.</p>
    <input type="hidden" name="gearId" value={gearId}/><input type="hidden" name="rating" value={rating}/>
    <fieldset disabled={pending} className="mt-4 space-y-3"><legend className="sr-only">Review details</legend>
      <fieldset><legend className="mb-1 text-xs font-medium text-gray-600">Your rating</legend><div className="flex gap-1">{[1,2,3,4,5].map(value=><label key={value} className="relative cursor-pointer rounded p-1 focus-within:ring-2 focus-within:ring-green-700"><input className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0" type="radio" name="ratingChoice" value={value} checked={rating===value} onChange={()=>{setRating(value);setSaved(false)}} required aria-label={`${value} star${value===1?"":"s"}`}/><Star aria-hidden="true" className={`h-7 w-7 ${value<=rating?"fill-amber-400 text-amber-400":"text-gray-300"}`}/></label>)}</div></fieldset>
      <label className="block text-xs font-medium text-gray-600">Title (optional)<input name="title" maxLength={120} defaultValue={review?.title??""} className="mt-1 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"/></label>
      <label className="block text-xs font-medium text-gray-600">Your experience<textarea name="body" required minLength={10} maxLength={4000} rows={4} defaultValue={review?.body??""} placeholder="How did it perform on your trips?" className="mt-1 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"/></label>
      <div className="flex flex-wrap gap-3"><button className="cursor-pointer rounded-lg bg-green-900 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800 disabled:cursor-wait">{pending?"Saving…":review?"Update review":"Post review"}</button>{review&&<button type="button" onClick={remove} className="cursor-pointer rounded-lg px-3 py-2 text-sm text-red-700 hover:bg-red-50">Delete review</button>}</div>
    </fieldset>{error&&<p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}{saved&&<p role="status" className="mt-3 text-sm text-green-800">Review saved.</p>}
  </form>;
}

```

### `components/Navbar.tsx`

```typescript
import { findAccessibleBuild } from "@/lib/build-access";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { auth, signIn } from "@/auth";
import ProfileDropdown from "@/components/ProfileDropdown";
import NavbarNavigation from "@/components/NavbarNavigation";

export default async function Navbar() {
  const cookieStore = await cookies();
  const currentId = cookieStore.get("currentBuild")?.value;
  const [access, session, categories] = await Promise.all([
    currentId ? findAccessibleBuild(currentId) : Promise.resolve(null),
    auth(),
    prisma.category.findMany({
      orderBy: { createdAt: "asc" },
      select: { id: true, name: true, slug: true, subcategories: {
        orderBy: { name: "asc" }, select: { id: true, name: true, slug: true },
      } },
    }),
  ]);

  return <NavbarNavigation
    builderHref={access ? `/build/${access.id}` : "/build"}
    categories={categories}
    account={session?.user ? <ProfileDropdown name={session.user.name} email={session.user.email} image={session.user.image} /> : (
      <form action={async () => {
        "use server";
        await signIn("google");
      }}>
        <button className="whitespace-nowrap rounded-full bg-white px-3 py-2 text-sm font-semibold text-green-950 transition hover:bg-green-100 sm:px-5">Sign in</button>
      </form>
    )}
  />;
}

```

### `components/NavbarNavigation.tsx`

```typescript
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, Tent, X } from "lucide-react";

type Category = { id: string; name: string; slug: string; subcategories: { id: string; name: string; slug: string }[] };
const links = [{ name: "Marketplace", href: "/marketplace" }, { name: "Community", href: "/community" }, { name: "Guides", href: "/guide" }];

function NavbarNavigationContent({ builderHref, categories, account }: {
  builderHref: string; categories: Category[]; account: ReactNode;
}) {
  const [panel, setPanel] = useState<"gear" | "mobile" | null>(null);
  const [mobileGear, setMobileGear] = useState(false);
  const [selectedId, setSelectedId] = useState(categories[0]?.id ?? "");
  const selected = categories.find(category => category.id === selectedId) ?? categories[0];
  const headerRef = useRef<HTMLElement>(null);
  const gearRef = useRef<HTMLButtonElement>(null);
  const mobileRef = useRef<HTMLButtonElement>(null);

  function close() { setPanel(null); setMobileGear(false); }
  useEffect(() => {
    if (!panel) return;
    function outside(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) close();
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPanel(null); setMobileGear(false);
        (panel === "gear" ? gearRef : mobileRef).current?.focus();
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [panel]);
  useEffect(() => {
    // Close the old surface when crossing the desktop/mobile breakpoint.
    const breakpoint = window.matchMedia("(min-width: 1280px)");
    const reset = () => { setPanel(null); setMobileGear(false); };
    breakpoint.addEventListener("change", reset);
    return () => breakpoint.removeEventListener("change", reset);
  }, []);

  const navLink = "rounded-md px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
  const categoriesPanel = <div className="grid sm:grid-cols-[220px_minmax(0,1fr)]">
    <div className="border-b border-gray-200 bg-gray-50 p-3 sm:border-b-0 sm:border-r">
      <p className="px-3 pb-3 pt-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Shop by category</p>
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-1">
        {categories.map(category => <button key={category.id} type="button" onClick={() => setSelectedId(category.id)} onFocus={() => setSelectedId(category.id)}
          aria-pressed={selected?.id === category.id}
          className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${selected?.id === category.id ? "bg-green-900 text-white" : "text-gray-700 hover:bg-green-100"}`}>
          {category.name}<ChevronRight size={16} className="shrink-0" />
        </button>)}
      </div>
    </div>
    <div className="min-w-0 p-5 sm:p-6">
      {selected ? <>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg font-semibold text-gray-900">{selected.name}</h2>
          <Link href={`/gear/${encodeURIComponent(selected.slug)}`} onClick={close} className="rounded-lg border border-green-800 px-3 py-2 text-xs font-semibold text-green-900 hover:bg-green-50">Browse {selected.name.toLowerCase()}</Link>
        </div>
        <div className="grid gap-1 md:grid-cols-2">
          {selected.subcategories.map(subcategory => <Link key={subcategory.id} href={`/gear/${encodeURIComponent(selected.slug)}/${encodeURIComponent(subcategory.slug)}`} onClick={close}
            className="flex items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-900 focus-visible:outline-2 focus-visible:outline-green-800">
            {subcategory.name}<ChevronRight size={16} className="shrink-0 text-gray-400" />
          </Link>)}
        </div>
        {!selected.subcategories.length && <p className="text-sm text-gray-500">Browse this category to see its gear.</p>}
      </> : <p className="text-sm text-gray-500">No gear categories yet.</p>}
    </div>
  </div>;

  return <header ref={headerRef} className="sticky top-0 z-50 bg-green-900 text-white shadow-md">
    <div className="mx-auto flex h-16 max-w-[110rem] items-center gap-2 px-3 sm:gap-4 sm:px-6 lg:px-8">
      <Link href="/" onClick={close} className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight sm:text-2xl"><Tent className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />TrailPicker</Link>
      <nav aria-label="Main navigation" className="ml-auto hidden items-center gap-1 xl:flex">
        <Link href={builderHref} onClick={close} className={navLink}>Builder</Link>
        <button ref={gearRef} type="button" onClick={() => setPanel(panel === "gear" ? null : "gear")} aria-expanded={panel === "gear"} aria-controls="gear-navigation" className={`${navLink} flex items-center gap-1.5`}>Gear<ChevronDown size={16} className={panel === "gear" ? "rotate-180" : ""} /></button>
        {links.map(link => <Link key={link.href} href={link.href} onClick={close} className={navLink}>{link.name}</Link>)}
      </nav>
      <div className="ml-auto shrink-0 xl:ml-3">{account}</div>
      <button ref={mobileRef} type="button" onClick={() => { setPanel(panel === "mobile" ? null : "mobile"); setMobileGear(false); }} aria-label={panel === "mobile" ? "Close navigation" : "Open navigation"} aria-expanded={panel === "mobile"} aria-controls="mobile-navigation" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg hover:bg-green-800 xl:hidden">
        {panel === "mobile" ? <X size={22} /> : <Menu size={22} />}
      </button>
    </div>
    {panel === "gear" && <div id="gear-navigation" className="absolute inset-x-0 top-full hidden border-b border-gray-200 bg-white text-gray-900 shadow-xl xl:block">
      <div className="mx-auto max-h-[calc(100dvh-80px)] max-w-5xl overflow-y-auto">{categoriesPanel}</div>
    </div>}
    {panel === "mobile" && <nav id="mobile-navigation" aria-label="Mobile navigation" className="absolute inset-x-0 top-full max-h-[calc(100dvh-80px)] overflow-y-auto border-b border-green-800 bg-green-900 shadow-xl xl:hidden">
      <div className="space-y-1 p-3">
        <Link href={builderHref} onClick={close} className={`${navLink} block`}>Builder</Link>
        <button type="button" onClick={() => setMobileGear(!mobileGear)} aria-expanded={mobileGear} aria-controls="mobile-gear-navigation" className={`${navLink} flex w-full items-center justify-between`}>Gear<ChevronDown size={16} className={mobileGear ? "rotate-180" : ""} /></button>
        {mobileGear && <div id="mobile-gear-navigation" className="overflow-hidden rounded-xl bg-white text-gray-900">{categoriesPanel}</div>}
        {links.map(link => <Link key={link.href} href={link.href} onClick={close} className={`${navLink} block`}>{link.name}</Link>)}
      </div>
    </nav>}
  </header>;
}
export default function NavbarNavigation(props: {
  builderHref: string;
  categories: Category[];
  account: ReactNode;
}) {
  const pathname = usePathname();

  return <NavbarNavigationContent key={pathname} {...props} />;
}
```

### `components/profile/BuildCard.tsx`

```typescript
import Link from "next/link";
import { CalendarDays, Copy, MapPin, Package, Pencil } from "lucide-react";
import { deleteBuild, duplicateProfileBuild, renameBuild } from "@/app/profile/actions";
import { dateRange, summarizeBuild, weightLabel, type ProfileBuild } from "@/lib/profile";
import DeleteBuildButton from "./DeleteBuildButton";
import type { WeightUnit } from "@/lib/user-preferences";

export default function BuildCard({ build, weightUnit = "metric" }: { build: ProfileBuild; weightUnit?: WeightUnit }) {
  const totals = summarizeBuild(build);
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link href={`/build/${build.id}`} className="text-xl font-bold tracking-tight text-slate-950 hover:text-green-800">{build.name}</Link>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500"><MapPin className="h-3.5 w-3.5" />{build.location || "Location not set"}</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">{totals.itemCount} items</span>
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm text-slate-600"><CalendarDays className="h-4 w-4 text-green-700" />{dateRange(build.startDate, build.endDate)}</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-medium text-slate-500">Base weight</p><p className="mt-1 font-bold text-slate-900">{weightLabel(totals.base, weightUnit)}</p></div>
        <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-medium text-slate-500">Gear value</p><p className="mt-1 font-bold text-slate-900">${totals.cost.toFixed(0)} CAD</p></div>
      </div>
      <p className="mt-4 text-xs text-slate-400">Edited {build.updatedAt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</p>
      <div className="mt-auto flex items-center gap-2 pt-5">
        <Link href={`/build/${build.id}`} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800"><Package className="h-4 w-4" />Open</Link>
        <form action={duplicateProfileBuild}><input type="hidden" name="buildId" value={build.id} /><button aria-label="Duplicate build" className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"><Copy className="h-4 w-4" /></button></form>
        <details className="relative"><summary aria-label="Rename build" className="list-none cursor-pointer rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"><Pencil className="h-4 w-4" /></summary><form action={renameBuild} className="absolute bottom-12 right-0 z-10 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl"><input type="hidden" name="buildId" value={build.id} /><label className="text-xs font-semibold text-slate-600">Build name<input name="name" defaultValue={build.name} required maxLength={80} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-green-700" /></label><button className="mt-2 w-full rounded-lg bg-green-900 px-3 py-2 text-sm font-semibold text-white">Rename</button></form></details>
        <form action={deleteBuild}><input type="hidden" name="buildId" value={build.id} /><DeleteBuildButton /></form>
      </div>
    </article>
  );
}

```

### `components/profile/DeleteBuildButton.tsx`

```typescript
"use client";

import { Trash2 } from "lucide-react";

export default function DeleteBuildButton() {
  return (
    <button
      type="submit"
      aria-label="Delete build"
      onClick={(event) => {
        if (!window.confirm("Delete this build? This cannot be undone.")) event.preventDefault();
      }}
      className="rounded-xl border border-red-100 p-2.5 text-red-600 hover:bg-red-50"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

```

### `components/profile/GearLibraryCard.tsx`

```typescript
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useTransition } from "react";
import { Backpack, Heart, PackageCheck, Scale, Trash2, Pencil } from "lucide-react";
import { addGearToCurrentBuild, removeFavorite, removeOwnedGear, moveFavoriteToGear, updateOwnedGearDetails } from "@/app/profile/gear/actions";
import { gearMoney, gearWeight, safeGearUrl } from "@/lib/gear-display";

type Gear={id:string;name:string;weight_g:number|null;price_cad:number|null;brand:{name:string};category:{name:string;slug:string};images:Array<{url:string;isPrimary:boolean}>};
type Details={purchasedPrice:number|null;purchasedAt:Date|null;notes:string|null};
type Props={gear:Gear;mode:"owned"|"favorite";addedAt:Date;hasCurrentBuild?:boolean;details?:Details};
const button="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50";
const field="mt-1 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm";

export default function GearLibraryCard({gear,mode,addedAt,hasCurrentBuild=false,details}:Props){
  const [pending,start]=useTransition(),[error,setError]=useState(""),[editing,setEditing]=useState(false),[imageFailed,setImageFailed]=useState(false);
  const image=safeGearUrl(gear.images.find(item=>item.isPrimary)?.url??gear.images[0]?.url);
  function run(action:(data:FormData)=>Promise<void>,data?:FormData){const form=data??new FormData();form.set("gearId",gear.id);setError("");start(async()=>{try{await action(form);if(action===updateOwnedGearDetails)setEditing(false);}catch(e){if(e&&typeof e==="object"&&"digest" in e&&typeof e.digest==="string"&&e.digest.startsWith("NEXT_REDIRECT;"))throw e;setError(e instanceof Error?e.message:"Could not update gear.");}});}
  return <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="flex items-start"><Link href={`/gear/${gear.id}`} className="relative m-3 flex h-24 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-50 sm:h-32 sm:w-28">{image&&!imageFailed?<Image src={image} alt={gear.name} fill sizes="112px" className="object-contain p-2" onError={()=>setImageFailed(true)}/>:<Backpack className="h-9 w-9 text-slate-300"/>}</Link>
      <div className="min-w-0 flex-1 p-4 pl-1"><p className="text-[10px] font-semibold uppercase tracking-wide text-green-700">{gear.brand.name}</p><Link href={`/gear/${gear.id}`} className="mt-1 block break-words text-base font-bold text-slate-950 hover:text-green-800">{gear.name}</Link><p className="mt-1 text-xs text-slate-500">{gear.category.name}</p><div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600"><span className="inline-flex items-center gap-1"><Scale className="h-3.5 w-3.5"/>{gearWeight(gear.weight_g)}</span><span>{gearMoney(gear.price_cad)}</span></div><p className="mt-2 text-[10px] text-slate-400">Added {addedAt.toLocaleDateString("en-CA",{month:"short",day:"numeric",year:"numeric",timeZone:"UTC"})}</p></div>
    </div>
    {mode==="owned"&&details&&(details.purchasedPrice!==null||details.purchasedAt||details.notes)&&<div className="mx-4 mb-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">{details.purchasedPrice!==null&&<p>Paid {gearMoney(details.purchasedPrice)}</p>}{details.purchasedAt&&<p className="mt-1">Purchased {details.purchasedAt.toLocaleDateString("en-CA",{timeZone:"UTC"})}</p>}{details.notes&&<p className="mt-2 whitespace-pre-wrap break-words">{details.notes}</p>}</div>}
    <div className="flex flex-wrap gap-2 border-t border-slate-100 p-4">{mode==="owned"?<><button type="button" disabled={pending||!hasCurrentBuild} title={hasCurrentBuild?"Add to your current build":"Open or create an account build first"} onClick={()=>run(addGearToCurrentBuild)} className={`${button} border-green-900 bg-green-900 text-white hover:bg-green-800`}><Backpack className="h-3.5 w-3.5"/>Add to build</button><button type="button" disabled={pending} onClick={()=>setEditing(!editing)} className={button}><Pencil className="h-3.5 w-3.5"/>Details</button><button type="button" disabled={pending} onClick={()=>run(removeOwnedGear)} className={`${button} text-red-600`}><Trash2 className="h-3.5 w-3.5"/>Remove</button></>:<><button type="button" disabled={pending} onClick={()=>run(moveFavoriteToGear)} className={`${button} border-green-900 bg-green-900 text-white hover:bg-green-800`}><PackageCheck className="h-3.5 w-3.5"/>I own this</button><button type="button" disabled={pending} onClick={()=>run(removeFavorite)} className={button}><Heart className="h-3.5 w-3.5"/>Unfavorite</button></>}{pending&&<span role="status" className="self-center text-xs text-gray-500">Saving…</span>}</div>
    {editing&&mode==="owned"&&<form action={data=>run(updateOwnedGearDetails,data)} className="border-t border-gray-100 bg-gray-50 p-4"><fieldset disabled={pending} className="space-y-3"><legend className="sr-only">Purchase details</legend><div className="grid gap-3 sm:grid-cols-2"><label className="text-xs font-medium text-gray-600">Purchase price (CAD)<input type="number" name="purchasedPrice" min="0" max="1000000" step="0.01" defaultValue={details?.purchasedPrice??""} className={field}/></label><label className="text-xs font-medium text-gray-600">Purchase date<input type="date" name="purchasedAt" defaultValue={details?.purchasedAt?.toISOString().slice(0,10)??""} className={`${field} min-w-0`}/></label></div><label className="block text-xs font-medium text-gray-600">Private notes<textarea name="notes" rows={3} maxLength={2000} defaultValue={details?.notes??""} className={field}/></label><div className="flex gap-2"><button className={`${button} bg-green-900 text-white hover:bg-green-800`}>Save details</button><button type="button" onClick={()=>setEditing(false)} className={button}>Cancel</button></div></fieldset></form>}
    {error&&<p role="alert" className="px-4 pb-4 text-sm text-red-700">{error}</p>}
  </article>;
}

```

### `components/ProfileDropdown.tsx`

```typescript
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import {
    User,
    Backpack,
    Settings,
    LogOut,
    ChevronDown
} from "lucide-react";

type Props = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
};

export default function ProfileDropdown({
    name,
    email,
    image,
}: Props) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative">

            <button
                onClick={() => setOpen(!open)}
                aria-label="Account menu"
                aria-expanded={open}
                className="
        flex items-center gap-3
        rounded-full
        border border-green-700
        bg-green-900
        px-3 py-1.5

        cursor-pointer
        transition-colors
        duration-200

        hover:bg-green-800
    "
            >


                {image ? (
                    <Image
                        src={image}
                        width={36}
                        height={36}
                        unoptimized
                        alt=""
                        className="
                            h-9 w-9
                            rounded-full
                            object-cover
                            ring-2 ring-green-500/40
                        "
                    />
                ) : (
                    <div className="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-full
                        bg-green-600
                        font-bold
                    ">
                        {name?.charAt(0) ?? "U"}
                    </div>
                )}

                <div className="hidden text-left sm:block">
                    <p className="max-w-32 truncate text-sm font-semibold text-white leading-none">
                        {name ?? "Explorer"}
                    </p>

                </div>

                <ChevronDown
                    className={`
                        h-4 w-4 text-green-200
                        transition-transform
                        ${open ? "rotate-180" : ""}
                    `}
                />

            </button>


            {open && (
                <div
                    className="
                        fixed right-3 top-16 mt-3 sm:absolute sm:right-0 sm:top-full
                        w-72 max-w-[calc(100vw-24px)]
                        overflow-hidden
                        rounded-2xl
                        border border-green-200/20
                        bg-white
                        shadow-2xl
                        animate-in fade-in zoom-in-95
                    "
                >

                    {/* Profile header */}
                    <div className="
                        bg-gradient-to-br
                        from-green-900
                        to-green-700
                        px-5 py-4
                        text-white
                    ">
                        <p className="text-sm text-green-200">
                            Signed in as
                        </p>

                        <p className="mt-1 font-semibold truncate">
                            {email}
                        </p>
                    </div>


                    {/* Links */}
                    <div className="p-2">

                        <Link
                            href="/profile"
                            className="
                                flex items-center gap-3
                                rounded-xl
                                px-4 py-3
                                text-sm
                                text-gray-800
                                hover:bg-green-50
                                transition
                            "
                            onClick={() => setOpen(false)}
                        >
                            <User className="h-5 w-5 text-green-700" />
                            Profile
                        </Link>


                        <Link
                            href="/profile/builds"
                            className="
                                flex items-center gap-3
                                rounded-xl
                                px-4 py-3
                                text-sm
                                text-gray-800
                                hover:bg-green-50
                                transition
                            "
                            onClick={() => setOpen(false)}
                        >
                            <Backpack className="h-5 w-5 text-green-700" />
                            My Builds
                        </Link>


                        <Link
                            href="/settings"
                            className="
                                flex items-center gap-3
                                rounded-xl
                                px-4 py-3
                                text-sm
                                text-gray-800
                                hover:bg-green-50
                                transition
                            "
                            onClick={() => setOpen(false)}
                        >
                            <Settings className="h-5 w-5 text-green-700" />
                            Settings
                        </Link>

                    </div>


                    <div className="border-t p-2">

                        <button
                            onClick={() => signOut()}
                            className="
                                flex w-full items-center gap-3
                                rounded-xl
                                px-4 py-3
                                text-sm
                                text-red-600
                                hover:bg-red-50
                                transition
                            "
                        >
                            <LogOut className="h-5 w-5" />
                            Sign Out
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}

```

### `components/settings/DisplayPreferencesProvider.tsx`

```typescript
"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  DEFAULT_USER_PREFERENCES,
  type DisplayPreferences,
} from "@/lib/user-preferences";

const DisplayContext = createContext<DisplayPreferences>(DEFAULT_USER_PREFERENCES);

export function DisplayPreferencesProvider({
  preferences,
  children,
}: {
  preferences: DisplayPreferences;
  children: ReactNode;
}) {
  return <DisplayContext.Provider value={preferences}>{children}</DisplayContext.Provider>;
}

export function useDisplayPreferences() {
  return useContext(DisplayContext);
}

```

### `components/settings/SettingsClient.tsx`

```typescript
"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  ArrowDownToLine,
  ArrowRight,
  Backpack,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Database,
  Fingerprint,
  Globe2,
  LockKeyhole,
  LogOut,
  Ruler,
  Settings2,
  Shield,
  SlidersHorizontal,
  Trash2,
  UserRound,
} from "lucide-react";
import {
  saveSettings,
  deleteMyAccount,
} from "@/app/settings/actions";
import type { SettingsActionState } from "@/app/settings/actions";
import type { UserPreferences } from "@/lib/user-preferences";

type Account = {
  name: string | null;
  email: string;
  username: string | null;
  image: string | null;
  joined: string;
  providers: string[];
  isProfilePublic: boolean;
  buildCount: number;
  gearCount: number;
};

const initialSettingsState: SettingsActionState = { status: "idle", message: "" };

const sectionClass = "rounded-2xl border border-slate-200 bg-white shadow-sm";
const selectClass = "mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15";

function SectionHeading({ icon: Icon, title, description }: {
  icon: typeof UserRound;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-green-800">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-950">{title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function ToggleRow({ name, title, description, defaultChecked }: {
  name: string;
  title: string;
  description: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl px-4 py-4 hover:bg-slate-50">
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-slate-900">{title}</span>
        <span className="mt-1 block max-w-xl text-sm leading-relaxed text-slate-500">{description}</span>
      </span>
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-green-800"
      />
    </label>
  );
}

export default function SettingsClient({ user, initialPreferences }: {
  user: Account;
  initialPreferences: UserPreferences;
}) {
  const [saveState, saveAction, saving] = useActionState(saveSettings, initialSettingsState);
  const [deleteState, deleteAction, deleting] = useActionState(deleteMyAccount, initialSettingsState);
  const [confirmation, setConfirmation] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const initials = user.name?.trim().slice(0, 1).toUpperCase() || "T";
  const joined = new Date(user.joined).toLocaleDateString("en-CA", { month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-slate-50 pb-24 text-slate-900">
      <div className="border-b border-green-950/10 bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 px-5 py-12 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 flex items-center gap-2 text-sm text-emerald-100/80">
            <Link href="/profile" className="hover:text-white hover:underline">Your profile</Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span className="font-semibold text-white">Settings</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Account settings</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-emerald-100/85 sm:text-base">
                Customize your experience, choose trip-sharing defaults and manage your account data.
              </p>
            </div>
            <div className="hidden rounded-2xl border border-white/15 bg-white/10 p-4 sm:block">
              <Settings2 className="h-7 w-7 text-emerald-100" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-8 sm:px-8 lg:grid-cols-[215px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <nav aria-label="Settings sections" className="flex gap-2 overflow-x-auto pb-2 text-sm lg:flex-col lg:overflow-visible">
            {[
              ["account", UserRound, "Account"],
              ["preferences", SlidersHorizontal, "Preferences"],
              ["privacy", Shield, "Privacy"],
              ["data", Database, "Your data"],
              ["danger", LockKeyhole, "Account management"],
            ].map(([id, Icon, label]) => {
              const SectionIcon = Icon as typeof UserRound;
              return (
                <a
                  key={id as string}
                  href={`#${id}`}
                  className="flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-3 font-semibold text-slate-600 transition hover:bg-white hover:text-green-900 hover:shadow-sm"
                >
                  <SectionIcon className="h-4 w-4" aria-hidden="true" />{label as string}
                </a>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 space-y-7">
          <section id="account" className={`${sectionClass} scroll-mt-8`}>
            <SectionHeading icon={UserRound} title="Account & identity" description="Your TrailPicker account and the information associated with it." />
            <div className="flex flex-wrap items-center gap-4 px-5 py-6 sm:px-6">
              {user.image ? (
                <Image src={user.image} alt="" width={64} height={64} unoptimized className="h-16 w-16 rounded-2xl object-cover" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-900 text-2xl font-bold text-white">{initials}</div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold text-slate-950">{user.name || "TrailPicker explorer"}</p>
                <p className="truncate text-sm text-slate-500">{user.username ? `@${user.username}` : "No username yet"}</p>
                <p className="mt-1 text-xs text-slate-400">Member since {joined}</p>
              </div>
              <Link href="/profile/edit" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-green-900 hover:bg-emerald-50">
                Edit profile <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5 border-t border-slate-100 px-5 py-5 sm:grid-cols-2 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Email address</p>
                <p className="mt-1 break-all text-sm font-semibold text-slate-800">{user.email}</p>
                <p className="mt-1 text-xs text-slate-500">Managed by your sign-in provider</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Sign-in method</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold capitalize text-slate-800"><Fingerprint className="h-4 w-4 text-green-700" />{user.providers.join(", ") || "Connected account"}</p>
                <p className="mt-1 text-xs text-slate-500">No separate TrailPicker password is stored</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-slate-100 p-5 sm:p-6">
              <Link href="/profile/builds" className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 hover:bg-emerald-50">
                <Backpack className="h-5 w-5 text-green-800" /><span><strong className="block text-lg text-slate-950">{user.buildCount}</strong><span className="text-xs text-slate-500">Saved builds</span></span>
              </Link>
              <Link href="/profile/gear" className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 hover:bg-emerald-50">
                <Globe2 className="h-5 w-5 text-green-800" /><span><strong className="block text-lg text-slate-950">{user.gearCount}</strong><span className="text-xs text-slate-500">Owned gear items</span></span>
              </Link>
            </div>
          </section>

          <form action={saveAction} className="space-y-7">
            <section id="preferences" className={`${sectionClass} scroll-mt-8`}>
              <SectionHeading icon={Ruler} title="Measurement preferences" description="Choose how measurements appear. Your stored gear weights, route distances and weather data stay in their original units." />
              <div className="grid gap-5 px-5 py-6 sm:grid-cols-3 sm:px-6">
                <label className="block text-sm font-semibold text-slate-800">
                  Weight
                  <select name="weightUnit" className={selectClass} defaultValue={initialPreferences.weightUnit}>
                    <option value="metric">Metric · kg / g</option>
                    <option value="imperial">Imperial · lb / oz</option>
                  </select>
                </label>
                <label className="block text-sm font-semibold text-slate-800">
                  Distance
                  <select name="distanceUnit" className={selectClass} defaultValue={initialPreferences.distanceUnit}>
                    <option value="metric">Metric · km</option>
                    <option value="imperial">Imperial · miles</option>
                  </select>
                </label>
                <label className="block text-sm font-semibold text-slate-800">
                  Temperature
                  <select name="temperatureUnit" className={selectClass} defaultValue={initialPreferences.temperatureUnit}>
                    <option value="c">Celsius · °C</option>
                    <option value="f">Fahrenheit · °F</option>
                  </select>
                </label>
              </div>
              <p className="border-t border-slate-100 px-5 py-4 text-xs leading-relaxed text-slate-500 sm:px-6">
                Display units are used in the profile build cards and connected trip weather/summary panels. Trip-entry fields currently remain metric to avoid changing stored calculations.
              </p>
            </section>

            <section id="privacy" className={`${sectionClass} scroll-mt-8`}>
              <SectionHeading icon={Shield} title="Privacy & trip sharing" description="Control how future trips start and what profile visibility preference is stored." />
              <div className="divide-y divide-slate-100 p-2 sm:p-3">
                <ToggleRow
                  name="defaultBuildPublic"
                  title="New builds are public by default"
                  description="When enabled, new trips created while signed in can be opened by anyone with their share link, including route and location details. Existing trips will not be changed. Off is recommended."
                  defaultChecked={initialPreferences.defaultBuildPublic}
                />
                <ToggleRow
                  name="isProfilePublic"
                  title="Public profile preference"
                  description="Remember your choice for future public profile pages. TrailPicker does not currently publish a public profile page, so this setting does not make your profile publicly accessible yet."
                  defaultChecked={user.isProfilePublic}
                />
              </div>
              <div className="flex gap-2.5 border-t border-amber-100 bg-amber-50/60 px-5 py-4 text-xs leading-relaxed text-amber-950 sm:px-6">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Privacy settings do not override individual builds you have already shared. Review each build's visibility before sharing trip plans.
              </div>
            </section>

            <div className="sticky bottom-3 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/95 px-5 py-4 shadow-lg backdrop-blur sm:px-6">
              <p role="status" aria-live="polite" className={`flex min-w-0 items-center gap-2 text-sm ${saveState.status === "error" ? "text-red-700" : saveState.status === "success" ? "text-green-800" : "text-slate-500"}`}>
                {saveState.status === "success" ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : null}
                {saveState.message || "Changes take effect after you save."}
              </p>
              <button type="submit" disabled={saving} className="rounded-xl bg-green-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-800 disabled:cursor-wait disabled:opacity-60">
                {saving ? "Saving…" : "Save settings"}
              </button>
            </div>
          </form>

          <section id="data" className={`${sectionClass} scroll-mt-8`}>
            <SectionHeading icon={Database} title="Your TrailPicker data" description="Take a copy of what you've saved in your account." />
            <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-6">
              <div className="max-w-xl">
                <p className="font-semibold text-slate-900">Download account data</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">Export a JSON archive of your profile, settings, builds, itinerary days, gear library, favourites and reviews. This archive is for backup/reference, not a one-click import file.</p>
                <p className="mt-2 text-xs text-amber-800">Contains private trip locations, reservations and notes. Store the download somewhere safe.</p>
              </div>
              <a href="/settings/export" className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:border-green-700 hover:text-green-900">
                <ArrowDownToLine className="h-4 w-4" /> Download JSON
              </a>
            </div>
          </section>

          <section id="danger" className={`${sectionClass} scroll-mt-8`}>
            <SectionHeading icon={LockKeyhole} title="Account management" description="Manage your session or permanently close your TrailPicker account." />
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6">
              <div><p className="text-sm font-semibold text-slate-900">Sign out</p><p className="mt-1 text-sm text-slate-500">End your current TrailPicker session on this device.</p></div>
              <button type="button" onClick={() => signOut({ redirectTo: "/" })} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><LogOut className="h-4 w-4" />Sign out</button>
            </div>
            <div className="px-5 py-5 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-red-800">Delete account</p>
                  <p className="mt-1 max-w-lg text-sm leading-relaxed text-slate-500">Permanently delete your account, saved builds, owned gear list, favourites and reviews. Shared build links will stop working. This cannot be undone.</p>
                </div>
                <button type="button" aria-expanded={deleteOpen} onClick={() => setDeleteOpen(v => !v)} className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />{deleteOpen ? "Cancel" : "Delete account"}
                </button>
              </div>
              {deleteOpen && (
                <form action={deleteAction} className="mt-5 space-y-4 rounded-xl border border-red-200 bg-red-50/50 p-5">
                  <p className="text-sm font-bold text-red-900">This is permanent</p>
                  <p className="text-sm text-red-900">Download your data first if you want a copy. To proceed, type <strong>DELETE MY ACCOUNT</strong>.</p>
                  <label className="block text-sm font-semibold text-red-950">
                    Confirmation phrase
                    <input
                      type="text"
                      name="confirmation"
                      value={confirmation}
                      onChange={e => setConfirmation(e.target.value)}
                      autoComplete="off"
                      spellCheck={false}
                      className="mt-2 block w-full rounded-xl border border-red-300 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-300"
                      placeholder="DELETE MY ACCOUNT"
                    />
                  </label>
                  {deleteState.message && <p role="alert" className="text-sm text-red-800">{deleteState.message}</p>}
                  <button type="submit" disabled={deleting || confirmation !== "DELETE MY ACCOUNT"} className="rounded-xl bg-red-700 px-5 py-3 text-sm font-bold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50">
                    {deleting ? "Deleting…" : "Permanently delete my account"}
                  </button>
                </form>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

```

### `data/destinations.json`

```json
[
  {
    "id": "garibaldi-lake",
    "name": "Garibaldi Lake Campground",
    "park": "Garibaldi Park",
    "region": "Sea to Sky",
    "latitude": 49.942714,
    "longitude": -123.055079,
    "distanceKm": 9,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": 50,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "required",
    "featured": true,
    "summary": "Lakeside tent sites with cooking shelters, pit toilets, and food hangs.",
    "caution": "Reservations required year-round; no overnight use of day-use shelters.",
    "sourceUrl": "https://bcparks.ca/garibaldi-park/black-tusk-garibaldi-lake-area/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "taylor-meadows",
    "name": "Taylor Meadows Campground",
    "park": "Garibaldi Park",
    "region": "Sea to Sky",
    "latitude": 49.951435,
    "longitude": -123.076644,
    "distanceKm": 7.5,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": 40,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "required",
    "featured": true,
    "summary": "Meadow tent platforms with day-use shelters and food hangs.",
    "caution": "Reservations required year-round; carry out all garbage.",
    "sourceUrl": "https://bcparks.ca/garibaldi-park/black-tusk-garibaldi-lake-area/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "helm-creek",
    "name": "Helm Creek Campground",
    "park": "Garibaldi Park",
    "region": "Sea to Sky",
    "latitude": 49.995845,
    "longitude": -122.997353,
    "distanceKm": 8.5,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": 30,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "required",
    "featured": true,
    "summary": "Subalpine platforms beside Helm Creek, with pit toilets and food hangs.",
    "caution": "8.5 km via Cheakamus Lake trailhead; official pages disagree on pad count (9 versus 30).",
    "sourceUrl": "https://bcparks.ca/garibaldi-park/cheakamus-lake-area/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "cheakamus-lake",
    "name": "Cheakamus Lake Campground",
    "park": "Garibaldi Park",
    "region": "Sea to Sky",
    "latitude": 50.025415,
    "longitude": -122.947049,
    "distanceKm": 3,
    "elevationGainM": null,
    "difficulty": "easy",
    "tentSites": 8,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "required",
    "featured": true,
    "summary": "Forested lake-shore backcountry camping with pit toilets and food hangs.",
    "caution": "Reservation listing says 8 reservable pads; area description says 10 cleared sites.",
    "sourceUrl": "https://bcparks.ca/garibaldi-park/cheakamus-lake-area/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "singing-creek",
    "name": "Singing Creek Campground",
    "park": "Garibaldi Park",
    "region": "Sea to Sky",
    "latitude": 50.010499,
    "longitude": -122.912075,
    "distanceKm": 7,
    "elevationGainM": null,
    "difficulty": "easy",
    "tentSites": 6,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "required",
    "featured": false,
    "summary": "Small, forested campground farther along Cheakamus Lake.",
    "caution": "Reservation listing says 6 pads; area description says 7 cleared sites.",
    "sourceUrl": "https://bcparks.ca/garibaldi-park/cheakamus-lake-area/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "russet-lake",
    "name": "Russet Lake Campground",
    "park": "Garibaldi Park",
    "region": "Sea to Sky",
    "latitude": 50.023277,
    "longitude": -122.865984,
    "distanceKm": 14.5,
    "elevationGainM": 1250,
    "difficulty": "hard",
    "tentSites": 20,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "required",
    "featured": true,
    "summary": "High-alpine tent sites at Russet Lake with pit toilets and seasonal food hangs.",
    "caution": "Food hangs are removed in winter; BC Parks directs campers to the black storage box instead. Distance/elevation are via Singing Pass from Whistler Village.",
    "sourceUrl": "https://bcparks.ca/garibaldi-park/singing-pass-area/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "elfin-lakes",
    "name": "Elfin Lakes Campground",
    "park": "Garibaldi Park",
    "region": "Sea to Sky",
    "latitude": 49.789318,
    "longitude": -122.98781,
    "distanceKm": 11,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": 35,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "required",
    "featured": true,
    "summary": "Ridge-and-lake camping on tent platforms with food hangs and pit toilets.",
    "caution": "Separate Elfin Lakes Shelter bunk reservations are not part of this campground record.",
    "sourceUrl": "https://bcparks.ca/garibaldi-park/diamond-head-area/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "wedgemount-lake",
    "name": "Wedgemount Lake Campground",
    "park": "Garibaldi Park",
    "region": "Sea to Sky",
    "latitude": null,
    "longitude": null,
    "distanceKm": 7,
    "elevationGainM": 1200,
    "difficulty": "hard",
    "tentSites": 20,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "required",
    "featured": false,
    "summary": "Steep alpine approach to two camping areas with 10 pads each.",
    "caution": "The lower lakeshore toilet is seasonal; the upper toilet near the emergency hut remains available year-round.",
    "sourceUrl": "https://bcparks.ca/garibaldi-park/wedgemount-lake/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "rampart-ponds",
    "name": "Rampart Ponds Campground",
    "park": "Garibaldi Park",
    "region": "Sea to Sky",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 12,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "required",
    "featured": false,
    "summary": "Remote platforms with pit toilets and food storage beyond Elfin Lakes.",
    "caution": "Located roughly 10 km beyond the Elfin Lakes shelter; full approach varies by route.",
    "sourceUrl": "https://bcparks.ca/garibaldi-park/diamond-head-area/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "red-heather",
    "name": "Red Heather Campground (winter only)",
    "park": "Garibaldi Park",
    "region": "Sea to Sky",
    "latitude": null,
    "longitude": null,
    "distanceKm": 5,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 15,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "required",
    "featured": false,
    "summary": "Winter-only on-snow backcountry camping near Red Heather day-use shelter.",
    "caution": "Camping permitted December 1 through April 30 only; overnight use of the day shelter is not allowed.",
    "sourceUrl": "https://bcparks.ca/garibaldi-park/diamond-head-area/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "viewpoint-beach",
    "name": "Viewpoint Beach Campground",
    "park": "Golden Ears Park",
    "region": "Lower Mainland",
    "latitude": 49.365877,
    "longitude": -122.455543,
    "distanceKm": 4.5,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": 20,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "under-control",
    "reservations": "required",
    "featured": false,
    "summary": "Hike-in tent pads along West Canyon Trail with pit toilets and a bear cache.",
    "caution": "No campfires in Golden Ears hike-in backcountry; dogs must remain under control.",
    "sourceUrl": "https://bcparks.ca/golden-ears-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "hikers-beach",
    "name": "Hiker's Beach Campground",
    "park": "Golden Ears Park",
    "region": "Lower Mainland",
    "latitude": null,
    "longitude": null,
    "distanceKm": 5.3,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": 20,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "under-control",
    "reservations": "required",
    "featured": false,
    "summary": "Hike-in backcountry beach campsite along West Canyon Trail with bear cache.",
    "caution": "Pit toilets are confirmed by the park-wide backcountry facilities statement.",
    "sourceUrl": "https://bcparks.ca/golden-ears-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "alder-flats",
    "name": "Alder Flats Campground",
    "park": "Golden Ears Park",
    "region": "Lower Mainland",
    "latitude": 49.363611,
    "longitude": -122.471937,
    "distanceKm": 5.7,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": 10,
    "toilet": "yes",
    "foodStorage": "unknown",
    "dogs": "under-control",
    "reservations": "required",
    "featured": false,
    "summary": "Forested tent pads on West Canyon Trail with pit toilets.",
    "caution": "BC Parks does not list a bear cache at this site; plan food storage accordingly.",
    "sourceUrl": "https://bcparks.ca/golden-ears-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "halfmoon-beach",
    "name": "Halfmoon Beach Campground",
    "park": "Golden Ears Park",
    "region": "Lower Mainland",
    "latitude": null,
    "longitude": null,
    "distanceKm": 9.8,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": 30,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "under-control",
    "reservations": "required",
    "featured": false,
    "summary": "Riverside or beach-area hike-in camping along East Canyon Trail with pit toilets and bear cache.",
    "caution": "No campfires in the hike-in backcountry.",
    "sourceUrl": "https://bcparks.ca/golden-ears-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "panorama-ridge-golden-ears",
    "name": "Panorama Ridge Campground",
    "park": "Golden Ears Park",
    "region": "Lower Mainland",
    "latitude": null,
    "longitude": null,
    "distanceKm": 10.7,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 10,
    "toilet": "yes",
    "foodStorage": "unknown",
    "dogs": "under-control",
    "reservations": "required",
    "featured": false,
    "summary": "High-elevation tent pads beside the Golden Ears Trail, near the emergency shelter.",
    "caution": "Urine-diversion toilet on site; shelter is for emergencies, not regular overnight stays.",
    "sourceUrl": "https://bcparks.ca/golden-ears-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "east-beach-golden-ears",
    "name": "East Beach Campground",
    "park": "Golden Ears Park",
    "region": "Lower Mainland",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": 18,
    "toilet": "yes",
    "foodStorage": "unknown",
    "dogs": "under-control",
    "reservations": "required",
    "featured": false,
    "summary": "Reservable boat-access-only camping on the west shore of Alouette Lake with pit toilets.",
    "caution": "BOAT-ACCESS ONLY: not a hiking-trail destination. Exclude from hike-only filters.",
    "sourceUrl": "https://bcparks.ca/golden-ears-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "buckhorn",
    "name": "Buckhorn Campground",
    "park": "E.C. Manning Park",
    "region": "Manning",
    "latitude": 49.128864,
    "longitude": -120.755265,
    "distanceKm": 5,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": 24,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "leashed",
    "reservations": "peak-season",
    "featured": true,
    "summary": "Heather Trail subalpine meadows with tent pads, outhouses, shelter, and bear cache.",
    "caution": "Peak-season reservations required; campfires prohibited.",
    "sourceUrl": "https://bcparks.ca/ec-manning-park/backcountry-camping/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "kicking-horse-manning",
    "name": "Kicking Horse Campground",
    "park": "E.C. Manning Park",
    "region": "Manning",
    "latitude": 49.179725,
    "longitude": -120.808155,
    "distanceKm": 13.5,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 15,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "leashed",
    "reservations": "peak-season",
    "featured": true,
    "summary": "Remote Heather Trail meadow campground with outhouse and bear cache.",
    "caution": "Peak-season reservations required; campfires prohibited.",
    "sourceUrl": "https://bcparks.ca/ec-manning-park/backcountry-camping/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "frosty-creek",
    "name": "Frosty Creek Campground",
    "park": "E.C. Manning Park",
    "region": "Manning",
    "latitude": 49.030969,
    "longitude": -120.830183,
    "distanceKm": 7,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 9,
    "toilet": "yes",
    "foodStorage": "unknown",
    "dogs": "leashed",
    "reservations": "peak-season",
    "featured": true,
    "summary": "Strenuous Frosty Mountain Trail approach to nine pads and a pit toilet.",
    "caution": "At approximately 1,850 m; official description does not confirm a bear cache.",
    "sourceUrl": "https://bcparks.ca/ec-manning-park/backcountry-camping/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "upper-joffre-lake",
    "name": "Upper Joffre Lake Campground",
    "park": "Joffre Lakes Park",
    "region": "Sea to Sky",
    "latitude": 50.34403,
    "longitude": -122.47669,
    "distanceKm": 4.5,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": 26,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "required",
    "featured": true,
    "summary": "Glacial-lake campground with tent pads, urine-diversion toilet, and bear-proof locker.",
    "caution": "Reservations required for the camping season; no pets or campfires. Check Indigenous-led closures and park advisories.",
    "sourceUrl": "https://bcparks.ca/joffre-lakes-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "quiniscoe-lake",
    "name": "Quiniscoe Lake Campground",
    "park": "Cathedral Park",
    "region": "Okanagan-Similkameen",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 30,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "peak-season",
    "featured": false,
    "summary": "Thirty tent pads with four pit toilets and food caches near Quiniscoe Lake.",
    "caution": "FOOD CACHES ARE NOT BEAR-PROOF. Lake of the Woods and Pyramid Lake campgrounds remain closed following wildfire damage.",
    "sourceUrl": "https://bcparks.ca/cathedral-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "magog-lake",
    "name": "Magog Lake Campground",
    "park": "Mount Assiniboine Park",
    "region": "Canadian Rockies",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 40,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "leashed",
    "reservations": "peak-season",
    "featured": false,
    "summary": "Alpine campground with cooking areas, pit toilets, and food storage lockers.",
    "caution": "Remote hiking approaches differ significantly; check access and permits for adjacent national parks.",
    "sourceUrl": "https://bcparks.ca/mount-assiniboine-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "og-lake",
    "name": "Og Lake Campground",
    "park": "Mount Assiniboine Park",
    "region": "Canadian Rockies",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 10,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "leashed",
    "reservations": "peak-season",
    "featured": false,
    "summary": "Lakeside ten-pad campground with outhouse, food lockers, and cooking area.",
    "caution": "About 5 km from Magog Lake; this is not a trailhead-to-campground distance.",
    "sourceUrl": "https://bcparks.ca/mount-assiniboine-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "porcupine-assiniboine",
    "name": "Porcupine Campground",
    "park": "Mount Assiniboine Park",
    "region": "Canadian Rockies",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 10,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "leashed",
    "reservations": "peak-season",
    "featured": false,
    "summary": "Backcountry camping near Citadel Pass with pit toilet, kitchen area, and bear caches.",
    "caution": "Reservation required in peak season; route length depends on chosen approach.",
    "sourceUrl": "https://bcparks.ca/mount-assiniboine-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "kinney-lake-robson",
    "name": "Kinney Lake Campground",
    "park": "Mount Robson Park",
    "region": "Canadian Rockies",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": 18,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "peak-season",
    "featured": false,
    "summary": "Berg Lake Trail campground at Kinney Lake with pit toilet and bear-proof locker.",
    "caution": "Overnight dogs are prohibited. Campground is in BC near Jasper, not Jasper National Park.",
    "sourceUrl": "https://bcparks.ca/mount-robson-park/berg-lake-trail/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "whitehorn-robson",
    "name": "Whitehorn Campground",
    "park": "Mount Robson Park",
    "region": "Canadian Rockies",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 22,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "peak-season",
    "featured": false,
    "summary": "Berg Lake Trail campground with tent pads, pit toilets, and bear-proof food lockers.",
    "caution": "Overnight dogs are prohibited; check trail and bridge advisories.",
    "sourceUrl": "https://bcparks.ca/mount-robson-park/berg-lake-trail/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "emperor-falls-robson",
    "name": "Emperor Falls Campground",
    "park": "Mount Robson Park",
    "region": "Canadian Rockies",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 9,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "peak-season",
    "featured": false,
    "summary": "Small campground farther along Berg Lake Trail near Emperor Falls.",
    "caution": "Overnight dogs are prohibited; reserve during operating peak season.",
    "sourceUrl": "https://bcparks.ca/mount-robson-park/berg-lake-trail/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "marmot-robson",
    "name": "Marmot Campground",
    "park": "Mount Robson Park",
    "region": "Canadian Rockies",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 7,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "peak-season",
    "featured": false,
    "summary": "Small alpine campground along the Berg Lake Trail with lockers and pit toilets.",
    "caution": "Service availability changes outside the operating season.",
    "sourceUrl": "https://bcparks.ca/mount-robson-park/berg-lake-trail/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "berg-lake-robson",
    "name": "Berg Lake Campground",
    "park": "Mount Robson Park",
    "region": "Canadian Rockies",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 26,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "peak-season",
    "featured": false,
    "summary": "Twenty-six-pad campground beneath Mount Robson with pit toilets and bear-proof lockers.",
    "caution": "Check weather, terrain, and the latest trail reopening advisories.",
    "sourceUrl": "https://bcparks.ca/mount-robson-park/berg-lake-trail/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "rearguard-robson",
    "name": "Rearguard Campground",
    "park": "Mount Robson Park",
    "region": "Canadian Rockies",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 6,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "peak-season",
    "featured": false,
    "summary": "Six-pad campground beyond Berg Lake on the Berg Lake Trail.",
    "caution": "Off-season toilets are not maintained and facilities may not be serviced.",
    "sourceUrl": "https://bcparks.ca/mount-robson-park/berg-lake-trail/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "robson-pass-robson",
    "name": "Robson Pass Campground",
    "park": "Mount Robson Park",
    "region": "Canadian Rockies",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 15,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "peak-season",
    "featured": false,
    "summary": "High backcountry campground near Robson Pass with food lockers and pit toilets.",
    "caution": "Near the provincial boundary; check park and national-park access regulations.",
    "sourceUrl": "https://bcparks.ca/mount-robson-park/berg-lake-trail/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "nicomen-lake",
    "name": "Nicomen Lake Campground",
    "park": "E.C. Manning Park",
    "region": "Manning",
    "latitude": 49.226795,
    "longitude": -120.860587,
    "distanceKm": 23,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 6,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "leashed",
    "reservations": "check-current-rules",
    "featured": false,
    "summary": "A remote alpine-lake campground with a shelter, outhouse, and bear cache.",
    "caution": "The lake may remain frozen into early July.",
    "sourceUrl": "https://bcparks.ca/ec-manning-park/backcountry-camping/",
    "bookingUrl": null
  },
  {
    "id": "lindeman-lake-chilliwack",
    "name": "Lindeman Lake Campground",
    "park": "Sx̱ótsaqel/Chilliwack Lake Park",
    "region": "Lower Mainland",
    "latitude": null,
    "longitude": null,
    "distanceKm": 1.5,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": true,
    "summary": "Designated lakeside backcountry tenting area reached from the Post Creek trailhead.",
    "caution": "Backcountry permit registration required; registering does not reserve a tent pad. BC Parks reported only four usable pads after wind damage in June 2026; verify conditions before travel.",
    "sourceUrl": "https://bcparks.ca/sxotsaqel-chilliwack-lake-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "greendrop-lake-chilliwack",
    "name": "Greendrop Lake Campground",
    "park": "Sx̱ótsaqel/Chilliwack Lake Park",
    "region": "Lower Mainland",
    "latitude": null,
    "longitude": null,
    "distanceKm": 5.5,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "no",
    "foodStorage": "no",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": true,
    "summary": "Small designated backcountry camping area deeper in the Chilliwack Lake trail system.",
    "caution": "Permit registration is not a campsite reservation. BC Parks warns of stormfall and washouts beyond Lindeman Lake; check the current trail advisory.",
    "sourceUrl": "https://bcparks.ca/sxotsaqel-chilliwack-lake-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "flora-lake-chilliwack",
    "name": "Flora Lake Campground",
    "park": "Sx̱ótsaqel/Chilliwack Lake Park",
    "region": "Lower Mainland",
    "latitude": null,
    "longitude": null,
    "distanceKm": 7,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "no",
    "foodStorage": "no",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": false,
    "summary": "Remote alpine lake camping on the rugged Flora Lake trail.",
    "caution": "No toilet or supplied food cache. BC Parks describes the Greendrop-to-Flora trail as difficult to follow and suitable for experienced route finders.",
    "sourceUrl": "https://bcparks.ca/sxotsaqel-chilliwack-lake-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "radium-lake-chilliwack",
    "name": "Radium Lake Campground",
    "park": "Sx̱ótsaqel/Chilliwack Lake Park",
    "region": "Lower Mainland",
    "latitude": null,
    "longitude": null,
    "distanceKm": 6.5,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "no",
    "foodStorage": "no",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": false,
    "summary": "Backcountry tenting at Radium Lake above the Chilliwack Lake valley.",
    "caution": "Permit registration is required and does not reserve a specific campsite. No toilet or provided food cache.",
    "sourceUrl": "https://bcparks.ca/sxotsaqel-chilliwack-lake-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "strike-lake-manning",
    "name": "Strike Lake Campground",
    "park": "E.C. Manning Park",
    "region": "Manning",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "easy",
    "tentSites": 8,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": true,
    "summary": "Accessible woodland backcountry campground by Strike Lake on the Lightning Lake chain.",
    "caution": "Register for a backcountry permit; this is not an individually reserved campground.",
    "sourceUrl": "https://bcparks.ca/ec-manning-park/backcountry-camping/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "poland-lake-manning",
    "name": "Poland Lake Campground",
    "park": "E.C. Manning Park",
    "region": "Manning",
    "latitude": null,
    "longitude": null,
    "distanceKm": 8,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 6,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": true,
    "summary": "Alpine-lake campground with a shelter, toilets and a bear cache.",
    "caution": "The 8 km approach from Strawberry Flats is strenuous; snow can linger into July.",
    "sourceUrl": "https://bcparks.ca/ec-manning-park/backcountry-camping/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "mowich-manning",
    "name": "Mowich Campground",
    "park": "E.C. Manning Park",
    "region": "Manning",
    "latitude": null,
    "longitude": null,
    "distanceKm": 12.5,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 4,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": false,
    "summary": "Small Skyline II Trail camp at approximately 1,600 m.",
    "caution": "12.5 km is from Strawberry Flats. Water can be scarce in dry summers.",
    "sourceUrl": "https://bcparks.ca/ec-manning-park/backcountry-camping/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "pacific-crest-manning",
    "name": "Pacific Crest Campground",
    "park": "E.C. Manning Park",
    "region": "Manning",
    "latitude": null,
    "longitude": null,
    "distanceKm": 6.3,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": 4,
    "toilet": "yes",
    "foodStorage": "unknown",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": false,
    "summary": "Compact campground on the Pacific Crest Trail near the Frosty Mountain junction.",
    "caution": "6.3 km from the Windy Joe/Frosty Mountain trailhead; water opportunities beyond camp may be limited.",
    "sourceUrl": "https://bcparks.ca/ec-manning-park/backcountry-camping/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "monument-78-manning",
    "name": "Monument 78 Campground",
    "park": "E.C. Manning Park",
    "region": "Manning",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "unknown",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": false,
    "summary": "Designated camp just north of the Canada–US border on the Pacific Crest Trail.",
    "caution": "Campground access distance depends on your route. Check border rules and trail conditions.",
    "sourceUrl": "https://bcparks.ca/ec-manning-park/backcountry-camping/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "grainger-creek-manning",
    "name": "Grainger Creek Campground",
    "park": "E.C. Manning Park",
    "region": "Manning",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 3,
    "toilet": "yes",
    "foodStorage": "unknown",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": false,
    "summary": "Small horse-camp/backcountry site on the Hope Pass Trail near Grainger Creek.",
    "caution": "Horse-camp setting; trail access distance varies. BC Parks lists space for three tents.",
    "sourceUrl": "https://bcparks.ca/ec-manning-park/backcountry-camping/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "magnesia-meadows-cypress",
    "name": "Magnesia Meadows Wilderness Camping Area",
    "park": "Cypress Park",
    "region": "Lower Mainland",
    "latitude": null,
    "longitude": null,
    "distanceKm": 14.5,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "no",
    "dogs": "check-current-rules",
    "reservations": "check-current-rules",
    "featured": true,
    "summary": "Preferred wilderness camping area on the Howe Sound Crest Trail with an emergency shelter.",
    "caution": "Not a developed campground or a guaranteed tent pad. The sole HSCT rustic pit toilet is here; no food-storage facility is provided.",
    "sourceUrl": "https://bcparks.ca/cypress-park/",
    "bookingUrl": null
  },
  {
    "id": "brunswick-lake-cypress",
    "name": "Brunswick Lake Wilderness Camping Area",
    "park": "Cypress Park",
    "region": "Lower Mainland",
    "latitude": null,
    "longitude": null,
    "distanceKm": 19,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "no",
    "foodStorage": "no",
    "dogs": "check-current-rules",
    "reservations": "check-current-rules",
    "featured": true,
    "summary": "Preferred wilderness camping area beside Brunswick Lake on the Howe Sound Crest Trail.",
    "caution": "Not a developed campground. Emergency shelter is not accommodation; no toilet facilities or bear cache.",
    "sourceUrl": "https://bcparks.ca/cypress-park/",
    "bookingUrl": null
  },
  {
    "id": "deeks-lake-cypress",
    "name": "Deeks Lake Wilderness Camping Area",
    "park": "Cypress Park",
    "region": "Lower Mainland",
    "latitude": null,
    "longitude": null,
    "distanceKm": 22,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "no",
    "foodStorage": "no",
    "dogs": "check-current-rules",
    "reservations": "check-current-rules",
    "featured": false,
    "summary": "Preferred wilderness camping area near the north end of the Howe Sound Crest Trail.",
    "caution": "22 km is the south-to-north distance from Cypress Mountain Resort; shorter northern approaches exist. No toilet or food-storage facilities.",
    "sourceUrl": "https://bcparks.ca/cypress-park/",
    "bookingUrl": null
  },
  {
    "id": "tenquille-lake",
    "name": "Hawint / Tenquille Lake Tent Sites",
    "park": "Tenquille Lake Recreation Site",
    "region": "Sea to Sky",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 9,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "required",
    "featured": true,
    "summary": "Nine managed alpine tent sites at Hawint/Tenquille Lake near Pemberton.",
    "caution": "Operator booking required before arrival. Dogs are prohibited, camping is allowed only in designated sites, and access varies by trailhead.",
    "sourceUrl": "https://sitesandtrailsbc.ca/resource/REC0237",
    "bookingUrl": "https://pembertonwildlifeassociation.com/services/tenquille-lake-cabin/"
  },
  {
    "id": "floe-lake-rockwall",
    "name": "Floe Lake Campground",
    "park": "Kootenay National Park",
    "region": "Canadian Rockies",
    "latitude": null,
    "longitude": null,
    "distanceKm": 10.5,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "leashed",
    "reservations": "required",
    "featured": true,
    "summary": "Alpine lakeside tent pads at the south end of the Rockwall Trail.",
    "caution": "Reach from the Floe Lake trailhead; summer snow may persist. Parks Canada has issued wildlife warnings for Rockwall trails; check current bulletins.",
    "sourceUrl": "https://parks.canada.ca/pn-np/bc/kootenay/activ/arrierepays-backcountry",
    "bookingUrl": "https://reservation.pc.gc.ca"
  },
  {
    "id": "numa-creek-rockwall",
    "name": "Numa Creek Campground",
    "park": "Kootenay National Park",
    "region": "Canadian Rockies",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "leashed",
    "reservations": "required",
    "featured": false,
    "summary": "Forest backcountry campground on the Rockwall Trail.",
    "caution": "Numa Creek access trail closed until further notice in 2026 due to bridge washout. Check alternative approaches and live notices. Parks Canada has issued wildlife warnings for Rockwall trails; check current bulletins.",
    "sourceUrl": "https://parks.canada.ca/pn-np/bc/kootenay/activ/arrierepays-backcountry",
    "bookingUrl": "https://reservation.pc.gc.ca"
  },
  {
    "id": "tumbling-creek-rockwall",
    "name": "Tumbling Creek Campground",
    "park": "Kootenay National Park",
    "region": "Canadian Rockies",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "leashed",
    "reservations": "required",
    "featured": false,
    "summary": "Designated campground beside Tumbling Creek on the Rockwall route.",
    "caution": "Distance depends on trailhead/route; check backcountry booking and trail notices. Parks Canada has issued wildlife warnings for Rockwall trails; check current bulletins.",
    "sourceUrl": "https://parks.canada.ca/pn-np/bc/kootenay/activ/arrierepays-backcountry",
    "bookingUrl": "https://reservation.pc.gc.ca"
  },
  {
    "id": "helmet-falls-rockwall",
    "name": "Helmet Falls Campground",
    "park": "Kootenay National Park",
    "region": "Canadian Rockies",
    "latitude": null,
    "longitude": null,
    "distanceKm": 14.2,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "leashed",
    "reservations": "required",
    "featured": false,
    "summary": "Backcountry camp near the falls at the north end of the Rockwall route.",
    "caution": "14.2 km from Paint Pots via Helmet Creek Trail. Parks Canada has issued wildlife warnings for Rockwall trails; check current bulletins.",
    "sourceUrl": "https://parks.canada.ca/pn-np/bc/kootenay/activ/arrierepays-backcountry",
    "bookingUrl": "https://reservation.pc.gc.ca"
  },
  {
    "id": "helmet-ochre-junction-rockwall",
    "name": "Helmet/Ochre Junction Campground",
    "park": "Kootenay National Park",
    "region": "Canadian Rockies",
    "latitude": null,
    "longitude": null,
    "distanceKm": 5.8,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "leashed",
    "reservations": "required",
    "featured": false,
    "summary": "Designated campground at the Helmet Creek/Ochre Creek junction.",
    "caution": "5.8 km from Paint Pots on the Rockwall route; trail conditions vary. Parks Canada has issued wildlife warnings for Rockwall trails; check current bulletins.",
    "sourceUrl": "https://parks.canada.ca/pn-np/bc/kootenay/activ/arrierepays-backcountry",
    "bookingUrl": "https://reservation.pc.gc.ca"
  },
  {
    "id": "lake-ohara-yoho",
    "name": "Lake O’Hara Campground",
    "park": "Yoho National Park",
    "region": "Canadian Rockies",
    "latitude": null,
    "longitude": null,
    "distanceKm": 11,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": 30,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "required",
    "featured": true,
    "summary": "Highly sought-after backpacking campground with tent pads, outhouses and food lockers.",
    "caution": "11 km refers to the lake access road; booked campers normally use the Parks Canada shuttle. Advance campground reservations are essential.",
    "sourceUrl": "https://parks.canada.ca/pn-np/bc/yoho/activ/randonnee-hike/ohara/visit",
    "bookingUrl": "https://reservation.pc.gc.ca"
  },
  {
    "id": "hermit-meadows-glacier",
    "name": "Hermit Meadows Campground",
    "park": "Glacier National Park of Canada",
    "region": "Columbia Mountains",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 8,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "leashed",
    "reservations": "peak-season",
    "featured": true,
    "summary": "Steep alpine backcountry campground with eight sites and bear-proof storage.",
    "caution": "Reservable only during the published summer booking period; short approach is exceptionally steep.",
    "sourceUrl": "https://parks.canada.ca/pn-np/bc/glacier/activ/passez-stay",
    "bookingUrl": "https://reservation.pc.gc.ca"
  },
  {
    "id": "mystic-beach-jdf",
    "name": "Mystic Beach Campground",
    "park": "Juan de Fuca Park",
    "region": "Vancouver Island",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": true,
    "summary": "Beach camping area along the Juan de Fuca Marine Trail.",
    "caution": "Backcountry camping permit is required, but it does not reserve a specific site. Camp on beach rather than disturbing the forest; no individually reserved pads.",
    "sourceUrl": "https://bcparks.ca/juan-de-fuca-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "bear-beach-jdf",
    "name": "Bear Beach Campground",
    "park": "Juan de Fuca Park",
    "region": "Vancouver Island",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": false,
    "summary": "Coastal backcountry camping area on the Juan de Fuca Marine Trail.",
    "caution": "Backcountry camping permit is required, but it does not reserve a specific site. Expect tidal considerations and exposed beach travel.",
    "sourceUrl": "https://bcparks.ca/juan-de-fuca-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "chin-beach-jdf",
    "name": "Chin Beach Campground",
    "park": "Juan de Fuca Park",
    "region": "Vancouver Island",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": false,
    "summary": "Remote beach camping area on the Juan de Fuca Marine Trail.",
    "caution": "Backcountry camping permit is required, but it does not reserve a specific site. Plan around tides and slippery coastal trail sections.",
    "sourceUrl": "https://bcparks.ca/juan-de-fuca-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "sombrio-beach-jdf",
    "name": "Sombrio Beach Campground",
    "park": "Juan de Fuca Park",
    "region": "Vancouver Island",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": true,
    "summary": "Marine Trail beach camp with West Sombrio tent pads.",
    "caution": "Backcountry camping permit is required, but it does not reserve a specific site. Use the established West Sombrio tent pads where directed.",
    "sourceUrl": "https://bcparks.ca/juan-de-fuca-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "little-kuitsche-creek-jdf",
    "name": "Little Kuitsche Creek Campground",
    "park": "Juan de Fuca Park",
    "region": "Vancouver Island",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": false,
    "summary": "Forested backcountry campground on the Juan de Fuca Marine Trail.",
    "caution": "Backcountry camping permit is required, but it does not reserve a specific site. Use designated tent pads; campfires prohibited.",
    "sourceUrl": "https://bcparks.ca/juan-de-fuca-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "payzant-creek-jdf",
    "name": "Payzant Creek Campground",
    "park": "Juan de Fuca Park",
    "region": "Vancouver Island",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": false,
    "summary": "Forested backcountry campground on the Juan de Fuca Marine Trail.",
    "caution": "Backcountry camping permit is required, but it does not reserve a specific site. Use designated tent pads; no direct shoreline access; campfires prohibited.",
    "sourceUrl": "https://bcparks.ca/juan-de-fuca-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "circlet-lake-strathcona",
    "name": "Circlet Lake Campground",
    "park": "Strathcona Park",
    "region": "Vancouver Island",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "unknown",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": true,
    "summary": "Alpine basecamp on the Forbidden Plateau route toward Mount Albert Edward.",
    "caution": "Seasonal backcountry permit registration; permit does not reserve a tent pad. Food cache availability is not confirmed individually. BC Parks has conflicting area-wide campsite counts.",
    "sourceUrl": "https://bcparks.ca/strathcona-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "kwai-lake-strathcona",
    "name": "Kwai Lake Campground",
    "park": "Strathcona Park",
    "region": "Vancouver Island",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": 15,
    "toilet": "yes",
    "foodStorage": "unknown",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": true,
    "summary": "Designated lakeside camping accessible from the Paradise Meadows trail network.",
    "caution": "Seasonal backcountry permit registration; permit does not reserve a tent pad. Food cache availability is not confirmed individually. BC Parks has conflicting area-wide campsite counts.",
    "sourceUrl": "https://bcparks.ca/strathcona-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "helen-mackenzie-lake-strathcona",
    "name": "Lake Helen Mackenzie Campground",
    "park": "Strathcona Park",
    "region": "Vancouver Island",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "easy",
    "tentSites": 10,
    "toilet": "yes",
    "foodStorage": "unknown",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": false,
    "summary": "Designated backcountry camping in the Paradise Meadows area.",
    "caution": "Seasonal backcountry permit registration; permit does not reserve a tent pad. Food cache availability is not confirmed individually. BC Parks has conflicting area-wide campsite counts.",
    "sourceUrl": "https://bcparks.ca/strathcona-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "bedwell-lake-strathcona",
    "name": "Bedwell Lake Campground",
    "park": "Strathcona Park",
    "region": "Vancouver Island",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": 12,
    "toilet": "yes",
    "foodStorage": "unknown",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": false,
    "summary": "Designated tenting site along the Bedwell Lakes trail.",
    "caution": "Seasonal backcountry permit registration; permit does not reserve a tent pad. Food cache availability is not confirmed individually. BC Parks has conflicting area-wide campsite counts.",
    "sourceUrl": "https://bcparks.ca/strathcona-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "baby-bedwell-lake-strathcona",
    "name": "Baby Bedwell Lake Campground",
    "park": "Strathcona Park",
    "region": "Vancouver Island",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": 9,
    "toilet": "yes",
    "foodStorage": "unknown",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": false,
    "summary": "Smaller designated backcountry campground on the Bedwell Lakes trail.",
    "caution": "Seasonal backcountry permit registration; permit does not reserve a tent pad. Food cache availability is not confirmed individually. BC Parks has conflicting area-wide campsite counts.",
    "sourceUrl": "https://bcparks.ca/strathcona-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "nels-bight-cape-scott",
    "name": "Nels Bight Camping Area",
    "park": "Cape Scott Park",
    "region": "Vancouver Island",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": true,
    "summary": "Popular broad sandy-beach wilderness camping area near Cape Scott.",
    "caution": "Backcountry camping fee permit is not a tent-pad reservation. Beach wilderness camping; no individually reserved tent pad.",
    "sourceUrl": "https://bcparks.ca/cape-scott-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "nissen-bight-cape-scott",
    "name": "Nissen Bight Camping Area",
    "park": "Cape Scott Park",
    "region": "Vancouver Island",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": false,
    "summary": "Long coastal camping beach on the Cape Scott and North Coast trail network.",
    "caution": "Backcountry camping fee permit is not a tent-pad reservation. Beach wilderness camping; tide awareness required.",
    "sourceUrl": "https://bcparks.ca/cape-scott-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "san-josef-bay-cape-scott",
    "name": "San Josef Bay Camping Area",
    "park": "Cape Scott Park",
    "region": "Vancouver Island",
    "latitude": null,
    "longitude": null,
    "distanceKm": 2.5,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": true,
    "summary": "Short hike to a sweeping sandy beach with backcountry camping.",
    "caution": "Backcountry camping fee permit is not a tent-pad reservation. Beach wilderness camping; camp above high tide.",
    "sourceUrl": "https://bcparks.ca/cape-scott-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "guise-bay-cape-scott",
    "name": "Guise Bay Camping Area",
    "park": "Cape Scott Park",
    "region": "Vancouver Island",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": false,
    "summary": "Remote beach camping area in Cape Scott Park.",
    "caution": "Backcountry camping fee permit is not a tent-pad reservation. Beach wilderness camping; longer rough approach.",
    "sourceUrl": "https://bcparks.ca/cape-scott-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "eric-lake-cape-scott",
    "name": "Eric Lake Campground",
    "park": "Cape Scott Park",
    "region": "Vancouver Island",
    "latitude": null,
    "longitude": null,
    "distanceKm": 3,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": false,
    "summary": "Established forest campground with tent pads near the start of Cape Scott Trail.",
    "caution": "Backcountry camping fee permit is not a tent-pad reservation. BC Parks pages disagree on tent pad counts (11 on park overview; 8 on hiking page); count left blank pending confirmation.",
    "sourceUrl": "https://bcparks.ca/cape-scott-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "fisherman-river-cape-scott",
    "name": "Fisherman River Campground",
    "park": "Cape Scott Park",
    "region": "Vancouver Island",
    "latitude": null,
    "longitude": null,
    "distanceKm": 9.3,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 3,
    "toilet": "yes",
    "foodStorage": "no",
    "dogs": "check-current-rules",
    "reservations": "permit",
    "featured": false,
    "summary": "Small trail campground beside Fisherman River.",
    "caution": "Backcountry camping fee permit is not a tent-pad reservation. Has a pit toilet but explicitly no food cache; secure food independently.",
    "sourceUrl": "https://bcparks.ca/cape-scott-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "kaslo-lake-kokanee",
    "name": "Kaslo Lake Campground",
    "park": "Kokanee Glacier Park",
    "region": "West Kootenay",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "permit",
    "featured": true,
    "summary": "Alpine tent-pad campground with a cooking shelter and secure food storage.",
    "caution": "BC Parks park overview lists 10 tent pads while its hiking guide lists 8; capacity intentionally left blank pending confirmation. Check access road.",
    "sourceUrl": "https://bcparks.ca/kokanee-glacier-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "tanal-lake-kokanee",
    "name": "Tanal Lake Campground",
    "park": "Kokanee Glacier Park",
    "region": "West Kootenay",
    "latitude": null,
    "longitude": null,
    "distanceKm": 6.4,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": 2,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "permit",
    "featured": false,
    "summary": "Small alpine tenting area near Tanal Lake with food cache.",
    "caution": "6.4 km via Enterprise Creek trail, which BC Parks says is no longer regularly maintained.",
    "sourceUrl": "https://bcparks.ca/kokanee-glacier-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "applebee-dome-bugaboo",
    "name": "Applebee Dome Campground",
    "park": "Bugaboo Park",
    "region": "Purcell Mountains",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "unknown",
    "dogs": "not-allowed",
    "reservations": "permit",
    "featured": true,
    "summary": "High-alpine campground on the rock slabs above Conrad Kain Hut.",
    "caution": "Extremely exposed alpine conditions. Permit registration is required, but a tent site is not reserved.",
    "sourceUrl": "https://bcparks.ca/bugaboo-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "boulder-camp-bugaboo",
    "name": "Boulder Campground",
    "park": "Bugaboo Park",
    "region": "Purcell Mountains",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "unknown",
    "dogs": "not-allowed",
    "reservations": "permit",
    "featured": false,
    "summary": "Designated campground below Conrad Kain Hut in the Bugaboo alpine area.",
    "caution": "Steep access, exposed alpine environment, and permit registration required.",
    "sourceUrl": "https://bcparks.ca/bugaboo-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "lower-elk-lake",
    "name": "Lower Elk Lake Campground",
    "park": "Elk Lakes Park",
    "region": "Canadian Rockies",
    "latitude": null,
    "longitude": null,
    "distanceKm": 1,
    "elevationGainM": null,
    "difficulty": "easy",
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "leashed",
    "reservations": "permit",
    "featured": true,
    "summary": "Short hike-in campground by Lower Elk Lake with pads, toilet and food cache.",
    "caution": "Backcountry permit registration required. One-kilometre approach is from the Elk Lakes parking lot.",
    "sourceUrl": "https://bcparks.ca/elk-lakes-park/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "abruzzi-lake",
    "name": "Abruzzi Lake Campground",
    "park": "Elk Lakes Park",
    "region": "Canadian Rockies",
    "latitude": null,
    "longitude": null,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "hard",
    "tentSites": 2,
    "toilet": "yes",
    "foodStorage": "unknown",
    "dogs": "leashed",
    "reservations": "check-current-rules",
    "featured": false,
    "summary": "Small remote campground in the Cadorna Creek watershed.",
    "caution": "BC Parks states no permit or camping fee required. Rough remote access; verify current trail conditions.",
    "sourceUrl": "https://bcparks.ca/elk-lakes-park/",
    "bookingUrl": null
  }
]

```

### `docs.config.json`

```json
{
  "output": "PROJECT_CONTEXT.md",
  "includeExtensions": [
    ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
    ".json", ".jsonc", ".md", ".mdx", ".css", ".scss", ".html",
    ".yaml", ".yml", ".toml", ".ini", ".txt",
    ".env.example", ".gitignore", ".npmrc", ".prisma"
  ],
  "ignoreDirs": [
    ".git", "node_modules", "dist", "coverage",
    ".cache", ".next", ".turbo", ".vite", "out", "target", "generated"
  ],
  "ignoreFiles": [
    "PROJECT_CONTEXT.md", "PROJECT_STRUCTURE.md", ".env"
  ],
  "maxFileBytes": 300000,
  "includeLockfiles": false,
  "includeHiddenFiles": true
}

```

### `eslint.config.mjs`

```typescript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  { files: ["tests/**/*.cjs"], rules: { "@typescript-eslint/no-require-imports": "off" } },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

```

### `lib/build-access.ts`

```typescript
import "server-only";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { createGuestBuildToken, guestBuildCookieName, GUEST_BUILD_MAX_AGE, verifyGuestBuildToken } from "@/lib/guest-build-token";

export async function currentBuildUserId(): Promise<string | null> {
  const session = await auth();
  // Resolve through the DB, consistent with existing profile actions. Default
  // Auth.js sessions need not expose the adapter user ID without a callback.
  if (!session?.user?.email) return null;
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }, select: { id: true },
  });
  return user?.id ?? null;
}

export async function hasGuestBuildAccess(buildId: string) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200) return false;
  const cookieStore = await cookies();
  return verifyGuestBuildToken(buildId, cookieStore.get(guestBuildCookieName(buildId))?.value);
}

export async function findAccessibleBuild(buildId: string) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200) return null;
  const userId = await currentBuildUserId();
  const guest = await hasGuestBuildAccess(buildId);
  // currentBuild is navigation state, never authorization.
  if (!userId && !guest) return null;
  return prisma.build.findFirst({
    where: { id: buildId, OR: [
      ...(userId ? [{ userId }] : []),
      ...(guest ? [{ userId: null }] : []),
    ] },
    select: { id: true, userId: true },
  });
}

export async function requireBuildAccess(buildId: string) {
  const build = await findAccessibleBuild(buildId);
  if (!build) throw new Error("Build not found.");
  return build;
}

export async function requireBuildPageAccess(buildId: string) {
  const build = await findAccessibleBuild(buildId);
  if (!build) notFound();
  return build;
}

export async function requireBuildItemAccess(buildId: string, itemId: string) {
  if (typeof itemId !== "string" || !itemId || itemId.length > 200) throw new Error("Item not found.");
  const build = await requireBuildAccess(buildId);
  const item = await prisma.buildItem.findFirst({
    where: { id: itemId, buildId: build.id, build: { userId: build.userId } },
  });
  if (!item) throw new Error("Item not found.");
  return { ...item, accessUserId: build.userId };
}

export async function requireTripDayAccess(buildId: string, dayId: string) {
  if (typeof dayId !== "string" || !dayId || dayId.length > 200) throw new Error("Day not found.");
  const build = await requireBuildAccess(buildId);
  const day = await prisma.tripDay.findFirst({
    where: { id: dayId, buildId: build.id, build: { userId: build.userId } },
  });
  if (!day) throw new Error("Day not found.");
  return { ...day, accessUserId: build.userId };
}

export async function setCurrentBuild(buildId: string, guest = false) {
  const cookieStore = await cookies();
  const options = { httpOnly: true, sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production", path: "/", maxAge: GUEST_BUILD_MAX_AGE };
  if (guest) cookieStore.set(guestBuildCookieName(buildId), createGuestBuildToken(buildId), options);
  cookieStore.set("currentBuild", buildId, options);
}

```

### `lib/build-history-actions.ts`

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { randomUUID } from "node:crypto";
import { remapRouteDays, validatedRoute } from "@/lib/itinerary-links";
import { requireBuildAccess } from "@/lib/build-access";
import { parseLogistics } from "@/lib/build-validation";
import {
  ensureBuildRevisionBaseline,
  getBuildSnapshot,
  mutateBuildWithRevision,
  recordBuildRevision,
  snapshotsEqual,
  type BuildSnapshot,
  type BuildSnapshotDay,
  type BuildSnapshotItem,
} from "@/lib/build-history";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseSnapshot(value: unknown): BuildSnapshot {
  if (!isRecord(value) || typeof value.name !== "string" || !Array.isArray(value.items) || !Array.isArray(value.days)) {
    throw new Error("This history entry can’t be restored.");
  }
  return value as unknown as BuildSnapshot;
}

function dateOrNull(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error("This history entry contains an invalid date.");
  return date;
}

function safeItem(item: BuildSnapshotItem) {
  return {
    gearId: typeof item.gearId === "string" ? item.gearId : null,
    gearName: typeof item.gearName === "string" ? item.gearName : null,
    quantity: Number.isInteger(item.quantity) && item.quantity > 0 ? Math.min(item.quantity, 999) : 1,
    isConsumable: Boolean(item.isConsumable),
    isWorn: Boolean(item.isWorn),
    customCategory: typeof item.customCategory === "string" ? item.customCategory.slice(0, 100) : null,
    gearNameSnapshot: typeof item.gearNameSnapshot === "string" ? item.gearNameSnapshot.slice(0, 200) : null,
    weightSnapshot: Number.isFinite(item.weightSnapshot) ? item.weightSnapshot : null,
    priceSnapshot: Number.isFinite(item.priceSnapshot) ? item.priceSnapshot : null,
  };
}

function safeDay(day: BuildSnapshotDay) {
  const date = new Date(day.date);
  if (Number.isNaN(date.getTime())) throw new Error("This history entry contains an invalid itinerary date.");
  const { id: sourceId, ...fields } = day;
  void sourceId;
  return { ...fields, date, id: randomUUID() };
}

function snapshotMeta(value: unknown) {
  const snapshot = isRecord(value) ? value : null;
  return {
    itemCount: snapshot && Array.isArray(snapshot.items) ? snapshot.items.length : 0,
    dayCount: snapshot && Array.isArray(snapshot.days) ? snapshot.days.length : 0,
    name: snapshot && typeof snapshot.name === "string" ? snapshot.name : "Build",
  };
}

export async function getBuildHistory(buildId: string) {
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(access.id, access.userId);

  const revisions = await prisma.buildRevision.findMany({
    where: { buildId: access.id },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: 60,
    select: { id: true, action: true, summary: true, snapshot: true, createdAt: true },
  });

  return revisions.map((revision, index) => ({
    id: revision.id,
    action: revision.action,
    summary: revision.summary,
    createdAt: revision.createdAt.toISOString(),
    ...snapshotMeta(revision.snapshot),
    isCurrent: index === 0,
  }));
}

async function restoreSnapshot(
  access: { id: string; userId: string | null },
  revisionId: string,
  summary: string,
  expectedLatestId?: string,
  expectedLatestSnapshot?: unknown,
) {
  let unassignedStops = 0;
  await mutateBuildWithRevision(access.id, access.userId, "restore", summary, async tx => {
    const revision = await tx.buildRevision.findFirst({
      where: { id: revisionId, buildId: access.id }, select: { snapshot: true },
    });
    if (!revision) throw new Error("History entry not found.");
    const snapshot = parseSnapshot(revision.snapshot);
    if (snapshot.items.length > 1000 || snapshot.days.length > 366) throw new Error("This history entry is too large to restore.");

    const items = snapshot.items.map(safeItem);
    const days = snapshot.days.map(safeDay);
    const linked = remapRouteDays(
      validatedRoute(snapshot.routeWaypoints),
      snapshot.days.map(day => ({ id: day.id, date: day.date })),
      days,
    );
    unassignedStops = linked.unassignedCount;
    const logistics = parseLogistics(snapshot.tripLogistics);

    const latest = await tx.buildRevision.findFirst({
      where: { buildId: access.id },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      select: { id: true, snapshot: true },
    });
    if (expectedLatestId && (latest?.id !== expectedLatestId || JSON.stringify(latest?.snapshot) !== JSON.stringify(expectedLatestSnapshot))) {
      throw new Error("Build history changed. Refresh before undoing.");
    }
    const current = await getBuildSnapshot(access.id, access.userId, tx);
    if (!latest || !isRecord(latest.snapshot) || !snapshotsEqual(current, parseSnapshot(latest.snapshot))) {
      // Both the safety snapshot and restore are in the SAME transaction.
      await recordBuildRevision(access.id, access.userId, "history", "Saved before restore", tx);
    }

    const requestedGearIds = [...new Set(items.map(item => item.gearId).filter((id): id is string => Boolean(id)))];
    const existingGear = requestedGearIds.length
      ? await tx.gear.findMany({ where: { id: { in: requestedGearIds } }, select: { id: true } }) : [];
    const existingGearIds = new Set(existingGear.map(gear => gear.id));

    await tx.build.update({
      where: { id: access.id, userId: access.userId },
      data: {
        name: snapshot.name.slice(0, 100) || "Restored build",
        destinationId: snapshot.destinationId ?? null,
        location: snapshot.location ?? null,
        locationLat: snapshot.locationLat ?? null,
        locationLng: snapshot.locationLng ?? null,
        startDate: dateOrNull(snapshot.startDate),
        endDate: dateOrNull(snapshot.endDate),
        people: Number.isInteger(snapshot.people) && snapshot.people > 0 ? Math.min(snapshot.people, 100) : 1,
        minTemperature: Number.isFinite(snapshot.minTemperature) ? snapshot.minTemperature : null,
        conditions: snapshot.conditions ?? null,
        routeWaypoints: linked.points == null ? Prisma.DbNull : JSON.parse(JSON.stringify(linked.points)),
        tripLogistics: logistics == null ? Prisma.DbNull : logistics,
      },
    });
    await tx.buildItem.deleteMany({ where: { buildId: access.id } });
    for (const item of items) {
      const gearId = item.gearId && existingGearIds.has(item.gearId) ? item.gearId : null;
      await tx.buildItem.create({
        data: {
          buildId: access.id, gearId, quantity: item.quantity,
          isConsumable: item.isConsumable, isWorn: item.isWorn,
          customCategory: item.customCategory,
          gearNameSnapshot: gearId ? item.gearNameSnapshot : item.gearNameSnapshot ?? item.gearName ?? "Restored item",
          weightSnapshot: item.weightSnapshot, priceSnapshot: item.priceSnapshot,
        },
      });
    }
    await tx.tripDay.deleteMany({ where: { buildId: access.id } });
    if (days.length) {
      await tx.tripDay.createMany({ data: days.map(day => ({ ...day, buildId: access.id })) });
    }
  });
  revalidatePath(`/build/${access.id}`);
  revalidatePath("/profile/builds");
  return { ok: true, unassignedStops };
}

export async function restoreBuildRevision(buildId: string, revisionId: string) {
  const access = await requireBuildAccess(buildId);
  if (typeof revisionId !== "string" || !revisionId || revisionId.length > 200) {
    throw new Error("Invalid history entry.");
  }

  const revision = await prisma.buildRevision.findFirst({
    where: { id: revisionId, buildId: access.id },
    select: { id: true, snapshot: true, createdAt: true, summary: true },
  });
  if (!revision) throw new Error("History entry not found.");

  const restoredDate = revision.createdAt.toLocaleString("en-CA", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  return restoreSnapshot(access, revision.id, `Restored ${restoredDate}`);
}

export async function undoLastBuildChange(buildId: string) {
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(access.id, access.userId);

  const revisions = await prisma.buildRevision.findMany({
    where: { buildId: access.id },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: 2,
    select: { id: true, snapshot: true, createdAt: true, summary: true },
  });
  if (revisions.length < 2) throw new Error("Nothing to undo yet.");

  const target = revisions[1];
  const result = await restoreSnapshot(access, target.id, `Undid: ${revisions[0].summary}`, revisions[0].id, revisions[0].snapshot);
  return { ...result, undone: revisions[0].summary };
}

```

### `lib/build-history.ts`

```typescript
import "server-only";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/app/generated/prisma/client";

export type BuildDb = Prisma.TransactionClient;

// All build mutations take this lock before touching a build. One lock per build,
// released automatically at COMMIT/ROLLBACK; no migration required.
export async function lockBuild(tx: BuildDb, buildId: string) {
  await tx.$queryRaw`SELECT 1 AS locked FROM pg_advisory_xact_lock(hashtextextended(${buildId}, 0))`;
}


export type BuildSnapshotItem = {
  gearId: string | null;
  gearName: string | null;
  quantity: number;
  isConsumable: boolean;
  isWorn: boolean;
  customCategory: string | null;
  gearNameSnapshot: string | null;
  weightSnapshot: number | null;
  priceSnapshot: number | null;
};

export type BuildSnapshotDay = {
  // Optional for history entries made before v0.3 link preservation.
  id?: string;
  date: string;
  minTemperature: number | null;
  conditions: string | null;
  notes: string | null;
  startLocation: string | null;
  endLocation: string | null;
  distanceKm: number | null;
  elevationGainM: number | null;
  elevationLossM: number | null;
  durationMinutes: number | null;
  campsite: string | null;
  reservation: string | null;
  waterSource: string | null;
  waterCarryL: number | null;
  trailConditions: string | null;
  activities: string | null;
};

export type BuildSnapshot = {
  name: string;
  destinationId: string | null;
  location: string | null;
  locationLat: number | null;
  locationLng: number | null;
  startDate: string | null;
  endDate: string | null;
  people: number;
  minTemperature: number | null;
  conditions: string | null;
  routeWaypoints: unknown;
  tripLogistics: unknown;
  items: BuildSnapshotItem[];
  days: BuildSnapshotDay[];
};

function stable(value: unknown) {
  return JSON.stringify(value ?? null);
}

export function snapshotsEqual(a: BuildSnapshot, b: BuildSnapshot) {
  return stable(a) === stable(b);
}

function itemKey(item: BuildSnapshotItem) {
  if (item.gearId) return `gear:${item.gearId}`;
  return `custom:${item.customCategory ?? ""}:${item.gearNameSnapshot ?? item.gearName ?? ""}`;
}

function itemName(item: BuildSnapshotItem) {
  return item.gearName ?? item.gearNameSnapshot ?? "gear item";
}

function cleanName(name: string) {
  return name.length > 48 ? `${name.slice(0, 45)}…` : name;
}

function prettyDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "itinerary day";
  return date.toLocaleDateString("en-CA", { month: "short", day: "numeric" });
}

function changedDay(previous: BuildSnapshot, current: BuildSnapshot) {
  if (previous.days.length !== current.days.length) return null;
  const changed = current.days.filter((day, index) => stable(day) !== stable(previous.days[index]));
  return changed.length === 1 ? changed[0] : null;
}

function changedItem(previous: BuildSnapshot, current: BuildSnapshot) {
  const before = new Map(previous.items.map((item) => [itemKey(item), item]));
  const after = new Map(current.items.map((item) => [itemKey(item), item]));
  const added = current.items.filter((item) => !before.has(itemKey(item)));
  const removed = previous.items.filter((item) => !after.has(itemKey(item)));
  const changed = current.items
    .map((item) => ({ before: before.get(itemKey(item)), after: item }))
    .filter((pair): pair is { before: BuildSnapshotItem; after: BuildSnapshotItem } => Boolean(pair.before) && stable(pair.before) !== stable(pair.after));
  return { added, removed, changed };
}

function summarizeChange(previous: BuildSnapshot | null, current: BuildSnapshot, action: string, fallback: string) {
  if (!previous || ["create", "copy", "import", "restore", "history", "baseline"].includes(action)) return fallback;

  if (previous.name !== current.name) return `Renamed build to “${current.name}”`;

  const items = changedItem(previous, current);
  if (items.added.length === 1 && items.removed.length === 0 && items.changed.length === 0) {
    return `Added ${cleanName(itemName(items.added[0]))}`;
  }
  if (items.removed.length === 1 && items.added.length === 0 && items.changed.length === 0) {
    return `Removed ${cleanName(itemName(items.removed[0]))}`;
  }
  if (items.changed.length === 1 && items.added.length === 0 && items.removed.length === 0) {
    const { before, after } = items.changed[0];
    const name = cleanName(itemName(after));
    if (before.quantity !== after.quantity) return `Changed ${name} quantity to ${after.quantity}`;
    if (before.isWorn !== after.isWorn || before.isConsumable !== after.isConsumable) {
      if (after.isWorn) return `Marked ${name} as worn`;
      if (after.isConsumable) return `Marked ${name} as consumable`;
      return `Marked ${name} as base weight`;
    }
  }

  const day = changedDay(previous, current);
  if (day) return `Updated ${prettyDate(day.date)} itinerary`;

  if (stable(previous.routeWaypoints) !== stable(current.routeWaypoints)) return "Updated route";
  if (stable(previous.tripLogistics) !== stable(current.tripLogistics)) return "Updated trip logistics";

  const datesChanged = previous.startDate !== current.startDate || previous.endDate !== current.endDate;
  const locationChanged = previous.location !== current.location || previous.locationLat !== current.locationLat || previous.locationLng !== current.locationLng;
  const tripSettingsChanged = previous.people !== current.people || previous.minTemperature !== current.minTemperature || previous.conditions !== current.conditions || previous.destinationId !== current.destinationId;
  if (datesChanged && !locationChanged && !tripSettingsChanged) return "Changed trip dates";
  if (locationChanged && !datesChanged && !tripSettingsChanged) return "Changed trip location";
  if (datesChanged || locationChanged || tripSettingsChanged || previous.days.length !== current.days.length) return "Updated trip details";

  return fallback;
}

function summaryGroupKey(summary: string) {
  return summary
    .replace(/ quantity to \d+$/i, " quantity")
    .replace(/^Updated [A-Z][a-z]{2} \d{1,2} itinerary$/i, (value) => value)
    .toLowerCase();
}

function canCoalesce(action: string, previousAction: string, previousSummary: string, nextSummary: string, previousCreatedAt: Date) {
  if (["create", "copy", "import", "restore", "history", "baseline", "settings", "analysis"].includes(action)) return false;
  if (action !== previousAction) return false;
  if (Date.now() - previousCreatedAt.getTime() > 90_000) return false;
  return summaryGroupKey(previousSummary) === summaryGroupKey(nextSummary);
}

export async function getBuildSnapshot(buildId: string, userId: string | null, db: BuildDb | typeof prisma = prisma): Promise<BuildSnapshot> {
  const build = await db.build.findUnique({
    where: { id: buildId, userId },
    include: {
      items: {
        orderBy: { id: "asc" },
        include: { gear: { select: { name: true } } },
      },
      days: { orderBy: { date: "asc" } },
    },
  });

  if (!build) throw new Error("Build not found.");

  return {
    name: build.name,
    destinationId: build.destinationId,
    location: build.location,
    locationLat: build.locationLat,
    locationLng: build.locationLng,
    startDate: build.startDate?.toISOString() ?? null,
    endDate: build.endDate?.toISOString() ?? null,
    people: build.people,
    minTemperature: build.minTemperature,
    conditions: build.conditions,
    routeWaypoints: build.routeWaypoints ?? null,
    tripLogistics: build.tripLogistics ?? null,
    items: build.items.map((item) => ({
      gearId: item.gearId,
      gearName: item.gear?.name ?? item.gearNameSnapshot,
      quantity: item.quantity,
      isConsumable: item.isConsumable,
      isWorn: item.isWorn,
      customCategory: item.customCategory,
      gearNameSnapshot: item.gearNameSnapshot,
      weightSnapshot: item.weightSnapshot,
      priceSnapshot: item.priceSnapshot,
    })),
    days: build.days.map((day) => ({
      id: day.id,
      date: day.date.toISOString(),
      minTemperature: day.minTemperature,
      conditions: day.conditions,
      notes: day.notes,
      startLocation: day.startLocation,
      endLocation: day.endLocation,
      distanceKm: day.distanceKm,
      elevationGainM: day.elevationGainM,
      elevationLossM: day.elevationLossM,
      durationMinutes: day.durationMinutes,
      campsite: day.campsite,
      reservation: day.reservation,
      waterSource: day.waterSource,
      waterCarryL: day.waterCarryL,
      trailConditions: day.trailConditions,
      activities: day.activities,
    })),
  };
}

// Calling this directly is safe too: it acquires the same lock as mutation actions.
export async function ensureBuildRevisionBaseline(buildId: string, userId: string | null, db?: BuildDb): Promise<void> {
  if (!db) {
    await prisma.$transaction(async (tx) => {
      await lockBuild(tx, buildId);
      await ensureBuildRevisionBaseline(buildId, userId, tx);
    });
    return;
  }
  const exists = await db.buildRevision.findFirst({ where: { buildId }, select: { id: true } });
  if (exists) return;
  const snapshot = await getBuildSnapshot(buildId, userId, db);
  await db.buildRevision.create({
    data: { buildId, action: "baseline", summary: "First saved version", snapshot: JSON.parse(JSON.stringify(snapshot)) },
  });
}

/** Change, baseline and resulting revision are committed or rolled back together.
 * PostgreSQL transaction-scoped advisory locks serialize writers for one build.
 */
export async function mutateBuildWithRevision<T>(
  buildId: string,
  userId: string | null,
  action: string,
  summary: string,
  mutate: (tx: BuildDb) => Promise<T>,
): Promise<T> {
  return prisma.$transaction(async (tx) => {
    await lockBuild(tx, buildId);
    const build = await tx.build.findUnique({ where: { id: buildId, userId }, select: { id: true } });
    if (!build) throw new Error("Build access changed. Refresh and try again.");
    await ensureBuildRevisionBaseline(buildId, userId, tx);
    const result = await mutate(tx);
    await recordBuildRevision(buildId, userId, action, summary, tx);
    return result;
  }, { timeout: 60_000 });
}

export async function recordBuildRevision(
  buildId: string,
  userId: string | null,
  action: string,
  requestedSummary: string,
  db?: BuildDb,
): Promise<string> {
  if (!db) {
    return prisma.$transaction(async (tx) => {
      await lockBuild(tx, buildId);
      return recordBuildRevision(buildId, userId, action, requestedSummary, tx);
    });
  }

  await db.build.update({ where: { id: buildId, userId }, data: { updatedAt: new Date() } });
  const last = await db.buildRevision.findFirst({
    where: { buildId },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    select: { id: true, action: true, summary: true, snapshot: true, createdAt: true },
  });
  const previous = last?.snapshot && typeof last.snapshot === "object" && !Array.isArray(last.snapshot)
    ? last.snapshot as unknown as BuildSnapshot : null;
  const snapshot = await getBuildSnapshot(buildId, userId, db);
  const summary = summarizeChange(previous, snapshot, action, requestedSummary).slice(0, 240);
  const safeAction = action.slice(0, 50);
  const jsonSnapshot = JSON.parse(JSON.stringify(snapshot));

  if (last && canCoalesce(safeAction, last.action, last.summary, summary, last.createdAt)) {
    await db.buildRevision.update({
      where: { id: last.id },
      // Preserve the original timestamp so the display and coalescing window
      // describe when this group started, rather than resetting every save.
      data: { summary, snapshot: jsonSnapshot },
    });
    return last.id;
  }

  const revision = await db.buildRevision.create({
    data: { buildId, action: safeAction, summary, snapshot: jsonSnapshot },
    select: { id: true },
  });
  return revision.id;
}

```

### `lib/build-save-status.ts`

```typescript
"use client";

export type SaveSnapshot = { state: "saved" | "waiting" | "saving" | "error"; message: string };
type Entry = { pending: number; dirty: boolean; error: string; version: number; message: string };
type BuildState = { entries: Map<string, Entry>; snapshot: SaveSnapshot };
const saved: SaveSnapshot = { state: "saved", message: "Changes saved" };
const builds = new Map<string, BuildState>();
const listeners = new Set<() => void>();
function build(id: string) {
  let value = builds.get(id);
  if (!value) { value = { entries: new Map(), snapshot: saved }; builds.set(id, value); }
  return value;
}
function entry(id: string, key: string) {
  const value = build(id);
  let resource = value.entries.get(key);
  if (!resource) { resource = { pending: 0, dirty: false, error: "", version: 0, message: "" }; value.entries.set(key, resource); }
  return resource;
}
function publish(id: string) {
  const value = build(id), entries = [...value.entries.values()];
  const failed = entries.find(item => item.error), dirty = entries.find(item => item.dirty);
  const next: SaveSnapshot = failed ? { state: "error", message: failed.error }
    : entries.some(item => item.pending > 0) ? { state: "saving", message: "Saving changes…" }
    : dirty ? { state: "waiting", message: dirty.message || "Changes waiting to save…" } : saved;
  if (next.state === value.snapshot.state && next.message === value.snapshot.message) return;
  value.snapshot = next;
  listeners.forEach(listener => listener());
}
export function subscribeSaveStatus(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; }
export function getSaveStatus(id: string) { return builds.get(id)?.snapshot ?? saved; }
export function serverSaveStatus() { return saved; }
export function markBuildDirty(id: string, key: string, message = "") {
  const item = entry(id, key); item.dirty = true; item.message = message; publish(id);
}
export function clearBuildDirty(id: string, key: string) {
  const item = entry(id, key); item.dirty = false; item.error = ""; publish(id);
}
export function failBuildSave(id: string, key: string, message: string) {
  const item = entry(id, key); item.error = message; publish(id);
}
export async function trackBuildSave<T>(id: string, key: string, work: () => Promise<T>): Promise<T> {
  const item = entry(id, key); ++item.version;
  item.pending++; item.dirty = false; item.error = ""; publish(id);
  try {
    const result = await work();
    return result;
  } catch (error) {
    // A Next redirect is successful navigation after a committed mutation.
    const redirect = error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT;");
    if (!redirect) item.error = error instanceof Error ? error.message : "Could not save changes. Try again.";
    throw error;
  } finally { item.pending--; publish(id); }
}

```

### `lib/build-settings-actions.ts`

```typescript
"use server";

import { requireBuildAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { mutateBuildWithRevision } from "@/lib/build-history";

export async function renameBuild(buildId: string, name: string) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200 || typeof name !== "string") {
    throw new Error("Invalid build name.");
  }
  const trimmed = name.trim();
  if (!trimmed || trimmed.length > 100) throw new Error("Use a build name between 1 and 100 characters.");
  const access = await requireBuildAccess(buildId);
  await mutateBuildWithRevision(access.id, access.userId, "settings", "Renamed build", async tx => {
    const result = await tx.build.updateMany({ where: { id: access.id, userId: access.userId }, data: { name: trimmed } });
    if (result.count !== 1) throw new Error("Build access changed. Refresh and try again.");
  });
  revalidatePath(`/build/${access.id}`);
  revalidatePath("/profile/builds");
}

```

### `lib/build-validation.ts`

```typescript
import { emptyLogistics, nullableNumber, parseDates, type Logistics } from "./trip-planner";

export const MAX_GEAR_QUANTITY = 999;

export function formText(form: FormData, key: string, max: number, required = false): string | null {
  const value = form.get(key);
  if (value !== null && typeof value !== "string") throw new Error(`Invalid ${key}.`);
  const text = (value ?? "").trim();
  if (text.length > max || (required && !text)) throw new Error(`${key} must be ${required ? `1–${max}` : `at most ${max}`} characters.`);
  return text || null;
}

export function formNumber(form: FormData, key: string, min: number, max: number, integer = false) {
  return nullableNumber(form.get(key), key, min, max, integer);
}

export function validCondition(value: string | null): string | null {
  if (value && !["dry", "rain", "snow"].includes(value)) throw new Error("Choose a valid weather condition.");
  return value;
}

export function parseBuildDetails(form: FormData) {
  const name = formText(form, "name", 100, true)!;
  const dates = parseDates(formText(form, "startDate", 10) ?? "", formText(form, "endDate", 10) ?? "");
  const latitude = formNumber(form, "locationLat", -90, 90);
  const longitude = formNumber(form, "locationLng", -180, 180);
  if ((latitude == null) !== (longitude == null)) throw new Error("Provide both coordinates or neither.");
  return {
    name, dates, latitude, longitude,
    people: formNumber(form, "people", 1, 100, true) ?? 1,
    minTemperature: formNumber(form, "minTemperature", -100, 60, true),
    conditions: validCondition(formText(form, "conditions", 20)),
    destinationId: formText(form, "destinationId", 200),
    location: formText(form, "location", 500),
  };
}

export function parseLogistics(value: unknown): Logistics | null {
  if (value == null) return null;
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid trip logistics.");
  const object = value as Record<string, unknown>;
  const result = { ...emptyLogistics };
  for (const key of Object.keys(object)) {
    if (!Object.prototype.hasOwnProperty.call(result, key)) throw new Error(`Unknown trip logistics field: ${key}.`);
  }
  for (const key of Object.keys(result) as (keyof Logistics)[]) {
    const text = object[key];
    if (text !== undefined && (typeof text !== "string" || text.length > 5000)) {
      throw new Error(`Invalid trip logistics field: ${key}.`);
    }
    result[key] = (text ?? "") as string;
  }
  return result;
}

export function combinedQuantity(current: number, incoming: number): number {
  if (!Number.isInteger(current) || current < 0 || !Number.isInteger(incoming) || incoming < 1 || current + incoming > MAX_GEAR_QUANTITY) {
    throw new Error(`A gear item cannot exceed ${MAX_GEAR_QUANTITY} units. Reduce its quantity before importing.`);
  }
  return current + incoming;
}

```

### `lib/build-visibility-actions.ts`

```typescript
"use server";

import { requireBuildAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { mutateBuildWithRevision } from "@/lib/build-history";

export async function setBuildVisibility(buildId: string, isPublic: boolean) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200 || typeof isPublic !== "boolean") {
    throw new Error("Invalid visibility request.");
  }
  const access = await requireBuildAccess(buildId);
  await mutateBuildWithRevision(access.id, access.userId, "settings", "Changed build visibility", async tx => {
    const result = await tx.build.updateMany({ where: { id: access.id, userId: access.userId }, data: { isPublic } });
    if (result.count !== 1) throw new Error("Build access changed. Refresh and try again.");
  });
  revalidatePath(`/build/${access.id}`);
}

```

### `lib/build-visibility.ts`

```typescript
import "server-only";
import { findAccessibleBuild } from "@/lib/build-access";
import { prisma } from "@/lib/prisma";

// Public access is only for rendering. Mutations keep requireBuildAccess.
export async function getBuildViewAccess(buildId: string) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200) {
    return { status: "missing" as const };
  }
  const owned = await findAccessibleBuild(buildId);
  if (owned) return { status: "allowed" as const, canEdit: true, access: owned };

  const build = await prisma.build.findUnique({
    where: { id: buildId },
    select: { id: true, isPublic: true },
  });
  if (!build) return { status: "missing" as const };
  if (!build.isPublic) return { status: "private" as const };
  return { status: "allowed" as const, canEdit: false, access: null };
}

```

### `lib/calculations.ts`

```typescript
type CalcItem = {
  quantity: number;
  isConsumable: boolean;
  isWorn: boolean;
  weightSnapshot: number | null;
  priceSnapshot: number | null;
  gear: {
    weight_g: number | null;
    price_cad: number | null;
  } | null;
};

function itemWeight(item: CalcItem) {
  const grams = item.gear?.weight_g ?? item.weightSnapshot ?? 0;
  return grams * item.quantity;
}

function itemPrice(item: CalcItem) {
  const price = item.gear?.price_cad ?? item.priceSnapshot ?? 0;
  return price * item.quantity;
}

export function calculateWeightBreakdown(items: CalcItem[]) {
  let base = 0;
  let consumable = 0;
  let worn = 0;

  for (const item of items) {
    const weight = itemWeight(item);

    if (item.isWorn) {
      worn += weight;
    } else if (item.isConsumable) {
      consumable += weight;
    } else {
      base += weight;
    }
  }

  return {
    base,
    consumable,
    worn,
    total: base + consumable + worn,
  };
}

export function calculateTotalCost(items: CalcItem[]) {
  return items.reduce((total, item) => total + itemPrice(item), 0);
}
```

### `lib/compatibility.ts`

```typescript
/**
 * TrailPicker Compatibility — expanded trip-aware checks.
 * Pure, deterministic checks against *recorded* trip and equipment data.
 * An absent specification is unknown — never silently interpreted as zero,
 * a pass, or a failed safety certification.
 */

export type CompatibilitySeverity = "error" | "warning" | "info";
export type CompatibilityKind = "check" | "unknown" | "advisory";

export type CompatibilityIssue = {
  id: string;
  severity: CompatibilitySeverity;
  category: string;
  message: string;
  itemIds?: string[];
  kind?: CompatibilityKind;
  /** Why the finding exists. */
  basis?: string;
  /** Concrete next step without claiming a guaranteed outcome. */
  action?: string;
};

type GearSpecificationForCompat = { key: string; value: string; unit?: string | null };

type GearForCompat = {
  id: string;
  name: string;
  weight_g: number | null;
  price_cad: number | null;
  capacity_l: number | null;
  frame_type: string | null;
  waterproof: boolean | null;
  temperature_rating: number | null;
  season: string | null;
  category: { name: string };
  subcategory?: { name: string; slug: string } | null;
  /** Optional for forward compatibility. Never read capacity_l as people. */
  personCapacity?: number | null;
  specifications?: GearSpecificationForCompat[];
};

export type CompatItem = {
  id: string;
  quantity: number;
  isConsumable: boolean;
  isWorn: boolean;
  customCategory: string | null;
  gearNameSnapshot: string | null;
  weightSnapshot: number | null;
  priceSnapshot: number | null;
  gear: GearForCompat | null;
};

export type TripDayForCompat = {
  minTemperature: number | null;
  conditions: string | null;
  campsite?: string | null;
  waterCarryL?: number | null;
  waterSource?: string | null;
};

export type BuildForCompat = {
  people: number;
  minTemperature: number | null;
  conditions: string | null;
  startDate: Date | null;
  endDate: Date | null;
};

const canon = (value: string | null | undefined) => (value ?? "").trim().toLowerCase();
const categoryOf = (item: CompatItem) => canon(item.gear?.category.name ?? item.customCategory);
const slugOf = (item: CompatItem) => canon(item.gear?.subcategory?.slug);
const nameOf = (item: CompatItem) => item.gear?.name || item.gearNameSnapshot || "Custom item";
const active = (items: readonly CompatItem[]) => items.filter(item => Number.isSafeInteger(item.quantity) && item.quantity > 0 && !item.isConsumable);
const validNumber = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
const validTemperature = (v: unknown): v is number => validNumber(v) && v >= -80 && v <= 60;
const positiveVolume = (v: unknown): v is number => validNumber(v) && v > 0 && v <= 300;
const ids = (items: readonly CompatItem[]) => items.map(item => item.id);
const names = (items: readonly CompatItem[]) => items.map(nameOf).join(", ");

function nightsBetween(build: BuildForCompat): number | null {
  if (!build.startDate || !build.endDate) return null;
  const ms = new Date(build.endDate).getTime() - new Date(build.startDate).getTime();
  if (!Number.isFinite(ms) || ms < 0) return null;
  // Zero nights represents a day trip. Date-only entries can span DST changes.
  return Math.max(0, Math.round(ms / 86_400_000));
}

function tripContext(build: BuildForCompat, days: readonly TripDayForCompat[]) {
  const nights = nightsBetween(build);
  const overnight = (nights !== null && nights > 0) || days.some(day => !!day.campsite?.trim());
  const lows = [build.minTemperature, ...days.map(day => day.minTemperature)].filter(validTemperature);
  const coldest = lows.length ? Math.min(...lows) : null;
  const conditions = [build.conditions, ...days.map(day => day.conditions)].map(canon);
  const wet = conditions.some(c => /\b(rain|snow|wet|storm|showers|precipitation)\b/.test(c) && !/^no\s+(rain|snow|precipitation)\b/.test(c));
  const snow = conditions.some(c => /\b(snow|blizzard|winter)\b/.test(c) && !/^no\s+(snow)\b/.test(c));
  return { nights, overnight, coldest, wet, snow };
}

/**
 * Only explicitly labelled person-occupancy specs count. In particular,
 * capacity_l is reserved for actual liquid/pack volume and is NEVER occupancy.
 */
export function documentedShelterCapacity(item: CompatItem): number | null {
  if (!item.gear || categoryOf(item) !== "shelter") return null;
  const personCapacity = item.gear.personCapacity;
  if (Number.isSafeInteger(personCapacity) && personCapacity! >= 1 && personCapacity! <= 20) return personCapacity!;

  for (const spec of item.gear.specifications ?? []) {
    const key = canon(spec.key).replace(/[()_-]/g, " ").replace(/\s+/g, " ");
    if (!["sleeping capacity", "person capacity", "capacity persons", "occupancy", "sleeps"].includes(key)) continue;
    if (spec.unit != null && !/^(people|person|persons|occupants?)$/.test(canon(spec.unit))) continue;
    const match = canon(spec.value).match(/^(\d{1,2})(?:\s*(?:people|persons?|occupants?))?$/);
    if (!match) continue;
    const count = Number(match[1]);
    if (count >= 1 && count <= 20) return count;
  }
  return null;
}

function essentialChecks(build: BuildForCompat, items: CompatItem[], days: readonly TripDayForCompat[]): CompatibilityIssue[] {
  const all = active(items);
  const { overnight } = tripContext(build, days);
  const issues: CompatibilityIssue[] = [];
  if (all.length === 0) return [{
    id: "empty-build", severity: "info", kind: "unknown", category: "Inventory",
    message: "No gear is recorded yet, so compatibility cannot be assessed.",
    basis: "Empty gear list", action: "Add equipment to start checking this trip.",
  }];
  const missing = (cat: string) => !all.some(item => categoryOf(item) === cat);
  const needs = overnight ? ["shelter", "sleep", "water"] : ["water"];
  for (const cat of needs) if (missing(cat)) issues.push({
    id: `missing-${cat}`, severity: "warning", kind: "advisory", category: "Trip essentials",
    message: `No ${cat} gear is recorded${overnight ? " for this overnight trip" : ""}. Confirm any shared or separately arranged equipment before departure.`,
    basis: "Recorded gear categories and trip duration", action: `Add ${cat} gear to this build, or confirm and document an alternative plan.`,
  });
  if (missing("packs")) issues.push({
    id: "missing-packs", severity: "info", kind: "advisory", category: "Trip essentials",
    message: "No backpack is recorded. This might be intentional or shared.",
    basis: "Recorded gear categories", action: "Confirm how equipment and water will be carried.",
  });
  if (overnight && missing("cooking")) issues.push({
    id: "cooking-plan", severity: "info", kind: "advisory", category: "Trip essentials",
    message: "No cooking equipment is recorded. No-cook trips and shared stoves are valid arrangements.",
    basis: "Overnight trip and recorded cooking gear", action: "Check food preparation and any planned hot-water needs.",
  });
  return issues;
}

/** A pad's R-value measures insulation, not bag temperature rating. */
function recordedPadRValue(item: CompatItem): number | null {
  if (slugOf(item) !== "sleeping-pad") return null;
  for (const spec of item.gear?.specifications ?? []) {
    if (!["r value", "rvalue"].includes(canon(spec.key).replace(/-/g, " "))) continue;
    const value = canon(spec.value);
    if (!/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(value)) continue;
    const n = Number(value);
    if (n >= 0.1 && n <= 20) return n;
  }
  return null;
}

function sleepChecks(build: BuildForCompat, items: CompatItem[], days: readonly TripDayForCompat[]): CompatibilityIssue[] {
  const { coldest, overnight } = tripContext(build, days);
  if (!overnight) return [];
  const sleep = active(items).filter(item => categoryOf(item) === "sleep");
  const insulation = sleep.filter(item => ["sleeping-bag", "quilt"].includes(slugOf(item)) || (!slugOf(item) && validTemperature(item.gear?.temperature_rating)));
  const ambiguous = sleep.filter(item => !slugOf(item) && !validTemperature(item.gear?.temperature_rating));
  const issues: CompatibilityIssue[] = [];
  const groupSize = Number.isSafeInteger(build.people) && build.people > 0 ? build.people : 1;
  if (coldest === null && sleep.length === 0) issues.push({
    id: "trip-low-unknown", severity: "info", kind: "unknown", category: "Temperature",
    message: "No overnight low temperature is recorded, so the planned sleeping conditions cannot be assessed.",
    basis: "Overnight trip without a recorded minimum temperature", action: "Record an expected overnight low and check current conditions near departure.",
  });

  if (sleep.length > 0 && insulation.length === 0 && ambiguous.length === 0) issues.push({
    id: "sleep-insulation-missing", severity: "warning", kind: "advisory", category: "Sleep system",
    message: "Sleeping pads or accessories are listed, but no sleeping bag or quilt is recorded.",
    itemIds: ids(sleep), basis: "Recorded sleep subcategories", action: "Confirm sleeping insulation for each person, including any shared or alternative arrangements.",
  });
  if (ambiguous.length) issues.push({
    id: "sleep-items-unclassified", severity: "info", kind: "unknown", category: "Sleep system",
    message: `${ambiguous.length} sleep item${ambiguous.length === 1 ? " has" : "s have"} no clear sleeping-bag, quilt, or pad classification.`,
    itemIds: ids(ambiguous), basis: "Missing gear subcategory / insulation classification", action: "Identify the type of sleep equipment before relying on temperature checks.",
  });

  const pads = sleep.filter(item => slugOf(item) === "sleeping-pad");
  if (insulation.length && !pads.length) issues.push({
    id: "sleep-pad-not-listed", severity: "info", kind: "advisory", category: "Sleep system",
    message: "A sleeping bag or quilt is listed, but no sleeping pad is recorded. Hammocks and other setups may use different insulation.",
    itemIds: ids(insulation), basis: "Listed sleeping bags/quilts without a classified sleeping pad", action: "Confirm adequate ground or underside insulation for the sleeping setup.",
  });
  const padUnits = pads.reduce((sum, item) => sum + item.quantity, 0);
  if (pads.length && padUnits < groupSize) issues.push({
    id: "sleep-pad-units", severity: "info", kind: "advisory", category: "Sleep system",
    message: `${padUnits} sleeping pad unit${padUnits === 1 ? "" : "s"} recorded for ${groupSize} people. Other ground insulation may be shared or arranged separately.`,
    itemIds: ids(pads), basis: "Listed sleeping pads and trip group size", action: "Confirm the pad/under-insulation plan for everyone.",
  });

  const recordedCount = insulation.reduce((sum, item) => sum + item.quantity, 0);
  if (recordedCount > 0 && recordedCount < groupSize && ambiguous.length === 0) issues.push({
    id: "sleep-units", severity: "warning", kind: "advisory", category: "Sleep system",
    message: `${recordedCount} sleeping bag/quilt unit${recordedCount === 1 ? "" : "s"} recorded for ${groupSize} people. Other arrangements may exist.`,
    itemIds: ids(insulation), basis: "Recorded insulation quantities and group size", action: "Confirm each person's sleep system and any shared equipment.",
  });
  if (coldest === null && sleep.length > 0) {
    issues.push({
      id: "sleep-no-trip-low", severity: "info", kind: "unknown", category: "Temperature",
      message: "The trip has no recorded low temperature, so sleep ratings cannot be compared.",
      itemIds: ids(sleep), basis: "Missing trip temperature", action: "Enter a realistic overnight low and check up-to-date forecasts before departure.",
    });
    return issues;
  }
  if (coldest === null) return issues;
  // Pad insulation is a separate consideration. A recorded R-value never
  // converts to a sleeping-bag comfort-temperature rating.
  if (coldest <= 0 && pads.length) {
    const unknownPads = pads.filter(item => recordedPadRValue(item) === null);
    if (unknownPads.length) issues.push({
      id: "pad-insulation-unknown", severity: "info", kind: "unknown", category: "Sleep system",
      message: `Pad insulation (R-value) is missing for ${names(unknownPads)} during a trip with lows of ${coldest}°C.`,
      itemIds: ids(unknownPads), basis: "Missing sleeping-pad R-value and recorded trip low", action: "Check manufacturer R-values and the complete pad/ground-insulation setup.",
    });
    const lowPads = pads.filter(item => {
      const r = recordedPadRValue(item);
      return r !== null && r < 2;
    });
    if (lowPads.length) issues.push({
      id: "pad-insulation-review", severity: "warning", kind: "advisory", category: "Sleep system",
      message: `Listed pad R-values are below 2 for ${names(lowPads)} on a trip with lows of ${coldest}°C. Pad stacking and other insulation may change the full system's performance.`,
      itemIds: ids(lowPads), basis: "Recorded R-values below 2 and a freezing or colder trip low; planning prompt only", action: "Review complete ground insulation and manufacturer guidance for the expected conditions.",
    });
    if (coldest <= -5) {
      const moderatePads = pads.filter(item => {
        const r = recordedPadRValue(item);
        return r !== null && r >= 2 && r < 4;
      });
      if (moderatePads.length) issues.push({
        id: "pad-cold-weather-review", severity: "info", kind: "advisory", category: "Sleep system",
        message: `Recorded R-values are under 4 for ${names(moderatePads)} on a trip with lows of ${coldest}°C. This is a cold-weather planning prompt, not an absolute minimum.`,
        itemIds: ids(moderatePads), basis: "Recorded pad R-values and sub-freezing trip low", action: "Check the complete ground-insulation arrangement and manufacturer guidance for the expected conditions.",
      });
    }
  }
  const rated = insulation.filter(item => validTemperature(item.gear?.temperature_rating));
  const unrated = insulation.filter(item => !validTemperature(item.gear?.temperature_rating));
  if (unrated.length) issues.push({
    id: "sleep-rating-unknown", severity: "info", kind: "unknown", category: "Temperature",
    message: `Temperature ratings are missing for ${names(unrated)}. Their suitability at ${coldest}°C cannot be assessed.`,
    itemIds: ids(unrated), basis: "Missing temperature rating", action: "Find verified comfort ratings and check sleeping-pad insulation.",
  });
  for (const item of rated) {
    const rating = item.gear!.temperature_rating!;
    if (rating > coldest) issues.push({
      id: `sleep-rating-review-${item.id}`, severity: "warning", kind: "check", category: "Temperature",
      message: `Temperature mismatch: ${nameOf(item)} is rated ${rating}°C, but the recorded low is ${coldest}°C (${(rating - coldest).toFixed(1).replace(/\.0$/, "")}°C colder). The rating type and full sleep system still need verification.`,
      itemIds: [item.id], basis: `Catalog rating: ${rating}°C · Recorded low: ${coldest}°C`,
      action: "Choose a sleep system suitable for the expected low, or verify the manufacturer comfort rating, pad insulation, and a suitable alternative before departure.",
    });
  }
  if (rated.length && !rated.some(item => item.gear!.temperature_rating! > coldest)) issues.push({
    id: "sleep-rating-limits", severity: "info", kind: "unknown", category: "Temperature",
    message: "Recorded sleeping-bag/quilt ratings do not exceed the trip low, but ratings may describe comfort or limit temperatures and do not account for sleeping-pad insulation.",
    itemIds: ids(rated), basis: "Unspecified rating method and complete sleep system", action: "Verify manufacturer comfort ratings and your full sleep system; this is not a warmth guarantee.",
  });
  return issues;
}

function shelterChecks(build: BuildForCompat, items: CompatItem[], days: readonly TripDayForCompat[]): CompatibilityIssue[] {
  const context = tripContext(build, days);
  const shelters = active(items).filter(item => categoryOf(item) === "shelter");
  if (!shelters.length) return [];
  const issues: CompatibilityIssue[] = [];
  if (context.overnight) {
    const known = shelters.filter(item => documentedShelterCapacity(item) !== null);
    const unknown = shelters.filter(item => documentedShelterCapacity(item) === null);
    const knownPeople = known.reduce((sum, item) => sum + documentedShelterCapacity(item)! * item.quantity, 0);
    const groupSize = Number.isSafeInteger(build.people) && build.people > 0 ? build.people : 1;

    if (unknown.length) issues.push({
      id: "shelter-occupancy-unknown", severity: "info", kind: "unknown", category: "Capacity",
      message: `Sleeping capacity is missing for ${names(unknown)}. Listed occupancy is not a verified group total.`,
      itemIds: ids(unknown), basis: "No explicitly labelled person-capacity specification", action: "Add a 'Sleeping capacity' specification with unit 'people', then verify group sleeping arrangements.",
    });
    if (knownPeople < groupSize && unknown.length === 0) issues.push({
      id: "shelter-capacity-short", severity: "error", kind: "check", category: "Capacity",
      message: `Not enough documented shelter space: ${knownPeople} sleeping places for ${groupSize} people. Separately arranged shelter may not be listed.`,
      itemIds: ids(known), basis: "Explicit sleeping capacity × quantity, compared with trip group size", action: "Add sufficient shelter capacity or record and confirm the separate sleeping arrangements for everyone.",
    });
    else if (knownPeople < groupSize && unknown.length > 0) issues.push({
      id: "shelter-capacity-unverified", severity: "info", kind: "unknown", category: "Capacity",
      message: `${knownPeople} sleeping places are documented for ${groupSize} people; other listed shelters have unknown occupancy.`,
      itemIds: ids(shelters), basis: "Partial shelter-capacity data", action: "Verify the unknown shelter capacities before judging whether the group fits.",
    });
  }
  if (context.wet) {
    const unsuitable = shelters.filter(item => item.gear?.waterproof === false);
    const unknown = shelters.filter(item => item.gear?.waterproof == null);
    if (unsuitable.length) issues.push({
      id: "shelter-wet-weather", severity: "warning", kind: "check", category: "Weather",
      message: `${names(unsuitable)} ${unsuitable.length === 1 ? "is" : "are"} recorded as not waterproof, while wet conditions are noted. A separate rain fly or tarp might provide protection.`,
      itemIds: ids(unsuitable), basis: "Planned precipitation conditions and catalog waterproof field", action: "Verify the complete shelter setup, rain protection, and manufacturer limitations.",
    });
    if (unknown.length) issues.push({
      id: "shelter-waterproof-unknown", severity: "info", kind: "unknown", category: "Weather",
      message: `Waterproofing specifications are missing for ${names(unknown)}.`,
      itemIds: ids(unknown), basis: "Missing waterproof field", action: "Check the shelter and rain-cover specifications; unknown does not mean not waterproof.",
    });
  }
  const winter = context.snow || (context.coldest !== null && context.coldest <= -10);
  const threeSeason = shelters.filter(item => /^(3\s*-?\s*season|three\s*season)$/.test(canon(item.gear?.season)));
  if (winter && threeSeason.length) issues.push({
    id: "shelter-winter-review", severity: "warning", kind: "advisory", category: "Weather",
    message: `${names(threeSeason)} ${threeSeason.length === 1 ? "is" : "are"} labelled 3-season, while snow or very low temperatures are recorded. A season label alone cannot determine wind or snow-load suitability.`,
    itemIds: ids(threeSeason), basis: "Catalog shelter season and trip conditions", action: "Check manufacturer limitations and local forecasts, including snow load and wind exposure.",
  });
  if (winter) {
    const unknownSeason = shelters.filter(item => !canon(item.gear?.season));
    if (unknownSeason.length) issues.push({
      id: "shelter-season-unknown", severity: "info", kind: "unknown", category: "Weather",
      message: `Season/snow-load suitability is not recorded for ${names(unknownSeason)} while winter conditions are planned.`,
      itemIds: ids(unknownSeason), basis: "Missing shelter season specification and planned cold/snow conditions", action: "Check shelter manufacturer's wind and snow-load limitations rather than relying on a generic season label.",
    });
  }
  return issues;
}

function waterChecks(build: BuildForCompat, items: CompatItem[], days: readonly TripDayForCompat[]): CompatibilityIssue[] {
  const water = active(items).filter(item => categoryOf(item) === "water");
  const containers = water.filter(item => ["bottle", "reservoir", "bladder", "water-bottle", "hydration-reservoir", "hydration-bladder", "canteen"].includes(slugOf(item)));
  const verifiedContainers = containers.filter(item => positiveVolume(item.gear?.capacity_l));
  const unknownContainers = containers.filter(item => !positiveVolume(item.gear?.capacity_l));
  const recordedLiters = verifiedContainers.reduce((sum, item) => sum + item.gear!.capacity_l! * item.quantity, 0);
  const maxCarry = Math.max(0, ...days.map(day => day.waterCarryL).filter((n): n is number => validNumber(n) && n > 0 && n <= 100));
  const issues: CompatibilityIssue[] = [];
  const sourceDays = days.filter(day => !!day.waterSource?.trim());
  const treatment = water.filter(item => ["filter", "purifier", "treatment", "water-filter", "water-purifier"].includes(slugOf(item)));
  if (sourceDays.length && !treatment.length) issues.push({
    id: "water-treatment-unverified", severity: "info", kind: "advisory", category: "Water",
    message: "A trip-day water source is listed, but no filter or purifier is recorded. Boiling, pre-treated supplies or another arrangement may be planned.",
    itemIds: ids(water), basis: "Trip-day water sources and recorded water-treatment products", action: "Confirm whether source water needs treatment and how it will be handled.",
  });
  if (!maxCarry) {
    if (days.length && water.length) issues.push({
      id: "water-carry-unplanned", severity: "info", kind: "unknown", category: "Water",
      message: "Trip days have no recorded water-carry target, so the listed container volume cannot be compared with a planned carry.",
      itemIds: ids(water), basis: "Trip Planner days lack waterCarryL values", action: "Record planned carry volumes after checking water access and the route.",
    });
    return issues;
  }
  if (unknownContainers.length) issues.push({
    id: "water-volume-unknown", severity: "info", kind: "unknown", category: "Water",
    message: `Some containers have no recorded storage volume (${names(unknownContainers)}).`,
    itemIds: ids(unknownContainers), basis: "Trip-day planned water carry and missing container capacities", action: "Confirm the usable volume of all bottles and reservoirs.",
  });
  if (recordedLiters < maxCarry && unknownContainers.length === 0) issues.push({
    id: "water-volume-check", severity: containers.length ? "warning" : "info", kind: containers.length ? "check" : "unknown", category: "Water",
    message: `Water storage mismatch: planned carry is ${maxCarry} L, but only ${recordedLiters} L of container capacity is documented. Unlisted or shared containers may account for the difference.`,
    itemIds: ids(water), basis: "Maximum Trip Planner waterCarryL vs explicitly listed container volumes", action: "Add enough documented container capacity for the planned carry, or update the water plan after confirming water access and shared supplies.",
  });
  else if (recordedLiters < maxCarry) issues.push({
    id: "water-volume-unverified", severity: "info", kind: "unknown", category: "Water",
    message: `The plan calls for ${maxCarry} L, while ${recordedLiters} L is documented and other container volumes are unknown.`,
    itemIds: ids(containers), basis: "Incomplete water-storage specifications", action: "Verify the missing container volumes before comparing against the carry plan.",
  });
  return issues;
}

function equipmentChecks(build: BuildForCompat, items: CompatItem[], days: readonly TripDayForCompat[]): CompatibilityIssue[] {
  const { nights, overnight } = tripContext(build, days);
  const all = active(items);
  const issues: CompatibilityIssue[] = [];
  const packs = all.filter(item => categoryOf(item) === "packs");
  if (overnight) {
    const unmeasuredPacks = packs.filter(item => !positiveVolume(item.gear?.capacity_l));
    if (unmeasuredPacks.length) issues.push({
      id: "pack-volume-unknown", severity: "info", kind: "unknown", category: "Pack fit",
      message: `Pack volume is not recorded for ${names(unmeasuredPacks)}, so capacity cannot be assessed against the overnight load.`,
      itemIds: ids(unmeasuredPacks), basis: "Missing or invalid pack capacity field", action: "Add the manufacturer's pack volume or test-pack the full kit.",
    });
  }
  if (overnight && nights !== null) for (const pack of packs) {
    const cap = pack.gear?.capacity_l;
    // Deliberately advisory: these are optional packing heuristics, not minimum volume requirements.
    const heuristic = nights <= 2 ? 30 : nights <= 5 ? 45 : 55;
    if (positiveVolume(cap) && cap < heuristic) issues.push({
      id: `pack-fit-review-${pack.id}`, severity: "info", kind: "advisory", category: "Pack fit",
      message: `${nameOf(pack)} is ${cap} L for a ${nights}-night trip. ${heuristic} L is a rough planning heuristic, not a required minimum; compact setups can work well.`,
      itemIds: [pack.id], basis: "Recorded pack volume and trip duration; optional planning heuristic", action: "Test-pack the complete kit, including water and food, to verify real fit.",
    });
  }
  if (overnight && ![build.conditions, ...days.map(day => day.conditions)].some(condition => !!canon(condition))) issues.push({
    id: "trip-conditions-unknown", severity: "info", kind: "unknown", category: "Weather",
    message: "No trip conditions are recorded, so wet-weather and winter gear checks may miss relevant conditions.",
    basis: "Missing planned weather conditions", action: "Record expected conditions and check a current forecast near departure.",
  });
  if (tripContext(build, days).wet && !all.some(item => categoryOf(item) === "clothing" && item.gear?.waterproof === true)) issues.push({
    id: "rain-layer-unverified", severity: "info", kind: "unknown", category: "Weather",
    message: "Wet conditions are recorded, but the inventory has no confirmed waterproof clothing specification. A rain layer may still be packed under a custom entry.",
    itemIds: ids(all.filter(item => categoryOf(item) === "clothing")), basis: "Wet trip conditions and missing affirmative waterproof clothing data", action: "Verify personal rain protection for everyone without assuming missing catalog data means missing gear.",
  });
  if (build.people === 1) for (const cat of ["shelter", "packs"]) {
    const chosen = all.filter(item => categoryOf(item) === cat);
    const unique = new Set(chosen.map(item => item.gear?.id ?? item.id));
    if (unique.size > 1) issues.push({
      id: `multiple-${cat}`, severity: "info", kind: "advisory", category: "Inventory review",
      message: `${unique.size} distinct ${cat} products are recorded for a solo trip. They may be alternatives or deliberate backups.`,
      itemIds: ids(chosen), basis: "Solo trip and multiple catalog products", action: "Confirm what is actually carried; do not remove equipment without reviewing the trip plan.",
    });
  }
  if (build.people === 1) for (const item of packs.concat(all.filter(item => categoryOf(item) === "shelter"))) {
    if (item.quantity > 1) issues.push({
      id: `duplicate-units-${item.id}`, severity: "info", kind: "advisory", category: "Inventory review",
      message: `${item.quantity} copies of ${nameOf(item)} are recorded on a solo trip. These may be backups or a quantity entry to check.`,
      itemIds: [item.id], basis: "Solo group size and repeated item quantity", action: "Confirm the quantity is intentional; keep needed backups.",
    });
  }
  const zeroWeights = all.filter(item => (item.gear?.weight_g ?? item.weightSnapshot) === 0);
  if (zeroWeights.length) issues.push({
    id: "zero-weights", severity: "info", kind: "advisory", category: "Data quality",
    message: `Zero weight is recorded for ${names(zeroWeights)}. This may be intentional, but can cause an understated pack weight.`,
    itemIds: ids(zeroWeights), basis: "Zero gram gear weights", action: "Double-check these weights; keep zero only if accurate.",
  });
  const weightUnknown = all.filter(item => {
    const weight = item.gear?.weight_g ?? item.weightSnapshot;
    return !validNumber(weight) || weight < 0;
  });
  if (weightUnknown.length) issues.push({
    id: "unknown-weights", severity: "info", kind: "unknown", category: "Data quality",
    message: `${weightUnknown.reduce((sum, item) => sum + item.quantity, 0)} gear unit(s) have no valid recorded weight. Weight totals are known-weight subtotals, not a full load.`,
    itemIds: ids(weightUnknown), basis: "Missing or invalid item weights", action: "Add verified weights to improve load analysis.",
  });
  return issues;
}

/** No weather API is called here. Trip conditions are only user-entered data. */
export function evaluateCompatibility(
  build: BuildForCompat,
  items: CompatItem[],
  days: TripDayForCompat[] = [],
): CompatibilityIssue[] {
  const issues = [
    ...essentialChecks(build, items, days),
    ...sleepChecks(build, items, days),
    ...shelterChecks(build, items, days),
    ...waterChecks(build, items, days),
    ...equipmentChecks(build, items, days),
  ];
  const order: Record<CompatibilitySeverity, number> = { error: 0, warning: 1, info: 2 };
  // Stable IDs + severity ordering make the UI and tests predictable.
  return issues.sort((a, b) => order[a.severity] - order[b.severity] || a.id.localeCompare(b.id));
}

export function summarizeCompatibility(issues: readonly CompatibilityIssue[]) {
  const errors = issues.filter(issue => issue.severity === "error").length;
  const warnings = issues.filter(issue => issue.severity === "warning").length;
  const infos = issues.filter(issue => issue.severity === "info").length;
  const unknowns = issues.filter(issue => issue.kind === "unknown").length;
  const status: "ok" | "warning" | "error" | "incomplete" | "notes" =
    errors ? "error" : warnings ? "warning" : unknowns ? "incomplete" : infos ? "notes" : "ok";
  return { status, errors, warnings, infos, unknowns, total: issues.length };
}


```

### `lib/consumables-model.ts`

```typescript
/** Explicit, editable mass assumptions. Not nutrition, fuel, or hydration advice. */
export type ConsumableDay = {
  day: number;
  startingGrams: number;
  addedGrams: number;
  usedGrams: number;
  remainingGrams: number;
  unmetGrams: number;
};

export function projectConsumableLoad(
  startingGrams: number,
  days: number,
  dailyUseGrams: number,
  resupplyDay: number | null = null,
  resupplyGrams = 0,
): ConsumableDay[] {
  if (![startingGrams,days,dailyUseGrams,resupplyGrams].every(Number.isFinite) ||
      startingGrams<0 || startingGrams>Number.MAX_SAFE_INTEGER ||
      !Number.isInteger(days) || days<1 || days>31 ||
      dailyUseGrams<0 || dailyUseGrams>100_000 ||
      resupplyGrams<0 || resupplyGrams>1_000_000 ||
      (resupplyDay!==null && (!Number.isInteger(resupplyDay)||resupplyDay<2||resupplyDay>days))) {
    throw new Error('Invalid consumable timeline parameters.');
  }
  const result: ConsumableDay[]=[];
  let remaining=startingGrams;
  for(let day=1;day<=days;day++){
    const addedGrams=day===resupplyDay?resupplyGrams:0;
    const starting=remaining;
    const available=starting+addedGrams;
    const used=Math.min(dailyUseGrams,available);
    remaining=available-used;
    result.push({day,startingGrams:starting,addedGrams,usedGrams:used,remainingGrams:remaining,unmetGrams:Math.max(0,dailyUseGrams-used)});
  }
  return result;
}

```

### `lib/destinations.ts`

```typescript
import rawDestinations from "@/data/destinations.json";

export type FacilityStatus = "yes" | "no" | "seasonal" | "unknown";

export type DogPolicy =
  | "not-allowed"
  | "leashed"
  | "under-control"
  | "check-current-rules";

export type ReservationPolicy =
  | "required"
  | "peak-season"
  | "permit"
  | "check-current-rules";

export type Difficulty = "easy" | "moderate" | "hard";

export type Destination = {
  id: string;
  name: string;
  park: string;
  region: string;
  latitude: number;
  longitude: number;
  distanceKm: number | null;
  elevationGainM: number | null;
  difficulty: Difficulty;
  tentSites: number | null;
  toilet: FacilityStatus;
  foodStorage: FacilityStatus;
  dogs: DogPolicy;
  reservations: ReservationPolicy;
  featured: boolean;
  summary: string;
  caution: string | null;
  sourceUrl: string;
  bookingUrl: string | null;
};

export const DESTINATIONS = rawDestinations as Destination[];

export function getDestination(id?: string | null) {
  if (!id) return null;

  return (
    DESTINATIONS.find((destination) => destination.id === id) ?? null
  );
}

export function getDestinationRegions() {
  return [
    ...new Set(
      DESTINATIONS.map((destination) => destination.region),
    ),
  ].sort();
}
```

### `lib/finding-dismissals.ts`

```typescript
import type { Finding } from "./pack-intelligence";

/** Persist only a user's acknowledgement, never alter the underlying finding. */
export type IgnoredFindingRecords = Record<string, string>;

/**
 * The original Analysis tab already had a handful of the same warnings as
 * Gear Compatibility. Share acknowledgements for truly equivalent checks,
 * without merging independent weather/forecast observations.
 */
export function findingAcknowledgementId(finding: Finding): string {
  const id = finding.id;
  const paired = new Map([
    ['gear-missing-packs', 'missing-packs'],
    ['gear-missing-shelter', 'missing-shelter'],
    ['gear-missing-sleep', 'missing-sleep'],
    ['gear-missing-water', 'missing-water'],
    ['gear-cooking-plan', 'missing-cooking'],
    ['gear-sleep-no-trip-low', 'sleep-no-low'],
    ['gear-sleep-rating-unknown', 'sleep-unrated'],
    ['gear-unknown-weights', 'unknown-weight'],
  ]);
  if (paired.has(id)) return paired.get(id)!;
  if (id.startsWith('gear-sleep-rating-review-')) return `sleep-temp-${id.slice('gear-sleep-rating-review-'.length)}`;
  return id;
}

/**
 * Acknowledgements re-open on changed evidence. Stable missing-category
 * checks have no additional numeric evidence: the finding disappears once
 * the gear is added, so their shared signature only needs the item IDs.
 */
export function findingFingerprint(finding: Finding): string {
  const id = findingAcknowledgementId(finding);
  const itemIds = [...finding.itemIds].sort();
  if (/^(missing-(packs|shelter|sleep|water|cooking)|sleep-no-low|sleep-unrated|unknown-weight)$/.test(id)) {
    return JSON.stringify([id, itemIds]);
  }
  if (id.startsWith('sleep-temp-')) {
    const temperatures = [...finding.basis.matchAll(/(-?\d+(?:\.\d+)?)°C/g)].map(m => Number(m[1]));
    if (temperatures.length >= 2) return JSON.stringify([id, itemIds, temperatures.slice(0, 2)]);
  }
  return JSON.stringify([
    id, finding.section, finding.level, finding.title, finding.detail,
    finding.action, finding.basis, itemIds,
  ]);
}

export function parseIgnoredFindings(raw: string | null): IgnoredFindingRecords {
  if (!raw) return {};
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(Object.entries(value).filter(([id, fingerprint]) =>
      id.length <= 250 && typeof fingerprint === "string" && fingerprint.length <= 10000,
    ));
  } catch {
    return {};
  }
}

export function isFindingIgnored(finding: Finding, records: IgnoredFindingRecords): boolean {
  return records[findingAcknowledgementId(finding)] === findingFingerprint(finding);
}

```

### `lib/gear-display.ts`

```typescript
export function safeGearUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : null; } catch { return null; }
}

export function gearMoney(value: number | null | undefined, currency = "CAD") {
  if (value == null || !Number.isFinite(value)) return "Price unavailable";
  try { return `${new Intl.NumberFormat("en-CA", { style: "currency", currency }).format(value)} ${currency}`; }
  catch { return `${value.toFixed(2)} ${currency}`; }
}

export function gearWeight(value: number | null | undefined) {
  return value == null ? "Weight unavailable" : value >= 1000 ? `${(value / 1000).toFixed(2)} kg` : `${value} g`;
}

export function reviewStats(reviews: Array<{ rating: number }>) {
  const valid = reviews.filter(review => Number.isInteger(review.rating) && review.rating >= 1 && review.rating <= 5);
  const count = valid.length;
  return { count, average: count ? valid.reduce((sum, review) => sum + review.rating, 0) / count : 0, buckets: [5, 4, 3, 2, 1].map(rating => ({ rating, count: valid.filter(review => review.rating === rating).length })) };
}

```

### `lib/gear-selection-actions.ts`

```typescript
"use server";

import { prisma } from "@/lib/prisma";
import { requireBuildAccess, setCurrentBuild } from "@/lib/build-access";
import { redirect } from "next/navigation";

export async function openGearSelection(buildId: string, category: string) {
  const access = await requireBuildAccess(buildId);
  const type = await prisma.category.findUnique({
    where: { slug: category.toLowerCase() }, select: { slug: true },
  });
  if (!type) throw new Error("Category not found.");
  await setCurrentBuild(access.id);
  redirect(`/gear/${encodeURIComponent(type.slug)}`);
}

```

### `lib/guest-build-token.ts`

```typescript
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const GUEST_BUILD_MAX_AGE = 60 * 60 * 24 * 30;

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value) throw new Error("AUTH_SECRET is required for guest build access.");
  return value;
}

export function guestBuildCookieName(buildId: string) {
  // Hash IDs so cookie names contain only safe characters and have bounded length.
  return `guestBuild_${createHmac("sha256", secret()).update(buildId).digest("hex").slice(0, 32)}`;
}

function signature(buildId: string, payload: string) {
  return createHmac("sha256", secret())
    .update(JSON.stringify(["trailpicker-guest-build-v1", buildId, payload]))
    .digest("base64url");
}

export function createGuestBuildToken(buildId: string, now = Date.now()) {
  const payload = `${Math.floor(now / 1000) + GUEST_BUILD_MAX_AGE}:${randomBytes(32).toString("base64url")}`;
  return `${payload}.${signature(buildId, payload)}`;
}

export function verifyGuestBuildToken(buildId: string, token: string | undefined, now = Date.now()) {
  if (!token || token.length > 200) return false;
  const match = /^(\d+):([A-Za-z0-9_-]{43})\.([A-Za-z0-9_-]{43})$/.exec(token);
  if (!match) return false;
  const expiry = Number(match[1]);
  if (!Number.isSafeInteger(expiry) || expiry <= Math.floor(now / 1000)) return false;
  const actual = Buffer.from(match[3]);
  const expected = Buffer.from(signature(buildId, `${match[1]}:${match[2]}`));
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

```

### `lib/itinerary-links.ts`

```typescript
import { readWaypoints, type Waypoint } from "./trip-planner";
import { routeForSave } from "./waypoint-map";

export type DayLink = { id?: string | null; date: Date | string };

function dateKey(value: Date | string): string {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) throw new Error("An itinerary day has an invalid date.");
  return date.toISOString().slice(0, 10);
}

// Strict validation at the import/restore boundary: never silently filter bad stops.
export function validatedRoute(value: unknown): Waypoint[] | null {
  if (value == null) return null;
  if (!Array.isArray(value)) throw new Error("The imported route must be a list of stops.");
  const points = readWaypoints(value);
  if (points.length !== value.length) throw new Error("The route contains an invalid waypoint. Nothing was imported.");
  try {
    return routeForSave(points);
  } catch (cause) {
    throw new Error(`Invalid waypoint: ${cause instanceof Error ? cause.message : "Check the route."}`);
  }
}

export function remapRouteDays(
  points: Waypoint[] | null,
  sourceDays: DayLink[],
  targetDays: DayLink[],
): { points: Waypoint[] | null; unassignedCount: number } {
  if (!points) return { points: null, unassignedCount: 0 };
  const sourceDateById = new Map(sourceDays.filter((day) => day.id).map((day) => [day.id!, dateKey(day.date)]));
  const targetIdByDate = new Map(targetDays.filter((day) => day.id).map((day) => [dateKey(day.date), day.id!]));
  let unassignedCount = 0;
  const updated = points.map((point) => {
    if (!point.dayId) return point;
    const date = sourceDateById.get(point.dayId);
    const mappedId = date ? targetIdByDate.get(date) : undefined;
    if (!mappedId) {
      unassignedCount++;
      return { ...point, dayId: null };
    }
    return { ...point, dayId: mappedId };
  });
  return { points: updated, unassignedCount };
}

```

### `lib/pack-analysis.ts`

```typescript
/** Pure, read-only analytics for the existing TrailPicker BuildItem data model.
 * Monetary values are CAD. All item weights are grams. Unknown is never treated as zero.
 */
export type PackInputItem = {
  id: string;
  quantity: number;
  isWorn: boolean;
  isConsumable: boolean;
  customCategory: string | null;
  gearNameSnapshot: string | null;
  weightSnapshot: number | null;
  priceSnapshot: number | null;
  gear: {
    name: string;
    weight_g: number | null;
    price_cad: number | null;
    category: { name: string };
  } | null;
};

export type WeightClass = "base" | "worn" | "consumable";

export type PackLine = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  weightClass: WeightClass;
  gramsEach: number | null;
  grams: number | null;
  priceEachCad: number | null;
  priceCad: number | null;
};

export type PackCategory = {
  name: string;
  baseGrams: number;
  wornGrams: number;
  consumableGrams: number;
  knownGrams: number;
  count: number;
  unknownWeightCount: number;
};

export type PackAnalysis = {
  lines: PackLine[];
  categories: PackCategory[];
  baseGrams: number;
  wornGrams: number;
  consumableGrams: number;
  carriedGrams: number;
  totalGrams: number;
  knownCostCad: number;
  totalUnits: number;
  knownWeightUnits: number;
  unknownWeightUnits: number;
  unknownPriceUnits: number;
  heaviest: PackLine[];
};

function knownNumber(value: number | null | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}

export function analyzePack(items: readonly PackInputItem[]): PackAnalysis {
  const lines: PackLine[] = items.map(item => {
    const quantity = Number.isSafeInteger(item.quantity) && item.quantity > 0 ? item.quantity : 0;
    // Match the Builder's displayed value precedence (catalog, then saved snapshot).
    const gramsEach = knownNumber(item.gear?.weight_g ?? item.weightSnapshot);
    const priceEachCad = knownNumber(item.gear?.price_cad ?? item.priceSnapshot);
    const category = (item.gear?.category.name || item.customCategory || "Other").trim() || "Other";
    const name = (item.gear?.name || item.gearNameSnapshot || "Custom item").trim() || "Custom item";
    // Same precedence as calculateWeightBreakdown: worn takes priority if both flags are true.
    const weightClass: WeightClass = item.isWorn ? "worn" : item.isConsumable ? "consumable" : "base";
    return {
      id: item.id,
      name,
      category,
      quantity,
      weightClass,
      gramsEach,
      grams: gramsEach === null ? null : gramsEach * quantity,
      priceEachCad,
      priceCad: priceEachCad === null ? null : priceEachCad * quantity,
    };
  });

  let baseGrams = 0;
  let wornGrams = 0;
  let consumableGrams = 0;
  let knownCostCad = 0;
  let totalUnits = 0;
  let knownWeightUnits = 0;
  let unknownWeightUnits = 0;
  let unknownPriceUnits = 0;
  const categoryMap = new Map<string, PackCategory>();

  for (const line of lines) {
    totalUnits += line.quantity;
    if (line.grams === null) unknownWeightUnits += line.quantity;
    else knownWeightUnits += line.quantity;
    if (line.priceCad === null) unknownPriceUnits += line.quantity;
    else knownCostCad += line.priceCad;

    const category = categoryMap.get(line.category) ?? {
      name: line.category, baseGrams: 0, wornGrams: 0, consumableGrams: 0,
      knownGrams: 0, count: 0, unknownWeightCount: 0,
    };
    category.count += line.quantity;
    if (line.grams === null) category.unknownWeightCount += line.quantity;
    else {
      category.knownGrams += line.grams;
      if (line.weightClass === "base") { baseGrams += line.grams; category.baseGrams += line.grams; }
      else if (line.weightClass === "worn") { wornGrams += line.grams; category.wornGrams += line.grams; }
      else { consumableGrams += line.grams; category.consumableGrams += line.grams; }
    }
    categoryMap.set(line.category, category);
  }

  return {
    lines,
    categories: [...categoryMap.values()].sort((a, b) => b.knownGrams - a.knownGrams || a.name.localeCompare(b.name)),
    baseGrams,
    wornGrams,
    consumableGrams,
    carriedGrams: baseGrams + consumableGrams,
    totalGrams: baseGrams + consumableGrams + wornGrams,
    knownCostCad,
    totalUnits,
    knownWeightUnits,
    unknownWeightUnits,
    unknownPriceUnits,
    heaviest: lines.filter(line => line.grams !== null && line.grams > 0)
      .sort((a, b) => (b.grams ?? 0) - (a.grams ?? 0) || a.name.localeCompare(b.name))
      .slice(0, 5),
  };
}

/** A planning-only comparison: never writes or deletes gear. */
export function simulateExclusions(analysis: PackAnalysis, excludedIds: ReadonlySet<string>) {
  const excluded = analysis.lines.filter(line => excludedIds.has(line.id));
  const knownSavedBase = excluded.filter(line => line.weightClass === "base").reduce((sum, line) => sum + (line.grams ?? 0), 0);
  const knownSavedConsumable = excluded.filter(line => line.weightClass === "consumable").reduce((sum, line) => sum + (line.grams ?? 0), 0);
  const knownSavedWorn = excluded.filter(line => line.weightClass === "worn").reduce((sum, line) => sum + (line.grams ?? 0), 0);
  const knownSavedCost = excluded.reduce((sum, line) => sum + (line.priceCad ?? 0), 0);
  return {
    removedCount: excluded.reduce((count, line) => count + line.quantity, 0),
    missingWeightCount: excluded.filter(line => line.grams === null).reduce((count, line) => count + line.quantity, 0),
    knownSavedBase,
    knownSavedConsumable,
    knownSavedWorn,
    knownSavedCarried: knownSavedBase + knownSavedConsumable,
    knownSavedTotal: knownSavedBase + knownSavedConsumable + knownSavedWorn,
    knownSavedCost,
    remainingBase: analysis.baseGrams - knownSavedBase,
    remainingCarried: analysis.carriedGrams - knownSavedBase - knownSavedConsumable,
    remainingTotal: analysis.totalGrams - knownSavedBase - knownSavedConsumable - knownSavedWorn,
  };
}

```

### `lib/pack-intelligence.ts`

```typescript
/** TrailPicker 0.3 pack intelligence. Pure calculations and conservative, explainable rules.
 * No product database guesses, scraped weather, implied safety certification, or generated AI claims.
 */
import { analyzePack, type PackAnalysis, type PackInputItem } from './pack-analysis';
import { evaluateCompatibility, type CompatibilityIssue, type CompatItem, type BuildForCompat } from './compatibility';
import type { PlannerDay } from './trip-planner';

export type FindingLevel = 'critical' | 'review' | 'opportunity' | 'unknown';
export type FindingSection = 'compatibility' | 'weather' | 'optimization' | 'planning';
export type Finding = {
  id: string;
  section: FindingSection;
  level: FindingLevel;
  title: string;
  detail: string;
  action: string;
  basis: string;
  itemIds: string[];
};
export type IntelligenceBuild = Pick<BuildForCompat,'people'|'minTemperature'|'conditions'|'startDate'|'endDate'>;
export type IntelligenceDay = Pick<PlannerDay,'date'|'minTemperature'|'conditions'|'waterCarryL'|'waterSource'|'distanceKm'|'elevationGainM'|'campsite'>;
export type IntelligenceItem = CompatItem & PackInputItem;
export type ForecastPoint = { name:string; lat:number; lng:number; elevationM:number|null };
export type ForecastDay = {date:string; low:number|null; high:number|null; wind:number|null; gust:number|null; pop:number|null; model:string; samples:number};
export type ForecastEvidence = {point:ForecastPoint; days:ForecastDay[]; alertsStatus:'ok'|'unavailable'; alerts:{title:string}[]; loadedAt:string};
export type IntelligenceResult = { findings:Finding[]; pack:PackAnalysis; coverage:{ratedSleep:number; unratedSleep:number; unknownWeights:number; tripDays:number; modelDays:number}; plannedNights:number|null; coldest:number|null; weatherSource:'forecast'|'planned'|'none' };

const canon = (s:string|null|undefined) => (s||'').trim().toLowerCase();
const category = (i:IntelligenceItem) => canon(i.gear?.category.name ?? i.customCategory);
const name = (i:IntelligenceItem) => i.gear?.name ?? i.gearNameSnapshot ?? 'Custom item';
const positive = (n:number|null|undefined):n is number => typeof n === 'number' && Number.isFinite(n) && n > 0;
function tripNights(build:IntelligenceBuild):number|null {
  if (!build.startDate || !build.endDate) return null;
  const ms = new Date(build.endDate).valueOf() - new Date(build.startDate).valueOf();
  return Number.isFinite(ms) && ms >= 0 ? Math.max(0, Math.round(ms/86400000)) : null;
}
function validTemp(n:unknown):n is number { return typeof n === 'number' && Number.isFinite(n) && n >= -80 && n <= 60; }
const priority:Record<FindingLevel,number> = {critical:0,review:1,opportunity:2,unknown:3};

// Compatibility findings are produced exclusively by evaluateCompatibility.
// Analysis may add weather, optimization, and planning findings, never a second
// implementation of the same equipment checks.
const extraTitles:Record<string,string> = {
  'missing-packs': 'No backpack recorded',
  'missing-shelter': 'No shelter recorded',
  'missing-sleep': 'No sleep gear recorded',
  'missing-water': 'No water gear recorded',
  'empty-build': 'No gear to evaluate',
  'cooking-plan': 'Cooking plan not recorded',
  'sleep-no-trip-low': 'Cannot assess sleeping temperature',
  'sleep-rating-unknown': 'Sleep system temperature ratings missing',
  'sleep-rating-limits': 'Check sleeping bag comfort ratings',
  'shelter-waterproof-unknown': 'Shelter waterproofing unknown',
  'shelter-wet-weather': 'Shelter may need more rain protection',
  'shelter-winter-review': 'Review shelter suitability for winter',
  'unknown-weights': 'Some gear weights are unknown',
  'multiple-shelter': 'Review multiple shelters',
  'multiple-packs': 'Review multiple packs',
  'trip-low-unknown': 'Cannot assess overnight temperature',
  'sleep-pad-not-listed': 'No sleeping pad recorded',
  'sleep-pad-units': 'Check sleeping pad quantity',
  'sleep-units': 'Not enough sleeping bag/quilt units listed',
  'sleep-insulation-missing': 'No sleeping bag or quilt recorded',
  'sleep-items-unclassified': 'Identify your sleep gear',
  'pad-insulation-unknown': 'Sleeping pad insulation is unknown',
  'pad-insulation-review': 'Review sleeping pad insulation',
  'pad-cold-weather-review': 'Check pad insulation for cold weather',
  'shelter-occupancy-unknown': 'Shelter sleeping capacity unknown',
  'shelter-capacity-short': 'Not enough documented shelter space',
  'shelter-capacity-unverified': 'Shelter capacity cannot be confirmed',
  'shelter-season-unknown': 'Shelter winter suitability unknown',
  'water-volume-unknown': 'Container capacities are missing',
  'water-volume-check': 'Planned water carry exceeds listed capacity',
  'water-volume-unverified': 'Water-carry capacity cannot be confirmed',
  'water-treatment-unverified': 'Water-treatment plan needs checking',
  'water-carry-unplanned': 'Water-carry target not recorded',
  'pack-volume-unknown': 'Backpack volume is unknown',
  'trip-conditions-unknown': 'Trip weather conditions not recorded',
  'rain-layer-unverified': 'Rain protection is unverified',
  'zero-weights': 'Check zero-weight entries',
};

export function compatibilityIssueToFinding(issue:CompatibilityIssue):Finding {
  return {
    id:`gear-${issue.id}`, section:'compatibility',
    // Only official ECCC alerts use the original red "Official alert" card.
    level:issue.kind==='unknown'?'unknown':issue.severity==='error'||issue.severity==='warning'?'review':'opportunity',
    title:extraTitles[issue.id] ??
      (issue.id.startsWith('sleep-rating-review-') ? 'Sleeping temperature mismatch' :
      issue.id.startsWith('pack-fit-review-') ? 'Check backpack fit' :
      issue.id.startsWith('duplicate-units-') ? 'Check duplicate gear quantity' : issue.category),
    detail:issue.message,
    action:issue.action ?? 'Review this finding against your trip arrangements.',
    basis:issue.basis ?? 'Recorded trip and gear data',
    itemIds:issue.itemIds ?? [],
  };
}

export function evaluatePackIntelligence(build:IntelligenceBuild, items:readonly IntelligenceItem[], days:readonly IntelligenceDay[], forecast:ForecastEvidence|null=null):IntelligenceResult {
  const pack = analyzePack(items);
  const findings:Finding[] = [];
  const add = (f:Finding) => findings.push(f);
  const active = items.filter(i=>i.quantity>0);
  const matching = (cat:string) => active.filter(i=>category(i)===cat);
  const nights = tripNights(build);
  const overnight = (nights!==null && nights>0) || days.some(d=>!!d.campsite?.trim());
  const forecastTemps = forecast?.days.map(d=>d.low).filter(validTemp) ?? [];
  const plannedTemps = [build.minTemperature,...days.map(d=>d.minTemperature)].filter(validTemp);
  // Forecast evidence must never be mixed with or silently replace manually entered trip lows.
  const temps = [...forecastTemps,...plannedTemps];
  const coldest = temps.length?Math.min(...temps):null;
  const weatherSource = forecastTemps.length ? 'forecast' : plannedTemps.length ? 'planned' : 'none';
  const windy = !!forecast?.days.some(d=>positive(d.gust) && d.gust>=60);
  const activeAlerts = forecast?.alertsStatus==='ok' ? forecast.alerts : [];

  const sleepItems = matching('sleep').filter(i => !i.isConsumable);
  const rated = sleepItems.filter(i => validTemp(i.gear?.temperature_rating));
  const unrated = sleepItems.filter(i => !validTemp(i.gear?.temperature_rating));
  const shelters = matching('shelter');

  if (windy) add({id:'strong-gust',section:'weather',level:'review',title:'Strong gusts in model forecast',detail:'At least one selected-day ECCC model sample has gusts of 60 km/h or more. Ridge and campsite wind can differ.',action:'Review exposed camps, tent guy lines, shelter limits and route alternatives.',basis:'ECCC model-sampled gusts',itemIds:shelters.map(i=>i.id)});
  if (forecast) {
    if (forecast.alertsStatus==='unavailable') add({id:'alerts-unavailable',section:'weather',level:'unknown',title:'Official alerts could not be checked',detail:'ECCC alert data is unavailable. This is not an all-clear.',action:'Check official ECCC weather alerts before departure.',basis:'ECCC alert service unavailable',itemIds:[]});
    if (activeAlerts.length) add({id:'alerts-active',section:'weather',level:'critical',title:`${activeAlerts.length} current ECCC alert${activeAlerts.length===1?'':'s'} at this point`,detail:(activeAlerts.slice(0,3).map(a=>a.title).filter(Boolean).join(' · ')||'Review the alert details.')+' These are current alerts and might not apply to your planned trip dates.',action:'Read the official alert text, coverage and validity before making trip decisions.',basis:'ECCC alert feed at selected location',itemIds:[]});
    if (!forecast.days.length) add({id:'forecast-no-days',section:'weather',level:'unknown',title:'No matching forecast days',detail:'No sampled dates were available for the planned period at this point.',action:'Try a nearer trip date or a different waypoint.',basis:'ECCC model forecast horizon',itemIds:[]});
  } else if (overnight) add({id:'forecast-not-loaded',section:'weather',level:'unknown',title:'Live weather not checked',detail:'Trip conditions alone do not verify the weather at your actual route or campsite.',action:'Select a mapped trip waypoint and load the ECCC model forecast.',basis:'Live forecast not requested',itemIds:[]});

  const duplicates=new Map<string,IntelligenceItem[]>();
  for (const i of active.filter(i=>!i.isConsumable)) {
    if (!i.gear?.id || i.quantity<1) continue;
    duplicates.set(i.gear.id,[...(duplicates.get(i.gear.id)||[]),i]);
  }
  for (const [id, entries] of duplicates) {
    const qty=entries.reduce((sum,i)=>sum+i.quantity,0);
    if (qty>=2 && (category(entries[0])==='packs'||category(entries[0])==='shelter')) add({id:`duplicate-${id}`,section:'optimization',level:'opportunity',title:`Check ${qty} × ${name(entries[0])}`,detail:'Multiple copies of this item are listed. Group equipment and intentional backups are common.',action:'Confirm the quantity is intentional before considering a change.',basis:'Same catalog product and quantity',itemIds:entries.map(i=>i.id)});
  }
  // Similarity is only a review prompt. No automated claim that functional layers or backups are redundant.
  for (const cat of ['shelter','packs']) {
    const entries=matching(cat).filter(i=>!i.isConsumable);
    if (entries.length>=2 && (build.people||1)===1 && new Set(entries.map(i=>i.gear?.id??i.id)).size>1) add({id:`review-multiple-${cat}`,section:'optimization',level:'opportunity',title:`Review multiple ${cat} options`,detail:`${entries.length} different ${cat} entries are recorded for a solo trip; some may be alternatives rather than carried together.`,action:'Check which ones are actually packed. Do not remove shared or backup equipment without reviewing the plan.',basis:'Solo trip, inventory category count',itemIds:entries.map(i=>i.id)});
  }
  if (pack.unknownWeightUnits>0) add({id:'unknown-weight',section:'planning',level:'unknown',title:'Some weight data is missing',detail:`${pack.unknownWeightUnits} item unit(s) have no valid recorded weight. The visible total is a known-weight subtotal, not a complete pack weight.`,action:'Fill missing item weights to improve planning and comparisons.',basis:'Inventory data completeness',itemIds:pack.lines.filter(l=>l.grams===null).map(l=>l.id)});
  if (nights!==null && nights>0 && pack.consumableGrams>0) add({id:'consumables-budget',section:'planning',level:'opportunity',title:'Model how consumables change your load',detail:`${(pack.consumableGrams/1000).toFixed(2)} kg of consumables are listed. Consumption rate and resupplies are not recorded, so any daily curve is an adjustable scenario, not a prediction.`,action:'Use the Pack planning tab to test daily consumption assumptions.',basis:'Consumable flags and trip duration',itemIds:pack.lines.filter(l=>l.weightClass==='consumable').map(l=>l.id)});
  if (days.some(d=>positive(d.waterCarryL))) add({id:'water-demand',section:'planning',level:'opportunity',title:'Water-carry plan is recorded',detail:'At least one trip day specifies water carried. This is not proof that containers have enough capacity, since product volume fields are not consistently container capacity.',action:'Compare daily planned carries with your actual bottle, bladder, or reservoir volumes.',basis:'Trip Planner waterCarryL fields',itemIds:matching('water').map(i=>i.id)});
  if (forecast?.days.some(d=>d.samples<=0)) add({id:'sparse-forecast',section:'weather',level:'unknown',title:'Sparse forecast samples',detail:'At least one forecast day has no model samples; do not treat it as verified.',action:'Review source data and trip timing.',basis:'ECCC sampled days',itemIds:[]});

  // The exact same compatibility IDs, severity, evidence, and actions
  // are used in Gear, Analysis, and the Gear summary bar.
  // Forecast observations remain separate weather findings: loading a forecast
  // must not silently change user-entered trip conditions in one tab only.
  const compatibilityIssues = evaluateCompatibility(build, [...items], [...days]);
  findings.push(...compatibilityIssues.map(compatibilityIssueToFinding));

  findings.sort((a,b)=>priority[a.level]-priority[b.level]||a.section.localeCompare(b.section)||a.title.localeCompare(b.title));
  return {findings,pack,coverage:{ratedSleep:rated.length,unratedSleep:unrated.length,unknownWeights:pack.unknownWeightUnits,tripDays:days.length,modelDays:forecast?.days.length??0},plannedNights:nights,coldest,weatherSource};
}

/** Interpret model-first ECCC API output without inventing missing data or accepting an error payload. */
export function parseEcccEvidence(raw:unknown, point:ForecastPoint, relevantDates:readonly string[]):ForecastEvidence {
  if (!raw || typeof raw!=='object') throw new Error('Invalid ECCC response');
  const v=raw as Record<string,unknown>;
  if (!Array.isArray(v.daily) || !v.alerts || typeof v.alerts!=='object') throw new Error('Expected model-first ECCC data. Check the weather integration installation.');
  const alerts=v.alerts as Record<string,unknown>;
  const status: 'ok'|'unavailable' = alerts.status==='ok'?'ok':'unavailable';
  const dates=new Set(relevantDates.filter(d=>/^\d{4}-\d{2}-\d{2}$/.test(d)));
  const num=(n:unknown):number|null=>typeof n==='number'&&Number.isFinite(n)?n:null;
  const daily:ForecastDay[]=v.daily.filter(d=>d&&typeof d==='object').map(d=>{
    const o=d as Record<string,unknown>;
    return {date:String(o.date??''),low:num(o.low),high:num(o.high),wind:num(o.wind),gust:num(o.gust),pop:num(o.pop),model:String(o.model||'ECCC model'),samples:typeof o.samples==='number'&&Number.isFinite(o.samples)?o.samples:0};
  }).filter(d=>/^\d{4}-\d{2}-\d{2}$/.test(d.date)&&d.samples>0&&dates.has(d.date));
  const alertItems=Array.isArray(alerts.items)?alerts.items.map((a:unknown)=>({title:a&&typeof a==='object'&&typeof (a as Record<string,unknown>).title==='string'?String((a as Record<string,unknown>).title):'Official weather alert'})):[];
  return {point,days:daily,alertsStatus:status,alerts:alertItems,loadedAt:new Date().toISOString()};
}

export function projectConsumables(totalGrams:number, nights:number, dailyFraction:number) {
  const days=Math.min(31,Math.max(1,Math.trunc(nights)+1));
  const fraction=Math.max(0,Math.min(1,Number.isFinite(dailyFraction)?dailyFraction:0));
  return Array.from({length:days},(_,idx)=>({day:idx+1,remainingGrams:Math.round(Math.max(0,totalGrams*(1-idx*fraction))*100)/100}));
}


```

### `lib/prisma.ts`

```typescript
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

### `lib/profile.ts`

```typescript
import { calculateTotalCost, calculateWeightBreakdown } from "@/lib/calculations";
import { weightText, type WeightUnit } from "@/lib/user-preferences";

export type ProfileBuild = {
  id: string;
  name: string;
  location: string | null;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  items: Array<{
    quantity: number;
    isConsumable: boolean;
    isWorn: boolean;
    weightSnapshot: number | null;
    priceSnapshot: number | null;
    gear: { weight_g: number | null; price_cad: number | null } | null;
  }>;
};

export function summarizeBuild(build: ProfileBuild) {
  const weight = calculateWeightBreakdown(build.items);
  return { ...weight, cost: calculateTotalCost(build.items), itemCount: build.items.reduce((sum, item) => sum + item.quantity, 0) };
}

export function buildStatus(build: Pick<ProfileBuild, "startDate" | "endDate">) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (build.endDate && build.endDate < today) return "past" as const;
  if (build.startDate && build.startDate >= today) return "upcoming" as const;
  return "undated" as const;
}

export function dateRange(start: Date | null, end: Date | null) {
  if (!start) return "Dates not set";
  const date = (value: Date) => value.toLocaleDateString(undefined, { month: "short", day: "numeric", timeZone: "UTC" });
  return end ? `${date(start)} – ${date(end)}` : date(start);
}

export function weightLabel(grams: number, unit: WeightUnit = "metric") {
  return weightText(grams, unit);
}

```

### `lib/tracked-build-actions.ts`

```typescript
"use client";

import * as gear from "@/app/build/actions";
import * as trip from "@/lib/trip-planner-actions";
import * as history from "@/lib/build-history-actions";
import { renameBuild as rename } from "@/lib/build-settings-actions";
import { setBuildVisibility as visibility } from "@/lib/build-visibility-actions";
import { trackBuildSave } from "@/lib/build-save-status";
const id = (form: FormData) => String(form.get("buildId") ?? "");
const item = (form: FormData) => String(form.get("itemId") ?? "");
export const updateQuantity = (form: FormData) => trackBuildSave(id(form), `quantity:${item(form)}`, () => gear.updateQuantity(form));
export const setItemCategory = (form: FormData) => trackBuildSave(id(form), `category:${item(form)}`, () => gear.setItemCategory(form));
export const addCustomItem = (form: FormData) => trackBuildSave(id(form), "custom-item", () => gear.addCustomItem(form));
export const addGear = (form: FormData) => trackBuildSave(id(form), "add-gear", () => gear.addGear(form));
export const removeGear = (form: FormData) => trackBuildSave(id(form), `remove:${item(form)}`, () => gear.removeGear(form));
export const duplicateBuild = (form: FormData) => trackBuildSave(id(form), "duplicate", () => gear.duplicateBuild(form));
export const importBuildItems = (form: FormData) => trackBuildSave(id(form), "import", () => gear.importBuildItems(form));
export const updateTripDetails = (form: FormData) => trackBuildSave(id(form), "trip-details", () => gear.updateTripDetails(form));
export const updateTripDay = (form: FormData) => trackBuildSave(id(form), `trip-day:${String(form.get("dayId") ?? "")}`, () => gear.updateTripDay(form));
export const updateTripDayNote = (form: FormData) => trackBuildSave(id(form), `trip-day-note:${String(form.get("dayId") ?? "")}`, () => trip.saveTripDayNote(form));
export const saveTripLogistics = (form: FormData) => trackBuildSave(id(form), "logistics", () => trip.saveTripLogistics(form));
export const saveTripRoute = (form: FormData) => trackBuildSave(id(form), "route", () => trip.saveTripRoute(form));
export const renameBuild = (buildId: string, name: string) => trackBuildSave(buildId, "rename", () => rename(buildId, name));
export const setBuildVisibility = (buildId: string, isPublic: boolean) => trackBuildSave(buildId, "visibility", () => visibility(buildId, isPublic));
export const restoreBuildRevision = (buildId: string, revisionId: string) => trackBuildSave(buildId, "restore", () => history.restoreBuildRevision(buildId, revisionId));
export const undoLastBuildChange = (buildId: string) => trackBuildSave(buildId, "undo", () => history.undoLastBuildChange(buildId));
// Reads do not change the save indicator.
export { getBuildExport } from "@/app/build/actions";
export { getBuildHistory } from "@/lib/build-history-actions";

export const updateTripDaySummary = (form: FormData) => trackBuildSave(id(form), `trip-day-summary:${String(form.get("dayId") ?? "")}`, () => trip.saveTripDaySummary(form));

```

### `lib/trip-planner-actions.ts`

```typescript
"use server";
import { requireBuildAccess, requireTripDayAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { getDestination } from "@/lib/destinations";
import { getDateRange } from "@/lib/trip";
import { dayTextFields, emptyLogistics, nullableNumber, parseDates } from "@/lib/trip-planner";
import { mutateBuildWithRevision } from "@/lib/build-history";
import { parseLogistics } from "@/lib/build-validation";
import { validatedRoute } from "@/lib/itinerary-links";
const text = (f: FormData, key: string, max = 5000) => { const v = f.get(key); if (v != null && typeof v !== "string") throw new Error(`Invalid ${key}.`); const s = (v ?? "").trim(); if (s.length > max) throw new Error(`${key} is too long (maximum ${max} characters).`); return s || null; };
const number = (f: FormData, key: string, min: number, max: number, integer = false) => nullableNumber(f.get(key),key,min,max,integer);
const condition = (f: FormData) => { const v = text(f,"conditions",20); if (v && !["dry","rain","snow"].includes(v)) throw new Error("Choose a valid weather condition."); return v; };
export async function saveTripDetails(f: FormData) {
  const buildId = text(f,"buildId",200)!;
  const access = await requireBuildAccess(buildId);
  const dates = parseDates(text(f,"startDate",10) ?? "", text(f,"endDate",10) ?? "");
  const selected = getDestination(text(f,"destinationId",200));
  const lat = selected?.latitude ?? number(f,"locationLat",-90,90), lng = selected?.longitude ?? number(f,"locationLng",-180,180);
  if ((lat == null) !== (lng == null)) throw new Error("Provide both location coordinates.");
  const data = { ...dates, destinationId: selected?.id ?? null, location: selected ? `${selected.name}, ${selected.park}` : text(f,"location",500), locationLat: lat, locationLng: lng, people: number(f,"people",1,100,true) ?? 1, minTemperature: number(f,"minTemperature",-100,60,true), conditions: condition(f) };
  await mutateBuildWithRevision(buildId, access.userId, "trip", "Updated trip details", async tx => {
    const old = await tx.tripDay.findMany({ where: { buildId }, select: { id: true, date: true } });
    const range = dates.startDate && dates.endDate ? getDateRange(dates.startDate,dates.endDate) : [];
    const keys = new Set(range.map(d => d.getTime()));
    if (old.some(d => !keys.has(d.date.getTime())) && f.get("confirmDateChange") !== "yes") throw new Error("The new dates remove itinerary days. Tick the confirmation box to discard those days. Days still within the range will be kept.");
    const removedIds = new Set(old.filter((day) => !keys.has(day.date.getTime())).map((day) => day.id));
    if (removedIds.size) {
      const build = await tx.build.findUnique({ where: { id: buildId, userId: access.userId }, select: { routeWaypoints: true } });
      const route = validatedRoute(build?.routeWaypoints);
      if (route) {
        const points = route.map((point) => point.dayId && removedIds.has(point.dayId) ? { ...point, dayId: null } : point);
        await tx.build.update({ where: { id: buildId, userId: access.userId }, data: { routeWaypoints: JSON.parse(JSON.stringify(points)) } });
      }
    }
    await tx.build.update({ where: { id: buildId, userId: access.userId }, data });
    if (range.length) await tx.tripDay.createMany({ data: range.map(date => ({ buildId,date })), skipDuplicates: true });
    await tx.tripDay.deleteMany({ where: { buildId, date: { notIn: range } } });
  });
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripDay(f: FormData) {
  const buildId = text(f,"buildId",200)!, dayId = text(f,"dayId",200)!;
  const day = await requireTripDayAccess(buildId,dayId);
  // Compact day editor omits notes; do not overwrite independently edited day notes.
  const strings = Object.fromEntries(dayTextFields.filter(key => f.has(key)).map(key => [key,text(f,key)]));
  const data = { ...strings, conditions: condition(f), minTemperature: number(f,"minTemperature",-100,60,true), distanceKm: number(f,"distanceKm",0,1000), elevationGainM: number(f,"elevationGainM",0,20000,true), elevationLossM: number(f,"elevationLossM",0,20000,true), durationMinutes: number(f,"durationMinutes",0,1440,true), waterCarryL: number(f,"waterCarryL",0,100) };
  await mutateBuildWithRevision(buildId, day.accessUserId, "itinerary", "Updated itinerary day", async tx => {
    await tx.tripDay.update({ where: { id: dayId, buildId, build: { userId: day.accessUserId } }, data });
  });
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripDaySummary(f: FormData) {
  const buildId = text(f, "buildId", 200)!, dayId = text(f, "dayId", 200)!;
  const day = await requireTripDayAccess(buildId, dayId);
  const summary = text(f, "summary", 100);
  await mutateBuildWithRevision(buildId, day.accessUserId, "itinerary", "Updated day summary", async tx => {
    await tx.tripDay.update({ where: { id: dayId, buildId, build: { userId: day.accessUserId } }, data: { activities: summary } });
  });
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripDayNote(f: FormData) {
  const buildId = text(f,"buildId",200)!, dayId = text(f,"dayId",200)!;
  const day = await requireTripDayAccess(buildId, dayId);
  const note = text(f, "note", 5000);
  await mutateBuildWithRevision(buildId, day.accessUserId, "itinerary", "Updated day note", async tx => {
    await tx.tripDay.update({ where: { id: dayId, buildId, build: { userId: day.accessUserId } }, data: { notes: note } });
  });
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripRoute(f: FormData) {
  const buildId = text(f,"buildId",200)!, access = await requireBuildAccess(buildId);
  const raw: unknown = JSON.parse(text(f,"waypoints",100000) ?? "[]");
  const points = validatedRoute(raw);
  if (!points) throw new Error("Route must be a list of stops.");
  await mutateBuildWithRevision(buildId, access.userId, "route", "Updated trip route", async tx => {
    // Validate links inside the serialized transaction, after any date changes.
    const assignedIds = [...new Set(points.map(p => p.dayId).filter((v): v is string => typeof v === "string"))];
    if (assignedIds.length) {
      const matchingDays = await tx.tripDay.findMany({
        where: { buildId, id: { in: assignedIds } }, select: { id: true },
      });
      if (matchingDays.length !== assignedIds.length) {
        throw new Error("One or more route stops refer to a removed trip day. Reassign those stops and try again.");
      }
    }
    await tx.build.update({
      where: { id: buildId, userId: access.userId },
      data: { routeWaypoints: points.map(p => ({ ...p, name: p.name.trim(), ...(p.dayId ? { dayId: p.dayId } : {}) })) },
    });
  });
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripLogistics(f: FormData) {
  const buildId = text(f,"buildId",200)!, access = await requireBuildAccess(buildId);
  const value = parseLogistics(Object.fromEntries(Object.keys(emptyLogistics).map(key=>[key,text(f,key) ?? ""])))!;
  await mutateBuildWithRevision(buildId, access.userId, "logistics", "Updated trip logistics", async tx => {
    await tx.build.update({ where: { id: buildId, userId: access.userId }, data: { tripLogistics: value } });
  });
  revalidatePath(`/build/${buildId}`);
}

```

### `lib/trip-planner.ts`

```typescript

export type Waypoint = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  elevationM: number | null;
  dayId?: string | null;
  time?: string | null;
  note?: string | null;
  kind: "trailhead" | "camp" | "water" | "waypoint";
};
export type Logistics = { permits: string; reservations: string; transportation: string; parking: string; emergencyContact: string; emergencyPlan: string; notes: string };
export const emptyLogistics: Logistics = { permits: "", reservations: "", transportation: "", parking: "", emergencyContact: "", emergencyPlan: "", notes: "" };
export type PlannerDay = { id: string; date: Date; minTemperature: number | null; conditions: string | null; notes: string | null; startLocation: string | null; endLocation: string | null; distanceKm: number | null; elevationGainM: number | null; elevationLossM: number | null; durationMinutes: number | null; campsite: string | null; reservation: string | null; waterSource: string | null; waterCarryL: number | null; trailConditions: string | null; activities: string | null };
export type PlannerBuild = { id: string; location: string | null; locationLat: number | null; locationLng: number | null; startDate: Date | null; endDate: Date | null; people: number; minTemperature: number | null; conditions: string | null; days: PlannerDay[]; routeWaypoints?: unknown; tripLogistics?: unknown };
export const dayTextFields = ["startLocation", "endLocation", "campsite", "reservation", "waterSource", "trailConditions", "activities", "notes"] as const;
export function plannedDay(day: PlannerDay) { return !!(day.startLocation?.trim() && day.endLocation?.trim() && day.distanceKm != null); }
export function tripTotals(days: PlannerDay[]) {
  const sum = (key: "distanceKm" | "elevationGainM" | "elevationLossM" | "durationMinutes") => days.reduce((n,d) => n + (d[key] ?? 0), 0);
  return { distanceKm: sum("distanceKm"), gainM: sum("elevationGainM"), lossM: sum("elevationLossM"), minutes: sum("durationMinutes"), measuredDays: days.filter(d => d.distanceKm != null).length, plannedDays: days.filter(plannedDay).length };
}
export function readWaypoints(value: unknown): Waypoint[] {
  if (!Array.isArray(value)) return [];
  return value.filter((p): p is Waypoint => !!p && typeof p === "object" && typeof p.id === "string" && typeof p.name === "string" && Number.isFinite(p.lat) && Number.isFinite(p.lng) && Math.abs(p.lat) <= 90 && Math.abs(p.lng) <= 180 && ["trailhead","camp","water","waypoint"].includes(p.kind) && (p.elevationM === null || Number.isFinite(p.elevationM)) && (p.dayId === undefined || p.dayId === null || (typeof p.dayId === "string" && p.dayId.length > 0 && p.dayId.length <= 200)) && (p.time === undefined || p.time === null || (typeof p.time === "string" && (!p.time || /^([01]\d|2[0-3]):[0-5]\d$/.test(p.time)))) && (p.note === undefined || p.note === null || (typeof p.note === "string" && p.note.length <= 500)));
}
export function readLogistics(value: unknown): Logistics {
  const result = { ...emptyLogistics };
  if (value && typeof value === "object") for (const key of Object.keys(result) as (keyof Logistics)[]) { const v = (value as Record<string, unknown>)[key]; if (typeof v === "string") result[key] = v; }
  return result;
}
export function nullableNumber(raw: unknown, label: string, min: number, max: number, integer = false): number | null {
  if (raw == null || raw === "") return null;
  if (typeof raw !== "string" && typeof raw !== "number") throw new Error(`${label} must be a number.`);
  const n = Number(raw);
  if (!Number.isFinite(n) || n < min || n > max || (integer && !Number.isInteger(n))) throw new Error(`${label} must be ${integer ? "a whole number " : ""}between ${min} and ${max}.`);
  return n;
}
export function parseDates(startRaw: string, endRaw: string) {
  if (!startRaw && !endRaw) return { startDate: null, endDate: null };
  const valid = (raw: string) => /^\d{4}-\d{2}-\d{2}$/.test(raw) && Number.isFinite(new Date(raw).getTime()) && new Date(raw).toISOString().slice(0,10) === raw;
  if (!valid(startRaw) || !valid(endRaw)) throw new Error("Choose both a valid start and end date.");
  const startDate = new Date(startRaw), endDate = new Date(endRaw);
  if (endDate < startDate) throw new Error("End date must be on or after start date.");
  if ((endDate.getTime()-startDate.getTime())/86400000 > 365) throw new Error("Trips can span up to 366 days.");
  return { startDate, endDate };
}

```

### `lib/trip.ts`

```typescript
export function getDateRange(start: Date, end: Date): Date[] {
  const days: Date[] = [];
  const cursor = new Date(
    Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate())
  );
  const last = new Date(
    Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate())
  );

  while (cursor.getTime() <= last.getTime()) {
    days.push(new Date(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return days;
}

export function formatDateRange(start: Date | null, end: Date | null): string {
  if (!start || !end) return "No dates set";

  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();

  const startLabel = start.toLocaleDateString(undefined, { ...opts, timeZone: "UTC" });
  const endLabel = end.toLocaleDateString(undefined, {
    ...opts,
    year: "numeric",
    timeZone: "UTC",
  });

  if (sameYear) {
    return `${startLabel} – ${endLabel}`;
  }

  const startLabelWithYear = start.toLocaleDateString(undefined, {
    ...opts,
    year: "numeric",
    timeZone: "UTC",
  });

  return `${startLabelWithYear} – ${endLabel}`;
}

export function getNights(start: Date | null, end: Date | null): number {
  if (!start || !end) return 0;

  const startUTC = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
  const endUTC = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());

  return Math.max(0, Math.round((endUTC - startUTC) / 86400000));
}

export function getDaysUntil(start: Date | null): number | null {
  if (!start) return null;

  const now = new Date();
  const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const startUTC = Date.UTC(
    start.getUTCFullYear(),
    start.getUTCMonth(),
    start.getUTCDate()
  );

  return Math.round((startUTC - todayUTC) / 86400000);
}
```

### `lib/use-build-autosave.ts`

```typescript
"use client";

import { useEffect, useRef } from "react";
import { clearBuildDirty, failBuildSave, markBuildDirty } from "@/lib/build-save-status";

type Options = { buildId: string; resource: string; save: (data: FormData) => Promise<unknown>; enabled?: boolean; canAutosave?: (data: FormData) => boolean; onError?: (message: string) => void; onSaved?: () => void };
const signature = (data: FormData) => JSON.stringify([...data.entries()].map(([key, value]) => [key, typeof value === "string" ? value : value.name]));
export function useBuildAutosave(options: Options) {
  const formRef = useRef<HTMLFormElement>(null);
  const latest = useRef(options); latest.current = options;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSaved = useRef<string | null>(null);
  const queue = useRef<Promise<void>>(Promise.resolve());
  const mounted = useRef(false);
  const skipStaleUnmountSave = useRef(false);
  // A full import/restore replaces this form's saved contents. Do not let an
  // old debounce or editor cleanup immediately overwrite the restored data.
  useEffect(() => {
    const onReplaced = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== latest.current.buildId) return;
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
      skipStaleUnmountSave.current = true;
      clearBuildDirty(latest.current.buildId, latest.current.resource);
    };
    window.addEventListener("trailpicker:build-replaced", onReplaced);
    return () => window.removeEventListener("trailpicker:build-replaced", onReplaced);
  }, []);

  function saveNow(data: FormData): Promise<void> {
    if (timer.current) clearTimeout(timer.current);
    const snapshot = new FormData(); data.forEach((value, key) => snapshot.append(key, value));
    const key = signature(snapshot);
    const task = queue.current.catch(() => {}).then(async () => {
      if (key === lastSaved.current) {
        if (formRef.current && signature(new FormData(formRef.current)) !== key) changed();
        else clearBuildDirty(latest.current.buildId, latest.current.resource);
        return;
      }
      const current = latest.current;
      try {
        await current.save(snapshot);
        lastSaved.current = key;
        if (mounted.current) { current.onError?.(""); current.onSaved?.(); }
        const form = formRef.current;
        if (form && signature(new FormData(form)) !== key) changed();
      } catch (error) {
        const message = error instanceof Error ? error.message : "Could not save. Try again.";
        failBuildSave(current.buildId, current.resource, message);
        if (mounted.current) current.onError?.(message);
        throw error;
      }
    });
    queue.current = task;
    return task;
  }
  function changed() {
    if (!formRef.current || latest.current.enabled === false) return;
    skipStaleUnmountSave.current = false;
    if (timer.current) clearTimeout(timer.current);
    const data = new FormData(formRef.current), current = latest.current;
    if (signature(data) === lastSaved.current) { clearBuildDirty(current.buildId, current.resource); return; }
    const allowed = current.canAutosave?.(data) !== false;
    markBuildDirty(current.buildId, current.resource, allowed ? "Changes waiting to save…" : "Date changes need Save Trip Details.");
    if (!allowed) return;
    timer.current = setTimeout(() => {
      const form = formRef.current;
      if (!form) return;
      if (!form.checkValidity()) {
        const message = "Complete the highlighted fields to save changes.";
        failBuildSave(current.buildId, current.resource, message); current.onError?.(message); return;
      }
      void saveNow(new FormData(form)).catch(() => {});
    }, 900);
  }
  useEffect(() => {
    const form = formRef.current;
    if (!form || options.enabled === false) return;
    mounted.current = true;
    lastSaved.current = signature(new FormData(form));
    // Native events plus hidden-value mutations cover date/destination pickers.
    const observer = new MutationObserver(changed);
    observer.observe(form, { subtree: true, attributes: true, attributeFilter: ["value", "checked"] });
    form.addEventListener("input", changed); form.addEventListener("change", changed);
    return () => {
      observer.disconnect(); form.removeEventListener("input", changed); form.removeEventListener("change", changed);
      mounted.current = false;
      if (timer.current) clearTimeout(timer.current);
      const data = new FormData(form);
      if (!skipStaleUnmountSave.current && signature(data) !== lastSaved.current && form.checkValidity() && latest.current.canAutosave?.(data) !== false) void saveNow(data).catch(() => {});
      else if (skipStaleUnmountSave.current || latest.current.canAutosave?.(data) === false) clearBuildDirty(latest.current.buildId, latest.current.resource);
    };
    // The form lifecycle depends on its editor opening, not on refreshed server props.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.enabled]);
  return { formRef, saveNow };
}

```

### `lib/user-preferences.ts`

```typescript
/** Display-only preferences; calculations and stored trip values remain metric. */
export type WeightUnit = "metric" | "imperial";
export type DistanceUnit = "metric" | "imperial";
export type TemperatureUnit = "c" | "f";

export type DisplayPreferences = {
  weightUnit: WeightUnit;
  distanceUnit: DistanceUnit;
  temperatureUnit: TemperatureUnit;
};

export type UserPreferences = DisplayPreferences & {
  defaultBuildPublic: boolean;
};

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  weightUnit: "metric",
  distanceUnit: "metric",
  temperatureUnit: "c",
  defaultBuildPublic: false,
};

export function preferencesFromRow(row: Partial<UserPreferences> | null | undefined): UserPreferences {
  return {
    weightUnit: row?.weightUnit === "imperial" ? "imperial" : "metric",
    distanceUnit: row?.distanceUnit === "imperial" ? "imperial" : "metric",
    temperatureUnit: row?.temperatureUnit === "f" ? "f" : "c",
    defaultBuildPublic: row?.defaultBuildPublic === true,
  };
}

export function weightText(grams: number | null | undefined, unit: WeightUnit = "metric"): string {
  if (grams == null || !Number.isFinite(grams)) return "—";
  if (unit === "imperial") {
    const ounces = grams / 28.349523125;
    return ounces >= 16 ? `${(ounces / 16).toFixed(2)} lb` : `${ounces.toFixed(1)} oz`;
  }
  return grams >= 1000 ? `${(grams / 1000).toFixed(2)} kg` : `${Math.round(grams)} g`;
}

export function distanceText(km: number | null | undefined, unit: DistanceUnit = "metric"): string {
  if (km == null || !Number.isFinite(km)) return "—";
  return unit === "imperial" ? `${(km * 0.6213711922).toFixed(1)} mi` : `${km.toFixed(1)} km`;
}

export function temperatureNumber(celsius: number | null | undefined, unit: TemperatureUnit = "c") {
  return celsius == null || !Number.isFinite(celsius) ? null : unit === "f" ? celsius * 9 / 5 + 32 : celsius;
}

export function temperatureText(celsius: number | null | undefined, unit: TemperatureUnit = "c"): string {
  const value = temperatureNumber(celsius, unit);
  return value == null ? "—" : `${Math.round(value)}°${unit === "f" ? "F" : "C"}`;
}

export function windText(kmh: number | null | undefined, unit: DistanceUnit = "metric") {
  if (kmh == null || !Number.isFinite(kmh)) return "—";
  return unit === "imperial" ? `${Math.round(kmh * 0.6213711922)} mph` : `${Math.round(kmh)} km/h`;
}

```

### `lib/waypoint-map.ts`

```typescript
import type { Waypoint } from "@/lib/trip-planner";

export const WAYPOINT_TYPES = [
  { kind: "trailhead", label: "Trailhead", color: "#166534", path: "M5 21V3m0 0h13l-3 4 3 4H5" },
  { kind: "camp", label: "Campsite", color: "#b45309", path: "m3 20 9-16 9 16H3Zm6 0 3-6 3 6M9 3l3 1 3-1" },
  { kind: "water", label: "Water", color: "#0369a1", path: "M12 3s-7 8-7 12a7 7 0 0 0 14 0c0-4-7-12-7-12Z" },
  { kind: "waypoint", label: "Stop", color: "#475569", path: "M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0ZM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" },
] as const;

export function waypointType(kind: Waypoint["kind"]) {
  return WAYPOINT_TYPES.find(type => type.kind === kind) ?? WAYPOINT_TYPES[3];
}

export function nextWaypointName(points: Waypoint[], kind: Waypoint["kind"]) {
  const label = waypointType(kind).label;
  const used = new Set(points.map(point => point.name.trim().toLocaleLowerCase()));
  let n = 1;
  while (used.has(`${label} ${n}`.toLocaleLowerCase())) n++;
  return `${label} ${n}`;
}

export function validCoordinates(lat: unknown, lng: unknown): lat is number {
  return typeof lat === "number" && Number.isFinite(lat) && Math.abs(lat) <= 90 &&
    typeof lng === "number" && Number.isFinite(lng) && Math.abs(lng) <= 180;
}

export function moveWaypoint(points: Waypoint[], index: number, delta: -1 | 1): Waypoint[] {
  const next = index + delta;
  if (index < 0 || index >= points.length || next < 0 || next >= points.length) return points;
  const result = [...points];
  [result[index], result[next]] = [result[next], result[index]];
  return result;
}


export function routeForSave(points: Waypoint[]): Waypoint[] {
  if (points.length > 200) {
    throw new Error("A route can have up to 200 stops.");
  }

  const ids = new Set<string>();

  return points.map(point => {
    if (!point.id || point.id.length > 200 || ids.has(point.id)) {
      throw new Error("One of the stops has an invalid ID. Reload the route and try again.");
    }
    ids.add(point.id);

    if (!validCoordinates(point.lat, point.lng)) {
      throw new Error("One of the stops has an invalid map position.");
    }

    if (!WAYPOINT_TYPES.some(type => type.kind === point.kind)) {
      throw new Error("Choose a valid stop type.");
    }

    const name = point.name.trim();

    if (!name || name.length > 200) {
      throw new Error("Give each stop a name between 1 and 200 characters.");
    }

    if (
      point.elevationM !== null &&
      (!Number.isFinite(point.elevationM) ||
        point.elevationM < -500 ||
        point.elevationM > 9000)
    ) {
      throw new Error("Optional elevation must be between -500 and 9000 m.");
    }

    const time = point.time?.trim() || null;
    const note = point.note?.trim() || null;

    if (time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
      throw new Error("Stop time must be in HH:MM format.");
    }

    if (note && note.length > 500) {
      throw new Error("Stop notes cannot exceed 500 characters.");
    }

    return {
      id: point.id,
      name,
      kind: point.kind,
      lat: point.lat,
      lng: point.lng,
      elevationM: point.elevationM,
      ...(point.dayId ? { dayId: point.dayId } : {}),
      ...(time ? { time } : {}),
      ...(note ? { note } : {}),
    };
  });
}


export type PlaceResult = { id: string; name: string; detail: string; lat: number; lng: number };
const record = (value: unknown): Record<string, unknown> | null => value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;

export function parsePlaceResults(value: unknown): PlaceResult[] {
  const root = record(value);
  if (!root || !Array.isArray(root.features)) return [];
  const results: PlaceResult[] = [];
  const seen = new Set<string>();
  for (const feature of root.features) {
    const row = record(feature), geometry = record(row?.geometry), properties = record(row?.properties);
    if (!properties || geometry?.type !== "Point" || !Array.isArray(geometry.coordinates)) continue;
    const [lng, lat] = geometry.coordinates;
    if (!validCoordinates(lat, lng)) continue;
    const name = [properties.name, properties.street, properties.city].find(text => typeof text === "string" && text.trim());
    if (typeof name !== "string") continue;
    const detail = [...new Set([properties.city, properties.state, properties.country].filter((text): text is string => typeof text === "string" && text.trim() !== "" && text !== name))].join(", ");
    const id = `${String(properties.osm_type ?? "place")}:${String(properties.osm_id ?? "")}:${lat}:${lng}`;
    if (seen.has(id)) continue;
    seen.add(id);
    results.push({ id, name: name.trim().slice(0, 200), detail: detail.slice(0, 400), lat, lng: lng as number });
    if (results.length === 6) break;
  }
  return results;
}

// Only fixed SVG paths, colors, and a numeric order enter marker HTML.
// Names from search/user input are rendered by React, never interpolated here.
export function waypointMarkerHtml(kind: Waypoint["kind"], order: number, selected: boolean) {
  const type = waypointType(kind);
  const count = Math.max(1, Math.min(200, Math.trunc(Number.isFinite(order) ? order : 1)));
  return `<div style="position:relative;display:flex;align-items:center;justify-content:center;width:34px;height:34px;border:2px solid white;border-radius:50%;background:${type.color};box-shadow:0 2px 6px #0004${selected ? ",0 0 0 4px #ffffffcc,0 0 0 6px " + type.color : ""}"><svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${type.path}"/></svg><span style="position:absolute;right:-7px;bottom:-5px;display:flex;align-items:center;justify-content:center;min-width:17px;height:17px;padding:0 3px;border:1px solid #e2e8f0;border-radius:9px;background:white;color:#334155;font:700 10px system-ui">${count}</span></div>`;
}

```

### `lib/weather/cache.ts`

```typescript
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

```

### `lib/weather/client-cache.ts`

```typescript
"use client";

import type { WeatherResult } from "./service";

// The trip forecast, day expansion and pack analysis often request the same
// waypoint. Share both completed responses and requests within this tab.
const MAX_ENTRIES = 32;
const FRESH_FOR_MS = 90_000;
const saved = new Map<string, { data: WeatherResult; at: number }>();
const pending = new Map<string, Promise<WeatherResult>>();

export async function loadWaypointWeather(url: string, force = false): Promise<WeatherResult> {
  if (!force) {
    const hit = saved.get(url);
    if (hit && Date.now() - hit.at < FRESH_FOR_MS) return hit.data;
  }
  const current = pending.get(url);
  if (current) return current;

  const work = (async () => {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      const body = await response.json().catch(() => null) as { error?: string } | null;
      throw new Error(body?.error || `Forecast unavailable (${response.status}).`);
    }
    const data = await response.json() as WeatherResult;
    saved.delete(url);
    saved.set(url, { data, at: Date.now() });
    while (saved.size > MAX_ENTRIES) saved.delete(saved.keys().next().value!);
    return data;
  })();
  pending.set(url, work);
  try {
    return await work;
  } finally {
    if (pending.get(url) === work) pending.delete(url);
  }
}

```

### `lib/weather/core.ts`

```typescript
/** ECCC GeoMet adapters. Missing values remain null; official text is preserved. */
export type Obj = Record<string, unknown>;
export const obj = (v: unknown): Obj =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as Obj) : {};
export const array = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
export function en(v: unknown): unknown {
  const o = obj(v);
  return "value" in o ? en(o.value) : "en" in o ? en(o.en) : v;
}
export function text(v: unknown): string {
  const x = en(v);
  return typeof x === "string" ? x : "";
}
export function num(v: unknown): number | null {
  const x = en(v);
  return (typeof x === "number" ||
    (typeof x === "string" && x.trim() !== "")) &&
    Number.isFinite(Number(x))
    ? Number(x)
    : null;
}
export function iso(v: unknown): string | null {
  const s = text(v);
  return s && Number.isFinite(Date.parse(s)) ? new Date(s).toISOString() : null;
}
export function dateKey(time: string | number, zone: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: zone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(time));
}
export function validDate(s: string): boolean {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(s) &&
    Number.isFinite(Date.parse(s)) &&
    new Date(s).toISOString().slice(0, 10) === s
  );
}
export function distanceKm(
  lat: number,
  lng: number,
  lat2: number,
  lng2: number,
): number {
  const r = Math.PI / 180,
    a =
      Math.sin(((lat2 - lat) * r) / 2) ** 2 +
      Math.cos(lat * r) *
        Math.cos(lat2 * r) *
        Math.sin(((lng2 - lng) * r) / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
}
export type Site = { id: string; lat: number; lng: number };
export function catalog(raw: unknown): Site[] {
  return array(obj(raw).features).flatMap((f) => {
    const o = obj(f),
      g = obj(o.geometry),
      c = array(g.coordinates),
      id = text(obj(o.properties).identifier) || text(o.id);
    return g.type === "Point" &&
      /^[a-z]{2}-\d+$/.test(id) &&
      typeof c[0] === "number" &&
      typeof c[1] === "number"
      ? [{ id, lat: c[1], lng: c[0] }]
      : [];
  });
}
export function nearest(
  sites: Site[],
  lat: number,
  lng: number,
): Site & { distanceKm: number } {
  const ranked = sites
    .map((s) => ({ ...s, distanceKm: distanceKm(lat, lng, s.lat, s.lng) }))
    .sort((a, b) => a.distanceKm - b.distanceKm);
  if (!ranked.length) throw Error("ECCC forecast locations unavailable.");
  return ranked[0];
}
export type Hour = {
  time: string;
  temperature: number | null;
  wind: number | null;
  gust: number | null;
  pop: number | null;
  condition: string;
};
export type Period = {
  date: string;
  label: string;
  summary: string;
  high: number | null;
  low: number | null;
  wind: number | null;
  gust: number | null;
  pop: number | null;
};
const max = (v: (number | null)[]) =>
  v.some((x) => x !== null)
    ? Math.max(...v.filter((x): x is number => x !== null))
    : null;
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export function periodDate(
  label: string,
  issued: string,
  zone: string,
): string | null {
  const base = dateKey(issued, zone),
    lower = label.toLowerCase();
  if (/^(today|tonight|this morning|this afternoon|this evening)$/.test(lower))
    return base;
  const weekday = weekdays.findIndex((w) => lower.startsWith(w.toLowerCase()));
  if (weekday < 0) return null;
  const d = new Date(base + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + ((weekday - d.getUTCDay() + 7) % 7));
  return d.toISOString().slice(0, 10);
}
export function parseCity(raw: unknown, zone: string) {
  const p = obj(obj(raw).properties),
    current = obj(p.currentConditions),
    fg = obj(p.forecastGroup),
    hg = obj(p.hourlyForecastGroup);
  const issued = iso(fg.timestamp),
    hourlyIssued = iso(hg.timestamp);
  const hourly: Hour[] = array(hg.hourlyForecasts).flatMap((h) => {
    const o = obj(h),
      w = obj(o.wind),
      time = iso(o.timestamp);
    return time
      ? [
          {
            time,
            temperature: num(o.temperature),
            wind: num(w.speed),
            gust: num(w.gust),
            pop: num(o.lop),
            condition: text(o.condition),
          },
        ]
      : [];
  });
  const daily: Period[] = issued
    ? array(fg.forecasts).flatMap((f) => {
        const o = obj(f),
          period = obj(o.period),
          label = text(period.textForecastName) || text(period.value);
        const date =
          periodDate(label, issued, zone) ||
          periodDate(text(period.value), issued, zone);
        const temperatures = array(obj(o.temperatures).temperature).map(obj),
          winds = array(obj(o.winds).periods).map(obj);
        return date
          ? [
              {
                date,
                label,
                summary: text(o.textSummary),
                high: num(temperatures.find((t) => text(t.class) === "high")),
                low: num(temperatures.find((t) => text(t.class) === "low")),
                wind: max(winds.map((w) => num(w.speed))),
                gust: max(winds.map((w) => num(w.gust))),
                pop: num(obj(o.abbreviatedForecast).pop),
              },
            ]
          : [];
      })
    : [];
  return {
    name: text(p.name),
    updated: iso(p.lastUpdated),
    issued,
    hourlyIssued,
    url: safeURL(text(p.url)),
    current: {
      time: iso(current.timestamp),
      station: text(current.station),
      condition: text(current.condition),
      temperature: num(current.temperature),
      wind: num(obj(current.wind).speed),
      gust: num(obj(current.wind).gust),
      humidity: num(current.relativeHumidity),
    },
    hourly,
    daily,
  };
}
export function safeURL(url: string): string {
  try {
    const u = new URL(url);
    return u.protocol === "https:" &&
      ["weather.gc.ca", "meteo.gc.ca"].includes(u.hostname)
      ? u.href
      : "https://weather.gc.ca/";
  } catch {
    return "https://weather.gc.ca/";
  }
}
type Ring = number[][];
function inRing(x: number, y: number, ring: Ring): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i],
      [xj, yj] = ring[j];
    const cross = (x - xi) * (yj - yi) - (y - yi) * (xj - xi);
    if (
      Math.abs(cross) < 1e-9 &&
      x >= Math.min(xi, xj) &&
      x <= Math.max(xi, xj) &&
      y >= Math.min(yi, yj) &&
      y <= Math.max(yi, yj)
    )
      return true;
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
      inside = !inside;
  }
  return inside;
}
export function contains(geometry: unknown, lat: number, lng: number): boolean {
  const g = obj(geometry);
  const polygons =
    g.type === "Polygon"
      ? [g.coordinates]
      : g.type === "MultiPolygon"
        ? array(g.coordinates)
        : [];
  return polygons.some((p) => {
    const rings = p as Ring[];
    return (
      Array.isArray(rings) &&
      rings.length > 0 &&
      inRing(lng, lat, rings[0]) &&
      !rings.slice(1).some((r) => inRing(lng, lat, r))
    );
  });
}
export type Alert = {
  id: string;
  title: string;
  text: string;
  area: string;
  colour: string;
  issued: string | null;
  expires: string;
};
export function parseAlerts(
  raw: unknown,
  lat: number,
  lng: number,
  now = Date.now(),
): Alert[] {
  const result: Alert[] = [];
  for (const f of array(obj(raw).features)) {
    const o = obj(f),
      p = obj(o.properties),
      expiry = iso(p.expiration_datetime),
      status = text(p.status_en).toLowerCase();
    if (status === "ended") continue;
    if (
      !["active", "issued", "continued", "updated"].includes(status) ||
      !expiry ||
      !["Polygon", "MultiPolygon"].includes(text(obj(o.geometry).type)) ||
      !text(p.alert_text_en)
    )
      throw Error("Unrecognized ECCC alert payload.");
    if (!expiry || Date.parse(expiry) <= now || !contains(o.geometry, lat, lng))
      continue;
    const issued = iso(p.publication_datetime);
    if (issued && Date.parse(issued) > now) continue;
    const a = {
      id: text(o.id),
      title: text(p.alert_name_en),
      text: text(p.alert_text_en),
      area: text(p.feature_name_en),
      colour: text(p.risk_colour_en),
      issued,
      expires: expiry,
    };
    if (
      !result.some(
        (v) => v.title === a.title && v.text === a.text && v.area === a.area,
      )
    )
      result.push(a);
  }
  return result;
}
export function risk(
  periods: Period[],
  hours: Hour[],
  alerts: Alert[],
  incomplete: boolean,
) {
  const reasons: string[] = [];
  let score = 0;
  const raise = (level: number, reason: string) => {
    score = Math.max(score, level);
    reasons.push(reason);
  };
  const temps = [
    ...periods.flatMap((p) => [p.low, p.high]),
    ...hours.map((h) => h.temperature),
  ].filter((v): v is number => v !== null);
  const winds = [
    ...periods.flatMap((p) => [p.wind, p.gust]),
    ...hours.flatMap((h) => [h.wind, h.gust]),
  ].filter((v): v is number => v !== null);
  const summary = [
    ...periods.map((p) => p.summary),
    ...hours.map((h) => h.condition),
  ].join(" ");
  if (alerts.length)
    raise(
      3,
      "Active official alerts at this location now; read their timing and instructions.",
    );
  if (winds.some((v) => v >= 60))
    raise(3, "Forecast wind/gusts ≥60 km/h: exposed terrain may be hazardous.");
  else if (winds.some((v) => v >= 40))
    raise(2, "Forecast wind/gusts ≥40 km/h: consider ridge exposure.");
  if (temps.some((v) => v <= -10))
    raise(3, "Forecast temperature ≤−10°C: significant cold exposure.");
  else if (temps.some((v) => v <= 0))
    raise(2, "Freezing temperatures: ice or frozen surfaces are possible.");
  if (temps.some((v) => v >= 30))
    raise(2, "Forecast temperature ≥30°C: heat exposure.");
  if (/thunder|freezing rain|blizzard/i.test(summary))
    raise(
      3,
      "Thunderstorms, freezing rain or blizzard conditions mentioned in the forecast.",
    );
  else if (/snow|fog/i.test(summary))
    raise(2, "Snow or fog mentioned: visibility and footing may deteriorate.");
  if (/rain|shower/i.test(summary))
    raise(1, "Rain/showers mentioned: plan for wet conditions.");
  const unknown =
    incomplete || (!periods.length && !hours.length) || !temps.length;
  if (unknown)
    reasons.push(
      "Assessment incomplete: forecast or alert data is missing, stale, or outside the available forecast window.",
    );
  return {
    level:
      score === 3
        ? "High"
        : score === 2
          ? "Elevated"
          : unknown
            ? "Unknown"
            : score === 1
              ? "Caution"
              : "No flagged factors",
    reasons,
  };
}
export function modelValue(raw: unknown): {
  value: number | null;
  time: string | null;
  run: string | null;
} {
  const p = obj(obj(array(obj(raw).features)[0]).properties),
    v = num(p.value);
  return {
    value: v === null || Math.abs(v) > 9990 ? null : v,
    time: iso(p.time),
    run: iso(p.dim_reference_time),
  };
}
export function modelTimes(xml: string): { times: string[]; run: string } {
  const time =
    xml.match(/<Dimension\b[^>]*name="time"[^>]*>([^<]+)<\/Dimension>/)?.[1] ||
    "";
  const run =
    xml.match(
      /<Dimension\b[^>]*name="reference_time"[^>]*default="([^"]+)"/,
    )?.[1] || "";
  const times: string[] = [];
  for (const entry of time.trim().split(",")) {
    if (!entry.includes("/")) {
      if (iso(entry)) times.push(new Date(entry).toISOString());
      continue;
    }
    const [start, end, step] = entry.split("/"),
      hours = Number(step?.match(/^PT(\d+)H$/)?.[1]);
    if (!hours || !iso(start) || !iso(end)) continue;
    for (
      let t = Date.parse(start);
      t <= Date.parse(end) && times.length < 500;
      t += hours * 3600000
    )
      times.push(new Date(t).toISOString());
  }
  if (!iso(run) || !times.length) throw Error("Model schedule unavailable.");
  return { times, run: new Date(run).toISOString() };
}
export function modelURL(
  layer: string,
  lat: number,
  lng: number,
  time: string,
  run: string,
): string {
  return (
    "https://geo.weather.gc.ca/geomet?" +
    new URLSearchParams({
      SERVICE: "WMS",
      VERSION: "1.3.0",
      REQUEST: "GetFeatureInfo",
      LAYERS: layer,
      QUERY_LAYERS: layer,
      CRS: "EPSG:4326",
      BBOX: `${lat - 0.01},${lng - 0.01},${lat + 0.01},${lng + 0.01}`,
      WIDTH: "3",
      HEIGHT: "3",
      I: "1",
      J: "1",
      INFO_FORMAT: "application/json",
      FORMAT: "image/png",
      TIME: time.replace(/\.\d{3}Z$/, "Z"),
      DIM_REFERENCE_TIME: run.replace(/\.\d{3}Z$/, "Z"),
    })
  );
}

```

### `lib/weather/locations.ts`

```typescript
import {
  readWaypoints,
  type PlannerBuild,
  type PlannerDay,
} from "../trip-planner";
export type WeatherPoint = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  elevationM: number | null;
};
export function weatherPoints(build: PlannerBuild): WeatherPoint[] {
  const points: WeatherPoint[] = readWaypoints(build.routeWaypoints).map(
    (p) => ({
      id: p.id,
      name: p.name,
      lat: p.lat,
      lng: p.lng,
      elevationM: p.elevationM,
    }),
  );
  if (build.locationLat !== null && build.locationLng !== null)
    points.unshift({
      id: "trip-location",
      name: build.location || "Trip location",
      lat: build.locationLat,
      lng: build.locationLng,
      elevationM: null,
    });
  return points;
}
export function dayWeatherPoint(
  day: Pick<PlannerDay, "campsite" | "endLocation" | "startLocation">,
  points: WeatherPoint[],
): string | undefined {
  for (const name of [day.campsite, day.endLocation, day.startLocation]) {
    if (!name?.trim()) continue;
    const matches = points.filter(
      (p) => p.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );
    if (matches.length === 1) return matches[0].id;
  }
  return undefined;
}

```

### `lib/weather/model-forecast.ts`

```typescript
/** ECCC deterministic model schedule selection. No city/observation substitution. */
import { dateKey, risk, type Alert, type Hour, type Period } from "./core";

export type ModelId = "HRDPS" | "RDPS" | "GDPS";
export const MODELS = [
  { id: "HRDPS", km: 2.5, horizonHours: 48, temperature: "HRDPS.CONTINENTAL_TT", wind: "HRDPS.CONTINENTAL_WSPD", gust: "HRDPS.CONTINENTAL_WGE" },
  { id: "RDPS", km: 10, horizonHours: 84, temperature: "RDPS_10km_AirTemp_2m", wind: "RDPS_10km_WindSpeed_10m", gust: "RDPS_10km_WindGust_10m" },
  { id: "GDPS", km: 15, horizonHours: 240, temperature: "GDPS_15km_AirTemp_2m", wind: "GDPS_15km_WindSpeed_10m", gust: "GDPS_15km_WindGust_10m" },
] as const;
export type ModelDef = (typeof MODELS)[number];
export type Schedule = { model: ModelDef; times: string[]; run: string };
export type ModelHour = Hour & {
  model: ModelId;
  resolutionKm: number;
  run: string;
  /** GDPS cloud fraction in percent when a verified grid sample exists. */
  cloudCover?: number;
  /** Deterministic model output, NOT measured current conditions. */
  sampled: true;
};
export type ModelDay = {
  date: string;
  high: number | null;
  low: number | null;
  wind: number | null;
  gust: number | null;
  pop: number | null; // Only populated from a separately verified probabilistic layer.
  /** Mean of actual available cloud-cover samples; not a daily sky observation. */
  cloudCover?: number;
  summary: string;
  model: string;
  samples: number;
  /** Values are extrema of sampled hours, not official predicted daily highs/lows. */
  sampledExtrema: true;
};
export function modelPriority(at: string, schedules: Schedule[], now: number): Schedule[] {
  const stamp = Date.parse(at);
  if (!Number.isFinite(stamp) || stamp < now - 3600000 || stamp > now + 240 * 3600000) return [];
  return schedules.filter(s => s.times.includes(at) && stamp >= Date.parse(s.run) && stamp - Date.parse(s.run) <= s.model.horizonHours * 3600000)
    .sort((a, b) => MODELS.indexOf(a.model) - MODELS.indexOf(b.model));
}
export function chooseTimes(schedules: Schedule[], zone: string, date: string, now: number): string[] {
  const all = [...new Set(schedules.flatMap(s => s.times))]
    .filter(t => modelPriority(t, schedules, now).length && (!date || dateKey(t, zone) === date))
    .sort();
  // Hourly next 24h, thereafter sample at synoptic times. No interpolation or manufactured hours.
  return all.filter(t => {
    const lead = (Date.parse(t) - now) / 3600000;
    if (date) return lead <= 24 ? true : new Date(t).getUTCHours() % 3 === 0;
    return lead <= 24 ? true : lead <= 84 ? new Date(t).getUTCHours() % 6 === 0 : new Date(t).getUTCHours() % 12 === 0;
  }).slice(0, date ? 24 : 58);
}
/**
 * A first-paint forecast: a few real model timestamps distributed across days.
 * Never interpolate between samples. Full-resolution timestamps remain available
 * through chooseTimes() when a user explicitly requests details.
 */
export function chooseSummaryTimes(schedules: Schedule[], zone: string, date: string, now: number): string[] {
  const available = chooseTimes(schedules, zone, date, now);
  const groups = new Map<string, string[]>();
  for (const time of available) {
    const key = dateKey(time, zone);
    groups.set(key, [...(groups.get(key) ?? []), time]);
  }
  const localHour = (time: string) => Number(new Intl.DateTimeFormat("en-GB", {
    timeZone: zone, hour: "2-digit", hourCycle: "h23",
  }).format(new Date(time)));
  const selected = new Set<string>();
  for (const [day, hours] of groups) {
    const firstDay = day === groups.keys().next().value;
    const targets = date ? [6, 12, 18] : firstDay ? [6, 12, 18] : selected.size < 7 ? [7, 18] : [12];
    if (firstDay) selected.add(hours[0]);
    for (const hour of targets) {
      const best = hours.reduce((prev, current) =>
        Math.abs(localHour(current) - hour) < Math.abs(localHour(prev) - hour) ? current : prev);
      selected.add(best);
    }
  }
  return [...selected].sort().slice(0, date ? 5 : 16);
}

export function summarizeModel(hours: ModelHour[], zone: string): ModelDay[] {
  const groups = new Map<string, ModelHour[]>();
  for (const h of hours) {
    const day = dateKey(h.time, zone);
    groups.set(day, [...(groups.get(day) ?? []), h]);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, hs]) => {
    const temp = hs.map(h => h.temperature).filter((n): n is number => n !== null);
    const wind = hs.map(h => h.wind).filter((n): n is number => n !== null);
    const gust = hs.map(h => h.gust).filter((n): n is number => n !== null);
    const pops = hs.map(h => h.pop).filter((n): n is number => n !== null);
    const cloud = hs.map(h => h.cloudCover).filter((n): n is number => typeof n === "number");
    const low = temp.length ? Math.round(Math.min(...temp)) : null;
    const high = temp.length ? Math.round(Math.max(...temp)) : null;
    const models = [...new Set(hs.map(h => h.model))];
    return { date, high, low, wind: wind.length ? Math.round(Math.max(...wind)) : null,
      gust: gust.length ? Math.round(Math.max(...gust)) : null, pop: pops.length ? Math.round(Math.max(...pops)) : null,
      ...(cloud.length ? { cloudCover: Math.round(cloud.reduce((sum, n) => sum + n, 0) / cloud.length) } : {}),
      summary: pops.length ? "Model temperature/wind with HRDPS-WEonG precipitation probability where available." : "Deterministic model estimates; precipitation probability unavailable.",
      model: models.join(" / "), samples: hs.length, sampledExtrema: true as const };
  });
}
export function assessModel(hours: ModelHour[], alertCount: number, missing: boolean) {
  const periods: Period[] = [];
  const alerts: Alert[] = alertCount ? [{ id:"active", title:"Official alert", text:"", area:"", issued:null, expires:"", colour:"" }] : [];
  const result = risk(periods, hours, alerts, missing);
  const precipitation = hours.some(h => h.pop !== null && h.pop >= 70);
  if (!precipitation) return result;
  const reasons = [...result.reasons, "HRDPS-WEonG shows at least a 70% precipitation probability for one or more sampled hours."];
  return { level: result.level === "No flagged factors" ? "Caution" as const : result.level, reasons };

}


```

### `lib/weather/presentation.ts`

```typescript
/** Read-only model-weather presentation. Never overwrites saved trip conditions. */
import { risk, dateKey, type Period } from "./core";
import type { WeatherResult } from "./service";
export type ForecastDay = {
  date:string; high:number|null; low:number|null; pop:number|null; wind:number|null; gust:number|null;
  summary:string; level:ReturnType<typeof risk>["level"]; reasons:string[]; periods:Period[];
};
export function tripDayForecast(data:WeatherResult|null|undefined,date:string):ForecastDay|null {
  if(!data || data.forecastStale) return null;
  const day=data.daily.find(d=>d.date===date);
  if(!day) return null;
  const hours=data.hourly.filter(h=>dateKey(h.time,data.query.zone)===date);
  const a=risk([],hours,[],!hours.length);
  return {...day,level:a.level,reasons:a.reasons,periods:[]};
}
export function forecastHints(day:ForecastDay):string[] {
  const hints:string[]=[];
  if((day.pop??0)>=60 || /rain|shower|drizzle/i.test(day.summary)) hints.push("Check rain protection and a dry clothing system.");
  if((day.low!==null&&day.low<=0)||/snow|freezing|ice/i.test(day.summary)) hints.push("Check insulation and possible slippery sections.");
  if((day.gust??day.wind??0)>=40) hints.push("Review exposure to wind on ridges and open terrain.");
  if(/thunder|storm/i.test(day.summary)) hints.push("Review storm exposure and your turnaround plan.");
  if(day.high!==null&&day.high>=30) hints.push("Review sun exposure, water, and heat management.");
  return hints;
}
export type PlanningInputs={minTemperature:number|null;conditions:string|null;distanceKm?:number|null;elevationGainM?:number|null;durationMinutes?:number|null};
export function comparePlan(day:ForecastDay,plan:PlanningInputs):string[]{
  const notes:string[]=[];
  if(plan.minTemperature!==null&&day.low!==null&&day.low<plan.minTemperature)
    notes.push(`The sampled model low (${day.low}°C) is below your planned low (${plan.minTemperature}°C).`);
  if(plan.conditions==="dry"&&((day.pop??0)>=60||/rain|shower|snow|drizzle/i.test(day.summary)))
    notes.push("Saved conditions say dry, but forecast data suggests precipitation.");
  if((plan.durationMinutes??0)>=360&&((day.pop??0)>=60||(day.gust??0)>=40))
    notes.push("This is a longer day. Recheck timing and escape options if weather changes.");
  return notes;
}
export function localHour(iso:string,zone:string):string {return new Date(iso).toLocaleTimeString("en-CA",{timeZone:zone,hour:"numeric",hour12:true});}

```

### `lib/weather/service.ts`

```typescript
import tzlookup from "tz-lookup";
import canada from "./canada.json";
import { WeatherCache, limited } from "./cache";
import { array, obj, text, contains, parseAlerts, dateKey, validDate, modelTimes, modelValue, modelURL } from "./core";
import type { Alert } from "./core";
import { MODELS, chooseTimes, chooseSummaryTimes, modelPriority, summarizeModel, assessModel, type Schedule, type ModelHour, type ModelDef } from "./model-forecast";

const cache = new WeatherCache(1024);
const API = "https://api.weather.gc.ca/collections/";
const GEOMET = "https://geo.weather.gc.ca/geomet";
export class WeatherInputError extends Error {}
export function validateQuery(params: URLSearchParams) {
  const a = params.get("lat"), b = params.get("lng"), date = params.get("date") || "";
  if (!a?.trim() || !b?.trim()) throw new WeatherInputError("Choose a Canadian trip waypoint.");
  const lat = Number(a), lng = Number(b);
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < 41 || lat > 84 || lng < -142 || lng > -52 || !contains(canada, lat, lng))
    throw new WeatherInputError("Weather is available for Canadian land locations only.");
  if (date && !validDate(date)) throw new WeatherInputError("Invalid weather date (YYYY-MM-DD).");
  return { lat, lng, date, zone: tzlookup(lat, lng) };
}
async function request(url: string, xml = false, revalidateSeconds = 0): Promise<unknown> {
  const u = new URL(url);
  if (u.protocol !== "https:" || !["api.weather.gc.ca", "geo.weather.gc.ca"].includes(u.hostname)) throw Error("Invalid ECCC endpoint.");
  return limited(async () => {
    // Cache published model layers across server instances, but NEVER cache live alerts.
    const res = await fetch(u, { ...(revalidateSeconds ? { next: { revalidate: revalidateSeconds } } : { cache: "no-store" as const }), redirect:"error", signal:AbortSignal.timeout(12000),
      headers:{ Accept: xml ? "application/xml" : "application/json", "User-Agent":"TrailPicker-model-weather/2.0" } });
    if (!res.ok) throw Error(`ECCC HTTP ${res.status}`);
    const raw = await res.text();
    if (raw.length > 8_000_000) throw Error("Oversized ECCC response.");
    return xml ? raw : JSON.parse(raw);
  });
}
async function collection(url: string) {
  const features: unknown[] = []; let next: string | null = url;
  for (let pages = 0; next; pages++) {
    if (pages >= 20) throw Error("ECCC alert pagination incomplete.");
    const data = obj(await request(next));
    if (!Array.isArray(data.features)) throw Error("Invalid alert collection.");
    features.push(...data.features);
    const link = array(data.links).map(obj).find(l => l.rel === "next");
    next = link ? text(link.href) : null;
    if (next) {
      const u = new URL(next);
      if (u.origin !== "https://api.weather.gc.ca" || u.pathname !== new URL(url).pathname) throw Error("Unexpected ECCC pagination URL.");
      u.searchParams.set("f", "json"); next = u.href;
    }
  }
  return { features };
}
async function schedule(model: ModelDef): Promise<Schedule> {
  const response = await cache.get(`schedule:${model.id}`, 15 * 60_000, 0, async () => {
    const u = GEOMET + "?" + new URLSearchParams({ SERVICE:"WMS", VERSION:"1.3.0", REQUEST:"GetCapabilities", layer:model.temperature });
    return modelTimes(String(await request(u, true, 15 * 60)));
  });
  return { model, ...response.value };
}
const POP_LAYER="HRDPS-WEonG_2.5km_Precip-Prob";
// Documented GDPS cloud-cover WMS layer (0–100%); sampled separately, never inferred from POP.
const CLOUD_LAYER="GDPS_15km_TotalCloudCover";
async function cloudSchedule():Promise<{times:string[];run:string}|null>{
  try {
    const v=await cache.get("schedule:gdps-cloud",15*60_000,0,async()=>
      modelTimes(String(await request(GEOMET+"?"+new URLSearchParams({SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetCapabilities",layer:CLOUD_LAYER}),true,15*60))));
    return v.value;
  }catch{return null;}
}
async function probabilitySchedule():Promise<{times:string[];run:string}|null>{
  try {
    const v=await cache.get("schedule:hrdps-pop",15*60_000,0,async()=>
      modelTimes(String(await request(GEOMET+"?"+new URLSearchParams({SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetCapabilities",layer:POP_LAYER}),true,15 * 60))));
    return v.value;
  }catch{return null;}
}
async function field(layer: string, lat: number, lng: number, time: string, run: string): Promise<number | null> {
  try {
    const key = `model:${layer}:${lat.toFixed(5)}:${lng.toFixed(5)}:${time}:${run}`;
    const result = await cache.get(key, 20 * 60_000, 40 * 60_000, async () => {
      const p = modelValue(await request(modelURL(layer, lat, lng, time, run), false, 20 * 60));
      if (p.value === null || p.time !== time || p.run !== run) throw Error("Model time/run mismatch or missing value.");
      return p.value;
    });
    return result.value;
  } catch { return null; }
}
async function hourAt(time: string, schedules: Schedule[], lat: number, lng: number, now: number, popSchedule: {times:string[];run:string}|null = null, cloud: {times:string[];run:string}|null = null): Promise<ModelHour | null> {
  for (const s of modelPriority(time, schedules, now)) {
    const temperature = await field(s.model.temperature, lat, lng, time, s.run);
    if (temperature === null) continue;
    const [wind, gust, rawPop, rawCloud] = await Promise.all([
      field(s.model.wind, lat, lng, time, s.run),
      // Wind-gust fields may be unavailable on particular models/runs; null is intentional.
      field(s.model.gust, lat, lng, time, s.run),
      s.model.id==="HRDPS" && popSchedule?.times.includes(time)
        ? field(POP_LAYER,lat,lng,time,popSchedule.run) : Promise.resolve(null),
      cloud?.times.includes(time)
        ? field(CLOUD_LAYER,lat,lng,time,cloud.run) : Promise.resolve(null),
    ]);
    return { time, temperature: Math.round(temperature * 10) / 10,
      wind: wind === null ? null : Math.round(wind * 3.6),
      gust: gust === null ? null : Math.round(gust * 3.6),
      pop:rawPop===null?null:Math.round(Math.max(0,Math.min(100,rawPop))),
      ...(rawCloud!==null&&Number.isFinite(rawCloud)&&rawCloud>=0&&rawCloud<=100
        ? {cloudCover:Math.round(rawCloud)} : {}),
      condition:rawPop!==null&&rawPop>=60?"Precipitation possible":"Deterministic model sample", model:s.model.id,
      resolutionKm:s.model.km, run:s.run, sampled:true };
  }
  return null;
}
export async function getWeather(query: ReturnType<typeof validateQuery>, options: { summary?: boolean } = {}) {
  const { lat, lng, date, zone } = query, now = Date.now();
  // Alert data never uses stale-on-error, unlike non-safety forecast fields.
  const alertsPromise = cache.get(`alerts:${lat}:${lng}`, 120000, 0, () => collection(API + "weather-alerts/items?" +
    new URLSearchParams({f:"json",limit:"500",bbox:`${lng-.001},${lat-.001},${lng+.001},${lat+.001}`})))
    .then(r => ({status:"ok" as const, checked:new Date(r.at).toISOString(), items:parseAlerts(r.value, lat, lng, Date.now())}))
    .catch(() => ({status:"unavailable" as const, checked:null, items:[] as Alert[]}));
  const [plans, alerts, popSchedule, cloud] = await Promise.all([
    Promise.all(MODELS.map(async m => { try {return await schedule(m);} catch {return null;} })), alertsPromise, probabilitySchedule(), cloudSchedule(),
  ]);
  const available = plans.filter((s): s is Schedule => s !== null);
  const forecastKey = `forecast:${options.summary ? "summary" : "detail"}:${lat.toFixed(5)}:${lng.toFixed(5)}:${date}:${available.map(s=>s.model.id+"@"+s.run).join(",")}:${popSchedule?.run||""}:cloud@${cloud?.run||""}`;
  const forecast = await cache.get(forecastKey, 10 * 60_000, 0, async () => {
    const times = options.summary ? chooseSummaryTimes(available, zone, date, now) : chooseTimes(available, zone, date, now);
    // Bound per-request work: groups of six waypoint/time queries.
    const samples: (ModelHour|null)[] = [];
    for (let offset = 0; offset < times.length; offset += 6) {
      const batch = await Promise.all(times.slice(offset, offset+6).map(t=>
        hourAt(t, available, lat, lng, now, popSchedule, cloud)));
      samples.push(...batch);
    }
    return samples.filter((s):s is ModelHour => s !== null).sort((a,b)=>a.time.localeCompare(b.time));
  });
  const hourly = forecast.value;
  const daily = summarizeModel(hourly, zone);
  const incomplete = !available.length || !hourly.length || alerts.status !== "ok";
  const assessment = assessModel(hourly, !date || date === dateKey(now, zone) ? alerts.items.length : 0, incomplete);
  return { query, alerts, sampleDensity: options.summary ? "summary" as const : "detail" as const, modelsAvailable:available.map(x=>x.model.id), hourly, daily,
    assessment, forecastStale:!hourly.length, hourlyStale:!hourly.length,
    generated:new Date(now).toISOString(),
    limitation:"Deterministic grid model, not a station observation, point-verified forecast, or avalanche assessment. Sampled daily extrema are not official highs/lows. Precipitation probability is shown only when the independent ECCC HRDPS-WEonG precipitation-probability layer returns a valid sample; otherwise unavailable. Cloud cover is included only when the independent GDPS grid layer returns a verified time-aligned sample. Icons are estimates, not observed conditions or precipitation-type forecasts." };
}
/** Backward-compatible optional model endpoint. Returns a coordinate-based sample, not a city forecast. */
export async function mountain(lat:number,lng:number,date:string,zone:string,now=Date.now()) {
  const plans = (await Promise.all(MODELS.map(async m=>{try{return await schedule(m);}catch{return null;}}))).filter((s):s is Schedule=>s!==null);
  const time = chooseTimes(plans,zone,date,now)[0];
  if (!time) return {status:"outside-range" as const,message:"No ECCC model samples for that date."};
  const sample = await hourAt(time,plans,lat,lng,now);
  if (!sample) return {status:"unavailable" as const,message:"Model sample unavailable for this point."};
  return {status:"ok" as const,time:sample.time,run:sample.run,temperature:sample.temperature!,wind:sample.wind,
    model:sample.model,resolutionKm:sample.resolutionKm,message:`${sample.model} ${sample.resolutionKm} km grid estimate; local conditions may differ.`};
}
export type WeatherResult = Awaited<ReturnType<typeof getWeather>>;
```

### `lib/weather/tz-lookup.d.ts`

```typescript
declare module "tz-lookup" {
  export default function tzlookup(lat: number, lng: number): string;
}

```

### `next-env.d.ts`

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";
import "./.next/dev/types/root-params.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

### `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};

export default nextConfig;

```

### `package.json`

```json
{
  "name": "trailpicker",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "docs": "tsx tools/generate-docs.ts",
    "test:weather": "node --import tsx --test tests/weather.test.ts",
    "test": "node --import tsx --test tests/*.test.cjs tests/*.test.mjs tests/*.test.ts",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@auth/prisma-adapter": "^2.11.3",
    "@prisma/adapter-pg": "^7.8.0",
    "@prisma/client": "^7.8.0",
    "leaflet": "^1.9.4",
    "lucide-react": "^1.27.0",
    "next": "16.4.3",
    "next-auth": "^5.0.0-beta.32",
    "pg": "^8.22.0",
    "prisma": "^7.8.0",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "react-leaflet": "^5.0.0",
    "tz-lookup": "6.1.25"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/leaflet": "^1.9.21",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.4.3",
    "tailwindcss": "^4",
    "tsx": "^4.23.15",
    "typescript": "^5"
  }
}

```

### `postcss.config.mjs`

```typescript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;

```

### `prisma/migrations/migration_lock.toml`

```toml
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"

```

### `prisma/schema.prisma`

```text
generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model Brand {
  id      String  @id @default(cuid())
  name    String
  website String?
  logo    String?

  gear Gear[]

  createdAt DateTime @default(now())
}

model Category {
  id   String @id @default(cuid())
  name String
  slug String @unique

  gear          Gear[]
  subcategories Subcategory[]
  createdAt     DateTime      @default(now())
}

model Subcategory {
  id         String   @id @default(cuid())
  name       String
  slug       String
  categoryId String
  category   Category @relation(fields: [categoryId], references: [id])

  gear Gear[]

  createdAt DateTime @default(now())

  @@unique([categoryId, slug])
}

model Gear {
  id String @id @default(cuid())

  name        String
  description String?

  weight_g Int?

  price_cad Float?

  capacity_l Float?

  frame_type String?

  waterproof Boolean?

  temperature_rating Int?

  season String?

  material String?

  brandId String
  brand   Brand  @relation(fields: [brandId], references: [id])

  categoryId String
  category   Category @relation(fields: [categoryId], references: [id])

  subcategoryId String?
  subcategory   Subcategory? @relation(fields: [subcategoryId], references: [id])

  images         GearImage[]
  specifications GearSpecification[]
  prices         Price[]
  reviews        Review[]
  buildItems     BuildItem[]
  favorites      Favorite[]
  ownedGear      OwnedGear[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model OwnedGear {
  id String @id @default(cuid())

  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  gearId String
  gear   Gear   @relation(fields: [gearId], references: [id], onDelete: Cascade)

  purchasedPrice Float?
  purchasedAt    DateTime?
  notes          String?

  createdAt DateTime @default(now())

  @@unique([userId, gearId])
}

model GearImage {
  id String @id @default(cuid())

  url String

  isPrimary Boolean @default(false)

  gearId String
  gear   Gear   @relation(fields: [gearId], references: [id], onDelete: Cascade)
}

model GearSpecification {
  id String @id @default(cuid())

  key   String
  value String
  unit  String?

  gearId String
  gear   Gear   @relation(fields: [gearId], references: [id], onDelete: Cascade)
}

model Retailer {
  id String @id @default(cuid())

  name    String
  website String?
  logo    String?

  prices Price[]
}

model Price {
  id String @id @default(cuid())

  price Float

  currency String @default("CAD")

  url String?

  inStock Boolean @default(true)

  lastUpdated DateTime @default(now())

  gearId String
  gear   Gear   @relation(fields: [gearId], references: [id])

  retailerId String
  retailer   Retailer @relation(fields: [retailerId], references: [id])
}

model User {
  id            String    @id @default(cuid())
  name          String?
  username      String?   @unique
  email         String    @unique
  emailVerified DateTime?
  image         String?

  bio             String?
  location        String?
  isProfilePublic Boolean @default(false)

  accounts  Account[]
  sessions  Session[]
  builds    Build[]
  reviews   Review[]
  favorites Favorite[]
  ownedGear OwnedGear[]
  settings  UserSettings?

  createdAt DateTime @default(now())
}

// Account-wide preferences. Defaults keep existing users private and metric.
model UserSettings {
  userId String @id
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  weightUnit         String  @default("metric")
  distanceUnit       String  @default("metric")
  temperatureUnit    String  @default("c")
  defaultBuildPublic Boolean @default(false)

  updatedAt DateTime @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Build {
  isPublic Boolean @default(false)
  id       String  @id @default(cuid())

  name String

  userId String?
  user   User?   @relation(fields: [userId], references: [id])

  items     BuildItem[]
  days      TripDay[]
  revisions BuildRevision[]

  routeWaypoints Json?
  tripLogistics  Json?

  destinationId String?

  location    String?
  locationLat Float?
  locationLng Float?
  startDate   DateTime?
  endDate     DateTime?

  people Int @default(1)

  minTemperature Int?
  conditions     String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model BuildRevision {
  id String @id @default(cuid())

  buildId String
  build   Build  @relation(fields: [buildId], references: [id], onDelete: Cascade)

  action   String
  summary  String
  snapshot Json

  createdAt DateTime @default(now())

  @@index([buildId, createdAt])
}

model TripDay {
  id String @id @default(cuid())

  buildId String
  build   Build  @relation(fields: [buildId], references: [id], onDelete: Cascade)

  date DateTime

  minTemperature  Int?
  conditions      String?
  notes           String?
  startLocation   String?
  endLocation     String?
  distanceKm      Float?
  elevationGainM  Int?
  elevationLossM  Int?
  durationMinutes Int?
  campsite        String?
  reservation     String?
  waterSource     String?
  waterCarryL     Float?
  trailConditions String?
  activities      String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([buildId, date])
}

model BuildItem {
  id String @id @default(cuid())

  quantity Int @default(1)

  customWeight Int?

  isConsumable Boolean @default(false)

  isWorn Boolean @default(false)

  gearNameSnapshot String?

  weightSnapshot Int?

  priceSnapshot Float?

  customCategory String?

  buildId String
  build   Build  @relation(fields: [buildId], references: [id], onDelete: Cascade)

  gearId String?
  gear   Gear?   @relation(fields: [gearId], references: [id])

  @@unique([buildId, gearId])
}

model Review {
  id String @id @default(cuid())

  rating Int

  title String?
  body  String?

  gearId String
  gear   Gear   @relation(fields: [gearId], references: [id])

  userId String
  user   User   @relation(fields: [userId], references: [id])

  createdAt DateTime @default(now())
}

model Favorite {
  id String @id @default(cuid())

  userId String
  user   User   @relation(fields: [userId], references: [id])

  gearId String
  gear   Gear   @relation(fields: [gearId], references: [id])

  createdAt DateTime @default(now())

  @@unique([userId, gearId])
}

```

### `prisma/seed-compatibility-specs.ts`

```typescript
/**
 * OPTIONAL, idempotent metadata backfill for the two original TrailPicker seed tents.
 * No new products are created. Run after your normal seed if these products exist.
 * The names and capacities come from TrailPicker's original seed data.
 */
import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error("DATABASE_URL is required");
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: dbUrl }) });

const starters = [
  { name: "Durston X-Mid 1", brand: "Durston", people: 1 },
  { name: "Big Agnes Copper Spur HV UL2", brand: "Big Agnes", people: 2 },
] as const;

try {
  for (const original of starters) {
    const gear = await prisma.gear.findFirst({
      where: { name: original.name, brand: { name: original.brand }, category: { slug: "shelter" } },
      select: { id: true, name: true, capacity_l: true, specifications: { select: { id: true, key: true } } },
    });
    if (!gear) {
      console.log(`Skipped absent seed product: ${original.name}`);
      continue;
    }
    const hasCapacity = gear.specifications.some(spec => spec.key.toLowerCase().trim() === "sleeping capacity");
    if (!hasCapacity) await prisma.gearSpecification.create({
      data: { gearId: gear.id, key: "Sleeping capacity", value: String(original.people), unit: "people" },
    });
    // Legacy seed used liters to store persons. Correct ONLY these two exact
    // product rows when the field still matches the old seed's number.
    if (gear.capacity_l === original.people) await prisma.gear.update({
      where: { id: gear.id }, data: { capacity_l: null },
    });
    console.log(`Updated sleeping capacity metadata: ${gear.name}`);
  }
} finally {
  await prisma.$disconnect();
}

```

### `prisma/seed.ts`

```typescript
/**
 * TrailPicker v0.3 development seed
 *
 * - Preserves the four real gear examples from the existing seed (create only if absent).
 * - Adds fictional, clearly labeled catalog examples for exercising the UI and analytics.
 * - Does NOT create affiliate links, retailer offers, users, reviews, or public builds.
 * - Re-runnable: categories/subcategories are upserted; demo gear uses stable IDs.
 * - Does NOT delete or alter real/affiliate gear already in the database.
 *
 * Use from the project root: npx prisma db seed
 * To skip fictional gear: TRAILPICKER_SEED_DEMO=0 npx prisma db seed
 * In NODE_ENV=production, fictional gear is skipped unless TRAILPICKER_SEED_DEMO=1.
 *
 * All demo weights/prices/specs are illustrative, NOT verified product specifications.
 */
import "dotenv/config";

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required to run the TrailPicker seed.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const categories = [
  { slug: "packs", name: "Packs", subs: [
    ["internal-frame", "Internal Frame"], ["frameless", "Frameless"],
    ["daypack", "Daypack"], ["external-frame", "External Frame"],
  ] },
  { slug: "shelter", name: "Shelter", subs: [
    ["tent", "Tent"], ["bivy", "Bivy"], ["tarp", "Tarp"], ["hammock", "Hammock"],
  ] },
  { slug: "sleep", name: "Sleep", subs: [
    ["sleeping-pad", "Sleeping Pad"], ["sleeping-bag", "Sleeping Bag"],
    ["quilt", "Quilt"], ["liner", "Liner"],
  ] },
  { slug: "cooking", name: "Cooking", subs: [
    ["stove", "Stove"], ["cookware", "Cookware"], ["utensils", "Utensils"],
    ["fuel", "Fuel"],
  ] },
  { slug: "water", name: "Water", subs: [
    ["filter", "Filter"], ["bottle", "Bottle"],
    ["reservoir", "Reservoir"], ["purification", "Purification"],
  ] },
  { slug: "clothing", name: "Clothing", subs: [
    ["rain-gear", "Rain Gear"], ["insulation", "Insulation"],
    ["base-layer", "Base Layer"], ["accessories", "Accessories"],
  ] },
  { slug: "electronics", name: "Electronics", subs: [
    ["headlamp", "Headlamp"], ["power-bank", "Power Bank"],
    ["navigation", "Navigation"], ["charging", "Charging"],
  ] },
  { slug: "misc", name: "Misc", subs: [
    ["first-aid", "First Aid"], ["repair-kit", "Repair Kit"],
    ["trekking-poles", "Trekking Poles"], ["camp-accessories", "Camp Accessories"],
  ] },
] as const;

type CategorySlug = (typeof categories)[number]["slug"];
type Spec = { key: string; value: string; unit?: string };
type DemoGear = {
  slug: string;
  name: string;
  category: CategorySlug;
  subcategory: string;
  weight_g: number | null;
  price_cad: number | null;
  capacity_l?: number;
  frame_type?: string;
  waterproof?: boolean;
  temperature_rating?: number;
  season?: string;
  material?: string;
  specs?: Spec[];
  note?: string;
};

// DEMO ONLY. Do not market these as real products, quotes, offers, or safety ratings.
// Include low-cost/heavy, premium/light, small/large, hot/cold, and missing-data cases.
const demoGear: DemoGear[] = [
  // PACKS — capacity_l is correctly used for volume in liters.
  { slug:"pack-28-fast", name:"28 L Fastpack", category:"packs", subcategory:"daypack", weight_g:540, price_cad:115, capacity_l:28, frame_type:"frameless", material:"Nylon", note:"Short-trip and undersized-pack test case." },
  { slug:"pack-35-ul", name:"35 L Minimal Pack", category:"packs", subcategory:"frameless", weight_g:610, price_cad:235, capacity_l:35, frame_type:"frameless", material:"Ripstop nylon" },
  { slug:"pack-40-frameless", name:"40 L Trail Pack", category:"packs", subcategory:"frameless", weight_g:830, price_cad:170, capacity_l:40, frame_type:"frameless" },
  { slug:"pack-45-frame", name:"45 L All-Rounder", category:"packs", subcategory:"internal-frame", weight_g:1210, price_cad:245, capacity_l:45, frame_type:"internal", waterproof:false },
  { slug:"pack-55-frame", name:"55 L Weekend Frame Pack", category:"packs", subcategory:"internal-frame", weight_g:1490, price_cad:280, capacity_l:55, frame_type:"internal" },
  { slug:"pack-65-budget", name:"65 L Budget Hauler", category:"packs", subcategory:"internal-frame", weight_g:2360, price_cad:155, capacity_l:65, frame_type:"internal" },
  { slug:"pack-72-expedition", name:"72 L Expedition Carrier", category:"packs", subcategory:"external-frame", weight_g:2680, price_cad:390, capacity_l:72, frame_type:"external" },
  { slug:"pack-48-no-weight", name:"48 L Unweighed Prototype", category:"packs", subcategory:"internal-frame", weight_g:null, price_cad:null, capacity_l:48, frame_type:"internal", note:"Intentionally missing weight and price for analysis coverage tests." },

  // SHELTER — no capacity_l for tents: that field represents *liters*, not people.
  // Occupancy lives in specifications until the schema adds personCapacity.
  { slug:"tent-1-ul", name:"Solo Trekking-Pole Tent", category:"shelter", subcategory:"tent", weight_g:780, price_cad:345, waterproof:true, season:"3-season", material:"Silpoly", specs:[{key:"Sleeping capacity", value:"1", unit:"person"}] },
  { slug:"tent-2-freestanding", name:"Two-Person Dome Tent", category:"shelter", subcategory:"tent", weight_g:1550, price_cad:310, waterproof:true, season:"3-season", specs:[{key:"Sleeping capacity",value:"2",unit:"people"}] },
  { slug:"tent-3-roomy", name:"Three-Person Shared Tent", category:"shelter", subcategory:"tent", weight_g:2180, price_cad:420, waterproof:true, season:"3-season", specs:[{key:"Sleeping capacity",value:"3",unit:"people"}] },
  { slug:"tent-4-group", name:"Four-Person Trail Shelter", category:"shelter", subcategory:"tent", weight_g:3200, price_cad:390, waterproof:true, season:"3-season", specs:[{key:"Sleeping capacity",value:"4",unit:"people"}] },
  { slug:"tent-winter-2", name:"Two-Person Winter Tent", category:"shelter", subcategory:"tent", weight_g:2850, price_cad:680, waterproof:true, season:"4-season", specs:[{key:"Sleeping capacity",value:"2",unit:"people"}], note:"Winter-rating comparison test; does not constitute real-world safety guidance." },
  { slug:"bivy-light", name:"Compact Bivy", category:"shelter", subcategory:"bivy", weight_g:510, price_cad:165, waterproof:true, season:"3-season", specs:[{key:"Sleeping capacity",value:"1",unit:"person"}] },
  { slug:"tarp-rain", name:"Rain Tarp 3 × 3 m", category:"shelter", subcategory:"tarp", weight_g:450, price_cad:95, waterproof:true, material:"Silnylon", specs:[{key:"Dimensions",value:"3 × 3",unit:"m"}] },
  { slug:"hammock-mesh", name:"Bug-Net Hammock", category:"shelter", subcategory:"hammock", weight_g:950, price_cad:160, waterproof:false, season:"3-season" },

  // SLEEP — temperature_rating is a demo Celsius value for test scenarios.
  { slug:"bag-summer-10", name:"Summer Sleeping Bag +10°C", category:"sleep", subcategory:"sleeping-bag", weight_g:780, price_cad:105, temperature_rating:10, season:"summer" },
  { slug:"bag-3season-0", name:"Three-Season Sleeping Bag 0°C", category:"sleep", subcategory:"sleeping-bag", weight_g:1160, price_cad:210, temperature_rating:0, season:"3-season" },
  { slug:"bag-cold-minus-7", name:"Cold-Weather Sleeping Bag −7°C", category:"sleep", subcategory:"sleeping-bag", weight_g:1450, price_cad:305, temperature_rating:-7, season:"3-season" },
  { slug:"bag-winter-minus-18", name:"Winter Sleeping Bag −18°C", category:"sleep", subcategory:"sleeping-bag", weight_g:2200, price_cad:450, temperature_rating:-18, season:"4-season" },
  { slug:"quilt-light-5", name:"Lightweight Quilt +5°C", category:"sleep", subcategory:"quilt", weight_g:480, price_cad:265, temperature_rating:5 },
  { slug:"quilt-cold-minus-5", name:"Insulated Quilt −5°C", category:"sleep", subcategory:"quilt", weight_g:760, price_cad:330, temperature_rating:-5 },
  { slug:"pad-air-light", name:"Ultralight Inflatable Pad", category:"sleep", subcategory:"sleeping-pad", weight_g:390, price_cad:180, specs:[{key:"R-value",value:"4.2"}] },
  { slug:"pad-air-winter", name:"Insulated Winter Pad", category:"sleep", subcategory:"sleeping-pad", weight_g:690, price_cad:235, specs:[{key:"R-value",value:"6.5"}] },
  { slug:"pad-foam", name:"Closed-Cell Foam Pad", category:"sleep", subcategory:"sleeping-pad", weight_g:450, price_cad:48, specs:[{key:"R-value",value:"2.0"}] },
  { slug:"liner-basic", name:"Sleep Liner", category:"sleep", subcategory:"liner", weight_g:210, price_cad:35 },

  // COOKING — cookware capacity_l represents usable liquid volume.
  { slug:"stove-canister-mini", name:"Compact Canister Stove", category:"cooking", subcategory:"stove", weight_g:89, price_cad:55 },
  { slug:"stove-integrated", name:"Integrated Stove System", category:"cooking", subcategory:"stove", weight_g:420, price_cad:175 },
  { slug:"stove-liquid-fuel", name:"Liquid-Fuel Stove", category:"cooking", subcategory:"stove", weight_g:340, price_cad:145 },
  { slug:"pot-solo-065", name:"Solo Pot 650 mL", category:"cooking", subcategory:"cookware", weight_g:120, price_cad:54, capacity_l:0.65 },
  { slug:"pot-group-14", name:"Group Pot 1.4 L", category:"cooking", subcategory:"cookware", weight_g:245, price_cad:75, capacity_l:1.4 },
  { slug:"pot-group-25", name:"Large Pot 2.5 L", category:"cooking", subcategory:"cookware", weight_g:390, price_cad:92, capacity_l:2.5 },
  { slug:"spork-titanium", name:"Titanium Camp Spork", category:"cooking", subcategory:"utensils", weight_g:18, price_cad:16 },
  { slug:"fuel-canister-demo", name:"Sample Fuel Canister", category:"cooking", subcategory:"fuel", weight_g:360, price_cad:12, note:"Illustrative total canister weight; consumable flag belongs to BuildItem." },

  // WATER — capacity_l represents *storage* volume for bottles/reservoirs.
  { slug:"filter-squeeze", name:"Compact Squeeze Filter", category:"water", subcategory:"filter", weight_g:75, price_cad:52 },
  { slug:"filter-pump", name:"Pump Water Filter", category:"water", subcategory:"filter", weight_g:440, price_cad:125 },
  { slug:"filter-gravity", name:"Gravity Filter System", category:"water", subcategory:"filter", weight_g:265, price_cad:150 },
  { slug:"bottle-1l", name:"Trail Bottle 1 L", category:"water", subcategory:"bottle", weight_g:165, price_cad:24, capacity_l:1 },
  { slug:"bottle-15l", name:"Wide-Mouth Bottle 1.5 L", category:"water", subcategory:"bottle", weight_g:210, price_cad:29, capacity_l:1.5 },
  { slug:"reservoir-2l", name:"Hydration Reservoir 2 L", category:"water", subcategory:"reservoir", weight_g:195, price_cad:42, capacity_l:2 },
  { slug:"reservoir-3l", name:"Hydration Reservoir 3 L", category:"water", subcategory:"reservoir", weight_g:260, price_cad:53, capacity_l:3 },
  { slug:"purification-tablets", name:"Sample Water Purification Tablets", category:"water", subcategory:"purification", weight_g:38, price_cad:17, note:"Demo inventory entry only; never infer water safety from this sample product." },

  // CLOTHING — different combinations allow worn-weight and waterproof checks.
  { slug:"jacket-rain", name:"Waterproof Rain Jacket", category:"clothing", subcategory:"rain-gear", weight_g:315, price_cad:155, waterproof:true },
  { slug:"jacket-wind", name:"Wind Shell", category:"clothing", subcategory:"rain-gear", weight_g:125, price_cad:85, waterproof:false },
  { slug:"pants-rain", name:"Waterproof Rain Pants", category:"clothing", subcategory:"rain-gear", weight_g:275, price_cad:120, waterproof:true },
  { slug:"jacket-puffy", name:"Insulated Puffy Jacket", category:"clothing", subcategory:"insulation", weight_g:380, price_cad:215 },
  { slug:"fleece-mid", name:"Midweight Fleece", category:"clothing", subcategory:"insulation", weight_g:460, price_cad:90 },
  { slug:"baselayer-merino", name:"Merino Base Layer", category:"clothing", subcategory:"base-layer", weight_g:205, price_cad:105, material:"Merino wool" },
  { slug:"gloves-liner", name:"Light Liner Gloves", category:"clothing", subcategory:"accessories", weight_g:63, price_cad:30 },
  { slug:"mitts-winter", name:"Insulated Winter Mitts", category:"clothing", subcategory:"accessories", weight_g:195, price_cad:75 },

  // ELECTRONICS — price and weight distributions stress filters and summaries.
  { slug:"headlamp-compact", name:"Compact Headlamp", category:"electronics", subcategory:"headlamp", weight_g:82, price_cad:40 },
  { slug:"headlamp-bright", name:"High-Output Headlamp", category:"electronics", subcategory:"headlamp", weight_g:145, price_cad:100 },
  { slug:"bank-10000", name:"10,000 mAh Power Bank", category:"electronics", subcategory:"power-bank", weight_g:220, price_cad:48, specs:[{key:"Battery capacity",value:"10000",unit:"mAh"}] },
  { slug:"bank-20000", name:"20,000 mAh Power Bank", category:"electronics", subcategory:"power-bank", weight_g:370, price_cad:82, specs:[{key:"Battery capacity",value:"20000",unit:"mAh"}] },
  { slug:"gps-handheld", name:"Handheld Navigation Device", category:"electronics", subcategory:"navigation", weight_g:235, price_cad:345 },
  { slug:"locator-satellite", name:"Satellite Messenger Example", category:"electronics", subcategory:"navigation", weight_g:115, price_cad:395, note:"No real subscription, SOS capability, or service guarantee is represented." },
  { slug:"charger-solar", name:"Foldable Solar Charger", category:"electronics", subcategory:"charging", weight_g:485, price_cad:115 },
  { slug:"cable-light", name:"Short Charging Cable", category:"electronics", subcategory:"charging", weight_g:26, price_cad:12 },

  // MISC — mix essentials, optional gear and very light items.
  { slug:"kit-first-aid", name:"Compact First-Aid Kit", category:"misc", subcategory:"first-aid", weight_g:210, price_cad:38 },
  { slug:"kit-repair", name:"Field Repair Kit", category:"misc", subcategory:"repair-kit", weight_g:115, price_cad:32 },
  { slug:"poles-aluminum", name:"Aluminum Trekking Poles (Pair)", category:"misc", subcategory:"trekking-poles", weight_g:530, price_cad:85 },
  { slug:"poles-carbon", name:"Carbon Trekking Poles (Pair)", category:"misc", subcategory:"trekking-poles", weight_g:355, price_cad:185 },
  { slug:"trowel", name:"Camp Trowel", category:"misc", subcategory:"camp-accessories", weight_g:58, price_cad:23 },
  { slug:"pack-liner", name:"Waterproof Pack Liner", category:"misc", subcategory:"camp-accessories", weight_g:95, price_cad:24, waterproof:true },
  { slug:"dry-bag", name:"Roll-Top Dry Bag", category:"misc", subcategory:"camp-accessories", weight_g:125, price_cad:34, waterproof:true, capacity_l:8 },
  { slug:"food-bag", name:"Hanging Food Bag", category:"misc", subcategory:"camp-accessories", weight_g:170, price_cad:42, capacity_l:12 },
];

const demoBrandName = "TrailPicker Sample Gear";
const demoId = (slug: string) => `tp-demo-v03-${slug}`;
const descriptionFor = (gear: DemoGear) =>
  `FICTIONAL SAMPLE PRODUCT — for TrailPicker development/testing only. ` +
  `Weights, prices, specifications, and ratings are illustrative and must not be treated as verified product claims.` +
  (gear.note ? ` Test scenario: ${gear.note}` : "");

async function main() {
  // Validate demo definitions before touching the database.
  const categoryMap = new Map(categories.map(c => [c.slug, c]));
  const seen = new Set<string>();
  for (const gear of demoGear) {
    const validCategory = categoryMap.get(gear.category);
    if (!validCategory || !validCategory.subs.some(([slug]) => slug === gear.subcategory)) {
      throw new Error(`Invalid sample category: ${gear.slug}`);
    }
    if (!/^[a-z0-9-]+$/.test(gear.slug) || seen.has(gear.slug)) {
      throw new Error(`Duplicate/invalid demo slug: ${gear.slug}`);
    }
    seen.add(gear.slug);
    for (const n of [gear.weight_g, gear.price_cad, gear.capacity_l]) {
      if (n != null && (!Number.isFinite(n) || n < 0)) throw new Error(`Invalid sample number: ${gear.slug}`);
    }
    if (gear.weight_g != null && !Number.isInteger(gear.weight_g)) throw new Error(`Weight must be an integer: ${gear.slug}`);
    if (gear.category === "shelter" && gear.capacity_l != null) {
      throw new Error(`Shelter occupancy is NOT a volume in liters: ${gear.slug}`);
    }
  }

  // Categories and subcategories follow the slugs currently used by TrailPicker's UI.
  const categoryIds = new Map<CategorySlug, string>();
  const subcategoryIds = new Map<string, string>();
  for (const category of categories) {
    const row = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name },
      create: { slug: category.slug, name: category.name },
    });
    categoryIds.set(category.slug, row.id);
    for (const [slug, name] of category.subs) {
      const sub = await prisma.subcategory.upsert({
        where: { categoryId_slug: { categoryId: row.id, slug } },
        update: { name },
        create: { categoryId: row.id, slug, name },
      });
      subcategoryIds.set(`${category.slug}/${slug}`, sub.id);
    }
  }

  // Keep all four pre-existing example products, without changing existing rows.
  // Their original data is preserved exactly from your v0.3 seed snapshot.
  const oldBrands = [
    { name: "Durston", website: "https://durstongear.com" },
    { name: "Big Agnes", website: "https://www.bigagnes.com" },
    { name: "Hyperlite Mountain Gear", website: "https://www.hyperlitemountaingear.com" },
    { name: "Therm-a-Rest", website: undefined },
  ];
  const brandIds = new Map<string, string>();
  for (const brand of oldBrands) {
    const row = await prisma.brand.findFirst({ where: { name: brand.name }, orderBy: { createdAt: "asc" } })
      ?? await prisma.brand.create({ data: brand });
    brandIds.set(brand.name, row.id);
  }
  const originals = [
    { name:"Durston X-Mid 1", brand:"Durston", category:"shelter", subcategory:"tent", weight_g:795, price_cad:320, capacity_l:1, season:"3-season", description:"Ultralight trekking pole supported backpacking tent.", image:"https://durstongear.com/cdn/shop/files/Durston-X-Mid-1-2025-Ultralight-Backpacking-Tent-Main-Viewb_07dd109f-fff5-4c33-9a7d-b161ac0bbf19.jpg?v=1741358977&width=800" },
    { name:"Big Agnes Copper Spur HV UL2", brand:"Big Agnes", category:"shelter", subcategory:"tent", weight_g:1474, price_cad:700, capacity_l:2, season:"3-season", description:"Lightweight freestanding two-person tent.", image:"https://gearinstitute.com/wp-content/uploads/Copper_Spur_HV_UL_2_TentWithFly_HalfOpen-0-800x457.jpg" },
    { name:"Hyperlite Mountain Gear Southwest 40", brand:"Hyperlite Mountain Gear", category:"packs", subcategory:"frameless", weight_g:907, price_cad:500, capacity_l:40, season:null, description:"Ultralight backpacking pack.", image:"https://hyperlitemountaingear.com/cdn/shop/files/hyperlite-mountain-gear-packs-southwest-40l-extra-sm-white-1190868899.jpg?v=1759479162&width=832" },
    { name:"Therm-a-Rest NeoAir XLite NXT", brand:"Therm-a-Rest", category:"sleep", subcategory:"sleeping-pad", weight_g:370, price_cad:null, capacity_l:null, season:null, description:"Ultralight backpacking sleeping pad.", image:"https://cascadedesigns.com/cdn/shop/files/11627_thermarest_neoair_xlite_nxt_solarflare_regular_angle.jpg?v=1724820257&width=493" },
  ] as const;

  let keptOriginals = 0;
  for (const gear of originals) {
    const existing = await prisma.gear.findFirst({ where: { name: gear.name, brand: { name: gear.brand } } });
    if (existing) { keptOriginals++; continue; }
    await prisma.gear.create({
      data: {
        name: gear.name,
        description: gear.description,
        weight_g: gear.weight_g,
        price_cad: gear.price_cad,
        capacity_l: gear.capacity_l,
        season: gear.season,
        brandId: brandIds.get(gear.brand)!,
        categoryId: categoryIds.get(gear.category)!,
        subcategoryId: subcategoryIds.get(`${gear.category}/${gear.subcategory}`)!,
        images: { create: [{ url: gear.image, isPrimary: true }] },
      },
    });
  }
  console.log(`Original catalog examples: ${originals.length} (${keptOriginals} already existed)`);

  const includeDemo = process.env.TRAILPICKER_SEED_DEMO === "1" ||
    (process.env.NODE_ENV !== "production" && process.env.TRAILPICKER_SEED_DEMO !== "0");
  if (!includeDemo) {
    console.log("Fictional gear skipped. Set TRAILPICKER_SEED_DEMO=1 to seed test gear deliberately.");
    return;
  }

  // Stable IDs make reruns safe. Only demo-owned product rows/specifications are updated.
  const sampleBrand = await prisma.brand.findFirst({ where: { name: demoBrandName }, orderBy: { createdAt: "asc" } })
    ?? await prisma.brand.create({ data: { name: demoBrandName } });
  for (const gear of demoGear) {
    const specRows = gear.specs ?? [];
    const record = {
      name: `TP Demo — ${gear.name}`,
      description: descriptionFor(gear),
      weight_g: gear.weight_g,
      price_cad: gear.price_cad,
      capacity_l: gear.capacity_l ?? null,
      frame_type: gear.frame_type ?? null,
      waterproof: gear.waterproof ?? null,
      temperature_rating: gear.temperature_rating ?? null,
      season: gear.season ?? null,
      material: gear.material ?? null,
      brandId: sampleBrand.id,
      categoryId: categoryIds.get(gear.category)!,
      subcategoryId: subcategoryIds.get(`${gear.category}/${gear.subcategory}`)!,
    };
    await prisma.gear.upsert({
      where: { id: demoId(gear.slug) },
      create: {
        id: demoId(gear.slug),
        ...record,
        specifications: { create: specRows },
      },
      update: {
        ...record,
        specifications: { deleteMany: {}, create: specRows },
      },
    });
  }

  const counts = categories.map(cat => `${cat.name}: ${demoGear.filter(g => g.category === cat.slug).length}`).join(" | ");
  console.log(`TrailPicker v0.3 demo gear ready: ${demoGear.length} fictional products + ${originals.length} existing examples`);
  console.log(counts);
  console.log("No affiliate prices/URLs, user data, reviews, or builds were created.");
}

main().catch((error) => {
  console.error("TrailPicker seed failed:", error);
  process.exitCode = 1;
}).finally(async () => {
  await prisma.$disconnect();
});

```

### `prisma.config.ts`

```typescript
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },

  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
```

### `README.md`

````markdown
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

````

### `tests/build-history-transaction.test.cjs`

```typescript
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { stripTypeScriptTypes } = require('node:module');

function harness() {
  const state = {
    build: {
      id: 'build-1', userId: 'user-1', name: 'Pack', destinationId: null,
      location: null, locationLat: null, locationLng: null,
      startDate: null, endDate: null, people: 1, minTemperature: null,
      conditions: null, routeWaypoints: null, tripLogistics: null,
      items: [], days: [], updatedAt: new Date(),
    },
    revisions: [],
  };
  let failRevision = false;
  const calls = [];
  const prisma = {
    $transaction: async (fn) => {
      // In-memory transaction staging: only successful callbacks are committed.
      const next = structuredClone(state);
      const tx = {
        $queryRaw: async () => { calls.push('lock'); return [{ locked: 1 }]; },
        build: {
          findUnique: async ({where}) => next.build.id === where.id && next.build.userId === where.userId ? next.build : null,
          update: async ({data}) => { Object.assign(next.build, data); calls.push('build.update'); return next.build; },
        },
        buildRevision: {
          findFirst: async () => next.revisions.at(-1) || null,
          create: async ({data}) => {
            if (failRevision) throw Error('history write failed');
            const row = { ...data, id:`rev-${next.revisions.length}`, createdAt:new Date() };
            next.revisions.push(row); calls.push('revision.create'); return row;
          },
          update: async ({where, data}) => {
            const row = next.revisions.find(x=>x.id===where.id); Object.assign(row,data); calls.push('revision.update'); return row;
          },
        },
      };
      const result = await fn(tx);
      state.build = next.build;
      state.revisions = next.revisions;
      return result;
    },
  };
  const source = stripTypeScriptTypes(fs.readFileSync(path.join(__dirname,'../lib/build-history.ts'), 'utf8'));
  const names = [...source.matchAll(/export (?:async )?function (\w+)|export const (\w+)/g)].map(m=>m[1]||m[2]);
  const js = source.replace(/import ["']server-only["'];/g, '')
    .replace(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];/g, (_, names, spec) => `const {${names}} = require(${JSON.stringify(spec)});`)
    .replace(/export /g,'');
  const history = new Function('require', js + `\nreturn {${names.join(',')}};`)(spec => spec === '@/lib/prisma' ? {prisma} : require(spec));
  return {state,history,calls,setFail: value=>{failRevision=value;}};
}

test('a baseline is created once, under the same lock as each mutation', async()=>{
  const {state,history,calls} = harness();
  await history.mutateBuildWithRevision('build-1','user-1','trip','Changed people', async tx=>{
    await tx.build.update({data:{people:2}});
  });
  assert.equal(state.build.people,2);
  assert.deepEqual(state.revisions.map(r=>r.action),['baseline','trip']);
  await history.mutateBuildWithRevision('build-1','user-1','trip','Changed people again', async tx=>{
    await tx.build.update({data:{people:3}});
  });
  assert.equal(state.revisions.filter(r=>r.action==='baseline').length,1);
  assert.equal(calls[0],'lock');
});

test('failed history recording rolls back its build mutation',async()=>{
  const {state,history,setFail} = harness();
  await history.mutateBuildWithRevision('build-1','user-1','settings','First', async tx=>{
    await tx.build.update({data:{people:2}});
  });
  setFail(true);
  await assert.rejects(history.mutateBuildWithRevision('build-1','user-1','import','Fail', async tx=>{
    await tx.build.update({data:{people:99}});
  }),/history write failed/);
  assert.equal(state.build.people,2);
  assert.equal(state.revisions.length,2);
});

```

### `tests/build-validation.test.cjs`

```typescript
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { stripTypeScriptTypes } = require('node:module');
function load(relative, mocks={}) {
  let code = stripTypeScriptTypes(fs.readFileSync(path.join(__dirname, '..', relative), 'utf8'));
  const names = [...code.matchAll(/export (?:async )?function (\w+)|export const (\w+)/g)].map(m => m[1] || m[2]);
  code = code.replace(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];/g,
    (_, items, spec) => `const {${items}} = require(${JSON.stringify(spec)});`).replace(/export /g, '');
  return new Function('require', code + `\nreturn {${names.join(',')}};`)(spec => spec in mocks ? mocks[spec] : require(spec));
}
const planner = load('lib/trip-planner.ts');
const v = load('lib/build-validation.ts', {'./trip-planner': planner});
const form = values => { const data = new FormData(); for (const [k,x] of Object.entries(values)) data.set(k,String(x)); return data; };
test('strict build creation input', () => {
  assert.equal(v.parseBuildDetails(form({name:'Test',people:'2',minTemperature:'-5'})).people, 2);
  for (const people of ['-1','Infinity','NaN','101','1.5']) {
    assert.throws(() => v.parseBuildDetails(form({name:'Test',people})), /people/);
  }
  for (const name of ['', 'x'.repeat(101)]) assert.throws(() => v.parseBuildDetails(form({name})), /name/);
  assert.throws(() => v.parseBuildDetails(form({name:'Test', locationLat:49})), /both coordinates/);
  assert.throws(() => v.parseBuildDetails(form({name:'Test',conditions:'tornado'})), /condition/);
});
test('custom item numeric validation and quantity boundaries', () => {
  for (const bad of ['NaN', 'Infinity', '-1', '1000001', '1.5']) assert.throws(() => v.formNumber(form({weight_g:bad}),'weight_g',0,1000000,true));
  assert.equal(v.formNumber(form({price_cad:'0'}),'price_cad',0,1000000),0);
  assert.equal(v.combinedQuantity(998,1),999);
  assert.throws(() => v.combinedQuantity(999,1), /999/);
  assert.throws(() => v.combinedQuantity(900,900), /999/);
});
test('logistics validator rejects arbitrary JSON, unknown keys, and oversize text', () => {
  assert.equal(v.parseLogistics(null),null);
  assert.equal(v.parseLogistics({parking:'Lot A'}).parking,'Lot A');
  for (const bad of [[], 'bad', {emergencyContact:42}, {other:'secret'}, {parking:'x'.repeat(5001)}]) {
    assert.throws(() => v.parseLogistics(bad), /logistics/);
  }
});

```

### `tests/builder-ownership.test.cjs`

```typescript
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { stripTypeScriptTypes } = require('node:module');
const root = path.resolve(__dirname, '..');
process.env.AUTH_SECRET = 'ownership-test-secret-not-for-production';

// Execute the actual TS helpers/actions, with Auth.js, Next and Prisma replaced
// by deterministic boundary mocks. No network or database is needed.
function load(relative, dependencies = {}) {
  let js = stripTypeScriptTypes(fs.readFileSync(path.join(root, relative), 'utf8'));
  const names = [...js.matchAll(/export (?:async )?function (\w+)|export const (\w+)/g)].map(m => m[1] || m[2]);
  js = js.replace(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];/g, (_, names, spec) => `const {${names}} = require(${JSON.stringify(spec)});`)
    .replace(/import ["']server-only["'];/g, '')
    .replace(/export /g, '');
  const requireMock = spec => spec in dependencies ? dependencies[spec] : require(spec);
  return new Function('require', 'process', 'Buffer', js + `\nreturn {${names.join(',')}};`)(requireMock, process, Buffer);
}
const token = load('lib/guest-build-token.ts');
function harness() {
  const state = { email: 'a@test', cookies: new Map(), writes: [], builds: [
    { id: 'a', userId: 'user-a', name: 'A', items: [], days: [] },
    { id: 'b', userId: 'user-b', name: 'B', items: [], days: [] },
    { id: 'guest', userId: null, name: 'Guest', items: [], days: [] },
  ] };
  const matches = (b, where) => b.id === where.id && (!('userId' in where) || b.userId === where.userId) && (!where.OR || where.OR.some(p => b.userId === p.userId));
  const cookieStore = { get: name => state.cookies.has(name) ? { value: state.cookies.get(name) } : undefined,
    set: (name, value, options) => { state.cookies.set(name, value); state.lastCookieOptions = options; },
    delete: name => state.cookies.delete(name) };
  const write = type => async args => { state.writes.push({ type, args }); return { id: 'copy', ...args.data }; };
  const prisma = {
    user: { findUnique: async ({ where }) => where.email ? { id: `user-${where.email[0]}` } : null },
    build: { findFirst: async ({ where }) => state.builds.find(b => matches(b, where)) || null,
      findUnique: async ({ where }) => state.builds.find(b => matches(b, where)) || null,
      create: write('build.create'), update: write('build.update'),
      updateMany: async ({ where, data }) => { const b = state.builds.find(b => matches(b, where)); if (!b) return {count:0}; state.writes.push({type:'claim'}); Object.assign(b, data); return {count:1}; } },
    buildItem: { findUnique: async () => null, updateMany: async args => { state.writes.push({type:'item.updateMany',args}); return {count:1}; }, findFirst: async ({ where }) => {
      const buildId = where.id === 'item-a' ? 'a' : where.id === 'item-b' ? 'b' : null;
      return buildId === where.buildId ? { id: where.id, buildId, quantity: 2 } : null;
    }, update: write('item.update'), delete: write('item.delete'), create: write('item.create'), upsert: write('item.upsert') },
    tripDay: { findFirst: async ({ where }) => where.id === 'day-a' && where.buildId === 'a' ? { id: 'day-a', buildId: 'a' } : null,
      update: write('day.update'), createMany: write('day.createMany'), deleteMany: write('day.deleteMany') },
  };
  prisma.$transaction = async fn => fn(prisma);
  const navigation = { notFound: () => { throw new Error('404'); }, redirect: url => { throw new Error(`REDIRECT:${url}`); } };
  const access = load('lib/build-access.ts', { '@/auth': {auth: async () => state.email ? {user:{email:state.email}} : null},
    '@/lib/prisma': { prisma }, 'next/headers': {cookies:async()=>cookieStore}, 'next/navigation': navigation, '@/lib/guest-build-token': token });
  const planner = load('lib/trip-planner.ts');
  const history = { lockBuild: async()=>{}, mutateBuildWithRevision: async (buildId,userId,action,summary,mutate)=>mutate(prisma), ensureBuildRevisionBaseline: async () => {}, recordBuildRevision: async () => {}, getBuildSnapshot: async (buildId, userId) => {
    const b = state.builds.find(build => build.id === buildId && build.userId === userId);
    if (!b) throw new Error('Build not found.');
    return { name:b.name, destinationId:null, location:null, locationLat:null, locationLng:null, startDate:null, endDate:null, people:1, minTemperature:null, conditions:null, routeWaypoints:null, tripLogistics:null, items:b.items || [], days:b.days || [] };
  } };
  const validation = load('lib/build-validation.ts', {'./trip-planner': planner});
  const itinerary = { validatedRoute: () => null, remapRouteDays: () => ({ points:null, unassignedCount:0 }) };
  const plannerActions = load('lib/trip-planner-actions.ts', { '@/lib/prisma':{prisma}, '@/lib/build-access':access, 'next/cache':{revalidatePath:()=>{}}, '@/lib/destinations':{getDestination:()=>null}, '@/lib/trip':{getDateRange:()=>[]}, '@/lib/trip-planner':planner, '@/lib/build-history':history, '@/lib/build-validation':validation, '@/lib/itinerary-links':itinerary });
  const actions = load('app/build/actions.ts', {'@/lib/prisma':{prisma}, '@/lib/trip-planner-actions':plannerActions, '@/lib/trip-planner':planner, 'next/navigation': navigation,
    'next/headers':{cookies:async()=>cookieStore}, 'next/cache':{revalidatePath:()=>{}}, '@/lib/trip':{getDateRange:()=>[]},
    '@/lib/build-access':access, '@/lib/guest-build-token':token, '@/lib/destinations':{getDestination:()=>null}, '@/lib/build-history':history, '@/lib/build-validation':validation, '@/lib/itinerary-links':itinerary, '@/app/generated/prisma/client':{Prisma:{DbNull:null}} });
  return { state, access, actions };
}
function form(values) { const f = new FormData(); for (const [key,value] of Object.entries(values)) f.set(key, String(value)); return f; }

test('guest tokens are bound to build, expire, and reject tampering', () => {
  const t = token.createGuestBuildToken('guest', 1000000);
  assert.equal(token.verifyGuestBuildToken('guest', t, 1000000), true);
  assert.equal(token.verifyGuestBuildToken('other', t, 1000000), false);
  assert.equal(token.verifyGuestBuildToken('guest', t.slice(0,-1)+'!', 1000000), false);
  assert.equal(token.verifyGuestBuildToken('guest', t, 1000000 + token.GUEST_BUILD_MAX_AGE*1000), false);
  for (const invalid of [undefined, '', 'guest', 'x'.repeat(201), '1:x.y']) assert.equal(token.verifyGuestBuildToken('guest', invalid), false);
});
for (const email of ['a@test', null]) {
  test(`access matrix for ${email || 'anonymous'}`, async () => {
    const {state, access} = harness(); state.email=email;
    assert.equal((await access.findAccessibleBuild('a'))?.id, email ? 'a' : undefined);
    assert.equal(await access.findAccessibleBuild('b'), null);
    state.cookies.set('currentBuild','guest');
    assert.equal(await access.findAccessibleBuild('guest'), null);
    state.cookies.set(token.guestBuildCookieName('guest'), token.createGuestBuildToken('guest'));
    assert.equal((await access.findAccessibleBuild('guest')).id, 'guest');
    state.cookies.set(token.guestBuildCookieName('b'), token.createGuestBuildToken('b'));
    assert.equal(await access.findAccessibleBuild('b'), null); // capability cannot override account owner
    assert.equal(await access.findAccessibleBuild('missing'), null);
    await assert.rejects(access.requireBuildPageAccess('b'), /404/);
  });
}
for (const name of ['importBuildItems','duplicateBuild','addCustomItem','addGear','updateTripDetails','setItemCategory','updateQuantity','removeGear','updateTripDay']) {
  test(`${name} rejects another user's build before any write`, async () => {
    const {state,actions}=harness();
    await assert.rejects(actions[name](form({buildId:'b', itemId:'item-b', dayId:'day-b', payload:'invalid JSON', delta:1, gearId:'gear-one', category:'base'})), /Build not found/);
    assert.deepEqual(state.writes, []);
  });
}
for (const name of ['setItemCategory','updateQuantity','removeGear']) {
  test(`${name} rejects another build's item paired with owned build`, async () => {
    const {state,actions}=harness();
    await assert.rejects(actions[name](form({buildId:'a',itemId:'item-b',delta:1, category:'base'})), /Item not found/);
    assert.deepEqual(state.writes,[]);
  });
}
test('trip day must belong to the authorized build', async () => {
  const {state,actions}=harness();
  await assert.rejects(actions.updateTripDay(form({buildId:'a',dayId:'day-b'})),/Day not found/);
  assert.deepEqual(state.writes,[]);
  await actions.updateTripDay(form({buildId:'a',dayId:'day-a',notes:'Hello'}));
  assert.equal(state.writes[0].type,'day.update');
});
test('export is private', async () => {
  const {actions}=harness();
  assert.equal((await actions.getBuildExport('a')).name,'A');
  await assert.rejects(actions.getBuildExport('b'), /Build not found/);
});
test('claim ignores forged currentBuild cookie and accepts signed guest proof', async () => {
  const {state,actions,access}=harness(); state.cookies.set('currentBuild','guest');
  await actions.claimCurrentBuild(); assert.deepEqual(state.writes,[]);
  state.cookies.set(token.guestBuildCookieName('guest'),token.createGuestBuildToken('guest'));
  await actions.claimCurrentBuild();
  assert.equal(state.builds[2].userId,'user-a');
  assert.equal(state.cookies.has(token.guestBuildCookieName('guest')),false);
  state.email=null; assert.equal(await access.findAccessibleBuild('guest'),null);
});
test('guest proof cannot claim someone else\'s account build', async () => {
  const {state,actions}=harness(); state.cookies.set('currentBuild','b');
  state.cookies.set(token.guestBuildCookieName('b'),token.createGuestBuildToken('b'));
  await actions.claimCurrentBuild(); assert.deepEqual(state.writes,[]);
});
for (const email of ['a@test',null]) {
  test(`duplicate preserves ownership and navigation for ${email || 'guest'}`, async () => {
    const {state,actions}=harness();state.email=email;
    if (!email) state.cookies.set(token.guestBuildCookieName('guest'),token.createGuestBuildToken('guest'));
    await assert.rejects(actions.duplicateBuild(form({buildId:email?'a':'guest'})),/REDIRECT:\/build\/copy/);
    assert.equal(state.writes[0].args.data.userId,email?'user-a':null);
    assert.equal(state.cookies.get('currentBuild'),'copy');
    if (!email) assert.equal(token.verifyGuestBuildToken('copy',state.cookies.get(token.guestBuildCookieName('copy'))),true);
    assert.equal(state.lastCookieOptions.httpOnly,true);
    assert.equal(state.lastCookieOptions.sameSite,'lax');
  });
}
test('owner can mutate own item', async () => {
  const {state,actions}=harness(); await actions.updateQuantity(form({buildId:'a',itemId:'item-a',delta:1}));
  assert.deepEqual(state.writes[0].args.data.quantity,{increment:1});
});
for (const name of ['getBuildExport','importBuildItems','duplicateBuild','addCustomItem','addGear','updateTripDetails','setItemCategory','updateQuantity','removeGear','updateTripDay']) {
  test(`${name} rejects anonymous access to account build`, async () => {
    const {state,actions}=harness();state.email=null;state.cookies.set('currentBuild','a');
    const input = name === 'getBuildExport' ? 'a' : form({buildId:'a',itemId:'item-a',dayId:'day-a',payload:'{}',delta:1,gearId:'gear-one',category:'base'});
    await assert.rejects(actions[name](input), /Build not found/);
    assert.deepEqual(state.writes,[]);
  });
}
test('missing child IDs are rejected instead of becoming unfiltered Prisma queries',async()=>{
  const {access}=harness();
  await assert.rejects(access.requireBuildItemAccess('a',undefined),/Item not found/);
  await assert.rejects(access.requireTripDayAccess('a',undefined),/Day not found/);
});
for (const email of ['a@test',null]) {
  test(`new build ownership for ${email || 'guest'}`,async()=>{
    const {state,actions}=harness();state.email=email;
    await assert.rejects(actions.createBuild(form({name:'Trip'})),/REDIRECT:\/build\/copy/);
    assert.equal(state.writes[0].args.data.userId,email?'user-a':null);
    assert.equal(state.cookies.get('currentBuild'),'copy');
    assert.equal(state.cookies.has(token.guestBuildCookieName('copy')),!email);
  });
}
test('claim uses the submitted authorized build even when currentBuild points elsewhere',async()=>{
  const {state,actions}=harness();state.cookies.set('currentBuild','b');
  state.cookies.set(token.guestBuildCookieName('guest'),token.createGuestBuildToken('guest'));
  await actions.claimCurrentBuild(form({buildId:'guest'}));
  assert.equal(state.builds[2].userId,'user-a');
  assert.equal(state.builds[1].userId,'user-b');
});

```

### `tests/compatibility.test.mjs`

```typescript
import test from 'node:test';
import assert from 'node:assert/strict';
import { documentedShelterCapacity, evaluateCompatibility, summarizeCompatibility } from '../lib/compatibility.ts';

const date = (day) => new Date(`${day}T12:00:00.000Z`);
const trip = (more = {}) => ({ people: 1, minTemperature: null, conditions: null, startDate: date('2026-08-10'), endDate: date('2026-08-12'), ...more });
const day = (more = {}) => ({ minTemperature: null, conditions: null, waterCarryL: null, campsite: null, waterSource: null, ...more });
const item = (id, category, more = {}) => ({ id, quantity: 1, isConsumable: false, isWorn: false, customCategory: category, gearNameSnapshot: id, weightSnapshot: 500, priceSnapshot: null, gear: null, ...more });
const gear = (category, subcategory, more = {}) => ({ id: `gear-${category}-${subcategory}`, name: `Test ${subcategory}`, weight_g: 500, price_cad: 100, capacity_l: null, frame_type: null, waterproof: null, temperature_rating: null, season: null, category: { name: category }, subcategory: subcategory ? { name: subcategory, slug: subcategory } : null, ...more });
const find = (issues, id) => issues.find(issue => issue.id === id);
const sleepingBag = (id, rating = null, more = {}) => item(id, 'Sleep', { gear: gear('Sleep', 'sleeping-bag', { temperature_rating: rating, ...more }) });
const tent = (id, specs = [], more = {}) => item(id, 'Shelter', { gear: gear('Shelter', 'tent', { specifications: specs, waterproof: true, ...more }) });
const occupancy = (n) => [{ key: 'Sleeping capacity', value: String(n), unit: 'people' }];

test('empty gear is unknown and does not show a compatible/safe result', () => {
  const issues = evaluateCompatibility(trip(), [], []);
  assert.equal(find(issues, 'empty-build').kind, 'unknown');
  assert.equal(summarizeCompatibility(issues).status, 'incomplete');
});

test('same-day outing is not treated as an overnight trip', () => {
  const b = trip({ endDate: date('2026-08-10') });
  const issues = evaluateCompatibility(b, [item('pack', 'Packs')]);
  assert.equal(find(issues, 'missing-shelter'), undefined);
  assert.equal(find(issues, 'missing-sleep'), undefined);
  assert.ok(find(issues, 'missing-water'));
});

test('overnight missing categories are review prompts that allow shared arrangements', () => {
  const issues = evaluateCompatibility(trip(), [item('pack', 'Packs')]);
  assert.equal(find(issues, 'missing-shelter').severity, 'warning');
  assert.match(find(issues, 'missing-shelter').message, /shared/i);
  assert.ok(find(issues, 'cooking-plan'));
});

test('campsite on a trip without dates still makes overnight checks applicable', () => {
  const issues = evaluateCompatibility(trip({ startDate: null, endDate: null }), [item('pack', 'Packs')], [day({ campsite: 'Camp 1' })]);
  assert.ok(find(issues, 'missing-shelter'));
});

test('sleeping pads never count as a rated sleeping bag, even if data has a temperature field', () => {
  const pad = item('pad', 'Sleep', { gear: gear('Sleep', 'sleeping-pad', { temperature_rating: -5 }) });
  const issues = evaluateCompatibility(trip({ minTemperature: -10 }), [pad]);
  assert.equal(find(issues, 'sleep-insulation-missing').severity, 'warning');
  assert.equal(issues.some(i => i.id.startsWith('sleep-rating-review-')), false);
});

test('unrated sleeping bags are unknown and never silently treated as adequate', () => {
  const issues = evaluateCompatibility(trip({ minTemperature: -10 }), [sleepingBag('bag')]);
  assert.equal(find(issues, 'sleep-rating-unknown').kind, 'unknown');
  assert.equal(summarizeCompatibility(issues).unknowns > 0, true);
});

test('sleeping pad R-value is checked separately from bag temperature ratings', () => {
  const pad = item('pad', 'Sleep', { gear: gear('Sleep', 'sleeping-pad', { specifications: [{key:'R-value', value:'1.5', unit:null}] }) });
  const issues = evaluateCompatibility(trip({ minTemperature: -3 }), [sleepingBag('bag', -8), pad]);
  assert.equal(find(issues, 'pad-insulation-review').severity, 'warning');
  assert.equal(find(issues, 'sleep-rating-review-pad'), undefined);
});

test('unrated sleeping pad in cold trip is unknown, not a recorded failure', () => {
  const pad = item('pad', 'Sleep', { gear: gear('Sleep', 'sleeping-pad') });
  const issues = evaluateCompatibility(trip({ minTemperature: -3 }), [sleepingBag('bag', -8), pad]);
  assert.equal(find(issues, 'pad-insulation-unknown').kind, 'unknown');
  assert.equal(find(issues, 'pad-insulation-review'), undefined);
});

test('recorded pad insulation review is not triggered for mild trip lows', () => {
  const pad = item('pad', 'Sleep', { gear: gear('Sleep', 'sleeping-pad', { specifications: [{key:'R-value', value:'1.0'}] }) });
  const issues = evaluateCompatibility(trip({ minTemperature: 10 }), [sleepingBag('bag', 0), pad]);
  assert.equal(find(issues, 'pad-insulation-review'), undefined);
});

test('a recorded sleep temperature above the trip low is a review, not an unqualified claim', () => {
  const issues = evaluateCompatibility(trip({ minTemperature: -8 }), [sleepingBag('bag', 2)]);
  assert.equal(find(issues, 'sleep-rating-review-bag').severity, 'warning');
  assert.match(find(issues, 'sleep-rating-review-bag').action, /comfort rating/i);
});

test('colder-than-trip-low sleeping bag still does not count as guaranteed warm', () => {
  const issues = evaluateCompatibility(trip({ minTemperature: 0 }), [sleepingBag('bag', -10)]);
  assert.equal(find(issues, 'sleep-rating-review-bag'), undefined);
  assert.equal(find(issues, 'sleep-rating-limits').kind, 'unknown');
});

test('trip-day low is included even if build minimum is warmer', () => {
  const issues = evaluateCompatibility(trip({ minTemperature: 5 }), [sleepingBag('bag', 0)], [day({ minTemperature: -5 })]);
  assert.equal(find(issues, 'sleep-rating-review-bag').severity, 'warning');
});

test('insulation quantity checks group size, not only item rows', () => {
  const issues = evaluateCompatibility(trip({ people: 3 }), [sleepingBag('bag', -5, { name: 'Bag' })]);
  assert.ok(find(issues, 'sleep-units'));
  const many = sleepingBag('bags', -5); many.quantity = 3;
  assert.equal(find(evaluateCompatibility(trip({ people: 3 }), [many]), 'sleep-units'), undefined);
});

test('liters NEVER count as shelter occupancy', () => {
  const t = tent('tent', [], { capacity_l: 2 });
  assert.equal(documentedShelterCapacity(t), null);
  const issues = evaluateCompatibility(trip({ people: 2 }), [t]);
  assert.equal(find(issues, 'shelter-occupancy-unknown').kind, 'unknown');
  assert.equal(find(issues, 'shelter-capacity-short'), undefined);
});

test('explicit sleeping capacity specs are used, but ambiguous Capacity is rejected', () => {
  assert.equal(documentedShelterCapacity(tent('t', occupancy(2))), 2);
  assert.equal(documentedShelterCapacity(tent('t', [{ key: 'Capacity', value: '2', unit: 'L' }])), null);
  assert.equal(documentedShelterCapacity(tent('t', [{ key: 'Sleeping capacity', value: '2.5', unit: 'people' }])), null);
  assert.equal(documentedShelterCapacity(tent('t', [{ key: 'Sleeping capacity', value: '3', unit: 'liters' }])), null);
});

test('optional future personCapacity field supported without requiring schema migration', () => {
  assert.equal(documentedShelterCapacity(tent('t', [], { personCapacity: 4, capacity_l: 2 })), 4);
});

test('documented shelter quantity is multiplied correctly for group occupancy', () => {
  const twoTents = tent('two', occupancy(2)); twoTents.quantity = 2;
  const issues = evaluateCompatibility(trip({ people: 4 }), [twoTents]);
  assert.equal(find(issues, 'shelter-capacity-short'), undefined);
  assert.equal(find(issues, 'shelter-occupancy-unknown'), undefined);
});

test('confirmed capacity shortage is flagged when ALL listed shelters have known occupancy', () => {
  const issues = evaluateCompatibility(trip({ people: 3 }), [tent('small', occupancy(2))]);
  assert.equal(find(issues, 'shelter-capacity-short').severity, 'error');
});

test('an unknown shelter suppresses a false certain shortage', () => {
  const issues = evaluateCompatibility(trip({ people: 3 }), [tent('known', occupancy(2)), tent('unknown')]);
  assert.equal(find(issues, 'shelter-capacity-short'), undefined);
  assert.equal(find(issues, 'shelter-capacity-unverified').kind, 'unknown');
});

test('weather condition matches rain and snow variants without requiring an exact string', () => {
  const t = tent('wet', occupancy(1), { waterproof: false, season: '3-season' });
  const issues = evaluateCompatibility(trip({ conditions: 'rain expected' }), [t]);
  assert.ok(find(issues, 'shelter-wet-weather'));
  const snowy = evaluateCompatibility(trip({ conditions: 'snow showers' }), [t]);
  assert.ok(find(snowy, 'shelter-winter-review'));
});

test('no rain and unknown waterproofing never create a confirmed waterproofing warning', () => {
  const t = tent('unknown', occupancy(1), { waterproof: null });
  const dry = evaluateCompatibility(trip({ conditions: 'no rain' }), [t]);
  assert.equal(find(dry, 'shelter-waterproof-unknown'), undefined);
  const wet = evaluateCompatibility(trip({ conditions: 'rain' }), [t]);
  assert.equal(find(wet, 'shelter-wet-weather'), undefined);
  assert.equal(find(wet, 'shelter-waterproof-unknown').kind, 'unknown');
});

test('cold night triggers conservative 3-season shelter review', () => {
  const t = tent('three', occupancy(1), { season: '3-season' });
  assert.ok(find(evaluateCompatibility(trip({ minTemperature: -12 }), [t]), 'shelter-winter-review'));
});

test('waterCarryL compared with bottle capacity, not filter values', () => {
  const bottle = item('bottle', 'Water', { gear: gear('Water', 'bottle', { capacity_l: 1 }) });
  const filter = item('filter', 'Water', { gear: gear('Water', 'filter', { capacity_l: 900 }) });
  const issues = evaluateCompatibility(trip(), [bottle, filter], [day({ waterCarryL: 3 })]);
  assert.equal(find(issues, 'water-volume-check').severity, 'warning');
  assert.match(find(issues, 'water-volume-check').message, /1 L/);
});

test('water bottles count quantity and missing volume stays unknown', () => {
  const bottle = item('bottle', 'Water', { gear: gear('Water', 'bottle', { capacity_l: 1.5 }) });
  bottle.quantity = 2;
  assert.equal(find(evaluateCompatibility(trip(), [bottle], [day({ waterCarryL: 3 })]), 'water-volume-check'), undefined);
  const other = item('unknown', 'Water', { gear: gear('Water', 'bottle', { capacity_l: null }) });
  const issues = evaluateCompatibility(trip(), [bottle, other], [day({ waterCarryL: 5 })]);
  assert.equal(find(issues, 'water-volume-check'), undefined);
  assert.equal(find(issues, 'water-volume-unverified').kind, 'unknown');
});

test('stoves and cookware are not universally required; rain does not imply missing rain gear is unsafe', () => {
  const issues = evaluateCompatibility(trip(), [item('p', 'Packs'), item('w', 'Water')]);
  assert.equal(find(issues, 'cooking-plan').severity, 'info');
  assert.equal(issues.some(i => /rain gear/i.test(i.message)), false);
});

test('large carried weight is no longer an arbitrary compatibility failure', () => {
  const heavy = item('heavy', 'Packs', { weightSnapshot: 12000 });
  const issues = evaluateCompatibility(trip(), [heavy]);
  assert.equal(issues.some(i => i.id === 'heavy-base-weight'), false);
});

test('missing weights appear as unknown rather than counted as zero', () => {
  const unknown = item('unknown', 'Misc', { weightSnapshot: null }); unknown.quantity = 4;
  const issues = evaluateCompatibility(trip(), [unknown]);
  assert.equal(find(issues, 'unknown-weights').kind, 'unknown');
  assert.match(find(issues, 'unknown-weights').message, /4 gear unit/);
});

test('multiple tents are not marked redundant for a group', () => {
  const issues = evaluateCompatibility(trip({ people: 4 }), [tent('a', occupancy(2)), tent('b', occupancy(2), { id: 'tent2' })]);
  assert.equal(find(issues, 'multiple-shelter'), undefined);
  const solo = evaluateCompatibility(trip({ people: 1 }), [tent('a', occupancy(1)), tent('b', occupancy(1), { id: 'tent2' })]);
  assert.equal(find(solo, 'multiple-shelter').severity, 'info');
});

test('results are stable, sorted by severity, and have unique IDs', () => {
  const b = trip({ people: 3, minTemperature: -8, conditions: 'rain' });
  const items = [tent('small', occupancy(1), { waterproof: false }), sleepingBag('bag', 3)];
  const a = evaluateCompatibility(b, items);
  assert.deepEqual(evaluateCompatibility(b, items), a);
  assert.equal(new Set(a.map(i => i.id)).size, a.length);
  assert.deepEqual(a.map(i=>i.severity), [...a.map(i=>i.severity)].sort((x,y)=>({error:0,warning:1,info:2}[x]-{error:0,warning:1,info:2}[y])));
});

test('summary counts unknowns distinctly from warnings and errors', () => {
  assert.equal(summarizeCompatibility([]).status, 'ok');
  assert.equal(summarizeCompatibility([{id:'note',severity:'info',category:'Planning',message:'Advisory',kind:'advisory'}]).status, 'notes');
  const result = summarizeCompatibility([{id:'a',severity:'info',category:'Data',message:'?',kind:'unknown'}, {id:'b',severity:'warning',category:'Gear',message:'!'}]);
  assert.equal(result.status,'warning');
  assert.equal(result.unknowns,1);
  assert.equal(result.total,2);
});


```

### `tests/consumables-model.test.mjs`

```typescript
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { projectConsumableLoad } from '../lib/consumables-model.ts';

test('daily use reduces mass and does not invent negative loads',()=>{
  const days=projectConsumableLoad(600,4,250);
  assert.deepEqual(days.map(d=>d.remainingGrams),[350,100,0,0]);
  assert.deepEqual(days.map(d=>d.unmetGrams),[0,0,150,250]);
});
test('resupply is added at start of selected day',()=>{
  const days=projectConsumableLoad(600,3,250,3,500);
  assert.equal(days[2].startingGrams,100);
  assert.equal(days[2].addedGrams,500);
  assert.equal(days[2].remainingGrams,350);
});
test('invalid range and resupply dates are rejected',()=>{
  assert.throws(()=>projectConsumableLoad(100,0,50));
  assert.throws(()=>projectConsumableLoad(-100,2,50));
  assert.throws(()=>projectConsumableLoad(100,2,-1));
  assert.throws(()=>projectConsumableLoad(100,2,50,1,100));
});

```

### `tests/fixtures/weather/alerts.json`

```json
{"type":"FeatureCollection","features":[{"id":"202949082276051729202610230503_fea1-1178","type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-91.52464845,52.24052231],[-94.93729859,52.47322914],[-95.15366349,52.48414149],[-95.15366349,52.42019514],[-95.15366349,52.36550092],[-95.15366349,52.32630871],[-95.15366349,52.27242662],[-95.15366349,52.2431137],[-95.15366349,52.17042115],[-95.15366349,52.1406863],[-95.15366349,52.06310327],[-95.15366349,52.03979497],[-95.15366349,51.97270853],[-95.15366349,51.97198965],[-95.15366349,51.94176166],[-95.15366349,51.88927272],[-95.15366349,51.86436575],[-95.15366349,51.86321402],[-95.15366349,51.79762995],[-95.15366349,51.76235534],[-95.15366349,51.70615716],[-95.15366349,51.67512487],[-95.15366349,51.61288975],[-93.95421351,51.47334486],[-93.48734631,51.36690808],[-92.33887775,51.11935906],[-91.52464845,52.24052231]]]},"properties":{"alert_code":"SPS","alert_type":"statement","alert_name_en":"special weather statement","alert_name_fr":"bulletin m\u00e9t\u00e9orologique sp\u00e9cial","alert_short_name_en":"Special weather","alert_short_name_fr":"M\u00e9t\u00e9orologique sp\u00e9cial","publication_datetime":"2026-10-25T16:21:21.424Z","expiration_datetime":"2026-10-26T02:06:21.424Z","validity_datetime":"2026-10-25T16:10:00.000Z","event_end_datetime":"2026-10-26T00:00:00.000Z","alert_text_en":"Gusty winds continue.\n\nWhat:\nWesterly winds gusting 70 to 80 km/h.\n\nWhen:\nDiminishing later this afternoon.\n\nAdditional information:\nA low pressure system tracking across Hudson Bay continues to produce strong gusts over the region. \n\nWinds will diminish from west to east as the afternoon progresses.\n\nLocal utility outages are possible. Disruption to services and travel are possible. Secure loose objects.\n\nPlease continue to monitor alerts and forecasts issued by Environment Canada. To report severe weather, send an email to ONstorm@ec.gc.ca or post reports on social media using #ONStorm.","alert_text_fr":"Les vents soufflant en rafales persistent.\n\nQuoi :\nVents d'ouest soufflant en rafales de 70 \u00e0 80 km/h.\n\nQuand :\nFaiblissant plus tard cet apr\u00e8s-midi.\n\nRenseignements suppl\u00e9mentaires :\nUne d\u00e9pression traversant la baie d'Hudson continue de produire de fortes rafales sur la r\u00e9gion.\n\nLes vents faibliront d'ouest en est au cours de l'apr\u00e8s-midi.\n\nDes pannes d'\u00e9lectricit\u00e9 sont possibles par endroits. Des perturbations des services et des d\u00e9placements sont possibles. Immobilisez les objets non fix\u00e9s.\n\nVeuillez continuer \u00e0 surveiller les alertes et les pr\u00e9visions \u00e9mises par Environnement Canada. Pour signaler du temps violent, envoyez un courriel \u00e0 meteoON@ec.gc.ca ou publiez un message sur les r\u00e9seaux sociaux en utilisant #ONMeteo.","risk_colour_en":null,"risk_colour_fr":null,"confidence_en":null,"confidence_fr":null,"impact_en":null,"impact_fr":null,"feature_name_en":"Pikangikum - Poplar Hill - MacDowell","feature_name_fr":"Pikangikum - Poplar Hill - MacDowell","province":"ON","status_en":"ended","status_fr":"termin\u00e9","feature_id":"fea1-1178"}}],"numberMatched":39,"numberReturned":1,"links":[{"type":"application/geo+json","rel":"self","title":"This document as GeoJSON","href":"https://api.weather.gc.ca/collections/weather-alerts/items?f=json&limit=1"},{"rel":"alternate","type":"application/ld+json","title":"This document as RDF (JSON-LD)","href":"https://api.weather.gc.ca/collections/weather-alerts/items?f=jsonld&limit=1"},{"type":"text/html","rel":"alternate","title":"This document as HTML","href":"https://api.weather.gc.ca/collections/weather-alerts/items?f=html&limit=1"},{"type":"application/geo+json","rel":"next","title":"Items (next)","href":"https://api.weather.gc.ca/collections/weather-alerts/items?offset=1&limit=1"},{"type":"application/json","title":"Weather Alerts","rel":"collection","href":"https://api.weather.gc.ca/collections/weather-alerts"}],"timeStamp":"2026-10-25T17:36:31.451618Z"}
```

### `tests/fixtures/weather/city.json`

```json
{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"lastUpdated":"2026-10-25T17:00:42Z","identifier":"bc-99","name":{"en":"West Vancouver","fr":"West Vancouver"},"region":{"en":"Metro Vancouver - North Shore including West Vancouver and North Vancouver","fr":"Metro Vancouver - North Shore incluant West Vancouver et North Vancouver"},"url":{"en":"https://weather.gc.ca/en/location/index.html?coords=49.33,-123.16","fr":"https://meteo.gc.ca/fr/location/index.html?coords=49.33,-123.16"},"currentConditions":{"iconCode":{"format":"gif"},"timestamp":{"en":"2026-10-25T17:00:00Z","fr":"2026-10-25T17:00:00Z"},"relativeHumidity":{"units":{"en":"%","fr":"%"},"qaValue":{"en":100,"fr":100},"value":{"en":66,"fr":66}},"wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"qaValue":{"en":100,"fr":100},"value":{"en":4,"fr":4}},"direction":{"qaValue":{"en":100,"fr":100},"value":{"en":"E","fr":"E"}},"bearing":{"units":{"en":"degrees","fr":"degrees"},"qaValue":{"en":100,"fr":100},"value":{"en":81.9,"fr":81.9}},"gust":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":33,"fr":33},"qaValue":{"en":100,"fr":100}}},"pressure":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"kPa","fr":"kPa"},"change":{"en":0.0,"fr":0.0},"tendency":{"en":"falling","fr":"\u00e0 la baisse"},"value":{"en":101.5,"fr":101.5}},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"qaValue":{"en":100,"fr":100},"value":{"en":11.1,"fr":11.1}},"dewpoint":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":5.0,"fr":5.0}},"station":{"code":{"en":"wwa","fr":"wwa"},"lat":{"en":"49.35N","fr":"49.35N"},"lon":{"en":"123.19W","fr":"123.19O"},"value":{"en":"West Vancouver","fr":"West Vancouver"}},"windChill":{"unitType":{"en":"metric","fr":"metric"},"value":{"en":-2,"fr":-2},"qaValue":{"en":100,"fr":100}}},"forecastGroup":{"timestamp":{"en":"2026-10-25T12:00:00Z","fr":"2026-10-25T12:00:00Z"},"regionalNormals":{"textSummary":{"en":"Low plus 5. High 12.","fr":"Minimum plus 5. Maximum 12."},"temperature":[{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"class":{"en":"high","fr":"high"},"value":{"en":12,"fr":12}},{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"class":{"en":"low","fr":"low"},"value":{"en":5,"fr":5}}]},"forecasts":[{"precipitation":{"precipPeriods":[{"start":{"en":12,"fr":12},"end":{"en":25,"fr":25},"value":{"en":"rain","fr":"pluie"}}],"accumulation":{"amount":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"mm","fr":"mm"},"value":{"en":1,"fr":1}},"name":{"en":"rain","fr":"pluie"}}},"uv":{"index":{"en":"1","fr":"1"},"category":{"en":"low","fr":"bas"},"textSummary":{"en":"UV index 1 or low.","fr":"Indice UV de 1 ou bas."}},"period":{"textForecastName":{"en":"Today","fr":"Aujourd'hui"},"value":{"en":"Sunday","fr":"dimanche"}},"temperatures":{"temperature":[{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"class":{"en":"high","fr":"high"},"value":{"en":12,"fr":12}}],"textSummary":{"en":"High 12.","fr":"Maximum 12."}},"winds":{"periods":[{"bearing":{"units":{"en":"degrees","fr":"degrees"},"value":{"en":9,"fr":9}},"index":{"en":1,"fr":1},"rank":{"en":"major","fr":"major"},"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":20,"fr":20}},"gust":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":40,"fr":40}},"direction":{"en":"E","fr":"E"}}],"textSummary":{"en":"Wind east 20 km/h gusting to 40.","fr":"Vents d'est de 20 km/h avec rafales \u00e0 40."}},"cloudPrecip":{"en":"Rain ending this morning then cloudy with 30 percent chance of showers.","fr":"Pluie cessant ce matin. Nuageux par la suite avec 30 pour cent de probabilit\u00e9 d'averses."},"relativeHumidity":{"units":{"en":"%","fr":"%"},"value":{"en":85,"fr":85}},"abbreviatedForecast":{"icon":{"format":"gif","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"textSummary":{"en":"Chance of showers","fr":"Possibilit\u00e9 d'averses"}},"textSummary":{"en":"Rain ending this morning then cloudy with 30 percent chance of showers. Wind east 20 km/h gusting to 40. High 12. UV index 1 or low.","fr":"Pluie cessant ce matin. Nuageux par la suite avec 30 pour cent de probabilit\u00e9 d'averses. Vents d'est de 20 km/h avec rafales \u00e0 40. Maximum 12. Indice UV de 1 ou bas."}},{"precipitation":{"precipPeriods":[{"start":{"en":25,"fr":25},"end":{"en":31,"fr":31},"value":{"en":"rain","fr":"pluie"}}]},"period":{"textForecastName":{"en":"Tonight","fr":"Ce soir et cette nuit"},"value":{"en":"Sunday night","fr":"ce soir et cette nuit"}},"temperatures":{"temperature":[{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"class":{"en":"low","fr":"low"},"value":{"en":8,"fr":8}}],"textSummary":{"en":"Low 8.","fr":"Minimum 8."}},"visibility":{"cause":"other","textSummary":{"en":"Fog patches developing near midnight.","fr":"Nappes de brouillard se formant vers minuit."}},"winds":{"periods":[{"bearing":{"units":{"en":"degrees","fr":"degrees"},"value":{"en":9,"fr":9}},"index":{"en":1,"fr":1},"rank":{"en":"major","fr":"major"},"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":20,"fr":20}},"gust":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":40,"fr":40}},"direction":{"en":"E","fr":"E"}},{"bearing":{"units":{"en":"degrees","fr":"degrees"},"value":{"en":4,"fr":4}},"index":{"en":2,"fr":2},"rank":{"en":"major","fr":"major"},"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":5,"fr":5}},"gust":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":0,"fr":0}},"direction":{"en":"NE","fr":"NE"}}],"textSummary":{"en":"Wind east 20 km/h gusting to 40 becoming light this evening.","fr":"Vents d'est de 20 km/h avec rafales \u00e0 40 devenant l\u00e9gers ce soir."}},"cloudPrecip":{"en":"Cloudy. 30 percent chance of showers this evening.","fr":"Nuageux. 30 pour cent de probabilit\u00e9 d'averses ce soir."},"relativeHumidity":{"units":{"en":"%","fr":"%"},"value":{"en":100,"fr":100}},"abbreviatedForecast":{"icon":{"format":"gif","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"textSummary":{"en":"Chance of showers","fr":"Possibilit\u00e9 d'averses"}},"textSummary":{"en":"Cloudy. 30 percent chance of showers this evening. Fog patches developing near midnight. Wind east 20 km/h gusting to 40 becoming light this evening. Low 8.","fr":"Nuageux. 30 pour cent de probabilit\u00e9 d'averses ce soir. Nappes de brouillard se formant vers minuit. Vents d'est de 20 km/h avec rafales \u00e0 40 devenant l\u00e9gers ce soir. Minimum 8."}},{"uv":{"index":{"en":"1","fr":"1"},"category":{"en":"low","fr":"bas"},"textSummary":{"en":"UV index 1 or low.","fr":"Indice UV de 1 ou bas."}},"period":{"textForecastName":{"en":"Monday","fr":"Lundi"},"value":{"en":"Monday","fr":"lundi"}},"temperatures":{"temperature":[{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"class":{"en":"high","fr":"high"},"value":{"en":12,"fr":12}}],"textSummary":{"en":"High 12.","fr":"Maximum 12."}},"visibility":{"cause":"other","textSummary":{"en":"Fog patches dissipating in the morning.","fr":"Nappes de brouillard se dissipant le matin."}},"winds":{"periods":[{"bearing":{"units":{"en":"degrees","fr":"degrees"},"value":{"en":32,"fr":32}},"index":{"en":1,"fr":1},"rank":{"en":"major","fr":"major"},"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":5,"fr":5}},"gust":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":0,"fr":0}},"direction":{"en":"NW","fr":"NO"}},{"bearing":{"units":{"en":"degrees","fr":"degrees"},"value":{"en":32,"fr":32}},"index":{"en":2,"fr":2},"rank":{"en":"major","fr":"major"},"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":20,"fr":20}},"gust":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":0,"fr":0}},"direction":{"en":"NW","fr":"NO"}},{"bearing":{"units":{"en":"degrees","fr":"degrees"},"value":{"en":27,"fr":27}},"index":{"en":3,"fr":3},"rank":{"en":"minor","fr":"minor"},"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":20,"fr":20}},"gust":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":0,"fr":0}},"direction":{"en":"W","fr":"O"}}],"textSummary":{"en":"Wind becoming west 20 km/h in the morning.","fr":"Vents devenant d'ouest \u00e0 20 km/h le matin."}},"cloudPrecip":{"en":"Clearing.","fr":"D\u00e9gagement."},"relativeHumidity":{"units":{"en":"%","fr":"%"},"value":{"en":95,"fr":95}},"abbreviatedForecast":{"icon":{"format":"gif","value":5,"url":"https://weather.gc.ca/weathericons/05.gif"},"textSummary":{"en":"Clearing","fr":"D\u00e9gagement"}},"textSummary":{"en":"Clearing. Fog patches dissipating in the morning. Wind becoming west 20 km/h in the morning. High 12. UV index 1 or low.","fr":"D\u00e9gagement. Nappes de brouillard se dissipant le matin. Vents devenant d'ouest \u00e0 20 km/h le matin. Maximum 12. Indice UV de 1 ou bas."}},{"period":{"textForecastName":{"en":"Monday night","fr":"Lundi soir et nuit"},"value":{"en":"Monday night","fr":"lundi soir et nuit"}},"temperatures":{"temperature":[{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"class":{"en":"low","fr":"low"},"value":{"en":8,"fr":8}}],"textSummary":{"en":"Low 8.","fr":"Minimum 8."}},"cloudPrecip":{"en":"Increasing cloudiness.","fr":"Ennuagement."},"relativeHumidity":{"units":{"en":"%","fr":"%"},"value":{"en":95,"fr":95}},"abbreviatedForecast":{"icon":{"format":"gif","value":10,"url":"https://weather.gc.ca/weathericons/10.gif"},"textSummary":{"en":"Cloudy","fr":"Nuageux"}},"textSummary":{"en":"Increasing cloudiness. Low 8.","fr":"Ennuagement. Minimum 8."}},{"precipitation":{"precipPeriods":[{"start":{"en":67,"fr":67},"end":{"en":73,"fr":73},"value":{"en":"rain","fr":"pluie"}}]},"period":{"textForecastName":{"en":"Tuesday","fr":"Mardi"},"value":{"en":"Tuesday","fr":"mardi"}},"temperatures":{"temperature":[{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"class":{"en":"high","fr":"high"},"value":{"en":10,"fr":10}}],"textSummary":{"en":"High 10.","fr":"Maximum 10."}},"cloudPrecip":{"en":"Cloudy with 40 percent chance of showers.","fr":"Nuageux avec 40 pour cent de probabilit\u00e9 d'averses."},"relativeHumidity":{"units":{"en":"%","fr":"%"},"value":{"en":80,"fr":80}},"abbreviatedForecast":{"icon":{"format":"gif","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"textSummary":{"en":"Chance of showers","fr":"Possibilit\u00e9 d'averses"}},"textSummary":{"en":"Cloudy with 40 percent chance of showers. High 10.","fr":"Nuageux avec 40 pour cent de probabilit\u00e9 d'averses. Maximum 10."}},{"precipitation":{"precipPeriods":[{"start":{"en":73,"fr":73},"end":{"en":85,"fr":85},"value":{"en":"rain","fr":"pluie"}}]},"period":{"textForecastName":{"en":"Tuesday night","fr":"Mardi soir et nuit"},"value":{"en":"Tuesday night","fr":"mardi soir et nuit"}},"temperatures":{"temperature":[{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"class":{"en":"low","fr":"low"},"value":{"en":6,"fr":6}}],"textSummary":{"en":"Low 6.","fr":"Minimum 6."}},"cloudPrecip":{"en":"Showers.","fr":"Averses."},"relativeHumidity":{"units":{"en":"%","fr":"%"},"value":{"en":95,"fr":95}},"abbreviatedForecast":{"icon":{"format":"gif","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"textSummary":{"en":"Showers","fr":"Averses"}},"textSummary":{"en":"Showers. Low 6.","fr":"Averses. Minimum 6."}},{"precipitation":{"precipPeriods":[{"start":{"en":85,"fr":85},"end":{"en":97,"fr":97},"value":{"en":"rain","fr":"pluie"}}]},"period":{"textForecastName":{"en":"Wednesday","fr":"Mercredi"},"value":{"en":"Wednesday","fr":"mercredi"}},"temperatures":{"temperature":[{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"class":{"en":"high","fr":"high"},"value":{"en":10,"fr":10}}],"textSummary":{"en":"High 10.","fr":"Maximum 10."}},"cloudPrecip":{"en":"Showers.","fr":"Averses."},"relativeHumidity":{"units":{"en":"%","fr":"%"},"value":{"en":85,"fr":85}},"abbreviatedForecast":{"icon":{"format":"gif","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"textSummary":{"en":"Showers","fr":"Averses"}},"textSummary":{"en":"Showers. High 10.","fr":"Averses. Maximum 10."}},{"precipitation":{"precipPeriods":[{"start":{"en":97,"fr":97},"end":{"en":109,"fr":109},"value":{"en":"rain","fr":"pluie"}}]},"period":{"textForecastName":{"en":"Wednesday night","fr":"Mercredi soir et nuit"},"value":{"en":"Wednesday night","fr":"mercredi soir et nuit"}},"temperatures":{"temperature":[{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"class":{"en":"low","fr":"low"},"value":{"en":5,"fr":5}}],"textSummary":{"en":"Low plus 5.","fr":"Minimum plus 5."}},"cloudPrecip":{"en":"Rain.","fr":"Pluie."},"relativeHumidity":{"units":{"en":"%","fr":"%"},"value":{"en":95,"fr":95}},"abbreviatedForecast":{"icon":{"format":"gif","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"textSummary":{"en":"Rain","fr":"Pluie"}},"textSummary":{"en":"Rain. Low plus 5.","fr":"Pluie. Minimum plus 5."}},{"precipitation":{"precipPeriods":[{"start":{"en":109,"fr":109},"end":{"en":114,"fr":114},"value":{"en":"rain","fr":"pluie"}},{"start":{"en":120,"fr":120},"end":{"en":121,"fr":121},"value":{"en":"rain","fr":"pluie"}}]},"period":{"textForecastName":{"en":"Thursday","fr":"Jeudi"},"value":{"en":"Thursday","fr":"jeudi"}},"temperatures":{"temperature":[{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"class":{"en":"high","fr":"high"},"value":{"en":8,"fr":8}}],"textSummary":{"en":"High 8.","fr":"Maximum 8."}},"cloudPrecip":{"en":"Showers.","fr":"Averses."},"relativeHumidity":{"units":{"en":"%","fr":"%"},"value":{"en":80,"fr":80}},"abbreviatedForecast":{"icon":{"format":"gif","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"textSummary":{"en":"Showers","fr":"Averses"}},"textSummary":{"en":"Showers. High 8.","fr":"Averses. Maximum 8."}},{"precipitation":{"precipPeriods":[{"start":{"en":121,"fr":121},"end":{"en":133,"fr":133},"value":{"en":"rain","fr":"pluie"}}]},"period":{"textForecastName":{"en":"Thursday night","fr":"Jeudi soir et nuit"},"value":{"en":"Thursday night","fr":"jeudi soir et nuit"}},"temperatures":{"temperature":[{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"class":{"en":"low","fr":"low"},"value":{"en":4,"fr":4}}],"textSummary":{"en":"Low plus 4.","fr":"Minimum plus 4."}},"cloudPrecip":{"en":"Cloudy with 40 percent chance of showers.","fr":"Nuageux avec 40 pour cent de probabilit\u00e9 d'averses."},"relativeHumidity":{"units":{"en":"%","fr":"%"},"value":{"en":95,"fr":95}},"abbreviatedForecast":{"icon":{"format":"gif","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"textSummary":{"en":"Chance of showers","fr":"Possibilit\u00e9 d'averses"}},"textSummary":{"en":"Cloudy with 40 percent chance of showers. Low plus 4.","fr":"Nuageux avec 40 pour cent de probabilit\u00e9 d'averses. Minimum plus 4."}},{"precipitation":{"precipPeriods":[{"start":{"en":133,"fr":133},"end":{"en":138,"fr":138},"value":{"en":"rain","fr":"pluie"}}]},"period":{"textForecastName":{"en":"Friday","fr":"Vendredi"},"value":{"en":"Friday","fr":"vendredi"}},"temperatures":{"temperature":[{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"class":{"en":"high","fr":"high"},"value":{"en":10,"fr":10}}],"textSummary":{"en":"High 10.","fr":"Maximum 10."}},"cloudPrecip":{"en":"Cloudy with 30 percent chance of showers.","fr":"Nuageux avec 30 pour cent de probabilit\u00e9 d'averses."},"relativeHumidity":{"units":{"en":"%","fr":"%"},"value":{"en":70,"fr":70}},"abbreviatedForecast":{"icon":{"format":"gif","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"textSummary":{"en":"Chance of showers","fr":"Possibilit\u00e9 d'averses"}},"textSummary":{"en":"Cloudy with 30 percent chance of showers. High 10.","fr":"Nuageux avec 30 pour cent de probabilit\u00e9 d'averses. Maximum 10."}},{"period":{"textForecastName":{"en":"Friday night","fr":"Vendredi soir et nuit"},"value":{"en":"Friday night","fr":"vendredi soir et nuit"}},"temperatures":{"temperature":[{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"class":{"en":"low","fr":"low"},"value":{"en":3,"fr":3}}],"textSummary":{"en":"Low plus 3.","fr":"Minimum plus 3."}},"cloudPrecip":{"en":"Cloudy periods.","fr":"Passages nuageux."},"relativeHumidity":{"units":{"en":"%","fr":"%"},"value":{"en":85,"fr":85}},"abbreviatedForecast":{"icon":{"format":"gif","value":32,"url":"https://weather.gc.ca/weathericons/32.gif"},"textSummary":{"en":"Cloudy periods","fr":"Passages nuageux"}},"textSummary":{"en":"Cloudy periods. Low plus 3.","fr":"Passages nuageux. Minimum plus 3."}},{"period":{"textForecastName":{"en":"Saturday","fr":"Samedi"},"value":{"en":"Saturday","fr":"samedi"}},"temperatures":{"temperature":[{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"class":{"en":"high","fr":"high"},"value":{"en":9,"fr":9}}],"textSummary":{"en":"High 9.","fr":"Maximum 9."}},"cloudPrecip":{"en":"A mix of sun and cloud.","fr":"Alternance de soleil et de nuages."},"relativeHumidity":{"units":{"en":"%","fr":"%"},"value":{"en":70,"fr":70}},"abbreviatedForecast":{"icon":{"format":"gif","value":2,"url":"https://weather.gc.ca/weathericons/02.gif"},"textSummary":{"en":"A mix of sun and cloud","fr":"Alternance de soleil et de nuages"}},"textSummary":{"en":"A mix of sun and cloud. High 9.","fr":"Alternance de soleil et de nuages. Maximum 9."}}]},"hourlyForecastGroup":{"timestamp":{"en":"2026-10-25T05:00:00Z","fr":"2026-10-25T05:00:00Z"},"hourlyForecasts":[{"uv":{"index":{"value":{"en":1,"fr":1}}},"condition":{"en":"Chance of showers","fr":"Possibilit\u00e9 d'averses"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":11,"fr":11}},"iconCode":{"format":"png","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Low","fr":"Basse"},"value":{"en":30,"fr":30}},"timestamp":"2026-10-25T18:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":20,"fr":20}},"direction":{"windDirFull":{"en":"East","fr":"Est"},"value":{"en":"E","fr":"E"}},"gust":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":40,"fr":40}}}},{"uv":{"index":{"value":{"en":1,"fr":1}}},"condition":{"en":"Chance of showers","fr":"Possibilit\u00e9 d'averses"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":11,"fr":11}},"iconCode":{"format":"png","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Low","fr":"Basse"},"value":{"en":30,"fr":30}},"timestamp":"2026-10-25T19:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":20,"fr":20}},"direction":{"windDirFull":{"en":"East","fr":"Est"},"value":{"en":"E","fr":"E"}},"gust":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":40,"fr":40}}}},{"uv":{"index":{"value":{"en":1,"fr":1}}},"condition":{"en":"Chance of showers","fr":"Possibilit\u00e9 d'averses"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":12,"fr":12}},"iconCode":{"format":"png","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Low","fr":"Basse"},"value":{"en":30,"fr":30}},"timestamp":"2026-10-25T20:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":20,"fr":20}},"direction":{"windDirFull":{"en":"East","fr":"Est"},"value":{"en":"E","fr":"E"}},"gust":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":40,"fr":40}}}},{"condition":{"en":"Chance of showers","fr":"Possibilit\u00e9 d'averses"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":12,"fr":12}},"iconCode":{"format":"png","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Low","fr":"Basse"},"value":{"en":30,"fr":30}},"timestamp":"2026-10-25T21:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":20,"fr":20}},"direction":{"windDirFull":{"en":"East","fr":"Est"},"value":{"en":"E","fr":"E"}},"gust":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":40,"fr":40}}}},{"condition":{"en":"Chance of showers","fr":"Possibilit\u00e9 d'averses"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":12,"fr":12}},"iconCode":{"format":"png","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Low","fr":"Basse"},"value":{"en":30,"fr":30}},"timestamp":"2026-10-25T22:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":20,"fr":20}},"direction":{"windDirFull":{"en":"East","fr":"Est"},"value":{"en":"E","fr":"E"}},"gust":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":40,"fr":40}}}},{"condition":{"en":"Chance of showers","fr":"Possibilit\u00e9 d'averses"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":12,"fr":12}},"iconCode":{"format":"png","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Low","fr":"Basse"},"value":{"en":30,"fr":30}},"timestamp":"2026-10-25T23:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":20,"fr":20}},"direction":{"windDirFull":{"en":"East","fr":"Est"},"value":{"en":"E","fr":"E"}},"gust":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":40,"fr":40}}}},{"condition":{"en":"Chance of showers","fr":"Possibilit\u00e9 d'averses"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":12,"fr":12}},"iconCode":{"format":"png","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Low","fr":"Basse"},"value":{"en":30,"fr":30}},"timestamp":"2026-10-26T00:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":20,"fr":20}},"direction":{"windDirFull":{"en":"East","fr":"Est"},"value":{"en":"E","fr":"E"}},"gust":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":40,"fr":40}}}},{"condition":{"en":"Chance of showers","fr":"Possibilit\u00e9 d'averses"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":11,"fr":11}},"iconCode":{"format":"png","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Low","fr":"Basse"},"value":{"en":30,"fr":30}},"timestamp":"2026-10-26T01:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":20,"fr":20}},"direction":{"windDirFull":{"en":"East","fr":"Est"},"value":{"en":"E","fr":"E"}},"gust":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":40,"fr":40}}}},{"condition":{"en":"Chance of showers","fr":"Possibilit\u00e9 d'averses"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":11,"fr":11}},"iconCode":{"format":"png","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Low","fr":"Basse"},"value":{"en":30,"fr":30}},"timestamp":"2026-10-26T02:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":20,"fr":20}},"direction":{"windDirFull":{"en":"East","fr":"Est"},"value":{"en":"E","fr":"E"}},"gust":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":40,"fr":40}}}},{"condition":{"en":"Chance of showers","fr":"Possibilit\u00e9 d'averses"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":10,"fr":10}},"iconCode":{"format":"png","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Low","fr":"Basse"},"value":{"en":30,"fr":30}},"timestamp":"2026-10-26T03:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":20,"fr":20}},"direction":{"windDirFull":{"en":"East","fr":"Est"},"value":{"en":"E","fr":"E"}},"gust":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":40,"fr":40}}}},{"condition":{"en":"Chance of showers","fr":"Possibilit\u00e9 d'averses"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":10,"fr":10}},"iconCode":{"format":"png","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Low","fr":"Basse"},"value":{"en":30,"fr":30}},"timestamp":"2026-10-26T04:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":5,"fr":5}},"direction":{"windDirFull":{"en":"Northeast","fr":"Nord-est"},"value":{"en":"NE","fr":"NE"}}}},{"condition":{"en":"Chance of showers","fr":"Possibilit\u00e9 d'averses"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":9,"fr":9}},"iconCode":{"format":"png","value":12,"url":"https://weather.gc.ca/weathericons/12.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Low","fr":"Basse"},"value":{"en":30,"fr":30}},"timestamp":"2026-10-26T05:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":5,"fr":5}},"direction":{"windDirFull":{"en":"Northeast","fr":"Nord-est"},"value":{"en":"NE","fr":"NE"}}}},{"condition":{"en":"Overcast","fr":"Couvert"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":9,"fr":9}},"iconCode":{"format":"png","value":10,"url":"https://weather.gc.ca/weathericons/10.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Nil","fr":"Nulle"},"value":{"en":0,"fr":0}},"timestamp":"2026-10-26T06:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":5,"fr":5}},"direction":{"windDirFull":{"en":"Northeast","fr":"Nord-est"},"value":{"en":"NE","fr":"NE"}}}},{"condition":{"en":"Mainly cloudy","fr":"G\u00e9n\u00e9ralement nuageux"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":9,"fr":9}},"iconCode":{"format":"png","value":33,"url":"https://weather.gc.ca/weathericons/33.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Nil","fr":"Nulle"},"value":{"en":0,"fr":0}},"timestamp":"2026-10-26T07:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":5,"fr":5}},"direction":{"windDirFull":{"en":"Northeast","fr":"Nord-est"},"value":{"en":"NE","fr":"NE"}}}},{"condition":{"en":"Mainly cloudy","fr":"G\u00e9n\u00e9ralement nuageux"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":8,"fr":8}},"iconCode":{"format":"png","value":33,"url":"https://weather.gc.ca/weathericons/33.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Nil","fr":"Nulle"},"value":{"en":0,"fr":0}},"timestamp":"2026-10-26T08:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":5,"fr":5}},"direction":{"windDirFull":{"en":"Northeast","fr":"Nord-est"},"value":{"en":"NE","fr":"NE"}}}},{"condition":{"en":"Mainly cloudy","fr":"G\u00e9n\u00e9ralement nuageux"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":8,"fr":8}},"iconCode":{"format":"png","value":33,"url":"https://weather.gc.ca/weathericons/33.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Nil","fr":"Nulle"},"value":{"en":0,"fr":0}},"timestamp":"2026-10-26T09:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":5,"fr":5}},"direction":{"windDirFull":{"en":"Northeast","fr":"Nord-est"},"value":{"en":"NE","fr":"NE"}}}},{"condition":{"en":"Mainly cloudy","fr":"G\u00e9n\u00e9ralement nuageux"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":8,"fr":8}},"iconCode":{"format":"png","value":33,"url":"https://weather.gc.ca/weathericons/33.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Nil","fr":"Nulle"},"value":{"en":0,"fr":0}},"timestamp":"2026-10-26T10:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":5,"fr":5}},"direction":{"windDirFull":{"en":"Northeast","fr":"Nord-est"},"value":{"en":"NE","fr":"NE"}}}},{"condition":{"en":"Mainly cloudy","fr":"G\u00e9n\u00e9ralement nuageux"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":8,"fr":8}},"iconCode":{"format":"png","value":33,"url":"https://weather.gc.ca/weathericons/33.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Nil","fr":"Nulle"},"value":{"en":0,"fr":0}},"timestamp":"2026-10-26T11:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":5,"fr":5}},"direction":{"windDirFull":{"en":"Northeast","fr":"Nord-est"},"value":{"en":"NE","fr":"NE"}}}},{"condition":{"en":"Mainly cloudy","fr":"G\u00e9n\u00e9ralement nuageux"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":8,"fr":8}},"iconCode":{"format":"png","value":33,"url":"https://weather.gc.ca/weathericons/33.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Nil","fr":"Nulle"},"value":{"en":0,"fr":0}},"timestamp":"2026-10-26T12:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":5,"fr":5}},"direction":{"windDirFull":{"en":"Northeast","fr":"Nord-est"},"value":{"en":"NE","fr":"NE"}}}},{"condition":{"en":"Mainly cloudy","fr":"G\u00e9n\u00e9ralement nuageux"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":8,"fr":8}},"iconCode":{"format":"png","value":33,"url":"https://weather.gc.ca/weathericons/33.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Nil","fr":"Nulle"},"value":{"en":0,"fr":0}},"timestamp":"2026-10-26T13:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":5,"fr":5}},"direction":{"windDirFull":{"en":"Northwest"},"value":{"en":"NW","fr":"NO"}}}},{"condition":{"en":"Mainly cloudy","fr":"G\u00e9n\u00e9ralement nuageux"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":8,"fr":8}},"iconCode":{"format":"png","value":33,"url":"https://weather.gc.ca/weathericons/33.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Nil","fr":"Nulle"},"value":{"en":0,"fr":0}},"timestamp":"2026-10-26T14:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":5,"fr":5}},"direction":{"windDirFull":{"en":"Northwest"},"value":{"en":"NW","fr":"NO"}}}},{"condition":{"en":"Mainly cloudy","fr":"G\u00e9n\u00e9ralement nuageux"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":8,"fr":8}},"iconCode":{"format":"png","value":3,"url":"https://weather.gc.ca/weathericons/03.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Nil","fr":"Nulle"},"value":{"en":0,"fr":0}},"timestamp":"2026-10-26T15:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":5,"fr":5}},"direction":{"windDirFull":{"en":"Northwest"},"value":{"en":"NW","fr":"NO"}}}},{"condition":{"en":"Mainly cloudy","fr":"G\u00e9n\u00e9ralement nuageux"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":9,"fr":9}},"iconCode":{"format":"png","value":3,"url":"https://weather.gc.ca/weathericons/03.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Nil","fr":"Nulle"},"value":{"en":0,"fr":0}},"timestamp":"2026-10-26T16:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":20,"fr":20}},"direction":{"windDirFull":{"en":"Northwest"},"value":{"en":"NW","fr":"NO"}}}},{"uv":{"index":{"value":{"en":1,"fr":1}}},"condition":{"en":"Mainly cloudy","fr":"G\u00e9n\u00e9ralement nuageux"},"temperature":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"C","fr":"C"},"value":{"en":10,"fr":10}},"iconCode":{"format":"png","value":3,"url":"https://weather.gc.ca/weathericons/03.gif"},"lop":{"units":{"en":"%","fr":"%"},"category":{"en":"Nil","fr":"Nulle"},"value":{"en":0,"fr":0}},"timestamp":"2026-10-26T17:00:00Z","wind":{"speed":{"unitType":{"en":"metric","fr":"metric"},"units":{"en":"km/h","fr":"km/h"},"value":{"en":20,"fr":20}},"direction":{"windDirFull":{"en":"Northwest"},"value":{"en":"NW","fr":"NO"}}}}]},"warnings":[],"riseSet":{"disclaimer":{"en":"The information provided here, for the times of the rise and set of the sun, is an estimate included as a convenience to our clients. Values shown here may differ from the official sunrise/sunset data available from (http://hia-iha.nrc-cnrc.gc.ca/sunrise_e.html)","fr":"Les heures de lever et coucher du soleil sont une estimation seulement et peuvent \u00eatre diff\u00e9rentes des heures officielles de lever et coucher du soleil disponibles ici ( http://hia-iha.nrc-cnrc.gc.ca/sunrise_f.html )"},"sunrise":{"en":"2026-10-25T14:49:00Z","fr":"2026-10-25T14:49:00Z"},"sunset":{"en":"2026-10-26T01:03:00Z","fr":"2026-10-26T01:03:00Z"}}},"geometry":{"type":"Point","coordinates":[-123.16,49.33]},"id":"bc-99"}],"numberMatched":844,"numberReturned":1,"links":[{"type":"application/geo+json","rel":"self","title":"This document as GeoJSON","href":"https://api.weather.gc.ca/collections/citypageweather-realtime/items?f=json&limit=1"},{"rel":"alternate","type":"application/ld+json","title":"This document as RDF (JSON-LD)","href":"https://api.weather.gc.ca/collections/citypageweather-realtime/items?f=jsonld&limit=1"},{"type":"text/html","rel":"alternate","title":"This document as HTML","href":"https://api.weather.gc.ca/collections/citypageweather-realtime/items?f=html&limit=1"},{"type":"application/geo+json","rel":"next","title":"Items (next)","href":"https://api.weather.gc.ca/collections/citypageweather-realtime/items?offset=1&limit=1"},{"type":"application/json","title":"City Page Weather [experimental]","rel":"collection","href":"https://api.weather.gc.ca/collections/citypageweather-realtime"}],"timeStamp":"2026-10-25T17:36:14.761666Z"}
```

### `tests/fixtures/weather/model.json`

```json
{

  "type": "FeatureCollection",
  "layer": "RDPS_10km_AirTemp_2m",
  "features": [
    
    {
      "type": "Feature",
      "id": "RDPS_10km_AirTemp_2m(-116.29799,51.427015)",
      "geometry": {
        "type": "Point",
        "coordinates": [
            -116.2980,51.4270
        ]
      },
      "properties": {
        "value": -6.3080812,
        "class": "-10 -5",
        "title_en": "RDPS - Air temperature at 2m above ground [°C]",
        "title_fr": "SRPD - Température de l'air à 2m au dessus de la surface [°C]",
        "time": "2026-10-25T17:00:00Z",
        "dim_reference_time": "2026-10-25T12:00:00Z"
      }
    }
  ]

}

```

### `tests/pack-analysis.test.mjs`

```typescript
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { analyzePack, simulateExclusions } from '../lib/pack-analysis.ts';

const gear = (name, category, weight_g, price_cad = 100) => ({ name, category: { name: category }, weight_g, price_cad });
const item = (id, overrides = {}) => ({
  id, quantity: 1, isWorn: false, isConsumable: false, customCategory: null,
  gearNameSnapshot: null, weightSnapshot: null, priceSnapshot: null, gear: null,
  ...overrides,
});

test('empty build has no divide-by-zero or phantom weights', () => {
  const result = analyzePack([]);
  assert.equal(result.totalGrams, 0);
  assert.equal(result.totalUnits, 0);
  assert.equal(result.categories.length, 0);
  assert.deepEqual(result.heaviest, []);
});

test('quantity, catalog precedence, worn priority and known totals match Builder', () => {
  const result = analyzePack([
    item('pack', { gear: gear('Pack', 'Packs', 900, 350) }),
    item('food', { quantity: 3, isConsumable: true, weightSnapshot: 400, priceSnapshot: 4, customCategory: 'Food' }),
    item('shoes', { isWorn: true, isConsumable: true, gear: gear('Shoes', 'Clothing', 620, 110) }),
    item('sleep', { quantity: 2, gear: gear('Quilt', 'Sleep', 300, 75), weightSnapshot: 900, priceSnapshot: 100 }),
  ]);
  assert.equal(result.baseGrams, 1500);
  assert.equal(result.consumableGrams, 1200);
  assert.equal(result.wornGrams, 620);
  assert.equal(result.carriedGrams, 2700);
  assert.equal(result.totalGrams, 3320);
  assert.equal(result.knownCostCad, 350 + 12 + 110 + 150);
  assert.equal(result.totalUnits, 7);
  assert.equal(result.unknownWeightUnits, 0);
  assert.equal(result.categories[0].name, 'Food');
  assert.equal(result.heaviest[0].name, 'Custom item');
});

test('unknown weight or price never counted as known zero', () => {
  const result = analyzePack([
    item('unknown', { quantity: 2, customCategory: 'Misc' }),
    item('zero', { weightSnapshot: 0, priceSnapshot: 0 }),
    item('invalid', { weightSnapshot: -5, priceSnapshot: Number.NaN }),
  ]);
  assert.equal(result.knownWeightUnits, 1);
  assert.equal(result.unknownWeightUnits, 3);
  assert.equal(result.unknownPriceUnits, 3);
  assert.equal(result.totalGrams, 0);
  assert.equal(result.knownCostCad, 0);
  assert.equal(result.categories.find(c => c.name === 'Misc').unknownWeightCount, 2);
});

test('categories account for quantities and weight classes', () => {
  const result = analyzePack([
    item('a', { quantity: 2, gear: gear('A', 'Clothing', 100) }),
    item('b', { isWorn: true, gear: gear('B', 'Clothing', 500) }),
    item('c', { isConsumable: true, gear: gear('C', 'Water', 200) }),
  ]);
  const clothing = result.categories.find(c => c.name === 'Clothing');
  assert.equal(clothing.baseGrams, 200);
  assert.equal(clothing.wornGrams, 500);
  assert.equal(clothing.count, 3);
  assert.equal(result.categories[0].name, 'Clothing');
});

test('simulation does not mutate the input or subtract missing weights', () => {
  const result = analyzePack([
    item('a', { gear: gear('A', 'Packs', 1000, 300) }),
    item('b', { quantity: 2, isConsumable: true, weightSnapshot: 250, priceSnapshot: 10 }),
    item('c', { isWorn: true, weightSnapshot: 400 }),
    item('d', {}),
  ]);
  const excluded = new Set(['a', 'b', 'c', 'd']);
  const scenario = simulateExclusions(result, excluded);
  assert.equal(scenario.knownSavedCarried, 1500);
  assert.equal(scenario.knownSavedTotal, 1900);
  assert.equal(scenario.knownSavedCost, 320);
  assert.equal(scenario.missingWeightCount, 1);
  assert.equal(scenario.remainingCarried, 0);
  assert.equal(result.carriedGrams, 1500);
  assert.equal(result.lines.length, 4);
});

test('long item lists and mixed custom gear remain deterministic', () => {
  const items = Array.from({ length: 20 }, (_, i) => item(`id-${i}`, { customCategory: i % 2 ? 'Custom' : null, weightSnapshot: i * 100, gearNameSnapshot: `Gear ${i}` }));
  const result = analyzePack(items);
  assert.equal(result.heaviest.length, 5);
  assert.equal(result.heaviest[0].name, 'Gear 19');
  assert.equal(result.totalGrams, 19000);
});


test('removing worn gear changes total weight but not carried weight', () => {
  const result = analyzePack([
    item('base', { gear: gear('Pack', 'Packs', 800) }),
    item('worn', { isWorn: true, gear: gear('Boots', 'Clothing', 1200) }),
  ]);
  const simulation = simulateExclusions(result, new Set(['worn']));
  assert.equal(simulation.knownSavedCarried, 0);
  assert.equal(simulation.knownSavedTotal, 1200);
  assert.equal(simulation.remainingCarried, 800);
  assert.equal(simulation.remainingTotal, 800);
});

test('catalog zero is known zero, snapshot fallback works when catalog null', () => {
  const result = analyzePack([
    item('zero', { gear: gear('Zero', 'Misc', 0, 0), weightSnapshot: 900, priceSnapshot: 500 }),
    item('fallback', { gear: gear('Fallback', 'Misc', null, null), weightSnapshot: 300, priceSnapshot: 45 }),
  ]);
  assert.equal(result.totalGrams, 300);
  assert.equal(result.knownCostCad, 45);
  assert.equal(result.unknownWeightUnits, 0);
});

```

### `tests/pack-intelligence.test.mjs`

```typescript
import {test} from 'node:test';
import assert from 'node:assert/strict';
import { evaluatePackIntelligence, parseEcccEvidence, projectConsumables } from '../lib/pack-intelligence.ts';
const build=(o={})=>({people:1,minTemperature:null,conditions:null,startDate:null,endDate:null,...o});
const item=(id,cat,weight=400,extras={})=>({id,quantity:1,isConsumable:false,isWorn:false,customCategory:cat,gearNameSnapshot:id,weightSnapshot:weight,priceSnapshot:null,gear:null,...extras});
const dates=[{date:new Date('2026-11-02'),minTemperature:null,conditions:null,waterCarryL:null,waterSource:null,distanceKm:null,elevationGainM:null,campsite:null}];
const byId=(result,id)=>result.findings.find(f=>f.id===id);
const overnightDays=[{...dates[0],campsite:'Planned campsite'}];

test('sleep temperature comparison reports review, not certain danger, when rating is warmer',()=>{
 const sleep=item('quilt','Sleep',500,{gear:{id:'q',name:'Quilt',weight_g:500,price_cad:null,capacity_l:null,frame_type:null,waterproof:null,temperature_rating:5,season:null,category:{name:'Sleep'},subcategory:{name:'Quilt',slug:'quilt'}}});
 const r=evaluatePackIntelligence(build({minTemperature:-4}),[sleep],overnightDays);
 assert.equal(byId(r,'gear-sleep-rating-review-quilt').level,'review');
 assert.match(byId(r,'gear-sleep-rating-review-quilt').detail,/rating type and full sleep system/i);
 assert.equal(r.coldest,-4);
});
test('an unknown sleep rating is unknown and never treated as unsafe or warm enough',()=>{
 const unrated=item('s','Sleep',400,{gear:{id:'s',name:'Unrated quilt',weight_g:400,price_cad:null,capacity_l:null,frame_type:null,waterproof:null,temperature_rating:null,season:null,category:{name:'Sleep'},subcategory:{name:'Quilt',slug:'quilt'}}});
 const r=evaluatePackIntelligence(build({minTemperature:-4}),[unrated],overnightDays);
 assert.equal(byId(r,'gear-sleep-rating-unknown').level,'unknown');
 assert.equal(r.findings.some(f=>f.id==='gear-sleep-rating-review-s'),false);
});
test('weather evidence is date-scoped; alerts and strong gusts are reported',()=>{
 const data={daily:[{date:'2026-11-02',low:-9,high:2,gust:75,pop:85,model:'HRDPS',samples:6},{date:'2026-11-03',low:-15,high:0,gust:5,pop:30,model:'RDPS',samples:4}],alerts:{status:'ok',items:[{title:'Wind warning'}]}};
 const point={name:'Camp',lat:50,lng:-122,elevationM:1800};
 const evidence=parseEcccEvidence(data,point,['2026-11-02']);
 assert.equal(evidence.days.length,1);assert.equal(evidence.days[0].low,-9);
 assert.equal(evidence.point.lat,50);assert.equal(evidence.days[0].pop,85);
 const shelter=item('tent','Shelter',900,{gear:{id:'tent',name:'Tent',weight_g:900,price_cad:null,capacity_l:null,frame_type:null,waterproof:false,temperature_rating:null,season:'3-season',category:{name:'Shelter'},subcategory:{name:'Tent',slug:'tent'}}});
 const r=evaluatePackIntelligence(build(),[shelter],dates,evidence);
 assert.equal(byId(r,'alerts-active').level,'critical');
 assert.ok(byId(r,'strong-gust'));
 // A forecast alone must not silently become a user-entered wet-weather condition.
 assert.equal(byId(r,'gear-shelter-wet-weather'),undefined);
 const wet=evaluatePackIntelligence(build({conditions:'rain'}),[shelter],dates,evidence);
 assert.equal(byId(wet,'gear-shelter-wet-weather').level,'review');
});
test('alerts unavailable is not an all-clear',()=>{
 const point={name:'Camp',lat:50,lng:-122,elevationM:null};
 const evidence=parseEcccEvidence({daily:[],alerts:{status:'unavailable',items:[]}},point,[]);
 const r=evaluatePackIntelligence(build(),[],dates,evidence);
 assert.equal(byId(r,'alerts-unavailable').level,'unknown');
});
test('missing categories require overnight context except packs',()=>{
 const day={...dates[0],campsite:null};
 const dayCamping={...day,campsite:'Alice'};
 const daytrip=evaluatePackIntelligence(build(),[],[day]);
 assert.equal(!!byId(daytrip,'gear-missing-shelter'),false);
 const camping=evaluatePackIntelligence(build(),[item('water','Water')],[dayCamping]);
 assert.equal(byId(camping,'gear-missing-shelter').level,'review');
});
test('unknown weight never counts as known zero',()=>{
 const r=evaluatePackIntelligence(build(),[item('unknown','Misc',null)],dates);
 assert.equal(r.pack.unknownWeightUnits,1);
 assert.equal(byId(r,'unknown-weight').level,'unknown');
});
test('solo duplicates trigger review prompts without recommending dangerous removals',()=>{
 const duplicateGear={id:'one',name:'Pack',category:{name:'Packs'},weight_g:1500,price_cad:100,capacity_l:50,frame_type:null,waterproof:null,temperature_rating:null,season:null};
 const r=evaluatePackIntelligence(build(),[item('a','Packs',1500,{quantity:2,gear:duplicateGear})],dates);
 assert.equal(byId(r,'duplicate-one').level,'opportunity');
 assert.match(byId(r,'duplicate-one').action,/Confirm/);
});
test('consumables scenario is bounded, never generates negative mass',()=>{
 const r=projectConsumables(1200,4,0.4);
 assert.deepEqual(r.map(d=>d.remainingGrams),[1200,720,240,0,0]);
 assert.equal(projectConsumables(100,300,1).length,31);
});
test('missing live forecast is visible on overnight trips',()=>{
 const r=evaluatePackIntelligence(build({startDate:new Date('2026-10-01'),endDate:new Date('2026-10-03')}),[],dates);
 assert.equal(byId(r,'forecast-not-loaded').level,'unknown');
});
test('does not hallucinate waterproofing or unsafe equipment from missing specifications',()=>{
 const r=evaluatePackIntelligence(build({conditions:'rain'}),[item('tent','Shelter')],dates);
 assert.equal(byId(r,'gear-shelter-waterproof-unknown').level,'unknown');
 assert.equal(!!byId(r,'gear-shelter-wet-weather'),false);
});

```

### `tests/trip-planner.test.cjs`

```typescript
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {stripTypeScriptTypes}=require('node:module');
function load(file,deps={}){let js=stripTypeScriptTypes(fs.readFileSync(path.join(__dirname,'..',file),'utf8'));const names=[...js.matchAll(/export (?:async )?function (\w+)|export const (\w+)/g)].map(m=>m[1]||m[2]);js=js.replace(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];/g,(_,n,s)=>`const {${n}}=require(${JSON.stringify(s)});`).replace(/export /g,'');return new Function('require',js+`\nreturn {${names.join(',')}};`)(s=>s in deps?deps[s]:require(s));}
const p=load('lib/trip-planner.ts'),trip=load('lib/trip.ts');
const form=o=>{const f=new FormData();Object.entries(o).forEach(([k,v])=>f.set(k,String(v)));return f;};
function harness(){const writes=[], old=[{date:new Date('2026-07-01')},{date:new Date('2026-07-02')}];const tx={build:{findUnique:async()=>({routeWaypoints:null}),update:async x=>writes.push(['build',x])},tripDay:{findMany:async()=>old,createMany:async x=>writes.push(['create',x]),deleteMany:async x=>writes.push(['delete',x]),update:async x=>writes.push(['day',x])}};const prisma={...tx,$transaction:async fn=>fn(tx)};const validation=load('lib/build-validation.ts',{'./trip-planner':p});const a=load('lib/trip-planner-actions.ts',{'@/lib/prisma':{prisma},'@/lib/build-access':{requireBuildAccess:async id=>{if(id!=='owned')throw Error('Build not found.');return {userId:'owner'};},requireTripDayAccess:async(id,day)=>{if(id!=='owned'||day!=='day')throw Error('Day not found.');return {accessUserId:'owner'};}},'next/cache':{revalidatePath:()=>{}},'@/lib/destinations':{getDestination:()=>null},'@/lib/trip':trip,'@/lib/trip-planner':p,'@/lib/build-history':{mutateBuildWithRevision:async(_id,_uid,_act,_summary,fn)=>fn(tx)},'@/lib/build-validation':validation,'@/lib/itinerary-links':{validatedRoute:value=>{if(value==null)return null;if(!Array.isArray(value)||value.some(p=>p.lat>90||p.lat< -90||p.lng>180||p.lng< -180)||new Set(value.map(p=>p.id)).size!==value.length)throw Error('Invalid waypoint');return value;}}});return {a,writes};}
test('rejects reversed, incomplete, impossible and excessive dates',()=>{for(const [s,e] of [['2026-07-02','2026-07-01'],['2026-07-01',''],['2026-02-30','2026-03-01'],['2026-01-01','2028-01-01']])assert.throws(()=>p.parseDates(s,e));assert.equal(trip.getDateRange(...Object.values(p.parseDates('2026-03-07','2026-03-09'))).length,3);});
test('totals preserve zero and indicate partial distance coverage',()=>{const days=[{startLocation:'A',endLocation:'B',distanceKm:0,elevationGainM:10},{startLocation:'B',endLocation:'C',distanceKm:12.4,elevationLossM:5},{notes:'weather only'}];assert.deepEqual(p.tripTotals(days),{distanceKm:12.4,gainM:10,lossM:5,minutes:0,measuredDays:2,plannedDays:2});});
test('invalid numeric values rejected',()=>{for(const v of ['NaN','Infinity','abc',-1])assert.throws(()=>p.nullableNumber(v,'distance',0,1000));assert.equal(p.nullableNumber('0','distance',0,1000),0);assert.throws(()=>p.nullableNumber('1.5','minutes',0,1440,true));});
test('date shortening requires explicit confirmation before writes',async()=>{const {a,writes}=harness();await assert.rejects(a.saveTripDetails(form({buildId:'owned',startDate:'2026-07-02',endDate:'2026-07-03'})),/confirmation/);assert.equal(writes.length,0);await a.saveTripDetails(form({buildId:'owned',startDate:'2026-07-02',endDate:'2026-07-03',confirmDateChange:'yes'}));assert.equal(writes.length,3);assert.equal(writes[2][1].where.date.notIn.length,2);});
test('invalid day and unowned route never write',async()=>{const {a,writes}=harness();await assert.rejects(a.saveTripDay(form({buildId:'owned',dayId:'day',distanceKm:'NaN'})),/distanceKm/);await assert.rejects(a.saveTripRoute(form({buildId:'other',waypoints:'[]'})),/Build not found/);assert.equal(writes.length,0);});
test('day writes preserve zeros, nullable fields and ownership scope',async()=>{const {a,writes}=harness();await a.saveTripDay(form({buildId:'owned',dayId:'day',distanceKm:0,minTemperature:0,startLocation:' A '}));assert.equal(writes[0][1].data.distanceKm,0);assert.equal(writes[0][1].data.minTemperature,0);assert.equal(writes[0][1].data.startLocation,'A');assert.equal(writes[0][1].where.build.userId,'owner');});
test('route validation rejects out of range coordinates and duplicate IDs',async()=>{const {a,writes}=harness(),point={id:'one',name:'Camp',kind:'camp',lat:49,lng:-123,elevationM:900};for(const points of [[{...point,lat:91}],[point,point]])await assert.rejects(a.saveTripRoute(form({buildId:'owned',waypoints:JSON.stringify(points)})),/waypoint/);assert.equal(writes.length,0);await a.saveTripRoute(form({buildId:'owned',waypoints:JSON.stringify([point])}));assert.deepEqual(writes[0][1].data.routeWaypoints,[point]);});
test('logistics are bounded and stored on owned build',async()=>{const {a,writes}=harness();await assert.rejects(a.saveTripLogistics(form({buildId:'owned',emergencyContact:'x'.repeat(5001)})),/too long/);await a.saveTripLogistics(form({buildId:'owned',parking:'Lot A'}));assert.equal(writes[0][1].data.tripLogistics.parking,'Lot A');assert.equal(writes[0][1].where.userId,'owner');});

```

### `tests/user-preferences.test.mjs`

```typescript
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_USER_PREFERENCES,
  preferencesFromRow,
  weightText,
  distanceText,
  temperatureText,
  windText,
} from "../lib/user-preferences.ts";

test("new users start metric and private", () => {
  assert.deepEqual(preferencesFromRow(null), DEFAULT_USER_PREFERENCES);
  assert.equal(preferencesFromRow({ defaultBuildPublic: true }).defaultBuildPublic, true);
  assert.equal(preferencesFromRow({ weightUnit: "invalid" }).weightUnit, "metric");
});

test("weight conversions change display without modifying raw grams", () => {
  assert.equal(weightText(1500), "1.50 kg");
  assert.equal(weightText(200), "200 g");
  assert.equal(weightText(453.59237, "imperial"), "1.00 lb");
  assert.equal(weightText(28.349523125, "imperial"), "1.0 oz");
});

test("distance and temperature conversions", () => {
  assert.equal(distanceText(10), "10.0 km");
  assert.equal(distanceText(1.609344, "imperial"), "1.0 mi");
  assert.equal(temperatureText(0, "f"), "32°F");
  assert.equal(temperatureText(0, "c"), "0°C");
  assert.equal(windText(100, "imperial"), "62 mph");
});

test("unknown measurements are not silently treated as zero", () => {
  assert.equal(weightText(null), "—");
  assert.equal(distanceText(undefined), "—");
  assert.equal(temperatureText(NaN), "—");
  assert.equal(windText(Infinity), "—");
});

```

### `tests/weather-client-cache.test.ts`

```typescript
import assert from "node:assert/strict";
import { test } from "node:test";
import { loadWaypointWeather } from "../lib/weather/client-cache";

test("identical weather requests share one fetch and reuse the result", async t => {
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls++;
    return Response.json({ generated: "2026-10-29T20:00:00Z", hourly: [] });
  });
  const url = "/api/weather?lat=49.1&lng=-122.7&view=summary";
  const [first, second] = await Promise.all([
    loadWaypointWeather(url),
    loadWaypointWeather(url),
  ]);
  assert.strictEqual(first, second);
  await loadWaypointWeather(url);
  assert.equal(calls, 1);
  await loadWaypointWeather(url, true);
  assert.equal(calls, 2);
});

```

### `tests/weather-ui.test.ts`

```typescript
import assert from "node:assert/strict";
import { test } from "node:test";
import { chooseTimes, modelPriority, summarizeModel, MODELS, type ModelHour, type Schedule } from "../lib/weather/model-forecast";
import { forecastHints, tripDayForecast, comparePlan } from "../lib/weather/presentation";
import type { WeatherResult } from "../lib/weather/service";
const now=Date.parse("2026-10-25T12:00:00Z");
const dates=[0,1,2,3,4,5].map(h=>new Date(now+h*3600000).toISOString());
const schedule=(model:(typeof MODELS)[number],times:string[]):Schedule=>({model,run:new Date(now).toISOString(),times});
test("HRDPS is chosen ahead of RDPS, GDPS at same valid time",()=>{
  const schedules=MODELS.map(m=>schedule(m,dates));
  assert.deepEqual(modelPriority(dates[2],schedules,now).map(s=>s.model.id),["HRDPS","RDPS","GDPS"]);
});
test("model times are real published samples; no fabricated hours",()=>{
  const times=chooseTimes([schedule(MODELS[0],[dates[0],dates[2],dates[5]])],"UTC","",now);
  assert.deepEqual(times,[dates[0],dates[2],dates[5]]);
});
test("waypoint model summary only computes sampled extrema",()=>{
  const hour=(time:string,temp:number):ModelHour=>({time,temperature:temp,wind:36,gust:null,pop:null,condition:"Model sample",model:"HRDPS",resolutionKm:2.5,run:new Date(now).toISOString(),sampled:true});
  const hs=[hour(dates[0],-2),hour(dates[2],8)];
  const [day]=summarizeModel(hs,"UTC");
  assert.equal(day.high,8);assert.equal(day.low,-2);assert.equal(day.pop,null);
  assert.equal(day.samples,2);assert.equal(day.sampledExtrema,true);
  const data={query:{zone:"UTC"},hourly:hs,daily:[day],forecastStale:false} as WeatherResult;
  const fc=tripDayForecast(data,"2026-10-25");
  assert.equal(fc?.low,-2);
  assert.ok(forecastHints(fc!).some(h=>h.includes("insulation")));
  assert.equal(comparePlan(fc!,{minTemperature:2,conditions:"dry"}).length,1);
  assert.equal(tripDayForecast({...data,forecastStale:true},"2026-10-25"),null);
  assert.equal(tripDayForecast(data,"2027-01-01"),null);
});

```

### `tests/weather.test.ts`

```typescript
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  catalog,
  nearest,
  parseCity,
  num,
  parseAlerts,
  contains,
  periodDate,
  dateKey,
  risk,
  modelTimes,
  modelValue,
  modelURL,
  safeURL,
} from "../lib/weather/core";
import { WeatherCache, limited } from "../lib/weather/cache";
import { validateQuery, getWeather, mountain } from "../lib/weather/service";
import { dayWeatherPoint } from "../lib/weather/locations";
import { GET } from "../app/api/weather/route";
const fixture = (name: string) =>
  readFileSync(
    fileURLToPath(new URL("./fixtures/weather/" + name, import.meta.url)),
    "utf8",
  );
const city = JSON.parse(fixture("city.json")).features[0];
const now = Date.parse("2026-10-25T18:00:00Z");
const square = {
  type: "Polygon",
  coordinates: [
    [
      [0, 0],
      [10, 0],
      [10, 10],
      [0, 10],
      [0, 0],
    ],
    [
      [4, 4],
      [6, 4],
      [6, 6],
      [4, 6],
      [4, 4],
    ],
  ],
};
test("verified bilingual ECCC payload preserves numeric zero, missing fields and full text", () => {
  const p = parseCity(city, "America/Vancouver");
  assert.equal(p.current.temperature, 11.1);
  assert.equal(p.current.condition, "");
  assert.equal(p.hourly[0].temperature, 11);
  assert.equal(p.hourly[0].pop, 30);
  assert.equal(p.daily[0].high, 12);
  assert.equal(p.daily[1].low, 8);
  assert.equal(p.daily[0].date, "2026-10-25");
  assert.equal(p.daily[2].date, "2026-10-26");
  assert.equal(num({ value: { en: 0 } }), 0);
  assert.equal(num(""), null);
  assert.equal(num(false), null);
  assert.equal(num({ value: { en: null } }), null);
  assert.equal(parseCity({}, "UTC").daily.length, 0);
});
test("calendar mapping crosses UTC midnight, DST, year and Newfoundland half hour", () => {
  assert.equal(
    periodDate("Tonight", "2026-10-26T01:00:00Z", "America/Vancouver"),
    "2026-10-25",
  );
  assert.equal(
    periodDate("Monday", "2026-10-26T01:00:00Z", "America/Vancouver"),
    "2026-10-26",
  );
  assert.equal(
    periodDate("Friday", "2026-12-31T17:00:00Z", "America/Toronto"),
    "2027-01-01",
  );
  assert.equal(
    dateKey("2026-11-01T08:30:00Z", "America/Vancouver"),
    "2026-11-01",
  );
  assert.equal(
    dateKey("2026-10-25T02:00:00Z", "America/St_Johns"),
    "2026-10-24",
  );
  assert.equal(periodDate("unexpected", "2026-10-25T00:00:00Z", "UTC"), null);
});
test("point-in-polygon handles holes, boundaries and MultiPolygon", () => {
  assert.equal(contains(square, 2, 2), true);
  assert.equal(contains(square, 5, 5), false);
  assert.equal(contains(square, 2, 0), true);
  assert.equal(contains(square, 12, 2), false);
  assert.equal(
    contains({ type: "MultiPolygon", coordinates: [square.coordinates] }, 2, 2),
    true,
  );
});
test("alerts exclude ended, expired, future and bbox-only matches; preserve official text", () => {
  const original = JSON.parse(fixture("alerts.json")).features[0];
  const f = {
    ...original,
    geometry: square,
    properties: { ...original.properties, status_en: "issued" },
  };
  assert.equal(
    parseAlerts({ features: [f] }, 2, 2, now)[0].text,
    f.properties.alert_text_en,
  );
  assert.equal(parseAlerts({ features: [f, f] }, 2, 2, now).length, 1);
  for (const p of [
    { status_en: "ended" },
    { expiration_datetime: "2026-10-25T17:00:00Z" },
    { publication_datetime: "2026-10-26T17:00:00Z" },
  ])
    assert.equal(
      parseAlerts(
        { features: [{ ...f, properties: { ...f.properties, ...p } }] },
        2,
        2,
        now,
      ).length,
      0,
    );
  assert.equal(parseAlerts({ features: [f] }, 5, 5, now).length, 0);
});
test("national location catalogue chooses nearest point and rejects empty catalogue", () => {
  const sites = catalog({
    features: [
      city,
      {
        id: "ab-1",
        geometry: { type: "Point", coordinates: [-115, 51] },
        properties: { identifier: "ab-1" },
      },
    ],
  });
  assert.equal(nearest(sites, 49.3, -123.2).id, "bc-99");
  assert.throws(() => nearest([], 49, -123));
});
test("Canadian coverage includes provinces and territories and rejects foreign / invalid input", () => {
  for (const [lat, lng] of [
    [49.28, -123.12],
    [51.425, -116.18],
    [43.65, -79.38],
    [45.5, -73.57],
    [47.56, -52.71],
    [60.72, -135.06],
    [62.45, -114.38],
    [63.75, -68.52],
    [82.5, -62.35],
  ])
    assert.ok(
      validateQuery(new URLSearchParams({ lat: String(lat), lng: String(lng) }))
        .zone,
    );
  for (const params of [
    "lat=&lng=-123",
    "lat=NaN&lng=-123",
    "lat=47.6&lng=-122.3",
    "lat=64.8&lng=-147.7",
    "lat=49&lng=Infinity",
    "lat=49.28&lng=-123.12&date=2026-02-30",
  ])
    assert.throws(() => validateQuery(new URLSearchParams(params)));
});
test("risk reports unknown rather than safe for missing data; identifies high winds and cold", () => {
  assert.equal(risk([], [], [], true).level, "Unknown");
  assert.equal(
    risk(
      [],
      [
        {
          time: "x",
          temperature: -12,
          wind: 70,
          gust: null,
          pop: null,
          condition: "Snow",
        },
      ],
      [],
      false,
    ).level,
    "High",
  );
  assert.equal(
    risk(
      [],
      [
        {
          time: "x",
          temperature: 15,
          wind: 5,
          gust: null,
          pop: null,
          condition: "Clear",
        },
      ],
      [],
      false,
    ).level,
    "No flagged factors",
  );
});
test("cache coalesces, expires, bounds entries and limits stale fallback; alerts can forbid stale", async () => {
  let clock = 0,
    calls = 0;
  const cache = new WeatherCache(2, () => clock);
  const load = async () => {
    calls++;
    return 7;
  };
  await Promise.all([cache.get("a", 10, 5, load), cache.get("a", 10, 5, load)]);
  assert.equal(calls, 1);
  clock = 11;
  assert.equal(
    (
      await cache.get("a", 10, 5, async () => {
        throw Error("offline");
      })
    ).stale,
    true,
  );
  clock = 16;
  await assert.rejects(
    cache.get("a", 10, 5, async () => {
      throw Error("offline");
    }),
  );
  await cache.get("b", 10, 0, load);
  await cache.get("c", 10, 0, load);
  clock = 17;
  await cache.get("a", 10, 0, load);
  assert.equal(calls, 4);
  clock = 28;
  await assert.rejects(
    cache.get("a", 10, 0, async () => {
      throw Error("offline");
    }),
  );
});
test("outbound concurrency stays bounded", async () => {
  let active = 0,
    peak = 0;
  await Promise.all(
    Array.from({ length: 20 }, () =>
      limited(async () => {
        active++;
        peak = Math.max(active, peak);
        await new Promise((r) => setTimeout(r, 2));
        active--;
      }),
    ),
  );
  assert.ok(peak <= 6);
});
test("model schedule supports interval and discrete times; sampled values match units and run", () => {
  const s = modelTimes('<Dimension name="time">2026-10-25T12:00:00Z/2026-10-27T12:00:00Z/PT1H</Dimension><Dimension name="reference_time" default="2026-10-25T12:00:00Z">2026-10-25T12:00:00Z</Dimension>');
  assert.ok(s.times.length > 24);
  assert.equal(s.run, "2026-10-25T12:00:00.000Z");
  assert.equal(modelValue(JSON.parse(fixture("model.json"))).value, -6.3080812);
  assert.equal(
    modelTimes(
      '<Dimension name="time">2026-10-25T12:00:00Z,2026-10-25T15:00:00Z</Dimension><Dimension name="reference_time" default="2026-10-25T12:00:00Z"/>',
    ).times.length,
    2,
  );
  assert.equal(
    modelValue({ features: [{ properties: { value: -9999 } }] }).value,
    null,
  );
  const u = new URL(
    modelURL("RDPS_10km_AirTemp_2m", 51, -116, s.times[0], s.run),
  );
  assert.equal(u.searchParams.get("BBOX"), "50.99,-116.01,51.01,-115.99");
  assert.equal(
    u.searchParams.get("DIM_REFERENCE_TIME"),
    s.run.replace(".000Z", "Z"),
  );
  assert.equal(safeURL("javascript:alert(1)"), "https://weather.gc.ca/");
});
test("day matching is exact and unambiguous; elevation gain is never used as altitude", () => {
  const points = [
    { id: "a", name: "Camp", lat: 51, lng: -116, elevationM: 2200 },
  ];
  assert.equal(
    dayWeatherPoint(
      { campsite: " camp ", startLocation: null, endLocation: null },
      points,
    ),
    "a",
  );
  assert.equal(
    dayWeatherPoint(
      { campsite: "Camp", startLocation: null, endLocation: null },
      [...points, { ...points[0], id: "b" }],
    ),
    undefined,
  );
  assert.equal(
    dayWeatherPoint(
      { campsite: "Unknown", startLocation: null, endLocation: null },
      points,
    ),
    undefined,
  );
});
test("API rejects invalid input without network access", async (t) => {
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls++;
    throw Error("Should not fetch");
  });
  const r = await GET(
    new Request("http://localhost/api/weather?lat=47.6&lng=-122.3"),
  );
  assert.equal(r.status, 400);
  assert.equal(calls, 0);
  assert.equal(r.headers.get("Cache-Control"), "no-store");
});
test("model-only service never fetches a city forecast, marks alert failure unknown", async t => {
  t.mock.method(Date, "now", () => now);
  const fetched: string[] = [];
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    const u = new URL(String(input)); fetched.push(u.href);
    if (u.href.includes("weather-alerts")) throw Error("offline");
    if (u.searchParams.get("REQUEST") === "GetCapabilities") {
      return new Response(`<WMS_Capabilities><Dimension name="time">2026-10-25T18:00:00Z/2026-10-26T00:00:00Z/PT1H</Dimension><Dimension name="reference_time" default="2026-10-25T12:00:00Z">2026-10-25T12:00:00Z</Dimension></WMS_Capabilities>`);
    }
    const layer=u.searchParams.get("LAYERS") || "";
    return Response.json({features:[{properties:{value:layer.includes("Wind")||layer.includes("WSPD")?10:layer.includes("WGE")?15:6,
      time:u.searchParams.get("TIME"),dim_reference_time:u.searchParams.get("DIM_REFERENCE_TIME")}}]});
  });
  const result=await getWeather(validateQuery(new URLSearchParams("lat=49.28&lng=-123.12")));
  assert.equal(result.alerts.status,"unavailable");
  assert.ok(result.hourly.length);
  assert.equal(result.hourly[0].model,"HRDPS");
  assert.equal(result.hourly[0].temperature,6);
  assert.equal(result.hourly[0].wind,36);
  assert.ok(result.assessment.reasons.some(r=>r.includes("incomplete")));
  assert.equal(result.hourly[0].pop,6);
  assert.ok(!fetched.some(x=>x.includes("citypageweather")));
});
test("model sample uses matching valid time and model run", async t => {
  t.mock.method(Date, "now", () => now);
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    const u=new URL(String(input));
    if (u.searchParams.get("REQUEST")==="GetCapabilities") return new Response(`<WMS_Capabilities><Dimension name="time">2026-10-25T18:00:00Z/2026-10-26T18:00:00Z/PT1H</Dimension><Dimension name="reference_time" default="2026-10-25T12:00:00Z">2026-10-25T12:00:00Z</Dimension></WMS_Capabilities>`);
    return Response.json({features:[{properties:{value:10,time:u.searchParams.get("TIME"),dim_reference_time:u.searchParams.get("DIM_REFERENCE_TIME")}}]});
  });
  const result=await mountain(51.425,-116.18,"2026-10-25","America/Edmonton",now);
  assert.equal(result.status,"ok");
  if (result.status==="ok") { assert.equal(result.temperature,10); assert.equal(result.model,"HRDPS"); }
  assert.equal((await mountain(51.425,-116.18,"2027-01-01","America/Edmonton",now)).status,"outside-range");
});
test("distinct trailhead and campsite coordinates are sampled independently", async t => {
  t.mock.method(Date,"now",()=>now);
  t.mock.method(globalThis,"fetch",async(input:RequestInfo|URL)=>{
    const u=new URL(String(input));
    if(u.href.includes("weather-alerts")) return Response.json({features:[]});
    if(u.searchParams.get("REQUEST")==="GetCapabilities")
      return new Response(`<WMS_Capabilities><Dimension name="time">2026-10-25T18:00:00Z/2026-10-25T19:00:00Z/PT1H</Dimension><Dimension name="reference_time" default="2026-10-25T12:00:00Z">2026-10-25T12:00:00Z</Dimension></WMS_Capabilities>`);
    const lat=Number((u.searchParams.get("BBOX")||"0").split(",")[0]);
    return Response.json({features:[{properties:{value:Math.round((lat-50)*100),time:u.searchParams.get("TIME"),dim_reference_time:u.searchParams.get("DIM_REFERENCE_TIME")}}]});
  });
  const a=await getWeather({lat:50.1,lng:-122.95,date:"",zone:"America/Vancouver"});
  const b=await getWeather({lat:50.06,lng:-122.85,date:"",zone:"America/Vancouver"});
  assert.ok(a.hourly.length&&b.hourly.length);
  assert.notEqual(a.hourly[0].temperature,b.hourly[0].temperature);
  assert.equal(a.hourly[0].model,"HRDPS");
});


```

### `tools/generate-docs.ts`

````typescript
import {
  existsSync,
  lstatSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import process from 'node:process';

interface Config {
  output: string;
  includeExtensions: string[];
  ignoreDirs: string[];
  ignoreFiles: string[];
  maxFileBytes: number;
  includeLockfiles: boolean;
  includeHiddenFiles: boolean;
}

interface FileEntry {
  absPath: string;
  relPath: string;
  ext: string;
  bytes: number;
  lines: number;
  text?: string;
  skippedReason?: string;
}

interface ImportLink {
  from: string;
  raw: string;
  resolved: string | null;
}

const DEFAULT_CONFIG: Config = {
  output: 'PROJECT_CONTEXT.md',
  includeExtensions: [
    '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs',
    '.json', '.jsonc', '.md', '.mdx', '.css', '.scss', '.html',
    '.yaml', '.yml', '.toml', '.ini', '.txt', '.env.example', '.gitignore', '.npmrc',
  ],
  ignoreDirs: [
    '.git', 'node_modules', 'dist', 'build', 'coverage',
    '.cache', '.next', '.turbo', '.vite', 'out', 'target',
  ],
  ignoreFiles: ['PROJECT_CONTEXT.md', 'PROJECT_STRUCTURE.md'],
  maxFileBytes: 300_000,
  includeLockfiles: true,
  includeHiddenFiles: true,
};

const LOCKFILES = new Set([
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
  'bun.lock',
  'bun.lockb',
]);

const TEXT_FILE_OVERRIDES = new Set(['.env.example', '.gitignore', '.npmrc']);

function parseArgs(argv: string[]): { root: string; output?: string; configPath?: string; includeTests: boolean; noSource: boolean } {
  const args = [...argv];
  let root = process.cwd();
  let output: string | undefined;
  let configPath: string | undefined;
  let includeTests = false;
  let noSource = false;

  while (args.length) {
    const arg = args.shift()!;
    if (arg === '--root') root = path.resolve(args.shift() ?? '.');
    else if (arg === '--output') output = args.shift();
    else if (arg === '--config') configPath = path.resolve(args.shift() ?? 'docs.config.json');
    else if (arg === '--include-tests') includeTests = true;
    else if (arg === '--no-source') noSource = true;
    else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return { root, output, configPath, includeTests, noSource };
}

function printHelp(): void {
  console.log(`
Project Context Generator

Usage:
  npm run docs -- [options]

Options:
  --root <dir>          Project root to scan. Default: current directory.
  --output <file>       Output Markdown file. Default: configured output.
  --config <file>       Config JSON file. Default: docs.config.json when present.
  --include-tests       Include common test/spec files even when ignored by a custom rule.
  --no-source            Generate structure/metadata without source code contents.
  --help, -h            Show this help.
`);
}

function loadConfig(root: string, configPath?: string): Config {
  const candidate = configPath ?? path.join(root, 'docs.config.json');
  if (!existsSync(candidate)) return { ...DEFAULT_CONFIG };

  const raw = JSON.parse(readFileSync(candidate, 'utf8')) as Partial<Config>;
  return {
    output: raw.output ?? DEFAULT_CONFIG.output,
    includeExtensions: raw.includeExtensions ?? DEFAULT_CONFIG.includeExtensions,
    ignoreDirs: raw.ignoreDirs ?? DEFAULT_CONFIG.ignoreDirs,
    ignoreFiles: raw.ignoreFiles ?? DEFAULT_CONFIG.ignoreFiles,
    maxFileBytes: raw.maxFileBytes ?? DEFAULT_CONFIG.maxFileBytes,
    includeLockfiles: raw.includeLockfiles ?? DEFAULT_CONFIG.includeLockfiles,
    includeHiddenFiles: raw.includeHiddenFiles ?? DEFAULT_CONFIG.includeHiddenFiles,
  };
}

function isLikelyBinary(buffer: Buffer): boolean {
  const sample = buffer.subarray(0, Math.min(buffer.length, 8192));
  return sample.includes(0);
}

function shouldIncludeFile(fileName: string, config: Config, includeTests: boolean): boolean {
  if (config.ignoreFiles.includes(fileName)) return false;
  if (!config.includeHiddenFiles && fileName.startsWith('.')) return false;
  if (LOCKFILES.has(fileName)) return config.includeLockfiles;
  if (includeTests && /\.(test|spec)\.[cm]?[jt]sx?$/.test(fileName)) return true;
  if (TEXT_FILE_OVERRIDES.has(fileName)) return true;
  return config.includeExtensions.includes(path.extname(fileName).toLowerCase());
}

function scanFiles(root: string, config: Config, includeTests: boolean): FileEntry[] {
  const results: FileEntry[] = [];

  function walk(dir: string): void {
    const entries = readdirSync(dir, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      const abs = path.join(dir, entry.name);
      const rel = path.relative(root, abs).split(path.sep).join('/');

      if (entry.isDirectory()) {
        if (config.ignoreDirs.includes(entry.name)) continue;
        walk(abs);
        continue;
      }

      if (!entry.isFile()) continue;
      if (!shouldIncludeFile(entry.name, config, includeTests)) continue;

      let stat;
      try {
        stat = statSync(abs);
      } catch {
        continue;
      }

      const entryInfo: FileEntry = {
        absPath: abs,
        relPath: rel,
        ext: path.extname(entry.name).toLowerCase(),
        bytes: stat.size,
        lines: 0,
      };

      if (stat.size > config.maxFileBytes) {
        entryInfo.skippedReason = `File exceeds maxFileBytes (${formatBytes(config.maxFileBytes)}).`;
        results.push(entryInfo);
        continue;
      }

      try {
        const buffer = readFileSync(abs);
        if (isLikelyBinary(buffer)) {
          entryInfo.skippedReason = 'Likely binary file.';
        } else {
          entryInfo.text = buffer.toString('utf8').replaceAll('\r\n', '\n');
          entryInfo.lines = entryInfo.text === '' ? 0 : entryInfo.text.split('\n').length;
        }
      } catch (error) {
        entryInfo.skippedReason = `Could not read file: ${error instanceof Error ? error.message : String(error)}`;
      }

      results.push(entryInfo);
    }
  }

  walk(root);
  return results;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}

function buildTree(files: FileEntry[]): string {
  interface TreeNode { children: Map<string, TreeNode>; file?: boolean }
  const root: TreeNode = { children: new Map() };

  for (const file of files) {
    const parts = file.relPath.split('/');
    let node = root;
    for (const part of parts) {
      if (!node.children.has(part)) node.children.set(part, { children: new Map() });
      node = node.children.get(part)!;
    }
    node.file = true;
  }

  const lines: string[] = [];
  function render(node: TreeNode, prefix: string): void {
    const names = [...node.children.keys()].sort((a, b) => {
      const aNode = node.children.get(a)!;
      const bNode = node.children.get(b)!;
      if (aNode.file !== bNode.file) return aNode.file ? 1 : -1;
      return a.localeCompare(b);
    });

    names.forEach((name, index) => {
      const child = node.children.get(name)!;
      const last = index === names.length - 1;
      lines.push(`${prefix}${last ? '└── ' : '├── '}${name}${child.file ? '' : '/'}`);
      if (child.children.size) render(child, `${prefix}${last ? '    ' : '│   '}`);
    });
  }

  render(root, '');
  return lines.join('\n');
}

function extractImportLinks(files: FileEntry[], root: string): ImportLink[] {
  const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);
  const fileSet = new Set(files.map(f => f.relPath));
  const links: ImportLink[] = [];

  const importRegex = /(?:import\s+(?:[^'";]+?\s+from\s+)?|export\s+(?:[^'";]+?\s+from\s+)?|require\s*\(|import\s*\()(['"])(.+?)\1/g;

  for (const file of files) {
    if (!sourceExtensions.has(file.ext) || !file.text) continue;

    for (const match of file.text.matchAll(importRegex)) {
      const raw = match[2];
      if (!raw.startsWith('.')) continue;

      const baseAbs = path.resolve(path.dirname(file.absPath), raw);
      const rawExt = path.extname(baseAbs).toLowerCase();
      const extensionlessAbs = ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx'].includes(rawExt)
        ? baseAbs.slice(0, -rawExt.length)
        : baseAbs;
      const candidates = [
        baseAbs,
        `${extensionlessAbs}.ts`, `${extensionlessAbs}.tsx`, `${extensionlessAbs}.js`, `${extensionlessAbs}.jsx`, `${extensionlessAbs}.mjs`, `${extensionlessAbs}.cjs`,
        path.join(extensionlessAbs, 'index.ts'), path.join(extensionlessAbs, 'index.tsx'),
        path.join(extensionlessAbs, 'index.js'), path.join(extensionlessAbs, 'index.jsx'),
      ];
      const resolved = candidates.map(candidate => path.relative(root, candidate).split(path.sep).join('/'))
        .find(candidate => fileSet.has(candidate)) ?? null;

      links.push({ from: file.relPath, raw, resolved });
    }
  }

  return links;
}

function findTodos(files: FileEntry[]): string[] {
  const items: string[] = [];
  for (const file of files) {
    if (!file.text) continue;
    const lines = file.text.split('\n');
    lines.forEach((line, index) => {
      const match = line.match(/\b(TODO|FIXME|HACK|XXX)\b[:\-]?\s*(.*)$/i);
      if (match) {
        items.push(`${file.relPath}:${index + 1} **${match[1].toUpperCase()}** ${match[2].trim()}`);
      }
    });
  }
  return items;
}

function chooseFence(text: string): string {
  const longest = Math.max(0, ...(text.match(/`+/g) ?? []).map(s => s.length));
  return '`'.repeat(Math.max(3, longest + 1));
}

function languageForFile(file: FileEntry): string {
  const byName: Record<string, string> = {
    '.md': 'markdown', '.mdx': 'mdx', '.json': 'json', '.jsonc': 'jsonc',
    '.css': 'css', '.scss': 'scss', '.html': 'html', '.yaml': 'yaml', '.yml': 'yaml',
    '.toml': 'toml', '.ini': 'ini', '.txt': 'text',
  };
  const name = path.basename(file.relPath);
  if (name === 'Dockerfile') return 'dockerfile';
  if (name === '.gitignore' || name === '.npmrc' || name === '.env.example') return 'text';
  if (byName[file.ext]) return byName[file.ext];
  if (['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'].includes(file.ext)) return 'typescript';
  return 'text';
}

function safeRelativeOutput(root: string, output: string): string {
  return path.isAbsolute(output) ? output : path.resolve(root, output);
}

function createMarkdown(root: string, files: FileEntry[], config: Config, options: { noSource: boolean }): string {
  const now = new Date().toISOString();
  const links = extractImportLinks(files, root);
  const todos = findTodos(files);
  const included = files.filter(f => f.text !== undefined);
  const skipped = files.filter(f => f.skippedReason);
  const totalBytes = files.reduce((sum, f) => sum + f.bytes, 0);
  const totalLines = included.reduce((sum, f) => sum + f.lines, 0);

  const internalLinks = links.filter(link => link.resolved);
  const unresolvedRelative = links.filter(link => !link.resolved);

  const packageJson = files.find(f => f.relPath === 'package.json' && f.text);
  let packageSummary = '';
  if (packageJson?.text) {
    try {
      const pkg = JSON.parse(packageJson.text) as Record<string, unknown>;
      const scripts = pkg.scripts && typeof pkg.scripts === 'object' ? Object.keys(pkg.scripts as object) : [];
      packageSummary = [
        `- Name: ${typeof pkg.name === 'string' ? pkg.name : 'unknown'}`,
        `- Version: ${typeof pkg.version === 'string' ? pkg.version : 'unknown'}`,
        `- Scripts: ${scripts.length ? scripts.join(', ') : 'none detected'}`,
        `- Package type: ${typeof pkg.type === 'string' ? pkg.type : 'not specified'}`,
      ].join('\n');
    } catch {
      packageSummary = '- package.json could not be parsed as standard JSON.';
    }
  }

  const sections: string[] = [];
  sections.push(`# PROJECT CONTEXT\n\n> Generated automatically. Treat source files as authoritative; summaries are derived metadata.\n\n- Generated: ${now}\n- Root: \`${path.basename(root)}\`\n- Files scanned: ${files.length}\n- Files included with readable text: ${included.length}\n- Total included source lines: ${totalLines.toLocaleString()}\n- Total scanned size: ${formatBytes(totalBytes)}\n- Max file size: ${formatBytes(config.maxFileBytes)}\n`);

  sections.push(`## PROJECT STRUCTURE\n\n\`\`\`text\n${buildTree(files)}\n\`\`\``);

  if (packageSummary) sections.push(`## PACKAGE SUMMARY\n\n${packageSummary}`);

  sections.push(`## INTERNAL IMPORTS / DEPENDENCIES\n\n${internalLinks.length
    ? internalLinks.map(link => `- \`${link.from}\` → \`${link.resolved}\` (import: \`${link.raw}\`)`).join('\n')
    : '_No relative internal imports were detected._'}`);

  if (unresolvedRelative.length) {
    sections.push(`## UNRESOLVED RELATIVE IMPORTS\n\n${unresolvedRelative.map(link => `- \`${link.from}\` → \`${link.raw}\``).join('\n')}`);
  }

  sections.push(`## TODO / FIXME / HACK\n\n${todos.length ? todos.map(item => `- ${item}`).join('\n') : '_None detected._'}`);

  if (skipped.length) {
    sections.push(`## SKIPPED FILES\n\n${skipped.map(file => `- \`${file.relPath}\` — ${file.skippedReason}`).join('\n')}`);
  }

  sections.push(`## FILE INDEX\n\n| File | Size | Lines | Status |\n|---|---:|---:|---|\n${files.map(file => `| \`${file.relPath}\` | ${formatBytes(file.bytes)} | ${file.lines || '—'} | ${file.skippedReason ? `Skipped: ${escapeTable(file.skippedReason)}` : 'Included'} |`).join('\n')}`);

  if (!options.noSource) {
    sections.push('## SOURCE FILES');
    for (const file of included) {
      const fence = chooseFence(file.text!);
      sections.push(`### \`${file.relPath}\`\n\n${fence}${languageForFile(file)}\n${file.text}\n${fence}`);
    }
  }

  sections.push(`## AI USAGE NOTES\n\n- Use the **source file sections** as the ground truth for implementation details.\n- The dependency section is heuristic and only resolves relative imports when the target file exists in the snapshot.\n- Generated/build/cache directories are excluded by default.\n- Files larger than the configured limit are listed but their contents are omitted.\n- Re-run the generator after changing the project to refresh this snapshot.`);

  return `${sections.join('\n\n')}\n`;
}

function escapeTable(value: string): string {
  return value.replaceAll('|', '\\|').replaceAll('\n', ' ');
}

function writeStructureFile(root: string, files: FileEntry[]): void {
  const output = path.join(root, 'PROJECT_STRUCTURE.md');
  const lines = [
    '# PROJECT STRUCTURE',
    '',
    '> Generated automatically by Project Context Generator.',
    '',
    '```text',
    buildTree(files),
    '```',
    '',
    '## Files',
    '',
    ...files.map(f => `- \`${f.relPath}\` (${formatBytes(f.bytes)}, ${f.lines || 'unknown'} lines)`),
    '',
  ];
  writeFileSync(output, lines.join('\n'), 'utf8');
}

function main(): void {
  const options = parseArgs(process.argv.slice(2));
  if (!existsSync(options.root) || !lstatSync(options.root).isDirectory()) {
    throw new Error(`Project root does not exist or is not a directory: ${options.root}`);
  }

  const config = loadConfig(options.root, options.configPath);
  const files = scanFiles(options.root, config, options.includeTests);
  const outputPath = safeRelativeOutput(options.root, options.output ?? config.output);
  const markdown = createMarkdown(options.root, files, config, { noSource: options.noSource });
  writeFileSync(outputPath, markdown, 'utf8');

  if (path.basename(outputPath) !== 'PROJECT_STRUCTURE.md') {
    writeStructureFile(options.root, files);
  }

  console.log(`Generated ${path.relative(process.cwd(), outputPath) || outputPath}`);
  console.log(`Scanned ${files.length} files; ${files.filter(f => f.text !== undefined).length} included with readable text.`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}


````

### `tools/weather-smoke.ts`

```typescript
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
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": [
        "./*"
      ]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": [
    "node_modules",
    ".trailpicker-backups",
    "**/.trailpicker-backups/**",
    "trailpicker-eccc-*",
    "**/trailpicker-eccc-*/**"
  ]
}

```

## AI USAGE NOTES

- Use the **source file sections** as the ground truth for implementation details.
- The dependency section is heuristic and only resolves relative imports when the target file exists in the snapshot.
- Generated/build/cache directories are excluded by default.
- Files larger than the configured limit are listed but their contents are omitted.
- Re-run the generator after changing the project to refresh this snapshot.
