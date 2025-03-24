import { atomFamily } from "jotai/utils";
import { atom } from "jotai/vanilla";
import type { Tier } from "~/types/Tier";
import { fetchLeagueEntries } from "../api/fetchLeagueEntries";

type SummonerInfo = {
  tier: Tier;
  wins?: number;
  losses?: number;
};

export const fetchedSummonerInfoFamily = atomFamily(
  ({ gameName, tagLine }: { gameName: string; tagLine: string }) =>
    atom(async (): Promise<SummonerInfo | undefined> => {
      const leagueEntries = await fetchLeagueEntries(gameName, tagLine);
      console.log({ gameName, tagLine, leagueEntries });
      if (leagueEntries === undefined) {
        return undefined;
      }

      const soloRanked = leagueEntries.find(
        (leagueEntry) => leagueEntry.queueType === "RANKED_SOLO_5x5",
      );
      if (soloRanked === undefined) {
        return {
          tier: "UNRANKED",
        };
      }

      const tier =
        soloRanked.tier === "MASTER" ||
        soloRanked.tier === "GRANDMASTER" ||
        soloRanked.tier === "CHALLENGER"
          ? soloRanked.tier
          : (`${soloRanked.tier}_${soloRanked.rank}` satisfies Tier);

      return {
        tier,
        wins: soloRanked.wins,
        losses: soloRanked.losses,
      };
    }),
  (a, b) => a.gameName === b.gameName && a.tagLine === b.tagLine,
);
