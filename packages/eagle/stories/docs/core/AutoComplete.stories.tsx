import { Typo } from "@src/core";
import { AutoComplete } from "@src/core/AutoComplete";
import { CoreMeta } from "@stories/types";
import type { StoryObj } from "@storybook/react";
import React from "react";

/**
 * AutoComplete 组件是基于 antd AutoComplete 的封装，提供了自动完成输入功能。
 *
 * ### 参数说明
 *
 * | 参数 | 说明 | 类型 | 默认值 |
 * | --- | --- | --- | --- |
 * | value | 指定当前输入的值 | string | - |
 * | defaultValue | 指定默认输入的值 | string | - |
 * | options | 自动完成的数据源 | { value: string; label: string }[] | - |
 * | placeholder | 输入框提示文本 | string | - |
 * | disabled | 是否禁用 | boolean | false |
 * | onChange | 输入值变化时的回调 | function(value) | - |
 * | onSelect | 选中选项时的回调 | function(value, option) | - |
 *
 * 更多属性请参考 antd AutoComplete 组件文档
 */
const meta = {
  component: AutoComplete,
  title: "Core/AutoComplete | 自动完成",
  args: {
    placeholder: "请输入",
    options: [
      { value: "beijing", label: "beijing" },
      { value: "shanghai", label: "shanghai" },
      { value: "guangzhou", label: "guangzhou" },
      { value: "shenzhen", label: "shenzhen" },
    ],
  },
} satisfies CoreMeta<typeof AutoComplete>;

export default meta;

type Story = StoryObj<typeof AutoComplete>;

/**
 * AutoComplete 组件的基础用法，支持输入时自动匹配并显示相关选项。
 */
export const Basic: Story = {
  name: "基础用法",
  render: (args) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <div
            className={Typo.Label.l3_regular}
            style={{ marginBottom: "8px" }}
          >
            基础自动完成
          </div>
          <AutoComplete {...args} style={{ width: 200 }} />
        </div>
      </div>
    );
  },
};

/**
 * 禁用状态下，输入框不可编辑。
 */
export const Disabled: Story = {
  name: "禁用状态",
  render: (args) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className={Typo.Label.l3_regular}>禁用状态示例：</div>
        <AutoComplete {...args} disabled style={{ width: 200 }} />
      </div>
    );
  },
};
