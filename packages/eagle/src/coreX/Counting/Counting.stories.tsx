import type { Meta, StoryObj } from "@storybook/react";

import Counting from ".";

const meta: Meta<typeof Counting> = {
  title: "CoreX/Counting",
  component: Counting,
  parameters: {
    docs: {
      description: {
        component: "Counting 用于需要每秒更新内容的组件",
      },
    },
  },
  argTypes: {},
};

export default meta;

export const HasNoStop = {
  parameters: {
    docs: {
      description: {
        story:
          "Counting 组件在没有传入Stop属性时，每秒钟会更新执行 render 函数",
      },
    },
  },
  args: {
    render: () => {
      return Math.random();
    },
  },
};

export const Stopped = {
  parameters: {
    docs: {
      description: {
        story: "Counting 组件传入 Stop 属性后，不再会执行更新",
      },
    },
  },
  args: {
    stop: true,
    render: () => {
      return Math.random();
    },
  },
};
