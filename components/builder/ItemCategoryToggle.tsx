"use client";

import { useOptimistic, useTransition } from "react";
import { setItemCategory } from "@/app/build/actions";

type Category = "base" | "worn" | "consumable";

type Props = {
    itemId: string;
    buildId: string;
    isConsumable: boolean;
    isWorn: boolean;
};

export default function ItemCategoryToggle({
    itemId,
    buildId,
    isConsumable,
    isWorn,
}: Props) {
    const [isPending, startTransition] = useTransition();

    const initial: Category = isWorn
        ? "worn"
        : isConsumable
            ? "consumable"
            : "base";

    const [optimisticCategory, setOptimisticCategory] = useOptimistic(
        initial,
        (_state: Category, next: Category) => next
    );

    function select(category: Category) {
        const next = optimisticCategory === category ? "base" : category;

        startTransition(async () => {
            setOptimisticCategory(next);

            const formData = new FormData();
            formData.append("itemId", itemId);
            formData.append("buildId", buildId);
            formData.append("category", next);

            await setItemCategory(formData);
        });
    }

    return (
        <div
            className={`
                inline-flex items-center rounded-full border border-gray-200 bg-gray-50 p-0.5
                transition ${isPending ? "opacity-60" : ""}
            `}
        >
            <button
                type="button"
                onClick={() => select("worn")}
                className={`
                    rounded-full px-2 py-0.5 text-[10px] font-semibold
                    cursor-pointer transition whitespace-nowrap
                    ${optimisticCategory === "worn"
                        ? "bg-amber-400 text-amber-950"
                        : "text-gray-400 hover:text-gray-600"
                    }
                `}
            >
                Worn
            </button>

            <button
                type="button"
                onClick={() => select("consumable")}
                className={`
                    rounded-full px-2 py-0.5 text-[10px] font-semibold
                    cursor-pointer transition whitespace-nowrap
                    ${optimisticCategory === "consumable"
                        ? "bg-emerald-400 text-emerald-950"
                        : "text-gray-400 hover:text-gray-600"
                    }
                `}
            >
                Consumable
            </button>
        </div>
    );
}