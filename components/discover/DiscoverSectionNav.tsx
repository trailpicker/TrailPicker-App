import Link from "next/link";
import {ArrowLeft, Backpack, Compass, Search, Tent} from "lucide-react";
/** Small contextual links for detail pages. Never another four-tab navigation. */
export default function DiscoverSectionNav({active}: {active:"destinations"|"trips"|"packs"}) {
  const back=active==="destinations"?{href:"/discover/search",label:"Search destinations"}:active==="trips"?{href:"/discover/community",label:"Community trips"}:{href:"/discover/community?type=packs",label:"Community gear lists"};
  return <nav aria-label="Back to Discover" className="flex flex-wrap items-center gap-3 text-sm">
    <Link href={back.href} className="inline-flex min-h-9 items-center gap-1.5 font-bold text-green-900 hover:underline"><ArrowLeft size={15}/>{back.label}</Link>
    <span aria-hidden="true" className="text-slate-300">/</span>
    <Link href="/discover" className="inline-flex min-h-9 items-center gap-1 font-semibold text-slate-600 hover:text-green-900"><Compass size={15}/>Discover home</Link>
  </nav>;
}
