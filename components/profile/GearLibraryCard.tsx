import Link from "next/link";
import { Backpack, Heart, PackageCheck, Scale, Trash2 } from "lucide-react";
import {
  addGearToCurrentBuild,
  removeFavorite,
  removeOwnedGear,
  moveFavoriteToGear,
} from "@/app/profile/gear/actions";

type Gear = {
  id: string;
  name: string;
  weight_g: number | null;
  price_cad: number | null;
  brand: { name: string };
  category: { name: string; slug: string };
  images: Array<{ url: string; isPrimary: boolean }>;
};

type Props = {
  gear: Gear;
  mode: "owned" | "favorite";
  addedAt: Date;
  hasCurrentBuild?: boolean;
};

export default function GearLibraryCard({ gear, mode, addedAt, hasCurrentBuild = false }: Props) {
  const image = gear.images.find((item) => item.isPrimary)?.url || gear.images[0]?.url;

  return (
    <article className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-300 hover:shadow-md">
      <Link href={`/gear/${gear.id}`} className="flex w-28 shrink-0 items-center justify-center bg-slate-50 sm:w-36">
        {image ? (
          <img src={image} alt="" className="h-full max-h-44 w-full object-contain p-3" />
        ) : (
          <Backpack className="h-10 w-10 text-slate-300" />
        )}
      </Link>

      <div className="min-w-0 flex-1 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700">{gear.brand.name}</p>
            <Link href={`/gear/${gear.id}`} className="mt-1 block truncate text-lg font-bold text-slate-950 hover:text-green-800">
              {gear.name}
            </Link>
            <p className="mt-1 text-xs text-slate-500">{gear.category.name} · Added {addedAt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</p>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{gear.category.name}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
          <span className="flex items-center gap-1.5"><Scale className="h-4 w-4 text-slate-400" />{gear.weight_g == null ? "Weight unknown" : gear.weight_g >= 1000 ? `${(gear.weight_g / 1000).toFixed(2)} kg` : `${gear.weight_g} g`}</span>
          <span>{gear.price_cad == null ? "Price unknown" : `$${gear.price_cad.toFixed(2)} CAD`}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {mode === "owned" ? (
            <>
              <form action={addGearToCurrentBuild}>
                <input type="hidden" name="gearId" value={gear.id} />
                <button disabled={!hasCurrentBuild} title={hasCurrentBuild ? "Add to your current build" : "Open or create a build first"} className="flex items-center gap-2 rounded-lg bg-green-900 px-3 py-2 text-xs font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-slate-300">
                  <Backpack className="h-3.5 w-3.5" />Add to current build
                </button>
              </form>
              <form action={removeOwnedGear}>
                <input type="hidden" name="gearId" value={gear.id} />
                <button className="flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" />Remove</button>
              </form>
            </>
          ) : (
            <>
              <form action={moveFavoriteToGear}>
                <input type="hidden" name="gearId" value={gear.id} />
                <button className="flex items-center gap-2 rounded-lg bg-green-900 px-3 py-2 text-xs font-semibold text-white hover:bg-green-800"><PackageCheck className="h-3.5 w-3.5" />I own this</button>
              </form>
              <form action={removeFavorite}>
                <input type="hidden" name="gearId" value={gear.id} />
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"><Heart className="h-3.5 w-3.5" />Unfavorite</button>
              </form>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
