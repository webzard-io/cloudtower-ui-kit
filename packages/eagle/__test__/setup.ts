import "@testing-library/jest-dom";

import { initParrotI18n } from "@cloudtower/parrot";
import fs from "node:fs";
import path from "path";
import { format, plugins } from "pretty-format";
import ResizeObserver from "resize-observer-polyfill";
import { expect, vi } from "vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

global.ResizeObserver = ResizeObserver;

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(() => []),
  unobserve: vi.fn(),
})) as unknown as typeof IntersectionObserver;

Element.prototype.scrollIntoView = vi.fn();

const styleMapFileName = path.join(__dirname, "../linaria-temp-map.json");

const safeJsonParse = (text: string) => {
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
};
expect.addSnapshotSerializer({
  serialize(
    val: { linaria: true; dom: HTMLElement },
    config,
    indentation,
    depth,
    refs,
    printer,
  ) {
    if (val.linaria) {
      return format(val.dom, {
        plugins: [
          plugins.DOMElement,
          {
            serialize(val, config, indentation, depth, refs, printer) {
              const classNames = val.split(" ");
              const styles = fs.existsSync(styleMapFileName)
                ? safeJsonParse(fs.readFileSync(styleMapFileName, "utf-8"))
                : {};
              return classNames
                .map((classname) => {
                  if (styles[`.${classname}`] != null) {
                    return styles[`.${classname}`];
                  }
                  return classname;
                })
                .toString();
            },
            test(val) {
              return typeof val === "string";
            },
          },
        ],
      });
    }
    return printer(val, config, indentation, depth, refs);
  },

  test: (val) => {
    return val?.linaria;
  },
});

initParrotI18n({
  resources: {
    "en-US": {
      test: {
        error_message_batch: "Batch Error Message {count}",
      },
    },
    "ja-JP": {
      test: {
        error_message_batch: "Batch Error Message {count}",
      },
    },
    "zh-CN": {
      test: {
        error_message_batch: "聚合错误信息 {count}",
      },
    },
  },
});

export {};
