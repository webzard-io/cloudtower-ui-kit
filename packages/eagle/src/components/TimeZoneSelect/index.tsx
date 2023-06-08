import { CheckmarkDoneSuccessCorrect16BlueIcon } from "@cloudtower/icons-react";
import { parrotI18n } from "@cloudtower/parrot";
import { css, cx } from "@linaria/core";
import { Select as AntdSelect, Tag } from "antd";
import { groupBy, sortBy, toPairs, uniqBy } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import TimeZones from "timezones.json";

import { ITimeZoneSelectProps } from "../../spec/type";
import Icon from "../Icon";
import Select from "../Select";
import { Typo } from "../Typo";

type TimeZoneType = {
  value: string;
  abbr: string;
  offset: number;
  text: string;
};

const allTimeZones = uniqBy(
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
);

const timeZoneGroups: [string, TimeZoneType[]][] = (() => {
  const groupedTimeZones = groupBy(
    allTimeZones,
    (tz) => tz.value.split("/")[0]
  );
  delete groupedTimeZones["CST6CDT"];
  delete groupedTimeZones["MST7MDT"];
  delete groupedTimeZones["PST8PDT"];
  delete groupedTimeZones["Etc"];
  return sortBy(
    toPairs(groupedTimeZones).map(([key, tzs]) => {
      return [key, sortBy(tzs, "value")];
    }),
    "0"
  );
})();

const SelectStyle = css`
  width: 430px !important;
`;

const DropdownStyle = css`
  .ant-select-item-group {
    padding: 8px 16px;
    line-height: 18px;
    border-top: 1px solid rgba(211, 218, 235, 0.6);
    height: 34px;
    min-height: 34px;
    box-sizing: border-box;
    margin-top: 8px;
  }
`;

const OptionWrapperStyle = cx(
  css`
    display: flex;
    flex-direction: column;
    margin: 1px 8px;
    padding: 8px;
    border-radius: 4px;

    .selected-icon {
      display: none;
    }

    &.ant-select-item-option-grouped {
      padding-left: 8px;
    }

    &.ant-select-item-option-selected {
      background-color: white;
      .timezone-title {
        color: #0080ff;
      }
      .selected-icon {
        display: block;
      }
    }

    &.ant-select-item-option-active {
      background: rgba(0, 136, 255, 0.16);
      .timezone-title {
        color: #0080ff;
      }
      .timezone-tag {
        background: rgba(0, 136, 255, 0.1);
        color: #0080ff;
      }
    }
  `,
  Typo.Label.l3_regular
);

const OptionFirstLineStyle = cx(
  css`
    display: flex;
    justify-content: space-between;
    height: 20px;
    line-height: 20px;
  `,
  Typo.Label.l3_regular
);

const OptionSecondLineStyle = cx(
  css`
    display: flex;
    justify-content: space-between;
    color: $text-light-secondary;
    height: 18px;
    line-height: 18px;
    margin-top: 2px;
  `,
  Typo.Label.l4_regular
);

const TagStyle = css`
  border: none;
  margin-right: 0;
  background: rgba(225, 230, 241, 0.6);
`;

const BrowserTimeValue = "browser_time_zone";
const DefaultTimeValue = "default_time_zone";

// get browser time zone
const browserTzName = Intl.DateTimeFormat().resolvedOptions().timeZone;
const browserTz =
  allTimeZones.find((tz) => tz.value === browserTzName) || allTimeZones[0];

const TimeZoneSelect: React.FC<ITimeZoneSelectProps> = (props) => {
  const {
    value,
    onChange,
    disabled,
    defaultUseBrowserTime,
    className,
    placeholder,
    defaultOptionValue,
  } = props;
  // innerValue could be BrowserTimeValue
  const [innerValue, setInnerValue] = useState(value);

  const defaultTz = useMemo(() => {
    return allTimeZones.find((tz) => tz.value === defaultOptionValue);
  }, [defaultOptionValue]);

  const _onChange = useCallback(
    (val) => {
      setInnerValue(val);
      if (val === BrowserTimeValue) {
        onChange(browserTzName);
      } else if (val === DefaultTimeValue && defaultTz) {
        onChange(defaultTz?.value);
      } else {
        onChange(val);
      }
    },
    [defaultTz, onChange]
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
    if (innerValue === DefaultTimeValue && value === defaultTz?.value) return;
    if (innerValue === value) return;
    setInnerValue(value);
  }, [defaultTz?.value, innerValue, value]);

  const timeZoneOptionGroups = timeZoneGroups.map(([key, timezones]) => {
    return (
      <AntdSelect.OptGroup label={key.toUpperCase()}>
        {timezones.map((zone) => {
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
      </AntdSelect.OptGroup>
    );
  });

  return (
    <Select
      className={cx(SelectStyle, className)}
      dropdownClassName={DropdownStyle}
      placeholder={
        <span>
          {placeholder ||
            parrotI18n.t("components.time_zone_select_placeholder")}
        </span>
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
      {defaultTz ? (
        <AntdSelect.Option
          value={DefaultTimeValue}
          label={parrotI18n.t("components.default_time_zone")}
          className={OptionWrapperStyle}
        >
          <TimeZoneOption
            key={DefaultTimeValue}
            customLabel={parrotI18n.t("components.default_time_zone")}
            timeZone={defaultTz}
          />
        </AntdSelect.Option>
      ) : undefined}
      <AntdSelect.Option
        value={BrowserTimeValue}
        label={parrotI18n.t("components.browser_time_zone")}
        className={OptionWrapperStyle}
      >
        <TimeZoneOption
          key={BrowserTimeValue}
          customLabel={parrotI18n.t("components.browser_time_zone")}
          timeZone={browserTz}
        />
      </AntdSelect.Option>
      <AntdSelect.Option value="UTC" className={OptionWrapperStyle}>
        <TimeZoneOption
          key="utc"
          customLabel={parrotI18n.t("components.coorddinated_universal_time")}
          timeZone={{
            value: "UTC",
            text: "UTC",
            offset: 0,
            abbr: "GMT",
          }}
        />
      </AntdSelect.Option>
      {timeZoneOptionGroups}
    </Select>
  );
};

interface OptionProps {
  timeZone: TimeZoneType;
  customLabel?: string;
}

const TimeZoneOption: React.FC<OptionProps> = ({ timeZone, customLabel }) => {
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
        <span className="timezone-title">{customLabel || timeZone.value}</span>
        <Tag className={cx("timezone-tag", TagStyle)}>{tagText}</Tag>
      </div>
      <div className={OptionSecondLineStyle}>
        <span>
          {timeZone.text}, {timeZone.abbr}
        </span>
        <Icon
          className="selected-icon"
          src={CheckmarkDoneSuccessCorrect16BlueIcon}
          iconHeight={16}
          iconWidth={16}
        />
      </div>
    </>
  );
};

export default TimeZoneSelect;
