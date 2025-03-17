export const choice = <T>(array: readonly T[]) => {
  return array[Math.floor(Math.random() * array.length)];
};
