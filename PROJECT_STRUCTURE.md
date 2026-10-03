# PROJECT STRUCTURE

> Generated automatically by Project Context Generator.

```text
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
│   │   │   ├── TripDayList.tsx
│   │   │   ├── TripDayRow.tsx
│   │   │   ├── TripEditForm.tsx
│   │   │   ├── TripLocationPreview.tsx
│   │   │   ├── TripPlanner.tsx
│   │   │   └── TripSummaryCard.tsx
│   │   ├── AddCustomItemForm.tsx
│   │   ├── AddGearButton.tsx
│   │   ├── BuildHeader.tsx
│   │   ├── BuildRow.tsx
│   │   ├── CompatibilityBar.tsx
│   │   ├── CompatibilityDetails.tsx
│   │   ├── CostSummary.tsx
│   │   ├── GearTab.tsx
│   │   ├── ItemCategoryToggle.tsx
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
│   ├── ProfileDropdown.tsx
│   └── SearchBar.tsx
├── data/
│   └── destinations.json
├── lib/
│   ├── calculations.ts
│   ├── compatibility.ts
│   ├── destinations.ts
│   ├── prisma.ts
│   ├── profile.ts
│   └── trip.ts
├── prisma/
│   ├── migrations/
│   │   └── migration_lock.toml
│   └── seed.ts
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
- `app/api/auth/[...nextauth]/route.ts` (74 B, 2 lines)
- `app/build/[id]/page.tsx` (7.3 KB, 193 lines)
- `app/build/[id]/select/[category]/[subcategory]/page.tsx` (11.2 KB, 306 lines)
- `app/build/[id]/select/[category]/page.tsx` (2.1 KB, 86 lines)
- `app/build/actions.ts` (11.5 KB, 433 lines)
- `app/build/page.tsx` (4.3 KB, 117 lines)
- `app/gear/[id]/page.tsx` (2.2 KB, 132 lines)
- `app/gear/page.tsx` (3.0 KB, 189 lines)
- `app/globals.css` (1.2 KB, 70 lines)
- `app/layout.tsx` (910 B, 42 lines)
- `app/page.tsx` (2.1 KB, 120 lines)
- `app/profile/actions.ts` (3.4 KB, 90 lines)
- `app/profile/builds/page.tsx` (3.1 KB, 35 lines)
- `app/profile/edit/page.tsx` (2.8 KB, 25 lines)
- `app/profile/favorites/page.tsx` (3.0 KB, 39 lines)
- `app/profile/gear/actions.ts` (3.1 KB, 91 lines)
- `app/profile/gear/page.tsx` (5.1 KB, 73 lines)
- `app/profile/layout.tsx` (4.7 KB, 100 lines)
- `app/profile/page.tsx` (5.3 KB, 39 lines)
- `auth.ts` (345 B, 10 lines)
- `components/build/CreateTripDetails.tsx` (7.0 KB, 165 lines)
- `components/build/DateRangePicker.tsx` (12.6 KB, 174 lines)
- `components/build/DestinationPicker.tsx` (11.9 KB, 410 lines)
- `components/build/LocationMap.tsx` (2.3 KB, 113 lines)
- `components/build/LocationPicker.tsx` (8.5 KB, 240 lines)
- `components/builder/AddCustomItemForm.tsx` (2.4 KB, 77 lines)
- `components/builder/AddGearButton.tsx` (914 B, 49 lines)
- `components/builder/BuildHeader.tsx` (1.4 KB, 45 lines)
- `components/builder/BuildRow.tsx` (8.6 KB, 204 lines)
- `components/builder/CompatibilityBar.tsx` (2.2 KB, 55 lines)
- `components/builder/CompatibilityDetails.tsx` (1.9 KB, 52 lines)
- `components/builder/CostSummary.tsx` (651 B, 30 lines)
- `components/builder/GearTab.tsx` (4.3 KB, 156 lines)
- `components/builder/ItemCategoryToggle.tsx` (2.5 KB, 87 lines)
- `components/builder/QuantityStepper.tsx` (2.4 KB, 87 lines)
- `components/builder/RemoveGearButton.tsx` (677 B, 35 lines)
- `components/builder/ShareBar.tsx` (6.7 KB, 158 lines)
- `components/builder/TripPlanner/MapPreviewInner.tsx` (1.0 KB, 33 lines)
- `components/builder/TripPlanner/TripDayList.tsx` (2.4 KB, 87 lines)
- `components/builder/TripPlanner/TripDayRow.tsx` (8.1 KB, 279 lines)
- `components/builder/TripPlanner/TripEditForm.tsx` (4.4 KB, 139 lines)
- `components/builder/TripPlanner/TripLocationPreview.tsx` (342 B, 9 lines)
- `components/builder/TripPlanner/TripPlanner.tsx` (2.0 KB, 82 lines)
- `components/builder/TripPlanner/TripSummaryCard.tsx` (9.1 KB, 280 lines)
- `components/builder/WeightSummary.tsx` (2.7 KB, 85 lines)
- `components/filters/BrandFilter.tsx` (2.6 KB, 99 lines)
- `components/filters/FilterSection.tsx` (1.2 KB, 51 lines)
- `components/filters/RangeFilter.tsx` (2.1 KB, 109 lines)
- `components/filters/SortHeader.tsx` (1.5 KB, 77 lines)
- `components/gear/GearAccountActions.tsx` (1.7 KB, 23 lines)
- `components/GearCard.tsx` (1.1 KB, 61 lines)
- `components/GearFilters.tsx` (2.6 KB, 149 lines)
- `components/GearSort.tsx` (1.1 KB, 71 lines)
- `components/Navbar.tsx` (2.3 KB, 52 lines)
- `components/profile/BuildCard.tsx` (3.4 KB, 33 lines)
- `components/profile/DeleteBuildButton.tsx` (461 B, 19 lines)
- `components/profile/GearLibraryCard.tsx` (4.2 KB, 88 lines)
- `components/ProfileDropdown.tsx` (6.7 KB, 223 lines)
- `components/SearchBar.tsx` (884 B, 52 lines)
- `data/destinations.json` (9.0 KB, 275 lines)
- `docs.config.json` (578 B, 20 lines)
- `eslint.config.mjs` (465 B, 19 lines)
- `lib/calculations.ts` (1.2 KB, 54 lines)
- `lib/compatibility.ts` (12.9 KB, 374 lines)
- `lib/destinations.ts` (1.3 KB, 57 lines)
- `lib/prisma.ts` (471 B, 20 lines)
- `lib/profile.ts` (1.5 KB, 43 lines)
- `lib/trip.ts` (1.9 KB, 65 lines)
- `next-env.d.ts` (251 B, 7 lines)
- `next.config.ts` (259 B, 15 lines)
- `package.json` (907 B, 39 lines)
- `postcss.config.mjs` (94 B, 8 lines)
- `prisma/migrations/migration_lock.toml` (128 B, 4 lines)
- `prisma/seed.ts` (6.9 KB, 373 lines)
- `prisma.config.ts` (283 B, 15 lines)
- `README.md` (1.4 KB, 37 lines)
- `tools/generate-docs.ts` (16.1 KB, 428 lines)
- `tsconfig.json` (666 B, 35 lines)
