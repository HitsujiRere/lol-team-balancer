import type { RiotId } from "@/models//RiotId";
import type { Tier } from "@/models/Tier";

export type Summoner = {
  name: string;
  riotId?: RiotId;
  level?: number;
  tier?: Tier;
  isMute: boolean;
};

export { newSummoner } from "./utils/new";
