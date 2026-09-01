/* eslint-disable testing-library/no-container */

import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import ForecastLineLayer from "../ForecastLineLayer";

const stream = {
  legend: {
    id: "cpu",
    name: "CPU",
    color: "#1890ff",
  },
  step: 10,
  tolerance: 0,
  points: [
    { t: 0, v: 0 },
    { t: 10, v: 10 },
    { t: 20, v: 20 },
    { t: 30, v: 30 },
  ],
};

const getProps = (overrides = {}) => ({
  forecastStartTimestamp: 15,
  stacked: false,
  hovering: [],
  streams: [stream],
  deselected: [],
  offset: {
    left: 10,
    top: 20,
    width: 100,
    height: 80,
  },
  xAxisMap: {
    0: {
      scale: (value: number) => value * 10,
    },
  },
  yAxisMap: {
    0: {
      scale: (value: number) => 100 - value,
    },
  },
  ...overrides,
});

const renderLayer = (props = getProps()) => {
  return render(
    <svg>
      <ForecastLineLayer {...props} />
    </svg>,
  );
};

describe("ForecastLineLayer", () => {
  it("projects the same data with the current scales and keeps line styles", () => {
    const { container, rerender } = renderLayer();

    const firstPaths = Array.from(
      container.querySelectorAll(".line-chart-forecast-line"),
    );

    expect(firstPaths).toHaveLength(2);
    expect(firstPaths[0]).not.toHaveAttribute("stroke-dasharray");
    expect(firstPaths[1]).toHaveAttribute("stroke-dasharray", "4 4");
    expect(firstPaths[0]).toHaveAttribute("d", "M0,100 L100,90 L150,85");

    const firstPathData = firstPaths.map((path) => path.getAttribute("d"));

    rerender(
      <svg>
        <ForecastLineLayer
          {...getProps({
            xAxisMap: {
              0: {
                scale: (value: number) => value * 20,
              },
            },
            yAxisMap: {
              0: {
                scale: (value: number) => 200 - value * 2,
              },
            },
          })}
        />
      </svg>,
    );

    const secondPaths = Array.from(
      container.querySelectorAll(".line-chart-forecast-line"),
    );

    expect(secondPaths.map((path) => path.getAttribute("d"))).not.toEqual(
      firstPathData,
    );
    expect(secondPaths[0]).not.toHaveAttribute("stroke-dasharray");
    expect(secondPaths[1]).toHaveAttribute("stroke-dasharray", "4 4");
  });

  it("clips paths to the current chart offset", () => {
    const { container } = renderLayer();
    const clipRect = container.querySelector("clipPath rect");

    expect(clipRect).toHaveAttribute("x", "10");
    expect(clipRect).toHaveAttribute("y", "20");
    expect(clipRect).toHaveAttribute("width", "100");
    expect(clipRect).toHaveAttribute("height", "80");
  });

  it("uses Recharts default color when legend color is omitted", () => {
    const { container } = renderLayer(
      getProps({
        streams: [
          {
            ...stream,
            legend: { id: "cpu", name: "CPU" },
          },
        ],
      }),
    );

    Array.from(container.querySelectorAll(".line-chart-forecast-line")).forEach(
      (path) => {
        expect(path).toHaveAttribute("stroke", "#3182bd");
      },
    );
  });

  it("does not rebuild geometry when only hovering changes", () => {
    const xScale = vi.fn((value: number) => value * 10);
    const yScale = vi.fn((value: number) => 100 - value);
    const props = getProps({
      xAxisMap: { 0: { scale: xScale } },
      yAxisMap: { 0: { scale: yScale } },
    });
    const { rerender } = renderLayer(props);
    const xScaleCalls = xScale.mock.calls.length;
    const yScaleCalls = yScale.mock.calls.length;

    rerender(
      <svg>
        <ForecastLineLayer {...props} hovering={["cpu"]} />
      </svg>,
    );

    expect(xScale).toHaveBeenCalledTimes(xScaleCalls);
    expect(yScale).toHaveBeenCalledTimes(yScaleCalls);
  });

  it("breaks paths at invalid points", () => {
    const { container } = renderLayer(
      getProps({
        streams: [
          {
            ...stream,
            points: [
              { t: 0, v: 0 },
              { t: 10, v: 10 },
              { t: 20, v: undefined },
              { t: 30, v: 30 },
              { t: 40, v: 40 },
            ],
          },
        ],
        forecastStartTimestamp: 25,
      }),
    );

    const paths = Array.from(
      container.querySelectorAll(".line-chart-forecast-line"),
    );

    expect(paths).toHaveLength(2);
    expect(paths[0]).not.toHaveAttribute("stroke-dasharray");
    expect(paths[1]).toHaveAttribute("stroke-dasharray", "4 4");
    expect(paths[0]).toHaveAttribute("d", "M0,100 L100,90");
    expect(paths[1]).toHaveAttribute("d", "M300,70 L400,60");
  });

  it("skips deselected streams and applies hover opacity", () => {
    const secondStream = {
      ...stream,
      legend: {
        ...stream.legend,
        id: "memory",
      },
    };
    const hiddenStream = {
      ...stream,
      legend: {
        ...stream.legend,
        id: "disk",
      },
    };
    const { container } = renderLayer(
      getProps({
        streams: [stream, secondStream, hiddenStream],
        deselected: ["disk"],
        hovering: ["cpu"],
      }),
    );

    const paths = Array.from(
      container.querySelectorAll(".line-chart-forecast-line"),
    );

    expect(paths).toHaveLength(4);
    expect(
      paths.slice(0, 2).every((path) => path.getAttribute("opacity") === "0.3"),
    ).toBe(true);
    expect(
      paths.slice(2).every((path) => path.getAttribute("opacity") === "1"),
    ).toBe(true);
  });

  it("projects stacked streams using the visible cumulative values", () => {
    const secondStream = {
      ...stream,
      legend: {
        ...stream.legend,
        id: "memory",
      },
      points: [
        { t: 0, v: 10 },
        { t: 10, v: 20 },
        { t: 20, v: 30 },
        { t: 30, v: 40 },
      ],
    };
    const { container } = renderLayer(
      getProps({
        stacked: true,
        streams: [stream, secondStream],
      }),
    );

    const paths = Array.from(
      container.querySelectorAll(".line-chart-forecast-line"),
    );

    expect(paths).toHaveLength(4);
    expect(paths[2]).toHaveAttribute("d", "M0,90 L100,70 L150,60");
  });

  it("renders nothing when scales are unavailable", () => {
    const { container } = renderLayer(
      getProps({
        xAxisMap: {},
      }),
    );

    expect(
      container.querySelector("[data-testid='line-chart-forecast-lines']"),
    ).toBe(null);
  });
});
