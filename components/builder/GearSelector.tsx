"use client";

import { addGear } from "@/app/build/actions";

type Gear = {
  id: string;
  name: string;
  weight_g: number | null;
  price_cad: number | null;
  brand: {
    name: string;
  };
};

export default function GearSelector({
  category,
  gear,
  buildId,
}: {
  category: string;
  gear: Gear[];
  buildId: string;
}) {

  return (
    <div className="mt-4 border rounded-xl p-4 space-y-3">

      <h3 className="font-bold">
        Select {category}
      </h3>

      {gear.map((item) => (

        <form
          key={item.id}
          action={async () => {
            const formData = new FormData();

            formData.append(
              "buildId",
              buildId
            );

            formData.append(
              "gearId",
              item.id
            );

            await addGear(formData);
          }}
          className="border rounded-lg p-3"
        >

          <button className="text-left w-full">

            <p className="font-semibold">
              {item.name}
            </p>

            <p>
              {item.brand.name}
            </p>

            <p>
              {item.weight_g ?? "?"}g
            </p>

          </button>

        </form>

      ))}

    </div>
  );
}