import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { Banner } from "..";

describe("Banner", () => {
  it("supports a caller-supplied id and preserves the legacy action callback", () => {
    const onClick = vi.fn();
    const wrapperClick = vi.fn();
    render(
      <Banner
        type="info"
        message="Message"
        data-testid="banner"
        id="custom-id"
        onClick={wrapperClick}
        className="custom"
        style={{ marginBottom: 20 }}
        btnProps={{ text: "Action", onClick }}
      />
    );
    expect(screen.getByTestId("banner")).toHaveAttribute("id", "custom-id");
    const action = screen.getByTestId("banner-action");
    expect(action.tagName).toBe("SPAN");
    expect(action).toHaveClass("dashed-btn");
    fireEvent.click(screen.getByRole("button", { name: "Action" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(wrapperClick).not.toHaveBeenCalled();
    fireEvent.keyDown(action, { key: "Enter" });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("does not render absent or hidden actions or single-page pagination", () => {
    const { rerender } = render(
      <Banner
        type="info"
        message="Message"
        data-testid="default-banner"
        pagination={{ current: 1, total: 1, onChange: vi.fn() }}
      />
    );
    expect(screen.getByTestId("default-banner")).not.toHaveAttribute("id");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    rerender(
      <Banner
        type="info"
        message="Message"
        btnProps={{ text: "Action", hide: true }}
      />
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("cycles pages and delegates removal, but prevents dismissing errors", () => {
    const onChange = vi.fn();
    const onClose = vi.fn();
    const props = {
      message: "Message",
      pagination: { current: 1, total: 3, onChange },
      onClose,
    };
    const { rerender } = render(<Banner {...props} type="info" />);
    fireEvent.click(screen.getByRole("button", { name: "上一条" }));
    expect(onChange).toHaveBeenLastCalledWith(3);
    fireEvent.click(screen.getByRole("button", { name: "下一条" }));
    expect(onChange).toHaveBeenLastCalledWith(2);
    fireEvent.click(screen.getByRole("button", { name: "移除本条提示" }));
    expect(onClose).toHaveBeenCalledTimes(1);
    rerender(
      <Banner
        {...props}
        type="error"
        pagination={{ ...props.pagination, current: 3 }}
      />
    );
    expect(
      screen.queryByRole("button", { name: "移除本条提示" })
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "下一条" }));
    expect(onChange).toHaveBeenLastCalledWith(1);
  });
});
