"use client";

import { useState } from "react";
import { addCustomItem } from "@/app/build/actions";

type Props = {
    buildId: string;
    category: string;
};

export default function AddCustomItemForm({
    buildId,
    category,
}: Props) {
    const [open, setOpen] = useState(false);

    if (!open) {
        return (
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-block text-sm text-gray-500 cursor-pointer hover:text-gray-700 hover:underline"
            >
                + Add custom item
            </button>
        );
    }

    return (
        <form
            action={addCustomItem}
            className="mt-2 flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3"
        >
            <input type="hidden" name="buildId" value={buildId} />
            <input type="hidden" name="category" value={category} />

            <input
                name="name"
                placeholder="Item name"
                required
                className="flex-1 min-w-[140px] rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                name="weight_g"
                type="number"
                placeholder="Weight (g)"
                className="w-24 rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                name="price_cad"
                type="number"
                step="0.01"
                placeholder="Price ($)"
                className="w-24 rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-2">
                <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white cursor-pointer hover:bg-blue-700 transition"
                >
                    Add
                </button>

                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-1 text-sm text-gray-500 cursor-pointer hover:text-gray-700"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}