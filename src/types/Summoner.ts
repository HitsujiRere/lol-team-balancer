import type { Tier } from "./Tier";

export type Summoner = {
  name: string;
  isActive: boolean;
  tier: Tier;
  point: number;
  isMute: boolean;
};

export const newSummoner = (init?: Partial<Summoner>): Summoner => {
  return {
    name: "",
    isActive: true,
    tier: "UNRANKED",
    point: 0,
    isMute: false,
    ...init,
  };
};
