import Breadcrumb from "@src/core/Breadcrumb";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Breadcrumb> = {
  title: "Core/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    docs: {
      description: {
        component: "面包屑组件用于导航",
      },
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Demo: Story = {
  parameters: {
    docs: {
      description: {
        story: "items 需要填写 onClick 函数响应点击事件",
      },
    },
  },
  args: {
    items: [
      {
        name: "A Short Name",
        id: "a",
        resource: "test",
        tab: "hello",
        onClick: () => {},
      },
      {
        name: "A Loooooooooooooooong Name",
        id: "b",
        resource: "test",
        tab: "hello",
        onClick: () => {},
      },
      {
        name: "Loooooooooooooooooooooooooong",
        id: "c",
        resource: "test",
        tab: "hello",
        onClick: () => {},
      },
    ],
  },
};
