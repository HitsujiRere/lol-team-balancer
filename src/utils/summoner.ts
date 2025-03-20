export const isRiotId = (name: string) => {
  return /^.+ ?#.+$/.test(name);
};

export const parseRiotId = (name: string) => {
  const res = name.match(/^(.+?) ?#(.+)$/);
  if (res !== null && res.length === 3) {
    const [, gameName, tagLine] = res;
    return { gameName, tagLine };
  }
};
