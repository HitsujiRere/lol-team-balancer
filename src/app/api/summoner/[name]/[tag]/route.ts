import { type NextRequest, NextResponse } from "next/server";
import { fetchAccount } from "~/api/fetchAccount";
import { fetchLeagueEntries } from "~/api/fetchLeagueEntries";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string; tag: string }> },
): Promise<NextResponse> {
  const apikey = process.env.RIOT_API_KEY;

  if (apikey === undefined) {
    return NextResponse.json(
      { error: "Server API key is not set." },
      { status: 500 },
    );
  }

  const { name, tag } = await params;

  const account = await fetchAccount(apikey, { gameName: name, tagLine: tag });
  if (account === undefined) {
    return NextResponse.json({ error: "Summoner not found." }, { status: 404 });
  }

  const leagueEntries = await fetchLeagueEntries(apikey, {
    puuid: account.puuid,
  });
  if (leagueEntries === undefined) {
    return NextResponse.json(
      { error: "Failed to fetch league entries." },
      { status: 500 },
    );
  }

  return NextResponse.json({ leagueEntries: leagueEntries });
}
