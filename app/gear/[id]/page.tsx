import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";


export default async function GearDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;


  const gear = await prisma.gear.findUnique({
    where: {
      id,
    },
    include: {
      brand: true,
      category: true,
      prices: {
        include: {
          retailer: true,
        },
      },
      reviews: true,
      specifications: true,
    },
  });


  if (!gear) {
    notFound();
  }


  return (
    <main className="p-8 max-w-4xl mx-auto">

      <h1 className="text-4xl font-bold">
        {gear.name}
      </h1>


      <p className="text-lg mt-2">
        {gear.brand.name}
      </p>


      <div className="mt-8 space-y-3 border rounded-xl p-6">

        <p>
          Category:
          {" "}
          {gear.category.name}
        </p>


        <p>
          Weight:
          {" "}
          {gear.weight_g ?? "Unknown"}g
        </p>


        <p>
          Price:
          {" "}
          {gear.price_cad
            ? `$${gear.price_cad} CAD`
            : "Unknown"}
        </p>


        <p>
          Capacity:
          {" "}
          {gear.capacity_l
            ? `${gear.capacity_l}L`
            : "Unknown"}
        </p>


        <p>
          Season:
          {" "}
          {gear.season ?? "Unknown"}
        </p>

      </div>


      {gear.description && (
        <section className="mt-8">

          <h2 className="text-2xl font-bold">
            Description
          </h2>

          <p className="mt-2">
            {gear.description}
          </p>

        </section>
      )}


      {gear.prices.length > 0 && (
        <section className="mt-8">

          <h2 className="text-2xl font-bold">
            Retailers
          </h2>


          {gear.prices.map((price)=>(
            <div
              key={price.id}
              className="border rounded-lg p-4 mt-3"
            >

              <p>
                {price.retailer.name}
              </p>

              <p>
                ${price.price} {price.currency}
              </p>

            </div>
          ))}

        </section>
      )}

    </main>
  );
}