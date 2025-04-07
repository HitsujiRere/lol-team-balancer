export const isRiotId = (name: string): boolean => {
  return /^.+ ?#.+$/.test(name);
};
