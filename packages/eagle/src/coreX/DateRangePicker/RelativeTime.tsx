import { css, cx } from "@linaria/core";
import Input from "@src/core/Input";
import { Typo } from "@src/core/Typo";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

import { BASIC_RELATIVE_TIME_CONFIG, getDateText } from "./common";
import { RelativeTimeStyle } from "./DateRangePicker.style";
import { PastTime, RelativeTimeProps } from "./dateRangePicker.type";

const HighlightKeywordStyle = css`
  font-weight: bold;
  background-color: unset;
  padding: unset;
`;

const RelativeTime: React.FC<RelativeTimeProps> = (props) => {
  const { value, config, search, onChange } = props;
  const { t } = useParrotTranslation();

  const configRef = useRef<PastTime[]>(config || BASIC_RELATIVE_TIME_CONFIG);

  const [keyword, setKeyword] = useState("");

  const configList = configRef.current.filter((config) => {
    const text = getDateText(config, t);
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
          const selected =
            config.unit === value?.unit && config.value === value?.value;
          const text = getDateText(config, t);

          return (
            <li
              key={index}
              className={cx(
                Typo.Label.l2_regular,
                selected && "selected",
                config.disabled && "disabled",
              )}
              onClick={() => onChange?.(config)}
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
