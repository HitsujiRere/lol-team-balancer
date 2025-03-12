import { useSetAtom } from "jotai/react";
import type React from "react";
import { summonersReducerAtom } from "/stores/summoners";
import { newSummoner } from "/utils/summoner";
import { parseLogToNames } from "./utils/parse";

export const LobbyLogInput = () => {
  const updateSummoners = useSetAtom(summonersReducerAtom);

  const handlerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const names = parseLogToNames(event.target.value);
    const summoners = names.map((name) => newSummoner({ name }));
    updateSummoners({ type: "addMany", summoners });
  };

  return (
    <textarea
      placeholder="さもなー #JP1がロビーに参加しました。"
      className="textarea h-40 w-full"
      onChange={handlerChange}
    />
  );
};
