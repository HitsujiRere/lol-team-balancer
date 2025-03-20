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
          "bg-base-100": tier === "UNRANKED",
          "bg-lol-iron": tier.includes("IRON"),
          "bg-lol-bronze": tier.includes("BRONZE"),
          "bg-lol-silver": tier.includes("SILVER"),
          "bg-lol-gold": tier.includes("GOLD"),
          "bg-lol-platinum": tier.includes("PLATINUM"),
          "bg-lol-emerald": tier.includes("EMERALD"),
          "bg-lol-diamond": tier.includes("DIAMOND"),
          "bg-lol-master":
            tier === "MASTER" ||
            tier === "GRANDMASTER" ||
            tier === "CHALLENGER",
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
              "bg-base-100": tier === "UNRANKED",
              "bg-lol-iron": tier.includes("IRON"),
              "bg-lol-bronze": tier.includes("BRONZE"),
              "bg-lol-silver": tier.includes("SILVER"),
              "bg-lol-gold": tier.includes("GOLD"),
              "bg-lol-platinum": tier.includes("PLATINUM"),
              "bg-lol-emerald": tier.includes("EMERALD"),
              "bg-lol-diamond": tier.includes("DIAMOND"),
              "bg-lol-master":
                tier === "MASTER" ||
                tier === "GRANDMASTER" ||
                tier === "CHALLENGER",
            })}
          >
            {tier}
          </option>
        ))}
      </select>
      <label
        className={classNames("join-item input ", {
          "input-warning tooltip tooltip-warning bg-warning/10":
            tier === "UNRANKED",
        })}
        data-tip="ランクが UNRANKED のサモナーは、チーム分けの際にポイントが平均値に設定されます。"
      >
        <input
          type="number"
          className="w-8 appearance-none text-end"
          readOnly={tier === "UNRANKED"}
          value={point}
          onChange={(e) => onChange(tier, e.target.valueAsNumber)}
        />
        <span>pt</span>
      </label>
    </div>
  );
};

export { tierToPoint, pointToTier };
