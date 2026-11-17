import {notFound} from "next/navigation";
import {prisma} from "@/lib/prisma";
import {currentBuildUserId} from "@/lib/build-access";
import {evaluateCompatibility, type CompatItem} from "@/lib/compatibility";
import PublicPackDetail from "@/components/discover/PublicPackDetail";
import {getDestination} from "@/lib/destinations";
import {findRelatedPublicContent} from "@/lib/discover-related-query";

export default async function PublicPackPage({params}:{params:Promise<{id:string}>}) {
  const {id}=await params;
  if (!id || id.length>200) notFound();
  const pack=await prisma.build.findFirst({
    where:{id,isPublic:true,items:{some:{}}},
    select:{
      id:true,name:true,location:true,destinationId:true,people:true,createdAt:true,updatedAt:true,
      minTemperature:true,conditions:true,startDate:true,endDate:true,
      user:{select:{name:true,username:true,isProfilePublic:true}},
      _count:{select:{savedBy:true}},
      items:{select:{id:true,quantity:true,isWorn:true,isConsumable:true,customCategory:true,gearNameSnapshot:true,weightSnapshot:true,priceSnapshot:true,
        gear:{select:{id:true,name:true,description:true,weight_g:true,price_cad:true,capacity_l:true,frame_type:true,waterproof:true,temperature_rating:true,season:true,
          brand:{select:{name:true}},category:{select:{name:true}},subcategory:{select:{name:true,slug:true}},
          specifications:{select:{key:true,value:true,unit:true}},
        }},
      }},
      days:{select:{minTemperature:true,conditions:true,campsite:true,waterCarryL:true,waterSource:true}},
    },
  });
  if (!pack) notFound();
  const related=await findRelatedPublicContent(pack.destinationId,{excludeBuildId:pack.id,limit:3});
  const userId=await currentBuildUserId();
  const saved=userId?Boolean(await prisma.savedBuild.findUnique({where:{userId_buildId:{userId,buildId:pack.id}},select:{buildId:true}})):false;
  const items:CompatItem[]=pack.items.map(item=>({
    id:item.id,quantity:item.quantity,isWorn:item.isWorn,isConsumable:item.isConsumable,
    customCategory:item.customCategory,gearNameSnapshot:item.gearNameSnapshot,
    weightSnapshot:item.weightSnapshot,priceSnapshot:item.priceSnapshot,
    gear:item.gear?{
      id:item.gear.id,name:item.gear.name,weight_g:item.gear.weight_g,price_cad:item.gear.price_cad,
      capacity_l:item.gear.capacity_l,frame_type:item.gear.frame_type,waterproof:item.gear.waterproof,
      temperature_rating:item.gear.temperature_rating,season:item.gear.season,
      category:item.gear.category,subcategory:item.gear.subcategory,specifications:item.gear.specifications,
    }:null,
  }));
  const issues=evaluateCompatibility({people:pack.people,minTemperature:pack.minTemperature,
    conditions:pack.conditions,startDate:pack.startDate,endDate:pack.endDate},items,pack.days);
  return <PublicPackDetail pack={{id:pack.id,name:pack.name,location:pack.location,people:pack.people,
    createdAt:pack.createdAt,updatedAt:pack.updatedAt,
    author:pack.user?.isProfilePublic?(pack.user.username||pack.user.name||"Community member"):"Community member",
    items:pack.items,saves:pack._count.savedBy,
  }} issues={issues} saved={saved} signedIn={Boolean(userId)} destination={getDestination(pack.destinationId)}
    hasTrip={pack.days.length>0} related={related}/>;
}
