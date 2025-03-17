import { atomWithReducer } from "jotai/utils";
import { toast } from "react-toastify";
import type { Summoner } from "~/types/Summoner";

export type SummonersAtomAction =
  | { type: "update"; name: string; changes: Partial<Omit<Summoner, "name">> }
  | {
      type: "updateMany";
      names: string[];
      changes: Partial<Omit<Summoner, "name">>;
    }
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
    if (action.type === "updateMany") {
      return {
        ...prev,
        ...toSummonerRecord(
          action.names.map((name) => ({
            ...prev[name],
            ...action.changes,
          })),
        ),
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
      toast.success(`サモナー ${action.summoner.name} を追加しました。`);

      return {
        ...prev,
        [action.summoner.name]: {
          ...action.summoner,
          ...prev[action.summoner.name],
        },
      };
    }
    if (action.type === "addMany") {
      if (action.summoners.length === 0) return prev;

      toast.success("サモナーを追加しました。");

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
      toast.success(`サモナー ${action.name} を削除しました。`);

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
