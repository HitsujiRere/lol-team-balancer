import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { tierToPoint } from "~/components/TierSelect";
import { summonersReducerAtom } from "~/stores/Summoner";
import { isRiotId, parseRiotId } from "~/utils/summoner";
import { summonerTierFamily } from "../stores/summonerTierFamily";

export const useFetchTiers = () =>
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

            const tier = await get(summonerTierFamily(riotId));
            if (tier === undefined) {
              return summoner.name;
            }

            set(summonersReducerAtom, {
              type: "update",
              name: summoner.name,
              changes: { tier, point: tierToPoint(tier) },
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
