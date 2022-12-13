import { Maybe, MetricStream } from "@cloudtower/eagle/generated/react-hooks";
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
