import Link from "next/link";
import { ArrowUpRight, Star, Scale } from "lucide-react";
import ProductGallery from "@/components/gear/ProductGallery";
import GearLibraryActions from "@/components/gear/GearLibraryActions";
import ReviewEditor from "@/components/gear/ReviewEditor";
import ProductBuildButton from "@/components/gear/ProductBuildButton";
import { gearMoney, gearWeight, reviewStats, safeGearUrl } from "@/lib/gear-display";

export type Product = {
  id:string;name:string;description:string|null;weight_g:number|null;price_cad:number|null;capacity_l:number|null;frame_type:string|null;waterproof:boolean|null;temperature_rating:number|null;season:string|null;material:string|null;
  brand:{name:string};category:{name:string;slug:string};subcategory:{name:string;slug:string}|null;
  images:Array<{id:string;url:string;isPrimary:boolean}>;
  specifications:Array<{id:string;key:string;value:string;unit:string|null}>;
  prices:Array<{id:string;price:number;currency:string;url:string|null;inStock:boolean;lastUpdated:Date;retailer:{name:string}}>;
  reviews:Array<{id:string;userId:string;rating:number;title:string|null;body:string|null;createdAt:Date;user:{name:string|null;username:string|null}}>;
};
function Stars({rating}:{rating:number}){return <span aria-label={`${rating} out of 5 stars`} className="inline-flex gap-0.5">{[1,2,3,4,5].map(n=><Star key={n} aria-hidden="true" className={`h-3.5 w-3.5 ${n<=rating?"fill-amber-400 text-amber-400":"text-gray-200"}`}/>)}</span>;}
const date=(value:Date)=>value.toLocaleDateString("en-CA",{year:"numeric",month:"short",day:"numeric",timeZone:"UTC"});

