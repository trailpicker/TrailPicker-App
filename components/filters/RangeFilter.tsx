"use client";

import { useState } from "react";
import {
    useRouter,
    useSearchParams,
} from "next/navigation";


type Props = {
    min: number;
    max: number;
    unit: string;
    param: string;
};


export default function RangeFilter({
    min,
    max,
    unit,
    param,
}: Props) {

    const router = useRouter();
    const searchParams = useSearchParams();


    const urlValue =
        Number(searchParams.get(param))
        || max;


    const [value, setValue] =
        useState(urlValue);


    function updateValue(newValue: number) {

        setValue(newValue);


        const params =
            new URLSearchParams(searchParams);


        if (newValue >= max) {

            params.delete(param);

        } else {

            params.set(
                param,
                newValue.toString()
            );

        }


        router.push(
            `?${params.toString()}`
        );
    }


    return (
        <div className="space-y-3">

            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) =>
                    updateValue(
                        Number(e.target.value)
                    )
                }
                className="range-slider"
                style={{
                    ["--progress" as string]: `${((value - min) / (max - min)) * 100}%`,
                }}
            />


            <div className="flex items-center gap-2">

                <input
                    type="number"
                    value={value}
                    onChange={(e) =>
                        updateValue(
                            Number(e.target.value)
                        )
                    }
                    className="w-full rounded bg-gray-100 px-2 py-1 text-sm border-0"
                />


                <span className="text-sm text-gray-500">
                    {unit}
                </span>

            </div>

        </div>
    );
}