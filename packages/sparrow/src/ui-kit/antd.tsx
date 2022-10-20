import {
  CloseCircleFilled,
  ExportOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { css, cx } from "@linaria/core";
import { styled } from "@linaria/react";
import { Field } from "@smartx/react-final-form";
import {
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
import { TimePickerProps } from "antd/lib/time-picker";
import cs from "classnames";
import _ from "lodash";
import moment from "moment";
import React, { Fragment, ReactNode, useEffect, useMemo, useRef } from "react";
import { findDOMNode } from "react-dom";
import { useTranslation } from "react-i18next";
import { isElement } from "react-is";

import { getAlertIcon } from "../common";
import Icon from "../components/Icon";
// import Modal from "./modal";
// import Modal2 from "./modal2";
import Loading from "../components/Loading";
// import i18n from "../i18n";
import { FullView } from "../styles/common/styled";
import { Typo } from "../styles/component/typo";
import { Kit, TextAreaProps } from "./base";
import Button from "./button";
import ButtonGroup from "./buttonGroup";
// import Overflow from "../components/Overflow";
import Pagination from "./pagination";
import Radio, { RadioButton, RadioGroup } from "./radio";
import Switch from "./switch";
import KitTable from "./table";
import Tooltip from "./tooltip";
// import Steps from "../components/Steps";
// import { message } from "./message/message-group";

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

const InputNumber: React.FC<InputNumberProps & { error?: boolean }> = ({
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
    <AntdInputNumber
      {...props}
      size={size}
      data-test={props.name}
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
const SelectStyle = css`
  &.ant-select,
  &.ant-select .ant-select-selector {
    border-radius: 6px;
  }

  &.ant-select.ant-select-single {
    width: 100%;
    height: 30px;
    color: $text-primary-light;
    border-color: $strokes-light-trans-2;
    transition: border 160ms ease 8ms, box-shadow 160ms ease 8ms;
    font-size: 13px;

    &.ant-select-lg {
      height: 38px;
      font-size: 13px;
    }

    .ant-select-arrow,
    .ant-select-arrow .anticon-down {
      transition: 160ms ease;
    }

    .ant-select-arrow-loading {
      color: $fills-light-general-general;
    }

    &:not(.ant-select-disabled) {
      &:hover .ant-select-selector,
      &.__pseudo-states-hover .ant-select-selector {
        border-color: $strokes-light-trans-4;
        box-shadow: $shadow-light-hover;
      }

      &:hover .ant-select-arrow,
      &.__pseudo-states-hover .ant-select-arrow {
        color: $fills-light-general-general;
      }

      &:active,
      &:focus,
      &.ant-select-focused,
      &.ant-select-open,
      &.__pseudo-states-active,
      &.__pseudo-states-focus {
        .ant-select-selector {
          border-color: $fills-light-general-general;
          box-shadow: $shadow-light-active;
        }
      }

      &.ant-select-open .ant-select-arrow .anticon-down {
        transform: rotate(180deg);
      }
    }

    &.select-error:not(.ant-select-disabled) {
      .ant-select-selector {
        border-color: $fills-light-serious-serious !important;
      }

      &:hover .ant-select-arrow,
      &.__pseudo-states-hover .ant-select-arrow {
        color: $text-light-super;
      }

      &:active,
      &:focus,
      &.ant-select-focused,
      &.ant-select-open,
      &.__pseudo-states-focus,
      &.__pseudo-states-active {
        .ant-select-selector {
          border-color: $fills-light-general-general;
          box-shadow: $shadow-light-error;
        }
      }

      &.ant-select-open .ant-select-arrow .anticon-down {
        transform: rotate(180deg);
      }
    }

    &.ant-select-disabled .ant-select-selector {
      background: $fills-light-trans-3;
      border-color: $strokes-light-trans-3;
      cursor: "not-allowed";
    }
  }
`;

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

const Select: Kit["select"] = ({
  input,
  multiple,
  className,
  scrollBottomBuffer = 0,
  onScrollBottom,
  onPopupScroll,
  onSearch,
  showSearch,
  filterOption,
  loading,
  notFoundContent,
  children,
  error,
  selectLimit,
  dropdownClassName,
  danger,
  size = "middle",
  meta,
  placeholder,
  ...restProps
}) => {
  const limitExceeded =
    multiple && selectLimit && selectLimit <= (input.value?.length || 0);
  const typo = {
    large: Typo.Label.l2_regular,
    middle: Typo.Label.l3_regular,
    small: Typo.Label.l4_regular,
  }[size];
  const _danger = useMemo(() => {
    if (danger !== undefined) {
      return danger;
    }
    return meta?.touched && meta.invalid;
  }, [danger, meta]);

  const selectRef = useRef(null);
  // recommended by antd https://github.com/ant-design/ant-design/issues/26269#issuecomment-675818652
  useEffect(() => {
    if (!selectRef.current) {
      return;
    }
    const realDom = findDOMNode(selectRef.current);
    if (realDom) {
      const inputDom = (realDom as HTMLDivElement).getElementsByClassName(
        "ant-select-selection-search-input"
      )[0];
      const item = (realDom as HTMLDivElement).getElementsByClassName(
        "ant-select-selection-item"
      )[0];
      inputDom &&
        (placeholder || item) &&
        inputDom.setAttribute(
          "data-test",
          String(placeholder || item.textContent)
        );
    }
  }, [selectRef, placeholder]);

  return (
    <AntdSelect
      {...input}
      ref={selectRef}
      size={size}
      value={multiple ? input.value || [] : input.value || undefined}
      onChange={(e: string | string[], option) => {
        if (Array.isArray(e) && e.some((v) => v === "")) {
          // TODO: improve type
          /* eslint-disable @typescript-eslint/no-explicit-any */
          input.onChange?.([], option as any);
        } else {
          input.onChange?.(e, option as any);
          /* eslint-enable @typescript-eslint/no-explicit-any */
        }
      }}
      onBlur={() => input.onBlur?.()}
      mode={multiple ? "multiple" : undefined}
      className={cs(
        SelectStyle,
        "select",
        className,
        limitExceeded && "select-event-none",
        _danger ? "select-error" : "",
        typo
      )}
      dropdownClassName={cs(dropdownClassName, limitExceeded && "display-none")}
      showSearch={
        multiple
          ? undefined
          : typeof showSearch === "undefined"
          ? Boolean(onSearch)
          : showSearch
      }
      filterOption={
        onSearch === undefined
          ? filterOption === undefined
            ? (input, option) => {
                const label = option?.label;
                if (!label || typeof label !== "string") {
                  return false;
                }
                return label.toLowerCase().includes(input.toLowerCase());
              }
            : filterOption
          : false
      }
      onSearch={onSearch && _.debounce(onSearch, 100)}
      onPopupScroll={(e) => {
        onPopupScroll?.(e);
        const el = e.currentTarget;
        if (
          el.scrollHeight - el.offsetHeight - el.scrollTop <=
          scrollBottomBuffer
        ) {
          onScrollBottom?.();
        }
      }}
      notFoundContent={loading ? <Loading /> : notFoundContent}
      dropdownRender={(menu) => <>{error || menu}</>}
      loading={loading}
      placeholder={placeholder}
      {...restProps}
    >
      {React.Children.map(children, (child) => {
        return isElement(child)
          ? {
              ...child,
              props: {
                ...child.props,
                "data-test": child.props.value,
              },
            }
          : child;
      })}
    </AntdSelect>
  );
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
    // modal: Modal,
    // modal2: Modal2,
    dropdown: (props) => {
      return <Dropdown {...props} />;
    },
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
        maximum,
        minimum,
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
              const maximumIsValid = typeof maximum === "number";
              const minimumIsValid = typeof minimum === "number";
              if (maximumIsValid || minimumIsValid) {
                const value = parseInt(e.target.value) || 0;
                if (_.isNil(value)) {
                  input.onChange(undefined);
                }
                if (
                  !_.isNil(value) &&
                  maximumIsValid &&
                  (maximum || 0) < value
                ) {
                  input.onChange(maximum);
                }
                if (
                  !_.isNil(value) &&
                  minimumIsValid &&
                  (minimum || 0) > value
                ) {
                  input.onChange(minimum);
                }
              }
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
          {/* <DatePicker
            onFocus={() => input.onFocus?.()}
            onBlur={() => input.onBlur?.()}
            showTime
            defaultValue={input.value}
            onOk={input.onChange}
          /> */}
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
                {/* <Overflow overflow={tagsOverflow}>
                  <span className="tags-overflow-auto">
                    {tags.map((tag) => (
                      <InputTagItem key={tag}>{tag}</InputTagItem>
                    ))}
                  </span>
                </Overflow> */}
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
                focusIndicator ? (
                  <Icon type="1-focus-indicator-16-blue " />
                ) : undefined
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
          {/* <DatePicker.RangePicker
            onFocus={() => input.onFocus?.()}
            onBlur={() => input.onBlur?.()}
            showTime
            // https://github.com/ant-design/ant-design/issues/22185
            defaultValue={input.value?.map((v?: string) => v && moment(v))}
            onChange={input.onChange}
            value={input.value?.map((v?: string) => v && moment(v))}
            format={props.format}
          /> */}
        </div>
      ),
    },
    units: {
      Byte({ rawValue, noUnitOnZero, decimals }) {
        const { i18n } = useTranslation();
        if (isEmpty(rawValue)) {
          return Empty;
        }
        if (rawValue === -1) {
          return <span>{i18n.t("iscsiTarget.calculation")}</span>;
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
      Second({ rawValue, decimals, abbreviate }) {
        const { i18n } = useTranslation();

        if (isEmpty(rawValue)) {
          return Empty;
        }
        const { value, unit } = formatSeconds(rawValue, decimals);
        return (
          <span>
            <span className="value">{value} </span>
            <span className="unit">
              {i18n.td(`common.${abbreviate ? `${unit}_abbreviation` : unit}`)}
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
      const _icon = <Icon type={getAlertIcon(type)} />;
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
    // message: message,
    tag: Tag,
    popover: Popover,
    // arch: (props) => {
    //   const { architecture } = props;
    //   let text = "";
    //   if (architecture) {
    //     text = i18n.td(`enum.Architecture_${architecture}`);
    //   }
    //   return <span>{text}</span>;
    // },
    buttonGroup: ButtonGroup,
    // steps: Steps,
  };

  // https://github.com/react-component/select/blob/master/src/Option.tsx#L19
  (kit.option as AntdOption).isSelectOption = true;

  return kit;
}
