import { findAccessibleBuild } from "@/lib/build-access";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { auth, signIn } from "@/auth";
import ProfileDropdown from "@/components/ProfileDropdown";
import NavbarNavigation from "@/components/NavbarNavigation";

export default async function Navbar() {
  const cookieStore = await cookies();
  const currentId = cookieStore.get("currentBuild")?.value;
  const [access, session, categories] = await Promise.all([
    currentId ? findAccessibleBuild(currentId) : Promise.resolve(null),
    auth(),
    prisma.category.findMany({
      orderBy: { createdAt: "asc" },
      select: { id: true, name: true, slug: true, subcategories: {
        orderBy: { name: "asc" }, select: { id: true, name: true, slug: true },
      } },
    }),
  ]);

  return <NavbarNavigation
    builderHref={access ? `/build/${access.id}` : "/build"}
    categories={categories}
    account={session?.user ? <ProfileDropdown name={session.user.name} email={session.user.email} image={session.user.image} /> : (
      <form action={async () => {
        "use server";
        await signIn("google");
      }}>
        <button className="whitespace-nowrap rounded-full bg-white px-3 py-2 text-sm font-semibold text-green-950 transition hover:bg-green-100 sm:px-5">Sign in</button>
      </form>
    )}
  />;
}
