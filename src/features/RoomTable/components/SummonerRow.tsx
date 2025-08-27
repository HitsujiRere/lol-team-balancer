import React from "react";
import { useShallow } from "zustand/shallow";
import { MuteToggle } from "@/components/MuteToggle";
import { TierSelect } from "@/components/TierSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
        <Input
          className="w-20 bg-background shadow-xs transition-all hover:bg-accent dark:border-input dark:hover:bg-input/50"
          type="number"
          value={summoner.level ?? 0}
        />
      </TableCell>
      <TableCell>
        <TierSelect onChange={changeTierHandler} tier={summoner.tier} />
      </TableCell>
      <TableCell>
        <MuteToggle mute={summoner.isMute} onChange={changeMuteHandler} />
      </TableCell>
    </TableRow>
  );
};
