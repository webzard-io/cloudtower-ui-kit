import {
  Tag16GradientBlueIcon,
  TrashBinDelete16RedIcon,
  VmRecycleBinMoveToBin16RedIcon,
} from "@cloudtower/icons-react";
import { Icon } from "@src/core";
import BatchOperation from "@src/coreX/BatchOperation";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

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
      {
        key: "delete",
        icon: <Icon src={TrashBinDelete16RedIcon} />,
        title: "删除",
        danger: true,
        disabled: false,
        children: [
          {
            key: "Delete",
            icon: <Icon src={TrashBinDelete16RedIcon} />,
            title: "永久删除",
            danger: true,
            disabled: false,
            count: 2,
            onClick: () => {},
          },
          {
            key: "MoveToRecycleBin",
            icon: <Icon src={VmRecycleBinMoveToBin16RedIcon} />,
            title: "移至回收站",
            danger: true,
            disabled: false,
            count: 4,
            onClick: () => {},
          },
        ],
      },
    ],
  },
};
