import { initParrotI18n, parrotI18n } from "@cloudtower/parrot";
import { ReactNode } from "react";
import { describe, it, vi } from "vitest";

import { createBatchMessageMethods } from "..";

let infoCount = 0;

let warningCount = 0;

vi.mock("antd", () => {
  const info = (content: string) => {
    infoCount++;
  };
  const success = (content: string) => {};
  const error = (content: string) => {};

  const warning = (content: string) => {
    warningCount++;
  };

  const warn = (content: string) => {};

  const loading = (content: string) => {};
  return {
    message: {
      info,
      success,
      error,
      warning,
      warn,
      loading,
    },
  };
});

beforeAll(() => {
  initParrotI18n();
  vi.useFakeTimers();
});

beforeEach(() => {
  infoCount = 0;
  warningCount = 0;
});

const patterMap: Record<
  string,
  { batchKey: string; patterns: RegExp[] } | undefined
> = {
  "common.error_message": {
    batchKey: "common.error_message",
    patterns: [new RegExp("^hello .+$")],
  },
};

const batchHelper = {
  getBatchKey: (content: ReactNode) => {
    let batchKey: string | undefined;
    for (const key of Object.keys(patterMap)) {
      if (patterMap[key]?.patterns.some((p) => p.test(String(content)))) {
        batchKey = patterMap[key]?.batchKey;
        break;
      }
    }
    return batchKey;
  },
  getBatchContent: (batchKey: string, count: number) => {
    return parrotI18n.t(batchKey);
  },
};

describe("patchMessageMethods", () => {
  it("2 message", () => {
    const message = createBatchMessageMethods(batchHelper);

    message.info("hello info 1");

    message.info("hello info 2");

    vi.advanceTimersToNextTimer();
    expect(infoCount).toBe(2);
  });

  it("3 message", () => {
    const message = createBatchMessageMethods(batchHelper);
    message.warning("hello warning 3");
    message.warning("hello warning 4");
    message.warning("hello warning 5");

    vi.advanceTimersToNextTimer();
    expect(warningCount).toBe(1);
  });
});
