import React, { useCallback, useMemo, useState } from "react";
import { Empty as AntdEmpty } from "antd";
import { DropdownProps } from "antd5";
import cs from "classnames";
import dayjs from "dayjs";
import _ from "lodash";
import {
  Area,
  AreaChart,
  Customized,
  ReferenceLine,
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

import { useKitDispatch } from "@src/core/KitStoreProvider";
import LineChartLegend from "@src/core/LineChart/LineChartLegend";
import {
  ChartContentWrapper,
  MetricLegendTabStyle,
  ThresholdTooltipOverlay,
} from "@src/core/LineChart/styled";
import TooltipFormatter, {
  LineChartTooltipContent,
} from "@src/core/LineChart/TooltipFormatter";
import {
  ILineChartAreaHighlightRange,
  ILineChartDateRange,
  ILineChartGraphType,
  ILineChartMetric,
  ILineChartMetricStream,
  ILineChartThresholdIntersectionInfo,
  ILineChartThresholdLineProps,
} from "@src/core/LineChart/type";
import {
  convertLineChartDataStruct,
  getLineChartAreaHighlightData,
  getLineChartAreaHighlightRanges,
  getLineChartMetricPayloadMatches,
  getLineChartThresholdIntersections,
  getLineChartXAxisDomain,
  getYAxisDomain,
  lineChartTickFormatter,
  lineChartXaxisCal,
  lineChartYaxisTickFormatter,
} from "@src/core/LineChart/utils";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { ChartActions } from "@src/store";

import LineChartToolBar from "./LineChartToolBar";
import AreaHighlightLayer, {
  IAreaHighlightOverlay,
} from "./AreaHighlightLayer";
import ForecastLineLayer from "./ForecastLineLayer";
import ThresholdIntersectionLayer, {
  THRESHOLD_INTERSECTION_LABEL_MARGIN_TOP,
  isThresholdIntersectionLabelVisible,
} from "./ThresholdIntersectionLayer";

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
  areaHighlightRanges?: ILineChartAreaHighlightRange[];
  forecastStartTimestamp?: number;
  thresholdLineProps?: ILineChartThresholdLineProps;
  renderThresholdTooltip?: (
    info: ILineChartThresholdIntersectionInfo,
  ) => React.ReactElement;
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

interface IHoveredThresholdIntersection {
  info: ILineChartThresholdIntersectionInfo;
  left: number;
  top: number;
}

const DEFAULT_THRESHOLD_LINE_STROKE = "#ff4d4f";
const DEFAULT_THRESHOLD_LINE_DASHARRAY = "4 4";
const getStreamStroke = (stream: ILineChartMetricStream) => {
  return stream.legend.stroke
    ? `${stream.legend.color}1A`
    : stream.legend.color;
};

const RenderChart = (
  props: IChartProps & {
    width: number;
  },
) => {
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
    metric,
    areaHighlightRanges,
    forecastStartTimestamp,
    thresholdLineProps,
    renderThresholdTooltip,
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
  const [hoveredThresholdIntersection, setHoveredThresholdIntersection] =
    useState<IHoveredThresholdIntersection | null>(null);
  const streams = useMemo(() => metric.sample_streams, [metric]);

  const legends = useMemo(() => {
    return metric.sample_streams.map((stream) => stream.legend);
  }, [metric.sample_streams]);

  const areaChartData = useMemo(
    () => convertLineChartDataStruct(streams.map((stream) => stream.points)),
    [streams],
  );
  const xDomain = getLineChartXAxisDomain(dateRange, dateRange[1].valueOf());
  const thresholdValue = thresholdLineProps?.value;
  const thresholdExtraValues = useMemo(() => {
    if (_.isNumber(thresholdValue)) {
      return [thresholdValue];
    }

    return [];
  }, [thresholdValue]);
  const yDomain =
    yAxisProps?.domain ??
    getYAxisDomain(areaChartData, type, metric.unit, thresholdExtraValues);
  const yTickDomain = yDomain as [number, number];
  const xTicks = lineChartXaxisCal(xDomain[1], dateRange, width);

  const normalizedAreaHighlightRanges = useMemo(() => {
    return getLineChartAreaHighlightRanges(areaHighlightRanges, xDomain);
  }, [areaHighlightRanges, xDomain]);
  const thresholdIntersectionLabelProps =
    thresholdLineProps?.intersectionLabelProps;
  const hasForecastStartTimestamp = Number.isFinite(forecastStartTimestamp);
  const hasThresholdIntersectionLabel = Boolean(
    thresholdIntersectionLabelProps,
  );

  const areaHighlightOverlays = useMemo(() => {
    if (type !== ILineChartGraphType.Area) {
      return [];
    }

    return normalizedAreaHighlightRanges.flatMap((range, rangeIndex) => {
      return streams.flatMap((stream, streamIndex) => {
        if (range.legendId && stream.legend.id !== range.legendId) {
          return [];
        }

        const data = getLineChartAreaHighlightData(stream.points, range);

        if (data.length < 2) {
          return [];
        }

        return [
          {
            key: `${stream.legend.id}-${range.start}-${range.end}-${rangeIndex}-${streamIndex}`,
            data,
            fill: range.fill,
            fillOpacity: range.fillOpacity ?? 0.18,
            legendId: stream.legend.id,
            stroke: getStreamStroke(stream),
          } satisfies IAreaHighlightOverlay,
        ];
      });
    });
  }, [normalizedAreaHighlightRanges, streams, type]);

  const formatIntersectionValue = useCallback(
    (streamIndex: number, value: number, timestamp: number) => {
      if (!tooltipProps.format) {
        return lineChartYaxisTickFormatter(value, metric.unit);
      }

      const payload = {
        color: legends[streamIndex]?.color,
        dataKey: `v${streamIndex}`,
        fill: legends[streamIndex]?.fill,
        name: `v${streamIndex}`,
        payload: {
          [`v${streamIndex}`]: value,
          t: timestamp,
          v: value,
        },
        stroke: legends[streamIndex]?.color,
        value,
      } as Payload<number, string>;

      return tooltipProps.format(payload);
    },
    [legends, metric.unit, tooltipProps],
  );

  const thresholdIntersections = useMemo(() => {
    if (!_.isNumber(thresholdValue)) {
      return [];
    }

    const formattedThresholdValue = lineChartYaxisTickFormatter(
      thresholdValue,
      metric.unit,
    );

    return getLineChartThresholdIntersections(
      streams,
      thresholdValue,
      xDomain,
    ).map((intersection) => {
      return {
        ...intersection,
        formattedThresholdValue,
        formattedValue: formatIntersectionValue(
          intersection.streamIndex,
          intersection.value,
          intersection.timestamp,
        ),
        thresholdValue,
      };
    });
  }, [formatIntersectionValue, metric.unit, streams, thresholdValue, xDomain]);

  const visibleThresholdIntersections = useMemo(() => {
    return thresholdIntersections.filter((intersection) => {
      return !deselected.includes(intersection.legend.id);
    });
  }, [deselected, thresholdIntersections]);

  const onLegendClick = useCallback(
    (id: string) => {
      setHoveredThresholdIntersection(null);
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
          // If there are unselected metrics
          setTempDeselected(deselected);
          if (deselected.includes(id)) {
            // If hovering over an unselected metric, select the currently unselected metric
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
            // If more than one metric is selected, hovering does not change the selected metrics, but the hovered metric will be highlighted
            if (deselected.length === streams.length - 1) {
              setDeselected([]);
              setHovering(
                streams
                  .map((stream) => stream.legend.id)
                  .filter((legendId) => legendId !== id),
              );
            } else {
              setHovering(
                streams
                  .map((stream) => stream.legend.id)
                  .filter((legendId) => legendId !== id),
              );
              setHoveringSelf(
                streams
                  .map((stream) => stream.legend.id)
                  .filter(
                    (legendId) =>
                      legendId !== id && !deselected.includes(legendId),
                  ),
              );
            }
          }
        } else {
          // If all metrics are selected
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
    setHoveredThresholdIntersection(null);
    dispatch({
      type: ChartActions.SET_POINTER,
      payload: { visible: false, uuid: syncId },
    });
  }, [dispatch, syncId]);

  const handleMouseMove: CategoricalChartFunc = useCallback(
    (e) => {
      if (e.isTooltipActive) {
        const { chartX, activePayload } = e;
        const activeMetricPayload = getLineChartMetricPayloadMatches(
          activePayload,
          legends,
        )[0]?.payload;

        if (!activeMetricPayload?.payload) {
          return;
        }

        dispatch({
          type: ChartActions.SET_POINTER,
          payload: {
            uuid: syncId,
            visible: true,
            left: chartX,
            text: dayjs(Number(activeMetricPayload.payload.t)).format(
              "MM/DD HH:mm:ss",
            ),
            value: activeMetricPayload.payload.v,
          },
        });
      }
    },
    [dispatch, legends, syncId],
  );

  const handleThresholdIntersectionEnter = useCallback(
    (info: ILineChartThresholdIntersectionInfo, left: number, top: number) => {
      setHoveredThresholdIntersection({
        info,
        left,
        top,
      });
    },
    [],
  );

  const thresholdTooltipContent = useMemo(() => {
    if (!hoveredThresholdIntersection) {
      return null;
    }

    const renderer =
      thresholdLineProps?.renderTooltip ?? renderThresholdTooltip;

    if (renderer) {
      return renderer(hoveredThresholdIntersection.info);
    }

    const showHoveredThresholdIntersectionLabel =
      isThresholdIntersectionLabelVisible(
        thresholdIntersectionLabelProps,
        hoveredThresholdIntersection.info,
      );

    if (showHoveredThresholdIntersectionLabel) {
      return null;
    }

    return (
      <LineChartTooltipContent
        title={dayjs(hoveredThresholdIntersection.info.timestamp).format(
          "MM/DD HH:mm:ss",
        )}
        items={[
          {
            id: hoveredThresholdIntersection.info.legend.id,
            color: hoveredThresholdIntersection.info.legend.color,
            label: hoveredThresholdIntersection.info.legend.name,
            value: hoveredThresholdIntersection.info.formattedValue,
          },
        ]}
      />
    );
  }, [
    thresholdIntersectionLabelProps,
    hoveredThresholdIntersection,
    renderThresholdTooltip,
    thresholdLineProps?.renderTooltip,
  ]);

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

      <ChartContentWrapper style={{ height }}>
        <ResponsiveContainer height="100%">
          <AreaChart
            style={{ backgroundColor: "white" }}
            margin={
              showLegend
                ? {
                    top: hasThresholdIntersectionLabel
                      ? THRESHOLD_INTERSECTION_LABEL_MARGIN_TOP
                      : 10,
                    left: -20,
                    right: 0,
                    bottom: 0,
                  }
                : {
                    top: hasThresholdIntersectionLabel
                      ? THRESHOLD_INTERSECTION_LABEL_MARGIN_TOP
                      : 20,
                    left: -20,
                    right: 0,
                    bottom: 5,
                  }
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
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              domain={yDomain}
              orientation={yAxisAlign}
              tick={{
                dx: 20,
                dy: 16,
                fontSize: 12,
              }}
              ticks={[yTickDomain[1] / 2, yTickDomain[1]]}
              tickFormatter={(tick) =>
                lineChartYaxisTickFormatter(tick, metric.unit)
              }
              {...yAxisProps}
            />
            {_.isNumber(thresholdValue) && (
              <ReferenceLine
                data-testid="line-chart-threshold-line"
                className={cs(
                  "line-chart-threshold-line",
                  thresholdLineProps?.className,
                )}
                style={thresholdLineProps?.style}
                y={thresholdValue}
                stroke={
                  thresholdLineProps?.stroke || DEFAULT_THRESHOLD_LINE_STROKE
                }
                strokeDasharray={
                  thresholdLineProps?.strokeDasharray ||
                  DEFAULT_THRESHOLD_LINE_DASHARRAY
                }
                ifOverflow="discard"
                isFront
              />
            )}
            <Tooltip
              wrapperStyle={{ left: 20 }}
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
                  stroke={getStreamStroke(item)}
                  strokeOpacity={hasForecastStartTimestamp ? 0 : undefined}
                  fill={item.legend.fill}
                  isAnimationActive={false}
                  activeDot={{
                    stroke: item.legend.color,
                    r: 4,
                    strokeWidth: 2,
                    fill: "white",
                    strokeOpacity: 1,
                    fillOpacity: 1,
                  }}
                  opacity={hovering.includes(item.legend.id) ? 0.3 : 1}
                />
              );
            })}
            {hasForecastStartTimestamp && (
              <Customized
                key="line-chart-forecast-lines"
                component={ForecastLineLayer}
                forecastStartTimestamp={forecastStartTimestamp}
                hovering={hovering}
                streams={streams}
              />
            )}
            {areaHighlightOverlays.map((overlay) => {
              if (deselected.includes(overlay.legendId)) {
                return null;
              }

              return (
                <Customized
                  key={overlay.key}
                  component={AreaHighlightLayer}
                  overlay={overlay}
                  hovering={hovering}
                  forecastStartTimestamp={forecastStartTimestamp}
                />
              );
            })}
            {visibleThresholdIntersections.map((intersection, index) => (
              <Customized
                key={`${intersection.legend.id}-${intersection.timestamp}-${index}`}
                component={ThresholdIntersectionLayer}
                intersection={intersection as ILineChartThresholdIntersectionInfo}
                index={index}
                hovering={hovering}
                intersectionLabelProps={thresholdIntersectionLabelProps}
                thresholdStroke={thresholdLineProps?.stroke}
                onMouseEnter={handleThresholdIntersectionEnter}
                onMouseLeave={() => setHoveredThresholdIntersection(null)}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
        {hoveredThresholdIntersection && thresholdTooltipContent && (
          <ThresholdTooltipOverlay
            data-testid="line-chart-threshold-tooltip"
            role="tooltip"
            style={{
              left: hoveredThresholdIntersection.left,
              top: hoveredThresholdIntersection.top,
            }}
          >
            {thresholdTooltipContent}
          </ThresholdTooltipOverlay>
        )}
      </ChartContentWrapper>
    </>
  );
};

export default RenderChart;
