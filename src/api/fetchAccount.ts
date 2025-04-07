import { ResultAsync, err, ok } from "neverthrow";
import { z } from "zod";
import type { RiotId } from "~/types/RiotId";

const accountSchema = z.object({
  puuid: z.string(),
  gameName: z.string(),
  tagLine: z.string(),
});

export type Account = z.infer<typeof accountSchema>;

export const fetchAccount = (
  apiKey: string,
  { gameName, tagLine }: RiotId,
): ResultAsync<Account, string> => {
  return ResultAsync.fromPromise(
    fetch(
      `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      {
        headers: { "X-Riot-Token": apiKey },
      },
    ),
    (error) => new Error(`Failed to fetch: ${(error as Error).message}`),
  )
    .mapErr((error) => error.message)
    .andThen((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          return err("Summoner not found");
        }
        return err(`Failed to fetch: ${response.status}`);
      }
      return ResultAsync.fromPromise(
        response.json(),
        () => "Failed to parse JSON",
      );
    })
    .andThen((data) => {
      const parsedData = accountSchema.safeParse(data);
      return parsedData.success
        ? ok(parsedData.data)
        : err("Failed validation");
    });
};
