import { isRiotId } from "../utils/isRiotId";

describe("isRiotId", () => {
  const testcases: [
    Parameters<typeof isRiotId>,
    ReturnType<typeof isRiotId>,
  ][] = [
    [["ABC #123"], true],
    [["ABC#123"], true],
    [[""], false],
    [["#"], false],
    [["ABC"], false],
    [["ABC #"], false],
    [["ABC#"], false],
    [["#123"], false],
  ];

  testcases.map((testcase) => {
    const parameters = testcase[0];
    const returns = testcase[1];
    test(`(${parameters.join(", ")}) |-> ${returns}`, () => {
      expect(isRiotId(parameters[0])).toBe(returns);
    });
  });
});
