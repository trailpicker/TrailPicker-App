import Link from "next/link";
import RemoveGearButton from "./RemoveGearButton";

type Props = {
    name: string;
    gearLink: string;
    selectCategory: string;
    buildId: string;

    item?: {
        id: string;
        gear: {
            id: string;
            name: string;
            weight_g: number | null;
            price_cad: number | null;
        };
    };
};

export default function BuildRow({
    name,
    gearLink,
    selectCategory,
    buildId,
    item,
}: Props) {

    return (
        <div
            className="
            grid
grid-cols-[180px_minmax(0,1fr)_100px_100px_100px]
            items-center
            border-t
            p-4
            hover:bg-gray-50
            transition
            "
        >

            {/* Component */}
            <Link
                href={gearLink}
                className="font-semibold text-blue-500 underline text-sm hover:text-blue-700 transition"
            >
                {name}
            </Link>


            {/* Selection */}
            <div>
                {item?.gear ? (
                    <Link
                        href={`/gear/${item.gear.id}`}
                        className="font-bold truncate block hover:underline hover:text-blue-600"
                    >
                        {item.gear.name}
                    </Link>
                ) : (
                    <Link
                        href={`/build/${buildId}/select/${selectCategory}`}
                        className="
    rounded-lg
    bg-blue-500
    px-4
    py-2
    text-white
    hover:bg-blue-700
    transition
    "
                    >
                        Add
                    </Link>
                )}
            </div>


            <div className="text-center whitespace-nowrap">
                {item?.gear.weight_g !== null && item?.gear.weight_g !== undefined
                    ? `${item.gear.weight_g}g`
                    : "—"}
            </div>

            <div className="text-center whitespace-nowrap">
                {item?.gear.price_cad !== null && item?.gear.price_cad !== undefined
                    ? `$${item.gear.price_cad}`
                    : "—"}
            </div>


            {/* Action */}
            <div className="flex justify-end items-center gap-3">

                {item?.gear && (
                    <>
                        <Link
                            href="#"
                            className="
                rounded-lg
                bg-blue-600
                px-4
                py-2
                text-white
                hover:bg-blue-700
                transition
                "
                        >
                            Buy
                        </Link>

                        <RemoveGearButton
                            itemId={item.id}
                            buildId={buildId}
                        />
                    </>
                )}

            </div>
        </div>

    );
}