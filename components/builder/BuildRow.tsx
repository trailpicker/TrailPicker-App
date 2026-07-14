import Link from "next/link";

type Props = {
    name:string;
    link:string;
    buildId:string;

    gear?: {
        name:string;
    };
};

export default function BuildRow({
    name,
    link,
    buildId,
    gear,
}: Props) {

    return (
        <div
            className="
            grid
            grid-cols-5
            items-center
            border-t
            p-4
            hover:bg-gray-50
            transition
            "
        >

            {/* Component */}
            <div className="font-semibold">
                {name}
            </div>


            {/* Selection */}
            <div>
                {gear ? (
                    <span className="font-medium">
                        {gear.name}
                    </span>
                ) : (
                    <Link
                        href={`/build/${buildId}/select/${link}`}
                        className="
                        rounded-lg
                        bg-blue-500
                        px-4
                        py-2
                        text-white
                        hover:bg-blue-700
                        transition
                        "
                    >
                        Add
                    </Link>
                )}
            </div>


            {/* Empty columns to keep table alignment */}
            <div></div>
            <div></div>


            {/* Action */}
            <div className="text-right">

                {gear && (
                    <Link
                        href="#"
                        className="
                        rounded-lg
                        bg-blue-600
                        px-4
                        py-2
                        text-white
                        hover:bg-blue-700
                        transition
                        "
                    >
                        Buy
                    </Link>
                )}

            </div>

        </div>
    );
}