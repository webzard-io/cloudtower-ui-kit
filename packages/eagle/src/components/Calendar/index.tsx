import { Calendar as AntdCalendar } from "antd";
import React from "react";

import { CalendarComponentType } from "../../spec";

const Calendar: CalendarComponentType = (props) => <AntdCalendar {...props} />;

export default Calendar;
