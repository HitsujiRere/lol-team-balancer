import { Trash } from "@phosphor-icons/react";
import classNames from "classnames";
import { useAtom } from "jotai/react";
import React from "react";
import { MuteCheckbox } from "~/components/MuteCheckbox";
import { OpggLink } from "~/components/OpggLink";
import { TierSelect, tierContext } from "~/components/TierSelect";
import { summonerReducerFamily } from "~/stores/Summoner";

type TableRowProps = { name: string; index: number };

export const SummonerRow = React.memo(({ name, index }: TableRowProps) => {
  const [summoner, updateSummoner] = useAtom(summonerReducerFamily(name));

  if (summoner === undefined) {
    return undefined;
  }

  return (
    <tr className={classNames({ "bg-base-200": summoner.isActive })}>
      <th>{index}</th>
      <td className="text-center">
        <input
          type="checkbox"
          className="checkbox"
          checked={summoner.isActive}
          onChange={(e) =>
            updateSummoner({
              type: "update",
              name,
              changes: { isActive: e.target.checked },
            })
          }
        />
      </td>
      <td>
        <span className="select-all text-sm">{summoner.name}</span>
      </td>
      <td>
        <div className={classNames({ tooltip: summoner.info })}>
          {summoner.info && (
            <div className="tooltip-content">
              <p>現ランク：{tierContext(summoner.info.tier)}</p>
              <p>
                {summoner.info.wins}勝 {summoner.info.losses}負
              </p>
            </div>
          )}
          <TierSelect
            tier={summoner.tier}
            point={summoner.point}
            onChange={(tier, point) =>
              updateSummoner({ type: "update", name, changes: { tier, point } })
            }
          />
        </div>
      </td>
      <td className="text-center">
        <OpggLink summoner={summoner} />
      </td>
      <td className="text-center">
        <MuteCheckbox
          isMute={summoner.isMute}
          onChange={(isMute) =>
            updateSummoner({ type: "update", name, changes: { isMute } })
          }
        />
      </td>
      <td className="text-center">
        <button
          type="button"
          className="btn btn-circle btn-ghost"
          onClick={() => updateSummoner({ type: "remove", name })}
        >
          <Trash className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
});
