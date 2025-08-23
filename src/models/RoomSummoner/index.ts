import type { Tier } from "@/models/Tier";

export type RoomSummoner = {
  name: string;
  tier?: Tier;
  isMute: boolean;
};

export { newRoomSummoner } from "./utils/new";
