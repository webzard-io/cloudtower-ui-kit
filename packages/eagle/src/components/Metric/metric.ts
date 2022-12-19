import { DAY, HOUR, MINUTE, WEEK } from "@tower/utils";
import dayjs from "dayjs";
import _ from "lodash";

import {
  DateRange,
  GraphType,
  IDataPoint,
  IMetric,
  IMetricStream,
  TimeUnit,
} from "./type";

export function filterPointsByDateRange(
  points: IDataPoint[],
  dateRange?: DateRange | undefined | null
): IDataPoint[] {
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
  areaChartData: IDataPoint[],
  points: IDataPoint[],
  range: string,
  dateRange?: DateRange | undefined
): [number, number] {
  if (areaChartData.length === 0 || points.length === 0) {
    return [0, 0];
  }
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

export const getMs = (timeRange: string): number => {
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
  data: IDataPoint[],
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

export const getFaultToleranceTime = (timeRange: string) => {
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
  data: IDataPoint[],
  timeRange: string,
  unit: string,
  step: number,
  dateRange?: DateRange,
  now = Date.now()
) => {
  const inRangePoints = deletePointsOutOfRange(data, timeRange, now);

  const firsExpectedTimestamp = getFirstExpectedTimestamp(
    inRangePoints,
    timeRange,
    now,
    step
  );
  const expectedPoints: IDataPoint[] = [];
  // Infinity means no value
  const tolerance = getFaultToleranceTime(timeRange);
  if (
    firsExpectedTimestamp != null &&
    inRangePoints[0]?.t - firsExpectedTimestamp > tolerance + step
  ) {
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

export const getYDataMax = (dataPoints: IDataPoint[], type: GraphType) => {
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

export const getFirstExpectedTimestamp = (
  data: IDataPoint[],
  timeRange: string,
  now: number,
  step: number
) => {
  if (data.length === 0) {
    return;
  }
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

export const toLocalTime = (now: number, shift: number) =>
  new Date(now - shift).toISOString().slice(0, -5);

export type MetricRefType = {
  exportCSV: (filename: string) => void;
  getCSVFileData: (filename?: string) => {
    data: string;
    filename: string;
    filetype: string;
  };
};

export const formatStreams = (params: {
  metric: IMetric;
  dateRange?: DateRange | null;
}) => {
  const { metric, dateRange } = params;

  return metric.sample_streams.map((sample_stream) => {
    if (sample_stream.points) {
      const points = filterPointsByDateRange(sample_stream.points, dateRange);
      return {
        ...sample_stream,
        points,
      };
    }

    return sample_stream;
  });
};

export const transformData = (
  streams: IMetricStream[],
  range: string,
  unit: string,
  step: number,
  dateRange?: DateRange,
  now = Date.now()
) => {
  const result =
    streams.length === 1
      ? addMissingDataWithZero(
          streams[0]?.points ?? [],
          range,
          unit,
          step,
          dateRange,
          now
        )
      : convertDataForMultiArea(streams, range, unit, step, dateRange, now);
  return result;
};

export const convertDataForMultiArea = (
  streams: IMetricStream[],
  range: string,
  unit: string,
  step: number,
  dateRange?: DateRange,
  now = Date.now()
) => {
  const data = streams.map((item) => {
    const points = addMissingDataWithZero(
      item?.points || [],
      range,
      unit,
      step,
      dateRange,
      now
    );

    return {
      ...item,
      points,
    };
  });
  if (data[0]?.points == null || data[0]?.points?.length === 0) {
    return [];
  }
  const finalData: IDataPoint[] = [];
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

  return filterPointsByDateRange(finalData, dateRange);
};
