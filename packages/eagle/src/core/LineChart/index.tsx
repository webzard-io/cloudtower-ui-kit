import { parrotI18n } from "@cloudtower/parrot";
import ErrorBoundary from "@src/core/ErrorBoundary";
import Pointer from "@src/core/LineChart/Pointer";
import RenderChart from "@src/core/LineChart/RenderChart";
import { LineChartWrapper } from "@src/core/LineChart/styled";
import useElementResize from "@src/hooks/useElementResize";
import cs from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { LineChartProps } from "./type";

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
    const wrapperRef = useRef<HTMLDivElement | null>(null);

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

    useEffect(() => {
      syncWrapperWidth();
    }, [syncWrapperWidth]);

    useElementResize(wrapperRef, syncWrapperWidth, [showLegend, showXaxis, height]);

    return (
      <ErrorBoundary i18n={parrotI18n}>
        <LineChartWrapper
          className={cs("metric-wrapper", !showXaxis && "hidden-xaxis")}
          ref={setWrapperNode}
          data-testid={dataTestId}
          style={{ height: showLegend ? height + 30 : height }}
        >
          <RenderChart {...chartProps} width={width} />
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
