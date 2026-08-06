import {
  ILineChartAreaHighlightRange,
  ILineChartDataPoint,
  ILineChartDateRange,
  ILineChartGraphType,
  ILineChartILegend,
  ILineChartMetric,
  ILineChartMetricUnit,
  ILineChartMetricStream,
} from "@src/core/LineChart/type";
import {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import {
  DAY,
  formatBitPerSecond,
  formatBps,
  formatBytes,
  formatCount,
  formatFrequency,
  formatNanoSecond,
  formatPercent,
  formatTemperature,
  HOUR,
  MINUTE,
  SECOND,
  unitRules,
} from "@src/utils/tower";
import dayjs from "dayjs";
import _ from "lodash";

export interface ILineChartThresholdIntersectionPoint {
  timestamp: number;
  value: number;
  legend: ILineChartILegend;
  streamIndex: number;
}

export interface ILineChartAreaHighlightPoint {
  t: number;
  value: number;
}

export interface ILineChartMetricPayloadMatch<
  TValue extends ValueType = number,
  TName extends NameType = string,
  TLegend extends { id: string } = ILineChartILegend,
> {
  legend: TLegend;
  payload: Payload<TValue, TName>;
}

export function filterLineChartPointsByDateRange(
  points: ILineChartDataPoint[],
  dateRange?: ILineChartDateRange,
): ILineChartDataPoint[] {
  const [startDate, endDate] = dateRange ?? [dayjs(), dayjs()];

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

export const parseLineChartRange = (range: string) => {
  const span = parseInt(range.slice(0, range.length - 1));
  const unit = range.slice(range.length - 1) as "h" | "d";
  return { span, unit };
};

function getRangeTimestamp(dateRange: ILineChartDateRange) {
  const [startDate, endDate] = dateRange;

  return endDate.valueOf() - startDate.valueOf();
}

export const lineChartXaxisCal = (
  lastTime: number,
  dateRange: ILineChartDateRange,
  width: number,
) => {
  const tangeTime = getRangeTimestamp(dateRange);
  const baseline = lastTime || dateRange[1].valueOf();
  if (width < 290) {
    const tick = tangeTime / 4;
    return [baseline - tick * 3, baseline - tick];
  } else if (width < 380) {
    const tick = tangeTime / 6;
    return [baseline - tick * 5, baseline - tick * 3, baseline - tick];
  } else {
    const tick = tangeTime / 8;
    return [
      baseline - tick * 7,
      baseline - tick * 5,
      baseline - tick * 3,
      baseline - tick,
    ];
  }
};

export const lineChartTickFormatter = (
  tick: number,
  dateRange: ILineChartDateRange,
) => {
  const rangeTime = getLineChartRangeTimestamp(dateRange);
  if (rangeTime <= 2 * HOUR * 1000) {
    return dayjs(tick).format("HH:mm:ss");
  }
  if (rangeTime <= 4 * DAY * 1000) {
    return dayjs(tick).format("MM/DD HH:mm:ss");
  }
  return dayjs(tick).format("MM/DD");
};

export function getLineChartXAxisDomain(
  dateRange: ILineChartDateRange,
  xaxisLastTime?: number,
): [number, number] {
  const [startDate, endDate] = dateRange;

  return [startDate.valueOf(), xaxisLastTime ?? endDate.valueOf()];
}

export const getLineChartMetricPayloadMatches = <
  TValue extends ValueType = number,
  TName extends NameType = string,
  TLegend extends { id: string } = ILineChartILegend,
>(
  payload: ReadonlyArray<Payload<TValue, TName>> | undefined,
  legends: readonly TLegend[] = [],
): Array<ILineChartMetricPayloadMatch<TValue, TName, TLegend>> => {
  if (!payload?.length) {
    return [];
  }

  return payload.flatMap((item) => {
    const legend = legends.find((_legend, index) => `v${index}` === item.name);

    if (!legend) {
      return [];
    }

    return [{ payload: item, legend }];
  });
};


export const getLineChartAreaHighlightRanges = (
  ranges: ILineChartAreaHighlightRange[] = [],
  xDomain: [number, number],
) => {
  const [domainStart, domainEnd] = xDomain;

  return ranges
    .map((range) => ({
      ...range,
      start: Math.max(range.start, domainStart),
      end: Math.min(range.end, domainEnd),
    }))
    .filter((range) => range.start < range.end);
};

export const getLineChartRangeTimestamp = (
  dateRange: ILineChartDateRange,
): number => {
  const [startDate, endDate] = dateRange;
  return endDate.valueOf() - startDate.valueOf();
};

const isValidLineChartValue = (value?: number): value is number => {
  return _.isNumber(value) && Number.isFinite(value);
};

const getLineChartInterpolatedValue = (
  currentPoint: ILineChartDataPoint,
  nextPoint: ILineChartDataPoint,
  timestamp: number,
) => {
  if (
    !isValidLineChartValue(currentPoint.v) ||
    !isValidLineChartValue(nextPoint.v) ||
    currentPoint.t === nextPoint.t
  ) {
    return undefined;
  }

  if (timestamp === currentPoint.t) {
    return currentPoint.v;
  }

  if (timestamp === nextPoint.t) {
    return nextPoint.v;
  }

  const ratio = (timestamp - currentPoint.t) / (nextPoint.t - currentPoint.t);
  return currentPoint.v + (nextPoint.v - currentPoint.v) * ratio;
};

const isSameAreaHighlightPoint = (
  prev: ILineChartAreaHighlightPoint | undefined,
  next: ILineChartAreaHighlightPoint,
) => {
  if (!prev) {
    return false;
  }

  return Math.abs(prev.t - next.t) < 1e-6 && Math.abs(prev.value - next.value) < 1e-6;
};

const pushLineChartAreaHighlightPoint = (
  points: ILineChartAreaHighlightPoint[],
  next: ILineChartAreaHighlightPoint,
) => {
  if (!isSameAreaHighlightPoint(points[points.length - 1], next)) {
    points.push(next);
  }
};

export const getLineChartAreaHighlightData = (
  points: ILineChartDataPoint[],
  range: Pick<ILineChartAreaHighlightRange, "start" | "end">,
) => {
  const highlightedPoints: ILineChartAreaHighlightPoint[] = [];

  for (let index = 0; index < points.length - 1; index++) {
    const currentPoint = points[index];
    const nextPoint = points[index + 1];

    if (
      !isValidLineChartValue(currentPoint?.v) ||
      !isValidLineChartValue(nextPoint?.v) ||
      currentPoint.t === nextPoint.t
    ) {
      continue;
    }

    if (nextPoint.t < range.start || currentPoint.t > range.end) {
      continue;
    }

    const segmentStart = Math.max(range.start, currentPoint.t);
    const segmentEnd = Math.min(range.end, nextPoint.t);

    if (segmentStart > segmentEnd) {
      continue;
    }

    const startValue = getLineChartInterpolatedValue(
      currentPoint,
      nextPoint,
      segmentStart,
    );
    const endValue = getLineChartInterpolatedValue(
      currentPoint,
      nextPoint,
      segmentEnd,
    );

    if (!isValidLineChartValue(startValue) || !isValidLineChartValue(endValue)) {
      continue;
    }

    pushLineChartAreaHighlightPoint(highlightedPoints, {
      t: segmentStart,
      value: startValue,
    });
    pushLineChartAreaHighlightPoint(highlightedPoints, {
      t: segmentEnd,
      value: endValue,
    });
  }

  return highlightedPoints.length >= 2 ? highlightedPoints : [];
};

const isSameIntersectionPoint = (
  prev: ILineChartThresholdIntersectionPoint | undefined,
  next: ILineChartThresholdIntersectionPoint,
) => {
  if (!prev) {
    return false;
  }

  return (
    prev.streamIndex === next.streamIndex &&
    Math.abs(prev.timestamp - next.timestamp) < 1e-6 &&
    Math.abs(prev.value - next.value) < 1e-6
  );
};

const pushLineChartIntersection = (
  intersections: ILineChartThresholdIntersectionPoint[],
  next: ILineChartThresholdIntersectionPoint,
) => {
  if (!isSameIntersectionPoint(intersections[intersections.length - 1], next)) {
    intersections.push(next);
  }
};

export const getLineChartThresholdIntersections = (
  streams: ILineChartMetricStream[],
  thresholdValue: number,
  xDomain?: [number, number],
) => {
  const [domainStart, domainEnd] = xDomain ?? [-Infinity, Infinity];

  return streams.flatMap((stream, streamIndex) => {
    const intersections: ILineChartThresholdIntersectionPoint[] = [];

    for (let index = 0; index < stream.points.length - 1; index++) {
      const currentPoint = stream.points[index];
      const nextPoint = stream.points[index + 1];

      if (
        !isValidLineChartValue(currentPoint?.v) ||
        !isValidLineChartValue(nextPoint?.v) ||
        currentPoint.t === nextPoint.t
      ) {
        continue;
      }

      const currentDiff = currentPoint.v - thresholdValue;
      const nextDiff = nextPoint.v - thresholdValue;

      if (currentDiff === 0 && nextDiff === 0) {
        continue;
      }

      if (
        currentDiff === 0 &&
        currentPoint.t >= domainStart &&
        currentPoint.t <= domainEnd
      ) {
        pushLineChartIntersection(intersections, {
          timestamp: currentPoint.t,
          value: thresholdValue,
          legend: stream.legend,
          streamIndex,
        });
      }

      if (currentDiff * nextDiff < 0) {
        const ratio = currentDiff / (currentDiff - nextDiff);
        const timestamp =
          currentPoint.t + (nextPoint.t - currentPoint.t) * ratio;

        if (timestamp >= domainStart && timestamp <= domainEnd) {
          pushLineChartIntersection(intersections, {
            timestamp,
            value: thresholdValue,
            legend: stream.legend,
            streamIndex,
          });
        }
      }

      if (
        nextDiff === 0 &&
        nextPoint.t >= domainStart &&
        nextPoint.t <= domainEnd
      ) {
        pushLineChartIntersection(intersections, {
          timestamp: nextPoint.t,
          value: thresholdValue,
          legend: stream.legend,
          streamIndex,
        });
      }
    }

    return intersections.filter(
      (intersection) =>
        intersection.timestamp >= domainStart &&
        intersection.timestamp <= domainEnd,
    );
  });
};

export const getLineChartStep = (dateRange: ILineChartDateRange): number => {
  const [startDate, endDate] = dateRange;
  const range = endDate.valueOf() - startDate.valueOf();

  if (range <= 2 * 60 * 60 * 1000) {
    return SECOND * 30 * 1000;
  }
  if (range <= 24 * 60 * 60 * 1000) {
    return MINUTE * 5 * 1000;
  }
  if (range <= 7 * 24 * 60 * 60 * 1000) {
    return MINUTE * 30 * 1000;
  }
  if (range <= 30 * 24 * 60 * 60 * 1000) {
    return DAY * 1000;
  }
  return DAY * 1000;
};

export const filterLineChartDataOverlapping = <
  Data extends {
    t: number;
    v?: number;
  } = {
    t: number;
    v?: number;
  },
>(
  data: Data[],
  startTimestamp: number,
  length: number,
  step: number,
  tolerance: number,
) => {
  const points = [...new Array(Math.round(length))]
    .map((_, index) => {
      return startTimestamp + index * step;
    })
    .map((timestamp) => {
      const closestPoint = _.minBy(
        data.filter((value) => {
          return Math.abs(value.t - timestamp) < tolerance;
        }),
        (value) => {
          return Math.abs(value.t - timestamp);
        },
      );
      if (closestPoint == null) {
        return {
          t: timestamp,
          v: -Infinity,
        };
      }
      return closestPoint;
    });
  return points;
};

export const convertLineChartDataStruct = (
  streams: ILineChartDataPoint[][],
) => {
  const points: ILineChartDataPoint[] = streams.flatMap((points, index) => {
    return points.map((point) => {
      return { ...point, [`v${index}`]: point.v };
    });
  });

  const groupedPoints = _.groupBy(points, (point) => {
    return point.t;
  });

  const combinedPoints = Object.entries(groupedPoints).map(([key, values]) => {
    return values.reduce((p, c) => {
      const { v, ...values } = {
        ...p,
        ...c,
      };
      return values;
    }, {} as ILineChartDataPoint);
  });

  return combinedPoints;
};

export const filterLineChartOverlappingMetric = (
  metric: ILineChartMetric,
  dateRange: ILineChartDateRange,
) => {
  const range = getLineChartRangeTimestamp(dateRange);
  return {
    ...metric,
    sample_streams: metric.sample_streams.map((stream) => ({
      ...stream,
      points: filterLineChartDataOverlapping(
        stream.points,
        dateRange[0].valueOf(),
        range / stream.step,
        stream.step,
        stream.tolerance,
      ),
    })),
  };
};

export const deletePointsOutOfRange = (
  data: ILineChartDataPoint[],
  timeRange: ILineChartDateRange,
  now: number,
) => {
  const first = now - getLineChartRangeTimestamp(timeRange);
  return (
    data?.filter((item) => {
      return item.t >= first && item.t <= now;
    }) || []
  );
};

export const getFirstExpectedTimestamp = (
  data: ILineChartDataPoint[],
  timeRange: ILineChartDateRange,
  now: number,
  step: number,
  dateRange: ILineChartDateRange | undefined,
) => {
  const first = timeRange
    ? now - getLineChartRangeTimestamp(timeRange)
    : dayjs(dateRange?.[0]).valueOf();
  const firstRealTimestamp = data[0].t;
  return (
    firstRealTimestamp - Math.floor((firstRealTimestamp - first) / step) * step
  );
};

const getFaultToleranceTime = (timeRange: ILineChartDateRange) => {
  const [startDate, endDate] = timeRange;
  const range = endDate.valueOf() - startDate.valueOf();
  switch (range) {
    case 5 * MINUTE:
      return 5 * 1000;
    case 15 * MINUTE:
      return 15 * 1000;
    case 1 * HOUR:
      return 60 * 1000;
    case 2 * HOUR:
      return 120 * 1000;
    case 24 * HOUR:
      return 10 * 60 * 1000;
    case 7 * DAY:
    case 30 * DAY:
      return 60 * 60 * 1000;
    case 182 * DAY:
      return 24 * 60 * 60 * 1000;
  }
  return 120 * 1000;
};

export const addMissingDataWithZero = (
  data: ILineChartDataPoint[],
  timeRange: ILineChartDateRange,
  unit: ILineChartMetricUnit,
  step: number,
  dateRange?: ILineChartDateRange,
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
    step,
    dateRange,
  );
  const expectedPoints: ILineChartDataPoint[] = [];
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
  return filterLineChartPointsByDateRange(
    expectedPoints.map((p) => ({ ...p, unit })),
    dateRange,
  );
};

// TODO: improve type
export const convertLineChartUnit = (
  value: number,
  from: string,
  to: string,
  decimals?: number,
) => {
  if (from === to || !value) return value;
  const ruleIndex = unitRules.findIndex((rule) => rule.unit.includes(from));
  if (ruleIndex === -1) {
    return value;
  }
  const { unit, divider } = unitRules[ruleIndex];
  let fromIdx = unit.indexOf(from);
  const toIdx = unit.indexOf(to);
  if (toIdx === -1) {
    return value;
  }

  if (fromIdx < toIdx) {
    while (fromIdx < toIdx) {
      value /= divider[fromIdx];
      fromIdx++;
    }
  } else {
    while (fromIdx > toIdx) {
      value *= divider[fromIdx - 1];
      fromIdx--;
    }
  }

  return _.isInteger(value)
    ? value
    : _.isNil(decimals)
      ? value
      : parseFloat(value.toFixed(decimals));
};

export const UNIT_FORMATTER = {
  [ILineChartMetricUnit.Percent]: [formatPercent, "%", 2, false],
  [ILineChartMetricUnit.Ratio]: [formatPercent, "%"],
  [ILineChartMetricUnit.Count]: [formatCount, ""],
  [ILineChartMetricUnit.DataSize]: [formatBytes, "B"],
  [ILineChartMetricUnit.DataRateByte]: [formatBps, "Bps"],
  [ILineChartMetricUnit.DataRateBit]: [formatBitPerSecond, "bps"],
  [ILineChartMetricUnit.Time]: [formatNanoSecond, "ns"],
  [ILineChartMetricUnit.Frequency]: [formatFrequency, "Hz"],
  [ILineChartMetricUnit.Temperature]: [formatTemperature, "℃"],
  [ILineChartMetricUnit.Load]: [formatCount, ""],
} as const;

export const getLineChartYDataMax = (
  dataPoints: ILineChartDataPoint[],
  type: ILineChartGraphType,
  extraValues: number[] = [],
) => {
  const values = dataPoints.map((p) => {
    if (_.isNumber(p?.v)) {
      return p.v;
    }
    const entries = Object.entries(p);
    if (type === ILineChartGraphType.Stack) {
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
  return Math.max(
    ...values,
    0,
    ...extraValues.filter((value) => Number.isFinite(value)),
  );
};

export const getYAxisUpperBound = (max: number, type: ILineChartMetricUnit) => {
  const DIVISOR = 2;
  switch (type) {
    case ILineChartMetricUnit.Count:
    case ILineChartMetricUnit.Load:
    case ILineChartMetricUnit.DataSize:
    case ILineChartMetricUnit.DataRateByte:
    case ILineChartMetricUnit.Time:
    case ILineChartMetricUnit.Frequency:
    case ILineChartMetricUnit.DataRateBit:
    case ILineChartMetricUnit.Temperature: {
      const [format, base] = UNIT_FORMATTER[type];
      const { value, unit } = format(max);
      const _value = Math.ceil(Number(value) / DIVISOR) * DIVISOR;
      return convertLineChartUnit(_value, unit, base);
    }
    case ILineChartMetricUnit.Percent: {
      const [format, base, decimals, saturated] = UNIT_FORMATTER[type];
      const { value, unit } = format(max, decimals, saturated);
      const _value = Math.ceil(Number(value) / DIVISOR) * DIVISOR;
      return convertLineChartUnit(_value, unit, base);
    }
    case ILineChartMetricUnit.Ratio: {
      const [format, base] = UNIT_FORMATTER[type];
      const { value, unit } = format(max * 100);
      const _value = Math.ceil(Number(value) / DIVISOR) * DIVISOR;
      return convertLineChartUnit(_value, unit, base) / 100;
    }
    default:
      return 2;
  }
};

export const getYAxisDomain = (
  dataPoints: ILineChartDataPoint[],
  graphType: ILineChartGraphType,
  unitType: ILineChartMetricUnit,
  extraValues: number[] = [],
): [number, number] => {
  const max = getLineChartYDataMax(dataPoints, graphType, extraValues);
  if (!max) {
    if (unitType === ILineChartMetricUnit.Ratio) {
      return [0, 1];
    } else {
      return [0, 2];
    }
  }
  return [0, getYAxisUpperBound(max, unitType)];
};

export function lineChartYaxisTickFormatter(
  value?: number,
  unit?: ILineChartMetricUnit,
) {
  if (_.isNil(unit)) {
    return `${value}`;
  }
  if (_.isNil(value)) {
    return "0";
  }
  const [format] = UNIT_FORMATTER[unit];
  const { value: _value, unit: _unit } = format(value);
  return `${_value} ${_unit}`;
}
