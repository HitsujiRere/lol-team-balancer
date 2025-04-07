import { ResultAsync, errAsync, okAsync } from "neverthrow";
import type { GetSummonersResponse } from "~/app/api/summoners/route";

export const fetchSummonersLeagueEntries = (names: string[]) => {
  if (names.length === 0) {
    return okAsync([]);
  }

  const params = new URLSearchParams({
    summoners: encodeURIComponent(names.join(",")),
  });

  return ResultAsync.fromPromise(
    fetch(`/api/summoners?${params.toString()}`),
    (error) => new Error(`Failed to fetch: ${(error as Error).message}`),
  )
    .mapErr((error) => error.message)
    .andThen((res) =>
      ResultAsync.fromPromise(res.json(), () => "Failed to parse JSON"),
    )
    .map((res) => res as GetSummonersResponse)
    .andThen((res) =>
      res.summoners ? okAsync(res.summoners) : errAsync(res.error),
    );
};
