import { SearchOutlined } from "@ant-design/icons";
import {
  ArrowChevronDown16BlueIcon,
  ArrowChevronDown16SecondaryIcon,
  ArrowChevronUp16BlueIcon,
  ArrowChevronUp16SecondaryIcon,
  XmarkCloseCircleFill16SecondaryIcon,
  XmarkCloseCircleFill16TertiaryIcon,
} from "@cloudtower/icons-react";
import { css, cx } from "@linaria/core";
import Icon from "@src/core/Icon";
import Input from "@src/core/Input";
import Tooltip from "@src/core/Tooltip";
import { Typo } from "@src/core/Typo";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";

import { SearchInputComponentType } from "./searchInput.type";

const InputStyle = css`
  .ant-input-prefix {
    margin-right: 8px;
  }
  .ant-input-suffix {
    margin-left: 8px;
  }
`;
const CountTextStyle = css`
  color: $gray-120;
  border-right: 1px solid $gray-a60-5;
  margin-right: 8px;
  padding-right: 8px;
`;
const IconContainerStyle = css`
  display: flex;
  gap: 4px;

  .icon-wrapper {
    cursor: pointer;
  }
`;
const DisabledIconStyle = css`
  &.icon-wrapper {
    cursor: not-allowed;
  }
`;

const SearchInput: SearchInputComponentType = (props) => {
  const {
    onChange,
    debounceWait = 300,
    total = 0,
    onSearchNext,
    onSearchPrev,
    ...restProps
  } = props;
  const [current, setCurrent] = useState(0);
  const [value, setValue] = useState((props.value as string) || "");
  const { t } = useParrotTranslation();
  const onSearch = _.debounce(onChange, debounceWait);
  const isNoMatch = total === 0;

  const next = useCallback(() => {
    if (total) {
      onSearchNext?.(value, current);
      setCurrent(current + 1 > total ? 1 : current + 1);
    }
  }, [onSearchNext, current, total, value]);
  const prev = useCallback(() => {
    if (total) {
      onSearchPrev?.(value, current);
      setCurrent(current - 1 < 1 ? total : current - 1);
    }
  }, [onSearchPrev, current, total, value]);

  const suffix =
    onSearchNext && onSearchPrev && value ? (
      <>
        {typeof total === "number" ? (
          <span className={cx(Typo.Label.l4_regular, CountTextStyle)}>
            {current}/{total}
          </span>
        ) : null}
        <span className={IconContainerStyle}>
          {isNoMatch ? (
            <Icon
              className={DisabledIconStyle}
              src={ArrowChevronUp16SecondaryIcon}
              style={{ opacity: 0.5 }}
            />
          ) : (
            <Tooltip title={t("components.prev")}>
              <Icon
                src={ArrowChevronUp16SecondaryIcon}
                hoverSrc={ArrowChevronUp16BlueIcon}
                onClick={prev}
              />
            </Tooltip>
          )}
          {isNoMatch ? (
            <Icon
              className={DisabledIconStyle}
              src={ArrowChevronDown16SecondaryIcon}
              style={{ opacity: 0.5 }}
            />
          ) : (
            <Tooltip title={t("components.next")}>
              <Icon
                src={ArrowChevronDown16SecondaryIcon}
                hoverSrc={ArrowChevronDown16BlueIcon}
                onClick={next}
              />
            </Tooltip>
          )}
          <Tooltip title={t("components.clear")}>
            <Icon
              src={XmarkCloseCircleFill16TertiaryIcon}
              hoverSrc={XmarkCloseCircleFill16SecondaryIcon}
              onClick={() => {
                onSearch("");
                setValue("");
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
    setCurrent(total ? 1 : 0);
  }, [value, total]);

  return (
    <Input
      style={{ width: 276 }}
      prefix={<SearchOutlined />}
      suffix={suffix}
      onChange={(e) => {
        const newValue = e.target.value;

        onSearch(newValue);
        setValue(newValue);
      }}
      onPressEnter={next}
      value={value}
      {...restProps}
      className={cx(InputStyle, restProps.className)}
    />
  );
};

export default SearchInput;

export * from "./searchInput.type";
