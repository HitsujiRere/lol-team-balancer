import type { LeagueEntry } from "~/api/fetchLeagueEntries";

export const fetchLeagueEntries = async (gameName: string, tagLine: string) => {
  const res = await fetch(`/api/summoner/${gameName}/${tagLine}`);
  if (res.status !== 200) {
    return undefined;
  }
  return (await res.json()).leagueEntries as LeagueEntry[];
};
