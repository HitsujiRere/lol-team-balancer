import { TierList } from "~/types/Tier";
import type { TeamPlan } from "../types/TeamPlan";
import { SummonerCard } from "./SummonerCard";

type TeamCardsProps = { teamname: string; plan: TeamPlan };

export const TeamCards = ({ teamname, plan }: TeamCardsProps) => {
  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex justify-around">
        <span className="text-lg">チーム{teamname}</span>
        <div className="flex flex-col">
          <span>合計: {Math.round(plan.point)}pt</span>
          <span>平均: {TierList[Math.round(plan.point / 5)]}</span>
          <span>分散: {Math.round(plan.spread)}</span>
        </div>
      </div>
      {plan.summoners.map((summoner) => (
        <SummonerCard
          key={summoner.name}
          name={summoner.name}
          point={summoner.point}
        />
      ))}
    </div>
  );
};
