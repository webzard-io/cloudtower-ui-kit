import _ from "lodash";
import React, { useMemo } from "react";

export interface IAreaHighlightOverlay {
  key: string;
  data: Array<
    Array<{
      t: number;
      value: number;
    }>
  >;
  fill: string;
  fillOpacity: number;
  legendId: string;
  stroke: string;
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

  const projectedRuns = overlay.data.flatMap((run) => {
    const runs: Array<Array<{ t: number; x: number; y: number }>> = [];
    let projectedPoints: Array<{ t: number; x: number; y: number }> = [];

    const flushProjectedPoints = () => {
      if (projectedPoints.length >= 2) {
        runs.push(projectedPoints);
      }
      projectedPoints = [];
    };

    run.forEach((point) => {
      const projectedPoint = {
        t: point.t,
        x: xScale(point.t),
        y: yScale(point.value),
      };

      if (
        Number.isFinite(projectedPoint.x) &&
        Number.isFinite(projectedPoint.y)
      ) {
        projectedPoints.push(projectedPoint);
      } else {
        flushProjectedPoints();
      }
    });

    flushProjectedPoints();
    return runs;
  });

  if (!projectedRuns.length) {
    return null;
  }

  const fallbackBaseLineY = offsetTop + offsetHeight;
  const scaleBaseLineY = yScale(0);
  const baseLineY = Number.isFinite(scaleBaseLineY)
    ? scaleBaseLineY
    : fallbackBaseLineY;
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
        {projectedRuns.map((projectedPoints, index) => {
          const fillPath = getAreaHighlightFillPath(projectedPoints, baseLineY);
          const linePath = getAreaHighlightLinePath(projectedPoints);

          return (
            <g key={`${overlay.key}-${index}`}>
              <path
                className="line-chart-area-highlight-fill"
                d={fillPath}
                fill={overlay.fill}
                fillOpacity={overlay.fillOpacity}
              />
              {!Number.isFinite(forecastStartTimestamp) && (
                <path
                  className="line-chart-area-highlight-curve"
                  d={linePath}
                  fill="none"
                  stroke={overlay.stroke}
                  strokeWidth={1}
                />
              )}
            </g>
          );
        })}
      </g>
    </g>
  );
};

export default AreaHighlightLayer;
