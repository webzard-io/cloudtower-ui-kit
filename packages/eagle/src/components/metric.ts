import {
  DataPoint,
  GraphType,
  MetricStream,
  MetricUnit,
  TimeUnit,
} from "@cloudtower/eagle/generated/react-hooks";
import { DateRange } from "@cloudtower/eagle/kit/specify/type";
import {
  Cluster,
  convertUnit,
  DAY,
  formatBitPerSecond,
  formatBps,
  formatBytes,
  formatCount,
  formatFrequency,
  formatNanoSecond,
  formatPercent,
  formatTemperature,
  getMetricGranularity,
  Granularity,
  HOUR,
  MINUTE,
  roundToDecimals,
  SECOND,
  WEEK,
} from "@tower/utils";
import dayjs from "dayjs";
import { TFunction } from "i18next";
import _ from "lodash";

import { IMetricsQuery } from "./type";

export const getColor = (prams: {
  type: GraphType;
  isLegend: boolean;
  index?: number;
  metric: string;
  getColorsByMetric: (metric: string) => string;
  metricColors: string[];
}) => {
  const {
    type,
    isLegend,
    index = 0,
    metric,
    getColorsByMetric,
    metricColors,
  } = prams;
  const stroke = isLegend ? metricColors[index] : getColorsByMetric(metric);
  // 1A === 10% transparency
  const fill = type === GraphType.Stack ? stroke : `${stroke}1A`;

  return { stroke, fill };
};

export type ChartMouseMoveParam =
  | { isTooltipActive: false }
  | {
      activeCoordinate: {
        x: number;
        y: number;
      };
      activeLabel: string | number;
      activeTooltipIndex: number;
      chartX: number;
      chartY: number;
      isTooltipActive: true;
      activePayload: { payload: { t: string; v: number } }[];
    };

export function filterPointsByDateRange(
  points: DataPoint[],
  dateRange?: DateRange | undefined | null
): DataPoint[] {
  if (dateRange) {
    const [startDate, endDate] = dateRange;

    return points?.filter((point) => {
      const pointDate = dayjs(point.t);
      if (startDate && pointDate.isBefore(startDate)) {
        return false;
      }
      if (endDate && pointDate.isAfter(endDate)) {
        return false;
      }
      return true;
    });
  }

  return points;
}

export const formatStreams = (params: {
  topkData: IMetricsQuery | undefined;
  metricData?: IMetricsQuery;
  dateRange?: DateRange | undefined | null;
}) => {
  const { topkData, metricData, dateRange } = params;
  if (!metricData) {
    return undefined;
  }
  if (!topkData?.metrics.samples) {
    return metricData.metrics.sample_streams!.map((sample_stream) => {
      if (sample_stream?.points) {
        const points = filterPointsByDateRange(sample_stream.points, dateRange);
        return {
          ...sample_stream,
          points,
        };
      }

      return sample_stream;
    });
  }

  const orderList = topkData.metrics.samples.map((stream) =>
    _.compact(Object.values(stream.labels)).join("")
  );

  return orderList
    .map((item) => {
      const sample_streams = metricData.metrics.sample_streams!.find(
        (stream) => _.compact(Object.values(stream.labels)).join("") === item
      )!;

      if (sample_streams?.points) {
        return {
          ...sample_streams,
          points: filterPointsByDateRange(sample_streams.points, dateRange),
        };
      }

      return sample_streams;
    })
    .filter((r) => r);
};

export const parseRange = (range: string) => {
  const span = parseInt(range.slice(0, range.length - 1));
  const unit = range.slice(range.length - 1) as "h" | "d";
  return { span, unit };
};

export const rangeToTimestamp = (range: string) => {
  const { span, unit } = parseRange(range);

  switch (unit) {
    case "h":
      return span * HOUR * 1000;

    case "d":
      return span * DAY * 1000;
  }
};

function getRangeTimestamp(range: string, dateRange?: DateRange) {
  if (dateRange) {
    const [startDate, endDate] = dateRange;

    if (startDate && endDate) {
      return endDate.valueOf() - startDate.valueOf();
    } else if (startDate && !endDate) {
      return Date.now() - startDate.valueOf();
    }
  }

  return rangeToTimestamp(range);
}

