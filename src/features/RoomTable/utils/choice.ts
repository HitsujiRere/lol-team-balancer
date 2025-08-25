export const choice = <T>(data: readonly T[]): T => {
  return data[Math.floor(Math.random() * data.length)];
};
