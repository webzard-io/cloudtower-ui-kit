import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import dayjs from "dayjs";
import { describe, expect, it, vi } from "vitest";

import KitStoreProvider from "@src/core/KitStoreProvider";
import RenderChart from "@src/core/LineChart/RenderChart";
import {
  ILineChartGraphType,
  ILineChartMetricUnit,
} from "@src/core/LineChart/type";

vi.mock("@src/core/LineChart/LineChartLegend", () => {
  const ColorBlock = ({ background }: { background?: string }) => {
    return <span data-testid="mock-line-chart-color-block">{background}</span>;
  };

  return {
    LineChartColorBlock: ColorBlock,
    default: () => <div data-testid="mock-line-chart-legend" />,
  };
});

vi.mock("@src/core/LineChart/LineChartToolBar", () => {
  return {
    default: () => <div data-testid="mock-line-chart-toolbar" />,
  };
});

vi.mock("recharts", async () => {
  const actual = await vi.importActual<typeof import("recharts")>("recharts");

  return {
    ...actual,
    ResponsiveContainer: ({
      children,
      height,
    }: {
      children: React.ReactNode;
      height?: number | string;
    }) => {
      const resolvedHeight =
        typeof height === "number" ? height : Number.parseInt(`${height}`, 10);

      return (
        <div
          data-testid="mock-responsive-container"
          style={{ height: resolvedHeight || 180, width: 800 }}
        >
          {React.isValidElement(children)
            ? React.cloneElement(children as React.ReactElement<any>, {
                height: resolvedHeight || 180,
                width: 800,
              })
            : children}
        </div>
      );
    },
  };
});

const minute = 60 * 1000;
const rangeStart = dayjs("2026-01-06T00:00:00.000Z");
const rangeEnd = rangeStart.add(30, "minute");

const metric = {
  sample_streams: [
    {
      legend: {
        id: "forecast",
        name: "存储预计使用量",
        color: "#8f63ff",
        fill: "#efe9ff",
      },
      step: minute,
      tolerance: 0,
      points: [
        {
          t: rangeStart.valueOf(),
          v: 2,
        },
        {
          t: rangeStart.add(10, "minute").valueOf(),
          v: 8,
        },
        {
          t: rangeStart.add(20, "minute").valueOf(),
          v: 4,
        },
        {
          t: rangeEnd.valueOf(),
          v: 9,
        },
      ],
    },
  ],
  unit: ILineChartMetricUnit.Percent,
  dropped: false,
};

const renderChart = (
  customProps?: Partial<React.ComponentProps<typeof RenderChart>>,
) => {
  return render(
    <KitStoreProvider>
      <RenderChart
        metricName="容量预测"
        syncId="line-chart-threshold"
        height={180}
        type={ILineChartGraphType.Area}
        showLegend={true}
        showXAxis={true}
        metric={metric}
        dateRange={[rangeStart, rangeEnd]}
        width={800}
        tooltipProps={{
          format: (payload) => `${payload.value}%`,
        }}
        backgroundRanges={[
          {
            start: rangeStart.valueOf(),
            end: rangeStart.add(8, "minute").valueOf(),
            fill: "#ff7875",
            fillOpacity: 0.18,
          },
          {
            start: rangeStart.add(14, "minute").valueOf(),
            end: rangeStart.add(18, "minute").valueOf(),
            fill: "#ffd666",
          },
          {
            start: rangeStart.add(21, "minute").valueOf(),
            end: rangeStart.add(19, "minute").valueOf(),
            fill: "#bae637",
          },
        ]}
        thresholdLineProps={{
          value: 5,
        }}
        {...customProps}
      />
    </KitStoreProvider>,
  );
};

