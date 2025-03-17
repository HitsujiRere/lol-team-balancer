import type { Summoner } from "~/types/Summoner";

export type TeamPlan = {
  summoners: Summoner[];
  point: number;
  spread: number;
};
