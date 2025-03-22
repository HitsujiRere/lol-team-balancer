import type { Tier } from "~/types/Tier";

const contexts: Record<Tier, string> = {
  UNRANKED: "Unranked",
  IRON_IV: "Iron 4",
  IRON_III: "Iron 3",
  IRON_II: "Iron 2",
  IRON_I: "Iron 1",
  BRONZE_IV: "Bronze 4",
  BRONZE_III: "Bronze 3",
  BRONZE_II: "Bronze 2",
  BRONZE_I: "Bronze 1",
  SILVER_IV: "Silver 4",
  SILVER_III: "Silver 3",
  SILVER_II: "Silver 2",
  SILVER_I: "Silver 1",
  GOLD_IV: "Gold 4",
  GOLD_III: "Gold 3",
  GOLD_II: "Gold 2",
  GOLD_I: "Gold 1",
  PLATINUM_IV: "Platinum 4",
  PLATINUM_III: "Platinum 3",
  PLATINUM_II: "Platinum 2",
  PLATINUM_I: "Platinum 1",
  EMERALD_IV: "Emerald 4",
  EMERALD_III: "Emerald 3",
  EMERALD_II: "Emerald 2",
  EMERALD_I: "Emerald 1",
  DIAMOND_IV: "Diamond 4",
  DIAMOND_III: "Diamond 3",
  DIAMOND_II: "Diamond 2",
  DIAMOND_I: "Diamond 1",
  MASTER: "Master",
  GRANDMASTER: "Grandmaster",
  CHALLENGER: "Challenger",
};

export const tierContext = (tier: Tier): string => {
  return contexts[tier] ?? "不明ランク";
};
