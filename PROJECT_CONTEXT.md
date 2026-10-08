# PROJECT CONTEXT

> Generated automatically. Treat source files as authoritative; summaries are derived metadata.

- Generated: 2026-10-08T04:38:33.383Z
- Root: `trailpicker`
- Files scanned: 158
- Files included with readable text: 158
- Total included source lines: 18,093
- Total scanned size: 718.0 KB
- Max file size: 293.0 KB


## PROJECT STRUCTURE

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

## PACKAGE SUMMARY

- Name: trailpicker
- Version: 0.1.0
- Scripts: dev, build, start, lint, docs
- Package type: not specified

## INTERNAL IMPORTS / DEPENDENCIES

- `app/build/page.tsx` → `app/build/actions.ts` (import: `./actions`)
- `app/layout.tsx` → `app/globals.css` (import: `./globals.css`)
- `app/profile/edit/page.tsx` → `app/profile/actions.ts` (import: `../actions`)
- `components/build/CreateTripDetails.tsx` → `components/build/DestinationPicker.tsx` (import: `./DestinationPicker`)
- `components/build/CreateTripDetails.tsx` → `components/build/DateRangePicker.tsx` (import: `./DateRangePicker`)
- `components/build/DestinationPicker.tsx` → `components/build/LocationPicker.tsx` (import: `./LocationPicker`)
- `components/build/LocationPicker.tsx` → `components/build/LocationMap.tsx` (import: `./LocationMap`)
- `components/builder/PublicBuildView.tsx` → `components/builder/TripPlanner/TripPlanner.tsx` (import: `./TripPlanner/TripPlanner`)
- `components/builder/TripPlanner/TripDayList.tsx` → `components/builder/TripPlanner/TripDayRow.tsx` (import: `./TripDayRow`)
- `components/builder/TripPlanner/TripDayRow.tsx` → `components/builder/TripPlanner/PlannerFields.tsx` (import: `./PlannerFields`)
- `components/builder/TripPlanner/TripLocationPreview.tsx` → `components/builder/TripPlanner/MapPreviewInner.tsx` (import: `./MapPreviewInner`)
- `components/builder/TripPlanner/TripLogistics.tsx` → `components/builder/TripPlanner/PlannerFields.tsx` (import: `./PlannerFields`)
- `components/builder/TripPlanner/TripPlanner.tsx` → `components/builder/TripPlanner/TripSummaryCard.tsx` (import: `./TripSummaryCard`)
- `components/builder/TripPlanner/TripPlanner.tsx` → `components/builder/TripPlanner/TripEditForm.tsx` (import: `./TripEditForm`)
- `components/builder/TripPlanner/TripPlanner.tsx` → `components/builder/TripPlanner/TripDayList.tsx` (import: `./TripDayList`)
- `components/builder/TripPlanner/TripPlanner.tsx` → `components/builder/TripPlanner/TripRoute.tsx` (import: `./TripRoute`)
- `components/builder/TripPlanner/TripPlanner.tsx` → `components/builder/TripPlanner/TripLogistics.tsx` (import: `./TripLogistics`)
- `components/profile/BuildCard.tsx` → `components/profile/DeleteBuildButton.tsx` (import: `./DeleteBuildButton`)

## UNRESOLVED RELATIVE IMPORTS

- `next-env.d.ts` → `./.next/types/routes.d.ts`
- `prisma/seed.ts` → `../app/generated/prisma/client`

## TODO / FIXME / HACK

- tools/generate-docs.ts:282 **TODO** |FIXME|HACK|XXX)\b[:\-]?\s*(.*)$/i);
- tools/generate-docs.ts:358 **TODO** / FIXME / HACK\n\n${todos.length ? todos.map(item => `- ${item}`).join('\n') : '_None detected._'}`);

## FILE INDEX

| File | Size | Lines | Status |
|---|---:|---:|---|
| `.gitignore` | 503 B | 44 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/app/build/actions.ts` | 10.4 KB | 331 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/app/profile/actions.ts` | 3.6 KB | 92 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/app/profile/gear/actions.ts` | 3.1 KB | 91 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/components/builder/ShareBar.tsx` | 6.9 KB | 164 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/lib/build-settings-actions.ts` | 871 B | 22 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/lib/build-visibility-actions.ts` | 793 B | 20 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/lib/trip-planner-actions.ts` | 4.6 KB | 51 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/prisma/schema.prisma` | 6.2 KB | 328 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/tests/builder-ownership.test.cjs` | 11.0 KB | 166 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/tests/trip-planner.test.cjs` | 4.6 KB | 18 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/app/build/actions.ts` | 17.2 KB | 475 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/app/profile/actions.ts` | 3.8 KB | 96 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/app/profile/gear/actions.ts` | 3.3 KB | 94 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/components/builder/BuildDataTools.tsx` | 27.4 KB | 559 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/components/builder/ShareBar.tsx` | 2.9 KB | 82 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/lib/build-history-actions.ts` | 6.4 KB | 162 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/lib/build-history.ts` | 4.1 KB | 145 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/lib/build-settings-actions.ts` | 1.1 KB | 25 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/lib/build-visibility-actions.ts` | 1.0 KB | 23 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/lib/trip-planner-actions.ts` | 5.2 KB | 60 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/prisma/schema.prisma` | 6.5 KB | 344 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/tests/builder-ownership.test.cjs` | 11.6 KB | 171 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/tests/trip-planner.test.cjs` | 4.7 KB | 18 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/app/build/actions.ts` | 17.2 KB | 475 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/app/profile/actions.ts` | 3.8 KB | 96 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/app/profile/gear/actions.ts` | 3.3 KB | 94 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/components/builder/BuildDataTools.tsx` | 21.9 KB | 500 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/components/builder/ShareBar.tsx` | 2.9 KB | 82 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/lib/build-history-actions.ts` | 6.4 KB | 162 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/lib/build-history.ts` | 4.1 KB | 145 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/lib/build-settings-actions.ts` | 1.1 KB | 25 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/lib/build-visibility-actions.ts` | 1.0 KB | 23 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/lib/trip-planner-actions.ts` | 5.2 KB | 60 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/prisma/schema.prisma` | 6.5 KB | 344 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/tests/builder-ownership.test.cjs` | 11.6 KB | 171 | Included |
| `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/tests/trip-planner.test.cjs` | 4.7 KB | 18 | Included |
| `app/api/auth/[...nextauth]/route.ts` | 74 B | 2 | Included |
| `app/build/[id]/page.tsx` | 8.8 KB | 225 | Included |
| `app/build/[id]/select/[category]/[subcategory]/page.tsx` | 510 B | 11 | Included |
| `app/build/[id]/select/[category]/page.tsx` | 467 B | 11 | Included |
| `app/build/actions.ts` | 17.2 KB | 475 | Included |
| `app/build/page.tsx` | 4.3 KB | 117 | Included |
| `app/gear/[id]/[subcategory]/page.tsx` | 469 B | 10 | Included |
| `app/gear/[id]/page.tsx` | 2.4 KB | 138 | Included |
| `app/gear/page.tsx` | 409 B | 10 | Included |
| `app/globals.css` | 1.8 KB | 89 | Included |
| `app/layout.tsx` | 910 B | 42 | Included |
| `app/page.tsx` | 2.1 KB | 120 | Included |
| `app/profile/actions.ts` | 3.8 KB | 96 | Included |
| `app/profile/builds/page.tsx` | 3.1 KB | 35 | Included |
| `app/profile/edit/page.tsx` | 2.8 KB | 25 | Included |
| `app/profile/favorites/page.tsx` | 3.0 KB | 39 | Included |
| `app/profile/gear/actions.ts` | 3.3 KB | 94 | Included |
| `app/profile/gear/page.tsx` | 5.1 KB | 73 | Included |
| `app/profile/layout.tsx` | 4.7 KB | 100 | Included |
| `app/profile/page.tsx` | 5.3 KB | 39 | Included |
| `auth.ts` | 345 B | 10 | Included |
| `components/build/CreateTripDetails.tsx` | 7.0 KB | 165 | Included |
| `components/build/DateRangePicker.tsx` | 12.6 KB | 174 | Included |
| `components/build/DestinationPicker.tsx` | 11.9 KB | 410 | Included |
| `components/build/LocationMap.tsx` | 2.3 KB | 113 | Included |
| `components/build/LocationPicker.tsx` | 8.5 KB | 240 | Included |
| `components/builder/AddCustomItemForm.tsx` | 2.5 KB | 79 | Included |
| `components/builder/AddGearButton.tsx` | 914 B | 49 | Included |
| `components/builder/BuildDataTools.tsx` | 27.4 KB | 628 | Included |
| `components/builder/BuildHeader.tsx` | 1.4 KB | 47 | Included |
| `components/builder/BuildRow.tsx` | 9.4 KB | 203 | Included |
| `components/builder/BuildSettings.tsx` | 5.9 KB | 118 | Included |
| `components/builder/BuildVisibilityToggle.tsx` | 2.7 KB | 60 | Included |
| `components/builder/CompatibilityBar.tsx` | 2.2 KB | 57 | Included |
| `components/builder/CompatibilityDetails.tsx` | 1.9 KB | 52 | Included |
| `components/builder/CostSummary.tsx` | 816 B | 33 | Included |
| `components/builder/GearPicker.tsx` | 11.6 KB | 124 | Included |
| `components/builder/GearTab.tsx` | 4.3 KB | 156 | Included |
| `components/builder/ItemCategoryToggle.tsx` | 2.6 KB | 91 | Included |
| `components/builder/OriginalGearPicker.tsx` | 12.5 KB | 253 | Included |
| `components/builder/PrivateBuildNotice.tsx` | 1008 B | 17 | Included |
| `components/builder/PublicBuildView.tsx` | 4.0 KB | 62 | Included |
| `components/builder/QuantityStepper.tsx` | 2.4 KB | 89 | Included |
| `components/builder/RemoveGearButton.tsx` | 677 B | 35 | Included |
| `components/builder/ShareBar.tsx` | 3.0 KB | 84 | Included |
| `components/builder/TripPlanner/MapPreviewInner.tsx` | 1.0 KB | 33 | Included |
| `components/builder/TripPlanner/PlannerFields.tsx` | 2.1 KB | 85 | Included |
| `components/builder/TripPlanner/RouteMapInner.tsx` | 5.4 KB | 100 | Included |
| `components/builder/TripPlanner/TripDayList.tsx` | 3.3 KB | 98 | Included |
| `components/builder/TripPlanner/TripDayRow.tsx` | 15.9 KB | 511 | Included |
| `components/builder/TripPlanner/TripEditForm.tsx` | 4.8 KB | 145 | Included |
| `components/builder/TripPlanner/TripLocationPreview.tsx` | 342 B | 9 | Included |
| `components/builder/TripPlanner/TripLogistics.tsx` | 2.0 KB | 13 | Included |
| `components/builder/TripPlanner/TripPlanner.tsx` | 3.3 KB | 27 | Included |
| `components/builder/TripPlanner/TripRoute.tsx` | 14.8 KB | 140 | Included |
| `components/builder/TripPlanner/TripSummaryCard.tsx` | 7.5 KB | 246 | Included |
| `components/builder/TripPlanner/WaypointIcon.tsx` | 463 B | 8 | Included |
| `components/builder/TripPlanner/WaypointSearch.tsx` | 5.0 KB | 80 | Included |
| `components/builder/WeightSummary.tsx` | 2.6 KB | 87 | Included |
| `components/filters/BrandFilter.tsx` | 2.6 KB | 99 | Included |
| `components/filters/FilterSection.tsx` | 1.2 KB | 51 | Included |
| `components/filters/RangeFilter.tsx` | 2.1 KB | 109 | Included |
| `components/filters/SortHeader.tsx` | 1.5 KB | 77 | Included |
| `components/gear/GearAccountActions.tsx` | 1.7 KB | 23 | Included |
| `components/GearCard.tsx` | 1.1 KB | 61 | Included |
| `components/GearFilters.tsx` | 2.6 KB | 149 | Included |
| `components/GearSort.tsx` | 1.1 KB | 71 | Included |
| `components/Navbar.tsx` | 1.3 KB | 35 | Included |
| `components/NavbarNavigation.tsx` | 7.2 KB | 102 | Included |
| `components/profile/BuildCard.tsx` | 3.4 KB | 33 | Included |
| `components/profile/DeleteBuildButton.tsx` | 461 B | 19 | Included |
| `components/profile/GearLibraryCard.tsx` | 4.2 KB | 88 | Included |
| `components/ProfileDropdown.tsx` | 6.7 KB | 226 | Included |
| `components/SearchBar.tsx` | 884 B | 52 | Included |
| `data/destinations.json` | 9.0 KB | 275 | Included |
| `docs.config.json` | 589 B | 20 | Included |
| `eslint.config.mjs` | 465 B | 19 | Included |
| `lib/build-access.ts` | 3.3 KB | 79 | Included |
| `lib/build-history-actions.ts` | 7.9 KB | 204 | Included |
| `lib/build-history.ts` | 9.6 KB | 263 | Included |
| `lib/build-settings-actions.ts` | 1.1 KB | 25 | Included |
| `lib/build-visibility-actions.ts` | 1.0 KB | 23 | Included |
| `lib/build-visibility.ts` | 822 B | 21 | Included |
| `lib/calculations.ts` | 1.2 KB | 54 | Included |
| `lib/compatibility.ts` | 12.9 KB | 374 | Included |
| `lib/destinations.ts` | 1.3 KB | 57 | Included |
| `lib/gear-picker.ts` | 1.2 KB | 31 | Included |
| `lib/gear-selection-actions.ts` | 572 B | 16 | Included |
| `lib/guest-build-token.ts` | 1.6 KB | 37 | Included |
| `lib/legacy-gear-selection.ts` | 768 B | 15 | Included |
| `lib/prisma.ts` | 471 B | 20 | Included |
| `lib/profile.ts` | 1.5 KB | 43 | Included |
| `lib/trip-planner-actions.ts` | 5.2 KB | 60 | Included |
| `lib/trip-planner.ts` | 4.0 KB | 38 | Included |
| `lib/trip.ts` | 1.9 KB | 65 | Included |
| `lib/waypoint-map.ts` | 5.2 KB | 84 | Included |
| `mobile-update/files/app/build/[id]/page.tsx` | 8.8 KB | 225 | Included |
| `mobile-update/files/components/builder/AddCustomItemForm.tsx` | 2.5 KB | 79 | Included |
| `mobile-update/files/components/builder/BuildHeader.tsx` | 1.4 KB | 47 | Included |
| `mobile-update/files/components/builder/BuildRow.tsx` | 9.4 KB | 203 | Included |
| `mobile-update/files/components/builder/CompatibilityBar.tsx` | 2.2 KB | 57 | Included |
| `mobile-update/files/components/builder/CostSummary.tsx` | 816 B | 33 | Included |
| `mobile-update/files/components/builder/ItemCategoryToggle.tsx` | 2.6 KB | 91 | Included |
| `mobile-update/files/components/builder/QuantityStepper.tsx` | 2.4 KB | 89 | Included |
| `mobile-update/files/components/builder/ShareBar.tsx` | 3.0 KB | 84 | Included |
| `mobile-update/files/components/builder/WeightSummary.tsx` | 2.6 KB | 87 | Included |
| `mobile-update/install.mjs` | 3.3 KB | 73 | Included |
| `mobile-update/README.md` | 1.9 KB | 20 | Included |
| `next-env.d.ts` | 247 B | 7 | Included |
| `next.config.ts` | 259 B | 15 | Included |
| `package.json` | 907 B | 39 | Included |
| `postcss.config.mjs` | 94 B | 8 | Included |
| `prisma/migrations/migration_lock.toml` | 128 B | 4 | Included |
| `prisma/schema.prisma` | 6.5 KB | 344 | Included |
| `prisma/seed.ts` | 8.2 KB | 408 | Included |
| `prisma.config.ts` | 283 B | 15 | Included |
| `README.md` | 1.4 KB | 37 | Included |
| `tests/builder-ownership.test.cjs` | 11.6 KB | 171 | Included |
| `tests/trip-planner.test.cjs` | 4.7 KB | 18 | Included |
| `tools/generate-docs.ts` | 16.1 KB | 428 | Included |
| `tsconfig.json` | 666 B | 35 | Included |

## SOURCE FILES

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

### `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/app/build/actions.ts`

```typescript
"use server";

import { saveTripDetails, saveTripDay } from "@/lib/trip-planner-actions";
import { parseDates } from "@/lib/trip-planner";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getDateRange } from "@/lib/trip";
import { currentBuildUserId, hasGuestBuildAccess, requireBuildAccess, requireBuildItemAccess, setCurrentBuild } from "@/lib/build-access";
import { guestBuildCookieName } from "@/lib/guest-build-token";
import { getDestination } from "@/lib/destinations";

export async function getBuildExport(buildId: string) {
  const access = await requireBuildAccess(buildId);
  const build = await prisma.build.findUnique({
    where: { id: buildId, userId: access.userId },
    include: { items: { include: { gear: { select: { id: true, name: true } } } } },
  });

  if (!build) throw new Error("Build not found.");

  return {
    version: 1,
    name: build.name,
    location: build.location,
    startDate: build.startDate,
    endDate: build.endDate,
    people: build.people,
    minTemperature: build.minTemperature,
    conditions: build.conditions,
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
  };
}

export async function importBuildItems(formData: FormData) {
  const buildId = formData.get("buildId") as string;
  const access = await requireBuildAccess(buildId);
  const payload = JSON.parse(formData.get("payload") as string);

  if (!Array.isArray(payload.items)) {
    throw new Error("Invalid import file.");
  }

  for (const item of payload.items) {
    if (item.gearId) {
      await prisma.buildItem.upsert({
        where: { buildId_gearId: { buildId, gearId: item.gearId }, build: { userId: access.userId } },
        update: { quantity: { increment: item.quantity ?? 1 } },
        create: {
          build: { connect: { id: buildId, userId: access.userId } },
          gear: { connect: { id: item.gearId } },
          quantity: item.quantity ?? 1,
          isConsumable: !!item.isConsumable,
          isWorn: !!item.isWorn,
        },
      });
    } else {
      await prisma.buildItem.create({
        data: {
          build: { connect: { id: buildId, userId: access.userId } },
          customCategory: item.customCategory ?? null,
          gearNameSnapshot: item.gearNameSnapshot ?? item.gearName ?? "Imported item",
          weightSnapshot: item.weightSnapshot ?? null,
          priceSnapshot: item.priceSnapshot ?? null,
          quantity: item.quantity ?? 1,
          isConsumable: !!item.isConsumable,
          isWorn: !!item.isWorn,
        },
      });
    }
  }

  revalidatePath(`/build/${buildId}`);
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

  const copy = await prisma.build.create({
    data: {
      name: `${original.name} (copy)`,
      userId: ownerId,
      locationLat: original.locationLat,
      locationLng: original.locationLng,
      location: original.location,
      startDate: original.startDate,
      endDate: original.endDate,
      people: original.people,
      minTemperature: original.minTemperature,
      conditions: original.conditions,
      routeWaypoints: original.routeWaypoints ?? undefined,
      tripLogistics: original.tripLogistics ?? undefined,
      days: { create: original.days.map(({ id: _id, buildId: _buildId, createdAt: _createdAt, updatedAt: _updatedAt, ...day }) => day) },
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

  await setCurrentBuild(copy.id, !ownerId);
  redirect(`/build/${copy.id}`);
}
export async function setItemCategory(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const item = await requireBuildItemAccess(buildId, itemId);
  const category = formData.get("category") as "base" | "worn" | "consumable";

  await prisma.buildItem.update({
    where: { id: itemId, buildId, build: { userId: item.accessUserId } },
    data: {
      isWorn: category === "worn",
      isConsumable: category === "consumable",
    },
  });

  revalidatePath(`/build/${buildId}`);
}

export async function addCustomItem(formData: FormData) {
  const buildId = formData.get("buildId") as string;
  const access = await requireBuildAccess(buildId);
  const category = formData.get("category") as string;
  const name = formData.get("name") as string;
  const weightRaw = formData.get("weight_g") as string;
  const priceRaw = formData.get("price_cad") as string;

  if (!name?.trim()) {
    throw new Error("Item name is required.");
  }

  await prisma.buildItem.create({
    data: {
      build: { connect: { id: buildId, userId: access.userId } },
      customCategory: category,
      gearNameSnapshot: name.trim(),
      weightSnapshot: weightRaw ? Number(weightRaw) : null,
      priceSnapshot: priceRaw ? Number(priceRaw) : null,
    },
  });

  redirect(`/build/${buildId}`);
}

export async function updateQuantity(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const delta = Number(formData.get("delta"));

  const item = await requireBuildItemAccess(buildId, itemId);

  if (!Number.isInteger(delta) || Math.abs(delta) !== 1) throw new Error("Invalid quantity change.");
  const newQuantity = Math.max(1, item.quantity + delta);

  await prisma.buildItem.update({
    where: { id: itemId, buildId, build: { userId: item.accessUserId } },
    data: { quantity: newQuantity },
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
  const result = await prisma.build.updateMany({
    where: { id: buildId, userId: null }, data: { userId },
  });
  if (result.count) {
    cookieStore.delete(guestBuildCookieName(buildId));
    revalidatePath(`/build/${buildId}`);
    revalidatePath("/profile/builds");
  }
}
export async function createBuild(formData: FormData) {
  const ownerId = await currentBuildUserId();

  const name = formData.get("name")?.toString().trim();

  if (!name) {
    throw new Error("Build name is required.");
  }

  const startDateRaw = formData.get("startDate")?.toString();
  const endDateRaw = formData.get("endDate")?.toString();
  const peopleRaw = formData.get("people")?.toString();
  const minTemperatureRaw =
    formData.get("minTemperature")?.toString();
  const conditions = formData.get("conditions")?.toString();

  const destinationIdRaw =
    formData.get("destinationId")?.toString() || null;

  const selectedDestination = getDestination(destinationIdRaw);


  const submittedLocation =
    formData.get("location")?.toString().trim();

  const submittedLat =
    formData.get("locationLat")?.toString();

  const submittedLng =
    formData.get("locationLng")?.toString();

  const location = selectedDestination
    ? `${selectedDestination.name}, ${selectedDestination.park}`
    : submittedLocation || null;

  const locationLat = selectedDestination
    ? selectedDestination.latitude
    : submittedLat
      ? Number(submittedLat)
      : null;

  const locationLng = selectedDestination
    ? selectedDestination.longitude
    : submittedLng
      ? Number(submittedLng)
      : null;

  const dates = parseDates(startDateRaw ?? "", endDateRaw ?? "");
  const build = await prisma.build.create({
    data: {
      name,
      destinationId: selectedDestination?.id ?? null,
      location,
      locationLat,
      locationLng,
      ...dates,
      people: peopleRaw ? Number(peopleRaw) : 1,
      minTemperature: minTemperatureRaw
        ? Number(minTemperatureRaw)
        : null,
      conditions: conditions || null,
      userId: ownerId,
    },
  });

  if (build.startDate && build.endDate) {
    const range = getDateRange(
      build.startDate,
      build.endDate,
    );

    await prisma.tripDay.createMany({
      data: range.map((date) => ({
        buildId: build.id,
        date,
      })),
      skipDuplicates: true,
    });
  }

  await setCurrentBuild(build.id, !ownerId);

  redirect(`/build/${build.id}`);
}
export async function addGear(formData: FormData) {
  const buildId = formData.get("buildId") as string;
  const access = await requireBuildAccess(buildId);
  const gearId = formData.get("gearId") as string;

  await prisma.buildItem.upsert({
    where: {
      buildId_gearId: { buildId, gearId },
      build: { userId: access.userId },
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      build: { connect: { id: buildId, userId: access.userId } },
      gear: { connect: { id: gearId } },
    },
  });

  redirect(`/build/${buildId}`);
}

export async function removeGear(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const item = await requireBuildItemAccess(buildId, itemId);

  await prisma.buildItem.delete({
    where: {
      id: itemId,
      buildId,
      build: { userId: item.accessUserId },
    },
  });

  redirect(`/build/${buildId}`);
}

export async function updateTripDetails(formData: FormData) { return saveTripDetails(formData); }
export async function updateTripDay(formData: FormData) { return saveTripDay(formData); }

```

### `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/app/profile/actions.ts`

```typescript
"use server";

import { setCurrentBuild } from "@/lib/build-access";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  await prisma.build.updateMany({ where: { id: buildId, userId: user.id }, data: { name: name.slice(0, 80) } });
  revalidatePath("/profile");
  revalidatePath("/profile/builds");
}

export async function duplicateProfileBuild(formData: FormData) {
  const user = await currentUser();
  const buildId = String(formData.get("buildId") || "");
  const original = await prisma.build.findFirst({ where: { id: buildId, userId: user.id }, include: { items: true, days: true } });
  if (!original) throw new Error("Build not found.");
  const copy = await prisma.build.create({
    data: {
      name: `${original.name} (copy)`,
      userId: user.id,
      location: original.location,
      locationLat: original.locationLat,
      locationLng: original.locationLng,
      startDate: original.startDate,
      endDate: original.endDate,
      people: original.people,
      minTemperature: original.minTemperature,
      conditions: original.conditions,
      items: {
        create: original.items.map(
          ({ gearId, quantity, isConsumable, isWorn, customCategory, gearNameSnapshot, weightSnapshot, priceSnapshot }) => ({
            gearId,
            quantity,
            isConsumable,
            isWorn,
            customCategory,
            gearNameSnapshot,
            weightSnapshot,
            priceSnapshot,
          }),
        ),
      },
      days: {
        create: original.days.map(({ date, minTemperature, conditions, notes }) => ({
          date,
          minTemperature,
          conditions,
          notes,
        })),
      },
    },
  });
  await setCurrentBuild(copy.id);
  redirect(`/build/${copy.id}`);
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

### `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/app/profile/gear/actions.ts`

```typescript
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function userId() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("You must be signed in.");
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) throw new Error("User not found.");
  return user.id;
}

function gearIdFrom(formData: FormData) {
  const gearId = String(formData.get("gearId") || "");
  if (!gearId) throw new Error("Gear item is required.");
  return gearId;
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
  await prisma.$transaction([
    prisma.ownedGear.upsert({ where: { userId_gearId: { userId: userIdValue, gearId } }, update: {}, create: { userId: userIdValue, gearId } }),
    prisma.favorite.deleteMany({ where: { userId: userIdValue, gearId } }),
  ]);
  refreshGearPages(gearId);
}

export async function addGearToCurrentBuild(formData: FormData) {
  const userIdValue = await userId();
  const gearId = gearIdFrom(formData);
  const buildId = (await cookies()).get("currentBuild")?.value;
  if (!buildId) redirect("/profile/builds");
  const build = await prisma.build.findFirst({ where: { id: buildId, userId: userIdValue }, select: { id: true } });
  if (!build) redirect("/profile/builds");
  await prisma.buildItem.upsert({
    where: { buildId_gearId: { buildId: build.id, gearId } },
    update: { quantity: { increment: 1 } },
    create: { buildId: build.id, gearId },
  });
  revalidatePath(`/build/${build.id}`);
  redirect(`/build/${build.id}`);
}

```

### `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/components/builder/ShareBar.tsx`

```typescript
"use client";
//components/builder/ShareBar.tsx
import { useRef, useState } from "react";
import Link from "next/link";
import BuildSettings from "@/components/builder/BuildSettings";
import { duplicateBuild, getBuildExport, importBuildItems } from "@/app/build/actions";

type Props = {
    buildId: string;
    buildName: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
};

const btnClass =
    "flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed";

