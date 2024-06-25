import Bit from "@src/core/Bit";
import { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Core/Bit | 发送，接收数据量（网络流量）",
  component: Bit,
} as Meta<typeof Bit>;

type Story = StoryObj<typeof Bit>;

export const Simple: Story = {
  args: {
    rawValue: 1000,
    abbreviate: true,
  },
};

export const Empty: Story = {
  args: {
    emptyProps: {
      style: { color: "red" },
    },
  },
};
