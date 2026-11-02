type Props = {
  totalCost: number;
  costToBuy: number;
};

const money = (value: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(value);

export default function CostSummary({ totalCost, costToBuy }: Props) {
  return (
    <div className="flex flex-wrap items-baseline justify-end gap-x-8 gap-y-2 border-t border-gray-400 bg-gray-50 px-4 py-4">
      <div className="flex items-baseline gap-2 text-sm text-gray-500">
        <span>Total gear value</span>
        <span className="font-semibold tabular-nums text-gray-800">{money(totalCost)}</span>
      </div>
      <div className="flex items-baseline gap-2 text-sm text-gray-700">
        <span>To buy</span>
        <strong className="text-xl font-bold tabular-nums text-gray-900">{money(costToBuy)}</strong>
      </div>
    </div>
  );
}
