import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import UTC from "dayjs/plugin/utc";
import _ from "lodash";

import { CronTime } from "./cron-time";

// Used for transform UTC
dayjs.extend(UTC);
// Used for parse format 'HH:mm'
dayjs.extend(customParseFormat);

export const DEFAULT_TIME = dayjs("00:00", "HH:mm");

export function getTime(cronTime: CronTime, isUTC = false) {
  const { hour, minute } = cronTime.unitMap;
  const _hour = Object.keys(hour)[0];
  const _minute = Object.keys(minute)[0];

  if (isUTC) {
    return dayjs.utc(`${_hour}:${_minute}`, "HH:mm").local();
  }
  return dayjs(`${_hour}:${_minute}`, "HH:mm");
}

export type CronMode = "day" | "week" | "month";

export function getMode(source: string): CronMode {
  if (source.startsWith("@x-every-n-day")) {
    return "day";
  }
  if (source.startsWith("@x-every-n-week")) {
    return "week";
  }
  const [, , , monthDay, month] = source.split(" ");
  if (!monthDay || !month) {
    return "day";
  }
  if (!monthDay.includes("*") || month !== "*") {
    return "month";
  }
  return "day";
}

export function getDaily(
  mode: CronMode,
  source: string,
  time: dayjs.Dayjs,
  defaultTime = DEFAULT_TIME,
): {
  step: number;
  time: dayjs.Dayjs;
} {
  const matchedArr = source.match(/@x-every-n-day\(\d+,\d+,(\d+)\)/);
  const step = matchedArr ? parseInt(matchedArr[1], 10) : 1;
  return {
    step,
    time: mode === "day" ? time : defaultTime,
  };
}

export function toDailyString(step: number, time: dayjs.Dayjs) {
  return `@x-every-n-day(${time.minute()},${time.hour()},${step || 1})`;
}

export function getWeekly(
  mode: CronMode,
  source: string,
  time: dayjs.Dayjs,
  defaultTime = DEFAULT_TIME,
): {
  step: number;
  days: number[];
  time: dayjs.Dayjs;
} {
  const matchedArr = source.match(/@x-every-n-week\(\d+,\d+,(\d+),(.+)\)/);
  const step = matchedArr ? parseInt(matchedArr[1], 10) : 1;
  const days = matchedArr
    ? matchedArr[2] === "*"
      ? []
      : matchedArr[2].split(",").map((v) => parseInt(v, 10))
    : [];
  return {
    step,
    days,
    time: mode === "week" ? time : defaultTime,
  };
}

export function toWeeklyString(
  step: number,
  time: dayjs.Dayjs,
  days: number[],
) {
  return `@x-every-n-week(${time.minute()},${time.hour()},${step || 1},${
    days.join(",") || "*"
  })`;
}

export function getMonthly(
  mode: CronMode,
  month: string,
  day: string,
  time: dayjs.Dayjs,
  defaultTime = DEFAULT_TIME,
): {
  step: number;
  days: number[];
  time: dayjs.Dayjs;
} {
  return {
    step: month === "*" ? 1 : parseInt(_.last(month) || "1", 10),
    days:
      day === "*" || mode !== "month" || !month
        ? []
        : day.split(",").map((v) => parseInt(v, 10)),
    time: mode === "month" ? time : defaultTime,
  };
}

export function toMonthlyString(
  step: number,
  time: dayjs.Dayjs,
  days: number[],
) {
  return [
    0,
    time.minute(),
    time.hour(),
    days.join(",") || "*",
    step > 1 ? `*/${step}` : "*",
    "*",
  ].join(" ");
}

export function transformPeriodToLocal(
  period: string | undefined,
  start_at = "",
): string {
  if (!period) {
    return "";
  }
  const cronTime = new CronTime(period, dayjs(start_at));
  const time = getTime(cronTime, true);
  const source = cronTime["source"] as string;
  const mode = getMode(source);
  const [, , , day, month] = source.split(" ");

  switch (mode) {
    case "week": {
      const weekly = getWeekly(mode, source, time);
      return toWeeklyString(weekly.step, weekly.time, weekly.days);
    }
    case "month": {
      const monthly = getMonthly(mode, month, day, time);
      return toMonthlyString(monthly.step, monthly.time, monthly.days);
    }
    case "day":
    default: {
      const daily = getDaily(mode, source, time);
      return toDailyString(daily.step, daily.time);
    }
  }
}

export function transformPeriodToUTC(
  period: string | undefined,
  start_at = "",
): string {
  if (!period) {
    return "";
  }
  const cronTime = new CronTime(period, dayjs(start_at));
  const time = getTime(cronTime).utc();
  const source = cronTime["source"] as string;
  const mode = getMode(source);
  const [, , , day, month] = source.split(" ");

  switch (mode) {
    case "week": {
      const weekly = getWeekly(mode, source, time);
      return toWeeklyString(weekly.step, weekly.time, weekly.days);
    }
    case "month": {
      const monthly = getMonthly(mode, month, day, time);
      return toMonthlyString(monthly.step, monthly.time, monthly.days);
    }
    case "day":
    default: {
      const daily = getDaily(mode, source, time);
      return toDailyString(daily.step, daily.time);
    }
  }
}
