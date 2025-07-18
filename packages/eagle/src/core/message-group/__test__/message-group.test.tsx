import { initParrotI18n, parrotI18n } from "@cloudtower/parrot";
import { useMessage } from "@src/core/message/useMessage";
import UIKitProvider from "@src/UIKitProvider";
import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import React from "react";
import { describe, it, vi } from "vitest";

import _message from "../../message/message";
import { createBatchMessageMethods } from "..";

let infoCount = 0;

let warningCount = 0;

let warningMsg = "";

let hidden = false;
Object.defineProperty(document, "hidden", {
  configurable: true,
  get() {
    return hidden;
  },
  set(bool) {
    hidden = Boolean(bool);
  },
});

vi.mock("../../message/message", async () => {
  const DEFAULT_DURATION = 3;
  const info = (content: unknown) => {
    infoCount++;
  };
  const success = (content: unknown) => {};
  const error = (content: unknown) => {};

  const warning = (content: unknown) => {
    if (typeof content === "object") {
      // @ts-ignore
      warningMsg = content.content;
    } else {
      // @ts-ignore
      warningMsg = content;
    }

    warningCount++;
  };

  const warn = (content: unknown) => {};

  const loading = (content: unknown) => {};
  const config = () => {};

  return {
    DEFAULT_DURATION,
    default: {
      info,
      success,
      error,
      warning,
      warn,
      loading,
      config,
    },
    info,
    success,
    error,
    warning,
    warn,
    loading,
    config,
  };
});

beforeAll(() => {
  initParrotI18n();
  vi.useFakeTimers();
});

beforeEach(() => {
  infoCount = 0;
  warningCount = 0;
  warningMsg = "";
});

const patterMap: Record<
  string,
  { batchKey: string; patterns: RegExp[] } | undefined
> = {
  "common.error_message": {
    batchKey: "test.error_message_batch",
    patterns: [
      new RegExp("^hello .+$"),
      new RegExp("^错误信息"),
      new RegExp("^Error Message"),
    ],
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
    return parrotI18n.t(batchKey, { count });
  },
};

describe("patchMessageMethods", () => {
  it("2 message", () => {
    const message = createBatchMessageMethods(_message, batchHelper);

    message.info("hello info 1");

    message.info("hello info 2");

    vi.advanceTimersToNextTimer();
    expect(infoCount).toBe(2);
  });

  it("3 message", () => {
    const message = createBatchMessageMethods(_message, batchHelper);
    message.warning("hello warning 3");
    message.warning("hello warning 4");
    message.warning("hello warning 5");
    vi.advanceTimersToNextTimer();
    expect(warningCount).toBe(1);
    expect(warningMsg).toMatchInlineSnapshot('"聚合错误信息 3"');
  });

  it("complex warning message precheck", () => {
    const message = createBatchMessageMethods(_message, batchHelper);
    message.info("a");
    message.info("b");
    message.info("c");
    //@ts-ignore
    document.hidden = true;

    message.warning(parrotI18n.t("common.error_message"));
    message.warning(parrotI18n.t("common.error_message"));
    message.warning(parrotI18n.t("common.error_message"));
    message.info("d");
    message.info("e");
    vi.advanceTimersToNextTimer();
    expect(infoCount).toBe(3);
    expect(warningCount).toBe(0);
    expect(warningMsg).toMatchInlineSnapshot('""');
  });

  it("complex 2 warning message", () => {
    const message = createBatchMessageMethods(_message, batchHelper);
    message.info("a");
    message.info("b");
    message.info("c");
    //@ts-ignore
    document.hidden = true;

    message.warning(parrotI18n.t("common.error_message"));
    message.warning(parrotI18n.t("common.error_message"));
    message.warning(parrotI18n.t("common.error_message"));
    message.info("d");
    message.info("e");
    vi.advanceTimersToNextTimer();

    //@ts-ignore
    document.hidden = false;
    message.warning(parrotI18n.t("common.error_message"));
    message.warning(parrotI18n.t("common.error_message"));
    vi.advanceTimersToNextTimer();
    expect(warningCount).toBe(2);
    expect(warningMsg).toMatchInlineSnapshot('"错误信息"');
  });

  it("complex 1 warning message", () => {
    const message = createBatchMessageMethods(_message, batchHelper);
    message.info("a");
    message.info("b");
    message.info("c");

    //@ts-ignore
    document.hidden = true;
    message.warning(parrotI18n.t("common.error_message"));
    message.warning(parrotI18n.t("common.error_message"));
    message.warning(parrotI18n.t("common.error_message"));
    message.info("d");
    message.info("e");

    //@ts-ignore
    document.hidden = false;
    message.warning(parrotI18n.t("common.error_message"));
    message.warning(parrotI18n.t("common.error_message"));
    message.warning(parrotI18n.t("common.error_message"));
    vi.advanceTimersToNextTimer();
    expect(warningCount).toBe(1);
    expect(warningMsg).toMatchInlineSnapshot('"聚合错误信息 3"');
  });
});

const TestComponent = () => {
  const message = useMessage();
  return (
    <button
      data-testid={"message-group-button"}
      onClick={() => {
        message.warning(parrotI18n.t("common.error_message"));
      }}
    >
      Test Component
    </button>
  );
};

describe("useMessage hook", () => {
  it("has no provider", () => {
    render(<TestComponent />);
    const button = screen.getByTestId("message-group-button");
    button.click();
    button.click();
    button.click();
    expect(warningMsg).toMatchInlineSnapshot('"错误信息"');
    expect(warningCount).toBe(3);
  });
  it("has provider with batch", () => {
    render(
      <UIKitProvider
        lng="zh-CN"
        message={{
          batch: batchHelper,
          maxCount: 3,
        }}
      >
        <TestComponent />
      </UIKitProvider>,
    );
    const button = screen.getByTestId("message-group-button");
    button.click();
    button.click();
    button.click();
    expect(warningMsg).toMatchInlineSnapshot('"聚合错误信息 3"');
    expect(warningCount).toBe(1);
  });
  it("has provider without batch", () => {
    render(
      <UIKitProvider
        lng="zh-CN"
        message={{
          batch: batchHelper,
          maxCount: 3,
        }}
      >
        <TestComponent />
      </UIKitProvider>,
    );
    const button = screen.getByTestId("message-group-button");
    button.click();
    button.click();

    vi.advanceTimersToNextTimer();
    vi.advanceTimersToNextTimer();
    expect(warningMsg).toMatchInlineSnapshot('"错误信息"');
    expect(warningCount).toBe(2);
  });
});