export const xaxisCal = (
  lastTime: number,
  range: string,
  dateRange?: DateRange
) => {
  const tangeTime = getRangeTimestamp(range, dateRange);
  const tick = tangeTime / 4;

  const msPerMinute = MINUTE * 1000;
  const lastTimeMinute = dayjs(lastTime).minute();
  const baseline =
    lastTimeMinute < 30
      ? lastTime - lastTimeMinute * msPerMinute
      : lastTime - lastTimeMinute * msPerMinute + msPerMinute * 30;

  return [baseline - tick * 3, baseline - tick * 2, baseline - tick, baseline];
};

export const tickFormatter = (
  tick: number,
  range: string,
  dateRange?: DateRange
) => {
  const rangeTime = getRangeTimestamp(range, dateRange);
  if (rangeTime <= 2 * HOUR * 1000) {
    return dayjs(tick).format("HH:mm:ss");
  }
  if (rangeTime <= 4 * DAY * 1000) {
    return dayjs(tick).format("MM/DD HH:mm:ss");
  }
  return dayjs(tick).format("MM/DD");
};

export function getXAxisDomain(
  areaChartData: DataPoint[],
  points: DataPoint[],
  range: string,
  dateRange?: DateRange | undefined
): [number, number] {
  const xaxisLastTime: number = areaChartData[areaChartData.length - 1]
    ? Number(areaChartData[areaChartData.length - 1].t)
    : points[points.length - 1].t;

  const xaxisDomainStartTimestamp: number =
    xaxisLastTime - rangeToTimestamp(range);

  if (dateRange) {
    const [startTimestamp, endTimestamp] = dateRange.map((date) =>
      date ? date.valueOf() : null
    );

    const startTimestampIsNumber = typeof startTimestamp === "number";
    const endTimestampIsNumber = typeof endTimestamp === "number";

    if (startTimestampIsNumber && endTimestampIsNumber) {
      return [startTimestamp, endTimestamp];
    } else if (startTimestampIsNumber && !endTimestampIsNumber) {
      return [startTimestamp, xaxisLastTime];
    } else if (!startTimestampIsNumber && endTimestampIsNumber) {
      return [xaxisDomainStartTimestamp, endTimestamp];
    }
  }

  return [xaxisDomainStartTimestamp, xaxisLastTime];
}

const getMs = (timeRange: string): number => {
  switch (timeRange) {
    case "2h":
      return HOUR * 2 * 1000;
    case "24h":
      return DAY * 1000;
    case "7d":
      return WEEK * 1000;
    case "30d":
      return DAY * 30 * 1000;
    default:
      return DAY * 182 * 1000;
  }
};

export const deletePointsOutOfRange = (
  data: DataPoint[],
  timeRange: string,
  now: number
) => {
  const first = now - getMs(timeRange);
  return (
    data?.filter((item) => {
      return item.t >= first && item.t <= now;
    }) || []
  );
};

const getFaultToleranceTime = (timeRange: string) => {
  switch (timeRange) {
    case "2h":
      return 120 * 1000;
    case "24h":
      return 10 * 60 * 1000;
    case "7d":
    case "30d":
      return 60 * 60 * 1000;
    case "182d":
      return 24 * 60 * 60 * 1000;
  }
  return 120 * 1000;
};

export const addMissingDataWithZero = (
  data: DataPoint[],
  timeRange: string,
  unit: MetricUnit,
  step: number,
  dateRange?: DateRange
) => {
  const now = Date.now();

  const inRangePoints = deletePointsOutOfRange(data, timeRange, now);
  if (!inRangePoints.length) {
    return [];
  }
  const firsExpectedTimestamp = getFirstExpectedTimestamp(
    inRangePoints,
    timeRange,
    now,
    step
  );
  const expectedPoints: DataPoint[] = [];
  // Infinity means no value
  const tolerance = getFaultToleranceTime(timeRange);
  if (inRangePoints[0].t - firsExpectedTimestamp > tolerance + step) {
    inRangePoints.unshift({
      t: firsExpectedTimestamp,
      v: -Infinity,
    });
  }
  if (now - inRangePoints[inRangePoints.length - 1].t > tolerance + step) {
    inRangePoints.push({
      t: now,
      v: -Infinity,
    });
  }
  inRangePoints.forEach((item, index) => {
    expectedPoints.push({
      t: item?.t,
      v: item?.v,
    });
    if (index + 1 <= inRangePoints.length - 1) {
      const nowTimeRange = inRangePoints[index + 1]?.t - item?.t;
      if (nowTimeRange > tolerance + step) {
        const n = Math.floor(nowTimeRange / step);
        for (let i = 1; i < n; i++) {
          expectedPoints.push({
            t: item?.t + step * i,
            v: -Infinity,
          });
        }
      }
    }
  });

  // TODO: let tooltipFormatter get unit from RenderChart
  return filterPointsByDateRange(
    expectedPoints.map((p) => ({ ...p, unit })),
    dateRange
  );
};

