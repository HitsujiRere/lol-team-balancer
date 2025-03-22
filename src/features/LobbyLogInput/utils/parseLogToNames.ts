export const parseLogToNames = (log: string): string[] => {
  // "サモナー名 #タグライン"を抽出
  return log.match(/^.+ #.+(?=がロビーに参加しました。$)/gm) ?? [];
};
