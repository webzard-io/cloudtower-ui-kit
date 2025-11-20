import Loading from "@src/core/Loading";
import { Typo } from "@src/core/Typo";
import useLegacyComponentWarning from "@src/hooks/useLegacyComponentWarning";
import { Select as AntdSelect } from "antd";
import cs from "classnames";
import _ from "lodash";
import React, { useEffect, useMemo, useRef } from "react";
import { findDOMNode } from "react-dom";
import { isElement } from "react-is";

import { SelectStyle } from "./select.style";
import { LegacySelectComponentType } from "./select.type";

const LegacySelect: LegacySelectComponentType<any, HTMLElement> = ({
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

  useLegacyComponentWarning(
    "Warning: LegacySelect is deprecated and will be removed in future versions. Please use Select instead.",
  );

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

export default LegacySelect;

export * from "./select.type";
