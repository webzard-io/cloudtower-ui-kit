import BitPerSecond from "@src/core/BitPerSecond";
import { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Core/BitPerSecond ｜ 存储带宽，数据传输速率",
  component: BitPerSecond,
} as Meta<typeof BitPerSecond>;

type Story = StoryObj<typeof BitPerSecond>;

export const Simple: Story = {
  args: {
    rawValue: 1000,
  },
};

export const Empty: Story = {
  args: {
    emptyProps: {
      style: {
        color: "red",
      },
    },
  },
};
