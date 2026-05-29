import {
  ILineChartGraphType,
  ILineChartMetricUnit,
} from "@src/core/LineChart/type";
import {
  getLineChartAreaHighlightData,
  getLineChartAreaHighlightRanges,
  getLineChartBackgroundRanges,
  getLineChartMetricPayloadMatches,
  getLineChartThresholdIntersections,
  getYAxisDomain,
} from "@src/core/LineChart/utils";
import { describe, expect, it } from "vitest";

describe("LineChart utils", () => {
  it("clips background ranges to the current x domain and filters invalid ranges", () => {
    expect(
      getLineChartBackgroundRanges(
        [
          {
            start: 0,
            end: 50,
            fill: "#ff4d4f",
          },
          {
            start: 120,
            end: 80,
            fill: "#1890ff",
          },
          {
            start: 160,
            end: 260,
            fill: "#52c41a",
            fillOpacity: 0.2,
          },
        ],
        [20, 200],
      ),
    ).toEqual([
      {
        start: 20,
        end: 50,
        fill: "#ff4d4f",
      },
      {
        start: 160,
        end: 200,
        fill: "#52c41a",
        fillOpacity: 0.2,
      },
    ]);
  });

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
