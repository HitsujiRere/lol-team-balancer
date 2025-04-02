import { ResultAsync, err, ok } from "neverthrow";
import { z } from "zod";

const leagueEntrySchema = z.object({
  leagueId: z.string(),
  queueType: z.string(),
  tier: z.enum([
    "CHALLENGER",
    "GRANDMASTER",
    "MASTER",
    "DIAMOND",
    "EMERALD",
    "PLATINUM",
    "GOLD",
    "SILVER",
    "BRONZE",
    "IRON",
  ]),
  rank: z.enum(["I", "II", "III", "IV"]),
  summonerId: z.string(),
  puuid: z.string(),
  leaguePoints: z.number(),
  wins: z.number(),
  losses: z.number(),
  veteran: z.boolean(),
  inactive: z.boolean(),
  freshBlood: z.boolean(),
  hotStreak: z.boolean(),
});

const leagueEntriesSchema = z.array(leagueEntrySchema);

export type LeagueEntry = z.infer<typeof leagueEntrySchema>;

export type LeagueEntries = z.infer<typeof leagueEntriesSchema>;

export const fetchLeagueEntries = (
  apiKey: string,
  { puuid }: { puuid: string },
): ResultAsync<LeagueEntries, string> => {
  return ResultAsync.fromPromise(
    fetch(
      `https://jp1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
      {
        headers: { "X-Riot-Token": apiKey },
      },
    ),
    (error) => new Error(`Failed to fetch: ${(error as Error).message}`),
  )
    .orElse((error) => err(error.message))
    .andThen((response) => {
      if (!response.ok) {
        return err(`Failed to fetch: ${response.status}`);
      }
      return ResultAsync.fromPromise(
        response.json(),
        () => "Failed to parse JSON",
      );
    })
    .andThen((data) => {
      const parsedData = leagueEntriesSchema.safeParse(data);
      return parsedData.success
        ? ok(parsedData.data)
        : err("Failed validation");
    });
};
