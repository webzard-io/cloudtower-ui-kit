export interface ILineChartLinePoint {
  t: number;
  x: number;
  y: number;
}

export interface ILineChartLinePointInput {
  t?: number;
  x?: number | null;
  y?: number | null;
}

export interface ILineChartLineSegment {
  dashed: boolean;
  points: ILineChartLinePoint[];
}

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const getLineChartLinePoint = (
  point: ILineChartLinePointInput,
): ILineChartLinePoint | undefined => {
  if (
    !isFiniteNumber(point.t) ||
    !isFiniteNumber(point.x) ||
    !isFiniteNumber(point.y)
  ) {
    return undefined;
  }

  return {
    t: point.t,
    x: point.x,
    y: point.y,
  };
};

const getLineChartBoundaryPoint = (
  previous: ILineChartLinePoint,
  next: ILineChartLinePoint,
  timestamp: number,
): ILineChartLinePoint | undefined => {
  const duration = next.t - previous.t;

  if (!duration) {
    return undefined;
  }

  const ratio = (timestamp - previous.t) / duration;

  return {
    t: timestamp,
    x: previous.x + (next.x - previous.x) * ratio,
    y: previous.y + (next.y - previous.y) * ratio,
  };
};

export const getLineChartLineSegments = (
  points: ILineChartLinePointInput[],
  forecastStartTimestamp?: number,
): ILineChartLineSegment[] => {
  const segments: ILineChartLineSegment[] = [];
  const hasForecastStart = isFiniteNumber(forecastStartTimestamp);
  let continuousPoints: ILineChartLinePoint[] = [];

  const flushContinuousPoints = () => {
    if (continuousPoints.length < 2) {
      continuousPoints = [];
      return;
    }

    let segmentPoints: ILineChartLinePoint[] = [continuousPoints[0]];
    let dashed = Boolean(
      hasForecastStart && continuousPoints[0].t >= forecastStartTimestamp!,
    );

    const pushSegment = () => {
      if (segmentPoints.length >= 2) {
        segments.push({ dashed, points: segmentPoints });
      }
    };

    for (let index = 1; index < continuousPoints.length; index += 1) {
      const previous = continuousPoints[index - 1];
      const next = continuousPoints[index];
      const nextDashed = Boolean(
        hasForecastStart && next.t >= forecastStartTimestamp!,
      );

      if (hasForecastStart && nextDashed !== dashed) {
        const boundaryPoint = getLineChartBoundaryPoint(
          previous,
          next,
          forecastStartTimestamp!,
        );

        if (boundaryPoint) {
          segmentPoints.push(boundaryPoint);
          pushSegment();
          segmentPoints = [boundaryPoint];
          if (boundaryPoint.t !== next.t) {
            segmentPoints.push(next);
          }
          dashed = nextDashed;
          continue;
        }
      }

      segmentPoints.push(next);
    }

    pushSegment();
    continuousPoints = [];
  };

  points.forEach((point) => {
    const linePoint = getLineChartLinePoint(point);

    if (!linePoint) {
      flushContinuousPoints();
      return;
    }

    continuousPoints.push(linePoint);
  });

  flushContinuousPoints();

  return segments;
};

export const getLineChartLinePath = (points: ILineChartLinePoint[]) => {
  return points
    .map((point, index) => {
      return `${index === 0 ? "M" : "L"}${point.x},${point.y}`;
    })
    .join(" ");
};
