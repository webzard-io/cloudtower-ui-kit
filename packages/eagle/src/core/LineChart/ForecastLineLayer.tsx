import React from "react";

import {
  getLineChartLinePath,
  getLineChartLineSegments,
} from "@src/core/LineChart/utils";
import { ILineChartMetricStream } from "@src/core/LineChart/type";

export const DEFAULT_FORECAST_LINE_STROKE_DASHARRAY = "4 4";

interface IFormattedGraphicalItemPoint {
  x?: number | null;
  y?: number | null;
  payload?: {
    t?: number;
  };
}

interface IFormattedGraphicalItem {
  item?: {
    props?: {
      dataKey?: unknown;
    };
  };
  props?: {
    points?: IFormattedGraphicalItemPoint[];
  };
}

interface IForecastLineLayerProps {
  formattedGraphicalItems?: IFormattedGraphicalItem[];
  forecastStartTimestamp?: number;
  hovering: string[];
  streams: ILineChartMetricStream[];
}

const getStreamStroke = (stream: ILineChartMetricStream) => {
  return stream.legend.stroke
    ? `${stream.legend.color}1A`
    : stream.legend.color;
};

const getStreamIndex = (dataKey: unknown) => {
  if (typeof dataKey !== "string") {
    return undefined;
  }

  const match = /^v(\d+)$/.exec(dataKey);
  return match ? Number(match[1]) : undefined;
};

const ForecastLineLayer: React.FC<IForecastLineLayerProps> = ({
  formattedGraphicalItems,
  forecastStartTimestamp,
  hovering,
  streams,
}) => {
  if (!Number.isFinite(forecastStartTimestamp)) {
    return null;
  }

  const lines = (formattedGraphicalItems ?? []).flatMap((item) => {
    const streamIndex = getStreamIndex(item.item?.props?.dataKey);
    const stream = streamIndex === undefined ? undefined : streams[streamIndex];

    if (!stream || !item.props?.points?.length) {
      return [];
    }

    const segments = getLineChartLineSegments(
      item.props.points.map((point) => ({
        t: point.payload?.t,
        x: point.x,
        y: point.y,
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
  );
};

export default ForecastLineLayer;
