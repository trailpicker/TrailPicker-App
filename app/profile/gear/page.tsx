import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import GearLibraryCard from "@/components/profile/GearLibraryCard";
import { PackageOpen, Plus, Search } from "lucide-react";

type Params = { category?: string; q?: string; sort?: string };

export default async function MyGearPage({ searchParams }: { searchParams: Promise<Params> }) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin?callbackUrl=/profile/gear");
  const params = await searchParams;
  const currentBuild = (await cookies()).get("currentBuild")?.value;

  const owned = await prisma.ownedGear.findMany({
    where: {
      user: { email: session.user.email },
      gear: {
        ...(params.category && params.category !== "all" ? { category: { slug: params.category } } : {}),
        ...(params.q ? { name: { contains: params.q, mode: "insensitive" as const } } : {}),
      },
    },
    orderBy: params.sort === "name" ? { gear: { name: "asc" as const } } : { createdAt: "desc" as const },
    include: { gear: { include: { brand: true, category: true, images: true } } },
  });

  const [categories, activeBuild] = await Promise.all([
    prisma.category.findMany({
      where: {
        gear: {
          some: {
            ownedGear: {
              some: { user: { email: session.user.email } },
            },
          },
        },
      },
      orderBy: { name: "asc" },
    }),
    currentBuild ? prisma.build.findFirst({ where: { id: currentBuild, user: { email: session.user.email } }, select: { name: true } }) : null,
  ]);
  const totalWeight = owned.reduce((sum, item) => sum + (item.gear.weight_g || 0), 0);
  const totalValue = owned.reduce((sum, item) => sum + (item.gear.price_cad || 0), 0);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-sm font-semibold text-green-700">Gear Closet</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">My Gear</h2><p className="mt-2 text-sm text-slate-500">Equipment you actually own, ready to reuse across trips.</p></div>
        <Link href="/gear" className="flex items-center justify-center gap-2 rounded-xl bg-green-900 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800"><Plus className="h-4 w-4" />Browse gear</Link>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-medium text-slate-500">Items</p><p className="mt-1 text-xl font-bold text-slate-950">{owned.length}</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-medium text-slate-500">Total weight</p><p className="mt-1 text-xl font-bold text-slate-950">{(totalWeight / 1000).toFixed(2)} kg</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-medium text-slate-500">Retail value</p><p className="mt-1 text-xl font-bold text-slate-950">${totalValue.toFixed(0)}</p></div>
      </div>

      {activeBuild && <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">“Add to current build” will add gear to <b>{activeBuild.name}</b>.</p>}

      <form className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:grid-cols-[1fr_auto_auto_auto]">
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3"><Search className="h-4 w-4 text-slate-400" /><input name="q" defaultValue={params.q} placeholder="Search your gear" className="w-full py-2.5 text-sm outline-none" /></label>
        <select name="category" defaultValue={params.category || "all"} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="all">All categories</option>{categories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}</select>
        <select name="sort" defaultValue={params.sort || "newest"} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="newest">Recently added</option><option value="name">Name</option></select>
        <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">Apply</button>
      </form>

      {owned.length ? <div className="mt-6 grid gap-4 xl:grid-cols-2">{owned.map((item) => <GearLibraryCard key={item.id} gear={item.gear} addedAt={item.createdAt} mode="owned" hasCurrentBuild={Boolean(activeBuild)} />)}</div> : <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center"><PackageOpen className="mx-auto h-9 w-9 text-slate-300" /><h3 className="mt-3 text-xl font-bold text-slate-900">Your gear closet is empty</h3><p className="mt-2 text-sm text-slate-500">Open any product and choose “I own this.”</p><Link href="/gear" className="mt-5 inline-flex rounded-xl bg-green-900 px-4 py-2.5 text-sm font-semibold text-white">Browse gear</Link></div>}
    </div>
  );
}
