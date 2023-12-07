import type { Meta, StoryObj } from "@storybook/react";

import ChartWithTooltip from "./";

const meta: Meta<typeof ChartWithTooltip> = {
  title: "CoreX/ChartWithTooltip",
  component: ChartWithTooltip,
  parameters: {
    docs: {
      description: {
        component: "带有Tooltip提示的图表组件",
      },
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ChartWithTooltip>;

export const BarChart: Story = {
  parameters: {
    docs: {
      description: {
        story: "有提示条的条状图",
      },
    },
  },
  args: {
    chartType: "barChart",
    unit: "Percent",
    title: {
      label: "简单的 label",
      value: 20,
    },
    items: [
      {
        label: "Item 1",
        color: "blue",
        value: 3,
      },
      {
        label: "Item 2",
        color: "red",
        value: 5,
      },
    ],
    rawValue: 5,
  },
};

export const DountChart: Story = {
  parameters: {
    docs: {
      description: {
        story: "有提示的环状图（Tower 中无此使用方式）",
      },
    },
  },
  args: {
    title: {
      label: "简单的 label",
      value: 20,
    },
    items: [
      {
        label: "Item 1",
        color: "blue",
        value: 10,
      },
      {
        label: "Item 2",
        color: "red",
        value: 10,
      },
    ],
    rawValue: 20,
    unit: "Second",
    chartType: "donutChart",
  },
};
