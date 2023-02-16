import { styled } from "@linaria/react";
import { InputNumber as AntdInputNumber } from "antd";
import { InputNumberProps } from "antd/lib/input-number";
import cs from "classnames";
import React from "react";

import { AdditionOptions } from "../../spec";
import { InputStyle } from "../Styled";
import { Typo } from "../Typo";

export const AntdIntStyled = styled(AntdInputNumber)<{
  controls: boolean;
  suffix?: string;
  prefix?: string;
}>`
  .ant-input-number-handler-wrap {
    display: ${(props) => (props.controls ? "initial" : "none")};
  }
  .ant-input-number-input-wrap {
    padding: 5px 12px;
    display: inline-flex;
    line-height: 1.5715;
    height: 100%;
    width: 100%;
  }

  .ant-input-number-input-wrap::after {
    content: ${(props) => `"${props.suffix ? props.suffix : ""}"`};
    display: ${({ suffix }) => (suffix ? "flex" : "none")};
    flex: none;
    align-items: center;
    margin-left: 4px;
    color: rgba(44, 56, 82, 0.6);
  }

  .ant-input-number-input-wrap::before {
    content: ${(props) => `"${props.prefix ? props.prefix : ""}"`};
    display: ${({ prefix }) => (prefix ? "flex" : "none")};
    flex: none;
    align-items: center;
    margin-right: 4px;
    cursor: auto;
    color: rgba(44, 56, 82, 0.6);
  }

  &.ant-input-number {
    width: 100%;
    border-radius: 6px;
  }
  &.ant-input-number:not([disabled]) {
    &:focus,
    &:active,
    &.ant-input-number-focused {
      border-color: $blue;
      box-shadow: $shadow-light-active;
    }
  }
  &.ant-input-number.error:not([disabled]) {
    &:hover,
    &.ant-input-number-focused {
      border-color: $red;
      box-shadow: $shadow-light-error;
    }
  }

  .ant-input-number-input {
    padding: 0;
    margin: 0;
    height: auto;
    font-size: inherit;
  }
`;

// TODO support negative integer ,`suffix` and `prefix` is ReactNode
const InputInteger: React.FC<InputNumberProps & AdditionOptions> = ({
  className,
  error,
  size = "middle",
  suffix,
  prefix,
  max,
  min,
  controls = false,
  ...props
}) => {
  const typo = {
    large: Typo.Label.l2_regular,
    middle: Typo.Label.l3_regular,
    small: Typo.Label.l4_regular,
  }[size];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatterNumber = (value: any) => {
    const reg = /^\.|[^\d]/g;
    if (typeof value === "string") {
      return !isNaN(Number(value.replace(reg, "")))
        ? value.replace(reg, "")
        : "";
    } else if (typeof value === "number") {
      return !isNaN(value) ? String(value).replace(reg, "") : "";
    } else {
      return "";
    }
  };

  return (
    <AntdIntStyled
      {...props}
      size={size}
      formatter={formatterNumber}
      parser={formatterNumber}
      min={min}
      max={max}
      controls={controls}
      data-test={props.name}
      suffix={controls ? "" : suffix}
      prefix={prefix}
      className={cs(className, InputStyle, typo, error ? "error" : "")}
    />
  );
};

export default InputInteger;
