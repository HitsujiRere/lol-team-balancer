"use client";

import { Bug } from "@phosphor-icons/react";
import React from "react";
import { useAddRandomSummoners } from "../hooks/useAddRandomSummoners";

export const DebugDropdown = React.memo(() => {
  const handleAddRandomSummoners = useAddRandomSummoners();

  return (
    <details className="dropdown">
      <summary className="btn">
        <Bug className="h-4 w-4" />
        デバッグ: サモナー追加
      </summary>
      <ul className="menu dropdown-content right-0 z-1 mt-2 w-52 gap-2 rounded-box border border-base-content/20 bg-base-200 shadow">
        <li>
          <button
            type="button"
            onClick={() => handleAddRandomSummoners("UNRANKED", "UNRANKED")}
          >
            UNRANKED
          </button>
        </li>
        <li>
          <button type="button" onClick={() => handleAddRandomSummoners()}>
            ランダム
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => handleAddRandomSummoners("UNRANKED", "GOLD_I")}
          >
            UNRANKED ~ GOLD_I
          </button>
        </li>
      </ul>
    </details>
  );
});
