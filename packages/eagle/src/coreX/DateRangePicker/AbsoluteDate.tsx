import { cx } from "@linaria/core";
import Button from "@src/core/Button";
import { Typo } from "@src/core/Typo";
import Calendar from "@src/coreX/DateRangePicker/Calendar";
import InputTime from "@src/coreX/DateRangePicker/InputTime";
import useMemoCompare from "@src/hooks/useMemoCompare";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import dayjs, { Dayjs } from "dayjs";
import { TFunction } from "i18next";
import { isEqual } from "lodash";
import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import { copyDay, time2string } from "./common";
import { AbsoluteTimeStyle } from "./DateRangePicker.style";
import {
  AbsoluteTimeProps,
  InputTimeValue,
  PickerDateRange,
} from "./dateRangePicker.type";

type TimeProps = {
  range: PickerDateRange;
  minDate?: string | Dayjs | undefined;
  maxDate?: string | Dayjs | undefined;
  onOk: (range: [InputTimeValue, InputTimeValue]) => void;
};

type TimeRef = {
  reset?: () => void;
};

function transformTime(
  type: "start" | "end",
  day: Dayjs | null | undefined,
  boundaryDate?: string | Dayjs | undefined,
): InputTimeValue {
  if (day) {
    const _boundaryDate = dayjs(boundaryDate);
    if (type === "start" && _boundaryDate.isValid()) {
      const start = day.isBefore(_boundaryDate) ? _boundaryDate : day;
      return [
        time2string(start.hour()),
        time2string(start.minute()),
        time2string(start.second()),
      ];
    }

    if (type === "end" && _boundaryDate.isValid()) {
      const end = day.isAfter(_boundaryDate) ? _boundaryDate : day;
      return [
        time2string(end.hour()),
        time2string(end.minute()),
        time2string(end.second()),
      ];
    }
  }

  return ["", "", ""];
}

function updateDate(
  time: InputTimeValue,
  date: Dayjs | undefined | null,
): Dayjs {
  const [hour, minute, second] = time;

  return copyDay(dayjs(date?.format()))
    .set("hour", parseInt(hour || "0"))
    .set("minute", parseInt(minute || "0"))
    .set("second", parseInt(second || "0"));
}

function checkMinAndMaxTimeRange(
  t: TFunction,
  range: PickerDateRange,
  timeRange: [InputTimeValue, InputTimeValue],
  minDate?: string | Dayjs | undefined,
  maxDate?: string | Dayjs | undefined,
): string | undefined {
  const [startDate, endDate] = range;
  const [startTime, endTime] = timeRange;

  if (!startDate && !endDate) {
    return undefined;
  }

  if (!minDate && !maxDate) {
    return undefined;
  }

  const _minDate = copyDay(dayjs(minDate));
  const _maxDate = copyDay(dayjs(maxDate));

  if (!_minDate.isValid() && !_maxDate.isValid()) {
    return undefined;
  }

  if (startDate && _minDate.isValid() && startTime.filter(Boolean).length) {
    const _startDate = copyDay(startDate)
      .set("hour", parseInt(startTime[0] || "0"))
      .set("minute", parseInt(startTime[1] || ""))
      .set("second", parseInt(startTime[2] || "0"));
    if (_startDate.isBefore(_minDate)) {
      return t("components.set_start_time_failed", {
        time: _minDate.format("HH:mm:ss"),
      });
    }
  }

  if (endDate && _maxDate.isValid() && endTime.filter(Boolean).length) {
    const _endDate = copyDay(endDate)
      .set("hour", parseInt(endTime[0] || "0"))
      .set("minute", parseInt(endTime[1] || ""))
      .set("second", parseInt(endTime[2] || "0"));
    if (_endDate.isAfter(_maxDate)) {
      return t("components.set_end_time_failed", {
        time: _maxDate.format("HH:mm:ss"),
      });
    }
  }

  return undefined;
}

