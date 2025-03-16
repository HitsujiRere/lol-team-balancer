export const popcount = (x: number) => {
  let cnt = 0;
  for (let a = x; a !== 0; a &= a - 1) {
    cnt++;
  }
  return cnt;
};
