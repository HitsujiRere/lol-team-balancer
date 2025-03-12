import { useAtom } from "jotai/react";
import { summonerFamily } from "/stores/summoners";

type TableRowProps = { id: string; index: number };

export const TableRow = ({ id, index }: TableRowProps) => {
  const [summoner, _setSummoner] = useAtom(summonerFamily(id));

  return (
    <tr>
      <td>{index}</td>
      <td>
        <span className="select-all">{summoner.name}</span>
      </td>
    </tr>
  );
};
