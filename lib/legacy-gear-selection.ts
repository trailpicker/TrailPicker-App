import { requireBuildPageAccess } from "@/lib/build-access";
import { redirect } from "next/navigation";
import type { GearBrowseSearch } from "@/components/builder/OriginalGearPicker";

export async function redirectGearSelection(buildId: string, category: string, filters: GearBrowseSearch, subcategory?: string): Promise<never> {
  await requireBuildPageAccess(buildId);
  const query = new URLSearchParams();
  for (const key of ["brand", "maxWeight", "maxPrice", "sort", "direction"]) {
    const value = filters[key];
    if (value) query.set(key, Array.isArray(value) ? value.join(",") : value);
  }
  query.set("build", buildId);
  return redirect(`/gear/${encodeURIComponent(category)}${subcategory ? "/" + encodeURIComponent(subcategory) : ""}?${query}`);
}
