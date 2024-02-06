import type { Dayjs } from "dayjs";

export type CronCalendarProps = {
  plans: {
    expression: string;
    startAt: Dayjs;
    empty: boolean;
  }[];
};
