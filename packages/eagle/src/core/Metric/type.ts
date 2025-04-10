import { Dayjs } from "dayjs";

export interface IMetricData {
  id: string;
}

export interface IDataPoint {
  t: number;
  v?: number;
  [key: DataPointValueKey]: number | undefined;
}

type DataPointValueKey = `v${number}`;

export interface ILegend {
  id: string;
  name: string;
  color?: string;
  fill?: string;
  stroke?: boolean;
}

export interface IMetricStream {
  points: IDataPoint[];
  legend: ILegend;
  step: number;
  tolerance: number;
}

export interface IMetric {
  sample_streams: IMetricStream[];
  unit: string;
  dropped: boolean;
}

export enum TimeUnit {
  Day = "DAY",
  Hour = "HOUR",
  Month = "MONTH",
}

export enum GraphType {
  Area = "AREA",
  Stack = "STACK",
}

export type DateRange = [Dayjs, Dayjs];
