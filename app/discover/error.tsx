"use client";

import Link from "next/link";
import {AlertCircle, ArrowLeft, RefreshCw} from "lucide-react";

/** A useful fallback when account/database-backed community queries fail. */
export default function DiscoverError({reset}:{error:Error & {digest?:string};reset:()=>void}) {
  return <main className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-5 py-16 text-center">
    <div className="rounded-2xl bg-amber-50 p-4 text-amber-900"><AlertCircle size={32}/></div>
    <h1 className="mt-5 text-2xl font-black text-slate-900">Couldn&apos;t load this Discover page</h1>
    <p className="mt-3 text-sm leading-6 text-slate-600">Public trips, gear lists and saved items require a working database connection and the current generated Prisma Client. Your destinations catalog and guided finder are still available.</p>
    <div className="mt-6 flex flex-wrap justify-center gap-3"><button onClick={reset} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-green-900 px-5 text-sm font-bold text-white hover:bg-green-800"><RefreshCw size={16}/> Retry</button><Link href="/discover" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 px-5 text-sm font-bold text-slate-700 hover:bg-slate-50"><ArrowLeft size={16}/> Back to Discover</Link></div>
  </main>;
}
