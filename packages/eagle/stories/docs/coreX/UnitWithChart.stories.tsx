import UnitWithChart from "@src/coreX/UnitWithChart";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UnitWithChart> = {
  title: "CoreX/UnitWithChart",
  component: UnitWithChart,
  parameters: {
    docs: {
      description: {
        component: "环状图与条状图二选一的图表",
      },
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof UnitWithChart>;

export const BarChart: Story = {
  parameters: {
    docs: {
      description: {
        story: "条状图",
      },
    },
  },
  args: {
    rawValue: 20,
    total: 100,
    data: [
      {
        label: "label 1",
        color: "blue",
        value: 10,
      },
      {
        label: "label 2",
        color: "red",
        value: 20,
      },
    ],
    unit: "Second",
    chartType: "barChart",
  },
};

export const DountChart: Story = {
  parameters: {
    docs: {
      description: {
        story: "环状图不接受 data 参数",
      },
    },
  },
  args: {
    rawValue: 20,
    total: 100,
    unit: "Second",
    chartType: "donutChart",
  },
};
