import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddGearButton from "@/components/builder/AddGearButton";
import BrandFilter from "@/components/filters/BrandFilter";
import FilterSection from "@/components/filters/FilterSection";
import RangeFilter from "@/components/filters/RangeFilter";
export default async function SelectGearPage({
    params,
    searchParams,
}: {
    params: Promise<{
        id: string;
        category: string;
    }>;
    searchParams: Promise<{
        brand?: string;
        maxWeight?: string;
        maxPrice?: string;
    }>;
}) {
    const filters = await searchParams;

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
    const { id, category } = await params;


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
                    category: {
                        name: category,
                    },
                },
            },
        },
        orderBy: {
            name: "asc",
        },
    });


    const gear = await prisma.gear.findMany({
        where: {
            category: {
                name: category,
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
        include: {
            brand: true,
        },
    });

    return (
        <main className="max-w-6xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Choose {category}
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
                <div className="space-y-4">
                    {gear.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center border-b py-5"
                        >
                            <div>
                                <h2 className="font-semibold">
                                    {item.name}
                                </h2>

                                <p className="text-gray-500">
                                    {item.brand.name}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {item.weight_g}g · ${item.price_cad}
                                </p>
                            </div>

                            <AddGearButton
                                buildId={id}
                                gearId={item.id}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}