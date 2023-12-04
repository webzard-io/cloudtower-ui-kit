/* istanbul ignore file */

// https://github.com/kelektiv/node-cron/blob/master/lib/time.js
import dayjs from "dayjs";
import UTC from "dayjs/plugin/utc";

dayjs.extend(UTC);

const CONSTRAINTS = [
  [0, 59],
  [0, 59],
  [0, 23],
  [1, 31],
  [0, 11],
  [0, 6],
] as const;
const MONTH_CONSTRAINTS = [
  31,
  29, // support leap year...not perfect
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
];
const PARSE_DEFAULTS = ["0", "*", "*", "*", "*", "*"];
const ALIASES: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};
const TIME_UNITS = [
  "second",
  "minute",
  "hour",
  "dayOfMonth",
  "month",
  "dayOfWeek",
];
const TIME_UNITS_LEN = TIME_UNITS.length;

type PresetValidator = (args: {
  date: dayjs.Dayjs;
  lastSendAt: dayjs.Dayjs | null;
  args: string[];
}) => boolean;
const PRESETS: Record<
  string,
  {
    expression: (args: string[]) => string;
    validation: PresetValidator;
    step?: (args: string[]) => number;
  }
> = {
  "@monthly": {
    expression: () => "0 0 0 1 * *",
    validation: () => true,
  },
  "@weekly": { expression: () => "0 0 0 * * 0", validation: () => true },
  "@daily": { expression: () => "0 0 0 * * *", validation: () => true },
  "@hourly": { expression: () => "0 0 * * * *", validation: () => true },
  "@minutely": { expression: () => "0 * * * * *", validation: () => true },
  "@secondly": { expression: () => "* * * * * *", validation: () => true },
  "@weekdays": { expression: () => "0 0 0 * * 1-5", validation: () => true },
  "@weekends": { expression: () => "0 0 0 * * 0,6", validation: () => true },
  "@x-every-n-day": {
    expression: (args) => `0 ${args[0]} ${args[1]} * * *`,
    validation: ({ date, lastSendAt, args }) => {
      if (!lastSendAt) {
        return true;
      }
      return (
        date.diff(lastSendAt) >=
        parseInt(args[2], 10) * (86400000 - 60_000) - 10_000
      );
    },
    step: (_args) => 86400000 - 60000,
  },
  "@x-every-n-week": {
    expression: (args) => {
      const days = args.slice(3);
      return `0 ${args[0]} ${args[1]} * * ${
        days.includes("*") ? "*" : days.join(",")
      }`;
    },
    validation: ({ lastSendAt, date, args }) => {
      if (!lastSendAt) {
        return true;
      }
      if (date.isAfter(lastSendAt) && date.day(0).isSame(lastSendAt.day(0))) {
        return true;
      }
      return (
        date.day(0).diff(lastSendAt.day(0)) >=
        parseInt(args[2], 10) * (604800000 - 60_000) - 10_000
      );
    },
    step: (_args) => 604800000 - 60000,
  },
  "@x-last-day": {
    expression: (args) => `0 ${args[0]} ${args[1]} 28-31 ${args[2]} *`,
    validation: ({ date }) => {
      const lastDayInMonth = MONTH_CONSTRAINTS[date.month()];
      return lastDayInMonth === date.date();
    },
  },
};
const RE_WILDCARDS = /\*/g;
const RE_RANGE = /^(\d+)(?:-(\d+))?(?:\/(\d+))?$/g;

export class CronTime {
  source!: dayjs.Dayjs | string;
  presetValidation?: PresetValidator;
  presetArgs?: string[];
  presetStep?: number;
  realDate = false;
  utcOffset?: number;
  startAt?: dayjs.Dayjs;

  unitMap: Record<string, Record<string, boolean>> = {};

  // TODO: find a better way to do stateful cron?
  lastSendAt: dayjs.Dayjs | null = null;

  constructor(
    source: Date | string,
    startAt?: dayjs.Dayjs,
    utcOffset?: number,
  ) {
    if (typeof utcOffset !== "undefined") {
      this.utcOffset = utcOffset;
    }
    if (startAt !== undefined) {
      this.startAt = startAt;
    }

    TIME_UNITS.forEach((timeUnit) => {
      this.unitMap[timeUnit] = {};
    });

    if (source instanceof Date) {
      this.source = dayjs(source);
      this.realDate = true;
    } else {
      this.source = source;
      this.parse(this.source);
      this.verifyParse();
    }
  }

