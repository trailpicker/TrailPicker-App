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
        <main className="max-w-5xl mx-auto p-8">
            <h1 className="text-4xl font-bold">{build.name}</h1>

            <p className="mt-2 text-gray-600">
                {build.items.length} item{build.items.length !== 1 ? "s" : ""}
            </p>
            <div className="mt-10 space-y-8">

                <section>
                    <h2 className="text-2xl font-bold">
                        Packs
                    </h2>

                    <GearSelector
                        category="Packs"
                        gear={packs}
                        buildId={build.id}
                    />
                </section>


                <section>
                    <h2 className="text-2xl font-bold">
                        Shelter
                    </h2>

                    <GearSelector
                        category="Shelter"
                        gear={shelter}
                        buildId={build.id}
                    />
                </section>


                <section>
                    <h2 className="text-2xl font-bold">
                        Sleep
                    </h2>

                    <GearSelector
                        category="Sleep"
                        gear={sleep}
                        buildId={build.id}
                    />
                </section>

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
    );
}