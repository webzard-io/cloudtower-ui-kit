import { Button } from "@src/core";
import { InfoRowList } from "@src/coreX";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

/**
 * InfoRowList 组件用于展示一组键值对信息，支持自定义操作按钮和加载状态。
 * 支持普通模式（适用于设置页面）和紧凑模式（适用于详情页面）两种展示方式。
 */
const meta = {
  component: InfoRowList,
  title: "CoreX/InfoRowList | 信息列表",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InfoRowList>;

export default meta;

type Story = StoryObj<typeof InfoRowList>;

/**
 * 基础用法展示了最简单的信息列表展示方式，适用于设置页面
 */
export const Basic: Story = {
  name: "基础用法",
  args: {
    loading: false,
    data: [
      {
        key: "name",
        name: "名称",
        value: "示例虚拟机",
      },
      {
        key: "status",
        name: "状态",
        value: "运行中",
      },
      {
        key: "ip",
        name: "IP地址",
        value: "192.168.1.100",
      },
    ],
  },
};

/**
 * 带操作按钮的用法，每行右侧可以添加自定义的操作按钮
 */
export const WithActions: Story = {
  name: "带操作按钮",
  args: {
    loading: false,
    data: [
      {
        key: "name",
        name: "名称",
        value: "示例虚拟机",
        action: (
          <Button type="text" size="small">
            编辑
          </Button>
        ),
      },
      {
        key: "description",
        name: "描述",
        value: "这是一段很长的描述文本，用来测试文本溢出的情况。".repeat(3),
        action: (
          <Button type="text" size="small">
            修改
          </Button>
        ),
      },
    ],
  },
};

/**
 * 紧凑模式的展示方式，适用于详情页面
 */
export const Compact: Story = {
  name: "紧凑模式",
  args: {
    loading: false,
    compact: true,
    data: [
      {
        key: "name",
        name: "名称",
        value: "示例虚拟机",
      },
      {
        key: "cpu",
        name: "CPU",
        value: "4核",
      },
      {
        key: "memory",
        name: "内存",
        value: "8GB",
      },
    ],
  },
};

/**
 * 加载状态展示
 */
export const Loading: Story = {
  name: "加载状态",
  args: {
    loading: true,
    data: [],
  },
};

/**
 * 空值和隐藏行的展示
 */
export const EmptyAndHidden: Story = {
  name: "空值和隐藏行",
  args: {
    loading: false,
    data: [
      {
        key: "name",
        name: "名称",
        value: "示例虚拟机",
      },
      {
        key: "description",
        name: "描述",
        value: null,
      },
      {
        key: "hidden_field",
        name: "隐藏字段",
        value: "这个字段不会显示",
        hidden: true,
      },
    ],
  },
};
