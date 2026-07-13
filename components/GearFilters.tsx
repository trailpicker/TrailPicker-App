"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


export default function GearFilters() {

  const router = useRouter();
  const searchParams = useSearchParams();


  const [category, setCategory] = useState(
    searchParams.get("category") || ""
  );

  const [maxWeight, setMaxWeight] = useState(
    searchParams.get("maxWeight") || ""
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || ""
  );

  const [season, setSeason] = useState(
    searchParams.get("season") || ""
  );


  function applyFilters() {

    const params = new URLSearchParams();


    const q = searchParams.get("q");

    if (q) {
      params.set("q", q);
    }


    if (category) {
      params.set("category", category);
    }


    if (maxWeight) {
      params.set("maxWeight", maxWeight);
    }


    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }


    if (season) {
      params.set("season", season);
    }


    router.push(`/gear?${params.toString()}`);
  }



  return (
    <div className="border rounded-xl p-5 mb-8 space-y-4">


      <select
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        className="border rounded p-2 w-full"
      >

        <option value="">
          All Categories
        </option>

        <option value="Packs">
          Packs
        </option>

        <option value="Shelter">
          Shelter
        </option>

        <option value="Sleep">
          Sleep
        </option>

      </select>



      <input
        type="number"
        placeholder="Max weight (grams)"
        value={maxWeight}
        onChange={(e)=>setMaxWeight(e.target.value)}
        className="border rounded p-2 w-full"
      />



      <input
        type="number"
        placeholder="Max price CAD"
        value={maxPrice}
        onChange={(e)=>setMaxPrice(e.target.value)}
        className="border rounded p-2 w-full"
      />



      <select
        value={season}
        onChange={(e)=>setSeason(e.target.value)}
        className="border rounded p-2 w-full"
      >

        <option value="">
          All Seasons
        </option>

        <option value="3-season">
          3 Season
        </option>

        <option value="4-season">
          4 Season
        </option>

      </select>



      <button
        onClick={applyFilters}
        className="rounded-lg bg-black text-white px-5 py-2"
      >
        Apply Filters
      </button>


    </div>
  );
}