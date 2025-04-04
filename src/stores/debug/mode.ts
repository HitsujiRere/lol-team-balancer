import { atom } from "jotai/vanilla";

export const debugmodeAtom = atom(process.env.NODE_ENV === "development");
