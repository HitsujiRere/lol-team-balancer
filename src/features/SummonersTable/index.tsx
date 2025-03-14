import { useAtom } from "jotai/react";
import { summonersReducerAtom } from "/stores/summoners";
import { TableFoot } from "./components/TableFoot";
import { TableRow } from "./components/TableRow";

export const SummonersTable = () => {
  const [summoners, updateSummoners] = useAtom(summonersReducerAtom);

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="" />
          <th className="text-center">
            <input
              type="checkbox"
              className="checkbox"
              checked={Object.values(summoners).some(
                (summoner) => summoner.isActive,
              )}
              onChange={(e) =>
                updateSummoners({
                  type: "updateAll",
                  changes: { isActive: e.target.checked },
                })
              }
            />
          </th>
          <th>サモナー名</th>
          <th>ランク</th>
          <th className="text-center">OP.GG</th>
          <th className="text-center">聞き専</th>
          <th className="text-center">削除</th>
        </tr>
      </thead>

      <tbody>
        {Object.keys(summoners).map((name, index) => (
          <TableRow key={name} name={name} index={index + 1} />
        ))}
      </tbody>

      <tfoot>
        <TableFoot />
      </tfoot>
    </table>
  );
};
