type BuildSummaryProps = {
  itemCount: number;
  baseWeight: number;
  baseWeightLb: number;
  totalCost: number;
};

export default function BuildSummary({
  itemCount,
  baseWeight,
  baseWeightLb,
  totalCost,
}: BuildSummaryProps) {
  return (
    <section className="mb-8 rounded-xl border p-6">
      <h2 className="text-2xl font-bold mb-6">
        Build Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Base Weight</span>
          <span>
            {baseWeight} g ({baseWeightLb.toFixed(2)} lb)
          </span>
        </div>

        <div className="flex justify-between">
          <span>Total Cost</span>
          <span>${totalCost.toFixed(2)} CAD</span>
        </div>

        <div className="flex justify-between">
          <span>Gear Items</span>
          <span>{itemCount}</span>
        </div>

      </div>
    </section>
  );
}