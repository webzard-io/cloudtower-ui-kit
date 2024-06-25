import Byte from "@src/core/Byte";
import { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Core/Byte | 内存和存储容量",
  component: Byte,
} as Meta<typeof Byte>;

type Story = StoryObj<typeof Byte>;

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
