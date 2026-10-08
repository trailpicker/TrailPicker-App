type Props = {
    totalCost: number;
};

export default function CostSummary({ totalCost }: Props) {
    return (
        <div
            className="
    grid
    grid-cols-[180px_minmax(0,1fr)_100px_100px_100px]
    max-md:grid-cols-[auto_minmax(0,1fr)] max-md:gap-3
    items-center
    border-t
    border-gray-400
    px-3
    py-4
    bg-gray-50
    "
        >
            <div className="col-span-3 text-right pr-5 max-md:col-span-1 max-md:text-left max-md:pr-0 text-lg font-medium text-gray-900">
                Total Cost:
            </div>

            <div className="text-center pr-5 text-2xl font-bold max-md:text-right max-md:pr-0 max-md:break-words max-md:text-xl">
                ${totalCost.toFixed(2)}
            </div>

            <div className="max-md:hidden" />
        </div>
    );
}

