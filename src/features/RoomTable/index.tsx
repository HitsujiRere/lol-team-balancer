"use client";

import { UsersIcon } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { useRoomSummonersStore } from "@/app/stores/useRoomSummonersStore";

export const RoomTable = () => {
  const summonerNames = useRoomSummonersStore(
    useShallow((state) => Object.keys(state.summoners)),
  );

  return (
    <>
      <h2 className="mb-2 inline-flex items-center gap-2 text-xl">
        <UsersIcon className="size-5" />
        ルームサモナー
      </h2>

      <p>table</p>

      <div>
        {summonerNames.map((name) => (
          <p key={name}>{name}</p>
        ))}
      </div>
    </>
  );
};
