import { Dayjs } from "dayjs";

export interface IMetricData {
  id: string;
}

export interface IDataPoint {
  t: number;
  unit?: string;
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
}

export interface IMetric {
  sample_streams: IMetricStream[];
  unit: string;
  dropped: boolean;
}

export type IExportCSVDataType = {
  labelName: string;
  pointData: IDataPoint[];
  unit?: string;
};

export enum TimeUnit {
  Day = "DAY",
  Hour = "HOUR",
  Month = "MONTH",
}

// export enum MetricUnit {
//   Count = "COUNT",
//   DataRateBit = "DATA_RATE_BIT",
//   DataRateByte = "DATA_RATE_BYTE",
//   DataSize = "DATA_SIZE",
//   Frequency = "FREQUENCY",
//   Load = "LOAD",
//   Percent = "PERCENT",
//   Ratio = "RATIO",
//   Temperature = "TEMPERATURE",
//   Time = "TIME",
// }

export enum GraphType {
  Area = "AREA",
  Stack = "STACK",
}

export type DateRange = [Dayjs, Dayjs];
