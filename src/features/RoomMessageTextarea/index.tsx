"use client";

import { MessageSquareIcon } from "lucide-react";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { toName } from "@/models/RiotId";
import { useRoomSummonersStore } from "@/stores/useRoomSummonersStore";
import { parseMessageToRiotIds } from "./utils/parseMessageToRiotIds";

export const RoomMessageTextarea = () => {
  const createRoomSummoners = useRoomSummonersStore((state) => state.create);

  const changeHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const riotIds = parseMessageToRiotIds(event.target.value);
      createRoomSummoners(riotIds.map((riotId) => toName(riotId)));
    },
    [createRoomSummoners],
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
