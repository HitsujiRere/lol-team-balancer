import { atomFamily, atomWithReducer } from "jotai/utils";
import { atom } from "jotai/vanilla";
import type { Summoner } from "/types/Summoner";

type SummonersAtomAction =
  | { type: "update"; name: string; changes: Partial<Omit<Summoner, "name">> }
  | { type: "updateAll"; changes: Partial<Omit<Summoner, "name">> }
  | { type: "add"; summoner: Summoner }
  | { type: "addMany"; summoners: Summoner[] }
  | { type: "remove"; name: string }
  | { type: "removeAll" };

const toSummonerRecord = (summoners: Summoner[]) =>
  Object.fromEntries(summoners.map((summoner) => [summoner.name, summoner]));

export const summonersReducerAtom = atomWithReducer(
  {} as Record<string, Summoner>,
  (prev, action: SummonersAtomAction) => {
    if (action.type === "update") {
      return {
        ...prev,
        [action.name]: { ...prev[action.name], ...action.changes },
      };
    }
    if (action.type === "updateAll") {
      return toSummonerRecord(
        Object.values(prev).map((summoner) => ({
          ...summoner,
          ...action.changes,
        })),
      );
    }
    if (action.type === "add") {
      return {
        ...prev,
        [action.summoner.name]: {
          ...action.summoner,
          ...prev[action.summoner.name],
        },
      };
    }
    if (action.type === "addMany") {
      return {
        ...prev,
        ...toSummonerRecord(
          action.summoners.map((summoner) => ({
            ...summoner,
            ...prev[summoner.name],
          })),
        ),
      };
    }
    if (action.type === "remove") {
      return Object.fromEntries(
        Object.values(prev)
          .filter((summoner) => summoner.name !== action.name)
          .map((summoner) => [summoner.name, summoner]),
      );
    }
    if (action.type === "removeAll") {
      return {};
    }
    return prev;
  },
);

type PickByType<T extends { type: string }, U extends T["type"]> = T extends {
  type: U;
}
  ? T
  : never;

type SummonerAtomAction = PickByType<SummonersAtomAction, "update" | "remove">;

export const summonerReducerFamily = atomFamily((name: string) =>
  atom(
    (get) => get(summonersReducerAtom)[name],
    (_get, set, action: SummonerAtomAction) => {
      set(summonersReducerAtom, action);
    },
  ),
);
