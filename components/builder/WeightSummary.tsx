type Props = {
    base: number;
    consumable: number;
    worn: number;
    total: number;
    plannedConsumables?: number;
    plannedUnknown?: boolean;
};

function toLb(grams: number) {
    return (grams / 453.592).toFixed(2);
}

export default function WeightSummary({
    base,
    consumable,
    worn,
    total,
    plannedConsumables = 0,
    plannedUnknown = false,
}: Props) {
    const adjustedTotal = total + plannedConsumables;
    const basePct = adjustedTotal > 0 ? (base / adjustedTotal) * 100 : 0;
    const wornPct = adjustedTotal > 0 ? (worn / adjustedTotal) * 100 : 0;
    const consumablePct = adjustedTotal > 0 ? (consumable / adjustedTotal) * 100 : 0;
    const plannedPct = adjustedTotal > 0 ? (plannedConsumables / adjustedTotal) * 100 : 0;

    return (
        <section className="mt-10 border-t border-gray-200 pt-6">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Weight Breakdown
                    </h2>

                    <p className="mt-1 text-3xl font-bold text-gray-900">
                        {adjustedTotal}
                        <span className="text-lg font-medium text-gray-900">g</span>
                        <span className="ml-2 text-base font-medium text-gray-400">
                            ({toLb(adjustedTotal)} lb)
                        </span>
                    </p>
                </div>


            </div>

            {(plannedConsumables > 0 || plannedUnknown) && <p className="mt-2 text-xs leading-5 text-gray-500">Includes additional food/fuel from your private trip plan, not added as Builder gear. {plannedUnknown ? "Some food has unknown weight; the total is known mass only." : ""}</p>}

            <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${basePct}%` }}
                />
                <div
                    className="h-full bg-amber-400 transition-all"
                    style={{ width: `${wornPct}%` }}
                />
                <div
                    className="h-full bg-emerald-400 transition-all"
                    style={{ width: `${consumablePct}%` }}
                />
                {plannedConsumables > 0 && <div className="h-full bg-green-800" style={{width:`${plannedPct}%`}} />}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
                <Stat dot="bg-blue-500" label="Base" grams={base} />
                <Stat dot="bg-amber-400" label="Worn" grams={worn} />
                <Stat dot="bg-emerald-400" label="Builder consumable" grams={consumable} />
                {(plannedConsumables > 0 || plannedUnknown) && <Stat dot="bg-green-800" label="Additional planned food/fuel (known)" grams={plannedConsumables} />}
            </div>
        </section>
    );
}

function Stat({
    dot,
    label,
    grams,
}: {
    dot: string;
    label: string;
    grams: number;
}) {
    return (
        <div className="flex items-center gap-2 max-md:flex-wrap">
            <span className={`h-2 w-2 rounded-full ${dot}`} />
            <span className="text-gray-500">{label}</span>
            <span className="font-semibold text-gray-900">{grams}g</span>
            <span className="text-gray-400">({toLb(grams)} lb)</span>
        </div>
    );
}



