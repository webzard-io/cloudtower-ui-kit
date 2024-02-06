import { CalendarProps } from "antd/lib/calendar/generateCalendar";
import type { Moment } from "moment";

export type CalendarComponentType = React.FC<CalendarProps<Moment>>;
