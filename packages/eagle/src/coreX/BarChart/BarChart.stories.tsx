import type { Meta, StoryObj } from "@storybook/react";

import BarChart from ".";

const meta: Meta<typeof BarChart> = {
  title: "CoreX/BarChart",
  component: BarChart,
  parameters: {
    docs: {
      description: {
        component: "可以显示多个进度块的条状图",
      },
    },
  },
  argTypes: {
    data: {
      type: {
        name: "array",
        value: {
          name: "number",
        },
      },
      description: "块在条状图中所占的比例",
    },
    total: {
      type: "number",
      description: "定义 Chart 的总长度",
    },
  },
};

export default meta;

type Story = StoryObj<typeof BarChart>;

export const Demo: Story = {
  parameters: {
    docs: {
      description: {
        story: "红色占 1/10 ，绿色占 2/10，剩余部分默认显示",
      },
    },
  },
  args: {
    data: [
      {
        value: 1,
        color: "red",
      },
      {
        value: 2,
        color: "green",
      },
    ],
    total: 10,
  },
};
