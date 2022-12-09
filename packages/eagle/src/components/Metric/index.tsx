import {
  DataPoint,
  GraphType,
  MetricLabelInput,
  MetricUnit,
  TimeUnit,
} from "@cloudtower/eagle/generated/react-hooks";
import { ErrorBoundary } from "@cloudtower/eagle/kit/smartx";
import { DateRange } from "@cloudtower/eagle/kit/specify";
import { makeUUID } from "@tower/utils";
import cs from "classnames";
import download from "downloadjs";
import Maybe from "graphql/tsutils/Maybe";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { FullView } from "../../styles";
import {
  MetricRefType,
  stringifyTimeSpan,
  toLocalTime,
  transformDataToCsv,
} from ".";
import { GetDeselectedValueWithSuffix } from "./MetricLegend";
import Pointer from "./Pointer";
import RenderChart from "./RenderChart";
import { MetricWrapper } from "./styled";
import { FormatName, IMetricsQuery } from "./type";

type exportCSVDataType = {
  labelName: string;
  pointData: DataPoint[];
  unit?: MetricUnit;
};

export type MetricProps<IMetricData extends { id: string }> = {
  groupId?: string;
  metric: string;
  labels?: MetricLabelInput;
  height?: number;
  showPointer?: boolean;
  showMenu?: boolean;
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
  type?: GraphType;
  mode?: "simple" | "legend" | "single";
  service?: Maybe<string>;
  averageLine?: boolean;
  dropdown?: React.ReactNode;
  exportCSVTitle?: string;
  dateRange?: DateRange;
  formatLegendItemName: FormatName;
  getDeselectedValueWithSuffix: GetDeselectedValueWithSuffix;
  chartData: IMetricsQuery;
  topkData: IMetricsQuery;
  metricLegendData: IMetricData[];
  getColorsByMetric: (metric: string) => string;
  metricColors: string[];
  metricType: string;
  step: number;
  deselectedIndex: number[];
};

export const Metric = <IMetricData extends { id: string }>(
  props: MetricProps<IMetricData>,
  ref: React.ForwardedRef<MetricRefType>
) => {
  const {
    groupId,
    metric,
    labels,
    height = 154,
    showPointer = true,
    showMenu = false,
    showLegend = true,
    showXaxis = false,
    type = GraphType.Area,
    topk,
    bottomk,
    timeSpan = "2h",
    dropdown,
    exportCSVTitle,
    chartData,
    topkData,
    metricLegendData,
    getColorsByMetric,
    metricColors,
    ...restProps
  } = props;
  const [width, setWidth] = useState(0);
  const uuid = useRef(groupId || makeUUID(5));
  const { t } = useTranslation();
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
    const csvStr = transformDataToCsv(exportCSVDataRef.current, shift, t);
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
          <FullView>{t("metric.empty")}</FullView>
        ) : topnNotTwoHour ? (
          <FullView>{t("metric.topn_only_two_hour")}</FullView>
        ) : (
          <>
            <RenderChart
              data={chartData}
              topkData={topkData}
              metricLegendData={metricLegendData}
              height={height}
              uuid={uuid.current}
              metric={metric}
              labels={labels}
              showLegend={showLegend}
              showMenu={showMenu}
              showXaxis={showXaxis}
              range={stringifyTimeSpan(timeSpan)}
              type={type}
              dropdown={dropdown}
              onChartDataChange={onChartDataChange}
              getColorsByMetric={getColorsByMetric}
              metricColors={metricColors}
              {...restProps}
            />
            {showPointer && <Pointer uuid={uuid.current} metricWidth={width} />}
          </>
        )}
      </MetricWrapper>
    </ErrorBoundary>
  );
};

const component = React.forwardRef(Metric) as <
  IMetricData extends { id: string }
>(
  props: MetricProps<IMetricData> & {
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
