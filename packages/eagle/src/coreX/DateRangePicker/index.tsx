import {
  CalendarClockDateTime16GradientBlueIcon,
  CalendarClockDateTime16SecondaryIcon,
  CalendarTimeRecord16Icon,
} from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import Icon from "@src/core/Icon";
import Input from "@src/core/Input";
import Tooltip from "@src/core/Tooltip";
import { Typo } from "@src/core/Typo";
import AbsoluteDate from "@src/coreX/DateRangePicker/AbsoluteDate";
import {
  DateRangePickerStyle,
  ResetPopoverStyle,
} from "@src/coreX/DateRangePicker/DateRangePicker.style";
import RelativeTime from "@src/coreX/DateRangePicker/RelativeTime";
import TabMenu, { TabMenuTab } from "@src/coreX/TabMenu";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { Popover as AntdPopover } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useRef, useState } from "react";

import {
  clampAbsoluteTimeRangeToBounds,
  getDateText,
  getEffectiveAbsoluteTimeBounds,
  getRelativeTimeRange,
  hasAbsoluteTimeRangeIntersection,
  isAbsoluteTimeRangeWithinBounds,
  normalizeRelativeTime,
} from "./common";
import {
  DateRangeHistory,
  DateRangePickerProps,
  DateRangePickerValue,
  PastTime,
  PickerDateRange,
} from "./dateRangePicker.type";

const TimeRange: React.FC<{
  visible?: boolean;
  /**
   *Selected relative or absolute time type
   */
  panelType: string;
  direction: NonNullable<DateRangePickerProps["type"]>;
  /**
   * The absolute time range selected by the user
   */
  range?: PickerDateRange;
  /**
   * Relative time selected by the user
   */
  relativeTime?: PastTime;
  mode: NonNullable<DateRangePickerProps["mode"]>;
  minDate?: string | Dayjs | undefined;
  maxDate?: string | Dayjs | undefined;
  maxRange?: string;
  onTypeChange: (type: string) => void;
  onRelativeTimeChange?: (time: PastTime) => void;
  /**
   * Finish the selection time click OK
   */
  onAbsoluteTimeOk?: (range: PickerDateRange) => void;
  onAbsoluteTimeChange?: (range: PickerDateRange) => void;
  /**
   * Customize an array of relative time select options
   */
  relativeTimeSelectOptions?: PastTime[];
}> = (props) => {
  const {
    visible,
    panelType,
    direction,
    relativeTime,
    range,
    mode = ["relative", "absolute"],
    minDate,
    maxDate,
    maxRange,
    onTypeChange,
    onRelativeTimeChange,
    onAbsoluteTimeOk,
    onAbsoluteTimeChange,
    relativeTimeSelectOptions,
  } = props;
  const { t } = useParrotTranslation();
  const absoluteDateRef = useRef<{ reset?: () => void } | null>(null);

  useEffect(() => {
    if (!visible) {
      absoluteDateRef.current?.reset?.();
    }
  }, [visible]);

  if (mode === "relative") {
    return (
      <div className="relative-time-container">
        <RelativeTime
          value={relativeTime}
          type={direction}
          onChange={(time) => onRelativeTimeChange?.(time)}
          config={relativeTimeSelectOptions}
        />
      </div>
    );
  } else if (mode === "absolute") {
    return (
      <div className="absolute-time-container">
        <AbsoluteDate
          ref={absoluteDateRef}
          range={range || [null, null]}
          minDate={minDate}
          maxDate={maxDate}
          maxRange={maxRange}
          onChange={(range) => onAbsoluteTimeChange?.(range)}
          onOk={(range) => onAbsoluteTimeOk?.(range)}
        />
      </div>
    );
  } else {
    const tabs: TabMenuTab[] = [
      {
        key: "relative",
        title: t("components.relative_time"),
        children: (
          <div className="relative-time-container">
            <RelativeTime
              value={relativeTime}
              type={direction}
              onChange={(time) => onRelativeTimeChange?.(time)}
              config={relativeTimeSelectOptions}
            />
          </div>
        ),
      },
      {
        key: "absolute",
        title: t("components.absolute_time"),
        children: (
          <div className="absolute-time-container">
            <AbsoluteDate
              ref={absoluteDateRef}
              range={range || [null, null]}
              minDate={minDate}
              maxDate={maxDate}
              maxRange={maxRange}
              onChange={(range) => onAbsoluteTimeChange?.(range)}
              onOk={(range) => onAbsoluteTimeOk?.(range)}
            />
          </div>
        ),
      },
    ].filter((item) => mode.includes(item.key as "absolute" | "relative"));

    return (
      <TabMenu
        selectedKey={panelType}
        tabs={tabs}
        onChange={onTypeChange}
        size="small"
      />
    );
  }
};

