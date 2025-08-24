import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mutative } from "zustand-mutative";

type State = {
  debugMode: boolean;
  toggleMode: (mode: boolean) => void;
};

export const useDebugStore = create<State>()(
  persist(
    mutative((set, _get) => ({
      debugMode: false,
      toggleMode: (mode) =>
        set((state) => {
          state.debugMode = mode;
        }),
    })),
    { name: "debug-mode" },
  ),
);
