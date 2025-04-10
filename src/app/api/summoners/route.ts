import { desc } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { fetchAccount } from "~/api/fetchAccount";
import {
  type LeagueEntries,
  fetchLeagueEntries,
} from "~/api/fetchLeagueEntries";
import { db } from "~/db";
import { riotApiKey } from "~/db/schema";
import { parseToRiotId } from "~/types/RiotId";

export type GetSummonersResponse = {
  summoners?: {
    name: string;
    leagueEntries?: LeagueEntries;
    error?: string;
  }[];
  error?: string;
};

export async function GET(
  request: NextRequest,
): Promise<NextResponse<GetSummonersResponse>> {
  const searchParams = request.nextUrl.searchParams;

  const summonersParam = searchParams.get("summoners");
  if (summonersParam === null) {
    return NextResponse.json(
      { error: "Missing required query parameter: summoners" },
      { status: 400 },
    );
  }

  const summonerNames = decodeURIComponent(summonersParam).split(",");
  if (summonerNames.length >= 15) {
    return NextResponse.json(
      { error: "Too many query parameter: summoners" },
      { status: 400 },
    );
  }

  const [latestRiotApikey] = await db
    .select()
    .from(riotApiKey)
    .orderBy(desc(riotApiKey.createdAt))
    .limit(1);
  if (latestRiotApikey === undefined) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const resultAsyncSummonersLeagueEntries = summonerNames.map((name) =>
    parseToRiotId(name)
      .mapErr(() => "Failed to parse to RiotId")
      .asyncAndThen((id) => fetchAccount(latestRiotApikey.apiKey, id))
      .andThen((account) =>
        fetchLeagueEntries(latestRiotApikey.apiKey, { puuid: account.puuid }),
      )
      .map((leagueEntries) => ({ name, leagueEntries }))
      .mapErr((error) => ({ name, error })),
  );

  const results = (await Promise.all(resultAsyncSummonersLeagueEntries)).map(
    (summoner) =>
      summoner.match(
        (x) => x,
        (x) => x,
      ),
  );

  return NextResponse.json({ summoners: results }, { status: 200 });
}
