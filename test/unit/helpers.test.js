import { range } from "../../src/helpers";

test("should output an array", () => {
  const arr = range(1, 10);
  expect(arr).toBe([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
