"use client";

import { Chat } from "@phosphor-icons/react";
import { useSetAtom } from "jotai/react";
import { summonersReducerAtom } from "~/stores/Summoner";
import { newSummoner } from "~/types/Summoner";
import { trimControlChar } from "~/utils/string";
import { parseLogToNames } from "./utils/parseLogToNames";

export const LobbyLogInput = () => {
  const updateSummoners = useSetAtom(summonersReducerAtom);

  const handlerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const log = trimControlChar(event.target.value, "\\n");
    const names = parseLogToNames(log);
    const summoners = names.map((name) => newSummoner({ name }));
    updateSummoners({ type: "addMany", summoners });
  };

  return (
    <label className="block">
      <h2 className="mb-2 flex items-center gap-2 text-xl">
        <Chat />
        <span>ロビーチャット欄</span>
      </h2>
      <textarea
        placeholder="さもなー #JP1がロビーに参加しました。"
        className="textarea h-40 w-full"
        onChange={handlerChange}
      />
    </label>
  );
};
