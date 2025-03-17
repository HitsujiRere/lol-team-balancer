"use client";

import { Bug } from "@phosphor-icons/react";
import { useSetAtom } from "jotai/react";
import React from "react";
import { tierToPoint } from "~/components/TierSelect";
import { summonersReducerAtom } from "~/stores/Summoner";
import { newSummoner } from "~/types/Summoner";
import { type Tier, TierList } from "~/types/Tier";
import { choice } from "../utils/choise";

const debugSummoners = [
  "りんご",
  "バナナ",
  "ぶどう",
  "いちご",
  "みかん",
  "スイカ",
  "もも",
  "パイナップル",
  "さくらんぼ",
  "マンゴー",
] as const;

export const DebugActions = React.memo(() => {
  const updateSummoners = useSetAtom(summonersReducerAtom);

  const handleAddRandomSummoners = (
    first: Tier = "Unranked",
    last: Tier = "Challenger",
  ) => {
    const firstIndex = TierList.indexOf(first);
    const lastIndex = TierList.indexOf(last);
    updateSummoners({
      type: "addMany",
      summoners: debugSummoners.map((name) => {
        const tier = choice(TierList.slice(firstIndex, lastIndex + 1));
        return newSummoner({
          name: `${name} #JP0`,
          tier,
          point: tierToPoint(tier),
        });
      }),
    });
  };

  return (
    <div>
      <details className="dropdown">
        <summary className="btn w-full">
          <Bug className="h-4 w-4" />
          デバッグ: サモナー追加
        </summary>
        <ul className="menu dropdown-content z-1 gap-2 backdrop-blur">
          <li>
            <button
              type="button"
              className="btn btn-accent"
              onClick={() => handleAddRandomSummoners("Unranked", "Unranked")}
            >
              Unranked
            </button>
          </li>
          <li>
            <button
              type="button"
              className="btn btn-accent"
              onClick={() => handleAddRandomSummoners()}
            >
              ランダム
            </button>
          </li>
          <li>
            <button
              type="button"
              className="btn btn-accent"
              onClick={() => handleAddRandomSummoners("Unranked", "Gold 1")}
            >
              Unranked ~ Gold
            </button>
          </li>
        </ul>
      </details>
    </div>
  );
});