  /**
   * Calculate the "next" scheduled time
   */
  sendAt(): dayjs.Dayjs;
  sendAt(i: number): dayjs.Dayjs[];
  sendAt(i?: number) {
    let date = this.realDate ? (this.source as dayjs.Dayjs) : dayjs();

    if (typeof this.utcOffset !== "undefined") {
      date = dayjs(date).utcOffset(this.utcOffset);
    }

    if (this.realDate) {
      if (dayjs().isAfter(date)) {
        throw new Error("WARNING: Date in past. Will never be fired.");
      }

      return date;
    }

    if (typeof i === "number" && i <= 0) {
      i = 1;
    }

    if (i === undefined) {
      // just get the next scheduled time
      return this.getNextDateFromWithValidation(date);
    } else {
      // return the next schedule times
      const dates: dayjs.Dayjs[] = [];
      for (; i > 0; i--) {
        date = this.getNextDateFromWithValidation(date);
        dates.push(date);
      }

      return dates;
    }
  }

  /**
   * Get the number of milliseconds in the future at which to fire our callbacks.
   */
  getTimeout() {
    return Math.max(-1, this.sendAt().diff(dayjs()));
  }

  /**
   * writes out a cron string
   */
  toString() {
    return this.toJSON().join(" ");
  }

  /**
   * Json representation of the parsed cron syntax.
   */
  toJSON() {
    return TIME_UNITS.map((timeName) => {
      return this.wcOrAll(timeName);
    });
  }

  setLastSendAt(date: dayjs.Dayjs) {
    this.lastSendAt = date;
  }

  /*
   * Parse the cron syntax into something useful for selecting the next execution time.
   *
   * Algorithm:
   * - Replace preset
   * - Replace aliases in the source.
   * - Trim string and split for processing.
   * - Loop over split options (ms -> month):
   *   - Get the value (or default) in the current position.
   *   - Parse the value.
   */
  private parse(source: string) {
    source = source.toLowerCase();

    // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
    if (/^@/.test(source)) {
      const { key, args } = this.parsePrestArgs(source);
      const { expression, validation, step } = PRESETS[key];
      this.presetValidation = validation;
      this.presetArgs = args;
      this.presetStep = step?.(args);
      source = expression(args);
    }

    source = source.replace(/[a-z]{1,3}/gi, (alias) => {
      if (alias in ALIASES) {
        return ALIASES[alias].toString();
      }

      throw new Error(`Unknown alias: ${alias}`);
    });

    const units = source.trim().split(/\s+/);

    // seconds are optional
    if (units.length < TIME_UNITS_LEN - 1) {
      throw new Error("Too few fields");
    }

    if (units.length > TIME_UNITS_LEN) {
      throw new Error("Too many fields");
    }

    const unitsLen = units.length;
    for (let i = 0; i < TIME_UNITS_LEN; i++) {
      // If the split source string doesn't contain all digits,
      // assume defaults for first n missing digits.
      // This adds support for 5-digit standard cron syntax
      const cur = units[i - (TIME_UNITS_LEN - unitsLen)] || PARSE_DEFAULTS[i];
      this.parseField(cur, TIME_UNITS[i], CONSTRAINTS[i]);
    }
  }

  private parsePrestArgs(source: string): { key: string; args: string[] } {
    const matchedArr = source.match(/(@[a-zA-Z-]+)(\((\S+)\)|)/);
    if (!matchedArr) {
      throw new Error(`Invalid preset ${source}`);
    }
    if (!matchedArr[3]) {
      return {
        key: matchedArr[1],
        args: [],
      };
    }
    return {
      key: matchedArr[1],
      args: matchedArr[3].split(","),
    };
  }

