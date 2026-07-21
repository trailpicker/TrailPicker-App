import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
    calculateWeightBreakdown,
    calculateTotalCost,
} from "@/lib/calculations";
import WeightSummary from "@/components/builder/WeightSummary";
import BuildRow from "@/components/builder/BuildRow";
import BuildHeader from "@/components/builder/BuildHeader";
import CostSummary from "@/components/builder/CostSummary";
export default async function BuildPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;


    const build = await prisma.build.findUnique({
        where: {
            id,
        },
        include: {
            items: {
                include: {
                    gear: {
                        include: {
                            brand: true,
                            category: true,
                        },
                    },
                },
            },
        },
    });


    if (!build) {
        notFound();
    }
    const { base, consumable, worn, total } = calculateWeightBreakdown(
        build.items
    );
    const totalCost = calculateTotalCost(build.items);
    return (
        <>
            <BuildHeader
                name={build.name}
                weight={total}
                cost={totalCost}
                items={build.items.length}
            />

            <main className="max-w-screen-2xl mx-auto p-2">
                <div className="mt-10 overflow-hidden rounded-xl bg-white">


                    {/* Header */}
                    <div className="grid grid-cols-[180px_minmax(0,1fr)_100px_100px_100px] p-3 text-xs font-light text-gray-600">
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
                        buildId={build.id}
                        items={
                            build.items.filter(
                                (item) =>
                                    item.gear?.category.name === "Packs" ||
                                    item.customCategory === "Packs"
                            )
                        }
                    />

                    <BuildRow
                        name="Shelter"
                        gearLink="/gear/shelter"
                        selectCategory="shelter"
                        categoryName="Shelter"
                        buildId={build.id}
                        items={
                            build.items.filter(
                                (item) =>
                                    item.gear?.category.name === "Shelter" ||
                                    item.customCategory === "Shelter"
                            )
                        }
                    />

                    <BuildRow
                        name="Sleep System"
                        gearLink="/gear/sleep"
                        selectCategory="sleep"
                        categoryName="Sleep"
                        buildId={build.id}
                        items={
                            build.items.filter(
                                (item) =>
                                    item.gear?.category.name === "Sleep" ||
                                    item.customCategory === "Sleep"
                            )
                        }
                    />

                    <BuildRow
                        name="Cooking"
                        gearLink="/gear/cooking"
                        selectCategory="cooking"
                        categoryName="Cooking"
                        buildId={build.id}
                        items={
                            build.items.filter(
                                (item) =>
                                    item.gear?.category.name === "Cooking" ||
                                    item.customCategory === "Cooking"
                            )
                        }
                    />

                    <BuildRow
                        name="Water"
                        gearLink="/gear/water"
                        selectCategory="water"
                        categoryName="Water"
                        buildId={build.id}
                        items={
                            build.items.filter(
                                (item) =>
                                    item.gear?.category.name === "Water" ||
                                    item.customCategory === "Water"
                            )
                        }
                    />

                    <BuildRow
                        name="Clothing"
                        gearLink="/gear/clothing"
                        selectCategory="clothing"
                        categoryName="Clothing"
                        buildId={build.id}
                        items={
                            build.items.filter(
                                (item) =>
                                    item.gear?.category.name === "Clothing" ||
                                    item.customCategory === "Clothing"
                            )
                        }
                    />

                    <BuildRow
                        name="Electronics"
                        gearLink="/gear/electronics"
                        selectCategory="electronics"
                        categoryName="Electronics"
                        buildId={build.id}
                        items={
                            build.items.filter(
                                (item) =>
                                    item.gear?.category.name === "Electronics" ||
                                    item.customCategory === "Electronics"
                            )
                        }
                    />

                    <BuildRow
                        name="Miscellaneous"
                        gearLink="/gear/misc"
                        selectCategory="misc"
                        categoryName="Misc"
                        buildId={build.id}
                        items={
                            build.items.filter(
                                (item) =>
                                    item.gear?.category.name === "Miscellaneous" ||
                                    item.customCategory === "Miscellaneous"
                            )
                        }
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


            </main>
        </>
    );
}
