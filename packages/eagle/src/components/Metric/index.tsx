import { ErrorBoundary } from "@cloudtower/eagle";
import { parrotI18n } from "@cloudtower/parrot";
import cs from "classnames";
import download from "downloadjs";
import { TFunction } from "i18next";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

import { MetricRefType, toLocalTime } from ".";
import Pointer from "./Pointer";
import RenderChart, { IChartProps } from "./RenderChart";
import { MetricWrapper } from "./styled";
import { IExportCSVDataType, TimeUnit } from "./type";

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
  transformDataToCsv: (
    data: IExportCSVDataType[],
    shift: number,
    t: TFunction
  ) => string;
};

export const Metric = (
  props: MetricProps,
  ref: React.ForwardedRef<MetricRefType>
) => {
  const {
    height = 154,
    showPointer = true,
    showLegend = true,
    showXaxis = false,
    chartProps,
    transformDataToCsv,
  } = props;
  const [width, setWidth] = useState<number>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const exportCSVDataRef = useRef<Array<IExportCSVDataType>>([]);

  useEffect(() => {
    setWidth(wrapperRef.current?.offsetWidth);
  }, []);

  const getCSVFileData: (filename?: string) => {
    data: string;
    filename: string;
    filetype: string;
  } = (filename = "") => {
    const shift = new Date().getTimezoneOffset() * 60000;
    const csvStr = transformDataToCsv(
      exportCSVDataRef.current,
      shift,
      parrotI18n.t
    );
    const now = toLocalTime(new Date().getTime(), shift);
    return {
      data: csvStr,
      filename: `${filename}-${now}.csv`,
      filetype: "text/csv;charset=utf-8",
    };
  };

  // default export csv & download function
  const exportCSV = (filename: string) => {
    const file = getCSVFileData(filename);

    download(file.data, file.filename, file.filetype);
  };

  useImperativeHandle(ref, () => ({ exportCSV, getCSVFileData }));

  function onChartDataChange(data: Array<IExportCSVDataType>) {
    exportCSVDataRef.current = data;
  }

  return (
    <ErrorBoundary>
      <MetricWrapper
        className={cs("metric-wrapper", !showXaxis && "hidden-xaxis")}
        ref={wrapperRef}
        style={{ height: showLegend ? height + 30 : height }}
      >
        <RenderChart onChartDataChange={onChartDataChange} {...chartProps} />
        {showPointer && (
          <Pointer uuid={chartProps.syncId} metricWidth={width} />
        )}
      </MetricWrapper>
    </ErrorBoundary>
  );
};

const component = React.forwardRef(Metric) as (
  props: MetricProps & {
    ref?: React.ForwardedRef<MetricRefType>;
  }
) => ReturnType<typeof Metric>;

export default component;

//@ts-ignore
component.name = "Metric";

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
