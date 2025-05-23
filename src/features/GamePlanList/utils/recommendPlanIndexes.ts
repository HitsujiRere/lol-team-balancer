import type { GamePlan } from "../types/GamePlan";
import { popcount } from "./popcount";

export const recommendPlanIndexes = (plans: GamePlan[]): number[] => {
  const idToIndex = Object.fromEntries(
    plans.map((plan, index) => [plan.id, index]),
  );
  const index1 = 0;
  const id1 = plans[index1].id;
  const farthestPlanIds = findFarthestPlanIds(id1).filter(
    (id) => idToIndex[id] !== undefined,
  );
  // おすすめの候補
  const options = farthestPlanIds.flatMap((id2) => {
    const index2 = idToIndex[id2];
    return farthestPlanIds.flatMap((id3) => {
      const index3 = idToIndex[id3];
      if (index3 <= index2 || !isFarthest(id2, id3)) {
        return [];
      }
      return [
        {
          plans: [index1, index2, index3],
          maxDiffPoint: Math.max(
            ...[index1, index2, index3].map((index) => plans[index].diffPoint),
          ),
        },
      ];
    });
  });
  if (options.length === 0) {
    return [index1];
  }
  // 最大ポイント差が最も小さいものを選ぶ
  return options.reduce((min, cur) => {
    return cur.maxDiffPoint < min.maxDiffPoint ? cur : min;
  }).plans;
};

// プラン x から最も遠いプランとの距離は 3 である
// またプラン x,y に対して，xy 間の距離が 3 であるとき，またその時に限り |1_id_x \cup 1_id_y| = 2 を満たす
const isFarthest = (sourceId: number, targetId: number): boolean =>
  popcount(sourceId & targetId) === 2;

// sourceIdから最も遠いプランのIdを見つける
const findFarthestPlanIds = (sourceId: number): number[] => {
  const planIds: number[] = [];
  for (let targetId = 0; targetId < 1 << 10; targetId++) {
    if (popcount(targetId) === 5 && isFarthest(sourceId, targetId)) {
      planIds.push(targetId);
    }
  }
  return planIds;
};
