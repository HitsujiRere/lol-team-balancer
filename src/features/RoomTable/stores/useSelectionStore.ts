import { create } from "zustand";
import { mutative } from "zustand-mutative";

type SelectedState = boolean | "unregister";

type State = {
  selection: Record<string, SelectedState>;
  selectedNames: () => string[];
  isSelected: (name: string) => boolean;
  setNames: (names: string[]) => void;
  changeAll: (select: boolean) => void;
  changeByName: (name: string, select: boolean) => void;
};

export const useSelectionStores = create<State>()(
  mutative((set, get) => ({
    selection: {},
    selectedNames: () => {
      return Object.keys(get().selection).filter(get().isSelected);
    },
    isSelected: (name) => {
      return get().selection[name] === true;
    },
    setNames: (names) =>
      set((state) => {
        const selectedNames = Object.keys(state.selection).filter(
          (name) => state.selection[name] !== "unregister",
        );
        // added
        names
          .filter((name) => !selectedNames.includes(name))
          .forEach((name) => {
            state.selection[name] = true;
          });
        // removed
        selectedNames
          .filter((active) => !names.includes(active))
          .forEach((name) => {
            state.selection[name] = "unregister";
          });
      }),
    changeAll: (select) =>
      set((state) => {
        Object.keys(state.selection).forEach((name) => {
          if (state.selection[name] !== "unregister") {
            state.selection[name] = select;
          }
        });
      }),
    changeByName: (name, select) =>
      set((state) => {
        state.selection[name] = select;
      }),
  })),
);
