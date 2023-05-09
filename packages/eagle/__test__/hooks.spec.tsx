import { fireEvent } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { useLocalStorage } from "../src/hooks";

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
