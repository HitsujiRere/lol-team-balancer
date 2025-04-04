import { isRiotId } from "~/types/RiotId";
import type { Summoner } from "~/types/Summoner";

export const toOpggAddress = (summoner: Summoner): string | undefined => {
  if (!isRiotId(summoner.name)) {
    return undefined;
  }

  return `https://www.op.gg/summoners/jp/${summoner.name.replace(/ ?#/, "-")}`;
};

export const toOpggAddressMulti = (
  summoners: Summoner[],
): string | undefined => {
  const names = summoners
    .filter((summoner) => isRiotId(summoner.name))
    .map((summoner) => summoner.name)
    // Opggマルチサーチは10人まで
    .slice(0, 10)
    .join(",");
  if (names === "") {
    return undefined;
  }
  return `https://www.op.gg/multisearch/jp?summoners=${encodeURIComponent(names)}`;
};
