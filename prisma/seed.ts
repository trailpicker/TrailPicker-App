import "dotenv/config";

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});


async function main() {
  await prisma.$transaction(async (tx) => {

  // Brands

  const durston = (await tx.brand.findFirst({ where: { name: "Durston" }, orderBy: { createdAt: "asc" } })) ?? await tx.brand.create({
    data: {
      name: "Durston",
      website: "https://durstongear.com",
    },
  });


  const bigAgnes = (await tx.brand.findFirst({ where: { name: "Big Agnes" }, orderBy: { createdAt: "asc" } })) ?? await tx.brand.create({
    data: {
      name: "Big Agnes",
      website: "https://www.bigagnes.com",
    },
  });


  const hmg = (await tx.brand.findFirst({ where: { name: "Hyperlite Mountain Gear" }, orderBy: { createdAt: "asc" } })) ?? await tx.brand.create({
    data: {
      name: "Hyperlite Mountain Gear",
      website: "https://www.hyperlitemountaingear.com",
    },
  });


  const thermarest = (await tx.brand.findFirst({ where: { name: "Therm-a-Rest" }, orderBy: { createdAt: "asc" } })) ?? await tx.brand.create({
    data: {
      name: "Therm-a-Rest",
    },
  });



  // Categories

  const packs = await tx.category.upsert({
    where: { slug: "packs" },
    update: {},
    create: {
      name: "Packs",
      slug: "packs",
    },
  });


  const shelter = await tx.category.upsert({
    where: { slug: "shelter" },
    update: {},
    create: {
      name: "Shelter",
      slug: "shelter",
    },
  });


  const sleep = await tx.category.upsert({
    where: { slug: "sleep" },
    update: {},
    create: {
      name: "Sleep",
      slug: "sleep",
    },
  });


  const cooking = await tx.category.upsert({
    where: { slug: "cooking" },
    update: {},
    create: {
      name: "Cooking",
      slug: "cooking",
    },
  });


  const water = await tx.category.upsert({
    where: { slug: "water" },
    update: {},
    create: {
      name: "Water",
      slug: "water",
    },
  });


  const clothing = await tx.category.upsert({
    where: { slug: "clothing" },
    update: {},
    create: {
      name: "Clothing",
      slug: "clothing",
    },
  });


  const electronics = await tx.category.upsert({
    where: { slug: "electronics" },
    update: {},
    create: {
      name: "Electronics",
      slug: "electronics",
    },
  });


  const misc = await tx.category.upsert({
    where: { slug: "misc" },
    update: {},
    create: {
      name: "Misc",
      slug: "misc",
    },
  });



  // Subcategories

  await tx.subcategory.upsert({
    where: { categoryId_slug: { categoryId: packs.id, slug: "internal-frame" } },
    update: {},
    create: {
      name: "Internal Frame",
      slug: "internal-frame",
      categoryId: packs.id,
    },
  });


  const frameless = await tx.subcategory.upsert({
    where: { categoryId_slug: { categoryId: packs.id, slug: "frameless" } },
    update: {},
    create: {
      name: "Frameless",
      slug: "frameless",
      categoryId: packs.id,
    },
  });


  const tent = await tx.subcategory.upsert({
    where: { categoryId_slug: { categoryId: shelter.id, slug: "tent" } },
    update: {},
    create: {
      name: "Tent",
      slug: "tent",
      categoryId: shelter.id,
    },
  });


  const sleepingPad = await tx.subcategory.upsert({
    where: { categoryId_slug: { categoryId: sleep.id, slug: "sleeping-pad" } },
    update: {},
    create: {
      name: "Sleeping Pad",
      slug: "sleeping-pad",
      categoryId: sleep.id,
    },
  });



  // Remaining subcategories

  await tx.subcategory.createMany({
    skipDuplicates: true,
    data: [

      {
        name: "Hammock",
        slug: "hammock",
        categoryId: shelter.id,
      },
      {
        name: "Tarp",
        slug: "tarp",
        categoryId: shelter.id,
      },
      {
        name: "Bivy",
        slug: "bivy",
        categoryId: shelter.id,
      },


      {
        name: "Sleeping Bag",
        slug: "sleeping-bag",
        categoryId: sleep.id,
      },
      {
        name: "Quilt",
        slug: "quilt",
        categoryId: sleep.id,
      },


      {
        name: "Stove",
        slug: "stove",
        categoryId: cooking.id,
      },
      {
        name: "Cookware",
        slug: "cookware",
        categoryId: cooking.id,
      },


      {
        name: "Filter",
        slug: "filter",
        categoryId: water.id,
      },
      {
        name: "Bottle",
        slug: "bottle",
        categoryId: water.id,
      },


      {
        name: "Rain Gear",
        slug: "rain-gear",
        categoryId: clothing.id,
      },
      {
        name: "Insulation",
        slug: "insulation",
        categoryId: clothing.id,
      },


      {
        name: "Headlamp",
        slug: "headlamp",
        categoryId: electronics.id,
      },
      {
        name: "Power Bank",
        slug: "power-bank",
        categoryId: electronics.id,
      },


      {
        name: "First Aid",
        slug: "first-aid",
        categoryId: misc.id,
      },
      {
        name: "Repair Kit",
        slug: "repair-kit",
        categoryId: misc.id,
      },

    ],
  });



  // Gear


  if (!(await tx.gear.findFirst({ where: { name: "Durston X-Mid 1", brand: { name: "Durston" } } }))) {
  await tx.gear.create({
    data: {
      name: "Durston X-Mid 1",
      description:
        "Ultralight trekking pole supported backpacking tent.",
      weight_g: 795,
      price_cad: 320,
      capacity_l: 1,
      season: "3-season",

      brandId: durston.id,
      categoryId: shelter.id,
      subcategoryId: tent.id,

      images: {
        create: [
          {
            url: "https://durstongear.com/cdn/shop/files/Durston-X-Mid-1-2025-Ultralight-Backpacking-Tent-Main-Viewb_07dd109f-fff5-4c33-9a7d-b161ac0bbf19.jpg?v=1741358977&width=800",
            isPrimary: true,
          }
        ],
      },
    },
  });
  }



  if (!(await tx.gear.findFirst({ where: { name: "Big Agnes Copper Spur HV UL2", brand: { name: "Big Agnes" } } }))) {
  await tx.gear.create({
    data: {
      name: "Big Agnes Copper Spur HV UL2",
      description:
        "Lightweight freestanding two-person tent.",
      weight_g: 1474,
      price_cad: 700,
      capacity_l: 2,
      season: "3-season",

      brandId: bigAgnes.id,
      categoryId: shelter.id,
      subcategoryId: tent.id,

      images: {
        create: [
          {
            url: "https://gearinstitute.com/wp-content/uploads/Copper_Spur_HV_UL_2_TentWithFly_HalfOpen-0-800x457.jpg",
            isPrimary: true,
          }
        ],
      },
    },
  });
  }



  if (!(await tx.gear.findFirst({ where: { name: "Hyperlite Mountain Gear Southwest 40", brand: { name: "Hyperlite Mountain Gear" } } }))) {
  await tx.gear.create({
    data: {
      name: "Hyperlite Mountain Gear Southwest 40",
      description:
        "Ultralight backpacking pack.",
      weight_g: 907,
      price_cad: 500,
      capacity_l: 40,

      brandId: hmg.id,
      categoryId: packs.id,
      subcategoryId: frameless.id,

      images: {
        create: [
          {
            url: "https://hyperlitemountaingear.com/cdn/shop/files/hyperlite-mountain-gear-packs-southwest-40l-extra-sm-white-1190868899.jpg?v=1759479162&width=832",
            isPrimary: true,
          }
        ],
      },
    },
  });
  }



  if (!(await tx.gear.findFirst({ where: { name: "Therm-a-Rest NeoAir XLite NXT", brand: { name: "Therm-a-Rest" } } }))) {
  await tx.gear.create({
    data: {
      name: "Therm-a-Rest NeoAir XLite NXT",
      description:
        "Ultralight backpacking sleeping pad.",
      weight_g: 370,

      brandId: thermarest.id,
      categoryId: sleep.id,
      subcategoryId: sleepingPad.id,

      images: {
        create: [
          {
            url: "https://cascadedesigns.com/cdn/shop/files/11627_thermarest_neoair_xlite_nxt_solarflare_regular_angle.jpg?v=1724820257&width=493",
            isPrimary: true,
          }
        ],
      },
    },
  });
  }

  }, { maxWait: 10000, timeout: 30000 });
}


main()
  .then(() => {
    console.log("Seed complete");
  })
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });