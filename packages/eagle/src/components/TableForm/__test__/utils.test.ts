import { TableFormColumn } from "../types";
import { genEmptyRow, increaseLastNumber, moveItemInArray } from "../utils";

describe("unit test: moveItemInArray", () => {
  const arr = [
    { a: 1 },
    { b: 2 },
    { c: 3 },
    { d: 4 },
    { e: 5 },
    { f: 6 },
    { g: 7 },
  ];
  it("test fromIndex invalid", () => {
    expect(moveItemInArray(arr, -2, 3)).toEqual(arr);
    expect(moveItemInArray(arr, 7, 3)).toEqual(arr);
  });
  it("test move item", () => {
    expect(moveItemInArray(arr, 6, 3)).toEqual([
      { a: 1 },
      { b: 2 },
      { c: 3 },
      { g: 7 },
      { d: 4 },
      { e: 5 },
      { f: 6 },
    ]);
    expect(moveItemInArray(arr, 4, 3)).toEqual([
      { a: 1 },
      { b: 2 },
      { c: 3 },
      { e: 5 },
      { d: 4 },
      { f: 6 },
      { g: 7 },
    ]);
    expect(moveItemInArray(arr, 4, -1)).toEqual([
      { a: 1 },
      { b: 2 },
      { c: 3 },
      { d: 4 },
      { f: 6 },
      { e: 5 },
      { g: 7 },
    ]);
    expect(moveItemInArray(arr, 3, 10)).toEqual([
      { a: 1 },
      { b: 2 },
      { c: 3 },
      { e: 5 },
      { f: 6 },
      { g: 7 },
      { d: 4 },
    ]);
  });
});

describe("unit test: genEmptyRow", () => {
  const columns: TableFormColumn[] = [
    {
      title: "a",
      defaultValue: "a",
      key: "a",
    },
    {
      title: "b",
      defaultValue: "b",
      key: "b",
    },
    {
      title: "c",
      defaultValue: "c",
      key: "c",
    },
  ];
  it("test columns are empty", () => {
    expect(genEmptyRow([])).toEqual({});
  });
  it("test columns are not empty", () => {
    expect(genEmptyRow(columns)).toEqual({
      a: "a",
      b: "b",
      c: "c",
    });
  });
});

describe("unit test: increaseLastNumber", () => {
  it("test str not end with number", () => {
    expect(increaseLastNumber("", 0)).toBe("");
    expect(increaseLastNumber("str-not-end-with-number", 0)).toBe(
      "str-not-end-with-number",
    );
  });
  it("test str end with number", () => {
    expect(increaseLastNumber("str-end-with-number-0", 0)).toBe(
      "str-end-with-number-0",
    );
    expect(increaseLastNumber("str-end-with-number-3", 2)).toBe(
      "str-end-with-number-5",
    );
    expect(increaseLastNumber("88", 5)).toBe("93");
  });
});
