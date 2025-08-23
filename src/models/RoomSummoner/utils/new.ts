import type { RoomSummoner } from "..";

export const newRoomSummoner = (): RoomSummoner => {
  return {
    name: "",
    tier: undefined,
    isMute: false,
  };
};
