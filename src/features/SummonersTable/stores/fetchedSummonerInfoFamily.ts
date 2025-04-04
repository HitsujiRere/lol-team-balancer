import { atomFamily } from "jotai/utils";
import { atom } from "jotai/vanilla";
import type { RiotId } from "~/types/RiotId";
import type { Tier } from "~/types/Tier";
import { fetchLeagueEntries } from "../api/fetchLeagueEntries";

export type SummonerInfo = {
  tier: Tier;
  wins?: number;
  losses?: number;
};

export const fetchedSummonerInfoFamily = atomFamily(
  (riotId: RiotId) =>
    atom(async (): Promise<SummonerInfo | undefined> => {
      const leagueEntries = await fetchLeagueEntries(riotId);
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