export default function ProductDetails({gear,userId,owned,favorite,build}:{gear:Product;userId:string|null;owned:boolean;favorite:boolean;build:{id:string;name:string}|null}) {
  const stats=reviewStats(gear.reviews);
  const ownReview=gear.reviews.find(review=>review.userId===userId)??null;
  const prices=[...gear.prices].sort((a,b)=>Number(b.currency==="CAD")-Number(a.currency==="CAD")||Number(b.inStock)-Number(a.inStock)||a.price-b.price);
  const cadPrices=prices.filter(price=>price.currency==="CAD"&&price.inStock);
  const best=cadPrices[0]?.price??gear.price_cad;
  const categoryHref=`/gear/${encodeURIComponent(gear.category.slug)}`;
  const specs:Array<[string,string]>=[];
  if(gear.weight_g!==null)specs.push(["Weight",gearWeight(gear.weight_g)]);
  if(gear.capacity_l!==null)specs.push(["Capacity",`${gear.capacity_l} L`]);
  if(gear.frame_type)specs.push(["Frame",gear.frame_type]);
  if(gear.waterproof!==null)specs.push(["Waterproof",gear.waterproof?"Yes":"No"]);
  if(gear.temperature_rating!==null)specs.push(["Temperature rating",`${gear.temperature_rating} °C`]);
  if(gear.season)specs.push(["Season",gear.season]);
  if(gear.material)specs.push(["Material",gear.material]);
  for(const spec of gear.specifications){if(!specs.some(([key])=>key.toLowerCase()===spec.key.toLowerCase()))specs.push([spec.key,`${spec.value}${spec.unit?` ${spec.unit}`:""}`]);}
  return <div className="min-h-screen bg-gray-50"><main className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-8">
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-xs text-gray-500"><Link href={categoryHref} className="hover:text-green-800">{gear.category.name}</Link>{gear.subcategory&&<><span aria-hidden="true">/</span><Link href={`${categoryHref}/${encodeURIComponent(gear.subcategory.slug)}`} className="hover:text-green-800">{gear.subcategory.name}</Link></>}<span aria-hidden="true">/</span><span aria-current="page" className="text-gray-800">{gear.name}</span></nav>
    <div className="grid items-start gap-7 md:grid-cols-2 lg:gap-12">
      <ProductGallery name={gear.name} images={gear.images}/>
      <div className="min-w-0 py-2"><p className="text-xs font-semibold uppercase tracking-wider text-green-800">{gear.brand.name}</p><h1 className="mt-2 break-words text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">{gear.name}</h1><p className="mt-2 text-sm text-gray-500">{gear.subcategory?.name??gear.category.name}</p>
        <Link href="#reviews" className="mt-4 inline-flex items-center gap-2 text-sm hover:underline"><Star className="h-4 w-4 fill-amber-400 text-amber-400"/>{stats.count?<><b>{stats.average.toFixed(1)}</b><span className="text-gray-500">({stats.count} review{stats.count===1?"":"s"})</span></>:<span className="text-gray-500">No reviews yet</span>}</Link>
        <div className="mt-6 border-y border-gray-200 py-5"><p className="text-3xl font-bold tracking-tight">{gearMoney(best)}</p><p className="mt-1 text-xs text-gray-500">{cadPrices.length?"Lowest listed in-stock CAD offer. Shipping and taxes may vary.":best!==null?"Catalog price · retailer prices may vary":"No price has been added for this product."}</p><p className="mt-4 flex items-center gap-2 text-sm text-gray-600"><Scale className="h-4 w-4"/>{gearWeight(gear.weight_g)}</p></div>
        <div className="mt-5">{build?<><p className="mb-2 text-xs text-gray-500">Adding to <Link href={`/build/${build.id}`} className="font-medium text-green-800 hover:underline">{build.name}</Link></p><ProductBuildButton buildId={build.id} gearId={gear.id}/></>:<Link href="/build" className="inline-flex w-full justify-center rounded-lg bg-green-900 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800">Create a build</Link>}</div>
        <div className="mt-3"><GearLibraryActions gearId={gear.id} signedIn={Boolean(userId)} owned={owned} favorite={favorite}/></div>
        <div className="mt-5 flex flex-wrap gap-4 text-xs text-gray-500"><Link href="/profile/gear" className="hover:text-green-800">My Gear</Link><Link href="/profile/favorites" className="hover:text-green-800">Favorites</Link><Link href="#retailers" className="hover:text-green-800">Compare prices</Link><Link href="#specifications" className="hover:text-green-800">Specifications</Link></div>
      </div>
    </div>
    <div className="mt-9 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section id="retailers" className="scroll-mt-20 overflow-hidden rounded-xl border border-gray-200 bg-white"><div className="border-b border-gray-100 px-5 py-4"><h2 className="text-lg font-semibold">Compare prices</h2><p className="mt-1 text-xs text-gray-500">Listed offers, with each retailer’s currency and availability.</p></div>{prices.length?<ul className="divide-y divide-gray-100">{prices.map(price=>{const url=safeGearUrl(price.url);return <li key={price.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"><div className="min-w-0"><p className="font-medium">{price.retailer.name}</p><p className="mt-1 text-xs text-gray-500"><span className={price.inStock?"text-green-700":"text-gray-500"}>{price.inStock?"Listed in stock":"Out of stock"}</span> · Updated {date(price.lastUpdated)}</p></div><div className="flex items-center gap-3"><b className="text-sm">{gearMoney(price.price,price.currency)}</b>{url?<a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold hover:bg-gray-50">View <ArrowUpRight className="h-3 w-3"/></a>:<span className="text-xs text-gray-400">No link</span>}</div></li>})}</ul>:<p className="p-5 text-sm text-gray-500">No retailer offers yet.</p>}</section>
      <section id="specifications" className="scroll-mt-20 overflow-hidden rounded-xl border border-gray-200 bg-white"><h2 className="border-b border-gray-100 px-5 py-4 text-lg font-semibold">Specifications</h2>{specs.length?<dl className="divide-y divide-gray-100">{specs.map(([key,value])=><div key={key} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 px-5 py-3 text-sm"><dt className="text-gray-500">{key}</dt><dd className="break-words font-medium">{value}</dd></div>)}</dl>:<p className="p-5 text-sm text-gray-500">No specifications yet.</p>}</section>
    </div>
    {gear.description&&<section className="mt-6 rounded-xl border border-gray-200 bg-white p-5 sm:p-6"><h2 className="text-lg font-semibold">About this product</h2><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-gray-600">{gear.description}</p></section>}
    <section id="reviews" className="mt-6 scroll-mt-20 rounded-xl border border-gray-200 bg-white p-5 sm:p-6"><h2 className="text-lg font-semibold">Community reviews</h2><div className="mt-5 grid items-start gap-7 lg:grid-cols-[260px_minmax(0,1fr)]">
      <div>{stats.count?<><p className="text-4xl font-bold">{stats.average.toFixed(1)}<span className="ml-2 text-sm font-normal text-gray-400">/ 5</span></p><p className="mt-1 text-xs text-gray-500">Based on {stats.count} review{stats.count===1?"":"s"}</p><div className="mt-4 space-y-2">{stats.buckets.map(bucket=><div key={bucket.rating} className="flex items-center gap-2 text-xs text-gray-500"><span>{bucket.rating} star</span><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100"><div className="h-full bg-amber-400" style={{width:`${bucket.count/stats.count*100}%`}}/></div><span className="w-4 text-right">{bucket.count}</span></div>)}</div></>:<p className="text-sm text-gray-500">Be the first to review this gear.</p>}<p className="mt-5 text-xs leading-5 text-gray-400">Ratings are from TrailPicker members.</p></div>
      <div className="min-w-0">{userId?<ReviewEditor key={ownReview?.id??"new"} gearId={gear.id} review={ownReview}/>:<p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600"><Link href={`/api/auth/signin?callbackUrl=${encodeURIComponent(`/gear/${gear.id}#reviews`)}`} className="font-semibold text-green-800 hover:underline">Sign in</Link> to write a review.</p>}
        <div className="mt-5 divide-y divide-gray-100">{gear.reviews.map(review=><article key={review.id} className="py-5"><div className="flex flex-wrap items-center justify-between gap-2"><span className="text-sm font-semibold">{review.user.username?`@${review.user.username}`:review.user.name??"TrailPicker member"}{review.userId===userId&&<span className="ml-2 text-xs font-normal text-green-700">You</span>}</span><span className="text-xs text-gray-400">{date(review.createdAt)}</span></div><div className="mt-2"><Stars rating={review.rating}/></div>{review.title&&<h3 className="mt-2 break-words text-sm font-semibold">{review.title}</h3>}{review.body&&<p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-gray-600">{review.body}</p>}</article>)}</div>
      </div>
    </div></section>
  </main></div>;
}
