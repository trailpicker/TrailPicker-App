import GearPicker, { type GearBrowseSearch } from "@/components/builder/GearPicker";
import ProductDetails from "@/components/gear/ProductDetails";
import { currentBuildUserId, findAccessibleBuild } from "@/lib/build-access";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function GearDetailPage({params,searchParams}:{params:Promise<{id:string}>;searchParams:Promise<GearBrowseSearch>}) {
  const {id}=await params;
  const category=await prisma.category.findUnique({where:{slug:id.toLowerCase()},select:{id:true}});
  if(category)return <GearPicker categorySlug={id} filters={await searchParams}/>;
  const gear=await prisma.gear.findUnique({where:{id},include:{brand:true,category:true,subcategory:true,images:{orderBy:[{isPrimary:"desc"},{id:"asc"}]},prices:{include:{retailer:true}},specifications:true,reviews:{orderBy:{createdAt:"desc"},include:{user:{select:{name:true,username:true}}}}}});
  if(!gear)notFound();
  const userId=await currentBuildUserId();
  const candidate=(await cookies()).get("currentBuild")?.value;
  const access=candidate?await findAccessibleBuild(candidate):null;
  const [owned,favorite,build]=await Promise.all([
    userId?prisma.ownedGear.findUnique({where:{userId_gearId:{userId,gearId:id}},select:{id:true}}):null,
    userId?prisma.favorite.findUnique({where:{userId_gearId:{userId,gearId:id}},select:{id:true}}):null,
    access?prisma.build.findUnique({where:{id:access.id,userId:access.userId},select:{id:true,name:true}}):null,
  ]);
  return <ProductDetails gear={gear} userId={userId} owned={Boolean(owned)} favorite={Boolean(favorite)} build={build}/>;
}
