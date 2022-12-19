import dayjs from "dayjs";
import { describe, expect, it } from "vitest";

import { DateRange } from "../src/components";
import {
  addMissingDataWithZero,
  deletePointsOutOfRange,
  filterPointsByDateRange,
  formatStreams,
  getFaultToleranceTime,
  getMs,
  rangeToTimestamp,
  transformData,
} from "../src/components/Metric/metric";
import mockMetric from "./mockMetric";

describe("deletePointsOutOfRange", () => {
  it("2h should be 234", () => {
    const mockPoints = mockMetric.sample_streams[0].points!;

    const date = new Date("2022-12-13 18:00").getTime();
    const result = deletePointsOutOfRange(mockPoints, "2h", date);

    expect(result.length).toBe(234);
  });

  it("getMs", () => {
    const result = getMs("2h");
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
      "2h",
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
      "2h",
      mockMetric.unit,
      mockMetric.step,
      [dayjs("2022-12-13 16:00"), dayjs("2022-12-13 18:00")],
      new Date("2022-12-13 18:00").getTime()
    );
    expect(result.length).toBe(240);
  });
});

describe("getFaultToleranceTime", () => {
  it("h2", () => {
    const h2 = getFaultToleranceTime("2h");

    expect(h2).toBe(120 * 1000);
  });
  it("h24", () => {
    const h24 = rangeToTimestamp("24h");

    expect(h24).toBe(10 * 60 * 1000);
  });
  it("d7", () => {
    const d7 = rangeToTimestamp("7d");

    expect(d7).toBe(60 * 60 * 1000);
  });
  it("d30", () => {
    const d30 = rangeToTimestamp("30d");

    expect(d30).toBe(60 * 60 * 1000);
  });
  it("d182", () => {
    const d182 = rangeToTimestamp("182d");

    expect(d182).toBe(24 * 60 * 60 * 1000);
  });
  it("d188", () => {
    const d188 = rangeToTimestamp("188d");

    expect(d188).toBe(24 * 60 * 60 * 1000);
  });
});