  /*
   * Parse individual field from the cron syntax provided.
   *
   * Algorithm:
   * - Split field by commas aand check for wildcards to ensure proper user.
   * - Replace wildcard values with <low>-<high> boundaries.
   * - Split field by commas and then iterate over ranges inside field.
   *   - If range matches pattern then map over matches using replace (to parse the range by the regex pattern)
   *   - Starting with the lower bounds of the range iterate by step up to the upper bounds and toggle the CronTime field value flag on.
   */
  private parseField(
    value: string,
    type: string,
    constraints: readonly [number, number],
  ) {
    const typeObj = this.unitMap[type];
    let pointer: number | undefined;
    const low = constraints[0];
    const high = constraints[1];

    const fields = value.split(",");
    fields.forEach((field) => {
      const wildcardIndex = field.indexOf("*");
      if (wildcardIndex !== -1 && wildcardIndex !== 0) {
        throw new Error(`Field (${field}) has an invalid wildcard expression`);
      }
    });

    // * is a shortcut to [low-high] range for the field
    value = value.replace(RE_WILDCARDS, `${low}-${high}`);

    // commas separate information, so split based on those
    const allRanges = value.split(",");

    for (let i = 0; i < allRanges.length; i++) {
      if (allRanges[i].match(RE_RANGE)) {
        allRanges[i].replace(RE_RANGE, ($0, _lower, _upper, step) => {
          let lower = parseInt(_lower, 10);
          let upper = parseInt(_upper, 10) || undefined;

          const wasStepDefined = !isNaN(parseInt(step, 10));
          if (step === "0") {
            throw new Error(`Field (${type}) has a step of zero`);
          }
          step = parseInt(step, 10) || 1;

          if (upper && lower > upper) {
            throw new Error(`Field (${type}) has an invalid range`);
          }

          const outOfRangeError =
            lower < low || (upper && upper > high) || (!upper && lower > high);

          if (outOfRangeError) {
            throw new Error(`Field value (${value}) is out of range`);
          }

          // Positive integer higher than constraints[0]
          lower = Math.min(Math.max(low, ~~Math.abs(lower)), high);

          // Positive integer lower than constraints[1]
          if (upper) {
            upper = Math.min(high, ~~Math.abs(upper));
          } else {
            // If step is provided, the default upper range is the highest value
            upper = wasStepDefined ? high : lower;
          }

          // Count from the lower barrier to the upper
          pointer = lower;

          do {
            typeObj[pointer] = true; // mutates the field objects values inside CronTime
            pointer += step;
          } while (pointer <= upper);

          return "";
        });
      } else {
        throw new Error(`Field (${type}) cannot be parsed`);
      }
    }
  }

  /*
   * Ensure that the syntax parsed correctly and correct the specified values if needed.
   */
  private verifyParse() {
    const months = Object.keys(this.unitMap.month);
    const dom = Object.keys(this.unitMap.dayOfMonth);
    let ok = false;

    /* if a dayOfMonth is not found in all months, we only need to fix the last
                 wrong month  to prevent infinite loop */
    let lastWrongMonth = NaN;
    for (let i = 0; i < months.length; i++) {
      const m = months[i];
      const con = MONTH_CONSTRAINTS[parseInt(m, 10)];

      for (const day of dom) {
        if (parseInt(day, 10) <= con) {
          ok = true;
        }
      }

      if (!ok) {
        // save the month in order to be fixed if all months fails (infinite loop)
        lastWrongMonth = parseInt(m, 10);
        console.warn(`Month '${m}' is limited to '${con}' days.`);
      }
    }

    // infinite loop detected (dayOfMonth is not found in all months)
    if (!ok) {
      const notOkCon = MONTH_CONSTRAINTS[lastWrongMonth];
      for (const notOkDay of dom) {
        if (parseInt(notOkDay, 10) > notOkCon) {
          delete this.unitMap.dayOfMonth[notOkDay];
          const fixedDay = Number(notOkDay) % notOkCon;
          this.unitMap.dayOfMonth[fixedDay] = true;
        }
      }
    }
  }

  private getNextDateFromWithValidation(start: dayjs.Dayjs): dayjs.Dayjs {
    let nextDate = this.getNextDateFrom(start);
    // TODO: check performance
    if (this.startAt && nextDate.isBefore(this.startAt)) {
      return this.getNextDateFromWithValidation(nextDate);
    }
    const valid = this.presetValidation
      ? this.presetValidation({
          date: nextDate,
          lastSendAt: this.lastSendAt,
          args: this.presetArgs || [],
        })
      : true;
    if (valid) {
      return nextDate;
    }
    if (this.presetStep) {
      nextDate = nextDate.add(this.presetStep, "ms");
    }
    return this.getNextDateFromWithValidation(nextDate);
  }

