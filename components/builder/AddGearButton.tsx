"use client";

import { addGear } from "@/app/build/actions";


export default function AddGearButton({
    buildId,
    gearId,
}: {
    buildId:string;
    gearId:string;
}) {

    return (
        <form
            action={addGear}
        >

            <input
                type="hidden"
                name="buildId"
                value={buildId}
            />

            <input
                type="hidden"
                name="gearId"
                value={gearId}
            />


            <button
                className="
                rounded-lg
                bg-green-700
                px-3
                py-1
                text-white
                hover:bg-green-800
                cursor-pointer
                transition
                "
            >
                Add
            </button>

        </form>
    );
}