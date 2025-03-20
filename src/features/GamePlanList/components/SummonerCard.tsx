import { useAtom } from "jotai/react";
import React from "react";
import { MuteCheckbox } from "~/components/MuteCheckbox";
import { OpggLink } from "~/components/OpggLink";
import { TierSelect } from "~/components/TierSelect";
import { summonerReducerFamily } from "~/stores/Summoner";

type SummonerCardProps = { name: string };

export const SummonerCard = React.memo(({ name }: SummonerCardProps) => {
  const [summoner, updateSummoner] = useAtom(summonerReducerFamily(name));

  return (
    <div className="rounded border border-base-content/30 bg-base-200 px-4 py-2">
      <div className="flex flex-col gap-2">
        <span className="font-bold">{name}</span>

        {summoner && (
          <div className="flex flex-wrap justify-end gap-1">
            <TierSelect
              tier={summoner.tier}
              point={summoner.point}
              onChange={(tier, point) =>
                updateSummoner({
                  type: "update",
                  name,
                  changes: { tier, point },
                })
              }
            />
            <div className="flex gap-1">
              <OpggLink summoner={summoner} />
              <MuteCheckbox
                isMute={summoner.isMute}
                onChange={(isMute) =>
                  updateSummoner({
                    type: "update",
                    name,
                    changes: { isMute },
                  })
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