export default function ShareBar({ buildId, buildName, isPublic, createdAt, updatedAt }: Props) {
    const [copied, setCopied] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [importing, setImporting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const shareUrl =
        typeof window !== "undefined" ? `${window.location.origin}/build/${buildId}` : `/build/${buildId}`;

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // clipboard blocked — user can still select the text manually
        }
    }

    async function exportBuild() {
        const data = await getBuildExport(buildId);
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${buildName.replace(/\s+/g, "-").toLowerCase()}.json`;
        a.click();

        URL.revokeObjectURL(url);
    }

    async function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setImporting(true);
        try {
            const text = await file.text();
            JSON.parse(text);

            const formData = new FormData();
            formData.append("buildId", buildId);
            formData.append("payload", text);
            await importBuildItems(formData);

            window.location.reload();
        } catch {
            alert("Couldn't read that file — check it's a TrailPicker export.");
        } finally {
            setImporting(false);
            e.target.value = "";
        }
    }

    return (
        <div className="flex flex-wrap items-center gap-3 px-5 py-4">
            <div className="flex flex-1 min-w-[280px] items-center gap-2 rounded-md border border-gray-300 bg-gray-50 px-3 py-2">
                <button
                    type="button"
                    onClick={copyLink}
                    title={isPublic ? "Copy public link" : "Copy private link"}
                    className="shrink-0 text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                    {copied ? (
                        <span className="text-xs font-semibold text-green-700 whitespace-nowrap">Copied!</span>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                            <rect x="9" y="9" width="13" height="13" rx="2" />
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                        </svg>
                    )}
                </button>

                <input
                    readOnly
                    value={shareUrl}
                    onFocus={(e) => e.currentTarget.select()}
                    className="w-full bg-transparent text-sm text-gray-700 outline-none truncate"
                />
            </div>

            <span className="text-xs text-gray-500">{isPublic ? "Public build" : "Private build"}</span>

            <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                onChange={handleImportFile}
                className="hidden"
            />

            <button type="button" onClick={() => fileInputRef.current?.click()} disabled={importing} className={btnClass}>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                </svg>
                {importing ? "Importing…" : "Import"}
            </button>

            <button type="button" onClick={exportBuild} className={btnClass}>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15V3m0 0l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                </svg>
                Export
            </button>

            <div className="relative">
                <button type="button" onClick={() => setShowHistory(!showHistory)} className={btnClass}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                        <circle cx="12" cy="12" r="9" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
                    </svg>
                    History
                </button>

                {showHistory && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border bg-white p-3 text-xs text-gray-600 shadow-lg z-20">
                        <p><span className="font-semibold">Created:</span> {createdAt.toLocaleDateString()}</p>
                        <p className="mt-1"><span className="font-semibold">Last updated:</span> {updatedAt.toLocaleDateString()}</p>
                    </div>
                )}
            </div>

            <BuildSettings buildId={buildId} buildName={buildName} isPublic={isPublic} buttonClassName={btnClass} />

            <form action={duplicateBuild}>
                <input type="hidden" name="buildId" value={buildId} />
                <button type="submit" className={btnClass}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                        <rect x="8" y="8" width="12" height="12" rx="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16V5a1 1 0 011-1h11" />
                    </svg>
                    Save As
                </button>
            </form>

            <Link href="/build" className={btnClass}>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                New Build
            </Link>
        </div>

    );
}
```

### `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/lib/build-settings-actions.ts`

```typescript
"use server";

import { prisma } from "@/lib/prisma";
import { requireBuildAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";

export async function renameBuild(buildId: string, name: string) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200 || typeof name !== "string") {
    throw new Error("Invalid build name.");
  }
  const trimmed = name.trim();
  if (!trimmed || trimmed.length > 100) throw new Error("Use a build name between 1 and 100 characters.");
  const access = await requireBuildAccess(buildId);
  const result = await prisma.build.updateMany({
    where: { id: access.id, userId: access.userId },
    data: { name: trimmed },
  });
  if (result.count !== 1) throw new Error("Build access changed. Refresh and try again.");
  revalidatePath(`/build/${access.id}`);
  revalidatePath("/profile/builds");
}

```

### `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/lib/build-visibility-actions.ts`

```typescript
"use server";

import { prisma } from "@/lib/prisma";
import { requireBuildAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";

export async function setBuildVisibility(buildId: string, isPublic: boolean) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200 || typeof isPublic !== "boolean") {
    throw new Error("Invalid visibility request.");
  }
  const access = await requireBuildAccess(buildId);
  // Repeat the owner condition in the write to prevent a stale guest claim.
  const result = await prisma.build.updateMany({
    where: { id: access.id, userId: access.userId },
    data: { isPublic },
  });
  if (result.count !== 1) throw new Error("Build access changed. Refresh and try again.");
  revalidatePath(`/build/${access.id}`);
}

```

### `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/lib/trip-planner-actions.ts`

```typescript
"use server";
import { prisma } from "@/lib/prisma";
import { requireBuildAccess, requireTripDayAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { getDestination } from "@/lib/destinations";
import { getDateRange } from "@/lib/trip";
import { dayTextFields, emptyLogistics, nullableNumber, parseDates, readWaypoints } from "@/lib/trip-planner";
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
  await prisma.$transaction(async tx => {
    const old = await tx.tripDay.findMany({ where: { buildId }, select: { date: true } });
    const range = dates.startDate && dates.endDate ? getDateRange(dates.startDate,dates.endDate) : [];
    const keys = new Set(range.map(d => d.getTime()));
    if (old.some(d => !keys.has(d.date.getTime())) && f.get("confirmDateChange") !== "yes") throw new Error("The new dates remove itinerary days. Tick the confirmation box to discard those days. Days still within the range will be kept.");
    await tx.build.update({ where: { id: buildId, userId: access.userId }, data });
    if (range.length) await tx.tripDay.createMany({ data: range.map(date => ({ buildId,date })), skipDuplicates: true });
    await tx.tripDay.deleteMany({ where: { buildId, date: { notIn: range } } });
  });
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripDay(f: FormData) {
  const buildId = text(f,"buildId",200)!, dayId = text(f,"dayId",200)!;
  const day = await requireTripDayAccess(buildId,dayId);
  const strings = Object.fromEntries(dayTextFields.map(key => [key,text(f,key)]));
  await prisma.tripDay.update({ where: { id: dayId, buildId, build: { userId: day.accessUserId } }, data: { ...strings, conditions: condition(f), minTemperature: number(f,"minTemperature",-100,60,true), distanceKm: number(f,"distanceKm",0,1000), elevationGainM: number(f,"elevationGainM",0,20000,true), elevationLossM: number(f,"elevationLossM",0,20000,true), durationMinutes: number(f,"durationMinutes",0,1440,true), waterCarryL: number(f,"waterCarryL",0,100) } });
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripRoute(f: FormData) {
  const buildId = text(f,"buildId",200)!, access = await requireBuildAccess(buildId);
  const raw: unknown = JSON.parse(text(f,"waypoints",100000) ?? "[]");
  const points = readWaypoints(raw);
  if (!Array.isArray(raw) || points.length !== raw.length || points.length > 200 || new Set(points.map(p=>p.id)).size !== points.length || points.some(p=>!p.name.trim() || p.name.length>200 || p.id.length>200 || (p.elevationM != null && (p.elevationM < -500 || p.elevationM > 9000)))) throw new Error("Check waypoint names, coordinates, elevations, and unique IDs. Maximum 200 waypoints.");
  await prisma.build.update({ where: { id: buildId,userId: access.userId }, data: { routeWaypoints: points.map(p=>({...p,name:p.name.trim()})) } });
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripLogistics(f: FormData) {
  const buildId = text(f,"buildId",200)!, access = await requireBuildAccess(buildId);
  const value = Object.fromEntries(Object.keys(emptyLogistics).map(key=>[key,text(f,key) ?? ""]));
  await prisma.build.update({ where: { id: buildId, userId: access.userId }, data: { tripLogistics: value } });
  revalidatePath(`/build/${buildId}`);
}

```

### `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/prisma/schema.prisma`

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

  gear Gear[]
  subcategories Subcategory[]
  createdAt DateTime @default(now())
}
model Subcategory {
  id         String   @id @default(cuid())
  name       String
  slug String
  categoryId String
  category   Category @relation(fields: [categoryId], references: [id])

  gear        Gear[]

  createdAt  DateTime @default(now())
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

  images GearImage[]
  specifications GearSpecification[]
  prices Price[]
  reviews Review[]
  buildItems BuildItem[]
  favorites Favorite[]
  ownedGear OwnedGear[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
model OwnedGear {
  id String @id @default(cuid())

  userId String
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  gearId String
  gear Gear @relation(fields: [gearId], references: [id], onDelete: Cascade)

  purchasedPrice Float?
  purchasedAt DateTime?
  notes String?

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
  username      String?    @unique
  email         String    @unique
  emailVerified DateTime?
  image         String?

  bio             String?
  location        String?
  isProfilePublic Boolean  @default(false)

  accounts Account[]
  sessions Session[]
  builds    Build[]
  reviews   Review[]
  favorites Favorite[]
  ownedGear OwnedGear[]

  createdAt DateTime @default(now())
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
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  @@unique([identifier, token])
}

model Build {
  isPublic Boolean @default(false)
  id String @id @default(cuid())

  name String

  userId String?
  user   User?   @relation(fields: [userId], references: [id])

  items BuildItem[]
  days  TripDay[]

  routeWaypoints Json?
  tripLogistics Json?

  destinationId String?

  location    String?
  locationLat Float?
  locationLng Float?
  startDate   DateTime?
  endDate     DateTime?

  people Int @default(1)

  minTemperature Int?
  conditions String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model TripDay {
  id String @id @default(cuid())

  buildId String
  build   Build  @relation(fields: [buildId], references: [id], onDelete: Cascade)

  date DateTime

  minTemperature Int?
  conditions     String?
  notes          String?
  startLocation String?
  endLocation String?
  distanceKm Float?
  elevationGainM Int?
  elevationLossM Int?
  durationMinutes Int?
  campsite String?
  reservation String?
  waterSource String?
  waterCarryL Float?
  trailConditions String?
  activities String?

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

### `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/tests/builder-ownership.test.cjs`

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
    buildItem: { findFirst: async ({ where }) => {
      const buildId = where.id === 'item-a' ? 'a' : where.id === 'item-b' ? 'b' : null;
      return buildId === where.buildId ? { id: where.id, buildId, quantity: 2 } : null;
    }, update: write('item.update'), delete: write('item.delete'), create: write('item.create'), upsert: write('item.upsert') },
    tripDay: { findFirst: async ({ where }) => where.id === 'day-a' && where.buildId === 'a' ? { id: 'day-a', buildId: 'a' } : null,
      update: write('day.update'), createMany: write('day.createMany'), deleteMany: write('day.deleteMany') },
  };
  const navigation = { notFound: () => { throw new Error('404'); }, redirect: url => { throw new Error(`REDIRECT:${url}`); } };
  const access = load('lib/build-access.ts', { '@/auth': {auth: async () => state.email ? {user:{email:state.email}} : null},
    '@/lib/prisma': { prisma }, 'next/headers': {cookies:async()=>cookieStore}, 'next/navigation': navigation, '@/lib/guest-build-token': token });
  const planner = load('lib/trip-planner.ts');
  const plannerActions = load('lib/trip-planner-actions.ts', { '@/lib/prisma':{prisma}, '@/lib/build-access':access, 'next/cache':{revalidatePath:()=>{}}, '@/lib/destinations':{getDestination:()=>null}, '@/lib/trip':{getDateRange:()=>[]}, '@/lib/trip-planner':planner });
  const actions = load('app/build/actions.ts', {'@/lib/prisma':{prisma}, '@/lib/trip-planner-actions':plannerActions, '@/lib/trip-planner':planner, 'next/navigation': navigation,
    'next/headers':{cookies:async()=>cookieStore}, 'next/cache':{revalidatePath:()=>{}}, '@/lib/trip':{getDateRange:()=>[]},
    '@/lib/build-access':access, '@/lib/guest-build-token':token, '@/lib/destinations':{getDestination:()=>null} });
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
    await assert.rejects(actions[name](form({buildId:'b', itemId:'item-b', dayId:'day-b', payload:'invalid JSON', delta:1})), /Build not found/);
    assert.deepEqual(state.writes, []);
  });
}
for (const name of ['setItemCategory','updateQuantity','removeGear']) {
  test(`${name} rejects another build's item paired with owned build`, async () => {
    const {state,actions}=harness();
    await assert.rejects(actions[name](form({buildId:'a',itemId:'item-b',delta:1})), /Item not found/);
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
  assert.equal(state.writes[0].args.data.quantity,3);
});
for (const name of ['getBuildExport','importBuildItems','duplicateBuild','addCustomItem','addGear','updateTripDetails','setItemCategory','updateQuantity','removeGear','updateTripDay']) {
  test(`${name} rejects anonymous access to account build`, async () => {
    const {state,actions}=harness();state.email=null;state.cookies.set('currentBuild','a');
    const input = name === 'getBuildExport' ? 'a' : form({buildId:'a',itemId:'item-a',dayId:'day-a',payload:'{}',delta:1});
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

### `.trailpicker-backups/import-export-history-2026-10-03T04-51-48-435Z/tests/trip-planner.test.cjs`

```typescript
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {stripTypeScriptTypes}=require('node:module');
function load(file,deps={}){let js=stripTypeScriptTypes(fs.readFileSync(path.join(__dirname,'..',file),'utf8'));const names=[...js.matchAll(/export (?:async )?function (\w+)|export const (\w+)/g)].map(m=>m[1]||m[2]);js=js.replace(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];/g,(_,n,s)=>`const {${n}}=require(${JSON.stringify(s)});`).replace(/export /g,'');return new Function('require',js+`\nreturn {${names.join(',')}};`)(s=>s in deps?deps[s]:require(s));}
const p=load('lib/trip-planner.ts'),trip=load('lib/trip.ts');
const form=o=>{const f=new FormData();Object.entries(o).forEach(([k,v])=>f.set(k,String(v)));return f;};
function harness(){const writes=[], old=[{date:new Date('2026-07-01')},{date:new Date('2026-07-02')}];const tx={build:{update:async x=>writes.push(['build',x])},tripDay:{findMany:async()=>old,createMany:async x=>writes.push(['create',x]),deleteMany:async x=>writes.push(['delete',x]),update:async x=>writes.push(['day',x])}};const prisma={...tx,$transaction:async fn=>fn(tx)};const a=load('lib/trip-planner-actions.ts',{'@/lib/prisma':{prisma},'@/lib/build-access':{requireBuildAccess:async id=>{if(id!=='owned')throw Error('Build not found.');return {userId:'owner'};},requireTripDayAccess:async(id,day)=>{if(id!=='owned'||day!=='day')throw Error('Day not found.');return {accessUserId:'owner'};}},'next/cache':{revalidatePath:()=>{}},'@/lib/destinations':{getDestination:()=>null},'@/lib/trip':trip,'@/lib/trip-planner':p});return {a,writes};}
test('rejects reversed, incomplete, impossible and excessive dates',()=>{for(const [s,e] of [['2026-07-02','2026-07-01'],['2026-07-01',''],['2026-02-30','2026-03-01'],['2026-01-01','2028-01-01']])assert.throws(()=>p.parseDates(s,e));assert.equal(trip.getDateRange(...Object.values(p.parseDates('2026-03-07','2026-03-09'))).length,3);});
test('totals preserve zero and indicate partial distance coverage',()=>{const days=[{startLocation:'A',endLocation:'B',distanceKm:0,elevationGainM:10},{startLocation:'B',endLocation:'C',distanceKm:12.4,elevationLossM:5},{notes:'weather only'}];assert.deepEqual(p.tripTotals(days),{distanceKm:12.4,gainM:10,lossM:5,minutes:0,measuredDays:2,plannedDays:2});});
test('invalid numeric values rejected',()=>{for(const v of ['NaN','Infinity','abc',-1])assert.throws(()=>p.nullableNumber(v,'distance',0,1000));assert.equal(p.nullableNumber('0','distance',0,1000),0);assert.throws(()=>p.nullableNumber('1.5','minutes',0,1440,true));});
test('date shortening requires explicit confirmation before writes',async()=>{const {a,writes}=harness();await assert.rejects(a.saveTripDetails(form({buildId:'owned',startDate:'2026-07-02',endDate:'2026-07-03'})),/confirmation/);assert.equal(writes.length,0);await a.saveTripDetails(form({buildId:'owned',startDate:'2026-07-02',endDate:'2026-07-03',confirmDateChange:'yes'}));assert.equal(writes.length,3);assert.equal(writes[2][1].where.date.notIn.length,2);});
test('invalid day and unowned route never write',async()=>{const {a,writes}=harness();await assert.rejects(a.saveTripDay(form({buildId:'owned',dayId:'day',distanceKm:'NaN'})),/distanceKm/);await assert.rejects(a.saveTripRoute(form({buildId:'other',waypoints:'[]'})),/Build not found/);assert.equal(writes.length,0);});
test('day writes preserve zeros, nullable fields and ownership scope',async()=>{const {a,writes}=harness();await a.saveTripDay(form({buildId:'owned',dayId:'day',distanceKm:0,minTemperature:0,startLocation:' A '}));assert.equal(writes[0][1].data.distanceKm,0);assert.equal(writes[0][1].data.minTemperature,0);assert.equal(writes[0][1].data.startLocation,'A');assert.equal(writes[0][1].where.build.userId,'owner');});
test('route validation rejects out of range coordinates and duplicate IDs',async()=>{const {a,writes}=harness(),point={id:'one',name:'Camp',kind:'camp',lat:49,lng:-123,elevationM:900};for(const points of [[{...point,lat:91}],[point,point]])await assert.rejects(a.saveTripRoute(form({buildId:'owned',waypoints:JSON.stringify(points)})),/waypoint/);assert.equal(writes.length,0);await a.saveTripRoute(form({buildId:'owned',waypoints:JSON.stringify([point])}));assert.deepEqual(writes[0][1].data.routeWaypoints,[point]);});
test('logistics are bounded and stored on owned build',async()=>{const {a,writes}=harness();await assert.rejects(a.saveTripLogistics(form({buildId:'owned',emergencyContact:'x'.repeat(5001)})),/too long/);await a.saveTripLogistics(form({buildId:'owned',parking:'Lot A'}));assert.equal(writes[0][1].data.tripLogistics.parking,'Lot A');assert.equal(writes[0][1].where.userId,'owner');});

```

### `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/app/build/actions.ts`

```typescript
"use server";

import { saveTripDetails, saveTripDay } from "@/lib/trip-planner-actions";
import { parseDates } from "@/lib/trip-planner";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getDateRange } from "@/lib/trip";
import { currentBuildUserId, hasGuestBuildAccess, requireBuildAccess, requireBuildItemAccess, setCurrentBuild } from "@/lib/build-access";
import { guestBuildCookieName } from "@/lib/guest-build-token";
import { getDestination } from "@/lib/destinations";
import { Prisma } from "@/app/generated/prisma/client";
import { ensureBuildRevisionBaseline, getBuildSnapshot, recordBuildRevision } from "@/lib/build-history";

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
  const date = importDate(day.date);
  if (!date) throw new Error("Imported itinerary day is missing a date.");
  const text = (key: string, max = 5000) => optionalText(day[key], max);
  return {
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
    version: 2,
    exportedAt: new Date().toISOString(),
    ...snapshot,
  };
}

export async function importBuildItems(formData: FormData) {
  const buildId = formData.get("buildId")?.toString() ?? "";
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(access.id, access.userId);
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
  const requestedGearIds = [...new Set(items.map((item) => item.gearId).filter((id): id is string => Boolean(id)))];
  const existingGear = requestedGearIds.length
    ? await prisma.gear.findMany({ where: { id: { in: requestedGearIds } }, select: { id: true } })
    : [];
  const existingGearIds = new Set(existingGear.map((gear) => gear.id));

  await prisma.$transaction(async (tx) => {
    if (mode === "replace") {
      const startDate = importDate(payload.startDate);
      const endDate = importDate(payload.endDate);
      if ((startDate == null) !== (endDate == null) || (startDate && endDate && endDate < startDate)) {
        throw new Error("Imported trip dates are invalid.");
      }

      const name = optionalText(payload.name, 100) ?? "Imported build";
      const people = optionalNumber(payload.people, 1, 100, true) ?? 1;
      const location = optionalText(payload.location, 500);
      const locationLat = optionalNumber(payload.locationLat, -90, 90);
      const locationLng = optionalNumber(payload.locationLng, -180, 180);
      if ((locationLat == null) !== (locationLng == null)) throw new Error("Imported coordinates must include latitude and longitude.");

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
          routeWaypoints: payload.routeWaypoints == null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.routeWaypoints)),
          tripLogistics: payload.tripLogistics == null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.tripLogistics)),
        },
      });

      await tx.buildItem.deleteMany({ where: { buildId: access.id } });
      await tx.tripDay.deleteMany({ where: { buildId: access.id } });

      if (days) {
        if (days.length) await tx.tripDay.createMany({ data: days.map((day) => ({ ...day, buildId: access.id })) });
      } else if (startDate && endDate) {
        const range = getDateRange(startDate, endDate);
        if (range.length) await tx.tripDay.createMany({ data: range.map((date) => ({ buildId: access.id, date })) });
      }
    }

    for (const item of items) {
      const gearId = item.gearId && existingGearIds.has(item.gearId) ? item.gearId : null;
      if (mode === "merge" && gearId) {
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

  await recordBuildRevision(
    access.id,
    access.userId,
    "import",
    mode === "replace" ? `Imported and replaced build with ${items.length} gear item${items.length === 1 ? "" : "s"}` : `Imported ${items.length} gear item${items.length === 1 ? "" : "s"}`,
  );
  revalidatePath(`/build/${access.id}`);
  revalidatePath("/profile/builds");

  return { mode, itemCount: items.length, dayCount: days?.length ?? 0 };
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

  const copy = await prisma.build.create({
    data: {
      name: `${original.name} (copy)`,
      userId: ownerId,
      locationLat: original.locationLat,
      locationLng: original.locationLng,
      location: original.location,
      startDate: original.startDate,
      endDate: original.endDate,
      people: original.people,
      minTemperature: original.minTemperature,
      conditions: original.conditions,
      routeWaypoints: original.routeWaypoints ?? undefined,
      tripLogistics: original.tripLogistics ?? undefined,
      days: { create: original.days.map(({ id: _id, buildId: _buildId, createdAt: _createdAt, updatedAt: _updatedAt, ...day }) => day) },
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

  await recordBuildRevision(copy.id, ownerId, "copy", `Created from ${original.name}`);
  await setCurrentBuild(copy.id, !ownerId);
  redirect(`/build/${copy.id}`);
}
export async function setItemCategory(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const item = await requireBuildItemAccess(buildId, itemId);
  await ensureBuildRevisionBaseline(buildId, item.accessUserId);
  const category = formData.get("category") as "base" | "worn" | "consumable";

  await prisma.buildItem.update({
    where: { id: itemId, buildId, build: { userId: item.accessUserId } },
    data: {
      isWorn: category === "worn",
      isConsumable: category === "consumable",
    },
  });

  await recordBuildRevision(buildId, item.accessUserId, "gear", "Changed gear category");
  revalidatePath(`/build/${buildId}`);
}

export async function addCustomItem(formData: FormData) {
  const buildId = formData.get("buildId") as string;
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(buildId, access.userId);
  const category = formData.get("category") as string;
  const name = formData.get("name") as string;
  const weightRaw = formData.get("weight_g") as string;
  const priceRaw = formData.get("price_cad") as string;

  if (!name?.trim()) {
    throw new Error("Item name is required.");
  }

  await prisma.buildItem.create({
    data: {
      build: { connect: { id: buildId, userId: access.userId } },
      customCategory: category,
      gearNameSnapshot: name.trim(),
      weightSnapshot: weightRaw ? Number(weightRaw) : null,
      priceSnapshot: priceRaw ? Number(priceRaw) : null,
    },
  });

  await recordBuildRevision(buildId, access.userId, "gear", `Added custom item: ${name.trim()}`);
  redirect(`/build/${buildId}`);
}

export async function updateQuantity(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const delta = Number(formData.get("delta"));

  const item = await requireBuildItemAccess(buildId, itemId);
  await ensureBuildRevisionBaseline(buildId, item.accessUserId);

  if (!Number.isInteger(delta) || Math.abs(delta) !== 1) throw new Error("Invalid quantity change.");
  const newQuantity = Math.max(1, item.quantity + delta);

  await prisma.buildItem.update({
    where: { id: itemId, buildId, build: { userId: item.accessUserId } },
    data: { quantity: newQuantity },
  });

  await recordBuildRevision(buildId, item.accessUserId, "gear", "Changed gear quantity");
  revalidatePath(`/build/${buildId}`);
}
export async function claimCurrentBuild(formData?: FormData) {
  const userId = await currentBuildUserId();
  if (!userId) return;
  const cookieStore = await cookies();
  const submittedId = formData?.get("buildId");
  const buildId = typeof submittedId === "string" ? submittedId : cookieStore.get("currentBuild")?.value;
  if (!buildId || !(await hasGuestBuildAccess(buildId))) return;
  const result = await prisma.build.updateMany({
    where: { id: buildId, userId: null }, data: { userId },
  });
  if (result.count) {
    cookieStore.delete(guestBuildCookieName(buildId));
    revalidatePath(`/build/${buildId}`);
    revalidatePath("/profile/builds");
  }
}
export async function createBuild(formData: FormData) {
  const ownerId = await currentBuildUserId();

  const name = formData.get("name")?.toString().trim();

  if (!name) {
    throw new Error("Build name is required.");
  }

  const startDateRaw = formData.get("startDate")?.toString();
  const endDateRaw = formData.get("endDate")?.toString();
  const peopleRaw = formData.get("people")?.toString();
  const minTemperatureRaw =
    formData.get("minTemperature")?.toString();
  const conditions = formData.get("conditions")?.toString();

  const destinationIdRaw =
    formData.get("destinationId")?.toString() || null;

  const selectedDestination = getDestination(destinationIdRaw);


  const submittedLocation =
    formData.get("location")?.toString().trim();

  const submittedLat =
    formData.get("locationLat")?.toString();

  const submittedLng =
    formData.get("locationLng")?.toString();

  const location = selectedDestination
    ? `${selectedDestination.name}, ${selectedDestination.park}`
    : submittedLocation || null;

  const locationLat = selectedDestination
    ? selectedDestination.latitude
    : submittedLat
      ? Number(submittedLat)
      : null;

  const locationLng = selectedDestination
    ? selectedDestination.longitude
    : submittedLng
      ? Number(submittedLng)
      : null;

  const dates = parseDates(startDateRaw ?? "", endDateRaw ?? "");
  const build = await prisma.build.create({
    data: {
      name,
      destinationId: selectedDestination?.id ?? null,
      location,
      locationLat,
      locationLng,
      ...dates,
      people: peopleRaw ? Number(peopleRaw) : 1,
      minTemperature: minTemperatureRaw
        ? Number(minTemperatureRaw)
        : null,
      conditions: conditions || null,
      userId: ownerId,
    },
  });

  if (build.startDate && build.endDate) {
    const range = getDateRange(
      build.startDate,
      build.endDate,
    );

    await prisma.tripDay.createMany({
      data: range.map((date) => ({
        buildId: build.id,
        date,
      })),
      skipDuplicates: true,
    });
  }

  await recordBuildRevision(build.id, ownerId, "create", "Created build");
  await setCurrentBuild(build.id, !ownerId);

  redirect(`/build/${build.id}`);
}
export async function addGear(formData: FormData) {
  const buildId = formData.get("buildId") as string;
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(buildId, access.userId);
  const gearId = formData.get("gearId") as string;

  await prisma.buildItem.upsert({
    where: {
      buildId_gearId: { buildId, gearId },
      build: { userId: access.userId },
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      build: { connect: { id: buildId, userId: access.userId } },
      gear: { connect: { id: gearId } },
    },
  });

  await recordBuildRevision(buildId, access.userId, "gear", "Added gear");
  redirect(`/build/${buildId}`);
}

export async function removeGear(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const item = await requireBuildItemAccess(buildId, itemId);
  await ensureBuildRevisionBaseline(buildId, item.accessUserId);

  await prisma.buildItem.delete({
    where: {
      id: itemId,
      buildId,
      build: { userId: item.accessUserId },
    },
  });

  await recordBuildRevision(buildId, item.accessUserId, "gear", "Removed gear");
  redirect(`/build/${buildId}`);
}

export async function updateTripDetails(formData: FormData) { return saveTripDetails(formData); }
export async function updateTripDay(formData: FormData) { return saveTripDay(formData); }

```

### `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/app/profile/actions.ts`

```typescript
"use server";

import { setCurrentBuild } from "@/lib/build-access";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ensureBuildRevisionBaseline, recordBuildRevision } from "@/lib/build-history";

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
  await ensureBuildRevisionBaseline(buildId, user.id);
  await prisma.build.updateMany({ where: { id: buildId, userId: user.id }, data: { name: name.slice(0, 80) } });
  await recordBuildRevision(buildId, user.id, "settings", "Renamed build");
  revalidatePath("/profile");
  revalidatePath("/profile/builds");
}

export async function duplicateProfileBuild(formData: FormData) {
  const user = await currentUser();
  const buildId = String(formData.get("buildId") || "");
  const original = await prisma.build.findFirst({ where: { id: buildId, userId: user.id }, include: { items: true, days: true } });
  if (!original) throw new Error("Build not found.");
  const copy = await prisma.build.create({
    data: {
      name: `${original.name} (copy)`,
      userId: user.id,
      location: original.location,
      locationLat: original.locationLat,
      locationLng: original.locationLng,
      startDate: original.startDate,
      endDate: original.endDate,
      people: original.people,
      minTemperature: original.minTemperature,
      conditions: original.conditions,
      items: {
        create: original.items.map(
          ({ gearId, quantity, isConsumable, isWorn, customCategory, gearNameSnapshot, weightSnapshot, priceSnapshot }) => ({
            gearId,
            quantity,
            isConsumable,
            isWorn,
            customCategory,
            gearNameSnapshot,
            weightSnapshot,
            priceSnapshot,
          }),
        ),
      },
      days: {
        create: original.days.map(({ date, minTemperature, conditions, notes }) => ({
          date,
          minTemperature,
          conditions,
          notes,
        })),
      },
    },
  });
  await recordBuildRevision(copy.id, user.id, "copy", `Created from ${original.name}`);
  await setCurrentBuild(copy.id);
  redirect(`/build/${copy.id}`);
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

### `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/app/profile/gear/actions.ts`

```typescript
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ensureBuildRevisionBaseline, recordBuildRevision } from "@/lib/build-history";

async function userId() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("You must be signed in.");
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) throw new Error("User not found.");
  return user.id;
}

function gearIdFrom(formData: FormData) {
  const gearId = String(formData.get("gearId") || "");
  if (!gearId) throw new Error("Gear item is required.");
  return gearId;
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
  await prisma.$transaction([
    prisma.ownedGear.upsert({ where: { userId_gearId: { userId: userIdValue, gearId } }, update: {}, create: { userId: userIdValue, gearId } }),
    prisma.favorite.deleteMany({ where: { userId: userIdValue, gearId } }),
  ]);
  refreshGearPages(gearId);
}

export async function addGearToCurrentBuild(formData: FormData) {
  const userIdValue = await userId();
  const gearId = gearIdFrom(formData);
  const buildId = (await cookies()).get("currentBuild")?.value;
  if (!buildId) redirect("/profile/builds");
  const build = await prisma.build.findFirst({ where: { id: buildId, userId: userIdValue }, select: { id: true } });
  if (!build) redirect("/profile/builds");
  await ensureBuildRevisionBaseline(build.id, userIdValue);
  await prisma.buildItem.upsert({
    where: { buildId_gearId: { buildId: build.id, gearId } },
    update: { quantity: { increment: 1 } },
    create: { buildId: build.id, gearId },
  });
  await recordBuildRevision(build.id, userIdValue, "gear", "Added gear from library");
  revalidatePath(`/build/${build.id}`);
  redirect(`/build/${build.id}`);
}

```

### `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/components/builder/BuildDataTools.tsx`

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
  type LucideIcon,
} from "lucide-react";
import { getBuildExport, importBuildItems } from "@/app/build/actions";
import { getBuildHistory, restoreBuildRevision } from "@/lib/build-history-actions";

type Tab = "import" | "export" | "history";
type ImportMode = "merge" | "replace";

type ImportPreview = {
  name: string;
  itemCount: number;
  dayCount: number;
  version: number | null;
  fullBuild: boolean;
};

type SelectedImport = {
  fileName: string;
  size: number;
  text: string;
  preview: ImportPreview;
};

type HistoryEntry = {
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

function inspectImport(text: string): ImportPreview {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("That file is not valid JSON.");
  }

  if (!isRecord(parsed) || !Array.isArray(parsed.items)) {
    throw new Error("This doesn’t look like a TrailPicker build export.");
  }
  if (parsed.format != null && parsed.format !== "trailpicker-build") {
    throw new Error("This JSON file was not exported by TrailPicker.");
  }

  const version = typeof parsed.version === "number" ? parsed.version : null;
  return {
    name: typeof parsed.name === "string" && parsed.name.trim() ? parsed.name.trim() : "Imported build",
    itemCount: parsed.items.length,
    dayCount: Array.isArray(parsed.days) ? parsed.days.length : 0,
    version,
    fullBuild: version === 2 || Array.isArray(parsed.days) || "routeWaypoints" in parsed || "tripLogistics" in parsed,
  };
}

function bytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function safeFileName(name: string) {
  const base = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${base || "trailpicker-build"}.json`;
}

