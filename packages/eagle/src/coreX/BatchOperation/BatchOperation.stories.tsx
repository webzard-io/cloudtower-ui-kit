import { Tag16GradientBlueIcon } from "@cloudtower/icons-react";
import { Icon } from "@src/core";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import BatchOperation from ".";

const Template = (props: Parameters<typeof BatchOperation>[0]) => {
  return (
    <div style={{ height: 70 }}>
      <BatchOperation {...props} />
    </div>
  );
};

const meta: Meta<typeof BatchOperation> = {
  title: "CoreX/BatchOperation",
  component: Template,
  parameters: {
    docs: {
      description: {
        component: "对资源的批量操作工具栏",
      },
    },
  },
  argTypes: {
    actions: {
      type: {
        name: "array",
        value: {
          name: "object",
          value: {},
        },
      },
      description: "批量操作的具体行为按钮",
    },
    count: {
      type: "number",
      description: "选中的项目数",
    },
  },
};

export default meta;

type Story = StoryObj<typeof BatchOperation>;

export const Demo: Story = {
  args: {
    count: 10,
    actions: [
      {
        key: "abc",
        icon: <Icon src={Tag16GradientBlueIcon} />,
        title: "编辑标签",
        onClick() {},
      },
    ],
  },
};
