/* eslint-disable testing-library/no-container */
import { fireEvent, render, screen } from "@testing-library/react";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@src/coreX/DateRangePicker/AbsoluteDate", () => {
  return {
    default: React.forwardRef<
      { reset?: () => void },
      {
        minDate?: { format?: (pattern: string) => string };
        maxDate?: { format?: (pattern: string) => string };
      }
    >((props, ref) => {
      React.useImperativeHandle(ref, () => ({
        reset: vi.fn(),
      }));

      return (
        <div
          data-testid="absolute-date-props"
          data-min={
            props.minDate?.format?.("YYYY-MM-DD HH:mm:ss") || undefined
          }
          data-max={
            props.maxDate?.format?.("YYYY-MM-DD HH:mm:ss") || undefined
          }
        />
      );
    }),
  };
});

import DateRangePicker from "..";

describe("DateRangePicker future absolute bounds", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-12-09T10:20:30"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("passes the default future bounds to absolute mode", () => {
    const { container } = render(
      <DateRangePicker
        mode="absolute"
        type="future"
        value={[dayjs("2025-12-09 10:20:30"), dayjs("2025-12-09 10:20:30")]}
      />,
    );

    fireEvent.click(container.querySelector(".date-input-content")!);

    expect(screen.getByTestId("absolute-date-props")).toHaveAttribute(
      "data-min",
      "2025-12-09 10:20:30",
    );
    expect(screen.getByTestId("absolute-date-props")).toHaveAttribute(
      "data-max",
      "2026-12-09 10:20:30",
    );
  });

  it("intersects stricter business bounds with the future default range", () => {
    const { container } = render(
      <DateRangePicker
        mode="absolute"
        type="future"
        minDate={dayjs("2025-12-10 08:00:00")}
        maxDate={dayjs("2026-03-01 09:30:00")}
        value={[dayjs("2025-12-10 08:00:00"), dayjs("2025-12-10 08:00:00")]}
      />,
    );

    fireEvent.click(container.querySelector(".date-input-content")!);

    expect(screen.getByTestId("absolute-date-props")).toHaveAttribute(
      "data-min",
      "2025-12-10 08:00:00",
    );
    expect(screen.getByTestId("absolute-date-props")).toHaveAttribute(
      "data-max",
      "2026-03-01 09:30:00",
    );
  });

  it("returns future relative values and ranges with the direction preserved", () => {
    const onChange = vi.fn();
    const { container } = render(
      <DateRangePicker
        type="future"
        onChange={onChange}
        relativeTimeSelectOptions={[
          {
            unit: "M",
            value: 1,
          },
        ]}
      />,
    );

    fireEvent.click(container.querySelector(".date-input-content")!);
    fireEvent.click(screen.getByText("未来 1 个月"));

    const [changedType, changedTime, changedRange] = onChange.mock.lastCall!;

    expect(changedType).toBe("relative");
    expect(changedTime).toEqual({
      unit: "M",
      value: 1,
      type: "future",
    });
    expect(
      changedRange.map((item: Dayjs) => item?.format("YYYY-MM-DD HH:mm:ss")),
    ).toEqual(["2025-12-09 10:20:30", "2026-01-09 10:20:30"]);
  });
});
