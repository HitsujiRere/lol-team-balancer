import type { Summoner } from "..";

export const newSummoner = (): Summoner => {
  return {
    name: "",
    riotId: undefined,
    level: undefined,
    tier: undefined,
    isMute: false,
  };
};