export const transformData = (
  sample_streams: MetricStream[],
  range: string,
  unit: MetricUnit,
  step: number,
  averageLine: boolean,
  dateRange?: DateRange
) => {
  const result =
    sample_streams.length === 1
      ? addMissingDataWithZero(
          sample_streams[0].points || [],
          range,
          unit,
          step,
          dateRange
        )
      : convertDataForMultiArea(sample_streams, range, unit, step, dateRange);
  return result;
};

export interface IClusterBasicQuery {
  cluster: Cluster;
}

export function transformDataAndUnit(
  unit: MetricUnit | undefined,
  data: number
): { value: number; unit: string } {
  // Infinity means no value
  if (data === -Infinity) {
    return { value: -Infinity, unit: "" };
  } else {
    switch (unit) {
      case MetricUnit.Percent:
        return formatPercent(data);
      case MetricUnit.Ratio:
        return formatPercent(data * 100);
      case MetricUnit.Count:
      case MetricUnit.Load:
        return formatCount(data);
      case MetricUnit.DataSize:
        return formatBytes(data);
      case MetricUnit.DataRateByte:
        return formatBps(data);
      case MetricUnit.DataRateBit:
        return formatBitPerSecond(data);
      case MetricUnit.Time:
        return formatNanoSecond(data);
      case MetricUnit.Frequency:
        return formatFrequency(data);
      case MetricUnit.Temperature:
        return formatTemperature(data);
      default:
        return { value: data, unit: "" };
    }
  }
}

export const getStep = (timeRange: string, metric: string): number => {
  const granularity = getMetricGranularity(metric);
  if (granularity === Granularity.Thick) {
    switch (timeRange) {
      case "2h":
        return MINUTE * 5 * 1000;
      case "24h":
        return HOUR * 1 * 1000;
      case "7d":
        return DAY * 1000;
      case "30d":
        return DAY * 1000;
      case "182d":
        return WEEK * 1000;
      default:
        return DAY * 1000;
    }
  }
  switch (timeRange) {
    case "2h":
      return SECOND * 30 * 1000;
    case "24h":
      return MINUTE * 5 * 1000;
    case "7d":
      return MINUTE * 30 * 1000;
    case "30d":
      return DAY * 1000;
    default:
      return DAY * 1000;
  }
};

export const findMaxAndCurrent = (points: DataPoint[], unit: MetricUnit) => {
  const v = points[points.length - 1]?.v;
  let _current: string;
  if (v === undefined || v === null || v === -Infinity) {
    _current = "-";
  } else {
    const { value: current, unit: suffix } = transformDataAndUnit(unit, v || 0);
    _current = current === 0 ? "0" : current + suffix;
  }
  const max = points.reduce((prev, { v }) => Math.max(Number(v), prev), 0);
  const { value, unit: maxUnit } = transformDataAndUnit(unit, max);
  const _max = value === 0 || Number.isNaN(value) ? "-" : value + maxUnit;
  return { current: _current, max: _max };
};

export const yAxisFomatter = (unit: MetricUnit) => (prop: number) => {
  const { value, unit: suffix } = transformDataAndUnit(unit, prop);

  if (value === 0) return "";
  if (
    [
      MetricUnit.Count,
      MetricUnit.Ratio,
      MetricUnit.Percent,
      MetricUnit.Load,
      MetricUnit.Temperature,
    ].includes(unit)
  ) {
    return value + suffix;
  }
  return value + " " + suffix;
};

