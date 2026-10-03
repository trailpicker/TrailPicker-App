import { findAccessibleBuild } from "@/lib/build-access";
// components/Navbar.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import { auth, signIn } from "@/auth";
import ProfileDropdown from "@/components/ProfileDropdown";
export default async function Navbar() {
    const cookieStore = await cookies();
    const currentId = cookieStore.get("currentBuild")?.value;
    const buildId = currentId ? (await findAccessibleBuild(currentId))?.id : undefined;
    const session = await auth();

    return (
        <header className="sticky top-0 z-50 bg-green-900 text-white shadow-md">
            <div className="flex h-16 items-center justify-between px-10">
                <Link href="/" className="text-2xl font-bold text-white">🏕 TrailPicker</Link>

                <nav className="flex items-center gap-11 text-sm font-medium">
                    <Link href={buildId ? `/build/${buildId}` : "/build"} className="text-white text-lg font-semibold hover:text-gray-200 hover:underline">Builder</Link>
                    <Link href="/gear" className="text-white text-lg font-semibold hover:text-gray-200 hover:underline">Gear</Link>
                    <Link href="/marketplace" className="text-white text-lg font-semibold hover:text-gray-200 hover:underline">Marketplace</Link>
                    <Link href="/community" className="text-white text-lg font-semibold hover:text-gray-200 hover:underline">Community</Link>
                    <Link href="/guide" className="text-white text-lg font-semibold hover:text-gray-200 hover:underline">Guides</Link>
                </nav>

                {session?.user ? (
                    <ProfileDropdown
                        name={session.user.name}
                        email={session.user.email}
                        image={session.user.image}
                    />
                ) : (
                    <form action={async () => {
                        "use server";
                        await signIn("google");
                    }}>
                        <button className="
            rounded-full
            bg-white
            px-5 py-2
            text-sm font-semibold
            text-green-950
            hover:bg-green-100
            cursor-pointer
            transition
        ">
                            Sign in
                        </button>
                    </form>
                )}
            </div>
        </header>
    );
}