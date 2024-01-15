import {
  ArrowChevronDown16BoldBlueIcon,
  ArrowChevronUp16BoldBlueIcon,
} from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import Button from "@src/core/Button";
import Icon from "@src/core/Icon";
import Input from "@src/core/Input";
import { Typo } from "@src/core/Typo";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useRef, useState } from "react";

import useParrotTranslation from "../../hooks/useParrotTranslation";
import {
  CalendarProps,
  checkDateNotInRange,
  DateRange,
  getClassNameForDateBlock,
  getDiffMonthAndDate,
  getTime,
  MonthAndDate,
} from "./common";
import { CalendarStyle } from "./DateRangePicker.style";
import useElementIntersectionRatio from "./hooks/useElementIntersectionRatio";

const Year: React.FC<{
  year: number;
  onChange: (year: number) => void;
}> = (props) => {
  const { year, onChange } = props;
  const { t } = useParrotTranslation();

  const [tmpYear, setTmpYear] = useState(year);
  const [edit, setEdit] = useState(false);

  function handleChangeYear() {
    if (tmpYear <= 1900 || tmpYear >= 2500) {
      setTmpYear(year);
      onChange(year);
    } else {
      onChange(tmpYear);
    }
    setEdit(false);
  }

  return (
    <CalendarStyle.Year>
      <div className={cx("year-number", Typo.Label.l1_bold)}>
        {edit ? (
          <Input
            className="year-number-input"
            value={tmpYear}
            onChange={(event) => {
              const newYear = parseInt(event.target.value);
              if (Number.isInteger(newYear)) {
                setTmpYear(newYear);
              } else {
                setTmpYear(year);
              }
            }}
            onBlur={handleChangeYear}
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                handleChangeYear();
              }
            }}
          />
        ) : (
          <span className="year-number-text" onClick={() => setEdit(true)}>
            {year}
          </span>
        )}
        {t("common.year")}
      </div>
      <div className="year-control">
        <Button
          prefixIcon={<Icon src={ArrowChevronUp16BoldBlueIcon} />}
          size="small"
          type="secondary"
          shape="circle"
          onClick={() => onChange(year - 1)}
        />
        <Button
          prefixIcon={<Icon src={ArrowChevronDown16BoldBlueIcon} />}
          size="small"
          type="secondary"
          shape="circle"
          onClick={() => onChange(year + 1)}
        />
      </div>
    </CalendarStyle.Year>
  );
};

