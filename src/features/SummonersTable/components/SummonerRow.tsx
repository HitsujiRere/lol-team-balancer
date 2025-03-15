import { Link as LinkIcon, Trash } from "@phosphor-icons/react";
import classNames from "classnames";
import { useAtom } from "jotai/react";
import Link from "next/link";
import React from "react";
import { MuteCheckbox } from "/components/MuteCheckbox";
import { TierSelect } from "/components/TierSelect";
import { summonerReducerFamily } from "/stores/Summoner";
import { toOpggAddress } from "../utils/summoner";

type TableRowProps = { name: string; index: number };

export const SummonerRow = React.memo(({ name, index }: TableRowProps) => {
  const [summoner, updateSummoner] = useAtom(summonerReducerFamily(name));

  const opggAddress = toOpggAddress(summoner);

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
        <span className="select-all">{summoner.name}</span>
      </td>
      <td>
        <TierSelect
          tier={summoner.tier}
          onChange={(tier) =>
            updateSummoner({ type: "update", name, changes: { tier } })
          }
          className="w-32"
        />
      </td>
      <td className="text-center">
        {opggAddress !== undefined && (
          <Link href={opggAddress ?? ""} target="_blank" rel="noreferrer">
            <button type="button" className="btn btn-circle btn-ghost">
              <LinkIcon className="h-4 w-4" />
            </button>
          </Link>
        )}
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
