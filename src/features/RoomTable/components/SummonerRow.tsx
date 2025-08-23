import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";

export type SummonerRowProps = {
  name: string;
};

export const SummonerRow = ({ name }: SummonerRowProps) => {
  const [active, setActive] = useState(false);

  return (
    <TableRow data-state={active && "selected"}>
      <TableCell>
        <Checkbox
          checked={active}
          onCheckedChange={(checked) => setActive(checked === true)}
        />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <Checkbox />
      </TableCell>
    </TableRow>
  );
};
