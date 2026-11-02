import OriginalGearPicker, { type GearBrowseSearch } from "@/components/builder/GearPicker";

export default async function GearSubcategoryPage({ params, searchParams }: {
  params: Promise<{ id: string; subcategory: string }>;
  searchParams: Promise<GearBrowseSearch>;
}) {
  const [{ id, subcategory }, filters] = await Promise.all([params, searchParams]);
  return <OriginalGearPicker categorySlug={id} subcategorySlug={subcategory} filters={filters} />;
}
