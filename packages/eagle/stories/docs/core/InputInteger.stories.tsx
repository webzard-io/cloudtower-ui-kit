import InputInteger from "@src/core/InputInteger";
import { CoreMeta } from "@stories/types";
import { StoryObj } from "@storybook/react";

const meta = {
  component: InputInteger,
  title: "Core/InputInteger | 整数输入",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/lfADvU6DVoVckockz0jOAC/Text-Field?node-id=610%3A50833&mode=dev",
    },
  },
} satisfies CoreMeta<typeof InputInteger>;

export default meta;

type Story = StoryObj<typeof InputInteger>;

export const MiddleSize: Story = {
  name: "默认尺寸",
  args: {},
};

export const SmallSize: Story = {
  name: "小尺寸",
  args: {
    size: "small",
  },
};

export const LargeSize: Story = {
  name: "大尺寸",
  args: {
    size: "large",
  },
};

/**
 * Control 默认值为 false。
 * 默认不使用箭头按钮。
 */
export const ShowControl: Story = {
  name: "显示箭头按钮",
  args: {
    controls: true,
  },
};

/**
 * 在输入框的末尾显示文字。
 * 如果开启 control，则不会显示
 */
export const Suffix: Story = {
  name: "末尾显示文字",
  args: {
    suffix: "末尾文字",
  },
};
