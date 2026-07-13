"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


export default function SearchBar() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const currentSearch =
    searchParams.get("q") || "";


  const [search, setSearch] =
    useState(currentSearch);


  function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();


    if (search.trim()) {
      router.push(`/gear?q=${search}`);
    } else {
      router.push("/gear");
    }

  }


  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8"
    >

      <input
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        placeholder="Search gear..."
        className="border rounded-lg px-4 py-3 w-full"
      />

    </form>
  );
}