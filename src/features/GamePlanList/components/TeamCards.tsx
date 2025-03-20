import { useAtomValue } from "jotai/react";
import { pointToTier } from "~/components/TierSelect";
import { summonersReducerAtom } from "~/stores/Summoner";
import { calcAveragePoint } from "../utils/point";
import { SummonerCard } from "./SummonerCard";

type TeamCardsProps = { teamname: string; names: string[] };

export const TeamCards = ({ teamname, names }: TeamCardsProps) => {
  const summoners = useAtomValue(summonersReducerAtom);

  const teamSummoners = names
    .map((name) => summoners[name])
    .filter((summoner) => summoner !== undefined);

  const averagePoint = calcAveragePoint(teamSummoners);
  const averageTier = pointToTier(averagePoint);

  return (
    <div className="space-y-4">
      <div className="m-4 flex justify-around">
        <span className="text-lg">チーム{teamname}</span>

        <div className="flex flex-col gap-2">
          <span>平均ポイント : {averagePoint}pt</span>
          <span>平均ランク : {averageTier}</span>
        </div>
      </div>

      {names.map((name) => (
        <SummonerCard key={name} name={name} />
      ))}
    </div>
  );
};
