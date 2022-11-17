import {
  ClusterType,
  Maybe,
  Metric,
  MetricStream,
} from "@tower/utils/lib/generated/types";
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

export interface IMetricData {
  id: string;
  local_id: string;
  serial: string;
  name: string;
  chunk_id: string;
  zbs_volume_id: string;
  type: ClusterType;
  scvm_name: string;
  host: {
    id: string;
    local_id: string;
    name: string;
    scvm_name: string;
  };
  cpu: string;
  is_preferred: boolean;
  mac_address: string;
  vm: { name: string; local_id: string };
}

export interface IMetricsQuery {
  metrics: Metric;
}
