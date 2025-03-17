"use client";

import {
  CaretLeft,
  CaretRight,
  Copy,
  Flag,
  Users,
} from "@phosphor-icons/react";
import classNames from "classnames";
import { useAtom } from "jotai/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { summonersReducerAtom } from "~/stores/Summoner";
import { GameCards } from "./components/GameCards";
import type { GamePlan } from "./types/GamePlan";
import { makePlans } from "./utils/makePlans";
import { calcAveragePoint } from "./utils/point";
import { recommendPlanIndexes } from "./utils/recommendPlanIndexes";

export const GamePlanList = () => {
  const [summoners, updateSummoners] = useAtom(summonersReducerAtom);

  const activeSummoners = Object.values(summoners).filter(
    (summoner) => summoner.isActive,
  );

  const [plans, setPlans] = useState<GamePlan[]>([]);
  const planCount = () => plans.length;

  const [selectedPlanIndex, selectPlanIndex] = useState(0);
  const incSelectPlanIndex = () =>
    selectPlanIndex((prev) => (prev + 1) % planCount());
  const decSelectPlanIndex = () =>
    selectPlanIndex((prev) => (prev + planCount() - 1) % planCount());

  const [recommnedPlans, setRecommendPlans] = useState<number[]>([]);

  const handleMakePlans = () => {
    const averagePoint = calcAveragePoint(
      activeSummoners.filter((summoner) => summoner.tier !== "Unranked"),
    );
    updateSummoners({
      type: "updateMany",
      names: activeSummoners
        .filter((summoner) => summoner.tier === "Unranked")
        .map((summoner) => summoner.name),
      changes: { point: averagePoint },
    });

    const plans = makePlans(
      activeSummoners.map((summoner) => {
        if (summoner.tier === "Unranked") {
          return { ...summoner, point: averagePoint };
        }
        return summoner;
      }),
    );
    setPlans(plans);

    selectPlanIndex(0);

    const recommend = recommendPlanIndexes(plans);
    setRecommendPlans(recommend);

    toast.success("チーム分けをしました。");
  };

  const handleCopyPlan = () => {
    const plan = plans[selectedPlanIndex];
    if (plan === undefined) {
      return;
    }
    const blueNames = plan.blue.summoners
      .map((summoner) => summoner.name)
      .join("\n");
    const redNames = plan.red.summoners
      .map((summoner) => summoner.name)
      .join("\n");
    navigator.clipboard.writeText(
      `--- チーム1 ---\n${blueNames}\n--- チーム2 ---\n${redNames}`,
    );

    toast.success("結果をコピーしました。");
  };

  return (
    <div>
      <h2 className="mb-2 flex items-center gap-2 text-xl">
        <Users />
        <span>チーム分け</span>
      </h2>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn"
            disabled={activeSummoners.length !== 10}
            onClick={handleMakePlans}
          >
            <Flag className="h-4 w-4" />
            チーム分け ({activeSummoners.length}/10)
          </button>

          <button
            type="button"
            className="btn"
            disabled={plans.length === 0}
            onClick={handleCopyPlan}
          >
            <Copy className="h-4 w-4" />
            結果をコピー
          </button>
        </div>

        {plans.length > 0 && (
          <>
            <div className="flex gap-2">
              <div className="join">
                <button
                  type="button"
                  className="join-item btn"
                  onClick={decSelectPlanIndex}
                >
                  <CaretLeft />
                </button>
                <button type="button" className="join-item btn w-24">
                  {selectedPlanIndex + 1} / {planCount()}
                </button>
                <button
                  type="button"
                  className="join-item btn"
                  onClick={incSelectPlanIndex}
                >
                  <CaretRight />
                </button>
              </div>

              <div className="join">
                {recommnedPlans.map((planindex, index) => (
                  <button
                    key={planindex}
                    type="button"
                    className={classNames("join-item btn", {
                      "btn-active": planindex === selectedPlanIndex,
                    })}
                    onClick={() => selectPlanIndex(planindex)}
                  >
                    おすすめ {index + 1}
                  </button>
                ))}
              </div>
            </div>

            <GameCards plan={plans[selectedPlanIndex]} />
          </>
        )}
      </div>
    </div>
  );
};
