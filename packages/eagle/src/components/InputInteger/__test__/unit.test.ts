import { describe, it } from "vitest";

import formatterInteger from "../formatterInteger";

describe("formatterInteger", () => {
  it("valid_number", ({ expect }) => {
    const value = 20;
    const result = formatterInteger(value);
    expect(result).toBe(value.toString());
  });

  it("valid_string", ({ expect }) => {
    const value = "20";
    const result = formatterInteger(value);
    expect(result).toBe(value.toString());
  });

  it("invalid_number", ({ expect }) => {
    const value = 20.1;
    const result = formatterInteger(value);
    expect(result).toBe(201);
  });

  it("invalid_string", ({ expect }) => {
    const value = "20.1";
    const result = formatterInteger(value);
    expect(result).toBe(201);
  });
});
