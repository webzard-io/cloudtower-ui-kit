import InputPassword from "@src/core/InputPassword";
import { CoreMeta } from "@stories/types";
import { StoryObj } from "@storybook/react";

const meta = {
  component: InputPassword,
  title: "Core/InputPassword | 密码输入",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1NetGx5rqVMRCUDh2DYTpk/Cluster-Installer-Foundation?type=design&node-id=6283-43749&mode=design&t=cBPohy0TfTYU4pZf-0",
    },
  },
} satisfies CoreMeta<typeof InputPassword>;

export default meta;

type Story = StoryObj<typeof InputPassword>;

export const SmallSize: Story = {
  name: "默认尺寸",
  args: {},
};

export const MiddleSize: Story = {
  name: "中等尺寸",
  args: {
    size: "middle",
  },
};

export const LargeSize: Story = {
  name: "大尺寸",
  args: {
    size: "large",
  },
};
