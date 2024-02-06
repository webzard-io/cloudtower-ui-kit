import { css } from "@linaria/core";
import classNames from "classnames";
import dayjs from "dayjs";
import React from "react";

import { ITimeProps } from "./time.type";

const timeWrapper = css`
  .date {
    margin-right: 4px;
  }
`;

const Time = (props: ITimeProps) => {
  const {
    className,
    date,
    dateTemplate = "YYYY-MM-DD",
    timeTemplate = "HH:mm",
    plainText,
  } = props;
  if (!date) return <>-</>;
  const time = dayjs(date);
  if (plainText) {
    return (
      <>
        {dateTemplate !== null && time.format(dateTemplate)}{" "}
        {timeTemplate !== null && time.format(timeTemplate)}
      </>
    );
  }
  return (
    <span className={classNames("time-wrapper", timeWrapper, className)}>
      {dateTemplate !== null && (
        <span className="date">{time.format(dateTemplate)}</span>
      )}
      {timeTemplate !== null && (
        <span className="time">{time.format(timeTemplate)}</span>
      )}
    </span>
  );
};

export default Time;

export * from "./time.type";
