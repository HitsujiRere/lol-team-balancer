import type { Summoner } from "~/types/Summoner";
import { type GamePlan, newGamePlan } from "../types/GamePlan";
import { calcSpreadPoint, calcSumPoint } from "./point";
import { popcount } from "./popcount";
import { sumof } from "./sumof";

export const makePlans = (summoners: Summoner[]): GamePlan[] => {
  if (summoners.length !== 10) {
    throw new Error("The number of summoners must be exactly 10.");
  }

  const plans: GamePlan[] = [];

  for (let bits = 0; bits < 1 << 10; bits++) {
    if (popcount(bits) !== 5) continue;

    const plan = newGamePlan({ id: bits });

    summoners.map((summoner, index) => {
      if (bits & (1 << index)) {
        plan.blue.summoners.push(summoner);
      } else {
        plan.red.summoners.push(summoner);
      }
    });

    // 同じサモナー数であること
    if (plan.blue.summoners.length !== plan.red.summoners.length) {
      continue;
    }

    const blueMuteCount = sumof(
      plan.blue.summoners.map((summoner) => (summoner.isMute ? 1 : 0)),
    );
    const redMuteCount = sumof(
      plan.red.summoners.map((summoner) => (summoner.isMute ? 1 : 0)),
    );
    // 聞き専が偏らない
    if (Math.abs(blueMuteCount - redMuteCount) >= 2) {
      continue;
    }

    plan.blue.point = calcSumPoint(plan.blue.summoners);
    plan.red.point = calcSumPoint(plan.red.summoners);
    plan.diffPoint = Math.abs(plan.blue.point - plan.red.point);
    // 平均ポイント差が2以下であること
    if (plan.diffPoint > 10) {
      continue;
    }

    plan.blue.spread = calcSpreadPoint(plan.blue.summoners);
    plan.blue.spread = calcSpreadPoint(plan.blue.summoners);
    plan.diffSpread = Math.abs(plan.blue.spread - plan.red.spread);

    plans.push(plan);
  }

  // shuffleArray(plans);

  // 合計ポイント差が少ない順
  plans.sort((a, b) => a.diffPoint - b.diffPoint);

  return plans;
};
