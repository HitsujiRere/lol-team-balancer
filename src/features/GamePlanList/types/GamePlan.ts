import type { TeamPlan } from "./TeamPlan";

export type GamePlan = {
  id: number;
  blue: TeamPlan;
  red: TeamPlan;
  diffPoint: number;
  diffSpread: number;
};

export const newGamePlan = (init?: Partial<GamePlan>): GamePlan => {
  return {
    id: 0,
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
    ...init,
  };
};
