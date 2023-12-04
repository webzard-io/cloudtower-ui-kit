import dayjs from "dayjs";
import MockDate from "mockdate";

import { CronTime } from "../cron-time";

describe("crontime", () => {
  it("should test stars (* * * * * *)", () => {
    expect(() => {
      new CronTime("* * * * * *");
    }).not.toThrow();
  });

  it("should test digit (0 * * * * *)", () => {
    expect(() => {
      new CronTime("0 * * * * *");
    }).not.toThrow();
  });

  it("should test multi digits (08 * * * * *)", () => {
    expect(() => {
      new CronTime("08 * * * * *");
    }).not.toThrow();
  });

  it("should test all digits (08 8 8 8 8 5)", () => {
    expect(() => {
      new CronTime("08 * * * * *");
    }).not.toThrow();
  });

  it("should test too many digits (08 8 8 8 8 5)", () => {
    expect(() => {
      new CronTime("08 * * * * *");
    }).not.toThrow();
  });

  it("should test standard cron format (* * * * *)", () => {
    expect(() => {
      new CronTime("* * * * *");
    }).not.toThrow();
  });

  it("should test standard cron format (8 8 8 8 5)", () => {
    const standard = new CronTime("8 8 8 8 5");
    const extended = new CronTime("0 8 8 8 8 5");

    expect(standard.unitMap).toEqual(extended.unitMap);
  });

  it("should test hyphen (0-10 * * * * *)", () => {
    expect(() => {
      new CronTime("0-10 * * * * *");
    }).not.toThrow();
  });

  it("should test multi hyphens (0-10 0-10 * * * *)", () => {
    expect(() => {
      new CronTime("0-10 0-10 * * * *");
    }).not.toThrow();
  });

  it("should test all hyphens (0-10 0-10 1-10 1-10 0-6 0-1)", () => {
    expect(() => {
      new CronTime("0-10 0-10 1-10 1-10 0-6 0-1");
    }).not.toThrow();
  });

  it("should test comma (0,10 * * * * *)", () => {
    expect(() => {
      new CronTime("0,10 * * * * *");
    }).not.toThrow();
  });

  it("should test multi commas (0,10 0,10 * * * *)", () => {
    expect(() => {
      new CronTime("0,10 0,10 * * * *");
    }).not.toThrow();
  });

  it("should test all commas (0,10 0,10 1,10 1,10 0,6 0,1)", () => {
    expect(() => {
      new CronTime("0,10 0,10 1,10 1,10 0,6 0,1");
    }).not.toThrow();
  });

  it("should test alias (* * * * jan *)", () => {
    expect(() => {
      new CronTime("* * * * jan *");
    }).not.toThrow();
  });

  it("should test multi aliases (* * * * jan,feb *)", () => {
    expect(() => {
      new CronTime("* * * * jan,feb *");
    }).not.toThrow();
  });

  it("should test all aliases (* * * * jan,feb mon,tue)", () => {
    expect(() => {
      new CronTime("* * * * jan,feb mon,tue");
    }).not.toThrow();
  });

  it("should test unknown alias (* * * * jar *)", () => {
    expect(() => {
      new CronTime("* * * * jar *");
    }).toThrow();
  });

  it("should test unknown alias - short (* * * * j *)", () => {
    expect(() => {
      new CronTime("* * * * j *");
    }).toThrow();
  });

  it("should test too few fields", () => {
    expect(() => {
      new CronTime("* * * *");
    }).toThrow();
  });

  it("should test too many fields", () => {
    expect(() => {
      new CronTime("* * * * * * *");
    }).toThrow();
  });

  it("should test out of range values", () => {
    expect(() => {
      new CronTime("* * * * 1234");
    }).toThrow();
  });

  it("should test invalid wildcard expression", () => {
    expect(() => {
      new CronTime("* * * * 0*");
    }).toThrow();
  });

  it("should test invalid step", () => {
    expect(() => {
      new CronTime("* * * 1/0 *");
    }).toThrow();
  });

  it("should test invalid range", () => {
    expect(() => {
      new CronTime("* 2-1 * * *");
    }).toThrow();
  });

  it("should test Date", () => {
    const d = new Date();
    const ct = new CronTime(d);
    expect(dayjs(ct.source).valueOf()).toEqual(d.getTime());
  });

  it("should test day roll-over", () => {
    const numHours = 24;
    const ct = new CronTime("0 0 17 * * *");

    for (let hr = 0; hr < numHours; hr++) {
      const start = new Date(2012, 3, 16, hr, 30, 30);
      const next = ct["getNextDateFrom"](dayjs(start));
      expect(next.diff(start)).toBeLessThan(24 * 60 * 60 * 1000);
      expect(next.valueOf()).toBeGreaterThan(start.getTime());
    }
  });

  it("should test illegal repetition syntax", () => {
    expect(() => {
      new CronTime("* * /4 * * *");
    }).toThrow();
  });

  it("should test next date", () => {
    const ct = new CronTime("0 0 */4 * * *");

    const nextDate = new Date();
    nextDate.setHours(23);
    const nextdt = ct["getNextDateFrom"](dayjs(nextDate));

    expect(nextdt.valueOf()).toBeGreaterThan(nextDate.getTime());
    expect(nextdt.hour() % 4).toEqual(0);
  });

  it("should test next real date", () => {
    const initialDate = new Date();
    initialDate.setDate(initialDate.getDate() + 1); // In other case date will be in the past
    const ct = new CronTime(initialDate);

    const nextDate = new Date();
    nextDate.setMonth(nextDate.getMonth() + 1);
    expect(nextDate.getTime()).toBeGreaterThan(dayjs(ct.source).valueOf());
    const nextdt = ct.sendAt();
    // there shouldn't be a "next date" when using a real date.
    // execution happens once
    // so the return should be the date passed in unless explicitly reset
    expect(nextdt.isBefore(nextDate)).toBeTruthy();
    expect(nextdt.valueOf()).toEqual(initialDate.getTime());
  });

  describe("presets", () => {
    it("should parse @secondly", () => {
      const cronTime = new CronTime("@secondly");
      expect(cronTime.toString()).toEqual("* * * * * *");
    });

    it("should parse @minutely", () => {
      const cronTime = new CronTime("@minutely");
      expect(cronTime.toString()).toEqual("0 * * * * *");
    });

    it("should parse @hourly", () => {
      const cronTime = new CronTime("@hourly");
      expect(cronTime.toString()).toEqual("0 0 * * * *");
    });

    it("should parse @daily", () => {
      const cronTime = new CronTime("@daily");
      expect(cronTime.toString()).toEqual("0 0 0 * * *");
    });

    it("should parse @weekly", () => {
      const cronTime = new CronTime("@weekly");
      expect(cronTime.toString()).toEqual("0 0 0 * * 0");
    });

    it("should parse @weekdays", () => {
      const cronTime = new CronTime("@weekdays");
      expect(cronTime.toString()).toEqual("0 0 0 * * 1,2,3,4,5");
    });

    it("should parse @weekends", () => {
      const cronTime = new CronTime("@weekends");
      expect(cronTime.toString()).toEqual("0 0 0 * * 0,6");
    });

    it("should parse @monthly", () => {
      const cronTime = new CronTime("@monthly");
      expect(cronTime.toString()).toEqual("0 0 0 1 * *");
    });

    it("should support validation function in presets", () => {
      MockDate.set("2020-01-02T00:00:00.000Z");
      const cronTime = new CronTime("@monthly", undefined, 0);
      expect(cronTime.sendAt(3)).toMatchInlineSnapshot(`
        [
          "2020-02-01T00:00:00.000Z",
          "2020-03-01T00:00:00.000Z",
          "2020-04-01T00:00:00.000Z",
        ]
      `);
      MockDate.reset();
    });

    it("can parse preset args", () => {
      const cronTime = new CronTime("@monthly");
      expect(cronTime["parsePrestArgs"]("@x-a")).toEqual({
        key: "@x-a",
        args: [],
      });
      expect(cronTime["parsePrestArgs"]("@x-b(1,2,3)")).toEqual({
        key: "@x-b",
        args: ["1", "2", "3"],
      });
    });

    it("should parse @x-every-n-day(minute, hour, N)", () => {
      const cronTime = new CronTime("@x-every-n-day(1,2,3)");
      expect(cronTime.toString()).toEqual("0 1 2 * * *");
    });

    it("should support @x-every-n-day(minute, hour, N)", () => {
      MockDate.set("2020-01-02T00:00:00.000Z");
      const cronTime = new CronTime("@x-every-n-day(1,2,3)", undefined, 0);
      const d1 = cronTime.sendAt();
      expect(d1).toMatchInlineSnapshot('"2020-01-02T02:01:00.000Z"');
      cronTime.setLastSendAt(d1);
      const d2 = cronTime.sendAt();
      expect(d2).toMatchInlineSnapshot('"2020-01-05T02:01:00.000Z"');
      MockDate.reset();
    });

    it("@x-every-n-day time diff can be offset for 10s with each step minus 1min", () => {
      MockDate.set("2020-01-02T02:00:00.000Z");
      const cronTime = new CronTime("@x-every-n-day(1,2,3)", undefined, 0);
      cronTime.setLastSendAt(dayjs("2020-01-02T02:01:00.000Z"));
      const d1 = cronTime.sendAt();
      expect(d1).toMatchInlineSnapshot('"2020-01-05T02:01:00.000Z"');
      cronTime.setLastSendAt(dayjs("2020-01-02T02:04:10.000Z"));
      const d2 = cronTime.sendAt();
      expect(d2).toMatchInlineSnapshot('"2020-01-05T02:01:00.000Z"');
      cronTime.setLastSendAt(dayjs("2020-01-02T02:04:11.000Z"));
      const d3 = cronTime.sendAt();
      expect(d3).toMatchInlineSnapshot('"2020-01-06T02:01:00.000Z"');
      MockDate.reset();
    });

    it("should parse @x-every-n-week(minute, hour, N, weeks)", () => {
      const cronTime1 = new CronTime("@x-every-n-week(1,2,3,4,5)");
      expect(cronTime1.toString()).toEqual("0 1 2 * * 4,5");
      const cronTime2 = new CronTime("@x-every-n-week(1,2,3,*)");
      expect(cronTime2.toString()).toEqual("0 1 2 * * *");
    });

    it("should support @x-every-n-week(minute, hour, N, weeks)", () => {
      MockDate.set("2020-01-02T00:00:00.000Z");
      const cronTime = new CronTime("@x-every-n-week(1,2,3,4,5)", undefined, 0);
      const d1 = cronTime.sendAt();
      expect(d1).toMatchInlineSnapshot('"2020-01-02T02:01:00.000Z"');
      cronTime.setLastSendAt(d1);
      const d2 = cronTime.sendAt();
      expect(d2).toMatchInlineSnapshot('"2020-01-23T02:01:00.000Z"');
      MockDate.reset();
    });

    it("@x-every-n-week time diff can be offset for 10s with each step minus 1min", () => {
      MockDate.set("2020-01-02T02:00:00.000Z");
      const cronTime = new CronTime("@x-every-n-week(1,2,1,4,5)", undefined, 0);
      cronTime.setLastSendAt(dayjs("2020-01-02T02:01:00.000Z"));
      const d1 = cronTime.sendAt();
      expect(d1).toMatchInlineSnapshot('"2020-01-09T02:01:00.000Z"');
      cronTime.setLastSendAt(dayjs("2020-01-02T02:02:10.000Z"));
      const d2 = cronTime.sendAt();
      expect(d2).toMatchInlineSnapshot('"2020-01-09T02:01:00.000Z"');
      cronTime.setLastSendAt(dayjs("2020-01-02T02:02:11.000Z"));
      const d3 = cronTime.sendAt();
      expect(d3).toMatchInlineSnapshot('"2020-01-16T02:01:00.000Z"');
      MockDate.reset();
    });

    it("should parse @x-last-day(minute, hour, month)", () => {
      const cronTime = new CronTime("@x-last-day(1,2,3)");
      expect(cronTime.toString()).toEqual("0 1 2 28,29,30,31 3 *");
    });

    it("should support @x-last-day(minute, hour, month)", () => {
      MockDate.set("2020-01-02T00:00:00.000Z");
      const cronTime = new CronTime("@x-last-day(1,2,*)", undefined, 0);
      expect(cronTime.sendAt(3)).toMatchInlineSnapshot(`
        [
          "2020-01-31T02:01:00.000Z",
          "2020-02-29T02:01:00.000Z",
          "2020-03-31T02:01:00.000Z",
        ]
      `);
      MockDate.reset();
    });
  });

  describe("should throw an exception because `L` not supported", () => {
    it("(* * * L * *)", () => {
      expect(() => {
        new CronTime("* * * L * *");
      }).toThrow();
    });

    it("(* * * * * L)", () => {
      expect(() => {
        new CronTime("* * * * * L");
      }).toThrow();
    });
  });

  it("should strip off millisecond", () => {
    const cronTime = new CronTime("0 */10 * * * *");
    const x = cronTime["getNextDateFrom"](dayjs("2018-08-10T02:20:00.999Z"));
    expect(x.valueOf()).toEqual(new Date("2018-08-10T02:30:00.000Z").getTime());
  });

  it("should strip off millisecond (2)", () => {
    const cronTime = new CronTime("0 */10 * * * *");
    const x = cronTime["getNextDateFrom"](dayjs("2018-08-10T02:19:59.999Z"));
    expect(x.valueOf()).toEqual(new Date("2018-08-10T02:20:00.000Z").getTime());
  });

  it("should generete the right next days when cron is set to every minute", () => {
    const cronTime = new CronTime("* * * * *");
    const min = 60000;
    let previousDate = dayjs(new Date(Date.UTC(2018, 5, 3, 0, 0)));
    for (let i = 0; i < 25; i++) {
      const nextDate = cronTime["getNextDateFrom"](previousDate);
      expect(nextDate.valueOf()).toEqual(previousDate.valueOf() + min);
      previousDate = nextDate;
    }
  });

  it("should generete the right next days when cron is set to every 15 min", () => {
    const cronTime = new CronTime("*/15 * * * *");
    const min = 60000 * 15;
    let previousDate = dayjs(new Date(Date.UTC(2016, 6, 3, 0, 0)));
    for (let i = 0; i < 25; i++) {
      const nextDate = cronTime["getNextDateFrom"](previousDate);
      expect(nextDate.valueOf()).toEqual(previousDate.valueOf() + min);
      previousDate = nextDate;
    }
  });

  it("should generate the right N next days for * * * * *", () => {
    const cronTime = new CronTime("* * * * *");
    let currentDate = dayjs().minute(0).second(0).millisecond(0);
    for (let i = 0; i < 100; i++) {
      const nextDate = cronTime["getNextDateFrom"](currentDate);
      expect(nextDate.diff(currentDate)).toEqual(1000 * 60);
      currentDate = nextDate;
    }
  });

  it("should generate the right N next days for 0 0 9 * * *", () => {
    const cronTime = new CronTime("0 0 9 * * *");
    let currentDate = dayjs.utc().hour(9).minute(0).second(0).millisecond(0);
    for (let i = 0; i < 100; i++) {
      const nextDate = cronTime["getNextDateFrom"](currentDate);
      expect(nextDate.diff(currentDate)).toEqual(1000 * 60 * 60 * 24);
      currentDate = nextDate;
    }
  });

  describe("UTC", () => {
    beforeEach(() => {
      MockDate.set("2020-01-02");
    });

    afterEach(() => {
      MockDate.reset();
    });

    it("should accept 0 as a valid UTC offset", () => {
      const cronTime = new CronTime("0 11 * * *", undefined, 0);
      const expected = dayjs()
        .utc()
        .hour(11)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toString();
      const actual = cronTime.sendAt().toString();

      expect(actual).toEqual(expected);
    });

    it("should accept -120 as a valid UTC offset", () => {
      const cronTime = new CronTime("0 11 * * *", undefined, -120);
      const expected = dayjs()
        .utc()
        .hour(13)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toString();
      const actual = cronTime.sendAt().toString();

      expect(actual).toEqual(expected);
    });

    it("should accept 5 as a valid UTC offset", () => {
      const cronTime = new CronTime("0 20 * * *", undefined, 5);
      const expected = dayjs()
        .utc()
        .hour(15)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toString();
      const actual = cronTime.sendAt().toString();

      expect(actual).toEqual(expected);
    });

    it("should detect real date in the past", () => {
      const d = new Date();
      const time = new CronTime(d);
      MockDate.set(Date.now() + 1000);
      expect(() => {
        time.sendAt();
      }).toThrow();
    });
  });

  it("will get future times with sendAt index", () => {
    const cronTime = new CronTime("0 0 9 * * *");
    const days = cronTime.sendAt(3);
    expect(days.length).toEqual(3);
  });

  it("will get one time when index is less than 0", () => {
    const cronTime = new CronTime("0 0 9 * * *");
    const days = cronTime.sendAt(0);
    expect(days.length).toEqual(1);
  });

  it("can set start at time", () => {
    MockDate.set("2020-01-02T00:00:00.000Z");
    const cronTime = new CronTime("0 0 0 * * *", dayjs("2020-02-01"), 0);
    const d1 = cronTime.sendAt();
    expect(d1).toMatchInlineSnapshot('"2020-02-01T00:00:00.000Z"');
    MockDate.reset();
  });
});
