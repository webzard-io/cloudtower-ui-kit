import { styled } from "@linaria/react";
import formatterInteger from "@src/core/InputInteger/formatterInteger";
import { InputStyle } from "@src/core/Styled";
import { Typo } from "@src/core/Typo";
import { AdditionOptions } from "@src/spec";
import { InputNumber as AntdInputNumber } from "antd";
import { InputNumberProps } from "antd/lib/input-number";
import cs from "classnames";
import React from "react";

export const AntdIntStyled = styled(AntdInputNumber)<{
  controls: boolean;
  suffix?: string;
  prefix?: string;
}>`
  .ant-input-number-handler-wrap {
    display: ${(props) => (props.controls ? "initial" : "none")};
  }
  .ant-input-number-input-wrap {
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

  .ant-input-group.ant-input-group-compact > & {
    border-radius: 0;
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
      z-index: $input-hover-index;
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
    height: 30px;
    border: 1px;
    padding: 5px 12px;
    font-size: inherit;
  }

  &.ant-input-number-lg input {
    height: 38px;
    border: 1px;
    padding: 8px 16px;
  }

  &.ant-input-number-sm input {
    height: 22px;
    border: 1px;
    padding: 2px 8px;
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

  return (
    <AntdIntStyled
      {...props}
      size={size}
      formatter={formatterInteger}
      parser={formatterInteger}
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
