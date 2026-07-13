"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


export default function GearSort() {

  const router = useRouter();
  const searchParams = useSearchParams();


  const [sort, setSort] = useState(
    searchParams.get("sort") || ""
  );


  function changeSort(value: string) {

    setSort(value);


    const params = new URLSearchParams(
      searchParams.toString()
    );


    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }


    router.push(`/gear?${params.toString()}`);

  }


  return (

    <select
      value={sort}
      onChange={(e)=>changeSort(e.target.value)}
      className="border rounded-lg p-3 mb-8"
    >

      <option value="">
        Sort By
      </option>


      <option value="weight">
        Lowest Weight
      </option>


      <option value="price">
        Lowest Price
      </option>


      <option value="newest">
        Newest
      </option>


    </select>

  );
}