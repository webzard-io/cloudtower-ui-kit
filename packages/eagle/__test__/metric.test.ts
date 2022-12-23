import { DAY, HOUR, MINUTE, WEEK } from "@tower/utils";
import dayjs from "dayjs";
import { describe, expect, it } from "vitest";

import { DateRange } from "../src/components";
import {
  addMissingDataWithZero,
  convertDataForMultiArea,
  convertDataStruct,
  filterPointsByDateRange,
  formatStreams,
  getFaultToleranceTime,
  getFirstExpectedTimestamp,
  getMs,
  getStep,
  getXAxisDomain,
  tickFormatter,
  transformData,
  xaxisCal,
} from "../src/components/Metric/metric";
import mockMetric from "./mockMetric";

describe("getMs", () => {
  it("2h should be 2*60*60*1000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ];
    const result = getMs(dateRange);
    expect(result).toBe(60 * 60 * 2 * 1000);
    expect(result).toMatchSnapshot();
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
    expect(points).toMatchSnapshot();
  });
});

describe("formatStreams", () => {
  it("has 234 data", () => {
    const result = formatStreams({
      metric: mockMetric,
      dateRange: [dayjs("2022-12-13 16:00"), dayjs("2022-12-13 18:00")],
    });
    expect(result[0]?.points?.length).toBe(234);
    expect(result).toMatchSnapshot();
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
      30000,
      dateRange,
      new Date("2022-12-13 18:00").getTime()
    );
    expect(result.length).toBe(240);
    expect(result).toMatchSnapshot();
  });
});

describe("transformData", () => {
  it("has 240 data", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ];
    const streams = formatStreams({
      metric: mockMetric,
      dateRange: dateRange,
    });

    const result = transformData(
      streams,
      mockMetric.unit,
      30000,
      dateRange,
      new Date("2022-12-13 18:00").getTime()
    );
    expect(result.length).toBe(240);
    expect(result).toMatchSnapshot();
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
    expect(h2).toMatchSnapshot();
  });
  it("h24 be 10 * 60 * 1000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-14 16:00"),
    ];
    const h24 = getFaultToleranceTime(dateRange);

    expect(h24).toBe(10 * 60 * 1000);
    expect(h24).toMatchSnapshot();
  });
  it("d7 be 60 * 60 * 1000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-20 16:00"),
    ];
    const d7 = getFaultToleranceTime(dateRange);

    expect(d7).toBe(60 * 60 * 1000);
    expect(d7).toMatchSnapshot();
  });
  it("d30 be 60 * 60 * 1000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2023-01-12 16:00"),
    ];
    const d30 = getFaultToleranceTime(dateRange);

    expect(d30).toBe(60 * 60 * 1000);
    expect(d30).toMatchSnapshot();
  });
  it("d182 be 24 * 60 * 60 * 1000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2023-06-13 16:00"),
    ];
    const d182 = getFaultToleranceTime(dateRange);

    expect(d182).toBe(24 * 60 * 60 * 1000);
    expect(d182).toMatchSnapshot();
  });
  it("d188 be 120 * 1000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2023-06-19 16:00"),
    ];
    const d188 = getFaultToleranceTime(dateRange);

    expect(d188).toBe(120 * 1000);
    expect(d188).toMatchSnapshot();
  });
});

describe("getXAxisDomain", () => {
  it("should equal [1670918400000, 1670925600000]", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ];

    const res = getXAxisDomain(dateRange);
    expect(res).toEqual([1670918400000, 1670925600000]);
    expect(res).toMatchSnapshot();
  });
});

describe("xaxisCal", () => {
  it("xAisTicks start 1670925600000 should be [ 1670920200000, 1670922000000, 1670923800000, 1670925600000 ]", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ];
    const res = xaxisCal(1670925600000, dateRange);
    expect(res).toEqual([
      1670920200000, 1670922000000, 1670923800000, 1670925600000,
    ]);
    expect(res).toMatchSnapshot();
  });
});

describe("tickFormatter", () => {
  it("[1670920200000, 1670922000000, 1670923800000, 1670925600000] format as [ '16:30:00', '17:00:00', '17:30:00', '18:00:00' ]", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ];
    const res = [
      1670920200000, 1670922000000, 1670923800000, 1670925600000,
    ].map((tick) => {
      return tickFormatter(tick, dateRange);
    });
    expect(res).toEqual(["16:30:00", "17:00:00", "17:30:00", "18:00:00"]);
    expect(res).toMatchSnapshot();
  });
});

