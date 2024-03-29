import { styled } from "@linaria/react";
import { InputStyle } from "@src/core/Styled";
import { Typo } from "@src/core/Typo";
import { Input as AntdInput } from "antd";
import { InputProps } from "antd/lib/input";
import cs from "classnames";
import React from "react";

const StyledAntdInput = styled(AntdInput)`
  .ant-input-sm {
    line-height: 18px;
  }
`;

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
    <StyledAntdInput
      {...props}
      size={size}
      data-test={props.name}
      className={cs(className, InputStyle, typo, error ? "error" : "")}
    />
  );
};

export default Input;

export * from "./input.type";
