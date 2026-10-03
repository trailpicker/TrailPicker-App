# PROJECT CONTEXT

> Generated automatically. Treat source files as authoritative; summaries are derived metadata.

- Generated: 2026-10-03T02:44:25.768Z
- Root: `trailpicker`
- Files scanned: 79
- Files included with readable text: 79
- Total included source lines: 8,362
- Total scanned size: 272.2 KB
- Max file size: 293.0 KB


## PROJECT STRUCTURE

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
- `components/builder/BuildRow.tsx` → `components/builder/RemoveGearButton.tsx` (import: `./RemoveGearButton`)
- `components/builder/BuildRow.tsx` → `components/builder/QuantityStepper.tsx` (import: `./QuantityStepper`)
- `components/builder/BuildRow.tsx` → `components/builder/AddCustomItemForm.tsx` (import: `./AddCustomItemForm`)
- `components/builder/BuildRow.tsx` → `components/builder/ItemCategoryToggle.tsx` (import: `./ItemCategoryToggle`)
- `components/builder/TripPlanner/TripDayList.tsx` → `components/builder/TripPlanner/TripDayRow.tsx` (import: `./TripDayRow`)
- `components/builder/TripPlanner/TripLocationPreview.tsx` → `components/builder/TripPlanner/MapPreviewInner.tsx` (import: `./MapPreviewInner`)
- `components/builder/TripPlanner/TripPlanner.tsx` → `components/builder/TripPlanner/TripSummaryCard.tsx` (import: `./TripSummaryCard`)
- `components/builder/TripPlanner/TripPlanner.tsx` → `components/builder/TripPlanner/TripEditForm.tsx` (import: `./TripEditForm`)
- `components/builder/TripPlanner/TripPlanner.tsx` → `components/builder/TripPlanner/TripDayList.tsx` (import: `./TripDayList`)
- `components/builder/TripPlanner/TripSummaryCard.tsx` → `components/builder/TripPlanner/TripLocationPreview.tsx` (import: `./TripLocationPreview`)
- `components/profile/BuildCard.tsx` → `components/profile/DeleteBuildButton.tsx` (import: `./DeleteBuildButton`)

## UNRESOLVED RELATIVE IMPORTS

- `next-env.d.ts` → `./.next/dev/types/routes.d.ts`
- `prisma/seed.ts` → `../app/generated/prisma/client`

## TODO / FIXME / HACK

