import {
  CloseCircleFilled,
  ExportOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { parrotI18n } from "@cloudtower/parrot";
import { css, cx } from "@linaria/core";
import { styled } from "@linaria/react";
import { Field } from "@smartx/react-final-form";
import {
  formatBitPerSecond,
  formatBits,
  formatBps,
  formatBytes,
  formatFrequency,
  formatPercent,
  formatSeconds,
  formatSpeed,
  MAGIC_METRIC_NULL,
} from "@tower/utils";
import {
  Alert,
  AutoComplete,
  Badge,
  Checkbox as AntdCheckbox,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Input as AntdInput,
  InputNumber as AntdInputNumber,
  Layout,
  List,
  Menu,
  Popover,
  Progress,
  Select as AntdSelect,
  Skeleton,
  Tag,
  TimePicker as AntdTimePicker,
  Tree,
} from "antd";
import { CheckboxProps } from "antd/lib/checkbox";
import { InputProps } from "antd/lib/input";
import { InputNumberProps } from "antd/lib/input-number";
import message from "antd/lib/message";
import { TimePickerProps } from "antd/lib/time-picker";
import cs from "classnames";
import _ from "lodash";
import moment from "moment";
import React, { Fragment, ReactNode } from "react";

import { AdditionOptions, Kit, TextAreaProps } from "../spec";
import { getAlertIcon } from "../utils";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import Icon from "./Icon";
import { focusIndicator16Blue } from "./images";
import InputInteger from "./InputInteger";
import Loading from "./Loading";
import Modal from "./Modal";
import Overflow from "./Overflow";
import Pagination from "./Pagination";
import Radio, { RadioButton, RadioGroup } from "./Radio";
import Select from "./Select";
import Steps from "./Steps";
import { FullView } from "./Styled";
import Switch from "./Switch";
import KitTable from "./Table";
import Tooltip from "./Tooltip";
import { Typo } from "./Typo";

type AntdOption = Kit["option"] & {
  isSelectOption: boolean;
};

const KitInputStyle = css`
  input,
  &.input-tags {
    border: 1px solid rgba(213, 219, 227, 0.6);
    border-radius: 4px;
  }
  &.input-tags {
    position: relative;
    padding: 6px;
    height: 32px;
    cursor: pointer;
    transition: border 150ms;

    &:hover {
      border-color: $blue-60;
      box-shadow: 0 0 0px 2px rgba($blue-60, 0.1);
    }

    &.kit-input-suffix-wrapper {
      padding-right: 30px;
    }

    .input-tags-inner {
      display: flex;
      .tags-overflow-auto {
        display: flex;
      }
    }

    .input-tag-suffix {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      .anticon-close-circle {
        color: rgba(0, 0, 0, 0.25);
        font-size: 12px;
        cursor: pointer;
        &:hover {
          color: rgba(0, 0, 0, 0.45);
        }
      }
    }
  }
  &.has-focus-indicator {
    position: relative;
    overflow: hidden;

    .ant-input-prefix {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -16px;
      transition: left 150ms ease;
      opacity: 0;
    }
    &.ant-input-affix-wrapper-focused .ant-input-prefix {
      left: 8px;
      opacity: 1;
    }

    input {
      transition: margin-left 150ms ease;
      margin-left: 0px;
      &:focus {
        margin-left: 16px;
      }
    }
  }
`;

export const InputTagItem = styled.span`
  height: 18px;
  line-height: 18px;
  padding: 0 4px;
  border-radius: 4px;
  background: rgba(235, 239, 245, 0.6);
  border: 1px solid rgba(223, 228, 235, 0.6);
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin-right: 4px;
`;

const InputGroup = styled(AntdInput.Group)`
  &.ant-input-group.ant-input-group-compact {
    display: flex;
  }
`;

const ExportButton = css`
  border: none;
  vertical-align: middle;
`;

const Empty = <>-</>;

function isEmpty(rawValue?: number | null): rawValue is null | undefined {
  if (
    rawValue === null ||
    rawValue === undefined ||
    rawValue === MAGIC_METRIC_NULL ||
    Number.isNaN(rawValue)
  ) {
    return true;
  }
  return false;
}

export const InputStyle = css`
  &.ant-input {
    padding: 5px 12px;
    line-height: 20px;
    color: $text-primary-light;
    border-radius: 6px;
    border-color: $strokes-light-trans-3;
    transition: height 240ms ease 8ms, border 160ms ease 8ms,
      box-shadow 160ms ease 8ms;
  }

  &.ant-input.ant-input-lg {
    padding: 8px 16px;
    line-height: 22px;
  }

  &.ant-input.ant-input-sm {
    padding: 2px 8px;
    line-height: 18px;
  }

  &.ant-input:not([disabled]),
  &.ant-input-number:not([disabled]) {
    &:hover,
    &.__pseudo-states-hover {
      border-color: $strokes-light-trans-4;
      box-shadow: $shadow-light-hover;
    }

    &:active,
    &:focus,
    &.__pseudo-states-active,
    &.__pseudo-states-focus {
      border-color: $blue;
      box-shadow: $shadow-light-active;
    }
  }

  &.ant-input.error:not([disabled]),
  &.ant-picker.error:not([disabled]),
  &.ant-input-number.error:not([disabled]) {
    border-color: $red;
    color: $red;

    &:hover,
    &.__pseudo-states-hover {
      border-color: $red;
      box-shadow: $shadow-light-hover;
    }

    &:active,
    &:focus,
    &.__pseudo-states-active,
    &.__pseudo-states-focus {
      border-color: $red;
      box-shadow: $shadow-light-error;
    }
  }

  &.ant-input[disabled],
  &.ant-input.ant-input-disabled,
  &.ant-input-number[disabled],
  &.ant-input-number.ant-input-number-disabled {
    background: $fills-trans-terdiary-light;
    color: $text-light-tertiary;
    border-color: $strokes-light-trans-3;
  }

  &.ant-input-affix-wrapper {
    padding: 5px 12px;
    border-radius: 6px;
    border-color: $strokes-light-trans-3;
    line-height: 20px;
    color: $text-primary-light;
    transition: height 240ms ease 8ms, border 160ms ease 8ms,
      box-shadow 160ms ease 8ms;

    .ant-input-suffix,
    .ant-input-prefix {
      color: $text-secondary-light;
    }
  }

  &.ant-input-affix-wrapper.ant-input-affix-wrapper-lg {
    padding: 8px 16px;
    line-height: 22px;
  }

  &.ant-input-affix-wrapper.ant-input-affix-wrapper-sm {
    padding: 2px 8px;
    line-height: 18px;
  }

  &.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled) {
    &:hover,
    &.__pseudo-states-hover {
      border-color: $strokes-light-trans-4;
      box-shadow: $shadow-light-hover;
    }

    &:active,
    &:focus,
    &.ant-input-affix-wrapper-focused,
    &.__pseudo-states-active,
    &.__pseudo-states-focus {
      border-color: $blue;
      box-shadow: $shadow-light-active;
    }
  }

  &.ant-input-affix-wrapper.error:not(.ant-input-affix-wrapper-disabled) {
    border-color: $red;
    > .ant-input {
      color: $red;
    }

    &:hover,
    &.__pseudo-states-hover {
      border-color: $red;
      box-shadow: $shadow-light-hover;
    }

    &:active,
    &:focus,
    &.ant-input-affix-wrapper-focused,
    &.__pseudo-states-active,
    &.__pseudo-states-focus {
      border-color: $red;
      box-shadow: $shadow-light-error;
    }
  }

  &.ant-input-affix-wrapper.ant-input-affix-wrapper-disabled {
    background: $fills-trans-terdiary-light;
    color: $text-light-tertiary;
    border-color: $strokes-light-trans-3;
  }

  @at-root {
    textarea#{&}.ant-input {
      transition-property: height;
      transition-delay: 50ms;
      &.textarea-large {
        min-height: 40px;
        height: 40px;
      }
      &.textarea-large:focus {
        height: 80px;
      }
      &.textarea-middle {
        min-height: 32px;
        height: 32px;
      }
      &.textarea-middle:focus {
        height: 64px;
      }
      &.textarea-small {
        min-height: 24px;
        height: 24px;
      }
      &.textarea-small:focus {
        height: 40px;
      }
    }
  }
`;

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

export const LeftEndInputStyle = css`
  @at-root {
    input#{&}.ant-input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  &.ant-input-affix-wrapper {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const RightEndInputStyle = css`
  @at-root {
    input#{&}.ant-input {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  &.ant-input-affix-wrapper {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
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
    <AntdInput
      {...props}
      size={size}
      data-test={props.name}
      className={cs(className, InputStyle, typo, error ? "error" : "")}
    />
  );
};

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

