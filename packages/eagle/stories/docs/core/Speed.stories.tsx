import Speed from "@src/core/Speed";
import { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Core/Speed | 网口速率",
  component: Speed,
} as Meta<typeof Speed>;

type Story = StoryObj<typeof Speed>;
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
