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

  // Brands

  const durston = await prisma.brand.create({
    data: {
      name: "Durston",
      website: "https://durstongear.com",
    },
  });


  const bigAgnes = await prisma.brand.create({
    data: {
      name: "Big Agnes",
      website: "https://www.bigagnes.com",
    },
  });


  const hmg = await prisma.brand.create({
    data: {
      name: "Hyperlite Mountain Gear",
      website: "https://www.hyperlitemountaingear.com",
    },
  });


  const thermarest = await prisma.brand.create({
    data: {
      name: "Therm-a-Rest",
    },
  });



  // Categories

  const packs = await prisma.category.create({
    data: {
      name: "Packs",
      slug: "packs",
    },
  });


  const shelter = await prisma.category.create({
    data: {
      name: "Shelter",
      slug: "shelter",
    },
  });


  const sleep = await prisma.category.create({
    data: {
      name: "Sleep",
      slug: "sleep",
    },
  });


  const cooking = await prisma.category.create({
    data: {
      name: "Cooking",
      slug: "cooking",
    },
  });


  const water = await prisma.category.create({
    data: {
      name: "Water",
      slug: "water",
    },
  });


  const clothing = await prisma.category.create({
    data: {
      name: "Clothing",
      slug: "clothing",
    },
  });


  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
      slug: "electronics",
    },
  });


  const misc = await prisma.category.create({
    data: {
      name: "Misc",
      slug: "misc",
    },
  });



  // Subcategories

  const internalFrame = await prisma.subcategory.create({
    data: {
      name: "Internal Frame",
      slug: "internal-frame",
      categoryId: packs.id,
    },
  });


  const frameless = await prisma.subcategory.create({
    data: {
      name: "Frameless",
      slug: "frameless",
      categoryId: packs.id,
    },
  });


  const tent = await prisma.subcategory.create({
    data: {
      name: "Tent",
      slug: "tent",
      categoryId: shelter.id,
    },
  });


  const sleepingPad = await prisma.subcategory.create({
    data: {
      name: "Sleeping Pad",
      slug: "sleeping-pad",
      categoryId: sleep.id,
    },
  });



  // Remaining subcategories

  await prisma.subcategory.createMany({
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


  await prisma.gear.create({
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



  await prisma.gear.create({
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



  await prisma.gear.create({
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



  await prisma.gear.create({
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