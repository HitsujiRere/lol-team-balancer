import { useAtomCallback } from "jotai/utils";
import { ResultAsync, errAsync, okAsync } from "neverthrow";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { tierToPoint } from "~/components/TierSelect";
import { summonersReducerAtom } from "~/stores/Summoner";
import { isRiotId, parseToRiotId } from "~/types/RiotId";
import { TierList } from "~/types/Tier";
import { choice } from "~/utils/choise";
import {
  type SummonerInfo,
  fetchedSummonerInfoFamily,
} from "../stores/fetchedSummonerInfoFamily";

type FetchedInfo = SummonerInfo & {
  name: string;
};

export const useFetchSummoners = () =>
  useAtomCallback(
    useCallback(async (get, set) => {
      const infos = Object.values(get(summonersReducerAtom))
        .filter(
          (summoner) =>
            summoner.isActive &&
            summoner.tier === "UNRANKED" &&
            isRiotId(summoner.name),
        )
        .map((summoner): ResultAsync<FetchedInfo, string> => {
          if (summoner.debug) {
            const tier = choice(TierList);
            return okAsync({
              name: summoner.name,
              tier: tier,
              wins: Math.floor(Math.random() * 20),
              losses: Math.floor(Math.random() * 20),
            });
          }

          const riotId = parseToRiotId(summoner.name);
          if (riotId.isErr()) {
            return errAsync(summoner.name);
          }

          return ResultAsync.fromSafePromise(
            get(fetchedSummonerInfoFamily(riotId.value)),
          ).andThen((info) => {
            if (info) {
              return okAsync({ ...info, name: summoner.name });
            }
            return errAsync(summoner.name);
          });
        })
        .map((infos) =>
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

      ResultAsync.combineWithAllErrors(infos)
        .map(() => toast.success("ランクを検出しました！"))
        .mapErr((names) =>
          toast.error(`${names.join(",")}のランクを検出できませんでした。`),
        );
    }, []),
  );
