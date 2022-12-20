import dayjs from "dayjs";
import { describe, expect, it } from "vitest";

import { DateRange } from "../src/components";
import {
  addMissingDataWithZero,
  convertDataForMultiArea,
  deletePointsOutOfRange,
  filterPointsByDateRange,
  formatStreams,
  getFaultToleranceTime,
  getFirstExpectedTimestamp,
  getMs,
  getXAxisDomain,
  tickFormatter,
  transformData,
  xaxisCal,
} from "../src/components/Metric/metric";
import mockMetric from "./mockMetric";

describe("deletePointsOutOfRange", () => {
  it("2h should has 234 data", () => {
    const mockPoints = mockMetric.sample_streams[0].points!;

    const date = new Date("2022-12-13 18:00").getTime();
    const result = deletePointsOutOfRange(mockPoints, "2h", date);

    expect(result.length).toBe(234);
  });
});

describe("getMs", () => {
  it("2h should be 2*60*60*1000", () => {
    const result = getMs("2h");
    expect(result).toBe(60 * 60 * 2 * 1000);
  });
});

describe("filterPointsByDateRange", () => {
  it("has 234 data", () => {
    const mockPoints = mockMetric.sample_streams[0].points!;

    const points = filterPointsByDateRange(mockPoints, [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ]);

    expect(points.length).toBe(234);
  });
});

describe("formatStreams", () => {
  it("has 234 data", () => {
    const result = formatStreams({
      metric: mockMetric,
      dateRange: [dayjs("2022-12-13 16:00"), dayjs("2022-12-13 18:00")],
    });
    expect(result[0]?.points?.length).toBe(234);
  });
});

describe("addMissingDataWithZero", () => {
  it("has 240 data", () => {
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
  it("has 240 data", () => {
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
  it("h2 be 120 * 1000", () => {
    const h2 = getFaultToleranceTime("2h");

    expect(h2).toBe(120 * 1000);
  });
  it("h24 be 10 * 60 * 1000", () => {
    const h24 = getFaultToleranceTime("24h");

    expect(h24).toBe(10 * 60 * 1000);
  });
  it("d7 be 60 * 60 * 1000", () => {
    const d7 = getFaultToleranceTime("7d");

    expect(d7).toBe(60 * 60 * 1000);
  });
  it("d30 be 60 * 60 * 1000", () => {
    const d30 = getFaultToleranceTime("30d");

    expect(d30).toBe(60 * 60 * 1000);
  });
  it("d182 be 24 * 60 * 60 * 1000", () => {
    const d182 = getFaultToleranceTime("182d");

    expect(d182).toBe(24 * 60 * 60 * 1000);
  });
  it("d188 be 120 * 1000", () => {
    const d188 = getFaultToleranceTime("188d");

    expect(d188).toBe(120 * 1000);
  });
});

describe("getXAxisDomain", () => {
  it("should equal [1670918400000, 1670925600000]", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ];
    const metric = mockMetric;
    const streams = formatStreams({ metric, dateRange });
    const points =
      streams
        .find((stream) => stream.points != null && stream.points?.length !== 0)
        ?.points?.map(({ t, v }) => ({
          t,
          v,
          unit: metric.unit,
        })) ?? [];

    const range = "2h";
    const now = new Date("2022-12-13 18:00").getTime();
    const areaChartData = transformData(
      streams,
      range,
      metric.unit,
      metric.step,
      dateRange,
      now
    );
    const res = getXAxisDomain(areaChartData, points, range, dateRange);
    expect(res).toEqual([1670918400000, 1670925600000]);
  });
});

describe("xaxisCal", () => {
  it("xAisTicks start 1670925600000 should be [ 1670920200000, 1670922000000, 1670923800000, 1670925600000 ]", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ];
    const range = "2h";
    const res = xaxisCal(1670925600000, range, dateRange);
    expect(res).toEqual([
      1670920200000, 1670922000000, 1670923800000, 1670925600000,
    ]);
  });
});

describe("tickFormatter", () => {
  it("[1670920200000, 1670922000000, 1670923800000, 1670925600000] format as [ '16:30:00', '17:00:00', '17:30:00', '18:00:00' ]", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ];
    const range = "2h";
    const res = [
      1670920200000, 1670922000000, 1670923800000, 1670925600000,
    ].map((tick) => {
      return tickFormatter(tick, range, dateRange);
    });
    expect(res).toEqual(["16:30:00", "17:00:00", "17:30:00", "18:00:00"]);
  });
});

describe("getFirstExpectedTimestamp", () => {
  it("firstShouldbe 1670918407000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ];
    const timeRange = "2h";
    const now = new Date("2022-12-13 18:00").getTime();

    const streams = formatStreams({
      metric: mockMetric,
      dateRange,
    });

    const inRangePoints = deletePointsOutOfRange(
      streams[0].points ?? [],
      timeRange,
      now
    );

    const firsExpectedTimestamp = getFirstExpectedTimestamp(
      inRangePoints,
      timeRange,
      now,
      mockMetric.step
    );

    expect(firsExpectedTimestamp).toBe(1670918407000);
  });
});

describe("convertDataForMultiArea", () => {
  it("should has 240 data", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ];
    const range = "2h";
    const now = new Date("2022-12-13 18:00").getTime();

    const streams = formatStreams({
      metric: mockMetric,
      dateRange,
    });

    const res = convertDataForMultiArea(
      streams,
      range,
      mockMetric.unit,
      mockMetric.step,
      dateRange,
      now
    );

    expect(res.length).toBe(240);
  });
});
