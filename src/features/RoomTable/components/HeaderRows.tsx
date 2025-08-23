import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableRow } from "@/components/ui/table";

export const HeaderRows = () => {
  return (
    <TableRow>
      <TableHead>
        <Checkbox />
      </TableHead>
      <TableHead>名前</TableHead>
      <TableHead>ランク</TableHead>
      <TableHead>聞き専</TableHead>
    </TableRow>
  );
};

export const headerColumns = 4;
