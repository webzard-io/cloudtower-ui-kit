import React from "react";
import _ from "lodash";
import { ReferenceDot, type ReferenceDotProps } from "recharts";

import {
  ILineChartThresholdIntersectionInfo,
  ILineChartThresholdIntersectionLabelProps,
} from "@src/core/LineChart/type";

export const THRESHOLD_INTERSECTION_LABEL_MARGIN_TOP = 44;

const DEFAULT_THRESHOLD_LINE_STROKE = "#ff4d4f";
const DEFAULT_THRESHOLD_INTERSECTION_LABEL_TEXT_COLOR = "#ffffff";
const THRESHOLD_INTERSECTION_LABEL_HEIGHT = 28;
const THRESHOLD_INTERSECTION_LABEL_RADIUS = 4;
const THRESHOLD_INTERSECTION_LABEL_OFFSET = 10;
const THRESHOLD_INTERSECTION_LABEL_PADDING_X = 12;
const THRESHOLD_INTERSECTION_LABEL_MIN_WIDTH = 48;
const THRESHOLD_INTERSECTION_LABEL_FONT_SIZE = 12;
const THRESHOLD_INTERSECTION_CJK_REGEXP = /[\u3400-\u9fff\uf900-\ufaff]/;

export const isThresholdIntersectionLabelVisible = (
  labelProps: ILineChartThresholdIntersectionLabelProps | undefined,
  info: ILineChartThresholdIntersectionInfo,
) => {
  if (!labelProps) {
    return false;
  }

  const { visible = true } = labelProps;

  if (_.isFunction(visible)) {
    return visible(info);
  }

  return visible;
};

const getThresholdIntersectionLabelText = (
  labelProps: ILineChartThresholdIntersectionLabelProps | undefined,
  info: ILineChartThresholdIntersectionInfo,
) => {
  const text = labelProps?.text;

  if (_.isFunction(text)) {
    return text(info) || info.formattedThresholdValue;
  }

  return text || info.formattedThresholdValue;
};

const getThresholdIntersectionLabelWidth = (label: string) => {
  const contentWidth = Array.from(label).reduce((sum, char) => {
    return (
      sum +
      (THRESHOLD_INTERSECTION_CJK_REGEXP.test(char)
        ? THRESHOLD_INTERSECTION_LABEL_FONT_SIZE
        : THRESHOLD_INTERSECTION_LABEL_FONT_SIZE * 0.65)
    );
  }, 0);

  return Math.max(
    THRESHOLD_INTERSECTION_LABEL_MIN_WIDTH,
    Math.ceil(contentWidth) + THRESHOLD_INTERSECTION_LABEL_PADDING_X * 2,
  );
};

type ThresholdIntersectionXAxis = NonNullable<ReferenceDotProps["xAxis"]>;
type ThresholdIntersectionYAxis = NonNullable<ReferenceDotProps["yAxis"]>;

interface IThresholdIntersectionLayerProps {
  intersection: ILineChartThresholdIntersectionInfo;
  index: number;
  hovering: string[];
  intersectionLabelProps?: ILineChartThresholdIntersectionLabelProps;
  thresholdStroke?: string;
  onMouseEnter: (
    info: ILineChartThresholdIntersectionInfo,
    left: number,
    top: number,
  ) => void;
  onMouseLeave: () => void;
  xAxisMap?: Record<string, ThresholdIntersectionXAxis>;
  yAxisMap?: Record<string, ThresholdIntersectionYAxis>;
}

const ThresholdIntersectionLayer: React.FC<
  IThresholdIntersectionLayerProps
> = ({
  intersection,
  index,
  hovering,
  intersectionLabelProps,
  thresholdStroke,
  onMouseEnter,
  onMouseLeave,
  xAxisMap,
  yAxisMap,
}) => {
  const xAxis = xAxisMap?.[0];
  const yAxis = yAxisMap?.[0];

  if (
    typeof xAxis?.scale !== "function" ||
    typeof yAxis?.scale !== "function"
  ) {
    return null;
  }

  return (
    <ReferenceDot
      xAxis={xAxis}
      yAxis={yAxis}
      x={intersection.timestamp}
      y={intersection.value}
      isFront
      shape={(shapeProps: { cx?: number; cy?: number }) => {
        const { cx = 0, cy = 0 } = shapeProps;
        const intersectionOpacity = hovering.includes(intersection.legend.id)
          ? 0.3
          : 1;
        const showIntersectionLabel = isThresholdIntersectionLabelVisible(
          intersectionLabelProps,
          intersection,
        );
        const intersectionLabelText = showIntersectionLabel
          ? getThresholdIntersectionLabelText(
              intersectionLabelProps,
              intersection,
            )
          : "";
        const intersectionLabelColor =
          intersectionLabelProps?.color ||
          thresholdStroke ||
          DEFAULT_THRESHOLD_LINE_STROKE;
        const intersectionLabelTextColor =
          intersectionLabelProps?.textColor ||
          DEFAULT_THRESHOLD_INTERSECTION_LABEL_TEXT_COLOR;
        const intersectionLabelWidth = getThresholdIntersectionLabelWidth(
          intersectionLabelText,
        );
        const intersectionLabelX = cx - intersectionLabelWidth / 2;
        const intersectionLabelY =
          cy -
          THRESHOLD_INTERSECTION_LABEL_HEIGHT -
          THRESHOLD_INTERSECTION_LABEL_OFFSET;

        return (
          <g
            data-testid="line-chart-threshold-intersection-dot"
            data-intersection-id={`${intersection.legend.id}-${index}`}
            onMouseEnter={() => onMouseEnter(intersection, cx, cy)}
            onMouseLeave={onMouseLeave}
          >
            <circle
              cx={cx}
              cy={cy}
              r={8}
              fill="transparent"
              stroke="transparent"
            />
            {showIntersectionLabel && (
              <g data-testid="line-chart-threshold-intersection-label">
                <rect
                  data-testid="line-chart-threshold-intersection-label-background"
                  x={intersectionLabelX}
                  y={intersectionLabelY}
                  width={intersectionLabelWidth}
                  height={THRESHOLD_INTERSECTION_LABEL_HEIGHT}
                  rx={THRESHOLD_INTERSECTION_LABEL_RADIUS}
                  ry={THRESHOLD_INTERSECTION_LABEL_RADIUS}
                  fill={intersectionLabelColor}
                  opacity={intersectionOpacity}
                />
                <text
                  x={cx}
                  y={
                    intersectionLabelY + THRESHOLD_INTERSECTION_LABEL_HEIGHT / 2
                  }
                  fill={intersectionLabelTextColor}
                  fontSize={THRESHOLD_INTERSECTION_LABEL_FONT_SIZE}
                  fontWeight={500}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  opacity={intersectionOpacity}
                >
                  {intersectionLabelText}
                </text>
              </g>
            )}
          </g>
        );
      }}
    />
  );
};

export default ThresholdIntersectionLayer;
