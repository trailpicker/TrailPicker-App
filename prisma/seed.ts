/**
 * TrailPicker v0.3 development seed
 *
 * - Preserves the four real gear examples from the existing seed (create only if absent).
 * - Adds fictional, clearly labeled catalog examples for exercising the UI and analytics.
 * - Does NOT create affiliate links, retailer offers, users, reviews, or public builds.
 * - Re-runnable: categories/subcategories are upserted; demo gear uses stable IDs.
 * - Does NOT delete or alter real/affiliate gear already in the database.
 *
 * Use from the project root: npx prisma db seed
 * To skip fictional gear: TRAILPICKER_SEED_DEMO=0 npx prisma db seed
 * In NODE_ENV=production, fictional gear is skipped unless TRAILPICKER_SEED_DEMO=1.
 *
 * All demo weights/prices/specs are illustrative, NOT verified product specifications.
 */
import "dotenv/config";

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required to run the TrailPicker seed.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const categories = [
  { slug: "packs", name: "Packs", subs: [
    ["internal-frame", "Internal Frame"], ["frameless", "Frameless"],
    ["daypack", "Daypack"], ["external-frame", "External Frame"],
  ] },
  { slug: "shelter", name: "Shelter", subs: [
    ["tent", "Tent"], ["bivy", "Bivy"], ["tarp", "Tarp"], ["hammock", "Hammock"],
  ] },
  { slug: "sleep", name: "Sleep", subs: [
    ["sleeping-pad", "Sleeping Pad"], ["sleeping-bag", "Sleeping Bag"],
    ["quilt", "Quilt"], ["liner", "Liner"],
  ] },
  { slug: "cooking", name: "Cooking", subs: [
    ["stove", "Stove"], ["cookware", "Cookware"], ["utensils", "Utensils"],
    ["fuel", "Fuel"],
  ] },
  { slug: "water", name: "Water", subs: [
    ["filter", "Filter"], ["bottle", "Bottle"],
    ["reservoir", "Reservoir"], ["purification", "Purification"],
  ] },
  { slug: "clothing", name: "Clothing", subs: [
    ["rain-gear", "Rain Gear"], ["insulation", "Insulation"],
    ["base-layer", "Base Layer"], ["accessories", "Accessories"],
  ] },
  { slug: "electronics", name: "Electronics", subs: [
    ["headlamp", "Headlamp"], ["power-bank", "Power Bank"],
    ["navigation", "Navigation"], ["charging", "Charging"],
  ] },
  { slug: "misc", name: "Misc", subs: [
    ["first-aid", "First Aid"], ["repair-kit", "Repair Kit"],
    ["trekking-poles", "Trekking Poles"], ["camp-accessories", "Camp Accessories"],
  ] },
] as const;

type CategorySlug = (typeof categories)[number]["slug"];
type Spec = { key: string; value: string; unit?: string };
type DemoGear = {
  slug: string;
  name: string;
  category: CategorySlug;
  subcategory: string;
  weight_g: number | null;
  price_cad: number | null;
  capacity_l?: number;
  frame_type?: string;
  waterproof?: boolean;
  temperature_rating?: number;
  season?: string;
  material?: string;
  specs?: Spec[];
  note?: string;
};

