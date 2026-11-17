"use client";

import { useState } from "react";
import type { ComparisonRow } from "@/lib/gear-comparison";

export default function ComparisonTable({ products, rows }: { products: Array<{ id: string; name: string }>; rows: ComparisonRow[] }) {
  const [differencesOnly, setDifferencesOnly] = useState(false);
  const visible = rows.filter(row => !differencesOnly || row.different);
  return <section aria-label="Product specification comparison" className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 sm:px-6">
      <div><h2 className="text-xl font-bold text-gray-950">Side-by-side specifications</h2><p className="mt-1 text-xs text-gray-500">A dash means that information is not available, not that the product lacks the feature.</p></div>
      <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700"><input type="checkbox" checked={differencesOnly} onChange={event => setDifferencesOnly(event.target.checked)} className="h-4 w-4 accent-green-800" />Differences only</label>
    </div>
    <div className="overflow-x-auto"><table style={{ minWidth: `${200 + products.length * 210}px` }} className="w-full table-fixed border-separate border-spacing-0 text-left text-sm">
      <thead><tr><th scope="col" className="sticky left-0 z-10 w-40 border-b border-r border-gray-200 bg-gray-50 px-4 py-4 font-semibold text-gray-700 sm:w-48">Feature</th>{products.map(product => <th scope="col" key={product.id} className="border-b border-gray-200 bg-gray-50 px-4 py-4 font-semibold text-gray-950">{product.name}</th>)}</tr></thead>
      <tbody>{(["Overview", "Specifications"] as const).map(section => {
        const sectionRows = visible.filter(row => row.section === section);
        if (!sectionRows.length) return null;
        return <FragmentSection key={section} section={section} rows={sectionRows} count={products.length} />;
      })}</tbody>
    </table></div>
    {!visible.length && <p className="px-6 py-7 text-sm text-gray-500">No differing specifications were recorded for these products.</p>}
    <p className="border-t border-gray-100 px-5 py-3 text-xs text-gray-500">Green highlights identify the lowest listed price, lightest weight, or largest pack volume where comparable. Other differences are descriptive, not automatically better.</p>
  </section>;
}

function FragmentSection({ section, rows, count }: { section: string; rows: ComparisonRow[]; count: number }) {
  return <>
    <tr><th colSpan={count + 1} scope="colgroup" className="bg-green-50 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-green-900">{section}</th></tr>
    {rows.map(row => <tr key={row.key} className="group">
      <th scope="row" className="sticky left-0 z-10 border-b border-r border-gray-100 bg-white px-4 py-3 font-medium text-gray-700 group-hover:bg-gray-50">{row.label}{row.different && <span className="ml-1.5 text-green-700" aria-label="Values differ">•</span>}</th>
      {row.values.map((value, index) => <td key={index} className={`border-b border-gray-100 px-4 py-3 align-top ${row.bestIndices.includes(index) ? "bg-green-50 font-semibold text-green-900" : row.different ? "bg-amber-50/30 text-gray-900" : "text-gray-600"}`}>
        {value ?? <span className="text-gray-400">—</span>}
        {row.bestIndices.includes(index) && row.bestLabel && <span className="ml-2 inline-block rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-green-800">{row.bestLabel}</span>}
      </td>)}
    </tr>)}
  </>;
}
