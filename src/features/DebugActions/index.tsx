"use client";

import { Bug } from "@phosphor-icons/react";
import { useSetAtom } from "jotai/react";
import React from "react";
import { summonersReducerAtom } from "/stores/Summoner";
import { newSummoner } from "/types/Summoner";
import { TierList } from "/types/Tier";

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
    <div className="flex gap-2">
      <button
        type="button"
        className="btn btn-accent"
        onClick={handleAddRandomSummoners}
      >
        <Bug />
        テスト: ランダムサモナー追加
      </button>
      <button
        type="button"
        className="btn btn-accent"
        onClick={handleAddLowRateSummoners}
      >
        <Bug />
        テスト: Unrank~Goldサモナー追加
      </button>
    </div>
  );
});
