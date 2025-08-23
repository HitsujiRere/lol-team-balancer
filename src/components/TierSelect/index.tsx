import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TIERS, type Tier } from "@/models/Tier";

export type TierSelectProps = {
  tier?: Tier;
  onChange: (tier: Tier) => void;
};

export const TierSelect = ({ tier, onChange }: TierSelectProps) => {
  const [open, setOpen] = React.useState(false);
  const selectHandler = React.useCallback(
    (value: string) => {
      onChange(value as Tier);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="w-[200px] justify-between"
          role="combobox"
          variant="outline"
        >
          {tier ?? "未選択"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="検索" />
          <CommandList>
            <CommandEmpty>ランクが見つかりません 😵‍💫</CommandEmpty>
            <CommandGroup>
              {TIERS.map((itemTier) => (
                <CommandItem
                  key={itemTier}
                  onSelect={selectHandler}
                  value={itemTier}
                >
                  {itemTier}
                  <Check
                    className={cn(
                      "ml-auto",
                      itemTier === tier ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
