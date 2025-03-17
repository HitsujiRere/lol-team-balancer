import { useAtomValue } from "jotai/react";
import { pointToTier } from "~/components/TierSelect";
import { summonersReducerAtom } from "~/stores/Summoner";
import {
  calcAveragePoint,
  calcSpreadPoint,
  calcSumPoint,
} from "../utils/point";
import { SummonerCard } from "./SummonerCard";

type TeamCardsProps = { teamname: string; names: string[] };

export const TeamCards = ({ teamname, names }: TeamCardsProps) => {
  const summoners = useAtomValue(summonersReducerAtom);

  const teamSummoners = names
    .map((name) => summoners[name])
    .filter((summoner) => summoner !== undefined);

  const sumPoint = calcSumPoint(teamSummoners);
  const averageTier = pointToTier(calcAveragePoint(teamSummoners));
  const spreadPoint = calcSpreadPoint(teamSummoners);

  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex justify-around">
        <span className="text-lg">チーム{teamname}</span>
        <div className="flex flex-col">
          <span>合計: {sumPoint}pt</span>
          <span>平均: {averageTier}</span>
          <span>分散: {spreadPoint}</span>
        </div>
      </div>
      {names.map((name) => (
        <SummonerCard key={name} name={name} />
      ))}
    </div>
  );
};
