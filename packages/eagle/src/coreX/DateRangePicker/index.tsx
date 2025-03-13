import {
  CalendarClockDateTime16SecondaryIcon,
  CalendarClockDateTime16GradientBlueIcon,
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

import { getDateText } from "./common";
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
  type: string;
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
    type,
    relativeTime,
    range,
    mode = ["relative", "absolute"],
    minDate,
    maxDate,
    onTypeChange,
    onRelativeTimeChange,
    onAbsoluteTimeOk,
    onAbsoluteTimeChange,
    relativeTimeSelectOptions
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
              onChange={(range) => onAbsoluteTimeChange?.(range)}
              onOk={(range) => onAbsoluteTimeOk?.(range)}
            />
          </div>
        ),
      },
    ].filter((item) => mode.includes(item.key as "absolute" | "relative"));

    return <TabMenu selectedKey={type} tabs={tabs} onChange={onTypeChange} />;
  }
};

const TimePickerHistory: React.FC<{
  history: DateRangeHistory;
  onSelect: (value: PastTime | PickerDateRange) => void;
}> = (props) => {
  const { history, onSelect } = props;
  const { t } = useParrotTranslation();

  function contentRender() {
    if (!history.length) {
      return <>{t("components.empty_search_history")}</>;
    }

    return history
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((item, index) => {
        const text = Array.isArray(item.value)
          ? `${dayjs(item.value[0]).format("YYYY-MM-DD hh:mm:ss")} - ${dayjs(
              item.value[1],
            ).format("YYYY-MM-DD hh:mm:ss")}`
          : getDateText(item.value, t);

        const obj = Array.isArray(item.value)
          ? ([dayjs(item.value[0]), dayjs(item.value[1])] as PickerDateRange)
          : item.value;

        return (
          <li
            key={index}
            className={Typo.Label.l2_regular}
            onClick={() => onSelect(obj)}
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
    history,
    mode = ["relative", "absolute"],
    minDate,
    maxDate,
    onChange,
    relativeTimeSelectOptions
  } = props;
  const { t } = useParrotTranslation();

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [type, setType] = useState<string>("relative");
  const [range, setRange] = useState<PickerDateRange | undefined>(
    Array.isArray(value) ? value : undefined,
  );

  const relativeTime = !Array.isArray(value) ? value : undefined;

  const isRelativeValue = value && !Array.isArray(value);
  const isAbsoluteValue = value && Array.isArray(value);

  function handleChange(
    type: "relative" | "absolute",
    time: DateRangePickerValue,
  ) {
    const rangeHistory = [
      ...(history?.dateRangeHistories[history.scope] ?? []),
    ];
    if (type === "absolute" && Array.isArray(time)) {
      const value = time.map((item) => item?.format() || "");
      rangeHistory.push({
        type,
        value,
        timestamp: Date.now(),
      });
      onChange?.(type, time, time);
    } else if (type === "relative" && !Array.isArray(time)) {
      rangeHistory.push({
        type,
        value: time,
        timestamp: Date.now(),
      });
      const today = dayjs();
      const pastDay = dayjs().subtract(time.value, time.unit);
      onChange?.(type, time, [today, pastDay]);
    }
    history?.setDateRangeHistory({
      ...(history?.dateRangeHistories ?? {}),
      [history.scope]: rangeHistory,
    });
    setDatePickerVisible(false);
  }

  useEffect(() => {
    if (isRelativeValue) {
      const today = dayjs();
      const pastDay = dayjs().subtract(value.value, value.unit);

      setType("relative");
      onChange?.("relative", value, [today, pastDay]);
    } else if (isAbsoluteValue) {
      setRange(value);
      setType("absolute");
      onChange?.("absolute", value, value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function displayRangeRender() {
    if (isRelativeValue) {
      return <>{getDateText(value, t)}</>;
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
    const type = Array.isArray(value) ? "absolute" : "relative";
    if (type === "absolute" && Array.isArray(value)) {
      const _value: PickerDateRange = [...value];
      const [start, end] = _value;
      if (minDate && start) {
        const _minDate = dayjs(minDate);
        _value[0] = start.isBefore(_minDate) ? _minDate : start;
      }
      if (maxDate && end) {
        const _maxDate = dayjs(maxDate);
        _value[1] = end.isAfter(_maxDate) ? _maxDate : end;
      }
      handleChange(type, _value);
    }
    handleChange(type, value);
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
            type={type}
            range={range}
            relativeTime={relativeTime}
            mode={mode}
            minDate={minDate}
            maxDate={maxDate}
            onTypeChange={setType}
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
