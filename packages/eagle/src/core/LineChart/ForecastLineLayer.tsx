import React from "react";
import _ from "lodash";

import { ILineChartMetricStream } from "@src/core/LineChart/type";
import {
  getLineChartLinePath,
  getLineChartLineSegments,
} from "@src/core/LineChart/utils";

export const DEFAULT_FORECAST_LINE_STROKE_DASHARRAY = "4 4";

interface IForecastLineLayerProps {
  forecastStartTimestamp?: number;
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

const getStreamStroke = (stream: ILineChartMetricStream) => {
  return stream.legend.stroke
    ? `${stream.legend.color}1A`
    : stream.legend.color;
};

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const ForecastLineLayer: React.FC<IForecastLineLayerProps> = ({
  forecastStartTimestamp,
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

  if (!Number.isFinite(forecastStartTimestamp)) {
    return null;
  }

  if (
    typeof xScale !== "function" ||
    typeof yScale !== "function" ||
    !offsetWidth ||
    !offsetHeight
  ) {
    return null;
  }

  const lines = streams.flatMap((stream) => {
    if (deselected.includes(stream.legend.id)) {
      return [];
    }

    const segments = getLineChartLineSegments(
      stream.points.map((point) => ({
        t: point.t,
        x: isFiniteNumber(point.t) ? xScale(point.t) : undefined,
        y: isFiniteNumber(point.v) ? yScale(point.v) : undefined,
      })),
      forecastStartTimestamp,
    );

    return segments.map((segment, segmentIndex) => ({
      dashed: segment.dashed,
      key: `${stream.legend.id}-${segmentIndex}-${segment.points[0].t}`,
      path: getLineChartLinePath(segment.points),
      stroke: getStreamStroke(stream),
      opacity: hovering.includes(stream.legend.id) ? 0.3 : 1,
    }));
  });

  if (!lines.length) {
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
        {lines.map((line) => (
          <path
            key={line.key}
            className="line-chart-forecast-line"
            d={line.path}
            fill="none"
            opacity={line.opacity}
            stroke={line.stroke}
            strokeDasharray={
              line.dashed ? DEFAULT_FORECAST_LINE_STROKE_DASHARRAY : undefined
            }
          />
        ))}
      </g>
    </g>
  );
};

export default ForecastLineLayer;
