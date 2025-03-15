import type { GamePlan } from "../types/GamePlan";
import { TeamCards } from "./TeamCards";

export const GameCards = ({ plan }: { plan: GamePlan }) => {
  return (
    <div className="flex gap-8">
      <div className="flex-1 rounded border-2 border-blue-300 p-2">
        <TeamCards plan={plan.blue} />
      </div>

      <div className="flex-1 rounded border-2 border-red-300 p-2">
        <TeamCards plan={plan.red} />
      </div>
    </div>
  );
};
