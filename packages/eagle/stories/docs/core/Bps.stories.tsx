import Bps from "@src/core/Bps";
import { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Core/Bps | 网络流量带宽",
  component: Bps,
} as Meta<typeof Bps>;

type Story = StoryObj<typeof Bps>;

export const Simple: Story = {
  args: { rawValue: 1000 },
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
