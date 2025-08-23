import { CircleIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import {
  isBronze,
  isDiamond,
  isEmerald,
  isGold,
  isIron,
  isMasterPlus,
  isPlatinum,
  isSilver,
  type Tier,
} from "@/models/Tier";

export type TierLabelProps = {
  tier?: Tier;
};

export const TierLabel = React.memo(({ tier }: TierLabelProps) => {
  return (
    <span className="inline-flex items-center gap-2">
      <CircleIcon
        className={cn({
          "stroke-0": tier !== "UNRANKED",
          "fill-lol-iron-foreground": isIron(tier),
          "fill-lol-bronze-foreground": isBronze(tier),
          "fill-lol-silver-foreground": isSilver(tier),
          "fill-lol-gold-foreground": isGold(tier),
          "fill-lol-platinum-foreground": isPlatinum(tier),
          "fill-lol-emerald-foreground": isEmerald(tier),
          "fill-lol-diamond-foreground": isDiamond(tier),
          "fill-lol-master-foreground": isMasterPlus(tier),
        })}
      />
      <span>{tier ?? "未設定"}</span>
    </span>
  );
});
