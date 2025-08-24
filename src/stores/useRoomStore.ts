import { create } from "zustand";
import { mutative } from "zustand-mutative";

type State = {
  names: string[];
  setNames: (names: string[]) => void;
};

export const useRoomStore = create<State>()(
  mutative((set, _get) => ({
    names: [],
    setNames: (names) =>
      set((state) => {
        state.names = names;
      }),
  })),
);
