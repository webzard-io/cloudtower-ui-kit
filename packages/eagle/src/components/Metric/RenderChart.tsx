import {
  DataPoint,
  GraphType,
  Maybe,
  MetricLabelInput,
  MetricStream,
  MetricUnit,
} from "@cloudtower/eagle/generated/react-hooks";
import { DateRange, useHistory } from "@cloudtower/eagle/kit/specify";
import { parrotI18n } from "@cloudtower/parrot";
import { cx } from "@linaria/core";
import cs from "classnames";
import React, { useState } from "react";
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

import { Typo } from "../../styles";
import Actions from "./Actions";
import {
  findMaxAndCurrent,
  getColor,
  getXAxisDomain,
  getYAxisDomain,
  tickFormatter,
  xaxisCal,
  yAxisFomatter,
} from "./metric";
import MetricLegend, {
  GetDeselectedValueWithSuffix,
  LegendComponent,
} from "./MetricLegend";
import { MetricLegendTabStyle, MetricPlaceholderWrapper } from "./styled";
import TooltipFormatter from "./TooltipFormatter";
import { FormatName, IMetricData } from "./type";

type exportCSVDataType = {
  labelName: string;
  pointData: DataPoint[];
  unit?: MetricUnit;
};

export interface IChartProps {
  metric: string;
  labels?: MetricLabelInput;
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
  step: number;
  deselectedIndex: number[];
  areaChartData: DataPoint[];
  streams: MetricStream[];
  dropped: boolean;
  metricUnit: MetricUnit;
}

const RenderChart = (props: IChartProps) => {
  const {
    metric,
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
    averageLine = false,
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
    areaChartData,
    streams,
    dropped,
    metricUnit,
  } = props;

  const history = useHistory();

  const isLegend = mode === "legend";

  const [deselected, setDeselected] = useState<string[]>([]);

  if (dropped) {
    return (
      <MetricPlaceholderWrapper className={Typo.Label.l4_regular}>
        <p>{parrotI18n.t("metric.no_application_monitor_desc_1")}</p>
        <p>
          <Trans
            i18nKey="metric.no_application_monitor_desc_2"
            i18n={parrotI18n}
          >
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

  if (!streams?.length || streams.every((stream) => !stream.points?.length)) {
    return (
      <div className={MetricLegendTabStyle}>
        <div className="name-toolbar">
          {isLegend ? (
            <MetricLegend
              data={metricLegendData}
              streams={streams || []}
              metricName={metric}
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
              metric={metric}
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

  const yAxisTickFormatter = yAxisFomatter(metricUnit);
  const points = streams
    .find((stream) => !!stream.points?.length)!
    .points!.map(({ t, v }) => ({
      t,
      v,
      unit: metricUnit,
    }));

  const xAxisDomain = getXAxisDomain(areaChartData, points, range, dateRange);

  let info = { current: "-", max: "-" };
  if (streams?.length) {
    info = findMaxAndCurrent(areaChartData, metricUnit);
  }

  const yDomain = getYAxisDomain(areaChartData, type, metricUnit);

  return (
    <>
      <div className="metric-toolbar">
        {showLegend &&
          (isLegend && streams.length > 0 ? (
            <MetricLegend
              streams={streams}
              metricName={metric}
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
                metric={metric}
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
              metric,
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
          {averageLine && streams.length === 1 && (
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
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default RenderChart;
