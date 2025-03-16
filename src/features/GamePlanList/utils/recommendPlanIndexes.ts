import type { GamePlan } from "../types/GamePlan";
import { popcount } from "./popcount";

export const recommendPlanIndexes = (plans: GamePlan[]): number[] => {
  const idToIndex = Object.fromEntries(
    plans
      .filter((plan) => plan.diffPoint <= 8)
      .map((plan, index) => [plan.id, index]),
  );
  // おすすめの候補
  const index1 = 0;
  const id1 = plans[index1].id;
  const options = findPlanIdsAtDistance3([plans[index1].id]).flatMap((id2) => {
    const index2 = idToIndex[id2];
    if (index2 === undefined || index2 < index1) return [];
    return findPlanIdsAtDistance3([id1, id2]).flatMap((id3) => {
      const index3 = idToIndex[id3];
      if (index3 === undefined && index3 < index2) return [];
      return [
        {
          plans: [index1, index2, index3],
          diffPoint: Math.max(
            ...[index1, index2, index3].map((index) => plans[index].diffPoint),
          ),
        },
      ];
    });
  });
  if (options.length === 0) {
    return [];
  }
  // 最大ポイント差が最も小さいものを選ぶ
  return options.reduce((min, cur) => {
    return cur.diffPoint < min.diffPoint ? cur : min;
  }).plans;
};

const findPlanIdsAtDistance3 = (sourceIds: number[]): number[] => {
  const planIds: number[] = [];
  for (let targetId = 0; targetId < 1 << 10; targetId++) {
    // xからの距離が3のプランyは，|1_x \cup 1_y|=2である
    if (
      popcount(targetId) === 5 &&
      sourceIds.every((sourceId) => popcount(sourceId & targetId) === 2)
    ) {
      planIds.push(targetId);
    }
  }
  return planIds;
};
