import type { SummonerAttribute } from "./SummonerAttribute";

export type TeamPlan = {
  summoners: SummonerAttribute[];
  point: number;
  spread: number;
};
