const { sum, divide } = require("../src/calc");

describe("calc", () => {
  test("sum should add two numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });

  test("sum should throw if args are not numbers", () => {
    expect(() => sum("2", 3)).toThrow(TypeError);
  });

  test("divide should divide two numbers", () => {
    expect(divide(10, 2)).toBe(5);
  });

  test("divide should throw when dividing by zero", () => {
    expect(() => divide(10, 0)).toThrow("cannot divide by zero");
  });
});
