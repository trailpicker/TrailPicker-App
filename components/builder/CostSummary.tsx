type Props = {
    totalCost: number;
};

export default function CostSummary({ totalCost }: Props) {
    return (
        <div
            className="
    grid
    grid-cols-[180px_minmax(0,1fr)_100px_100px_100px]
    items-center
    border-t
    border-gray-400
    px-3
    py-4
    "
        >
            <div className="col-span-3 text-right pr-5 text-lg font-medium text-gray-900">
                Total Cost:
            </div>

            <div className="text-center pr-5 text-2xl font-bold">
                ${totalCost.toFixed(2)}
            </div>

            <div />
        </div>
    );
}