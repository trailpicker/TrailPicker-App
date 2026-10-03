import Link from "next/link";
import { CalendarDays, Copy, MapPin, Package, Pencil } from "lucide-react";
import { deleteBuild, duplicateProfileBuild, renameBuild } from "@/app/profile/actions";
import { dateRange, summarizeBuild, weightLabel, type ProfileBuild } from "@/lib/profile";
import DeleteBuildButton from "./DeleteBuildButton";

export default function BuildCard({ build }: { build: ProfileBuild }) {
  const totals = summarizeBuild(build);
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link href={`/build/${build.id}`} className="text-xl font-bold tracking-tight text-slate-950 hover:text-green-800">{build.name}</Link>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500"><MapPin className="h-3.5 w-3.5" />{build.location || "Location not set"}</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">{totals.itemCount} items</span>
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm text-slate-600"><CalendarDays className="h-4 w-4 text-green-700" />{dateRange(build.startDate, build.endDate)}</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-medium text-slate-500">Base weight</p><p className="mt-1 font-bold text-slate-900">{weightLabel(totals.base)}</p></div>
        <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-medium text-slate-500">Gear value</p><p className="mt-1 font-bold text-slate-900">${totals.cost.toFixed(0)} CAD</p></div>
      </div>
      <p className="mt-4 text-xs text-slate-400">Edited {build.updatedAt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</p>
      <div className="mt-auto flex items-center gap-2 pt-5">
        <Link href={`/build/${build.id}`} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800"><Package className="h-4 w-4" />Open</Link>
        <form action={duplicateProfileBuild}><input type="hidden" name="buildId" value={build.id} /><button aria-label="Duplicate build" className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"><Copy className="h-4 w-4" /></button></form>
        <details className="relative"><summary aria-label="Rename build" className="list-none cursor-pointer rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"><Pencil className="h-4 w-4" /></summary><form action={renameBuild} className="absolute bottom-12 right-0 z-10 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl"><input type="hidden" name="buildId" value={build.id} /><label className="text-xs font-semibold text-slate-600">Build name<input name="name" defaultValue={build.name} required maxLength={80} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-green-700" /></label><button className="mt-2 w-full rounded-lg bg-green-900 px-3 py-2 text-sm font-semibold text-white">Rename</button></form></details>
        <form action={deleteBuild}><input type="hidden" name="buildId" value={build.id} /><DeleteBuildButton /></form>
      </div>
    </article>
  );
}
