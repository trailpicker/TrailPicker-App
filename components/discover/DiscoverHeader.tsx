import Link from "next/link";
import {ArrowLeft, Bookmark, Compass, Search, UsersRound, WandSparkles} from "lucide-react";

type Section="home" | "search" | "find" | "community" | "saved";
const names: Record<Section,string> = {
  home:"Discover",search:"Destination search",find:"Find adventure",community:"Community",saved:"Saved",
};
/** Breadcrumb and contextual actions, not another nested tab system. */
export default function DiscoverHeader({active="home",back=false}: {active?: Section;back?:boolean}) {
  const action = active === "find" || active === "search"
    ? {href:active==="find"?"/discover/search":"/discover/find",label:active==="find"?"Search catalog":"Find adventure",Icon:active==="find"?Search:WandSparkles}
    : {href:active==="community"?"/discover/search":"/discover/community",label:active==="community"?"Explore places":"Community",Icon:active==="community"?Search:UsersRound};
  return <div className="border-b border-slate-200 bg-white text-slate-800">
    <nav aria-label="Discover breadcrumb and actions" className="mx-auto flex max-w-screen-2xl items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
      <Link href="/discover" className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg px-1 text-sm font-semibold text-green-800 hover:underline">{back?<ArrowLeft size={17}/>:<Compass size={18}/>} Discover</Link>
      {active!=="home"&&<><span className="text-slate-300" aria-hidden="true">/</span><span className="hidden truncate text-sm font-semibold text-slate-500 sm:inline">{names[active]}</span></>}
      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        {active!=="saved"&&<Link href={action.href} className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-xs font-semibold text-slate-600 transition hover:bg-emerald-50 hover:text-green-800 sm:text-sm"><action.Icon size={16}/><span className="hidden min-[480px]:inline">{action.label}</span></Link>}
        <Link href="/discover/saved" aria-current={active==="saved"?"page":undefined} aria-label="Saved items" className={`inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-xs font-semibold transition sm:text-sm ${active==="saved"?"bg-emerald-50 text-green-800":"text-slate-600 hover:bg-emerald-50 hover:text-green-800"}`}><Bookmark size={16}/> <span className="hidden sm:inline">Saved</span></Link>
      </div>
    </nav>
  </div>;
}
