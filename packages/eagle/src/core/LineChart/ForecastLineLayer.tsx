import { ILineChartMetricStream } from "@src/core/LineChart/type";
import { getLineChartStreamStroke } from "@src/core/LineChart/lineChartDisplayUtils";
import {
  getLineChartLinePath,
  getLineChartLineSegments,
} from "@src/core/LineChart/lineSegments";
import _ from "lodash";
import React from "react";

export const DEFAULT_FORECAST_LINE_STROKE_DASHARRAY = "4 4";

interface IForecastLineLayerProps {
  forecastStartTimestamp?: number;
  stacked: boolean;
  hovering: string[];
  streams: ILineChartMetricStream[];
  deselected: string[];
  offset?: {
    top?: number;
    left?: number;
    width?: number;
    height?: number;
  };
  xAxisMap?: Record<
    string,
    {
      scale?: (value: number) => number;
    }
  >;
  yAxisMap?: Record<
    string,
    {
      scale?: (value: number) => number;
    }
  >;
}

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const ForecastLineLayer: React.FC<IForecastLineLayerProps> = ({
  forecastStartTimestamp,
  stacked = false,
  hovering,
  streams,
  deselected,
  offset,
  xAxisMap,
  yAxisMap,
}) => {
  const clipPathId = React.useMemo(() => {
    return _.uniqueId("line-chart-forecast-");
  }, []);
  const xScale = Object.values(xAxisMap || {})[0]?.scale;
  const yScale = Object.values(yAxisMap || {})[0]?.scale;
  const offsetLeft = offset?.left ?? 0;
  const offsetTop = offset?.top ?? 0;
  const offsetWidth = offset?.width ?? 0;
  const offsetHeight = offset?.height ?? 0;

  const lines = React.useMemo(() => {
    if (
      !Number.isFinite(forecastStartTimestamp) ||
      typeof xScale !== "function" ||
      typeof yScale !== "function" ||
      !offsetWidth ||
      !offsetHeight
    ) {
      return [];
    }

    const pointMaps = streams.map(
      (stream) => new Map(stream.points.map((point) => [point.t, point])),
    );
    const timestamps = stacked
      ? Array.from(
          new Set(
            streams.flatMap((stream) =>
              stream.points.map((point) => point.t).filter(isFiniteNumber),
            ),
          ),
        )
      : [];

    return streams.flatMap((stream, streamIndex) => {
      if (deselected.includes(stream.legend.id)) {
        return [];
      }

      const points = stacked
        ? timestamps.map((timestamp) => {
            const currentPoint = pointMaps[streamIndex].get(timestamp);
            if (!isFiniteNumber(currentPoint?.v)) {
              return { t: timestamp, x: xScale(timestamp), y: undefined };
            }

            const stackedValue = streams.reduce((sum, item, index) => {
              if (index > streamIndex || deselected.includes(item.legend.id)) {
                return sum;
              }

              const value = pointMaps[index].get(timestamp)?.v;
              return sum + (isFiniteNumber(value) ? value : 0);
            }, 0);

            return {
              t: timestamp,
              x: xScale(timestamp),
              y: yScale(stackedValue),
            };
          })
        : stream.points.map((point) => ({
            t: point.t,
            x: isFiniteNumber(point.t) ? xScale(point.t) : undefined,
            y: isFiniteNumber(point.v) ? yScale(point.v) : undefined,
          }));

      const segments = getLineChartLineSegments(points, forecastStartTimestamp);

      return segments.map((segment, segmentIndex) => ({
        dashed: segment.dashed,
        key: `${stream.legend.id}-${segmentIndex}-${segment.points[0].t}`,
        legendId: stream.legend.id,
        path: getLineChartLinePath(segment.points),
        stroke: getLineChartStreamStroke(stream),
      }));
    });
  }, [
    forecastStartTimestamp,
    offsetHeight,
    offsetWidth,
    deselected,
    stacked,
    streams,
    xScale,
    yScale,
  ]);

  if (!lines.length || !offsetWidth || !offsetHeight) {
    return null;
  }

  return (
    <g
      className="line-chart-forecast-lines"
      data-testid="line-chart-forecast-lines"
      style={{ pointerEvents: "none" }}
    >
      <defs>
        <clipPath id={clipPathId}>
          <rect
            x={offsetLeft}
            y={offsetTop}
            width={offsetWidth}
            height={offsetHeight}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipPathId})`}>
        {lines.map((line) => {
          if (deselected.includes(line.legendId)) {
            return null;
          }

          return (
            <path
              key={line.key}
              className="line-chart-forecast-line"
              d={line.path}
              fill="none"
              opacity={hovering.includes(line.legendId) ? 0.3 : 1}
              stroke={line.stroke}
              strokeDasharray={
                line.dashed ? DEFAULT_FORECAST_LINE_STROKE_DASHARRAY : undefined
              }
            />
          );
        })}
      </g>
    </g>
  );
};

export default ForecastLineLayer;
