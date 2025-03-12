import { atomFamily, atomWithReducer } from "jotai/utils";
import { type SetStateAction, atom } from "jotai/vanilla";
import type { Summoner } from "/types/Summoner";

type summonersAtomAction =
  | { type: "set"; name: string; changes: Partial<Omit<Summoner, "name">> }
  | { type: "add"; summoner: Summoner }
  | { type: "addMany"; summoners: Summoner[] };

export const summonersReducerAtom = atomWithReducer(
  {} as Record<string, Summoner>,
  (prev, action: summonersAtomAction) => {
    if (action.type === "set") {
      return {
        ...prev,
        [action.name]: { ...prev[action.name], ...action.changes },
      };
    }
    if (action.type === "add") {
      return { ...prev, [action.summoner.name]: action.summoner };
    }
    if (action.type === "addMany") {
      return {
        ...prev,
        ...Object.fromEntries(
          action.summoners.map((summoner) => [summoner.name, summoner]),
        ),
      };
    }
    return prev;
  },
);

export const summonerFamily = atomFamily((name: string) =>
  atom(
    (get) => get(summonersReducerAtom)[name],
    (get, set, changes: SetStateAction<Partial<Summoner>>) => {
      if (typeof changes === "object") {
        set(summonersReducerAtom, { type: "set", name, changes });
      } else {
        set(summonersReducerAtom, {
          type: "set",
          name,
          changes: changes(get(summonersReducerAtom)),
        });
      }
    },
  ),
);
