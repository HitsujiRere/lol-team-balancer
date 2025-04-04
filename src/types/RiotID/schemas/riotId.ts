import { z } from "zod";

export const riotIDSchema = z.object({
  gameName: z.string(),
  tagLine: z.string(),
});
