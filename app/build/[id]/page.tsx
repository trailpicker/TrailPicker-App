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


            <main className="max-w-7xl mx-auto p-2">


                <div className="mt-10 overflow-hidden rounded-xl bg-white">


                    {/* Header */}
                    <div className="grid grid-cols-5 p-2 text-xs font-light text-gray-600">
                        <div>Component</div>
                        <div>Selection</div>
                        <div>Weight</div>
                        <div>Price</div>
                        <div></div>
                    </div>

                    <BuildRow
                        name="Backpack"
                        link="Packs"
                        buildId={build.id}
                        gear={
                            build.items.find(
                                (item) =>
                                    item.gear.category.name === "Packs"
                            )?.gear
                        }
                    />

                    <BuildRow
                        name="Shelter"
                        link="Shelter"
                        buildId={build.id}
                        gear={
                            build.items.find(
                                (item) =>
                                    item.gear.category.name === "Shelter"
                            )?.gear
                        }
                    />

                    <BuildRow
                        name="Sleep System"
                        link="Sleep"
                        buildId={build.id}
                        gear={
                            build.items.find(
                                (item) =>
                                    item.gear.category.name === "Sleep"
                            )?.gear
                        }
                    />

                </div>
                <div className="mt-8 space-y-4">
                    {build.items.length === 0 ? (
                        <p>No gear added yet.</p>
                    ) : (
                        build.items.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-lg border p-4"
                            >
                                <h2 className="font-semibold">
                                    {item.gear.name}


                                    {item.quantity > 1 && (
                                        <span className="ml-2 rounded bg-gray-200 px-2 py-1 text-sm">
                                            ×{item.quantity}
                                        </span>
                                    )}
                                </h2>


                                <p>{item.gear.brand.name}</p>


                                <p>
                                    {item.gear.weight_g ?? "Unknown"} g
                                </p>
                                <RemoveGearButton
                                    itemId={item.id}
                                    buildId={build.id}
                                />
                            </div>
                        ))
                    )}
                </div>
                <BuildSummary
                    itemCount={build.items.length}
                    baseWeight={baseWeight}
                    baseWeightLb={baseWeightLb}
                    totalCost={totalCost}
                />
            </main>
        </>
    );
}
