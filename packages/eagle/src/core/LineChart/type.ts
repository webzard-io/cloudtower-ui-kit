import { Dayjs } from "dayjs";
import { TFunction } from "i18next";
import { ReactElement } from "react";
import { IChartProps } from "@src/core/LineChart/RenderChart";
import { PickerDateRange } from "@src/coreX/DateRangePicker/dateRangePicker.type";

export interface ILineChartMetricData {
  id: string;
}

export interface ILineChartDataPoint {
  t: number;
  v?: number;
  [key: DataPointValueKey]: number | undefined;
}

type DataPointValueKey = `v${number}`;

export interface ILineChartILegend {
  id: string;
  name: string;
  color?: string;
  fill?: string;
  stroke?: boolean;
}

export interface ILineChartMetricStream {
  points: ILineChartDataPoint[];
  legend: ILineChartILegend;
  step: number;
  tolerance: number;
}

export interface ILineChartMetric {
  sample_streams: ILineChartMetricStream[];
  unit: ILineChartMetricUnit;
  dropped: boolean;
}

export enum ILineChartTimeUnit {
  Day = "DAY",
  Hour = "HOUR",
  Month = "MONTH",
}

export enum ILineChartMetricUnit {
  Count = "COUNT",
  DataRateBit = "DATA_RATE_BIT",
  DataRateByte = "DATA_RATE_BYTE",
  DataSize = "DATA_SIZE",
  Frequency = "FREQUENCY",
  Load = "LOAD",
  Percent = "PERCENT",
  Ratio = "RATIO",
  Temperature = "TEMPERATURE",
  Time = "TIME",
}

export enum ILineChartGraphType {
  Area = "AREA",
  Stack = "STACK",
}

export type ILineChartDateRange = [Dayjs, Dayjs];

export type ChartProps = {
  metric: string;
  legendTooltip?: ReactElement;
  renderThresholdTooltip?: (info: {
    current: string;
    max: string;
  }) => ReactElement;
  yAxisAlign?: "left" | "right";
  showXaxis?: boolean;
  showLegend?: boolean;
  uuid: string;
  height: number;
  range: string;
  type: ILineChartGraphType;
  mode?: "simple" | "legend" | "single";
  offScreen: boolean;
  averageLine?: boolean;
  addView?: () => void;
  exportCSV?: () => void;
  dateRange?: ILineChartDateRange;
  formatLegendItemName?: FormatName;
  history: History;
};

export interface ILineChartLegend {
  id: string;
  name: string;
  color?: string;
  fill?: string;
  stroke?: boolean;
}

/**
 * 折线图组件属性接口
 * @description 用于展示时序数据的折线图组件，支持多种展示模式和交互功能
 */
export type LineChartProps = {
  /**
   * 图表高度
   * @default 154
   */
  height?: number;

  /**
   * 是否显示鼠标悬停指示器
   * @default true
   */
  showPointer?: boolean;

  /**
   * Y轴对齐方式
   * @default "left"
   */
  yAxisAlign?: "left" | "right";

  /**
   * 是否显示X轴
   * @default false
   */
  showXaxis?: boolean;

  /**
   * 是否显示图例
   * @default true
   */
  showLegend?: boolean;

  /**
   * 图表核心配置项
   * @description 包含图表的所有核心配置，如数据、样式、交互等
   */
  chartProps: Omit<IChartProps, "uuid">;
};

/**
 * 图例名称格式化函数类型
 */
export type FormatName = (params: {
  /** 指标类型 */
  type: string | undefined;
  /** 指标名称 */
  metricName: string;
  /** 国际化函数 */
  t: TFunction;
  /** 数据索引 */
  dIndex: number;
}) => string;

/**
 * 指标属性接口
 * @description 用于配置指标相关的展示和行为
 */
export type LineChartMetricProps = {
  /** 指标名称 */
  metric: string;

  /**
   * 图表高度
   * @default 154
   */
  height?: number;

  /**
   * 是否显示鼠标悬停指示器
   * @default true
   */
  showPointer?: boolean;

  /**
   * Y轴对齐方式
   * @default 'left'
   */
  yAxisAlign?: "left" | "right";

  /**
   * 是否显示X轴
   * @default false
   */
  showXaxis?: boolean;

  /**
   * 是否显示图例
   * @default true
   */
  showLegend?: boolean;

  /**
   * 指标宽度配置
   * @description 用于配置不同指标的宽度
   */
  metricWidth?: Record<string, number>;

  /**
   * 展示模式
   * @default 'legend'
   * - simple: 简单模式，不显示图例
   * - legend: 图例模式，显示完整图例
   * - single: 单一模式，适用于单指标展示
   */
  mode?: "simple" | "legend" | "single";

  /**
   * 是否显示平均线
   * @default false
   */
  averageLine?: boolean;

  /** 日期范围 */
  dateRange?: PickerDateRange;

  /** 图例项名称格式化函数 */
  formatLegendItemName?: FormatName;

  /** 历史记录对象 */
  history: History;
} & Pick<ChartProps, "legendTooltip" | "renderThresholdTooltip">;
