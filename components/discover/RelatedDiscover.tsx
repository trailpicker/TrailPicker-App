import Link from "next/link";
import { ArrowRight, Backpack, CalendarDays, Compass } from "lucide-react";
import {
  relatedPackHref,
  relatedPublicSummary,
  relatedTripHref,
  type RelatedPublicContent,
  type RelatedPublicItem,
} from "@/lib/discover-related";

type Props = {
  related: RelatedPublicContent;
  title?: string;
  description?: string;
  showEmpty?: boolean;
};

function RelatedGroup({
  kind,
  entries,
}: {
  kind: "trip" | "pack";
  entries: readonly RelatedPublicItem[];
}) {
  const trip = kind === "trip";
  const Icon = trip ? CalendarDays : Backpack;
  return <div className="min-w-0">
    <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700">
      <Icon size={17} className="text-emerald-700" aria-hidden="true" />
      {trip ? "Public trips" : "Gear builds"}
    </h3>
    <ul className="space-y-2">
      {entries.map(entry => <li key={entry.id}>
        <Link href={trip ? relatedTripHref(entry.id) : relatedPackHref(entry.id)}
          className="group flex min-h-20 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-emerald-300 hover:bg-emerald-50">
          <span className="min-w-0">
            <span className="block line-clamp-2 text-sm font-bold text-slate-900 group-hover:text-green-900">{entry.name}</span>
            <span className="mt-1 block text-xs text-slate-500">{relatedPublicSummary(entry, kind)}</span>
          </span>
          <ArrowRight size={17} className="shrink-0 text-emerald-700" aria-hidden="true" />
        </Link>
      </li>)}
    </ul>
  </div>;
}

export default function RelatedDiscover({
  related,
  title = "Connected community content",
  description = "Public trips and gear setups explicitly linked to this catalog destination.",
  showEmpty = false,
}: Props) {
  const hasTrips = related.trips.length > 0;
  const hasPacks = related.packs.length > 0;
  if (!hasTrips && !hasPacks && !showEmpty) return null;
  return <section aria-labelledby="related-discover-heading" className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
    <div className="flex items-start gap-3">
      <Compass size={20} className="mt-0.5 shrink-0 text-emerald-700" aria-hidden="true" />
      <div>
        <h2 id="related-discover-heading" className="text-xl font-bold tracking-tight text-slate-900">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </div>
    {hasTrips || hasPacks ? <div className="mt-5 grid gap-6 md:grid-cols-2">
      {hasTrips && <RelatedGroup kind="trip" entries={related.trips} />}
      {hasPacks && <RelatedGroup kind="pack" entries={related.packs} />}
    </div> : <p className="mt-4 rounded-xl bg-slate-50 px-4 py-4 text-sm text-slate-600">No public community trips or gear builds are linked to this destination yet.</p>}
    <nav aria-label="Explore more Discover sections" className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-sm font-semibold text-green-900">
      <Link href="/discover/community" className="hover:underline">Browse all trips</Link>
      <Link href="/discover/community?type=packs" className="hover:underline">Browse all builds</Link>
    </nav>
  </section>;
}
