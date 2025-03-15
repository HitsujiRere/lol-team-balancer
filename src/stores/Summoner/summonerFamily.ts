import { atomFamily } from "jotai/utils";
import { atom } from "jotai/vanilla";
import type { Summoner } from "/types/Summoner";
import { type SummonersAtomAction, summonersReducerAtom } from "./summoners";

type PickByType<T extends { type: string }, U extends T["type"]> = T extends {
  type: U;
}
  ? T
  : never;

type SummonerAtomAction = PickByType<SummonersAtomAction, "update" | "remove">;

export const summonerReducerFamily = atomFamily((name: string) =>
  atom(
    (get) => get(summonersReducerAtom)[name] as Summoner | undefined,
    (_get, set, action: SummonerAtomAction) => {
      set(summonersReducerAtom, action);
    },
  ),
);
