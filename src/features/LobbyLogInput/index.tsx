import type React from "react";

const parseLogToNames = (log: string): string[] => {
  // 制御文字を削除
  const formattedLog = log.replaceAll("\u2066", "").replaceAll("\u2069", "");
  // "サモナー名 #タグライン"を抽出
  const regex = /^([^#]+ #[A-Za-z0-9]{3,5})/gm;
  const match = formattedLog.match(regex);
  return match ?? [];
};

export const LobbyLogInput = () => {
  const handlerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const names = parseLogToNames(event.target.value);
    console.log({ names });
  };

  return (
    <textarea
      placeholder="さもなー #JP1がロビーに参加しました。"
      className="textarea h-40 w-full"
      onChange={handlerChange}
    />
  );
};
