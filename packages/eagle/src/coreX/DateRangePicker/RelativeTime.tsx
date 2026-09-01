import { css, cx } from "@linaria/core";
import Input from "@src/core/Input";
import { Typo } from "@src/core/Typo";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

import {
  BASIC_RELATIVE_TIME_CONFIG,
  getDateText,
  normalizeRelativeTime,
} from "./common";
import { RelativeTimeStyle } from "./DateRangePicker.style";
import { PastTime, RelativeTimeProps } from "./dateRangePicker.type";

const HighlightKeywordStyle = css`
  font-weight: bold;
  background-color: unset;
  padding: unset;
`;

const RelativeTime: React.FC<RelativeTimeProps> = (props) => {
  const { value, config, search, type = "past", onChange } = props;
  const { t } = useParrotTranslation();

  const configRef = useRef<PastTime[]>(config || BASIC_RELATIVE_TIME_CONFIG);

  const [keyword, setKeyword] = useState("");
  const normalizedValue = value
    ? normalizeRelativeTime(value, type)
    : undefined;

  const configList = configRef.current.filter((config) => {
    const text = getDateText(config, t, type);
    return text.indexOf(keyword) > -1;
  });

  return (
    <RelativeTimeStyle.Wrapper>
      {search ? (
        <Input
          value={keyword}
          allowClear
          placeholder={t("components.search_relative_time_placeholder")}
          onChange={(event) => setKeyword(event.target.value)}
        />
      ) : null}
      <ul className={cx("past-time-list", !search && "no-search")}>
        {configList.map((config, index) => {
          const normalizedConfig = normalizeRelativeTime(config, type);
          const selected =
            normalizedConfig.unit === normalizedValue?.unit &&
            normalizedConfig.value === normalizedValue?.value &&
            normalizedConfig.type === normalizedValue?.type;
          const text = getDateText(normalizedConfig, t, type);

          return (
            <li
              key={index}
              className={cx(
                Typo.Label.l2_regular,
                selected && "selected",
                normalizedConfig.disabled && "disabled",
              )}
              onClick={() => onChange?.(normalizedConfig)}
            >
              <Highlighter
                highlightClassName={cx(HighlightKeywordStyle, "highlight")}
                searchWords={[keyword]}
                autoEscape={true}
                textToHighlight={text}
              />
            </li>
          );
        })}
      </ul>
    </RelativeTimeStyle.Wrapper>
  );
};

export default RelativeTime;
