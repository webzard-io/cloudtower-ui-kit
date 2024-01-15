import { InputStyle } from "@src/components/Styled";
import { Typo } from "@src/components/Typo";
import { TimePicker as AntdTimePicker } from "antd";
import { TimePickerProps } from "antd/lib/time-picker";
import cs from "classnames";
import React from "react";
const TimePicker: React.FC<TimePickerProps & { error?: boolean }> = ({
  className,
  error,
  size = "middle",
  ...props
}) => {
  const typo = {
    large: Typo.Label.l2_regular,
    middle: Typo.Label.l3_regular,
    small: Typo.Label.l4_regular,
  }[size];
  return (
    <AntdTimePicker
      {...props}
      size={size}
      data-test={props.name}
      className={cs(className, InputStyle, typo, error ? "error" : "")}
    />
  );
};

export default TimePicker;
