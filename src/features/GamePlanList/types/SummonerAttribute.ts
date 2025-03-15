import type { Summoner } from "/types/Summoner";
import { tierToPoint } from "../utils/tierToPoint";

export type SummonerAttribute = Pick<Summoner, "name" | "isMute"> & {
  point: number;
};

export const summonerAttributeFrom = (
  summoner: Summoner,
  unrankedPoint: number,
): SummonerAttribute => {
  return {
    name: summoner.name,
    isMute: summoner.isMute,
    point: tierToPoint(summoner.tier, unrankedPoint),
  };
};
