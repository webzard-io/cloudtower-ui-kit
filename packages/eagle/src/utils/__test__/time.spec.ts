import { CronTime } from "../cron-time";
import {
  getTime,
  getMode,
  transformPeriodToLocal,
  transformPeriodToUTC,
  getDaily,
  getWeekly,
  getMonthly,
  toDailyString,
  toWeeklyString,
  DEFAULT_TIME,
  toMonthlyString,
} from "../time";
import dayjs from "dayjs";
import UTC from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(UTC);
dayjs.extend(customParseFormat);

describe("getTime", () => {
  describe("cron mode is daily", () => {
    it("is local time", () => {
      const mockData = {
        period: "@x-every-n-day(10,15,1)",
        start_at: "2022-02-09T07:06:46.111Z",
      };

      const cronTime = new CronTime(mockData.period, dayjs(mockData.start_at));
      const time = getTime(cronTime);
      expect(time.format()).toEqual(dayjs("15:10", "HH:mm").format());
    });

    it("is utc time", () => {
      const mockData = {
        period: "@x-every-n-day(10,0,1)",
        start_at: "2022-02-09T07:06:46.111Z",
      };

      const cronTime = new CronTime(mockData.period, dayjs(mockData.start_at));
      const time = getTime(cronTime, true);
      expect(time.format()).toEqual(
        dayjs.utc("0:10", "HH:mm").local().format(),
      );
    });
  });

  describe("cron mode is weekly", () => {
    it("is local time", () => {
      const mockData = {
        period: "@x-every-n-week(0,10,1,3,4,6)",
        start_at: "2022-02-09T07:06:46.111Z",
      };

      const cronTime = new CronTime(mockData.period, dayjs(mockData.start_at));
      const time = getTime(cronTime);
      expect(time.format()).toEqual(dayjs("10:00", "HH:mm").format());
    });

    it("is utc time", () => {
      const mockData = {
        period: "@x-every-n-week(0,18,1,3,4,6)",
        start_at: "2022-02-09T07:06:46.111Z",
      };

      const cronTime = new CronTime(mockData.period, dayjs(mockData.start_at));
      const time = getTime(cronTime, true);
      expect(time.format()).toEqual(
        dayjs.utc("18:0", "HH:mm").local().format(),
      );
    });
  });

  describe("cron mode is monthly", () => {
    it("is local time", () => {
      const mockData = {
        period: "0 10 10 9,10,19 * *",
        start_at: "2022-02-09T07:06:46.111Z",
      };

      const cronTime = new CronTime(mockData.period, dayjs(mockData.start_at));
      const time = getTime(cronTime);
      expect(time.format()).toEqual(dayjs("10:10", "HH:mm").format());
    });

    it("is utc time", () => {
      const mockData = {
        period: "0 10 18 9,10,19 * *",
        start_at: "2022-02-09T07:06:46.111Z",
      };

      const cronTime = new CronTime(mockData.period, dayjs(mockData.start_at));
      const time = getTime(cronTime, true);
      expect(time.format()).toEqual(
        dayjs.utc("18:10", "HH:mm").local().format(),
      );
    });
  });
});

describe("getMode", () => {
  it("all results are correct", () => {
    expect(
      [
        "@x-every-n-day(10,0,1)",
        "@x-every-n-week(0,10,1,3,4,6)",
        "0 10 7 9,10,19 * *",
        "0 10 7 * * *",
        "",
      ].map((source) => getMode(source)),
    ).toEqual(["day", "week", "month", "day", "day"]);
  });
});

describe("getDaily, getWeekly, getMonthly and toDailyString, toMonthlyString, toWeeklyString", () => {
  const dayMockData = {
    period: "@x-every-n-day(10,0,1)",
    start_at: "2022-02-09T07:06:46.111Z",
  };
  const weekMockData = {
    period: "@x-every-n-week(0,10,1,3,4,6)",
    start_at: "2022-02-09T07:06:46.111Z",
  };
  const monthMockData = {
    period: "0 10 10 9,10,19 * *",
    start_at: "2022-02-09T07:06:46.111Z",
  };

  it("getDaily", () => {
    const cronTime = new CronTime(
      dayMockData.period,
      dayjs(dayMockData.start_at),
    );
    const time = getTime(cronTime);
    const source = cronTime["source"] as string;

    const daily = getDaily("day", source, time);
    expect(daily).toEqual({ step: 1, time: dayjs("0:10", "HH:mm") });
    expect(toDailyString(daily.step, daily.time)).toBe(
      "@x-every-n-day(10,0,1)",
    );
    expect(getDaily("week", source, time)).toEqual({
      step: 1,
      time: DEFAULT_TIME,
    });
  });

  it("getWeekly", () => {
    const cronTime = new CronTime(
      weekMockData.period,
      dayjs(weekMockData.start_at),
    );
    const time = getTime(cronTime);
    const source = cronTime["source"] as string;

    const weekly = getWeekly("week", source, time);
    expect(weekly).toEqual({
      days: [3, 4, 6],
      step: 1,
      time: dayjs("10:0", "HH:mm"),
    });
    expect(toWeeklyString(weekly.step, weekly.time, weekly.days)).toBe(
      "@x-every-n-week(0,10,1,3,4,6)",
    );
    expect(getWeekly("day", source, time)).toEqual({
      days: [3, 4, 6],
      step: 1,
      time: DEFAULT_TIME,
    });
  });

  it("getMonthly", () => {
    const cronTime = new CronTime(
      monthMockData.period,
      dayjs(monthMockData.start_at),
    );
    const time = getTime(cronTime);
    const source = cronTime["source"] as string;
    const mode = getMode(source);
    const [, , , day, month] = source.split(" ");

    const monthly = getMonthly(mode, month, day, time);
    expect(monthly).toEqual({
      days: [9, 10, 19],
      step: 1,
      time: dayjs("10:10", "HH:mm"),
    });
    expect(toMonthlyString(monthly.step, monthly.time, monthly.days)).toBe(
      "0 10 10 9,10,19 * *",
    );
    expect(getMonthly("day", month, day, time)).toEqual({
      days: [],
      step: 1,
      time: DEFAULT_TIME,
    });
  });
});

