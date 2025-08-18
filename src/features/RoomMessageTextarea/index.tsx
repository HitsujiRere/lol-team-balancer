"use client";

import { Textarea } from "@heroui/react";
import { IconHome } from "@tabler/icons-react";

export const RoomMessageTextarea = () => {
  return (
    <>
      <h2 className="mb-2 inline-flex items-center gap-2 text-xl">
        <IconHome stroke={1.5} />
        ルームチャット
      </h2>

      <Textarea
        minRows={5}
        placeholder="さもなー #JP1がロビーに参加しました。"
      />
    </>
  );
};
