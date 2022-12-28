import cs from "classnames";
import React, { useEffect, useRef, useState } from "react";

import ErrorBoundary from "../ErrorBoundary";
import Pointer from "./Pointer";
import RenderChart, { IChartProps } from "./RenderChart";
import { MetricWrapper } from "./styled";
import { TimeUnit } from "./type";

export type MetricProps = {
  height?: number;
  showPointer?: boolean;
  yAxisAlign?: "left" | "right";
  showXaxis?: boolean;
  showLegend?: boolean;
  timeSpan?:
    | {
        span: number;
        unit: TimeUnit;
      }
    | string;
  chartProps: Omit<IChartProps, "uuid">;
};

const Metric = (props: MetricProps) => {
  const {
    height = 154,
    showPointer = true,
    showLegend = true,
    showXaxis = false,
    chartProps,
  } = props;
  const [width, setWidth] = useState<number>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWidth(wrapperRef.current?.offsetWidth);
  }, []);

  return (
    <ErrorBoundary>
      <MetricWrapper
        className={cs("metric-wrapper", !showXaxis && "hidden-xaxis")}
        ref={wrapperRef}
        style={{ height: showLegend ? height + 30 : height }}
      >
        <RenderChart {...chartProps} />
        {showPointer && (
          <Pointer uuid={chartProps.syncId} metricWidth={width} />
        )}
      </MetricWrapper>
    </ErrorBoundary>
  );
};

export default Metric;

export * from "./metric";
export * from "./MetricActions";
export { default as MetricActions } from "./MetricActions";
export * from "./MetricLegend";
export { default as MetricLegend } from "./MetricLegend";
export * from "./Pointer";
export { default as Pointer } from "./Pointer";
export * from "./RenderChart";
export { default as RenderChart } from "./RenderChart";
export * from "./TooltipFormatter";
export { default as TooltipFormatter } from "./TooltipFormatter";
export * from "./type";
