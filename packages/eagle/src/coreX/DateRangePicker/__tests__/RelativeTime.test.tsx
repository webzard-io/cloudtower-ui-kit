import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import RelativeTime from "../RelativeTime";

vi.mock("@src/hooks/useParrotTranslation", () => ({
  default: () => ({
    t: (key: string, options?: { count?: number }) => {
      const translations: Record<string, string> = {
        "common.hour_count": `${options?.count} hour`,
        "components.past": "Past",
        "components.future": "Future",
        "components.search_relative_time_placeholder": "Search relative time",
      };

      return translations[key] || key;
    },
  }),
}));

const config = [{ unit: "h" as const, value: 1 }];

describe("RelativeTime", () => {
  it("selects a legacy value in past mode", () => {
    render(
      <RelativeTime
        config={config}
        value={{ unit: "h", value: 1 }}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("listitem")).toHaveClass("selected");
  });

  it("selects a legacy value in future mode", () => {
    render(
      <RelativeTime
        type="future"
        config={config}
        value={{ unit: "h", value: 1 }}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("listitem")).toHaveClass("selected");
  });

  it("respects an explicit value direction", () => {
    render(
      <RelativeTime
        type="future"
        config={config}
        value={{ unit: "h", value: 1, type: "past" }}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("listitem")).not.toHaveClass("selected");
  });
});
