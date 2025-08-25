import type { CheckedState } from "@radix-ui/react-checkbox";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableRow } from "@/components/ui/table";
import { useRoomStore } from "@/stores/useRoomStore";
import { useSelectionStores } from "../stores/useSelectionStore";

export const HeaderRows = () => {
  const roomNames = useRoomStore((state) => state.names.length);
  const selectedNames = useSelectionStores(
    (state) => state.selectedNames().length,
  );
  const checked = React.useMemo((): CheckedState => {
    if (roomNames === 0 || selectedNames === 0) {
      return false;
    }
    if (selectedNames < roomNames) {
      return "indeterminate";
    }
    return true;
  }, [roomNames, selectedNames]);

  const checkedChangeHandler = useSelectionStores((state) => state.changeAll);

  return (
    <TableRow>
      <TableHead>
        <Checkbox checked={checked} onCheckedChange={checkedChangeHandler} />
      </TableHead>
      <TableHead>名前</TableHead>
      <TableHead>レベル</TableHead>
      <TableHead>ランク</TableHead>
      <TableHead>聞き専</TableHead>
    </TableRow>
  );
};

export const headerColumns = 5;
