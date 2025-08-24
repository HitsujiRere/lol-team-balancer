"use client";

import { MessageSquareIcon } from "lucide-react";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { toName } from "@/models/RiotId";
import { useRoomStore } from "@/stores/useRoomStore";
import { parseMessageToRiotIds } from "./utils/parseMessageToRiotIds";

export const RoomMessageTextarea = () => {
  const setRoomNames = useRoomStore((state) => state.setNames);

  const changeHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const riotIds = parseMessageToRiotIds(event.target.value);
      setRoomNames(riotIds.map((riotId) => toName(riotId)));
    },
    [setRoomNames],
  );

  return (
    <>
      <h2 className="mb-2 inline-flex items-center gap-2 text-xl">
        <MessageSquareIcon className="size-5" />
        ルームチャット
      </h2>

      <Textarea
        className="field-sizing-content min-h-32"
        onChange={changeHandler}
        placeholder="さもなー #JP1がロビーに参加しました。"
      />
    </>
  );
};
