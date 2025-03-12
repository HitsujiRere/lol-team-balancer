import type { Summoner } from "../types/Summoner";

export const newSummoner = (init?: Partial<Summoner>): Summoner => {
  return {
    name: "",
    isActive: true,
    tier: "Unranked",
    isMute: false,
    ...init,
  };
};

export const toOpggAddress = (summoner: Summoner) => {
  return `https://www.op.gg/summoners/jp/${summoner.name.replace(" #", "-")}`;
};
