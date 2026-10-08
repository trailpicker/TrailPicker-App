import Link from "next/link";

type Props = {
  buildId: string;
  name: string;
  active: "gear" | "trip";
  issueCount: number;
};

export default function BuildHeader({ buildId, name, active, issueCount }: Props) {
  const tabs = [
    { key: "gear" as const, label: "Gear", href: `/build/${buildId}` },
    { key: "trip" as const, label: "Trip Planner", href: `/build/${buildId}?tab=trip` },
  ];

  return (
    <div className="w-full bg-green-700 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-6 pt-6 pb-0">
        <h1 className="text-3xl font-bold text-white text-center mb-5 max-md:break-words max-md:[overflow-wrap:anywhere]">{name}</h1>

        <div className="flex justify-center gap-2">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={t.href}
              className={`
                relative px-5 py-2.5 text-sm font-semibold rounded-t-lg transition
                ${active === t.key
                  ? "bg-gray-50 text-green-800"
                  : "text-white/80 hover:text-white hover:bg-white/10"}
              `}
            >
              {t.label}
              {t.key === "gear" && issueCount > 0 && (
                <span className="ml-2 rounded-full bg-amber-400 text-amber-950 text-[10px] font-bold px-1.5 py-0.5">
                  {issueCount}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

