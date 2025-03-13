import { Dayjs } from "dayjs";

export type MonthAndDate = {
  month: number;
  dates: number[];
  firstDateOfDay: number;
};

export type PickerDateRange = [Dayjs | null, Dayjs | null];
export type InputTimeValue = [string, string, string];

export type CalendarProps = {
  range?: PickerDateRange;
  minDate?: string | Dayjs | undefined;
  maxDate?: string | Dayjs | undefined;
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
  onChange: (range: PickerDateRange) => void;
  onOk: (range: PickerDateRange) => void;
};

export type RelativeTimeProps = {
  config?: PastTime[];
  value?: PastTime;
  search?: boolean;
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
  history?: {
    scope: string;
    dateRangeHistories: DateRangeHistories;
    setDateRangeHistory: SetValue<DateRangeHistories>;
  };
  mode?: ("relative" | "absolute")[] | "relative" | "absolute" | undefined;
  // only support if type is absolute
  minDate?: string | Dayjs | undefined;
  maxDate?: string | Dayjs | undefined;

  onChange?: (
    type: "relative" | "absolute",
    time: DateRangePickerValue,
    range: PickerDateRange,
  ) => void;
  relativeTimeOptionConfig?: PastTime[];
};

export type PastTime = {
  unit: "h" | "m" | "d" | "mo";
  value: number;
  disabled?: boolean;
};
