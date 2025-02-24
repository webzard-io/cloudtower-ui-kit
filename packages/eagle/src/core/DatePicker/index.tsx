import { InputStyle } from "@src/core/Styled";
import { Typo } from "@src/core/Typo";
import { DatePicker as AntdDatePicker } from "antd";
import { DatePickerProps } from "antd/lib/date-picker";
import cs from "classnames";
import React from "react";
const DatePicker: React.FC<DatePickerProps & { error?: boolean }> = ({
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
    <AntdDatePicker
      {...props}
      size={size}
      data-test={props.name}
      className={cs(className, InputStyle, typo, error ? "error" : "")}
    />
  );
};

export default DatePicker;
