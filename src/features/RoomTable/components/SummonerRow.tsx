import React from "react";
import { useShallow } from "zustand/shallow";
import { TierSelect } from "@/components/TierSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Tier } from "@/models/Tier";
import { useSummonersStore } from "@/stores/useSummonersStore";
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

  const summoner = useSummonersStore(
    useShallow((state) => state.summoners[name]),
  );
  const changeSummoner = useSummonersStore((state) => state.change);

  const changeTierHandler = React.useCallback(
    (tier: Tier) => changeSummoner(name, { tier }),
    [name, changeSummoner],
  );
  const changeMuteHandler = React.useCallback(
    (isMute: boolean) => changeSummoner(name, { isMute }),
    [name, changeSummoner],
  );

  return (
    <TableRow data-state={checked && "selected"}>
      <TableCell>
        <Checkbox checked={checked} onCheckedChange={checkedChangeHandler} />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <TierSelect onChange={changeTierHandler} tier={summoner.tier} />
      </TableCell>
      <TableCell>
        <Checkbox
          checked={summoner.isMute}
          onCheckedChange={changeMuteHandler}
        />
      </TableCell>
    </TableRow>
  );
};
