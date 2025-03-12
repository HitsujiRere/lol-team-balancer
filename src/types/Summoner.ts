import type { Tier } from "./Tier";

export type Summoner = {
  name: string;
  isActive: boolean;
  tier: Tier;
  isMute: boolean;
};
