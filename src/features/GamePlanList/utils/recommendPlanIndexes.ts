import type { GamePlan } from "../types/GamePlan";
import { popcount } from "./popcount";

export const recommendPlanIndexes = (plans: GamePlan[]): number[] => {
  const idToIndex = Object.fromEntries(
    plans.map((plan, index) => [plan.id, index]),
  );
  const options2 = plans.flatMap((plan1, index1) =>
    findPlanIdsAtDistance3([plan1.id])
      .filter((id2) => idToIndex[id2] !== undefined)
      .map((id2) => [index1, idToIndex[id2]])
      .filter(([index1, index2]) => index1 < index2),
  );
  const options3 = options2.flatMap(([index1, index2]) =>
    findPlanIdsAtDistance3([plans[index1].id, plans[index2].id])
      .filter((id3) => idToIndex[id3] !== undefined)
      .map((id3) => [index1, index2, idToIndex[id3]])
      .filter(([_index1, index2, index3]) => index2 < index3),
  );
  if (options3.length === 0) {
    return [];
  }
  // 最も最大ポイント差が小さいものを選ぶ
  return options3
    .map((planindexes) => ({
      diffPoint: Math.max(
        ...planindexes.map((index) => plans[index].diffPoint),
      ),
      plan: planindexes,
    }))
    .reduce((min, cur) => {
      return cur.diffPoint < min.diffPoint ? cur : min;
    }).plan;
};

const findPlanIdsAtDistance3 = (sourceIds: number[]): number[] => {
  const planIds: number[] = [];
  for (let targetId = 0; targetId < 1 << 10; targetId++) {
    if (
      popcount(targetId) === 5 &&
      sourceIds.every((sourceId) => popcount(sourceId & targetId) === 2)
    ) {
      planIds.push(targetId);
    }
  }
  return planIds;
};
