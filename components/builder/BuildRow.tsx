import Link from "next/link";
import RemoveGearButton from "./RemoveGearButton";

type Props = {
    name: string;
    gearLink: string;
    selectCategory: string;
    buildId: string;

    items: {
        id: string;
        gear: {
            id: string;
            name: string;
            weight_g: number | null;
            price_cad: number | null;
        };
    }[];
};

export default function BuildRow({
    name,
    gearLink,
    selectCategory,
    buildId,
    items,
}: Props) {

    return (
        <div
            className="
            grid
grid-cols-[180px_minmax(0,1fr)_100px_100px_100px]
            items-start
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
            <div className="space-y-2">

                {items.length > 0 ? (
                    <>
                        {items.map((item) => (

                            <div
                                key={item.id}
                                className="flex items-center justify-between"
                            >

                                <Link
                                    href={`/gear/${item.gear.id}`}
                                    className="
                        font-bold
                        truncate
                        hover:underline
                        hover:text-blue-600
                        "
                                >
                                    {item.gear.name}
                                </Link>

                            </div>

                        ))}


                        <Link
                            href={`/build/${buildId}/select/${selectCategory.toLowerCase()}`}
                            className="
                inline-block
                text-sm
                text-blue-600
                hover:underline
                "
                        >
                            + Add Additional
                        </Link>
                    </>
                ) : (

                    <Link
                        href={`/build/${buildId}/select/${selectCategory.toLowerCase()}`}
                        className="
            inline-block
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


            <div className="text-center whitespace-nowrap pt-1">
                {items.length > 0
                    ? `${items.reduce(
                        (total, item) =>
                            total + (item.gear.weight_g ?? 0),
                        0
                    )}g`
                    : "—"}
            </div>


            <div className="text-center whitespace-nowrap pt-1">
                {items.length > 0
                    ? `$${items.reduce(
                        (total, item) =>
                            total + (item.gear.price_cad ?? 0),
                        0
                    )}`
                    : "—"}
            </div>


            {/* Action */}
            <div className="flex flex-col gap-2">

                {items.map((item) => (
                    <div
                        key={item.id}
                        className="
            flex
            items-center
            justify-end
            gap-3
            h-8
            "
                    >

                        <Link
                            href="#"
                            className="
                rounded-lg
                bg-blue-600
                px-3
                py-1
                text-sm
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

                    </div>
                ))}

            </div>
        </div>

    );
}