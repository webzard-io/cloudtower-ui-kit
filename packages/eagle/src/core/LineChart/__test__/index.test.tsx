import { render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Payload } from "recharts/types/component/DefaultTooltipContent";

import LineChart from "@src/core/LineChart";
import {
  ILineChartDateRange,
  ILineChartGraphType,
  ILineChartMetricUnit,
  LineChartProps,
} from "@src/core/LineChart/type";

vi.mock("@src/core/LineChart/Pointer", () => {
  return {
    default: () =>
      React.createElement("div", {
        "data-testid": "mock-line-chart-pointer",
        className: "pointer-wrapper",
      }),
  };
});

vi.mock("@src/core/LineChart/RenderChart", () => {
  const MockRenderChart = (props: {
    onWrapperBackgroundRangesLayoutChange?: (
      layouts: Array<{
        key: string;
        left: number;
        width: number;
        fill: string;
        fillOpacity: number;
      }>,
    ) => void;
  }) => {
    React.useEffect(() => {
      props.onWrapperBackgroundRangesLayoutChange?.([
        {
          key: "wrapper-range",
          left: 48,
          width: 120,
          fill: "#ff7875",
          fillOpacity: 0.18,
        },
      ]);
    }, [props.onWrapperBackgroundRangesLayoutChange]);

    return React.createElement("div", {
      "data-testid": "mock-line-chart-render-chart",
    });
  };

  return {
    __esModule: true,
    default: MockRenderChart,
  };
});

const dateRange: ILineChartDateRange = [
  dayjs("2026-01-06T00:00:00.000Z"),
  dayjs("2026-01-06T00:30:00.000Z"),
];

const chartProps: LineChartProps["chartProps"] = {
  syncId: "line-chart-wrapper-background",
  mode: "legend" as const,
  showLegend: true,
  metricName: "Wrapper Background Demo",
  height: 180,
  type: ILineChartGraphType.Area,
  dateRange,
  showXAxis: true,
  tooltipProps: {
    format: (payload: Payload<number, string>) => `${payload.value ?? ""}`,
  },
  metric: {
    sample_streams: [],
    unit: ILineChartMetricUnit.Count,
    dropped: false,
  },
};

describe("LineChart", () => {
  it("renders a wrapper-height background overlay when wrapper mode is configured", () => {
    render(
      <LineChart
        chartProps={{
          ...chartProps,
          backgroundRanges: [
            {
              start: dateRange[0].valueOf(),
              end: dateRange[0].add(10, "minute").valueOf(),
              fill: "#ff7875",
              fillOpacity: 0.18,
              fullHeight: true,
              fullHeightTarget: "wrapper",
            },
          ],
        }}
      />,
    );

    const overlay = screen.getByTestId("line-chart-wrapper-background-overlay");
    const segment = screen.getByTestId("line-chart-wrapper-background-segment");

    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveStyle({ pointerEvents: "none" });
    expect(segment).toHaveStyle({
      left: "48px",
      width: "120px",
      backgroundColor: "rgb(255, 120, 117)",
      opacity: "0.18",
      top: "0px",
      bottom: "0px",
    });
    expect(screen.getByTestId("mock-line-chart-pointer")).toBeInTheDocument();
  });

  it("does not render a wrapper overlay for plot-area or surface background ranges", () => {
    const { rerender } = render(
      <LineChart
        chartProps={{
          ...chartProps,
          backgroundRanges: [
            {
              start: dateRange[0].valueOf(),
              end: dateRange[0].add(10, "minute").valueOf(),
              fill: "#ff7875",
            },
          ],
        }}
      />,
    );

    expect(
      screen.queryByTestId("line-chart-wrapper-background-overlay"),
    ).not.toBeInTheDocument();

    rerender(
      <LineChart
        chartProps={{
          ...chartProps,
          backgroundRanges: [
            {
              start: dateRange[0].valueOf(),
              end: dateRange[0].add(10, "minute").valueOf(),
              fill: "#ff7875",
              fullHeight: true,
              fullHeightTarget: "surface",
            },
          ],
        }}
      />,
    );

    expect(
      screen.queryByTestId("line-chart-wrapper-background-overlay"),
    ).not.toBeInTheDocument();
  });
});
