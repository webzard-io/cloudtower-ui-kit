import {
  DataPoint,
  GraphType,
  Maybe,
  MetricUnit,
} from "@cloudtower/eagle/generated/react-hooks";
import { DateRange } from "@cloudtower/eagle/kit/specify";
import { parrotI18n } from "@cloudtower/parrot";
import cs from "classnames";
import React, { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";

import Actions from "./Actions";
import {
  findMaxAndCurrent,
  formatStreams,
  getColor,
  getXAxisDomain,
  getYAxisDomain,
  tickFormatter,
  transformData,
  xaxisCal,
  yAxisFomatter,
} from "./metric";
import MetricLegend, {
  GetDeselectedValueWithSuffix,
  LegendComponent,
} from "./MetricLegend";
import { MetricLegendTabStyle } from "./styled";
import TooltipFormatter from "./TooltipFormatter";
import { FormatName, IMetric, IMetricData } from "./type";

type exportCSVDataType = {
  labelName: string;
  pointData: DataPoint[];
  unit?: MetricUnit;
};

export interface IChartProps {
  metricName: string;
  yAxisAlign?: "left" | "right";
  showXAxis?: boolean;
  showLegend?: boolean;
  showMenu?: boolean;
  uuid: string;
  height: number;
  range: string;
  type: GraphType;
  mode?: "simple" | "legend" | "single";
  service?: Maybe<string>;
  averageLine?: boolean;
  dropdown?: React.ReactNode;
  onChartDataChange?: (data: Array<exportCSVDataType>) => void;
  dateRange?: DateRange;
  formatLegendItemName: FormatName;
  getDeselectedValueWithSuffix: GetDeselectedValueWithSuffix;
  hidePointer?: CategoricalChartFunc;
  handleMouseMove?: CategoricalChartFunc;
  onLabelsChange?: (labels: string[]) => void;
  metricLegendData: IMetricData[];
  getColorsByMetric: (metric: string) => string;
  metricColors: string[];
  metricType: string;
  deselectedIndex: number[];
  metric: IMetric;
  now?: number;
}

const RenderChart = (props: IChartProps) => {
  const {
    metricName,
    showLegend,
    showMenu,
    uuid,
    showXAxis,
    yAxisAlign,
    height,
    range,
    type,
    mode = "legend",
    service,
    dropdown,
    dateRange,
    formatLegendItemName,
    getDeselectedValueWithSuffix,
    hidePointer,
    handleMouseMove,
    onLabelsChange,
    metricLegendData,
    getColorsByMetric,
    metricColors,
    metricType,
    deselectedIndex,
    metric,
    now = Date.now(),
  } = props;

  const isLegend = mode === "legend";

  const [deselected, setDeselected] = useState<string[]>([]);

  const streams = useMemo(
    () => formatStreams({ metric, dateRange }),
    [dateRange, metric]
  );

  const areaChartData = useMemo(
    () =>
      transformData(streams, range, metric.unit, metric.step, dateRange, now),
    [dateRange, metric.step, metric.unit, now, range, streams]
  );

  const yDomain = useMemo(
    () => getYAxisDomain(areaChartData, type, metric.unit),
    [areaChartData, metric.unit, type]
  );

  const yAxisTickFormatter = useMemo(
    () => yAxisFomatter(metric.unit),
    [metric.unit]
  );

  const points = useMemo(
    () =>
      streams
        .find((stream) => stream.points != null && stream.points?.length !== 0)
        ?.points?.map(({ t, v }) => ({
          t,
          v,
          unit: metric.unit,
        })) ?? [],
    [metric.unit, streams]
  );

  const xAxisDomain = useMemo(
    () => getXAxisDomain(areaChartData, points, range, dateRange),
    [areaChartData, dateRange, points, range]
  );

  const info = useMemo(() => {
    let info = { current: "-", max: "-" };
    if (streams?.length) {
      info = findMaxAndCurrent(areaChartData, metric.unit);
    }
    return info;
  }, [areaChartData, metric.unit, streams?.length]);

  if (!streams?.length || streams.every((stream) => !stream.points?.length)) {
    return (
      <div className={MetricLegendTabStyle}>
        <div className="name-toolbar">
          {isLegend ? (
            <MetricLegend
              data={metricLegendData}
              streams={streams || []}
              metricName={metricName}
              deselected={[]}
              service={service}
              onClick={() => {}}
              formatLegendItemName={formatLegendItemName}
              getDeselectedValueWithSuffix={getDeselectedValueWithSuffix}
              metricColors={metricColors}
              metricType={metricType}
            />
          ) : mode !== "single" ? (
            <LegendComponent
              metricName={metricName}
              getColorsByMetric={getColorsByMetric}
            />
          ) : undefined}
        </div>
        <div className={cs("content", mode === "single" && "single-content")}>
          {parrotI18n.t("metric.empty")}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="metric-toolbar">
        {showLegend &&
          (isLegend && streams.length > 0 ? (
            <MetricLegend
              streams={streams}
              metricName={metricName}
              deselected={deselected}
              service={service}
              metricType={metricType}
              onClick={(id) => {
                setDeselected((prev) => {
                  const include = prev.includes(id);
                  const newDeselected = include
                    ? prev.filter((r) => r !== id)
                    : [...prev, id];
                  return newDeselected.length >= streams!.length
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
              metricName={metricName}
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
            hide={!showXAxis}
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
          <Tooltip
            active
            wrapperStyle={{ zIndex: 1000 }}
            isAnimationActive={false}
            content={
              <TooltipFormatter
                uuid={uuid}
                deselectedIndex={deselectedIndex}
                isLegend={isLegend}
                metricName={metricName}
                getColorsByMetric={getColorsByMetric}
              />
            }
          />
          {streams.map((item, index) => {
            if (deselectedIndex.includes(index)) {
              return null;
            }

            const { stroke, fill } = getColor({
              type,
              isLegend,
              index,
              metricName,
              getColorsByMetric,
              metricColors,
            });
            return (
              <Area
                key={index}
                dataKey={streams?.length === 1 ? "v" : `v${index}`}
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
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default RenderChart;
