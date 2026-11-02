/** Explicit, editable mass assumptions. Not nutrition, fuel, or hydration advice. */
export type ConsumableDay = {
  day: number;
  startingGrams: number;
  addedGrams: number;
  usedGrams: number;
  remainingGrams: number;
  unmetGrams: number;
};

export function projectConsumableLoad(
  startingGrams: number,
  days: number,
  dailyUseGrams: number,
  resupplyDay: number | null = null,
  resupplyGrams = 0,
): ConsumableDay[] {
  if (![startingGrams,days,dailyUseGrams,resupplyGrams].every(Number.isFinite) ||
      startingGrams<0 || startingGrams>Number.MAX_SAFE_INTEGER ||
      !Number.isInteger(days) || days<1 || days>31 ||
      dailyUseGrams<0 || dailyUseGrams>100_000 ||
      resupplyGrams<0 || resupplyGrams>1_000_000 ||
      (resupplyDay!==null && (!Number.isInteger(resupplyDay)||resupplyDay<2||resupplyDay>days))) {
    throw new Error('Invalid consumable timeline parameters.');
  }
  const result: ConsumableDay[]=[];
  let remaining=startingGrams;
  for(let day=1;day<=days;day++){
    const addedGrams=day===resupplyDay?resupplyGrams:0;
    const starting=remaining;
    const available=starting+addedGrams;
    const used=Math.min(dailyUseGrams,available);
    remaining=available-used;
    result.push({day,startingGrams:starting,addedGrams,usedGrams:used,remainingGrams:remaining,unmetGrams:Math.max(0,dailyUseGrams-used)});
  }
  return result;
}
