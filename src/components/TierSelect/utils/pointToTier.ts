import { type Tier, TierList } from "~/types/Tier";

export const pointToTier = (point: number): Tier => {
  return TierList[Math.round(point)];
};
