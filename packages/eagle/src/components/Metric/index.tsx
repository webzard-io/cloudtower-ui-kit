import {
  DataPoint,
  MetricLabelInput,
  MetricUnit,
  TimeUnit,
} from "@cloudtower/eagle/generated/react-hooks";
import { ErrorBoundary } from "@cloudtower/eagle/kit/smartx";
import { DateRange } from "@cloudtower/eagle/kit/specify";
import { parrotI18n } from "@cloudtower/parrot";
import { makeUUID } from "@tower/utils";
import cs from "classnames";
import download from "downloadjs";
import Maybe from "graphql/tsutils/Maybe";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

import { FullView } from "../../styles";
import {
  MetricRefType,
  stringifyTimeSpan,
  toLocalTime,
  transformDataToCsv,
} from ".";
import { GetDeselectedValueWithSuffix } from "./MetricLegend";
import Pointer from "./Pointer";
import RenderChart, { IChartProps } from "./RenderChart";
import { MetricWrapper } from "./styled";
import { FormatName } from "./type";

type exportCSVDataType = {
  labelName: string;
  pointData: DataPoint[];
  unit?: MetricUnit;
};

export type MetricProps = {
  groupId?: string;
  labels?: MetricLabelInput;
  height?: number;
  showPointer?: boolean;
  yAxisAlign?: "left" | "right";
  showXaxis?: boolean;
  showLegend?: boolean;
  metricWidth?: Record<string, number>;
  topk?: number;
  bottomk?: number;
  timeSpan?:
    | {
        span: number;
        unit: TimeUnit;
      }
    | string;
  mode?: "simple" | "legend" | "single";
  service?: Maybe<string>;
  averageLine?: boolean;
  dateRange?: DateRange;
  formatLegendItemName: FormatName;
  getDeselectedValueWithSuffix: GetDeselectedValueWithSuffix;
  metricType: string;
  step: number;
  deselectedIndex: number[];
  areaChartData: DataPoint[];
  chartProps: IChartProps;
};

export const Metric = (
  props: MetricProps,
  ref: React.ForwardedRef<MetricRefType>
) => {
  const {
    groupId,
    labels,
    height = 154,
    showPointer = true,
    showLegend = true,
    showXaxis = false,
    topk,
    bottomk,
    timeSpan = "2h",
    chartProps,
  } = props;
  const [width, setWidth] = useState(0);
  const uuid = useRef(groupId || makeUUID(5));
  const wrapperRef = useRef<HTMLDivElement>(null);
  const exportCSVDataRef = useRef<Array<exportCSVDataType>>([]);

  useEffect(() => {
    setWidth(wrapperRef.current!.offsetWidth);
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

  function onChartDataChange(data: Array<exportCSVDataType>) {
    exportCSVDataRef.current = data;
  }

  const topnNotTwoHour =
    topk !== undefined && stringifyTimeSpan(timeSpan) !== "2h";

  return (
    <ErrorBoundary>
      <MetricWrapper
        className={cs("metric-wrapper", !showXaxis && "hidden-xaxis")}
        ref={wrapperRef}
        style={{ height: showLegend ? height + 30 : height }}
      >
        {/* TODO: hard code */}
        {!labels && !topk && !bottomk ? (
          <FullView>{parrotI18n.t("metric.empty")}</FullView>
        ) : topnNotTwoHour ? (
          <FullView>{parrotI18n.t("metric.topn_only_two_hour")}</FullView>
        ) : (
          <>
            <RenderChart {...chartProps} />
            {showPointer && <Pointer uuid={uuid.current} metricWidth={width} />}
          </>
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

export * from "./Actions";
export { default as Actions } from "./Actions";
export * from "./metric";
export * from "./MetricLegend";
export { default as MetricLegend } from "./MetricLegend";
export * from "./Pointer";
export { default as Pointer } from "./Pointer";
export * from "./RenderChart";
export { default as RenderChart } from "./RenderChart";
export * from "./TooltipFormatter";
export { default as TooltipFormatter } from "./TooltipFormatter";
export * from "./type";
