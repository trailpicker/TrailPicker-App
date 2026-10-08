import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Package, Search, SlidersHorizontal } from "lucide-react";
import AddGearButton from "@/components/builder/AddGearButton";
import { requireBuildPageAccess } from "@/lib/build-access";
import { prisma } from "@/lib/prisma";
import { pickerHref, pickerLimit, pickerValue, pickerWeight, type PickerSearch } from "@/lib/gear-picker";

export default async function GearPicker({ buildId, categorySlug, filters, subcategorySlug }: {
  buildId: string;
  categorySlug: string;
  filters: PickerSearch;
  subcategorySlug?: string;
}) {
  // Public build viewers must never reach the editing picker.
  await requireBuildPageAccess(buildId);
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug.toLowerCase() },
    include: { subcategories: {
      orderBy: { name: "asc" },
      include: {
        _count: { select: { gear: true } },
        gear: {
          where: { images: { some: {} } },
          orderBy: { name: "asc" }, take: 1,
          select: { name: true, images: { orderBy: [{ isPrimary: "desc" }, { id: "asc" }], take: 1 } },
        },
      },
    } },
  });
  if (!category) notFound();
  const selectedSlug = subcategorySlug ?? pickerValue(filters.subcategory);
  const selected = selectedSlug ? category.subcategories.find((item) => item.slug === selectedSlug) : undefined;
  if (selectedSlug && !selected) notFound();
  const path = `/build/${encodeURIComponent(buildId)}/select/${encodeURIComponent(category.slug)}`;
  const scope = { categoryId: category.id, ...(selected ? { subcategoryId: selected.id } : {}) };
  const q = pickerValue(filters.q).trim().slice(0, 120);
  const brands = (Array.isArray(filters.brand) ? filters.brand : [filters.brand ?? ""])
    .flatMap((value) => value.split(",")).filter(Boolean);
  const maxWeight = pickerWeight(filters.maxWeight);
  const maxPrice = pickerLimit(filters.maxPrice);
  const sort = pickerValue(filters.sort);
  // Preserve existing weight/price + direction links while using one select in the new UI.
  const direction = sort.endsWith("-desc") || pickerValue(filters.direction) === "desc" ? "desc" as const : "asc" as const;
  const [availableBrands, gear, categoryCount] = await Promise.all([
    prisma.brand.findMany({ where: { gear: { some: scope } }, orderBy: { name: "asc" } }),
    prisma.gear.findMany({
      where: {
        ...scope,
        ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
        ...(brands.length ? { brand: { name: { in: brands } } } : {}),
        ...(maxWeight !== undefined ? { weight_g: { lte: maxWeight } } : {}),
        ...(maxPrice !== undefined ? { price_cad: { lte: maxPrice } } : {}),
      },
      orderBy: sort.startsWith("weight") ? [{ weight_g: direction }, { name: "asc" }]
        : sort.startsWith("price") ? [{ price_cad: direction }, { name: "asc" }]
        : [{ name: "asc" }],
      include: { brand: true, subcategory: true, images: { orderBy: [{ isPrimary: "desc" }, { id: "asc" }], take: 1 } },
    }),
    prisma.gear.count({ where: { categoryId: category.id } }),
  ]);
  const activeFilters = !!(q || brands.length || maxWeight !== undefined || maxPrice !== undefined);
  const sortValue = sort.startsWith("weight") ? `weight-${direction}` : sort.startsWith("price") ? `price-${direction}` : "name";
  const inputClass = "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/15";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <Link href={`/build/${buildId}`} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-800"><ArrowLeft size={16} /> Back to build</Link>
        <div className="mb-6 mt-5 flex flex-wrap items-end justify-between gap-3">
          <div><p className="mb-1 text-xs font-semibold uppercase tracking-widest text-green-800">Gear selection</p><h1 className="text-3xl font-semibold tracking-tight">Choose {category.name}</h1><p className="mt-2 text-sm text-gray-500">Browse everything, or choose a type below.</p></div>
          <Link href={path} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:border-green-700" aria-current={!selected ? "page" : undefined}>All {category.name.toLowerCase()} <span className="ml-2 text-gray-400">{categoryCount}</span></Link>
        </div>

        <nav aria-label={`${category.name} types`} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {category.subcategories.map((item) => {
            const photo = item.gear[0]?.images[0];
            const active = selected?.id === item.id;
            return <Link key={item.id} href={pickerHref(path, filters, item.slug)} aria-current={active ? "page" : undefined}
              className={`group overflow-hidden rounded-2xl border bg-white transition hover:border-green-700 hover:shadow-sm ${active ? "border-green-800 ring-2 ring-green-800/15" : "border-gray-200"}`}>
              <div className="relative aspect-square bg-white">
                {photo ? <Image src={photo.url} alt={item.gear[0].name} fill sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 240px" className="object-contain p-5 transition group-hover:scale-105" />
                  : <div className="flex h-full items-center justify-center text-gray-300"><Package size={48} strokeWidth={1} aria-label="No product photo" /></div>}
                {active && <span className="absolute left-3 top-3 rounded-full bg-green-800 px-2.5 py-1 text-xs font-medium text-white">Selected</span>}
              </div>
              <div className="flex items-center justify-between gap-2 border-t border-gray-100 px-4 py-3"><div><h2 className="text-sm font-semibold">{item.name}</h2><p className="mt-0.5 text-xs text-gray-500">{item._count.gear} products</p></div><ArrowUpRight size={16} className="shrink-0 text-gray-400" /></div>
            </Link>;
          })}
        </nav>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-5 flex items-center justify-between"><h2 className="flex items-center gap-2 font-semibold"><SlidersHorizontal size={16} /> Filters</h2>{activeFilters && <Link href={pickerHref(path, {}, selectedSlug)} className="text-xs text-green-800 underline underline-offset-4">Reset</Link>}</div>
            <form action={path} method="get" key={`${selectedSlug}:${JSON.stringify(filters)}`} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {selectedSlug && <input type="hidden" name="subcategory" value={selectedSlug} />}
              <label className="block text-xs font-medium text-gray-600">Search products<div className="relative mt-2"><Search size={15} className="pointer-events-none absolute left-3 top-3 text-gray-400" /><input name="q" defaultValue={q} placeholder="Product name" maxLength={120} className={`${inputClass} pl-9`} /></div></label>
              <fieldset><legend className="mb-2 text-xs font-medium text-gray-600">Brand</legend><div className="max-h-44 space-y-2 overflow-y-auto">{availableBrands.length ? availableBrands.map((brand) => <label key={brand.id} className="flex items-center gap-2 text-sm"><input type="checkbox" name="brand" value={brand.name} defaultChecked={brands.includes(brand.name)} className="h-4 w-4 accent-green-800" />{brand.name}</label>) : <p className="text-sm text-gray-400">No brands yet</p>}</div></fieldset>
              <label className="text-xs font-medium text-gray-600">Max weight (g)<input className={`${inputClass} mt-2`} name="maxWeight" type="number" min="0" step="1" placeholder="Any weight" defaultValue={maxWeight} /></label>
              <label className="text-xs font-medium text-gray-600">Max price (CAD)<input className={`${inputClass} mt-2`} name="maxPrice" type="number" min="0" step="0.01" placeholder="Any price" defaultValue={maxPrice} /></label>
              <label className="text-xs font-medium text-gray-600">Sort by<select name="sort" defaultValue={sortValue} className={`${inputClass} mt-2`}><option value="name">Name: A–Z</option><option value="weight-asc">Weight: lightest first</option><option value="weight-desc">Weight: heaviest first</option><option value="price-asc">Price: lowest first</option><option value="price-desc">Price: highest first</option></select></label>
              <button className="rounded-lg bg-green-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-900">Apply filters</button>
            </form>
          </aside>

          <section aria-label="Products" className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><h2 className="text-lg font-semibold">{selected?.name ?? `All ${category.name.toLowerCase()}`} <span className="ml-1 text-sm font-normal text-gray-500">{gear.length} {gear.length === 1 ? "product" : "products"}</span></h2><span className="text-xs text-gray-500">Prices in CAD · weight in grams</span></div>
            {gear.length === 0 ? <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center"><Package size={32} className="mx-auto mb-3 text-gray-400" /><h3 className="font-semibold">No products found</h3><p className="mt-2 text-sm text-gray-500">{activeFilters ? "Try removing a filter or browsing another type." : "There are no products in this type yet."}</p><Link href={path} className="mt-4 inline-block text-sm font-medium text-green-800 underline underline-offset-4">Browse all {category.name.toLowerCase()}</Link></div>
              : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{gear.map((item) => <article key={item.id} className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <Link href={`/gear/${item.id}`} className="relative block aspect-[4/3] border-b border-gray-100 bg-white" aria-label={`View ${item.name}`}>
                  {item.images[0] ? <Image src={item.images[0].url} alt={item.name} fill sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 300px" className="object-contain p-6" /> : <div className="flex h-full items-center justify-center text-gray-300"><Package size={44} strokeWidth={1} /></div>}
                </Link>
                <div className="flex flex-1 flex-col p-4"><p className="text-xs text-gray-500">{item.brand.name}{item.subcategory ? ` · ${item.subcategory.name}` : ""}</p><Link href={`/gear/${item.id}`} className="mt-1 font-semibold leading-snug hover:text-green-800">{item.name}</Link>
                  <div className="mb-4 mt-3 flex flex-wrap gap-2 text-xs text-gray-600"><span className="rounded-md bg-gray-50 px-2 py-1">{item.weight_g === null ? "Weight unavailable" : `${item.weight_g.toLocaleString("en-CA")} g`}</span>{item.capacity_l !== null && <span className="rounded-md bg-gray-50 px-2 py-1">{item.capacity_l} L</span>}{item.season && <span className="rounded-md bg-gray-50 px-2 py-1">{item.season}</span>}{item.waterproof === true && <span className="rounded-md bg-gray-50 px-2 py-1">Waterproof</span>}</div>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-3"><span className="text-sm font-semibold">{item.price_cad === null ? "Price unavailable" : `$${item.price_cad.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span><AddGearButton buildId={buildId} gearId={item.id} /></div>
                </div>
              </article>)}</div>}
          </section>
        </div>
      </main>
    </div>
  );
}
