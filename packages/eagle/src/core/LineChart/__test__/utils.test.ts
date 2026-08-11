import {
  ILineChartGraphType,
  ILineChartMetricUnit,
} from "@src/core/LineChart/type";
import {
  getLineChartAreaHighlightData,
  getLineChartAreaHighlightRanges,
  getLineChartLineSegments,
  getLineChartMetricPayloadMatches,
  getLineChartThresholdIntersections,
  getYAxisDomain,
} from "@src/core/LineChart/utils";
import { describe, expect, it } from "vitest";

describe("LineChart utils", () => {
  it("clips area highlight ranges and keeps legend binding", () => {
    expect(
      getLineChartAreaHighlightRanges(
        [
          {
            start: 0,
            end: 40,
            fill: "#ff4d4f",
            legendId: "cpu",
          },
          {
            start: 120,
            end: 80,
            fill: "#1890ff",
          },
        ],
        [20, 100],
      ),
    ).toEqual([
      {
        start: 20,
        end: 40,
        fill: "#ff4d4f",
        legendId: "cpu",
      },
    ]);
  });

  it("calculates area highlight points with boundary interpolation", () => {
    expect(
      getLineChartAreaHighlightData(
        [
          {
            t: 0,
            v: 0,
          },
          {
            t: 10,
            v: 10,
          },
          {
            t: 20,
            v: 0,
          },
        ],
        {
          start: 5,
          end: 15,
        },
      ),
    ).toEqual([
      {
        t: 5,
        value: 5,
      },
      {
        t: 10,
        value: 10,
      },
      {
        t: 15,
        value: 5,
      },
    ]);
  });

  it("splits a line at an interpolated forecast boundary", () => {
    expect(
      getLineChartLineSegments(
        [
          { t: 0, x: 0, y: 0 },
          { t: 10, x: 10, y: 20 },
          { t: 20, x: 20, y: 0 },
        ],
        15,
      ),
    ).toEqual([
      {
        dashed: false,
        points: [
          { t: 0, x: 0, y: 0 },
          { t: 10, x: 10, y: 20 },
          { t: 15, x: 15, y: 10 },
        ],
      },
      {
        dashed: true,
        points: [
          { t: 15, x: 15, y: 10 },
          { t: 20, x: 20, y: 0 },
        ],
      },
    ]);
  });

  it("keeps an exact forecast point in both adjoining line segments", () => {
    const segments = getLineChartLineSegments(
      [
        { t: 0, x: 0, y: 0 },
        { t: 10, x: 10, y: 10 },
        { t: 20, x: 20, y: 20 },
      ],
      10,
    );

    expect(segments[0]).toEqual({
      dashed: false,
      points: [
        { t: 0, x: 0, y: 0 },
        { t: 10, x: 10, y: 10 },
      ],
    });
    expect(segments[1]).toEqual({
      dashed: true,
      points: [
        { t: 10, x: 10, y: 10 },
        { t: 20, x: 20, y: 20 },
      ],
    });
  });

  it("handles out-of-range forecast boundaries and invalid points", () => {
    const points = [
      { t: 0, x: 0, y: 0 },
      { t: 10, x: 10, y: 10 },
      { t: 20, x: null, y: null },
      { t: 30, x: 30, y: 30 },
      { t: 40, x: 40, y: 40 },
    ];

    expect(getLineChartLineSegments(points, -1)).toEqual([
      {
        dashed: true,
        points: [
          { t: 0, x: 0, y: 0 },
          { t: 10, x: 10, y: 10 },
        ],
      },
      {
        dashed: true,
        points: [
          { t: 30, x: 30, y: 30 },
          { t: 40, x: 40, y: 40 },
        ],
      },
    ]);
    expect(getLineChartLineSegments(points, 100)).toEqual([
      {
        dashed: false,
        points: [
          { t: 0, x: 0, y: 0 },
          { t: 10, x: 10, y: 10 },
        ],
      },
      {
        dashed: false,
        points: [
          { t: 30, x: 30, y: 30 },
          { t: 40, x: 40, y: 40 },
        ],
      },
    ]);
    expect(getLineChartLineSegments(points)).toEqual([
      {
        dashed: false,
        points: [
          { t: 0, x: 0, y: 0 },
          { t: 10, x: 10, y: 10 },
        ],
      },
      {
        dashed: false,
        points: [
          { t: 30, x: 30, y: 30 },
          { t: 40, x: 40, y: 40 },
        ],
      },
    ]);
  });

  it("calculates threshold intersections with interpolation and removes endpoint duplicates", () => {
    const legend = {
      id: "cpu",
      name: "CPU",
      color: "#1890ff",
    };

    const intersections = getLineChartThresholdIntersections(
      [
        {
          legend,
          step: 1,
          tolerance: 0,
          points: [
            {
              t: 0,
              v: 0,
            },
            {
              t: 10,
              v: 5,
            },
            {
              t: 20,
              v: 10,
            },
            {
              t: 30,
              v: 0,
            },
          ],
        },
      ],
      5,
      [0, 30],
    );

    expect(intersections).toEqual([
      {
        timestamp: 10,
        value: 5,
        legend,
        streamIndex: 0,
      },
      {
        timestamp: 25,
        value: 5,
        legend,
        streamIndex: 0,
      },
    ]);
  });

  it("does not emit repeated markers for a flat segment that stays on the threshold", () => {
    const legend = {
      id: "memory",
      name: "Memory",
      color: "#52c41a",
    };

    const intersections = getLineChartThresholdIntersections(
      [
        {
          legend,
          step: 1,
          tolerance: 0,
          points: [
            {
              t: 0,
              v: 0,
            },
            {
              t: 10,
              v: 5,
            },
            {
              t: 20,
              v: 5,
            },
            {
              t: 30,
              v: 10,
            },
          ],
        },
      ],
      5,
      [0, 30],
    );

    expect(intersections).toEqual([
      {
        timestamp: 10,
        value: 5,
        legend,
        streamIndex: 0,
      },
      {
        timestamp: 20,
        value: 5,
        legend,
        streamIndex: 0,
      },
    ]);
  });

  it("extends the computed y-axis domain when a threshold is above the data max", () => {
    const domain = getYAxisDomain(
      [
        {
          t: 0,
          v0: 1,
        },
        {
          t: 1,
          v0: 2,
        },
      ],
      ILineChartGraphType.Area,
      ILineChartMetricUnit.Count,
      [10],
    );

    expect(domain[1]).toBeGreaterThanOrEqual(10);
  });

  it("filters overlay payloads and keeps the real metric payload order", () => {
    const legends = [
      {
        id: "forecast",
        name: "Forecast",
        color: "#8f63ff",
      },
    ];

    const overlayPayload = {
      name: "line-chart-area-highlight-forecast",
      payload: {
        t: 1000,
        value: 3,
      },
      value: 3,
    };
    const metricPayload = {
      name: "v0",
      payload: {
        t: 2000,
        v: 8,
        v0: 8,
      },
      value: 8,
    };

    expect(
      getLineChartMetricPayloadMatches([overlayPayload, metricPayload], legends),
    ).toEqual([
      {
        legend: legends[0],
        payload: metricPayload,
      },
    ]);
  });

  it("returns an empty payload match list when only highlight overlays are present", () => {
    expect(
      getLineChartMetricPayloadMatches(
        [
          {
            name: "line-chart-area-highlight-forecast",
            payload: {
              t: 1000,
              value: 3,
            },
            value: 3,
          },
        ],
        [
          {
            id: "forecast",
            name: "Forecast",
            color: "#8f63ff",
          },
        ],
      ),
    ).toEqual([]);
  });
});
