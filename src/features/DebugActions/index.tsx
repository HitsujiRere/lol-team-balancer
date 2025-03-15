"use client";

import { useSetAtom } from "jotai/react";
import React from "react";
import { summonersReducerAtom } from "/stores/Summoner";
import { newSummoner } from "/types/Summoner";
import { TierList } from "/types/Tier";
import { Bug } from "@phosphor-icons/react";

export const DebugActions = React.memo(() => {
  const updateSummoners = useSetAtom(summonersReducerAtom);

  const handleAddSummoners = () => {
    updateSummoners({
      type: "addMany",
      summoners: "ABCDEFGHIJ".split("").map((name) =>
        newSummoner({
          name,
          tier: TierList[Math.floor(Math.random() * TierList.length)],
        }),
      ),
    });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-accent"
        onClick={handleAddSummoners}
      >
        <Bug />
        テストサモナー追加
      </button>
    </div>
  );
});
