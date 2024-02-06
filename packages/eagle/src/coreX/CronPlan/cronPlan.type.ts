import type { Dayjs } from "dayjs";

export type CronPlanState = {
  expression: string;
  retain: number;
  startAt: Dayjs;
  enabled: boolean;
  empty: boolean;
};

export type CronPlanProps = {
  value: CronPlanState;
  onChange: (value: CronPlanState) => unknown;
  onRemove?: () => void;
};
