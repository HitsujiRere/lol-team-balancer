import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { useSelectionStores } from "../stores/useSelectionStore";

export type SummonerRowProps = {
  name: string;
};

export const SummonerRow = ({ name }: SummonerRowProps) => {
  const checked = useSelectionStores((state) => state.isSelected(name));

  const changeByName = useSelectionStores((state) => state.changeByName);
  const checkedChangeHandler = React.useCallback(
    (checked: boolean) => changeByName(name, checked),
    [name, changeByName],
  );

  return (
    <TableRow data-state={checked && "selected"}>
      <TableCell>
        <Checkbox checked={checked} onCheckedChange={checkedChangeHandler} />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>Gold 1</TableCell>
      <TableCell>
        <Checkbox />
      </TableCell>
    </TableRow>
  );
};
