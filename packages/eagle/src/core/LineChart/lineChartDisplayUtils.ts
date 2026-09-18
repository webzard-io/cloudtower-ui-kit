import {
  ILineChartILegend,
  ILineChartMetricStream,
  ILineChartThresholdIntersectionInfo,
  ILineChartThresholdTooltipInfo,
} from "@src/core/LineChart/type";
import type { AxisDomain } from "recharts/types/util/types";

export const DEFAULT_LINE_CHART_STROKE = "#3182bd";

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const isFiniteNumericYAxisDomain = (
  domain: AxisDomain | undefined,
): domain is [number, number] => {
  if (!Array.isArray(domain) || domain.length !== 2) {
    return false;
  }

  return isFiniteNumber(domain[0]) && isFiniteNumber(domain[1]);
};

export const getLineChartStreamStroke = (
  stream: ILineChartMetricStream,
): string => {
  const color = stream.legend.color ?? DEFAULT_LINE_CHART_STROKE;

  return stream.legend.stroke ? `${color}1A` : color;
};

export const getLineChartDefaultYAxisTicks = (
  domain: AxisDomain | undefined,
): [number, number] | undefined => {
  if (!isFiniteNumericYAxisDomain(domain)) {
    return undefined;
  }

  const [, upper] = domain;
  return [upper / 2, upper];
};

export const getLineChartLegacyThresholdTooltipInfo = (
  info: ILineChartThresholdIntersectionInfo,
): ILineChartThresholdTooltipInfo => ({
  current: info.formattedValue,
  max: info.formattedThresholdValue,
});
