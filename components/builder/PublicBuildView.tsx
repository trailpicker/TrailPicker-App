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

