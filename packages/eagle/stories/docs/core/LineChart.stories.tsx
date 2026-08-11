import { InfoICircle16GradientGrayIcon } from "@cloudtower/icons-react";
import { Antd5DropdownProps } from "@src/core";
import Icon from "@src/core/Icon";
import LineChart from "@src/core/LineChart";
import {
  ILineChartDateRange,
  ILineChartGraphType,
  ILineChartMetric,
  ILineChartMetricUnit,
} from "@src/core/LineChart/type";
import { getLineChartXAxisDomain } from "@src/core/LineChart/utils";
import { lineChartYaxisTickFormatter } from "@src/core/LineChart/utils";
import Tooltip from "@src/core/Tooltip";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import dayjs from "dayjs";
import type { MenuInfo } from "rc-menu/lib/interface";
import React from "react";
import { Payload } from "recharts/types/component/DefaultTooltipContent";

import { mockMetric, mockMetric2 } from "../../../__test__/mockLineChart";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Core/LineChart | 折线图",
  component: LineChart,
  argTypes: {
    height: {
      description: "图表高度",
      defaultValue: 154,
      control: { type: "number" },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: 154 },
      },
    },
    showPointer: {
      description: "是否显示鼠标悬停指示器",
      defaultValue: true,
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: true },
      },
    },
    yAxisAlign: {
      description: "Y轴对齐方式",
      defaultValue: "left",
      control: { type: "radio", options: ["left", "right"] },
      table: {
        type: { summary: '"left" | "right"' },
        defaultValue: { summary: "left" },
      },
    },
    showXaxis: {
      description: "是否显示X轴",
      defaultValue: false,
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    showLegend: {
      description: "是否显示图例",
      defaultValue: true,
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: true },
      },
    },
    "chartProps.metricName": {
      description: "指标名称",
      control: "text",
      table: {
        type: { summary: "string" },
        category: "Chart Props",
      },
    },
    "chartProps.yAxisAlign": {
      description: "Y轴对齐方式",
      control: { type: "radio", options: ["left", "right"] },
      table: {
        type: { summary: '"left" | "right"' },
        defaultValue: { summary: "left" },
        category: "Chart Props",
      },
    },
    "chartProps.showXAxis": {
      description: "是否显示X轴",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
        category: "Chart Props",
      },
    },
    "chartProps.showLegend": {
      description: "是否显示图例",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: true },
        category: "Chart Props",
      },
    },
    "chartProps.syncId": {
      description: "图表同步ID，用于多图表联动",
      control: "text",
      table: {
        type: { summary: "string" },
        category: "Chart Props",
      },
    },
    "chartProps.height": {
      description: "图表高度",
      control: "number",
      table: {
        type: { summary: "number" },
        category: "Chart Props",
      },
    },
    "chartProps.type": {
      description: "图表类型（面积图/堆叠图）",
      control: { type: "select", options: Object.values(ILineChartGraphType) },
      table: {
        type: { summary: "ILineChartGraphType" },
        category: "Chart Props",
      },
    },
    "chartProps.mode": {
      description:
        "展示模式（simple: 简单模式, legend: 图例模式, single: 单一模式）",
      control: { type: "select", options: ["simple", "legend", "single"] },
      table: {
        type: { summary: '"simple" | "legend" | "single"' },
        defaultValue: { summary: "legend" },
        category: "Chart Props",
      },
    },
    "chartProps.averageLine": {
      description: "是否显示平均线",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
        category: "Chart Props",
      },
    },
    "chartProps.dropdownProps": {
      description: "下拉菜单配置",
      table: {
        type: { summary: "DropdownProps" },
        category: "Chart Props",
      },
    },
    "chartProps.onLabelsChange": {
      description: "标签变化回调函数",
      table: {
        type: { summary: "(labels: string[]) => void" },
        category: "Chart Props",
      },
    },
    "chartProps.metric": {
      description: "图表数据指标配置",
      table: {
        type: { summary: "IMetric" },
        category: "Chart Props",
      },
    },
    "chartProps.yAxisProps": {
      description: "Y轴配置项，包含数值范围、刻度值和格式化函数",
      table: {
        type: {
          summary:
            "{ domain?: AxisDomain; ticks?: (string | number)[]; tickFormatter?: Function }",
        },
        category: "Chart Props",
      },
    },
    "chartProps.xAxisProps": {
      description: "X轴配置项，包含数值范围、刻度值和格式化函数",
      table: {
        type: {
          summary:
            "{ domain?: AxisDomain; ticks?: (string | number)[]; tickFormatter?: Function }",
        },
        category: "Chart Props",
      },
    },
    "chartProps.actionsProps": {
      description: "操作按钮配置项，控制按钮的显示和行为",
      table: {
        type: {
          summary:
            "{ show?: boolean; label: string | React.ReactNode; dropdownProps?: DropdownProps }",
        },
        category: "Chart Props",
      },
    },
    "chartProps.tooltipProps": {
      description: "提示框配置项，支持自定义格式化函数",
      table: {
        type: {
          summary:
            "TooltipProps & { format?: (payload: Payload<number, string>) => string }",
        },
        category: "Chart Props",
      },
    },
    "chartProps.dateRange": {
      description: "日期范围",
      table: {
        type: { summary: "DateRange" },
        category: "Chart Props",
      },
    },
    "chartProps.emptyText": {
      description: "空状态文案",
      table: {
        type: { summary: "string" },
        category: "Chart Props",
      },
    },
    "chartProps.emptyIcon": {
      description: "空状态图标",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/1wyDSOaumfpsImJ6loNy8o/Line-Chart%EF%BD%9C%E6%8A%98%E7%BA%BF%E5%9B%BE?node-id=1-1941&t=GSdF3JeTwKcEC4TR-0",
    },
    docs: {
      description: {
        component: `
### 折线图组件

用于展示时序数据的图表组件，具有以下特性：

- 支持面积图和堆叠图两种展示方式
- 提供三种展示模式：简单、图例、单一
- 支持X轴、Y轴的自定义配置
- 支持图例显示和交互
- 支持图例项自定义图标后缀
- 支持多图表联动
- 支持自定义提示框格式
- 支持日期范围选择
- 支持平均线显示

#### 使用场景

- 展示时序数据趋势
- 多指标数据对比
- 数据堆叠展示
- 需要联动的多图表展示
- 需要增强图例可读性的场景

#### TODO
- 支持 Number stat 看板
        `,
      },
    },
  },
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
} as ComponentMeta<typeof LineChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LineChart> = (args) => (
  <LineChart {...args} />
);
const TemplateSm: ComponentStory<typeof LineChart> = (args) => (
  <div style={{ width: "280px" }}>
    <LineChart {...args} />
  </div>
);
const TemplateMd: ComponentStory<typeof LineChart> = (args) => (
  <div style={{ width: "370px" }}>
    <LineChart {...args} />
  </div>
);
const TemplateLg: ComponentStory<typeof LineChart> = (args) => (
  <div style={{ width: "460px" }}>
    <LineChart {...args} />
  </div>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
const dateRange1: ILineChartDateRange = [
  dayjs("2022-12-13 16:00"),
  dayjs("2022-12-13 18:00"),
];

const dateRange2: ILineChartDateRange = [
  dayjs("2022-12-21T13:35:01.234Z"),
  dayjs("2022-12-22T13:35:01.234Z"),
];

const domain1 = getLineChartXAxisDomain(dateRange1, dateRange1[1].valueOf());

const menu: Antd5DropdownProps["menu"] = {
  items: [
    {
      key: "1",
      label: "Item 1",
    },
    {
      key: "2",
      label: "Item 2",
    },
    {
      key: "3",
      label: "Item 3",
    },
  ],
  selectable: true,
  defaultSelectedKeys: ["3"],
  onSelect: (key) => {
    console.log(key);
  },
};

export const ThresholdHighlight = Template.bind({});
export const ThresholdHighlightConditionalLabel = Template.bind({});
export const AreaSegmentHighlight = Template.bind({});
export const ForecastDashedLine = Template.bind({});

const thresholdHighlightMetric: ILineChartMetric = {
  sample_streams: [
    {
      points: [
        {
          t: dateRange1[0].valueOf(),
          v: 220 * 1024 ** 4,
        },
        {
          t: dateRange1[0].add(20, "minute").valueOf(),
          v: 260 * 1024 ** 4,
        },
        {
          t: dateRange1[0].add(40, "minute").valueOf(),
          v: 275 * 1024 ** 4,
        },
        {
          t: dateRange1[0].add(60, "minute").valueOf(),
          v: 248 * 1024 ** 4,
        },
        {
          t: dateRange1[0].add(80, "minute").valueOf(),
          v: 286 * 1024 ** 4,
        },
        {
          t: dateRange1[1].valueOf(),
          v: 268 * 1024 ** 4,
        },
      ],
      step: 20 * 60 * 1000,
      tolerance: 1700000,
      legend: {
        id: "forecast_usage",
        name: "Forecast Usage",
        color: "#8f63ff",
        fill: "rgba(143, 99, 255, 0.14)",
      },
    },
  ],
  unit: ILineChartMetricUnit.DataSize,
  dropped: false,
};

ThresholdHighlight.args = {
  chartProps: {
    syncId: "threshold-highlight",
    mode: "legend",
    showLegend: true,
    metricName: "Threshold Highlight Demo",
    metric: thresholdHighlightMetric,
    height: 180,
    type: ILineChartGraphType.Area,
    dateRange: dateRange1,
    showXAxis: true,
    xAxisProps: {
      domain: domain1,
    },
    thresholdLineProps: {
      value: 250 * 1024 ** 4,
      stroke: "#ff4d4f",
      strokeDasharray: "4 4",
      className: "threshold-line-custom-style",
      style: {
        opacity: 0.8,
        strokeWidth: 2,
      },
      intersectionLabelProps: {
        text: "24d",
        color: "#ff4d4f",
      },
    },
    tooltipProps: {
      format: (val) =>
        lineChartYaxisTickFormatter(val.value, ILineChartMetricUnit.DataSize),
    },
  },
};

ThresholdHighlight.parameters = {
  docs: {
    description: {
      story:
        "Shows a threshold dashed line with intersection tooltip and label pills.",
    },
  },
};

ThresholdHighlightConditionalLabel.args = {
  chartProps: {
    syncId: "threshold-highlight-conditional-label",
    mode: "legend",
    showLegend: true,
    metricName: "Threshold Conditional Label Demo",
    metric: thresholdHighlightMetric,
    height: 180,
    type: ILineChartGraphType.Area,
    dateRange: dateRange1,
    showXAxis: true,
    xAxisProps: {
      domain: domain1,
    },
    thresholdLineProps: {
      value: 250 * 1024 ** 4,
      stroke: "#ff4d4f",
      strokeDasharray: "4 4",
      intersectionLabelProps: {
        text: (info) => dayjs(info.timestamp).format("HH:mm"),
        color: "#ff4d4f",
        visible: (info) => {
          return info.timestamp >= dateRange1[0].add(60, "minute").valueOf();
        },
      },
    },
    tooltipProps: {
      format: (val) =>
        lineChartYaxisTickFormatter(val.value, ILineChartMetricUnit.DataSize),
    },
  },
};

ThresholdHighlightConditionalLabel.parameters = {
  docs: {
    description: {
      story:
        "Shows that every intersection remains available, but only one matching point renders a label.",
    },
  },
};

AreaSegmentHighlight.args = {
  chartProps: {
    syncId: "area-segment-highlight",
    mode: "legend",
    showLegend: true,
    metricName: "Area Segment Highlight Demo",
    metric: thresholdHighlightMetric,
    height: 180,
    type: ILineChartGraphType.Area,
    dateRange: dateRange1,
    showXAxis: true,
    xAxisProps: {
      domain: domain1,
    },
    areaHighlightRanges: [
      {
        start: dateRange1[0].add(12, "minute").valueOf(),
        end: dateRange1[0].add(48, "minute").valueOf(),
        fill: "#ff7875",
        fillOpacity: 0.2,
        legendId: "forecast_usage",
      },
    ],
    tooltipProps: {
      format: (val) =>
        lineChartYaxisTickFormatter(val.value, ILineChartMetricUnit.DataSize),
    },
  },
};

AreaSegmentHighlight.parameters = {
  docs: {
    description: {
      story:
        "Shows partial highlight filling only up to the curve value within the selected time range.",
    },
  },
};

ForecastDashedLine.args = {
  chartProps: {
    syncId: "forecast-dashed-line",
    mode: "legend",
    showLegend: true,
    metricName: "Forecast Dashed Line Demo",
    metric: thresholdHighlightMetric,
    height: 180,
    type: ILineChartGraphType.Area,
    dateRange: dateRange1,
    forecastStartTimestamp: dateRange1[0].add(40, "minute").valueOf(),
    showXAxis: true,
    xAxisProps: {
      domain: domain1,
    },
    tooltipProps: {
      format: (val) =>
        lineChartYaxisTickFormatter(val.value, ILineChartMetricUnit.DataSize),
    },
  },
};

ForecastDashedLine.parameters = {
  docs: {
    description: {
      story:
        "Shows historical values with a solid line and forecast values with a dashed line.",
    },
  },
};

Primary.args = {
  chartProps: {
    syncId: "abc",
    mode: "legend",
    showLegend: true,
    metricName: "hello",
    metric: mockMetric,
    height: 180,
    type: ILineChartGraphType.Area,
    dateRange: dateRange1,
    actionsProps: {
      show: true,
      label: "Label",
      dropdownProps: {
        menu,
        trigger: ["click"],
      },
    },
    showXAxis: true,
    tooltipProps: {
      format: (val) => {
        return `${val.value}`;
      },
    },
  },
};

export const PrimaryWithoutRight = Template.bind({});

PrimaryWithoutRight.args = {
  chartProps: {
    syncId: "abc",
    mode: "legend",
    showLegend: true,
    metricName: "hello",
    metric: mockMetric,
    height: 180,
    type: ILineChartGraphType.Area,
    dateRange: dateRange1,
    showXAxis: true,
    tooltipProps: {
      format: (val) => {
        return `${val.value}`;
      },
    },
  },
};

export const PrimaryWithLongLabel = Template.bind({});

PrimaryWithLongLabel.args = {
  chartProps: {
    syncId: "abc",
    mode: "legend",
    showLegend: true,
    metricName: "hello",
    metric: mockMetric,
    height: 180,
    type: ILineChartGraphType.Area,
    dateRange: dateRange1,
    actionsProps: {
      show: true,
      label: "Long Label LongLabel LongLabel LongLabel LongLabel LongLabel",
      dropdownProps: {
        menu,
        trigger: ["click"],
      },
    },
    showXAxis: true,
    tooltipProps: {
      format: (val) => {
        return `${val.value}`;
      },
    },
  },
};

export const PrimaryWithSingleYAxis = Template.bind({});
PrimaryWithSingleYAxis.args = {
  chartProps: {
    syncId: "abc",
    mode: "legend",
    showLegend: true,
    metricName: "hello",
    metric: mockMetric,
    height: 88,
    type: ILineChartGraphType.Area,
    dateRange: dateRange1,
    actionsProps: {
      show: true,
      label: "Label",
      dropdownProps: {
        menu,
        trigger: ["click"],
      },
    },
    showXAxis: true,
    tooltipProps: {
      format: (val) => {
        return `${val.value}`;
      },
    },
  },
};

export const PrimaryWithXAxisSm = TemplateSm.bind({});
PrimaryWithXAxisSm.args = {
  chartProps: {
    syncId: "abc",
    mode: "legend",
    showLegend: true,
    metricName: "hello",
    metric: mockMetric2,
    height: 180,
    type: ILineChartGraphType.Area,
    dateRange: dateRange2,
    actionsProps: {
      show: true,
      label: "Long Label LongLabel LongLabel LongLabel LongLabel LongLabel",
      dropdownProps: {
        menu,
        trigger: ["click"],
      },
    },
    showXAxis: true,
    tooltipProps: {
      format: (val) => {
        return `${val.value}`;
      },
    },
  },
};

export const PrimaryWithXAxisMd = TemplateMd.bind({});
PrimaryWithXAxisMd.args = {
  chartProps: {
    syncId: "abc",
    mode: "legend",
    showLegend: true,
    metricName: "hello",
    metric: mockMetric,
    height: 180,
    type: ILineChartGraphType.Area,
    dateRange: dateRange1,
    showXAxis: true,
    tooltipProps: {
      format: (val) => {
        return `${val.value}`;
      },
    },
  },
};

export const PrimaryWithXAxisLg = TemplateLg.bind({});
PrimaryWithXAxisLg.args = {
  chartProps: {
    syncId: "abc",
    mode: "legend",
    showLegend: true,
    metricName: "hello",
    metric: mockMetric,
    height: 180,
    type: ILineChartGraphType.Area,
    dateRange: dateRange1,
    showXAxis: true,
    tooltipProps: {
      format: (val) => {
        return `${val.value}`;
      },
    },
  },
};

export const Secondary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Secondary.args = {
  chartProps: {
    mode: "legend",
    showLegend: true,
    metricName: "hello",
    metric: mockMetric2,
    syncId: "abc",
    height: 180,
    type: ILineChartGraphType.Area,
    dateRange: dateRange2,
    yAxisProps: {},
    showXAxis: true,
    tooltipProps: {
      format: function (payload: Payload<number, string>): string {
        const { name, value: rawValue } = payload;
        if (Number.isFinite(rawValue)) {
          return `${name}: ${rawValue}`;
        }
        return "-";
      },
    },
  },
};

export const EmptyDefault = Template.bind({});
EmptyDefault.args = {
  chartProps: {
    syncId: "empty-default",
    mode: "legend",
    showLegend: true,
    metricName: "Empty Chart",
    metric: {
      sample_streams: [], // 空数据
      unit: ILineChartMetricUnit.Count,
      dropped: false,
    },
    height: 180,
    type: ILineChartGraphType.Area,
    dateRange: dateRange1,
    showXAxis: true,
    tooltipProps: {
      format: (val) => {
        return `${val.value}`;
      },
    },
  },
};

EmptyDefault.parameters = {
  docs: {
    description: {
      story: "展示默认的空状态，使用默认的空状态文案。",
    },
  },
};

export const EmptyWithCustomText = Template.bind({});
EmptyWithCustomText.args = {
  chartProps: {
    syncId: "empty-custom",
    mode: "legend",
    showLegend: true,
    metricName: "Empty Chart with Custom Text",
    metric: {
      sample_streams: [], // 空数据
      unit: ILineChartMetricUnit.Count,
      dropped: false,
    },
    height: 180,
    type: ILineChartGraphType.Area,
    dateRange: dateRange1,
    showXAxis: true,
    emptyText: "No data available for this time range",
    tooltipProps: {
      format: (val) => {
        return `${val.value}`;
      },
    },
  },
};

EmptyWithCustomText.parameters = {
  docs: {
    description: {
      story: "展示自定义文案的空状态。",
    },
  },
};

const mockDataWithDifferentUnits: Record<
  ILineChartMetricUnit,
  ILineChartMetric
> = {
  [ILineChartMetricUnit.Temperature]: {
    sample_streams: [
      {
        points: Array.from({ length: 10 }, (_, i) => {
          const startTime = dateRange1[0].valueOf();
          const timeStep =
            (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9;
          return {
            t: startTime + i * timeStep,
            v: 25 + Math.sin(i) * 5,
          };
        }),
        step: Math.floor(
          (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9,
        ),
        tolerance: 1700000,
        legend: {
          id: "cpu_temperature",
          name: "CPU Temperature",
          color: "#ff4d4f",
        },
      },
    ],
    unit: ILineChartMetricUnit.Temperature,
    dropped: false,
  },
  [ILineChartMetricUnit.DataSize]: {
    sample_streams: [
      {
        points: Array.from({ length: 10 }, (_, i) => {
          const startTime = dateRange1[0].valueOf();
          const timeStep =
            (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9;
          return {
            t: startTime + i * timeStep,
            v: 1024 * 1024 * (10 + i * 2),
          };
        }),
        step: Math.floor(
          (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9,
        ),
        tolerance: 1700000,
        legend: {
          id: "memory_usage",
          name: "Memory Usage",
          color: "#1890ff",
        },
      },
    ],
    unit: ILineChartMetricUnit.DataSize,
    dropped: false,
  },
  [ILineChartMetricUnit.Frequency]: {
    sample_streams: [
      {
        points: Array.from({ length: 10 }, (_, i) => {
          const startTime = dateRange1[0].valueOf();
          const timeStep =
            (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9;
          return {
            t: startTime + i * timeStep,
            v: 2.4e9 + Math.random() * 0.6e9,
          };
        }),
        step: Math.floor(
          (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9,
        ),
        tolerance: 1700000,
        legend: {
          id: "cpu_frequency",
          name: "CPU Frequency",
          color: "#52c41a",
        },
      },
    ],
    unit: ILineChartMetricUnit.Frequency,
    dropped: false,
  },
  [ILineChartMetricUnit.DataRateByte]: {
    sample_streams: [
      {
        points: Array.from({ length: 10 }, (_, i) => {
          const startTime = dateRange1[0].valueOf();
          const timeStep =
            (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9;
          return {
            t: startTime + i * timeStep,
            v: 1024 * 1024 * (5 + Math.sin(i) * 3),
          };
        }),
        step: Math.floor(
          (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9,
        ),
        tolerance: 1700000,
        legend: {
          id: "network_throughput",
          name: "Network Throughput",
          color: "#722ed1",
        },
      },
    ],
    unit: ILineChartMetricUnit.DataRateByte,
    dropped: false,
  },
  [ILineChartMetricUnit.Percent]: {
    sample_streams: [
      {
        points: Array.from({ length: 10 }, (_, i) => {
          const startTime = dateRange1[0].valueOf();
          const timeStep =
            (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9;
          return {
            t: startTime + i * timeStep,
            v: 50 + Math.sin(i) * 30,
          };
        }),
        step: Math.floor(
          (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9,
        ),
        tolerance: 1700000,
        legend: {
          id: "cpu_usage",
          name: "CPU Usage",
          color: "#fa8c16",
        },
      },
    ],
    unit: ILineChartMetricUnit.Percent,
    dropped: false,
  },
  [ILineChartMetricUnit.Count]: {
    sample_streams: [
      {
        points: Array.from({ length: 10 }, (_, i) => {
          const startTime = dateRange1[0].valueOf();
          const timeStep =
            (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9;
          return {
            t: startTime + i * timeStep,
            v: Math.floor(100 + Math.random() * 50),
          };
        }),
        step: Math.floor(
          (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9,
        ),
        tolerance: 1700000,
        legend: {
          id: "connections",
          name: "Active Connections",
          color: "#eb2f96",
        },
      },
    ],
    unit: ILineChartMetricUnit.Count,
    dropped: false,
  },
  [ILineChartMetricUnit.DataRateBit]: {
    sample_streams: [
      {
        points: Array.from({ length: 10 }, (_, i) => {
          const startTime = dateRange1[0].valueOf();
          const timeStep =
            (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9;
          return {
            t: startTime + i * timeStep,
            v: 1024 * 1024 * 8 * (3 + Math.sin(i) * 2),
          };
        }),
        step: Math.floor(
          (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9,
        ),
        tolerance: 1700000,
        legend: {
          id: "bit_rate",
          name: "Bit Rate",
          color: "#13c2c2",
        },
      },
    ],
    unit: ILineChartMetricUnit.DataRateBit,
    dropped: false,
  },
  [ILineChartMetricUnit.Load]: {
    sample_streams: [
      {
        points: Array.from({ length: 10 }, (_, i) => {
          const startTime = dateRange1[0].valueOf();
          const timeStep =
            (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9;
          return {
            t: startTime + i * timeStep,
            v: 1 + Math.sin(i) * 0.5,
          };
        }),
        step: Math.floor(
          (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9,
        ),
        tolerance: 1700000,
        legend: {
          id: "system_load",
          name: "System Load",
          color: "#faad14",
        },
      },
    ],
    unit: ILineChartMetricUnit.Load,
    dropped: false,
  },
  [ILineChartMetricUnit.Ratio]: {
    sample_streams: [
      {
        points: Array.from({ length: 10 }, (_, i) => {
          const startTime = dateRange1[0].valueOf();
          const timeStep =
            (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9;
          return {
            t: startTime + i * timeStep,
            v: 0.7 + Math.sin(i) * 0.2,
          };
        }),
        step: Math.floor(
          (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9,
        ),
        tolerance: 1700000,
        legend: {
          id: "success_ratio",
          name: "Success Ratio",
          color: "#a0d911",
        },
      },
    ],
    unit: ILineChartMetricUnit.Ratio,
    dropped: false,
  },
  [ILineChartMetricUnit.Time]: {
    sample_streams: [
      {
        points: Array.from({ length: 10 }, (_, i) => {
          const startTime = dateRange1[0].valueOf();
          const timeStep =
            (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9;
          return {
            t: startTime + i * timeStep,
            v: 1000000000 + Math.sin(i) * 500000000,
          };
        }),
        step: Math.floor(
          (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9,
        ),
        tolerance: 1700000,
        legend: {
          id: "response_time",
          name: "Response Time",
          color: "#f5222d",
        },
      },
    ],
    unit: ILineChartMetricUnit.Time,
    dropped: false,
  },
};

const DifferentUnitsTemplate: ComponentStory<typeof LineChart> = (args) => {
  const [currentUnit, setCurrentUnit] = React.useState<ILineChartMetricUnit>(
    ILineChartMetricUnit.Count,
  );

  const chartProps = {
    ...args.chartProps,
    metric: mockDataWithDifferentUnits[currentUnit],
    actionsProps: {
      show: true,
      label: "Select Unit",
      dropdownProps: {
        menu: {
          items: Object.values(ILineChartMetricUnit).map((unit) => ({
            key: unit,
            label: unit.toLowerCase().replace(/_/g, " "),
          })),
          selectable: true,
          defaultSelectedKeys: [currentUnit],
          onSelect: (info: MenuInfo) =>
            setCurrentUnit(info.key as ILineChartMetricUnit),
        },
        trigger: ["click"] as ("click" | "hover" | "contextMenu")[],
      },
    },
    tooltipProps: {
      format: (val: Payload<number, string>) =>
        lineChartYaxisTickFormatter(val.value, currentUnit),
    },
  };

  return <LineChart {...args} chartProps={chartProps} />;
};

export const DifferentUnits = DifferentUnitsTemplate.bind({});

DifferentUnits.args = {
  chartProps: {
    syncId: "different-units",
    mode: "legend",
    showLegend: true,
    metricName: "Different Units Demo",
    metric: mockDataWithDifferentUnits[ILineChartMetricUnit.Count],
    height: 180,
    type: ILineChartGraphType.Area,
    dateRange: dateRange1,
    showXAxis: true,
    xAxisProps: {
      domain: domain1,
    },
    tooltipProps: {
      format: (val) => `${val.value}`,
    },
  },
};

DifferentUnits.parameters = {
  docs: {
    description: {
      story:
        "展示不同单位的折线图，包括温度、数据大小、频率等。每种单位都有其特定的格式化方式和展示效果。",
    },
  },
};

export const ZeroDataChart = Template.bind({});

const zeroDataMetric: ILineChartMetric = {
  sample_streams: [
    {
      points: Array.from({ length: 10 }, (_, i) => {
        const startTime = dateRange1[0].valueOf();
        const timeStep =
          (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9;
        return {
          t: startTime + i * timeStep,
          v: 0,
        };
      }),
      step: Math.floor((dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9),
      tolerance: 1700000,
      legend: {
        id: "zero_data",
        name: "零值数据",
        color: "#1890ff",
      },
    },
    {
      points: Array.from({ length: 10 }, (_, i) => {
        const startTime = dateRange1[0].valueOf();
        const timeStep =
          (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9;
        return {
          t: startTime + i * timeStep,
          v: 0,
        };
      }),
      step: Math.floor((dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9),
      tolerance: 1700000,
      legend: {
        id: "zero_data_2",
        name: "零值数据2",
        color: "#52c41a",
      },
    },
  ],
  unit: ILineChartMetricUnit.Count,
  dropped: false,
};

ZeroDataChart.args = {
  chartProps: {
    syncId: "zero-data",
    mode: "legend",
    showLegend: true,
    metricName: "Zero Value Chart",
    metric: zeroDataMetric,
    height: 180,
    type: ILineChartGraphType.Area,
    dateRange: dateRange1,
    showXAxis: true,
    xAxisProps: {
      domain: domain1,
    },
    yAxisProps: {
      domain: [0, 10], // 设置y轴范围，避免全0时的缩放问题
    },
    tooltipProps: {
      format: (val) => `${val.value}`,
    },
  },
};

ZeroDataChart.parameters = {
  docs: {
    description: {
      story:
        "展示全为0值的数据场景，用于测试和验证图表在极端情况下的展示效果。",
    },
  },
};

const networkIconSuffix = (
  <Tooltip title="Network Throughput">
    <Icon
      alt="network-security"
      src={InfoICircle16GradientGrayIcon}
      style={{ marginLeft: "4px", width: "16px", height: "16px" }}
    />
  </Tooltip>
);

const DynamicTimeRangeTemplate: ComponentStory<typeof LineChart> = (args) => {
  const [currentDateRange, setCurrentDateRange] =
    React.useState<ILineChartDateRange>([dayjs().subtract(1, "hour"), dayjs()]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateRange([dayjs().subtract(1, "hour"), dayjs()]);
    }, 10000); // 每10秒更新一次

    return () => clearInterval(timer);
  }, []);

  const dynamicMetric: ILineChartMetric = React.useMemo(() => {
    const startTime = currentDateRange[0].valueOf();
    const endTime = currentDateRange[1].valueOf();
    const timeStep = (endTime - startTime) / 11;

    return {
      sample_streams: [
        {
          points: Array.from({ length: 12 }, (_, i) => ({
            t: startTime + i * timeStep,
            v:
              50 +
              Math.sin(i * 0.5) * 30 +
              Math.sin(startTime * 0.0001 + i) * 10,
          })),
          step: Math.floor(timeStep),
          tolerance: 1700000,
          legend: {
            id: "dynamic_data",
            name: "Dynamic CPU Usage",
            color: "#1890ff",
            iconSuffix: networkIconSuffix,
          },
        },
      ],
      unit: ILineChartMetricUnit.Percent,
      dropped: false,
    };
  }, [currentDateRange]);

  const chartProps = React.useMemo(
    () => ({
      ...args.chartProps,
      dateRange: currentDateRange,
      metric: dynamicMetric,
    }),
    [args.chartProps, currentDateRange, dynamicMetric],
  );

  return <LineChart {...args} chartProps={chartProps} />;
};

export const DynamicTimeRange = DynamicTimeRangeTemplate.bind({});

DynamicTimeRange.args = {
  chartProps: {
    syncId: "dynamic-time-range",
    mode: "legend",
    showLegend: true,
    metricName: "Dynamic Time Range Demo",
    height: 180,
    type: ILineChartGraphType.Area,
    showXAxis: true,
    tooltipProps: {
      format: (val) => `${val.value}%`,
    },
    metric: {
      sample_streams: [],
      unit: ILineChartMetricUnit.Percent,
      dropped: false,
    },
    dateRange: [dayjs().subtract(1, "hour"), dayjs()],
  },
};

DynamicTimeRange.parameters = {
  docs: {
    description: {
      story:
        "展示一个动态更新时间范围的折线图示例。该图表每10秒自动更新一次时间范围，始终显示最近一小时的数据。",
    },
  },
};

export const LegendWithIconSuffix = TemplateLg.bind({});

const metricWithIconSuffix: ILineChartMetric = {
  sample_streams: [
    {
      points: Array.from({ length: 10 }, (_, i) => {
        const startTime = dateRange1[0].valueOf();
        const timeStep =
          (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9;
        return {
          t: startTime + i * timeStep,
          v: 50 + Math.sin(i) * 30 + Math.random() * 10,
        };
      }),
      step: Math.floor((dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9),
      tolerance: 1700000,
      legend: {
        id: "cpu_usage_with_icon",
        name: "CPU Usage",
        color: "#1890ff",
        iconSuffix: (
          <Icon
            alt="alert-bell"
            src={InfoICircle16GradientGrayIcon}
            style={{ marginLeft: "4px", width: "16px", height: "16px" }}
          />
        ),
      },
    },
    {
      points: Array.from({ length: 10 }, (_, i) => {
        const startTime = dateRange1[0].valueOf();
        const timeStep =
          (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9;
        return {
          t: startTime + i * timeStep,
          v: 1024 * 1024 * (5 + Math.sin(i) * 3),
        };
      }),
      step: Math.floor((dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9),
      tolerance: 1700000,
      legend: {
        id: "memory_usage_with_icon",
        name: "Memory Usage",
        color: "#52c41a",
        iconSuffix: (
          <Icon
            alt="backup"
            src={InfoICircle16GradientGrayIcon}
            style={{ marginLeft: "4px", width: "16px", height: "16px" }}
          />
        ),
      },
    },
    {
      points: Array.from({ length: 10 }, (_, i) => {
        const startTime = dateRange1[0].valueOf();
        const timeStep =
          (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9;
        return {
          t: startTime + i * timeStep,
          v: 1024 * 1024 * 8 * (3 + Math.sin(i) * 2),
        };
      }),
      step: Math.floor((dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9),
      tolerance: 1700000,
      legend: {
        id: "network_throughput_with_icon",
        name: "Network Throughput",
        color: "#722ed1",
        iconSuffix: (
          <Tooltip title="Network Throughput">
            <Icon
              alt="network-security"
              src={InfoICircle16GradientGrayIcon}
              style={{ marginLeft: "4px", width: "16px", height: "16px" }}
            />
          </Tooltip>
        ),
      },
    },
    {
      points: Array.from({ length: 10 }, (_, i) => {
        const startTime = dateRange1[0].valueOf();
        const timeStep =
          (dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9;
        return {
          t: startTime + i * timeStep,
          v: 1024 * 1024 * 8 * (3 + Math.sin(i) * 2),
        };
      }),
      step: Math.floor((dateRange1[1].valueOf() - dateRange1[0].valueOf()) / 9),
      tolerance: 1700000,
      legend: {
        id: "network_throughput_with_icon_long_name",
        name: "Network Throughput long name longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
        color: "#722ed1",
        iconSuffix: (
          <Tooltip title="Network Throughput">
            <Icon
              alt="network-security"
              src={InfoICircle16GradientGrayIcon}
              style={{ marginLeft: "4px", width: "16px", height: "16px" }}
            />
          </Tooltip>
        ),
      },
    },
  ],
  unit: ILineChartMetricUnit.DataRateBit,
  dropped: false,
};

LegendWithIconSuffix.args = {
  chartProps: {
    syncId: "legend-with-icon-suffix",
    mode: "legend",
    showLegend: true,
    metricName: "Legend with Icon Suffix Demo",
    metric: metricWithIconSuffix,
    height: 180,
    type: ILineChartGraphType.Area,
    dateRange: dateRange1,
    showXAxis: true,
    xAxisProps: {
      domain: domain1,
    },
    tooltipProps: {
      format: (val) =>
        lineChartYaxisTickFormatter(
          val.value,
          ILineChartMetricUnit.DataRateBit,
        ),
    },
  },
};

LegendWithIconSuffix.parameters = {
  docs: {
    description: {
      story:
        "展示带有图标后缀的图例示例。每个图例项都可以配置自定义的图标后缀，用于增强图例的可读性和视觉效果。",
    },
  },
};
