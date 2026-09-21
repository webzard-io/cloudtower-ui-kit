import { fireEvent, render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import AbsoluteDate from "../AbsoluteDate";

describe("AbsoluteDate", () => {
  it("prevents selecting a time earlier than the future-mode minDate on the same day", () => {
    const onOk = vi.fn();

    render(
      <AbsoluteDate
        range={[dayjs("2025-12-09 00:00:00"), dayjs("2025-12-09 00:00:00")]}
        minDate={dayjs("2025-12-09 10:00:00")}
        maxDate={dayjs("2026-12-09 10:00:00")}
        onChange={vi.fn()}
        onOk={onOk}
      />,
    );

    fireEvent.change(screen.getAllByPlaceholderText("hh")[0], {
      target: {
        value: "09",
      },
    });

    fireEvent.click(screen.getByText("确定"));

    expect(screen.getByText(/10:00:00/)).toBeInTheDocument();
    expect(onOk).not.toHaveBeenCalled();
  });
});
