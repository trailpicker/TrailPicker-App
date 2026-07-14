"use client";

import { useState } from "react";

type Props = {
    title: string;
    children: React.ReactNode;
};

export default function FilterSection({
    title,
    children,
}: Props) {
    const [open, setOpen] = useState(true);

    return (
        <div className="border-b last:border-0 pb-2 mb-2 border-gray-300">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between font-bold text-[15px] mb-1 cursor-pointer"
            >
                <span>
                    {title}
                </span>

                <span className="text-xl">
                    {open ? "−" : "+"}
                </span>
            </button>


            <div
                className={`
                    overflow-hidden
                    transition-all
                    duration-300
                    ease-in-out
                    ${open
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }
                `}
            >
                <div className="pb-2">
                    {children}
                </div>
            </div>

        </div>
    );
}