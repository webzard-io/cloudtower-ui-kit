import {
  ClusterType,
  DataPoint,
  GraphType,
  Hypervisor,
  Maybe,
  MetricLabelInput,
  MetricUnit,
} from "@cloudtower/eagle/generated/react-hooks";
import { DateRange, useHistory } from "@cloudtower/eagle/kit/specify";
import { css, cx } from "@linaria/core";
import { styled } from "@linaria/react";
import { getMetricQueryType, MetricLabels, parseLabel } from "@tower/utils";
import cs from "classnames";
import { t } from "i18next";
import React, { useMemo, useState } from "react";
import { Trans } from "react-i18next";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";

import { Typo } from "../styles";
import Actions from "./Actions";
import {
  findMaxAndCurrent,
  formatStreams,
  getColor,
  getStep,
  getXAxisDomain,
  getYAxisDomain,
  IClusterBasicQuery,
  tickFormatter,
  transformData,
  xaxisCal,
  yAxisFomatter,
} from "./metric";
import MetricLegend, {
  GetDeselectedValueWithSuffix,
  LegendComponent,
} from "./MetricLegend";
import TooltipFormatter from "./TooltipFormatter";
import { FormatName, IMetricsQuery } from "./type";

const MetricPlaceholderWrapper = styled.div`
  color: $text-light-secondary;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  .link {
    color: $text-light-general;
    cursor: pointer;
  }
`;

const MetricLegendTabStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .name-toolbar {
    width: 100%;
    display: flex;
    line-height: 30px;
    padding: 0 16px;
    justify-content: space-between;
    .metric-extra {
      display: flex;
      font-size: 12px;
      align-items: center;

      .info-item {
        color: $gray-60;
      }
      .info-item + .info-item {
        margin-left: 10px;
      }

      .menu-trigger {
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }

  .content {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .single-content {
    height: 65px;
  }
`;

type exportCSVDataType = {
  labelName: string;
  pointData: DataPoint[];
  unit?: MetricUnit;
};

export interface IChartProps<MetricData extends { id: string }> {
  metric: string;
  labels?: MetricLabelInput;
  clusterId: string;
  yAxisAlign?: "left" | "right";
  showXaxis?: boolean;
  showLegend?: boolean;
  showMenu?: boolean;
  uuid: string;
  height: number;
  range: string;
  type: GraphType;
  mode?: "simple" | "legend" | "single";
  service?: Maybe<string>;
  resourceType?: Maybe<string>;
  averageLine?: boolean;
  dropdown?: React.ReactNode;
  onChartDataChange?: (data: Array<exportCSVDataType>) => void;
  dateRange?: DateRange;
  formatLegendItemName: FormatName<MetricData>;
  getDeselectedValueWithSuffix: GetDeselectedValueWithSuffix<MetricData>;
  hidePointer?: CategoricalChartFunc;
  handleMouseMove?: CategoricalChartFunc;
  onLabelsChange?: (labels: string[]) => void;
  metricLegendData: MetricData[];
  data: IMetricsQuery;
  topkData: IMetricsQuery;
  clusterData: IClusterBasicQuery;
  getColorsByMetric: (metric: string) => string;
  metricColors: string[];
}

const RenderChart = <MetricData extends { id: string }>(
  props: IChartProps<MetricData>
) => {
  const {
    metric,
    showLegend,
    showMenu,
    uuid,
    showXaxis,
    yAxisAlign,
    height,
    range,
    type,
    mode = "legend",
    service,
    averageLine = false,
    dropdown,
    resourceType,
    dateRange,
    formatLegendItemName,
    getDeselectedValueWithSuffix,
    hidePointer,
    handleMouseMove,
    onLabelsChange,
    metricLegendData,
    data,
    topkData,
    clusterData,
    getColorsByMetric,
    metricColors,
  } = props;

  const history = useHistory();

  const isLegend = mode === "legend";

  const metricType = getMetricQueryType(metric, resourceType || "");

  const sample_streams = useMemo(
    () =>
      formatStreams({
        topkData,
        metricData: data,
        dateRange,
      }),
    [topkData, data, dateRange]
  );

  const [deselected, setDeselected] = useState<string[]>([]);

  if (data.metrics.dropped) {
    return (
      <MetricPlaceholderWrapper className={Typo.Label.l4_regular}>
        <p>{t("metric.no_application_monitor_desc_1")}</p>
        <p>
          <Trans i18nKey="metric.no_application_monitor_desc_2">
            <span className={Typo.Label.l4_bold}></span>
            <span
              className={cx(Typo.Label.l4_bold, "link")}
              onClick={() => history.push("/settings/advance-monitor")}
            ></span>
          </Trans>
        </p>
      </MetricPlaceholderWrapper>
    );
  }

  if (
    !data ||
    !data.metrics.sample_streams?.length ||
    !sample_streams?.length ||
    sample_streams.every((stream) => !stream.points?.length)
  ) {
    return (
      <div className={MetricLegendTabStyle}>
        <div className="name-toolbar">
          {isLegend && clusterData?.cluster ? (
            <MetricLegend
              data={metricLegendData}
              sample_streams={sample_streams || []}
              metricName={metric}
              deselected={[]}
              service={service}
              resourceType={resourceType}
              onClick={() => {}}
              formatLegendItemName={formatLegendItemName}
              getDeselectedValueWithSuffix={getDeselectedValueWithSuffix}
              metricColors={metricColors}
            />
          ) : mode !== "single" ? (
            <LegendComponent
              metric={metric}
              getColorsByMetric={getColorsByMetric}
            />
          ) : undefined}
        </div>
        <div className={cs("content", mode === "single" && "single-content")}>
          {t("metric.empty")}
        </div>
      </div>
    );
  }

  const { unit } = data.metrics;

  /**
   * TODO: unify this step logic in UI and server
   */
  const step = range === "2h" ? data.metrics.step : getStep(range, metric);

  const yAxisTickFormatter = yAxisFomatter(unit);
  const points = data.metrics.sample_streams
    .find((stream) => !!stream.points?.length)!
    .points!.map(({ t, v }) => ({
      t,
      v,
      unit,
    }));

  let deselectedIndex: number[] = [];
  if (deselected.length) {
    deselectedIndex = sample_streams.reduce((prev, cur, index) => {
      const labels = parseLabel(
        { __name__: metric, ...cur.labels } as MetricLabels,
        clusterData!.cluster as {
          local_id?: string;
          type: ClusterType;
          hypervisor?: Maybe<Hypervisor>;
        },
        resourceType || ""
      )?.labels;

      if (!labels) {
        return prev;
      }

      if (metric.includes("_read_write_") && cur.labels.metric_name) {
        const suffix = cur.labels.metric_name.includes("_write_")
          ? "-write"
          : "-read";
        let _id: string | undefined;
        if (metricType === "zbs_chunk") {
          _id = labels.chunk_id;
        } else if (metricType === "scvm_disk" || metricType === "disk") {
          _id = labels.serial;
        } else {
          _id = labels.local_id;
        }
        if (deselected.includes(_id! + suffix)) {
          prev.push(index);
        }
        return prev;
      }

      if (
        metric.includes("_network_ping_packet") &&
        ["host", "scvm"].includes(metricType || "")
      ) {
        const _id = labels.local_id + "_" + (cur.labels.to_hostname || "");
        if (deselected.includes(_id)) {
          prev.push(index);
        }
        return prev;
      }

      if (metricType === "host_network") {
        if (deselected.includes(labels.nic_name! + labels.host_local_id!)) {
          prev.push(index);
        }
        return prev;
      }

      if (metricType === "vm_network") {
        if (deselected.includes(labels.nic_mac! + labels.vm_local_id!)) {
          prev.push(index);
        }
        return prev;
      }

      if (metric === "host_cpu_temperature_celsius") {
        if (deselected.includes(`${labels.local_id}Temp${index + 1}`)) {
          prev.push(index);
        }
        return prev;
      }

      if (metricType === "disk" || metricType === "scvm_disk") {
        if (deselected.includes(labels.device! + labels.host_local_id!)) {
          prev.push(index);
        }
        return prev;
      }

      if (metricType === "iscsi_lun" || metricType === "nvmf_namespace") {
        if (deselected.includes(labels.zbs_volume_id! + labels.instance!)) {
          prev.push(index);
        }
        return prev;
      }

      if (
        Object.values(labels || {}).some((r) =>
          deselected.includes(r as string)
        )
      ) {
        prev.push(index);
      }
      return prev;
    }, [] as number[]);
  }

  const areaChartData = transformData(
    sample_streams,
    range,
    unit,
    step,
    averageLine,
    dateRange
  );

  const xAxisDomain = getXAxisDomain(areaChartData, points, range, dateRange);

  let info = { current: "-", max: "-" };
  if (data?.metrics.sample_streams?.length) {
    info = findMaxAndCurrent(areaChartData, data.metrics.unit);
  }

  const yDomain = getYAxisDomain(areaChartData, type, unit);

  return (
    <>
      <div className="metric-toolbar">
        {showLegend &&
          (isLegend &&
          clusterData?.cluster &&
          data.metrics.sample_streams.length > 0 ? (
            <MetricLegend
              sample_streams={sample_streams}
              metricName={metric}
              deselected={deselected}
              service={service}
              resourceType={resourceType}
              onClick={(id) => {
                setDeselected((prev) => {
                  const include = prev.includes(id);
                  const newDeselected = include
                    ? prev.filter((r) => r !== id)
                    : [...prev, id];
                  return newDeselected.length >=
                    data.metrics.sample_streams!.length
                    ? prev
                    : newDeselected;
                });
              }}
              onLabelsChange={onLabelsChange}
              formatLegendItemName={formatLegendItemName}
              getDeselectedValueWithSuffix={getDeselectedValueWithSuffix}
              data={metricLegendData}
              metricColors={metricColors}
            />
          ) : (
            <LegendComponent
              metric={metric}
              onLabelsChange={onLabelsChange}
              getColorsByMetric={getColorsByMetric}
            />
          ))}
        {showMenu && <Actions info={info} dropdown={dropdown} />}
      </div>
      <ResponsiveContainer height={height}>
        <AreaChart
          style={{ backgroundColor: "white" }}
          margin={
            showLegend
              ? { top: 10, left: 10, right: 10, bottom: 0 }
              : { top: 20, left: 10, right: 10, bottom: 5 }
          }
          data={areaChartData}
          syncId={uuid}
          onMouseLeave={hidePointer}
          onMouseMove={handleMouseMove}
        >
          <XAxis
            hide={!showXaxis}
            dataKey="t"
            axisLine={false}
            tickLine={false}
            type="number"
            domain={xAxisDomain}
            tickFormatter={(tick: number) =>
              tickFormatter(tick, range, dateRange)
            }
            ticks={xaxisCal(xAxisDomain[1], range, dateRange)}
          />
          <Tooltip
            active
            wrapperStyle={{ zIndex: 1000 }}
            isAnimationActive={false}
            content={
              <TooltipFormatter
                uuid={uuid}
                deselectedIndex={deselectedIndex}
                isLegend={isLegend}
                metric={metric}
                getColorsByMetric={getColorsByMetric}
              />
            }
          />
          {sample_streams.map((item, index) => {
            if (deselectedIndex.includes(index)) {
              return null;
            }

            const { stroke, fill } = getColor({
              type,
              isLegend,
              index,
              metric,
              getColorsByMetric,
              metricColors,
            });
            return (
              <Area
                key={index}
                dataKey={sample_streams?.length === 1 ? "v" : `v${index}`}
                stackId={type === GraphType.Stack ? "stack" : undefined}
                stroke={stroke}
                fill={fill}
                isAnimationActive={false}
                activeDot={{
                  stroke,
                  r: 4,
                  strokeWidth: 2,
                  fill: "white",
                }}
              />
            );
          })}
          {averageLine && sample_streams.length === 1 && (
            <Area
              dataKey="average"
              stroke={
                getColor({
                  type,
                  isLegend,
                  index: 0,
                  metric,
                  getColorsByMetric,
                  metricColors,
                }).stroke
              }
              strokeWidth="2"
              strokeOpacity="0.5"
              fill="none"
              isAnimationActive={false}
              activeDot={false}
            />
          )}
          <YAxis
            width={200}
            mirror
            allowDataOverflow
            axisLine={false}
            tickLine={false}
            domain={yDomain}
            ticks={[0, yDomain[1] / 2, yDomain[1]]}
            tickFormatter={yAxisTickFormatter}
            orientation={yAxisAlign}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default RenderChart;
