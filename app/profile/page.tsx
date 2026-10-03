import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import BuildCard from "@/components/profile/BuildCard";
import { buildStatus, summarizeBuild, weightLabel } from "@/lib/profile";
import { ArrowRight, Backpack, CalendarClock, CircleCheckBig, Heart, PackageCheck, Plus } from "lucide-react";

export default async function ProfileOverview() {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin?callbackUrl=/profile");
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { name: true, _count: { select: { ownedGear: true, favorites: true } }, builds: { orderBy: { updatedAt: "desc" }, take: 6, include: { items: { include: { gear: { select: { weight_g: true, price_cad: true } } } } } } } });
  if (!user) redirect("/api/auth/signin?callbackUrl=/profile");
  const upcoming = user.builds.filter((build) => buildStatus(build) === "upcoming").sort((a, b) => a.startDate!.getTime() - b.startDate!.getTime())[0];
  const recent = user.builds.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-green-700">Dashboard</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Welcome back, {user.name?.split(" ")[0] || "explorer"}</h2></div><Link href="/build" className="flex items-center gap-2 rounded-xl bg-green-900 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800"><Plus className="h-4 w-4" />New trip</Link></div>

      {upcoming ? (() => { const totals = summarizeBuild(upcoming); return (
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 to-green-950 text-white shadow-lg">
          <div className="grid gap-6 p-7 md:grid-cols-[1fr_auto] md:items-end"><div><div className="flex items-center gap-2 text-sm font-semibold text-emerald-300"><CalendarClock className="h-4 w-4" />Upcoming trip</div><h3 className="mt-3 text-3xl font-bold">{upcoming.name}</h3><p className="mt-2 text-emerald-100/75">{upcoming.location || "Location not set"}</p><div className="mt-6 flex flex-wrap gap-3"><span className="rounded-xl bg-white/10 px-4 py-2 text-sm">Base <b>{weightLabel(totals.base)}</b></span><span className="rounded-xl bg-white/10 px-4 py-2 text-sm">Total <b>{weightLabel(totals.total)}</b></span><span className="rounded-xl bg-white/10 px-4 py-2 text-sm"><b>{totals.itemCount}</b> items</span></div></div><Link href={`/build/${upcoming.id}`} className="flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-bold text-green-950 hover:bg-emerald-300">Continue packing <ArrowRight className="h-4 w-4" /></Link></div>
        </section>); })() : (
        <section className="rounded-3xl border border-dashed border-emerald-300 bg-emerald-50/60 p-8 text-center"><CircleCheckBig className="mx-auto h-9 w-9 text-emerald-700" /><h3 className="mt-3 text-xl font-bold text-slate-950">No upcoming trip yet</h3><p className="mt-1 text-sm text-slate-600">Create a trip and your next packing plan will appear here.</p><Link href="/build" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-900 px-4 py-2.5 text-sm font-semibold text-white"><Plus className="h-4 w-4" />Create a trip</Link></section>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/profile/gear" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-300"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800"><PackageCheck className="h-5 w-5" /></span><span><span className="block text-lg font-bold text-slate-950">My Gear</span><span className="text-sm text-slate-500">{user._count.ownedGear} owned items</span></span><ArrowRight className="ml-auto h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-700" /></Link>
        <Link href="/profile/favorites" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-pink-300"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-100 text-pink-700"><Heart className="h-5 w-5" /></span><span><span className="block text-lg font-bold text-slate-950">Favorites</span><span className="text-sm text-slate-500">{user._count.favorites} saved items</span></span><ArrowRight className="ml-auto h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-pink-600" /></Link>
      </div>

      <section><div className="mb-4 flex items-center justify-between"><div><p className="text-sm font-semibold text-green-700">Keep planning</p><h3 className="mt-1 text-2xl font-bold text-slate-950">Recent builds</h3></div><Link href="/profile/builds" className="flex items-center gap-1 text-sm font-semibold text-green-800 hover:underline">View all <ArrowRight className="h-4 w-4" /></Link></div>
        {recent.length ? <div className="grid gap-4 xl:grid-cols-3">{recent.map((build) => <BuildCard key={build.id} build={build} />)}</div> : <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500"><Backpack className="mx-auto mb-3 h-8 w-8 text-slate-300" />Your saved builds will appear here.</div>}
      </section>
    </div>
  );
}
