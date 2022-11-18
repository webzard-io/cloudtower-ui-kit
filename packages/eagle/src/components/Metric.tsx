import {
  DataPoint,
  GraphType,
  MetricLabelInput,
  MetricUnit,
  TimeUnit,
} from "@cloudtower/eagle/generated/react-hooks";
import { ErrorBoundary } from "@cloudtower/eagle/kit/smartx";
import { DateRange } from "@cloudtower/eagle/kit/specify";
import { styled } from "@linaria/react";
import { getMetricQueryType, makeUUID } from "@tower/utils";
import cs from "classnames";
import download from "downloadjs";
import Maybe from "graphql/tsutils/Maybe";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FullView } from "src/styles";

import {
  IClusterBasicQuery,
  MetricRefType,
  stringifyTimeSpan,
  toLocalTime,
  transformDataToCsv,
} from "./metric";
import { GetDeselectedValueWithSuffix } from "./MetricLegend";
import Pointer from "./Pointer";
import RenderChart from "./RenderChart";
import { FormatName, IMetricsQuery } from "./type";

const MetricWrapper = styled.div`
  position: relative;

  &.hidden-xaxis .pointer-wrapper {
    bottom: -12px;
  }

  .metric-toolbar {
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    margin: 0 16px;

    .metric-extra {
      display: flex;
      font-size: 12px;
      align-items: center;

      .info-item {
        color: $gray-60;
      }
      .info-item + .info-item {
        margin-left: 10px;
      }

      .menu-trigger {
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }

  .recharts-xAxis {
    font-size: 12px;
  }

  .pointer-wrapper {
    position: absolute;
    bottom: 10px;
    padding: 0 8px;
    border-radius: 4px;
    font-size: 12px;
    color: $white;
    background: rgba(0, 0, 0, 0.75);
    transform: translateX(-50%);
  }
`;

type exportCSVDataType = {
  labelName: string;
  pointData: DataPoint[];
  unit?: MetricUnit;
};

export type MetricProps<MetricData extends { id: string }> = {
  groupId?: string;
  metric: string;
  clusterId: string;
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
  resourceType?: Maybe<string>;
  averageLine?: boolean;
  dropdown?: React.ReactNode;
  exportCSVTitle?: string;
  dateRange?: DateRange;
  formatLegendItemName: FormatName<MetricData>;
  getDeselectedValueWithSuffix: GetDeselectedValueWithSuffix<MetricData>;
  chartData: IMetricsQuery;
  topkData: IMetricsQuery;
  clusterData: IClusterBasicQuery;
  metricLegendData: MetricData[];
};

export const Metric = <MetricData extends { id: string }>(
  props: MetricProps<MetricData>,
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
    resourceType = "",
    dropdown,
    exportCSVTitle,
    chartData,
    topkData,
    clusterData,
    metricLegendData,
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
        {!labels &&
        !topk &&
        !bottomk &&
        getMetricQueryType(metric, resourceType || "") !== "cluster" &&
        getMetricQueryType(metric, resourceType || "") !== "witness" ? (
          <FullView>{t("metric.empty")}</FullView>
        ) : topnNotTwoHour ? (
          <FullView>{t("metric.topn_only_two_hour")}</FullView>
        ) : (
          <>
            <RenderChart
              data={chartData}
              topkData={topkData}
              clusterData={clusterData}
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
              resourceType={resourceType}
              dropdown={dropdown}
              onChartDataChange={onChartDataChange}
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
  MetricData extends { id: string }
>(
  props: MetricProps<MetricData> & {
    ref?: React.ForwardedRef<MetricRefType>;
  }
) => ReturnType<typeof Metric>;

export default component;

//@ts-ignore
component.name = "Metric";
