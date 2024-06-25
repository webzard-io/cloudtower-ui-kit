import Frequency from "@src/core/Frequency";
import { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Core/Frequency | CPU 频率",
  component: Frequency,
} as Meta<typeof Frequency>;

type Story = StoryObj<typeof Frequency>;

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
