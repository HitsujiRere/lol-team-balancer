import type { GamePlan } from "./GamePlan";

export type GameNames = {
  blue: string[];
  red: string[];
};

export const newGameNamesFromPlan = (init: GamePlan): GameNames => {
  return {
    blue: init.blue.summoners.map((summoner) => summoner.name),
    red: init.red.summoners.map((summoner) => summoner.name),
  };
};
