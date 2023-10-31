import React from "react";
import dayjs from "dayjs";
import { ITimeProps } from "../../spec";

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
    <span className={`time-wrapper ${className || ""}`}>
      {dateTemplate !== null && (
        <span className="date"> {time.format(dateTemplate)}</span>
      )}
      {timeTemplate !== null && (
        <span className="time"> {time.format(timeTemplate)}</span>
      )}
    </span>
  );
};

export default Time;
