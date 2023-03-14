import { parrotI18n } from "@cloudtower/parrot";
import { css, cx } from "@linaria/core";
import { Select as AntdSelect, Tag } from "antd";
import { sortBy, uniqBy } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import TimeZones from "timezones.json";

import Select from "../Select";
import { Typo } from "../Typo";

type TimeZoneType = {
  value: string;
  abbr: string;
  offset: number;
  text: string;
};

const flatTimeZones = sortBy(
  uniqBy(
    TimeZones.reduce((sum, zone) => {
      const utcZones: TimeZoneType[] = zone.utc.map((utc) => {
        return {
          abbr: zone.abbr,
          text: zone.text.replace(/\(.*\) /, ""),
          value: utc,
          offset: zone.offset,
        };
      });
      return sum.concat(utcZones);
    }, [] as TimeZoneType[]),
    "value"
  ),
  "offset"
);

const SelectStyle = css`
  width: 430px !important;
`;

const OptionWrapperStyle = cx(
  css`
    display: flex;
    flex-direction: column;
  `,
  Typo.Label.l3_regular
);

const OptionFirstLineStyle = cx(
  css`
    display: flex;
    justify-content: space-between;
  `,
  Typo.Label.l3_regular
);

const OptionSecondLineStyle = cx(
  css`
    display: flex;
    color: $text-light-secondary;
  `,
  Typo.Label.l4_regular
);

interface Props {
  value: string | undefined;
  onChange: (value: string) => void;
  defaultUseBrowserTime?: boolean;
  disabled?: boolean;
  className?: string;
}

const BrowserTimeValue = "browser_time_zone";

// get browser time zone
const browserTzName = Intl.DateTimeFormat().resolvedOptions().timeZone;
const browserTz =
  flatTimeZones.find((tz) => tz.value === browserTzName) || flatTimeZones[0];

const TimeZoneSelect: React.FC<Props> = (props: Props) => {
  const { value, onChange, disabled, defaultUseBrowserTime, className } = props;
  // innerValue could be BrowserTimeValue
  const [innerValue, setInnerValue] = useState(value);

  const _onChange = useCallback(
    (val) => {
      setInnerValue(val);
      if (val === BrowserTimeValue) {
        onChange(browserTzName);
      } else {
        onChange(val);
      }
    },
    [onChange]
  );

  useEffect(() => {
    if (defaultUseBrowserTime && !value) {
      setInnerValue(BrowserTimeValue);
      onChange(browserTzName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // update innerValue when props value changes
    if (innerValue === BrowserTimeValue && value === browserTzName) return;
    if (innerValue === value) return;
    setInnerValue(value);
  }, [innerValue, value]);

  return (
    <Select
      className={cx(SelectStyle, className)}
      placeholder={
        <span>{parrotI18n.t("components.time_zone_select_placeholder")}</span>
      }
      value={innerValue}
      onChange={_onChange}
      showSearch
      disabled={disabled}
      filterOption={(keyword, option) => {
        return (option?.value || "")
          .toLowerCase()
          .includes(keyword.toLowerCase());
      }}
      optionLabelProp="label"
      input={{}}
    >
      <AntdSelect.Option
        value={BrowserTimeValue}
        label={parrotI18n.t("components.browser_time_zone")}
        className={OptionWrapperStyle}
      >
        <TimeZoneOption
          key={BrowserTimeValue}
          isBrowser={true}
          timeZone={browserTz}
        />
      </AntdSelect.Option>
      <AntdSelect.Option value="UTC" className={OptionWrapperStyle}>
        <TimeZoneOption
          key="utc"
          timeZone={{
            value: "UTC",
            text: "UTC",
            offset: 0,
            abbr: "UTC",
          }}
        />
      </AntdSelect.Option>
      {flatTimeZones.map((zone) => {
        return (
          <AntdSelect.Option
            label={zone.value}
            value={zone.value}
            className={OptionWrapperStyle}
          >
            <TimeZoneOption key={zone.value} timeZone={zone} />
          </AntdSelect.Option>
        );
      })}
    </Select>
  );
};

interface OptionProps {
  timeZone: TimeZoneType;
  isBrowser?: boolean;
}

const TimeZoneOption: React.FC<OptionProps> = ({ timeZone, isBrowser }) => {
  let tagText = "";
  if (timeZone.offset === 0) {
    tagText = "UTC";
  } else if (timeZone.offset < 0) {
    tagText = `UTC${timeZone.offset}:00`;
  } else {
    tagText = `UTC+${timeZone.offset}:00`;
  }
  return (
    <>
      <div className={OptionFirstLineStyle}>
        <span>
          {isBrowser
            ? parrotI18n.t("components.browser_time_zone")
            : timeZone.value}
        </span>
        <Tag>{tagText}</Tag>
      </div>
      <div className={OptionSecondLineStyle}>
        <span>
          {timeZone.text}, {timeZone.abbr}
        </span>
      </div>
    </>
  );
};

export default TimeZoneSelect;
