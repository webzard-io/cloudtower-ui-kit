import { parrotI18n } from "@cloudtower/parrot";
import ErrorBoundary from "@src/core/ErrorBoundary";
import Pointer from "@src/core/LineChart/Pointer";
import RenderChart from "@src/core/LineChart/RenderChart";
import { LineChartWrapper } from "@src/core/LineChart/styled";
import cs from "classnames";
import React, { useEffect, useRef, useState } from "react";

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
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setWidth(wrapperRef.current?.offsetWidth || 0);
    }, []);

    return (
      <ErrorBoundary i18n={parrotI18n}>
        <LineChartWrapper
          className={cs("metric-wrapper", !showXaxis && "hidden-xaxis")}
          ref={wrapperRef}
          data-testid={dataTestId}
          style={{ height: showLegend ? height + 30 : height }}
        >
          <RenderChart {...chartProps} width={width} />
          {showPointer && (
            <Pointer uuid={chartProps.syncId} metricWidth={width} />
          )}
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
