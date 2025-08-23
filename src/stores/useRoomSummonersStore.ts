import { create } from "zustand";
import { mutative } from "zustand-mutative";

type State = {
  names: string[];
  create: (names: string[]) => void;
};

export const useRoomSummonersStore = create<State>()(
  mutative((set, _get) => ({
    names: [],
    create: (names) =>
      set((state) => {
        state.names = names;
      }),
  })),
);
