import { prisma } from "@/lib/prisma";
import SearchBar from "@/components/SearchBar";
import GearFilters from "@/components/GearFilters";
import GearSort from "@/components/GearSort";
import GearCard from "@/components/GearCard";


export default async function GearPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    maxWeight?: string;
    maxPrice?: string;
    season?: string;
    sort?: string;
  }>;
}) {

  const params = await searchParams;

  const query = params.q;


  let orderBy:
    | {
        weight_g?: "asc" | "desc";
        price_cad?: "asc" | "desc";
        createdAt?: "asc" | "desc";
      }
    | undefined = undefined;


  if (params.sort === "weight") {
    orderBy = {
      weight_g: "asc",
    };
  }


  if (params.sort === "price") {
    orderBy = {
      price_cad: "asc",
    };
  }


  if (params.sort === "newest") {
    orderBy = {
      createdAt: "desc",
    };
  }



  const gear = await prisma.gear.findMany({

    where: {
      AND: [

        query
          ? {
              OR: [
                {
                  name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  brand: {
                    name: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  category: {
                    name: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                },
              ],
            }
          : {},



        params.category
          ? {
              category: {
                name: params.category,
              },
            }
          : {},



        params.maxWeight
          ? {
              weight_g: {
                lte: Number(params.maxWeight),
              },
            }
          : {},



        params.maxPrice
          ? {
              price_cad: {
                lte: Number(params.maxPrice),
              },
            }
          : {},



        params.season
          ? {
              season: params.season,
            }
          : {},

      ],
    },


    orderBy,


    include: {
      brand: true,
      category: true,
    },

  });



  return (
    <main className="p-8">


      <h1 className="text-4xl font-bold mb-8">
        TrailPicker Gear
      </h1>



      <SearchBar />

      <GearFilters />

      <GearSort />



      <div className="grid gap-6 md:grid-cols-3">

        {gear.map((item) => (

          <GearCard
            key={item.id}
            gear={item}
          />

        ))}

      </div>



      {gear.length === 0 && (

        <p className="mt-8">
          No gear found.
        </p>

      )}


    </main>
  );
}