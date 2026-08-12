import React, { useMemo } from "react";
import _ from "lodash";

import {
  getLineChartLinePath,
  getLineChartLineSegments,
} from "@src/core/LineChart/utils";

import { DEFAULT_FORECAST_LINE_STROKE_DASHARRAY } from "./ForecastLineLayer";

export interface IAreaHighlightOverlay {
  key: string;
  data: Array<{
    t: number;
    value: number;
  }>;
  fill: string;
  fillOpacity: number;
  legendId: string;
  stroke: string | undefined;
}

interface IAreaHighlightLayerProps {
  forecastStartTimestamp?: number;
  overlay: IAreaHighlightOverlay;
  hovering: string[];
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

const getAreaHighlightLinePath = (
  points: Array<{
    x: number;
    y: number;
  }>,
) => {
  if (!points.length) {
    return "";
  }

  return points
    .map((point, index) => {
      return `${index === 0 ? "M" : "L"}${point.x},${point.y}`;
    })
    .join(" ");
};

const getAreaHighlightFillPath = (
  points: Array<{
    x: number;
    y: number;
  }>,
  baseLineY: number,
) => {
  if (!points.length) {
    return "";
  }

  const linePath = getAreaHighlightLinePath(points);
  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];

  return `${linePath} L${lastPoint.x},${baseLineY} L${firstPoint.x},${baseLineY} Z`;
};

const AreaHighlightLayer: React.FC<IAreaHighlightLayerProps> = ({
  forecastStartTimestamp,
  overlay,
  hovering,
  offset,
  xAxisMap,
  yAxisMap,
}) => {
  const clipPathId = useMemo(() => {
    return _.uniqueId("line-chart-area-highlight-");
  }, []);
  const xScale = Object.values(xAxisMap || {})[0]?.scale;
  const yScale = Object.values(yAxisMap || {})[0]?.scale;
  const offsetLeft = offset?.left ?? 0;
  const offsetTop = offset?.top ?? 0;
  const offsetWidth = offset?.width ?? 0;
  const offsetHeight = offset?.height ?? 0;

  if (
    typeof xScale !== "function" ||
    typeof yScale !== "function" ||
    !offsetWidth ||
    !offsetHeight
  ) {
    return null;
  }

  const projectedPoints = overlay.data
    .map((point) => {
      return {
        t: point.t,
        x: xScale(point.t),
        y: yScale(point.value),
      };
    })
    .filter((point) => {
      return Number.isFinite(point.x) && Number.isFinite(point.y);
    });

  if (projectedPoints.length < 2) {
    return null;
  }

  const fallbackBaseLineY = offsetTop + offsetHeight;
  const scaleBaseLineY = yScale(0);
  const baseLineY = Number.isFinite(scaleBaseLineY)
    ? scaleBaseLineY
    : fallbackBaseLineY;
  const fillPath = getAreaHighlightFillPath(projectedPoints, baseLineY);
  const lineSegments = Number.isFinite(forecastStartTimestamp)
    ? getLineChartLineSegments(projectedPoints, forecastStartTimestamp)
    : [{ dashed: false, points: projectedPoints }];

  return (
    <g
      className="line-chart-area-highlight"
      data-testid="line-chart-area-highlight"
      style={{ pointerEvents: "none" }}
      opacity={hovering.includes(overlay.legendId) ? 0.3 : 1}
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
        <path
          className="line-chart-area-highlight-fill"
          d={fillPath}
          fill={overlay.fill}
          fillOpacity={overlay.fillOpacity}
        />
        {overlay.stroke &&
          lineSegments.map((segment, index) => (
            <path
              key={`${segment.points[0].t}-${index}`}
              className="line-chart-area-highlight-curve"
              d={getLineChartLinePath(segment.points)}
              fill="none"
              stroke={overlay.stroke}
              strokeDasharray={
                segment.dashed
                  ? DEFAULT_FORECAST_LINE_STROKE_DASHARRAY
                  : undefined
              }
              strokeWidth={1}
            />
          ))}
      </g>
    </g>
  );
};

export default AreaHighlightLayer;
