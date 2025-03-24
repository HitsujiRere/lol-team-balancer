type FetchLeagueEntriesParameters = {
  puuid: string;
};

export type LeagueEntry = {
  leagueId: string;
  queueType: string;
  tier:
    | "CHALLENGER"
    | "GRANDMASTER"
    | "MASTER"
    | "DIAMOND"
    | "EMERALD"
    | "PLATINUM"
    | "GOLD"
    | "SILVER"
    | "BRONZE"
    | "IRON";
  rank: "I" | "II" | "III" | "IV";
  summonerId: string;
  puuid: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
};

export const fetchLeagueEntries = async (
  apiKey: string,
  { puuid }: FetchLeagueEntriesParameters,
) => {
  const res = await fetch(
    `https://jp1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
    {
      headers: {
        "X-Riot-Token": apiKey,
      },
    },
  );
  if (res.status !== 200) {
    return undefined;
  }
  return (await res.json()) as LeagueEntry[];
};
