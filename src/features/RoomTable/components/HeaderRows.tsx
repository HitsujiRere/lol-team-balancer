import type { CheckedState } from "@radix-ui/react-checkbox";
import React from "react";
import { useRoomSummonersStore } from "@/app/stores/useRoomSummonersStore";
import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableRow } from "@/components/ui/table";
import { useSelectionStores } from "../stores/useSelectionStore";

export const HeaderRows = () => {
  const rooms = useRoomSummonersStore((state) => state.names.length);
  const selecteds = useSelectionStores((state) => state.selectedNames().length);
  const checked = React.useMemo((): CheckedState => {
    if (rooms === 0 || selecteds === 0) {
      return false;
    }
    if (selecteds < rooms) {
      return "indeterminate";
    }
    return true;
  }, [rooms, selecteds]);

  const checkedChangeHandler = useSelectionStores((state) => state.changeAll);

  return (
    <TableRow>
      <TableHead>
        <Checkbox checked={checked} onCheckedChange={checkedChangeHandler} />
      </TableHead>
      <TableHead>名前</TableHead>
      <TableHead>ランク</TableHead>
      <TableHead>聞き専</TableHead>
    </TableRow>
  );
};

export const headerColumns = 4;
