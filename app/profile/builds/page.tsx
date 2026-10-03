import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import BuildCard from "@/components/profile/BuildCard";
import { buildStatus } from "@/lib/profile";
import { Plus, Search } from "lucide-react";

type Params = { view?: string; sort?: string; q?: string };

export default async function BuildsPage({ searchParams }: { searchParams: Promise<Params> }) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin?callbackUrl=/profile/builds");
  const params = await searchParams;
  const builds = await prisma.build.findMany({
    where: { user: { email: session.user.email }, ...(params.q ? { name: { contains: params.q, mode: "insensitive" } } : {}) },
    orderBy: params.sort === "trip" ? { startDate: "asc" } : params.sort === "name" ? { name: "asc" } : { updatedAt: "desc" },
    include: { items: { include: { gear: { select: { weight_g: true, price_cad: true } } } } },
  });
  const visible = params.view && params.view !== "all" ? builds.filter((build) => buildStatus(build) === params.view) : builds;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold text-green-700">Pack library</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">My Builds</h2><p className="mt-2 text-sm text-slate-500">{visible.length} {visible.length === 1 ? "build" : "builds"}</p></div><Link href="/build" className="flex items-center justify-center gap-2 rounded-xl bg-green-900 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800"><Plus className="h-4 w-4" />New build</Link></div>
      <form className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:grid-cols-[1fr_auto_auto]">
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3"><Search className="h-4 w-4 text-slate-400" /><input name="q" defaultValue={params.q} placeholder="Search builds" className="w-full py-2.5 text-sm outline-none" /></label>
        <select name="view" defaultValue={params.view || "all"} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="all">All builds</option><option value="upcoming">Upcoming</option><option value="past">Past</option><option value="undated">No dates</option></select>
        <select name="sort" defaultValue={params.sort || "recent"} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="recent">Recently edited</option><option value="trip">Trip date</option><option value="name">Name</option></select>
        <button className="sr-only">Apply filters</button>
      </form>
      {visible.length ? <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{visible.map((build) => <BuildCard key={build.id} build={build} />)}</div> : <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center"><h3 className="text-xl font-bold text-slate-900">No builds found</h3><p className="mt-2 text-sm text-slate-500">Try another filter or create a new backpacking trip.</p></div>}
    </div>
  );
}
