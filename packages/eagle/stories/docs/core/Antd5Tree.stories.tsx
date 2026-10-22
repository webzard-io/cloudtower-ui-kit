import { Antd5Tree, Antd5TreeProps } from "@src/core";
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

type Story = StoryObj<Antd5TreeProps>;

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
 * 对照正常、叶子节点禁用和整树禁用时的勾选联动。
 */
export const DisabledCheckboxStates: Story = {
  name: "复选框禁用状态",
  args: {
    checkable: true,
    defaultExpandAll: true,
    defaultCheckedKeys: ["checked", "disabled-checked"],
    treeData: [
      {
        title: "父节点",
        key: "parent",
        children: [
          { title: "叶子节点 1", key: "unchecked" },
          { title: "叶子节点 2", key: "checked" },
          { title: "叶子节点 3", key: "disabled-unchecked", disabled: true },
          { title: "叶子节点 4", key: "disabled-checked", disabled: true },
        ],
      },
    ],
  },
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
      <section>
        <h4>正常状态</h4>
        <Antd5Tree
          {...args}
          treeData={args.treeData?.map((node) => ({
            ...node,
            children: node.children?.map((child) => ({
              ...child,
              disabled: false,
            })),
          }))}
        />
      </section>
      <section>
        <h4>禁用叶子节点</h4>
        <Antd5Tree {...args} />
      </section>
      <section>
        <h4>整树禁用</h4>
        <Antd5Tree {...args} disabled />
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "父节点默认展开，叶子节点 2、4 初始勾选。禁用叶子节点场景中，叶子节点 3 未勾选且禁用，叶子节点 4 已勾选且禁用，其余节点可交互。点击可用叶子节点或父节点可验证勾选联动；父节点根据可用叶子节点自动呈现未选中、半选或全选，禁用叶子节点保持原状态。整树禁用场景用于对照禁用样式。",
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

/**
 * 使用 TreeNode 组件手动构建树
 */
export const TreeNodeUsage: Story = {
  name: "使用 TreeNode 组件",
  render: (args) => (
    <Antd5Tree {...args}>
      <Antd5Tree.TreeNode title="父节点 1" key="0-0">
        <Antd5Tree.TreeNode title="子节点 1-1" key="0-0-0" />
        <Antd5Tree.TreeNode title="子节点 1-2" key="0-0-1" />
      </Antd5Tree.TreeNode>
      <Antd5Tree.TreeNode title="父节点 2" key="0-1" />
    </Antd5Tree>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "通过 Antd5Tree.TreeNode 组件手动构建树结构，适用于需要更灵活控制子节点的场景。",
      },
    },
  },
};
