import Second from "@src/core/Second";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

/**
 * * Second 组件
 * * 用于展示秒数，支持不同的展示形式
 * * 提供标准、缩写和自定义空值展示等功能
 * * 继承自基础的 Units 系列组件
 */
const meta = {
  title: "Core/Second | 秒数展示",
  component: Second,
  parameters: {
    docs: {
      description: {
        component:
          "Second 组件用于展示秒数，支持多种格式和展示方式，如标准展示、缩写展示等。",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Second>;

export default meta;

type Story = StoryObj<typeof Second>;

/**
 * 基础秒数展示
 * 展示最基本的秒数，不做任何特殊处理
 */
export const Basic: Story = {
  name: "基础秒数展示",
  args: {
    rawValue: 1000,
  },
  render: (args) => <Second {...args} />,
};

/**
 * 缩写形式展示
 * 当需要节省空间时，可以使用缩写形式展示秒数
 */
export const Abbreviated: Story = {
  name: "缩写形式展示",
  args: {
    rawValue: 1000,
    abbreviate: true,
  },
  render: (args) => <Second {...args} />,
};

/**
 * 精确小数位展示
 * 可以指定保留的小数位数，提高精确度
 */
export const WithDecimals: Story = {
  name: "精确小数位展示",
  args: {
    rawValue: 1234.5678,
    decimals: 2,
  },
  render: (args) => <Second {...args} />,
};

/**
 * 零值不带单位
 * 当值为0时，可以选择不显示单位
 */
export const ZeroWithoutUnit: Story = {
  name: "零值不带单位",
  args: {
    rawValue: 0,
    noUnitOnZero: true,
  },
  render: (args) => <Second {...args} />,
};

/**
 * 大数值展示
 * 展示较大的秒数
 */
export const LargeValue: Story = {
  name: "大数值展示",
  args: {
    rawValue: 86400, // 一天的秒数
  },
  render: (args) => <Second {...args} />,
};

/**
 * 自定义空值展示
 * 当没有有效值时的自定义展示
 */
export const CustomEmpty: Story = {
  name: "自定义空值展示",
  args: {
    rawValue: null,
    emptyProps: {
      style: {
        color: "red",
      },
    },
  },
  render: (args) => <Second {...args} />,
};

/**
 * 自定义样式
 * 可以通过自定义类名来调整展示样式
 */
export const CustomStyle: Story = {
  name: "自定义样式",
  args: {
    rawValue: 1000,
    valueClassName: "custom-value-class",
    unitClassName: "custom-unit-class",
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <style>
        {`
          .custom-value-class { font-weight: bold; color: blue; }
          .custom-unit-class { font-style: italic; color: orange; }
        `}
      </style>
      <Second {...args} />
    </div>
  ),
};
