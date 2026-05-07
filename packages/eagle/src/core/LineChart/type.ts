import { IChartProps } from "@src/core/LineChart/RenderChart";
import { PickerDateRange } from "@src/coreX/DateRangePicker/dateRangePicker.type";
import { Dayjs } from "dayjs";
import { TFunction } from "i18next";
import { ReactElement } from "react";

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
  iconSuffix?: ReactElement;
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

/**
 * 背景高亮区间
 * @description 沿时间轴渲染整段背景高亮，不会跟随曲线形状裁剪
 */
export interface ILineChartBackgroundRange {
  /** 区间开始时间戳（毫秒） */
  start: number;
  /** 区间结束时间戳（毫秒） */
  end: number;
  /** 背景填充色 */
  fill: string;
  /** 填充透明度 */
  fillOpacity?: number;
}

/**
 * 曲线区域高亮区间
 * @description 仅在指定时间段内填充曲线以下区域，可按图例定向生效
 */
export interface ILineChartAreaHighlightRange {
  /** 区间开始时间戳（毫秒） */
  start: number;
  /** 区间结束时间戳（毫秒） */
  end: number;
  /** 区域填充色 */
  fill: string;
  /** 填充透明度 */
  fillOpacity?: number;
  /** 指定生效的图例 ID，不传则对全部曲线生效 */
  legendId?: string;
}

/**
 * 阈值线交点 tooltip 信息
 */
export interface ILineChartThresholdIntersectionInfo {
  /** 交点时间戳（毫秒） */
  timestamp: number;
  /** 交点插值后的数值 */
  value: number;
  /** 阈值线数值 */
  thresholdValue: number;
  /** 格式化后的交点值 */
  formattedValue: string;
  /** 格式化后的阈值值 */
  formattedThresholdValue: string;
  /** 当前交点所属图例 */
  legend: ILineChartILegend;
}

export interface ILineChartThresholdIntersectionLabelProps {
  /** 胶囊文案，支持固定文本或按交点信息动态生成 */
  text?: string | ((info: ILineChartThresholdIntersectionInfo) => string);
  /** Whether to show the current intersection label */
  visible?: boolean | ((info: ILineChartThresholdIntersectionInfo) => boolean);
  /** 胶囊背景色 */
  color?: string;
  /** 胶囊文字颜色 */
  textColor?: string;
}

/**
 * 单条水平阈值线配置
 */
export interface ILineChartThresholdLineProps {
  /** 阈值线对应的数值 */
  value: number;
  /** 阈值线颜色 */
  stroke?: string;
  /** 阈值线虚线样式 */
  strokeDasharray?: string;
  /** 交点上方胶囊配置 */
  intersectionLabelProps?: ILineChartThresholdIntersectionLabelProps;
  /** 自定义交点 tooltip 内容 */
  renderTooltip?: (info: ILineChartThresholdIntersectionInfo) => ReactElement;
}

/**
 * 图表内部配置项
 * @description LineChart 内部消费的完整配置集合
 */
export type ChartProps = {
  /** 指标名称 */
  metric: string;
  /** 图例 tooltip */
  legendTooltip?: ReactElement;
  /** 阈值线交点 tooltip，自定义内容时优先生效 */
  renderThresholdTooltip?: (
    info: ILineChartThresholdIntersectionInfo,
  ) => ReactElement;
  /** 时间轴背景高亮区间 */
  backgroundRanges?: ILineChartBackgroundRange[];
  /** 曲线以下区域高亮区间 */
  areaHighlightRanges?: ILineChartAreaHighlightRange[];
  /** 水平阈值线配置 */
  thresholdLineProps?: ILineChartThresholdLineProps;
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
   * 数据测试 id
   */
  "data-testid"?: string;

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
   * 指标宽度配置
   * @description 用于配置不同指标的宽度
   */
  metricWidth?: Record<string, number>;

  /**
   * 展示模式
   * @default "legend"
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

  /** 时间轴背景高亮区间 */
  backgroundRanges?: ILineChartBackgroundRange[];

  /** 曲线以下区域高亮区间 */
  areaHighlightRanges?: ILineChartAreaHighlightRange[];

  /** 水平阈值线配置 */
  thresholdLineProps?: ILineChartThresholdLineProps;

  /** 阈值线交点 tooltip，自定义内容时优先生效 */
  renderThresholdTooltip?: (
    info: ILineChartThresholdIntersectionInfo,
  ) => ReactElement;

  /** 历史记录对象 */
  history: History;
} & Pick<ChartProps, "legendTooltip">;
