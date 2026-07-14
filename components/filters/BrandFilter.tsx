"use client";

import {
    useRouter,
    useSearchParams,
} from "next/navigation";

type Props = {
    brands: {
        id: string;
        name: string;
    }[];
};

export default function BrandFilter({ brands }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selected =
        searchParams.get("brand")?.split(",") ?? [];
    const allSelected =
        selected.length === 0;

    function toggleBrand(brand: string) {
        const params =
            new URLSearchParams(searchParams);

        let updated =
            [...selected];

        if (updated.includes(brand)) {
            updated = updated.filter(
                (item) => item !== brand
            );
        } else {
            updated.push(brand);
        }

        if (updated.length === 0) {
            params.delete("brand");
        } else {
            params.set(
                "brand",
                updated.join(",")
            );
        }

        router.push(
            `?${params.toString()}`
        );
    }

    function selectAll() {
        const params =
            new URLSearchParams(searchParams);
        params.delete("brand");

        router.push(
            `?${params.toString()}`
        );
    }

    return (
        <div>
            <div className="space-">
                <label className="flex items-center gap-2 rounded-lg px-3 py-1 hover:bg-gray-100 cursor-pointer transition text-[14px]">

                    <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={selectAll}
                        className="h-4 w-4 rounded"
                    />

                    <span className="font-medium">
                        All
                    </span>
                </label>

                {brands.map((brand) => (
                    <label
                        key={brand.id}
                        className="flex items-center gap-2 rounded-lg px-3 py-1 hover:bg-gray-100 cursor-pointer transition text-[15px]"
                    >
                        <input
                            type="checkbox"
                            checked={selected.includes(brand.name)}
                            onChange={() => toggleBrand(brand.name)}
                            className="h-4 w-4 rounded"
                        />

                        <span>
                            {brand.name}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}