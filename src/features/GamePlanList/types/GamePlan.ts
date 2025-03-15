import type { TeamPlan } from "./TeamPlan";

export type GamePlan = {
  blue: TeamPlan;
  red: TeamPlan;
  diffPoint: number;
  diffSpread: number;
};

export const newGamePlan = (): GamePlan => {
  return {
    blue: {
      summoners: [],
      point: 0,
      spread: 0,
    },
    red: {
      summoners: [],
      point: 0,
      spread: 0,
    },
    diffPoint: 0,
    diffSpread: 0,
  };
};
