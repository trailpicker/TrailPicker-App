import { redirectGearSelection } from "@/lib/legacy-gear-selection";
import type { GearBrowseSearch } from "@/components/builder/OriginalGearPicker";

export default async function SelectCategoryPage({ params, searchParams }: {
  params: Promise<{ id: string; category: string }>;
  searchParams: Promise<GearBrowseSearch>;
}) {
  const [{ id, category }, filters] = await Promise.all([params, searchParams]);
  return redirectGearSelection(id, category, filters);
}
