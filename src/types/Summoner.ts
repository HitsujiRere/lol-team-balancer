import type { Tier } from "./Tier";

export type Summoner = {
  name: string;
  isActive: boolean;
  tier: Tier;
  isMute: boolean;
};

export const newSummoner = (init?: Partial<Summoner>): Summoner => {
  return {
    name: "",
    isActive: true,
    tier: "Unranked",
    isMute: false,
    ...init,
  };
};
