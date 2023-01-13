import { createEvent, fireEvent } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";

import useMatchMediaQueries, { LayoutMode } from "./useMatchMediaQueries";

export async function resizeTo(width: number, height: number) {
  window.innerWidth = width;
  window.innerHeight = height;
  window.outerWidth = width;
  window.outerHeight = height;

  fireEvent(window, createEvent("resize", window));
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe("ui unit test - useMatchMediaQueries", () => {
  it("the result is correct", async () => {
    const { result } = renderHook(() => useMatchMediaQueries());

    // XS: default size
    expect(result.current).toEqual(LayoutMode.XS);

    // XS: 1279 <= innerWidth < 1536
    await act(async () => {
      await resizeTo(1279, 600);
    });
    expect(result.current).toEqual(LayoutMode.XS);

    await act(async () => {
      await resizeTo(1535, 600);
    });
    expect(result.current).toEqual(LayoutMode.XS);

    // SM: 1536 <= innerWidth < 2176
    await act(async () => {
      await resizeTo(1536, 600);
    });
    expect(result.current).toEqual(LayoutMode.SM);

    await act(async () => {
      await resizeTo(2174, 600);
    });
    expect(result.current).toEqual(LayoutMode.SM);

    // MD: 2176 <= innerWidth < 2304
    await act(async () => {
      await resizeTo(2176, 600);
    });
    expect(result.current).toEqual(LayoutMode.MD);

    await act(async () => {
      await resizeTo(2303, 600);
    });
    expect(result.current).toEqual(LayoutMode.MD);

    // LG: 2304 <= innerWidth < Infinity
    await act(async () => {
      await resizeTo(2304, 600);
    });
    expect(result.current).toEqual(LayoutMode.LG);

    await act(async () => {
      await resizeTo(5000, 600);
    });
    expect(result.current).toEqual(LayoutMode.LG);
  });
});
