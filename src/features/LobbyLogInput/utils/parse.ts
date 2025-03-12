export const parseLogToNames = (log: string): string[] => {
  // 制御文字を削除
  const formattedLog = log.replaceAll("\u2066", "").replaceAll("\u2069", "");
  // "サモナー名 #タグライン"を抽出
  const regex = /^([^#]+ #[A-Za-z0-9]{3,5})/gm;
  const match = formattedLog.match(regex);
  return match ?? [];
};
