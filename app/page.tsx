import Link from "next/link";
import { prisma } from "@/lib/prisma";


export default async function Home() {

  const popularGear = await prisma.gear.findMany({
    take: 4,
    include: {
      brand: true,
      category: true,
    },
  });


  return (
    <main>

      {/* Hero */}

      <section className="px-8 py-20 text-center">

        <h1 className="text-5xl font-bold">
          Build Your Perfect Backpacking Kit
        </h1>


        <p className="mt-5 text-lg text-gray-600">
          Compare gear, calculate weight,
          and create your ultimate trail setup.
        </p>


        <Link
          href="/gear"
          className="inline-block mt-8 rounded-lg bg-black px-6 py-3 text-white"
        >
          Browse Gear
        </Link>

      </section>



      {/* Categories */}

      <section className="px-8 py-12">

        <h2 className="text-3xl font-bold mb-6">
          Browse Categories
        </h2>


        <div className="grid gap-4 md:grid-cols-4">

          {[
            "Packs",
            "Shelter",
            "Sleep",
            "Cooking",
          ].map((category)=>(
            <div
              key={category}
              className="border rounded-xl p-6 text-center"
            >
              {category}
            </div>
          ))}

        </div>

      </section>



      {/* Popular Gear */}

      <section className="px-8 py-12">

        <h2 className="text-3xl font-bold mb-6">
          Popular Gear
        </h2>


        <div className="grid gap-6 md:grid-cols-4">

          {popularGear.map((item)=>(
            <Link
              key={item.id}
              href={`/gear/${item.id}`}
              className="border rounded-xl p-5 hover:shadow-lg"
            >

              <h3 className="font-bold">
                {item.name}
              </h3>


              <p className="text-gray-600">
                {item.brand.name}
              </p>


              <p className="mt-3">
                {item.weight_g}g
              </p>


            </Link>
          ))}

        </div>

      </section>



    </main>
  );
}