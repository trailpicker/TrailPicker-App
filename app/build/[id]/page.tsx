import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import GearSelector from "@/components/builder/GearSelector";
import RemoveGearButton from "@/components/builder/RemoveGearButton";
import {
    calculateBaseWeight,
    gramsToPounds,
    calculateTotalCost,
} from "@/lib/calculations";
import BuildSummary from "@/components/builder/BuildSummary";
import BuildRow from "@/components/builder/BuildRow";
import BuildHeader from "@/components/builder/BuildHeader";


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
    const baseWeight = calculateBaseWeight(
        build.items
    );


    const baseWeightLb = gramsToPounds(
        baseWeight
    );
    const totalCost = calculateTotalCost(
        build.items
    );
    const packs = await prisma.gear.findMany({
        where: {
            category: {
                name: "Packs",
            },
        },
        include: {
            brand: true,
        },
    });




    const shelter = await prisma.gear.findMany({
        where: {
            category: {
                name: "Shelter",
            },
        },
        include: {
            brand: true,
        },
    });




    const sleep = await prisma.gear.findMany({
        where: {
            category: {
                name: "Sleep",
            },
        },
        include: {
            brand: true,
        },
    });
    return (
        <>
            <BuildHeader
                name={build.name}
                weight={baseWeight}
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
                        buildId={build.id}
                        items={
                            build.items.filter(
                                (item) =>
                                    item.gear.category.name === "Packs"
                            )
                        }
                    />

                    <BuildRow
                        name="Shelter"
                        gearLink="/gear/shelter"
                        selectCategory="shelter"
                        buildId={build.id}
                        items={
                            build.items.filter(
                                (item) =>
                                    item.gear.category.name === "Shelter"
                            )
                        }
                    />

                    <BuildRow
                        name="Sleep System"
                        gearLink="/gear/sleep"
                        selectCategory="sleep"
                        buildId={build.id}
                        items={
                            build.items.filter(
                                (item) =>
                                    item.gear.category.name === "Sleep"
                            )
                        }
                    />

                    <BuildRow
                        name="Cooking"
                        gearLink="/gear/cooking"
                        selectCategory="cooking"
                        buildId={build.id}
                        items={
                            build.items.filter(
                                (item) =>
                                    item.gear.category.name === "Cooking"
                            )
                        }
                    />

                    <BuildRow
                        name="Water"
                        gearLink="/gear/water"
                        selectCategory="water"
                        buildId={build.id}
                        items={
                            build.items.filter(
                                (item) =>
                                    item.gear.category.name === "Water"
                            )
                        }
                    />

                    <BuildRow
                        name="Clothing"
                        gearLink="/gear/clothing"
                        selectCategory="clothing"
                        buildId={build.id}
                        items={
                            build.items.filter(
                                (item) =>
                                    item.gear.category.name === "Clothing"
                            )
                        }
                    />

                    <BuildRow
                        name="Electronics"
                        gearLink="/gear/electronics"
                        selectCategory="electronics"
                        buildId={build.id}
                        items={
                            build.items.filter(
                                (item) =>
                                    item.gear.category.name === "Electronics"
                            )
                        }
                    />

                    <BuildRow
                        name="Miscellaneous"
                        gearLink="/gear/misc"
                        selectCategory="misc"
                        buildId={build.id}
                        items={
                            build.items.filter(
                                (item) =>
                                    item.gear.category.name === "Misc"
                            )
                        }
                    />

                </div>
            </main>
        </>
    );
}
