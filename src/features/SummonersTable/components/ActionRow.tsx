import { MagnifyingGlass, Trash, UserPlus } from "@phosphor-icons/react";
import { useAtom, useAtomValue } from "jotai/react";
import type React from "react";
import { useState } from "react";
import { OpggLinkMany } from "~/components/OpggLink";
import { summonersReducerAtom } from "~/stores/Summoner";
import { apikeyAtom } from "~/stores/debug/apikey";
import { newSummoner } from "~/types/Summoner";
import { trimControlChar } from "~/utils/string";
import { useFetchTiers } from "../hooks/useFetchTiers";

export const ActionRow = () => {
  const apikey = useAtomValue(apikeyAtom);
  const [summoners, updateSummoners] = useAtom(summonersReducerAtom);
  const [newName, setNewName] = useState("");

  const activeSummoners = Object.values(summoners).filter(
    (summoner) => summoner.isActive,
  );

  const handleAddNewName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newName !== "") {
      updateSummoners({
        type: "add",
        summoner: newSummoner({ name: newName }),
      });
      setNewName("");
    }
  };

  const handleFetchTiers = useFetchTiers();

  return (
    <tr>
      <th />
      <td className="text-center">
        <input
          type="checkbox"
          className="checkbox"
          checked={activeSummoners.length > 0}
          onChange={(e) =>
            updateSummoners({
              type: "updateAll",
              changes: { isActive: e.target.checked },
            })
          }
        />
      </td>
      <td>
        <form className="join" onSubmit={handleAddNewName}>
          <label className="input join-item">
            <UserPlus className="h-4 w-4" />
            <input
              type="text"
              placeholder="さもなー #JP1"
              value={newName}
              onChange={(e) => setNewName(trimControlChar(e.target.value))}
            />
          </label>
          <button type="submit" className="btn join-item">
            追加
          </button>
        </form>
      </td>
      <td>
        <div
          className="tooltip"
          data-tip="現在開発中の機能です。設定から Riot API Key を設定することで使用可能です。"
        >
          <button
            type="button"
            className="btn"
            onClick={handleFetchTiers}
            disabled={apikey === ""}
          >
            <MagnifyingGlass className="h-4 w-4" />
            ランク検出
          </button>
        </div>
      </td>
      <td className="text-center">
        <div className="tooltip" data-tip="マルチサーチを開く（10人まで）">
          <OpggLinkMany summoners={activeSummoners} />
        </div>
      </td>
      <td />
      <td className="text-center">
        <button
          type="button"
          className="btn btn-circle btn-ghost tooltip tooltip-warning"
          data-tip="すべて削除"
          onClick={() => updateSummoners({ type: "removeAll" })}
        >
          <Trash className="h-4 w-4" weight="bold" />
        </button>
      </td>
    </tr>
  );
};
