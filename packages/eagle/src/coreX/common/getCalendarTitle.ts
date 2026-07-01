import { ParrotLngs } from "@cloudtower/parrot";
import { i18n, TFunction } from "i18next";

const MonthText: Record<string, string> = {
  "1": "January",
  "2": "February",
  "3": "March",
  "4": "April",
  "5": "May",
  "6": "June",
  "7": "July",
  "8": "August",
  "9": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};
export function getCalendarTitle(month: string, t: TFunction, i18n: i18n) {
  if (i18n.language === ParrotLngs.zh) {
    return `${month} ${t("common.month")}`;
  }
  if (i18n.language === ParrotLngs.ja) {
    return new Intl.DateTimeFormat("ja-JP", { month: "long" }).format(
      new Date(2020, Number(month) - 1),
    );
  }
  return MonthText[month];
}
