import type { Dayjs } from "dayjs";

/**
 * @param date - the date of the month
 * @param weekStartOnMonday - if true, the first day of the week is monday, otherwise it is sunday
 * @returns the first day's Date of weeks
 */
export const getFirstDateOfMonth = (
  date: Dayjs,
  weekStartOnMonday: boolean = true,
) => (date.set("date", 1).day() - Number(weekStartOnMonday) + 7) % 7;
