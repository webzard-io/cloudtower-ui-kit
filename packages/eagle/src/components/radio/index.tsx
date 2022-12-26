import {
  EMPTY_FUNCTION,
  RadioButtonProps,
  RadioProps,
} from "@cloudtower/eagle";
import { css, cx } from "@linaria/core";
import { Input, InputNumber, Radio as AntdRadio } from "antd";
import { RadioGroupProps as AntdRadioGroupProps } from "antd/lib/radio";
import _ from "lodash";
import React, { useState } from "react";

import { Typo } from "../../components";

const RadioStyle = css`
  &.ant-radio-wrapper {
    display: inline-flex;
    align-items: baseline;
    white-space: pre-wrap;

    .ant-radio {
      position: relative;
      top: 3px;

      .ant-radio-inner {
        border-color: $strokes-light-trans-4;
      }

      &:hover .ant-radio-inner {
        border-color: $blue-60;
      }

      &.ant-radio-checked .ant-radio-inner {
        border-color: $blue-60;
        background: $blue-60;
        &::after {
          top: 4px;
          left: 4px;
          width: 6px;
          height: 6px;
          background: $white;
        }
      }

      &.ant-radio-disabled {
        opacity: 0.5;

        .ant-radio-inner {
          border-color: $strokes-light-trans-4;
          background: $fills-light-trans-3;
          &::after {
            background: $text-light-primary;
          }
        }

        & + span {
          color: $text-light-primary;
          opacity: 0.5;

          .radio-description {
            color: $text-light-primary;
          }
        }
      }

      & + span {
        display: inline-block;
        padding: 0;
        padding-left: 12px;

        .radio-description {
          margin-bottom: 0;
          white-space: pre-wrap;
          color: $text-secondary-light;
        }
      }
    }
  }

  &.ant-radio-wrapper.compact {
    .ant-radio + span {
      padding-left: 8px;
    }
  }
`;

const RadioGroupStyle = css`
  & .ant-radio-button-wrapper:first-child {
    border-radius: 5px 0 0 5px;
  }
  & .ant-radio-button-wrapper:last-child {
    border-radius: 0 5px 5px 0;
  }
`;

const RadioButtonStyle = css`
  color: $text-light-primary;
  border-color: $strokes-light-opaque-3;

  &:first-child {
    color: $text-light-primary;
    border-color: $strokes-light-opaque-4;
  }

  &.ant-radio-button-wrapper {
    padding: 0 12px;
    line-height: 32px;
    height: 32px;

    > span + span {
      white-space: nowrap;
    }
  }

  &.ant-radio-button-wrapper:not(:first-child)::before {
    background: $strokes-light-opaque-3;
  }

  &.ant-radio-button-wrapper-checked:not(:first-child)::before {
    background: $fills-light-general-general;
  }

  &.ant-radio-button-wrapper-disabled:not(:first-child)::before {
    background: $strokes-light-opaque-3;
    opacity: 0.5;
  }

  &.ant-radio-button-wrapper-checked:not([class*=" ant-radio-button-wrapper-disabled"]).ant-radio-button-wrapper:first-child {
    border-right-color: $fills-light-general-general;
  }

  &.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):first-child {
    border-color: $fills-light-general-general;
  }

  &.ant-radio-button-wrapper-checked {
    background: $fills-light-general-general-light;
  }

  &.ant-radio-button-wrapper-disabled {
    background: $fills-light-trans-3;
    border-color: $strokes-light-opaque-3;
    opacity: 0.5;
    &:hover {
      color: $text-light-primary;
      border-color: $strokes-light-opaque-3;
    }
  }

  &.ant-radio-button-wrapper-disabled.ant-radio-button-wrapper-checked {
    color: $text-light-primary;
    border-color: $strokes-light-opaque-3;
    background: $fills-light-trans-5;
  }

  & .ant-radio-button-input {
    margin-right: 8px;
    display: inline;
    border: none;
    padding: 0;
    width: 36px;
    background: transparent;
    &:focus {
      box-shadow: none;
    }
  }
  & .ant-radio-button-input.ant-input-number {
    margin-right: 0;
    width: initial;
    box-shadow: none;
  }
  & .ant-radio-button-input .ant-input-number-handler-wrap {
    display: none;
  }
  & .ant-radio-button-input .ant-input-number-input-wrap {
    display: inline;
  }
  & .ant-radio-button-input .ant-input-number-input-wrap input {
    display: inline;
    margin-right: 8px;
    padding: 0;
    width: 36px;
  }
`;

const KitRadioGroupContext = React.createContext<{
  disabled?: boolean;
  name?: string;
}>({});

const Radio: React.FC<RadioProps> = ({
  children,
  className,
  checked,
  compact = false,
  ...props
}) => {
  const { description } = props;
  const context = React.useContext(KitRadioGroupContext);
  if (description) {
    children = (
      <>
        {children}
        <div className={cx("radio-description", Typo.Label.l4_regular)}>
          {description}
        </div>
      </>
    );
  }

  return (
    <>
      <AntdRadio
        className={cx(className, RadioStyle, compact && "compact")}
        checked={checked || false}
        data-test={
          context.name
            ? `${context.name}-${String(props.value)}`
            : String(props.value)
        }
        {...props}
      >
        {children ? children : null}
      </AntdRadio>
    </>
  );
};

const RadioGroup: React.FC<AntdRadioGroupProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <KitRadioGroupContext.Provider
      value={{ disabled: props.disabled, name: props.name }}
    >
      <AntdRadio.Group className={cx(className, RadioGroupStyle)} {...props}>
        {children ? children : null}
      </AntdRadio.Group>
    </KitRadioGroupContext.Provider>
  );
};

const RadioButton: React.FC<RadioButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const {
    type,
    placeholder = "Label",
    onInputChange = EMPTY_FUNCTION,
    min,
    max,
    precision,
    initialValue,
  } = props;
  const [inputValue, setInputValue] =
    useState<string | number | undefined>(initialValue);
  const radioButtonValue =
    type === "input" || type === "input-number" ? inputValue : props.value;
  const radioGroupContext = React.useContext(KitRadioGroupContext);

  const renderInput = () => {
    const inputDisabled = props.disabled || radioGroupContext?.disabled;

    if (type === "input-number")
      return (
        <InputNumber
          className="ant-radio-button-input"
          placeholder={placeholder}
          disabled={inputDisabled}
          value={!_.isNil(inputValue) ? Number(inputValue) : undefined}
          min={min}
          max={max}
          precision={precision}
          onChange={(value) => {
            const val = value || 0;
            setInputValue(val);
            onInputChange(val);
          }}
        />
      );

    return (
      <Input
        className="ant-radio-button-input"
        placeholder={placeholder}
        disabled={inputDisabled}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          onInputChange(e.target.value);
        }}
      />
    );
  };
  const renderChildren = () => {
    if (type !== "input" && type !== "input-number")
      return children ? children : null;

    return (
      <>
        {renderInput()}
        <span className="ant-radio-button-input-label">
          {typeof children === "string" ? children : ""}
        </span>
      </>
    );
  };

  return (
    <AntdRadio.Button
      className={cx(className, RadioButtonStyle)}
      value={radioButtonValue}
      {...props}
    >
      {renderChildren()}
    </AntdRadio.Button>
  );
};

export { RadioButton, RadioGroup };
export default Radio;
