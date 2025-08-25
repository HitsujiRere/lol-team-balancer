import type { Summoner } from "..";

export const newSummoner = (): Summoner => {
  return {
    name: "",
    riotId: undefined,
    lv: undefined,
    tier: undefined,
    isMute: false,
  };
};
