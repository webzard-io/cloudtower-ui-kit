import { fireEvent } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";

import {
  LayoutMode,
  useLocalStorage,
  useMatchMediaQueries,
  useSearch,
} from "../src/hooks";
import { hashHistory } from "../src/utils";

export async function resizeTo(width: number, height: number): Promise<void> {
  window.innerWidth = width;
  window.innerHeight = height;
  window.outerWidth = width;
  window.outerHeight = height;
  fireEvent(window, new Event("resize"));
  await new Promise((resolve) => setTimeout(resolve, 500));
}

describe("ui unit test - useLocalstorage", () => {
  const defaultStorage = "test storage";
  const newStorage = "new test storage";
  it("should use localstorage", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-local-storage", defaultStorage)
    );
    const [storage, setStorage, removeStorage] = result.current;
    expect(storage).toEqual(defaultStorage);
    expect(typeof setStorage).toBe("function");
    expect(typeof removeStorage).toBe("function");
  });

  it("shuld set localstorage", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-local-storage", defaultStorage)
    );
    act(() => result.current[1](newStorage));
    expect(result.current[0]).toBe(newStorage);

    const testStorage = localStorage.getItem("test-local-storage")!;
    expect(JSON.parse(testStorage)).toEqual({
      versions: 2,
      value: newStorage,
    });
  });

  it("shuld remove localstorage", () => {
    localStorage.removeItem("test-local-storage");
    const { result } = renderHook(() =>
      useLocalStorage("test-local-storage", defaultStorage)
    );
    act(result.current[2]);
    expect(result.current[0]).toBe(null);

    const testStorage = localStorage.getItem("test-local-storage");
    expect(testStorage).toBe(null);
  });

  it("value from localstorage", () => {
    localStorage.setItem(
      "test-local-storage",
      JSON.stringify({
        versions: 2,
        value: newStorage,
      })
    );
    const { result } = renderHook(() =>
      useLocalStorage("test-local-storage", defaultStorage)
    );
    expect(result.current[0]).toEqual(newStorage);
  });

  it("multiole component used, unified changes", () => {
    localStorage.removeItem("test-local-storage");
    const { result } = renderHook(() =>
      useLocalStorage("test-local-storage", defaultStorage)
    );
    const { result: result2 } = renderHook(() =>
      useLocalStorage("test-local-storage", defaultStorage)
    );
    act(() => result.current[1](newStorage));
    expect(result.current[0] === result2.current[0]).toBe(true);
    act(() => result2.current[1](defaultStorage));
    expect(result.current[0] === result2.current[0]).toBe(true);
  });

  it("localstorage versions", () => {
    localStorage.setItem(
      "test-local-storage",
      JSON.stringify({
        // current versions is 2
        versions: 1,
        value: newStorage,
      })
    );
    const { result } = renderHook(() =>
      useLocalStorage("test-local-storage", defaultStorage)
    );
    expect(result.current[0]).toBe(defaultStorage);
  });
});

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
      result.current[1]((val) => val);
    });
    expect(result.current[0] === "true").toBe(true);
  });
});

describe("ui unit test - useMatchMediaQueries", () => {
  it.skip("the result is correct", () => {
    const { result } = renderHook(() => useMatchMediaQueries());

    // XS: default size
    expect(result.current).toEqual(LayoutMode.XS);

    // XS: 1279 <= innerWidth < 1536
    act(() => {
      resizeTo(1279, 600);
    });
    expect(result.current).toEqual(LayoutMode.XS);

    act(() => {
      resizeTo(1535, 600);
    });
    expect(result.current).toEqual(LayoutMode.XS);

    // SM: 1536 <= innerWidth < 2176
    act(() => {
      resizeTo(1536, 600);
    });
    expect(result.current).toEqual(LayoutMode.SM);

    act(() => {
      resizeTo(2174, 600);
    });
    expect(result.current).toEqual(LayoutMode.SM);

    // MD: 2176 <= innerWidth < 2304
    act(() => {
      resizeTo(2176, 600);
    });
    expect(result.current).toEqual(LayoutMode.MD);

    act(() => {
      resizeTo(2303, 600);
    });
    expect(result.current).toEqual(LayoutMode.MD);

    // LG: 2304 <= innerWidth < Infinity
    act(() => {
      resizeTo(2304, 600);
    });
    expect(result.current).toEqual(LayoutMode.LG);

    act(() => {
      resizeTo(5000, 600);
    });
    expect(result.current).toEqual(LayoutMode.LG);
  });
});
