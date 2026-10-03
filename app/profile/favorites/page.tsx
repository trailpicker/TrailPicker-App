import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import GearLibraryCard from "@/components/profile/GearLibraryCard";
import { Heart, Search } from "lucide-react";

type Params = { q?: string; category?: string };

export default async function FavoritesPage({ searchParams }: { searchParams: Promise<Params> }) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin?callbackUrl=/profile/favorites");
  const params = await searchParams;
  const favorites = await prisma.favorite.findMany({
    where: {
      user: { email: session.user.email },
      gear: {
        ...(params.category && params.category !== "all" ? { category: { slug: params.category } } : {}),
        ...(params.q ? { name: { contains: params.q, mode: "insensitive" as const } } : {}),
      },
    },
    orderBy: { createdAt: "desc" },
    include: { gear: { include: { brand: true, category: true, images: true } } },
  });
  const categories = await prisma.category.findMany({ where: { gear: { some: { favorites: { some: { user: { email: session.user.email } } } } } }, orderBy: { name: "asc" } });

  return (
    <div>
      <div><p className="text-sm font-semibold text-green-700">Saved for later</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Favorites</h2><p className="mt-2 text-sm text-slate-500">Gear you’re considering, separate from equipment you own.</p></div>
      <form className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:grid-cols-[1fr_auto_auto]">
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3"><Search className="h-4 w-4 text-slate-400" /><input name="q" defaultValue={params.q} placeholder="Search favorites" className="w-full py-2.5 text-sm outline-none" /></label>
        <select name="category" defaultValue={params.category || "all"} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="all">All categories</option>{categories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}</select>
        <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">Apply</button>
      </form>
      {favorites.length ? <div className="mt-6 grid gap-4 xl:grid-cols-2">{favorites.map((item) => <GearLibraryCard key={item.id} gear={item.gear} addedAt={item.createdAt} mode="favorite" />)}</div> : <div className="mt-6 rounded-3xl border border-dashed border-pink-200 bg-white p-12 text-center"><Heart className="mx-auto h-9 w-9 text-pink-300" /><h3 className="mt-3 text-xl font-bold text-slate-900">Nothing saved yet</h3><p className="mt-2 text-sm text-slate-500">Favorite products while browsing gear and compare them later.</p><Link href="/gear" className="mt-5 inline-flex rounded-xl bg-green-900 px-4 py-2.5 text-sm font-semibold text-white">Explore gear</Link></div>}
    </div>
  );
}
