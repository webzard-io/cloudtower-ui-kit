import {
  DisconnectedCluster16GrayIcon,
  Filter16BlueSolidIcon,
} from "@cloudtower/icons-react";
import { Icon, Tag, Typo } from "@src/core";
import Select from "@src/core/Select";
import { getOptions } from "@src/core/Select/select.widgets";
import { LeftEndSelectStyle, RightEndSelectStyle } from "@src/core/Styled";
import { CoreMeta } from "@stories/types";
import type { StoryObj } from "@storybook/react";
import React from "react";

/**
 * Select 组件是基于 antd Select 的封装，提供了更符合设计规范的样式和交互。
 *
 * ### 参数说明
 *
 * | 参数 | 说明 | 类型 | 默认值 |
 * | --- | --- | --- | --- |
 * | size | 选择器大小，large 用于表单场景，small 用于表格等紧凑场景 | 'large' \| 'middle' \| 'small' | 'middle' |
 * | loading | 加载状态，显示加载中的动画效果 | boolean | false |
 * | isLoadingValue | 是否正在加载选项值，用于异步加载选项时的加载状态 | boolean | false |
 * | disabled | 是否禁用选择器，禁用后不可点击选择 | boolean | false |
 * | mode | 设置选择模式，multiple 为多选，tags 为自由输入多选 | 'multiple' \| 'tags' | - |
 * | showSearch | 是否可搜索，开启后可通过输入关键字过滤选项 | boolean | false |
 * | danger | 错误状态，用于表单校验失败等场景 | boolean | false |
 * | placeholder | 选择框默认文本 | string | - |
 * | value | 指定当前选中的条目 | string \| string[] | - |
 * | defaultValue | 指定默认选中的条目 | string \| string[] | - |
 * | onChange | 选中值发生变化时的回调 | function(value, option) | - |
 *
 * 更多属性请参考 antd Select 组件文档
 */
const meta = {
  component: Select,
  title: "Core/Select | 选择器",
  args: {
    placeholder: "请选择",
    options: [
      { value: "lucy", label: "Lucy" },
      {
        value: "jack",
        label:
          "JackJackJackJackJackJackJackJackJackJackJackJackJackJackJackJackJackJack",
      },
      { value: "tom", label: "Tom", disabled: true },
    ],
    input: {
      value: "",
    },
  },
} satisfies CoreMeta<typeof Select>;

export default meta;

type Story = StoryObj<typeof Select>;

/**
 * Select 组件提供了三种尺寸:
 * - large: 适用于表单中的主要选择器
 * - middle: 默认尺寸，适用于大多数场景
 * - small: 适用于表格等紧凑型界面
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
            大尺寸
          </div>
          <Select {...args} size="large" style={{ width: 200 }} />
        </div>

        <div>
          <div
            className={Typo.Label.l3_regular}
            style={{ marginBottom: "8px" }}
          >
            中尺寸（默认）
          </div>
          <Select {...args} style={{ width: 200 }} />
        </div>

        <div>
          <div
            className={Typo.Label.l3_regular}
            style={{ marginBottom: "8px" }}
          >
            小尺寸
          </div>
          <Select {...args} size="small" style={{ width: 200 }} />
        </div>
      </div>
    );
  },
};

/**
 * Select 组件支持在选项中添加前缀和后缀图标：
 * - prefix: 在选项文本前显示图标，常用于表示状态或类型
 * - suffix: 在选项文本后显示图标，常用于显示额外信息
 */
export const WithIcons: Story = {
  name: "带图标选项",
  render: (args) => {
    const options = getOptions([
      {
        value: "lucy",
        prefix: <DisconnectedCluster16GrayIcon />,
        suffix: <Tag color="blue">在线</Tag>,
        children: "Lucy",
      },
      {
        value: "jack",
        prefix: <DisconnectedCluster16GrayIcon />,
        suffix: <Tag color="red">离线</Tag>,
        children: "Jack",
      },
      {
        value: "tom",
        prefix: <DisconnectedCluster16GrayIcon />,
        suffix: <Tag color="gray">未知</Tag>,
        children: "Tom",
        disabled: true,
      },
    ]);

    const newArgs = { ...args };

    delete newArgs.options;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <div
            className={Typo.Label.l3_regular}
            style={{ marginBottom: "8px" }}
          >
            带有状态图标的选项
          </div>
          <Select {...newArgs} style={{ width: 200 }}>
            {options}
          </Select>
        </div>

        <div>
          <div
            className={Typo.Label.l3_regular}
            style={{ marginBottom: "8px" }}
          >
            多选模式下的图标展示
          </div>
          <Select {...newArgs} mode="multiple" style={{ width: 300 }}>
            {options}
          </Select>
        </div>
      </div>
    );
  },
};

