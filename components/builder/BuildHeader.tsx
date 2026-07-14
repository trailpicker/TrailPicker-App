type Props = {
    name: string;
    weight: number;
    cost: number;
    items: number;
};

export default function BuildHeader({
    name,
    weight,
    cost,
    items,
}: Props) {
    return (
        <div className="
            w-full
            bg-green-700
            shadow-sm
            py-8
            text-center
        ">

            <h1 className="
                text-3xl
                font-bold
                text-white
            ">
                {name}
            </h1>


            <div className="
                mt-5
                flex
                justify-center
                gap-16
                text-white
            ">

                <div>
                    <p className="text-sm opacity-80">
                        Weight
                    </p>

                    <p className="text-xl font-bold">
                        {weight}g
                    </p>
                </div>


                <div>
                    <p className="text-sm opacity-80">
                        Cost
                    </p>

                    <p className="text-xl font-bold">
                        ${cost} CAD
                    </p>
                </div>


                <div>
                    <p className="text-sm opacity-80">
                        Items
                    </p>

                    <p className="text-xl font-bold">
                        {items}
                    </p>
                </div>

            </div>

        </div>
    );
}