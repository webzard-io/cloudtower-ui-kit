import {
  Maybe,
  Metric,
  MetricStream,
} from "@cloudtower/eagle/generated/react-hooks";
import { TFunction } from "i18next";

export type FormatName = (params: {
  type: string | undefined;
  data: IMetricData;
  service?: Maybe<string>;
  metricName: string;
  t: TFunction;
  sample_streams: MetricStream[];
  dIndex: number;
}) => string;

export interface IMetricsQuery {
  metrics: Metric;
}

export interface IMetricData {
  id: string;
}
