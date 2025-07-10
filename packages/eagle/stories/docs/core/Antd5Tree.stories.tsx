import { Antd5Tree } from "@src/core";
import { CoreMeta } from "@stories/types";
import type { StoryObj } from "@storybook/react";
import React from "react";

/**
 * * Antd5Tree 组件
 * * 基于 antd5 的 Tree 组件封装
 * * 支持树形结构的展示、选择、展开等功能
 * * 更多 props 请参考：https://ant.design/components/tree-cn#API
 */
const meta = {
  component: Antd5Tree,
  title: "Core/Antd5Tree | 树形控件",
  parameters: {
    design: {
      type: "figma",
      url: "https://ant.design/components/tree-cn/",
    },
  },
} satisfies CoreMeta<typeof Antd5Tree>;

export default meta;

type Story = StoryObj<typeof Antd5Tree>;

/**
 * 基础用法
 */
export const Basic: Story = {
  name: "基础用法",
  args: {
    treeData: [
      {
        title: "父节点 1",
        key: "0-0",
        children: [
          {
            title: "子节点 1-1",
            key: "0-0-0",
          },
          {
            title: "子节点 1-2",
            key: "0-0-1",
          },
        ],
      },
      {
        title: "父节点 2",
        key: "0-1",
      },
    ],
  },
  render: (args) => <Antd5Tree {...args} />,
  parameters: {
    docs: {
      description: {
        story: "最基础的树形结构展示。",
      },
    },
  },
};

/**
 * 可选择节点
 */
export const Checkable: Story = {
  name: "可选择节点",
  args: {
    checkable: true,
    treeData: [
      {
        title: "父节点 1",
        key: "0-0",
        children: [
          {
            title: "子节点 1-1",
            key: "0-0-0",
          },
          {
            title: "子节点 1-2",
            key: "0-0-1",
          },
        ],
      },
      {
        title: "父节点 2",
        key: "0-1",
      },
    ],
  },
  render: (args) => <Antd5Tree {...args} />,
  parameters: {
    docs: {
      description: {
        story: "支持节点选择（复选框）。",
      },
    },
  },
};

/**
 * 默认展开部分节点
 */
export const DefaultExpanded: Story = {
  name: "默认展开部分节点",
  args: {
    defaultExpandedKeys: ["0-0"],
    treeData: [
      {
        title: "父节点 1",
        key: "0-0",
        children: [
          {
            title: "子节点 1-1",
            key: "0-0-0",
          },
          {
            title: "子节点 1-2",
            key: "0-0-1",
          },
        ],
      },
      {
        title: "父节点 2",
        key: "0-1",
      },
    ],
  },
  render: (args) => <Antd5Tree {...args} />,
  parameters: {
    docs: {
      description: {
        story: "通过 defaultExpandedKeys 控制默认展开的节点。",
      },
    },
  },
};
