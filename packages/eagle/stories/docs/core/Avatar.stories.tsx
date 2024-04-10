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
    background: "light-blue",
  },
};

/**
 * 默认支持两种背景色 'light-blue' 和 'dark-blue'，也可以传递自定义的背景色
 */
export const Background: Story = {
  render: (args) => (
    <>
      <Avatar {...args} background="light-blue" />
      <Avatar {...args} background="dark-blue" />
      <Avatar {...args} background={"blue" as any} />
    </>
  ),
  parameters: {
    controls: {
      exclude: ["background"],
    },
  },
  args: {
    username: "R",
  },
};