const TextArea: React.FC<TextAreaProps> = ({
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
    <AntdInput.TextArea
      {...props}
      className={cs(
        className,
        InputStyle,
        typo,
        error && "error",
        !props.autoSize && !props.onFocusChangeHeight && `textarea-${size}`,
        size === "large" && "ant-input-lg",
        size === "small" && "ant-input-sm"
      )}
    />
  );
};

const CheckboxStyle = css`
  color: $text-primary-light;
  line-height: 22px;
  display: inline-flex;

  .ant-checkbox {
    height: 22px;
    display: flex;
    align-items: center;
    top: 0;
  }
  .ant-checkbox-checked::after {
    border: none;
  }
  &.ant-checkbox-wrapper:hover .ant-checkbox-inner,
  &.ant-checkbox-wrapper.__pseudo-states-hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: $fills-light-general-general;
  }

  .ant-checkbox .ant-checkbox-inner {
    border: 1px solid $strokes-light-trans-4;
  }
  .ant-checkbox.ant-checkbox-checked,
  .ant-checkbox.ant-checkbox-indeterminate {
    .ant-checkbox-inner {
      border: 1px solid $fills-light-general-general;
    }
  }

  .ant-checkbox.ant-checkbox-indeterminate .ant-checkbox-inner {
    background: $fills-light-general-general;
    &:after {
      background-color: $white;
      height: 2px;
      width: 10px;
      border-radius: 2px;
    }
  }

  &.ant-checkbox-wrapper-disabled {
    opacity: 0.5;
    .ant-checkbox-disabled .ant-checkbox-inner {
      background: $fills-light-trans-3;
      border-color: $strokes-light-trans-4 !important;
    }
    .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner:after {
      border-color: $text-primary-light;
    }
    .ant-checkbox-disabled.ant-checkbox-indeterminate
      .ant-checkbox-inner:after {
      background: $text-primary-light;
    }
  }

  .ant-checkbox + span,
  .ant-checkbox-disabled + span {
    padding: 0;
    .main {
      display: inline-block;
      margin-left: 12px;
      color: $text-primary-light;
    }
    .sub {
      margin-left: 28px;
      color: $text-secondary-light;
    }
  }

  &.compact {
    .ant-checkbox + span,
    .ant-checkbox-disabled + span {
      .main {
        margin-left: 8px;
      }
      .sub {
        margin-left: 24px;
      }
    }
  }
`;
const Checkbox: React.FC<
  CheckboxProps & {
    description?: ReactNode;
    compact?: boolean;
    "data-test"?: string;
  }
