import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DotsSix } from "@phosphor-icons/react";
import classNames from "classnames";
import { useAtom } from "jotai/react";
import React from "react";
import { MuteCheckbox } from "~/components/MuteCheckbox";
import { OpggLink } from "~/components/OpggLink";
import { TierSelect } from "~/components/TierSelect";
import { summonerReducerFamily } from "~/stores/Summoner";

type SummonerCardProps = { name: string };

export const SummonerCard = React.memo(({ name }: SummonerCardProps) => {
  const [summoner, updateSummoner] = useAtom(summonerReducerFamily(name));

  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({
    id: name,
  });

  return (
    <div
      className={classNames(
        "relative rounded border border-base-content/30 bg-base-200 p-2",
        { "z-1": isDragging },
      )}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div
            className="btn btn-circle"
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
          >
            <DotsSix className="h-4 w-4" />
          </div>
          <span className="font-bold">{name}</span>
        </div>

        {summoner && (
          <div className="flex flex-wrap justify-end gap-1">
            <TierSelect
              tier={summoner.tier}
              point={summoner.point}
              onChange={(tier, point) =>
                updateSummoner({
                  type: "update",
                  name,
                  changes: { tier, point },
                })
              }
            />
            <div className="flex gap-1">
              <OpggLink summoner={summoner} />
              <MuteCheckbox
                isMute={summoner.isMute}
                onChange={(isMute) =>
                  updateSummoner({
                    type: "update",
                    name,
                    changes: { isMute },
                  })
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
