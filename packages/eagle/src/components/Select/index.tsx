import {
  ArrowChevronDown16BoldSecondaryTransparentIcon,
  Loading16GradientBlueIcon,
} from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import { Select as AntdSelect } from "antd";
import cs from "classnames";
import _ from "lodash";
import React, { useEffect, useMemo, useRef } from "react";
import { findDOMNode } from "react-dom";
import { isElement } from "react-is";

import { SelectComponentType } from "../../spec";
import Loading from "../Loading";
import { Typo } from "../Typo";

const SelectStyle = css`
  &.ant-select,
  &.ant-select .ant-select-selector {
    border-radius: 6px;
  }

  &.ant-select.border-left,
  &.ant-select.border-left .ant-select-selector {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &.ant-select.border-right,
  &.ant-select.border-right .ant-select-selector {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &.ant-select {
    &.ant-select-single {
      width: 100%;
      &[data-size="small"] {
      }
      &[data-size="middle"] {
        height: 30px;
      }
      &[data-size="large"] {
      }
      color: $text-primary-light;
      border-color: $strokes-light-trans-2;
      transition:
        border 160ms ease 8ms,
        box-shadow 160ms ease 8ms;
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

      &.ant-select-disabled .ant-select-arrow {
        opacity: 0.6;
      }

      &.ant-select-disabled .ant-select-selector {
        background: $fills-light-trans-3;
        border-color: $strokes-light-trans-3;
        cursor: not-allowed;
        color: $text-light-tertiary;
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
  }
`;

const Select: SelectComponentType<any, HTMLElement> = ({
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
  borderMode = "default",
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
        "ant-select-selection-search-input",
      )[0];
      const item = (realDom as HTMLDivElement).getElementsByClassName(
        "ant-select-selection-item",
      )[0];
      inputDom &&
        (placeholder || item) &&
        inputDom.setAttribute(
          "data-test",
          String(placeholder || item.textContent),
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
        `border-${borderMode}`,
        limitExceeded && "select-event-none",
        _danger ? "select-error" : "",
        typo,
      )}
      data-size={size}
      dropdownClassName={cs(dropdownClassName, limitExceeded && "display-none")}
      showSearch={
        multiple
          ? undefined
          : typeof showSearch === "undefined"
          ? Boolean(onSearch)
          : showSearch
      }
      suffixIcon={
        <span
          role="img"
          aria-label="down"
          className={cs(
            "anticon ant-select-suffix",
            loading ? "anticon-loading" : "anticon-down",
          )}
        >
          {restProps.suffixIcon ||
            (loading ? (
              <Loading16GradientBlueIcon className="anticon-spin" />
            ) : (
              <ArrowChevronDown16BoldSecondaryTransparentIcon />
            ))}
        </span>
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

export default Select;
