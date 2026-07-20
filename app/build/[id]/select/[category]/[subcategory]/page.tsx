import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddGearButton from "@/components/builder/AddGearButton";
import BrandFilter from "@/components/filters/BrandFilter";
import FilterSection from "@/components/filters/FilterSection";
import RangeFilter from "@/components/filters/RangeFilter";
import SortHeader from "@/components/filters/SortHeader";

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
    const { id, category, subcategory } = await params;


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
                        slug: subcategory,
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
                slug: subcategory,
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
        },
    });

    return (
        <main className="max-w-[110rem] mx-auto px-8 py-8">

            <h1 className="text-3xl font-bold mb-8">
                Choose {subcategory.replace("-", " ")}
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
                    <div className="grid grid-cols-[2.3fr_90px_90px_100px_90px_90px_90px_90px] bg-gray-50 px-5 py-3 text-xs font-semibold tracking-wide text-gray-500">
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
                                    <div>
                                        <h2 className="font-semibold hover:text-blue-600">
                                            {item.name}
                                        </h2>

                                        <p className="text-[13px] text-gray-500">
                                            {item.brand.name}
                                        </p>
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
    );
}