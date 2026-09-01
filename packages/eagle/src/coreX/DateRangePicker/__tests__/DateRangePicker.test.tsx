/* eslint-disable testing-library/no-container */
import { fireEvent, render, screen } from "@testing-library/react";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import DateRangePicker from "..";

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
          data-min={props.minDate?.format?.("YYYY-MM-DD HH:mm:ss") || undefined}
          data-max={props.maxDate?.format?.("YYYY-MM-DD HH:mm:ss") || undefined}
        />
      );
    }),
  };
});

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

  it("filters future history to ranges that intersect the effective bounds", () => {
    const history = {
      scope: "default",
      dateRangeHistories: {
        default: [
          {
            type: "absolute" as const,
            value: ["2025-12-08 00:00:00", "2025-12-09 00:00:00"],
            timestamp: 1,
          },
          {
            type: "absolute" as const,
            value: ["2025-12-09 00:00:00", "2025-12-10 00:00:00"],
            timestamp: 2,
          },
          {
            type: "absolute" as const,
            value: ["2027-01-01 00:00:00", "2027-01-02 00:00:00"],
            timestamp: 3,
          },
        ],
      },
      setDateRangeHistory: vi.fn(),
    };

    const { container } = render(
      <DateRangePicker type="future" history={history} />,
    );

    fireEvent.click(container.querySelector(".past-time-icon")!);

    expect(
      screen.queryByText("2025-12-08 12:00:00 - 2025-12-09 12:00:00"),
    ).toBe(null);
    expect(
      screen.getByText("2025-12-09 12:00:00 - 2025-12-10 12:00:00"),
    ).toBeTruthy();
    expect(
      screen.queryByText("2027-01-01 12:00:00 - 2027-01-02 12:00:00"),
    ).toBe(null);
  });

  it("clamps a partially overlapping future history range before change", () => {
    const onChange = vi.fn();
    const history = {
      scope: "default",
      dateRangeHistories: {
        default: [
          {
            type: "absolute" as const,
            value: ["2025-12-09 00:00:00", "2025-12-10 00:00:00"],
            timestamp: 1,
          },
        ],
      },
      setDateRangeHistory: vi.fn(),
    };

    const { container } = render(
      <DateRangePicker type="future" history={history} onChange={onChange} />,
    );

    fireEvent.click(container.querySelector(".past-time-icon")!);
    fireEvent.click(
      screen.getByText("2025-12-09 12:00:00 - 2025-12-10 12:00:00"),
    );

    const [, , changedRange] = onChange.mock.lastCall!;
    expect(
      changedRange.map((item: Dayjs) => item?.format("YYYY-MM-DD HH:mm:ss")),
    ).toEqual(["2025-12-09 10:20:30", "2025-12-10 00:00:00"]);
  });

  it("does not change for a past history range fully before minDate", () => {
    const onChange = vi.fn();
    const history = {
      scope: "default",
      dateRangeHistories: {
        default: [
          {
            type: "absolute" as const,
            value: ["2025-12-01 00:00:00", "2025-12-02 00:00:00"],
            timestamp: 1,
          },
        ],
      },
      setDateRangeHistory: vi.fn(),
    };

    const { container } = render(
      <DateRangePicker
        minDate={dayjs("2025-12-09 10:20:30")}
        history={history}
        onChange={onChange}
      />,
    );

    fireEvent.click(container.querySelector(".past-time-icon")!);
    fireEvent.click(
      screen.getByText("2025-12-01 12:00:00 - 2025-12-02 12:00:00"),
    );

    expect(onChange).not.toHaveBeenCalled();
    expect(history.setDateRangeHistory).not.toHaveBeenCalled();
  });

  it("does not change for a past history range fully after maxDate", () => {
    const onChange = vi.fn();
    const history = {
      scope: "default",
      dateRangeHistories: {
        default: [
          {
            type: "absolute" as const,
            value: ["2025-12-20 00:00:00", "2025-12-21 00:00:00"],
            timestamp: 1,
          },
        ],
      },
      setDateRangeHistory: vi.fn(),
    };

    const { container } = render(
      <DateRangePicker
        maxDate={dayjs("2025-12-09 10:20:30")}
        history={history}
        onChange={onChange}
      />,
    );

    fireEvent.click(container.querySelector(".past-time-icon")!);
    fireEvent.click(
      screen.getByText("2025-12-20 12:00:00 - 2025-12-21 12:00:00"),
    );

    expect(onChange).not.toHaveBeenCalled();
    expect(history.setDateRangeHistory).not.toHaveBeenCalled();
  });

  it("keeps a valid partially overlapping past history range after clamping", () => {
    const onChange = vi.fn();
    const history = {
      scope: "default",
      dateRangeHistories: {
        default: [
          {
            type: "absolute" as const,
            value: ["2025-12-08 00:00:00", "2025-12-10 00:00:00"],
            timestamp: 1,
          },
        ],
      },
      setDateRangeHistory: vi.fn(),
    };

    const { container } = render(
      <DateRangePicker
        minDate={dayjs("2025-12-09 10:20:30")}
        history={history}
        onChange={onChange}
      />,
    );

    fireEvent.click(container.querySelector(".past-time-icon")!);
    fireEvent.click(
      screen.getByText("2025-12-08 12:00:00 - 2025-12-10 12:00:00"),
    );

    const [, , changedRange] = onChange.mock.lastCall!;
    expect(
      changedRange.map((item: Dayjs) => item?.format("YYYY-MM-DD HH:mm:ss")),
    ).toEqual(["2025-12-09 10:20:30", "2025-12-10 00:00:00"]);
  });
});