- tools/generate-docs.ts:282 **TODO** |FIXME|HACK|XXX)\b[:\-]?\s*(.*)$/i);
- tools/generate-docs.ts:358 **TODO** / FIXME / HACK\n\n${todos.length ? todos.map(item => `- ${item}`).join('\n') : '_None detected._'}`);

## FILE INDEX

| File | Size | Lines | Status |
|---|---:|---:|---|
| `.gitignore` | 503 B | 44 | Included |
| `app/api/auth/[...nextauth]/route.ts` | 74 B | 2 | Included |
| `app/build/[id]/page.tsx` | 7.3 KB | 193 | Included |
| `app/build/[id]/select/[category]/[subcategory]/page.tsx` | 11.2 KB | 306 | Included |
| `app/build/[id]/select/[category]/page.tsx` | 2.1 KB | 86 | Included |
| `app/build/actions.ts` | 11.5 KB | 433 | Included |
| `app/build/page.tsx` | 4.3 KB | 117 | Included |
| `app/gear/[id]/page.tsx` | 2.2 KB | 132 | Included |
| `app/gear/page.tsx` | 3.0 KB | 189 | Included |
| `app/globals.css` | 1.2 KB | 70 | Included |
| `app/layout.tsx` | 910 B | 42 | Included |
| `app/page.tsx` | 2.1 KB | 120 | Included |
| `app/profile/actions.ts` | 3.4 KB | 90 | Included |
| `app/profile/builds/page.tsx` | 3.1 KB | 35 | Included |
| `app/profile/edit/page.tsx` | 2.8 KB | 25 | Included |
| `app/profile/favorites/page.tsx` | 3.0 KB | 39 | Included |
| `app/profile/gear/actions.ts` | 3.1 KB | 91 | Included |
| `app/profile/gear/page.tsx` | 5.1 KB | 73 | Included |
| `app/profile/layout.tsx` | 4.7 KB | 100 | Included |
| `app/profile/page.tsx` | 5.3 KB | 39 | Included |
| `auth.ts` | 345 B | 10 | Included |
| `components/build/CreateTripDetails.tsx` | 7.0 KB | 165 | Included |
| `components/build/DateRangePicker.tsx` | 12.6 KB | 174 | Included |
| `components/build/DestinationPicker.tsx` | 11.9 KB | 410 | Included |
| `components/build/LocationMap.tsx` | 2.3 KB | 113 | Included |
| `components/build/LocationPicker.tsx` | 8.5 KB | 240 | Included |
| `components/builder/AddCustomItemForm.tsx` | 2.4 KB | 77 | Included |
| `components/builder/AddGearButton.tsx` | 914 B | 49 | Included |
| `components/builder/BuildHeader.tsx` | 1.4 KB | 45 | Included |
| `components/builder/BuildRow.tsx` | 8.6 KB | 204 | Included |
| `components/builder/CompatibilityBar.tsx` | 2.2 KB | 55 | Included |
| `components/builder/CompatibilityDetails.tsx` | 1.9 KB | 52 | Included |
| `components/builder/CostSummary.tsx` | 651 B | 30 | Included |
| `components/builder/GearTab.tsx` | 4.3 KB | 156 | Included |
| `components/builder/ItemCategoryToggle.tsx` | 2.5 KB | 87 | Included |
| `components/builder/QuantityStepper.tsx` | 2.4 KB | 87 | Included |
| `components/builder/RemoveGearButton.tsx` | 677 B | 35 | Included |
| `components/builder/ShareBar.tsx` | 6.7 KB | 158 | Included |
| `components/builder/TripPlanner/MapPreviewInner.tsx` | 1.0 KB | 33 | Included |
| `components/builder/TripPlanner/TripDayList.tsx` | 2.4 KB | 87 | Included |
| `components/builder/TripPlanner/TripDayRow.tsx` | 8.1 KB | 279 | Included |
| `components/builder/TripPlanner/TripEditForm.tsx` | 4.4 KB | 139 | Included |
| `components/builder/TripPlanner/TripLocationPreview.tsx` | 342 B | 9 | Included |
| `components/builder/TripPlanner/TripPlanner.tsx` | 2.0 KB | 82 | Included |
| `components/builder/TripPlanner/TripSummaryCard.tsx` | 9.1 KB | 280 | Included |
| `components/builder/WeightSummary.tsx` | 2.7 KB | 85 | Included |
| `components/filters/BrandFilter.tsx` | 2.6 KB | 99 | Included |
| `components/filters/FilterSection.tsx` | 1.2 KB | 51 | Included |
| `components/filters/RangeFilter.tsx` | 2.1 KB | 109 | Included |
| `components/filters/SortHeader.tsx` | 1.5 KB | 77 | Included |
| `components/gear/GearAccountActions.tsx` | 1.7 KB | 23 | Included |
| `components/GearCard.tsx` | 1.1 KB | 61 | Included |
| `components/GearFilters.tsx` | 2.6 KB | 149 | Included |
| `components/GearSort.tsx` | 1.1 KB | 71 | Included |
| `components/Navbar.tsx` | 2.3 KB | 52 | Included |
| `components/profile/BuildCard.tsx` | 3.4 KB | 33 | Included |
| `components/profile/DeleteBuildButton.tsx` | 461 B | 19 | Included |
| `components/profile/GearLibraryCard.tsx` | 4.2 KB | 88 | Included |
| `components/ProfileDropdown.tsx` | 6.7 KB | 223 | Included |
| `components/SearchBar.tsx` | 884 B | 52 | Included |
| `data/destinations.json` | 9.0 KB | 275 | Included |
| `docs.config.json` | 578 B | 20 | Included |
| `eslint.config.mjs` | 465 B | 19 | Included |
| `lib/calculations.ts` | 1.2 KB | 54 | Included |
| `lib/compatibility.ts` | 12.9 KB | 374 | Included |
| `lib/destinations.ts` | 1.3 KB | 57 | Included |
| `lib/prisma.ts` | 471 B | 20 | Included |
| `lib/profile.ts` | 1.5 KB | 43 | Included |
| `lib/trip.ts` | 1.9 KB | 65 | Included |
| `next-env.d.ts` | 251 B | 7 | Included |
| `next.config.ts` | 259 B | 15 | Included |
| `package.json` | 907 B | 39 | Included |
| `postcss.config.mjs` | 94 B | 8 | Included |
| `prisma/migrations/migration_lock.toml` | 128 B | 4 | Included |
| `prisma/seed.ts` | 6.9 KB | 373 | Included |
| `prisma.config.ts` | 283 B | 15 | Included |
| `README.md` | 1.4 KB | 37 | Included |
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

### `app/api/auth/[...nextauth]/route.ts`

```typescript
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

### `app/build/[id]/page.tsx`

