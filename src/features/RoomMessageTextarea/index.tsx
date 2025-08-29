"use client";

import { MessageSquareIcon } from "lucide-react";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { useRoomStore } from "@/stores/useRoomStore";
import { DebugButtons } from "./components/DebugButtons";
import { parseRiotIdsFromChat } from "./utils/parseRiotIdsFromChat";

/**
 * ルームチャットをコピーペーストするテキストエリア
 */
export const RoomMessageTextarea = () => {
  const setRoomNames = useRoomStore((state) => state.setNamesByRiotIds);

  const textareaRef = React.useRef(null);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const riotIds = parseRiotIdsFromChat(event.target.value);
      setRoomNames(riotIds);
    },
    [setRoomNames],
  );

  return (
    <>
      <div className="flex justify-between">
        <h2 className="mb-2 inline-flex items-center gap-2 text-xl">
          <MessageSquareIcon className="size-5" />
          ルームチャット
        </h2>
        <DebugButtons textareaRef={textareaRef} />
      </div>

      <Textarea
        className="field-sizing-content min-h-32"
        onChange={handleChange}
        placeholder="さもなー #JP1がロビーに参加しました。"
        ref={textareaRef}
      />
    </>
  );
};
