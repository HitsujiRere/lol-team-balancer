import { type Tier, TierList } from "~/types/Tier";

export const tierToPoint = (tier: Tier, unrankedPoint: number): number => {
  if (tier === "Unranked") {
    return unrankedPoint;
  }
  return TierList.indexOf(tier);
};
