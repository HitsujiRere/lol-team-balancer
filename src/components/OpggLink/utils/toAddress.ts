import type { Summoner } from "~/types/Summoner";

export const toAddress = (summoner: Summoner): string | undefined => {
  if (!/^.+ ?#.+$/.test(summoner.name)) {
    return undefined;
  }

  return `https://www.op.gg/summoners/jp/${summoner.name.replace(/ ?#/, "-")}`;
};