// DEMO ONLY. Do not market these as real products, quotes, offers, or safety ratings.
// Include low-cost/heavy, premium/light, small/large, hot/cold, and missing-data cases.
const demoGear: DemoGear[] = [
  // PACKS — capacity_l is correctly used for volume in liters.
  { slug:"pack-28-fast", name:"28 L Fastpack", category:"packs", subcategory:"daypack", weight_g:540, price_cad:115, capacity_l:28, frame_type:"frameless", material:"Nylon", note:"Short-trip and undersized-pack test case." },
  { slug:"pack-35-ul", name:"35 L Minimal Pack", category:"packs", subcategory:"frameless", weight_g:610, price_cad:235, capacity_l:35, frame_type:"frameless", material:"Ripstop nylon" },
  { slug:"pack-40-frameless", name:"40 L Trail Pack", category:"packs", subcategory:"frameless", weight_g:830, price_cad:170, capacity_l:40, frame_type:"frameless" },
  { slug:"pack-45-frame", name:"45 L All-Rounder", category:"packs", subcategory:"internal-frame", weight_g:1210, price_cad:245, capacity_l:45, frame_type:"internal", waterproof:false },
  { slug:"pack-55-frame", name:"55 L Weekend Frame Pack", category:"packs", subcategory:"internal-frame", weight_g:1490, price_cad:280, capacity_l:55, frame_type:"internal" },
  { slug:"pack-65-budget", name:"65 L Budget Hauler", category:"packs", subcategory:"internal-frame", weight_g:2360, price_cad:155, capacity_l:65, frame_type:"internal" },
  { slug:"pack-72-expedition", name:"72 L Expedition Carrier", category:"packs", subcategory:"external-frame", weight_g:2680, price_cad:390, capacity_l:72, frame_type:"external" },
  { slug:"pack-48-no-weight", name:"48 L Unweighed Prototype", category:"packs", subcategory:"internal-frame", weight_g:null, price_cad:null, capacity_l:48, frame_type:"internal", note:"Intentionally missing weight and price for analysis coverage tests." },

  // SHELTER — no capacity_l for tents: that field represents *liters*, not people.
  // Occupancy lives in specifications until the schema adds personCapacity.
  { slug:"tent-1-ul", name:"Solo Trekking-Pole Tent", category:"shelter", subcategory:"tent", weight_g:780, price_cad:345, waterproof:true, season:"3-season", material:"Silpoly", specs:[{key:"Sleeping capacity", value:"1", unit:"person"}] },
  { slug:"tent-2-freestanding", name:"Two-Person Dome Tent", category:"shelter", subcategory:"tent", weight_g:1550, price_cad:310, waterproof:true, season:"3-season", specs:[{key:"Sleeping capacity",value:"2",unit:"people"}] },
  { slug:"tent-3-roomy", name:"Three-Person Shared Tent", category:"shelter", subcategory:"tent", weight_g:2180, price_cad:420, waterproof:true, season:"3-season", specs:[{key:"Sleeping capacity",value:"3",unit:"people"}] },
  { slug:"tent-4-group", name:"Four-Person Trail Shelter", category:"shelter", subcategory:"tent", weight_g:3200, price_cad:390, waterproof:true, season:"3-season", specs:[{key:"Sleeping capacity",value:"4",unit:"people"}] },
  { slug:"tent-winter-2", name:"Two-Person Winter Tent", category:"shelter", subcategory:"tent", weight_g:2850, price_cad:680, waterproof:true, season:"4-season", specs:[{key:"Sleeping capacity",value:"2",unit:"people"}], note:"Winter-rating comparison test; does not constitute real-world safety guidance." },
  { slug:"bivy-light", name:"Compact Bivy", category:"shelter", subcategory:"bivy", weight_g:510, price_cad:165, waterproof:true, season:"3-season", specs:[{key:"Sleeping capacity",value:"1",unit:"person"}] },
  { slug:"tarp-rain", name:"Rain Tarp 3 × 3 m", category:"shelter", subcategory:"tarp", weight_g:450, price_cad:95, waterproof:true, material:"Silnylon", specs:[{key:"Dimensions",value:"3 × 3",unit:"m"}] },
  { slug:"hammock-mesh", name:"Bug-Net Hammock", category:"shelter", subcategory:"hammock", weight_g:950, price_cad:160, waterproof:false, season:"3-season" },

  // SLEEP — temperature_rating is a demo Celsius value for test scenarios.
  { slug:"bag-summer-10", name:"Summer Sleeping Bag +10°C", category:"sleep", subcategory:"sleeping-bag", weight_g:780, price_cad:105, temperature_rating:10, season:"summer" },
  { slug:"bag-3season-0", name:"Three-Season Sleeping Bag 0°C", category:"sleep", subcategory:"sleeping-bag", weight_g:1160, price_cad:210, temperature_rating:0, season:"3-season" },
  { slug:"bag-cold-minus-7", name:"Cold-Weather Sleeping Bag −7°C", category:"sleep", subcategory:"sleeping-bag", weight_g:1450, price_cad:305, temperature_rating:-7, season:"3-season" },
  { slug:"bag-winter-minus-18", name:"Winter Sleeping Bag −18°C", category:"sleep", subcategory:"sleeping-bag", weight_g:2200, price_cad:450, temperature_rating:-18, season:"4-season" },
  { slug:"quilt-light-5", name:"Lightweight Quilt +5°C", category:"sleep", subcategory:"quilt", weight_g:480, price_cad:265, temperature_rating:5 },
  { slug:"quilt-cold-minus-5", name:"Insulated Quilt −5°C", category:"sleep", subcategory:"quilt", weight_g:760, price_cad:330, temperature_rating:-5 },
  { slug:"pad-air-light", name:"Ultralight Inflatable Pad", category:"sleep", subcategory:"sleeping-pad", weight_g:390, price_cad:180, specs:[{key:"R-value",value:"4.2"}] },
  { slug:"pad-air-winter", name:"Insulated Winter Pad", category:"sleep", subcategory:"sleeping-pad", weight_g:690, price_cad:235, specs:[{key:"R-value",value:"6.5"}] },
  { slug:"pad-foam", name:"Closed-Cell Foam Pad", category:"sleep", subcategory:"sleeping-pad", weight_g:450, price_cad:48, specs:[{key:"R-value",value:"2.0"}] },
  { slug:"liner-basic", name:"Sleep Liner", category:"sleep", subcategory:"liner", weight_g:210, price_cad:35 },

  // COOKING — cookware capacity_l represents usable liquid volume.
  { slug:"stove-canister-mini", name:"Compact Canister Stove", category:"cooking", subcategory:"stove", weight_g:89, price_cad:55 },
  { slug:"stove-integrated", name:"Integrated Stove System", category:"cooking", subcategory:"stove", weight_g:420, price_cad:175 },
  { slug:"stove-liquid-fuel", name:"Liquid-Fuel Stove", category:"cooking", subcategory:"stove", weight_g:340, price_cad:145 },
  { slug:"pot-solo-065", name:"Solo Pot 650 mL", category:"cooking", subcategory:"cookware", weight_g:120, price_cad:54, capacity_l:0.65 },
  { slug:"pot-group-14", name:"Group Pot 1.4 L", category:"cooking", subcategory:"cookware", weight_g:245, price_cad:75, capacity_l:1.4 },
  { slug:"pot-group-25", name:"Large Pot 2.5 L", category:"cooking", subcategory:"cookware", weight_g:390, price_cad:92, capacity_l:2.5 },
  { slug:"spork-titanium", name:"Titanium Camp Spork", category:"cooking", subcategory:"utensils", weight_g:18, price_cad:16 },
  { slug:"fuel-canister-demo", name:"Sample Fuel Canister", category:"cooking", subcategory:"fuel", weight_g:360, price_cad:12, note:"Illustrative total canister weight; consumable flag belongs to BuildItem." },

  // WATER — capacity_l represents *storage* volume for bottles/reservoirs.
  { slug:"filter-squeeze", name:"Compact Squeeze Filter", category:"water", subcategory:"filter", weight_g:75, price_cad:52 },
  { slug:"filter-pump", name:"Pump Water Filter", category:"water", subcategory:"filter", weight_g:440, price_cad:125 },
  { slug:"filter-gravity", name:"Gravity Filter System", category:"water", subcategory:"filter", weight_g:265, price_cad:150 },
  { slug:"bottle-1l", name:"Trail Bottle 1 L", category:"water", subcategory:"bottle", weight_g:165, price_cad:24, capacity_l:1 },
  { slug:"bottle-15l", name:"Wide-Mouth Bottle 1.5 L", category:"water", subcategory:"bottle", weight_g:210, price_cad:29, capacity_l:1.5 },
  { slug:"reservoir-2l", name:"Hydration Reservoir 2 L", category:"water", subcategory:"reservoir", weight_g:195, price_cad:42, capacity_l:2 },
  { slug:"reservoir-3l", name:"Hydration Reservoir 3 L", category:"water", subcategory:"reservoir", weight_g:260, price_cad:53, capacity_l:3 },
  { slug:"purification-tablets", name:"Sample Water Purification Tablets", category:"water", subcategory:"purification", weight_g:38, price_cad:17, note:"Demo inventory entry only; never infer water safety from this sample product." },

  // CLOTHING — different combinations allow worn-weight and waterproof checks.
  { slug:"jacket-rain", name:"Waterproof Rain Jacket", category:"clothing", subcategory:"rain-gear", weight_g:315, price_cad:155, waterproof:true },
  { slug:"jacket-wind", name:"Wind Shell", category:"clothing", subcategory:"rain-gear", weight_g:125, price_cad:85, waterproof:false },
  { slug:"pants-rain", name:"Waterproof Rain Pants", category:"clothing", subcategory:"rain-gear", weight_g:275, price_cad:120, waterproof:true },
  { slug:"jacket-puffy", name:"Insulated Puffy Jacket", category:"clothing", subcategory:"insulation", weight_g:380, price_cad:215 },
  { slug:"fleece-mid", name:"Midweight Fleece", category:"clothing", subcategory:"insulation", weight_g:460, price_cad:90 },
  { slug:"baselayer-merino", name:"Merino Base Layer", category:"clothing", subcategory:"base-layer", weight_g:205, price_cad:105, material:"Merino wool" },
  { slug:"gloves-liner", name:"Light Liner Gloves", category:"clothing", subcategory:"accessories", weight_g:63, price_cad:30 },
  { slug:"mitts-winter", name:"Insulated Winter Mitts", category:"clothing", subcategory:"accessories", weight_g:195, price_cad:75 },

  // ELECTRONICS — price and weight distributions stress filters and summaries.
  { slug:"headlamp-compact", name:"Compact Headlamp", category:"electronics", subcategory:"headlamp", weight_g:82, price_cad:40 },
  { slug:"headlamp-bright", name:"High-Output Headlamp", category:"electronics", subcategory:"headlamp", weight_g:145, price_cad:100 },
  { slug:"bank-10000", name:"10,000 mAh Power Bank", category:"electronics", subcategory:"power-bank", weight_g:220, price_cad:48, specs:[{key:"Battery capacity",value:"10000",unit:"mAh"}] },
  { slug:"bank-20000", name:"20,000 mAh Power Bank", category:"electronics", subcategory:"power-bank", weight_g:370, price_cad:82, specs:[{key:"Battery capacity",value:"20000",unit:"mAh"}] },
  { slug:"gps-handheld", name:"Handheld Navigation Device", category:"electronics", subcategory:"navigation", weight_g:235, price_cad:345 },
  { slug:"locator-satellite", name:"Satellite Messenger Example", category:"electronics", subcategory:"navigation", weight_g:115, price_cad:395, note:"No real subscription, SOS capability, or service guarantee is represented." },
  { slug:"charger-solar", name:"Foldable Solar Charger", category:"electronics", subcategory:"charging", weight_g:485, price_cad:115 },
  { slug:"cable-light", name:"Short Charging Cable", category:"electronics", subcategory:"charging", weight_g:26, price_cad:12 },

  // MISC — mix essentials, optional gear and very light items.
  { slug:"kit-first-aid", name:"Compact First-Aid Kit", category:"misc", subcategory:"first-aid", weight_g:210, price_cad:38 },
  { slug:"kit-repair", name:"Field Repair Kit", category:"misc", subcategory:"repair-kit", weight_g:115, price_cad:32 },
  { slug:"poles-aluminum", name:"Aluminum Trekking Poles (Pair)", category:"misc", subcategory:"trekking-poles", weight_g:530, price_cad:85 },
  { slug:"poles-carbon", name:"Carbon Trekking Poles (Pair)", category:"misc", subcategory:"trekking-poles", weight_g:355, price_cad:185 },
  { slug:"trowel", name:"Camp Trowel", category:"misc", subcategory:"camp-accessories", weight_g:58, price_cad:23 },
  { slug:"pack-liner", name:"Waterproof Pack Liner", category:"misc", subcategory:"camp-accessories", weight_g:95, price_cad:24, waterproof:true },
  { slug:"dry-bag", name:"Roll-Top Dry Bag", category:"misc", subcategory:"camp-accessories", weight_g:125, price_cad:34, waterproof:true, capacity_l:8 },
  { slug:"food-bag", name:"Hanging Food Bag", category:"misc", subcategory:"camp-accessories", weight_g:170, price_cad:42, capacity_l:12 },
];

