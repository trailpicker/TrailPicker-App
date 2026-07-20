
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SelectCategoryPage({
    params,
}: {
    params: Promise<{
        id: string;
        category: string;
    }>;
}) {

    const { id, category } = await params;


    const categoryData = await prisma.category.findUnique({
        where: {
            slug: category.toLowerCase(),
        },
        include: {
            subcategories: true,
        },
    });


    if (!categoryData) {
        notFound();
    }


    return (
        <main className="max-w-5xl mx-auto px-8 py-8">

            <h1 className="text-3xl font-bold mb-6">
                Choose {categoryData.name}
            </h1>


            <div className="overflow-hidden rounded-lg border">

                <div className="bg-gray-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Subcategory
                </div>


                <div className="divide-y divide-gray-100">

                    {categoryData.subcategories.map((subcategory) => (

                        <Link
                            key={subcategory.id}
                            href={`/build/${id}/select/${categoryData.slug}/${subcategory.slug}`}
                            className="
        flex
        items-center
        justify-between
        px-5
        py-3
        hover:bg-gray-50
        transition
        "
                        >

                            <span className="font-semibold">
                                {subcategory.name}
                            </span>


                            <span className="text-sm text-gray-400">
                                Select →
                            </span>

                        </Link>

                    ))}

                </div>

            </div>

        </main>
    );
}