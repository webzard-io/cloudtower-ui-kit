import Avatar from "@src/core/Avatar";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = {
  component: Avatar,
  title: "Core/Avatar | 头像",
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/**
 * 用来代表用户或事物
 */
export const Basic: Story = {
  render: (args) => <Avatar {...args} />,
  args: {
    username: "R",
  },
};
