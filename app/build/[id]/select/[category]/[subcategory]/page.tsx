import { redirectGearSelection } from "@/lib/legacy-gear-selection";
import type { GearBrowseSearch } from "@/components/builder/OriginalGearPicker";

export default async function SelectGearPage({ params, searchParams }: {
  params: Promise<{ id: string; category: string; subcategory: string }>;
  searchParams: Promise<GearBrowseSearch>;
}) {
  const [{ id, category, subcategory }, filters] = await Promise.all([params, searchParams]);
  return redirectGearSelection(id, category, filters, subcategory);
}
