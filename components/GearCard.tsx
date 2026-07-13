import Link from "next/link";

type GearCardProps = {
  gear: {
    id: string;
    name: string;
    weight_g: number | null;
    price_cad: number | null;
    brand: {
      name: string;
    };
    category: {
      name: string;
    };
  };
};


export default function GearCard({ gear }: GearCardProps) {
  return (
    <div className="rounded-xl border p-6 hover:shadow-lg transition">

      <h2 className="text-xl font-bold">
        {gear.name}
      </h2>

      <p className="text-gray-500">
        {gear.brand.name}
      </p>


      <div className="mt-4 space-y-1">

        <p>
          Category: {gear.category.name}
        </p>

        <p>
          Weight: {gear.weight_g ?? "Unknown"}g
        </p>

        <p>
          Price:
          {gear.price_cad
            ? `$${gear.price_cad} CAD`
            : "Unknown"}
        </p>

      </div>


      <Link
        href={`/gear/${gear.id}`}
        className="inline-block mt-5 underline"
      >
        View Details
      </Link>

    </div>
  );
}