const MonthItem: React.FC<{
  year: number;
  month: MonthAndDate;
  range: DateRange;
  highlightDay: string[];
  minDate?: string | Dayjs | undefined;
  maxDate?: string | Dayjs | undefined;
  parentElement?: React.MutableRefObject<HTMLDivElement | null>;
  onRangeChange: (range: DateRange) => void;
  onMouseEnter: (date: Dayjs | null) => void;
}> = (props) => {
  const {
    year: initYear,
    month: initMonth,
    range,
    highlightDay,
    minDate,
    maxDate,
    parentElement,
    onRangeChange,
    onMouseEnter,
  } = props;
  const { t } = useParrotTranslation();
  const containerRef = useRef<HTMLLIElement | null>(null);
  const datesContainerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLHeadElement | null>(null);

  const entry = useElementIntersectionRatio(datesContainerRef, parentElement);

  const mapOfHighlightDay = highlightDay.reduce<Map<string, number>>(
    (map, day, currentIndex) => {
      map.set(day, currentIndex);
      return map;
    },
    new Map(),
  );

  const scrollTop = parentElement?.current?.scrollTop || 0;
  const offsetTop = datesContainerRef.current?.offsetTop || 0;
  const headerHeight = headerRef.current?.offsetHeight || 0;
  const isPinned =
    scrollTop - offsetTop + headerHeight > 0 && entry?.isIntersecting;

  const [rangeStart, rangeEnd] = range;

  useEffect(() => {
    if (
      dayjs().month() + 1 === initMonth.month &&
      containerRef.current &&
      !rangeStart &&
      !rangeEnd
    ) {
      containerRef.current?.scrollIntoView();
    } else if (
      rangeStart &&
      rangeEnd &&
      rangeEnd.month() + 1 === initMonth.month
    ) {
      containerRef.current?.scrollIntoView({
        block: "center",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clickDate(date: number) {
    let _range = [...range] as DateRange;
    const month = initMonth.month;
    if (!rangeStart && !rangeEnd) {
      _range = [getTime(initYear, month, date), null];
    } else if (rangeStart && !rangeEnd) {
      _range[1] = dayjs(
        `${initYear}-${month}-${date} 23:59:59`,
        "YYYY-M-D HH:mm:ss",
      );
      _range = _range.sort((a, b) => {
        return (a?.valueOf() || 0) - (b?.valueOf() || 0);
      });
    } else if (rangeStart && rangeEnd) {
      _range = [getTime(initYear, month, date), null];
    }
    onRangeChange(_range);
  }

  return (
    <li className="month-container" ref={containerRef}>
      <header
        className={cx(Typo.Label.l1_bold, isPinned && "pinned")}
        ref={headerRef}
      >
        {initMonth.month}
        {t("common.month")}
      </header>
      <div className="dates-in-month" ref={datesContainerRef}>
        {new Array(initMonth.firstDateOfDay).fill(null).map((value, index) => (
          <span key={`blank-date-${index}`} className="blank" />
        ))}
        {initMonth.dates.map((date) => {
          const _date = getTime(initYear, initMonth.month, date);
          const dateNotIncludeInRange = checkDateNotInRange(
            _date,
            minDate,
            maxDate,
          );
          const disabled =
            Boolean(
              rangeStart && !rangeEnd && rangeStart.valueOf() > _date.valueOf(),
            ) || !dateNotIncludeInRange;
          const dateClassName = getClassNameForDateBlock(
            range,
            _date,
            mapOfHighlightDay,
            disabled,
          );
          const highlightIndex = mapOfHighlightDay.get(
            _date.format("YYYY-MM-DD"),
          );

          const isFirstDayInWeek = _date.day() === 1;
          // first day of week is monday in tower
          // first day of week is sunday in dayjs
          // so treat sunday as last day of week
          const isLastDayInWeek = _date.day() === 0;

          const isFirstDayInMonth = _date.date() === 1;
          const isLastDayInMonth = _date.date() === _date.daysInMonth();

          const isLastDayIsSingleDayInWeek =
            isLastDayInMonth && isFirstDayInWeek;

          const isFirstHighlight =
            highlightIndex === 0 ||
            isFirstDayInWeek ||
            isFirstDayInMonth ||
            isLastDayIsSingleDayInWeek;
          const isLastHighlight =
            highlightIndex === Math.max(mapOfHighlightDay.size - 1, 0) ||
            isLastDayInWeek ||
            isLastDayInMonth;

          return (
            <span
              key={`date-${date}`}
              className={cx(
                "date-block",
                dateClassName,
                isFirstHighlight && "first-highlight",
                isLastHighlight && "last-highlight",
              )}
              onClick={() => {
                if (disabled) {
                  return;
                }
                clickDate(date);
              }}
              onMouseEnter={() => {
                if (disabled) {
                  onMouseEnter(null);
                } else if (rangeStart && !rangeEnd) {
                  onMouseEnter(_date);
                }
              }}
            >
              <span className={cx("date-text", dateClassName)}>{date}</span>
            </span>
          );
        })}
      </div>
    </li>
  );
};

const Month: React.FC<{
  year: number;
  range: DateRange;
  minDate?: string | Dayjs | undefined;
  maxDate?: string | Dayjs | undefined;
  onRangeChange: (range: DateRange) => void;
}> = (props) => {
  const { year, range, minDate, maxDate, onRangeChange } = props;
  const monthContainerRef = useRef<HTMLDivElement | null>(null);
  const [month, setMonth] = useState<MonthAndDate[]>([]);
  const [highlightDay, setHighlightDay] = useState<string[] | null>(() => {
    if (range[0] && range[1]) {
      return getDiffMonthAndDate(range[0], range[1]);
    }
    return null;
  });

  const controlHighlightDay =
    range[0] && range[1] ? getDiffMonthAndDate(range[0], range[1]) : null;

  useEffect(() => {
    const monthAndDate: MonthAndDate[] = [];

    for (let month = 1; month <= 12; month++) {
      const time = dayjs(`${year}-${month}`, "YYYY-M");
      const allDateInMonth = time.daysInMonth();
      const dates = new Array(allDateInMonth)
        .fill(1)
        .map((value, index) => index + 1);
      const firstDateOfDay = time.set("date", dates[0]).day();
      monthAndDate.push({
        month,
        dates,
        firstDateOfDay: Math.max(firstDateOfDay - 1, 0),
      });
    }

    setMonth(monthAndDate);
  }, [year]);

  function handleMouseEnterDate(date: Dayjs | null) {
    if (range[0] && date) {
      const diffDay = getDiffMonthAndDate(range[0], date);
      setHighlightDay(diffDay);
    } else {
      setHighlightDay(null);
    }
  }

  function handleMouseOutMonthUl(
    event: React.MouseEvent<HTMLDivElement> & { target: Element },
  ) {
    if (!range[0] || range[1] || !event.target) {
      return;
    }

    if (event.target.classList.contains("disabled")) {
      return;
    }

    if (!event.target.classList.contains("date")) {
      setHighlightDay(null);
    }
  }

  return (
    <CalendarStyle.Month
      ref={monthContainerRef}
      onMouseMove={handleMouseOutMonthUl}
    >
      <ul>
        {month.map((m) => (
          <MonthItem
            key={m.month}
            year={year}
            month={m}
            range={range}
            minDate={minDate}
            maxDate={maxDate}
            highlightDay={highlightDay || controlHighlightDay || []}
            parentElement={monthContainerRef}
            onRangeChange={onRangeChange}
            onMouseEnter={handleMouseEnterDate}
          />
        ))}
      </ul>
    </CalendarStyle.Month>
  );
};

const Week: React.FC = () => {
  const { t } = useParrotTranslation();

  return (
    <CalendarStyle.Week>
      <li className={Typo.Label.l1_regular}>{t("components.monday-simple")}</li>
      <li className={Typo.Label.l1_regular}>
        {t("components.tuesday-simple")}
      </li>
      <li className={Typo.Label.l1_regular}>
        {t("components.wednesday-simple")}
      </li>
      <li className={Typo.Label.l1_regular}>
        {t("components.thursday-simple")}
      </li>
      <li className={Typo.Label.l1_regular}>{t("components.friday-simple")}</li>
      <li className={Typo.Label.l1_regular}>
        {t("components.saturday-simple")}
      </li>
      <li className={Typo.Label.l1_regular}>{t("components.sunday-simple")}</li>
    </CalendarStyle.Week>
  );
};

const Calendar: React.FC<CalendarProps> = (props) => {
  const { range: initRange, minDate, maxDate, onChange } = props;
  const [year, setYear] = useState(dayjs().year());
  const [range, setRange] = useState<DateRange>(initRange || [null, null]);

  useEffect(() => {
    setRange(initRange || [null, null]);
  }, [initRange]);

  function handleRangeChange(newRange: DateRange) {
    setRange(newRange);
    onChange?.(newRange);
  }

  return (
    <CalendarStyle.Wrapper className="date-range-picker-calendar">
      <Year year={year} onChange={setYear} />
      <Week />
      <Month
        year={year}
        range={range}
        minDate={minDate}
        maxDate={maxDate}
        onRangeChange={handleRangeChange}
      />
    </CalendarStyle.Wrapper>
  );
};

export default Calendar;
