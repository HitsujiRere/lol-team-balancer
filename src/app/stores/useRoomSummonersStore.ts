import { create } from "zustand";
import { mutative } from "zustand-mutative";
import { newRoomSummoner, type RoomSummoner } from "@/models/RoomSummoner";

type State = {
  summoners: Record<string, RoomSummoner>;
  create: (names: string[]) => void;
};

export const useRoomSummonersStore = create<State>()(
  mutative((set, _get) => ({
    summoners: {},
    create: (names) =>
      set((state) => {
        names.forEach((name) => {
          state.summoners[name] = {
            ...newRoomSummoner(),
            ...state.summoners[name],
          };
        });
      }),
  })),
);
