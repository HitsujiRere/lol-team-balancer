import { BugIcon } from "lucide-react";
import React from "react";
import { useShallow } from "zustand/shallow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TIERS, type Tier } from "@/models/Tier";
import { useDebugStore } from "@/stores/useDebugStore";
import { useRoomStore } from "@/stores/useRoomStore";
import { useSummonersStore } from "@/stores/useSummonersStore";
import { choice } from "../utils/choice";

export const DebugButtons = () => {
  const debugMode = useDebugStore((state) => state.debugMode);

  const roomNames = useRoomStore(useShallow((state) => state.names));
  const changeSummoner = useSummonersStore((state) => state.change);

  const randomizeSummonersTier = React.useCallback(
    (tiers: readonly Tier[]) => {
      roomNames.forEach((name) => {
        const tier = choice(tiers);
        changeSummoner(name, { tier });
      });
    },
    [roomNames, changeSummoner],
  );

  const clickAllTiersHandler = React.useCallback(() => {
    randomizeSummonersTier(TIERS);
  }, [randomizeSummonersTier]);
  const clickLowTierHandler = React.useCallback(() => {
    randomizeSummonersTier(TIERS.slice(0, 13));
  }, [randomizeSummonersTier]);

  return (
    <>
      <Button
        className={cn({ hidden: !debugMode })}
        onClick={clickAllTiersHandler}
        size="sm"
        variant="outline"
      >
        <BugIcon />
        仮ランク設定 (All)
      </Button>

      <Button
        className={cn({ hidden: !debugMode })}
        onClick={clickLowTierHandler}
        size="sm"
        variant="outline"
      >
        <BugIcon />
        仮ランク設定 (~Silver)
      </Button>
    </>
  );
};
