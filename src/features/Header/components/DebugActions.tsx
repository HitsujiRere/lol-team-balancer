"use client";

import { Bug } from "@phosphor-icons/react";
import React from "react";
import { useAddRandomSummoners } from "../hooks/useAddRandomSummoners";

export const DebugActions = React.memo(() => {
  const handleAddRandomSummoners = useAddRandomSummoners();

  return (
    <div>
      <details className="dropdown">
        <summary className="btn w-60">
          <Bug className="h-4 w-4" />
          デバッグ: サモナー追加
        </summary>
        <ul className="menu dropdown-content z-1 gap-2">
          <li>
            <button
              type="button"
              className="btn btn-accent"
              onClick={() => handleAddRandomSummoners("UNRANKED", "UNRANKED")}
            >
              UNRANKED
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
              onClick={() => handleAddRandomSummoners("UNRANKED", "GOLD_I")}
            >
              UNRANKED ~ GOLD_I
            </button>
          </li>
        </ul>
      </details>
    </div>
  );
});
