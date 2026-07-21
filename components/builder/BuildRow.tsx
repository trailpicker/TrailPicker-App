import Link from "next/link";
import RemoveGearButton from "./RemoveGearButton";
import QuantityStepper from "./QuantityStepper";
import AddCustomItemForm from "./AddCustomItemForm";
import ItemFlagToggle from "./ItemCategoryToggle";
import Image from "next/image";

type Props = {
    name: string;
    gearLink: string;
    selectCategory: string;
    categoryName: string;
    buildId: string;

    items: {
        id: string;
        quantity: number;
        isConsumable: boolean;
        isWorn: boolean;
        gearNameSnapshot: string | null;
        weightSnapshot: number | null;
        priceSnapshot: number | null;
        gear: {
            id: string;
            name: string;
            weight_g: number | null;
            price_cad: number | null;

            images: {
                id: string;
                url: string;
                isPrimary: boolean;
            }[];
        } | null;
    }[];
};

export default function BuildRow({
    name,
    gearLink,
    selectCategory,
    categoryName,
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
            border-gray-400
            px-3
            py-4
            hover:bg-gray-50
            bg-gray-50
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

            <div className="col-span-4">
                {items.length === 0 ? (
                    <div className="space-y-2">
                        <Link
                            href={`/build/${buildId}/select/${selectCategory.toLowerCase()}`}
                            className="inline-block rounded-lg bg-blue-500 px-3 py-1.5 text-white text-sm hover:bg-blue-700 transition"
                        >
                            Add
                        </Link>

                        <div>
                            <AddCustomItemForm buildId={buildId} category={categoryName} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="divide-y divide-gray-100">
                            {items.map((item) => {
                                const itemName =
                                    item.gear?.name ?? item.gearNameSnapshot ?? "Custom item";
                                const weight =
                                    item.gear?.weight_g ?? item.weightSnapshot;
                                const price =
                                    item.gear?.price_cad ?? item.priceSnapshot;

                                return (
                                    <div
                                        key={item.id}
                                        className="grid grid-cols-[minmax(0,1fr)_100px_100px_100px] items-center py-4 first:pt-0 last:pb-0"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">

                                            {item.gear?.images[0] && (
                                                <div className="
                                                    relative
                                                    w-12
                                                    aspect-square
                                                    rounded-lg
                                                    overflow-hidden
                                                    bg-white
                                                    border
                                                    border-gray-200
                                                    shrink-0
                                                ">
                                                    <Image
                                                        src={item.gear.images[0].url}
                                                        alt={itemName}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            )}

                                            <div className="flex flex-wrap items-center gap-2 min-w-0">
                                                {item.gear ? (
                                                    <Link
                                                        href={`/gear/${item.gear.id}`}
                                                        className="block font-bold truncate hover:underline hover:text-blue-600"
                                                    >
                                                        {itemName}
                                                    </Link>
                                                ) : (
                                                    <span className="block font-bold italic text-gray-700 truncate">
                                                        {itemName}
                                                    </span>
                                                )}

                                                <QuantityStepper
                                                    itemId={item.id}
                                                    buildId={buildId}
                                                    quantity={item.quantity}
                                                />

                                                <ItemFlagToggle
                                                    itemId={item.id}
                                                    buildId={buildId}
                                                    isConsumable={item.isConsumable}
                                                    isWorn={item.isWorn}
                                                />

                                            </div>
                                        </div>

                                        <div className="text-center pr-5">
                                            {weight != null ? `${weight * item.quantity}g` : "—"}
                                        </div>

                                        <div className="text-center pr-5">
                                            {price != null
                                                ? `$${(price * item.quantity).toFixed(2)}`
                                                : "—"}
                                        </div>

                                        <div className="flex items-center justify-end gap-1">
                                            {item.gear && (
                                                <Link
                                                    href="#"
                                                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 transition"
                                                >
                                                    Buy
                                                </Link>
                                            )}
                                            <RemoveGearButton itemId={item.id} buildId={buildId} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-2 flex items-center gap-4">
                            <Link
                                href={`/build/${buildId}/select/${selectCategory.toLowerCase()}`}
                                className="inline-block text-sm text-blue-600 hover:underline"
                            >
                                + Add Additional
                            </Link>

                            <AddCustomItemForm buildId={buildId} category={categoryName} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}