# PROJECT STRUCTURE

> Generated automatically by Project Context Generator.

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

## Files

- `.github/workflows/ci.yml` (1001 B, 35 lines)
- `.gitignore` (503 B, 44 lines)
- `app/api/auth/[...nextauth]/route.ts` (74 B, 2 lines)
- `app/api/weather/route.ts` (1.2 KB, 36 lines)
- `app/build/[id]/page.tsx` (11.3 KB, 262 lines)
- `app/build/actions.ts` (19.0 KB, 441 lines)
- `app/build/page.tsx` (4.3 KB, 116 lines)
- `app/gear/[id]/[subcategory]/page.tsx` (461 B, 10 lines)
- `app/gear/[id]/page.tsx` (1.7 KB, 24 lines)
- `app/gear/page.tsx` (409 B, 10 lines)
- `app/gear/review-actions.ts` (2.5 KB, 53 lines)
- `app/globals.css` (1.8 KB, 89 lines)
- `app/layout.tsx` (1.5 KB, 53 lines)
- `app/page.tsx` (2.1 KB, 120 lines)
- `app/profile/actions.ts` (2.8 KB, 61 lines)
- `app/profile/builds/page.tsx` (3.4 KB, 39 lines)
- `app/profile/edit/page.tsx` (2.8 KB, 25 lines)
- `app/profile/favorites/page.tsx` (3.3 KB, 39 lines)
- `app/profile/gear/actions.ts` (5.2 KB, 126 lines)
- `app/profile/gear/page.tsx` (5.7 KB, 74 lines)
- `app/profile/layout.tsx` (4.8 KB, 100 lines)
- `app/profile/page.tsx` (5.4 KB, 40 lines)
- `app/profile/reviews/page.tsx` (2.2 KB, 12 lines)
- `app/settings/actions.ts` (3.9 KB, 100 lines)
- `app/settings/export/route.ts` (1.6 KB, 49 lines)
- `app/settings/page.tsx` (1.4 KB, 43 lines)
- `auth.ts` (345 B, 10 lines)
- `components/build/CreateTripDetails.tsx` (10.6 KB, 332 lines)
- `components/build/DateRangePicker.tsx` (12.6 KB, 174 lines)
- `components/build/DestinationPicker.tsx` (11.9 KB, 410 lines)
- `components/build/LocationMap.tsx` (2.4 KB, 113 lines)
- `components/build/LocationPicker.tsx` (8.5 KB, 240 lines)
- `components/builder/AddCustomItemForm.tsx` (2.5 KB, 78 lines)
- `components/builder/AddGearButton.tsx` (875 B, 50 lines)
- `components/builder/AnalysisFindingCard.tsx` (3.2 KB, 30 lines)
- `components/builder/build-data-utils.ts` (3.3 KB, 103 lines)
- `components/builder/BuildDataTools.tsx` (25.1 KB, 532 lines)
- `components/builder/BuildHeader.tsx` (1.5 KB, 48 lines)
- `components/builder/BuildRow.tsx` (9.9 KB, 210 lines)
- `components/builder/BuildSaveStatus.tsx` (1.1 KB, 20 lines)
- `components/builder/BuildSettings.tsx` (5.8 KB, 118 lines)
- `components/builder/CompatibilityBar.tsx` (3.5 KB, 63 lines)
- `components/builder/CompatibilityDetails.tsx` (2.3 KB, 51 lines)
- `components/builder/ConsumablesTimeline.tsx` (18.1 KB, 421 lines)
- `components/builder/CostSummary.tsx` (839 B, 23 lines)
- `components/builder/GearPicker.tsx` (12.6 KB, 253 lines)
- `components/builder/ItemCategoryToggle.tsx` (2.6 KB, 90 lines)
- `components/builder/PrivateBuildNotice.tsx` (1008 B, 17 lines)
- `components/builder/PublicBuildView.tsx` (5.8 KB, 187 lines)
- `components/builder/QuantityStepper.tsx` (2.4 KB, 88 lines)
- `components/builder/RemoveGearButton.tsx` (652 B, 36 lines)
- `components/builder/ShareBar.tsx` (3.0 KB, 82 lines)
- `components/builder/TripPlanner/DayStopsItinerary.tsx` (32.5 KB, 703 lines)
- `components/builder/TripPlanner/PlannerFields.tsx` (1.7 KB, 66 lines)
- `components/builder/TripPlanner/ResizableRouteLayout.tsx` (5.4 KB, 130 lines)
- `components/builder/TripPlanner/RouteMapInner.tsx` (7.9 KB, 165 lines)
- `components/builder/TripPlanner/TripEditForm.tsx` (14.7 KB, 512 lines)
- `components/builder/TripPlanner/TripLogistics.tsx` (10.7 KB, 309 lines)
- `components/builder/TripPlanner/TripPlanner.tsx` (4.2 KB, 144 lines)
- `components/builder/TripPlanner/TripPlanningWorkspace.tsx` (1.4 KB, 52 lines)
- `components/builder/TripPlanner/TripRoute.tsx` (19.3 KB, 619 lines)
- `components/builder/TripPlanner/TripSummaryCard.tsx` (6.0 KB, 187 lines)
- `components/builder/TripPlanner/WaypointIcon.tsx` (463 B, 8 lines)
- `components/builder/TripPlanner/WaypointSearch.tsx` (5.0 KB, 80 lines)
- `components/builder/TripPlanner/WeatherPanel.tsx` (33.3 KB, 633 lines)
- `components/builder/useIgnoredCompatibility.ts` (2.7 KB, 60 lines)
- `components/builder/useIgnoredFindings.ts` (2.4 KB, 51 lines)
- `components/builder/WeightSummary.tsx` (2.6 KB, 86 lines)
- `components/filters/BrandFilter.tsx` (2.6 KB, 99 lines)
- `components/filters/FilterSection.tsx` (1.2 KB, 51 lines)
- `components/filters/RangeFilter.tsx` (2.1 KB, 109 lines)
- `components/filters/SortHeader.tsx` (1.5 KB, 77 lines)
- `components/gear/GearLibraryActions.tsx` (2.3 KB, 25 lines)
- `components/gear/ProductBuildButton.tsx` (1.1 KB, 12 lines)
- `components/gear/ProductDetails.tsx` (10.2 KB, 61 lines)
- `components/gear/ProductGallery.tsx` (1.9 KB, 23 lines)
- `components/gear/ReviewEditor.tsx` (3.4 KB, 24 lines)
- `components/Navbar.tsx` (1.3 KB, 35 lines)
- `components/NavbarNavigation.tsx` (7.3 KB, 108 lines)
- `components/profile/BuildCard.tsx` (3.5 KB, 34 lines)
- `components/profile/DeleteBuildButton.tsx` (461 B, 19 lines)
- `components/profile/GearLibraryCard.tsx` (5.9 KB, 30 lines)
- `components/ProfileDropdown.tsx` (6.8 KB, 230 lines)
- `components/settings/DisplayPreferencesProvider.tsx` (581 B, 24 lines)
- `components/settings/SettingsClient.tsx` (17.6 KB, 312 lines)
- `data/destinations.json` (57.9 KB, 1599 lines)
- `docs.config.json` (589 B, 20 lines)
- `eslint.config.mjs` (576 B, 20 lines)
- `lib/build-access.ts` (3.3 KB, 79 lines)
- `lib/build-history-actions.ts` (8.7 KB, 213 lines)
- `lib/build-history.ts` (11.6 KB, 303 lines)
- `lib/build-save-status.ts` (2.9 KB, 55 lines)
- `lib/build-settings-actions.ts` (991 B, 21 lines)
- `lib/build-validation.ts` (2.8 KB, 62 lines)
- `lib/build-visibility-actions.ts` (847 B, 18 lines)
- `lib/build-visibility.ts` (822 B, 21 lines)
- `lib/calculations.ts` (1.1 KB, 50 lines)
- `lib/compatibility.ts` (30.3 KB, 466 lines)
- `lib/consumables-model.ts` (1.3 KB, 38 lines)
- `lib/destinations.ts` (1.3 KB, 57 lines)
- `lib/finding-dismissals.ts` (2.6 KB, 65 lines)
- `lib/gear-display.ts` (1.2 KB, 22 lines)
- `lib/gear-selection-actions.ts` (572 B, 16 lines)
- `lib/guest-build-token.ts` (1.6 KB, 37 lines)
- `lib/itinerary-links.ts` (1.8 KB, 46 lines)
- `lib/pack-analysis.ts` (5.8 KB, 160 lines)
- `lib/pack-intelligence.ts` (15.1 KB, 181 lines)
- `lib/prisma.ts` (471 B, 20 lines)
- `lib/profile.ts` (1.5 KB, 44 lines)
- `lib/tracked-build-actions.ts` (2.9 KB, 32 lines)
- `lib/trip-planner-actions.ts` (7.1 KB, 101 lines)
- `lib/trip-planner.ts` (4.3 KB, 48 lines)
- `lib/trip.ts` (1.9 KB, 65 lines)
- `lib/use-build-autosave.ts` (5.0 KB, 98 lines)
- `lib/user-preferences.ts` (2.3 KB, 59 lines)
- `lib/waypoint-map.ts` (5.8 KB, 130 lines)
- `lib/weather/cache.ts` (1.9 KB, 63 lines)
- `lib/weather/canada.json` (1.5 MB, unknown lines)
- `lib/weather/client-cache.ts` (1.3 KB, 39 lines)
- `lib/weather/core.ts` (12.5 KB, 432 lines)
- `lib/weather/locations.ts` (1.2 KB, 46 lines)
- `lib/weather/model-forecast.ts` (6.1 KB, 115 lines)
- `lib/weather/presentation.ts` (2.4 KB, 37 lines)
- `lib/weather/service.ts` (10.1 KB, 152 lines)
- `lib/weather/tz-lookup.d.ts` (101 B, 4 lines)
- `next-env.d.ts` (296 B, 8 lines)
- `next.config.ts` (259 B, 15 lines)
- `package.json` (1.1 KB, 43 lines)
- `postcss.config.mjs` (94 B, 8 lines)
- `prisma/migrations/migration_lock.toml` (128 B, 4 lines)
- `prisma/schema.prisma` (7.1 KB, 364 lines)
- `prisma/seed-compatibility-specs.ts` (1.8 KB, 43 lines)
- `prisma/seed.ts` (21.7 KB, 313 lines)
- `prisma.config.ts` (283 B, 15 lines)
- `README.md` (1.4 KB, 37 lines)
- `tests/build-history-transaction.test.cjs` (3.7 KB, 83 lines)
- `tests/build-validation.test.cjs` (2.4 KB, 39 lines)
- `tests/builder-ownership.test.cjs` (12.4 KB, 173 lines)
- `tests/compatibility.test.mjs` (12.9 KB, 219 lines)
- `tests/consumables-model.test.mjs` (919 B, 22 lines)
- `tests/fixtures/weather/alerts.json` (3.9 KB, 1 lines)
- `tests/fixtures/weather/city.json` (34.8 KB, 1 lines)
- `tests/fixtures/weather/model.json` (649 B, 28 lines)
- `tests/pack-analysis.test.mjs` (5.0 KB, 114 lines)
- `tests/pack-intelligence.test.mjs` (5.5 KB, 77 lines)
- `tests/trip-planner.test.cjs` (5.1 KB, 18 lines)
- `tests/user-preferences.test.mjs` (1.4 KB, 39 lines)
- `tests/weather-client-cache.test.ts` (734 B, 22 lines)
- `tests/weather-ui.test.ts` (2.0 KB, 31 lines)
- `tests/weather.test.ts` (12.5 KB, 374 lines)
- `tools/generate-docs.ts` (16.1 KB, 428 lines)
- `tools/weather-smoke.ts` (1.2 KB, 49 lines)
- `tsconfig.json` (834 B, 47 lines)
