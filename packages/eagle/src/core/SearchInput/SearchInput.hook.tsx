import { Search24BlueIcon, Search24Icon } from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import Icon from "@src/core/Icon";
import { Typo } from "@src/core/Typo";
import OverflowTooltip from "@src/coreX/OverflowTooltip";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { type DebouncedFunc, debounce } from "lodash";
import React, { useEffect, useMemo, useRef, useState } from "react";

import type { Antd5DropdownProps } from "../Antd5Dropdown";
import type { SearchInputProps } from "./SearchInput.type";

export const searchInputRecentSearchLocalStorageKey =
  "search-input-recent-search";

export const useRecentSearch = (
  recentSearchLocalStorageKey: SearchInputProps["recentSearchLocalStorageKey"],
  maxRecentCount: number,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  onChange: SearchInputProps["onChange"],
) => {
  const { t } = useParrotTranslation();

  const [recentSearchKeys, setRecentSearchKeys] = useState<string[]>([]);

  useEffect(() => {
    if (!recentSearchLocalStorageKey) return;

    try {
      const currRecentSearchKeys = (
        JSON.parse(
          localStorage.getItem(searchInputRecentSearchLocalStorageKey) || "{}",
        ) as Record<string, string[]>
      )[recentSearchLocalStorageKey];

      setRecentSearchKeys(currRecentSearchKeys || []);
    } catch (error) {
      setRecentSearchKeys([]);
    }
  }, [recentSearchLocalStorageKey]);

  const setRecentSearchKeysDebounceRef =
    useRef<DebouncedFunc<(val: string) => void>>();

  useEffect(() => {
    if (!recentSearchLocalStorageKey) return;

    const fn = debounce((val: string) => {
      if (!val || !recentSearchLocalStorageKey) return;

      setRecentSearchKeys((preState) => {
        const newState = [...preState].filter((item) => item !== val);

        if (newState.length >= maxRecentCount) newState.pop();
        newState.unshift(val);

        try {
          const recentSearchMap = JSON.parse(
            localStorage.getItem(searchInputRecentSearchLocalStorageKey) ||
              "{}",
          ) as Record<string, string[]>;

          localStorage.setItem(
            searchInputRecentSearchLocalStorageKey,
            JSON.stringify({
              ...recentSearchMap,
              [recentSearchLocalStorageKey]: newState,
            }),
          );
        } catch (err) {
          console.error(err);
        }

        return newState;
      });
    }, 400); // 至少间隔 400ms 记录一次，避免用户设置 debounceWait 为 0 或者更小时频繁触发记录的问题

    setRecentSearchKeysDebounceRef.current = fn;

    return () => fn.cancel();
  }, [maxRecentCount, recentSearchLocalStorageKey]);

  const antd5DropdownMenu = useMemo(
    (): Antd5DropdownProps["menu"] => ({
      onClick: ({ key: val }) => {
        setValue(val);
        onChange?.(val);
        setRecentSearchKeysDebounceRef.current?.(val);
      },
      items: [
        {
          key: "recent-search",
          className: cx("recent-search-menu-item", Typo.Label.l4_regular),
          disabled: true,
          label: <span>{t("components.recent_search")}</span>,
        },
        ...recentSearchKeys.map((k) => ({
          key: k,
          label: (
            <Icon
              src={Search24Icon}
              hoverSrc={Search24BlueIcon}
              iconHeight={24}
              iconWidth={24}
            >
              <OverflowTooltip content={k} />
            </Icon>
          ),
        })),
      ],
      // 避免 Dropdown 点击时被 Input blur 关闭
      onMouseDown: (e) => e.preventDefault(),
    }),
    [onChange, recentSearchKeys, setRecentSearchKeysDebounceRef, setValue, t],
  );

  return {
    recentSearchKeys,
    setRecentSearchKeysDebounceRef,
    antd5DropdownMenu,
  };
};
