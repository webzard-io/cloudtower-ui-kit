import { CalendarComponentType } from "@src/spec";
import { Calendar as AntdCalendar } from "antd";
import React from "react";
const Calendar: CalendarComponentType = (props) => <AntdCalendar {...props} />;

export default Calendar;
