"use client";

import { useState, useTransition } from "react";
import { Star } from "lucide-react";
import { saveGearReview, deleteGearReview } from "@/app/gear/review-actions";

type Review = { id: string; rating: number; title: string | null; body: string | null };
export default function ReviewEditor({ gearId, review }: { gearId: string; review: Review | null }) {
  const [rating,setRating] = useState(review?.rating ?? 0);
  const [pending,start] = useTransition(); const [error,setError]=useState("");const [saved,setSaved]=useState(false);
  function submit(form: FormData) { setError("");setSaved(false);start(async()=>{try { await saveGearReview(form);setSaved(true); }catch(e){setError(e instanceof Error?e.message:"Could not save review.");}}); }
  function remove() { if (!review || !window.confirm("Delete your review?")) return; const form=new FormData();form.set("reviewId",review.id);setError("");start(async()=>{try{await deleteGearReview(form);setRating(0);setSaved(false);}catch(e){setError(e instanceof Error?e.message:"Could not delete review.");}}); }
  return <form action={submit} onChange={()=>setSaved(false)} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
    <h3 className="font-semibold">{review ? "Your review" : "Write a review"}</h3><p className="mt-1 text-xs text-gray-500">Share your own experience with this product. Your review is public.</p>
    <input type="hidden" name="gearId" value={gearId}/><input type="hidden" name="rating" value={rating}/>
    <fieldset disabled={pending} className="mt-4 space-y-3"><legend className="sr-only">Review details</legend>
      <fieldset><legend className="mb-1 text-xs font-medium text-gray-600">Your rating</legend><div className="flex gap-1">{[1,2,3,4,5].map(value=><label key={value} className="relative cursor-pointer rounded p-1 focus-within:ring-2 focus-within:ring-green-700"><input className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0" type="radio" name="ratingChoice" value={value} checked={rating===value} onChange={()=>{setRating(value);setSaved(false)}} required aria-label={`${value} star${value===1?"":"s"}`}/><Star aria-hidden="true" className={`h-7 w-7 ${value<=rating?"fill-amber-400 text-amber-400":"text-gray-300"}`}/></label>)}</div></fieldset>
      <label className="block text-xs font-medium text-gray-600">Title (optional)<input name="title" maxLength={120} defaultValue={review?.title??""} className="mt-1 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"/></label>
      <label className="block text-xs font-medium text-gray-600">Your experience<textarea name="body" required minLength={10} maxLength={4000} rows={4} defaultValue={review?.body??""} placeholder="How did it perform on your trips?" className="mt-1 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"/></label>
      <div className="flex flex-wrap gap-3"><button className="cursor-pointer rounded-lg bg-green-900 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800 disabled:cursor-wait">{pending?"Saving…":review?"Update review":"Post review"}</button>{review&&<button type="button" onClick={remove} className="cursor-pointer rounded-lg px-3 py-2 text-sm text-red-700 hover:bg-red-50">Delete review</button>}</div>
    </fieldset>{error&&<p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}{saved&&<p role="status" className="mt-3 text-sm text-green-800">Review saved.</p>}
  </form>;
}
