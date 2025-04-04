import { type Result, err, ok } from "neverthrow";
import type { RiotId } from "..";

export const parseToRiotId = (name: string): Result<RiotId, void> => {
  const res = name.match(/^(.+?) ?#(.+)$/);

  if (res === null || res.length !== 3) {
    return err();
  }

  const [, gameName, tagLine] = res;
  return ok({ gameName, tagLine });
};
