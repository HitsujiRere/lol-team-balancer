import { isRiotId } from "./utils/isRiotId";
import { parseToRiotId } from "./utils/parseToRiotId";

export type RiotId = {
  gameName: string;
  tagLine: string;
};

export { isRiotId, parseToRiotId };
