import { useAtomCallback } from "jotai/utils";
import { Result, err, ok } from "neverthrow";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { tierToPoint } from "~/components/TierSelect";
import { summonersReducerAtom } from "~/stores/Summoner";
import { isRiotId } from "~/types/RiotId";
import { type Tier, TierList } from "~/types/Tier";
import { choice } from "~/utils/choise";
import { fetchSummonersLeagueEntries } from "../api/fetchSummonersLeagueEntries";

type SummonerInfo = {
  name: string;
  tier: Tier;
  wins?: number;
  losses?: number;
};

export const useFetchSummoners = () =>
  useAtomCallback(
    useCallback(async (get, set) => {
      const summoners = Object.values(get(summonersReducerAtom))
        .filter(
          (summoner) =>
            summoner.info === undefined &&
            summoner.isActive &&
            isRiotId(summoner.name) &&
            summoner.tier === "UNRANKED",
        )
        .splice(0, 15);

      if (summoners.length === 0) {
        return;
      }

      const debugSummonerInfos = summoners
        .filter((summoner) => summoner.debug)
        .map(
          (summoner): Result<SummonerInfo, never> =>
            ok({
              name: summoner.name,
              tier: choice(TierList),
              wins: Math.floor(Math.random() * 20),
              losses: Math.floor(Math.random() * 20),
            }),
        );

      const fetchedSummonerLeagueEntries = await fetchSummonersLeagueEntries(
        summoners
          .filter((summoner) => !summoner.debug)
          .map((summoner) => summoner.name),
      );
      if (fetchedSummonerLeagueEntries.isErr()) {
        toast.error(
          `ランクを検出できませんでした。：${fetchedSummonerLeagueEntries.error}`,
        );
        return;
      }

      const fetchedSummonerInfos = fetchedSummonerLeagueEntries
        ._unsafeUnwrap()
        .map((summoner): Result<SummonerInfo, string> => {
          if (summoner.leagueEntries === undefined) {
            return err(summoner.name);
          }

          const soloRanked = summoner.leagueEntries.find(
            (leagueEntry) => leagueEntry.queueType === "RANKED_SOLO_5x5",
          );
          if (soloRanked === undefined) {
            return ok({
              name: summoner.name,
              tier: "UNRANKED",
            });
          }

          const tier =
            soloRanked.tier === "MASTER" ||
            soloRanked.tier === "GRANDMASTER" ||
            soloRanked.tier === "CHALLENGER"
              ? soloRanked.tier
              : (`${soloRanked.tier}_${soloRanked.rank}` satisfies Tier);

          return ok({
            name: summoner.name,
            tier,
            wins: soloRanked.wins,
            losses: soloRanked.losses,
          });
        });

      const errors = [...debugSummonerInfos, ...fetchedSummonerInfos].map(
        (infos) =>
          infos.map((info) =>
            set(summonersReducerAtom, {
              type: "update",
              name: info.name,
              changes: {
                tier: info.tier,
                point: tierToPoint(info.tier),
                info: {
                  tier: info.tier,
                  wins: info.wins ?? 0,
                  losses: info.losses ?? 0,
                },
              },
            }),
          ),
      );

      Result.combineWithAllErrors(errors)
        .map(() => toast.success("ランクを検出しました！"))
        .mapErr((names) =>
          toast.error(`${names.join(",")}のランクを検出できませんでした。`),
        );
    }, []),
  );
