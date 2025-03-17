import type { GamePlan } from "../types/GamePlan";
import { TeamCards } from "./TeamCards";

export const GameCards = ({ plan }: { plan: GamePlan }) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1 rounded border-2 border-blue-300 p-2">
        <TeamCards
          teamname="A"
          names={plan.blue.summoners.map((summoner) => summoner.name)}
        />
      </div>

      <div className="flex-1 rounded border-2 border-red-300 p-2">
        <TeamCards
          teamname="B"
          names={plan.red.summoners.map((summoner) => summoner.name)}
        />
      </div>
    </div>
  );
};
