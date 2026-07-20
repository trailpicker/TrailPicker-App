"use client";

import {
    useRouter,
    useSearchParams,
} from "next/navigation";

type Props = {
    label: string;
    value: string;
};

export default function SortHeader({
    label,
    value,
}: Props) {

    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSort = searchParams.get("sort");

    const currentDirection =
        searchParams.get("direction");


    function sort() {
        const params =
            new URLSearchParams(searchParams);


        if (currentSort === value) {

            params.set(
                "direction",
                currentDirection === "asc"
                    ? "desc"
                    : "asc"
            );

        } else {

            params.set(
                "sort",
                value
            );

            params.set(
                "direction",
                "asc"
            );
        }


        router.push(
            `?${params.toString()}`
        );
    }


    return (
        <button
            onClick={sort}
            className="text-center hover:text-blue-600 cursor-pointer transition"
        >
            {label}

            {currentSort === value && (
                <span className="ml-1">
                    {currentDirection === "desc"
                        ? "↓"
                        : "↑"}
                </span>
            )}
        </button>
    );
}