import { Warning } from "@phosphor-icons/react";
import { useAtom } from "jotai/react";
import React from "react";
import { MuteCheckbox } from "~/components/MuteCheckbox";
import { OpggLink } from "~/components/OpggLink";
import { TierSelect } from "~/components/TierSelect";
import { summonerReducerFamily } from "~/stores/Summoner";

type SummonerCardProps = { name: string; point: number };

export const SummonerCard = React.memo(({ name, point }: SummonerCardProps) => {
  const [summoner, updateSummoner] = useAtom(summonerReducerFamily(name));

  if (summoner === undefined) {
    return undefined;
  }

  return (
    <div className="flex flex-col gap-2 rounded border border-base-content/30 bg-base-200 px-4 py-2">
      <div className="flex items-baseline justify-between">
        <span className="font-bold">{name}</span>
        <span className="text-sm">{Math.round(point)}pt</span>
      </div>

      <div className="flex justify-between gap-2">
        <div className="flex items-center gap-2">
          <TierSelect
            tier={summoner.tier}
            onChange={(tier) =>
              updateSummoner({ type: "update", name, changes: { tier } })
            }
          />
          {summoner.tier === "Unranked" && (
            <button
              type="button"
              // className="bg-warning p-2 rounded-full tooltip"
              className="btn btn-warning btn-circle btn-sm tooltip"
              data-tip="ランクがUnrankedのとき、平均値に設定されます。"
            >
              <Warning className="h-4 w-4" weight="bold" />
            </button>
          )}
        </div>
        <div>
          <OpggLink summoner={summoner} />
          <MuteCheckbox
            isMute={summoner.isMute}
            onChange={(isMute) =>
              updateSummoner({ type: "update", name, changes: { isMute } })
            }
          />
        </div>
      </div>
    </div>
  );
});
