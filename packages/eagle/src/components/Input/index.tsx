import { InputStyle } from "@src/components/Styled";
import { Typo } from "@src/components/Typo";
import { Input as AntdInput } from "antd";
import { InputProps } from "antd/lib/input";
import cs from "classnames";
import React from "react";

const Input: React.FC<InputProps & { error?: boolean }> = ({
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
    <AntdInput
      {...props}
      size={size}
      data-test={props.name}
      className={cs(className, InputStyle, typo, error ? "error" : "")}
    />
  );
};

export default Input;
