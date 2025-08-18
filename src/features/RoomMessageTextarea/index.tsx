"use client";

import { MessageSquareIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export const RoomMessageTextarea = () => {
  return (
    <>
      <h2 className="mb-2 inline-flex items-center gap-2 text-xl">
        <MessageSquareIcon className="size-5" />
        ルームチャット
      </h2>

      <Textarea
        className="field-sizing-content min-h-32"
        placeholder="さもなー #JP1がロビーに参加しました。"
      />
    </>
  );
};
