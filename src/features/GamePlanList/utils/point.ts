import type { Summoner } from "~/types/Summoner";
import { sumof } from "./sumof";

export const calcSumPoint = (summoners: Summoner[]) =>
  sumof(summoners.map((summoner) => summoner.point));

export const calcAveragePoint = (summoners: Summoner[]) => {
  if (summoners.length === 0) return 0;
  const average = calcSumPoint(summoners) / summoners.length;
  return Math.round(average * 10) / 10;
};

export const calcSpreadPoint = (summoners: Summoner[]) => {
  if (summoners.length === 0) return 0;
  const average = calcAveragePoint(summoners);
  const spread =
    sumof(summoners.map((summoner) => (summoner.point - average) ** 2)) /
    summoners.length;
  return Math.round(spread * 10) / 10;
};
