import { atomFamily } from "jotai/utils";
import { atom } from "jotai/vanilla";
import { apikeyAtom } from "~/stores/debug/apikey";
import type { Tier } from "~/types/Tier";
import { fetchAccount } from "../api/fetchAccount";
import { fetchLeagueEntries } from "../api/fetchLeagueEntries";

type SummonerInfo = {
  tier: Tier;
  wins?: number;
  losses?: number;
};

export const fetchedSummonerInfoFamily = atomFamily(
  ({ gameName, tagLine }: { gameName: string; tagLine: string }) =>
    atom(async (get): Promise<SummonerInfo | undefined> => {
      const apikey = get(apikeyAtom);
      if (apikey === "") {
        return undefined;
      }

      const account = await fetchAccount(apikey, { gameName, tagLine });
      if (account === undefined) {
        return undefined;
      }

      const leagueEntries = await fetchLeagueEntries(apikey, {
        puuid: account.puuid,
      });
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
