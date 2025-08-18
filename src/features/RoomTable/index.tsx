"use client";

import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { IconTable } from "@tabler/icons-react";
import React from "react";

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "tier",
    label: "TIER",
  },
  {
    key: "isMute",
    label: "MUTE",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];

const users = [
  {
    key: "1",
    name: "サモナーA #JP1",
    tier: "GOLD 1",
    isMute: false,
  },
  {
    key: "2",
    name: "サモナーB #JP1",
    tier: "Silver 2",
    isMute: true,
  },
  {
    key: "3",
    name: "サモナーC #JP1",
    tier: "Bronze 3",
    isMute: false,
  },
  {
    key: "4",
    name: "サモナーD #JP1",
    tier: "Iron 4",
    isMute: false,
  },
];

type UserType = (typeof users)[0];

export const RoomTable = () => {
  const renderCell = React.useCallback(
    (user: UserType, columnKey: React.Key) => {
      const value = user[columnKey as keyof UserType];
      if (columnKey === "isMute") {
        return <Checkbox isSelected={Boolean(value)} />;
      }
      if (columnKey === "actions") {
        return <Button>Click me!</Button>;
      }
      return value;
    },
    [],
  );

  return (
    <>
      <h2 className="mb-2 inline-flex items-center gap-2 text-xl">
        <IconTable stroke={1.5} />
        サモナーテーブル
      </h2>

      <Table
        aria-label="Summoners table in"
        color="primary"
        removeWrapper
        selectionMode="multiple"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."} items={users}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
