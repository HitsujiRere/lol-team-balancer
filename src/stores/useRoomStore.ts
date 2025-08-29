import { create } from "zustand";
import { mutative } from "zustand-mutative";
import { type RiotId, toName } from "@/models/RiotId";
import { useSummonersStore } from "./useSummonersStore";

type State = {
  names: string[];
  setNames: (names: string[]) => void;
  setNamesByRiotIds: (riotIds: RiotId[]) => void;
};

export const useRoomStore = create<State>()(
  mutative((set, _get) => ({
    names: [],
    setNames: (names) =>
      set((state) => {
        state.names = names;
      }),
    setNamesByRiotIds: (riotIds) =>
      set((state) => {
        state.names = riotIds.map((riotId) => toName(riotId));
        useSummonersStore.getState().createByRiotIds(riotIds);
      }),
  })),
);
