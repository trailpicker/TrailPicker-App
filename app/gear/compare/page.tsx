import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { ArrowLeft, Scale, ShieldAlert, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { findAccessibleBuild } from "@/lib/build-access";
import { evaluateCompatibility, type BuildForCompat, type CompatItem } from "@/lib/compatibility";
import { comparisonPrice, getComparisonRows, parseCompareIds, type CompareProduct } from "@/lib/gear-comparison";
import { gearMoney, safeGearUrl } from "@/lib/gear-display";
import { RemoveFromComparison, ReplaceComparedGear } from "@/components/gear/ComparisonActions";
import type { SelectedGear } from "@/components/gear/GearCompareSelection";
import ComparisonTable from "@/components/gear/ComparisonTable";
import ProductBuildButton from "@/components/gear/ProductBuildButton";

export const metadata = { title: "Compare Gear | TrailPicker", description: "Compare backpacking equipment side by side." };

type PageParams = { ids?: string | string[]; build?: string | string[] };

export default async function CompareGearPage({ searchParams }: { searchParams: Promise<PageParams> }) {
  const search = await searchParams;
  const ids = parseCompareIds(search.ids);
  const explicit = Array.isArray(search.build) ? search.build[0] : search.build;
  const cookieId = (await cookies()).get("currentBuild")?.value;
  const access = await findAccessibleBuild(explicit || cookieId || "");
  const [found, build] = await Promise.all([
    ids.length ? prisma.gear.findMany({ where: { id: { in: ids } }, include: {
      brand: true, category: true, subcategory: true,
      images: { orderBy: [{ isPrimary: "desc" }, { id: "asc" }] },
      specifications: true,
      prices: { select: { price: true, currency: true, inStock: true } },
      reviews: { select: { rating: true } },
    } }) : Promise.resolve([]),
    access ? prisma.build.findUnique({ where: { id: access.id, userId: access.userId },
      include: { days: true, items: { include: { gear: { include: { category: true, subcategory: true, specifications: true } } } } },
    }) : Promise.resolve(null),
  ]);
  const products = ids.flatMap(id => found.filter(p => p.id === id));
  const comparisonProducts: CompareProduct[] = products;
  const selected: SelectedGear[] = products.map(p => ({ id: p.id, name: p.name, categoryId: p.categoryId, categoryName: p.category.name }));
  const rows = getComparisonRows(comparisonProducts);
  const category = products[0]?.category;
  const back = category ? `/gear/${encodeURIComponent(category.slug)}${build ? `?build=${encodeURIComponent(build.id)}` : ""}` : "/gear";

  const compatibilityInput: BuildForCompat | null = build ? {
    people: build.people, minTemperature: build.minTemperature, conditions: build.conditions,
    startDate: build.startDate, endDate: build.endDate,
  } : null;
  const items: CompatItem[] = build?.items.map(item => ({
    id: item.id, quantity: item.quantity, isConsumable: item.isConsumable, isWorn: item.isWorn,
    customCategory: item.customCategory, gearNameSnapshot: item.gearNameSnapshot,
    weightSnapshot: item.weightSnapshot, priceSnapshot: item.priceSnapshot,
    gear: item.gear ? {
      id: item.gear.id, name: item.gear.name, weight_g: item.gear.weight_g,
      price_cad: item.gear.price_cad, capacity_l: item.gear.capacity_l,
      frame_type: item.gear.frame_type, waterproof: item.gear.waterproof,
      temperature_rating: item.gear.temperature_rating, season: item.gear.season,
      category: { name: item.gear.category.name },
      subcategory: item.gear.subcategory ? { name: item.gear.subcategory.name, slug: item.gear.subcategory.slug } : null,
      specifications: item.gear.specifications,
    } : null,
  })) ?? [];
  const baseline = compatibilityInput ? evaluateCompatibility(compatibilityInput, items, build?.days ?? []) : [];
  const beforeIds = new Set(baseline.filter(i => i.severity !== "info").map(i => `${i.id}:${i.severity}`));

  return <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <Link href={back} className="inline-flex items-center gap-2 text-sm font-semibold text-green-800 hover:underline"><ArrowLeft className="h-4 w-4" />Back to gear</Link>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">Compare equipment</h1><p className="mt-2 text-sm text-gray-600">Up to four products, with recorded specifications and real differences.</p></div>
        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"><Scale className="h-4 w-4 text-green-800" />{products.length} of 4 selected</span>
      </div>

      {products.length < 2 ? <section className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center"><Scale className="mx-auto h-10 w-10 text-gray-400" /><h2 className="mt-4 text-xl font-bold">Choose at least two products</h2><p className="mx-auto mt-2 max-w-md text-sm text-gray-500">Open a gear category or product page and press Compare on the equipment you want to see side by side.</p><Link href={back} className="mt-6 inline-flex rounded-lg bg-green-900 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800">Browse gear</Link></section> : <>
        {build && <p className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">Comparing for <Link href={`/build/${build.id}`} className="font-bold underline">{build.name}</Link>. You can add equipment or replace an existing item from this page.</p>}
        <section aria-label="Compared products" className="mt-7 overflow-x-auto pb-2">
          <div className="grid gap-4" style={{ minWidth: `${Math.max(730, products.length * 255)}px`, gridTemplateColumns: `repeat(${products.length}, minmax(0, 1fr))` }}>
            {products.map(product => {
              const url = safeGearUrl(product.images[0]?.url);
              const image = url && (url.startsWith("https://") || url.startsWith("/")) ? url : null;
              const replaceable = build?.items.filter(item => item.gear?.categoryId === product.categoryId && item.gearId !== product.id).map(item => ({ id: item.id, name: item.gear?.name ?? item.gearNameSnapshot ?? "Gear item" })) ?? [];
              const oneExisting = build?.items.filter(item => item.gear?.categoryId === product.categoryId);
              const oldItem = oneExisting?.length === 1 ? oneExisting[0] : null;
              const simulatedGear = {
                id: product.id, name: product.name, weight_g: product.weight_g,
                price_cad: product.price_cad, capacity_l: product.capacity_l,
                frame_type: product.frame_type, waterproof: product.waterproof,
                temperature_rating: product.temperature_rating, season: product.season,
                category: { name: product.category.name },
                subcategory: product.subcategory ? { name: product.subcategory.name, slug: product.subcategory.slug } : null,
                specifications: product.specifications,
              };
              const alreadyInBuild = build?.items.some(item => item.gearId === product.id);
              const proposed: CompatItem[] = alreadyInBuild
                ? items
                : oldItem
                  ? items.map(item => item.id === oldItem.id ? { ...item, gear: simulatedGear } : item)
                  : [...items, { id: `preview:${product.id}`, quantity: 1, isWorn: false, isConsumable: false, customCategory: null, gearNameSnapshot: null, weightSnapshot: null, priceSnapshot: null, gear: simulatedGear }];
              const additionalIssues = compatibilityInput ? evaluateCompatibility(compatibilityInput, proposed, build?.days ?? [])
                .filter(issue => issue.severity !== "info" && !beforeIds.has(`${issue.id}:${issue.severity}`)) : [];
              return <article key={product.id} className="flex min-w-0 flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex justify-end"><RemoveFromComparison productId={product.id} selected={selected} buildId={build?.id} /></div>
                <Link href={`/gear/${encodeURIComponent(product.id)}`} className="group block"><div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-gray-50">{image ? <Image src={image} alt={product.name} fill sizes="(max-width: 767px) 250px, 350px" className="object-contain p-4 transition group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-xs text-gray-400">Photo unavailable</div>}</div><p className="mt-5 text-xs font-bold uppercase tracking-wider text-green-800">{product.brand.name}</p><h2 className="mt-1 min-h-12 break-words text-lg font-bold leading-tight text-gray-950 group-hover:text-green-800">{product.name}</h2></Link>
                <p className="mt-1 text-xs text-gray-500">{product.subcategory?.name ?? product.category.name}</p>
                <p className="mt-3 text-xl font-bold text-gray-900">{gearMoney(comparisonPrice(product))}</p>
                <p className="text-[11px] text-gray-500">{product.prices.some(price => price.currency === "CAD" && price.inStock) ? "Lowest recorded in-stock CAD offer" : "Catalog price when available"}</p>
                {build && <div className="mt-4 rounded-lg bg-gray-50 p-3 text-xs text-gray-700">
                  {alreadyInBuild ? <p className="font-semibold text-green-800">Already in your build</p> : <p className="font-semibold">Pack check preview</p>}
                  {additionalIssues.length ? <p className="mt-1 flex items-start gap-1.5 text-amber-800"><ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />{additionalIssues.length} additional warning{additionalIssues.length !== 1 ? "s" : ""} in this simulation</p> : <p className="mt-1 flex items-start gap-1.5 text-green-800"><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />No new warnings detected</p>}
                  <p className="mt-2 text-[11px] text-gray-500">{alreadyInBuild ? "Evaluated using your current build." : oldItem ? "Simulated as a replacement for your sole item in this category." : "Simulated as an additional item."}</p>
                  {additionalIssues[0] && <p className="mt-1 text-[11px] text-gray-700">{additionalIssues[0].message}</p>}
                </div>}
                <div className="mt-auto pt-4">{build ? <>{!alreadyInBuild && <ProductBuildButton buildId={build.id} gearId={product.id} />}{!alreadyInBuild && replaceable.length > 0 && <ReplaceComparedGear buildId={build.id} newGearId={product.id} items={replaceable} />}</> : <Link href="/build" className="block rounded-lg bg-green-900 px-3 py-3 text-center text-sm font-bold text-white hover:bg-green-800">Create a build</Link>}</div>
              </article>;
            })}
          </div>
        </section>
        <ComparisonTable products={products.map(p => ({ id: p.id, name: p.name }))} rows={rows} />
      </>}
    </div>
  </main>;
}
