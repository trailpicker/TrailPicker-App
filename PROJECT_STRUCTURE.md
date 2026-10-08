# PROJECT STRUCTURE

> Generated automatically by Project Context Generator.

```text
├── .trailpicker-backups/
│   ├── import-export-history-2026-10-03T04-51-48-435Z/
│   │   ├── app/
│   │   │   ├── build/
│   │   │   │   └── actions.ts
│   │   │   └── profile/
│   │   │       ├── gear/
│   │   │       │   └── actions.ts
│   │   │       └── actions.ts
│   │   ├── components/
│   │   │   └── builder/
│   │   │       └── ShareBar.tsx
│   │   ├── lib/
│   │   │   ├── build-settings-actions.ts
│   │   │   ├── build-visibility-actions.ts
│   │   │   └── trip-planner-actions.ts
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── tests/
│   │       ├── builder-ownership.test.cjs
│   │       └── trip-planner.test.cjs
│   ├── import-export-history-2026-10-03T04-58-20-601Z/
│   │   ├── app/
│   │   │   ├── build/
│   │   │   │   └── actions.ts
│   │   │   └── profile/
│   │   │       ├── gear/
│   │   │       │   └── actions.ts
│   │   │       └── actions.ts
│   │   ├── components/
│   │   │   └── builder/
│   │   │       ├── BuildDataTools.tsx
│   │   │       └── ShareBar.tsx
│   │   ├── lib/
│   │   │   ├── build-history-actions.ts
│   │   │   ├── build-history.ts
│   │   │   ├── build-settings-actions.ts
│   │   │   ├── build-visibility-actions.ts
│   │   │   └── trip-planner-actions.ts
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── tests/
│   │       ├── builder-ownership.test.cjs
│   │       └── trip-planner.test.cjs
│   └── import-export-history-2026-10-03T05-05-59-627Z/
│       ├── app/
│       │   ├── build/
│       │   │   └── actions.ts
│       │   └── profile/
│       │       ├── gear/
│       │       │   └── actions.ts
│       │       └── actions.ts
│       ├── components/
│       │   └── builder/
│       │       ├── BuildDataTools.tsx
│       │       └── ShareBar.tsx
│       ├── lib/
│       │   ├── build-history-actions.ts
│       │   ├── build-history.ts
│       │   ├── build-settings-actions.ts
│       │   ├── build-visibility-actions.ts
│       │   └── trip-planner-actions.ts
│       ├── prisma/
│       │   └── schema.prisma
│       └── tests/
│           ├── builder-ownership.test.cjs
│           └── trip-planner.test.cjs
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── build/
│   │   ├── [id]/
│   │   │   ├── select/
│   │   │   │   └── [category]/
│   │   │   │       ├── [subcategory]/
│   │   │   │       │   └── page.tsx
│   │   │   │       └── page.tsx
│   │   │   └── page.tsx
│   │   ├── actions.ts
│   │   └── page.tsx
│   ├── gear/
│   │   ├── [id]/
│   │   │   ├── [subcategory]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx
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
│   │   ├── actions.ts
│   │   ├── layout.tsx
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
│   │   │   ├── MapPreviewInner.tsx
│   │   │   ├── PlannerFields.tsx
│   │   │   ├── RouteMapInner.tsx
│   │   │   ├── TripDayList.tsx
│   │   │   ├── TripDayRow.tsx
│   │   │   ├── TripEditForm.tsx
│   │   │   ├── TripLocationPreview.tsx
│   │   │   ├── TripLogistics.tsx
│   │   │   ├── TripPlanner.tsx
│   │   │   ├── TripRoute.tsx
│   │   │   ├── TripSummaryCard.tsx
│   │   │   ├── WaypointIcon.tsx
│   │   │   └── WaypointSearch.tsx
│   │   ├── AddCustomItemForm.tsx
│   │   ├── AddGearButton.tsx
│   │   ├── BuildDataTools.tsx
│   │   ├── BuildHeader.tsx
│   │   ├── BuildRow.tsx
│   │   ├── BuildSettings.tsx
│   │   ├── BuildVisibilityToggle.tsx
│   │   ├── CompatibilityBar.tsx
│   │   ├── CompatibilityDetails.tsx
│   │   ├── CostSummary.tsx
│   │   ├── GearPicker.tsx
│   │   ├── GearTab.tsx
│   │   ├── ItemCategoryToggle.tsx
│   │   ├── OriginalGearPicker.tsx
│   │   ├── PrivateBuildNotice.tsx
│   │   ├── PublicBuildView.tsx
│   │   ├── QuantityStepper.tsx
│   │   ├── RemoveGearButton.tsx
│   │   ├── ShareBar.tsx
│   │   └── WeightSummary.tsx
│   ├── filters/
│   │   ├── BrandFilter.tsx
│   │   ├── FilterSection.tsx
│   │   ├── RangeFilter.tsx
│   │   └── SortHeader.tsx
│   ├── gear/
│   │   └── GearAccountActions.tsx
│   ├── profile/
│   │   ├── BuildCard.tsx
│   │   ├── DeleteBuildButton.tsx
│   │   └── GearLibraryCard.tsx
│   ├── GearCard.tsx
│   ├── GearFilters.tsx
│   ├── GearSort.tsx
│   ├── Navbar.tsx
│   ├── NavbarNavigation.tsx
│   ├── ProfileDropdown.tsx
│   └── SearchBar.tsx
├── data/
│   └── destinations.json
├── lib/
│   ├── build-access.ts
│   ├── build-history-actions.ts
│   ├── build-history.ts
│   ├── build-settings-actions.ts
│   ├── build-visibility-actions.ts
│   ├── build-visibility.ts
│   ├── calculations.ts
│   ├── compatibility.ts
│   ├── destinations.ts
│   ├── gear-picker.ts
│   ├── gear-selection-actions.ts
│   ├── guest-build-token.ts
│   ├── legacy-gear-selection.ts
│   ├── prisma.ts
│   ├── profile.ts
│   ├── trip-planner-actions.ts
│   ├── trip-planner.ts
│   ├── trip.ts
│   └── waypoint-map.ts
├── mobile-update/
│   ├── files/
│   │   ├── app/
│   │   │   └── build/
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   └── components/
│   │       └── builder/
│   │           ├── AddCustomItemForm.tsx
│   │           ├── BuildHeader.tsx
│   │           ├── BuildRow.tsx
│   │           ├── CompatibilityBar.tsx
│   │           ├── CostSummary.tsx
│   │           ├── ItemCategoryToggle.tsx
│   │           ├── QuantityStepper.tsx
│   │           ├── ShareBar.tsx
│   │           └── WeightSummary.tsx
│   ├── install.mjs
│   └── README.md
├── prisma/
│   ├── migrations/
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   └── seed.ts
├── tests/
│   ├── builder-ownership.test.cjs
│   └── trip-planner.test.cjs
├── tools/
│   └── generate-docs.ts
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

- `.gitignore` (503 B, 44 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/app/build/actions.ts` (10.4 KB, 331 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/app/profile/actions.ts` (3.6 KB, 92 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/app/profile/gear/actions.ts` (3.1 KB, 91 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/components/builder/ShareBar.tsx` (6.9 KB, 164 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/lib/build-settings-actions.ts` (871 B, 22 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/lib/build-visibility-actions.ts` (793 B, 20 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/lib/trip-planner-actions.ts` (4.6 KB, 51 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/prisma/schema.prisma` (6.2 KB, 328 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/tests/builder-ownership.test.cjs` (11.0 KB, 166 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/tests/trip-planner.test.cjs` (4.6 KB, 18 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/app/build/actions.ts` (17.2 KB, 475 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/app/profile/actions.ts` (3.8 KB, 96 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/app/profile/gear/actions.ts` (3.3 KB, 94 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/components/builder/BuildDataTools.tsx` (27.4 KB, 559 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/components/builder/ShareBar.tsx` (2.9 KB, 82 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/lib/build-history-actions.ts` (6.4 KB, 162 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/lib/build-history.ts` (4.1 KB, 145 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/lib/build-settings-actions.ts` (1.1 KB, 25 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/lib/build-visibility-actions.ts` (1.0 KB, 23 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/lib/trip-planner-actions.ts` (5.2 KB, 60 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/prisma/schema.prisma` (6.5 KB, 344 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/tests/builder-ownership.test.cjs` (11.6 KB, 171 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/tests/trip-planner.test.cjs` (4.7 KB, 18 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/app/build/actions.ts` (17.2 KB, 475 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/app/profile/actions.ts` (3.8 KB, 96 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/app/profile/gear/actions.ts` (3.3 KB, 94 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/components/builder/BuildDataTools.tsx` (21.9 KB, 500 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/components/builder/ShareBar.tsx` (2.9 KB, 82 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/lib/build-history-actions.ts` (6.4 KB, 162 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/lib/build-history.ts` (4.1 KB, 145 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/lib/build-settings-actions.ts` (1.1 KB, 25 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/lib/build-visibility-actions.ts` (1.0 KB, 23 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/lib/trip-planner-actions.ts` (5.2 KB, 60 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/prisma/schema.prisma` (6.5 KB, 344 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/tests/builder-ownership.test.cjs` (11.6 KB, 171 lines)
- `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/tests/trip-planner.test.cjs` (4.7 KB, 18 lines)
- `app/api/auth/[...nextauth]/route.ts` (74 B, 2 lines)
- `app/build/[id]/page.tsx` (8.8 KB, 225 lines)
- `app/build/[id]/select/[category]/[subcategory]/page.tsx` (510 B, 11 lines)
- `app/build/[id]/select/[category]/page.tsx` (467 B, 11 lines)
- `app/build/actions.ts` (17.2 KB, 475 lines)
- `app/build/page.tsx` (4.3 KB, 117 lines)
- `app/gear/[id]/[subcategory]/page.tsx` (469 B, 10 lines)
- `app/gear/[id]/page.tsx` (2.4 KB, 138 lines)
- `app/gear/page.tsx` (409 B, 10 lines)
- `app/globals.css` (1.8 KB, 89 lines)
- `app/layout.tsx` (910 B, 42 lines)
- `app/page.tsx` (2.1 KB, 120 lines)
- `app/profile/actions.ts` (3.8 KB, 96 lines)
- `app/profile/builds/page.tsx` (3.1 KB, 35 lines)
- `app/profile/edit/page.tsx` (2.8 KB, 25 lines)
- `app/profile/favorites/page.tsx` (3.0 KB, 39 lines)
- `app/profile/gear/actions.ts` (3.3 KB, 94 lines)
- `app/profile/gear/page.tsx` (5.1 KB, 73 lines)
- `app/profile/layout.tsx` (4.7 KB, 100 lines)
- `app/profile/page.tsx` (5.3 KB, 39 lines)
- `auth.ts` (345 B, 10 lines)
- `components/build/CreateTripDetails.tsx` (7.0 KB, 165 lines)
- `components/build/DateRangePicker.tsx` (12.6 KB, 174 lines)
- `components/build/DestinationPicker.tsx` (11.9 KB, 410 lines)
- `components/build/LocationMap.tsx` (2.3 KB, 113 lines)
- `components/build/LocationPicker.tsx` (8.5 KB, 240 lines)
- `components/builder/AddCustomItemForm.tsx` (2.5 KB, 79 lines)
- `components/builder/AddGearButton.tsx` (914 B, 49 lines)
- `components/builder/BuildDataTools.tsx` (27.4 KB, 628 lines)
- `components/builder/BuildHeader.tsx` (1.4 KB, 47 lines)
- `components/builder/BuildRow.tsx` (9.4 KB, 203 lines)
- `components/builder/BuildSettings.tsx` (5.9 KB, 118 lines)
- `components/builder/BuildVisibilityToggle.tsx` (2.7 KB, 60 lines)
- `components/builder/CompatibilityBar.tsx` (2.2 KB, 57 lines)
- `components/builder/CompatibilityDetails.tsx` (1.9 KB, 52 lines)
- `components/builder/CostSummary.tsx` (816 B, 33 lines)
- `components/builder/GearPicker.tsx` (11.6 KB, 124 lines)
- `components/builder/GearTab.tsx` (4.3 KB, 156 lines)
- `components/builder/ItemCategoryToggle.tsx` (2.6 KB, 91 lines)
- `components/builder/OriginalGearPicker.tsx` (12.5 KB, 253 lines)
- `components/builder/PrivateBuildNotice.tsx` (1008 B, 17 lines)
- `components/builder/PublicBuildView.tsx` (4.0 KB, 62 lines)
- `components/builder/QuantityStepper.tsx` (2.4 KB, 89 lines)
- `components/builder/RemoveGearButton.tsx` (677 B, 35 lines)
- `components/builder/ShareBar.tsx` (3.0 KB, 84 lines)
- `components/builder/TripPlanner/MapPreviewInner.tsx` (1.0 KB, 33 lines)
- `components/builder/TripPlanner/PlannerFields.tsx` (2.1 KB, 85 lines)
- `components/builder/TripPlanner/RouteMapInner.tsx` (5.4 KB, 100 lines)
- `components/builder/TripPlanner/TripDayList.tsx` (3.3 KB, 98 lines)
- `components/builder/TripPlanner/TripDayRow.tsx` (15.9 KB, 511 lines)
- `components/builder/TripPlanner/TripEditForm.tsx` (4.8 KB, 145 lines)
- `components/builder/TripPlanner/TripLocationPreview.tsx` (342 B, 9 lines)
- `components/builder/TripPlanner/TripLogistics.tsx` (2.0 KB, 13 lines)
- `components/builder/TripPlanner/TripPlanner.tsx` (3.3 KB, 27 lines)
- `components/builder/TripPlanner/TripRoute.tsx` (14.8 KB, 140 lines)
- `components/builder/TripPlanner/TripSummaryCard.tsx` (7.5 KB, 246 lines)
- `components/builder/TripPlanner/WaypointIcon.tsx` (463 B, 8 lines)
- `components/builder/TripPlanner/WaypointSearch.tsx` (5.0 KB, 80 lines)
- `components/builder/WeightSummary.tsx` (2.6 KB, 87 lines)
- `components/filters/BrandFilter.tsx` (2.6 KB, 99 lines)
- `components/filters/FilterSection.tsx` (1.2 KB, 51 lines)
- `components/filters/RangeFilter.tsx` (2.1 KB, 109 lines)
- `components/filters/SortHeader.tsx` (1.5 KB, 77 lines)
- `components/gear/GearAccountActions.tsx` (1.7 KB, 23 lines)
- `components/GearCard.tsx` (1.1 KB, 61 lines)
- `components/GearFilters.tsx` (2.6 KB, 149 lines)
- `components/GearSort.tsx` (1.1 KB, 71 lines)
- `components/Navbar.tsx` (1.3 KB, 35 lines)
- `components/NavbarNavigation.tsx` (7.2 KB, 102 lines)
- `components/profile/BuildCard.tsx` (3.4 KB, 33 lines)
- `components/profile/DeleteBuildButton.tsx` (461 B, 19 lines)
- `components/profile/GearLibraryCard.tsx` (4.2 KB, 88 lines)
- `components/ProfileDropdown.tsx` (6.7 KB, 226 lines)
- `components/SearchBar.tsx` (884 B, 52 lines)
- `data/destinations.json` (9.0 KB, 275 lines)
- `docs.config.json` (589 B, 20 lines)
- `eslint.config.mjs` (465 B, 19 lines)
- `lib/build-access.ts` (3.3 KB, 79 lines)
- `lib/build-history-actions.ts` (7.9 KB, 204 lines)
- `lib/build-history.ts` (9.6 KB, 263 lines)
- `lib/build-settings-actions.ts` (1.1 KB, 25 lines)
- `lib/build-visibility-actions.ts` (1.0 KB, 23 lines)
- `lib/build-visibility.ts` (822 B, 21 lines)
- `lib/calculations.ts` (1.2 KB, 54 lines)
- `lib/compatibility.ts` (12.9 KB, 374 lines)
- `lib/destinations.ts` (1.3 KB, 57 lines)
- `lib/gear-picker.ts` (1.2 KB, 31 lines)
- `lib/gear-selection-actions.ts` (572 B, 16 lines)
- `lib/guest-build-token.ts` (1.6 KB, 37 lines)
- `lib/legacy-gear-selection.ts` (768 B, 15 lines)
- `lib/prisma.ts` (471 B, 20 lines)
- `lib/profile.ts` (1.5 KB, 43 lines)
- `lib/trip-planner-actions.ts` (5.2 KB, 60 lines)
- `lib/trip-planner.ts` (4.0 KB, 38 lines)
- `lib/trip.ts` (1.9 KB, 65 lines)
- `lib/waypoint-map.ts` (5.2 KB, 84 lines)
- `mobile-update/files/app/build/[id]/page.tsx` (8.8 KB, 225 lines)
- `mobile-update/files/components/builder/AddCustomItemForm.tsx` (2.5 KB, 79 lines)
- `mobile-update/files/components/builder/BuildHeader.tsx` (1.4 KB, 47 lines)
- `mobile-update/files/components/builder/BuildRow.tsx` (9.4 KB, 203 lines)
- `mobile-update/files/components/builder/CompatibilityBar.tsx` (2.2 KB, 57 lines)
- `mobile-update/files/components/builder/CostSummary.tsx` (816 B, 33 lines)
- `mobile-update/files/components/builder/ItemCategoryToggle.tsx` (2.6 KB, 91 lines)
- `mobile-update/files/components/builder/QuantityStepper.tsx` (2.4 KB, 89 lines)
- `mobile-update/files/components/builder/ShareBar.tsx` (3.0 KB, 84 lines)
- `mobile-update/files/components/builder/WeightSummary.tsx` (2.6 KB, 87 lines)
- `mobile-update/install.mjs` (3.3 KB, 73 lines)
- `mobile-update/README.md` (1.9 KB, 20 lines)
- `next-env.d.ts` (247 B, 7 lines)
- `next.config.ts` (259 B, 15 lines)
- `package.json` (907 B, 39 lines)
- `postcss.config.mjs` (94 B, 8 lines)
- `prisma/migrations/migration_lock.toml` (128 B, 4 lines)
- `prisma/schema.prisma` (6.5 KB, 344 lines)
- `prisma/seed.ts` (8.2 KB, 408 lines)
- `prisma.config.ts` (283 B, 15 lines)
- `README.md` (1.4 KB, 37 lines)
- `tests/builder-ownership.test.cjs` (11.6 KB, 171 lines)
- `tests/trip-planner.test.cjs` (4.7 KB, 18 lines)
- `tools/generate-docs.ts` (16.1 KB, 428 lines)
- `tsconfig.json` (666 B, 35 lines)