function historyIcon(action: string) {
  if (action === "import") return FileUp;
  if (action === "restore") return RotateCcw;
  if (action === "route" || action === "trip" || action === "itinerary" || action === "logistics") return MapPinned;
  if (action === "gear") return Backpack;
  return Clock3;
}

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

  const [tab, setTab] = useState<Tab>("import");
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
  const [confirmRestore, setConfirmRestore] = useState<string | null>(null);
  const [restoring, setRestoring] = useState<string | null>(null);

  async function loadHistory() {
    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const entries = await getBuildHistory(buildId);
      setHistory(entries);
    } catch {
      setHistoryError("Couldn’t load version history. Make sure the history database migration has been applied.");
    } finally {
      setHistoryLoading(false);
    }
  }

  function open(nextTab: Tab) {
    setTab(nextTab);
    setImportError(null);
    setExportNotice(null);
    setHistoryError(null);
    setConfirmRestore(null);
    dialog.current?.showModal();
    if (nextTab === "history") void loadHistory();
  }

  function chooseTab(nextTab: Tab) {
    setTab(nextTab);
    setConfirmRestore(null);
    if (nextTab === "history" && history.length === 0 && !historyLoading) void loadHistory();
  }

  async function readImportFile(file: File) {
    setImportError(null);
    setImportNotice(null);
    if (file.size > 2_000_000) {
      setSelectedImport(null);
      setImportError("That file is over 2 MB. TrailPicker exports should be much smaller than that.");
      return;
    }
    try {
      const text = await file.text();
      const preview = inspectImport(text);
      setSelectedImport({ fileName: file.name, size: file.size, text, preview });
    } catch (error) {
      setSelectedImport(null);
      setImportError(error instanceof Error ? error.message : "Couldn’t read that import file.");
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
        result.mode === "replace"
          ? `Build replaced successfully. Imported ${result.itemCount} gear item${result.itemCount === 1 ? "" : "s"}.`
          : `Added ${result.itemCount} gear item${result.itemCount === 1 ? "" : "s"} to this build.`,
      );
      setSelectedImport(null);
      if (fileInput.current) fileInput.current.value = "";
      setHistory([]);
      router.refresh();
    } catch (error) {
      setImportError(error instanceof Error ? error.message : "Import failed. The current build was left unchanged.");
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
      setExportNotice("Export downloaded. It includes gear, trip details, route, logistics, and itinerary days.");
    } catch {
      setExportNotice("Couldn’t create the export. Refresh the page and try again.");
    } finally {
      setExporting(false);
    }
  }

  async function restore(entry: HistoryEntry) {
    if (restoring || entry.isCurrent) return;
    setRestoring(entry.id);
    setHistoryError(null);
    try {
      await restoreBuildRevision(buildId, entry.id);
      setConfirmRestore(null);
      await loadHistory();
      router.refresh();
    } catch {
      setHistoryError("Couldn’t restore that version. The current build was left unchanged.");
    } finally {
      setRestoring(null);
    }
  }

  const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
    { id: "import", label: "Import", icon: FileUp },
    { id: "export", label: "Export", icon: FileDown },
    { id: "history", label: "History", icon: History },
  ];

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
        className="fixed inset-0 m-auto max-h-[88vh] w-[calc(100%_-_2rem)] max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-gray-950/45"
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
          if (outside) event.currentTarget.close();
        }}
      >
        <div className="flex max-h-[88vh] flex-col">
          <header className="border-b border-gray-100 bg-gradient-to-b from-white to-gray-50/70 px-6 pt-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-green-700">Build tools</p>
                <h2 id="build-data-title" className="mt-1 text-xl font-semibold tracking-tight text-gray-950">Import, export & history</h2>
                <p className="mt-1 text-sm text-gray-500">Move your build around safely or roll it back when human decision-making does what it does.</p>
              </div>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                aria-label="Close build tools"
                className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-green-700"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 flex gap-1" role="tablist" aria-label="Build data tools">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  onClick={() => chooseTab(id)}
                  className={`relative flex items-center gap-2 rounded-t-xl px-4 py-3 text-sm font-medium transition ${
                    tab === id ? "bg-white text-green-900 shadow-[0_-1px_0_0_#e5e7eb,1px_0_0_0_#e5e7eb,-1px_0_0_0_#e5e7eb]" : "text-gray-500 hover:bg-white/60 hover:text-gray-800"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                  {tab === id && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-green-700" />}
                </button>
              ))}
            </div>
          </header>

          <div className="overflow-y-auto px-6 py-6">
            {tab === "import" && (
              <div className="space-y-5">
                <section>
                  <h3 className="text-base font-semibold text-gray-950">Import a TrailPicker build</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-500">Drop in a JSON export. You’ll see what’s inside before anything is changed.</p>
                </section>

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
                  className="group flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/70 px-6 py-9 text-center transition hover:border-green-500 hover:bg-green-50/40 focus-visible:outline-2 focus-visible:outline-green-700"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-green-800 shadow-sm ring-1 ring-gray-200 transition group-hover:-translate-y-0.5">
                    <UploadCloud className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="mt-4 text-sm font-semibold text-gray-900">Choose a JSON file or drop it here</span>
                  <span className="mt-1 text-xs text-gray-500">TrailPicker export, up to 2 MB</span>
                </button>

                {selectedImport && (
                  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/70 px-4 py-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-800 ring-1 ring-gray-200">
                        <FileJson2 className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">{selectedImport.fileName}</p>
                        <p className="text-xs text-gray-500">{bytes(selectedImport.size)} · {selectedImport.preview.version ? `export v${selectedImport.preview.version}` : "legacy export"}</p>
                      </div>
                      <button type="button" onClick={() => setSelectedImport(null)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700" aria-label="Remove import file">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid gap-3 p-4 sm:grid-cols-3">
                      <div className="rounded-xl bg-gray-50 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Build</p>
                        <p className="mt-1 truncate text-sm font-semibold text-gray-800">{selectedImport.preview.name}</p>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Gear</p>
                        <p className="mt-1 text-sm font-semibold text-gray-800">{selectedImport.preview.itemCount} item{selectedImport.preview.itemCount === 1 ? "" : "s"}</p>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Itinerary</p>
                        <p className="mt-1 text-sm font-semibold text-gray-800">{selectedImport.preview.fullBuild ? `${selectedImport.preview.dayCount} day${selectedImport.preview.dayCount === 1 ? "" : "s"}` : "Gear-only export"}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedImport && (
                  <section>
                    <p className="text-sm font-semibold text-gray-900">How should it be imported?</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setImportMode("merge")}
                        className={`rounded-2xl border p-4 text-left transition ${importMode === "merge" ? "border-green-700 bg-green-50 ring-1 ring-green-700/10" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-800 shadow-sm"><PackageOpen className="h-5 w-5" /></span>
                          {importMode === "merge" && <CheckCircle2 className="h-5 w-5 text-green-700" />}
                        </div>
                        <p className="mt-3 text-sm font-semibold text-gray-900">Add gear to this build</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">Keeps your current trip and adds imported gear. Matching catalog gear increases quantity.</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setImportMode("replace")}
                        className={`rounded-2xl border p-4 text-left transition ${importMode === "replace" ? "border-amber-500 bg-amber-50 ring-1 ring-amber-500/10" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-amber-700 shadow-sm"><RotateCcw className="h-5 w-5" /></span>
                          {importMode === "replace" && <CheckCircle2 className="h-5 w-5 text-amber-600" />}
                        </div>
                        <p className="mt-3 text-sm font-semibold text-gray-900">Replace current build</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">Replaces gear and trip data with the file. A history snapshot is kept after the import.</p>
                      </button>
                    </div>
                  </section>
                )}

                {importError && <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{importError}</p>}
                {importNotice && <p role="status" className="flex items-start gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />{importNotice}</p>}

                <div className="flex justify-end border-t border-gray-100 pt-5">
                  <button
                    type="button"
                    onClick={runImport}
                    disabled={!selectedImport || importing}
                    className="inline-flex min-w-32 items-center justify-center gap-2 rounded-xl bg-green-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />}
                    {importing ? "Importing…" : importMode === "replace" ? "Replace build" : "Import gear"}
                  </button>
                </div>
              </div>
            )}

            {tab === "export" && (
              <div className="space-y-5">
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-green-950 to-green-800 p-6 text-white shadow-sm">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-green-200">Portable backup</p>
                      <h3 className="mt-2 text-xl font-semibold">{buildName}</h3>
                      <p className="mt-2 max-w-lg text-sm leading-6 text-green-50/80">One JSON file with the build’s gear, trip details, route, logistics, and day-by-day itinerary.</p>
                    </div>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15"><Download className="h-6 w-6" /></span>
                  </div>
                  <button
                    type="button"
                    onClick={runExport}
                    disabled={exporting}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-green-950 shadow-sm transition hover:bg-green-50 disabled:opacity-60"
                  >
                    {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
                    {exporting ? "Preparing…" : "Download JSON export"}
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-gray-200 p-4">
                    <Backpack className="h-5 w-5 text-green-700" />
                    <p className="mt-3 text-sm font-semibold text-gray-900">Gear & quantities</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">Catalog and custom items, weight snapshots, prices, worn and consumable flags.</p>
                  </div>
                  <div className="rounded-2xl border border-gray-200 p-4">
                    <MapPinned className="h-5 w-5 text-green-700" />
                    <p className="mt-3 text-sm font-semibold text-gray-900">Trip & route</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">Dates, destination, party size, route waypoints, and logistics.</p>
                  </div>
                  <div className="rounded-2xl border border-gray-200 p-4">
                    <History className="h-5 w-5 text-green-700" />
                    <p className="mt-3 text-sm font-semibold text-gray-900">Portable, not public</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">The file contains build data, not account credentials or ownership permissions.</p>
                  </div>
                </div>

                <div className="rounded-xl bg-gray-50 px-4 py-3 text-xs leading-5 text-gray-500">
                  Created {createdAt.toLocaleString()} · Last build update {updatedAt.toLocaleString()}
                </div>

                {exportNotice && <p role="status" className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">{exportNotice}</p>}
              </div>
            )}

            {tab === "history" && (
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-950">Version history</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-500">TrailPicker saves snapshots after build changes. Restore an older version without deleting the newer history.</p>
                  </div>
                  <button type="button" onClick={() => void loadHistory()} disabled={historyLoading} className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50">
                    Refresh
                  </button>
                </div>

                {historyLoading && history.length === 0 && (
                  <div className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 py-12 text-sm text-gray-500"><Loader2 className="h-4 w-4 animate-spin" />Loading history…</div>
                )}
                {historyError && <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{historyError}</p>}

                {!historyLoading && !historyError && history.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-10 text-center">
                    <History className="mx-auto h-7 w-7 text-gray-400" />
                    <p className="mt-3 text-sm font-semibold text-gray-800">No saved versions yet</p>
                    <p className="mt-1 text-xs text-gray-500">Your first snapshot will appear here automatically.</p>
                  </div>
                )}

                <div className="space-y-3">
                  {history.map((entry) => {
                    const Icon = historyIcon(entry.action);
                    const confirming = confirmRestore === entry.id;
                    return (
                      <div key={entry.id} className={`rounded-2xl border p-4 transition ${entry.isCurrent ? "border-green-200 bg-green-50/45" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                        <div className="flex items-start gap-3">
                          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${entry.isCurrent ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-semibold text-gray-900">{entry.summary}</p>
                              {entry.isCurrent && <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-800">Current</span>}
                            </div>
                            <p className="mt-1 text-xs text-gray-500">{new Date(entry.createdAt).toLocaleString()} · {entry.itemCount} gear · {entry.dayCount} day{entry.dayCount === 1 ? "" : "s"}</p>
                          </div>
                          {!entry.isCurrent && !confirming && (
                            <button type="button" onClick={() => setConfirmRestore(entry.id)} className="shrink-0 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900">
                              Restore
                            </button>
                          )}
                        </div>

                        {confirming && (
                          <div className="mt-4 flex flex-col gap-3 rounded-xl bg-amber-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-2 text-xs leading-5 text-amber-900">
                              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                              <span>Restore this snapshot? Your current version will remain in history so you can come back to it.</span>
                            </div>
                            <div className="flex shrink-0 gap-2">
                              <button type="button" onClick={() => setConfirmRestore(null)} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-white/70">Cancel</button>
                              <button type="button" onClick={() => void restore(entry)} disabled={Boolean(restoring)} className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 disabled:opacity-50">
                                {restoring === entry.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RotateCcw className="h-3.5 w-3.5" />}
                                Restore version
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}

```

### `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/components/builder/ShareBar.tsx`

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, CopyCheck, Plus, Save } from "lucide-react";
import BuildSettings from "@/components/builder/BuildSettings";
import BuildDataTools from "@/components/builder/BuildDataTools";
import { duplicateBuild } from "@/app/build/actions";

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
      <div className="flex min-w-[280px] flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 shadow-inner shadow-gray-100/70">
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
          className="w-full truncate bg-transparent text-sm text-gray-700 outline-none"
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

### `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/lib/build-history-actions.ts`

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { requireBuildAccess } from "@/lib/build-access";
import {
  ensureBuildRevisionBaseline,
  recordBuildRevision,
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
  return { ...day, date };
}

export async function getBuildHistory(buildId: string) {
  const access = await requireBuildAccess(buildId);

  await ensureBuildRevisionBaseline(access.id, access.userId);

  const revisions = await prisma.buildRevision.findMany({
    where: { buildId: access.id },
    orderBy: { createdAt: "desc" },
    take: 30,
    select: { id: true, action: true, summary: true, snapshot: true, createdAt: true },
  });

  return revisions.map((revision, index) => {
    const snapshot = isRecord(revision.snapshot) ? revision.snapshot : null;
    const itemCount = snapshot && Array.isArray(snapshot.items) ? snapshot.items.length : 0;
    const dayCount = snapshot && Array.isArray(snapshot.days) ? snapshot.days.length : 0;
    const name = snapshot && typeof snapshot.name === "string" ? snapshot.name : "Build";

    return {
      id: revision.id,
      action: revision.action,
      summary: revision.summary,
      createdAt: revision.createdAt.toISOString(),
      itemCount,
      dayCount,
      name,
      isCurrent: index === 0,
    };
  });
}

export async function restoreBuildRevision(buildId: string, revisionId: string) {
  const access = await requireBuildAccess(buildId);
  if (typeof revisionId !== "string" || !revisionId || revisionId.length > 200) {
    throw new Error("Invalid history entry.");
  }

  const revision = await prisma.buildRevision.findFirst({
    where: { id: revisionId, buildId: access.id },
    select: { snapshot: true, createdAt: true },
  });
  if (!revision) throw new Error("History entry not found.");

  const snapshot = parseSnapshot(revision.snapshot);
  await recordBuildRevision(access.id, access.userId, "history", "Saved before restore");
  if (snapshot.items.length > 1000 || snapshot.days.length > 366) {
    throw new Error("This history entry is too large to restore.");
  }

  const items = snapshot.items.map(safeItem);
  const days = snapshot.days.map(safeDay);
  const requestedGearIds = [...new Set(items.map((item) => item.gearId).filter((id): id is string => Boolean(id)))];
  const existingGear = requestedGearIds.length
    ? await prisma.gear.findMany({ where: { id: { in: requestedGearIds } }, select: { id: true } })
    : [];
  const existingGearIds = new Set(existingGear.map((gear) => gear.id));

  await prisma.$transaction(async (tx) => {
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
        routeWaypoints: snapshot.routeWaypoints == null ? Prisma.DbNull : JSON.parse(JSON.stringify(snapshot.routeWaypoints)),
        tripLogistics: snapshot.tripLogistics == null ? Prisma.DbNull : JSON.parse(JSON.stringify(snapshot.tripLogistics)),
      },
    });

    await tx.buildItem.deleteMany({ where: { buildId: access.id } });
    for (const item of items) {
      const gearId = item.gearId && existingGearIds.has(item.gearId) ? item.gearId : null;
      await tx.buildItem.create({
        data: {
          buildId: access.id,
          gearId,
          quantity: item.quantity,
          isConsumable: item.isConsumable,
          isWorn: item.isWorn,
          customCategory: item.customCategory,
          gearNameSnapshot: gearId ? item.gearNameSnapshot : item.gearNameSnapshot ?? item.gearName ?? "Restored item",
          weightSnapshot: item.weightSnapshot,
          priceSnapshot: item.priceSnapshot,
        },
      });
    }

    await tx.tripDay.deleteMany({ where: { buildId: access.id } });
    if (days.length) {
      await tx.tripDay.createMany({
        data: days.map((day) => ({ ...day, buildId: access.id })),
      });
    }
  });

  const restoredDate = revision.createdAt.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });
  await recordBuildRevision(access.id, access.userId, "restore", `Restored version from ${restoredDate}`);
  revalidatePath(`/build/${access.id}`);
  revalidatePath("/profile/builds");

  return { ok: true };
}

```

### `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/lib/build-history.ts`

```typescript
import "server-only";

import { prisma } from "@/lib/prisma";

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

export async function getBuildSnapshot(buildId: string, userId: string | null): Promise<BuildSnapshot> {
  const build = await prisma.build.findUnique({
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


export async function ensureBuildRevisionBaseline(buildId: string, userId: string | null) {
  const count = await prisma.buildRevision.count({ where: { buildId } });
  if (count > 0) return;
  const snapshot = await getBuildSnapshot(buildId, userId);
  await prisma.buildRevision.create({
    data: {
      buildId,
      action: "history",
      summary: "Version history started",
      snapshot: JSON.parse(JSON.stringify(snapshot)),
    },
  });
}

export async function recordBuildRevision(
  buildId: string,
  userId: string | null,
  action: string,
  summary: string,
) {
  await prisma.build.update({ where: { id: buildId, userId }, data: { updatedAt: new Date() } });
  const snapshot = await getBuildSnapshot(buildId, userId);

  await prisma.buildRevision.create({
    data: {
      buildId,
      action: action.slice(0, 50),
      summary: summary.slice(0, 240),
      snapshot: JSON.parse(JSON.stringify(snapshot)),
    },
  });
}

```

### `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/lib/build-settings-actions.ts`

```typescript
"use server";

import { prisma } from "@/lib/prisma";
import { requireBuildAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { ensureBuildRevisionBaseline, recordBuildRevision } from "@/lib/build-history";

export async function renameBuild(buildId: string, name: string) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200 || typeof name !== "string") {
    throw new Error("Invalid build name.");
  }
  const trimmed = name.trim();
  if (!trimmed || trimmed.length > 100) throw new Error("Use a build name between 1 and 100 characters.");
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(access.id, access.userId);
  const result = await prisma.build.updateMany({
    where: { id: access.id, userId: access.userId },
    data: { name: trimmed },
  });
  if (result.count !== 1) throw new Error("Build access changed. Refresh and try again.");
  await recordBuildRevision(access.id, access.userId, "settings", "Renamed build");
  revalidatePath(`/build/${access.id}`);
  revalidatePath("/profile/builds");
}

```

### `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/lib/build-visibility-actions.ts`

```typescript
"use server";

import { prisma } from "@/lib/prisma";
import { requireBuildAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { ensureBuildRevisionBaseline, recordBuildRevision } from "@/lib/build-history";

export async function setBuildVisibility(buildId: string, isPublic: boolean) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200 || typeof isPublic !== "boolean") {
    throw new Error("Invalid visibility request.");
  }
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(access.id, access.userId);
  // Repeat the owner condition in the write to prevent a stale guest claim.
  const result = await prisma.build.updateMany({
    where: { id: access.id, userId: access.userId },
    data: { isPublic },
  });
  if (result.count !== 1) throw new Error("Build access changed. Refresh and try again.");
  await recordBuildRevision(access.id, access.userId, "settings", "Changed build visibility");
  revalidatePath(`/build/${access.id}`);
}

```

### `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/lib/trip-planner-actions.ts`

```typescript
"use server";
import { prisma } from "@/lib/prisma";
import { requireBuildAccess, requireTripDayAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { getDestination } from "@/lib/destinations";
import { getDateRange } from "@/lib/trip";
import { dayTextFields, emptyLogistics, nullableNumber, parseDates, readWaypoints } from "@/lib/trip-planner";
import { ensureBuildRevisionBaseline, recordBuildRevision } from "@/lib/build-history";
const text = (f: FormData, key: string, max = 5000) => { const v = f.get(key); if (v != null && typeof v !== "string") throw new Error(`Invalid ${key}.`); const s = (v ?? "").trim(); if (s.length > max) throw new Error(`${key} is too long (maximum ${max} characters).`); return s || null; };
const number = (f: FormData, key: string, min: number, max: number, integer = false) => nullableNumber(f.get(key),key,min,max,integer);
const condition = (f: FormData) => { const v = text(f,"conditions",20); if (v && !["dry","rain","snow"].includes(v)) throw new Error("Choose a valid weather condition."); return v; };
export async function saveTripDetails(f: FormData) {
  const buildId = text(f,"buildId",200)!;
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(buildId, access.userId);
  const dates = parseDates(text(f,"startDate",10) ?? "", text(f,"endDate",10) ?? "");
  const selected = getDestination(text(f,"destinationId",200));
  const lat = selected?.latitude ?? number(f,"locationLat",-90,90), lng = selected?.longitude ?? number(f,"locationLng",-180,180);
  if ((lat == null) !== (lng == null)) throw new Error("Provide both location coordinates.");
  const data = { ...dates, destinationId: selected?.id ?? null, location: selected ? `${selected.name}, ${selected.park}` : text(f,"location",500), locationLat: lat, locationLng: lng, people: number(f,"people",1,100,true) ?? 1, minTemperature: number(f,"minTemperature",-100,60,true), conditions: condition(f) };
  await prisma.$transaction(async tx => {
    const old = await tx.tripDay.findMany({ where: { buildId }, select: { date: true } });
    const range = dates.startDate && dates.endDate ? getDateRange(dates.startDate,dates.endDate) : [];
    const keys = new Set(range.map(d => d.getTime()));
    if (old.some(d => !keys.has(d.date.getTime())) && f.get("confirmDateChange") !== "yes") throw new Error("The new dates remove itinerary days. Tick the confirmation box to discard those days. Days still within the range will be kept.");
    await tx.build.update({ where: { id: buildId, userId: access.userId }, data });
    if (range.length) await tx.tripDay.createMany({ data: range.map(date => ({ buildId,date })), skipDuplicates: true });
    await tx.tripDay.deleteMany({ where: { buildId, date: { notIn: range } } });
  });
  await recordBuildRevision(buildId, access.userId, "trip", "Updated trip details");
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripDay(f: FormData) {
  const buildId = text(f,"buildId",200)!, dayId = text(f,"dayId",200)!;
  const day = await requireTripDayAccess(buildId,dayId);
  await ensureBuildRevisionBaseline(buildId, day.accessUserId);
  const strings = Object.fromEntries(dayTextFields.map(key => [key,text(f,key)]));
  await prisma.tripDay.update({ where: { id: dayId, buildId, build: { userId: day.accessUserId } }, data: { ...strings, conditions: condition(f), minTemperature: number(f,"minTemperature",-100,60,true), distanceKm: number(f,"distanceKm",0,1000), elevationGainM: number(f,"elevationGainM",0,20000,true), elevationLossM: number(f,"elevationLossM",0,20000,true), durationMinutes: number(f,"durationMinutes",0,1440,true), waterCarryL: number(f,"waterCarryL",0,100) } });
  await recordBuildRevision(buildId, day.accessUserId, "itinerary", "Updated itinerary day");
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripRoute(f: FormData) {
  const buildId = text(f,"buildId",200)!, access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(buildId, access.userId);
  const raw: unknown = JSON.parse(text(f,"waypoints",100000) ?? "[]");
  const points = readWaypoints(raw);
  if (!Array.isArray(raw) || points.length !== raw.length || points.length > 200 || new Set(points.map(p=>p.id)).size !== points.length || points.some(p=>!p.name.trim() || p.name.length>200 || p.id.length>200 || (p.elevationM != null && (p.elevationM < -500 || p.elevationM > 9000)))) throw new Error("Check waypoint names, coordinates, elevations, and unique IDs. Maximum 200 waypoints.");
  await prisma.build.update({ where: { id: buildId,userId: access.userId }, data: { routeWaypoints: points.map(p=>({...p,name:p.name.trim()})) } });
  await recordBuildRevision(buildId, access.userId, "route", "Updated trip route");
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripLogistics(f: FormData) {
  const buildId = text(f,"buildId",200)!, access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(buildId, access.userId);
  const value = Object.fromEntries(Object.keys(emptyLogistics).map(key=>[key,text(f,key) ?? ""]));
  await prisma.build.update({ where: { id: buildId, userId: access.userId }, data: { tripLogistics: value } });
  await recordBuildRevision(buildId, access.userId, "logistics", "Updated trip logistics");
  revalidatePath(`/build/${buildId}`);
}

```

### `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/prisma/schema.prisma`

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

  gear Gear[]
  subcategories Subcategory[]
  createdAt DateTime @default(now())
}
model Subcategory {
  id         String   @id @default(cuid())
  name       String
  slug String
  categoryId String
  category   Category @relation(fields: [categoryId], references: [id])

  gear        Gear[]

  createdAt  DateTime @default(now())
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

  images GearImage[]
  specifications GearSpecification[]
  prices Price[]
  reviews Review[]
  buildItems BuildItem[]
  favorites Favorite[]
  ownedGear OwnedGear[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
model OwnedGear {
  id String @id @default(cuid())

  userId String
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  gearId String
  gear Gear @relation(fields: [gearId], references: [id], onDelete: Cascade)

  purchasedPrice Float?
  purchasedAt DateTime?
  notes String?

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
  username      String?    @unique
  email         String    @unique
  emailVerified DateTime?
  image         String?

  bio             String?
  location        String?
  isProfilePublic Boolean  @default(false)

  accounts Account[]
  sessions Session[]
  builds    Build[]
  reviews   Review[]
  favorites Favorite[]
  ownedGear OwnedGear[]

  createdAt DateTime @default(now())
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
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  @@unique([identifier, token])
}

model Build {
  isPublic Boolean @default(false)
  id String @id @default(cuid())

  name String

  userId String?
  user   User?   @relation(fields: [userId], references: [id])

  items     BuildItem[]
  days      TripDay[]
  revisions BuildRevision[]

  routeWaypoints Json?
  tripLogistics Json?

  destinationId String?

  location    String?
  locationLat Float?
  locationLng Float?
  startDate   DateTime?
  endDate     DateTime?

  people Int @default(1)

  minTemperature Int?
  conditions String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model BuildRevision {
  id String @id @default(cuid())

  buildId String
  build   Build @relation(fields: [buildId], references: [id], onDelete: Cascade)

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

  minTemperature Int?
  conditions     String?
  notes          String?
  startLocation String?
  endLocation String?
  distanceKm Float?
  elevationGainM Int?
  elevationLossM Int?
  durationMinutes Int?
  campsite String?
  reservation String?
  waterSource String?
  waterCarryL Float?
  trailConditions String?
  activities String?

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

### `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/tests/builder-ownership.test.cjs`

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
    buildItem: { findFirst: async ({ where }) => {
      const buildId = where.id === 'item-a' ? 'a' : where.id === 'item-b' ? 'b' : null;
      return buildId === where.buildId ? { id: where.id, buildId, quantity: 2 } : null;
    }, update: write('item.update'), delete: write('item.delete'), create: write('item.create'), upsert: write('item.upsert') },
    tripDay: { findFirst: async ({ where }) => where.id === 'day-a' && where.buildId === 'a' ? { id: 'day-a', buildId: 'a' } : null,
      update: write('day.update'), createMany: write('day.createMany'), deleteMany: write('day.deleteMany') },
  };
  const navigation = { notFound: () => { throw new Error('404'); }, redirect: url => { throw new Error(`REDIRECT:${url}`); } };
  const access = load('lib/build-access.ts', { '@/auth': {auth: async () => state.email ? {user:{email:state.email}} : null},
    '@/lib/prisma': { prisma }, 'next/headers': {cookies:async()=>cookieStore}, 'next/navigation': navigation, '@/lib/guest-build-token': token });
  const planner = load('lib/trip-planner.ts');
  const history = { ensureBuildRevisionBaseline: async () => {}, recordBuildRevision: async () => {}, getBuildSnapshot: async (buildId, userId) => {
    const b = state.builds.find(build => build.id === buildId && build.userId === userId);
    if (!b) throw new Error('Build not found.');
    return { name:b.name, destinationId:null, location:null, locationLat:null, locationLng:null, startDate:null, endDate:null, people:1, minTemperature:null, conditions:null, routeWaypoints:null, tripLogistics:null, items:b.items || [], days:b.days || [] };
  } };
  const plannerActions = load('lib/trip-planner-actions.ts', { '@/lib/prisma':{prisma}, '@/lib/build-access':access, 'next/cache':{revalidatePath:()=>{}}, '@/lib/destinations':{getDestination:()=>null}, '@/lib/trip':{getDateRange:()=>[]}, '@/lib/trip-planner':planner, '@/lib/build-history':history });
  const actions = load('app/build/actions.ts', {'@/lib/prisma':{prisma}, '@/lib/trip-planner-actions':plannerActions, '@/lib/trip-planner':planner, 'next/navigation': navigation,
    'next/headers':{cookies:async()=>cookieStore}, 'next/cache':{revalidatePath:()=>{}}, '@/lib/trip':{getDateRange:()=>[]},
    '@/lib/build-access':access, '@/lib/guest-build-token':token, '@/lib/destinations':{getDestination:()=>null}, '@/lib/build-history':history, '@/app/generated/prisma/client':{Prisma:{DbNull:null}} });
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
    await assert.rejects(actions[name](form({buildId:'b', itemId:'item-b', dayId:'day-b', payload:'invalid JSON', delta:1})), /Build not found/);
    assert.deepEqual(state.writes, []);
  });
}
for (const name of ['setItemCategory','updateQuantity','removeGear']) {
  test(`${name} rejects another build's item paired with owned build`, async () => {
    const {state,actions}=harness();
    await assert.rejects(actions[name](form({buildId:'a',itemId:'item-b',delta:1})), /Item not found/);
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
  assert.equal(state.writes[0].args.data.quantity,3);
});
for (const name of ['getBuildExport','importBuildItems','duplicateBuild','addCustomItem','addGear','updateTripDetails','setItemCategory','updateQuantity','removeGear','updateTripDay']) {
  test(`${name} rejects anonymous access to account build`, async () => {
    const {state,actions}=harness();state.email=null;state.cookies.set('currentBuild','a');
    const input = name === 'getBuildExport' ? 'a' : form({buildId:'a',itemId:'item-a',dayId:'day-a',payload:'{}',delta:1});
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

### `.trailpicker-backups/import-export-history-2026-10-03T04-58-20-601Z/tests/trip-planner.test.cjs`

```typescript
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {stripTypeScriptTypes}=require('node:module');
function load(file,deps={}){let js=stripTypeScriptTypes(fs.readFileSync(path.join(__dirname,'..',file),'utf8'));const names=[...js.matchAll(/export (?:async )?function (\w+)|export const (\w+)/g)].map(m=>m[1]||m[2]);js=js.replace(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];/g,(_,n,s)=>`const {${n}}=require(${JSON.stringify(s)});`).replace(/export /g,'');return new Function('require',js+`\nreturn {${names.join(',')}};`)(s=>s in deps?deps[s]:require(s));}
const p=load('lib/trip-planner.ts'),trip=load('lib/trip.ts');
const form=o=>{const f=new FormData();Object.entries(o).forEach(([k,v])=>f.set(k,String(v)));return f;};
function harness(){const writes=[], old=[{date:new Date('2026-07-01')},{date:new Date('2026-07-02')}];const tx={build:{update:async x=>writes.push(['build',x])},tripDay:{findMany:async()=>old,createMany:async x=>writes.push(['create',x]),deleteMany:async x=>writes.push(['delete',x]),update:async x=>writes.push(['day',x])}};const prisma={...tx,$transaction:async fn=>fn(tx)};const a=load('lib/trip-planner-actions.ts',{'@/lib/prisma':{prisma},'@/lib/build-access':{requireBuildAccess:async id=>{if(id!=='owned')throw Error('Build not found.');return {userId:'owner'};},requireTripDayAccess:async(id,day)=>{if(id!=='owned'||day!=='day')throw Error('Day not found.');return {accessUserId:'owner'};}},'next/cache':{revalidatePath:()=>{}},'@/lib/destinations':{getDestination:()=>null},'@/lib/trip':trip,'@/lib/trip-planner':p,'@/lib/build-history':{ensureBuildRevisionBaseline:async()=>{},recordBuildRevision:async()=>{}}});return {a,writes};}
test('rejects reversed, incomplete, impossible and excessive dates',()=>{for(const [s,e] of [['2026-07-02','2026-07-01'],['2026-07-01',''],['2026-02-30','2026-03-01'],['2026-01-01','2028-01-01']])assert.throws(()=>p.parseDates(s,e));assert.equal(trip.getDateRange(...Object.values(p.parseDates('2026-03-07','2026-03-09'))).length,3);});
test('totals preserve zero and indicate partial distance coverage',()=>{const days=[{startLocation:'A',endLocation:'B',distanceKm:0,elevationGainM:10},{startLocation:'B',endLocation:'C',distanceKm:12.4,elevationLossM:5},{notes:'weather only'}];assert.deepEqual(p.tripTotals(days),{distanceKm:12.4,gainM:10,lossM:5,minutes:0,measuredDays:2,plannedDays:2});});
test('invalid numeric values rejected',()=>{for(const v of ['NaN','Infinity','abc',-1])assert.throws(()=>p.nullableNumber(v,'distance',0,1000));assert.equal(p.nullableNumber('0','distance',0,1000),0);assert.throws(()=>p.nullableNumber('1.5','minutes',0,1440,true));});
test('date shortening requires explicit confirmation before writes',async()=>{const {a,writes}=harness();await assert.rejects(a.saveTripDetails(form({buildId:'owned',startDate:'2026-07-02',endDate:'2026-07-03'})),/confirmation/);assert.equal(writes.length,0);await a.saveTripDetails(form({buildId:'owned',startDate:'2026-07-02',endDate:'2026-07-03',confirmDateChange:'yes'}));assert.equal(writes.length,3);assert.equal(writes[2][1].where.date.notIn.length,2);});
test('invalid day and unowned route never write',async()=>{const {a,writes}=harness();await assert.rejects(a.saveTripDay(form({buildId:'owned',dayId:'day',distanceKm:'NaN'})),/distanceKm/);await assert.rejects(a.saveTripRoute(form({buildId:'other',waypoints:'[]'})),/Build not found/);assert.equal(writes.length,0);});
test('day writes preserve zeros, nullable fields and ownership scope',async()=>{const {a,writes}=harness();await a.saveTripDay(form({buildId:'owned',dayId:'day',distanceKm:0,minTemperature:0,startLocation:' A '}));assert.equal(writes[0][1].data.distanceKm,0);assert.equal(writes[0][1].data.minTemperature,0);assert.equal(writes[0][1].data.startLocation,'A');assert.equal(writes[0][1].where.build.userId,'owner');});
test('route validation rejects out of range coordinates and duplicate IDs',async()=>{const {a,writes}=harness(),point={id:'one',name:'Camp',kind:'camp',lat:49,lng:-123,elevationM:900};for(const points of [[{...point,lat:91}],[point,point]])await assert.rejects(a.saveTripRoute(form({buildId:'owned',waypoints:JSON.stringify(points)})),/waypoint/);assert.equal(writes.length,0);await a.saveTripRoute(form({buildId:'owned',waypoints:JSON.stringify([point])}));assert.deepEqual(writes[0][1].data.routeWaypoints,[point]);});
test('logistics are bounded and stored on owned build',async()=>{const {a,writes}=harness();await assert.rejects(a.saveTripLogistics(form({buildId:'owned',emergencyContact:'x'.repeat(5001)})),/too long/);await a.saveTripLogistics(form({buildId:'owned',parking:'Lot A'}));assert.equal(writes[0][1].data.tripLogistics.parking,'Lot A');assert.equal(writes[0][1].where.userId,'owner');});

```

### `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/app/build/actions.ts`

```typescript
"use server";

import { saveTripDetails, saveTripDay } from "@/lib/trip-planner-actions";
import { parseDates } from "@/lib/trip-planner";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getDateRange } from "@/lib/trip";
import { currentBuildUserId, hasGuestBuildAccess, requireBuildAccess, requireBuildItemAccess, setCurrentBuild } from "@/lib/build-access";
import { guestBuildCookieName } from "@/lib/guest-build-token";
import { getDestination } from "@/lib/destinations";
import { Prisma } from "@/app/generated/prisma/client";
import { ensureBuildRevisionBaseline, getBuildSnapshot, recordBuildRevision } from "@/lib/build-history";

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
  const date = importDate(day.date);
  if (!date) throw new Error("Imported itinerary day is missing a date.");
  const text = (key: string, max = 5000) => optionalText(day[key], max);
  return {
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
    version: 2,
    exportedAt: new Date().toISOString(),
    ...snapshot,
  };
}

export async function importBuildItems(formData: FormData) {
  const buildId = formData.get("buildId")?.toString() ?? "";
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(access.id, access.userId);
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
  const requestedGearIds = [...new Set(items.map((item) => item.gearId).filter((id): id is string => Boolean(id)))];
  const existingGear = requestedGearIds.length
    ? await prisma.gear.findMany({ where: { id: { in: requestedGearIds } }, select: { id: true } })
    : [];
  const existingGearIds = new Set(existingGear.map((gear) => gear.id));

  await prisma.$transaction(async (tx) => {
    if (mode === "replace") {
      const startDate = importDate(payload.startDate);
      const endDate = importDate(payload.endDate);
      if ((startDate == null) !== (endDate == null) || (startDate && endDate && endDate < startDate)) {
        throw new Error("Imported trip dates are invalid.");
      }

      const name = optionalText(payload.name, 100) ?? "Imported build";
      const people = optionalNumber(payload.people, 1, 100, true) ?? 1;
      const location = optionalText(payload.location, 500);
      const locationLat = optionalNumber(payload.locationLat, -90, 90);
      const locationLng = optionalNumber(payload.locationLng, -180, 180);
      if ((locationLat == null) !== (locationLng == null)) throw new Error("Imported coordinates must include latitude and longitude.");

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
          routeWaypoints: payload.routeWaypoints == null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.routeWaypoints)),
          tripLogistics: payload.tripLogistics == null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.tripLogistics)),
        },
      });

      await tx.buildItem.deleteMany({ where: { buildId: access.id } });
      await tx.tripDay.deleteMany({ where: { buildId: access.id } });

      if (days) {
        if (days.length) await tx.tripDay.createMany({ data: days.map((day) => ({ ...day, buildId: access.id })) });
      } else if (startDate && endDate) {
        const range = getDateRange(startDate, endDate);
        if (range.length) await tx.tripDay.createMany({ data: range.map((date) => ({ buildId: access.id, date })) });
      }
    }

    for (const item of items) {
      const gearId = item.gearId && existingGearIds.has(item.gearId) ? item.gearId : null;
      if (mode === "merge" && gearId) {
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

  await recordBuildRevision(
    access.id,
    access.userId,
    "import",
    mode === "replace" ? `Imported and replaced build with ${items.length} gear item${items.length === 1 ? "" : "s"}` : `Imported ${items.length} gear item${items.length === 1 ? "" : "s"}`,
  );
  revalidatePath(`/build/${access.id}`);
  revalidatePath("/profile/builds");

  return { mode, itemCount: items.length, dayCount: days?.length ?? 0 };
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

  const copy = await prisma.build.create({
    data: {
      name: `${original.name} (copy)`,
      userId: ownerId,
      locationLat: original.locationLat,
      locationLng: original.locationLng,
      location: original.location,
      startDate: original.startDate,
      endDate: original.endDate,
      people: original.people,
      minTemperature: original.minTemperature,
      conditions: original.conditions,
      routeWaypoints: original.routeWaypoints ?? undefined,
      tripLogistics: original.tripLogistics ?? undefined,
      days: { create: original.days.map(({ id: _id, buildId: _buildId, createdAt: _createdAt, updatedAt: _updatedAt, ...day }) => day) },
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

  await recordBuildRevision(copy.id, ownerId, "copy", `Created from ${original.name}`);
  await setCurrentBuild(copy.id, !ownerId);
  redirect(`/build/${copy.id}`);
}
export async function setItemCategory(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const item = await requireBuildItemAccess(buildId, itemId);
  await ensureBuildRevisionBaseline(buildId, item.accessUserId);
  const category = formData.get("category") as "base" | "worn" | "consumable";

  await prisma.buildItem.update({
    where: { id: itemId, buildId, build: { userId: item.accessUserId } },
    data: {
      isWorn: category === "worn",
      isConsumable: category === "consumable",
    },
  });

  await recordBuildRevision(buildId, item.accessUserId, "gear", "Changed gear category");
  revalidatePath(`/build/${buildId}`);
}

export async function addCustomItem(formData: FormData) {
  const buildId = formData.get("buildId") as string;
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(buildId, access.userId);
  const category = formData.get("category") as string;
  const name = formData.get("name") as string;
  const weightRaw = formData.get("weight_g") as string;
  const priceRaw = formData.get("price_cad") as string;

  if (!name?.trim()) {
    throw new Error("Item name is required.");
  }

  await prisma.buildItem.create({
    data: {
      build: { connect: { id: buildId, userId: access.userId } },
      customCategory: category,
      gearNameSnapshot: name.trim(),
      weightSnapshot: weightRaw ? Number(weightRaw) : null,
      priceSnapshot: priceRaw ? Number(priceRaw) : null,
    },
  });

  await recordBuildRevision(buildId, access.userId, "gear", `Added custom item: ${name.trim()}`);
  redirect(`/build/${buildId}`);
}

export async function updateQuantity(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const delta = Number(formData.get("delta"));

  const item = await requireBuildItemAccess(buildId, itemId);
  await ensureBuildRevisionBaseline(buildId, item.accessUserId);

  if (!Number.isInteger(delta) || Math.abs(delta) !== 1) throw new Error("Invalid quantity change.");
  const newQuantity = Math.max(1, item.quantity + delta);

  await prisma.buildItem.update({
    where: { id: itemId, buildId, build: { userId: item.accessUserId } },
    data: { quantity: newQuantity },
  });

  await recordBuildRevision(buildId, item.accessUserId, "gear", "Changed gear quantity");
  revalidatePath(`/build/${buildId}`);
}
export async function claimCurrentBuild(formData?: FormData) {
  const userId = await currentBuildUserId();
  if (!userId) return;
  const cookieStore = await cookies();
  const submittedId = formData?.get("buildId");
  const buildId = typeof submittedId === "string" ? submittedId : cookieStore.get("currentBuild")?.value;
  if (!buildId || !(await hasGuestBuildAccess(buildId))) return;
  const result = await prisma.build.updateMany({
    where: { id: buildId, userId: null }, data: { userId },
  });
  if (result.count) {
    cookieStore.delete(guestBuildCookieName(buildId));
    revalidatePath(`/build/${buildId}`);
    revalidatePath("/profile/builds");
  }
}
export async function createBuild(formData: FormData) {
  const ownerId = await currentBuildUserId();

  const name = formData.get("name")?.toString().trim();

  if (!name) {
    throw new Error("Build name is required.");
  }

  const startDateRaw = formData.get("startDate")?.toString();
  const endDateRaw = formData.get("endDate")?.toString();
  const peopleRaw = formData.get("people")?.toString();
  const minTemperatureRaw =
    formData.get("minTemperature")?.toString();
  const conditions = formData.get("conditions")?.toString();

  const destinationIdRaw =
    formData.get("destinationId")?.toString() || null;

  const selectedDestination = getDestination(destinationIdRaw);


  const submittedLocation =
    formData.get("location")?.toString().trim();

  const submittedLat =
    formData.get("locationLat")?.toString();

  const submittedLng =
    formData.get("locationLng")?.toString();

  const location = selectedDestination
    ? `${selectedDestination.name}, ${selectedDestination.park}`
    : submittedLocation || null;

  const locationLat = selectedDestination
    ? selectedDestination.latitude
    : submittedLat
      ? Number(submittedLat)
      : null;

  const locationLng = selectedDestination
    ? selectedDestination.longitude
    : submittedLng
      ? Number(submittedLng)
      : null;

  const dates = parseDates(startDateRaw ?? "", endDateRaw ?? "");
  const build = await prisma.build.create({
    data: {
      name,
      destinationId: selectedDestination?.id ?? null,
      location,
      locationLat,
      locationLng,
      ...dates,
      people: peopleRaw ? Number(peopleRaw) : 1,
      minTemperature: minTemperatureRaw
        ? Number(minTemperatureRaw)
        : null,
      conditions: conditions || null,
      userId: ownerId,
    },
  });

  if (build.startDate && build.endDate) {
    const range = getDateRange(
      build.startDate,
      build.endDate,
    );

    await prisma.tripDay.createMany({
      data: range.map((date) => ({
        buildId: build.id,
        date,
      })),
      skipDuplicates: true,
    });
  }

  await recordBuildRevision(build.id, ownerId, "create", "Created build");
  await setCurrentBuild(build.id, !ownerId);

  redirect(`/build/${build.id}`);
}
export async function addGear(formData: FormData) {
  const buildId = formData.get("buildId") as string;
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(buildId, access.userId);
  const gearId = formData.get("gearId") as string;

  await prisma.buildItem.upsert({
    where: {
      buildId_gearId: { buildId, gearId },
      build: { userId: access.userId },
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      build: { connect: { id: buildId, userId: access.userId } },
      gear: { connect: { id: gearId } },
    },
  });

  await recordBuildRevision(buildId, access.userId, "gear", "Added gear");
  redirect(`/build/${buildId}`);
}

export async function removeGear(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const item = await requireBuildItemAccess(buildId, itemId);
  await ensureBuildRevisionBaseline(buildId, item.accessUserId);

  await prisma.buildItem.delete({
    where: {
      id: itemId,
      buildId,
      build: { userId: item.accessUserId },
    },
  });

  await recordBuildRevision(buildId, item.accessUserId, "gear", "Removed gear");
  redirect(`/build/${buildId}`);
}

export async function updateTripDetails(formData: FormData) { return saveTripDetails(formData); }
export async function updateTripDay(formData: FormData) { return saveTripDay(formData); }

```

### `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/app/profile/actions.ts`

```typescript
"use server";

import { setCurrentBuild } from "@/lib/build-access";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ensureBuildRevisionBaseline, recordBuildRevision } from "@/lib/build-history";

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
  await ensureBuildRevisionBaseline(buildId, user.id);
  await prisma.build.updateMany({ where: { id: buildId, userId: user.id }, data: { name: name.slice(0, 80) } });
  await recordBuildRevision(buildId, user.id, "settings", "Renamed build");
  revalidatePath("/profile");
  revalidatePath("/profile/builds");
}

export async function duplicateProfileBuild(formData: FormData) {
  const user = await currentUser();
  const buildId = String(formData.get("buildId") || "");
  const original = await prisma.build.findFirst({ where: { id: buildId, userId: user.id }, include: { items: true, days: true } });
  if (!original) throw new Error("Build not found.");
  const copy = await prisma.build.create({
    data: {
      name: `${original.name} (copy)`,
      userId: user.id,
      location: original.location,
      locationLat: original.locationLat,
      locationLng: original.locationLng,
      startDate: original.startDate,
      endDate: original.endDate,
      people: original.people,
      minTemperature: original.minTemperature,
      conditions: original.conditions,
      items: {
        create: original.items.map(
          ({ gearId, quantity, isConsumable, isWorn, customCategory, gearNameSnapshot, weightSnapshot, priceSnapshot }) => ({
            gearId,
            quantity,
            isConsumable,
            isWorn,
            customCategory,
            gearNameSnapshot,
            weightSnapshot,
            priceSnapshot,
          }),
        ),
      },
      days: {
        create: original.days.map(({ date, minTemperature, conditions, notes }) => ({
          date,
          minTemperature,
          conditions,
          notes,
        })),
      },
    },
  });
  await recordBuildRevision(copy.id, user.id, "copy", `Created from ${original.name}`);
  await setCurrentBuild(copy.id);
  redirect(`/build/${copy.id}`);
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

### `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/app/profile/gear/actions.ts`

```typescript
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ensureBuildRevisionBaseline, recordBuildRevision } from "@/lib/build-history";

async function userId() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("You must be signed in.");
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) throw new Error("User not found.");
  return user.id;
}

function gearIdFrom(formData: FormData) {
  const gearId = String(formData.get("gearId") || "");
  if (!gearId) throw new Error("Gear item is required.");
  return gearId;
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
  await prisma.$transaction([
    prisma.ownedGear.upsert({ where: { userId_gearId: { userId: userIdValue, gearId } }, update: {}, create: { userId: userIdValue, gearId } }),
    prisma.favorite.deleteMany({ where: { userId: userIdValue, gearId } }),
  ]);
  refreshGearPages(gearId);
}

export async function addGearToCurrentBuild(formData: FormData) {
  const userIdValue = await userId();
  const gearId = gearIdFrom(formData);
  const buildId = (await cookies()).get("currentBuild")?.value;
  if (!buildId) redirect("/profile/builds");
  const build = await prisma.build.findFirst({ where: { id: buildId, userId: userIdValue }, select: { id: true } });
  if (!build) redirect("/profile/builds");
  await ensureBuildRevisionBaseline(build.id, userIdValue);
  await prisma.buildItem.upsert({
    where: { buildId_gearId: { buildId: build.id, gearId } },
    update: { quantity: { increment: 1 } },
    create: { buildId: build.id, gearId },
  });
  await recordBuildRevision(build.id, userIdValue, "gear", "Added gear from library");
  revalidatePath(`/build/${build.id}`);
  redirect(`/build/${build.id}`);
}

```

### `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/components/builder/BuildDataTools.tsx`

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
import { getBuildExport, importBuildItems } from "@/app/build/actions";
import { getBuildHistory, restoreBuildRevision } from "@/lib/build-history-actions";

type Tool = "import" | "export" | "history";
type ImportMode = "merge" | "replace";

type ImportPreview = {
  name: string;
  itemCount: number;
  dayCount: number;
  version: number | null;
  fullBuild: boolean;
};

type SelectedImport = {
  fileName: string;
  size: number;
  text: string;
  preview: ImportPreview;
};

type HistoryEntry = {
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

function inspectImport(text: string): ImportPreview {
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
    fullBuild: version === 2 || Array.isArray(parsed.days) || "routeWaypoints" in parsed || "tripLogistics" in parsed,
  };
}

function bytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function safeFileName(name: string) {
  const base = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${base || "trailpicker-build"}.json`;
}

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
        result.mode === "replace"
          ? `Imported ${result.itemCount} item${result.itemCount === 1 ? "" : "s"}.`
          : `Added ${result.itemCount} item${result.itemCount === 1 ? "" : "s"}.`,
      );
      setSelectedImport(null);
      if (fileInput.current) fileInput.current.value = "";
      setHistory([]);
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
      await restoreBuildRevision(buildId, entry.id);
      setConfirmRestore(null);
      await loadHistory();
      router.refresh();
    } catch {
      setHistoryError("Couldn’t restore that version.");
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
              <div className="space-y-4">
                <div className="flex justify-end">
                  <button type="button" onClick={() => void loadHistory()} disabled={historyLoading} className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50">
                    Refresh
                  </button>
                </div>

                {historyLoading && history.length === 0 && (
                  <div className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-12 text-sm text-gray-500"><Loader2 className="h-4 w-4 animate-spin" />Loading…</div>
                )}
                {historyError && <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{historyError}</p>}

                {!historyLoading && !historyError && history.length === 0 && (
                  <div className="rounded-xl border border-dashed border-gray-300 px-6 py-10 text-center">
                    <History className="mx-auto h-7 w-7 text-gray-400" />
                    <p className="mt-3 text-sm font-semibold text-gray-800">No history yet</p>
                  </div>
                )}

                <div className="space-y-2">
                  {history.map((entry) => {
                    const Icon = historyIcon(entry.action);
                    const confirming = confirmRestore === entry.id;
                    return (
                      <div key={entry.id} className={`rounded-xl border p-4 ${entry.isCurrent ? "border-green-200 bg-green-50/50" : "border-gray-200 bg-white"}`}>
                        <div className="flex items-start gap-3">
                          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${entry.isCurrent ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-semibold text-gray-900">{entry.summary}</p>
                              {entry.isCurrent && <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-800">Current</span>}
                            </div>
                            <p className="mt-1 text-xs text-gray-500">{new Date(entry.createdAt).toLocaleString()} · {entry.itemCount} gear · {entry.dayCount} day{entry.dayCount === 1 ? "" : "s"}</p>
                          </div>
                          {!entry.isCurrent && !confirming && (
                            <button type="button" onClick={() => setConfirmRestore(entry.id)} className="shrink-0 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                              Restore
                            </button>
                          )}
                        </div>

                        {confirming && (
                          <div className="mt-4 flex flex-col gap-3 rounded-lg bg-amber-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs leading-5 text-amber-900">Restore this version? Your current version will stay in history.</p>
                            <div className="flex shrink-0 gap-2">
                              <button type="button" onClick={() => setConfirmRestore(null)} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-white/70">Cancel</button>
                              <button type="button" onClick={() => void restore(entry)} disabled={Boolean(restoring)} className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 disabled:opacity-50">
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
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}

```

### `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/components/builder/ShareBar.tsx`

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, CopyCheck, Plus, Save } from "lucide-react";
import BuildSettings from "@/components/builder/BuildSettings";
import BuildDataTools from "@/components/builder/BuildDataTools";
import { duplicateBuild } from "@/app/build/actions";

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
      <div className="flex min-w-[280px] flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 shadow-inner shadow-gray-100/70">
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
          className="w-full truncate bg-transparent text-sm text-gray-700 outline-none"
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

### `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/lib/build-history-actions.ts`

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { requireBuildAccess } from "@/lib/build-access";
import {
  ensureBuildRevisionBaseline,
  recordBuildRevision,
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
  return { ...day, date };
}

export async function getBuildHistory(buildId: string) {
  const access = await requireBuildAccess(buildId);

  await ensureBuildRevisionBaseline(access.id, access.userId);

  const revisions = await prisma.buildRevision.findMany({
    where: { buildId: access.id },
    orderBy: { createdAt: "desc" },
    take: 30,
    select: { id: true, action: true, summary: true, snapshot: true, createdAt: true },
  });

  return revisions.map((revision, index) => {
    const snapshot = isRecord(revision.snapshot) ? revision.snapshot : null;
    const itemCount = snapshot && Array.isArray(snapshot.items) ? snapshot.items.length : 0;
    const dayCount = snapshot && Array.isArray(snapshot.days) ? snapshot.days.length : 0;
    const name = snapshot && typeof snapshot.name === "string" ? snapshot.name : "Build";

    return {
      id: revision.id,
      action: revision.action,
      summary: revision.summary,
      createdAt: revision.createdAt.toISOString(),
      itemCount,
      dayCount,
      name,
      isCurrent: index === 0,
    };
  });
}

export async function restoreBuildRevision(buildId: string, revisionId: string) {
  const access = await requireBuildAccess(buildId);
  if (typeof revisionId !== "string" || !revisionId || revisionId.length > 200) {
    throw new Error("Invalid history entry.");
  }

  const revision = await prisma.buildRevision.findFirst({
    where: { id: revisionId, buildId: access.id },
    select: { snapshot: true, createdAt: true },
  });
  if (!revision) throw new Error("History entry not found.");

  const snapshot = parseSnapshot(revision.snapshot);
  await recordBuildRevision(access.id, access.userId, "history", "Saved before restore");
  if (snapshot.items.length > 1000 || snapshot.days.length > 366) {
    throw new Error("This history entry is too large to restore.");
  }

  const items = snapshot.items.map(safeItem);
  const days = snapshot.days.map(safeDay);
  const requestedGearIds = [...new Set(items.map((item) => item.gearId).filter((id): id is string => Boolean(id)))];
  const existingGear = requestedGearIds.length
    ? await prisma.gear.findMany({ where: { id: { in: requestedGearIds } }, select: { id: true } })
    : [];
  const existingGearIds = new Set(existingGear.map((gear) => gear.id));

  await prisma.$transaction(async (tx) => {
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
        routeWaypoints: snapshot.routeWaypoints == null ? Prisma.DbNull : JSON.parse(JSON.stringify(snapshot.routeWaypoints)),
        tripLogistics: snapshot.tripLogistics == null ? Prisma.DbNull : JSON.parse(JSON.stringify(snapshot.tripLogistics)),
      },
    });

    await tx.buildItem.deleteMany({ where: { buildId: access.id } });
    for (const item of items) {
      const gearId = item.gearId && existingGearIds.has(item.gearId) ? item.gearId : null;
      await tx.buildItem.create({
        data: {
          buildId: access.id,
          gearId,
          quantity: item.quantity,
          isConsumable: item.isConsumable,
          isWorn: item.isWorn,
          customCategory: item.customCategory,
          gearNameSnapshot: gearId ? item.gearNameSnapshot : item.gearNameSnapshot ?? item.gearName ?? "Restored item",
          weightSnapshot: item.weightSnapshot,
          priceSnapshot: item.priceSnapshot,
        },
      });
    }

    await tx.tripDay.deleteMany({ where: { buildId: access.id } });
    if (days.length) {
      await tx.tripDay.createMany({
        data: days.map((day) => ({ ...day, buildId: access.id })),
      });
    }
  });

  const restoredDate = revision.createdAt.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });
  await recordBuildRevision(access.id, access.userId, "restore", `Restored version from ${restoredDate}`);
  revalidatePath(`/build/${access.id}`);
  revalidatePath("/profile/builds");

  return { ok: true };
}

```

### `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/lib/build-history.ts`

```typescript
import "server-only";

import { prisma } from "@/lib/prisma";

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

export async function getBuildSnapshot(buildId: string, userId: string | null): Promise<BuildSnapshot> {
  const build = await prisma.build.findUnique({
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


export async function ensureBuildRevisionBaseline(buildId: string, userId: string | null) {
  const count = await prisma.buildRevision.count({ where: { buildId } });
  if (count > 0) return;
  const snapshot = await getBuildSnapshot(buildId, userId);
  await prisma.buildRevision.create({
    data: {
      buildId,
      action: "history",
      summary: "Version history started",
      snapshot: JSON.parse(JSON.stringify(snapshot)),
    },
  });
}

export async function recordBuildRevision(
  buildId: string,
  userId: string | null,
  action: string,
  summary: string,
) {
  await prisma.build.update({ where: { id: buildId, userId }, data: { updatedAt: new Date() } });
  const snapshot = await getBuildSnapshot(buildId, userId);

  await prisma.buildRevision.create({
    data: {
      buildId,
      action: action.slice(0, 50),
      summary: summary.slice(0, 240),
      snapshot: JSON.parse(JSON.stringify(snapshot)),
    },
  });
}

```

### `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/lib/build-settings-actions.ts`

```typescript
"use server";

import { prisma } from "@/lib/prisma";
import { requireBuildAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { ensureBuildRevisionBaseline, recordBuildRevision } from "@/lib/build-history";

export async function renameBuild(buildId: string, name: string) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200 || typeof name !== "string") {
    throw new Error("Invalid build name.");
  }
  const trimmed = name.trim();
  if (!trimmed || trimmed.length > 100) throw new Error("Use a build name between 1 and 100 characters.");
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(access.id, access.userId);
  const result = await prisma.build.updateMany({
    where: { id: access.id, userId: access.userId },
    data: { name: trimmed },
  });
  if (result.count !== 1) throw new Error("Build access changed. Refresh and try again.");
  await recordBuildRevision(access.id, access.userId, "settings", "Renamed build");
  revalidatePath(`/build/${access.id}`);
  revalidatePath("/profile/builds");
}

```

### `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/lib/build-visibility-actions.ts`

```typescript
"use server";

import { prisma } from "@/lib/prisma";
import { requireBuildAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { ensureBuildRevisionBaseline, recordBuildRevision } from "@/lib/build-history";

export async function setBuildVisibility(buildId: string, isPublic: boolean) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200 || typeof isPublic !== "boolean") {
    throw new Error("Invalid visibility request.");
  }
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(access.id, access.userId);
  // Repeat the owner condition in the write to prevent a stale guest claim.
  const result = await prisma.build.updateMany({
    where: { id: access.id, userId: access.userId },
    data: { isPublic },
  });
  if (result.count !== 1) throw new Error("Build access changed. Refresh and try again.");
  await recordBuildRevision(access.id, access.userId, "settings", "Changed build visibility");
  revalidatePath(`/build/${access.id}`);
}

```

### `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/lib/trip-planner-actions.ts`

```typescript
"use server";
import { prisma } from "@/lib/prisma";
import { requireBuildAccess, requireTripDayAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { getDestination } from "@/lib/destinations";
import { getDateRange } from "@/lib/trip";
import { dayTextFields, emptyLogistics, nullableNumber, parseDates, readWaypoints } from "@/lib/trip-planner";
import { ensureBuildRevisionBaseline, recordBuildRevision } from "@/lib/build-history";
const text = (f: FormData, key: string, max = 5000) => { const v = f.get(key); if (v != null && typeof v !== "string") throw new Error(`Invalid ${key}.`); const s = (v ?? "").trim(); if (s.length > max) throw new Error(`${key} is too long (maximum ${max} characters).`); return s || null; };
const number = (f: FormData, key: string, min: number, max: number, integer = false) => nullableNumber(f.get(key),key,min,max,integer);
const condition = (f: FormData) => { const v = text(f,"conditions",20); if (v && !["dry","rain","snow"].includes(v)) throw new Error("Choose a valid weather condition."); return v; };
export async function saveTripDetails(f: FormData) {
  const buildId = text(f,"buildId",200)!;
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(buildId, access.userId);
  const dates = parseDates(text(f,"startDate",10) ?? "", text(f,"endDate",10) ?? "");
  const selected = getDestination(text(f,"destinationId",200));
  const lat = selected?.latitude ?? number(f,"locationLat",-90,90), lng = selected?.longitude ?? number(f,"locationLng",-180,180);
  if ((lat == null) !== (lng == null)) throw new Error("Provide both location coordinates.");
  const data = { ...dates, destinationId: selected?.id ?? null, location: selected ? `${selected.name}, ${selected.park}` : text(f,"location",500), locationLat: lat, locationLng: lng, people: number(f,"people",1,100,true) ?? 1, minTemperature: number(f,"minTemperature",-100,60,true), conditions: condition(f) };
  await prisma.$transaction(async tx => {
    const old = await tx.tripDay.findMany({ where: { buildId }, select: { date: true } });
    const range = dates.startDate && dates.endDate ? getDateRange(dates.startDate,dates.endDate) : [];
    const keys = new Set(range.map(d => d.getTime()));
    if (old.some(d => !keys.has(d.date.getTime())) && f.get("confirmDateChange") !== "yes") throw new Error("The new dates remove itinerary days. Tick the confirmation box to discard those days. Days still within the range will be kept.");
    await tx.build.update({ where: { id: buildId, userId: access.userId }, data });
    if (range.length) await tx.tripDay.createMany({ data: range.map(date => ({ buildId,date })), skipDuplicates: true });
    await tx.tripDay.deleteMany({ where: { buildId, date: { notIn: range } } });
  });
  await recordBuildRevision(buildId, access.userId, "trip", "Updated trip details");
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripDay(f: FormData) {
  const buildId = text(f,"buildId",200)!, dayId = text(f,"dayId",200)!;
  const day = await requireTripDayAccess(buildId,dayId);
  await ensureBuildRevisionBaseline(buildId, day.accessUserId);
  const strings = Object.fromEntries(dayTextFields.map(key => [key,text(f,key)]));
  await prisma.tripDay.update({ where: { id: dayId, buildId, build: { userId: day.accessUserId } }, data: { ...strings, conditions: condition(f), minTemperature: number(f,"minTemperature",-100,60,true), distanceKm: number(f,"distanceKm",0,1000), elevationGainM: number(f,"elevationGainM",0,20000,true), elevationLossM: number(f,"elevationLossM",0,20000,true), durationMinutes: number(f,"durationMinutes",0,1440,true), waterCarryL: number(f,"waterCarryL",0,100) } });
  await recordBuildRevision(buildId, day.accessUserId, "itinerary", "Updated itinerary day");
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripRoute(f: FormData) {
  const buildId = text(f,"buildId",200)!, access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(buildId, access.userId);
  const raw: unknown = JSON.parse(text(f,"waypoints",100000) ?? "[]");
  const points = readWaypoints(raw);
  if (!Array.isArray(raw) || points.length !== raw.length || points.length > 200 || new Set(points.map(p=>p.id)).size !== points.length || points.some(p=>!p.name.trim() || p.name.length>200 || p.id.length>200 || (p.elevationM != null && (p.elevationM < -500 || p.elevationM > 9000)))) throw new Error("Check waypoint names, coordinates, elevations, and unique IDs. Maximum 200 waypoints.");
  await prisma.build.update({ where: { id: buildId,userId: access.userId }, data: { routeWaypoints: points.map(p=>({...p,name:p.name.trim()})) } });
  await recordBuildRevision(buildId, access.userId, "route", "Updated trip route");
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripLogistics(f: FormData) {
  const buildId = text(f,"buildId",200)!, access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(buildId, access.userId);
  const value = Object.fromEntries(Object.keys(emptyLogistics).map(key=>[key,text(f,key) ?? ""]));
  await prisma.build.update({ where: { id: buildId, userId: access.userId }, data: { tripLogistics: value } });
  await recordBuildRevision(buildId, access.userId, "logistics", "Updated trip logistics");
  revalidatePath(`/build/${buildId}`);
}

```

### `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/prisma/schema.prisma`

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

  gear Gear[]
  subcategories Subcategory[]
  createdAt DateTime @default(now())
}
model Subcategory {
  id         String   @id @default(cuid())
  name       String
  slug String
  categoryId String
  category   Category @relation(fields: [categoryId], references: [id])

  gear        Gear[]

  createdAt  DateTime @default(now())
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

  images GearImage[]
  specifications GearSpecification[]
  prices Price[]
  reviews Review[]
  buildItems BuildItem[]
  favorites Favorite[]
  ownedGear OwnedGear[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
model OwnedGear {
  id String @id @default(cuid())

  userId String
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  gearId String
  gear Gear @relation(fields: [gearId], references: [id], onDelete: Cascade)

  purchasedPrice Float?
  purchasedAt DateTime?
  notes String?

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
  username      String?    @unique
  email         String    @unique
  emailVerified DateTime?
  image         String?

  bio             String?
  location        String?
  isProfilePublic Boolean  @default(false)

  accounts Account[]
  sessions Session[]
  builds    Build[]
  reviews   Review[]
  favorites Favorite[]
  ownedGear OwnedGear[]

  createdAt DateTime @default(now())
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
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  @@unique([identifier, token])
}

model Build {
  isPublic Boolean @default(false)
  id String @id @default(cuid())

  name String

  userId String?
  user   User?   @relation(fields: [userId], references: [id])

  items     BuildItem[]
  days      TripDay[]
  revisions BuildRevision[]

  routeWaypoints Json?
  tripLogistics Json?

  destinationId String?

  location    String?
  locationLat Float?
  locationLng Float?
  startDate   DateTime?
  endDate     DateTime?

  people Int @default(1)

  minTemperature Int?
  conditions String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model BuildRevision {
  id String @id @default(cuid())

  buildId String
  build   Build @relation(fields: [buildId], references: [id], onDelete: Cascade)

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

  minTemperature Int?
  conditions     String?
  notes          String?
  startLocation String?
  endLocation String?
  distanceKm Float?
  elevationGainM Int?
  elevationLossM Int?
  durationMinutes Int?
  campsite String?
  reservation String?
  waterSource String?
  waterCarryL Float?
  trailConditions String?
  activities String?

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

### `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/tests/builder-ownership.test.cjs`

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
    buildItem: { findFirst: async ({ where }) => {
      const buildId = where.id === 'item-a' ? 'a' : where.id === 'item-b' ? 'b' : null;
      return buildId === where.buildId ? { id: where.id, buildId, quantity: 2 } : null;
    }, update: write('item.update'), delete: write('item.delete'), create: write('item.create'), upsert: write('item.upsert') },
    tripDay: { findFirst: async ({ where }) => where.id === 'day-a' && where.buildId === 'a' ? { id: 'day-a', buildId: 'a' } : null,
      update: write('day.update'), createMany: write('day.createMany'), deleteMany: write('day.deleteMany') },
  };
  const navigation = { notFound: () => { throw new Error('404'); }, redirect: url => { throw new Error(`REDIRECT:${url}`); } };
  const access = load('lib/build-access.ts', { '@/auth': {auth: async () => state.email ? {user:{email:state.email}} : null},
    '@/lib/prisma': { prisma }, 'next/headers': {cookies:async()=>cookieStore}, 'next/navigation': navigation, '@/lib/guest-build-token': token });
  const planner = load('lib/trip-planner.ts');
  const history = { ensureBuildRevisionBaseline: async () => {}, recordBuildRevision: async () => {}, getBuildSnapshot: async (buildId, userId) => {
    const b = state.builds.find(build => build.id === buildId && build.userId === userId);
    if (!b) throw new Error('Build not found.');
    return { name:b.name, destinationId:null, location:null, locationLat:null, locationLng:null, startDate:null, endDate:null, people:1, minTemperature:null, conditions:null, routeWaypoints:null, tripLogistics:null, items:b.items || [], days:b.days || [] };
  } };
  const plannerActions = load('lib/trip-planner-actions.ts', { '@/lib/prisma':{prisma}, '@/lib/build-access':access, 'next/cache':{revalidatePath:()=>{}}, '@/lib/destinations':{getDestination:()=>null}, '@/lib/trip':{getDateRange:()=>[]}, '@/lib/trip-planner':planner, '@/lib/build-history':history });
  const actions = load('app/build/actions.ts', {'@/lib/prisma':{prisma}, '@/lib/trip-planner-actions':plannerActions, '@/lib/trip-planner':planner, 'next/navigation': navigation,
    'next/headers':{cookies:async()=>cookieStore}, 'next/cache':{revalidatePath:()=>{}}, '@/lib/trip':{getDateRange:()=>[]},
    '@/lib/build-access':access, '@/lib/guest-build-token':token, '@/lib/destinations':{getDestination:()=>null}, '@/lib/build-history':history, '@/app/generated/prisma/client':{Prisma:{DbNull:null}} });
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
    await assert.rejects(actions[name](form({buildId:'b', itemId:'item-b', dayId:'day-b', payload:'invalid JSON', delta:1})), /Build not found/);
    assert.deepEqual(state.writes, []);
  });
}
for (const name of ['setItemCategory','updateQuantity','removeGear']) {
  test(`${name} rejects another build's item paired with owned build`, async () => {
    const {state,actions}=harness();
    await assert.rejects(actions[name](form({buildId:'a',itemId:'item-b',delta:1})), /Item not found/);
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
  assert.equal(state.writes[0].args.data.quantity,3);
});
for (const name of ['getBuildExport','importBuildItems','duplicateBuild','addCustomItem','addGear','updateTripDetails','setItemCategory','updateQuantity','removeGear','updateTripDay']) {
  test(`${name} rejects anonymous access to account build`, async () => {
    const {state,actions}=harness();state.email=null;state.cookies.set('currentBuild','a');
    const input = name === 'getBuildExport' ? 'a' : form({buildId:'a',itemId:'item-a',dayId:'day-a',payload:'{}',delta:1});
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

### `.trailpicker-backups/import-export-history-2026-10-03T05-05-59-627Z/tests/trip-planner.test.cjs`

```typescript
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {stripTypeScriptTypes}=require('node:module');
function load(file,deps={}){let js=stripTypeScriptTypes(fs.readFileSync(path.join(__dirname,'..',file),'utf8'));const names=[...js.matchAll(/export (?:async )?function (\w+)|export const (\w+)/g)].map(m=>m[1]||m[2]);js=js.replace(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];/g,(_,n,s)=>`const {${n}}=require(${JSON.stringify(s)});`).replace(/export /g,'');return new Function('require',js+`\nreturn {${names.join(',')}};`)(s=>s in deps?deps[s]:require(s));}
const p=load('lib/trip-planner.ts'),trip=load('lib/trip.ts');
const form=o=>{const f=new FormData();Object.entries(o).forEach(([k,v])=>f.set(k,String(v)));return f;};
function harness(){const writes=[], old=[{date:new Date('2026-07-01')},{date:new Date('2026-07-02')}];const tx={build:{update:async x=>writes.push(['build',x])},tripDay:{findMany:async()=>old,createMany:async x=>writes.push(['create',x]),deleteMany:async x=>writes.push(['delete',x]),update:async x=>writes.push(['day',x])}};const prisma={...tx,$transaction:async fn=>fn(tx)};const a=load('lib/trip-planner-actions.ts',{'@/lib/prisma':{prisma},'@/lib/build-access':{requireBuildAccess:async id=>{if(id!=='owned')throw Error('Build not found.');return {userId:'owner'};},requireTripDayAccess:async(id,day)=>{if(id!=='owned'||day!=='day')throw Error('Day not found.');return {accessUserId:'owner'};}},'next/cache':{revalidatePath:()=>{}},'@/lib/destinations':{getDestination:()=>null},'@/lib/trip':trip,'@/lib/trip-planner':p,'@/lib/build-history':{ensureBuildRevisionBaseline:async()=>{},recordBuildRevision:async()=>{}}});return {a,writes};}
test('rejects reversed, incomplete, impossible and excessive dates',()=>{for(const [s,e] of [['2026-07-02','2026-07-01'],['2026-07-01',''],['2026-02-30','2026-03-01'],['2026-01-01','2028-01-01']])assert.throws(()=>p.parseDates(s,e));assert.equal(trip.getDateRange(...Object.values(p.parseDates('2026-03-07','2026-03-09'))).length,3);});
test('totals preserve zero and indicate partial distance coverage',()=>{const days=[{startLocation:'A',endLocation:'B',distanceKm:0,elevationGainM:10},{startLocation:'B',endLocation:'C',distanceKm:12.4,elevationLossM:5},{notes:'weather only'}];assert.deepEqual(p.tripTotals(days),{distanceKm:12.4,gainM:10,lossM:5,minutes:0,measuredDays:2,plannedDays:2});});
test('invalid numeric values rejected',()=>{for(const v of ['NaN','Infinity','abc',-1])assert.throws(()=>p.nullableNumber(v,'distance',0,1000));assert.equal(p.nullableNumber('0','distance',0,1000),0);assert.throws(()=>p.nullableNumber('1.5','minutes',0,1440,true));});
test('date shortening requires explicit confirmation before writes',async()=>{const {a,writes}=harness();await assert.rejects(a.saveTripDetails(form({buildId:'owned',startDate:'2026-07-02',endDate:'2026-07-03'})),/confirmation/);assert.equal(writes.length,0);await a.saveTripDetails(form({buildId:'owned',startDate:'2026-07-02',endDate:'2026-07-03',confirmDateChange:'yes'}));assert.equal(writes.length,3);assert.equal(writes[2][1].where.date.notIn.length,2);});
test('invalid day and unowned route never write',async()=>{const {a,writes}=harness();await assert.rejects(a.saveTripDay(form({buildId:'owned',dayId:'day',distanceKm:'NaN'})),/distanceKm/);await assert.rejects(a.saveTripRoute(form({buildId:'other',waypoints:'[]'})),/Build not found/);assert.equal(writes.length,0);});
test('day writes preserve zeros, nullable fields and ownership scope',async()=>{const {a,writes}=harness();await a.saveTripDay(form({buildId:'owned',dayId:'day',distanceKm:0,minTemperature:0,startLocation:' A '}));assert.equal(writes[0][1].data.distanceKm,0);assert.equal(writes[0][1].data.minTemperature,0);assert.equal(writes[0][1].data.startLocation,'A');assert.equal(writes[0][1].where.build.userId,'owner');});
test('route validation rejects out of range coordinates and duplicate IDs',async()=>{const {a,writes}=harness(),point={id:'one',name:'Camp',kind:'camp',lat:49,lng:-123,elevationM:900};for(const points of [[{...point,lat:91}],[point,point]])await assert.rejects(a.saveTripRoute(form({buildId:'owned',waypoints:JSON.stringify(points)})),/waypoint/);assert.equal(writes.length,0);await a.saveTripRoute(form({buildId:'owned',waypoints:JSON.stringify([point])}));assert.deepEqual(writes[0][1].data.routeWaypoints,[point]);});
test('logistics are bounded and stored on owned build',async()=>{const {a,writes}=harness();await assert.rejects(a.saveTripLogistics(form({buildId:'owned',emergencyContact:'x'.repeat(5001)})),/too long/);await a.saveTripLogistics(form({buildId:'owned',parking:'Lot A'}));assert.equal(writes[0][1].data.tripLogistics.parking,'Lot A');assert.equal(writes[0][1].where.userId,'owner');});

```

### `app/api/auth/[...nextauth]/route.ts`

```typescript
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
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
  summarizeCompatibility,
} from "@/lib/compatibility";
import TripPlanner from "@/components/builder/TripPlanner/TripPlanner";

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
  const summary = summarizeCompatibility(issues);

  if (!view.canEdit) {
    return <PublicBuildView build={{ ...build, tripLogistics: undefined, days: build.days.map(day => ({ ...day, reservation: null })) }} activeTab={activeTab}
      compatBuild={compatBuild} compatItems={compatItems}
      issueCount={summary.errors + summary.warnings} />;
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
        issueCount={summary.errors + summary.warnings}
      />

      <div className="mx-auto mt-4 max-w-screen-2xl px-4">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <CompatibilityBar
            build={compatBuild}
            items={compatItems}
            days={build.days}
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

              <BuildRow name="Backpack" gearLink="/gear/packs" selectCategory="packs" categoryName="Packs" buildId={build.id}
                items={build.items.filter((i) => i.gear?.category.name === "Packs" || i.customCategory === "Packs")} />
              <BuildRow name="Shelter" gearLink="/gear/shelter" selectCategory="shelter" categoryName="Shelter" buildId={build.id}
                items={build.items.filter((i) => i.gear?.category.name === "Shelter" || i.customCategory === "Shelter")} />
              <BuildRow name="Sleep System" gearLink="/gear/sleep" selectCategory="sleep" categoryName="Sleep" buildId={build.id}
                items={build.items.filter((i) => i.gear?.category.name === "Sleep" || i.customCategory === "Sleep")} />
              <BuildRow name="Cooking" gearLink="/gear/cooking" selectCategory="cooking" categoryName="Cooking" buildId={build.id}
                items={build.items.filter((i) => i.gear?.category.name === "Cooking" || i.customCategory === "Cooking")} />
              <BuildRow name="Water" gearLink="/gear/water" selectCategory="water" categoryName="Water" buildId={build.id}
                items={build.items.filter((i) => i.gear?.category.name === "Water" || i.customCategory === "Water")} />
              <BuildRow name="Clothing" gearLink="/gear/clothing" selectCategory="clothing" categoryName="Clothing" buildId={build.id}
                items={build.items.filter((i) => i.gear?.category.name === "Clothing" || i.customCategory === "Clothing")} />
              <BuildRow name="Electronics" gearLink="/gear/electronics" selectCategory="electronics" categoryName="Electronics" buildId={build.id}
                items={build.items.filter((i) => i.gear?.category.name === "Electronics" || i.customCategory === "Electronics")} />
              <BuildRow name="Miscellaneous" gearLink="/gear/misc" selectCategory="misc" categoryName="Misc" buildId={build.id}
                items={build.items.filter((i) => i.gear?.category.name === "Misc" || i.customCategory === "Misc")} />

              <CostSummary totalCost={totalCost} />
            </div>

            <WeightSummary
              base={base}
              consumable={consumable}
              worn={worn}
              total={total}
              totalCost={totalCost}
            />

            <CompatibilityDetails
              build={compatBuild}
              items={compatItems}
              days={build.days}
            />
          </>

        )}

      </main>

    </div>
  );
}



```

### `app/build/[id]/select/[category]/[subcategory]/page.tsx`

```typescript
import { redirectGearSelection } from "@/lib/legacy-gear-selection";
import type { GearBrowseSearch } from "@/components/builder/OriginalGearPicker";

export default async function SelectGearPage({ params, searchParams }: {
  params: Promise<{ id: string; category: string; subcategory: string }>;
  searchParams: Promise<GearBrowseSearch>;
}) {
  const [{ id, category, subcategory }, filters] = await Promise.all([params, searchParams]);
  return redirectGearSelection(id, category, filters, subcategory);
}

```

### `app/build/[id]/select/[category]/page.tsx`

```typescript
import { redirectGearSelection } from "@/lib/legacy-gear-selection";
import type { GearBrowseSearch } from "@/components/builder/OriginalGearPicker";

export default async function SelectCategoryPage({ params, searchParams }: {
  params: Promise<{ id: string; category: string }>;
  searchParams: Promise<GearBrowseSearch>;
}) {
  const [{ id, category }, filters] = await Promise.all([params, searchParams]);
  return redirectGearSelection(id, category, filters);
}

```

### `app/build/actions.ts`

```typescript
"use server";

import { saveTripDetails, saveTripDay } from "@/lib/trip-planner-actions";
import { parseDates } from "@/lib/trip-planner";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getDateRange } from "@/lib/trip";
import { currentBuildUserId, hasGuestBuildAccess, requireBuildAccess, requireBuildItemAccess, setCurrentBuild } from "@/lib/build-access";
import { guestBuildCookieName } from "@/lib/guest-build-token";
import { getDestination } from "@/lib/destinations";
import { Prisma } from "@/app/generated/prisma/client";
import { ensureBuildRevisionBaseline, getBuildSnapshot, recordBuildRevision } from "@/lib/build-history";

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
  const date = importDate(day.date);
  if (!date) throw new Error("Imported itinerary day is missing a date.");
  const text = (key: string, max = 5000) => optionalText(day[key], max);
  return {
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
    version: 2,
    exportedAt: new Date().toISOString(),
    ...snapshot,
  };
}

export async function importBuildItems(formData: FormData) {
  const buildId = formData.get("buildId")?.toString() ?? "";
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(access.id, access.userId);
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
  const requestedGearIds = [...new Set(items.map((item) => item.gearId).filter((id): id is string => Boolean(id)))];
  const existingGear = requestedGearIds.length
    ? await prisma.gear.findMany({ where: { id: { in: requestedGearIds } }, select: { id: true } })
    : [];
  const existingGearIds = new Set(existingGear.map((gear) => gear.id));

  await prisma.$transaction(async (tx) => {
    if (mode === "replace") {
      const startDate = importDate(payload.startDate);
      const endDate = importDate(payload.endDate);
      if ((startDate == null) !== (endDate == null) || (startDate && endDate && endDate < startDate)) {
        throw new Error("Imported trip dates are invalid.");
      }

      const name = optionalText(payload.name, 100) ?? "Imported build";
      const people = optionalNumber(payload.people, 1, 100, true) ?? 1;
      const location = optionalText(payload.location, 500);
      const locationLat = optionalNumber(payload.locationLat, -90, 90);
      const locationLng = optionalNumber(payload.locationLng, -180, 180);
      if ((locationLat == null) !== (locationLng == null)) throw new Error("Imported coordinates must include latitude and longitude.");

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
          routeWaypoints: payload.routeWaypoints == null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.routeWaypoints)),
          tripLogistics: payload.tripLogistics == null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.tripLogistics)),
        },
      });

      await tx.buildItem.deleteMany({ where: { buildId: access.id } });
      await tx.tripDay.deleteMany({ where: { buildId: access.id } });

      if (days) {
        if (days.length) await tx.tripDay.createMany({ data: days.map((day) => ({ ...day, buildId: access.id })) });
      } else if (startDate && endDate) {
        const range = getDateRange(startDate, endDate);
        if (range.length) await tx.tripDay.createMany({ data: range.map((date) => ({ buildId: access.id, date })) });
      }
    }

    for (const item of items) {
      const gearId = item.gearId && existingGearIds.has(item.gearId) ? item.gearId : null;
      if (mode === "merge" && gearId) {
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

  await recordBuildRevision(
    access.id,
    access.userId,
    "import",
    mode === "replace" ? `Imported and replaced build with ${items.length} gear item${items.length === 1 ? "" : "s"}` : `Imported ${items.length} gear item${items.length === 1 ? "" : "s"}`,
  );
  revalidatePath(`/build/${access.id}`);
  revalidatePath("/profile/builds");

  return { mode, itemCount: items.length, dayCount: days?.length ?? 0 };
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

  const copy = await prisma.build.create({
    data: {
      name: `${original.name} (copy)`,
      userId: ownerId,
      locationLat: original.locationLat,
      locationLng: original.locationLng,
      location: original.location,
      startDate: original.startDate,
      endDate: original.endDate,
      people: original.people,
      minTemperature: original.minTemperature,
      conditions: original.conditions,
      routeWaypoints: original.routeWaypoints ?? undefined,
      tripLogistics: original.tripLogistics ?? undefined,
      days: { create: original.days.map(({ id: _id, buildId: _buildId, createdAt: _createdAt, updatedAt: _updatedAt, ...day }) => day) },
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

  await recordBuildRevision(copy.id, ownerId, "copy", `Created from ${original.name}`);
  await setCurrentBuild(copy.id, !ownerId);
  redirect(`/build/${copy.id}`);
}
export async function setItemCategory(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const item = await requireBuildItemAccess(buildId, itemId);
  await ensureBuildRevisionBaseline(buildId, item.accessUserId);
  const category = formData.get("category") as "base" | "worn" | "consumable";

  await prisma.buildItem.update({
    where: { id: itemId, buildId, build: { userId: item.accessUserId } },
    data: {
      isWorn: category === "worn",
      isConsumable: category === "consumable",
    },
  });

  await recordBuildRevision(buildId, item.accessUserId, "gear", "Changed gear category");
  revalidatePath(`/build/${buildId}`);
}

export async function addCustomItem(formData: FormData) {
  const buildId = formData.get("buildId") as string;
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(buildId, access.userId);
  const category = formData.get("category") as string;
  const name = formData.get("name") as string;
  const weightRaw = formData.get("weight_g") as string;
  const priceRaw = formData.get("price_cad") as string;

  if (!name?.trim()) {
    throw new Error("Item name is required.");
  }

  await prisma.buildItem.create({
    data: {
      build: { connect: { id: buildId, userId: access.userId } },
      customCategory: category,
      gearNameSnapshot: name.trim(),
      weightSnapshot: weightRaw ? Number(weightRaw) : null,
      priceSnapshot: priceRaw ? Number(priceRaw) : null,
    },
  });

  await recordBuildRevision(buildId, access.userId, "gear", `Added custom item: ${name.trim()}`);
  redirect(`/build/${buildId}`);
}

export async function updateQuantity(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const delta = Number(formData.get("delta"));

  const item = await requireBuildItemAccess(buildId, itemId);
  await ensureBuildRevisionBaseline(buildId, item.accessUserId);

  if (!Number.isInteger(delta) || Math.abs(delta) !== 1) throw new Error("Invalid quantity change.");
  const newQuantity = Math.max(1, item.quantity + delta);

  await prisma.buildItem.update({
    where: { id: itemId, buildId, build: { userId: item.accessUserId } },
    data: { quantity: newQuantity },
  });

  await recordBuildRevision(buildId, item.accessUserId, "gear", "Changed gear quantity");
  revalidatePath(`/build/${buildId}`);
}
export async function claimCurrentBuild(formData?: FormData) {
  const userId = await currentBuildUserId();
  if (!userId) return;
  const cookieStore = await cookies();
  const submittedId = formData?.get("buildId");
  const buildId = typeof submittedId === "string" ? submittedId : cookieStore.get("currentBuild")?.value;
  if (!buildId || !(await hasGuestBuildAccess(buildId))) return;
  const result = await prisma.build.updateMany({
    where: { id: buildId, userId: null }, data: { userId },
  });
  if (result.count) {
    cookieStore.delete(guestBuildCookieName(buildId));
    revalidatePath(`/build/${buildId}`);
    revalidatePath("/profile/builds");
  }
}
export async function createBuild(formData: FormData) {
  const ownerId = await currentBuildUserId();

  const name = formData.get("name")?.toString().trim();

  if (!name) {
    throw new Error("Build name is required.");
  }

  const startDateRaw = formData.get("startDate")?.toString();
  const endDateRaw = formData.get("endDate")?.toString();
  const peopleRaw = formData.get("people")?.toString();
  const minTemperatureRaw =
    formData.get("minTemperature")?.toString();
  const conditions = formData.get("conditions")?.toString();

  const destinationIdRaw =
    formData.get("destinationId")?.toString() || null;

  const selectedDestination = getDestination(destinationIdRaw);


  const submittedLocation =
    formData.get("location")?.toString().trim();

  const submittedLat =
    formData.get("locationLat")?.toString();

  const submittedLng =
    formData.get("locationLng")?.toString();

  const location = selectedDestination
    ? `${selectedDestination.name}, ${selectedDestination.park}`
    : submittedLocation || null;

  const locationLat = selectedDestination
    ? selectedDestination.latitude
    : submittedLat
      ? Number(submittedLat)
      : null;

  const locationLng = selectedDestination
    ? selectedDestination.longitude
    : submittedLng
      ? Number(submittedLng)
      : null;

  const dates = parseDates(startDateRaw ?? "", endDateRaw ?? "");
  const build = await prisma.build.create({
    data: {
      name,
      destinationId: selectedDestination?.id ?? null,
      location,
      locationLat,
      locationLng,
      ...dates,
      people: peopleRaw ? Number(peopleRaw) : 1,
      minTemperature: minTemperatureRaw
        ? Number(minTemperatureRaw)
        : null,
      conditions: conditions || null,
      userId: ownerId,
    },
  });

  if (build.startDate && build.endDate) {
    const range = getDateRange(
      build.startDate,
      build.endDate,
    );

    await prisma.tripDay.createMany({
      data: range.map((date) => ({
        buildId: build.id,
        date,
      })),
      skipDuplicates: true,
    });
  }

  await recordBuildRevision(build.id, ownerId, "create", "Created build");
  await setCurrentBuild(build.id, !ownerId);

  redirect(`/build/${build.id}`);
}
export async function addGear(formData: FormData) {
  const buildId = formData.get("buildId") as string;
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(buildId, access.userId);
  const gearId = formData.get("gearId") as string;

  await prisma.buildItem.upsert({
    where: {
      buildId_gearId: { buildId, gearId },
      build: { userId: access.userId },
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      build: { connect: { id: buildId, userId: access.userId } },
      gear: { connect: { id: gearId } },
    },
  });

  await recordBuildRevision(buildId, access.userId, "gear", "Added gear");
  redirect(`/build/${buildId}`);
}

export async function removeGear(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const item = await requireBuildItemAccess(buildId, itemId);
  await ensureBuildRevisionBaseline(buildId, item.accessUserId);

  await prisma.buildItem.delete({
    where: {
      id: itemId,
      buildId,
      build: { userId: item.accessUserId },
    },
  });

  await recordBuildRevision(buildId, item.accessUserId, "gear", "Removed gear");
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
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.05fr] gap-14 items-center">

        {/* Left — pitch */}
        <div>
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
        <div className="rounded-3xl bg-white shadow-2xl border overflow-hidden">
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
import OriginalGearPicker, { type GearBrowseSearch } from "@/components/builder/OriginalGearPicker";

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
import OriginalGearPicker, { type GearBrowseSearch } from "@/components/builder/OriginalGearPicker";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
  

export default async function GearDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<GearBrowseSearch>;
}) {

  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { slug: id.toLowerCase() }, select: { id: true } });
  if (category) return <OriginalGearPicker categorySlug={id} filters={await searchParams} />;


  const gear = await prisma.gear.findUnique({
    where: {
      id,
    },
    include: {
      brand: true,
      category: true,
      prices: {
        include: {
          retailer: true,
        },
      },
      reviews: true,
      specifications: true,
    },
  });


  if (!gear) {
    notFound();
  }


  return (
    <main className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold">
        {gear.name}
      </h1>

      <div className="mt-8 divide-y border-y">

        <p>
          Category:
          {" "}
          {gear.category.name}
        </p>


        <p>
          Weight:
          {" "}
          {gear.weight_g ?? "Unknown"}g
        </p>


        <p>
          Price:
          {" "}
          {gear.price_cad
            ? `$${gear.price_cad} CAD`
            : "Unknown"}
        </p>


        <p>
          Capacity:
          {" "}
          {gear.capacity_l
            ? `${gear.capacity_l}L`
            : "Unknown"}
        </p>


        <p>
          Season:
          {" "}
          {gear.season ?? "Unknown"}
        </p>

      </div>


      {gear.description && (
        <section className="mt-8">

          <h2 className="text-2xl font-bold">
            Description
          </h2>

          <p className="mt-2">
            {gear.description}
          </p>

        </section>
      )}


      {gear.prices.length > 0 && (
        <section className="mt-8">

          <h2 className="text-2xl font-bold">
            Retailers
          </h2>


          {gear.prices.map((price)=>(
            <div
              key={price.id}
              className="border rounded-lg p-4 mt-3"
            >

              <p>
                {price.retailer.name}
              </p>

              <p>
                ${price.price} {price.currency}
              </p>

            </div>
          ))}

        </section>
      )}

    </main>
  );
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
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>
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

import { setCurrentBuild } from "@/lib/build-access";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ensureBuildRevisionBaseline, recordBuildRevision } from "@/lib/build-history";

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
  await ensureBuildRevisionBaseline(buildId, user.id);
  await prisma.build.updateMany({ where: { id: buildId, userId: user.id }, data: { name: name.slice(0, 80) } });
  await recordBuildRevision(buildId, user.id, "settings", "Renamed build");
  revalidatePath("/profile");
  revalidatePath("/profile/builds");
}

export async function duplicateProfileBuild(formData: FormData) {
  const user = await currentUser();
  const buildId = String(formData.get("buildId") || "");
  const original = await prisma.build.findFirst({ where: { id: buildId, userId: user.id }, include: { items: true, days: true } });
  if (!original) throw new Error("Build not found.");
  const copy = await prisma.build.create({
    data: {
      name: `${original.name} (copy)`,
      userId: user.id,
      location: original.location,
      locationLat: original.locationLat,
      locationLng: original.locationLng,
      startDate: original.startDate,
      endDate: original.endDate,
      people: original.people,
      minTemperature: original.minTemperature,
      conditions: original.conditions,
      items: {
        create: original.items.map(
          ({ gearId, quantity, isConsumable, isWorn, customCategory, gearNameSnapshot, weightSnapshot, priceSnapshot }) => ({
            gearId,
            quantity,
            isConsumable,
            isWorn,
            customCategory,
            gearNameSnapshot,
            weightSnapshot,
            priceSnapshot,
          }),
        ),
      },
      days: {
        create: original.days.map(({ date, minTemperature, conditions, notes }) => ({
          date,
          minTemperature,
          conditions,
          notes,
        })),
      },
    },
  });
  await recordBuildRevision(copy.id, user.id, "copy", `Created from ${original.name}`);
  await setCurrentBuild(copy.id);
  redirect(`/build/${copy.id}`);
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
      {visible.length ? <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{visible.map((build) => <BuildCard key={build.id} build={build} />)}</div> : <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center"><h3 className="text-xl font-bold text-slate-900">No builds found</h3><p className="mt-2 text-sm text-slate-500">Try another filter or create a new backpacking trip.</p></div>}
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
      </form>
      {favorites.length ? <div className="mt-6 grid gap-4 xl:grid-cols-2">{favorites.map((item) => <GearLibraryCard key={item.id} gear={item.gear} addedAt={item.createdAt} mode="favorite" />)}</div> : <div className="mt-6 rounded-3xl border border-dashed border-pink-200 bg-white p-12 text-center"><Heart className="mx-auto h-9 w-9 text-pink-300" /><h3 className="mt-3 text-xl font-bold text-slate-900">Nothing saved yet</h3><p className="mt-2 text-sm text-slate-500">Favorite products while browsing gear and compare them later.</p><Link href="/gear" className="mt-5 inline-flex rounded-xl bg-green-900 px-4 py-2.5 text-sm font-semibold text-white">Explore gear</Link></div>}
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
import { ensureBuildRevisionBaseline, recordBuildRevision } from "@/lib/build-history";

async function userId() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("You must be signed in.");
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) throw new Error("User not found.");
  return user.id;
}

function gearIdFrom(formData: FormData) {
  const gearId = String(formData.get("gearId") || "");
  if (!gearId) throw new Error("Gear item is required.");
  return gearId;
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
  await prisma.$transaction([
    prisma.ownedGear.upsert({ where: { userId_gearId: { userId: userIdValue, gearId } }, update: {}, create: { userId: userIdValue, gearId } }),
    prisma.favorite.deleteMany({ where: { userId: userIdValue, gearId } }),
  ]);
  refreshGearPages(gearId);
}

export async function addGearToCurrentBuild(formData: FormData) {
  const userIdValue = await userId();
  const gearId = gearIdFrom(formData);
  const buildId = (await cookies()).get("currentBuild")?.value;
  if (!buildId) redirect("/profile/builds");
  const build = await prisma.build.findFirst({ where: { id: buildId, userId: userIdValue }, select: { id: true } });
  if (!build) redirect("/profile/builds");
  await ensureBuildRevisionBaseline(build.id, userIdValue);
  await prisma.buildItem.upsert({
    where: { buildId_gearId: { buildId: build.id, gearId } },
    update: { quantity: { increment: 1 } },
    create: { buildId: build.id, gearId },
  });
  await recordBuildRevision(build.id, userIdValue, "gear", "Added gear from library");
  revalidatePath(`/build/${build.id}`);
  redirect(`/build/${build.id}`);
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
        <Link href="/gear" className="flex items-center justify-center gap-2 rounded-xl bg-green-900 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800"><Plus className="h-4 w-4" />Browse gear</Link>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-medium text-slate-500">Items</p><p className="mt-1 text-xl font-bold text-slate-950">{owned.length}</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-medium text-slate-500">Total weight</p><p className="mt-1 text-xl font-bold text-slate-950">{(totalWeight / 1000).toFixed(2)} kg</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-medium text-slate-500">Retail value</p><p className="mt-1 text-xl font-bold text-slate-950">${totalValue.toFixed(0)}</p></div>
      </div>

      {activeBuild && <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">“Add to current build” will add gear to <b>{activeBuild.name}</b>.</p>}

      <form className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:grid-cols-[1fr_auto_auto_auto]">
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3"><Search className="h-4 w-4 text-slate-400" /><input name="q" defaultValue={params.q} placeholder="Search your gear" className="w-full py-2.5 text-sm outline-none" /></label>
        <select name="category" defaultValue={params.category || "all"} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="all">All categories</option>{categories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}</select>
        <select name="sort" defaultValue={params.sort || "newest"} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="newest">Recently added</option><option value="name">Name</option></select>
        <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">Apply</button>
      </form>

      {owned.length ? <div className="mt-6 grid gap-4 xl:grid-cols-2">{owned.map((item) => <GearLibraryCard key={item.id} gear={item.gear} addedAt={item.createdAt} mode="owned" hasCurrentBuild={Boolean(activeBuild)} />)}</div> : <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center"><PackageOpen className="mx-auto h-9 w-9 text-slate-300" /><h3 className="mt-3 text-xl font-bold text-slate-900">Your gear closet is empty</h3><p className="mt-2 text-sm text-slate-500">Open any product and choose “I own this.”</p><Link href="/gear" className="mt-5 inline-flex rounded-xl bg-green-900 px-4 py-2.5 text-sm font-semibold text-white">Browse gear</Link></div>}
    </div>
  );
}

```

### `app/profile/layout.tsx`

```typescript
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Backpack, Heart, LayoutDashboard, Settings, Star, UserRound } from "lucide-react";

const links = [
  { href: "/profile", label: "Overview", icon: LayoutDashboard },
  { href: "/profile/builds", label: "My Builds", icon: Backpack },
  { href: "/profile/gear", label: "My Gear", icon: UserRound },
  { href: "/profile/favorites", label: "Favorites", icon: Heart },
  { href: "/profile/reviews", label: "Reviews", icon: Star, disabled: true },
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
              <img src={user.image} alt="" className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white/15" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-600 text-3xl font-bold ring-4 ring-white/15">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-emerald-200">Your TrailPicker</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight">{displayName}</h1>
              <p className="mt-1 text-sm text-emerald-100/80">
                {user.username ? `@${user.username}` : "Choose a username"}
                {user.location ? ` · ${user.location}` : ""}
                {` · Joined ${user.createdAt.toLocaleDateString(undefined, { month: "short", year: "numeric" })}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
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
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { name: true, _count: { select: { ownedGear: true, favorites: true } }, builds: { orderBy: { updatedAt: "desc" }, take: 6, include: { items: { include: { gear: { select: { weight_g: true, price_cad: true } } } } } } } });
  if (!user) redirect("/api/auth/signin?callbackUrl=/profile");
  const upcoming = user.builds.filter((build) => buildStatus(build) === "upcoming").sort((a, b) => a.startDate!.getTime() - b.startDate!.getTime())[0];
  const recent = user.builds.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-green-700">Dashboard</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Welcome back, {user.name?.split(" ")[0] || "explorer"}</h2></div><Link href="/build" className="flex items-center gap-2 rounded-xl bg-green-900 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800"><Plus className="h-4 w-4" />New trip</Link></div>

      {upcoming ? (() => { const totals = summarizeBuild(upcoming); return (
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 to-green-950 text-white shadow-lg">
          <div className="grid gap-6 p-7 md:grid-cols-[1fr_auto] md:items-end"><div><div className="flex items-center gap-2 text-sm font-semibold text-emerald-300"><CalendarClock className="h-4 w-4" />Upcoming trip</div><h3 className="mt-3 text-3xl font-bold">{upcoming.name}</h3><p className="mt-2 text-emerald-100/75">{upcoming.location || "Location not set"}</p><div className="mt-6 flex flex-wrap gap-3"><span className="rounded-xl bg-white/10 px-4 py-2 text-sm">Base <b>{weightLabel(totals.base)}</b></span><span className="rounded-xl bg-white/10 px-4 py-2 text-sm">Total <b>{weightLabel(totals.total)}</b></span><span className="rounded-xl bg-white/10 px-4 py-2 text-sm"><b>{totals.itemCount}</b> items</span></div></div><Link href={`/build/${upcoming.id}`} className="flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-bold text-green-950 hover:bg-emerald-300">Continue packing <ArrowRight className="h-4 w-4" /></Link></div>
        </section>); })() : (
        <section className="rounded-3xl border border-dashed border-emerald-300 bg-emerald-50/60 p-8 text-center"><CircleCheckBig className="mx-auto h-9 w-9 text-emerald-700" /><h3 className="mt-3 text-xl font-bold text-slate-950">No upcoming trip yet</h3><p className="mt-1 text-sm text-slate-600">Create a trip and your next packing plan will appear here.</p><Link href="/build" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-900 px-4 py-2.5 text-sm font-semibold text-white"><Plus className="h-4 w-4" />Create a trip</Link></section>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/profile/gear" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-300"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800"><PackageCheck className="h-5 w-5" /></span><span><span className="block text-lg font-bold text-slate-950">My Gear</span><span className="text-sm text-slate-500">{user._count.ownedGear} owned items</span></span><ArrowRight className="ml-auto h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-700" /></Link>
        <Link href="/profile/favorites" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-pink-300"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-100 text-pink-700"><Heart className="h-5 w-5" /></span><span><span className="block text-lg font-bold text-slate-950">Favorites</span><span className="text-sm text-slate-500">{user._count.favorites} saved items</span></span><ArrowRight className="ml-auto h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-pink-600" /></Link>
      </div>

      <section><div className="mb-4 flex items-center justify-between"><div><p className="text-sm font-semibold text-green-700">Keep planning</p><h3 className="mt-1 text-2xl font-bold text-slate-950">Recent builds</h3></div><Link href="/profile/builds" className="flex items-center gap-1 text-sm font-semibold text-green-800 hover:underline">View all <ArrowRight className="h-4 w-4" /></Link></div>
        {recent.length ? <div className="grid gap-4 xl:grid-cols-3">{recent.map((build) => <BuildCard key={build.id} build={build} />)}</div> : <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500"><Backpack className="mx-auto mb-3 h-8 w-8 text-slate-300" />Your saved builds will appear here.</div>}
      </section>
    </div>
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
// components/build/CreateTripDetails.tsx
"use client";
import DestinationPicker from "./DestinationPicker";
import DateRangePicker from "./DateRangePicker";

import { useState } from "react";

const icons = {
    pin: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.1-7-11a7 7 0 1114 0c0 4.9-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    calendar: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
            <rect x="3" y="5" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v4M16 3v4M3 10h18" />
        </svg>
    ),
    users: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M13 7a4 4 0 11-8 0 4 4 0 018 0zM22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
    ),
    thermometer: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />
        </svg>
    ),
    cloud: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 19a4.5 4.5 0 000-9 6 6 0 00-11.4 1.5A4 4 0 006 19h11.5z" />
        </svg>
    ),
    chevron: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
    ),
};

function FieldShell({
    icon,
    label,
    children,
}: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-lg border bg-white p-2.5 transition focus-within:ring-2 focus-within:ring-green-700 focus-within:border-green-700">
            <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-100 text-green-700">
                    {icon}
                </span>
                {label}
            </label>
            {children}
        </div>
    );
}

const fieldInputClass = `
  w-full rounded-md border-0 bg-transparent px-0 py-0.5 text-sm
  outline-none focus:ring-0 placeholder:text-gray-300
`;

export default function CreateTripDetails() {
    const [open, setOpen] = useState(false);

    return (
        <div className={`overflow-hidden border ${open ? "rounded-xl" : "rounded-xl"}`}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="
                    w-full bg-slate-800 px-6 py-4 flex items-center justify-between
                    hover:bg-slate-900 transition cursor-pointer
                "
            >
                <span className="flex items-center gap-2">
                    <p className="text-medium font-semibold text-white">Trip Details</p>
                    <span className="text-xs font-medium text-white/50">(OPTIONAL)</span>
                </span>

                <span
                    className={`
                        flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white
                        transition-transform duration-200 ${open ? "rotate-180" : ""}
                    `}
                >
                    {icons.chevron}
                </span>
            </button>

            <div
                className={`
                transition-all duration-300
                ${open ? "max-h-[1800px] opacity-100" : "max-h-0 opacity-0"}
                `}
            >
                <div className="bg-gray-50 p-5 space-y-4">
                    <div className="rounded-lg border bg-white p-3">
                        <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2">
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-100 text-green-700">
                                {icons.pin}
                            </span>

                            Location
                        </label>

                        <DestinationPicker
                            destinationField="destinationId"
                            nameField="location"
                            latField="locationLat"
                            lngField="locationLng"
                        />
                    </div>

                    <FieldShell icon={icons.calendar} label="Dates">
                        <DateRangePicker startName="startDate" endName="endDate" />
                    </FieldShell>

                    <div className="grid grid-cols-2 gap-4">
                        <FieldShell icon={icons.users} label="People">
                            <input
                                name="people"
                                type="number"
                                min="1"
                                defaultValue="1"
                                className={fieldInputClass}
                            />
                        </FieldShell>

                        <FieldShell icon={icons.thermometer} label="Lowest Temp">
                            <div className="flex items-center gap-1">
                                <input
                                    name="minTemperature"
                                    type="number"
                                    placeholder="-5"
                                    className={fieldInputClass}
                                />
                                <span className="text-sm text-gray-400 shrink-0">°C</span>
                            </div>
                        </FieldShell>
                    </div>

                    <FieldShell icon={icons.cloud} label="Conditions">
                        <select
                            name="conditions"
                            className={`${fieldInputClass} cursor-pointer`}
                        >
                            <option value="">Unknown</option>
                            <option value="dry">Dry</option>
                            <option value="rain">Rain</option>
                            <option value="snow">Snow</option>
                        </select>
                    </FieldShell>
                </div>
            </div>
        </div>
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


delete (L.Icon.Default.prototype as any)._getIconUrl;

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
import { addCustomItem } from "@/app/build/actions";

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

import { addGear } from "@/app/build/actions";


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
import { getBuildExport, importBuildItems } from "@/app/build/actions";
import { getBuildHistory, restoreBuildRevision, undoLastBuildChange } from "@/lib/build-history-actions";

type Tool = "import" | "export" | "history";
type ImportMode = "merge" | "replace";

type ImportPreview = {
  name: string;
  itemCount: number;
  dayCount: number;
  version: number | null;
  fullBuild: boolean;
};

type SelectedImport = {
  fileName: string;
  size: number;
  text: string;
  preview: ImportPreview;
};

type HistoryEntry = {
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

function inspectImport(text: string): ImportPreview {
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
    fullBuild: version === 2 || Array.isArray(parsed.days) || "routeWaypoints" in parsed || "tripLogistics" in parsed,
  };
}

function bytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function safeFileName(name: string) {
  const base = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${base || "trailpicker-build"}.json`;
}

function historyIcon(action: string) {
  if (action === "import") return FileUp;
  if (action === "restore") return RotateCcw;
  if (action === "route" || action === "trip" || action === "itinerary" || action === "logistics") return MapPinned;
  if (action === "gear") return Backpack;
  return Clock3;
}

function relativeTime(value: string) {
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

function historyGroups(entries: HistoryEntry[]) {
  const groups: { label: string; entries: HistoryEntry[] }[] = [];
  for (const entry of entries) {
    const label = dayLabel(entry.createdAt);
    const last = groups[groups.length - 1];
    if (last?.label === label) last.entries.push(entry);
    else groups.push({ label, entries: [entry] });
  }
  return groups;
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
        result.mode === "replace"
          ? `Imported ${result.itemCount} item${result.itemCount === 1 ? "" : "s"}.`
          : `Added ${result.itemCount} item${result.itemCount === 1 ? "" : "s"}.`,
      );
      setSelectedImport(null);
      if (fileInput.current) fileInput.current.value = "";
      setHistory([]);
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
      await restoreBuildRevision(buildId, entry.id);
      setConfirmRestore(null);
      setHistoryNotice("Version restored.");
      await loadHistory();
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
      await undoLastBuildChange(buildId);
      setHistoryNotice("Last change undone.");
      await loadHistory();
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
  active: "gear" | "trip";
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

        <div className="flex justify-center gap-2">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={t.href}
              className={`
                relative px-5 py-2.5 text-sm font-semibold rounded-t-lg transition
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
                                            {item.gear && (
                                                <Link
                                                    href="#"
                                                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 transition max-md:min-h-9 max-md:inline-flex max-md:items-center"
                                                >
                                                    Buy
                                                </Link>
                                            )}
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

### `components/builder/BuildSettings.tsx`

```typescript
"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Settings2, X, LockKeyhole, Globe2 } from "lucide-react";
import { setBuildVisibility } from "@/lib/build-visibility-actions";
import { renameBuild } from "@/lib/build-settings-actions";

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

### `components/builder/BuildVisibilityToggle.tsx`

```typescript
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setBuildVisibility } from "@/lib/build-visibility-actions";

export default function BuildVisibilityToggle({ buildId, isPublic }: { buildId: string; isPublic: boolean }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const router = useRouter();

  function toggle() {
    setError(null);
    setNotice(null);
    startTransition(async () => {
      try {
        await setBuildVisibility(buildId, !isPublic);
        router.refresh();
      } catch {
        setError("Couldn’t save visibility. Please try again.");
      }
    });
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/build/${buildId}`);
      setNotice("Link copied.");
    } catch {
      setError("Couldn’t copy the link. Copy this page’s address instead.");
    }
  }

  return (
    <section className="mx-auto max-w-screen-2xl px-4 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4">
        <div>
          <h2 className="font-semibold text-gray-900">Build visibility: {isPublic ? "Public" : "Private"}</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-600">
            {isPublic
              ? "Anyone with the link can view your gear, trip dates, location, and notes. Only you can edit."
              : "Only you can view this build. Making it public shares gear, trip dates, location, and notes with anyone who has the link."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isPublic && <button type="button" onClick={copyLink} className="rounded-lg border px-3 py-2 text-sm">Copy public link</button>}
          <button type="button" role="switch" aria-checked={isPublic} aria-label="Public build" disabled={pending} onClick={toggle}
            className={`relative h-7 w-12 rounded-full transition disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700 ${isPublic ? "bg-green-700" : "bg-gray-300"}`}>
            <span aria-hidden="true" className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${isPublic ? "left-6" : "left-1"}`} />
          </button>
          <span className="text-sm text-gray-600" aria-live="polite">{pending ? "Saving…" : isPublic ? "Public" : "Private"}</span>
        </div>
      </div>
      {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
      {notice && <p role="status" className="mt-2 text-sm text-green-800">{notice}</p>}
    </section>
  );
}

```

### `components/builder/CompatibilityBar.tsx`

```typescript
import Link from "next/link";
//components/builder/CompatibilityBar.tsx
import {
    evaluateCompatibility,
    summarizeCompatibility,
    type BuildForCompat,
    type CompatItem,
    type TripDayForCompat,
} from "@/lib/compatibility";

type Props = {
    build: BuildForCompat;
    items: CompatItem[];
    days?: TripDayForCompat[];
    totalWeight: number;
};

const statusStyles = {
    ok: { bar: "bg-emerald-50 border-emerald-200 text-emerald-900", dot: "bg-emerald-500", label: "Compatible" },
    warning: { bar: "bg-amber-100 border-amber-200 text-amber-900", dot: "bg-amber-500", label: "Warning" },
    error: { bar: "bg-red-100 border-red-200 text-red-900", dot: "bg-red-500", label: "Issue" },
};

export default function CompatibilityBar({ build, items, days = [], totalWeight }: Props) {
    const issues = evaluateCompatibility(build, items, days);
    const summary = summarizeCompatibility(issues);
    const style = statusStyles[summary.status];

    return (
    <div className={`flex items-center justify-between max-md:flex-wrap max-md:gap-3 px-5 py-3 text-sm ${style.bar}`}>
            <div className="flex items-center gap-2 max-md:flex-wrap max-md:min-w-0">
                <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                <span className="font-semibold">{style.label}</span>

                {summary.total > 0 ? (
                    <span>
                        {summary.errors > 0 && `${summary.errors} issue${summary.errors !== 1 ? "s" : ""}`}
                        {summary.errors > 0 && summary.warnings > 0 && ", "}
                        {summary.warnings > 0 && `${summary.warnings} warning${summary.warnings !== 1 ? "s" : ""}`}
                        {" — "}
                        <Link href="#compatibility-details" className="underline font-medium">
                            see details
                        </Link>
                    </span>
                ) : (
                    <span className="opacity-70">No issues found</span>
                )}
            </div>

            <div className="rounded-md bg-white/60 px-3 py-1 text-xs font-semibold">
                Total weight: {(totalWeight / 1000).toFixed(1)}kg
            </div>
        </div>
    );
}


```

### `components/builder/CompatibilityDetails.tsx`

```typescript
import {
    evaluateCompatibility,
    type BuildForCompat,
    type CompatItem,
    type CompatibilityIssue,
    type TripDayForCompat,
} from "@/lib/compatibility";
//components/builder/CompatibilityDetails.tsx
type Props = {
    build: BuildForCompat;
    items: CompatItem[];
    days?: TripDayForCompat[];
};

const severityStyles: Record<CompatibilityIssue["severity"], string> = {
    error: "border-red-200 bg-red-50 text-red-900",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    info: "border-gray-200 bg-gray-50 text-gray-700",
};

const severityLabel: Record<CompatibilityIssue["severity"], string> = {
    error: "Issue",
    warning: "Warning",
    info: "Note",
};

export default function CompatibilityDetails({ build, items, days = [] }: Props) {
    const issues = evaluateCompatibility(build, items, days);

    return (
        <section id="compatibility-details" className="mt-10 scroll-mt-24">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Compatibility Check
            </h2>

            {issues.length === 0 ? (
                <p className="mt-3 text-sm text-gray-500">No compatibility issues found for this build.</p>
            ) : (
                <div className="mt-3 space-y-2">
                    {issues.map((issue) => (
                        <div key={issue.id} className={`rounded-lg border px-4 py-3 text-sm ${severityStyles[issue.severity]}`}>
                            <span className="mr-2 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                                {severityLabel[issue.severity]} · {issue.category}
                            </span>
                            {issue.message}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
```

### `components/builder/CostSummary.tsx`

```typescript
type Props = {
    totalCost: number;
};

export default function CostSummary({ totalCost }: Props) {
    return (
        <div
            className="
    grid
    grid-cols-[180px_minmax(0,1fr)_100px_100px_100px]
    max-md:grid-cols-[auto_minmax(0,1fr)] max-md:gap-3
    items-center
    border-t
    border-gray-400
    px-3
    py-4
    bg-gray-50
    "
        >
            <div className="col-span-3 text-right pr-5 max-md:col-span-1 max-md:text-left max-md:pr-0 text-lg font-medium text-gray-900">
                Total Cost:
            </div>

            <div className="text-center pr-5 text-2xl font-bold max-md:text-right max-md:pr-0 max-md:break-words max-md:text-xl">
                ${totalCost.toFixed(2)}
            </div>

            <div className="max-md:hidden" />
        </div>
    );
}


```

### `components/builder/GearPicker.tsx`

```typescript
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Package, Search, SlidersHorizontal } from "lucide-react";
import AddGearButton from "@/components/builder/AddGearButton";
import { requireBuildPageAccess } from "@/lib/build-access";
import { prisma } from "@/lib/prisma";
import { pickerHref, pickerLimit, pickerValue, pickerWeight, type PickerSearch } from "@/lib/gear-picker";

export default async function GearPicker({ buildId, categorySlug, filters, subcategorySlug }: {
  buildId: string;
  categorySlug: string;
  filters: PickerSearch;
  subcategorySlug?: string;
}) {
  // Public build viewers must never reach the editing picker.
  await requireBuildPageAccess(buildId);
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug.toLowerCase() },
    include: { subcategories: {
      orderBy: { name: "asc" },
      include: {
        _count: { select: { gear: true } },
        gear: {
          where: { images: { some: {} } },
          orderBy: { name: "asc" }, take: 1,
          select: { name: true, images: { orderBy: [{ isPrimary: "desc" }, { id: "asc" }], take: 1 } },
        },
      },
    } },
  });
  if (!category) notFound();
  const selectedSlug = subcategorySlug ?? pickerValue(filters.subcategory);
  const selected = selectedSlug ? category.subcategories.find((item) => item.slug === selectedSlug) : undefined;
  if (selectedSlug && !selected) notFound();
  const path = `/build/${encodeURIComponent(buildId)}/select/${encodeURIComponent(category.slug)}`;
  const scope = { categoryId: category.id, ...(selected ? { subcategoryId: selected.id } : {}) };
  const q = pickerValue(filters.q).trim().slice(0, 120);
  const brands = (Array.isArray(filters.brand) ? filters.brand : [filters.brand ?? ""])
    .flatMap((value) => value.split(",")).filter(Boolean);
  const maxWeight = pickerWeight(filters.maxWeight);
  const maxPrice = pickerLimit(filters.maxPrice);
  const sort = pickerValue(filters.sort);
  // Preserve existing weight/price + direction links while using one select in the new UI.
  const direction = sort.endsWith("-desc") || pickerValue(filters.direction) === "desc" ? "desc" as const : "asc" as const;
  const [availableBrands, gear, categoryCount] = await Promise.all([
    prisma.brand.findMany({ where: { gear: { some: scope } }, orderBy: { name: "asc" } }),
    prisma.gear.findMany({
      where: {
        ...scope,
        ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
        ...(brands.length ? { brand: { name: { in: brands } } } : {}),
        ...(maxWeight !== undefined ? { weight_g: { lte: maxWeight } } : {}),
        ...(maxPrice !== undefined ? { price_cad: { lte: maxPrice } } : {}),
      },
      orderBy: sort.startsWith("weight") ? [{ weight_g: direction }, { name: "asc" }]
        : sort.startsWith("price") ? [{ price_cad: direction }, { name: "asc" }]
        : [{ name: "asc" }],
      include: { brand: true, subcategory: true, images: { orderBy: [{ isPrimary: "desc" }, { id: "asc" }], take: 1 } },
    }),
    prisma.gear.count({ where: { categoryId: category.id } }),
  ]);
  const activeFilters = !!(q || brands.length || maxWeight !== undefined || maxPrice !== undefined);
  const sortValue = sort.startsWith("weight") ? `weight-${direction}` : sort.startsWith("price") ? `price-${direction}` : "name";
  const inputClass = "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/15";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <Link href={`/build/${buildId}`} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-800"><ArrowLeft size={16} /> Back to build</Link>
        <div className="mb-6 mt-5 flex flex-wrap items-end justify-between gap-3">
          <div><p className="mb-1 text-xs font-semibold uppercase tracking-widest text-green-800">Gear selection</p><h1 className="text-3xl font-semibold tracking-tight">Choose {category.name}</h1><p className="mt-2 text-sm text-gray-500">Browse everything, or choose a type below.</p></div>
          <Link href={path} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:border-green-700" aria-current={!selected ? "page" : undefined}>All {category.name.toLowerCase()} <span className="ml-2 text-gray-400">{categoryCount}</span></Link>
        </div>

        <nav aria-label={`${category.name} types`} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {category.subcategories.map((item) => {
            const photo = item.gear[0]?.images[0];
            const active = selected?.id === item.id;
            return <Link key={item.id} href={pickerHref(path, filters, item.slug)} aria-current={active ? "page" : undefined}
              className={`group overflow-hidden rounded-2xl border bg-white transition hover:border-green-700 hover:shadow-sm ${active ? "border-green-800 ring-2 ring-green-800/15" : "border-gray-200"}`}>
              <div className="relative aspect-square bg-white">
                {photo ? <Image src={photo.url} alt={item.gear[0].name} fill sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 240px" className="object-contain p-5 transition group-hover:scale-105" />
                  : <div className="flex h-full items-center justify-center text-gray-300"><Package size={48} strokeWidth={1} aria-label="No product photo" /></div>}
                {active && <span className="absolute left-3 top-3 rounded-full bg-green-800 px-2.5 py-1 text-xs font-medium text-white">Selected</span>}
              </div>
              <div className="flex items-center justify-between gap-2 border-t border-gray-100 px-4 py-3"><div><h2 className="text-sm font-semibold">{item.name}</h2><p className="mt-0.5 text-xs text-gray-500">{item._count.gear} products</p></div><ArrowUpRight size={16} className="shrink-0 text-gray-400" /></div>
            </Link>;
          })}
        </nav>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-5 flex items-center justify-between"><h2 className="flex items-center gap-2 font-semibold"><SlidersHorizontal size={16} /> Filters</h2>{activeFilters && <Link href={pickerHref(path, {}, selectedSlug)} className="text-xs text-green-800 underline underline-offset-4">Reset</Link>}</div>
            <form action={path} method="get" key={`${selectedSlug}:${JSON.stringify(filters)}`} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {selectedSlug && <input type="hidden" name="subcategory" value={selectedSlug} />}
              <label className="block text-xs font-medium text-gray-600">Search products<div className="relative mt-2"><Search size={15} className="pointer-events-none absolute left-3 top-3 text-gray-400" /><input name="q" defaultValue={q} placeholder="Product name" maxLength={120} className={`${inputClass} pl-9`} /></div></label>
              <fieldset><legend className="mb-2 text-xs font-medium text-gray-600">Brand</legend><div className="max-h-44 space-y-2 overflow-y-auto">{availableBrands.length ? availableBrands.map((brand) => <label key={brand.id} className="flex items-center gap-2 text-sm"><input type="checkbox" name="brand" value={brand.name} defaultChecked={brands.includes(brand.name)} className="h-4 w-4 accent-green-800" />{brand.name}</label>) : <p className="text-sm text-gray-400">No brands yet</p>}</div></fieldset>
              <label className="text-xs font-medium text-gray-600">Max weight (g)<input className={`${inputClass} mt-2`} name="maxWeight" type="number" min="0" step="1" placeholder="Any weight" defaultValue={maxWeight} /></label>
              <label className="text-xs font-medium text-gray-600">Max price (CAD)<input className={`${inputClass} mt-2`} name="maxPrice" type="number" min="0" step="0.01" placeholder="Any price" defaultValue={maxPrice} /></label>
              <label className="text-xs font-medium text-gray-600">Sort by<select name="sort" defaultValue={sortValue} className={`${inputClass} mt-2`}><option value="name">Name: A–Z</option><option value="weight-asc">Weight: lightest first</option><option value="weight-desc">Weight: heaviest first</option><option value="price-asc">Price: lowest first</option><option value="price-desc">Price: highest first</option></select></label>
              <button className="rounded-lg bg-green-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-900">Apply filters</button>
            </form>
          </aside>

          <section aria-label="Products" className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><h2 className="text-lg font-semibold">{selected?.name ?? `All ${category.name.toLowerCase()}`} <span className="ml-1 text-sm font-normal text-gray-500">{gear.length} {gear.length === 1 ? "product" : "products"}</span></h2><span className="text-xs text-gray-500">Prices in CAD · weight in grams</span></div>
            {gear.length === 0 ? <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center"><Package size={32} className="mx-auto mb-3 text-gray-400" /><h3 className="font-semibold">No products found</h3><p className="mt-2 text-sm text-gray-500">{activeFilters ? "Try removing a filter or browsing another type." : "There are no products in this type yet."}</p><Link href={path} className="mt-4 inline-block text-sm font-medium text-green-800 underline underline-offset-4">Browse all {category.name.toLowerCase()}</Link></div>
              : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{gear.map((item) => <article key={item.id} className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <Link href={`/gear/${item.id}`} className="relative block aspect-[4/3] border-b border-gray-100 bg-white" aria-label={`View ${item.name}`}>
                  {item.images[0] ? <Image src={item.images[0].url} alt={item.name} fill sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 300px" className="object-contain p-6" /> : <div className="flex h-full items-center justify-center text-gray-300"><Package size={44} strokeWidth={1} /></div>}
                </Link>
                <div className="flex flex-1 flex-col p-4"><p className="text-xs text-gray-500">{item.brand.name}{item.subcategory ? ` · ${item.subcategory.name}` : ""}</p><Link href={`/gear/${item.id}`} className="mt-1 font-semibold leading-snug hover:text-green-800">{item.name}</Link>
                  <div className="mb-4 mt-3 flex flex-wrap gap-2 text-xs text-gray-600"><span className="rounded-md bg-gray-50 px-2 py-1">{item.weight_g === null ? "Weight unavailable" : `${item.weight_g.toLocaleString("en-CA")} g`}</span>{item.capacity_l !== null && <span className="rounded-md bg-gray-50 px-2 py-1">{item.capacity_l} L</span>}{item.season && <span className="rounded-md bg-gray-50 px-2 py-1">{item.season}</span>}{item.waterproof === true && <span className="rounded-md bg-gray-50 px-2 py-1">Waterproof</span>}</div>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-3"><span className="text-sm font-semibold">{item.price_cad === null ? "Price unavailable" : `$${item.price_cad.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span><AddGearButton buildId={buildId} gearId={item.id} /></div>
                </div>
              </article>)}</div>}
          </section>
        </div>
      </main>
    </div>
  );
}

```

### `components/builder/GearTab.tsx`

```typescript
import BuildRow from "@/components/builder/BuildRow";
import CostSummary from "@/components/builder/CostSummary";
import WeightSummary from "@/components/builder/WeightSummary";

type BuildItem = {
  id: string;
  quantity: number;
  isConsumable: boolean;
  isWorn: boolean;
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
    images: { id: string; url: string; isPrimary: boolean }[];
  } | null;
};

type Props = {
  buildId: string;
  items: BuildItem[];
  base: number;
  consumable: number;
  worn: number;
  total: number;
  totalCost: number;
};

export default function GearTab({
  buildId,
  items,
  base,
  consumable,
  worn,
  total,
  totalCost,
}: Props) {
  return (
    <>
      <div className="mt-4 overflow-hidden rounded-xl bg-white">
        {/* Header */}
        <div className="grid grid-cols-[180px_minmax(0,1fr)_100px_100px_100px] p-3 text-xs bg-gray-50 font-light text-gray-600">
          <div>Component</div>
          <div>Selection</div>
          <div className="text-center pr-5">Weight</div>
          <div className="text-center pr-5">Price</div>
          <div></div>
        </div>

        <BuildRow
          name="Backpack"
          gearLink="/gear/packs"
          selectCategory="packs"
          categoryName="Packs"
          buildId={buildId}
          items={items.filter(
            (item) => item.gear?.category.name === "Packs" || item.customCategory === "Packs"
          )}
        />

        <BuildRow
          name="Shelter"
          gearLink="/gear/shelter"
          selectCategory="shelter"
          categoryName="Shelter"
          buildId={buildId}
          items={items.filter(
            (item) => item.gear?.category.name === "Shelter" || item.customCategory === "Shelter"
          )}
        />

        <BuildRow
          name="Sleep System"
          gearLink="/gear/sleep"
          selectCategory="sleep"
          categoryName="Sleep"
          buildId={buildId}
          items={items.filter(
            (item) => item.gear?.category.name === "Sleep" || item.customCategory === "Sleep"
          )}
        />

        <BuildRow
          name="Cooking"
          gearLink="/gear/cooking"
          selectCategory="cooking"
          categoryName="Cooking"
          buildId={buildId}
          items={items.filter(
            (item) => item.gear?.category.name === "Cooking" || item.customCategory === "Cooking"
          )}
        />

        <BuildRow
          name="Water"
          gearLink="/gear/water"
          selectCategory="water"
          categoryName="Water"
          buildId={buildId}
          items={items.filter(
            (item) => item.gear?.category.name === "Water" || item.customCategory === "Water"
          )}
        />

        <BuildRow
          name="Clothing"
          gearLink="/gear/clothing"
          selectCategory="clothing"
          categoryName="Clothing"
          buildId={buildId}
          items={items.filter(
            (item) => item.gear?.category.name === "Clothing" || item.customCategory === "Clothing"
          )}
        />

        <BuildRow
          name="Electronics"
          gearLink="/gear/electronics"
          selectCategory="electronics"
          categoryName="Electronics"
          buildId={buildId}
          items={items.filter(
            (item) =>
              item.gear?.category.name === "Electronics" || item.customCategory === "Electronics"
          )}
        />

        <BuildRow
          name="Miscellaneous"
          gearLink="/gear/misc"
          selectCategory="misc"
          categoryName="Misc"
          buildId={buildId}
          items={items.filter(
            (item) => item.gear?.category.name === "Misc" || item.customCategory === "Misc"
          )}
        />

        <CostSummary totalCost={totalCost} />
      </div>

      <WeightSummary
        base={base}
        consumable={consumable}
        worn={worn}
        total={total}
        totalCost={totalCost}
      />
    </>
  );
}
```

### `components/builder/ItemCategoryToggle.tsx`

```typescript
"use client";

import { useOptimistic, useTransition } from "react";
import { setItemCategory } from "@/app/build/actions";

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

### `components/builder/OriginalGearPicker.tsx`

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
                                                {item.images[0] && (
                                                    <Image
                                                        src={item.images[0].url}
                                                        alt={item.name}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                )}
                                            </div>


                                            <div>
                                                <h2 className="font-semibold hover:text-blue-600">
                                                    {item.name}
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
  id: string; quantity: number; isWorn: boolean; isConsumable: boolean;
  customCategory: string | null; gearNameSnapshot: string | null;
  weightSnapshot: number | null; priceSnapshot: number | null;
  gear: { id: string; name: string; weight_g: number | null; price_cad: number | null; category: { name: string } } | null;
};
type Build = PlannerBuild & { name: string; items: Item[] };

// Server-rendered display only: no mutation forms or editing components.
export default function PublicBuildView({ build, activeTab, compatBuild, compatItems, issueCount }: {
  build: Build; activeTab: "gear" | "trip"; compatBuild: BuildForCompat; compatItems: CompatItem[]; issueCount: number;
}) {
  const weight = calculateWeightBreakdown(build.items);
  const totalCost = calculateTotalCost(build.items);
  const categories = [...new Set(build.items.map(item => item.gear?.category.name ?? item.customCategory ?? "Other"))];
  return (
    <div className="min-h-screen bg-gray-50">
      <BuildHeader buildId={build.id} name={build.name} active={activeTab} issueCount={issueCount} />
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">
          <p>Public build · Read-only · Only the owner can edit.</p>
          <Link href="/build" className="font-semibold underline">Create your own build</Link>
        </div>
        {activeTab === "gear" ? <>
          {categories.length === 0 && <p className="rounded-xl bg-white p-6 text-gray-500">No gear added yet.</p>}
          {categories.map(category => <section key={category} className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-3 text-lg font-semibold">{category}</h2>
            <ul className="divide-y divide-gray-100">
              {build.items.filter(item => (item.gear?.category.name ?? item.customCategory ?? "Other") === category).map(item => {
                const name = item.gear?.name ?? item.gearNameSnapshot ?? "Custom item";
                const grams = item.gear?.weight_g ?? item.weightSnapshot;
                const price = item.gear?.price_cad ?? item.priceSnapshot;
                return <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div>{item.gear ? <Link href={`/gear/${item.gear.id}`} className="font-semibold hover:underline">{name}</Link> : <span className="font-semibold">{name}</span>}
                    <p className="mt-1 text-sm text-gray-500">Quantity: {item.quantity}{item.isWorn ? " · Worn" : ""}{item.isConsumable ? " · Consumable" : ""}</p>
                  </div>
                  <div className="text-sm text-gray-600">{grams == null ? "Weight unknown" : `${grams * item.quantity} g`}{" · "}{price == null ? "Price unknown" : `CAD $${(price * item.quantity).toFixed(2)}`}</div>
                </li>;
              })}
            </ul>
          </section>)}
          <p className="text-lg font-semibold">Total cost: CAD ${totalCost.toFixed(2)}</p>
          <WeightSummary {...weight} totalCost={totalCost} />
          <CompatibilityDetails build={compatBuild} items={compatItems} days={build.days} />
        </> : <TripPlanner build={{ ...build, tripLogistics: undefined, days: build.days.map(day=>({...day,reservation:null})) }} issues={evaluateCompatibility(compatBuild,compatItems,build.days)} readOnly />}

      </main>
    </div>
  );
}


```

### `components/builder/QuantityStepper.tsx`

```typescript
"use client";

import { useOptimistic, useTransition } from "react";
import { updateQuantity } from "@/app/build/actions";

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

import { removeGear } from "@/app/build/actions";

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
import { duplicateBuild } from "@/app/build/actions";

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

### `components/builder/TripPlanner/MapPreviewInner.tsx`

```typescript
"use client";
//components/builder/TripPlanner/MapPreviewInner.tsx
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapPreviewInner({ lat, lng }: { lat: number; lng: number }) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={11}
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      zoomControl={false}
      className="h-56 w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[lat, lng]} />
    </MapContainer>
  );
}
```

### `components/builder/TripPlanner/PlannerFields.tsx`

```typescript
import type { ReactNode } from "react";

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

export function Group({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-green-800">
        {title}
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </fieldset>
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

export default function RouteMapInner({ points, fallback, onPick, onSelect, onMove, selectedId, focus }: Props) {
  return <MapContainer center={fallback ?? [49.7, -123.1]} zoom={fallback ? 12 : 9} scrollWheelZoom={false} className="relative z-0 h-[420px] w-full sm:h-[480px]">
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
    <Controls points={points} onPick={onPick} focus={focus} />
    <FitRoute points={points} fallback={fallback} />
    {points.length > 1 && <Polyline interactive={false} positions={points.map(p => [p.lat, p.lng])} pathOptions={{ color: "#166534", weight: 3, dashArray: "6 8", opacity: 0.7 }} />}
    {points.map((point, index) => <StopMarker key={point.id} point={point} order={index + 1} selected={selectedId === point.id} onSelect={onSelect} onMove={onMove} />)}
    {!points.length && fallback && <Marker position={fallback} icon={divIcon({ html: waypointMarkerHtml("waypoint", 1, false), className: "trailpicker-stop-icon", iconSize: [34, 34], iconAnchor: [17, 17] })} title="Trip location"><Popup>Trip location · add your first route stop here or explore the map.</Popup></Marker>}
  </MapContainer>;
}

```

### `components/builder/TripPlanner/TripDayList.tsx`

```typescript
import { Route } from "lucide-react";
import TripDayRow from "./TripDayRow";
import { plannedDay, type PlannerDay } from "@/lib/trip-planner";

export default function TripDayList({
  buildId,
  days,
  readOnly = false,
}: {
  buildId: string;
  days: PlannerDay[];
  readOnly?: boolean;
}) {
  const sorted = [...days].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const completed = days.filter(plannedDay).length;
  const progress = days.length ? Math.round((completed / days.length) * 100) : 0;

  return (
    <section
      id="itinerary"
      className="scroll-mt-20 rounded-[28px] border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
    >
      <div className="mb-6 flex flex-col gap-5 border-b border-gray-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-900 text-white">
            <Route className="h-5 w-5" />
          </span>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-green-700">
              Daily plan
            </p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
              Itinerary
            </h2>
            <p className="mt-1 max-w-xl text-sm leading-6 text-gray-500">
              Build the trip day by day with route, elevation, camp, water,
              weather, and notes.
            </p>
          </div>
        </div>

        {days.length > 0 && (
          <div className="min-w-[190px] rounded-2xl bg-gray-50 px-4 py-3">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="font-medium text-gray-500">Route progress</span>
              <span className="font-bold text-green-900">
                {completed}/{days.length}
              </span>
            </div>

            <div
              role="progressbar"
              aria-label="Days with start, end and distance"
              aria-valuemin={0}
              aria-valuemax={days.length}
              aria-valuenow={completed}
              className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200"
            >
              <div
                className="h-full rounded-full bg-green-800 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {sorted.map((day, index) => (
          <TripDayRow
            key={`${day.id}-${new Date(day.date).toISOString()}`}
            buildId={buildId}
            day={day}
            dayNumber={index + 1}
            readOnly={readOnly}
          />
        ))}

        {!days.length && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
            <Route className="mx-auto h-7 w-7 text-gray-300" />
            <p className="mt-3 font-semibold text-gray-700">
              No itinerary days yet
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Choose trip dates and TrailPicker will create the daily plan.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

```

### `components/builder/TripPlanner/TripDayRow.tsx`

```typescript
"use client";

import type { ReactNode } from "react";
import { useState, useTransition } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CloudSun,
  Droplets,
  Footprints,
  MapPin,
  Mountain,
  NotebookPen,
  Route,
  TentTree,
  ThermometerSun,
} from "lucide-react";

import { updateTripDay } from "@/app/build/actions";
import { plannedDay, type PlannerDay } from "@/lib/trip-planner";
import { Field, SaveStatus, inputClass } from "./PlannerFields";

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (!hours) return `${mins}m`;
  if (!mins) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

function weatherLabel(value: string | null) {
  if (!value) return "Weather not set";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
      <span className="text-green-800">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function MiniDetail({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5 text-sm text-gray-600">
      <span className="shrink-0 text-gray-400">{icon}</span>
      <span className="truncate">{children}</span>
    </span>
  );
}

function FormSection({
  icon,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800">
          {icon}
        </span>
        <div>
          <h4 className="font-bold text-gray-950">{title}</h4>
          {description && (
            <p className="mt-0.5 text-xs leading-5 text-gray-500">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function ReadOnlyItem({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  if (value === null || value === undefined || value === "") return null;

  return (
    <div className="rounded-xl bg-gray-50 px-4 py-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
        {label}
      </p>
      <div className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-700">
        {value}
      </div>
    </div>
  );
}

export default function TripDayRow({
  buildId,
  day,
  dayNumber,
  readOnly = false,
}: {
  buildId: string;
  day: PlannerDay;
  dayNumber: number;
  readOnly?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  function submit(formData: FormData) {
    setError("");

    start(async () => {
      try {
        await updateTripDay(formData);
        setOpen(false);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Could not save. Try again.",
        );
      }
    });
  }

  const isPlanned = plannedDay(day);

  const date = new Date(day.date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    weekday: "short",
    timeZone: "UTC",
  });

  const route =
    day.startLocation || day.endLocation
      ? `${day.startLocation || "Start not set"} → ${day.endLocation || "End not set"}`
      : "Plan this day";

  const hasStats =
    day.distanceKm != null ||
    day.elevationGainM != null ||
    day.elevationLossM != null ||
    day.durationMinutes != null;

  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white transition-all duration-200 ${
        open
          ? "border-green-200 shadow-[0_12px_35px_rgba(0,0,0,0.07)]"
          : "border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md"
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`day-${day.id}`}
        onClick={() => setOpen(!open)}
        className="group w-full p-4 text-left sm:p-5"
      >
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl ${
              isPlanned
                ? "bg-green-900 text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            <span className="text-[9px] font-bold uppercase tracking-wider opacity-70">
              Day
            </span>
            <span className="text-lg font-black leading-none">{dayNumber}</span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-green-800">
                <CalendarDays className="h-3.5 w-3.5" />
                {date}
              </span>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${
                  isPlanned
                    ? "bg-green-50 text-green-800"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {isPlanned && <CheckCircle2 className="h-3 w-3" />}
                {isPlanned ? "Routed" : "Needs route"}
              </span>
            </div>

            <h3 className="mt-2 break-words text-base font-bold leading-snug text-gray-950 sm:text-lg">
              {route}
            </h3>

            {hasStats ? (
              <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
                {day.distanceKm != null && (
                  <Stat
                    icon={<Footprints className="h-4 w-4" />}
                    label="Distance"
                    value={`${day.distanceKm} km`}
                  />
                )}

                {day.elevationGainM != null && (
                  <Stat
                    icon={<Mountain className="h-4 w-4" />}
                    label="Gain"
                    value={`+${day.elevationGainM.toLocaleString()} m`}
                  />
                )}

                {day.elevationLossM != null && (
                  <Stat
                    icon={<Mountain className="h-4 w-4 rotate-180" />}
                    label="Loss"
                    value={`-${day.elevationLossM.toLocaleString()} m`}
                  />
                )}

                {day.durationMinutes != null && (
                  <Stat
                    icon={<Clock3 className="h-4 w-4" />}
                    label="Time"
                    value={formatDuration(day.durationMinutes)}
                  />
                )}
              </div>
            ) : (
              <div className="mt-3 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-400">
                Add distance, elevation and time to complete this day.
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-gray-100 pt-3">
              {day.campsite && (
                <MiniDetail icon={<TentTree className="h-4 w-4" />}>
                  {day.campsite}
                </MiniDetail>
              )}

              {day.waterSource && (
                <MiniDetail icon={<Droplets className="h-4 w-4" />}>
                  {day.waterSource}
                </MiniDetail>
              )}

              <MiniDetail icon={<CloudSun className="h-4 w-4" />}>
                {weatherLabel(day.conditions)}
              </MiniDetail>

              {day.minTemperature != null && (
                <MiniDetail icon={<ThermometerSun className="h-4 w-4" />}>
                  Low {day.minTemperature}°C
                </MiniDetail>
              )}
            </div>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition group-hover:border-green-200 group-hover:text-green-800">
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </span>
        </div>
      </button>

      {open &&
        (readOnly ? (
          <div
            id={`day-${day.id}`}
            className="border-t border-gray-100 bg-gray-50/70 p-4 sm:p-5"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <ReadOnlyItem label="Activities" value={day.activities} />
              <ReadOnlyItem
                label="Trail conditions"
                value={day.trailConditions}
              />
              <ReadOnlyItem
                label="Water carry"
                value={
                  day.waterCarryL != null ? `${day.waterCarryL} L` : null
                }
              />
              <ReadOnlyItem label="Notes" value={day.notes} />
            </div>
          </div>
        ) : (
          <form
            id={`day-${day.id}`}
            action={submit}
            className="space-y-4 border-t border-gray-100 bg-gray-50/70 p-4 sm:p-5"
          >
            <fieldset disabled={pending} className="space-y-4">
              <input type="hidden" name="buildId" value={buildId} />
              <input type="hidden" name="dayId" value={day.id} />

              <FormSection
                icon={<Route className="h-4 w-4" />}
                title="Route"
                description="Where the day starts, ends, and how much ground you expect to cover."
              >
                <Field
                  name="startLocation"
                  label="Start"
                  value={day.startLocation}
                />
                <Field
                  name="endLocation"
                  label="End"
                  value={day.endLocation}
                />
                <Field
                  name="distanceKm"
                  label="Distance (km)"
                  type="number"
                  min={0}
                  max={1000}
                  step="any"
                  value={day.distanceKm}
                />
                <Field
                  name="durationMinutes"
                  label="Estimated time (minutes)"
                  type="number"
                  min={0}
                  max={1440}
                  value={day.durationMinutes}
                />
                <Field
                  name="elevationGainM"
                  label="Elevation gain (m)"
                  type="number"
                  min={0}
                  max={20000}
                  value={day.elevationGainM}
                />
                <Field
                  name="elevationLossM"
                  label="Elevation loss (m)"
                  type="number"
                  min={0}
                  max={20000}
                  value={day.elevationLossM}
                />
              </FormSection>

              <FormSection
                icon={<TentTree className="h-4 w-4" />}
                title="Overnight"
                description="Camp, hut, hotel, or wherever civilization permits you to collapse."
              >
                <Field
                  name="campsite"
                  label="Campsite / accommodation"
                  value={day.campsite}
                />
                <Field
                  name="reservation"
                  label="Reservation / tent pad (private)"
                  value={day.reservation}
                />
              </FormSection>

              <FormSection
                icon={<CloudSun className="h-4 w-4" />}
                title="Conditions"
                description="Expected weather and trail conditions for this specific day."
              >
                <Field
                  name="minTemperature"
                  label="Expected low (°C)"
                  type="number"
                  min={-100}
                  max={60}
                  value={day.minTemperature}
                />

                <label className="block space-y-1.5 text-sm">
                  <span className="font-medium text-gray-700">Weather</span>
                  <select
                    name="conditions"
                    defaultValue={day.conditions ?? ""}
                    className={inputClass}
                  >
                    <option value="">Unknown</option>
                    <option value="dry">Dry</option>
                    <option value="rain">Rain</option>
                    <option value="snow">Snow</option>
                  </select>
                </label>

                <div className="sm:col-span-2">
                  <Field
                    name="trailConditions"
                    label="Trail conditions / warnings"
                    value={day.trailConditions}
                  />
                </div>
              </FormSection>

              <FormSection
                icon={<Droplets className="h-4 w-4" />}
                title="Water & activities"
                description="Water planning plus anything you actually intend to do besides walk."
              >
                <Field
                  name="waterSource"
                  label="Water source"
                  value={day.waterSource}
                />
                <Field
                  name="waterCarryL"
                  label="Water to carry (L)"
                  type="number"
                  min={0}
                  max={100}
                  step="any"
                  value={day.waterCarryL}
                />
                <div className="sm:col-span-2">
                  <Field
                    name="activities"
                    label="Planned activities"
                    value={day.activities}
                  />
                </div>
              </FormSection>

              <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
                <div className="mb-4 flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800">
                    <NotebookPen className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-950">Notes</h4>
                    <p className="mt-0.5 text-xs leading-5 text-gray-500">
                      Anything important that does not fit neatly into a box,
                      as human plans tend to do.
                    </p>
                  </div>
                </div>

                <textarea
                  name="notes"
                  rows={4}
                  maxLength={5000}
                  defaultValue={day.notes ?? ""}
                  className={inputClass}
                  placeholder="Optional notes for this day..."
                />
              </section>
            </fieldset>

            <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <SaveStatus pending={pending} error={error} />

              <button
                type="button"
                disabled={pending}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        ))}
    </article>
  );
}

```

### `components/builder/TripPlanner/TripEditForm.tsx`

```typescript
"use client";
//components/builder/TripPlanner/TripEditForm.tsx
import { useState, useTransition } from "react";
import DestinationPicker from "@/components/build/DestinationPicker";
import DateRangePicker from "@/components/build/DateRangePicker";
import { updateTripDetails } from "@/app/build/actions";

type Props = {
  build: {
    id: string;
    location: string | null;
    startDate: Date | null;
    endDate: Date | null;
    people: number;
    minTemperature: number | null;
    conditions: string | null;
    locationLat: number | null;
    locationLng: number | null;
  };
  onSaved: () => void;
  onCancel?: () => void;
};

export default function TripEditForm({ build, onSaved, onCancel }: Props) {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      setError("");
      try { await updateTripDetails(formData); onSaved(); } catch(e) { setError(e instanceof Error ? e.message : "Could not save trip."); }
    });
  }

  return (
    <div className="
      rounded-2xl
      bg-white
      border
      shadow-sm
      p-8
      space-y-6
    ">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Trip Details</h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>

      <form action={handleSubmit} className="space-y-4">
        <fieldset disabled={isPending} className="space-y-4">
        <input type="hidden" name="buildId" value={build.id} />

        <div className="rounded-lg border p-3">
          <label className="text-xs font-semibold uppercase text-gray-400 mb-2 block">
            Location
          </label>
          <DestinationPicker
            nameField="location"
            latField="locationLat"
            lngField="locationLng"
            initialName={build.location ?? undefined}
            initialLat={build.locationLat}
            initialLng={build.locationLng}
          />
        </div>

        <div className="rounded-lg border p-3">
          <label className="text-xs font-semibold uppercase text-gray-400 mb-2 block">
            Dates
          </label>
          <DateRangePicker
            startName="startDate"
            endName="endDate"
            initialStart={build.startDate?.toISOString().split("T")[0]}
            initialEnd={build.endDate?.toISOString().split("T")[0]}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-3">
            <label className="text-xs font-semibold uppercase text-gray-400 mb-2 block">
              People
            </label>
            <input
              name="people"
              type="number"
              min="1"
              defaultValue={build.people}
              className="w-full text-sm outline-none"
            />
          </div>

          <div className="rounded-lg border p-3">
            <label className="text-xs font-semibold uppercase text-gray-400 mb-2 block">
              Overall Lowest Temp (°C)
            </label>
            <input
              name="minTemperature"
              type="number"
              defaultValue={build.minTemperature ?? undefined}
              placeholder="-5"
              className="w-full text-sm outline-none"
            />
          </div>
        </div>

        <div className="rounded-lg border p-3">
          <label className="text-xs font-semibold uppercase text-gray-400 mb-2 block">
            Overall Conditions
          </label>
          <select
            name="conditions"
            defaultValue={build.conditions ?? ""}
            className="w-full text-sm outline-none cursor-pointer"
          >
            <option value="">Unknown</option>
            <option value="dry">Dry</option>
            <option value="rain">Rain</option>
            <option value="snow">Snow</option>
          </select>
        </div>

        <label className="flex items-start gap-2 text-xs text-gray-500"><input type="checkbox" name="confirmDateChange" value="yes" />I understand that days outside the new date range will be removed. Keep days within the range.</label>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-green-900 py-2.5 text-white font-semibold hover:bg-green-800 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? "Saving..." : "Save Trip Details"}
        </button>
        </fieldset>
      </form>
    </div>
  );
}

```

### `components/builder/TripPlanner/TripLocationPreview.tsx`

```typescript
"use client";
//components/builder/TripPlanner/TripLocationPreview.tsx
import dynamic from "next/dynamic";

const MapPreviewInner = dynamic(() => import("./MapPreviewInner"), { ssr: false });

export default function TripLocationPreview({ lat, lng }: { lat: number; lng: number }) {
  return <MapPreviewInner lat={lat} lng={lng} />;
}
```

### `components/builder/TripPlanner/TripLogistics.tsx`

```typescript
"use client";
import { useState, useTransition } from "react";
import { saveTripLogistics } from "@/lib/trip-planner-actions";
import { readLogistics, type Logistics } from "@/lib/trip-planner";
import { inputClass, SaveStatus } from "./PlannerFields";
const labels: Record<keyof Logistics,string> = { permits:"Permits",reservations:"Reservations",transportation:"Transportation",parking:"Parking / trailhead access",emergencyContact:"Emergency contact",emergencyPlan:"Emergency plan / exit routes",notes:"Other logistics" };
export default function TripLogistics({ buildId, value }: { buildId: string; value: unknown }) {
  const [pending,start] = useTransition(),[error,setError]=useState(""),[saved,setSaved]=useState(false);
  const logistics = readLogistics(value);
  function submit(f: FormData) { setError("");setSaved(false);start(async()=>{try{await saveTripLogistics(f);setSaved(true);}catch(e){setError(e instanceof Error?e.message:"Could not save logistics.");}}); }
  return <section id="logistics" className="scroll-mt-20 rounded-3xl border border-gray-200 bg-white p-5 sm:p-8"><h2 className="text-xl font-bold">Logistics</h2><p className="mt-1 text-sm text-gray-500">Arrange the practical details. This section and daily reservation references stay private when sharing.</p><form action={submit} onChange={()=>setSaved(false)} className="mt-5 space-y-4"><input type="hidden" name="buildId" value={buildId} /><fieldset disabled={pending} className="space-y-3">{(Object.keys(labels) as (keyof Logistics)[]).map(key=><details key={key} className="rounded-xl border border-gray-200 p-4"><summary className="cursor-pointer text-sm font-semibold">{labels[key]} <span className="ml-2 font-normal text-gray-400">{logistics[key] ? "Added" : "Not set"}</span></summary><label className="mt-3 block"><span className="sr-only">{labels[key]}</span><textarea name={key} defaultValue={logistics[key]} maxLength={5000} rows={3} className={inputClass} /></label></details>)}</fieldset><SaveStatus pending={pending} error={error} saved={saved} /></form></section>;
}

```

### `components/builder/TripPlanner/TripPlanner.tsx`

```typescript
"use client";
import { useState } from "react";
import TripSummaryCard from "./TripSummaryCard";
import TripEditForm from "./TripEditForm";
import TripDayList from "./TripDayList";
import TripRoute from "./TripRoute";
import TripLogistics from "./TripLogistics";
import { tripTotals, type PlannerBuild } from "@/lib/trip-planner";
import type { CompatibilityIssue } from "@/lib/compatibility";
export default function TripPlanner({ build, issues, readOnly = false }: { build: PlannerBuild; issues: CompatibilityIssue[]; readOnly?: boolean }) {
  const [editing,setEditing]=useState(!readOnly&&!build.startDate);
  const totals=tripTotals(build.days);
  const temperatures=[build.minTemperature,...build.days.map(d=>d.minTemperature)].filter((x):x is number=>x!=null);
  const conditions=[...new Set([build.conditions,...build.days.map(d=>d.conditions)].filter(Boolean))];
  const displayBuild={...build,minTemperature:temperatures.length?Math.min(...temperatures):null};
  return <div className="mx-auto mt-6 max-w-6xl space-y-6 px-3 pb-20 sm:px-6">
    <nav aria-label="Trip sections" className="flex flex-wrap gap-2">{["overview","route","itinerary",...(!readOnly?["logistics"]:[])].map(section=><a key={section} href={`#${section}`} className="rounded-full border bg-white px-4 py-2 text-sm font-semibold capitalize text-green-900 hover:bg-green-50">{section}</a>)}</nav>
    <div id="overview" className="scroll-mt-20">{editing ? <TripEditForm build={build} onSaved={()=>setEditing(false)} onCancel={build.startDate?()=>setEditing(false):undefined} /> : <TripSummaryCard build={displayBuild} issues={issues} onEdit={readOnly?undefined:()=>setEditing(true)} />}</div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[["Distance",totals.measuredDays?`${totals.distanceKm.toFixed(1)} km`:"Not set"],["Elevation gain",build.days.some(d=>d.elevationGainM!=null)?`↑ ${totals.gainM.toLocaleString()} m`:"Not set"],["Elevation loss",build.days.some(d=>d.elevationLossM!=null)?`↓ ${totals.lossM.toLocaleString()} m`:"Not set"],["Walking time",build.days.some(d=>d.durationMinutes!=null)?`${Math.floor(totals.minutes/60)}h ${totals.minutes%60}m`:"Not set"]].map(([label,value])=><div key={label} className="rounded-2xl border bg-white p-4"><p className="text-xs text-gray-500">{label}</p><p className="mt-1 font-bold text-green-950">{value}</p></div>)}</div>
    <p className="text-xs text-gray-500">Totals include entered values only · Distance entered for {totals.measuredDays}/{build.days.length} days · {conditions.length>1?"Mixed weather across itinerary":conditions[0]||"Weather not set"}</p>
    {issues.length > 0 && <details id="compatibility-details" className="scroll-mt-20 rounded-2xl border border-amber-200 bg-amber-50 p-4"><summary className="cursor-pointer text-sm font-semibold text-amber-900">Gear checks for these trip conditions</summary><ul className="mt-3 space-y-2 text-sm text-amber-950">{issues.map(issue=><li key={issue.id}>{issue.message}</li>)}</ul></details>}
    <TripRoute key={JSON.stringify(build.routeWaypoints)} buildId={build.id} value={build.routeWaypoints} lat={build.locationLat} lng={build.locationLng} readOnly={readOnly} />
    <TripDayList buildId={build.id} days={build.days} readOnly={readOnly} />
    {!readOnly && <TripLogistics buildId={build.id} value={build.tripLogistics} />}
  </div>;
}

```

### `components/builder/TripPlanner/TripRoute.tsx`

```typescript
"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Check, MapPin, Pencil, Plus, Trash2, X } from "lucide-react";
import { readWaypoints, type Waypoint } from "@/lib/trip-planner";
import { saveTripRoute } from "@/lib/trip-planner-actions";
import { WAYPOINT_TYPES, moveWaypoint, nextWaypointName, routeForSave, validCoordinates, waypointType, type PlaceResult } from "@/lib/waypoint-map";
import { inputClass } from "@/components/builder/TripPlanner/PlannerFields";
import WaypointIcon from "@/components/builder/TripPlanner/WaypointIcon";
import WaypointSearch from "@/components/builder/TripPlanner/WaypointSearch";
import type { MapFocus } from "@/components/builder/TripPlanner/RouteMapInner";
const RouteMap = dynamic(() => import("@/components/builder/TripPlanner/RouteMapInner"), { ssr: false, loading: () => <div className="h-[420px] animate-pulse bg-gray-100 sm:h-[480px]" /> });

export default function TripRoute({ buildId, value, lat, lng, readOnly = false }: {
  buildId: string; value: unknown; lat: number | null; lng: number | null; readOnly?: boolean;
}) {
  const [points, setPoints] = useState(() => readWaypoints(value));
  const committed = useRef(readWaypoints(value));
  const [editing, setEditing] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [kind, setKind] = useState<Waypoint["kind"]>("waypoint");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [moveId, setMoveId] = useState<string | null>(null);
  const [focus, setFocus] = useState<MapFocus | null>(null);
  const sequence = useRef(0);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [pending, start] = useTransition();
  const router = useRouter();
  const fallback: [number, number] | null = validCoordinates(lat, lng) ? [lat as number, lng as number] : null;
  const selected = points.find(point => point.id === selectedId);
  const dirty = JSON.stringify(points) !== JSON.stringify(committed.current);
  const canEdit = editing && !readOnly;
  const near: [number, number] | null = selected ? [selected.lat, selected.lng] : points.length ? [points[points.length - 1].lat, points[points.length - 1].lng] : fallback;

  useEffect(() => {
    if (!canEdit || !dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [canEdit, dirty]);

  function changed() { setSaved(false); setError(""); }
  function patch(id: string, data: Partial<Waypoint>) {
    if (!canEdit || pending) return;
    setPoints(current => current.map(point => point.id === id ? { ...point, ...data, id: point.id } : point));
    changed();
  }
  function addStop(latitude: number, longitude: number, name?: string, recenter = false) {
    if (!canEdit || pending || !validCoordinates(latitude, longitude)) return;
    if (points.length >= 200) { setError("A route can have up to 200 stops."); return; }
    const id = crypto.randomUUID();
    setPoints(current => [...current, { id, name: name?.trim().slice(0, 200) || nextWaypointName(current, kind), lat: latitude, lng: longitude, kind, elevationM: null }]);
    setSelectedId(id); setPlacing(false); setMoveId(null); changed();
    if (recenter) setFocus({ lat: latitude, lng: longitude, request: ++sequence.current });
  }
  function choosePlace(place: PlaceResult) { addStop(place.lat, place.lng, place.name, true); }
  function pick(latitude: number, longitude: number) {
    if (!canEdit || pending) return;
    if (moveId) { patch(moveId, { lat: latitude, lng: longitude }); setMoveId(null); }
    else if (placing) addStop(latitude, longitude);
  }
  function select(point: Waypoint) {
    setSelectedId(point.id);
    setFocus({ lat: point.lat, lng: point.lng, request: ++sequence.current });
  }
  function cancel() {
    if (pending || (dirty && !window.confirm("Discard your unsaved route changes?"))) return;
    setPoints(committed.current); setEditing(false); setPlacing(false); setMoveId(null); setSelectedId(null); setError(""); setSaved(false);
  }
  function save() {
    if (!canEdit || pending) return;
    let route: Waypoint[];
    try { route = routeForSave(points); } catch (e) { setError(e instanceof Error ? e.message : "Check the route stops."); return; }
    setError("");
    start(async () => {
      try {
        const form = new FormData(); form.set("buildId", buildId); form.set("waypoints", JSON.stringify(route));
        await saveTripRoute(form);
        committed.current = route; setPoints(route); setSaved(true); setEditing(false); setPlacing(false); setMoveId(null); setSelectedId(null);
        router.refresh();
      } catch (e) { setError(e instanceof Error ? e.message : "Could not save the route. Your changes are still here—try again."); }
    });
  }
  const elevations = points.map(point => point.elevationM);
  const profileReady = points.length >= 2 && elevations.every((height): height is number => height !== null);
  const heights = elevations.filter((height): height is number => height !== null);
  const min = heights.length ? Math.min(...heights) : 0, max = heights.length ? Math.max(...heights) : 0;

  return <section id="route" className="scroll-mt-20 overflow-hidden rounded-3xl border border-gray-200 bg-white">
    <header className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-8">
      <div><h2 className="text-xl font-bold text-gray-950">Route</h2><p className="mt-1 text-sm text-gray-500">Your stops, in travel order.</p></div>
      {!readOnly && (editing ? <div className="flex items-center gap-2">
        <button type="button" disabled={pending} onClick={cancel} className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 disabled:opacity-40">Cancel</button>
        <button type="button" disabled={pending || !dirty} onClick={save} className="flex items-center gap-1.5 rounded-xl bg-green-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"><Check className="h-4 w-4" aria-hidden="true" />{pending ? "Saving…" : "Save route"}</button>
      </div> : <button type="button" onClick={() => { setEditing(true); setSaved(false); setError(""); }} className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"><Pencil className="h-4 w-4" aria-hidden="true" />Edit route</button>)}
    </header>
    {canEdit && <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 bg-gray-50/70 px-5 py-3 sm:px-8">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Stop type to add">{WAYPOINT_TYPES.map(type => <button key={type.kind} type="button" disabled={pending} aria-pressed={kind === type.kind} onClick={() => { setKind(type.kind); setPlacing(true); setMoveId(null); }}
        className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition disabled:opacity-40 ${kind === type.kind ? "border-green-700 bg-white text-green-900 shadow-sm" : "border-transparent text-gray-500 hover:bg-white hover:text-gray-900"}`}><WaypointIcon kind={type.kind} />{type.label}</button>)}</div>
      <button type="button" disabled={pending} onClick={() => { setPlacing(!placing); setMoveId(null); }} className="flex items-center gap-1.5 text-xs font-semibold text-green-800 disabled:opacity-40"><Plus className="h-4 w-4" aria-hidden="true" />{placing ? "Stop placing" : "Place on map"}</button>
    </div>}
    {(placing || moveId) && canEdit && <div role="status" className="flex items-center justify-between gap-3 bg-green-50 px-5 py-2 text-xs text-green-900 sm:px-8"><span>{moveId ? "Click the new position on the map." : `Click the map to add a ${waypointType(kind).label.toLowerCase()}.`}</span><button type="button" disabled={pending} aria-label="Cancel map placement" onClick={() => { setPlacing(false); setMoveId(null); }}><X className="h-4 w-4" /></button></div>}
    <div className="grid border-t border-gray-100 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0"><RouteMap points={points} fallback={fallback} selectedId={selectedId} focus={focus}
        onPick={canEdit && !pending && (placing || moveId) ? pick : undefined}
        onSelect={setSelectedId}
        onMove={canEdit && !pending ? (id, a, b) => { if (validCoordinates(a, b)) { patch(id, { lat: a, lng: b }); setSelectedId(id); } } : undefined} /></div>
      <aside className="flex max-h-[640px] min-w-0 flex-col border-t border-gray-100 bg-gray-50/50 lg:max-h-[480px] lg:border-l lg:border-t-0">
        {canEdit && <div className="border-b border-gray-100 p-4"><h3 className="mb-2 text-xs font-bold text-gray-500">Add a {waypointType(kind).label.toLowerCase()} by name</h3><WaypointSearch near={near} onChoose={choosePlace} disabled={pending} /></div>}
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <div className="mb-3 flex items-center justify-between text-xs text-gray-500"><h3 className="font-semibold">Stops</h3><span>{points.length} / 200</span></div>
          {!points.length ? <div className="rounded-xl border border-dashed border-gray-200 bg-white px-4 py-8 text-center"><MapPin className="mx-auto mb-2 h-5 w-5 text-gray-300" aria-hidden="true" /><p className="text-sm font-medium text-gray-600">No stops yet</p><p className="mt-1 text-xs leading-5 text-gray-400">{canEdit ? "Choose an icon and click the map, or search for a place above." : readOnly ? "The owner hasn’t added route stops." : "Edit the route to add your first stop."}</p></div> : <ol className="space-y-2" aria-label="Route stops">
            {points.map((point, index) => <li key={point.id} className={`overflow-hidden rounded-xl border bg-white ${selectedId === point.id ? "border-green-700 ring-1 ring-green-700/10" : "border-gray-200"}`}>
              <div className="flex items-center gap-1 pr-2"><button type="button" onClick={() => select(point)} aria-pressed={selectedId === point.id} className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 text-left">
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: waypointType(point.kind).color }}><WaypointIcon kind={point.kind} /><span className="absolute -bottom-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full border border-gray-200 bg-white px-0.5 text-[9px] font-bold text-gray-600">{index + 1}</span></span>
                <span className="min-w-0"><span className="block truncate text-sm font-semibold text-gray-800">{point.name || "Unnamed stop"}</span><span className="mt-0.5 block text-xs text-gray-400">{waypointType(point.kind).label}{point.elevationM != null ? ` · ${point.elevationM} m` : ""}</span></span>
              </button>{canEdit && <div className="flex shrink-0 flex-col"><button type="button" disabled={pending || index === 0} aria-label={`Move ${point.name || "stop"} earlier`} onClick={() => { setPoints(current => moveWaypoint(current, index, -1)); changed(); }} className="rounded p-1 text-gray-400 hover:bg-gray-100 disabled:opacity-20"><ArrowUp className="h-3.5 w-3.5" /></button><button type="button" disabled={pending || index === points.length - 1} aria-label={`Move ${point.name || "stop"} later`} onClick={() => { setPoints(current => moveWaypoint(current, index, 1)); changed(); }} className="rounded p-1 text-gray-400 hover:bg-gray-100 disabled:opacity-20"><ArrowDown className="h-3.5 w-3.5" /></button></div>}</div>
              {canEdit && selectedId === point.id && <div className="space-y-3 border-t border-gray-100 px-3 pb-3 pt-3">
                <label className="block text-xs font-medium text-gray-500">Stop name<input value={point.name} maxLength={200} disabled={pending} onChange={e => patch(point.id, { name: e.target.value })} className={`${inputClass} mt-1`} /></label>
                <label className="block text-xs font-medium text-gray-500">Type<select aria-label="Stop type" value={point.kind} disabled={pending} onChange={e => patch(point.id, { kind: e.target.value as Waypoint["kind"] })} className={`${inputClass} mt-1`}>{WAYPOINT_TYPES.map(type => <option key={type.kind} value={type.kind}>{type.label}</option>)}</select></label>
                <div className="flex items-center justify-between gap-2"><button type="button" disabled={pending} onClick={() => { setMoveId(point.id); setPlacing(false); }} className="flex items-center gap-1 text-xs font-semibold text-green-800 disabled:opacity-40"><MapPin className="h-3.5 w-3.5" />Move on map</button><button type="button" disabled={pending} onClick={() => { setPoints(current => current.filter(p => p.id !== point.id)); setSelectedId(null); setMoveId(null); changed(); }} className="flex items-center gap-1 text-xs font-medium text-red-700 disabled:opacity-40"><Trash2 className="h-3.5 w-3.5" />Remove</button></div>
                <details className="text-xs text-gray-400"><summary className="cursor-pointer py-1">More details</summary><label className="mt-2 block text-xs text-gray-500">Elevation (m, optional)<input type="number" min={-500} max={9000} step="any" value={point.elevationM ?? ""} disabled={pending} onChange={e => patch(point.id, { elevationM: Number.isFinite(e.target.valueAsNumber) ? e.target.valueAsNumber : null })} className={`${inputClass} mt-1`} /></label><p className="mt-2 break-words font-mono">{point.lat.toFixed(6)}, {point.lng.toFixed(6)}</p></details>
              </div>}
            </li>)}
          </ol>}
        </div>
      </aside>
    </div>
    <footer className="space-y-3 border-t border-gray-100 px-5 py-4 sm:px-8">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">{WAYPOINT_TYPES.map(type => <span key={type.kind} className="flex items-center gap-1.5 text-xs text-gray-500"><span style={{ color: type.color }}><WaypointIcon kind={type.kind} className="h-3.5 w-3.5" /></span>{type.label}</span>)}</div>
      <p className="text-xs leading-5 text-gray-400">Dashed lines connect stops directly, not along trails.{canEdit ? " Drag pins to adjust them, then save your route." : ""}</p>
      {profileReady && <details className="text-xs text-gray-500"><summary className="cursor-pointer font-semibold">Waypoint elevations · {min}–{max} m</summary><svg viewBox="0 0 600 100" role="img" aria-label="Elevation at each waypoint in travel order, not by distance" className="mt-2 h-24 w-full"><polyline fill="none" stroke="#166534" strokeWidth="3" points={points.map((point, i) => `${10 + i * 580 / (points.length - 1)},${85 - ((point.elevationM! - min) / Math.max(1, max - min)) * 70}`).join(" ")} /></svg></details>}
      {error && <p role="alert" className="text-sm font-medium text-red-700">{error}</p>}
      <p role="status" aria-live="polite" className="text-xs text-green-800">{pending ? "Saving route…" : saved ? "Route saved." : canEdit && dirty ? "Unsaved changes" : ""}</p>
    </footer>
  </section>;
}

```

### `components/builder/TripPlanner/TripSummaryCard.tsx`

```typescript
"use client";

import {
    AlertTriangle,
    CalendarDays,
    CloudSun,
    MapPin,
    Pencil,
    Thermometer,
    Users,
} from "lucide-react";

import {
    formatDateRange,
    getDaysUntil,
    getNights,
} from "@/lib/trip";

import type { CompatibilityIssue } from "@/lib/compatibility";

const conditionMeta: Record<
    string,
    {
        label: string;
        icon: string;
        className: string;
    }
> = {
    dry: {
        label: "Dry",
        icon: "☀️",
        className: "bg-amber-50 text-amber-800",
    },
    rain: {
        label: "Rain expected",
        icon: "🌧️",
        className: "bg-blue-50 text-blue-800",
    },
    snow: {
        label: "Snow expected",
        icon: "❄️",
        className: "bg-sky-50 text-sky-800",
    },
};

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
    };
    issues: CompatibilityIssue[];
    onEdit?: () => void;
};

export default function TripSummaryCard({
    build,
    issues,
    onEdit,
}: Props) {
    const nights = getNights(
        build.startDate,
        build.endDate,
    );

    const daysUntil = getDaysUntil(build.startDate);

    const condition = build.conditions
        ? conditionMeta[build.conditions]
        : null;

    const issueCount = issues.filter(
        (issue) =>
            issue.severity === "warning" ||
            issue.severity === "error",
    ).length;

    const shortLocation =
        build.location?.split(",")[0] || "Unnamed trip";

    const countdown =
        daysUntil == null
            ? "Dates not set"
            : daysUntil > 1
                ? `${daysUntil} days away`
                : daysUntil === 1
                    ? "Tomorrow"
                    : daysUntil === 0
                        ? "Starts today"
                        : "Trip date passed";

    return (
        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 px-5 py-6 text-white sm:px-8 sm:py-8">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-green-50">
                                {countdown}
                            </span>

                            {condition && (
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${condition.className}`}
                                >
                                    {condition.icon} {condition.label}
                                </span>
                            )}
                        </div>

                        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            {shortLocation}
                        </h1>

                        {build.location && (
                            <p className="mt-2 flex items-center gap-2 text-sm text-green-100">
                                <MapPin className="h-4 w-4" />
                                {build.location}
                            </p>
                        )}

                        <p className="mt-3 text-sm text-white/70">
                            {formatDateRange(
                                build.startDate,
                                build.endDate,
                            )}
                            {" · "}
                            {nights} night{nights === 1 ? "" : "s"}
                            {" · "}
                            {build.people} traveler
                            {build.people === 1 ? "" : "s"}
                        </p>
                    </div>

                    {onEdit && <button
                        type="button"
                        onClick={onEdit}
                        className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-green-950 shadow-sm transition hover:bg-green-50"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit trip
                    </button>}
                </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-y border-b border-gray-200 sm:grid-cols-4 sm:divide-y-0">
                <StatCard
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="Dates"
                    value={formatDateRange(
                        build.startDate,
                        build.endDate,
                    )}
                    sub={`${nights} night${nights === 1 ? "" : "s"}`}
                />

                <StatCard
                    icon={<Users className="h-4 w-4" />}
                    label="Group"
                    value={`${build.people}`}
                    sub={`traveler${build.people === 1 ? "" : "s"}`}
                />

                <StatCard
                    icon={<Thermometer className="h-4 w-4" />}
                    label="Lowest"
                    value={
                        build.minTemperature != null
                            ? `${build.minTemperature}°C`
                            : "Not set"
                    }
                    sub="expected low"
                />

                <StatCard
                    icon={<CloudSun className="h-4 w-4" />}
                    label="Conditions"
                    value={condition?.label ?? "Unknown"}
                    sub="overall trip"
                />
            </div>

            {issueCount > 0 ? (
                <div className="flex items-start gap-3 bg-amber-50 px-5 py-4 text-sm text-amber-950 sm:px-8">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                    <div>
                        <p className="font-bold">
                            {issueCount} gear issue
                            {issueCount === 1 ? "" : "s"} to check
                        </p>

                        <p className="mt-0.5 text-xs text-amber-800">
                            Review your gear tab before leaving.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-800 sm:px-8">
                    ✓ No major gear compatibility problems found.
                </div>
            )}
        </section>
    );
}

function StatCard({
    icon,
    label,
    value,
    sub,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    sub?: string;
}) {
    return (
        <div className="min-w-0 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-gray-400">
                {icon}

                <p className="text-[10px] font-bold uppercase tracking-wider">
                    {label}
                </p>
            </div>

            <p className="mt-2 truncate text-base font-bold text-gray-900 sm:text-lg">
                {value}
            </p>

            {sub && (
                <p className="mt-1 text-xs text-gray-400">
                    {sub}
                </p>
            )}
        </div>
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

### `components/builder/WeightSummary.tsx`

```typescript
type Props = {
    base: number;
    consumable: number;
    worn: number;
    total: number;
    totalCost: number;
};

function toLb(grams: number) {
    return (grams / 453.592).toFixed(2);
}

export default function WeightSummary({
    base,
    consumable,
    worn,
    total,
    totalCost,
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

### `components/gear/GearAccountActions.tsx`

```typescript
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { addFavorite, addOwnedGear, removeFavorite, removeOwnedGear } from "@/app/profile/gear/actions";
import { Heart, PackageCheck } from "lucide-react";

export default async function GearAccountActions({ gearId }: { gearId: string }) {
  const session = await auth();
  if (!session?.user?.email) return <a href="/api/auth/signin" className="inline-flex rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Sign in to save gear</a>;
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { ownedGear: { where: { gearId }, select: { id: true } }, favorites: { where: { gearId }, select: { id: true } } },
  });
  const owned = Boolean(user?.ownedGear.length);
  const favorite = Boolean(user?.favorites.length);

  return (
    <div className="flex flex-wrap gap-2">
      <form action={owned ? removeOwnedGear : addOwnedGear}><input type="hidden" name="gearId" value={gearId} /><button className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${owned ? "bg-emerald-100 text-emerald-900" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}><PackageCheck className="h-4 w-4" />{owned ? "Owned" : "I own this"}</button></form>
      <form action={favorite ? removeFavorite : addFavorite}><input type="hidden" name="gearId" value={gearId} /><button className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${favorite ? "bg-pink-100 text-pink-800" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}><Heart className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />{favorite ? "Favorited" : "Favorite"}</button></form>
    </div>
  );
}

```

### `components/GearCard.tsx`

```typescript
import Link from "next/link";

type GearCardProps = {
  gear: {
    id: string;
    name: string;
    weight_g: number | null;
    price_cad: number | null;
    brand: {
      name: string;
    };
    category: {
      name: string;
    };
  };
};


export default function GearCard({ gear }: GearCardProps) {
  return (
    <div className="rounded-xl border p-6 hover:shadow-lg transition">

      <h2 className="text-xl font-bold">
        {gear.name}
      </h2>

      <p className="text-gray-500">
        {gear.brand.name}
      </p>


      <div className="mt-4 space-y-1">

        <p>
          Category: {gear.category.name}
        </p>

        <p>
          Weight: {gear.weight_g ?? "Unknown"}g
        </p>

        <p>
          Price:
          {gear.price_cad
            ? `$${gear.price_cad} CAD`
            : "Unknown"}
        </p>

      </div>


      <Link
        href={`/gear/${gear.id}`}
        className="inline-block mt-5 underline"
      >
        View Details
      </Link>

    </div>
  );
}
```

### `components/GearFilters.tsx`

```typescript
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


export default function GearFilters() {

  const router = useRouter();
  const searchParams = useSearchParams();


  const [category, setCategory] = useState(
    searchParams.get("category") || ""
  );

  const [maxWeight, setMaxWeight] = useState(
    searchParams.get("maxWeight") || ""
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || ""
  );

  const [season, setSeason] = useState(
    searchParams.get("season") || ""
  );


  function applyFilters() {

    const params = new URLSearchParams();


    const q = searchParams.get("q");

    if (q) {
      params.set("q", q);
    }


    if (category) {
      params.set("category", category);
    }


    if (maxWeight) {
      params.set("maxWeight", maxWeight);
    }


    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }


    if (season) {
      params.set("season", season);
    }


    router.push(`/gear?${params.toString()}`);
  }



  return (
    <div className="border rounded-xl p-5 mb-8 space-y-4">


      <select
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        className="border rounded p-2 w-full"
      >

        <option value="">
          All Categories
        </option>

        <option value="Packs">
          Packs
        </option>

        <option value="Shelter">
          Shelter
        </option>

        <option value="Sleep">
          Sleep
        </option>

      </select>



      <input
        type="number"
        placeholder="Max weight (grams)"
        value={maxWeight}
        onChange={(e)=>setMaxWeight(e.target.value)}
        className="border rounded p-2 w-full"
      />



      <input
        type="number"
        placeholder="Max price CAD"
        value={maxPrice}
        onChange={(e)=>setMaxPrice(e.target.value)}
        className="border rounded p-2 w-full"
      />



      <select
        value={season}
        onChange={(e)=>setSeason(e.target.value)}
        className="border rounded p-2 w-full"
      >

        <option value="">
          All Seasons
        </option>

        <option value="3-season">
          3 Season
        </option>

        <option value="4-season">
          4 Season
        </option>

      </select>



      <button
        onClick={applyFilters}
        className="rounded-lg bg-black text-white px-5 py-2"
      >
        Apply Filters
      </button>


    </div>
  );
}
```

### `components/GearSort.tsx`

```typescript
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


export default function GearSort() {

  const router = useRouter();
  const searchParams = useSearchParams();


  const [sort, setSort] = useState(
    searchParams.get("sort") || ""
  );


  function changeSort(value: string) {

    setSort(value);


    const params = new URLSearchParams(
      searchParams.toString()
    );


    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }


    router.push(`/gear?${params.toString()}`);

  }


  return (

    <select
      value={sort}
      onChange={(e)=>changeSort(e.target.value)}
      className="border rounded-lg p-3 mb-8"
    >

      <option value="">
        Sort By
      </option>


      <option value="weight">
        Lowest Weight
      </option>


      <option value="price">
        Lowest Price
      </option>


      <option value="newest">
        Newest
      </option>


    </select>

  );
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

export default function NavbarNavigation({ builderHref, categories, account }: {
  builderHref: string; categories: Category[]; account: ReactNode;
}) {
  const [panel, setPanel] = useState<"gear" | "mobile" | null>(null);
  const [mobileGear, setMobileGear] = useState(false);
  const [selectedId, setSelectedId] = useState(categories[0]?.id ?? "");
  const selected = categories.find(category => category.id === selectedId) ?? categories[0];
  const headerRef = useRef<HTMLElement>(null);
  const gearRef = useRef<HTMLButtonElement>(null);
  const mobileRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  function close() { setPanel(null); setMobileGear(false); }
  useEffect(() => { setPanel(null); setMobileGear(false); }, [pathname]);
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

```

### `components/profile/BuildCard.tsx`

```typescript
import Link from "next/link";
import { CalendarDays, Copy, MapPin, Package, Pencil } from "lucide-react";
import { deleteBuild, duplicateProfileBuild, renameBuild } from "@/app/profile/actions";
import { dateRange, summarizeBuild, weightLabel, type ProfileBuild } from "@/lib/profile";
import DeleteBuildButton from "./DeleteBuildButton";

export default function BuildCard({ build }: { build: ProfileBuild }) {
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
        <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-medium text-slate-500">Base weight</p><p className="mt-1 font-bold text-slate-900">{weightLabel(totals.base)}</p></div>
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
import Link from "next/link";
import { Backpack, Heart, PackageCheck, Scale, Trash2 } from "lucide-react";
import {
  addGearToCurrentBuild,
  removeFavorite,
  removeOwnedGear,
  moveFavoriteToGear,
} from "@/app/profile/gear/actions";

type Gear = {
  id: string;
  name: string;
  weight_g: number | null;
  price_cad: number | null;
  brand: { name: string };
  category: { name: string; slug: string };
  images: Array<{ url: string; isPrimary: boolean }>;
};

type Props = {
  gear: Gear;
  mode: "owned" | "favorite";
  addedAt: Date;
  hasCurrentBuild?: boolean;
};

export default function GearLibraryCard({ gear, mode, addedAt, hasCurrentBuild = false }: Props) {
  const image = gear.images.find((item) => item.isPrimary)?.url || gear.images[0]?.url;

  return (
    <article className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-300 hover:shadow-md">
      <Link href={`/gear/${gear.id}`} className="flex w-28 shrink-0 items-center justify-center bg-slate-50 sm:w-36">
        {image ? (
          <img src={image} alt="" className="h-full max-h-44 w-full object-contain p-3" />
        ) : (
          <Backpack className="h-10 w-10 text-slate-300" />
        )}
      </Link>

      <div className="min-w-0 flex-1 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700">{gear.brand.name}</p>
            <Link href={`/gear/${gear.id}`} className="mt-1 block truncate text-lg font-bold text-slate-950 hover:text-green-800">
              {gear.name}
            </Link>
            <p className="mt-1 text-xs text-slate-500">{gear.category.name} · Added {addedAt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</p>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{gear.category.name}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
          <span className="flex items-center gap-1.5"><Scale className="h-4 w-4 text-slate-400" />{gear.weight_g == null ? "Weight unknown" : gear.weight_g >= 1000 ? `${(gear.weight_g / 1000).toFixed(2)} kg` : `${gear.weight_g} g`}</span>
          <span>{gear.price_cad == null ? "Price unknown" : `$${gear.price_cad.toFixed(2)} CAD`}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {mode === "owned" ? (
            <>
              <form action={addGearToCurrentBuild}>
                <input type="hidden" name="gearId" value={gear.id} />
                <button disabled={!hasCurrentBuild} title={hasCurrentBuild ? "Add to your current build" : "Open or create a build first"} className="flex items-center gap-2 rounded-lg bg-green-900 px-3 py-2 text-xs font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-slate-300">
                  <Backpack className="h-3.5 w-3.5" />Add to current build
                </button>
              </form>
              <form action={removeOwnedGear}>
                <input type="hidden" name="gearId" value={gear.id} />
                <button className="flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" />Remove</button>
              </form>
            </>
          ) : (
            <>
              <form action={moveFavoriteToGear}>
                <input type="hidden" name="gearId" value={gear.id} />
                <button className="flex items-center gap-2 rounded-lg bg-green-900 px-3 py-2 text-xs font-semibold text-white hover:bg-green-800"><PackageCheck className="h-3.5 w-3.5" />I own this</button>
              </form>
              <form action={removeFavorite}>
                <input type="hidden" name="gearId" value={gear.id} />
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"><Heart className="h-3.5 w-3.5" />Unfavorite</button>
              </form>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

```

### `components/ProfileDropdown.tsx`

```typescript
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
                    <img
                        src={image}
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
                            href="/build"
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

### `components/SearchBar.tsx`

```typescript
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


export default function SearchBar() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const currentSearch =
    searchParams.get("q") || "";


  const [search, setSearch] =
    useState(currentSearch);


  function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();


    if (search.trim()) {
      router.push(`/gear?q=${search}`);
    } else {
      router.push("/gear");
    }

  }


  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8"
    >

      <input
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        placeholder="Search gear..."
        className="border rounded-lg px-4 py-3 w-full"
      />

    </form>
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
    "summary": "Lakeside camping with cooking shelters, pit toilets, and food hangs.",
    "caution": "Reservations are required. Check current trail conditions.",
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
    "summary": "Alpine-meadow platforms with cooking shelters, pit toilets, and food hangs.",
    "caution": "Reservations are required.",
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
    "summary": "A quieter Black Tusk approach with platforms, toilets, and food hangs.",
    "caution": "Food hangs can fill. Check current BC Parks guidance.",
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
    "elevationGainM": 0,
    "difficulty": "easy",
    "tentSites": 10,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "required",
    "featured": true,
    "summary": "An easy forest-and-lake trip with shoreline sites and food hangs.",
    "caution": "The access road is unpaved. Check current road conditions.",
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
    "elevationGainM": 0,
    "difficulty": "easy",
    "tentSites": 7,
    "toilet": "yes",
    "foodStorage": "yes",
    "dogs": "not-allowed",
    "reservations": "required",
    "featured": false,
    "summary": "A small campground farther along Cheakamus Lake.",
    "caution": "The access road is unpaved.",
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
    "tentSites": null,
    "toilet": "yes",
    "foodStorage": "seasonal",
    "dogs": "not-allowed",
    "reservations": "required",
    "featured": true,
    "summary": "High-alpine camping beside Russet Lake.",
    "caution": "Summer food hangs change to a storage box in winter.",
    "sourceUrl": "https://bcparks.ca/garibaldi-park/singing-pass-area/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "elfin-lakes",
    "name": "Elfin Lakes",
    "park": "Garibaldi Park",
    "region": "Sea to Sky",
    "latitude": 49.789318,
    "longitude": -122.98781,
    "distanceKm": 11,
    "elevationGainM": 600,
    "difficulty": "moderate",
    "tentSites": null,
    "toilet": "unknown",
    "foodStorage": "unknown",
    "dogs": "not-allowed",
    "reservations": "required",
    "featured": true,
    "summary": "A popular ridge hike with a shelter and camping area.",
    "caution": "Vehicle chains are mandatory from October through May.",
    "sourceUrl": "https://bcparks.ca/garibaldi-park/diamond-head-area/",
    "bookingUrl": "https://camping.bcparks.ca"
  },
  {
    "id": "upper-joffre-lake",
    "name": "Upper Joffre Lake Campground",
    "park": "Joffre Lakes Park",
    "region": "Sea to Sky",
    "latitude": 50.34403,
    "longitude": -122.47669,
    "distanceKm": null,
    "elevationGainM": 400,
    "difficulty": "moderate",
    "tentSites": null,
    "toilet": "unknown",
    "foodStorage": "unknown",
    "dogs": "not-allowed",
    "reservations": "required",
    "featured": true,
    "summary": "Tent pads beside Upper Joffre Lake beneath the Matier Glacier.",
    "caution": "No drinking water or cell service. Pets and campfires are prohibited.",
    "sourceUrl": "https://bcparks.ca/joffre-lakes-park/",
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
    "summary": "A popular backcountry campground with a shelter, outhouses, and bear cache.",
    "caution": "Peak-season reservations apply.",
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
    "summary": "Subalpine camping along the Heather Trail with a cache and outhouse.",
    "caution": "Spring access can close for bear habitat and trail protection.",
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
    "summary": "A strenuous approach to a high campground near Manning's larch grove.",
    "caution": "The official listing does not confirm a bear cache.",
    "sourceUrl": "https://bcparks.ca/ec-manning-park/backcountry-camping/",
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
    "id": "alder-flats",
    "name": "Alder Flats",
    "park": "Golden Ears Park",
    "region": "Lower Mainland",
    "latitude": 49.363611,
    "longitude": -122.471937,
    "distanceKm": null,
    "elevationGainM": null,
    "difficulty": "moderate",
    "tentSites": null,
    "toilet": "unknown",
    "foodStorage": "unknown",
    "dogs": "under-control",
    "reservations": "check-current-rules",
    "featured": false,
    "summary": "A forested backcountry campground on the Golden Ears Trail.",
    "caution": "Check current backcountry and food-storage rules.",
    "sourceUrl": "https://bcparks.ca/golden-ears-park/",
    "bookingUrl": "https://camping.bcparks.ca"
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
import { requireBuildAccess } from "@/lib/build-access";
import {
  ensureBuildRevisionBaseline,
  getBuildSnapshot,
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
  return { ...day, date };
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
  revision: { id: string; snapshot: unknown; createdAt: Date; summary: string },
  summary: string,
) {
  const snapshot = parseSnapshot(revision.snapshot);
  if (snapshot.items.length > 1000 || snapshot.days.length > 366) {
    throw new Error("This history entry is too large to restore.");
  }

  // Normally the latest revision already represents the current state. If some
  // future mutation forgets to write history, keep a safety copy before restore.
  const current = await getBuildSnapshot(access.id, access.userId);
  const latest = await prisma.buildRevision.findFirst({
    where: { buildId: access.id },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    select: { snapshot: true },
  });
  if (!latest || !isRecord(latest.snapshot) || !snapshotsEqual(current, parseSnapshot(latest.snapshot))) {
    await recordBuildRevision(access.id, access.userId, "history", "Saved before restore");
  }

  const items = snapshot.items.map(safeItem);
  const days = snapshot.days.map(safeDay);
  const requestedGearIds = [...new Set(items.map((item) => item.gearId).filter((id): id is string => Boolean(id)))];
  const existingGear = requestedGearIds.length
    ? await prisma.gear.findMany({ where: { id: { in: requestedGearIds } }, select: { id: true } })
    : [];
  const existingGearIds = new Set(existingGear.map((gear) => gear.id));

  await prisma.$transaction(async (tx) => {
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
        routeWaypoints: snapshot.routeWaypoints == null ? Prisma.DbNull : JSON.parse(JSON.stringify(snapshot.routeWaypoints)),
        tripLogistics: snapshot.tripLogistics == null ? Prisma.DbNull : JSON.parse(JSON.stringify(snapshot.tripLogistics)),
      },
    });

    await tx.buildItem.deleteMany({ where: { buildId: access.id } });
    for (const item of items) {
      const gearId = item.gearId && existingGearIds.has(item.gearId) ? item.gearId : null;
      await tx.buildItem.create({
        data: {
          buildId: access.id,
          gearId,
          quantity: item.quantity,
          isConsumable: item.isConsumable,
          isWorn: item.isWorn,
          customCategory: item.customCategory,
          gearNameSnapshot: gearId ? item.gearNameSnapshot : item.gearNameSnapshot ?? item.gearName ?? "Restored item",
          weightSnapshot: item.weightSnapshot,
          priceSnapshot: item.priceSnapshot,
        },
      });
    }

    await tx.tripDay.deleteMany({ where: { buildId: access.id } });
    if (days.length) {
      await tx.tripDay.createMany({
        data: days.map((day) => ({ ...day, buildId: access.id })),
      });
    }
  });

  await recordBuildRevision(access.id, access.userId, "restore", summary);
  revalidatePath(`/build/${access.id}`);
  revalidatePath("/profile/builds");

  return { ok: true };
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
  return restoreSnapshot(access, revision, `Restored ${restoredDate}`);
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
  await restoreSnapshot(access, target, `Undid: ${revisions[0].summary}`);
  return { ok: true, undone: revisions[0].summary };
}

```

### `lib/build-history.ts`

```typescript
import "server-only";

import { prisma } from "@/lib/prisma";

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
  if (["create", "copy", "import", "restore", "history", "baseline", "settings"].includes(action)) return false;
  if (action !== previousAction) return false;
  if (Date.now() - previousCreatedAt.getTime() > 90_000) return false;
  return summaryGroupKey(previousSummary) === summaryGroupKey(nextSummary);
}

export async function getBuildSnapshot(buildId: string, userId: string | null): Promise<BuildSnapshot> {
  const build = await prisma.build.findUnique({
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

export async function ensureBuildRevisionBaseline(buildId: string, userId: string | null) {
  const count = await prisma.buildRevision.count({ where: { buildId } });
  if (count > 0) return;
  const snapshot = await getBuildSnapshot(buildId, userId);
  await prisma.buildRevision.create({
    data: {
      buildId,
      action: "baseline",
      summary: "First saved version",
      snapshot: JSON.parse(JSON.stringify(snapshot)),
    },
  });
}

export async function recordBuildRevision(
  buildId: string,
  userId: string | null,
  action: string,
  requestedSummary: string,
) {
  await prisma.build.update({ where: { id: buildId, userId }, data: { updatedAt: new Date() } });

  const last = await prisma.buildRevision.findFirst({
    where: { buildId },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    select: { id: true, action: true, summary: true, snapshot: true, createdAt: true },
  });
  const previous = last?.snapshot && typeof last.snapshot === "object" && !Array.isArray(last.snapshot)
    ? last.snapshot as unknown as BuildSnapshot
    : null;
  const snapshot = await getBuildSnapshot(buildId, userId);
  const summary = summarizeChange(previous, snapshot, action, requestedSummary).slice(0, 240);
  const safeAction = action.slice(0, 50);
  const jsonSnapshot = JSON.parse(JSON.stringify(snapshot));

  if (last && canCoalesce(safeAction, last.action, last.summary, summary, last.createdAt)) {
    await prisma.buildRevision.update({
      where: { id: last.id },
      data: { summary, snapshot: jsonSnapshot, createdAt: new Date() },
    });
    return last.id;
  }

  const revision = await prisma.buildRevision.create({
    data: {
      buildId,
      action: safeAction,
      summary,
      snapshot: jsonSnapshot,
    },
    select: { id: true },
  });
  return revision.id;
}

```

### `lib/build-settings-actions.ts`

```typescript
"use server";

import { prisma } from "@/lib/prisma";
import { requireBuildAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { ensureBuildRevisionBaseline, recordBuildRevision } from "@/lib/build-history";

export async function renameBuild(buildId: string, name: string) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200 || typeof name !== "string") {
    throw new Error("Invalid build name.");
  }
  const trimmed = name.trim();
  if (!trimmed || trimmed.length > 100) throw new Error("Use a build name between 1 and 100 characters.");
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(access.id, access.userId);
  const result = await prisma.build.updateMany({
    where: { id: access.id, userId: access.userId },
    data: { name: trimmed },
  });
  if (result.count !== 1) throw new Error("Build access changed. Refresh and try again.");
  await recordBuildRevision(access.id, access.userId, "settings", "Renamed build");
  revalidatePath(`/build/${access.id}`);
  revalidatePath("/profile/builds");
}

```

### `lib/build-visibility-actions.ts`

```typescript
"use server";

import { prisma } from "@/lib/prisma";
import { requireBuildAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { ensureBuildRevisionBaseline, recordBuildRevision } from "@/lib/build-history";

export async function setBuildVisibility(buildId: string, isPublic: boolean) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200 || typeof isPublic !== "boolean") {
    throw new Error("Invalid visibility request.");
  }
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(access.id, access.userId);
  // Repeat the owner condition in the write to prevent a stale guest claim.
  const result = await prisma.build.updateMany({
    where: { id: access.id, userId: access.userId },
    data: { isPublic },
  });
  if (result.count !== 1) throw new Error("Build access changed. Refresh and try again.");
  await recordBuildRevision(access.id, access.userId, "settings", "Changed build visibility");
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

export function gramsToPounds(grams: number) {
  return grams / 453.592;
}

export function calculateTotalCost(items: CalcItem[]) {
  return items.reduce((total, item) => total + itemPrice(item), 0);
}
```

### `lib/compatibility.ts`

```typescript
export type CompatibilitySeverity = "error" | "warning" | "info";

export type CompatibilityIssue = {
    id: string;
    severity: CompatibilitySeverity;
    category: string;
    message: string;
    itemIds?: string[];
};

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
};

export type BuildForCompat = {
    people: number;
    minTemperature: number | null;
    conditions: string | null;
    startDate: Date | null;
    endDate: Date | null;
};

const REQUIRED_CATEGORIES = ["Shelter", "Sleep", "Cooking", "Water"];

function categoryOf(item: CompatItem): string | null {
    return item.gear?.category.name ?? item.customCategory ?? null;
}

function subcategorySlugOf(item: CompatItem): string | null {
    return item.gear?.subcategory?.slug ?? null;
}

function itemNameOf(item: CompatItem): string {
    return item.gear?.name ?? item.gearNameSnapshot ?? "Custom item";
}

function nightsBetween(start: Date | null, end: Date | null): number | null {
    if (!start || !end) return null;
    const ms = end.getTime() - start.getTime();
    return Math.max(1, Math.round(ms / 86_400_000));
}

function coldestTemp(build: BuildForCompat, days: TripDayForCompat[]): number | null {
    const temps = [build.minTemperature, ...days.map((d) => d.minTemperature)].filter(
        (t): t is number => t != null
    );
    return temps.length > 0 ? Math.min(...temps) : null;
}

function conditionsSet(build: BuildForCompat, days: TripDayForCompat[]): Set<string> {
    const set = new Set<string>();
    if (build.conditions) set.add(build.conditions);
    for (const d of days) if (d.conditions) set.add(d.conditions);
    return set;
}

// --- checks --------------------------------------------------------------

function checkTemperatureRating(
    build: BuildForCompat,
    items: CompatItem[],
    days: TripDayForCompat[]
): CompatibilityIssue[] {
    const coldest = coldestTemp(build, days);
    if (coldest == null) return [];

    const sleepItems = items.filter((i) => categoryOf(i) === "Sleep" && !i.isConsumable);
    const rated = sleepItems.filter((i) => i.gear?.temperature_rating != null);
    const issues: CompatibilityIssue[] = [];

    if (sleepItems.length > 0 && rated.length === 0) {
        issues.push({
            id: "temp-unrated",
            severity: "info",
            category: "Temperature",
            message: `None of your sleep system items list a temperature rating, so it can't be checked against the trip low of ${coldest}°C.`,
            itemIds: sleepItems.map((i) => i.id),
        });
    }

    for (const item of rated) {
        const rating = item.gear!.temperature_rating!;
        const margin = rating - coldest; // positive => not warm enough

        if (margin > 8) {
            issues.push({
                id: `temp-error-${item.id}`,
                severity: "error",
                category: "Temperature",
                message: `${itemNameOf(item)} is rated to ${rating}°C, but the coldest night is ${coldest}°C — a ${margin}° gap.`,
                itemIds: [item.id],
            });
        } else if (margin > 0) {
            issues.push({
                id: `temp-warn-${item.id}`,
                severity: "warning",
                category: "Temperature",
                message: `${itemNameOf(item)} is rated to ${rating}°C, close to the coldest night of ${coldest}°C. Consider a liner or warmer layers.`,
                itemIds: [item.id],
            });
        }
    }

    return issues;
}

function checkShelterCapacity(build: BuildForCompat, items: CompatItem[]): CompatibilityIssue[] {
    const shelters = items.filter(
        (i) => subcategorySlugOf(i) === "tent" || subcategorySlugOf(i) === "bivy"
    );
    if (shelters.length === 0) return [];

    const totalCapacity = shelters.reduce(
        (sum, i) => sum + (i.gear?.capacity_l ?? 0) * i.quantity,
        0
    );
    if (totalCapacity === 0) return [];

    if (totalCapacity < build.people) {
        return [{
            id: "shelter-capacity",
            severity: "error",
            category: "Capacity",
            message: `Your shelter sleeps ${totalCapacity}, but the trip has ${build.people} people.`,
            itemIds: shelters.map((i) => i.id),
        }];
    }

    if (totalCapacity > build.people + 1) {
        return [{
            id: "shelter-oversized",
            severity: "info",
            category: "Capacity",
            message: `Your shelter sleeps ${totalCapacity} for a ${build.people}-person trip — extra weight if that's not intentional.`,
            itemIds: shelters.map((i) => i.id),
        }];
    }

    return [];
}

function checkPackCapacity(build: BuildForCompat, items: CompatItem[]): CompatibilityIssue[] {
    const packs = items.filter((i) => categoryOf(i) === "Packs" && !i.isConsumable);
    if (packs.length === 0) return [];

    const nights = nightsBetween(build.startDate, build.endDate);
    if (nights == null) return [];

    const recommended: [number, number] =
        nights <= 2 ? [30, 50] : nights <= 5 ? [50, 70] : [65, 90];
    const [lo, hi] = recommended;
    const issues: CompatibilityIssue[] = [];

    for (const pack of packs) {
        const cap = pack.gear?.capacity_l;
        if (cap == null) continue;

        if (cap < lo) {
            issues.push({
                id: `pack-small-${pack.id}`,
                severity: "warning",
                category: "Capacity",
                message: `${itemNameOf(pack)} is ${cap}L for a ${nights}-night trip — ${lo}-${hi}L is typically more comfortable.`,
                itemIds: [pack.id],
            });
        } else if (cap > hi + 20) {
            issues.push({
                id: `pack-large-${pack.id}`,
                severity: "info",
                category: "Capacity",
                message: `${itemNameOf(pack)} is ${cap}L for a ${nights}-night trip — more than you likely need.`,
                itemIds: [pack.id],
            });
        }
    }

    return issues;
}

function checkCookwareCapacity(build: BuildForCompat, items: CompatItem[]): CompatibilityIssue[] {
    if (build.people <= 1) return [];

    const cookware = items.filter((i) => subcategorySlugOf(i) === "cookware" && !i.isConsumable);
    if (cookware.length === 0) return [];

    const totalCapacity = cookware.reduce(
        (sum, i) => sum + (i.gear?.capacity_l ?? 0) * i.quantity,
        0
    );
    if (totalCapacity === 0) return [];

    const recommendedMin = build.people * 0.5;
    if (totalCapacity < recommendedMin) {
        return [{
            id: "cookware-small",
            severity: "warning",
            category: "Capacity",
            message: `Cookware totals ${totalCapacity}L for ${build.people} people — closer to ${recommendedMin.toFixed(1)}L+ makes group cooking easier.`,
            itemIds: cookware.map((i) => i.id),
        }];
    }

    return [];
}

function checkWaterproofing(
    build: BuildForCompat,
    items: CompatItem[],
    days: TripDayForCompat[]
): CompatibilityIssue[] {
    const conditions = conditionsSet(build, days);
    if (!conditions.has("rain") && !conditions.has("snow")) return [];

    const shelterItems = items.filter((i) => categoryOf(i) === "Shelter" && !i.isConsumable);
    const unrated = shelterItems.filter((i) => i.gear && i.gear.waterproof === false);
    if (unrated.length === 0) return [];

    return [{
        id: "waterproof-shelter",
        severity: "warning",
        category: "Weather",
        message: `Rain or snow is expected, but ${unrated.map(itemNameOf).join(", ")} isn't marked waterproof.`,
        itemIds: unrated.map((i) => i.id),
    }];
}

function checkSeasonRating(
    build: BuildForCompat,
    items: CompatItem[],
    days: TripDayForCompat[]
): CompatibilityIssue[] {
    const conditions = conditionsSet(build, days);
    const coldest = coldestTemp(build, days);
    const needsWinterGear = conditions.has("snow") || (coldest != null && coldest <= -10);
    if (!needsWinterGear) return [];

    const threeSeason = items.filter(
        (i) => categoryOf(i) === "Shelter" && !i.isConsumable && i.gear?.season === "3-season"
    );
    if (threeSeason.length === 0) return [];

    return [{
        id: "season-mismatch",
        severity: "warning",
        category: "Weather",
        message: `${threeSeason.map(itemNameOf).join(", ")} is rated 3-season, but conditions call for winter-capable shelter.`,
        itemIds: threeSeason.map((i) => i.id),
    }];
}

function checkEssentialCategories(items: CompatItem[]): CompatibilityIssue[] {
    const present = new Set(
        items.filter((i) => !i.isConsumable).map((i) => categoryOf(i)).filter(Boolean)
    );

    return REQUIRED_CATEGORIES.filter((cat) => !present.has(cat)).map((cat) => ({
        id: `missing-${cat.toLowerCase()}`,
        severity: "info" as const,
        category: "Missing Gear",
        message: `No ${cat.toLowerCase()} gear added yet.`,
    }));
}

function checkDuplicates(items: CompatItem[]): CompatibilityIssue[] {
    const tracked = ["Shelter", "Packs", "Cooking"];
    const issues: CompatibilityIssue[] = [];

    for (const cat of tracked) {
        const inCategory = items.filter((i) => categoryOf(i) === cat && !i.isConsumable);
        const unique = new Set(inCategory.map((i) => i.gear?.id ?? i.id));

        if (unique.size > 1) {
            issues.push({
                id: `duplicate-${cat.toLowerCase()}`,
                severity: "info",
                category: "Redundancy",
                message: `You have ${unique.size} different ${cat.toLowerCase()} items — double check you don't need just one.`,
                itemIds: inCategory.map((i) => i.id),
            });
        }
    }

    return issues;
}

function checkUnknownSpecs(items: CompatItem[]): CompatibilityIssue[] {
    const missingWeight = items.filter(
        (i) => !i.isConsumable && (i.gear?.weight_g ?? i.weightSnapshot) == null
    );
    if (missingWeight.length === 0) return [];

    return [{
        id: "missing-weight",
        severity: "info",
        category: "Data",
        message: `${missingWeight.length} item${missingWeight.length !== 1 ? "s" : ""} ${missingWeight.length !== 1 ? "don't" : "doesn't"} have a listed weight — totals may be underestimated.`,
        itemIds: missingWeight.map((i) => i.id),
    }];
}

function checkBaseWeight(items: CompatItem[]): CompatibilityIssue[] {
    const baseGrams = items
        .filter((i) => !i.isWorn && !i.isConsumable)
        .reduce((sum, i) => sum + (i.gear?.weight_g ?? i.weightSnapshot ?? 0) * i.quantity, 0);

    if (baseGrams > 9000) {
        return [{
            id: "heavy-base-weight",
            severity: "info",
            category: "Weight",
            message: `Base weight is ${(baseGrams / 1000).toFixed(1)}kg — on the heavier end for backpacking.`,
        }];
    }

    return [];
}

// --- entrypoints -----------------------------------------------------------

export function evaluateCompatibility(
    build: BuildForCompat,
    items: CompatItem[],
    days: TripDayForCompat[] = []
): CompatibilityIssue[] {
    return [
        ...checkTemperatureRating(build, items, days),
        ...checkShelterCapacity(build, items),
        ...checkPackCapacity(build, items),
        ...checkCookwareCapacity(build, items),
        ...checkWaterproofing(build, items, days),
        ...checkSeasonRating(build, items, days),
        ...checkEssentialCategories(items),
        ...checkDuplicates(items),
        ...checkUnknownSpecs(items),
        ...checkBaseWeight(items),
    ];
}

export function summarizeCompatibility(issues: CompatibilityIssue[]) {
    const errors = issues.filter((i) => i.severity === "error").length;
    const warnings = issues.filter((i) => i.severity === "warning").length;
    const infos = issues.filter((i) => i.severity === "info").length;
    const status: "ok" | "warning" | "error" =
        errors > 0 ? "error" : warnings > 0 ? "warning" : "ok";

    return { status, errors, warnings, infos, total: issues.length };
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

### `lib/gear-picker.ts`

```typescript
export type PickerSearch = Record<string, string | string[] | undefined>;

export function pickerValue(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export function pickerLimit(value: string | string[] | undefined): number | undefined {
  const text = pickerValue(value).trim();
  if (!text) return undefined;
  const number = Number(text);
  return Number.isFinite(number) && number >= 0 ? number : undefined;
}

export function pickerWeight(value: string | string[] | undefined): number | undefined {
  const limit = pickerLimit(value);
  // Prisma Int filters cannot accept fractions or numbers beyond signed 32-bit.
  return limit === undefined ? undefined : Math.min(Math.floor(limit), 2147483647);
}

export function pickerHref(path: string, filters: PickerSearch, subcategory: string): string {
  const query = new URLSearchParams();
  for (const key of ["q", "brand", "maxWeight", "maxPrice", "sort", "direction"]) {
    const values = filters[key];
    for (const value of Array.isArray(values) ? values : [values]) {
      if (value) query.append(key, value);
    }
  }
  if (subcategory) query.set("subcategory", subcategory);
  return query.size ? `${path}?${query}` : path;
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

### `lib/legacy-gear-selection.ts`

```typescript
import { requireBuildPageAccess } from "@/lib/build-access";
import { redirect } from "next/navigation";
import type { GearBrowseSearch } from "@/components/builder/OriginalGearPicker";

export async function redirectGearSelection(buildId: string, category: string, filters: GearBrowseSearch, subcategory?: string): Promise<never> {
  await requireBuildPageAccess(buildId);
  const query = new URLSearchParams();
  for (const key of ["brand", "maxWeight", "maxPrice", "sort", "direction"]) {
    const value = filters[key];
    if (value) query.set(key, Array.isArray(value) ? value.join(",") : value);
  }
  query.set("build", buildId);
  return redirect(`/gear/${encodeURIComponent(category)}${subcategory ? "/" + encodeURIComponent(subcategory) : ""}?${query}`);
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

export function weightLabel(grams: number) {
  return grams >= 1000 ? `${(grams / 1000).toFixed(2)} kg` : `${Math.round(grams)} g`;
}

```

### `lib/trip-planner-actions.ts`

```typescript
"use server";
import { prisma } from "@/lib/prisma";
import { requireBuildAccess, requireTripDayAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { getDestination } from "@/lib/destinations";
import { getDateRange } from "@/lib/trip";
import { dayTextFields, emptyLogistics, nullableNumber, parseDates, readWaypoints } from "@/lib/trip-planner";
import { ensureBuildRevisionBaseline, recordBuildRevision } from "@/lib/build-history";
const text = (f: FormData, key: string, max = 5000) => { const v = f.get(key); if (v != null && typeof v !== "string") throw new Error(`Invalid ${key}.`); const s = (v ?? "").trim(); if (s.length > max) throw new Error(`${key} is too long (maximum ${max} characters).`); return s || null; };
const number = (f: FormData, key: string, min: number, max: number, integer = false) => nullableNumber(f.get(key),key,min,max,integer);
const condition = (f: FormData) => { const v = text(f,"conditions",20); if (v && !["dry","rain","snow"].includes(v)) throw new Error("Choose a valid weather condition."); return v; };
export async function saveTripDetails(f: FormData) {
  const buildId = text(f,"buildId",200)!;
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(buildId, access.userId);
  const dates = parseDates(text(f,"startDate",10) ?? "", text(f,"endDate",10) ?? "");
  const selected = getDestination(text(f,"destinationId",200));
  const lat = selected?.latitude ?? number(f,"locationLat",-90,90), lng = selected?.longitude ?? number(f,"locationLng",-180,180);
  if ((lat == null) !== (lng == null)) throw new Error("Provide both location coordinates.");
  const data = { ...dates, destinationId: selected?.id ?? null, location: selected ? `${selected.name}, ${selected.park}` : text(f,"location",500), locationLat: lat, locationLng: lng, people: number(f,"people",1,100,true) ?? 1, minTemperature: number(f,"minTemperature",-100,60,true), conditions: condition(f) };
  await prisma.$transaction(async tx => {
    const old = await tx.tripDay.findMany({ where: { buildId }, select: { date: true } });
    const range = dates.startDate && dates.endDate ? getDateRange(dates.startDate,dates.endDate) : [];
    const keys = new Set(range.map(d => d.getTime()));
    if (old.some(d => !keys.has(d.date.getTime())) && f.get("confirmDateChange") !== "yes") throw new Error("The new dates remove itinerary days. Tick the confirmation box to discard those days. Days still within the range will be kept.");
    await tx.build.update({ where: { id: buildId, userId: access.userId }, data });
    if (range.length) await tx.tripDay.createMany({ data: range.map(date => ({ buildId,date })), skipDuplicates: true });
    await tx.tripDay.deleteMany({ where: { buildId, date: { notIn: range } } });
  });
  await recordBuildRevision(buildId, access.userId, "trip", "Updated trip details");
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripDay(f: FormData) {
  const buildId = text(f,"buildId",200)!, dayId = text(f,"dayId",200)!;
  const day = await requireTripDayAccess(buildId,dayId);
  await ensureBuildRevisionBaseline(buildId, day.accessUserId);
  const strings = Object.fromEntries(dayTextFields.map(key => [key,text(f,key)]));
  await prisma.tripDay.update({ where: { id: dayId, buildId, build: { userId: day.accessUserId } }, data: { ...strings, conditions: condition(f), minTemperature: number(f,"minTemperature",-100,60,true), distanceKm: number(f,"distanceKm",0,1000), elevationGainM: number(f,"elevationGainM",0,20000,true), elevationLossM: number(f,"elevationLossM",0,20000,true), durationMinutes: number(f,"durationMinutes",0,1440,true), waterCarryL: number(f,"waterCarryL",0,100) } });
  await recordBuildRevision(buildId, day.accessUserId, "itinerary", "Updated itinerary day");
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripRoute(f: FormData) {
  const buildId = text(f,"buildId",200)!, access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(buildId, access.userId);
  const raw: unknown = JSON.parse(text(f,"waypoints",100000) ?? "[]");
  const points = readWaypoints(raw);
  if (!Array.isArray(raw) || points.length !== raw.length || points.length > 200 || new Set(points.map(p=>p.id)).size !== points.length || points.some(p=>!p.name.trim() || p.name.length>200 || p.id.length>200 || (p.elevationM != null && (p.elevationM < -500 || p.elevationM > 9000)))) throw new Error("Check waypoint names, coordinates, elevations, and unique IDs. Maximum 200 waypoints.");
  await prisma.build.update({ where: { id: buildId,userId: access.userId }, data: { routeWaypoints: points.map(p=>({...p,name:p.name.trim()})) } });
  await recordBuildRevision(buildId, access.userId, "route", "Updated trip route");
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripLogistics(f: FormData) {
  const buildId = text(f,"buildId",200)!, access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(buildId, access.userId);
  const value = Object.fromEntries(Object.keys(emptyLogistics).map(key=>[key,text(f,key) ?? ""]));
  await prisma.build.update({ where: { id: buildId, userId: access.userId }, data: { tripLogistics: value } });
  await recordBuildRevision(buildId, access.userId, "logistics", "Updated trip logistics");
  revalidatePath(`/build/${buildId}`);
}

```

### `lib/trip-planner.ts`

```typescript
export type Waypoint = { id: string; name: string; lat: number; lng: number; elevationM: number | null; kind: "trailhead" | "camp" | "water" | "waypoint" };
export type Logistics = { permits: string; reservations: string; transportation: string; parking: string; emergencyContact: string; emergencyPlan: string; notes: string };
export const emptyLogistics: Logistics = { permits: "", reservations: "", transportation: "", parking: "", emergencyContact: "", emergencyPlan: "", notes: "" };
export type PlannerDay = { id: string; date: Date; minTemperature: number | null; conditions: string | null; notes: string | null; startLocation: string | null; endLocation: string | null; distanceKm: number | null; elevationGainM: number | null; elevationLossM: number | null; durationMinutes: number | null; campsite: string | null; reservation: string | null; waterSource: string | null; waterCarryL: number | null; trailConditions: string | null; activities: string | null };
export type PlannerBuild = { id: string; location: string | null; locationLat: number | null; locationLng: number | null; startDate: Date | null; endDate: Date | null; people: number; minTemperature: number | null; conditions: string | null; days: PlannerDay[]; routeWaypoints?: unknown; tripLogistics?: unknown };
export const dayTextFields = ["startLocation", "endLocation", "campsite", "reservation", "waterSource", "trailConditions", "activities", "notes"] as const;
export const dayNumberFields = ["distanceKm", "elevationGainM", "elevationLossM", "durationMinutes", "waterCarryL", "minTemperature"] as const;
export function plannedDay(day: PlannerDay) { return !!(day.startLocation?.trim() && day.endLocation?.trim() && day.distanceKm != null); }
export function tripTotals(days: PlannerDay[]) {
  const sum = (key: "distanceKm" | "elevationGainM" | "elevationLossM" | "durationMinutes") => days.reduce((n,d) => n + (d[key] ?? 0), 0);
  return { distanceKm: sum("distanceKm"), gainM: sum("elevationGainM"), lossM: sum("elevationLossM"), minutes: sum("durationMinutes"), measuredDays: days.filter(d => d.distanceKm != null).length, plannedDays: days.filter(plannedDay).length };
}
export function readWaypoints(value: unknown): Waypoint[] {
  if (!Array.isArray(value)) return [];
  return value.filter((p): p is Waypoint => !!p && typeof p === "object" && typeof p.id === "string" && typeof p.name === "string" && Number.isFinite(p.lat) && Number.isFinite(p.lng) && Math.abs(p.lat) <= 90 && Math.abs(p.lng) <= 180 && ["trailhead","camp","water","waypoint"].includes(p.kind) && (p.elevationM === null || Number.isFinite(p.elevationM)));
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
  if (points.length > 200) throw new Error("A route can have up to 200 stops.");
  const ids = new Set<string>();
  return points.map(point => {
    if (!point.id || point.id.length > 200 || ids.has(point.id)) throw new Error("One of the stops has an invalid ID. Reload the route and try again.");
    ids.add(point.id);
    if (!validCoordinates(point.lat, point.lng)) throw new Error("One of the stops has an invalid map position.");
    if (!WAYPOINT_TYPES.some(type => type.kind === point.kind)) throw new Error("Choose a valid stop type.");
    const name = point.name.trim();
    if (!name || name.length > 200) throw new Error("Give each stop a name between 1 and 200 characters.");
    if (point.elevationM !== null && (!Number.isFinite(point.elevationM) || point.elevationM < -500 || point.elevationM > 9000)) {
      throw new Error("Optional elevation must be between -500 and 9000 m.");
    }
    return { id: point.id, name, kind: point.kind, lat: point.lat, lng: point.lng, elevationM: point.elevationM };
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

### `mobile-update/files/app/build/[id]/page.tsx`

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
  summarizeCompatibility,
} from "@/lib/compatibility";
import TripPlanner from "@/components/builder/TripPlanner/TripPlanner";

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
  const summary = summarizeCompatibility(issues);

  if (!view.canEdit) {
    return <PublicBuildView build={{ ...build, tripLogistics: undefined, days: build.days.map(day => ({ ...day, reservation: null })) }} activeTab={activeTab}
      compatBuild={compatBuild} compatItems={compatItems}
      issueCount={summary.errors + summary.warnings} />;
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
        issueCount={summary.errors + summary.warnings}
      />

      <div className="mx-auto mt-4 max-w-screen-2xl px-4">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <CompatibilityBar
            build={compatBuild}
            items={compatItems}
            days={build.days}
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

              <BuildRow name="Backpack" gearLink="/gear/packs" selectCategory="packs" categoryName="Packs" buildId={build.id}
                items={build.items.filter((i) => i.gear?.category.name === "Packs" || i.customCategory === "Packs")} />
              <BuildRow name="Shelter" gearLink="/gear/shelter" selectCategory="shelter" categoryName="Shelter" buildId={build.id}
                items={build.items.filter((i) => i.gear?.category.name === "Shelter" || i.customCategory === "Shelter")} />
              <BuildRow name="Sleep System" gearLink="/gear/sleep" selectCategory="sleep" categoryName="Sleep" buildId={build.id}
                items={build.items.filter((i) => i.gear?.category.name === "Sleep" || i.customCategory === "Sleep")} />
              <BuildRow name="Cooking" gearLink="/gear/cooking" selectCategory="cooking" categoryName="Cooking" buildId={build.id}
                items={build.items.filter((i) => i.gear?.category.name === "Cooking" || i.customCategory === "Cooking")} />
              <BuildRow name="Water" gearLink="/gear/water" selectCategory="water" categoryName="Water" buildId={build.id}
                items={build.items.filter((i) => i.gear?.category.name === "Water" || i.customCategory === "Water")} />
              <BuildRow name="Clothing" gearLink="/gear/clothing" selectCategory="clothing" categoryName="Clothing" buildId={build.id}
                items={build.items.filter((i) => i.gear?.category.name === "Clothing" || i.customCategory === "Clothing")} />
              <BuildRow name="Electronics" gearLink="/gear/electronics" selectCategory="electronics" categoryName="Electronics" buildId={build.id}
                items={build.items.filter((i) => i.gear?.category.name === "Electronics" || i.customCategory === "Electronics")} />
              <BuildRow name="Miscellaneous" gearLink="/gear/misc" selectCategory="misc" categoryName="Misc" buildId={build.id}
                items={build.items.filter((i) => i.gear?.category.name === "Misc" || i.customCategory === "Misc")} />

              <CostSummary totalCost={totalCost} />
            </div>

            <WeightSummary
              base={base}
              consumable={consumable}
              worn={worn}
              total={total}
              totalCost={totalCost}
            />

            <CompatibilityDetails
              build={compatBuild}
              items={compatItems}
              days={build.days}
            />
          </>

        )}

      </main>

    </div>
  );
}



```

### `mobile-update/files/components/builder/AddCustomItemForm.tsx`

```typescript
"use client";

import { useState } from "react";
import { addCustomItem } from "@/app/build/actions";

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

### `mobile-update/files/components/builder/BuildHeader.tsx`

```typescript
import Link from "next/link";

type Props = {
  buildId: string;
  name: string;
  active: "gear" | "trip";
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

        <div className="flex justify-center gap-2">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={t.href}
              className={`
                relative px-5 py-2.5 text-sm font-semibold rounded-t-lg transition
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

### `mobile-update/files/components/builder/BuildRow.tsx`

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
                                            {item.gear && (
                                                <Link
                                                    href="#"
                                                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 transition max-md:min-h-9 max-md:inline-flex max-md:items-center"
                                                >
                                                    Buy
                                                </Link>
                                            )}
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

### `mobile-update/files/components/builder/CompatibilityBar.tsx`

```typescript
import Link from "next/link";
//components/builder/CompatibilityBar.tsx
import {
    evaluateCompatibility,
    summarizeCompatibility,
    type BuildForCompat,
    type CompatItem,
    type TripDayForCompat,
} from "@/lib/compatibility";

type Props = {
    build: BuildForCompat;
    items: CompatItem[];
    days?: TripDayForCompat[];
    totalWeight: number;
};

const statusStyles = {
    ok: { bar: "bg-emerald-50 border-emerald-200 text-emerald-900", dot: "bg-emerald-500", label: "Compatible" },
    warning: { bar: "bg-amber-100 border-amber-200 text-amber-900", dot: "bg-amber-500", label: "Warning" },
    error: { bar: "bg-red-100 border-red-200 text-red-900", dot: "bg-red-500", label: "Issue" },
};

export default function CompatibilityBar({ build, items, days = [], totalWeight }: Props) {
    const issues = evaluateCompatibility(build, items, days);
    const summary = summarizeCompatibility(issues);
    const style = statusStyles[summary.status];

    return (
    <div className={`flex items-center justify-between max-md:flex-wrap max-md:gap-3 px-5 py-3 text-sm ${style.bar}`}>
            <div className="flex items-center gap-2 max-md:flex-wrap max-md:min-w-0">
                <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                <span className="font-semibold">{style.label}</span>

                {summary.total > 0 ? (
                    <span>
                        {summary.errors > 0 && `${summary.errors} issue${summary.errors !== 1 ? "s" : ""}`}
                        {summary.errors > 0 && summary.warnings > 0 && ", "}
                        {summary.warnings > 0 && `${summary.warnings} warning${summary.warnings !== 1 ? "s" : ""}`}
                        {" — "}
                        <Link href="#compatibility-details" className="underline font-medium">
                            see details
                        </Link>
                    </span>
                ) : (
                    <span className="opacity-70">No issues found</span>
                )}
            </div>

            <div className="rounded-md bg-white/60 px-3 py-1 text-xs font-semibold">
                Total weight: {(totalWeight / 1000).toFixed(1)}kg
            </div>
        </div>
    );
}


```

### `mobile-update/files/components/builder/CostSummary.tsx`

```typescript
type Props = {
    totalCost: number;
};

export default function CostSummary({ totalCost }: Props) {
    return (
        <div
            className="
    grid
    grid-cols-[180px_minmax(0,1fr)_100px_100px_100px]
    max-md:grid-cols-[auto_minmax(0,1fr)] max-md:gap-3
    items-center
    border-t
    border-gray-400
    px-3
    py-4
    bg-gray-50
    "
        >
            <div className="col-span-3 text-right pr-5 max-md:col-span-1 max-md:text-left max-md:pr-0 text-lg font-medium text-gray-900">
                Total Cost:
            </div>

            <div className="text-center pr-5 text-2xl font-bold max-md:text-right max-md:pr-0 max-md:break-words max-md:text-xl">
                ${totalCost.toFixed(2)}
            </div>

            <div className="max-md:hidden" />
        </div>
    );
}


```

### `mobile-update/files/components/builder/ItemCategoryToggle.tsx`

```typescript
"use client";

import { useOptimistic, useTransition } from "react";
import { setItemCategory } from "@/app/build/actions";

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

### `mobile-update/files/components/builder/QuantityStepper.tsx`

```typescript
"use client";

import { useOptimistic, useTransition } from "react";
import { updateQuantity } from "@/app/build/actions";

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

### `mobile-update/files/components/builder/ShareBar.tsx`

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, CopyCheck, Plus, Save } from "lucide-react";
import BuildSettings from "@/components/builder/BuildSettings";
import BuildDataTools from "@/components/builder/BuildDataTools";
import { duplicateBuild } from "@/app/build/actions";

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

### `mobile-update/files/components/builder/WeightSummary.tsx`

```typescript
type Props = {
    base: number;
    consumable: number;
    worn: number;
    total: number;
    totalCost: number;
};

function toLb(grams: number) {
    return (grams / 453.592).toFixed(2);
}

export default function WeightSummary({
    base,
    consumable,
    worn,
    total,
    totalCost,
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

### `mobile-update/install.mjs`

```typescript
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const expected = {
  "app/build/[id]/page.tsx": [
    "b0388bbfcf33430722c80a8fb84af01a5c322c8c31a99624e1fa179e9742be2b"
  ],
  "components/builder/AddCustomItemForm.tsx": [
    "a309003df0eac10c971bcc09d46e0102efc2f5311759be8bb1c82599166931fa"
  ],
  "components/builder/BuildHeader.tsx": [
    "4048db95a456eaff2016bdd39d818d488fb7b335e275ba660ef6cb26e30271cf"
  ],
  "components/builder/BuildRow.tsx": [
    "1f732a620c8d897ecfe5b7233db2fc26580863d9579c3fcbd90eef850146481a"
  ],
  "components/builder/CompatibilityBar.tsx": [
    "422f4256cae9edb43879de698128a88b1788d0d43ac0ef9b010ec40c05b38840"
  ],
  "components/builder/CostSummary.tsx": [
    "41fda40a5098ffcc9acf7bdfee524cba24830a3fa8c1147d4e03660791ab065a"
  ],
  "components/builder/ItemCategoryToggle.tsx": [
    "9fc2e8e6c23561ccb5f37addc804e496cd734318bca7a1bac6bdeff133a7af29"
  ],
  "components/builder/QuantityStepper.tsx": [
    "cc658837c7e84013a65515edef95fe3cd3ed564f9210b3b45a8c14343bbe0d66"
  ],
  "components/builder/ShareBar.tsx": [
    "f8a49a428913548e28e3e76aaccc762c6af61274e93c1d107b133b833dccd961"
  ],
  "components/builder/WeightSummary.tsx": [
    "7e1513f4f7ff1b098cc58da6d2b32e055b279d34c93bd666678975d2abf193c2"
  ]
};
const hash = text => createHash('sha256').update(text.replaceAll('\r\n', '\n').trimEnd()).digest('hex');
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(process.argv[2] || '.');
try {
  if (!fs.existsSync(path.join(root, 'package.json')) || !fs.existsSync(path.join(root, 'lib/build-access.ts'))) throw new Error('Run this from your TrailPicker project root.');
  const changes = [];
  function collect(directory, relative = '') {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const rel = path.join(relative, entry.name);
      const source = path.join(directory, entry.name);
      if (entry.isDirectory()) { collect(source, rel); continue; }
      const key = rel.split(path.sep).join('/');
      const destination = path.join(root, rel);
      const next = fs.readFileSync(source, 'utf8');
      if (fs.existsSync(destination)) {
        const old = fs.readFileSync(destination, 'utf8');
        if (hash(old) === hash(next)) continue;
        if (!expected[key]?.includes(hash(old))) throw new Error(`Your ${key} differs from your latest uploaded project. No files changed. Send the current file or merge files/ manually.`);
      } else if (key in expected) throw new Error(`Missing ${key}. No files changed.`);
      changes.push([destination, next]);
    }
  }
  collect(path.join(here, 'files'));
  for (const [file] of changes) if (fs.existsSync(file + '.before-mobile-layout')) throw new Error(`Backup already exists: ${file}.before-mobile-layout. No files changed.`);
  for (const [file, text] of changes) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    if (fs.existsSync(file)) fs.copyFileSync(file, file + '.before-mobile-layout');
    fs.writeFileSync(file, text);
  }
  console.log(changes.length ? `Installed ${changes.length} mobile layout files. No database migration required.` : 'Mobile layout update already installed.');
  console.log('Run npm run build, then restart npm run dev.');
} catch (error) { console.error(error.message); process.exitCode = 1; }




```

### `mobile-update/README.md`

````markdown
# TrailPicker mobile builder layout

Based on your latest export, Pasted text(20261008-010239).txt. Extract mobile-update into your project root. Stop the dev server and run:

```cmd
node mobile-update/install.mjs
npm run build
npm run dev
```

No new packages, database changes, or reset. Installer checks all originals before writing, backs them up with .before-mobile-layout, and refuses to overwrite unexpected edits. Delete the extracted mobile-update folder after successful installation if desired. To undo, copy the .before-mobile-layout files back over their originals.

Changes apply only below 768px. Laptop screens retain the original table columns, spacing, text sizes, and controls. The layout at 768px and above is unchanged.

On mobile, BuildRow stacks the category name above its selections. Product names wrap, including long unbroken custom names. Quantity/category controls remain beside or below the name as space allows and have larger tap targets. Weight and price have mobile labels, followed by Buy/Remove. Add Gear and custom-item forms wrap within the available width. The table-wide heading is hidden on phones because each item carries its own labels. Total Cost uses a two-column layout. The share link, compatibility bar, and weight statistics wrap without forcing horizontal page scrolling; long build titles also wrap.

Actions, authorization, calculation logic, links, forms, and desktop appearance are preserved. No server actions, schema, or trip-planner internals were changed.

Verification: browser harness using the actual updated components and a mock catalog/actions. Screenshots were pixel-identical to the original components at 1024px and 1440px. Mobile checks passed at 320, 360, 390, 414, 600, and 767px, including open custom-item forms, long names, tap targets, quantity, worn/consumable, remove, and add payloads. These isolated checks do not replace running npm run build against your real generated Prisma client and environment.

````

### `next-env.d.ts`

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/types/routes.d.ts";

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
    "docs": "tsx tools/generate-docs.ts"
  },
  "dependencies": {
    "@auth/prisma-adapter": "^2.11.3",
    "@prisma/adapter-pg": "^7.8.0",
    "@prisma/client": "^7.8.0",
    "leaflet": "^1.9.4",
    "lucide-react": "^1.27.0",
    "next": "16.2.10",
    "next-auth": "^5.0.0-beta.32",
    "pg": "^8.22.0",
    "prisma": "^7.8.0",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "react-leaflet": "^5.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/leaflet": "^1.9.21",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.10",
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

  gear Gear[]
  subcategories Subcategory[]
  createdAt DateTime @default(now())
}
model Subcategory {
  id         String   @id @default(cuid())
  name       String
  slug String
  categoryId String
  category   Category @relation(fields: [categoryId], references: [id])

  gear        Gear[]

  createdAt  DateTime @default(now())
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

  images GearImage[]
  specifications GearSpecification[]
  prices Price[]
  reviews Review[]
  buildItems BuildItem[]
  favorites Favorite[]
  ownedGear OwnedGear[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
model OwnedGear {
  id String @id @default(cuid())

  userId String
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  gearId String
  gear Gear @relation(fields: [gearId], references: [id], onDelete: Cascade)

  purchasedPrice Float?
  purchasedAt DateTime?
  notes String?

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
  username      String?    @unique
  email         String    @unique
  emailVerified DateTime?
  image         String?

  bio             String?
  location        String?
  isProfilePublic Boolean  @default(false)

  accounts Account[]
  sessions Session[]
  builds    Build[]
  reviews   Review[]
  favorites Favorite[]
  ownedGear OwnedGear[]

  createdAt DateTime @default(now())
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
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  @@unique([identifier, token])
}

model Build {
  isPublic Boolean @default(false)
  id String @id @default(cuid())

  name String

  userId String?
  user   User?   @relation(fields: [userId], references: [id])

  items     BuildItem[]
  days      TripDay[]
  revisions BuildRevision[]

  routeWaypoints Json?
  tripLogistics Json?

  destinationId String?

  location    String?
  locationLat Float?
  locationLng Float?
  startDate   DateTime?
  endDate     DateTime?

  people Int @default(1)

  minTemperature Int?
  conditions String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model BuildRevision {
  id String @id @default(cuid())

  buildId String
  build   Build @relation(fields: [buildId], references: [id], onDelete: Cascade)

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

  minTemperature Int?
  conditions     String?
  notes          String?
  startLocation String?
  endLocation String?
  distanceKm Float?
  elevationGainM Int?
  elevationLossM Int?
  durationMinutes Int?
  campsite String?
  reservation String?
  waterSource String?
  waterCarryL Float?
  trailConditions String?
  activities String?

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

### `prisma/seed.ts`

```typescript
import "dotenv/config";

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});


async function main() {
  await prisma.$transaction(async (tx) => {

  // Brands

  const durston = (await tx.brand.findFirst({ where: { name: "Durston" }, orderBy: { createdAt: "asc" } })) ?? await tx.brand.create({
    data: {
      name: "Durston",
      website: "https://durstongear.com",
    },
  });


  const bigAgnes = (await tx.brand.findFirst({ where: { name: "Big Agnes" }, orderBy: { createdAt: "asc" } })) ?? await tx.brand.create({
    data: {
      name: "Big Agnes",
      website: "https://www.bigagnes.com",
    },
  });


  const hmg = (await tx.brand.findFirst({ where: { name: "Hyperlite Mountain Gear" }, orderBy: { createdAt: "asc" } })) ?? await tx.brand.create({
    data: {
      name: "Hyperlite Mountain Gear",
      website: "https://www.hyperlitemountaingear.com",
    },
  });


  const thermarest = (await tx.brand.findFirst({ where: { name: "Therm-a-Rest" }, orderBy: { createdAt: "asc" } })) ?? await tx.brand.create({
    data: {
      name: "Therm-a-Rest",
    },
  });



  // Categories

  const packs = await tx.category.upsert({
    where: { slug: "packs" },
    update: {},
    create: {
      name: "Packs",
      slug: "packs",
    },
  });


  const shelter = await tx.category.upsert({
    where: { slug: "shelter" },
    update: {},
    create: {
      name: "Shelter",
      slug: "shelter",
    },
  });


  const sleep = await tx.category.upsert({
    where: { slug: "sleep" },
    update: {},
    create: {
      name: "Sleep",
      slug: "sleep",
    },
  });


  const cooking = await tx.category.upsert({
    where: { slug: "cooking" },
    update: {},
    create: {
      name: "Cooking",
      slug: "cooking",
    },
  });


  const water = await tx.category.upsert({
    where: { slug: "water" },
    update: {},
    create: {
      name: "Water",
      slug: "water",
    },
  });


  const clothing = await tx.category.upsert({
    where: { slug: "clothing" },
    update: {},
    create: {
      name: "Clothing",
      slug: "clothing",
    },
  });


  const electronics = await tx.category.upsert({
    where: { slug: "electronics" },
    update: {},
    create: {
      name: "Electronics",
      slug: "electronics",
    },
  });


  const misc = await tx.category.upsert({
    where: { slug: "misc" },
    update: {},
    create: {
      name: "Misc",
      slug: "misc",
    },
  });



  // Subcategories

  await tx.subcategory.upsert({
    where: { categoryId_slug: { categoryId: packs.id, slug: "internal-frame" } },
    update: {},
    create: {
      name: "Internal Frame",
      slug: "internal-frame",
      categoryId: packs.id,
    },
  });


  const frameless = await tx.subcategory.upsert({
    where: { categoryId_slug: { categoryId: packs.id, slug: "frameless" } },
    update: {},
    create: {
      name: "Frameless",
      slug: "frameless",
      categoryId: packs.id,
    },
  });


  const tent = await tx.subcategory.upsert({
    where: { categoryId_slug: { categoryId: shelter.id, slug: "tent" } },
    update: {},
    create: {
      name: "Tent",
      slug: "tent",
      categoryId: shelter.id,
    },
  });


  const sleepingPad = await tx.subcategory.upsert({
    where: { categoryId_slug: { categoryId: sleep.id, slug: "sleeping-pad" } },
    update: {},
    create: {
      name: "Sleeping Pad",
      slug: "sleeping-pad",
      categoryId: sleep.id,
    },
  });



  // Remaining subcategories

  await tx.subcategory.createMany({
    skipDuplicates: true,
    data: [

      {
        name: "Hammock",
        slug: "hammock",
        categoryId: shelter.id,
      },
      {
        name: "Tarp",
        slug: "tarp",
        categoryId: shelter.id,
      },
      {
        name: "Bivy",
        slug: "bivy",
        categoryId: shelter.id,
      },


      {
        name: "Sleeping Bag",
        slug: "sleeping-bag",
        categoryId: sleep.id,
      },
      {
        name: "Quilt",
        slug: "quilt",
        categoryId: sleep.id,
      },


      {
        name: "Stove",
        slug: "stove",
        categoryId: cooking.id,
      },
      {
        name: "Cookware",
        slug: "cookware",
        categoryId: cooking.id,
      },


      {
        name: "Filter",
        slug: "filter",
        categoryId: water.id,
      },
      {
        name: "Bottle",
        slug: "bottle",
        categoryId: water.id,
      },


      {
        name: "Rain Gear",
        slug: "rain-gear",
        categoryId: clothing.id,
      },
      {
        name: "Insulation",
        slug: "insulation",
        categoryId: clothing.id,
      },


      {
        name: "Headlamp",
        slug: "headlamp",
        categoryId: electronics.id,
      },
      {
        name: "Power Bank",
        slug: "power-bank",
        categoryId: electronics.id,
      },


      {
        name: "First Aid",
        slug: "first-aid",
        categoryId: misc.id,
      },
      {
        name: "Repair Kit",
        slug: "repair-kit",
        categoryId: misc.id,
      },

    ],
  });



  // Gear


  if (!(await tx.gear.findFirst({ where: { name: "Durston X-Mid 1", brand: { name: "Durston" } } }))) {
  await tx.gear.create({
    data: {
      name: "Durston X-Mid 1",
      description:
        "Ultralight trekking pole supported backpacking tent.",
      weight_g: 795,
      price_cad: 320,
      capacity_l: 1,
      season: "3-season",

      brandId: durston.id,
      categoryId: shelter.id,
      subcategoryId: tent.id,

      images: {
        create: [
          {
            url: "https://durstongear.com/cdn/shop/files/Durston-X-Mid-1-2025-Ultralight-Backpacking-Tent-Main-Viewb_07dd109f-fff5-4c33-9a7d-b161ac0bbf19.jpg?v=1741358977&width=800",
            isPrimary: true,
          }
        ],
      },
    },
  });
  }



  if (!(await tx.gear.findFirst({ where: { name: "Big Agnes Copper Spur HV UL2", brand: { name: "Big Agnes" } } }))) {
  await tx.gear.create({
    data: {
      name: "Big Agnes Copper Spur HV UL2",
      description:
        "Lightweight freestanding two-person tent.",
      weight_g: 1474,
      price_cad: 700,
      capacity_l: 2,
      season: "3-season",

      brandId: bigAgnes.id,
      categoryId: shelter.id,
      subcategoryId: tent.id,

      images: {
        create: [
          {
            url: "https://gearinstitute.com/wp-content/uploads/Copper_Spur_HV_UL_2_TentWithFly_HalfOpen-0-800x457.jpg",
            isPrimary: true,
          }
        ],
      },
    },
  });
  }



  if (!(await tx.gear.findFirst({ where: { name: "Hyperlite Mountain Gear Southwest 40", brand: { name: "Hyperlite Mountain Gear" } } }))) {
  await tx.gear.create({
    data: {
      name: "Hyperlite Mountain Gear Southwest 40",
      description:
        "Ultralight backpacking pack.",
      weight_g: 907,
      price_cad: 500,
      capacity_l: 40,

      brandId: hmg.id,
      categoryId: packs.id,
      subcategoryId: frameless.id,

      images: {
        create: [
          {
            url: "https://hyperlitemountaingear.com/cdn/shop/files/hyperlite-mountain-gear-packs-southwest-40l-extra-sm-white-1190868899.jpg?v=1759479162&width=832",
            isPrimary: true,
          }
        ],
      },
    },
  });
  }



  if (!(await tx.gear.findFirst({ where: { name: "Therm-a-Rest NeoAir XLite NXT", brand: { name: "Therm-a-Rest" } } }))) {
  await tx.gear.create({
    data: {
      name: "Therm-a-Rest NeoAir XLite NXT",
      description:
        "Ultralight backpacking sleeping pad.",
      weight_g: 370,

      brandId: thermarest.id,
      categoryId: sleep.id,
      subcategoryId: sleepingPad.id,

      images: {
        create: [
          {
            url: "https://cascadedesigns.com/cdn/shop/files/11627_thermarest_neoair_xlite_nxt_solarflare_regular_angle.jpg?v=1724820257&width=493",
            isPrimary: true,
          }
        ],
      },
    },
  });
  }

  }, { maxWait: 10000, timeout: 30000 });
}


main()
  .then(() => {
    console.log("Seed complete");
  })
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
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
    buildItem: { findFirst: async ({ where }) => {
      const buildId = where.id === 'item-a' ? 'a' : where.id === 'item-b' ? 'b' : null;
      return buildId === where.buildId ? { id: where.id, buildId, quantity: 2 } : null;
    }, update: write('item.update'), delete: write('item.delete'), create: write('item.create'), upsert: write('item.upsert') },
    tripDay: { findFirst: async ({ where }) => where.id === 'day-a' && where.buildId === 'a' ? { id: 'day-a', buildId: 'a' } : null,
      update: write('day.update'), createMany: write('day.createMany'), deleteMany: write('day.deleteMany') },
  };
  const navigation = { notFound: () => { throw new Error('404'); }, redirect: url => { throw new Error(`REDIRECT:${url}`); } };
  const access = load('lib/build-access.ts', { '@/auth': {auth: async () => state.email ? {user:{email:state.email}} : null},
    '@/lib/prisma': { prisma }, 'next/headers': {cookies:async()=>cookieStore}, 'next/navigation': navigation, '@/lib/guest-build-token': token });
  const planner = load('lib/trip-planner.ts');
  const history = { ensureBuildRevisionBaseline: async () => {}, recordBuildRevision: async () => {}, getBuildSnapshot: async (buildId, userId) => {
    const b = state.builds.find(build => build.id === buildId && build.userId === userId);
    if (!b) throw new Error('Build not found.');
    return { name:b.name, destinationId:null, location:null, locationLat:null, locationLng:null, startDate:null, endDate:null, people:1, minTemperature:null, conditions:null, routeWaypoints:null, tripLogistics:null, items:b.items || [], days:b.days || [] };
  } };
  const plannerActions = load('lib/trip-planner-actions.ts', { '@/lib/prisma':{prisma}, '@/lib/build-access':access, 'next/cache':{revalidatePath:()=>{}}, '@/lib/destinations':{getDestination:()=>null}, '@/lib/trip':{getDateRange:()=>[]}, '@/lib/trip-planner':planner, '@/lib/build-history':history });
  const actions = load('app/build/actions.ts', {'@/lib/prisma':{prisma}, '@/lib/trip-planner-actions':plannerActions, '@/lib/trip-planner':planner, 'next/navigation': navigation,
    'next/headers':{cookies:async()=>cookieStore}, 'next/cache':{revalidatePath:()=>{}}, '@/lib/trip':{getDateRange:()=>[]},
    '@/lib/build-access':access, '@/lib/guest-build-token':token, '@/lib/destinations':{getDestination:()=>null}, '@/lib/build-history':history, '@/app/generated/prisma/client':{Prisma:{DbNull:null}} });
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
    await assert.rejects(actions[name](form({buildId:'b', itemId:'item-b', dayId:'day-b', payload:'invalid JSON', delta:1})), /Build not found/);
    assert.deepEqual(state.writes, []);
  });
}
for (const name of ['setItemCategory','updateQuantity','removeGear']) {
  test(`${name} rejects another build's item paired with owned build`, async () => {
    const {state,actions}=harness();
    await assert.rejects(actions[name](form({buildId:'a',itemId:'item-b',delta:1})), /Item not found/);
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
  assert.equal(state.writes[0].args.data.quantity,3);
});
for (const name of ['getBuildExport','importBuildItems','duplicateBuild','addCustomItem','addGear','updateTripDetails','setItemCategory','updateQuantity','removeGear','updateTripDay']) {
  test(`${name} rejects anonymous access to account build`, async () => {
    const {state,actions}=harness();state.email=null;state.cookies.set('currentBuild','a');
    const input = name === 'getBuildExport' ? 'a' : form({buildId:'a',itemId:'item-a',dayId:'day-a',payload:'{}',delta:1});
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
function harness(){const writes=[], old=[{date:new Date('2026-07-01')},{date:new Date('2026-07-02')}];const tx={build:{update:async x=>writes.push(['build',x])},tripDay:{findMany:async()=>old,createMany:async x=>writes.push(['create',x]),deleteMany:async x=>writes.push(['delete',x]),update:async x=>writes.push(['day',x])}};const prisma={...tx,$transaction:async fn=>fn(tx)};const a=load('lib/trip-planner-actions.ts',{'@/lib/prisma':{prisma},'@/lib/build-access':{requireBuildAccess:async id=>{if(id!=='owned')throw Error('Build not found.');return {userId:'owner'};},requireTripDayAccess:async(id,day)=>{if(id!=='owned'||day!=='day')throw Error('Day not found.');return {accessUserId:'owner'};}},'next/cache':{revalidatePath:()=>{}},'@/lib/destinations':{getDestination:()=>null},'@/lib/trip':trip,'@/lib/trip-planner':p,'@/lib/build-history':{ensureBuildRevisionBaseline:async()=>{},recordBuildRevision:async()=>{}}});return {a,writes};}
test('rejects reversed, incomplete, impossible and excessive dates',()=>{for(const [s,e] of [['2026-07-02','2026-07-01'],['2026-07-01',''],['2026-02-30','2026-03-01'],['2026-01-01','2028-01-01']])assert.throws(()=>p.parseDates(s,e));assert.equal(trip.getDateRange(...Object.values(p.parseDates('2026-03-07','2026-03-09'))).length,3);});
test('totals preserve zero and indicate partial distance coverage',()=>{const days=[{startLocation:'A',endLocation:'B',distanceKm:0,elevationGainM:10},{startLocation:'B',endLocation:'C',distanceKm:12.4,elevationLossM:5},{notes:'weather only'}];assert.deepEqual(p.tripTotals(days),{distanceKm:12.4,gainM:10,lossM:5,minutes:0,measuredDays:2,plannedDays:2});});
test('invalid numeric values rejected',()=>{for(const v of ['NaN','Infinity','abc',-1])assert.throws(()=>p.nullableNumber(v,'distance',0,1000));assert.equal(p.nullableNumber('0','distance',0,1000),0);assert.throws(()=>p.nullableNumber('1.5','minutes',0,1440,true));});
test('date shortening requires explicit confirmation before writes',async()=>{const {a,writes}=harness();await assert.rejects(a.saveTripDetails(form({buildId:'owned',startDate:'2026-07-02',endDate:'2026-07-03'})),/confirmation/);assert.equal(writes.length,0);await a.saveTripDetails(form({buildId:'owned',startDate:'2026-07-02',endDate:'2026-07-03',confirmDateChange:'yes'}));assert.equal(writes.length,3);assert.equal(writes[2][1].where.date.notIn.length,2);});
test('invalid day and unowned route never write',async()=>{const {a,writes}=harness();await assert.rejects(a.saveTripDay(form({buildId:'owned',dayId:'day',distanceKm:'NaN'})),/distanceKm/);await assert.rejects(a.saveTripRoute(form({buildId:'other',waypoints:'[]'})),/Build not found/);assert.equal(writes.length,0);});
test('day writes preserve zeros, nullable fields and ownership scope',async()=>{const {a,writes}=harness();await a.saveTripDay(form({buildId:'owned',dayId:'day',distanceKm:0,minTemperature:0,startLocation:' A '}));assert.equal(writes[0][1].data.distanceKm,0);assert.equal(writes[0][1].data.minTemperature,0);assert.equal(writes[0][1].data.startLocation,'A');assert.equal(writes[0][1].where.build.userId,'owner');});
test('route validation rejects out of range coordinates and duplicate IDs',async()=>{const {a,writes}=harness(),point={id:'one',name:'Camp',kind:'camp',lat:49,lng:-123,elevationM:900};for(const points of [[{...point,lat:91}],[point,point]])await assert.rejects(a.saveTripRoute(form({buildId:'owned',waypoints:JSON.stringify(points)})),/waypoint/);assert.equal(writes.length,0);await a.saveTripRoute(form({buildId:'owned',waypoints:JSON.stringify([point])}));assert.deepEqual(writes[0][1].data.routeWaypoints,[point]);});
test('logistics are bounded and stored on owned build',async()=>{const {a,writes}=harness();await assert.rejects(a.saveTripLogistics(form({buildId:'owned',emergencyContact:'x'.repeat(5001)})),/too long/);await a.saveTripLogistics(form({buildId:'owned',parking:'Lot A'}));assert.equal(writes[0][1].data.tripLogistics.parking,'Lot A');assert.equal(writes[0][1].where.userId,'owner');});

```

### `tools/generate-docs.ts`

````typescript
import {
  Dirent,
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

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
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
      "@/*": ["./*"]
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
  "exclude": ["node_modules"]
}

```

## AI USAGE NOTES

- Use the **source file sections** as the ground truth for implementation details.
- The dependency section is heuristic and only resolves relative imports when the target file exists in the snapshot.
- Generated/build/cache directories are excluded by default.
- Files larger than the configured limit are listed but their contents are omitted.
- Re-run the generator after changing the project to refresh this snapshot.
