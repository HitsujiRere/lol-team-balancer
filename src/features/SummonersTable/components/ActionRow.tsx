import { Trash, UserPlus } from "@phosphor-icons/react";
import { useAtom } from "jotai/react";
import type React from "react";
import { useState } from "react";
import { summonersReducerAtom } from "/stores/Summoner";
import { newSummoner } from "/types/Summoner";
import { trimControlChar } from "/utils/string";

export const ActionRow = () => {
  const [summoners, updateSummoners] = useAtom(summonersReducerAtom);
  const [newName, setNewName] = useState("");

  const handleNewNameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newName !== "") {
      updateSummoners({
        type: "add",
        summoner: newSummoner({ name: newName }),
      });
      setNewName("");
    }
  };

  return (
    <tr className="text-base-content">
      <th />
      <td className="text-center">
        <input
          type="checkbox"
          className="checkbox"
          checked={Object.values(summoners).some(
            (summoner) => summoner.isActive,
          )}
          onChange={(e) =>
            updateSummoners({
              type: "updateAll",
              changes: { isActive: e.target.checked },
            })
          }
        />
      </td>
      <td className="font-normal">
        <form className="join" onSubmit={handleNewNameSubmit}>
          <label className="input join-item">
            <UserPlus className="h-4 w-4" />
            <input
              type="text"
              placeholder="さもなー #JP1"
              value={newName}
              onChange={(e) => setNewName(trimControlChar(e.target.value))}
            />
          </label>
          <button type="button" className="btn join-item">
            追加
          </button>
        </form>
      </td>
      <td />
      <td />
      <td />
      <td className="text-center">
        <button
          type="button"
          className="btn btn-circle btn-ghost tooltip"
          data-tip="すべて削除"
          onClick={() => updateSummoners({ type: "removeAll" })}
        >
          <Trash className="h-4 w-4" weight="bold" />
        </button>
      </td>
    </tr>
  );
};
