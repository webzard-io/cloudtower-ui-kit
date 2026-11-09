import LegacySelect from "@src/core/LegacySelect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, it, vi } from "vitest";

const options = [{ value: "lucy", label: "Lucy" }];

describe("LegacySelect", () => {
  it("allowClear 时悬停移除图标提示「移除」，点击后清空", async ({
    expect,
  }) => {
    const onChange = vi.fn();
    render(
      <LegacySelect
        input={{ value: "lucy", onChange }}
        options={options}
        allowClear
      />,
    );

    const clearIcon = screen.getByTestId("XmarkCloseCircleFill16TertiaryIcon");

    fireEvent.mouseEnter(clearIcon);
    await waitFor(() => {
      expect(screen.getByText("移除")).toBeInTheDocument();
    });

    fireEvent.mouseDown(clearIcon);
    expect(onChange).toHaveBeenCalledWith(undefined, undefined);
  });

  it("传入 clearIcon 时使用自定义图标", ({ expect }) => {
    render(
      <LegacySelect
        input={{ value: "lucy" }}
        options={options}
        allowClear
        clearIcon={<span data-testid="custom-clear" />}
      />,
    );

    expect(screen.getByTestId("custom-clear")).toBeInTheDocument();
    expect(
      screen.queryByTestId("XmarkCloseCircleFill16TertiaryIcon"),
    ).not.toBeInTheDocument();
  });
});
