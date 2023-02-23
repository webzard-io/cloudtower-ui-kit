import dayjs from "dayjs";
import _ from "lodash";

import { DAY, HOUR, MINUTE, SECOND } from "../../utils/tower";
import { DateRange, IDataPoint, IMetric } from "./type";

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

export const filterDataOverlapping = <
  Data extends {
    t: number;
    v?: number;
  } = {
    t: number;
    v?: number;
  }
>(
  data: Data[],
  startTimestamp: number,
  length: number,
  step: number,
  tolerance: number
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

export type MetricRefType = {
  exportCSV: (filename: string) => void;
  getCSVFileData: (filename?: string) => {
    data: string;
    filename: string;
    filetype: string;
  };
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

export const filterOverlappingMetric = (
  metric: IMetric,
  dateRange: DateRange
) => {
  const range = getMs(dateRange);
  return {
    ...metric,
    sample_streams: metric.sample_streams.map((stream) => ({
      ...stream,
      points: filterDataOverlapping(
        stream.points,
        dateRange[0].valueOf(),
        range / stream.step,
        stream.step,
        stream.tolerance
      ),
    })),
  };
};
