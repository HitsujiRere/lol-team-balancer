import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { tierToPoint } from "~/components/TierSelect";
import { summonersReducerAtom } from "~/stores/Summoner";
import { newSummoner } from "~/types/Summoner";
import { type Tier, TierList } from "~/types/Tier";
import { choice } from "../utils/choise";

const debugSummonerNames = [
  "りんご #JP0",
  "バナナ #JP0",
  "ぶどう #JP0",
  "いちご #JP0",
  "みかん #JP0",
  "スイカ #JP0",
  "もも #JP0",
  "パイナップル #JP0",
  "さくらんぼ #JP0",
  "マンゴー #JP0",
] as const;

export const useAddRandomSummoners = () =>
  useAtomCallback(
    useCallback(
      (_get, set, first: Tier = "UNRANKED", last: Tier = "CHALLENGER") => {
        const firstIndex = TierList.indexOf(first);
        const lastIndex = TierList.indexOf(last);
        set(summonersReducerAtom, {
          type: "addMany",
          summoners: debugSummonerNames.map((name) => {
            const tier = choice(TierList.slice(firstIndex, lastIndex + 1));
            return newSummoner({
              name,
              tier,
              point: tierToPoint(tier),
            });
          }),
        });
      },
      [],
    ),
  );
