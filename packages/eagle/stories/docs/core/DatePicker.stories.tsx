import DatePicker from "@src/core/DatePicker";
import { CoreMeta } from "@stories/types";
import { StoryObj } from "@storybook/react";
import React from "react";

/**
 * * antd4 组件
 * * 更多 props 请参考：https://4x.ant.design/components/date-picker-cn/#API
 * * 自定义 props 已在表格进行说明
 */
const meta = {
  component: DatePicker,
  title: "Core/DatePicker | 表单日期选择",
  parameters: {
    design: {
      type: "figma",
      url: "",
    },
  },
} satisfies CoreMeta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof DatePicker>;

/**
 * * 基础用法
 */
export const baseFieldsDateTime: Story = {
  name: "基础用法",
  render: () => {
    return <DatePicker />;
  },
};

/**
 * * error 状态
 */
export const errorFieldsDateTime: Story = {
  name: "error 状态",
  render: () => {
    return <DatePicker error={true} />;
  },
};
