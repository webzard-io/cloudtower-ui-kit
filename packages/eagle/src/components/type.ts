import {
  Maybe,
  Metric,
  MetricStream,
} from "@cloudtower/eagle/generated/react-hooks";
import { TFunction } from "i18next";

export type FormatName<MetricData extends { id: string }> = (params: {
  type: string | undefined;
  data: MetricData;
  service?: Maybe<string>;
  metricName: string;
  t: TFunction;
  sample_streams: MetricStream[];
  dIndex: number;
}) => string;

export interface IMetricsQuery {
  metrics: Metric;
}