const Time = React.forwardRef<TimeRef, TimeProps>((props, ref) => {
  const { range, minDate, maxDate, onOk } = props;
  const { t } = useParrotTranslation();

  const initRange = useMemoCompare(range, (prev, next) => {
    const prevStringList = prev?.map((item) => item?.format());
    const nextStringList = next?.map((item) => item?.format());
    return isEqual(prevStringList, nextStringList);
  });

  const [startTime, setStartTime] = useState<InputTimeValue>(
    transformTime("start", initRange?.[0], minDate),
  );
  const [endTime, setEndTime] = useState<InputTimeValue>(
    transformTime("end", initRange?.[1], maxDate),
  );

  const [error, setError] = useState("");

  const [start, end] = props.range;

  const startDate = start?.format("YYYY-MM-DD");
  const endDate = end?.format("YYYY-MM-DD");

  function reset() {
    setError("");
    setStartTime(transformTime("start", initRange?.[0], minDate));
    setEndTime(transformTime("end", initRange?.[1], maxDate));
  }

  useImperativeHandle(ref, () => ({ reset }));

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initRange]);

  const validateTimeRange = useMemo(() => {
    if (startDate && endDate) {
      let _startDate = copyDay(dayjs(startDate));
      let _endDate = copyDay(dayjs(endDate));

      _startDate = _startDate
        .set("hour", parseInt(startTime[0] || "0"))
        .set("minute", parseInt(startTime[1] || "0"))
        .set("second", parseInt(startTime[2] || "0"));
      _endDate = _endDate
        .set("hour", parseInt(endTime[0] || "0"))
        .set("minute", parseInt(endTime[1] || "0"))
        .set("second", parseInt(endTime[2] || "0"));

      return _startDate.valueOf() <= _endDate.valueOf();
    }

    return false;
  }, [endDate, endTime, startDate, startTime]);

  function handleOk() {
    if (!startDate || !endDate) {
      return;
    }

    const validateResult = checkMinAndMaxTimeRange(
      t,
      range,
      [startTime, endTime],
      minDate,
      maxDate,
    );

    if (validateResult) {
      setError(validateResult);
      return;
    } else if (!validateTimeRange && start && end) {
      setError(t("components.end_time_cannot_be_less_than_start_time"));
      return;
    } else {
      setError("");
    }

    onOk([startTime, endTime]);
  }

  return (
    <AbsoluteTimeStyle.Time>
      <div className="time-input-main">
        <div className="time-input-container">
          <div className="start-time">
            <p className={cx("date", Typo.Label.l4_regular)}>
              {startDate || t("components.start_date")}
            </p>
            <InputTime
              value={startTime}
              danger={!!error}
              onChange={setStartTime}
            />
          </div>
          <div className={cx("to", Typo.Label.l3_regular)}>
            {t("components.to")}
          </div>
          <div className="end-time">
            <p className={cx("date", Typo.Label.l4_regular)}>
              {endDate || t("components.end_date")}
            </p>
            <InputTime value={endTime} danger={!!error} onChange={setEndTime} />
          </div>
        </div>
        <Button disabled={!start || !end} type="primary" onClick={handleOk}>
          {t("components.confirm")}
        </Button>
      </div>
      {error ? <p className="time-input-error">{error}</p> : null}
    </AbsoluteTimeStyle.Time>
  );
});

const AbsoluteDate = React.forwardRef<TimeRef, AbsoluteTimeProps>(
  (props, ref) => {
    const { range, minDate, maxDate, onChange, onOk } = props;

    const timeRef = useRef<TimeRef | null>(null);

    useImperativeHandle(ref, () => ({ reset: timeRef.current?.reset }));

    function handleOk(timeRange: [InputTimeValue, InputTimeValue]) {
      const [startTime, endTime] = timeRange;
      const nowDate = dayjs();
      const startDate = updateDate(startTime, range[0] || nowDate);
      const endDate = updateDate(endTime, range[1] || nowDate);
      onOk?.([startDate, endDate]);
    }

    return (
      <AbsoluteTimeStyle.Wrapper>
        <Calendar
          range={range}
          minDate={minDate}
          maxDate={maxDate}
          onChange={onChange}
        />
        <Time
          ref={timeRef}
          range={range}
          minDate={minDate}
          maxDate={maxDate}
          onOk={handleOk}
        />
      </AbsoluteTimeStyle.Wrapper>
    );
  },
);

export default AbsoluteDate;
