import { parseToRiotId, type RiotId } from "@/models/RiotId";

/**
 * ルームチャットからRiotIdを抽出します
 * @param chat ルームチャット
 * @returns
 */
export const parseRiotIdsFromChat = (chat: string): RiotId[] => {
  const names = Array.from(
    chat.match(/^.+ #.+(?=(がロビーに参加しました。| joined the lobby)$)/gm) ??
      [],
  );

  return names
    .map((name) => parseToRiotId(name))
    .filter((riotId) => riotId.isOk())
    .map((riotId) => riotId.value);
};