```typescript
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
  const { tab } = await searchParams;

  const activeTab = tab === "trip" ? "trip" : "gear";

  const build = await prisma.build.findUnique({
    where: { id },
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
      days: true,
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
  const issues = evaluateCompatibility(compatBuild, compatItems);
  const summary = summarizeCompatibility(issues);

  return (
    <div className="min-h-screen bg-gray-50">
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
            totalWeight={total}
          />

          <div className="border-t border-gray-100">
            <ShareBar
              buildId={build.id}
              buildName={build.name}
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
            }}
            issues={issues}
          />

        ) : (

          <>
            <div className="mt-10 overflow-hidden rounded-xl bg-white">
              <div className="grid grid-cols-[180px_minmax(0,1fr)_100px_100px_100px] p-3 text-xs bg-gray-50 font-light text-gray-600">
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
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddGearButton from "@/components/builder/AddGearButton";
import BrandFilter from "@/components/filters/BrandFilter";
import FilterSection from "@/components/filters/FilterSection";
import RangeFilter from "@/components/filters/RangeFilter";
import SortHeader from "@/components/filters/SortHeader";
import Image from "next/image";

export default async function SelectGearPage({
    params,
    searchParams,
}: {
    params: Promise<{
        id: string;
        category: string;
        subcategory: string;
    }>
    searchParams: Promise<{
        brand?: string;
        maxWeight?: string;
        maxPrice?: string;
        sort?: string;
        direction?: string;
    }>;
}) {
    const filters = await searchParams;
    const sort = filters.sort ?? "";
    const direction =
        filters.direction === "desc"
            ? "desc"
            : "asc";
    const brands = Array.isArray(filters.brand)
        ? filters.brand.flatMap((item) => item.split(","))
        : filters.brand
            ? filters.brand.split(",")
            : [];
    const maxWeight = filters.maxWeight
        ? Number(filters.maxWeight)
        : undefined;

    const maxPrice = filters.maxPrice
        ? Number(filters.maxPrice)
        : undefined;
    const {
        id,
        category,
        subcategory: subcategorySlug,
    } = await params;


    const categoryData = await prisma.category.findUnique({
        where: {
            slug: category,
        },
    });


    if (!categoryData) {
        notFound();
    }


    const subcategoryData = await prisma.subcategory.findUnique({
        where: {
            categoryId_slug: {
                categoryId: categoryData.id,
                slug: subcategorySlug,
            },
        },
    });


    if (!subcategoryData) {
        notFound();
    }

    const build = await prisma.build.findUnique({
        where: {
            id,
        },
    });


    if (!build) {
        notFound();
    }
    const availableBrands = await prisma.brand.findMany({
        where: {
            gear: {
                some: {
                    subcategory: {
                        slug: subcategorySlug,
                    }
                },
            },
        },
        orderBy: {
            name: "asc",
        },
    });


    const gear = await prisma.gear.findMany({
        where: {
            subcategory: {
                slug: subcategorySlug,
            },

            ...(brands.length > 0 && {
                brand: {
                    name: {
                        in: brands,
                    },
                },
            }),
            ...(maxWeight !== undefined && {
                weight_g: {
                    lte: maxWeight,
                },
            }),
            ...(maxPrice !== undefined && {
                price_cad: {
                    lte: maxPrice,
                },
            }),
        },
        orderBy:
            sort === "weight"
                ? {
                    weight_g: direction,
                }
                : sort === "price"
                    ? {
                        price_cad: direction,
                    }
                    : undefined,
        include: {
            brand: true,
            reviews: true,
            images: true
        },
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-[110rem] mx-auto px-8 py-8">

                <h1 className="text-3xl font-bold mb-8">
                    Choose {subcategoryData.name}
                </h1>

                <div className="grid grid-cols-[250px_1fr] gap-8">

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
                    <div className="overflow-hidden rounded-lg">
                        <p className="mb-8 text-lg font-bold text-black">
                            {gear.length} Compatible Products
                        </p>
                        <div className="grid grid-cols-[2.3fr_90px_90px_100px_90px_90px_90px_90px] px-5 py-3 text-xs font-semibold tracking-wide text-gray-500 border-b border-gray-400">
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
                                            <AddGearButton buildId={id} gearId={item.id} />
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

### `app/build/[id]/select/[category]/page.tsx`

```typescript
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SelectCategoryPage({
    params,
}: {
    params: Promise<{
        id: string;
        category: string;
    }>;
}) {

    const { id, category } = await params;


    const categoryData = await prisma.category.findUnique({
        where: {
            slug: category.toLowerCase(),
        },
        include: {
            subcategories: true,
        },
    });


    if (!categoryData) {
        notFound();
    }


    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-5xl mx-auto px-8 py-8">

                <h1 className="text-3xl font-bold mb-6">
                    Choose {categoryData.name}
                </h1>


                <div className="overflow-hidden rounded-lg border">

                    <div className="bg-gray-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Subcategory
                    </div>


                    <div className="divide-y divide-gray-100">

                        {categoryData.subcategories.map((subcategory) => (

                            <Link
                                key={subcategory.id}
                                href={`/build/${id}/select/${categoryData.slug}/${subcategory.slug}`}
                                className="
        flex
        items-center
        justify-between
        px-5
        py-3
        hover:bg-gray-50
        transition
        "
                            >

                                <span className="font-semibold">
                                    {subcategory.name}
                                </span>


                                <span className="text-sm text-gray-400">
                                    Select →
                                </span>

                            </Link>

                        ))}

                    </div>

                </div>

            </main>
        </div>
    );
}
```

### `app/build/actions.ts`

```typescript
"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getDateRange } from "@/lib/trip";
import { auth } from "@/auth";
import { getDestination } from "@/lib/destinations";

