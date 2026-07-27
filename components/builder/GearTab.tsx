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