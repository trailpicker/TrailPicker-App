import { prisma } from "@/lib/prisma";
import { findAccessibleBuild, requireBuildPageAccess } from "@/lib/build-access";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AddGearButton from "@/components/builder/AddGearButton";
import BrandFilter from "@/components/filters/BrandFilter";
import FilterSection from "@/components/filters/FilterSection";
import RangeFilter from "@/components/filters/RangeFilter";
import SortHeader from "@/components/filters/SortHeader";

export type GearBrowseSearch = Record<string, string | string[] | undefined>;
const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";
function limit(value: string | string[] | undefined, integer = false) {
  const text = first(value).trim();
  const number = Number(text);
  if (!text || !Number.isFinite(number) || number < 0) return undefined;
  return integer ? Math.min(Math.floor(number), 2147483647) : number;
}

export default async function OriginalGearPicker({ categorySlug, subcategorySlug, filters }: {
  categorySlug: string; subcategorySlug?: string; filters: GearBrowseSearch;
}) {
  const explicitBuild = first(filters.build);
  const cookieBuild = (await cookies()).get("currentBuild")?.value;
  // Navigation state chooses a candidate; ownership proof authorizes it.
  const access = explicitBuild
    ? await requireBuildPageAccess(explicitBuild)
    : cookieBuild ? await findAccessibleBuild(cookieBuild) : null;
  const build = access ? await prisma.build.findUnique({
    where: { id: access.id, userId: access.userId }, select: { id: true, name: true },
  }) : null;
  const categoryData = await prisma.category.findUnique({
    where: { slug: categorySlug.toLowerCase() },
    include: { subcategories: {
      orderBy: { name: "asc" },
      include: { gear: {
        where: { images: { some: {} } }, take: 1, orderBy: { name: "asc" },
        select: { name: true, images: { take: 1, orderBy: [{ isPrimary: "desc" }, { id: "asc" }] } },
      } },
    } },
  });
  if (!categoryData) notFound();
  const selected = subcategorySlug ? categoryData.subcategories.find(item => item.slug === subcategorySlug) : undefined;
  if (subcategorySlug && !selected) notFound();
  const scope = { categoryId: categoryData.id, ...(selected ? { subcategoryId: selected.id } : {}) };
  const sort = first(filters.sort);
  const direction = first(filters.direction) === "desc" ? "desc" as const : "asc" as const;
  const brands = (Array.isArray(filters.brand) ? filters.brand : [filters.brand ?? ""]).flatMap(item => item.split(",")).filter(Boolean);
  const maxWeight = limit(filters.maxWeight, true);
  const maxPrice = limit(filters.maxPrice);
  const [availableBrands, gear] = await Promise.all([
    prisma.brand.findMany({ where: { gear: { some: scope } }, orderBy: { name: "asc" } }),
    prisma.gear.findMany({
      where: {
        ...scope,
        ...(brands.length ? { brand: { name: { in: brands } } } : {}),
        ...(maxWeight !== undefined ? { weight_g: { lte: maxWeight } } : {}),
        ...(maxPrice !== undefined ? { price_cad: { lte: maxPrice } } : {}),
      },
      orderBy: sort === "weight" ? { weight_g: direction } : sort === "price" ? { price_cad: direction } : undefined,
      include: { brand: true, reviews: true, images: true },
    }),
  ]);
  const base = `/gear/${encodeURIComponent(categoryData.slug)}`;
  function typeHref(slug: string) {
    const query = new URLSearchParams();
    for (const key of ["brand", "maxWeight", "maxPrice", "sort", "direction", "build"]) {
      const value = filters[key];
      if (value) query.set(key, Array.isArray(value) ? value.join(",") : value);
    }
    return `${base}${slug ? "/" + encodeURIComponent(slug) : ""}${query.size ? "?" + query : ""}`;
  }
  const tiles = !selected && categoryData.subcategories.length > 0 ? <nav aria-label="Subcategories" className="mb-6">
    <h2 className="mb-3 text-center text-lg font-semibold">Shop by category</h2>
    <div className="flex flex-wrap justify-center gap-3">
{categoryData.subcategories.map(type => <Link
  key={type.id}
  href={typeHref(type.slug)}
  className="w-28 shrink-0 rounded-lg border border-gray-200 bg-white p-2 text-center">
      <div className="relative mx-auto h-20 w-20">
        {type.gear[0]?.images[0] ? <Image src={type.gear[0].images[0].url} alt={type.gear[0].name} fill sizes="80px" className="object-contain p-1" />
          : <div className="flex h-full items-center justify-center text-xs text-gray-400">No photo</div>}
      </div><span className="text-xs font-semibold">{type.name}</span>
    </Link>)}
    </div>
  </nav> : null;
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-[110rem] mx-auto px-8 py-8">

                <h1 className="text-3xl font-bold mb-8">
                    Choose {selected?.name ?? categoryData.name}
                </h1>

                {build && <p className="mb-4 text-sm text-gray-500">Adding to {build.name} · <Link href={`/build/${build.id}`} className="text-blue-600 hover:underline">Back to build</Link></p>}
                {tiles}
                <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">

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
                    <div role="region" aria-label="Products" className="min-w-0 overflow-x-auto rounded-lg">
                        <p className="mb-8 text-lg font-bold text-black">
                            {gear.length} Compatible Products
                        </p>
                        <div className="grid min-w-[850px] grid-cols-[2.3fr_90px_90px_100px_90px_90px_90px_90px] px-5 py-3 text-xs font-semibold tracking-wide text-gray-500 border-b border-gray-400">
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
                                            {build ? <AddGearButton buildId={build.id} gearId={item.id} /> : <Link href="/build" className="text-sm text-blue-600 hover:underline">Create build</Link>}
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
