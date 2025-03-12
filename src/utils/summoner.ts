import type { Summoner } from "../types/Summoner";

export const newSummoner = (init?: Partial<Summoner>): Summoner => {
  return {
    name: "",
    ...init,
  };
};
