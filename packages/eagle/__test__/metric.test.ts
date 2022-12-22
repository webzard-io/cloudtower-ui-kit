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
    const result = deletePointsOutOfRange(
      mockPoints,
      [dayjs("2022-12-13 16:00"), dayjs("2022-12-13 18:00")],
      date
    );

    expect(result.length).toBe(234);
  });
});

describe("getMs", () => {
  it("2h should be 2*60*60*1000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ];
    const result = getMs(dateRange);
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
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ];
    const h2 = getFaultToleranceTime(dateRange);

    expect(h2).toBe(120 * 1000);
  });
  it("h24 be 10 * 60 * 1000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-14 16:00"),
    ];
    const h24 = getFaultToleranceTime(dateRange);

    expect(h24).toBe(10 * 60 * 1000);
  });
  it("d7 be 60 * 60 * 1000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-20 16:00"),
    ];
    const d7 = getFaultToleranceTime(dateRange);

    expect(d7).toBe(60 * 60 * 1000);
  });
  it("d30 be 60 * 60 * 1000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2023-01-12 16:00"),
    ];
    const d30 = getFaultToleranceTime(dateRange);

    expect(d30).toBe(60 * 60 * 1000);
  });
  it("d182 be 24 * 60 * 60 * 1000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2023-06-13 16:00"),
    ];
    const d182 = getFaultToleranceTime(dateRange);

    expect(d182).toBe(24 * 60 * 60 * 1000);
  });
  it("d188 be 120 * 1000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2023-06-19 16:00"),
    ];
    const d188 = getFaultToleranceTime(dateRange);

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
      metric.unit,
      metric.step,
      dateRange,
      now
    );
    const res = getXAxisDomain(dateRange);
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
    const res = xaxisCal(1670925600000, dateRange);
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
      return tickFormatter(tick, dateRange);
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
      dateRange,
      now
    );

    const firsExpectedTimestamp = getFirstExpectedTimestamp(
      inRangePoints,
      dateRange,
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
      mockMetric.unit,
      mockMetric.step,
      dateRange,
      now
    );

    expect(res.length).toBe(240);
  });
});
