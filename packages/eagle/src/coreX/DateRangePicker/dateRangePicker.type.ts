import { Dayjs } from "dayjs";

export type MonthAndDate = {
  month: number;
  dates: number[];
  firstDateOfDay: number;
};

export type RelativeTimeDirection = "past" | "future";

export type PickerDateRange = [Dayjs | null, Dayjs | null];
export type InputTimeValue = [string, string, string];

export type CalendarProps = {
  range?: PickerDateRange;
  minDate?: string | Dayjs | undefined;
  maxDate?: string | Dayjs | undefined;
  maxRange?: string;
  onChange?: (range: PickerDateRange) => void;
};

export type InputTimeProps = {
  className?: string;
  value?: InputTimeValue;
  danger?: boolean;
  error?: React.ReactNode;
  onChange?: (time: InputTimeValue) => void;
  onBlur?: (time: InputTimeValue) => void;
};

export type AbsoluteTimeProps = {
  range: PickerDateRange;
  minDate?: string | Dayjs | undefined;
  maxDate?: string | Dayjs | undefined;
  maxRange?: string;
  onChange: (range: PickerDateRange) => void;
  onOk: (range: PickerDateRange) => void;
};

export type RelativeTimeProps = {
  config?: PastTime[];
  value?: PastTime;
  search?: boolean;
  type?: RelativeTimeDirection;
  onChange: (config: PastTime) => void;
};

export type DateRangePickerValue = Omit<PastTime, "disabled"> | PickerDateRange;

export type SetValue<T> = (obj: T | ((val: T) => T)) => void;

export type DateRangeHistory = {
  type: "relative" | "absolute";
  timestamp: number;
  value: PastTime | string[];
}[];

export type DateRangeHistories = {
  [key: string]: DateRangeHistory | null | undefined;
};

export type DateRangePickerProps = {
  size?: "large" | "medium";
  value?: Omit<PastTime, "disabled"> | PickerDateRange;
  type?: RelativeTimeDirection;
  history?: {
    scope: string;
    dateRangeHistories: DateRangeHistories;
    setDateRangeHistory: SetValue<DateRangeHistories>;
  };
  mode?: ("relative" | "absolute")[] | "relative" | "absolute" | undefined;
  // only support if type is absolute
  minDate?: string | Dayjs | undefined;
  maxDate?: string | Dayjs | undefined;
  /**
   * The maximum range of the absolute time range selected by the user
   * the maxRange only limit the date selection, not the time selection
   * example: 1d, 1w, 1m, 1y
   */
  maxRange?: string;
  onChange?: (
    type: "relative" | "absolute",
    time: DateRangePickerValue,
    range: PickerDateRange,
  ) => void;
  onAbsoluteTimeChange?: (range: PickerDateRange) => void;
  /**
   * Customize an array of relative time select options
   */
  relativeTimeSelectOptions?: PastTime[];
};

export type PastTime = {
  unit: "h" | "m" | "d" | "M" | "y";
  value: number;
  type?: RelativeTimeDirection;
  disabled?: boolean;
};
