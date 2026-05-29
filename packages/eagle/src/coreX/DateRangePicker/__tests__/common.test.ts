import dayjs from "dayjs";
import { describe, expect, it } from "vitest";

import {
  getDateText,
  getEffectiveAbsoluteTimeBounds,
  getRelativeTimeRange,
  normalizeRelativeTime,
} from "../common";

const t = ((
  key: string,
  options?: {
    count?: number;
  },
) => {
  const count = options?.count;

  return (
    {
      "common.day_count": `${count} day`,
      "common.hour_count": `${count} hour`,
      "common.minute_count": `${count} minute`,
      "common.month_measure_count": `${count} month`,
      "common.year_count": `${count} year`,
      "components.past": "Past",
      "components.future": "Future",
    }[key] || key
  );
}) as any;

describe("DateRangePicker common helpers", () => {
  it("normalizes legacy relative time values with the picker type", () => {
    expect(
      normalizeRelativeTime(
        {
          unit: "M",
          value: 2,
        },
        "future",
      ),
    ).toEqual({
      unit: "M",
      value: 2,
      type: "future",
    });
  });

  it("keeps the same reference when the relative value already has a type", () => {
    const relativeTime = {
      unit: "M" as const,
      value: 2,
      type: "future" as const,
    };

    expect(normalizeRelativeTime(relativeTime, "past")).toBe(relativeTime);
  });

  it("formats past and future labels with direction-aware text", () => {
    expect(
      getDateText(
        {
          unit: "h",
          value: 1,
          type: "past",
        },
        t,
      ),
    ).toBe("Past 1 hour");

    expect(
      getDateText(
        {
          unit: "y",
          value: 1,
          type: "future",
        },
        t,
      ),
    ).toBe("Future 1 year");
  });

  it("returns relative ranges with now first for past and future", () => {
    const nowDate = dayjs("2025-12-09 10:20:30");

    expect(
      getRelativeTimeRange(
        {
          unit: "d",
          value: 2,
          type: "past",
        },
        "past",
        nowDate,
      ).map((item) => item?.format("YYYY-MM-DD HH:mm:ss")),
    ).toEqual(["2025-12-09 10:20:30", "2025-12-07 10:20:30"]);

    expect(
      getRelativeTimeRange(
        {
          unit: "M",
          value: 3,
          type: "future",
        },
        "past",
        nowDate,
      ).map((item) => item?.format("YYYY-MM-DD HH:mm:ss")),
    ).toEqual(["2025-12-09 10:20:30", "2026-03-09 10:20:30"]);
  });

  it("uses the future default absolute bounds and intersects stricter inputs", () => {
    const nowDate = dayjs("2025-12-09 10:20:30");

    const defaultBounds = getEffectiveAbsoluteTimeBounds(
      "future",
      undefined,
      undefined,
      nowDate,
    );
    expect(dayjs(defaultBounds.minDate).format("YYYY-MM-DD HH:mm:ss")).toBe(
      "2025-12-09 10:20:30",
    );
    expect(dayjs(defaultBounds.maxDate).format("YYYY-MM-DD HH:mm:ss")).toBe(
      "2026-12-09 10:20:30",
    );

    const intersectedBounds = getEffectiveAbsoluteTimeBounds(
      "future",
      dayjs("2025-12-10 08:00:00"),
      dayjs("2026-03-01 09:30:00"),
      nowDate,
    );
    expect(dayjs(intersectedBounds.minDate).format("YYYY-MM-DD HH:mm:ss")).toBe(
      "2025-12-10 08:00:00",
    );
    expect(dayjs(intersectedBounds.maxDate).format("YYYY-MM-DD HH:mm:ss")).toBe(
      "2026-03-01 09:30:00",
    );
  });
});
