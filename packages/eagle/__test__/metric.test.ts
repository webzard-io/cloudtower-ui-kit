import dayjs from "dayjs";
import { describe, expect, it } from "vitest";

import { DateRange } from "../src/components";
import {
  addMissingDataWithZero,
  deletePointsOutOfRange,
  filterPointsByDateRange,
  formatStreams,
  getMs,
  transformData,
} from "../src/components/Metric/metric";
import mockMetric from "./mockMetric";

describe("deletePointsOutOfRange", () => {
  it("2h should be 234", () => {
    const mockPoints = mockMetric.sample_streams[0].points!;

    const date = new Date("2022-12-13 18:00").getTime();
    const result = deletePointsOutOfRange(
      mockPoints,
      [dayjs("2022-12-13 16:00"), dayjs("2022-12-13 18:00")],
      date
    );

    expect(result.length).toBe(234);
  });

  it("getMs", () => {
    const result = getMs([
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ]);
    expect(result).toBe(60 * 60 * 2 * 1000);
  });
});

describe("filterPointsByDateRange", () => {
  it("has data", () => {
    const mockPoints = mockMetric.sample_streams[0].points!;

    const points = filterPointsByDateRange(mockPoints, [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ]);

    expect(points.length).toBe(234);
  });
});

describe("formatStreams", () => {
  it("has data", () => {
    const result = formatStreams({
      metric: mockMetric,
      dateRange: [dayjs("2022-12-13 16:00"), dayjs("2022-12-13 18:00")],
    });
    expect(result[0]?.points?.length).toBe(234);
  });
});

describe("addMissingDataWithZero", () => {
  it("has data", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ];

    const streams = formatStreams({
      metric: mockMetric,
      dateRange,
    });
    const result = addMissingDataWithZero(
      streams[0].points ?? [],
      mockMetric.unit,
      mockMetric.step,
      dateRange,
      new Date("2022-12-13 18:00").getTime()
    );
    expect(result.length).toBe(240);
  });
});

describe("transformData", () => {
  it("has data", () => {
    const streams = formatStreams({
      metric: mockMetric,
      dateRange: [dayjs("2022-12-13 16:00"), dayjs("2022-12-13 18:00")],
    });

    const result = transformData(
      streams,
      mockMetric.unit,
      mockMetric.step,
      [dayjs("2022-12-13 16:00"), dayjs("2022-12-13 18:00")],
      new Date("2022-12-13 18:00").getTime()
    );
    expect(result.length).toBe(240);
  });
});