describe("transform period", () => {
  describe("check params", () => {
    it("period or startAt is undefined or empty string for transformPeriodToLocal", () => {
      const mockData = {
        period: "@x-every-n-day(10,0,1)",
        start_at: "2022-02-09T07:06:46.111Z",
      };

      const localTime = dayjs.utc("0:10", "HH:mm").local();
      expect(transformPeriodToLocal(undefined, mockData.start_at)).toBe("");
      expect(transformPeriodToLocal(mockData.period, undefined)).toBe(
        `@x-every-n-day(${localTime.minute()},${localTime.hour()},1)`,
      );
      expect(transformPeriodToLocal("", mockData.start_at)).toBe("");
      expect(transformPeriodToLocal(mockData.period, "")).toBe(
        `@x-every-n-day(${localTime.minute()},${localTime.hour()},1)`,
      );
    });

    it("period or startAt is undefined or empty string for transformPeriodToUTC", () => {
      const mockData = {
        period: "@x-every-n-day(10,0,1)",
        start_at: "2022-02-09T07:06:46.111Z",
      };

      const utcTime = dayjs("0:10", "HH:mm").utc();
      expect(transformPeriodToUTC(undefined, mockData.start_at)).toBe("");
      expect(transformPeriodToUTC(mockData.period, undefined)).toBe(
        `@x-every-n-day(${utcTime.minute()},${utcTime.hour()},1)`,
      );
      expect(transformPeriodToUTC("", mockData.start_at)).toBe("");
      expect(transformPeriodToUTC(mockData.period, "")).toBe(
        `@x-every-n-day(${utcTime.minute()},${utcTime.hour()},1)`,
      );
    });
  });

  describe("cron mode is daily", () => {
    it("transform utc period to local period", () => {
      const mockData = {
        period: "@x-every-n-day(10,0,1)",
        start_at: "2022-02-09T07:06:46.111Z",
      };

      const newPeriod = transformPeriodToLocal(
        mockData.period,
        mockData.start_at,
      );

      const localTime = dayjs.utc("0:10", "HH:mm").local();
      expect(newPeriod).toBe(
        `@x-every-n-day(${localTime.minute()},${localTime.hour()},1)`,
      );
    });

    it("transform local period to utc period", () => {
      const mockData = {
        period: "@x-every-n-day(10,0,1)",
        start_at: "2022-02-09T07:06:46.111Z",
      };

      const newPeriod = transformPeriodToUTC(
        mockData.period,
        mockData.start_at,
      );

      const utcTime = dayjs("0:10", "HH:mm").utc();
      expect(newPeriod).toBe(
        `@x-every-n-day(${utcTime.minute()},${utcTime.hour()},1)`,
      );
    });
  });

  describe("cron mode is weekly", () => {
    it("transform utc period to local period", () => {
      const mockData = {
        period: "@x-every-n-week(0,10,1,3,4,6)",
        start_at: "2022-02-09T07:06:46.111Z",
      };

      const newPeriod = transformPeriodToLocal(
        mockData.period,
        mockData.start_at,
      );

      const localTime = dayjs.utc("10:0", "HH:mm").local();
      expect(newPeriod).toBe(
        `@x-every-n-week(${localTime.minute()},${localTime.hour()},1,3,4,6)`,
      );
    });

    it("transform local period to utc period", () => {
      const mockData = {
        period: "@x-every-n-week(0,7,1,3,4,6)",
        start_at: "2022-02-09T07:06:46.111Z",
      };

      const newPeriod = transformPeriodToUTC(
        mockData.period,
        mockData.start_at,
      );

      const utcTime = dayjs("7:0", "HH:mm").utc();
      expect(newPeriod).toBe(
        `@x-every-n-week(${utcTime.minute()},${utcTime.hour()},1,3,4,6)`,
      );
    });
  });

  describe("cron mode is monthly", () => {
    it("transform utc period to local period", () => {
      const mockData = {
        period: "0 10 10 9,10,19 * *",
        start_at: "2022-02-09T07:06:46.111Z",
      };

      const newPeriod = transformPeriodToLocal(
        mockData.period,
        mockData.start_at,
      );

      const localTime = dayjs.utc("10:10", "HH:mm").local();
      expect(newPeriod).toBe(
        `0 ${localTime.minute()} ${localTime.hour()} 9,10,19 * *`,
      );
    });

    it("transform local period to utc period", () => {
      const mockData = {
        period: "0 10 7 9,10,19 * *",
        start_at: "2022-02-09T07:06:46.111Z",
      };

      const newPeriod = transformPeriodToUTC(
        mockData.period,
        mockData.start_at,
      );

      const utcTime = dayjs("7:10", "HH:mm").utc();
      expect(newPeriod).toBe(
        `0 ${utcTime.minute()} ${utcTime.hour()} 9,10,19 * *`,
      );
    });
  });
});
