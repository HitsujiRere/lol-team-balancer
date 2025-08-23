"use client";

import { UsersIcon } from "lucide-react";
import React from "react";
import { useShallow } from "zustand/shallow";
import { useRoomSummonersStore } from "@/app/stores/useRoomSummonersStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HeaderRows, headerColumns } from "./components/HeaderRows";
import { SummonerRow } from "./components/SummonerRow";
import { useSelectionStores } from "./stores/useSelectionStore";

export const RoomTable = () => {
  const roomNames = useRoomSummonersStore(useShallow((state) => state.names));

  const setSelectionNames = useSelectionStores((state) => state.setNames);
  React.useEffect(() => {
    setSelectionNames(roomNames);
  }, [roomNames, setSelectionNames]);

  return (
    <>
      <h2 className="mb-2 inline-flex items-center gap-2 text-xl">
        <UsersIcon className="size-5" />
        ルームサモナー
      </h2>

      <div>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <HeaderRows />
            </TableHeader>
            <TableBody>
              {roomNames.length >= 1 ? (
                roomNames.map((name) => <SummonerRow key={name} name={name} />)
              ) : (
                <TableRow>
                  <TableCell
                    className="h-24 text-center"
                    colSpan={headerColumns}
                  >
                    まだ誰もいません 😴
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};
