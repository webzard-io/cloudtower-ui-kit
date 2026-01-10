import { SearchOutlined } from "@ant-design/icons";
import {
  ArrowChevronDown16BlueIcon,
  ArrowChevronDown16SecondaryIcon,
  ArrowChevronUp16BlueIcon,
  ArrowChevronUp16SecondaryIcon,
  XmarkCloseCircleFill16SecondaryIcon,
  XmarkCloseCircleFill16TertiaryIcon,
} from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import Icon from "@src/core/Icon";
import Input from "@src/core/Input";
import Tooltip from "@src/core/Tooltip";
import { Typo } from "@src/core/Typo";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { type DebouncedFunc, debounce } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Antd5Dropdown } from "../Antd5Dropdown";
import { useRecentSearch } from "./SearchInput.hook";
import {
  CountTextStyles,
  DisabledIconStyles,
  IconContainerStyles,
  SearchInputDropdownStyles,
  SearchInputStyles,
} from "./SearchInput.style";
import type { SearchInputComponentType } from "./SearchInput.type";

export const SearchInput: SearchInputComponentType = (props) => {
  const {
    className,
    debounceWait = 300,
    total = 0,
    onSearchNext,
    onSearchPrev,
    prefixHoverIcon,
    nextHoverIcon,
    clearHoverIcon,
    prefixIcon,
    nextIcon,
    clearIcon,
    width = 276,
    searchIcon,
    enableRecentSearch,
    recentSearchLocalStorageKey,
    maxRecentCount = 5,
    current: externalCurrent,
    onChange,
    onFocus,
    onBlur,
    ...restProps
  } = props;
  const [internalCurrent, setInternalCurrent] = useState(0);
  const [value, setValue] = useState((props.value as string) || "");
  const { t } = useParrotTranslation();
  const isNoMatch = total === 0;

  const [inputFocused, setInputFocused] = useState(false);

  const {
    recentSearchKeys,
    setRecentSearchKeysDebounceRef,
    antd5DropdownMenu,
  } = useRecentSearch(
    recentSearchLocalStorageKey,
    maxRecentCount,
    setValue,
    onChange,
  );

  const debounceOnChangeRef = useRef<DebouncedFunc<(val: string) => void>>();

  useEffect(() => {
    const fn = debounce((val: string) => {
      onChange?.(val);

      if (enableRecentSearch && val) {
        setRecentSearchKeysDebounceRef.current?.(val);
      }
    }, debounceWait);

    debounceOnChangeRef.current = fn;

    return () => fn.cancel();
  }, [
    onChange,
    enableRecentSearch,
    debounceWait,
    setRecentSearchKeysDebounceRef,
  ]);

  // 使用外部传入的 current 或内部状态
  const current =
    externalCurrent !== undefined ? externalCurrent : internalCurrent;
  // 内部更新 current 的方法
  const setCurrent = useCallback(
    (newCurrent: number) => {
      if (externalCurrent === undefined) {
        setInternalCurrent(newCurrent);
      }
    },
    [externalCurrent],
  );

  const next = useCallback(() => {
    if (total) {
      const nextCurrent = current + 1 > total ? 1 : current + 1;
      onSearchNext?.(value, nextCurrent);
      setCurrent(nextCurrent);
    }
  }, [onSearchNext, current, total, value, setCurrent]);

  const prev = useCallback(() => {
    if (total) {
      const prevCurrent = current - 1 < 1 ? total : current - 1;
      onSearchPrev?.(value, prevCurrent);
      setCurrent(prevCurrent);
    }
  }, [onSearchPrev, current, total, value, setCurrent]);

  const suffix =
    onSearchNext && onSearchPrev && value ? (
      <>
        {typeof total === "number" ? (
          <span
            className={cx(
              Typo.Label.l4_regular,
              "counter-text",
              CountTextStyles,
            )}
          >
            {current}/{total}
          </span>
        ) : null}
        <span className={IconContainerStyles}>
          {isNoMatch ? (
            <Icon
              className={DisabledIconStyles}
              src={ArrowChevronUp16SecondaryIcon}
              style={{ opacity: 0.5 }}
            />
          ) : (
            <Tooltip title={t("components.prev")}>
              <Icon
                src={prefixIcon ?? ArrowChevronUp16SecondaryIcon}
                hoverSrc={prefixHoverIcon ?? ArrowChevronUp16BlueIcon}
                onClick={prev}
              />
            </Tooltip>
          )}
          {isNoMatch ? (
            <Icon
              className={DisabledIconStyles}
              src={ArrowChevronDown16SecondaryIcon}
              style={{ opacity: 0.5 }}
            />
          ) : (
            <Tooltip title={t("components.next")}>
              <Icon
                src={nextIcon ?? ArrowChevronDown16SecondaryIcon}
                hoverSrc={nextHoverIcon ?? ArrowChevronDown16BlueIcon}
                onClick={next}
              />
            </Tooltip>
          )}
          <Tooltip title={t("components.clear")}>
            <Icon
              src={clearIcon ?? XmarkCloseCircleFill16TertiaryIcon}
              hoverSrc={clearHoverIcon ?? XmarkCloseCircleFill16SecondaryIcon}
              onClick={() => {
                setValue("");
                debounceOnChangeRef.current?.("");
              }}
            />
          </Tooltip>
        </span>
      </>
    ) : null;

  useEffect(() => {
    setValue((props.value as string) || "");
  }, [props.value]);

  useEffect(() => {
    // 只在非受控模式下重置内部 current
    if (externalCurrent === undefined) {
      setCurrent(total ? 1 : 0);
    }
  }, [value, total, externalCurrent, setCurrent]);

  const InputComponent = (
    <Input
      className={cx(SearchInputStyles, className)}
      style={{ width }}
      prefix={searchIcon ? <Icon src={searchIcon} /> : <SearchOutlined />}
      suffix={suffix}
      onPressEnter={next}
      value={value}
      onChange={(e) => {
        const newValue = e.target.value || "";
        setValue(newValue);
        debounceOnChangeRef.current?.(newValue);
      }}
      onFocus={(e) => {
        setInputFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setInputFocused(false);
        onBlur?.(e);
      }}
      {...restProps}
    />
  );

  if (enableRecentSearch)
    return (
      <Antd5Dropdown
        overlayClassName={cx(
          "recent-search-dropdown",
          SearchInputDropdownStyles,
        )}
        overlayStyle={{ width }}
        transitionName=""
        placement="bottomLeft"
        trigger={["click"]}
        open={inputFocused && !value && !!recentSearchKeys.length}
        menu={antd5DropdownMenu}
      >
        {InputComponent}
      </Antd5Dropdown>
    );

  return InputComponent;
};