export const getYDataMax = (
  dataPoints: Record<string, string | number | null | undefined>[],
  type: GraphType
) => {
  const values = dataPoints.map((p) => {
    if (_.isNumber(p?.v)) {
      return p.v;
    }
    const entries = Object.entries(p);
    if (type === GraphType.Stack) {
      let sum = 0;
      for (const [key, value] of entries) {
        if (/^v(\d*)$/.test(key) && _.isNumber(value)) {
          sum += value;
        }
      }
      return sum;
    } else {
      // Area Graph
      let max = 0;
      for (const [key, value] of entries) {
        if (/^v(\d*)$/.test(key) && _.isNumber(value) && value > max) {
          max = value;
        }
      }
      return max;
    }
  });
  return Math.max(...values, 0);
};

export const UNIT_FORMATTER = {
  [MetricUnit.Percent]: [formatPercent, "%"],
  [MetricUnit.Ratio]: [formatPercent, "%"],
  [MetricUnit.Count]: [formatCount, ""],
  [MetricUnit.DataSize]: [formatBytes, "B"],
  [MetricUnit.DataRateByte]: [formatBps, "Bps"],
  [MetricUnit.DataRateBit]: [formatBitPerSecond, "bps"],
  [MetricUnit.Time]: [formatNanoSecond, "ns"],
  [MetricUnit.Frequency]: [formatFrequency, "Hz"],
  [MetricUnit.Temperature]: [formatTemperature, "℃"],
  [MetricUnit.Load]: [formatCount, ""],
} as const;

export const getYAxisUpperBound = (max: number, type: MetricUnit) => {
  const DIVISOR = 2;
  switch (type) {
    case MetricUnit.Percent:
    case MetricUnit.Count:
    case MetricUnit.Load:
    case MetricUnit.DataSize:
    case MetricUnit.DataRateByte:
    case MetricUnit.Time:
    case MetricUnit.Frequency:
    case MetricUnit.DataRateBit:
    case MetricUnit.Temperature: {
      const [format, base] = UNIT_FORMATTER[type];
      const { value, unit } = format(max);
      const _value = Math.ceil(value / DIVISOR) * DIVISOR;
      return convertUnit(_value, unit, base);
    }
    case MetricUnit.Ratio: {
      const [format, base] = UNIT_FORMATTER[type];
      const { value, unit } = format(max * 100);
      const _value = Math.ceil(value / DIVISOR) * DIVISOR;
      return convertUnit(_value, unit, base) / 100;
    }
    default:
      return 2;
  }
};

export const getYAxisDomain = (
  dataPoints: Record<string, string | number | null | undefined>[],
  graphType: GraphType,
  unitType: MetricUnit
): [number, number] => {
  const max = getYDataMax(dataPoints, graphType);
  if (!max) {
    if (unitType === MetricUnit.Ratio) {
      return [0, 1];
    } else {
      return [0, 2];
    }
  }
  return [0, getYAxisUpperBound(max, unitType)];
};

export const convertDataForMultiArea = (
  data: MetricStream[],
  range: string,
  unit: MetricUnit,
  step: number,
  dateRange?: DateRange
) => {
  data.forEach((item) => {
    item.points = addMissingDataWithZero(item?.points || [], range, unit, step);
  });
  if (!data[0].points?.length) {
    return [];
  }
  const finalData: Record<string, string | number | null | undefined>[] = [];
  const pointsNum: number = getMs(range) / step;

  for (let j = 0; j < pointsNum; j++) {
    finalData[j] = {
      t: data[0].points[0].t + step * j,
      unit,
    };
    for (let i = 0; i < data.length; i++) {
      finalData[j][`v${i}`] = data[i].points?.[j]?.v;
    }
  }

  return filterPointsByDateRange(finalData as DataPoint[], dateRange);
};

export const getFirstExpectedTimestamp = (
  data: DataPoint[],
  timeRange: string,
  now: number,
  step: number
) => {
  const first = now - getMs(timeRange);
  const firstRealTimestamp = data[0].t;
  return (
    firstRealTimestamp - Math.floor((firstRealTimestamp - first) / step) * step
  );
};

