type FetchAccountParameters = {
  gameName: string;
  tagLine: string;
};

type Account = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

export const fetchAccount = async (
  apiKey: string,
  { gameName, tagLine }: FetchAccountParameters,
) => {
  const res = await fetch(
    `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
    {
      headers: {
        "X-Riot-Token": apiKey,
      },
    },
  );
  if (res.status !== 200) {
    return undefined;
  }
  return (await res.json()) as Account;
};
