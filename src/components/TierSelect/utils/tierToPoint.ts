import { type Tier, TierList } from "~/types/Tier";

export const tierToPoint = (tier: Tier): number => {
  return TierList.indexOf(tier);
};
