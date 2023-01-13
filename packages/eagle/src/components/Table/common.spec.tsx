import { renderHook } from "@testing-library/react-hooks";
import React, { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

import { kitContext } from "../../spec";
import { antdKit } from "../antd";
import {
  arrayMove,
  handleColumnsByKeys,
  useTransformScrollAndColumns,
} from "./common";

const wrapper = ({ children }: PropsWithChildren<{}>) => (
  <kitContext.Provider value={antdKit}>{children}</kitContext.Provider>
);

describe("arrayMove", () => {
  it("The result of the movement is correct", () => {
    const mockArray = [0, 1, 2, 3, 4, 5, 6];
    const result = arrayMove(mockArray, 1, 5);

    expect(result).toEqual([0, 2, 3, 4, 5, 1, 6]);
  });
});

describe("handleColumnsByKeys", () => {
  it("Correct result when column keys exclude *", () => {
    const totalKeys = ["a", "b", "c", "d"];
    const columnKeys = ["a"];

    const result = handleColumnsByKeys(totalKeys, columnKeys);

    expect(result).toEqual(["a"]);
  });

  it("Correct result when column keys include *", () => {
    const totalKeys = ["a", "b", "c", "d"];
    const columnKeys = ["a", "*"];

    const result = handleColumnsByKeys(totalKeys, columnKeys);

    expect(result).toEqual(["a", "b", "c", "d"]);
  });
});

describe("useTableScrollConfig", () => {
  it("when not set scroll", () => {
    const columns = [{ width: 100 }, { width: 200 }, {}];
    const { result } = renderHook(
      () =>
        useTransformScrollAndColumns<{ width?: number }>({
          columns,
        }),
      {
        wrapper,
      }
    );

    expect(result.current).toEqual([{}, columns]);
  });

  it("when setting the values of X and y for scroll 01", () => {
    const columns = [{ width: 100 }, { width: 200 }, {}];
    const { result } = renderHook(
      () =>
        useTransformScrollAndColumns<{ width?: number }>({
          columns,
          scroll: { x: true, y: true },
        }),
      { wrapper }
    );

    expect(result.current).toEqual([{ y: undefined }, columns]);
  });

  it("when setting the values of X and y for scroll 02", () => {
    const columns = [{ width: 100 }, { width: 200 }, {}];
    const { result } = renderHook(
      () =>
        useTransformScrollAndColumns<{ width?: number }>({
          columns,
          scroll: { x: 400, y: 300 },
        }),
      { wrapper }
    );

    expect(result.current).toEqual([{ y: 300 }, columns]);
  });

  it("when setting the values is 'auto' for scroll", () => {
    const columns = [{ width: 100 }, { width: 200 }, {}];
    const { result } = renderHook(
      () =>
        useTransformScrollAndColumns<{ width?: number }>({
          columns,
          scroll: "auto",
        }),
      { wrapper }
    );

    expect(result.current).toEqual([{ x: 300, y: undefined }, columns]);
  });

  it("when setting the values is 'autoHeight' for scroll", () => {
    const columns = [{ width: 100 }, { width: 200 }, {}];
    const { result } = renderHook(
      () =>
        useTransformScrollAndColumns<{ width?: number }>({
          columns,
          scroll: "autoHeight",
        }),
      { wrapper }
    );

    expect(result.current).toEqual([
      { x: 300, y: "calc(100vh - 0px)" },
      columns,
    ]);
  });
});
