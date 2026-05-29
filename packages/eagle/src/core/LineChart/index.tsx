import { parrotI18n } from "@cloudtower/parrot";
import ErrorBoundary from "@src/core/ErrorBoundary";
import Pointer from "@src/core/LineChart/Pointer";
import RenderChart, {
  type ILineChartWrapperBackgroundLayout,
} from "@src/core/LineChart/RenderChart";
import {
  LineChartContentLayer,
  LineChartWrapper,
  LineChartWrapperBackgroundOverlay,
  LineChartWrapperBackgroundSegment,
} from "@src/core/LineChart/styled";
import useElementResize from "@src/hooks/useElementResize";
import cs from "classnames";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { LineChartProps } from "./type";

const isSameWrapperBackgroundLayouts = (
  prevLayouts: ILineChartWrapperBackgroundLayout[],
  nextLayouts: ILineChartWrapperBackgroundLayout[],
) => {
  return (
    prevLayouts.length === nextLayouts.length &&
    prevLayouts.every((layout, index) => {
      const nextLayout = nextLayouts[index];

      return (
        layout?.key === nextLayout?.key &&
        layout?.left === nextLayout?.left &&
        layout?.width === nextLayout?.width &&
        layout?.fill === nextLayout?.fill &&
        layout?.fillOpacity === nextLayout?.fillOpacity
      );
    })
  );
};

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  (props, ref) => {
    const {
      "data-testid": dataTestId,
      height = 154,
      showPointer = true,
      showLegend = true,
      showXaxis = false,
      chartProps,
    } = props;
    const [width, setWidth] = useState<number>(0);
    const [wrapperBackgroundLayouts, setWrapperBackgroundLayouts] = useState<
      ILineChartWrapperBackgroundLayout[]
    >([]);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const hasWrapperBackgroundRanges = useMemo(() => {
      return chartProps.backgroundRanges?.some((range) => {
        return range.fullHeight && range.fullHeightTarget === "wrapper";
      });
    }, [chartProps.backgroundRanges]);
    const syncWrapperWidth = useCallback(() => {
      setWidth(wrapperRef.current?.offsetWidth || 0);
    }, []);
    const setWrapperNode = useCallback(
      (node: HTMLDivElement | null) => {
        wrapperRef.current = node;

        if (typeof ref === "function") {
          ref(node);
          return;
        }

        if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref],
    );
    const handleWrapperBackgroundRangesLayoutChange = useCallback(
      (nextLayouts: ILineChartWrapperBackgroundLayout[]) => {
        setWrapperBackgroundLayouts((prevLayouts) => {
          if (isSameWrapperBackgroundLayouts(prevLayouts, nextLayouts)) {
            return prevLayouts;
          }

          return nextLayouts;
        });
      },
      [],
    );

    useEffect(() => {
      syncWrapperWidth();
    }, [syncWrapperWidth]);

    useElementResize(wrapperRef, syncWrapperWidth, [showLegend, showXaxis, height]);

    useEffect(() => {
      if (!hasWrapperBackgroundRanges) {
        setWrapperBackgroundLayouts([]);
      }
    }, [hasWrapperBackgroundRanges]);

    return (
      <ErrorBoundary i18n={parrotI18n}>
        <LineChartWrapper
          className={cs("metric-wrapper", !showXaxis && "hidden-xaxis")}
          ref={setWrapperNode}
          data-testid={dataTestId}
          style={{ height: showLegend ? height + 30 : height }}
        >
          {hasWrapperBackgroundRanges && (
            <LineChartWrapperBackgroundOverlay
              data-testid="line-chart-wrapper-background-overlay"
              style={{ pointerEvents: "none" }}
            >
              {wrapperBackgroundLayouts.map((layout) => {
                return (
                  <LineChartWrapperBackgroundSegment
                    key={layout.key}
                    data-testid="line-chart-wrapper-background-segment"
                    style={{
                      top: 0,
                      bottom: 0,
                      left: layout.left,
                      width: layout.width,
                      backgroundColor: layout.fill,
                      opacity: layout.fillOpacity,
                    }}
                  />
                );
              })}
            </LineChartWrapperBackgroundOverlay>
          )}
          {hasWrapperBackgroundRanges ? (
            <LineChartContentLayer>
              <RenderChart
                {...chartProps}
                width={width}
                onWrapperBackgroundRangesLayoutChange={
                  handleWrapperBackgroundRangesLayoutChange
                }
              />
            </LineChartContentLayer>
          ) : (
            <RenderChart {...chartProps} width={width} />
          )}
          {showPointer && <Pointer uuid={chartProps.syncId} metricWidth={width} />}
        </LineChartWrapper>
      </ErrorBoundary>
    );
  },
);

export default LineChart;
export { default as LineChartLegend } from "./LineChartLegend";
export * from "./LineChartLegend";
export * from "./type";
export * from "./utils";
