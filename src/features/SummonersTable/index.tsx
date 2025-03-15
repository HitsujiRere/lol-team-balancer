"use client";

import { useAtomValue } from "jotai/react";
import { summonersReducerAtom } from "~/stores/Summoner";
import { ActionRow } from "./components/ActionRow";
import { SummonerRow } from "./components/SummonerRow";

export const SummonersTable = () => {
  const summoners = useAtomValue(summonersReducerAtom);

  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th className="text-center">試合参加</th>
          <th>サモナー名</th>
          <th>ランク</th>
          <th className="text-center">OP.GG</th>
          <th
            className="tooltip tooltip-accent text-center"
            data-tip="聞き専が分かれるようにチーム分けをします"
          >
            聞き専
          </th>
          <th className="text-center">削除</th>
        </tr>
      </thead>

      <tbody>
        <ActionRow />

        {Object.keys(summoners).map((name, index) => (
          <SummonerRow key={name} name={name} index={index + 1} />
        ))}
      </tbody>
    </table>
  );
};
