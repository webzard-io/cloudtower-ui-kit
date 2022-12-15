import {
  Maybe,
  MetricLabel,
  MetricStream,
  MetricUnit,
} from "@cloudtower/eagle/generated/react-hooks";
import { TFunction } from "i18next";

export type FormatName = (params: {
  type: string | undefined;
  data: IMetricData;
  service?: Maybe<string>;
  metricName: string;
  t: TFunction;
  streams: MetricStream[];
  dIndex: number;
}) => string;

export interface IMetricData {
  id: string;
}

export interface IDataPoint {
  __typename?: "DataPoint";
  t: number;
  unit?: MetricUnit;
  v?: number;
  [key: DataPointValueKey]: number | undefined;
}

type DataPointValueKey = `v${number}`;

export interface ILegend {
  id: string;
  name: string;
  bgColor?: string;
}

export interface IMetricStream {
  __typename?: "MetricStream";
  labels: MetricLabel;
  points: IDataPoint[];
  legend: ILegend;
}

export interface IMetric {
  sample_streams: IMetricStream[];
  unit: MetricUnit;
  step: number;
  dropped: boolean;
  __typename: string;
}

export type IExportCSVDataType = {
  labelName: string;
  pointData: IDataPoint[];
  unit?: MetricUnit;
};
