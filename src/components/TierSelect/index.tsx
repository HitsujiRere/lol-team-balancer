import classNames from "classnames";
import type React from "react";
import type { OverWrite } from "/types/util";
import { type Tier, TierList } from "../../types/Tier";

type TierSelectProps = OverWrite<
  React.ComponentProps<"select">,
  {
    tier: Tier;
    onChange: (tier: Tier) => void;
  }
>;

export const TierSelect = ({
  tier,
  onChange,
  className,
  ...props
}: TierSelectProps) => {
  return (
    <select
      {...props}
      className={classNames("select w-32", className, {
        "bg-base-100": tier === "Unranked",
        "bg-lol-iron": tier.includes("Iron"),
        "bg-lol-bronze": tier.includes("Bronze"),
        "bg-lol-silver": tier.includes("Silver"),
        "bg-lol-gold": tier.includes("Gold"),
        "bg-lol-platinum": tier.includes("Platinum"),
        "bg-lol-emerald": tier.includes("Emerald"),
        "bg-lol-diamond": tier.includes("Diamond"),
        "bg-lol-master":
          tier === "Master" || tier === "Grandmaster" || tier === "Challenger",
      })}
      value={tier}
      onChange={(e) => onChange(e.target.value as Tier)}
    >
      {TierList.map((tier) => (
        <option
          key={tier}
          className={classNames({
            "bg-base-100": tier === "Unranked",
            "bg-lol-iron": tier.includes("Iron"),
            "bg-lol-bronze": tier.includes("Bronze"),
            "bg-lol-silver": tier.includes("Silver"),
            "bg-lol-gold": tier.includes("Gold"),
            "bg-lol-platinum": tier.includes("Platinum"),
            "bg-lol-emerald": tier.includes("Emerald"),
            "bg-lol-diamond": tier.includes("Diamond"),
            "bg-lol-master":
              tier === "Master" ||
              tier === "Grandmaster" ||
              tier === "Challenger",
          })}
        >
          {tier}
        </option>
      ))}
    </select>
  );
};
