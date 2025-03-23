import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { tierToPoint } from "~/components/TierSelect";
import { summonersReducerAtom } from "~/stores/Summoner";
import { isRiotId, parseRiotId } from "~/utils/summoner";
import { fetchedSummonerInfoFamily } from "../stores/fetchedSummonerInfoFamily";

export const useFetchSummoners = () =>
  useAtomCallback(
    useCallback(async (get, set) => {
      Promise.all(
        Object.values(get(summonersReducerAtom))
          .filter(
            (summoner) =>
              summoner.isActive &&
              summoner.tier === "UNRANKED" &&
              isRiotId(summoner.name),
          )
          .map(async (summoner) => {
            const riotId = parseRiotId(summoner.name);
            if (riotId === undefined) return summoner.name;

            const info = await get(fetchedSummonerInfoFamily(riotId));
            if (info === undefined) {
              return summoner.name;
            }

            set(summonersReducerAtom, {
              type: "update",
              name: summoner.name,
              changes: {
                tier: info.tier,
                point: tierToPoint(info.tier),
                info: {
                  tier: info.tier,
                  wins: info.wins ?? 0,
                  losses: info.losses ?? 0,
                },
              },
            });
          }),
      ).then((err) => {
        console.log(err);
        const names = err.filter((err) => err !== undefined);
        if (names.length > 0) {
          toast.error(`${names.join(",")}のランクを検出できませんでした。`);
        } else {
          toast.success("ランクを検出しました！");
        }
      });
    }, []),
  );
