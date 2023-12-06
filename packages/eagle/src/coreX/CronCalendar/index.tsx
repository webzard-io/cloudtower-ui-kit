import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { css, cx } from "linaria";
import moment from "moment";
import React, { useMemo, useState } from "react";

import Calendar from "../../components/Calendar";
import Tooltip from "../../components/Tooltip";
import { Typo } from "../../components/Typo";
import useParrotTranslation from "../../hooks/useParrotTranslation";
import { CronCalendarProps } from "../../spec";
import { CronTime } from "../../utils/cron-time";
import { getCalendarTitle } from "../common/getCalendarTitle";

const CronCalendarWrapper = css`
  width: 192px;
  height: 246px;
  border-radius: 4px;

  > .ant-picker-calendar,
  > .ant-picker-calendar .ant-picker-panel {
    width: 100%;
    background-color: rgba(245, 247, 250, 0.6);
    border-top: none;

    .ant-picker-body {
      padding: 0 16px;
    }

    .ant-picker-content {
      width: 100%;
      height: 180px;
      border-spacing: 0;

      thead {
        margin-bottom: 8px;
      }
      th {
        width: 22px;
      }
      td {
        padding: 0;
      }
    }
  }

  .ant-picker-cell {
    color: rgba(62, 70, 82, 0.6);
    opacity: 0.4;
  }
  .ant-picker-cell-in-view {
    color: rgba(62, 70, 82, 0.6);
    opacity: 1;
  }
  .ant-picker-cell-in-view > .active {
    color: #3e4652;
  }

  .ant-picker-cell::before {
    pointer-events: none;
  }
`;

const Title = css`
  color: rgba(129, 138, 153, 0.6);
  box-shadow: inset 0px -1px 0px rgba(213, 219, 227, 0.6);
  backdrop-filter: blur(10px);
  padding: 7px 10px;
`;

const Control = css`
  color: rgba(62, 70, 82, 0.6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;

  .anticon {
    cursor: pointer;
    &:hover {
      color: $blue;
    }
  }
`;

const Cell = css`
  text-align: center;

  .dots {
    display: flex;
    justify-content: center;
  }
  .dot {
    display: inline-block;
    width: 2px;
    height: 2px;
    border-radius: 1px;
    background: $blue;

    &:not(:last-child) {
      margin-right: 2px;
    }
  }
  .bar {
    width: 9px;
    height: 2px;
    background: $blue;
    border-radius: 2px;
  }
`;

const CronCalendar: React.FC<CronCalendarProps> = ({ plans }) => {
  const { t, i18n } = useParrotTranslation();
  const [value, setValue] = useState<moment.Moment>(moment());
  const days: dayjs.Dayjs[] = useMemo(() => {
    const sendAt: Array<dayjs.Dayjs> = [];
    const lastDayOfMonth = dayjs(value.valueOf()).endOf("month");

    for (const plan of plans) {
      if (plan.empty) {
        continue;
      }
      const cronTime = new CronTime(plan.expression, plan.startAt);

      let current = cronTime["getNextDateFromWithValidation"](dayjs());
      while (current.isBefore(lastDayOfMonth)) {
        sendAt.push(current);
        cronTime.setLastSendAt(current);
        current = cronTime["getNextDateFromWithValidation"](current);
      }
    }
    return sendAt;
  }, [value, plans]);

  return (
    <div className={CronCalendarWrapper}>
      <Calendar
        onChange={setValue}
        value={value}
        fullscreen={false}
        headerRender={({ value, onChange }) => (
          <>
            <div className={cx(Title, Typo.Label.l4_bold)}>
              {t("components.generate_date_preview")}
            </div>
            <div className={cx(Control, Typo.Label.l4_regular)}>
              <LeftOutlined
                onClick={() => onChange(value.clone().subtract(1, "month"))}
              />
              {t("components.date_with_year_and_month", {
                year: value.format("YYYY"),
                month: getCalendarTitle(value.format("M"), t, i18n),
                interpolation: {
                  escapeValue: false,
                },
              })}
              <RightOutlined
                onClick={() => onChange(value.clone().add(1, "month"))}
              />
            </div>
          </>
        )}
        dateFullCellRender={(date) => {
          const activeDays = days.filter((d) =>
            d.startOf("day").isSame(dayjs(date.valueOf()).startOf("day")),
          );
          return (
            <Tooltip
              title={
                activeDays.length === 0 ? null : activeDays.length === 1 ? (
                  // TODO pass the callback via props and remove this
                  t("components.will_generate_one_reporte_with_date_and_time", {
                    date: activeDays[0].format("YYYY/M/D"),
                    time: activeDays[0].format("HH:mm"),
                    interpolation: {
                      escapeValue: false,
                    },
                  })
                ) : (
                  <>
                    {/* TODO pass the callback via props and remove this */}
                    {t("components.will_generate_report_will_date_and_count", {
                      date: activeDays[0].format("YYYY/M/D"),
                      count: activeDays.length,
                      interpolation: {
                        escapeValue: false,
                      },
                    })}
                    <br />
                    {activeDays.map((d, idx) => (
                      <div key={idx}>
                        {d.format("HH:mm")}
                        <br />
                      </div>
                    ))}
                  </>
                )
              }
              placement="bottom"
            >
              <div
                className={cx(
                  Cell,
                  Typo.Label.l4_regular,
                  activeDays.length > 0 && "active",
                )}
                // https://stackoverflow.com/a/38265787
                title=""
              >
                {date.date()}
                <div className="dots">
                  {activeDays.length < 4 &&
                    activeDays.map((_, idx) => (
                      <span className="dot" key={idx} />
                    ))}
                  {activeDays.length >= 4 && <div className="bar" />}
                </div>
              </div>
            </Tooltip>
          );
        }}
      />
    </div>
  );
};

export default CronCalendar;
