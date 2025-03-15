export const parseMessagesToNames = (messages: string): string[] => {
  // "サモナー名 #タグライン"を抽出
  return messages.match(/^.+ #.+(?=がロビーに参加しました。$)/gm) ?? [];
};
