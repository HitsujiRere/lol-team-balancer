import { err, ok, type Result } from "neverthrow";
import type { RiotId } from "..";
import { sanitize } from "./sanitize";

export const parseToRiotId = (name: string): Result<RiotId, void> => {
  const res = name.match(/^(.+?) ?#(.+)$/);

  if (res === null || res.length !== 3) {
    return err();
  }

  const [, rawGameName, rawTagLine] = res;

  return ok({
    gameName: sanitize(rawGameName),
    tagLine: sanitize(rawTagLine),
  });
};