const TimePickerHistory: React.FC<{
  history: DateRangeHistory;
  type: NonNullable<DateRangePickerProps["type"]>;
  minDate?: string | Dayjs;
  maxDate?: string | Dayjs;
  onSelect: (value: PastTime | PickerDateRange) => void;
}> = (props) => {
  const { history, type, minDate, maxDate, onSelect } = props;
  const { t } = useParrotTranslation();

  function contentRender() {
    const filteredHistory = history
      .filter((item) => {
        if (Array.isArray(item.value)) {
          if (type !== "future") {
            return true;
          }

          if (item.value.length !== 2 || !item.value[0] || !item.value[1]) {
            return false;
          }

          return hasAbsoluteTimeRangeIntersection(
            [dayjs(item.value[0]), dayjs(item.value[1])],
            minDate,
            maxDate,
          );
        }

        return normalizeRelativeTime(item.value, "past").type === type;
      })
      .sort((a, b) => b.timestamp - a.timestamp);

    if (!filteredHistory.length) {
      return <>{t("components.empty_search_history")}</>;
    }

    return filteredHistory.map((item, index) => {
      const normalizedRelativeTime = Array.isArray(item.value)
        ? undefined
        : normalizeRelativeTime(item.value, "past");
      const text = Array.isArray(item.value)
        ? `${dayjs(item.value[0]).format("YYYY-MM-DD hh:mm:ss")} - ${dayjs(
            item.value[1],
          ).format("YYYY-MM-DD hh:mm:ss")}`
        : getDateText(normalizedRelativeTime as PastTime, t);

      return (
        <li
          key={index}
          className={Typo.Label.l2_regular}
          onClick={() => {
            if (Array.isArray(item.value)) {
              onSelect([
                dayjs(item.value[0]),
                dayjs(item.value[1]),
              ] as PickerDateRange);
              return;
            }

            onSelect(normalizedRelativeTime as PastTime);
          }}
        >
          {text}
        </li>
      );
    });
  }

  return (
    <DateRangePickerStyle.History>
      <header className={Typo.Heading.h2_regular_title}>
        {t("components.date_range_picker_history_title")}
      </header>
      <ul>{contentRender()}</ul>
    </DateRangePickerStyle.History>
  );
};

