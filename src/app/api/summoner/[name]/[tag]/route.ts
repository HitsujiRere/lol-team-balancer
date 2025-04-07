import { type NextRequest, NextResponse } from "next/server";
import { fetchAccount } from "~/api/fetchAccount";
import {
  type LeagueEntries,
  fetchLeagueEntries,
} from "~/api/fetchLeagueEntries";

export type GetSummonerResponse =
  | { leagueEntries: LeagueEntries }
  | { error: string };

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string; tag: string }> },
): Promise<NextResponse<GetSummonerResponse>> {
  const apikey = process.env.RIOT_API_KEY;
  if (apikey === undefined) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  const { name, tag } = await params;

  const account = await fetchAccount(apikey, { gameName: name, tagLine: tag });
  if (account.isErr()) {
    return NextResponse.json({ error: account.error }, { status: 500 });
  }

  return fetchLeagueEntries(apikey, {
    puuid: account.value.puuid,
  }).match(
    (leagueEntries) => NextResponse.json({ leagueEntries }),
    (error) => {
      if (error === "Summoner not found") {
        return NextResponse.json({ error }, { status: 404 });
      }
      return NextResponse.json({ error }, { status: 500 });
    },
  );
}
