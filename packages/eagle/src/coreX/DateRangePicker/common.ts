import { cx } from "@linaria/core";
import { Typo } from "@src/core/Typo";
import dayjs, { Dayjs } from "dayjs";
import { TFunction } from "i18next";

import {
  PastTime,
  PickerDateRange,
  RelativeTimeDirection,
} from "./dateRangePicker.type";

export const BASIC_RELATIVE_TIME_CONFIG: PastTime[] = [
  {
    unit: "m",
    value: 5,
  },
  {
    unit: "m",
    value: 15,
  },
  {
    unit: "m",
    value: 30,
  },
  {
    unit: "h",
    value: 1,
  },
  {
    unit: "h",
    value: 3,
  },
  {
    unit: "h",
    value: 6,
  },
  {
    unit: "h",
    value: 12,
  },
  {
    unit: "d",
    value: 1,
  },
  {
    unit: "d",
    value: 2,
  },
  {
    unit: "d",
    value: 7,
  },
  {
    unit: "d",
    value: 15,
  },
  {
    unit: "d",
    value: 30,
  },
];

export function getTime(year: number, month: number, date: number): Dayjs {
  return dayjs(`${year}-${month}-${date}`, "YYYY-M-D");
}

export function trimTime(time: Dayjs): Dayjs {
  return dayjs(time.format("YYYY-MM-DD"), "YYYY-MM-DD");
}

export function isSameDate(first: Dayjs, second: Dayjs) {
  return trimTime(first).isSame(trimTime(second));
}

export function getClassNameForDateBlock(
  range: PickerDateRange,
  date: Dayjs,
  mapOfHighlightDay: Map<string, number>,
  disabled: boolean,
) {
  const className: string[] = ["date", Typo.Label.l1_regular];

  const today = dayjs(dayjs().format("YYYY-MM-DD"), "YYY-MM-DD");
  if (today.diff(date, "day") === 0) {
    className.push("today");
  }

  if (
    (range[0] && isSameDate(range[0], date)) ||
    (range[1] && isSameDate(range[1], date))
  ) {
    className.push("checked");
  }

  if (disabled) {
    className.push("disabled");
  }

  if (mapOfHighlightDay.has(date.format("YYYY-MM-DD"))) {
    className.push("highlight");
  }

  return cx(...className);
}

export function getDiffMonthAndDate(first: Dayjs, second: Dayjs) {
  const diffDayList: string[] = [];

  let max = first;
  let min = second;

  if (first.valueOf() > second.valueOf()) {
    max = first;
    min = second;
  } else if (second.valueOf() > first.valueOf()) {
    max = second;
    min = first;
  }

  const diffDayCount = max.diff(min, "day");

  if (!diffDayCount) {
    return [];
  }

  let time = min;
  diffDayList.push(time.format("YYYY-MM-DD"));
  for (let day = 0; day < diffDayCount; day++) {
    time = time.add(1, "day");
    diffDayList.push(time.format("YYYY-MM-DD"));
  }

  return diffDayList;
}

export function time2stringByUnit(time: string, type: "h" | "m" | "s") {
  const _time = parseInt(time);

  if (Number.isInteger(_time)) {
    switch (type) {
      case "h": {
        if (_time > 23) {
          return "23";
        } else if (/^0/.test(time)) {
          return time;
        } else {
          return _time.toString();
        }
      }
      case "s":
      case "m": {
        if (_time > 59) {
          return "59";
        } else if (/^0/.test(time)) {
          return time;
        } else {
          return _time.toString();
        }
      }
    }
  }

  return "";
}

export function time2string(time: number): string {
  const _time = time.toString();
  if (_time.length === 0) {
    return "00";
  } else if (_time.length === 1) {
    return `0${_time}`;
  } else {
    return _time;
  }
}

export function normalizeRelativeTime(
  date: Omit<PastTime, "disabled"> | PastTime,
  defaultType: RelativeTimeDirection = "past",
): PastTime {
  if (date.type) {
    return date as PastTime;
  }

  return {
    ...date,
    type: defaultType,
  };
}

export function getRelativeTimeRange(
  date: Omit<PastTime, "disabled"> | PastTime,
  defaultType: RelativeTimeDirection = "past",
  nowDate: Dayjs = dayjs(),
): PickerDateRange {
  const normalizedDate = normalizeRelativeTime(date, defaultType);
  const rangeEnd =
    normalizedDate.type === "future"
      ? nowDate.add(normalizedDate.value, normalizedDate.unit)
      : nowDate.subtract(normalizedDate.value, normalizedDate.unit);

  return [nowDate, rangeEnd];
}

export function getEffectiveAbsoluteTimeBounds(
  type: RelativeTimeDirection = "past",
  minDate?: string | Dayjs | undefined,
  maxDate?: string | Dayjs | undefined,
  nowDate: Dayjs = dayjs(),
) {
  if (type !== "future") {
    return {
      minDate,
      maxDate,
    };
  }

  let effectiveMinDate = nowDate;
  let effectiveMaxDate = nowDate.add(1, "year");

  const parsedMinDate = dayjs(minDate);
  if (parsedMinDate.isValid() && parsedMinDate.isAfter(effectiveMinDate)) {
    effectiveMinDate = parsedMinDate;
  }

  const parsedMaxDate = dayjs(maxDate);
  if (parsedMaxDate.isValid() && parsedMaxDate.isBefore(effectiveMaxDate)) {
    effectiveMaxDate = parsedMaxDate;
  }

  return {
    minDate: effectiveMinDate,
    maxDate: effectiveMaxDate,
  };
}

export function getDateText(
  date: Omit<PastTime, "disabled"> | PastTime,
  t: TFunction,
  defaultType: RelativeTimeDirection = "past",
) {
  const normalizedDate = normalizeRelativeTime(date, defaultType);
  const count = normalizedDate.value;
  const dateString = {
    d: t("common.day_count", { count }),
    h: t("common.hour_count", { count }),
    m: t("common.minute_count", { count }),
    M: t("common.month_measure_count", { count }),
    y: t("common.year_count", { count }),
  }[normalizedDate.unit];

  return `${t(
    normalizedDate.type === "future" ? "components.future" : "components.past",
  )} ${dateString}`;
}

export function checkDateNotInRange(
  date: Dayjs,
  minDate?: string | Dayjs | undefined,
  maxDate?: string | Dayjs | undefined,
) {
  if (!minDate && !maxDate) {
    return true;
  }

  if (minDate) {
    const _minDate = dayjs(minDate);
    if (!_minDate.isValid()) {
      return true;
    }
    if (isSameDate(_minDate, date)) {
      return true;
    }
    if (_minDate.isAfter(date)) {
      return false;
    }
  }

  if (maxDate) {
    const _maxDate = dayjs(maxDate);
    if (!_maxDate.isValid()) {
      return true;
    }
    if (isSameDate(_maxDate, date)) {
      return true;
    }
    if (_maxDate.isBefore(date)) {
      return false;
    }
  }

  return true;
}

export function copyDay(day: Dayjs): Dayjs {
  return day.clone().set("millisecond", 0);
}
