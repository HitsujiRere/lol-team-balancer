import type { Tier } from "./Tier";

export type Summoner = {
  name: string;
  debug: boolean;
  isActive: boolean;
  tier: Tier;
  point: number;
  isMute: boolean;
  info?: {
    tier: Tier;
    wins: number;
    losses: number;
  };
};

export const newSummoner = (init?: Partial<Summoner>): Summoner => {
  return {
    name: "",
    debug: false,
    isActive: true,
    tier: "UNRANKED",
    point: 0,
    isMute: false,
    ...init,
  };
};
