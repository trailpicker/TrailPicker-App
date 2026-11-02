import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Backpack, Heart, LayoutDashboard, Settings, Star, UserRound } from "lucide-react";

const links = [
  { href: "/profile", label: "Overview", icon: LayoutDashboard },
  { href: "/profile/builds", label: "My Builds", icon: Backpack },
  { href: "/profile/gear", label: "My Gear", icon: UserRound },
  { href: "/profile/favorites", label: "Favorites", icon: Heart },
  { href: "/profile/reviews", label: "Reviews", icon: Star, disabled: true },
];

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin?callbackUrl=/profile");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      username: true,
      image: true,
      location: true,
      createdAt: true,
      _count: { select: { builds: true, ownedGear: true, favorites: true } },
    },
  });

  if (!user) redirect("/api/auth/signin?callbackUrl=/profile");
  const displayName = user.name || "TrailPicker explorer";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      <section className="border-b border-green-950/10 bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-9 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-center gap-5">
            {user.image ? (
              <img src={user.image} alt="" className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white/15" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-600 text-3xl font-bold ring-4 ring-white/15">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-emerald-200">Your TrailPicker</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight">{displayName}</h1>
              <p className="mt-1 text-sm text-emerald-100/80">
                {user.username ? `@${user.username}` : "Choose a username"}
                {user.location ? ` · ${user.location}` : ""}
                {` · Joined ${user.createdAt.toLocaleDateString(undefined, { month: "short", year: "numeric" })}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur">
              {[
                [user._count.builds, "Builds"],
                [user._count.ownedGear, "Gear"],
                [user._count.favorites, "Favorites"],
              ].map(([value, label]) => (
                <div key={label} className="min-w-20 px-3 py-1 text-center">
                  <p className="text-lg font-bold">{value}</p>
                  <p className="text-xs text-emerald-100/75">{label}</p>
                </div>
              ))}
            </div>
            <Link href="/profile/edit" className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-green-950 shadow-sm hover:bg-emerald-50">
              Edit profile
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-7 px-5 py-8 sm:px-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside>
          <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm lg:flex-col">
            {links.map(({ href, label, icon: Icon, disabled }) =>
              disabled ? (
                <span key={href} title="Coming later" className="flex shrink-0 cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400">
                  <Icon className="h-4 w-4" /> {label}<span className="ml-auto text-[10px] uppercase">Soon</span>
                </span>
              ) : (
                <Link key={href} href={href} className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-green-900">
                  <Icon className="h-4 w-4" /> {label}
                </Link>
              )
            )}
            <Link href="/settings" className="mt-0 flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 lg:mt-2 lg:border-t lg:border-slate-100 lg:pt-4">
              <Settings className="h-4 w-4" /> Settings
            </Link>
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
