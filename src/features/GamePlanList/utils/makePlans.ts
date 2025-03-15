import type { Summoner } from "/types/Summoner";
import { type GamePlan, newGamePlan } from "../types/GamePlan";
import { summonerAttributeFrom } from "../types/SummonerAttribute";
import { calcAveragePoint } from "./calcAveragePoint";
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

  for (let bits = 0; bits < 1 << summoners.length; bits++) {
    const plan: GamePlan = newGamePlan();

    summonerAttributes.map((summoner, index) => {
      if (bits & (1 << index)) {
        plan.blue.summoners.push(summoner);
      } else {
        plan.red.summoners.push(summoner);
      }
    });

    if (plan.blue.summoners.length !== plan.red.summoners.length) {
      continue;
    }

    const blueMuteCount = sumof(
      plan.blue.summoners.map((summoner) => (summoner.isMute ? 1 : 0)),
    );
    const redMuteCount = sumof(
      plan.red.summoners.map((summoner) => (summoner.isMute ? 1 : 0)),
    );
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

    plans.push(plan);
  }

  shuffleArray(plans);

  plans.sort((a, b) => a.diffPoint - b.diffPoint);

  return plans;
};
