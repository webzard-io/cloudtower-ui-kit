import { CircleProgress } from "@src/core/StepProgress";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CircleProgress> = {
  title: "Core/CircleProgress",
  component: CircleProgress,
  parameters: {
    docs: {
      description: {
        component: "CircleProgress default props",
      },
    },
  },
  argTypes: {
    percent: {
      type: "number",
      description: "percent 字段需要填大于0，小于1的小数",
      defaultValue: true,
    },
    color: {
      type: "string",
      description:
        "color 字段需要填写 css 颜色或 Hex rgb。https://www.w3.org/wiki/CSS/Properties/color/keywords",
      defaultValue: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof CircleProgress>;

export const HundredPercent: Story = {
  parameters: {
    docs: {
      description: {
        story: "显示进度为 100% 的圆形进度条",
      },
    },
  },
  args: {
    percent: 1,
  },
};

export const FiftyPercent: Story = {
  parameters: {
    docs: {
      description: {
        story: "显示进度为 100% 的圆形进度条",
      },
    },
  },
  args: {
    percent: 0.3,
  },
};

export const ColorRed: Story = {
  parameters: {
    docs: {
      description: {
        story: "显示进度为 30% 的圆形进度条, 颜色红色",
      },
    },
  },
  args: {
    percent: 0.3,
    color: "red",
  },
};
