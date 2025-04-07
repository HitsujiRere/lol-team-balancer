import { err, ok } from "neverthrow";
import { parseToRiotId } from "../utils/parseToRiotId";

describe("parseToRiotId", () => {
  const testcases: [
    Parameters<typeof parseToRiotId>,
    ReturnType<typeof parseToRiotId>,
  ][] = [
    [["ABC #123"], ok({ gameName: "ABC", tagLine: "123" })],
    [["ABC#123"], ok({ gameName: "ABC", tagLine: "123" })],
    [["#"], err()],
    [["ABC"], err()],
    [["ABC #"], err()],
    [["ABC#"], err()],
    [["#123"], err()],
  ];

  testcases.map((testcase) => {
    const parameters = testcase[0];
    const returns = testcase[1];
    test(`(${parameters.join(", ")}) |-> ${JSON.stringify(returns)}`, () => {
      expect(parseToRiotId(parameters[0])).toEqual(returns);
    });
  });
});