const DateRangePicker: React.FC<DateRangePickerProps> = (props) => {
  const {
    size = "medium",
    value,
    type: relativeTimeType = "past",
    history,
    mode = ["relative", "absolute"],
    minDate,
    maxDate,
    maxRange,
    onChange,
    relativeTimeSelectOptions,
  } = props;
  const { t } = useParrotTranslation();

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [panelType, setPanelType] = useState<string>("relative");
  const [range, setRange] = useState<PickerDateRange | undefined>(
    Array.isArray(value) ? value : undefined,
  );

  const relativeTime =
    value && !Array.isArray(value)
      ? normalizeRelativeTime(value, relativeTimeType)
      : undefined;

  const { minDate: effectiveMinDate, maxDate: effectiveMaxDate } =
    getEffectiveAbsoluteTimeBounds(relativeTimeType, minDate, maxDate);

  const isAbsoluteValue = value && Array.isArray(value);

  function handleChange(
    type: "relative" | "absolute",
    time: DateRangePickerValue,
  ) {
    const rangeHistory = [
      ...(history?.dateRangeHistories[history.scope] ?? []),
    ];
    if (type === "absolute" && Array.isArray(time)) {
      if (
        relativeTimeType === "future" &&
        !isAbsoluteTimeRangeWithinBounds(
          time,
          effectiveMinDate,
          effectiveMaxDate,
        )
      ) {
        return;
      }

      const value = time.map((item) => item?.format() || "");
      rangeHistory.push({
        type,
        value,
        timestamp: Date.now(),
      });
      onChange?.(type, time, time);
    } else if (type === "relative" && !Array.isArray(time)) {
      const normalizedRelativeTime = normalizeRelativeTime(
        time,
        relativeTimeType,
      );
      rangeHistory.push({
        type,
        value: normalizedRelativeTime,
        timestamp: Date.now(),
      });
      onChange?.(
        type,
        normalizedRelativeTime,
        getRelativeTimeRange(normalizedRelativeTime),
      );
    }
    history?.setDateRangeHistory({
      ...(history?.dateRangeHistories ?? {}),
      [history.scope]: rangeHistory,
    });
    setDatePickerVisible(false);
  }

  useEffect(() => {
    if (relativeTime) {
      setPanelType("relative");
      onChange?.("relative", relativeTime, getRelativeTimeRange(relativeTime));
    } else if (Array.isArray(value)) {
      setRange(value);
      setPanelType("absolute");
      onChange?.("absolute", value, value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relativeTimeType, value]);

  function displayRangeRender() {
    if (relativeTime) {
      return <>{getDateText(relativeTime, t)}</>;
    } else if (isAbsoluteValue) {
      return (
        <>
          <Input
            readOnly
            value={value[0]?.format("YYYY-MM-DD HH:mm:ss")}
            placeholder="YYYY-MM-DD HH:mm:ss"
          />
          <span className="concat-symbol-block">-</span>
          <Input
            readOnly
            value={value[1]?.format("YYYY-MM-DD HH:mm:ss")}
            placeholder="YYYY-MM-DD HH:mm:ss"
          />
        </>
      );
    }
  }

  function handleSelectHistory(value: PastTime | PickerDateRange) {
    if (Array.isArray(value)) {
      let selectedRange: PickerDateRange | undefined = [...value];

      if (relativeTimeType === "future") {
        selectedRange = clampAbsoluteTimeRangeToBounds(
          value,
          effectiveMinDate,
          effectiveMaxDate,
        );
      } else {
        const [start, end] = selectedRange;
        if (minDate && start) {
          const parsedMinDate = dayjs(minDate);
          selectedRange[0] = start.isBefore(parsedMinDate)
            ? parsedMinDate
            : start;
        }
        if (maxDate && end) {
          const parsedMaxDate = dayjs(maxDate);
          selectedRange[1] = end.isAfter(parsedMaxDate) ? parsedMaxDate : end;
        }
      }

      if (!selectedRange) {
        return;
      }

      const [selectedStart, selectedEnd] = selectedRange;
      if (
        !selectedStart?.isValid() ||
        !selectedEnd?.isValid() ||
        selectedStart.isAfter(selectedEnd)
      ) {
        return;
      }

      handleChange("absolute", selectedRange);
      return;
    }

    handleChange("relative", normalizeRelativeTime(value, "past"));
  }

  return (
    <DateRangePickerStyle.Wrapper
      className={cx(
        "date-range-picker",
        datePickerVisible && "active",
        size === "large" && "large",
        size === "medium" && "medium",
      )}
    >
      <Icon
        className="default-calendar-icon"
        iconWidth={16}
        iconHeight={16}
        src={CalendarClockDateTime16SecondaryIcon}
      />
      <Icon
        className="hover-calendar-icon"
        iconWidth={16}
        iconHeight={16}
        src={CalendarClockDateTime16GradientBlueIcon}
      />
      <AntdPopover
        overlayClassName={cx(DateRangePickerStyle.Popover, ResetPopoverStyle)}
        visible={datePickerVisible}
        content={
          <TimeRange
            visible={datePickerVisible}
            panelType={panelType}
            direction={relativeTimeType}
            range={range}
            relativeTime={relativeTime}
            mode={mode}
            minDate={effectiveMinDate}
            maxDate={effectiveMaxDate}
            maxRange={maxRange}
            onTypeChange={setPanelType}
            onRelativeTimeChange={(time) => {
              handleChange("relative", time);
            }}
            onAbsoluteTimeChange={setRange}
            onAbsoluteTimeOk={(range) => {
              handleChange("absolute", range);
            }}
            relativeTimeSelectOptions={relativeTimeSelectOptions}
          />
        }
        placement="bottomLeft"
        trigger={["click"]}
        onVisibleChange={(visible) => {
          if (!visible && (Array.isArray(value) || !value)) {
            setRange(value);
          }
          setDatePickerVisible(visible);
        }}
      >
        <div className="date-input-content">{displayRangeRender()}</div>
      </AntdPopover>
      {history ? (
        <AntdPopover
          placement="bottomRight"
          trigger={["click"]}
          content={
            <TimePickerHistory
              history={history.dateRangeHistories[history.scope] ?? []}
              type={relativeTimeType}
              minDate={effectiveMinDate}
              maxDate={effectiveMaxDate}
              onSelect={handleSelectHistory}
            />
          }
          overlayClassName={ResetPopoverStyle}
        >
          <Tooltip
            trigger="hover"
            overlay={t("components.date_range_picker_history_title")}
          >
            <Icon className="past-time-icon" src={CalendarTimeRecord16Icon} />
          </Tooltip>
        </AntdPopover>
      ) : null}
    </DateRangePickerStyle.Wrapper>
  );
};

export default DateRangePicker;

export { default as AbsoluteDate } from "./AbsoluteDate";
export { default as DateRangePickerCalendar } from "./Calendar";
export * from "./dateRangePicker.type";
export * from "./dateRangePicker.type";
export { default as InputTime } from "./InputTime";
export { default as RelativeTime } from "./RelativeTime";
