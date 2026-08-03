"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
    User,
    Backpack,
    Settings,
    LogOut,
    ChevronDown
} from "lucide-react";

type Props = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
};

export default function ProfileDropdown({
    name,
    email,
    image,
}: Props) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative">

            <button
                onClick={() => setOpen(!open)}
                className="
        flex items-center gap-3
        rounded-full
        border border-green-700
        bg-green-900
        px-3 py-1.5

        cursor-pointer
        transition-colors
        duration-200

        hover:bg-green-800
    "
            >


                {image ? (
                    <img
                        src={image}
                        alt=""
                        className="
                            h-9 w-9
                            rounded-full
                            object-cover
                            ring-2 ring-green-500/40
                        "
                    />
                ) : (
                    <div className="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-full
                        bg-green-600
                        font-bold
                    ">
                        {name?.charAt(0) ?? "U"}
                    </div>
                )}

                <div className="hidden text-left sm:block">
                    <p className="text-sm font-semibold text-white leading-none">
                        {name ?? "Explorer"}
                    </p>

                </div>

                <ChevronDown
                    className={`
                        h-4 w-4 text-green-200
                        transition-transform
                        ${open ? "rotate-180" : ""}
                    `}
                />

            </button>


            {open && (
                <div
                    className="
                        absolute right-0 mt-3
                        w-72
                        overflow-hidden
                        rounded-2xl
                        border border-green-200/20
                        bg-white
                        shadow-2xl
                        animate-in fade-in zoom-in-95
                    "
                >

                    {/* Profile header */}
                    <div className="
                        bg-gradient-to-br
                        from-green-900
                        to-green-700
                        px-5 py-4
                        text-white
                    ">
                        <p className="text-sm text-green-200">
                            Signed in as
                        </p>

                        <p className="mt-1 font-semibold truncate">
                            {email}
                        </p>
                    </div>


                    {/* Links */}
                    <div className="p-2">

                        <Link
                            href="/profile"
                            className="
                                flex items-center gap-3
                                rounded-xl
                                px-4 py-3
                                text-sm
                                text-gray-800
                                hover:bg-green-50
                                transition
                            "
                            onClick={() => setOpen(false)}
                        >
                            <User className="h-5 w-5 text-green-700" />
                            Profile
                        </Link>


                        <Link
                            href="/build"
                            className="
                                flex items-center gap-3
                                rounded-xl
                                px-4 py-3
                                text-sm
                                text-gray-800
                                hover:bg-green-50
                                transition
                            "
                            onClick={() => setOpen(false)}
                        >
                            <Backpack className="h-5 w-5 text-green-700" />
                            My Builds
                        </Link>


                        <Link
                            href="/settings"
                            className="
                                flex items-center gap-3
                                rounded-xl
                                px-4 py-3
                                text-sm
                                text-gray-800
                                hover:bg-green-50
                                transition
                            "
                            onClick={() => setOpen(false)}
                        >
                            <Settings className="h-5 w-5 text-green-700" />
                            Settings
                        </Link>

                    </div>


                    <div className="border-t p-2">

                        <button
                            onClick={() => signOut()}
                            className="
                                flex w-full items-center gap-3
                                rounded-xl
                                px-4 py-3
                                text-sm
                                text-red-600
                                hover:bg-red-50
                                transition
                            "
                        >
                            <LogOut className="h-5 w-5" />
                            Sign Out
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}