import { cx } from "@linaria/core";
import { Typo } from "@src/core/Typo";
import React, { useRef, useState } from "react";

import { time2stringByUnit } from "./common";
import { InputTimeStyle } from "./DateRangePicker.style";
import { InputTimeProps, InputTimeValue } from "./dateRangePicker.type";

const InputTime: React.FC<InputTimeProps> = (props) => {
  const { className, value, danger, error, onChange, onBlur } = props;
  const [focus, setFocus] = useState(false);
  const [time, setTime] = useState<InputTimeValue>(["", "", ""]);
  const hourInputRef = useRef<HTMLInputElement | null>(null);
  const minuteInputRef = useRef<HTMLInputElement | null>(null);
  const secondInputRef = useRef<HTMLInputElement | null>(null);

  const currentTime = value || time;

  function handleChangeHour(
    event: React.FormEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) {
    const hour = time2stringByUnit(event.target.value, "h");
    const _time: InputTimeValue = [...currentTime];
    _time[0] = hour;
    setTime(_time);
    onChange?.(_time);
    if (_time[0].length === 2) {
      minuteInputRef.current?.focus();
    }
  }

  function handleChangeMinute(
    event: React.FormEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) {
    const minute = time2stringByUnit(event.target.value, "m");
    const _time: InputTimeValue = [...currentTime];
    _time[1] = minute;
    setTime(_time);
    onChange?.(_time);
    if (_time[1].length === 2) {
      secondInputRef.current?.focus();
    }
  }

  function handleChangeSecond(
    event: React.FormEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) {
    const second = time2stringByUnit(event.target.value, "s");
    const _time: InputTimeValue = [...currentTime];
    _time[2] = second;
    setTime(_time);
    onChange?.(_time);
  }

  function handleBlurHour(
    event: React.FormEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) {
    const hour = parseInt(event.target.value);
    const _time: InputTimeValue = [...currentTime];
    if (Number.isInteger(hour)) {
      _time[0] = time2stringByUnit(event.target.value, "h");
      setTime(_time);
    }
    onBlur?.(_time);
    setFocus(false);
  }

  function handleBlurMinute(
    event: React.FormEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) {
    const minute = parseInt(event.target.value);
    const _time: InputTimeValue = [...currentTime];
    if (Number.isInteger(minute)) {
      _time[1] = time2stringByUnit(event.target.value, "m");
      setTime(_time);
    }
    onBlur?.(_time);
    setFocus(false);
  }

  function handleBlurSecond(
    event: React.FormEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) {
    const second = parseInt(event.target.value);
    const _time: InputTimeValue = [...currentTime];
    if (Number.isInteger(second)) {
      _time[2] = time2stringByUnit(event.target.value, "s");
      setTime(_time);
    }
    onBlur?.(_time);
    setFocus(false);
  }

  function handleMinuteKeyDown(
    event: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) {
    if (event.keyCode === 8 || event.keyCode === 46) {
      if (!event.target.value) {
        hourInputRef.current?.focus();
      }
    }
  }

  function handleSecondKeyDown(
    event: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) {
    if (event.keyCode === 8 || event.keyCode === 46) {
      if (!event.target.value) {
        minuteInputRef.current?.focus();
      }
    }
  }

  return (
    <InputTimeStyle.Wrapper className={className}>
      <div
        className={cx(
          "input-time",
          focus && "focus",
          (error || danger) && "error",
        )}
      >
        <input
          ref={hourInputRef}
          type="text"
          className="hour"
          placeholder="hh"
          maxLength={2}
          value={currentTime[0]}
          onChange={handleChangeHour}
          onFocus={() => setFocus(true)}
          onBlur={handleBlurHour}
        />
        <span className={cx("connect-symbol", !!currentTime[0] && "inputted")}>
          :
        </span>
        <input
          ref={minuteInputRef}
          type="text"
          className="minute"
          placeholder="mm"
          maxLength={2}
          value={currentTime[1]}
          onChange={handleChangeMinute}
          onFocus={() => setFocus(true)}
          onBlur={handleBlurMinute}
          onKeyDown={handleMinuteKeyDown}
        />
        <span className={cx("connect-symbol", !!currentTime[1] && "inputted")}>
          :
        </span>
        <input
          ref={secondInputRef}
          type="text"
          className="second"
          placeholder="ss"
          maxLength={2}
          value={currentTime[2]}
          onChange={handleChangeSecond}
          onFocus={() => setFocus(true)}
          onBlur={handleBlurSecond}
          onKeyDown={handleSecondKeyDown}
        />
      </div>
      {error ? (
        <p className={cx("error-message", Typo.Label.l4_regular)}>{error}</p>
      ) : null}
    </InputTimeStyle.Wrapper>
  );
};

export default InputTime;
