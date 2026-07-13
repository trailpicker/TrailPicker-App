import { PrismaClient } from "../app/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {

  // Brands
  const durston = await prisma.brand.create({
    data: {
      name: "Durston",
      website: "https://durstongear.com"
    }
  });

  const bigAgnes = await prisma.brand.create({
    data: {
      name: "Big Agnes",
      website: "https://www.bigagnes.com"
    }
  });

  const hmg = await prisma.brand.create({
    data: {
      name: "Hyperlite Mountain Gear",
      website: "https://www.hyperlitemountaingear.com"
    }
  });

  const thermarest = await prisma.brand.create({
    data: {
      name: "Therm-a-Rest"
    }
  });


  // Categories
  const shelter = await prisma.category.create({
    data: {
      name: "Shelter",
      slug: "shelter"
    }
  });

  const packs = await prisma.category.create({
    data: {
      name: "Packs",
      slug: "packs"
    }
  });

  const sleep = await prisma.category.create({
    data: {
      name: "Sleep",
      slug: "sleep"
    }
  });


  // Gear
  await prisma.gear.create({
    data: {
      name: "Durston X-Mid 1",
      description: "Ultralight trekking pole supported backpacking tent.",
      weight_g: 795,
      price_cad: 320,
      capacity_l: 1,
      season: "3-season",

      brandId: durston.id,
      categoryId: shelter.id
    }
  });


  await prisma.gear.create({
    data: {
      name: "Big Agnes Copper Spur HV UL2",
      description: "Lightweight freestanding two-person tent.",
      weight_g: 1474,
      price_cad: 700,
      capacity_l: 2,
      season: "3-season",

      brandId: bigAgnes.id,
      categoryId: shelter.id
    }
  });


  await prisma.gear.create({
    data: {
      name: "Hyperlite Mountain Gear Southwest 40",
      description: "Ultralight backpacking pack.",
      weight_g: 907,
      price_cad: 500,
      capacity_l: 40,

      brandId: hmg.id,
      categoryId: packs.id
    }
  });


  await prisma.gear.create({
    data: {
      name: "Therm-a-Rest NeoAir XLite NXT",
      description: "Ultralight backpacking sleeping pad.",
      weight_g: 370,

      brandId: thermarest.id,
      categoryId: sleep.id
    }
  });


}


main()
  .then(() => {
    console.log("Seed complete");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });