import { useKitDispatch } from "@src/core/KitStoreProvider";
import LineChartLegend from "@src/core/LineChart/LineChartLegend";
import { MetricLegendTabStyle } from "@src/core/LineChart/styled";
import TooltipFormatter from "@src/core/LineChart/TooltipFormatter";
import {
  ILineChartDateRange,
  ILineChartGraphType,
  ILineChartMetric,
} from "@src/core/LineChart/type";
import {
  convertLineChartDataStruct,
  lineChartYaxisTickFormatter,
} from "@src/core/LineChart/utils";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { ChartActions } from "@src/store";
import { Empty as AntdEmpty } from "antd";
import { DropdownProps } from "antd5";
import cs from "classnames";
import dayjs from "dayjs";
import _ from "lodash";
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

import LineChartToolBar from "./LineChartToolBar";
import {
  getLineChartXAxisDomain,
  getYAxisDomain,
  lineChartTickFormatter,
  lineChartXaxisCal,
} from "./utils";

export interface IChartProps<
  TValue extends ValueType = string,
  TName extends NameType = number,
> {
  metricName: string;
  yAxisAlign?: "left" | "right";
  showXAxis?: boolean;
  showLegend?: boolean;
  syncId: string;
  height: number;
  type: ILineChartGraphType;
  mode?: "simple" | "legend" | "single";
  averageLine?: boolean;
  dropdownProps?: DropdownProps;
  onLabelsChange?: (labels: string[]) => void;
  metric: ILineChartMetric;
  yAxisProps?: {
    domain?: AxisDomain;
    ticks?: (string | number)[];
    tickFormatter?: (value: any, index: number) => string;
  };
  xAxisProps?: {
    domain?: AxisDomain;
    ticks?: (string | number)[];
    tickFormatter?: (value: any, index: number) => string;
  };
  actionsProps?: {
    show?: boolean;
    label: string | React.ReactNode;
    dropdownProps?: DropdownProps;
  };
  tooltipProps: TooltipProps<TValue, TName> & {
    format?: (payload: Payload<number, string>) => string;
  };
  dateRange?: ILineChartDateRange;
  emptyText?: React.ReactNode | string;
  emptyIcon?: React.ReactNode | string;
}

