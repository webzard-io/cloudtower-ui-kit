import {
  ILineChartAreaHighlightRange,
  ILineChartDataPoint,
} from "@src/core/LineChart/type";

export interface ILineChartAreaHighlightPoint {
  t: number;
  value: number;
}

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const getLineChartInterpolatedValue = (
  currentPoint: ILineChartDataPoint,
  nextPoint: ILineChartDataPoint,
  timestamp: number,
) => {
  if (
    !isFiniteNumber(currentPoint.v) ||
    !isFiniteNumber(nextPoint.v) ||
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

  return (
    Math.abs(prev.t - next.t) < 1e-6 && Math.abs(prev.value - next.value) < 1e-6
  );
};

const pushLineChartAreaHighlightPoint = (
  points: ILineChartAreaHighlightPoint[],
  next: ILineChartAreaHighlightPoint,
) => {
  if (!isSameAreaHighlightPoint(points[points.length - 1], next)) {
    points.push(next);
  }
};

const getLineChartAreaHighlightPointRuns = (
  points: ILineChartDataPoint[],
  range: Pick<ILineChartAreaHighlightRange, "start" | "end">,
) => {
  const runs: ILineChartAreaHighlightPoint[][] = [];
  let highlightedPoints: ILineChartAreaHighlightPoint[] = [];

  const flushHighlightedPoints = () => {
    if (highlightedPoints.length >= 2) {
      runs.push(highlightedPoints);
    }
    highlightedPoints = [];
  };

  for (let index = 0; index < points.length - 1; index++) {
    const currentPoint = points[index];
    const nextPoint = points[index + 1];

    if (
      !isFiniteNumber(currentPoint?.t) ||
      !isFiniteNumber(nextPoint?.t) ||
      !isFiniteNumber(currentPoint?.v) ||
      !isFiniteNumber(nextPoint?.v) ||
      currentPoint.t === nextPoint.t
    ) {
      flushHighlightedPoints();
      continue;
    }

    if (nextPoint.t < range.start || currentPoint.t > range.end) {
      continue;
    }

    const segmentStart = Math.max(range.start, currentPoint.t);
    const segmentEnd = Math.min(range.end, nextPoint.t);

    if (segmentStart >= segmentEnd) {
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

    if (!isFiniteNumber(startValue) || !isFiniteNumber(endValue)) {
      flushHighlightedPoints();
      continue;
    }

    const startPoint = {
      t: segmentStart,
      value: startValue,
    };
    const endPoint = {
      t: segmentEnd,
      value: endValue,
    };

    if (
      highlightedPoints.length &&
      isSameAreaHighlightPoint(
        highlightedPoints[highlightedPoints.length - 1],
        startPoint,
      )
    ) {
      pushLineChartAreaHighlightPoint(highlightedPoints, endPoint);
    } else {
      flushHighlightedPoints();
      highlightedPoints = [startPoint, endPoint];
    }
  }

  flushHighlightedPoints();

  return runs;
};

export const getLineChartAreaHighlightRuns = (
  points: ILineChartDataPoint[],
  range: Pick<ILineChartAreaHighlightRange, "start" | "end">,
) =>
  getLineChartAreaHighlightPointRuns(points, range).filter(
    (run) => run.length >= 2,
  );

/**
 * Keeps the original flattened return shape for consumers of the exported helper.
 * The chart renderer uses getLineChartAreaHighlightRuns to preserve gaps.
 */
export const getLineChartAreaHighlightData = (
  points: ILineChartDataPoint[],
  range: Pick<ILineChartAreaHighlightRange, "start" | "end">,
) => {
  const highlightedPoints: ILineChartAreaHighlightPoint[] = [];

  for (let index = 0; index < points.length - 1; index++) {
    const currentPoint = points[index];
    const nextPoint = points[index + 1];

    if (
      !isFiniteNumber(currentPoint?.t) ||
      !isFiniteNumber(nextPoint?.t) ||
      !isFiniteNumber(currentPoint?.v) ||
      !isFiniteNumber(nextPoint?.v) ||
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

    if (!isFiniteNumber(startValue) || !isFiniteNumber(endValue)) {
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
