import { vi } from "vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn((query) => {
    let matches = false;
    if (/^\(min-width:\s?\d+px\)/.test(query)) {
      if (query === "(min-width: 1279px)" && window.innerWidth >= 1279) {
        matches = true;
      } else if (query === "(min-width: 1536px)" && window.innerWidth >= 1536) {
        matches = true;
      } else if (query === "(min-width: 2176px)" && window.innerWidth >= 2176) {
        matches = true;
      } else if (query === "(min-width: 2304px)" && window.innerWidth >= 2304) {
        matches = true;
      }
    } else if (/max-width/.test(query)) {
      // mock for ant-design v4 sidebar
      // https://github.com/ant-design/ant-design/blob/master/tests/setup.js#L15
      matches = true;
    }

    return {
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  }),
});

export {};
