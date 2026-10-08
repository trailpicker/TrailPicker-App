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


