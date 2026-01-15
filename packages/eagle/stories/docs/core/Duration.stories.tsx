import Duration from "@src/core/Duration";
import {
  DurationUnitType,
  FormatDurationItem,
} from "@src/utils/formatDuration";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

/**
 * * Duration 组件
 * * 用于展示持续时间（毫秒），支持多个时间单位的组合展示
 * * 提供标准、缩写和自定义空值展示等功能
 * * 继承自基础的 Units 系列组件
 */
const meta = {
  title: "Core/Duration | 持续时间展示",
  component: Duration,
  parameters: {
    docs: {
      description: {
        component:
          "Duration 组件用于展示持续时间（毫秒），支持多个时间单位的组合展示，如：1小时 30分钟。支持自定义最大展示单位数量、最小单位、缩写形式等。",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Duration>;

export default meta;

type Story = StoryObj<typeof Duration>;

/**
 * 基础持续时间展示
 * 展示最基本的持续时间，默认展示最多 2 个单位
 */
export const Basic: Story = {
  name: "基础持续时间展示",
  args: {
    rawValue: 3661000, // 1小时1分钟1秒
  },
  render: (args) => <Duration {...args} />,
};

/**
 * 多单位展示
 * 展示多个时间单位，如：1天 1小时 1分钟
 */
export const MultipleUnits: Story = {
  name: "多单位展示",
  args: {
    rawValue: 90061000, // 1天1小时1分钟1秒
    maxDisplayUnits: 3,
  },
  render: (args) => <Duration {...args} />,
};

/**
 * 缩写形式展示
 * 当需要节省空间时，可以使用缩写形式展示持续时间
 */
export const Abbreviated: Story = {
  name: "缩写形式展示",
  args: {
    rawValue: 3661000, // 1小时1分钟1秒
    abbreviate: true,
  },
  render: (args) => <Duration {...args} />,
};

/**
 * 指定最小单位
 * 可以指定最小展示单位，小于该单位的时间会被忽略
 */
export const WithMinUnit: Story = {
  name: "指定最小单位",
  args: {
    rawValue: 90000, // 1分30秒
    minUnit: "minute",
  },
  render: (args) => <Duration {...args} />,
};

/**
 * 单单位展示
 * 只展示一个时间单位
 */
export const SingleUnit: Story = {
  name: "单单位展示",
  args: {
    rawValue: 5000, // 5秒
    maxDisplayUnits: 1,
  },
  render: (args) => <Duration {...args} />,
};

/**
 * 大数值展示
 * 展示较大的持续时间，如：1年 1个月
 */
export const LargeValue: Story = {
  name: "大数值展示",
  args: {
    rawValue: 365 * 24 * 60 * 60 * 1000 + 30 * 24 * 60 * 60 * 1000, // 1年1个月
    maxDisplayUnits: 2,
  },
  render: (args) => <Duration {...args} />,
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
  render: (args) => <Duration {...args} />,
};

/**
 * 零值展示
 * 展示零值的情况
 */
export const ZeroValue: Story = {
  name: "零值展示",
  args: {
    rawValue: 0,
  },
  render: (args) => <Duration {...args} />,
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
  render: (args) => <Duration {...args} />,
};

/**
 * 自定义样式
 * 可以通过自定义类名来调整展示样式
 */
export const CustomStyle: Story = {
  name: "自定义样式",
  args: {
    rawValue: 3661000,
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
      <Duration {...args} />
    </div>
  ),
};

/**
 * 自定义渲染
 * 使用 contentRender 自定义渲染方式
 */
export const CustomRender: Story = {
  name: "自定义渲染",
  args: {
    rawValue: 3661000, // 1小时1分钟1秒
    contentRender: (parts: FormatDurationItem[]) => (
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {parts.map((part, index) => (
          <div
            key={`${part.unit}-${index}`}
            style={{
              padding: "4px 8px",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            <strong>{part.value}</strong> {part.unit}
          </div>
        ))}
      </div>
    ),
  },
  render: (args) => <Duration {...args} />,
};

/**
 * 自定义渲染 - 简洁格式
 * 使用自定义渲染函数展示更简洁的格式
 */
export const CustomRenderCompact: Story = {
  name: "自定义渲染 - 简洁格式",
  args: {
    rawValue: 90061000, // 1天1小时1分钟1秒
    maxDisplayUnits: 3,
    contentRender: (parts: FormatDurationItem[]) => {
      const formatUnit = (unit: DurationUnitType) => {
        const unitMap: Record<DurationUnitType, string> = {
          year: "年",
          month: "月",
          week: "周",
          day: "天",
          hour: "时",
          minute: "分",
          second: "秒",
          millisecond: "毫秒",
        };
        return unitMap[unit] || unit;
      };

      return (
        <span style={{ fontFamily: "monospace" }}>
          {parts.map((part, index) => (
            <span key={`${part.unit}-${index}`}>
              {index > 0 && " "}
              {part.value}
              {formatUnit(part.unit)}
            </span>
          ))}
        </span>
      );
    },
  },
  render: (args) => <Duration {...args} />,
};

/**
 * 复杂场景组合
 * 展示多个配置项的组合使用
 */
export const Complex: Story = {
  name: "复杂场景组合",
  args: {
    rawValue: 90061000, // 1天1小时1分钟1秒
    maxDisplayUnits: 3,
    abbreviate: true,
    minUnit: "minute",
  },
  render: (args) => <Duration {...args} />,
};
