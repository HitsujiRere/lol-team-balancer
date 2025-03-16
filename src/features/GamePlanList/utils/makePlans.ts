import type { Summoner } from "~/types/Summoner";
import { type GamePlan, newGamePlan } from "../types/GamePlan";
import { summonerAttributeFrom } from "../types/SummonerAttribute";
import { calcAveragePoint } from "./calcAveragePoint";
import { popcount } from "./popcount";
import { shuffleArray } from "./shuffleArray";
import { sumof } from "./sumof";

export const makePlans = (summoners: Summoner[]): GamePlan[] => {
  if (summoners.length !== 10) {
    throw new Error("The number of summoners must be exactly 10.");
  }

  const summonerAttributes = summoners.map((summoner) =>
    summonerAttributeFrom(summoner, calcAveragePoint(summoners)),
  );

  const plans: GamePlan[] = [];

  for (let bits = 0; bits < 1 << 10; bits++) {
    if (popcount(bits) !== 5) continue;

    const plan = newGamePlan({ id: bits });

    summonerAttributes.map((summoner, index) => {
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

    plan.blue.point = sumof(
      plan.blue.summoners.map((summoner) => summoner.point),
    );
    plan.red.point = sumof(
      plan.red.summoners.map((summoner) => summoner.point),
    );
    plan.diffPoint = Math.abs(plan.blue.point - plan.red.point);
    // 平均ポイント差が4以上である
    if (plan.diffPoint >= 20) {
      continue;
    }

    plan.blue.spread =
      sumof(
        plan.blue.summoners.map(
          (summoner) => (summoner.point - plan.blue.point / 5) ** 2,
        ),
      ) ** 0.5;
    plan.red.spread =
      sumof(
        plan.red.summoners.map(
          (summoner) => (summoner.point - plan.red.point / 5) ** 2,
        ),
      ) ** 0.5;

    plans.push(plan);
  }

  shuffleArray(plans);

  // 合計ポイント差が少ない順
  plans.sort((a, b) => a.diffPoint - b.diffPoint);

  return plans;
};
