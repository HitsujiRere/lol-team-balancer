import { useAtomValue } from "jotai/react";
import { summonersReducerAtom } from "/stores/summoners";
import { TableRow } from "./components/TableRow";

export const SummonersTable = () => {
  const summoners = useAtomValue(summonersReducerAtom);

  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>サモナー名</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(summoners).map((id, index) => (
          <TableRow key={id} id={id} index={index + 1} />
        ))}
      </tbody>
    </table>
  );
};