export async function getBuildExport(buildId: string) {
  const build = await prisma.build.findUnique({
    where: { id: buildId },
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
  const payload = JSON.parse(formData.get("payload") as string);

  if (!Array.isArray(payload.items)) {
    throw new Error("Invalid import file.");
  }

  for (const item of payload.items) {
    if (item.gearId) {
      await prisma.buildItem.upsert({
        where: { buildId_gearId: { buildId, gearId: item.gearId } },
        update: { quantity: { increment: item.quantity ?? 1 } },
        create: {
          buildId,
          gearId: item.gearId,
          quantity: item.quantity ?? 1,
          isConsumable: !!item.isConsumable,
          isWorn: !!item.isWorn,
        },
      });
    } else {
      await prisma.buildItem.create({
        data: {
          buildId,
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

  const original = await prisma.build.findUnique({
    where: { id: buildId },
    include: { items: true },
  });

  if (!original) throw new Error("Build not found.");

  const copy = await prisma.build.create({
    data: {
      name: `${original.name} (copy)`,
      location: original.location,
      startDate: original.startDate,
      endDate: original.endDate,
      people: original.people,
      minTemperature: original.minTemperature,
      conditions: original.conditions,
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

  redirect(`/build/${copy.id}`);
}
export async function setItemCategory(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const category = formData.get("category") as "base" | "worn" | "consumable";

  await prisma.buildItem.update({
    where: { id: itemId },
    data: {
      isWorn: category === "worn",
      isConsumable: category === "consumable",
    },
  });

  revalidatePath(`/build/${buildId}`);
}

export async function addCustomItem(formData: FormData) {
  const buildId = formData.get("buildId") as string;
  const category = formData.get("category") as string;
  const name = formData.get("name") as string;
  const weightRaw = formData.get("weight_g") as string;
  const priceRaw = formData.get("price_cad") as string;

  if (!name?.trim()) {
    throw new Error("Item name is required.");
  }

  await prisma.buildItem.create({
    data: {
      buildId,
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

  const item = await prisma.buildItem.findUnique({
    where: { id: itemId },
  });

  if (!item) {
    throw new Error("Item not found.");
  }

  const newQuantity = Math.max(1, item.quantity + delta);

  await prisma.buildItem.update({
    where: { id: itemId },
    data: { quantity: newQuantity },
  });

  revalidatePath(`/build/${buildId}`);
}
export async function claimCurrentBuild() {
  const session = await auth();
  if (!session?.user) return;

  const cookieStore = await cookies();
  const buildId = cookieStore.get("currentBuild")?.value;
  if (!buildId) return;

  await prisma.build.updateMany({
    where: { id: buildId, userId: null },
    data: { userId: session.user.id },
  });
}
export async function createBuild(formData: FormData) {
  const session = await auth();

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

  const destinationId = selectedDestination?.id ?? null;

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

  const build = await prisma.build.create({
    data: {
      name,
      location,
      locationLat,
      locationLng,
      startDate: startDateRaw
        ? new Date(startDateRaw)
        : null,
      endDate: endDateRaw
        ? new Date(endDateRaw)
        : null,
      people: peopleRaw ? Number(peopleRaw) : 1,
      minTemperature: minTemperatureRaw
        ? Number(minTemperatureRaw)
        : null,
      conditions: conditions || null,
      userId: session?.user?.id ?? null,
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

  const cookieStore = await cookies();
  cookieStore.set("currentBuild", build.id);

  redirect(`/build/${build.id}`);
}
export async function addGear(formData: FormData) {
  const buildId = formData.get("buildId") as string;
  const gearId = formData.get("gearId") as string;

  await prisma.buildItem.upsert({
    where: {
      buildId_gearId: { buildId, gearId },
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      buildId,
      gearId,
    },
  });

  redirect(`/build/${buildId}`);
}

export async function removeGear(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;

  await prisma.buildItem.delete({
    where: {
      id: itemId,
    },
  });

  redirect(`/build/${buildId}`);
}

export async function updateTripDetails(formData: FormData) {
  const buildId = formData.get("buildId") as string;

  const startDateRaw =
    formData.get("startDate")?.toString() || "";

  const endDateRaw =
    formData.get("endDate")?.toString() || "";

  const startDate = startDateRaw
    ? new Date(startDateRaw)
    : null;

  const endDate = endDateRaw
    ? new Date(endDateRaw)
    : null;

  const people = Number(formData.get("people")) || 1;

  const minTemperature = formData.get("minTemperature")
    ? Number(formData.get("minTemperature"))
    : null;

  const conditions =
    formData.get("conditions")?.toString() || null;

  const destinationIdRaw =
    formData.get("destinationId")?.toString() || null;

  const selectedDestination = getDestination(destinationIdRaw);

  const destinationId = selectedDestination?.id ?? null;

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

  await prisma.build.update({
    where: { id: buildId },
    data: {
      location,
      locationLat,
      locationLng,
      startDate,
      endDate,
      people,
      minTemperature,
      conditions,
    },
  });

  if (
    startDate &&
    endDate &&
    startDate.getTime() <= endDate.getTime()
  ) {
    const range = getDateRange(startDate, endDate);

    await prisma.tripDay.createMany({
      data: range.map((date) => ({
        buildId,
        date,
      })),
      skipDuplicates: true,
    });

    await prisma.tripDay.deleteMany({
      where: {
        buildId,
        date: { notIn: range },
      },
    });
  } else {
    await prisma.tripDay.deleteMany({
      where: { buildId },
    });
  }

  revalidatePath(`/build/${buildId}`);
}

export async function updateTripDay(formData: FormData) {
  const dayId = formData.get("dayId") as string;
  const buildId = formData.get("buildId") as string;

  const minTemperature = formData.get("minTemperature")
    ? Number(formData.get("minTemperature"))
    : null;
  const conditions = (formData.get("conditions") as string) || null;
  const notes = (formData.get("notes") as string) || null;

  await prisma.tripDay.update({
    where: { id: dayId },
    data: { minTemperature, conditions, notes },
  });

  revalidatePath(`/build/${buildId}`);
}
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

### `app/gear/[id]/page.tsx`

```typescript
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
  

export default async function GearDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;


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
import SearchBar from "@/components/SearchBar";
import GearFilters from "@/components/GearFilters";
import GearSort from "@/components/GearSort";
import GearCard from "@/components/GearCard";


export default async function GearPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    maxWeight?: string;
    maxPrice?: string;
    season?: string;
    sort?: string;
  }>;
}) {

  const params = await searchParams;

  const query = params.q;


  let orderBy:
    | {
        weight_g?: "asc" | "desc";
        price_cad?: "asc" | "desc";
        createdAt?: "asc" | "desc";
      }
    | undefined = undefined;


  if (params.sort === "weight") {
    orderBy = {
      weight_g: "asc",
    };
  }


  if (params.sort === "price") {
    orderBy = {
      price_cad: "asc",
    };
  }


  if (params.sort === "newest") {
    orderBy = {
      createdAt: "desc",
    };
  }



  const gear = await prisma.gear.findMany({

    where: {
      AND: [

        query
          ? {
              OR: [
                {
                  name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  brand: {
                    name: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  category: {
                    name: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                },
              ],
            }
          : {},



        params.category
          ? {
              category: {
                name: params.category,
              },
            }
          : {},



        params.maxWeight
          ? {
              weight_g: {
                lte: Number(params.maxWeight),
              },
            }
          : {},



        params.maxPrice
          ? {
              price_cad: {
                lte: Number(params.maxPrice),
              },
            }
          : {},



        params.season
          ? {
              season: params.season,
            }
          : {},

      ],
    },


    orderBy,


    include: {
      brand: true,
      category: true,
    },

  });



  return (
    <main className="p-8">


      <h1 className="text-4xl font-bold mb-8">
        TrailPicker Gear
      </h1>



      <SearchBar />

      <GearFilters />

      <GearSort />



      <div className="grid gap-6 md:grid-cols-3">

        {gear.map((item) => (

          <GearCard
            key={item.id}
            gear={item}
          />

        ))}

      </div>



      {gear.length === 0 && (

        <p className="mt-8">
          No gear found.
        </p>

      )}


    </main>
  );
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
            className="mt-2 flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3"
        >
            <input type="hidden" name="buildId" value={buildId} />
            <input type="hidden" name="category" value={category} />

            <input
                name="name"
                placeholder="Item name"
                required
                className="flex-1 min-w-[140px] rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                name="weight_g"
                type="number"
                placeholder="Weight (g)"
                className="w-24 rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                name="price_cad"
                type="number"
                step="0.01"
                placeholder="Price ($)"
                className="w-24 rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-500"
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
        <h1 className="text-3xl font-bold text-white text-center mb-5">{name}</h1>

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
import Link from "next/link";
import RemoveGearButton from "./RemoveGearButton";
import QuantityStepper from "./QuantityStepper";
import AddCustomItemForm from "./AddCustomItemForm";
import ItemFlagToggle from "./ItemCategoryToggle";
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

            <div className="col-span-4">
                {items.length === 0 ? (
                    <div className="flex items-center gap-4">
                        <Link
                            href={`/build/${buildId}/select/${selectCategory.toLowerCase()}`}
                            className="
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
                        >
                            Add Gear
                        </Link>

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
                                        className="grid grid-cols-[minmax(0,1fr)_100px_100px_100px] items-center py-4 first:pt-0 last:pb-0"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">

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

                                            <div className="flex flex-wrap items-center gap-2 min-w-0">
                                                {item.gear ? (
                                                    <Link
                                                        href={`/gear/${item.gear.id}`}
                                                        className="block font-bold truncate hover:underline hover:text-blue-600"
                                                    >
                                                        {itemName}
                                                    </Link>
                                                ) : (
                                                    <span className="block font-bold italic text-gray-700 truncate">
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

                                        <div className="text-center pr-5">
                                            {weight != null ? `${weight * item.quantity}g` : "—"}
                                        </div>

                                        <div className="text-center pr-5">
                                            {price != null
                                                ? `$${(price * item.quantity).toFixed(2)}`
                                                : "—"}
                                        </div>

                                        <div className="flex items-center justify-end gap-1">
                                            {item.gear && (
                                                <Link
                                                    href="#"
                                                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 transition"
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

                        <div className="mt-2 flex items-center gap-4">
                            <Link
                                href={`/build/${buildId}/select/${selectCategory.toLowerCase()}`}
                                className="inline-block text-sm text-blue-600 hover:underline"
                            >
                                + Add Additional
                            </Link>

                            <AddCustomItemForm buildId={buildId} category={categoryName} />
                        </div>
                    </div>
                )}
            </div>
        </div>
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
    <div className={`flex items-center justify-between px-5 py-3 text-sm ${style.bar}`}>
            <div className="flex items-center gap-2">
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
    items-center
    border-t
    border-gray-400
    px-3
    py-4
    bg-gray-50
    "
        >
            <div className="col-span-3 text-right pr-5 text-lg font-medium text-gray-900">
                Total Cost:
            </div>

            <div className="text-center pr-5 text-2xl font-bold">
                ${totalCost.toFixed(2)}
            </div>

            <div />
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
                className={`
                    rounded-full px-2 py-0.5 text-[10px] font-semibold
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
                className={`
                    rounded-full px-2 py-0.5 text-[10px] font-semibold
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
                w-6 h-6
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
                w-6 h-6
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
//components/builder/ShareBar.tsx
import { useRef, useState } from "react";
import Link from "next/link";
import { duplicateBuild, getBuildExport, importBuildItems } from "@/app/build/actions";

type Props = {
    buildId: string;
    buildName: string;
    createdAt: Date;
    updatedAt: Date;
};

const btnClass =
    "flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed";

export default function ShareBar({ buildId, buildName, createdAt, updatedAt }: Props) {
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
                    title="Copy link"
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

### `components/builder/TripPlanner/TripDayList.tsx`

```typescript
import { CalendarCheck2 } from "lucide-react";
import TripDayRow from "./TripDayRow";

type TripDay = {
  id: string;
  date: Date;
  minTemperature: number | null;
  conditions: string | null;
  notes: string | null;
};

export default function TripDayList({
  buildId,
  days,
}: {
  buildId: string;
  days: TripDay[];
}) {
  const completedDays = days.filter(
    (day) =>
      day.notes?.trim() ||
      day.conditions ||
      day.minTemperature != null,
  ).length;

  const progress =
    days.length > 0
      ? Math.round(
          (completedDays / days.length) * 100,
        )
      : 0;

  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-sm">
      <div className="border-b border-gray-200 bg-white px-5 py-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-800">
              <CalendarCheck2 className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-950">
                Day-by-day itinerary
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add your plan, expected low, and weather
                for each day.
              </p>
            </div>
          </div>

          <div className="min-w-40">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-500">
                {completedDays} of {days.length} planned
              </span>

              <span className="font-bold text-green-800">
                {progress}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-green-700 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-3 sm:p-5">
        {days.map((day, index) => (
          <TripDayRow
            key={day.id}
            buildId={buildId}
            day={day}
            dayNumber={index + 1}
          />
        ))}
      </div>
    </section>
  );
}
```

### `components/builder/TripPlanner/TripDayRow.tsx`

```typescript
"use client";

import {
  CalendarDays,
  Check,
  ChevronDown,
  CloudSun,
  FileText,
  Pencil,
  Thermometer,
  X,
} from "lucide-react";

import {
  useState,
  useTransition,
} from "react";

import { updateTripDay } from "@/app/build/actions";

type TripDay = {
  id: string;
  date: Date;
  minTemperature: number | null;
  conditions: string | null;
  notes: string | null;
};

const conditionMeta: Record<
  string,
  {
    icon: string;
    label: string;
    className: string;
  }
> = {
  dry: {
    icon: "☀️",
    label: "Dry",
    className: "bg-amber-50 text-amber-800",
  },
  rain: {
    icon: "🌧️",
    label: "Rain",
    className: "bg-blue-50 text-blue-800",
  },
  snow: {
    icon: "❄️",
    label: "Snow",
    className: "bg-sky-50 text-sky-800",
  },
};

export default function TripDayRow({
  buildId,
  day,
  dayNumber,
}: {
  buildId: string;
  day: TripDay;
  dayNumber: number;
}) {
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] =
    useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateTripDay(formData);
      setOpen(false);
    });
  }

  const dateLabel = new Date(
    day.date,
  ).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const condition = day.conditions
    ? conditionMeta[day.conditions]
    : null;

  const hasPlan = Boolean(
    day.notes?.trim() ||
      day.conditions ||
      day.minTemperature != null,
  );

  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white transition ${
        open
          ? "border-green-300 shadow-sm ring-2 ring-green-700/5"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-start gap-4 px-4 py-4 text-left sm:px-5"
      >
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
            hasPlan
              ? "bg-green-900 text-white"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {hasPlan ? (
            <Check className="h-5 w-5" />
          ) : (
            dayNumber
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                Day {dayNumber}
              </p>

              <p className="mt-0.5 font-bold text-gray-950">
                {dateLabel}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {condition && (
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${condition.className}`}
                >
                  {condition.icon} {condition.label}
                </span>
              )}

              {day.minTemperature != null && (
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                  {day.minTemperature}°C low
                </span>
              )}

              <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-500">
                <Pencil className="h-3 w-3" />
                {open ? "Close" : "Edit"}
              </span>
            </div>
          </div>

          {day.notes ? (
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
              {day.notes}
            </p>
          ) : (
            <p className="mt-3 text-sm text-gray-400">
              No plan added yet.
            </p>
          )}
        </div>

        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-gray-300 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <form
          action={handleSubmit}
          className="border-t border-gray-100 bg-gray-50 p-4 sm:p-5"
        >
          <input
            type="hidden"
            name="dayId"
            value={day.id}
          />

          <input
            type="hidden"
            name="buildId"
            value={buildId}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500">
                <Thermometer className="h-4 w-4" />
                Expected low
              </span>

              <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/10">
                <input
                  name="minTemperature"
                  type="number"
                  defaultValue={
                    day.minTemperature ?? undefined
                  }
                  placeholder="-5"
                  className="w-full py-2.5 text-sm outline-none"
                />

                <span className="text-sm text-gray-400">
                  °C
                </span>
              </div>
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500">
                <CloudSun className="h-4 w-4" />
                Conditions
              </span>

              <select
                name="conditions"
                defaultValue={
                  day.conditions ?? ""
                }
                className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              >
                <option value="">Unknown</option>
                <option value="dry">
                  ☀️ Dry
                </option>
                <option value="rain">
                  🌧️ Rain
                </option>
                <option value="snow">
                  ❄️ Snow
                </option>
              </select>
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500">
              <FileText className="h-4 w-4" />
              Plan for this day
            </span>

            <textarea
              name="notes"
              defaultValue={day.notes ?? ""}
              placeholder="Example: Leave at 8:00 AM, hike to camp, set up the tent, collect water and cook dinner..."
              rows={4}
              className="w-full resize-y rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm leading-6 outline-none placeholder:text-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
            />
          </label>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-green-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Check className="h-4 w-4" />
              {isPending ? "Saving..." : "Save day"}
            </button>
          </div>
        </form>
      )}
    </article>
  );
}
```

### `components/builder/TripPlanner/TripEditForm.tsx`

```typescript
"use client";
//components/builder/TripPlanner/TripEditForm.tsx
import { useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateTripDetails(formData);
      onSaved();
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

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-green-900 py-2.5 text-white font-semibold hover:bg-green-800 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? "Saving..." : "Save Trip Details"}
        </button>
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

### `components/builder/TripPlanner/TripPlanner.tsx`

```typescript
"use client";

import { useState } from "react";
import TripSummaryCard from "./TripSummaryCard";
import TripEditForm from "./TripEditForm";
import TripDayList from "./TripDayList";
import type { CompatibilityIssue } from "@/lib/compatibility";

type TripDay = {
  id: string;
  date: Date;
  minTemperature: number | null;
  conditions: string | null;
  notes: string | null;
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
    days: TripDay[];
  };
  issues: CompatibilityIssue[];
};

export default function TripPlanner({
  build,
  issues,
}: Props) {
  const [editing, setEditing] = useState(
    !build.startDate,
  );

  return (
    <div className="mx-auto mt-6 max-w-6xl space-y-6 px-3 pb-20 sm:mt-8 sm:px-6">
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
        <>
          <TripSummaryCard
            build={build}
            issues={issues}
            onEdit={() => setEditing(true)}
          />

          {build.days.length > 0 ? (
            <TripDayList
              buildId={build.id}
              days={build.days}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
              <p className="font-semibold text-gray-700">
                No itinerary days yet
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Edit your trip and choose a start and end
                date.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
```

### `components/builder/TripPlanner/TripSummaryCard.tsx`

```typescript
"use client";

import dynamic from "next/dynamic";
import {
    AlertTriangle,
    CalendarDays,
    CloudSun,
    MapPin,
    Navigation,
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

const TripLocationPreview = dynamic(
    () => import("./TripLocationPreview"),
    { ssr: false },
);

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
    onEdit: () => void;
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

    const directionsUrl =
        build.locationLat != null &&
            build.locationLng != null
            ? `https://www.google.com/maps/search/?api=1&query=${build.locationLat},${build.locationLng}`
            : null;

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

                    <button
                        type="button"
                        onClick={onEdit}
                        className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-green-950 shadow-sm transition hover:bg-green-50"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit trip
                    </button>
                </div>
            </div>

            {build.locationLat != null &&
                build.locationLng != null && (
                    <div className="relative border-b border-gray-200">
                        <TripLocationPreview
                            lat={build.locationLat}
                            lng={build.locationLng}
                        />

                        {directionsUrl && (
                            <a
                                href={directionsUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-gray-800 shadow-md transition hover:bg-gray-50"
                            >
                                <Navigation className="h-3.5 w-3.5" />
                                Open map
                            </a>
                        )}
                    </div>
                )}

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
        <div className="flex items-center gap-2">
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
// components/Navbar.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import { auth, signIn } from "@/auth";
import ProfileDropdown from "@/components/ProfileDropdown";
export default async function Navbar() {
    const cookieStore = await cookies();
    const buildId = cookieStore.get("currentBuild")?.value;
    const session = await auth();

    return (
        <header className="sticky top-0 z-50 bg-green-900 text-white shadow-md">
            <div className="flex h-16 items-center justify-between px-10">
                <Link href="/" className="text-2xl font-bold text-white">🏕 TrailPicker</Link>

                <nav className="flex items-center gap-11 text-sm font-medium">
                    <Link href={buildId ? `/build/${buildId}` : "/build"} className="text-white text-lg font-semibold hover:text-gray-200 hover:underline">Builder</Link>
                    <Link href="/gear" className="text-white text-lg font-semibold hover:text-gray-200 hover:underline">Gear</Link>
                    <Link href="/marketplace" className="text-white text-lg font-semibold hover:text-gray-200 hover:underline">Marketplace</Link>
                    <Link href="/community" className="text-white text-lg font-semibold hover:text-gray-200 hover:underline">Community</Link>
                    <Link href="/guide" className="text-white text-lg font-semibold hover:text-gray-200 hover:underline">Guides</Link>
                </nav>

                {session?.user ? (
                    <ProfileDropdown
                        name={session.user.name}
                        email={session.user.email}
                        image={session.user.image}
                    />
                ) : (
                    <form action={async () => {
                        "use server";
                        await signIn("google");
                    }}>
                        <button className="
            rounded-full
            bg-white
            px-5 py-2
            text-sm font-semibold
            text-green-950
            hover:bg-green-100
            cursor-pointer
            transition
        ">
                            Sign in
                        </button>
                    </form>
                )}
            </div>
        </header>
    );
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
                    <p className="text-sm font-semibold text-white leading-none">
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
                        absolute right-0 mt-3
                        w-72
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
    ".env.example", ".gitignore", ".npmrc"
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

### `next-env.d.ts`

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";

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

  // Brands

  const durston = await prisma.brand.create({
    data: {
      name: "Durston",
      website: "https://durstongear.com",
    },
  });


  const bigAgnes = await prisma.brand.create({
    data: {
      name: "Big Agnes",
      website: "https://www.bigagnes.com",
    },
  });


  const hmg = await prisma.brand.create({
    data: {
      name: "Hyperlite Mountain Gear",
      website: "https://www.hyperlitemountaingear.com",
    },
  });


  const thermarest = await prisma.brand.create({
    data: {
      name: "Therm-a-Rest",
    },
  });



  // Categories

  const packs = await prisma.category.create({
    data: {
      name: "Packs",
      slug: "packs",
    },
  });


  const shelter = await prisma.category.create({
    data: {
      name: "Shelter",
      slug: "shelter",
    },
  });


  const sleep = await prisma.category.create({
    data: {
      name: "Sleep",
      slug: "sleep",
    },
  });


  const cooking = await prisma.category.create({
    data: {
      name: "Cooking",
      slug: "cooking",
    },
  });


  const water = await prisma.category.create({
    data: {
      name: "Water",
      slug: "water",
    },
  });


  const clothing = await prisma.category.create({
    data: {
      name: "Clothing",
      slug: "clothing",
    },
  });


  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
      slug: "electronics",
    },
  });


  const misc = await prisma.category.create({
    data: {
      name: "Misc",
      slug: "misc",
    },
  });



  // Subcategories

  const internalFrame = await prisma.subcategory.create({
    data: {
      name: "Internal Frame",
      slug: "internal-frame",
      categoryId: packs.id,
    },
  });


  const frameless = await prisma.subcategory.create({
    data: {
      name: "Frameless",
      slug: "frameless",
      categoryId: packs.id,
    },
  });


  const tent = await prisma.subcategory.create({
    data: {
      name: "Tent",
      slug: "tent",
      categoryId: shelter.id,
    },
  });


  const sleepingPad = await prisma.subcategory.create({
    data: {
      name: "Sleeping Pad",
      slug: "sleeping-pad",
      categoryId: sleep.id,
    },
  });



  // Remaining subcategories

  await prisma.subcategory.createMany({
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


  await prisma.gear.create({
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



  await prisma.gear.create({
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



  await prisma.gear.create({
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



  await prisma.gear.create({
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


main()
  .then(() => {
    console.log("Seed complete");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
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
