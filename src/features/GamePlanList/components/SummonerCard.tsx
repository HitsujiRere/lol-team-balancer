import { useAtom } from "jotai/react";
import React from "react";
import { MuteCheckbox } from "~/components/MuteCheckbox";
import { OpggLink } from "~/components/OpggLink";
import { TierSelect } from "~/components/TierSelect";
import { summonerReducerFamily } from "~/stores/Summoner";

type SummonerCardProps = { name: string };

export const SummonerCard = React.memo(({ name }: SummonerCardProps) => {
  const [summoner, updateSummoner] = useAtom(summonerReducerFamily(name));

  if (summoner === undefined) {
    return undefined;
  }

  return (
    <div className="flex flex-col gap-2 rounded border border-base-content/30 bg-base-200 px-4 py-2">
      <div>
        <span className="font-bold">{name}</span>
      </div>

      <div className="flex justify-between gap-2">
        <TierSelect
          tier={summoner.tier}
          onChange={(tier) =>
            updateSummoner({ type: "update", name, changes: { tier } })
          }
        />
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
