import { DAY, HOUR, MINUTE, SECOND } from "@tower/utils";
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
  dateRange: DateRange
): IDataPoint[] {
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

function getRangeTimestamp(dateRange: DateRange) {
  const [startDate, endDate] = dateRange;

  return endDate.valueOf() - startDate.valueOf();
}

export const xaxisCal = (lastTime: number, dateRange: DateRange) => {
  const tangeTime = getRangeTimestamp(dateRange);
  const tick = tangeTime / 4;

  const msPerMinute = MINUTE * 1000;
  const lastTimeMinute = dayjs(lastTime).minute();
  const baseline =
    lastTimeMinute < 30
      ? lastTime - lastTimeMinute * msPerMinute
      : lastTime - lastTimeMinute * msPerMinute + msPerMinute * 30;

  return [baseline - tick * 3, baseline - tick * 2, baseline - tick, baseline];
};

export const tickFormatter = (tick: number, dateRange: DateRange) => {
  const rangeTime = getRangeTimestamp(dateRange);
  if (rangeTime <= 2 * HOUR * 1000) {
    return dayjs(tick).format("HH:mm:ss");
  }
  if (rangeTime <= 4 * DAY * 1000) {
    return dayjs(tick).format("MM/DD HH:mm:ss");
  }
  return dayjs(tick).format("MM/DD");
};

export function getXAxisDomain(
  dateRange: DateRange,
  xaxisLastTime?: number
): [number, number] {
  const [startDate, endDate] = dateRange;

  return [startDate.valueOf(), xaxisLastTime ?? endDate.valueOf()];
}

export const getMs = (dateRange: DateRange): number => {
  const [startDate, endDate] = dateRange;
  return endDate.valueOf() - startDate.valueOf();
};

export const getStep = (dateRange: DateRange): number => {
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

const filterDataOverlapping = (
  data: {
    t: number;
    v?: number;
  }[],
  startTimestamp: number,
  length: number,
  step: number,
  tolerance: number
) => {
  const points = [...new Array(length)]
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
        }
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
  dateRange: DateRange,
  now: number,
  step: number
) => {
  if (data.length === 0) {
    return;
  }
  const first = now - getMs(dateRange);
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
  dateRange: DateRange;
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

export const convertDataStruct = (streams: IDataPoint[][]) => {
  const points: IDataPoint[] = streams.flatMap((points, index) => {
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
    }, {} as IDataPoint);
  });

  return combinedPoints;
};

export const transformData = (
  streams: IMetricStream[],
  dateRange: DateRange
) => {
  const [startDate] = dateRange;
  const step = getStep(dateRange);
  const tolerance = step / 2 - step / 10;
  const range = getMs(dateRange);
  const length = range / step;

  const filledStreams = streams.map((stream) => {
    const points = filterDataOverlapping(
      stream.points,
      startDate.valueOf(),
      stream.step == null ? length : range / stream.step,
      stream.step ?? step,
      stream.tolerance ?? tolerance
    );
    return points;
  });

  const converted = convertDataStruct(filledStreams);

  return converted;
};
