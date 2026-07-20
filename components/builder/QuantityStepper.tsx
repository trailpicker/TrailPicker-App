"use client";

import { useOptimistic, useTransition } from "react";
import { updateQuantity } from "@/app/build/actions";

type Props = {
    itemId: string;
    buildId: string;
    quantity: number;
};

export default function QuantityStepper({
    itemId,
    buildId,
    quantity,
}: Props) {
    const [isPending, startTransition] = useTransition();

    const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
        quantity,
        (_state: number, newValue: number) => newValue
    );

    function change(delta: number) {
        const next = Math.max(1, optimisticQuantity + delta);

        startTransition(async () => {
            setOptimisticQuantity(next);

            const formData = new FormData();
            formData.append("itemId", itemId);
            formData.append("buildId", buildId);
            formData.append("delta", delta.toString());

            await updateQuantity(formData);
        });
    }

    return (
        <div
            className={`
            flex items-center rounded-full border border-gray-300 bg-white shrink-0
            transition
            ${isPending ? "opacity-60" : ""}
            `}
        >
            <button
                type="button"
                onClick={() => change(-1)}
                disabled={optimisticQuantity <= 1}
                aria-label="Decrease quantity"
                className="
                w-6 h-6
                flex items-center justify-center
                text-gray-500
                hover:text-red-600
                disabled:opacity-30
                disabled:hover:text-gray-500
                transition
                cursor-pointer
                "
            >
                −
            </button>

            <span className="w-6 text-center text-xs font-semibold text-gray-700 select-none">
                {optimisticQuantity}
            </span>

            <button
                type="button"
                onClick={() => change(1)}
                aria-label="Increase quantity"
                className="
                w-6 h-6
                flex items-center justify-center
                text-gray-500
                hover:text-green-700
                transition
                cursor-pointer
                "
            >
                +
            </button>
        </div>
    );
}