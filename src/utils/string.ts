export const trimControlChar = (text: string, excepts = "") => {
  const regex = new RegExp(`[^\\P{C}${excepts}]`, "gu");
  return text.replace(regex, "");
};