export const stringifyTimeSpan = (
  timeSpan: { span: number; unit: TimeUnit } | string
) => {
  if (typeof timeSpan === "string") return timeSpan;
  // preset time span
  switch (`${timeSpan.span}${timeSpan.unit}`) {
    case "2HOUR":
      return "2h";
    case "24HOUR":
      return "24h";
    case "7DAY":
      return "7d";
    case "30DAY":
      return "30d";
    case "6MONTH":
      return "182d";
    default:
      break;
  }
  let _span = timeSpan.span;
  let _unit = timeSpan.unit;
  if (_unit === TimeUnit.Month) {
    const before6Month = new Date().setMonth(new Date().getMonth() - _span);
    const oneDay = 24 * 60 * 60 * 1000;
    _span = Math.round(
      Math.abs((new Date().getTime() - before6Month) / oneDay)
    );
    _unit = TimeUnit.Day;
  }
  return _span + _unit.charAt(0).toLowerCase();
};

export type exportCSVDataType = {
  labelName: string;
  pointData: DataPoint[];
  unit?: MetricUnit;
};

export function getExportUnit(
  data: exportCSVDataType[],
  baseUnit: MetricUnit | undefined
) {
  const sortedPointDataList = data
    .reduce<DataPoint[]>((allData, cur) => allData.concat(cur.pointData), [])
    .sort((a, b) => (a?.v || 0) - (b?.v || 0));

  let unit = "";

  while (sortedPointDataList.length) {
    const _value = sortedPointDataList.shift()?.v;

    if (!_.isNil(_value) && Number.isFinite(_value)) {
      unit = transformDataAndUnit(baseUnit, _value).unit;
      break;
    }
  }

  return unit;
}

export function getDefaultDecimals(unit: MetricUnit | undefined) {
  switch (unit) {
    case MetricUnit.Percent:
    case MetricUnit.Ratio:
      return 2;
    case MetricUnit.Count:
    case MetricUnit.Load:
      return 2;
    case MetricUnit.DataSize:
      return 2;
    case MetricUnit.DataRateBit:
      return 1;
    case MetricUnit.DataRateByte:
      return 1;
    case MetricUnit.Time:
      return 2;
    case MetricUnit.Frequency:
      return 2;
    case MetricUnit.Temperature:
      return 2;
    default:
      return 2;
  }
}

export function transformValueToExport(
  value: number,
  from: string,
  to: string,
  unit: MetricUnit | undefined
) {
  return roundToDecimals(
    convertUnit(value, from, to),
    getDefaultDecimals(unit)
  );
}

export const toLocalTime = (now: number, shift: number) =>
  new Date(now - shift).toISOString().slice(0, -5);

export function transformDataToCsv(
  data: exportCSVDataType[],
  shift: number,
  t: TFunction
): string {
  let CSVColumnHeaderStr = t("metric.time");
  let CSVBody = "";

  // generate csv column title
  data?.forEach((column) => {
    CSVColumnHeaderStr += `, ${column.labelName}`;
  });
  CSVColumnHeaderStr += `, ${t("metric.unit")}\n`;

  // if no point data in found, return empty csv
  const controlData = data.find((item) => item.pointData.length);
  if (!controlData) {
    return CSVColumnHeaderStr;
  }

  // get base unit
  const [, baseUnit = ""] = controlData.unit
    ? UNIT_FORMATTER[controlData.unit]
    : ["", ""];

  // generate csv body
  const unitIsRatio = controlData.unit === MetricUnit.Ratio;

  // get unit for export
  const exportUnit = getExportUnit(data, controlData.unit);

  // format data
  for (
    let pointIndex = 0;
    pointIndex < controlData.pointData.length;
    pointIndex++
  ) {
    // set timestamp at first
    CSVBody += toLocalTime(controlData.pointData[pointIndex].t, shift);

    // travel cell data in the same level
    for (let columnIndex = 0; columnIndex < data.length; columnIndex++) {
      // Format value when base unit is Ratio
      let value: number | string =
        data[columnIndex]?.pointData?.[pointIndex]?.v ?? 0;
      if (unitIsRatio) {
        value = formatPercent(value * 100).value;
      } else {
        value = Number.isFinite(value)
          ? transformValueToExport(
              value,
              baseUnit,
              exportUnit,
              controlData.unit
            )
          : "";
      }
      CSVBody += `, ${value}`;
    }
    CSVBody += `, ${exportUnit}\n`;
  }

  return CSVColumnHeaderStr + CSVBody;
}

export type MetricRefType = {
  exportCSV: (filename: string) => void;
  getCSVFileData: (filename?: string) => {
    data: string;
    filename: string;
    filetype: string;
  };
};
