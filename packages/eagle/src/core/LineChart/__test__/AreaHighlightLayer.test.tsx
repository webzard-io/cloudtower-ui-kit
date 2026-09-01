import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import AreaHighlightLayer, {
  IAreaHighlightOverlay,
} from "../AreaHighlightLayer";

const overlay: IAreaHighlightOverlay = {
  key: "cpu-highlight",
  data: [
    [
      { t: 0, value: 10 },
      { t: 10, value: 20 },
      { t: 20, value: 15 },
    ],
  ],
  fill: "#1890ff",
  fillOpacity: 0.2,
  legendId: "cpu",
  stroke: "#1890ff",
};

const renderLayer = (forecastStartTimestamp?: number) =>
  render(
    <svg>
      <AreaHighlightLayer
        forecastStartTimestamp={forecastStartTimestamp}
        overlay={overlay}
        hovering={[]}
        offset={{ left: 0, top: 0, width: 100, height: 80 }}
        xAxisMap={{ 0: { scale: (value: number) => value * 5 } }}
        yAxisMap={{ 0: { scale: (value: number) => 80 - value } }}
      />
    </svg>,
  );

describe("AreaHighlightLayer", () => {
  it("keeps the highlight fill and leaves curve drawing to the forecast layer", () => {
    renderLayer(15);
    const layer = screen.getByTestId("line-chart-area-highlight");

    expect(layer).toContainHTML("line-chart-area-highlight-fill");
    expect(layer).not.toContainHTML("line-chart-area-highlight-curve");
  });

  it("keeps the highlight curve when forecast mode is disabled", () => {
    renderLayer();
    const layer = screen.getByTestId("line-chart-area-highlight");

    expect(layer).toContainHTML("line-chart-area-highlight-fill");
    expect(layer).toContainHTML("line-chart-area-highlight-curve");
  });

  it("renders each continuous highlight run as an independent path", () => {
    render(
      <svg>
        <AreaHighlightLayer
          overlay={{
            ...overlay,
            data: [
              [
                { t: 0, value: 10 },
                { t: 10, value: 20 },
              ],
              [
                { t: 30, value: 15 },
                { t: 40, value: 25 },
              ],
            ],
          }}
          hovering={[]}
          offset={{ left: 0, top: 0, width: 100, height: 80 }}
          xAxisMap={{ 0: { scale: (value: number) => value * 5 } }}
          yAxisMap={{ 0: { scale: (value: number) => 80 - value } }}
        />
      </svg>,
    );

    expect(
      document.querySelectorAll(".line-chart-area-highlight-fill"),
    ).toHaveLength(2);
    expect(
      document.querySelectorAll(".line-chart-area-highlight-curve"),
    ).toHaveLength(2);
  });
});
