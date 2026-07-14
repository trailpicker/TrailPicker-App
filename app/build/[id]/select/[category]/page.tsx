import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddGearButton from "@/components/builder/AddGearButton";


export default async function SelectGearPage({
    params,
}: {
    params: Promise<{
        id: string;
        category: string;
    }>;
}) {

    const { id, category } = await params;


    const build = await prisma.build.findUnique({
        where: {
            id,
        },
    });


    if (!build) {
        notFound();
    }


    const gear = await prisma.gear.findMany({
        where: {
            category: {
                name: category,
            },
        },
        include: {
            brand: true,
        },
    });


    return (
        <main className="max-w-5xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Choose {category}
            </h1>


            <div className="space-y-4">

                {gear.map((item)=>(
                    <div
                        key={item.id}
                        className="
                        flex
                        justify-between
                        items-center
                        border-b
                        py-5
                        "
                    >

                        <div>
                            <h2 className="font-semibold">
                                {item.name}
                            </h2>

                            <p className="text-gray-500">
                                {item.brand.name}
                            </p>
                        </div>


                        <AddGearButton
                            buildId={id}
                            gearId={item.id}
                        />

                    </div>
                ))}

            </div>

        </main>
    );
}