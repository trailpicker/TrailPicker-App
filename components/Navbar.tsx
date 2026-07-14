import Link from "next/link";
import { cookies } from "next/headers";

export default async function Navbar() {
    const cookieStore = await cookies();

    const buildId =
        cookieStore.get("currentBuild")?.value;
    return (
        <header className="sticky top-0 z-50 bg-green-900 text-white shadow-md">
            <div className="flex h-16 items-center justify-between px-10">

                <Link
                    href="/"
                    className="text-2xl font-bold text-white transition"
                >
                    🏕 TrailPicker
                </Link>

                <nav className="flex items-center gap-11 text-sm font-medium">
                    <Link
                        href={buildId ? `/build/${buildId}` : "/build"}
                        className="text-white text-lg font-semibold hover:text-gray-200 hover:underline transition"
                    >
                        Builder
                    </Link>

                    <Link
                        href="/gear"
                        className="text-white text-lg font-semibold hover:text-gray-200 hover:underline transition"
                    >
                        Gear
                    </Link>

                    <Link
                        href="/marketplace"
                        className="text-white text-lg font-semibold hover:text-gray-200 hover:underline transition"
                    >
                        Marketplace
                    </Link>

                    <Link
                        href="/community"
                        className="text-white text-lg font-semibold hover:text-gray-200 hover:underline transition"
                    >
                        Community
                    </Link>

                    <Link
                        href="/guide"
                        className="text-white text-lg font-semibold hover:text-gray-200 hover:underline transition"
                    >
                        Guides
                    </Link>
                </nav>

                <Link
                    href="/profile"
                    className="rounded-lg border border-green-200 px-4 py-2 text-sm font-medium hover:bg-green-800 transition"
                >
                    Sign In
                </Link>

            </div>
        </header>
    );
}