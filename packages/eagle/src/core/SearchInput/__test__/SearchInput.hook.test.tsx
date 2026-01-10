import { act, renderHook } from "@testing-library/react-hooks";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  searchInputRecentSearchLocalStorageKey,
  useRecentSearch,
} from "../SearchInput.hook";

vi.mock("@src/hooks/useParrotTranslation", () => ({
  default: () => ({
    t: (k: string) => k,
  }),
}));

vi.mock("@cloudtower/icons-react", () => ({
  Search24BlueIcon: "Search24BlueIcon",
  Search24Icon: "Search24Icon",
}));

vi.mock("@src/core/Icon", () => ({
  default: ({ children }: any) => children ?? null,
}));

vi.mock("@src/coreX", () => ({
  OverflowTooltip: ({ content }: any) => content,
}));

describe("useRecentSearch", () => {
  const key = "test-key";

  const setValue = vi.fn();
  const onChange = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should init recentSearchKeys from localStorage", () => {
    localStorage.setItem(
      searchInputRecentSearchLocalStorageKey,
      JSON.stringify({
        [key]: ["a", "b"],
      }),
    );

    const { result } = renderHook(() =>
      useRecentSearch(key, 5, setValue, onChange),
    );

    expect(result.current.recentSearchKeys).toEqual(["a", "b"]);
  });

  it("should fallback to [] when JSON parse fails", () => {
    localStorage.setItem(
      searchInputRecentSearchLocalStorageKey,
      "invalid-json",
    );

    const { result } = renderHook(() =>
      useRecentSearch(key, 5, setValue, onChange),
    );

    expect(result.current.recentSearchKeys).toEqual([]);
  });

  it("should not init when key is undefined", () => {
    const { result } = renderHook(() =>
      useRecentSearch(undefined, 5, setValue, onChange),
    );

    expect(result.current.recentSearchKeys).toEqual([]);
  });

  it("should add recent search after debounce", () => {
    const { result } = renderHook(() =>
      useRecentSearch(key, 5, setValue, onChange),
    );

    act(() => {
      result.current.setRecentSearchKeysDebounceRef.current?.("abc");
    });

    act(() => {
      vi.advanceTimersByTime(401);
    });

    expect(result.current.recentSearchKeys).toEqual(["abc"]);

    const stored = JSON.parse(
      localStorage.getItem(searchInputRecentSearchLocalStorageKey)!,
    );

    expect(stored[key]).toEqual(["abc"]);
  });

  it("should deduplicate recent search", () => {
    localStorage.setItem(
      searchInputRecentSearchLocalStorageKey,
      JSON.stringify({
        [key]: ["abc"],
      }),
    );

    const { result } = renderHook(() =>
      useRecentSearch(key, 5, setValue, onChange),
    );

    act(() => {
      result.current.setRecentSearchKeysDebounceRef.current?.("abc");
      vi.advanceTimersByTime(401);
    });

    expect(result.current.recentSearchKeys).toEqual(["abc"]);
  });

  it("should respect maxRecentCount", () => {
    localStorage.setItem(
      searchInputRecentSearchLocalStorageKey,
      JSON.stringify({
        [key]: ["a", "b", "c"],
      }),
    );

    const { result } = renderHook(() =>
      useRecentSearch(key, 3, setValue, onChange),
    );

    act(() => {
      result.current.setRecentSearchKeysDebounceRef.current?.("d");
      vi.advanceTimersByTime(401);
    });

    expect(result.current.recentSearchKeys).toEqual(["d", "a", "b"]);
  });

  it("should ignore empty val", () => {
    const { result } = renderHook(() =>
      useRecentSearch(key, 5, setValue, onChange),
    );

    act(() => {
      result.current.setRecentSearchKeysDebounceRef.current?.("");
      vi.advanceTimersByTime(401);
    });

    expect(result.current.recentSearchKeys).toEqual([]);
  });

  it("dropdown onClick should trigger setValue/onChange/debounce", () => {
    const { result } = renderHook(() =>
      useRecentSearch(key, 5, setValue, onChange),
    );

    const menu = result.current.antd5DropdownMenu!;

    act(() => {
      menu.onClick?.({ key: "abc" } as any);
    });

    expect(setValue).toHaveBeenCalledWith("abc");
    expect(onChange).toHaveBeenCalledWith("abc");

    act(() => {
      vi.advanceTimersByTime(401);
    });

    expect(result.current.recentSearchKeys).toEqual(["abc"]);
  });

  it("dropdown onMouseDown should prevent blur", () => {
    const { result } = renderHook(() =>
      useRecentSearch(key, 5, setValue, onChange),
    );

    const preventDefault = vi.fn();

    result.current.antd5DropdownMenu?.onMouseDown?.({
      preventDefault,
    } as any);

    expect(preventDefault).toHaveBeenCalled();
  });

  it("should cancel debounce on unmount", () => {
    const cancelSpy = vi.spyOn(require("lodash"), "debounce");

    const { unmount } = renderHook(() =>
      useRecentSearch(key, 5, setValue, onChange),
    );

    unmount();

    expect(cancelSpy).toBeCalled();
  });
});
