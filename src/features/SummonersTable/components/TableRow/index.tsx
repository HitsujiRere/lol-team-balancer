import {
  Link,
  Microphone,
  MicrophoneSlash,
  Trash,
} from "@phosphor-icons/react";
import { useAtom } from "jotai/react";
import React from "react";
import { TierSelect } from "/components/TierSelect";
import { summonerReducerFamily } from "/stores/summoners";
import { toOpggAddress } from "/utils/summoner";
import classNames from "classnames";

type TableRowProps = { name: string; index: number };

export const TableRow = React.memo(({ name, index }: TableRowProps) => {
  const [summoner, updateSummoner] = useAtom(summonerReducerFamily(name));

  return (
    <tr>
      <td>{index}</td>
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
        <span
          className={classNames("select-all", {
            "font-bold": summoner.isActive,
          })}
        >
          {summoner.name}
        </span>
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
        <a href={toOpggAddress(summoner)} target="_blank" rel="noreferrer">
          <button type="button" className="btn btn-circle btn-ghost">
            <Link className="h-4 w-4" />
          </button>
        </a>
      </td>
      <td className="text-center">
        <label className="swap swap-rotate btn btn-ghost btn-circle place-items-center">
          <input
            type="checkbox"
            checked={summoner.isMute}
            onChange={(e) =>
              updateSummoner({
                type: "update",
                name,
                changes: { isMute: e.target.checked },
              })
            }
          />
          <Microphone className="swap-off h-4 w-4" />
          <MicrophoneSlash className="swap-on h-4 w-4" weight="fill" />
        </label>
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
