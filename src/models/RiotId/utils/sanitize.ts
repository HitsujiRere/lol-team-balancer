const ignoreCodes: string[] = ["⁦", "⁩"] as const;

export const sanitize = (text: string): string => {
  return [...text].filter((ch) => !ignoreCodes.includes(ch)).join("");
};