/**
 * 多选模式下可以选择多个选项，选中的选项会以 Tag 的形式展示。
 * 支持以下特性：
 * - 可以通过点击 Tag 的关闭按钮删除已选项
 * - 可以通过键盘删除键（Backspace）删除最后一个已选项
 * - 支持通过搜索快速定位选项
 */
export const Multiple: Story = {
  name: "多选模式",
  render: (args) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className={Typo.Label.l3_regular}>多选示例：</div>
        <Select
          {...args}
          mode="multiple"
          style={{ width: 300 }}
          placeholder="请选择多个选项"
        />
      </div>
    );
  },
};

/**
 * Select 组件提供了两种加载状态：
 * 1. loading: 原生的加载中
 * 2. isLoadingValue: value 在加载，select 不能点击
 */
export const Loading: Story = {
  name: "加载状态",
  render: (args) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <div
            className={Typo.Label.l3_regular}
            style={{ marginBottom: "8px" }}
          >
            原生的加载中
          </div>
          <Select {...args} loading style={{ width: 200 }} />
        </div>

        <div>
          <div
            className={Typo.Label.l3_regular}
            style={{ marginBottom: "8px" }}
          >
            value 在加载，select 不能点击
          </div>
          <Select {...args} isLoadingValue style={{ width: 200 }} />
        </div>
      </div>
    );
  },
};

/**
 * 可搜索模式下，用户可以输入关键字过滤选项。
 * 可以通过 filterOption 属性自定义搜索逻辑。
 */
export const SearchSelect: Story = {
  name: "可搜索",
  render: (args) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className={Typo.Label.l3_regular}>输入关键字搜索：</div>
        <Select
          {...args}
          showSearch
          style={{ width: 200 }}
          placeholder="请输入搜索关键字"
          filterOption={(input, option) =>
            (option?.label?.toString() ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        />
      </div>
    );
  },
};

/**
 * Select 支持自定义触发器，可以替换默认的下拉箭头图标。
 * 常见用法是使用自定义图标来表达特定的筛选含义。
 */
export const CustomTrigger: Story = {
  name: "自定义触发器",
  render: (args) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className={Typo.Label.l3_regular}>使用筛选图标：</div>
        <Select {...args} style={{ width: 200 }}>
          <Icon src={Filter16BlueSolidIcon} />
        </Select>
      </div>
    );
  },
};

/**
 * 错误状态有两种实现方式：
 * 1. 使用 className="select-error" 添加错误样式
 * 2. 使用 danger 属性（推荐）
 */
export const Error: Story = {
  name: "错误状态",
  render: (args) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <div
            className={Typo.Label.l3_regular}
            style={{ marginBottom: "8px" }}
          >
            使用 select-error 类
          </div>
          <Select {...args} className="select-error" style={{ width: 200 }} />
        </div>

        <div>
          <div
            className={Typo.Label.l3_regular}
            style={{ marginBottom: "8px" }}
          >
            使用 danger 属性
          </div>
          <Select {...args} danger style={{ width: 200 }} />
        </div>
      </div>
    );
  },
};

/**
 * 禁用状态下，选择器不可点击，显示为灰色。
 */
export const Disabled: Story = {
  name: "禁用状态",
  render: (args) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className={Typo.Label.l3_regular}>禁用状态示例：</div>
        <Select {...args} disabled style={{ width: 200 }} />
      </div>
    );
  },
};

/**
 * Select 组件可以通过特定的样式类实现组合效果：
 * - LeftEndSelectStyle: 左侧圆角
 * - RightEndSelectStyle: 右侧圆角
 */
export const Combined: Story = {
  name: "组合样式",
  render: (args) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className={Typo.Label.l3_regular}>组合示例：</div>
        <div style={{ display: "flex", gap: "0" }}>
          <Select
            {...args}
            className={LeftEndSelectStyle}
            style={{ width: 200 }}
          />
          <Select
            {...args}
            className={RightEndSelectStyle}
            style={{ width: 200 }}
          />
        </div>
      </div>
    );
  },
};
