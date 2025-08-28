export const encodeLevel = (level?: number): string => {
  if (level === undefined) {
    return "";
  }
  return String(level);
};
