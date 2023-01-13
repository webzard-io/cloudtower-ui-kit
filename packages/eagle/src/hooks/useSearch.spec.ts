import { act, renderHook } from "@testing-library/react-hooks";

import { hashHistory } from "../utils";
import useSearch from "./useSearch";

describe("ui unit test - useSearch", () => {
  hashHistory.push({
    search: 'view="detail"',
  });

  it('should get current "view" search', () => {
    const { result } = renderHook(() => useSearch<string>("view", ""));
    expect(result.current[0] === "detail").toBe(true);
  });

  it('should get changed "view" search', () => {
    const { result } = renderHook(() => useSearch<string>("view", ""));
    act(() => {
      hashHistory.push({
        search: 'view="user_storage"',
      });
    });
    expect(result.current[0] === "user_storage").toBe(true);
  });

  it("should set new search", () => {
    const { result } = renderHook(() => useSearch<string>("view", ""));
    act(() => result.current[1]("system_storage"));
    expect(result.current[0] === "system_storage").toBe(true);
  });

  it("multiple components used, unified changes", () => {
    const { result } = renderHook(() => useSearch<string>("view", ""));
    const { result: result2 } = renderHook(() => useSearch<string>("view", ""));
    act(() => result.current[1]("detail"));
    expect(result.current[0] === result2.current[0]).toBe(true);
    act(() => result2.current[1]("system_storage"));
    expect(result.current[0] === result2.current[0]).toBe(true);
  });

  it("cannot set new search after hook unmounted", () => {
    const { result, unmount } = renderHook(() => useSearch<string>("view", ""));
    act(() => result.current[1]("cluster"));
    expect(result.current[0] === "cluster").toBe(true);
    expect(hashHistory.location.search === "?view=%22cluster%22").toBe(true);
    unmount();
    act(() => {
      result.current[1]("system_storage");
    });
    expect(result.current[0] === "cluster").toBe(true);
    expect(hashHistory.location.search === "?view=%22cluster%22").toBe(true);
  });

  it("the results should be correct when the search criteria are cleared", () => {
    const { result } = renderHook(() => useSearch<string>("query", ""));
    act(() => {
      result.current[1]("keyword");
    });
    expect(result.current[0]).toBe("keyword");
    act(() => {
      result.current[1]("");
    });
    expect(result.current[0]).toBe("");
  });

  it("the results should be correct when the param of setSearch is a function", () => {
    const { result, rerender } = renderHook(() =>
      useSearch<string>("enable", "false")
    );
    act(() => {
      hashHistory.push({
        search: 'enable="true"',
      });
    });
    expect(result.current[0] === "true").toBe(true);
    rerender();
    act(() => {
      result.current[1]((val) => "true");
    });
    expect(result.current[0] === "true").toBe(true);
  });
});