describe("RenderChart", () => {
  it("renders background ranges, threshold line, and threshold intersections", () => {
    const { container } = renderChart();

    expect(container.querySelectorAll(".line-chart-background-range")).toHaveLength(
      2,
    );
    expect(container.querySelector(".line-chart-threshold-line")).toBeInTheDocument();
    expect(
      screen.getAllByTestId("line-chart-threshold-intersection-dot"),
    ).toHaveLength(3);
  });

  it("renders curve-only area highlights for the configured time ranges", () => {
    const { container } = renderChart({
      areaHighlightRanges: [
        {
          start: rangeStart.add(5, "minute").valueOf(),
          end: rangeStart.add(15, "minute").valueOf(),
          fill: "#ff7875",
          fillOpacity: 0.2,
          legendId: "forecast",
        },
      ],
    });

    const highlights = container.querySelectorAll(".line-chart-area-highlight");
    const highlight = container.querySelector(
      ".line-chart-area-highlight",
    );

    expect(highlights).toHaveLength(1);
    expect(
      container.querySelector(".recharts-area.line-chart-area-highlight"),
    ).not.toBeInTheDocument();
    expect(highlight).toHaveStyle({ pointerEvents: "none" });
  });

  it("renders full-height background ranges across the entire chart content when configured", () => {
    const { container } = renderChart({
      backgroundRanges: [
        {
          start: rangeStart.add(4, "minute").valueOf(),
          end: rangeStart.add(12, "minute").valueOf(),
          fill: "#91caff",
          fillOpacity: 0.16,
          fullHeight: true,
        },
      ],
    });

    const fullHeightRange = container.querySelector(
      ".line-chart-background-range-full",
    );

    expect(fullHeightRange).toBeInTheDocument();
    expect(fullHeightRange).toHaveAttribute("y", "0");
    expect(fullHeightRange).toHaveAttribute("height", "100");
    expect(fullHeightRange).toHaveStyle({ pointerEvents: "none" });
  });

  it("bridges wrapper-height background ranges to the parent overlay layout without rendering chart-level fills", async () => {
    const onWrapperBackgroundRangesLayoutChange = vi.fn();
    const { container } = renderChart({
      backgroundRanges: [
        {
          start: rangeStart.add(4, "minute").valueOf(),
          end: rangeStart.add(12, "minute").valueOf(),
          fill: "#91caff",
          fillOpacity: 0.16,
          fullHeight: true,
          fullHeightTarget: "wrapper",
        },
      ],
      onWrapperBackgroundRangesLayoutChange,
    });

    expect(
      container.querySelector(".line-chart-background-range-full"),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector(".line-chart-background-range"),
    ).not.toBeInTheDocument();

    await waitFor(() => {
      expect(onWrapperBackgroundRangesLayoutChange).toHaveBeenCalled();
    });

    const layouts =
      onWrapperBackgroundRangesLayoutChange.mock.calls[
        onWrapperBackgroundRangesLayoutChange.mock.calls.length - 1
      ]?.[0];

    expect(layouts).toHaveLength(1);
    expect(layouts[0]).toEqual(
      expect.objectContaining({
        fill: "#91caff",
        fillOpacity: 0.16,
      }),
    );
    expect(layouts[0].left).toBeGreaterThanOrEqual(0);
    expect(layouts[0].width).toBeGreaterThan(0);
  });

  it("shows the default threshold tooltip when hovering an intersection", () => {
    renderChart();

    fireEvent.mouseEnter(
      screen.getAllByTestId("line-chart-threshold-intersection-dot")[0],
    );

    expect(
      screen.getByTestId("line-chart-threshold-tooltip"),
    ).toBeInTheDocument();
    expect(screen.getByText("存储预计使用量")).toBeInTheDocument();
    expect(screen.getByText("5%")).toBeInTheDocument();
  });

  it("does not render visible threshold markers by default", () => {
    const { container } = renderChart();

    expect(
      container.querySelectorAll(
        '[data-testid="line-chart-threshold-intersection-dot"] circle[r="5"]',
      ),
    ).toHaveLength(0);
  });
  it("renders threshold intersection labels above the markers when configured", () => {
    renderChart({
      thresholdLineProps: {
        value: 5,
        intersectionLabelProps: {
          text: "24 天",
          color: "#ff4d4f",
        },
      },
    });

    expect(
      screen.getAllByTestId("line-chart-threshold-intersection-label"),
    ).toHaveLength(3);
    expect(screen.getAllByText("24 天")).toHaveLength(3);
    expect(
      screen.getAllByTestId(
        "line-chart-threshold-intersection-label-background",
      )[0],
    ).toHaveAttribute("fill", "#ff4d4f");
  });

  it("keeps threshold hover targets and default tooltip when labels are disabled", () => {
    const { container } = renderChart({
      thresholdLineProps: {
        value: 5,
        intersectionLabelProps: {
          text: "24d",
          visible: false,
        },
      },
    });

    expect(
      screen.queryAllByTestId("line-chart-threshold-intersection-label"),
    ).toHaveLength(0);
    expect(
      screen.getAllByTestId("line-chart-threshold-intersection-dot"),
    ).toHaveLength(3);
    expect(
      container.querySelectorAll(
        '[data-testid="line-chart-threshold-intersection-dot"] circle[r="5"]',
      ),
    ).toHaveLength(0);

    fireEvent.mouseEnter(
      screen.getAllByTestId("line-chart-threshold-intersection-dot")[0],
    );

    expect(
      screen.getByTestId("line-chart-threshold-tooltip"),
    ).toBeInTheDocument();
    expect(screen.getByText("5%")).toBeInTheDocument();
  });

  it("only renders labels for intersections matching the visible condition", () => {
    const { container } = renderChart({
      thresholdLineProps: {
        value: 5,
        intersectionLabelProps: {
          text: "24d",
          visible: (info) => {
            return info.timestamp >= rangeStart.add(18, "minute").valueOf();
          },
        },
      },
    });

    expect(
      screen.getAllByTestId("line-chart-threshold-intersection-label"),
    ).toHaveLength(1);
    expect(
      container.querySelectorAll(
        '[data-testid="line-chart-threshold-intersection-dot"] circle[r="5"]',
      ),
    ).toHaveLength(0);

    fireEvent.mouseEnter(
      screen.getAllByTestId("line-chart-threshold-intersection-dot")[0],
    );

    expect(
      screen.getByTestId("line-chart-threshold-tooltip"),
    ).toBeInTheDocument();
  });

  it("uses custom threshold tooltip renderer when provided", () => {
    renderChart({
      thresholdLineProps: {
        value: 5,
        renderTooltip: (info) => {
          return <div>{`Runway: ${info.formattedThresholdValue}`}</div>;
        },
      },
    });

    fireEvent.mouseEnter(
      screen.getAllByTestId("line-chart-threshold-intersection-dot")[0],
    );

    expect(screen.getByText(/Runway:\s+5(\.00)?\s%/)).toBeInTheDocument();
  });

  it("supports dynamic threshold intersection label text", () => {
    const legendName = metric.sample_streams[0].legend.name;

    renderChart({
      thresholdLineProps: {
        value: 5,
        intersectionLabelProps: {
          text: (info) => `${info.legend.name} 24 天`,
        },
      },
    });

    expect(screen.getAllByText(`${legendName} 24 天`)).toHaveLength(3);
  });
});
