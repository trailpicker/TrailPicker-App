"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { addGear } from "@/app/build/actions";

export default function ProductBuildButton({ buildId, gearId }: { buildId: string; gearId: string }) {
  const [pending,start]=useTransition();const [error,setError]=useState("");
  function submit(form: FormData) { setError("");start(async()=>{try {await addGear(form);}catch(e){if(e&&typeof e==="object"&&"digest" in e&&typeof e.digest==="string"&&e.digest.startsWith("NEXT_REDIRECT;"))throw e;setError(e instanceof Error?e.message:"Could not add gear.");}}); }
  return <form action={submit}><input type="hidden" name="buildId" value={buildId}/><input type="hidden" name="gearId" value={gearId}/><button disabled={pending} className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-900 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800 disabled:cursor-wait disabled:opacity-60"><Plus className="h-4 w-4"/>{pending?"Adding…":"Add to build"}</button>{error&&<p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}</form>;
}
