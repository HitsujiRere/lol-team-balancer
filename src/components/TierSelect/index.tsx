import classNames from "classnames";
import { type Tier, TierList } from "~/types/Tier";
import { pointToTier } from "./utils/pointToTier";
import { tierToPoint } from "./utils/tierToPoint";

type TierSelectProps = {
  tier: Tier;
  point: number;
  onChange: (tier: Tier, point: number) => void;
};

export const TierSelect = ({ tier, point, onChange }: TierSelectProps) => {
  return (
    <div className="join">
      <select
        className={classNames("select join-item w-32", {
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
        value={tier}
        onChange={(e) => {
          const tier = e.target.value as Tier;
          const point = tierToPoint(tier);
          onChange(tier, point);
        }}
      >
        {TierList.map((tier) => (
          <option
            key={tier}
            value={tier}
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
      <label
        className={classNames("join-item input ", {
          "input-warning tooltip tooltip-warning bg-warning/10":
            tier === "Unranked",
        })}
        data-tip="ランクが Unranked のサモナーは、チーム分けの際にポイントが平均値に設定されます。"
      >
        <input
          type="number"
          className="w-8 appearance-none text-end"
          readOnly={tier === "Unranked"}
          value={point}
          onChange={(e) => onChange(tier, e.target.valueAsNumber)}
        />
        <span>pt</span>
      </label>
    </div>
  );
};

export { tierToPoint, pointToTier };