  /**
   * Get next date matching the specified cron time.
   *
   * Algorithm:
   * - Start with a start date and a parsed crontime.
   * - Loop until 5 seconds have passed, or we found the next date.
   * - Within the loop:
   *   - If it took longer than 5 seconds to select a date, throw an exception.
   *   - Find the next month to run at.
   *   - Find the next day of the month to run at.
   *   - Find the next day of the week to run at.
   *   - Find the next hour to run at.
   *   - Find the next minute to run at.
   *   - Find the next second to run at.
   *   - Check that the chosen time does not equal the current execution.
   * - Return the selected date object.
   */
  private getNextDateFrom(start: dayjs.Dayjs) {
    let date = start;
    const firstDate = start;

    if (date.millisecond() > 0) {
      date = date.millisecond(0).second(date.second() + 1);
    }

    // it shouldn't take more than 5 seconds to find the next execution time
    // being very generous with this. Throw error if it takes too long to find the next time to protect from
    // infinite loop.
    const timeout = Date.now() + 5_000;
    // determine next date
    while (true) {
      const diff = date.diff(start);

      // hard stop if the current date is after the expected execution
      if (Date.now() > timeout) {
        throw new Error(
          `Something went wrong. cron reached maximum iterations.
							 Cron String: ${this} - UTC offset: ${date} - current Date: ${dayjs().toString()}`,
        );
      }

      if (
        !(date.month() - 1 in this.unitMap.month) &&
        Object.keys(this.unitMap.month).length !== 12
      ) {
        date = date.add(1, "month").day(1).hour(0).minute(0).second(0);
        continue;
      }

      if (
        !(date.date() in this.unitMap.dayOfMonth) &&
        Object.keys(this.unitMap.dayOfMonth).length !== 31 &&
        !(
          date.day() in this.unitMap.dayOfWeek &&
          Object.keys(this.unitMap.dayOfWeek).length !== 7
        )
      ) {
        date = date.add(1, "day").hour(0).minute(0).second(0);
        continue;
      }

      if (
        !(date.day() in this.unitMap.dayOfWeek) &&
        Object.keys(this.unitMap.dayOfWeek).length !== 7 &&
        !(
          date.date() in this.unitMap.dayOfMonth &&
          Object.keys(this.unitMap.dayOfMonth).length !== 31
        )
      ) {
        date = date.add(1, "day").hour(0).minute(0).second(0);
        continue;
      }

      if (
        !(date.hour() in this.unitMap.hour) &&
        Object.keys(this.unitMap.hour).length !== 24
      ) {
        date = date
          .hour(date.hour() === 23 && diff > 86400000 ? 0 : date.hour() + 1)
          .minute(0)
          .second(0);
        continue;
      }

      if (
        !(date.minute() in this.unitMap.minute) &&
        Object.keys(this.unitMap.minute).length !== 60
      ) {
        date = date
          .minute(
            date.minute() === 59 && diff > 3600000 ? 0 : date.minute() + 1,
          )
          .second(0);
        continue;
      }

      if (
        !(date.second() in this.unitMap.second) &&
        Object.keys(this.unitMap.second).length !== 60
      ) {
        date = date.second(
          date.second() === 59 && diff > 60000 ? 0 : date.second() + 1,
        );
        continue;
      }

      if (date.isSame(firstDate)) {
        date = date.add(1, "second");
        continue;
      }

      break;
    }

    return date;
  }

  /**
   * wildcard, or all params in array (for to string)
   */
  private wcOrAll(type: string) {
    if (this.hasAll(type)) {
      return "*";
    }

    const all: string[] = [];
    for (const time in this.unitMap[type]) {
      all.push(time);
    }

    return all.join(",");
  }

  private hasAll(type: string) {
    const constraints = CONSTRAINTS[TIME_UNITS.indexOf(type)];

    for (let i = constraints[0], n = constraints[1]; i < n; i++) {
      if (!(i in this.unitMap[type])) {
        return false;
      }
    }

    return true;
  }
}
