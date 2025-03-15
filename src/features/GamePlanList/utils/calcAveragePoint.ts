import type { Summoner } from "~/types/Summoner";
import { sumof } from "./sumof";
import { tierToPoint } from "./tierToPoint";

export const calcAveragePoint = (summoners: Summoner[]) => {
  const rankeds = summoners.filter((summoner) => summoner.tier !== "Unranked");

  if (rankeds.length === 0) {
    return 0;
  }

  return (
    sumof(rankeds.map((summoner) => tierToPoint(summoner.tier, 0))) /
    rankeds.length
  );
};
