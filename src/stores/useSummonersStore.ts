import { create } from "zustand";
import { mutative } from "zustand-mutative";
import { type RiotId, toName } from "@/models/RiotId";
import { newSummoner, type Summoner } from "@/models/Summoner";

type State = {
  summoners: Record<string, Summoner>;
  createByRiotIds: (riotIds: RiotId[]) => void;
  change: (name: string, changes: Partial<Omit<Summoner, "name">>) => void;
};

export const useSummonersStore = create<State>()(
  mutative((set, _get) => ({
    summoners: {},
    createByRiotIds: (riotIds) =>
      set((state) => {
        riotIds.forEach((riotId) => {
          const name = toName(riotId);
          if (state.summoners[name] === undefined) {
            state.summoners[name] = { ...newSummoner(), name, riotId };
          }
        });
      }),
    change: (name, changes) =>
      set((state) => {
        if (state.summoners[name] !== undefined) {
          state.summoners[name] = { ...state.summoners[name], ...changes };
        }
      }),
  })),
);
