import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { addFavorite, addOwnedGear, removeFavorite, removeOwnedGear } from "@/app/profile/gear/actions";
import { Heart, PackageCheck } from "lucide-react";

export default async function GearAccountActions({ gearId }: { gearId: string }) {
  const session = await auth();
  if (!session?.user?.email) return <a href="/api/auth/signin" className="inline-flex rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Sign in to save gear</a>;
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { ownedGear: { where: { gearId }, select: { id: true } }, favorites: { where: { gearId }, select: { id: true } } },
  });
  const owned = Boolean(user?.ownedGear.length);
  const favorite = Boolean(user?.favorites.length);

  return (
    <div className="flex flex-wrap gap-2">
      <form action={owned ? removeOwnedGear : addOwnedGear}><input type="hidden" name="gearId" value={gearId} /><button className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${owned ? "bg-emerald-100 text-emerald-900" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}><PackageCheck className="h-4 w-4" />{owned ? "Owned" : "I own this"}</button></form>
      <form action={favorite ? removeFavorite : addFavorite}><input type="hidden" name="gearId" value={gearId} /><button className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${favorite ? "bg-pink-100 text-pink-800" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}><Heart className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />{favorite ? "Favorited" : "Favorite"}</button></form>
    </div>
  );
}