> = ({ className, children, description, compact, ...props }) => {
  return (
    <AntdCheckbox
      {...props}
      data-test={props["data-test"] || props.value}
      className={cs(className, CheckboxStyle, compact && "compact")}
    >
      {children ? (
        <>
          <div className={cs("main", Typo.Label.l2_regular)}>{children}</div>
          {description ? (
            <div className={cs("sub", Typo.Label.l4_regular)}>
              {description}
            </div>
          ) : null}
        </>
      ) : null}
    </AntdCheckbox>
  );
};

export const LeftEndSelectStyle = css`
  &.ant-select,
  &.ant-select .ant-select-selector {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const RightEndSelectStyle = css`
  &.ant-select,
  &.ant-select .ant-select-selector {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const Arch: Kit["arch"] = (props) => {
  const { architecture } = props;
  let text = "";
  if (architecture) {
    text = parrotI18n.t(`enum.Architecture_${architecture}`);
  }
  return <span>{text}</span>;
};

export function getAntdKit(): Kit {
  const kit: Kit = {
    PAGINATION_SELECTOR: ".pagination-wrapper",
    TABLE_WRAPPER_SELECTOR: ".table-wrapper",
    THEAD_SELECTOR: ".ant-table-thead",
    TBODY_SELECTOR: ".ant-table-tbody",
    MODAL_WHITELIST: [
      ".ant-select-dropdown",
      ".ant-picker-dropdown",
      ".ant-dropdown",
      ".ant-dropdown-menu-submenu",
      ".ant-tooltip",
      ".ant-dropdown-menu-item-group-list",
    ],
    loading: ({ fullView = true }) => {
      const Wrapper = fullView ? FullView : Fragment;
      const props = fullView ? { className: "loading-full-view" } : {};
      return (
        <Wrapper {...props}>
          <Loading />
        </Wrapper>
      );
    },
    error: ({ error }) => <div className="error">{String(error)}</div>,
    pagination: Pagination,
    select: Select,
    option: ({ children, ...props }) => {
      return <AntdSelect.Option {...props}>{children}</AntdSelect.Option>;
    },
    table: KitTable,
    button: Button,
    modal: Modal,
    dropdown: Dropdown,
    switch: Switch,
    tooltip: Tooltip,
    input: Input,
    textArea: TextArea,
    checkbox: Checkbox,
    fields: {
      Int: ({
        input,
        meta,
        onBlur,
        autoComplete = "off",
        supportNegativeValue = false,
        ...props
      }) => (
        <>
          <Input
            {...input}
            onChange={(e) => {
              const value = e.currentTarget.value;
              if (supportNegativeValue) {
                if (value === "" || value === "-") {
                  input.onChange(value);
                } else if (/^(-)?\d+$/.test(value)) {
                  const v = parseInt(value);
                  input.onChange(!Number.isNaN(v) ? v : undefined);
                }
              } else if (value === "" || /^\d+$/.test(value)) {
                const v = parseInt(value);
                input.onChange(!Number.isNaN(v) ? v : undefined);
              }
            }}
            onBlur={(e) => {
              onBlur ? onBlur(input, e) : input.onBlur(e);
            }}
            autoComplete={autoComplete}
            error={
              meta.touched &&
              (meta.error || (!meta.dirtySinceLastSubmit && meta.submitError))
            }
            {...props}
          />
        </>
      ),
      Integer: ({ meta, input, onBlur, ...props }) => {
        return (
          <>
            <InputInteger
              {...props}
              {...input}
              onBlur={(e) => (onBlur ? onBlur(input, e) : input.onBlur(e))}
              error={
                meta.touched &&
                (meta.error || (!meta.dirtySinceLastSubmit && meta.submitError))
              }
            />
          </>
        );
      },
      Float: ({ input, meta, onBlur, autoComplete = "off", ...props }) => (
        <>
          <InputNumber
            {...input}
            onBlur={(e) => (onBlur ? onBlur(input, e) : input.onBlur(e))}
            autoComplete={autoComplete}
            error={
              meta.touched &&
              (meta.error || (!meta.dirtySinceLastSubmit && meta.submitError))
            }
            {...props}
          />
        </>
      ),
      DateTime: ({ input }) => (
        <>
          <DatePicker
            onFocus={() => input.onFocus?.()}
            onBlur={() => input.onBlur?.()}
            showTime
            defaultValue={input.value}
            onOk={input.onChange}
          />
        </>
      ),
      TimePicker: ({ input, meta, ...props }) => (
        <>
          <TimePicker
            {...input}
            error={
              meta.touched &&
              (meta.error || (!meta.dirtySinceLastSubmit && meta.submitError))
            }
            {...props}
          />
        </>
      ),
      Enum: ({ meta: __, enumValues, emptyLabel, ...restProps }) => (
        <>
          <kit.select {...restProps}>
            {emptyLabel && <kit.option value="">{emptyLabel}</kit.option>}
            {enumValues.map((v) => {
              const item = typeof v === "string" ? { value: v, text: v } : v;
              return (
                <kit.option
                  key={item.value}
                  value={item.value}
                  label={item.text}
                >
                  {item.text}
                </kit.option>
              );
            })}
          </kit.select>
        </>
      ),
      String: ({
        input,
        meta,
        autoComplete = "off",
        size,
        tags,
        className,
        allowClear,
        tagsOverflow,
        onTagsAllowClearClick,
        onClick,
        maxLength,
        focusIndicator,
        ...props
      }) => {
        if (tags?.length) {
          return (
            <div
              className={cs(
                className,
                KitInputStyle,
                "input-tags",
                allowClear && "kit-input-suffix-wrapper"
              )}
              onClick={onClick}
            >
              <div className="input-tags-inner">
                <Overflow overflow={tagsOverflow}>
                  <span className="tags-overflow-auto">
                    {tags.map((tag) => (
                      <InputTagItem key={tag}>{tag}</InputTagItem>
                    ))}
                  </span>
                </Overflow>
              </div>
              <span className="input-tag-suffix">
                {allowClear && (
                  <CloseCircleFilled onClick={onTagsAllowClearClick} />
                )}
              </span>
            </div>
          );
        }
        return (
          <>
            <Input
              className={cs(
                className,
                KitInputStyle,
                focusIndicator && "has-focus-indicator"
              )}
              {...input}
              autoComplete={
                props.type === "password" ? "new-password" : autoComplete
              }
              size={size}
              allowClear={allowClear}
              onClick={onClick}
              prefix={
                focusIndicator ? <Icon src={focusIndicator16Blue} /> : undefined
              }
              error={
                meta.touched &&
                (meta.error || (!meta.dirtySinceLastSubmit && meta.submitError))
              }
              {...props}
              onChange={(e) => {
                if (maxLength) {
                  e.target.value = e.target.value.substr(0, maxLength);
                }
                input.onChange?.(e);
              }}
            />
          </>
        );
      },
      Boolean: ({ input, children, ...props }) => {
        return (
          <>
            <Checkbox
              checked={Boolean(input.value)}
              onChange={(e) => input.onChange(e.target.checked)}
              {...props}
            >
              {children}
            </Checkbox>
          </>
        );
      },
      TextArea: ({ input, meta, onFocusChangeHeight, ...props }) => {
        return (
          <>
            <TextArea
              {...input}
              {...props}
              error={
                meta.touched &&
                (meta.error || (!meta.dirtySinceLastSubmit && meta.submitError))
              }
              onFocus={(e) => {
                input.onFocus(e);
                onFocusChangeHeight &&
                  (e.currentTarget.style.minHeight = `${onFocusChangeHeight.onFocus}px`);
              }}
              onBlur={(e) => {
                input.onBlur(e);
                onFocusChangeHeight &&
                  (e.currentTarget.style.minHeight = `${onFocusChangeHeight.onBlur}px`);
              }}
            />
          </>
        );
      },
      Array: ({ fields, child }) => (
        <>
          {fields.map((name: string, index: number) => (
            <div>
              <Field name={name}>
                {(fieldProps) => {
                  if (child.type === "Enum") {
                    return kit.fields[child.type]({
                      ...fieldProps,
                      enumValues: child.enumValues,
                    });
                  }
                  return kit.fields[child.type](fieldProps);
                }}
              </Field>
              <Button type="ordinary" onClick={() => fields.remove(index)}>
                X
              </Button>
            </div>
          ))}
          <Button type="primary" onClick={() => fields.push("")}>
            add
          </Button>
        </>
      ),
      DateTimeRange: ({ input, ...props }) => (
        <div className="datatime-range">
          <DatePicker.RangePicker
            onFocus={() => input.onFocus?.()}
            onBlur={() => input.onBlur?.()}
            showTime
            // https://github.com/ant-design/ant-design/issues/22185
            defaultValue={input.value?.map((v?: string) => v && moment(v))}
            onChange={input.onChange}
            value={input.value?.map((v?: string) => v && moment(v))}
            format={props.format}
          />
        </div>
      ),
    },
    units: {
      Byte({ rawValue, noUnitOnZero, decimals }) {
        if (isEmpty(rawValue)) {
          return Empty;
        }
        if (rawValue === -1) {
          return <span>{parrotI18n.t("common.calculation")}</span>;
        }
        const { value, unit } = formatBytes(rawValue, decimals);
        if (noUnitOnZero && value === 0) {
          return <span className="value">{value}</span>;
        }
        return (
          <span>
            <span className="value">{value}</span>
            <span className="unit">{` ${unit}`}</span>
          </span>
        );
      },
      Frequency({ rawValue, decimals }) {
        if (isEmpty(rawValue)) {
          return Empty;
        }
        const { value, unit } = formatFrequency(rawValue, decimals);
        return (
          <span>
            <span className="value">{value}</span>
            <span className="unit">{` ${unit}`}</span>
          </span>
        );
      },
      Percent({ rawValue, decimals }) {
        if (isEmpty(rawValue)) {
          return Empty;
        }
        const { value, unit } = formatPercent(rawValue, decimals);
        return (
          <span>
            <span className="value">{value}</span>
            <span className="unit">{unit}</span>
          </span>
        );
      },
      Speed({ rawValue, decimals }) {
        if (isEmpty(rawValue)) {
          return Empty;
        }
        const { value, unit } = formatSpeed(rawValue, decimals);
        return (
          <span>
            <span className="value">{value}</span>
            <span className="unit">{` ${unit}`}</span>
          </span>
        );
      },
      Bps({ rawValue, decimals }) {
        if (isEmpty(rawValue)) {
          return Empty;
        }
        const { value, unit } = formatBps(rawValue, decimals);
        return (
          <span>
            <span className="value">{value}</span>
            <span className="unit">{` ${unit}`}</span>
          </span>
        );
      },
      BitPerSecond({ rawValue, decimals }) {
        if (isEmpty(rawValue)) {
          return Empty;
        }
        const { value, unit } = formatBitPerSecond(rawValue, decimals);
        return (
          <span>
            <span className="value">{value}</span>
            <span className="unit">{` ${unit}`}</span>
          </span>
        );
      },
      Bit({ rawValue, decimals }) {
        if (isEmpty(rawValue)) {
          return Empty;
        }
        const { value, unit } = formatBits(rawValue, decimals);
        return (
          <span>
            <span className="value">{value}</span>
            <span className="unit">{` ${unit}`}</span>
          </span>
        );
      },
      Second({ rawValue, decimals, abbreviate }) {
        if (isEmpty(rawValue)) {
          return Empty;
        }
        const { value, unit } = formatSeconds(rawValue, decimals);
        return (
          <span>
            <span className="value">{value} </span>
            <span className="unit">
              {parrotI18n.t(
                `common.${abbreviate ? `${unit}_abbreviation` : unit}`
              )}
            </span>
          </span>
        );
      },
    },
    inputGroup: ({ compact, children }) => (
      <InputGroup compact={compact}>{children}</InputGroup>
    ),
    Empty,
    alert: ({
      type,
      icon,
      showIcon = true,
      className,
      onClose,
      closeText,
      ...props
    }) => {
      const _icon = <Icon src={getAlertIcon(type)} />;
      const _type = type === "normal" ? "info" : type;
      return (
        <Alert
          {...props}
          className={cs(type ? `alert-${type}` : "", className)}
          type={_type}
          icon={icon || _icon}
          showIcon={showIcon}
          onClose={onClose}
          closeText={closeText}
          closable={!!onClose}
        />
      );
    },
    searchInput: (props) => {
      const { onChange, debounceWait = 300, ...restProps } = props;
      const onSearch = _.debounce(onChange, debounceWait);
      return (
        <Input
          style={{ width: 276 }}
          prefix={<SearchOutlined />}
          onChange={(e) => onSearch(e.target.value)}
          {...restProps}
        />
      );
    },
    exportButton: ({ href }) => {
      return (
        <Button
          type="text"
          href={href}
          className={cs(ExportButton, "export-button")}
          icon={<ExportOutlined rotate={-90} />}
        ></Button>
      );
    },
    badge: ({ type = "error", className, ...props }) => (
      <Badge
        className={cx(`badge-${type}`, className)}
        {...props}
        showZero={false}
      />
    ),
    radio: Radio,
    radioGroup: RadioGroup,
    radioButton: RadioButton,
    tree: Tree,
    progress: (props) => <Progress {...props} />,
    divider: Divider,
    skeleton: Skeleton,
    list: List,
    listItem: List.Item,
    listItemMeta: List.Item.Meta,
    menu: Menu,
    menuItem: Menu.Item,
    menuItemGroup: Menu.ItemGroup,
    layout: Layout,
    autoComplete: AutoComplete,
    message: message,
    tag: Tag,
    popover: Popover,
    arch: Arch,
    buttonGroup: ButtonGroup,
    steps: Steps,
    form: Form,
  };

  // https://github.com/react-component/select/blob/master/src/Option.tsx#L19
  (kit.option as AntdOption).isSelectOption = true;

  return kit;
}

export const antdKit = getAntdKit();