describe("getFirstExpectedTimestamp", () => {
  it("firstShouldbe 1670918407000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ];

    const now = new Date("2022-12-13 18:00").getTime();

    const streams = formatStreams({
      metric: mockMetric,
      dateRange,
    });

    const inRangePoints = filterPointsByDateRange(
      streams[0].points ?? [],
      dateRange
    );

    const firsExpectedTimestamp = getFirstExpectedTimestamp(
      inRangePoints,
      dateRange,
      now,
      30000
    );

    expect(firsExpectedTimestamp).toBe(1670918407000);
    expect(firsExpectedTimestamp).toMatchSnapshot();
  });
});

describe("convertDataForMultiArea", () => {
  it("should has 240 data", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ];

    const now = new Date("2022-12-13 18:00").getTime();

    const streams = formatStreams({
      metric: mockMetric,
      dateRange,
    });

    const res = convertDataForMultiArea(
      streams,
      mockMetric.unit,
      30000,
      dateRange,
      now
    );

    expect(res.length).toBe(240);
    expect(res).toMatchSnapshot();
  });
});

describe("getStep", () => {
  it("2 hours should be MINUTE * 5 * 1000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-13 18:00"),
    ];

    const step = getStep(dateRange);
    expect(step).toBe(MINUTE * 5 * 1000);
    expect(step).toMatchSnapshot();
  });

  it("1 day should be HOUR * 1 * 1000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-14 16:00"),
    ];

    const step = getStep(dateRange);
    expect(step).toBe(HOUR * 1 * 1000);
    expect(step).toMatchSnapshot();
  });

  it("7 days should be DAY * 1000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2022-12-20 16:00"),
    ];

    const step = getStep(dateRange);
    expect(step).toBe(DAY * 1000);
    expect(step).toMatchSnapshot();
  });

  it("30 days should be DAY * 1000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2023-01-12 16:00"),
    ];

    const step = getStep(dateRange);
    expect(step).toBe(DAY * 1000);
    expect(step).toMatchSnapshot();
  });

  it("182 days should be WEEK * 1000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2023-06-13 16:00"),
    ];

    const step = getStep(dateRange);
    expect(step).toBe(WEEK * 1000);
    expect(step).toMatchSnapshot();
  });

  it("max than 182 days should be WEEK * 1000", () => {
    const dateRange: DateRange = [
      dayjs("2022-12-13 16:00"),
      dayjs("2023-08-13 16:00"),
    ];

    const step = getStep(dateRange);
    expect(step).toBe(WEEK * 1000);
    expect(step).toMatchSnapshot();
  });
});

describe("convertDataStruct", () => {
  it("no data", () => {
    const res = convertDataStruct([]);
    expect(res).toEqual([]);
    expect(res).toMatchSnapshot();
  });

  it("one data", () => {
    const res = convertDataStruct([[{ t: 1, v: 0 }]]);
    expect(res).toEqual([{ t: 1, v0: 0 }]);
    expect(res).toMatchSnapshot();
  });

  it("two data", () => {
    const res = convertDataStruct([[{ t: 1, v: 0 }], [{ t: 1, v: 1 }]]);
    expect(res).toEqual([{ t: 1, v0: 0, v1: 1 }]);
    expect(res).toMatchSnapshot();
  });

  it("three data", () => {
    const res = convertDataStruct([
      [{ t: 1, v: 0 }],
      [{ t: 1, v: 1 }],
      [{ t: 1, v: 2 }],
    ]);
    expect(res).toEqual([{ t: 1, v0: 0, v1: 1, v2: 2 }]);
    expect(res).toMatchSnapshot();
  });

  it("other data", () => {
    const res = convertDataStruct([
      [
        { t: 1, v: 0 },
        { t: 2, v: 0.1 },
      ],
      [
        { t: 1, v: 1 },
        { t: 2, v: 1.1 },
      ],
      [
        { t: 1, v: 2 },
        { t: 2, v: 2.1 },
      ],
    ]);
    expect(res).toEqual([
      { t: 1, v0: 0, v1: 1, v2: 2 },
      { t: 2, v0: 0.1, v1: 1.1, v2: 2.1 },
    ]);
    expect(res).toMatchSnapshot();
  });
});
