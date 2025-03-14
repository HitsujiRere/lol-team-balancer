import { Trash, UserPlus } from "@phosphor-icons/react";
import { useSetAtom } from "jotai/react";
import type React from "react";
import { useState } from "react";
import { summonersReducerAtom } from "/stores/summoners";
import { newSummoner } from "/utils/summoner";

export const TableFoot = () => {
  const updateSummoners = useSetAtom(summonersReducerAtom);
  const [newName, setNewName] = useState("");

  const handleNewNameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateSummoners({
      type: "add",
      summoner: newSummoner({ name: newName }),
    });
    setNewName("");
  };

  return (
    <tr>
      <th />
      <th />
      <th className="font-normal text-base-content">
        <form className="join" onSubmit={handleNewNameSubmit}>
          <label className="input join-item">
            <UserPlus className="h-4 w-4" />
            <input
              type="text"
              placeholder="さもなー #JP1"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </label>
          <button type="button" className="btn join-item">
            追加
          </button>
        </form>
      </th>
      <th />
      <th />
      <th />
      <td className="text-center text-base-content">
        <div className="tooltip" data-tip="すべて削除">
          <button
            type="button"
            className="btn btn-circle btn-ghost"
            onClick={() => updateSummoners({ type: "removeAll" })}
          >
            <Trash className="h-4 w-4" weight="bold" />
          </button>
        </div>
      </td>
    </tr>
  );
};
