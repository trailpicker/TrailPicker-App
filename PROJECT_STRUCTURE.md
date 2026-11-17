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
│   │   ├── trails/
│   │   │   ├── route/
│   │   │   │   └── route.ts
│   │   │   └── snap/
│   │   │       └── route.ts
│   │   ├── trip-resources/
│   │   │   └── route.ts
│   │   └── weather/
│   │       └── route.ts
│   ├── build/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   ├── actions.ts
│   │   └── page.tsx
│   ├── community/
│   │   └── page.tsx
│   ├── discover/
│   │   ├── community/
│   │   │   └── page.tsx
│   │   ├── destinations/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── find/
│   │   │   └── page.tsx
│   │   ├── packs/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── saved/
│   │   │   └── page.tsx
│   │   ├── search/
│   │   │   └── page.tsx
│   │   ├── trips/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── actions.ts
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── gear/
│   │   ├── [id]/
│   │   │   ├── [subcategory]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── compare/
│   │   │   ├── actions.ts
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
│   │   │   ├── PermitReservationManager.tsx
│   │   │   ├── PlannerFields.tsx
│   │   │   ├── ResizableElevationDock.tsx
│   │   │   ├── ResizableRouteLayout.tsx
│   │   │   ├── RouteAnalysisSection.tsx
│   │   │   ├── RouteElevationPanel.tsx
│   │   │   ├── RouteMapInner.tsx
│   │   │   ├── RouteProfileDock.tsx
│   │   │   ├── StopSelectPicker.tsx
│   │   │   ├── StopTimePicker.tsx
│   │   │   ├── TripEditForm.tsx
│   │   │   ├── TripLogistics.tsx
│   │   │   ├── TripPlanner.tsx
│   │   │   ├── TripPlanningWorkspace.tsx
│   │   │   ├── TripResourcesSection.tsx
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
│   │   ├── FoodConsumablesPlanner.tsx
│   │   ├── GearPicker.tsx
│   │   ├── ItemCategoryToggle.tsx
│   │   ├── PrivateBuildNotice.tsx
│   │   ├── PublicBuildView.tsx
│   │   ├── QuantityStepper.tsx
│   │   ├── RemoveGearButton.tsx
│   │   ├── ShareBar.tsx
│   │   ├── useIgnoredCompatibility.ts
│   │   ├── useIgnoredFindings.ts
│   │   ├── WaterPlanningSection.tsx
│   │   └── WeightSummary.tsx
│   ├── discover/
│   │   ├── AdventureFinder.tsx
│   │   ├── DestinationDetail.tsx
│   │   ├── DestinationDetailHero.tsx
│   │   ├── DestinationSaveButton.tsx
│   │   ├── DestinationTripForm.tsx
│   │   ├── DiscoverDestinationMapView.tsx
│   │   ├── DiscoverHeader.tsx
│   │   ├── DiscoverHome.tsx
│   │   ├── DiscoverLanding.tsx
│   │   ├── DiscoverLocationMap.tsx
│   │   ├── DiscoverLocationMapInner.tsx
│   │   ├── DiscoverResultsServer.tsx
│   │   ├── DiscoverSearchMap.tsx
│   │   ├── DiscoverSearchMapInner.tsx
│   │   ├── DiscoverSectionNav.tsx
│   │   ├── PackActions.tsx
│   │   ├── PackExplore.tsx
│   │   ├── PublicPackDetail.tsx
│   │   ├── PublicTripDetail.tsx
│   │   ├── RelatedDiscover.tsx
│   │   ├── SavedLibrary.tsx
│   │   ├── SceneryIcon.tsx
│   │   ├── ShareDestinationButton.tsx
│   │   ├── TripActions.tsx
│   │   └── TripExplore.tsx
│   ├── filters/
│   │   ├── BrandFilter.tsx
│   │   ├── FilterSection.tsx
│   │   ├── RangeFilter.tsx
│   │   └── SortHeader.tsx
│   ├── gear/
│   │   ├── ComparisonActions.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── GearCompareSelection.tsx
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
│   ├── destination-coordinate-sources.json
│   ├── destination-verified-metrics.json
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
│   ├── destination-detail.ts
│   ├── destinations.ts
│   ├── discover-finder.ts
│   ├── discover-navigation.ts
│   ├── discover-packs-query.ts
│   ├── discover-packs.ts
│   ├── discover-photos.ts
│   ├── discover-preview.ts
│   ├── discover-public-route.ts
│   ├── discover-related-query.ts
│   ├── discover-related.ts
│   ├── discover-saved.ts
│   ├── discover-search-map.ts
│   ├── discover-trip.ts
│   ├── discover-trips.ts
│   ├── discover.ts
│   ├── finding-dismissals.ts
│   ├── food-plan.ts
│   ├── gear-comparison.ts
│   ├── gear-display.ts
│   ├── gear-selection-actions.ts
│   ├── gpx-route.ts
│   ├── gpx-toolbar-events.ts
│   ├── guest-build-token.ts
│   ├── hiking-time.ts
│   ├── itinerary-links.ts
│   ├── itinerary-timing.ts
│   ├── ors-request-control.ts
│   ├── ors-request.ts
│   ├── overnight-handoffs.ts
│   ├── pack-analysis.ts
│   ├── pack-intelligence.ts
│   ├── prisma.ts
│   ├── profile.ts
│   ├── route-analysis-insights.ts
│   ├── route-analysis-scope.ts
│   ├── route-explorer.ts
│   ├── route-insertion.ts
│   ├── route-leg-style.ts
│   ├── route-marker-clustering.ts
│   ├── route-metrics.ts
│   ├── route-profile-visual.ts
│   ├── route-request-planner.ts
│   ├── route-shaping.ts
│   ├── route-timing-preferences.ts
│   ├── route-visible-fit.ts
│   ├── route-water-events.ts
│   ├── shared-overnight-stop.ts
│   ├── terrain-gradient-summary.ts
│   ├── tracked-build-actions.ts
│   ├── trail-routing-server.ts
│   ├── trail-routing.ts
│   ├── trip-arrangements.ts
│   ├── trip-export-actions.ts
│   ├── trip-export-events.ts
│   ├── trip-planner-actions.ts
│   ├── trip-planner.ts
│   ├── trip-resources-export.ts
│   ├── trip-resources.ts
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
│   ├── components/
│   │   └── builder/
│   │       └── TripPlanner/
│   │           └── WeatherPanel.tsx
│   ├── fixtures/
│   │   └── weather/
│   │       ├── alerts.json
│   │       ├── city.json
│   │       └── model.json
│   ├── tests/
│   │   └── day-forecast-compact.test.mjs
│   ├── add-stop-selector-v064.test.cjs
│   ├── bc-destination-data-integrity.test.mjs
│   ├── build-history-transaction.test.cjs
│   ├── build-validation.test.cjs
│   ├── builder-ownership.test.cjs
│   ├── campsites-water-retirement-v101.test.cjs
│   ├── compatibility.test.mjs
│   ├── consumables-model.test.mjs
│   ├── daily-itinerary-alignment.test.mjs
│   ├── daily-itinerary-layout.test.mjs
│   ├── date-range-position-v096.test.cjs
│   ├── day-forecast-bottom-location.test.mjs
│   ├── day-forecast-integrated-v062.test.cjs
│   ├── day-forecast-location-picker-v063.test.cjs
│   ├── discover-catalog-expansion.test.mjs
│   ├── discover-fixes.test.mjs
│   ├── discover-packs.test.mjs
│   ├── discover-part1.test.mjs
│   ├── discover-part2.test.mjs
│   ├── discover-phase1.test.mjs
│   ├── discover-phase2.test.mjs
│   ├── discover-phase3.test.mjs
│   ├── discover-preview.test.mjs
│   ├── discover-redesign.test.mjs
│   ├── discover-related.test.mjs
│   ├── discover-saved.test.mjs
│   ├── discover-search-map.test.mjs
│   ├── discover-trips.test.mjs
│   ├── discover.test.mjs
│   ├── export-import-toolbar-v088.test.cjs
│   ├── food-plan-integration.test.mjs
│   ├── food-plan.test.mjs
│   ├── gear-comparison.test.mjs
│   ├── gpx-route.test.mjs
│   ├── gpx-toolbar-v053.test.cjs
│   ├── hiking-time-compact-v052.test.cjs
│   ├── hiking-time-v4.test.mjs
│   ├── itinerary-schedule-anchors-v066.test.cjs
│   ├── itinerary-timing-v057.test.mjs
│   ├── itinerary-warning-polish-v065.test.cjs
│   ├── logistics-camp-creation-v095.test.cjs
│   ├── logistics-camp-flow-v097.test.cjs
│   ├── logistics-editor-v094.test.cjs
│   ├── logistics-permits-v091.test.cjs
│   ├── logistics-reservation-simplification-v098.test.cjs
│   ├── logistics-status-cleanup-v100.test.cjs
│   ├── ors-optimization-v081.test.cjs
│   ├── ors-request.test.mjs
│   ├── overnight-booking-migration-v092.test.cjs
│   ├── overnight-handoff-v092.test.cjs
│   ├── overnight-itinerary-ui-v093.test.cjs
│   ├── pack-analysis.test.mjs
│   ├── pack-intelligence.test.mjs
│   ├── route-analysis-and-unassigned-day-v068.test.cjs
│   ├── route-analysis-layout-v085.test.cjs
│   ├── route-analysis-open-layout-v056.test.cjs
│   ├── route-analysis-time-breakdown-v067.test.cjs
│   ├── route-analysis-ui-v4.test.mjs
│   ├── route-analysis-unified-filter-v084.test.cjs
│   ├── route-analysis-v2.test.mjs
│   ├── route-analysis-v3.test.mjs
│   ├── route-analysis-weather-v055.test.cjs
│   ├── route-analysis-workspace-v054.test.cjs
│   ├── route-analysis.test.mjs
│   ├── route-compare-days-v086.test.cjs
│   ├── route-day-visibility-overnight-v082.test.cjs
│   ├── route-desktop-compact-v070.test.cjs
│   ├── route-dynamic-advanced-v073.test.cjs
│   ├── route-dynamic-settings-v072.test.cjs
│   ├── route-edit-visibility-v080.test.cjs
│   ├── route-explorer-workspace-v4.test.cjs
│   ├── route-fit-visible-area-v079.test.cjs
│   ├── route-gpx-toolbar-v071.test.cjs
│   ├── route-gradient-profile-redesign-v077.test.cjs
│   ├── route-heading-hierarchy-v087.test.cjs
│   ├── route-hiking-autosave-v078.test.cjs
│   ├── route-hiking-heading-v075.test.cjs
│   ├── route-hiking-polish-v074.test.cjs
│   ├── route-insertion.test.mjs
│   ├── route-marker-clustering-v089.test.cjs
│   ├── route-marker-sizing-v090.test.cjs
│   ├── route-metrics.test.mjs
│   ├── route-polish-v069.test.cjs
│   ├── route-profile-visual-v4.test.mjs
│   ├── route-refresh-autosave-v083.test.cjs
│   ├── route-shaping.test.mjs
│   ├── route-time-spacing-v076.test.cjs
│   ├── route-two-column-v071.test.cjs
│   ├── route-workspace-v043.test.cjs
│   ├── route-workspace-v044.test.cjs
│   ├── route-workspace-v045.test.cjs
│   ├── route-workspace-v046.test.cjs
│   ├── route-workspace-v048.test.cjs
│   ├── route-workspace-v049.test.cjs
│   ├── route-workspace-v050.test.cjs
│   ├── stop-editor-polish-v060.test.cjs
│   ├── stop-selector-v059.test.cjs
│   ├── stop-time-picker-v058.test.cjs
│   ├── terrain-compact-v051.test.cjs
│   ├── terrain-gradient-v047.test.cjs
│   ├── trail-routing.test.mjs
│   ├── trip-document-sections-v088.test.mjs
│   ├── trip-planner.test.cjs
│   ├── trip-resources.test.mjs
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
- `app/api/trails/route/route.ts` (2.2 KB, 43 lines)
- `app/api/trails/snap/route.ts` (1.4 KB, 30 lines)
- `app/api/trip-resources/route.ts` (3.2 KB, 43 lines)
- `app/api/weather/route.ts` (1.2 KB, 36 lines)
- `app/build/[id]/page.tsx` (12.5 KB, 280 lines)
- `app/build/actions.ts` (20.7 KB, 469 lines)
- `app/build/page.tsx` (4.3 KB, 116 lines)
- `app/community/page.tsx` (207 B, 6 lines)
- `app/discover/actions.ts` (7.8 KB, 190 lines)
- `app/discover/community/page.tsx` (727 B, 15 lines)
- `app/discover/destinations/[id]/page.tsx` (1.8 KB, 49 lines)
- `app/discover/error.tsx` (1.3 KB, 15 lines)
- `app/discover/find/page.tsx` (920 B, 20 lines)
- `app/discover/loading.tsx` (538 B, 8 lines)
- `app/discover/packs/[id]/page.tsx` (3.2 KB, 52 lines)
- `app/discover/page.tsx` (710 B, 18 lines)
- `app/discover/saved/page.tsx` (514 B, 13 lines)
- `app/discover/search/page.tsx` (544 B, 14 lines)
- `app/discover/trips/[id]/page.tsx` (1.9 KB, 35 lines)
- `app/gear/[id]/[subcategory]/page.tsx` (461 B, 10 lines)
- `app/gear/[id]/page.tsx` (1.8 KB, 26 lines)
- `app/gear/compare/actions.ts` (2.5 KB, 50 lines)
- `app/gear/compare/page.tsx` (10.9 KB, 122 lines)
- `app/gear/page.tsx` (409 B, 10 lines)
- `app/gear/review-actions.ts` (2.5 KB, 53 lines)
- `app/globals.css` (2.5 KB, 104 lines)
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
- `components/build/DateRangePicker.tsx` (14.0 KB, 204 lines)
- `components/build/DestinationPicker.tsx` (11.7 KB, 419 lines)
- `components/build/LocationMap.tsx` (2.9 KB, 122 lines)
- `components/build/LocationPicker.tsx` (8.5 KB, 240 lines)
- `components/builder/AddCustomItemForm.tsx` (2.5 KB, 78 lines)
- `components/builder/AddGearButton.tsx` (875 B, 50 lines)
- `components/builder/AnalysisFindingCard.tsx` (3.2 KB, 30 lines)
- `components/builder/build-data-utils.ts` (3.3 KB, 103 lines)
- `components/builder/BuildDataTools.tsx` (49.0 KB, 961 lines)
- `components/builder/BuildHeader.tsx` (1.5 KB, 48 lines)
- `components/builder/BuildRow.tsx` (9.9 KB, 210 lines)
- `components/builder/BuildSaveStatus.tsx` (1.1 KB, 20 lines)
- `components/builder/BuildSettings.tsx` (5.8 KB, 118 lines)
- `components/builder/CompatibilityBar.tsx` (4.5 KB, 81 lines)
- `components/builder/CompatibilityDetails.tsx` (2.3 KB, 51 lines)
- `components/builder/ConsumablesTimeline.tsx` (19.7 KB, 454 lines)
- `components/builder/CostSummary.tsx` (839 B, 23 lines)
- `components/builder/FoodConsumablesPlanner.tsx` (20.8 KB, 199 lines)
- `components/builder/GearPicker.tsx` (13.0 KB, 258 lines)
- `components/builder/ItemCategoryToggle.tsx` (2.6 KB, 90 lines)
- `components/builder/PrivateBuildNotice.tsx` (1008 B, 17 lines)
- `components/builder/PublicBuildView.tsx` (5.9 KB, 190 lines)
- `components/builder/QuantityStepper.tsx` (2.4 KB, 88 lines)
- `components/builder/RemoveGearButton.tsx` (652 B, 36 lines)
- `components/builder/ShareBar.tsx` (3.2 KB, 87 lines)
- `components/builder/TripPlanner/DayStopsItinerary.tsx` (48.4 KB, 944 lines)
- `components/builder/TripPlanner/PermitReservationManager.tsx` (22.5 KB, 266 lines)
- `components/builder/TripPlanner/PlannerFields.tsx` (1.7 KB, 66 lines)
- `components/builder/TripPlanner/ResizableElevationDock.tsx` (4.4 KB, 113 lines)
- `components/builder/TripPlanner/ResizableRouteLayout.tsx` (5.4 KB, 130 lines)
- `components/builder/TripPlanner/RouteAnalysisSection.tsx` (4.7 KB, 82 lines)
- `components/builder/TripPlanner/RouteElevationPanel.tsx` (23.4 KB, 305 lines)
- `components/builder/TripPlanner/RouteMapInner.tsx` (22.6 KB, 442 lines)
- `components/builder/TripPlanner/RouteProfileDock.tsx` (15.6 KB, 220 lines)
- `components/builder/TripPlanner/StopSelectPicker.tsx` (7.7 KB, 167 lines)
- `components/builder/TripPlanner/StopTimePicker.tsx` (11.4 KB, 216 lines)
- `components/builder/TripPlanner/TripEditForm.tsx` (14.2 KB, 514 lines)
- `components/builder/TripPlanner/TripLogistics.tsx` (11.3 KB, 315 lines)
- `components/builder/TripPlanner/TripPlanner.tsx` (4.6 KB, 154 lines)
- `components/builder/TripPlanner/TripPlanningWorkspace.tsx` (1.6 KB, 58 lines)
- `components/builder/TripPlanner/TripResourcesSection.tsx` (20.9 KB, 227 lines)
- `components/builder/TripPlanner/TripRoute.tsx` (56.7 KB, 1320 lines)
- `components/builder/TripPlanner/TripSummaryCard.tsx` (6.0 KB, 187 lines)
- `components/builder/TripPlanner/WaypointIcon.tsx` (463 B, 8 lines)
- `components/builder/TripPlanner/WaypointSearch.tsx` (5.0 KB, 80 lines)
- `components/builder/TripPlanner/WeatherPanel.tsx` (36.3 KB, 685 lines)
- `components/builder/useIgnoredCompatibility.ts` (2.7 KB, 60 lines)
- `components/builder/useIgnoredFindings.ts` (2.4 KB, 51 lines)
- `components/builder/WaterPlanningSection.tsx` (7.1 KB, 106 lines)
- `components/builder/WeightSummary.tsx` (3.5 KB, 97 lines)
- `components/discover/AdventureFinder.tsx` (16.3 KB, 128 lines)
- `components/discover/DestinationDetail.tsx` (16.8 KB, 196 lines)
- `components/discover/DestinationDetailHero.tsx` (2.1 KB, 35 lines)
- `components/discover/DestinationSaveButton.tsx` (1.9 KB, 30 lines)
- `components/discover/DestinationTripForm.tsx` (6.3 KB, 79 lines)
- `components/discover/DiscoverDestinationMapView.tsx` (7.9 KB, 104 lines)
- `components/discover/DiscoverHeader.tsx` (2.3 KB, 24 lines)
- `components/discover/DiscoverHome.tsx` (12.3 KB, 179 lines)
- `components/discover/DiscoverLanding.tsx` (30.2 KB, 319 lines)
- `components/discover/DiscoverLocationMap.tsx` (637 B, 10 lines)
- `components/discover/DiscoverLocationMapInner.tsx` (4.1 KB, 59 lines)
- `components/discover/DiscoverResultsServer.tsx` (9.1 KB, 169 lines)
- `components/discover/DiscoverSearchMap.tsx` (742 B, 25 lines)
- `components/discover/DiscoverSearchMapInner.tsx` (6.7 KB, 131 lines)
- `components/discover/DiscoverSectionNav.tsx` (1021 B, 12 lines)
- `components/discover/PackActions.tsx` (1.3 KB, 19 lines)
- `components/discover/PackExplore.tsx` (10.9 KB, 59 lines)
- `components/discover/PublicPackDetail.tsx` (9.6 KB, 67 lines)
- `components/discover/PublicTripDetail.tsx` (10.5 KB, 71 lines)
- `components/discover/RelatedDiscover.tsx` (3.2 KB, 74 lines)
- `components/discover/SavedLibrary.tsx` (7.3 KB, 84 lines)
- `components/discover/SceneryIcon.tsx` (609 B, 18 lines)
- `components/discover/ShareDestinationButton.tsx` (846 B, 23 lines)
- `components/discover/TripActions.tsx` (1.5 KB, 28 lines)
- `components/discover/TripExplore.tsx` (11.5 KB, 87 lines)
- `components/filters/BrandFilter.tsx` (2.6 KB, 99 lines)
- `components/filters/FilterSection.tsx` (1.2 KB, 51 lines)
- `components/filters/RangeFilter.tsx` (2.1 KB, 109 lines)
- `components/filters/SortHeader.tsx` (1.5 KB, 77 lines)
- `components/gear/ComparisonActions.tsx` (3.1 KB, 53 lines)
- `components/gear/ComparisonTable.tsx` (3.5 KB, 39 lines)
- `components/gear/GearCompareSelection.tsx` (6.0 KB, 114 lines)
- `components/gear/GearLibraryActions.tsx` (2.3 KB, 25 lines)
- `components/gear/ProductBuildButton.tsx` (1.1 KB, 12 lines)
- `components/gear/ProductDetails.tsx` (10.5 KB, 63 lines)
- `components/gear/ProductGallery.tsx` (1.9 KB, 23 lines)
- `components/gear/ReviewEditor.tsx` (3.4 KB, 24 lines)
- `components/Navbar.tsx` (1.3 KB, 35 lines)
- `components/NavbarNavigation.tsx` (7.3 KB, 110 lines)
- `components/profile/BuildCard.tsx` (3.5 KB, 34 lines)
- `components/profile/DeleteBuildButton.tsx` (461 B, 19 lines)
- `components/profile/GearLibraryCard.tsx` (5.9 KB, 30 lines)
- `components/ProfileDropdown.tsx` (6.8 KB, 230 lines)
- `components/settings/DisplayPreferencesProvider.tsx` (581 B, 24 lines)
- `components/settings/SettingsClient.tsx` (17.6 KB, 312 lines)
- `data/destination-coordinate-sources.json` (47.1 KB, 1194 lines)
- `data/destination-verified-metrics.json` (54.8 KB, 1496 lines)
- `data/destinations.json` (157.6 KB, 4928 lines)
- `docs.config.json` (589 B, 20 lines)
- `eslint.config.mjs` (576 B, 20 lines)
- `lib/build-access.ts` (3.3 KB, 79 lines)
- `lib/build-history-actions.ts` (9.0 KB, 218 lines)
- `lib/build-history.ts` (11.6 KB, 303 lines)
- `lib/build-save-status.ts` (2.9 KB, 55 lines)
- `lib/build-settings-actions.ts` (991 B, 21 lines)
- `lib/build-validation.ts` (3.8 KB, 71 lines)
- `lib/build-visibility-actions.ts` (847 B, 18 lines)
- `lib/build-visibility.ts` (822 B, 21 lines)
- `lib/calculations.ts` (1.1 KB, 50 lines)
- `lib/compatibility.ts` (30.3 KB, 466 lines)
- `lib/consumables-model.ts` (1.3 KB, 38 lines)
- `lib/destination-detail.ts` (5.9 KB, 135 lines)
- `lib/destinations.ts` (1.6 KB, 65 lines)
- `lib/discover-finder.ts` (9.3 KB, 128 lines)
- `lib/discover-navigation.ts` (1.4 KB, 31 lines)
- `lib/discover-packs-query.ts` (4.0 KB, 63 lines)
- `lib/discover-packs.ts` (5.3 KB, 106 lines)
- `lib/discover-photos.ts` (4.0 KB, 91 lines)
- `lib/discover-preview.ts` (4.0 KB, 107 lines)
- `lib/discover-public-route.ts` (1.4 KB, 25 lines)
- `lib/discover-related-query.ts` (1.7 KB, 54 lines)
- `lib/discover-related.ts` (1.4 KB, 42 lines)
- `lib/discover-saved.ts` (2.6 KB, 54 lines)
- `lib/discover-search-map.ts` (1.2 KB, 30 lines)
- `lib/discover-trip.ts` (4.1 KB, 84 lines)
- `lib/discover-trips.ts` (4.0 KB, 82 lines)
- `lib/discover.ts` (7.6 KB, 124 lines)
- `lib/finding-dismissals.ts` (2.6 KB, 65 lines)
- `lib/food-plan.ts` (12.7 KB, 186 lines)
- `lib/gear-comparison.ts` (5.6 KB, 106 lines)
- `lib/gear-display.ts` (1.2 KB, 22 lines)
- `lib/gear-selection-actions.ts` (572 B, 16 lines)
- `lib/gpx-route.ts` (8.9 KB, 134 lines)
- `lib/gpx-toolbar-events.ts` (654 B, 18 lines)
- `lib/guest-build-token.ts` (1.6 KB, 37 lines)
- `lib/hiking-time.ts` (5.6 KB, 110 lines)
- `lib/itinerary-links.ts` (1.8 KB, 46 lines)
- `lib/itinerary-timing.ts` (11.5 KB, 219 lines)
- `lib/ors-request-control.ts` (3.8 KB, 103 lines)
- `lib/ors-request.ts` (1.3 KB, 41 lines)
- `lib/overnight-handoffs.ts` (3.8 KB, 72 lines)
- `lib/pack-analysis.ts` (5.8 KB, 160 lines)
- `lib/pack-intelligence.ts` (16.0 KB, 195 lines)
- `lib/prisma.ts` (471 B, 20 lines)
- `lib/profile.ts` (1.5 KB, 44 lines)
- `lib/route-analysis-insights.ts` (12.1 KB, 222 lines)
- `lib/route-analysis-scope.ts` (4.3 KB, 94 lines)
- `lib/route-explorer.ts` (4.6 KB, 115 lines)
- `lib/route-insertion.ts` (1.5 KB, 45 lines)
- `lib/route-leg-style.ts` (1.7 KB, 41 lines)
- `lib/route-marker-clustering.ts` (3.3 KB, 78 lines)
- `lib/route-metrics.ts` (12.0 KB, 257 lines)
- `lib/route-profile-visual.ts` (3.6 KB, 65 lines)
- `lib/route-request-planner.ts` (604 B, 12 lines)
- `lib/route-shaping.ts` (3.8 KB, 94 lines)
- `lib/route-timing-preferences.ts` (2.5 KB, 54 lines)
- `lib/route-visible-fit.ts` (1.3 KB, 28 lines)
- `lib/route-water-events.ts` (488 B, 7 lines)
- `lib/shared-overnight-stop.ts` (1.4 KB, 28 lines)
- `lib/terrain-gradient-summary.ts` (3.8 KB, 98 lines)
- `lib/tracked-build-actions.ts` (3.7 KB, 43 lines)
- `lib/trail-routing-server.ts` (5.0 KB, 108 lines)
- `lib/trail-routing.ts` (8.4 KB, 171 lines)
- `lib/trip-arrangements.ts` (4.2 KB, 72 lines)
- `lib/trip-export-actions.ts` (1.5 KB, 39 lines)
- `lib/trip-export-events.ts` (454 B, 12 lines)
- `lib/trip-planner-actions.ts` (24.1 KB, 366 lines)
- `lib/trip-planner.ts` (5.9 KB, 69 lines)
- `lib/trip-resources-export.ts` (10.3 KB, 121 lines)
- `lib/trip-resources.ts` (10.3 KB, 154 lines)
- `lib/trip.ts` (1.9 KB, 65 lines)
- `lib/use-build-autosave.ts` (6.3 KB, 125 lines)
- `lib/user-preferences.ts` (2.3 KB, 59 lines)
- `lib/waypoint-map.ts` (8.4 KB, 168 lines)
- `lib/weather/cache.ts` (1.9 KB, 63 lines)
- `lib/weather/canada.json` (1.5 MB, unknown lines)
- `lib/weather/client-cache.ts` (1.3 KB, 39 lines)
- `lib/weather/core.ts` (12.5 KB, 432 lines)
- `lib/weather/locations.ts` (1.3 KB, 51 lines)
- `lib/weather/model-forecast.ts` (6.1 KB, 115 lines)
- `lib/weather/presentation.ts` (2.4 KB, 37 lines)
- `lib/weather/service.ts` (10.1 KB, 152 lines)
- `lib/weather/tz-lookup.d.ts` (101 B, 4 lines)
- `next-env.d.ts` (296 B, 8 lines)
- `next.config.ts` (259 B, 15 lines)
- `package.json` (1.1 KB, 43 lines)
- `postcss.config.mjs` (94 B, 8 lines)
- `prisma/migrations/migration_lock.toml` (128 B, 4 lines)
- `prisma/schema.prisma` (8.0 KB, 397 lines)
- `prisma/seed-compatibility-specs.ts` (1.8 KB, 43 lines)
- `prisma/seed.ts` (21.7 KB, 313 lines)
- `prisma.config.ts` (283 B, 15 lines)
- `README.md` (1.4 KB, 37 lines)
- `tests/add-stop-selector-v064.test.cjs` (1.5 KB, 30 lines)
- `tests/bc-destination-data-integrity.test.mjs` (4.6 KB, 99 lines)
- `tests/build-history-transaction.test.cjs` (3.7 KB, 83 lines)
- `tests/build-validation.test.cjs` (2.4 KB, 39 lines)
- `tests/builder-ownership.test.cjs` (12.4 KB, 173 lines)
- `tests/campsites-water-retirement-v101.test.cjs` (5.9 KB, 118 lines)
- `tests/compatibility.test.mjs` (12.9 KB, 219 lines)
- `tests/components/builder/TripPlanner/WeatherPanel.tsx` (34.8 KB, 655 lines)
- `tests/consumables-model.test.mjs` (919 B, 22 lines)
- `tests/daily-itinerary-alignment.test.mjs` (2.7 KB, 51 lines)
- `tests/daily-itinerary-layout.test.mjs` (2.4 KB, 47 lines)
- `tests/date-range-position-v096.test.cjs` (3.8 KB, 93 lines)
- `tests/day-forecast-bottom-location.test.mjs` (2.4 KB, 51 lines)
- `tests/day-forecast-integrated-v062.test.cjs` (2.3 KB, 41 lines)
- `tests/day-forecast-location-picker-v063.test.cjs` (2.1 KB, 44 lines)
- `tests/discover-catalog-expansion.test.mjs` (4.5 KB, 91 lines)
- `tests/discover-fixes.test.mjs` (4.6 KB, 86 lines)
- `tests/discover-packs.test.mjs` (4.7 KB, 70 lines)
- `tests/discover-part1.test.mjs` (5.8 KB, 87 lines)
- `tests/discover-part2.test.mjs` (2.9 KB, 63 lines)
- `tests/discover-phase1.test.mjs` (3.9 KB, 47 lines)
- `tests/discover-phase2.test.mjs` (5.6 KB, 101 lines)
- `tests/discover-phase3.test.mjs` (8.4 KB, 161 lines)
- `tests/discover-preview.test.mjs` (1.5 KB, 35 lines)
- `tests/discover-redesign.test.mjs` (8.3 KB, 140 lines)
- `tests/discover-related.test.mjs` (4.8 KB, 89 lines)
- `tests/discover-saved.test.mjs` (4.1 KB, 65 lines)
- `tests/discover-search-map.test.mjs` (4.5 KB, 85 lines)
- `tests/discover-trips.test.mjs` (3.5 KB, 56 lines)
- `tests/discover.test.mjs` (3.8 KB, 65 lines)
- `tests/export-import-toolbar-v088.test.cjs` (2.5 KB, 49 lines)
- `tests/fixtures/weather/alerts.json` (3.9 KB, 1 lines)
- `tests/fixtures/weather/city.json` (34.8 KB, 1 lines)
- `tests/fixtures/weather/model.json` (649 B, 28 lines)
- `tests/food-plan-integration.test.mjs` (1.6 KB, 33 lines)
- `tests/food-plan.test.mjs` (4.4 KB, 84 lines)
- `tests/gear-comparison.test.mjs` (3.2 KB, 61 lines)
- `tests/gpx-route.test.mjs` (2.1 KB, 38 lines)
- `tests/gpx-toolbar-v053.test.cjs` (3.6 KB, 70 lines)
- `tests/hiking-time-compact-v052.test.cjs` (1.6 KB, 28 lines)
- `tests/hiking-time-v4.test.mjs` (3.9 KB, 71 lines)
- `tests/itinerary-schedule-anchors-v066.test.cjs` (5.0 KB, 112 lines)
- `tests/itinerary-timing-v057.test.mjs` (6.4 KB, 103 lines)
- `tests/itinerary-warning-polish-v065.test.cjs` (4.3 KB, 85 lines)
- `tests/logistics-camp-creation-v095.test.cjs` (5.1 KB, 78 lines)
- `tests/logistics-camp-flow-v097.test.cjs` (3.5 KB, 64 lines)
- `tests/logistics-editor-v094.test.cjs` (4.4 KB, 69 lines)
- `tests/logistics-permits-v091.test.cjs` (8.6 KB, 118 lines)
- `tests/logistics-reservation-simplification-v098.test.cjs` (2.5 KB, 40 lines)
- `tests/logistics-status-cleanup-v100.test.cjs` (4.1 KB, 65 lines)
- `tests/ors-optimization-v081.test.cjs` (6.5 KB, 128 lines)
- `tests/ors-request.test.mjs` (1.5 KB, 36 lines)
- `tests/overnight-booking-migration-v092.test.cjs` (3.4 KB, 50 lines)
- `tests/overnight-handoff-v092.test.cjs` (4.6 KB, 76 lines)
- `tests/overnight-itinerary-ui-v093.test.cjs` (4.1 KB, 64 lines)
- `tests/pack-analysis.test.mjs` (5.0 KB, 114 lines)
- `tests/pack-intelligence.test.mjs` (5.5 KB, 77 lines)
- `tests/route-analysis-and-unassigned-day-v068.test.cjs` (3.0 KB, 59 lines)
- `tests/route-analysis-layout-v085.test.cjs` (1.4 KB, 24 lines)
- `tests/route-analysis-open-layout-v056.test.cjs` (1.8 KB, 33 lines)
- `tests/route-analysis-time-breakdown-v067.test.cjs` (2.3 KB, 39 lines)
- `tests/route-analysis-ui-v4.test.mjs` (1.6 KB, 29 lines)
- `tests/route-analysis-unified-filter-v084.test.cjs` (6.2 KB, 115 lines)
- `tests/route-analysis-v2.test.mjs` (4.4 KB, 87 lines)
- `tests/route-analysis-v3.test.mjs` (6.0 KB, 111 lines)
- `tests/route-analysis-weather-v055.test.cjs` (1.9 KB, 32 lines)
- `tests/route-analysis-workspace-v054.test.cjs` (2.2 KB, 39 lines)
- `tests/route-analysis.test.mjs` (2.2 KB, 35 lines)
- `tests/route-compare-days-v086.test.cjs` (1.2 KB, 24 lines)
- `tests/route-day-visibility-overnight-v082.test.cjs` (6.9 KB, 112 lines)
- `tests/route-desktop-compact-v070.test.cjs` (3.5 KB, 62 lines)
- `tests/route-dynamic-advanced-v073.test.cjs` (2.9 KB, 48 lines)
- `tests/route-dynamic-settings-v072.test.cjs` (2.8 KB, 50 lines)
- `tests/route-edit-visibility-v080.test.cjs` (3.3 KB, 59 lines)
- `tests/route-explorer-workspace-v4.test.cjs` (3.6 KB, 79 lines)
- `tests/route-fit-visible-area-v079.test.cjs` (3.4 KB, 74 lines)
- `tests/route-gpx-toolbar-v071.test.cjs` (2.6 KB, 46 lines)
- `tests/route-gradient-profile-redesign-v077.test.cjs` (2.6 KB, 47 lines)
- `tests/route-heading-hierarchy-v087.test.cjs` (911 B, 16 lines)
- `tests/route-hiking-autosave-v078.test.cjs` (4.8 KB, 95 lines)
- `tests/route-hiking-heading-v075.test.cjs` (1.4 KB, 25 lines)
- `tests/route-hiking-polish-v074.test.cjs` (2.9 KB, 47 lines)
- `tests/route-insertion.test.mjs` (1.1 KB, 23 lines)
- `tests/route-marker-clustering-v089.test.cjs` (4.4 KB, 85 lines)
- `tests/route-marker-sizing-v090.test.cjs` (2.9 KB, 59 lines)
- `tests/route-metrics.test.mjs` (6.9 KB, 132 lines)
- `tests/route-polish-v069.test.cjs` (3.7 KB, 67 lines)
- `tests/route-profile-visual-v4.test.mjs` (2.6 KB, 47 lines)
- `tests/route-refresh-autosave-v083.test.cjs` (6.1 KB, 149 lines)
- `tests/route-shaping.test.mjs` (3.3 KB, 69 lines)
- `tests/route-time-spacing-v076.test.cjs` (2.3 KB, 36 lines)
- `tests/route-two-column-v071.test.cjs` (3.6 KB, 65 lines)
- `tests/route-workspace-v043.test.cjs` (2.8 KB, 52 lines)
- `tests/route-workspace-v044.test.cjs` (3.7 KB, 68 lines)
- `tests/route-workspace-v045.test.cjs` (2.4 KB, 48 lines)
- `tests/route-workspace-v046.test.cjs` (3.3 KB, 64 lines)
- `tests/route-workspace-v048.test.cjs` (2.1 KB, 42 lines)
- `tests/route-workspace-v049.test.cjs` (2.1 KB, 43 lines)
- `tests/route-workspace-v050.test.cjs` (1.8 KB, 37 lines)
- `tests/stop-editor-polish-v060.test.cjs` (1.9 KB, 32 lines)
- `tests/stop-selector-v059.test.cjs` (3.1 KB, 56 lines)
- `tests/stop-time-picker-v058.test.cjs` (3.1 KB, 68 lines)
- `tests/terrain-compact-v051.test.cjs` (2.9 KB, 57 lines)
- `tests/terrain-gradient-v047.test.cjs` (3.9 KB, 79 lines)
- `tests/tests/day-forecast-compact.test.mjs` (2.9 KB, 55 lines)
- `tests/trail-routing.test.mjs` (2.4 KB, 47 lines)
- `tests/trip-document-sections-v088.test.mjs` (2.9 KB, 47 lines)
- `tests/trip-planner.test.cjs` (5.1 KB, 18 lines)
- `tests/trip-resources.test.mjs` (4.8 KB, 67 lines)
- `tests/user-preferences.test.mjs` (1.4 KB, 39 lines)
- `tests/weather-client-cache.test.ts` (734 B, 22 lines)
- `tests/weather-ui.test.ts` (2.0 KB, 31 lines)
- `tests/weather.test.ts` (12.5 KB, 374 lines)
- `tools/generate-docs.ts` (16.1 KB, 428 lines)
- `tools/weather-smoke.ts` (1.2 KB, 49 lines)
- `tsconfig.json` (834 B, 47 lines)
