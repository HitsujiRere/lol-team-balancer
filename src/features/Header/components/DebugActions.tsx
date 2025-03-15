"use client";

import { Bug } from "@phosphor-icons/react";
import { useSetAtom } from "jotai/react";
import React from "react";
import { summonersReducerAtom } from "~/stores/Summoner";
import { newSummoner } from "~/types/Summoner";
import { TierList } from "~/types/Tier";

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

  const handleAddRandomSummoners = () => {
    updateSummoners({
      type: "addMany",
      summoners: debugSummoners.map((name) =>
        newSummoner({
          name: `${name} #JP0`,
          tier: TierList[Math.floor(Math.random() * TierList.length)],
        }),
      ),
    });
  };

  const handleAddLowRateSummoners = () => {
    updateSummoners({
      type: "addMany",
      summoners: debugSummoners.map((name) =>
        newSummoner({
          name: `${name} #JP0`,
          tier: TierList[Math.floor(Math.random() * 17)],
        }),
      ),
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
              onClick={handleAddRandomSummoners}
            >
              ランダム
            </button>
          </li>
          <li>
            <button
              type="button"
              className="btn btn-accent"
              onClick={handleAddLowRateSummoners}
            >
              Unranked ~ Gold
            </button>
          </li>
        </ul>
      </details>
    </div>
  );
});
