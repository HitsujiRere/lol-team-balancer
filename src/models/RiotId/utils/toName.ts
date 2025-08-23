import type { RiotId } from "..";

export const toName = (riotId: RiotId): string => {
  return `${riotId.gameName} #${riotId.tagLine}`;
};