const RenderChart = (props: IChartProps & { width: number }) => {
  const {
    metricName,
    showLegend,
    syncId,
    showXAxis,
    yAxisAlign,
    height,
    type,
    mode = "legend",
    dropdownProps,
    onLabelsChange,
    metric,
    yAxisProps,
    xAxisProps,
    actionsProps,
    tooltipProps,
    width,
    dateRange = [dayjs(), dayjs()],
    emptyText,
    emptyIcon,
  } = props;
  const { t } = useParrotTranslation();

  const dispatch = useKitDispatch();
  const [deselected, setDeselected] = useState<string[]>([]);
  const [hovering, setHovering] = useState<string[]>([]);
  const [hoveringSelf, setHoveringSelf] = useState<string[]>([]);
  const [tempDeselected, setTempDeselected] = useState<string[]>([]);
  const streams = useMemo(() => metric.sample_streams, [metric]);

  const legends = useMemo(() => {
    return metric.sample_streams.map((stream) => stream.legend);
  }, [metric.sample_streams]);

  const areaChartData = useMemo(
    () => convertLineChartDataStruct(streams.map((stream) => stream.points)),
    [streams],
  );
  const yDomain = getYAxisDomain(areaChartData, type, metric.unit);
  const xDomain = getLineChartXAxisDomain(dateRange, dateRange[1].valueOf());
  const xTicks = lineChartXaxisCal(xDomain[1], dateRange, width);

  const onLegendClick = useCallback(
    (id: string) => {
      setDeselected((prev) => {
        const currentDeselected = tempDeselected.length ? tempDeselected : prev;

        if (currentDeselected.length === 0) {
          return streams
            .map((stream) => stream.legend.id)
            .filter((legendId) => legendId !== id);
        }

        if (currentDeselected.length === streams.length - 1) {
          const highlightedId = streams.find(
            (stream) => !currentDeselected.includes(stream.legend.id),
          )?.legend.id;

          if (id === highlightedId) {
            return [];
          } else {
            return currentDeselected.filter(
              (deselectedId) => deselectedId !== id,
            );
          }
        }

        const isHighlighted = !currentDeselected.includes(id);
        if (isHighlighted) {
          return [...currentDeselected, id];
        } else {
          return currentDeselected.filter(
            (deselectedId) => deselectedId !== id,
          );
        }
      });

      if (tempDeselected.length) {
        setTempDeselected([]);
      }
    },
    [streams, tempDeselected],
  );

  const onLegendHover = useCallback(
    (method: "enter" | "leave", id: string) => {
      if (method === "enter") {
        if (deselected.length) {
          setTempDeselected(deselected);
          if (deselected.includes(id)) {
            setDeselected(
              streams
                .map((stream) => stream.legend.id)
                .filter(
                  (legendId) =>
                    legendId !== id && deselected.includes(legendId),
                ),
            );

            setHovering(
              streams
                .map((stream) => stream.legend.id)
                .filter((legendId) => legendId === id),
            );

            setHoveringSelf(
              streams
                .map((stream) => stream.legend.id)
                .filter((legendId) => legendId === id),
            );
          } else {
            setDeselected([]);
            setHovering(
              streams
                .map((stream) => stream.legend.id)
                .filter((legendId) => legendId !== id),
            );
          }
        } else {
          setHovering(
            streams
              .map((stream) => stream.legend.id)
              .filter((legendId) => legendId !== id),
          );
        }
      } else {
        if (tempDeselected.length) {
          setDeselected(tempDeselected);
          setTempDeselected([]);
        }
        setHovering([]);
        setHoveringSelf([]);
      }
    },
    [deselected, streams, tempDeselected],
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
              "MM/DD HH:mm:ss",
            ),
            value: activePayload[0].payload.v,
          },
        });
      }
    },
    [dispatch, syncId],
  );

  if (!streams?.length || streams.every((stream) => !stream.points?.length)) {
    return (
      <div className={MetricLegendTabStyle}>
        <div className="name-toolbar">
          <LineChartLegend
            streams={streams}
            metricName={metricName}
            deselected={deselected}
            hovering={hovering}
            hovereringSelf={hoveringSelf}
            onClick={onLegendClick}
            onHover={onLegendHover}
            legends={legends}
          />
        </div>
        <div className={cs("content", mode === "single" && "single-content")}>
          <AntdEmpty
            description={emptyText || t("metric.empty")}
            image={emptyIcon ? emptyIcon : null}
            imageStyle={emptyIcon ? {} : { display: "none" }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <LineChartToolBar
        showLegend={showLegend}
        streams={streams}
        metricName={metricName}
        deselected={deselected}
        hovering={hovering}
        hoveringSelf={hoveringSelf}
        onLegendClick={onLegendClick}
        legends={legends}
        actionsProps={actionsProps}
        dropdownProps={dropdownProps}
        onLegendHover={onLegendHover}
      />

      <ResponsiveContainer height={height}>
        <AreaChart
          style={{ backgroundColor: "white" }}
          margin={
            showLegend
              ? { top: 10, left: -20, right: 10, bottom: 0 }
              : { top: 20, left: -20, right: 10, bottom: 5 }
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
            ticks={xTicks}
            domain={xDomain}
            tickFormatter={(tick) => lineChartTickFormatter(tick, dateRange)}
            {...xAxisProps}
          />
          <YAxis
            width={200}
            mirror
            // allowDataOverflow
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
            domain={yDomain}
            orientation={yAxisAlign}
            tick={{
              dx: 20,
              dy: 16,
            }}
            ticks={[yDomain[1] / 2, yDomain[1]]}
            tickFormatter={(tick) =>
              lineChartYaxisTickFormatter(tick, metric.unit)
            }
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
                stackId={
                  type === ILineChartGraphType.Stack ? "stack" : undefined
                }
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
                opacity={hovering.includes(item.legend.id) ? 0.3 : 1}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default RenderChart;
