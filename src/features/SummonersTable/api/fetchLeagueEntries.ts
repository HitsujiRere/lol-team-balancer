import type { LeagueEntry } from "~/api/fetchLeagueEntries";
import type { RiotId } from "~/types/RiotId";

export const fetchLeagueEntries = async ({ gameName, tagLine }: RiotId) => {
  const res = await fetch(`/api/summoner/${gameName}/${tagLine}`);
  if (res.status !== 200) {
    return undefined;
  }
  return (await res.json()).leagueEntries as LeagueEntry[];
};
