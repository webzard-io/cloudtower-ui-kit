import { styled } from "@linaria/react";
import { InputNumber as AntdInputNumber } from "antd";
import { InputNumberProps } from "antd/lib/input-number";
import cs from "classnames";
import React from "react";

import { AdditionOptions } from "../../spec";
import { InputStyle } from "../Styled";
import { Typo } from "../Typo";

export const AntdInputNumberStyled = styled(AntdInputNumber)<{
  controls: boolean;
  suffix?: string;
  prefix?: string;
}>`
  .ant-input-number-handler-wrap {
    display: ${(props) => (props.controls ? "initial" : "none")};
  }
  .ant-input-number-input-wrap {
    padding: 4px 11px;
    display: inline-flex;
    line-height: 1.5715;
    height: inherit;
  }

  .ant-input-number-input-wrap::after {
    content: ${(props) => `"${props.suffix ? props.suffix : ""}"`};
    display: ${({ suffix }) => (suffix ? "flex" : "none")};
    flex: none;
    align-items: center;
    margin-left: 4px;
  }

  .ant-input-number-input-wrap::before {
    content: ${(props) => `"${props.prefix ? props.prefix : ""}"`};
    display: ${({ prefix }) => (prefix ? "flex" : "none")};
    flex: none;
    align-items: center;
    margin-right: 4px;
    cursor: auto;
  }

  .ant-input-number-input {
    padding: 0;
    margin: 0;
    height: auto;
    font-size: inherit;
  }
`;

const InputNumber: React.FC<InputNumberProps & AdditionOptions> = ({
  className,
  error,
  size = "middle",
  suffix,
  prefix,
  controls = true,
  ...props
}) => {
  const typo = {
    large: Typo.Label.l2_regular,
    middle: Typo.Label.l3_regular,
    small: Typo.Label.l4_regular,
  }[size];
  return (
    <AntdInputNumberStyled
      {...props}
      size={size}
      controls={controls}
      data-test={props.name}
      suffix={controls ? "" : suffix}
      prefix={prefix}
      className={cs(className, InputStyle, typo, error ? "error" : "")}
    />
  );
};

export default InputNumber;
