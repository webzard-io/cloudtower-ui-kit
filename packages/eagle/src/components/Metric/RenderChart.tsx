import { parrotI18n } from "@cloudtower/parrot";
import cs from "classnames";
import dayjs from "dayjs";
import React, { useCallback, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";
import {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { AxisDomain } from "recharts/types/util/types";

import { ChartActions } from "../../store";
import { useKitDispatch } from "../KitStoreProvider";
import {
  convertDataStruct,
  getXAxisDomain,
  tickFormatter,
  xaxisCal,
} from "./metric";
import MetricActions from "./MetricActions";
import MetricLegend from "./MetricLegend";
import { MetricLegendTabStyle } from "./styled";
import TooltipFormatter from "./TooltipFormatter";
import { DateRange, GraphType, IMetric } from "./type";

export interface IChartProps<
  TValue extends ValueType = string,
  TName extends NameType = number
> {
  metricName: string;
  yAxisAlign?: "left" | "right";
  showXAxis?: boolean;
  showLegend?: boolean;
  syncId: string;
  height: number;
  type: GraphType;
  mode?: "simple" | "legend" | "single";
  averageLine?: boolean;
  dropdown?: React.ReactNode;
  dateRange: DateRange;
  onLabelsChange?: (labels: string[]) => void;
  metric: IMetric;
  yAxisProps?: {
    domain?: AxisDomain;
    ticks?: (string | number)[];
    tickFormatter?: (value: any, index: number) => string;
  };
  actionsProps?: {
    show?: boolean;
    info: {
      current: string;
      max: string;
    };
  };
  tooltipProps: TooltipProps<TValue, TName> & {
    format?: (payload: Payload<number, string>) => string;
  };
}

const RenderChart = (props: IChartProps) => {
  const {
    metricName,
    showLegend,
    syncId,
    showXAxis,
    yAxisAlign,
    height,
    type,
    mode = "legend",
    dropdown,
    dateRange,
    onLabelsChange,
    metric,
    yAxisProps,
    actionsProps,
    tooltipProps,
  } = props;

  const dispatch = useKitDispatch();
  const [deselected, setDeselected] = useState<string[]>([]);

  const streams = useMemo(() => metric.sample_streams, [metric]);

  const legends = useMemo(() => {
    return metric.sample_streams.map((stream) => stream.legend);
  }, [metric.sample_streams]);

  const areaChartData = useMemo(
    () => convertDataStruct(streams.map((stream) => stream.points)),
    [streams]
  );

  const xaxisEndTime = useMemo(
    () => areaChartData[areaChartData.length - 1]?.t ?? dateRange[1],
    [areaChartData, dateRange]
  );

  const xAxisDomain = useMemo(
    () => getXAxisDomain(dateRange, xaxisEndTime),
    [dateRange, xaxisEndTime]
  );

  const xAxisTicks = useMemo(
    () => xaxisCal(xAxisDomain[1], dateRange),
    [dateRange, xAxisDomain]
  );

  const onLegendClick = useCallback(
    (id) => {
      setDeselected((prev) => {
        const include = prev.includes(id);
        const newDeselected = include
          ? prev.filter((r) => r !== id)
          : [...prev, id];
        onLabelsChange?.(newDeselected);
        return newDeselected.length >= streams!.length ? prev : newDeselected;
      });
    },
    [onLabelsChange, streams]
  );

  const hidePointer: CategoricalChartFunc = useCallback(() => {
    dispatch({
      type: ChartActions.SET_POINTER,
      payload: { visible: false, uuid: syncId },
    });
  }, [dispatch, syncId]);

  const handleMouseMove: CategoricalChartFunc = useCallback(
    (e) => {
      if (e.isTooltipActive) {
        const { chartX, activePayload } = e;
        if (!activePayload?.[0]?.payload) {
          return;
        }
        dispatch({
          type: ChartActions.SET_POINTER,
          payload: {
            uuid: syncId,
            visible: true,
            left: chartX,
            text: dayjs(Number(activePayload[0].payload.t)).format(
              "MM-DD HH:mm:ss"
            ),
            value: activePayload[0].payload.v,
          },
        });
      }
    },
    [dispatch, syncId]
  );

  if (!streams?.length || streams.every((stream) => !stream.points?.length)) {
    return (
      <div className={MetricLegendTabStyle}>
        <div className="name-toolbar">
          <MetricLegend
            streams={streams}
            metricName={metricName}
            deselected={deselected}
            onClick={onLegendClick}
            legends={legends}
          />
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
        {showLegend && (
          <MetricLegend
            streams={streams}
            metricName={metricName}
            deselected={deselected}
            onClick={onLegendClick}
            legends={legends}
          />
        )}
        {actionsProps?.show && (
          <MetricActions dropdown={dropdown} {...actionsProps} />
        )}
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
          syncId={syncId}
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
            tickFormatter={(tick: number) => tickFormatter(tick, dateRange)}
            ticks={xAxisTicks}
          />
          <YAxis
            width={200}
            mirror
            allowDataOverflow
            axisLine={false}
            tickLine={false}
            orientation={yAxisAlign}
            {...yAxisProps}
          />
          <Tooltip
            content={
              tooltipProps.format && (
                <TooltipFormatter
                  deselected={deselected}
                  legends={legends}
                  format={tooltipProps.format}
                />
              )
            }
            {...tooltipProps}
          />
          {streams.map((item, index) => {
            if (deselected.includes(item.legend.id)) {
              return null;
            }

            return (
              <Area
                key={index}
                dataKey={`v${index}`}
                stackId={type === GraphType.Stack ? "stack" : undefined}
                stroke={
                  item.legend.stroke
                    ? `${item.legend.color}1A`
                    : item.legend.color
                }
                fill={item.legend.fill}
                isAnimationActive={false}
                activeDot={{
                  stroke: item.legend.color,
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
