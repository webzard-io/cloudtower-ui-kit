import { Calendar as AntdCalendar } from "antd";
import React from "react";

import { CalendarComponentType } from "./calendar.type";

const Calendar: CalendarComponentType = (props) => <AntdCalendar {...props} />;

export default Calendar;

export * from "./calendar.type";