const demoBrandName = "TrailPicker Sample Gear";
const demoId = (slug: string) => `tp-demo-v03-${slug}`;
const descriptionFor = (gear: DemoGear) =>
  `FICTIONAL SAMPLE PRODUCT — for TrailPicker development/testing only. ` +
  `Weights, prices, specifications, and ratings are illustrative and must not be treated as verified product claims.` +
  (gear.note ? ` Test scenario: ${gear.note}` : "");

async function main() {
  // Validate demo definitions before touching the database.
  const categoryMap = new Map(categories.map(c => [c.slug, c]));
  const seen = new Set<string>();
  for (const gear of demoGear) {
    const validCategory = categoryMap.get(gear.category);
    if (!validCategory || !validCategory.subs.some(([slug]) => slug === gear.subcategory)) {
      throw new Error(`Invalid sample category: ${gear.slug}`);
    }
    if (!/^[a-z0-9-]+$/.test(gear.slug) || seen.has(gear.slug)) {
      throw new Error(`Duplicate/invalid demo slug: ${gear.slug}`);
    }
    seen.add(gear.slug);
    for (const n of [gear.weight_g, gear.price_cad, gear.capacity_l]) {
      if (n != null && (!Number.isFinite(n) || n < 0)) throw new Error(`Invalid sample number: ${gear.slug}`);
    }
    if (gear.weight_g != null && !Number.isInteger(gear.weight_g)) throw new Error(`Weight must be an integer: ${gear.slug}`);
    if (gear.category === "shelter" && gear.capacity_l != null) {
      throw new Error(`Shelter occupancy is NOT a volume in liters: ${gear.slug}`);
    }
  }

  // Categories and subcategories follow the slugs currently used by TrailPicker's UI.
  const categoryIds = new Map<CategorySlug, string>();
  const subcategoryIds = new Map<string, string>();
  for (const category of categories) {
    const row = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name },
      create: { slug: category.slug, name: category.name },
    });
    categoryIds.set(category.slug, row.id);
    for (const [slug, name] of category.subs) {
      const sub = await prisma.subcategory.upsert({
        where: { categoryId_slug: { categoryId: row.id, slug } },
        update: { name },
        create: { categoryId: row.id, slug, name },
      });
      subcategoryIds.set(`${category.slug}/${slug}`, sub.id);
    }
  }

  // Keep all four pre-existing example products, without changing existing rows.
  // Their original data is preserved exactly from your v0.3 seed snapshot.
  const oldBrands = [
    { name: "Durston", website: "https://durstongear.com" },
    { name: "Big Agnes", website: "https://www.bigagnes.com" },
    { name: "Hyperlite Mountain Gear", website: "https://www.hyperlitemountaingear.com" },
    { name: "Therm-a-Rest", website: undefined },
  ];
  const brandIds = new Map<string, string>();
  for (const brand of oldBrands) {
    const row = await prisma.brand.findFirst({ where: { name: brand.name }, orderBy: { createdAt: "asc" } })
      ?? await prisma.brand.create({ data: brand });
    brandIds.set(brand.name, row.id);
  }
  const originals = [
    { name:"Durston X-Mid 1", brand:"Durston", category:"shelter", subcategory:"tent", weight_g:795, price_cad:320, capacity_l:1, season:"3-season", description:"Ultralight trekking pole supported backpacking tent.", image:"https://durstongear.com/cdn/shop/files/Durston-X-Mid-1-2025-Ultralight-Backpacking-Tent-Main-Viewb_07dd109f-fff5-4c33-9a7d-b161ac0bbf19.jpg?v=1741358977&width=800" },
    { name:"Big Agnes Copper Spur HV UL2", brand:"Big Agnes", category:"shelter", subcategory:"tent", weight_g:1474, price_cad:700, capacity_l:2, season:"3-season", description:"Lightweight freestanding two-person tent.", image:"https://gearinstitute.com/wp-content/uploads/Copper_Spur_HV_UL_2_TentWithFly_HalfOpen-0-800x457.jpg" },
    { name:"Hyperlite Mountain Gear Southwest 40", brand:"Hyperlite Mountain Gear", category:"packs", subcategory:"frameless", weight_g:907, price_cad:500, capacity_l:40, season:null, description:"Ultralight backpacking pack.", image:"https://hyperlitemountaingear.com/cdn/shop/files/hyperlite-mountain-gear-packs-southwest-40l-extra-sm-white-1190868899.jpg?v=1759479162&width=832" },
    { name:"Therm-a-Rest NeoAir XLite NXT", brand:"Therm-a-Rest", category:"sleep", subcategory:"sleeping-pad", weight_g:370, price_cad:null, capacity_l:null, season:null, description:"Ultralight backpacking sleeping pad.", image:"https://cascadedesigns.com/cdn/shop/files/11627_thermarest_neoair_xlite_nxt_solarflare_regular_angle.jpg?v=1724820257&width=493" },
  ] as const;

  let keptOriginals = 0;
  for (const gear of originals) {
    const existing = await prisma.gear.findFirst({ where: { name: gear.name, brand: { name: gear.brand } } });
    if (existing) { keptOriginals++; continue; }
    await prisma.gear.create({
      data: {
        name: gear.name,
        description: gear.description,
        weight_g: gear.weight_g,
        price_cad: gear.price_cad,
        capacity_l: gear.capacity_l,
        season: gear.season,
        brandId: brandIds.get(gear.brand)!,
        categoryId: categoryIds.get(gear.category)!,
        subcategoryId: subcategoryIds.get(`${gear.category}/${gear.subcategory}`)!,
        images: { create: [{ url: gear.image, isPrimary: true }] },
      },
    });
  }
  console.log(`Original catalog examples: ${originals.length} (${keptOriginals} already existed)`);

  const includeDemo = process.env.TRAILPICKER_SEED_DEMO === "1" ||
    (process.env.NODE_ENV !== "production" && process.env.TRAILPICKER_SEED_DEMO !== "0");
  if (!includeDemo) {
    console.log("Fictional gear skipped. Set TRAILPICKER_SEED_DEMO=1 to seed test gear deliberately.");
    return;
  }

  // Stable IDs make reruns safe. Only demo-owned product rows/specifications are updated.
  const sampleBrand = await prisma.brand.findFirst({ where: { name: demoBrandName }, orderBy: { createdAt: "asc" } })
    ?? await prisma.brand.create({ data: { name: demoBrandName } });
  for (const gear of demoGear) {
    const specRows = gear.specs ?? [];
    const record = {
      name: `TP Demo — ${gear.name}`,
      description: descriptionFor(gear),
      weight_g: gear.weight_g,
      price_cad: gear.price_cad,
      capacity_l: gear.capacity_l ?? null,
      frame_type: gear.frame_type ?? null,
      waterproof: gear.waterproof ?? null,
      temperature_rating: gear.temperature_rating ?? null,
      season: gear.season ?? null,
      material: gear.material ?? null,
      brandId: sampleBrand.id,
      categoryId: categoryIds.get(gear.category)!,
      subcategoryId: subcategoryIds.get(`${gear.category}/${gear.subcategory}`)!,
    };
    await prisma.gear.upsert({
      where: { id: demoId(gear.slug) },
      create: {
        id: demoId(gear.slug),
        ...record,
        specifications: { create: specRows },
      },
      update: {
        ...record,
        specifications: { deleteMany: {}, create: specRows },
      },
    });
  }

  const counts = categories.map(cat => `${cat.name}: ${demoGear.filter(g => g.category === cat.slug).length}`).join(" | ");
  console.log(`TrailPicker v0.3 demo gear ready: ${demoGear.length} fictional products + ${originals.length} existing examples`);
  console.log(counts);
  console.log("No affiliate prices/URLs, user data, reviews, or builds were created.");
}

main().catch((error) => {
  console.error("TrailPicker seed failed:", error);
  process.exitCode = 1;
}).finally(async () => {
  await prisma.$disconnect();
});
