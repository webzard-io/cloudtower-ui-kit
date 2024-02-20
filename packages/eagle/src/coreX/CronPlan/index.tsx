import { ClockIcon, CloseIcon } from "@cloudtower/icons-react";
import { ParrotLngs } from "@cloudtower/parrot";
import { css, cx } from "@linaria/core";
import AccordionCard from "@src/core/AccordionCard";
import Button from "@src/core/Button";
import Fields from "@src/core/Fields";
import { ParrotTrans } from "@src/core/ParrotTrans";
import Switch from "@src/core/Switch";
import TimePicker from "@src/core/TimePicker";
import { Typo } from "@src/core/Typo";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import {
  CronTime,
  getDaily,
  getMode,
  getMonthly,
  getTime,
  getWeekly,
  toDailyString,
  toMonthlyString,
  toWeeklyString,
} from "@src/utils";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { i18n as Ii18n } from "i18next";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { UseTranslationResponse } from "react-i18next";

import { CronPlanProps, CronPlanState } from "./cronPlan.type";

const CronPlanWrapper = css`
  width: 648px;

  &.active {
    border-color: $blue-60;

    > header {
      background: rgba($blue-60, 0.1);
    }
  }

  .expand {
    padding: 12px;
  }

  .field-item {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid rgba(213, 219, 227, 0.6);

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    label {
      line-height: 32px;
      width: 100px;
      color: rgba(62, 70, 82, 0.6);
    }
  }

  .help {
    color: rgba(62, 70, 82, 0.6);
    margin-top: 5px;
  }

  .ant-input-affix-wrapper,
  .ant-picker {
    width: 128px;
  }
`;

const CronPlanHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  word-break: keep-all;

  .title {
    margin: 0 16px 0 8px;
  }

  .retain {
    color: rgba(129, 138, 153, 0.6);
  }

  div.left {
    flex: 1;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: flex-start;
    white-space: nowrap;

    .title {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  div.right {
    display: flex;
    align-items: center;
  }

  .reverse {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;

    .ant-switch {
      margin-left: 8px;
    }
  }

  .close {
    padding-left: 14px;
    margin-left: 14px;
    border-left: 1px solid rgba(129, 138, 153, 0.6);
    cursor: pointer;
  }
`;

const ModeTabs = css`
  .ant-btn-link {
    padding: 1px 10px;
    color: rgba(62, 70, 82, 0.6);
    border-radius: 4px;

    &.active {
      background: rgba(0, 128, 255, 0.1);
      color: $blue;
    }
  }

  padding-bottom: 4px;
  border-bottom: 1px solid rgba(213, 219, 227, 0.6);
`;

const Wrapper = css`
  padding: 10px 0;
  border-bottom: 1px solid rgba(213, 219, 227, 0.6);

  .ant-input,
  .ant-picker {
    width: 80px;
    margin: 0 9px;
    text-align: center;
  }

  .options {
    padding: 12px 0 12px 16px;
    border-left: 2px solid rgba(129, 138, 153, 0.6);
    margin: 5px 0 5px 8px;
  }
  .week-day-option,
  .month-day-option {
    background: #f5f7fa;
    box-sizing: border-box;
    border-radius: 16px;
    margin-right: 8px;

    &:focus {
      color: inherit;
      border-color: #d9d9d9;
    }
  }
  .week-day-option {
    &.active {
      background-color: $blue;
      border-color: $blue;
      color: $white;
    }
    &.en-text {
      width: 110px;
      margin-top: 4px;
    }
  }
  .month-day-option {
    width: 32px;
    padding: 0;
    margin-bottom: 8px;

    &.active {
      background-color: $blue;
      border-color: $blue;
      color: $white;
    }
  }
`;

export const stringifyPlan = (
  mode: CronMode,
  daily: DailyState,
  weekly: WeeklyState,
  monthly: MonthlyState,
  i18n: Ii18n,
) => {
  const isEn = i18n.language === ParrotLngs.en;
  const mark = isEn ? " , " : "、";
  const days_map = isEn ? EN_WEEK_DAYS_MAP(i18n.t) : WEEK_DAYS_MAP(i18n.t);
  if (mode === "day") {
    const time = daily.time.format("HH:mm");
    const count = daily.step || 0;
    return count > 1
      ? i18n.t("components.every_day_with_count_and_time", {
          count: daily.step,
          time,
        })
      : i18n.t("components.every_day_with_time", { time });
  }
  if (mode === "week") {
    const time = weekly.time.format("HH:mm");
    const count = weekly.step || 0;
    const day = weekly.days.map((d) => days_map[d]).join(mark);
    const repeat_day = weekly.days.length > 0;

    return count > 1
      ? repeat_day
        ? i18n.t("components.every_weeks_with_count_and_day_and_time", {
            count,
            day,
            time,
          })
        : i18n.t("components.every_weeks_with_count_and_time", {
            count,
            time,
          })
      : repeat_day
      ? i18n.t("components.every_week_with_day_and_time", { time, day })
      : i18n.t("components.every_week_with_time", { time });
  }
  if (mode === "month") {
    const time = monthly.time.format("HH:mm");
    const count = monthly.step || 0;
    const day = monthly.days.join(mark);
    const repeat_day = monthly.days.length > 0;
    return count > 1
      ? repeat_day
        ? i18n.t("components.every_months_with_count_and_day_and_time", {
            count,
            time,
            day,
          })
        : i18n.t("components.every_months_with_count_and_time", { count, time })
      : repeat_day
      ? i18n.t("components.every_month_with_day_and_time", { day, time })
      : i18n.t("components.every_month_with_time", { time });
  }
};

type CronMode = "day" | "week" | "month";

const Mode: React.FC<{
  mode: CronMode;
  setMode: React.Dispatch<React.SetStateAction<CronMode>>;
}> = ({ mode, setMode }) => {
  const { t } = useParrotTranslation();
  return (
    <div className={ModeTabs}>
      <Button
        className={cx(mode === "day" && "active")}
        type="link"
        onClick={() => setMode("day")}
      >
        {t("components.as_day")}
      </Button>
      <Button
        className={cx(mode === "week" && "active")}
        type="link"
        onClick={() => setMode("week")}
      >
        {t("components.as_week")}
      </Button>
      <Button
        className={cx(mode === "month" && "active")}
        type="link"
        onClick={() => setMode("month")}
      >
        {t("components.as_month")}
      </Button>
    </div>
  );
};

type DailyState = {
  step: number;
  time: moment.Moment;
};
const Daily: React.FC<{
  daily: DailyState;
  setDaily: React.Dispatch<React.SetStateAction<DailyState>>;
}> = ({ daily, setDaily }) => {
  return (
    <div className={Wrapper}>
      <ParrotTrans i18nKey={"components.day_execute_task"} count={daily.step}>
        <Fields.Int
          meta={{}}
          input={{
            value: daily.step,
            onChange: (value) => {
              setDaily({
                ...daily,
                step: value,
              });
            },
            name: "daily-step",
            onBlur() {},
            onFocus() {},
            maxLength: 3,
          }}
        />
        <TimePicker
          format="HH:mm"
          value={daily.time}
          onChange={(value) => {
            if (value) {
              setDaily({ ...daily, time: value });
            }
          }}
          clearIcon={null}
          suffixIcon={null}
        />
      </ParrotTrans>
    </div>
  );
};

type WeeklyState = {
  step: number;
  days: number[];
  time: moment.Moment;
};
const WEEK_DAYS = (
  t: UseTranslationResponse<"translation", undefined>["t"],
) => [
  { value: 1, text: t("common.monday") },
  { value: 2, text: t("common.tuesday") },
  { value: 3, text: t("common.wednesday") },
  { value: 4, text: t("common.thursday") },
  { value: 5, text: t("common.friday") },
  { value: 6, text: t("common.saturday") },
  { value: 0, text: t("common.sunday") },
];

// 每周一，二，三，四，五
const WEEK_DAYS_MAP = (
  t: UseTranslationResponse<"translation", undefined>["t"],
) =>
  WEEK_DAYS(t).reduce<Record<number, string>>((prev, cur) => {
    prev[cur.value] = cur.text[1];
    return prev;
  }, {});
// every monday, tuesday, wednesday, thursday
const EN_WEEK_DAYS_MAP = (
  t: UseTranslationResponse<"translation", undefined>["t"],
) =>
  WEEK_DAYS(t).reduce<Record<number, string>>((prev, cur) => {
    prev[cur.value] = cur.text;
    return prev;
  }, {});
const Weekly: React.FC<{
  weekly: WeeklyState;
  setWeekly: React.Dispatch<React.SetStateAction<WeeklyState>>;
}> = ({ weekly, setWeekly }) => {
  const { t, i18n } = useParrotTranslation();
  const week_days = useMemo(() => WEEK_DAYS(t), [t]);

  return (
    <div className={Wrapper}>
      <ParrotTrans
        i18nKey={"components.week_with_below_date"}
        count={weekly.step}
        values={{
          day: t("components.day_date", { count: weekly.days.length }),
        }}
      >
        <Fields.Int
          meta={{}}
          input={{
            value: weekly.step,
            onChange: (value) => {
              setWeekly({
                ...weekly,
                step: value,
              });
            },
            name: "weekly-step",
            onBlur() {},
            onFocus() {},
            maxLength: 3,
          }}
        />
      </ParrotTrans>
      <div className="options">
        {week_days.map((d) => {
          const active = weekly.days.includes(d.value);
          return (
            <Button
              className={cx(
                "week-day-option",
                active && "active",
                i18n.language === ParrotLngs.en && "en-text",
              )}
              type="default"
              key={d.value}
              onClick={() =>
                setWeekly({
                  ...weekly,
                  days: active
                    ? weekly.days.filter((day) => day !== d.value)
                    : weekly.days.concat(d.value).sort((a, b) => a - b),
                })
              }
            >
              {d.text}
            </Button>
          );
        })}
      </div>
      {t("components.execution_time")}
      <TimePicker
        style={{ marginLeft: 0 }}
        format="HH:mm"
        value={weekly.time}
        onChange={(value) => {
          if (value) {
            setWeekly({ ...weekly, time: value });
          }
        }}
        clearIcon={null}
        suffixIcon={null}
      />
    </div>
  );
};

type MonthlyState = WeeklyState;
const MONTH_DAYS = _.range(1, 32);
const Monthly: React.FC<{
  monthly: MonthlyState;
  setMonthly: React.Dispatch<React.SetStateAction<MonthlyState>>;
}> = ({ monthly, setMonthly }) => {
  const mayNotExistDays = _.intersection(monthly.days, [29, 30, 31]);
  const { t, i18n } = useParrotTranslation();
  const mark = i18n.language === ParrotLngs.en ? " , " : "、";
  return (
    <div className={Wrapper}>
      <ParrotTrans
        i18nKey={"components.month_with_below_date"}
        count={monthly.step}
        values={{
          day: t("components.day_date", { count: monthly.days.length }),
        }}
      >
        <Fields.Int
          meta={{}}
          input={{
            value: monthly.step,
            onChange: (value) => {
              setMonthly({
                ...monthly,
                step: value,
              });
            },
            name: "monthly-step",
            onBlur() {},
            onFocus() {},
            maxLength: 3,
          }}
        />
      </ParrotTrans>
      <div className="options">
        {MONTH_DAYS.map((d) => {
          const active = monthly.days.includes(d);
          return (
            <Button
              className={cx("month-day-option", active && "active")}
              type="default"
              key={d}
              onClick={() =>
                setMonthly({
                  ...monthly,
                  days: active
                    ? monthly.days.filter((day) => day !== d)
                    : monthly.days.concat(d).sort((a, b) => a - b),
                })
              }
            >
              {d}
            </Button>
          );
        })}
        {mayNotExistDays.length > 0 && (
          <span className={cx("help", Typo.Label.l4_regular)}>
            {t("components.will_excute_at_last_day_with_date", {
              date: `${mayNotExistDays.join(mark)}  `,
            })}
          </span>
        )}
      </div>
      {t("components.execution_time")}
      <TimePicker
        style={{ marginLeft: 0 }}
        format="HH:mm"
        value={monthly.time}
        onChange={(value) => {
          if (value) {
            setMonthly({ ...monthly, time: value });
          }
        }}
        clearIcon={null}
        suffixIcon={null}
      />
    </div>
  );
};

const CronPlan: React.FC<CronPlanProps> = (props) => {
  const { value, onChange, onRemove } = props;
  const { t, i18n } = useParrotTranslation();

  const cronTime = useMemo(() => {
    return new CronTime(value.expression, value.startAt);
  }, [value]);
  const sendAtDate = useMemo(() => cronTime.sendAt(), [cronTime]);

  const changeValue = (newValue: Partial<CronPlanState>) => {
    onChange({
      ...value,
      ...newValue,
    });
  };

  const [mode, setMode] = useState<CronMode>(
    getMode(cronTime["source"] as string),
  );

  const source = cronTime["source"] as string;
  const [, , , day, month] = source.split(" ");
  const time = getTime(cronTime);
  const [daily, setDaily] = useState<DailyState>(() => {
    const rawDaily = getDaily(mode, source, time);
    return {
      ...rawDaily,
      time: moment(rawDaily.time.format()),
    };
  });
  const [weekly, setWeekly] = useState<WeeklyState>(() => {
    const rawWeekly = getWeekly(mode, source, time);
    return {
      ...rawWeekly,
      time: moment(rawWeekly.time.format()),
    };
  });
  const [monthly, setMonthly] = useState<MonthlyState>(() => {
    const rawMonthly = getMonthly(mode, month, day, time);
    return {
      ...rawMonthly,
      time: moment(rawMonthly.time.format()),
    };
  });

  useEffect(() => {
    let newExpression = "";
    let empty = false;
    switch (mode) {
      case "day":
        newExpression = toDailyString(daily.step, dayjs(daily.time.format()));
        break;
      case "week":
        newExpression = toWeeklyString(
          weekly.step,
          dayjs(weekly.time.format()),
          weekly.days,
        );
        if (weekly.days.length === 0) {
          empty = true;
        }
        break;
      case "month":
        newExpression = toMonthlyString(
          monthly.step,
          dayjs(monthly.time.format()),
          monthly.days,
        );
        if (monthly.days.length === 0) {
          empty = true;
        }
        break;
      default:
        break;
    }
    if (newExpression === value.expression) {
      return;
    }
    changeValue({
      expression: newExpression,
      empty,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, daily, weekly, monthly]);

  const title = stringifyPlan(mode, daily, weekly, monthly, i18n);
  return (
    <AccordionCard
      className={CronPlanWrapper}
      header={
        <div className={CronPlanHeader}>
          <div className="left">
            <ClockIcon />
            <span className={cx(Typo.Label.l2_regular, "title")} title={title}>
              {title}
            </span>
            <span className={cx(Typo.Label.l4_regular, "retain")}>
              {t("components.retain_with_count", { count: value.retain || 1 })}
            </span>
          </div>
          <div className="right" onClick={(e) => e.stopPropagation()}>
            <span className="reverse">
              <Switch
                checked={value.enabled}
                onChange={(v) =>
                  changeValue({
                    enabled: v,
                  })
                }
              >
                {value.enabled ? t("common.enable") : t("common.disable")}
              </Switch>
            </span>
            <span className="close" onClick={onRemove}>
              <CloseIcon />
            </span>
          </div>
        </div>
      }
      expand={
        <>
          <Mode mode={mode} setMode={setMode} />
          {mode === "day" && <Daily daily={daily} setDaily={setDaily} />}
          {mode === "week" && <Weekly weekly={weekly} setWeekly={setWeekly} />}
          {mode === "month" && (
            <Monthly monthly={monthly} setMonthly={setMonthly} />
          )}
          <div className="field-item">
            <label className={Typo.Label.l3_regular_title}>
              {t("components.start_date")}
            </label>
            <div className="field">
              <DatePicker
                format="YYYY/M/DD"
                value={moment(value.startAt.toISOString())}
                onChange={(value) => {
                  if (value) {
                    changeValue({
                      startAt: dayjs(value.toISOString()),
                    });
                  }
                }}
                suffixIcon={null}
                clearIcon={null}
              />
              <div className={cx("help", Typo.Footnote.f2_regular)}>
                {/* TODO pass the description via props and remove this */}
                {t("components.next_generate_with_date", {
                  date: sendAtDate.format("YYYY/M/DD HH:mm"),
                  interpolation: {
                    escapeValue: false,
                  },
                })}
              </div>
            </div>
          </div>
          <div className="field-item">
            <label className={Typo.Label.l3_regular_title}>
              {t("components.retain_date")}
            </label>
            <div className="field">
              <Fields.Int
                suffix={t("components.count")}
                meta={{}}
                input={{
                  value: value.retain,
                  onChange: (v) =>
                    changeValue({
                      retain: v,
                    }),
                  onBlur() {},
                  onFocus() {},
                  name: "retain",
                  maxLength: 2,
                }}
              />
              <div className={cx("help", Typo.Footnote.f2_regular)}>
                {/* TODO pass the description via props and remove this */}
                {t("components.will_save_one_to_thirty_report")}
              </div>
            </div>
          </div>
        </>
      }
    />
  );
};

export default CronPlan;

export * from "./cronPlan.type";
