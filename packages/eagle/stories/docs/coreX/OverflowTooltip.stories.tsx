import OverflowTooltip from "@src/coreX/OverflowTooltip";
import type { OverflowTooltipProps } from "@src/coreX/OverflowTooltip/overflowTooltip.type";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

/**
 *
 * OverflowTooltip 组件用于处理文本溢出时的省略和提示，支持单行和多行文本溢出并展示 tooltip。
 *
 */
const meta: Meta<React.FC<OverflowTooltipProps>> = {
  title: "CoreX/OverflowTooltip | 文本溢出提示",
  component: OverflowTooltip,
};
export default meta;

/**
 *
 * OverflowTooltip 组件内部会动态判断文本是否已经溢出，如果溢出会展示给定的 tooltip 内容，如果不指定 tooltip，则会展示完整的文本内容。
 *
 */
export const Default: StoryObj<OverflowTooltipProps> = {
  name: "基本用例",
  render: (props) => {
    return (
      <div style={{ width: "200px" }}>
        <OverflowTooltip {...props} />
      </div>
    );
  },
  args: {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto adipisci necessitatibus magnam, natus alias voluptatum officiis at, et dolore quod, esse eveniet? Aperiam saepe sunt, odio dignissimos perspiciatis unde labore!",
    multiLines: 0,
    tooltip: "",
  },
};

/**
 *
 * 通过指定 multiLines 大于 1 可以实现多行省略溢出。
 *
 * 比如在 multiLines 为 2 时，文字部分会在内容超过两行时省略溢出并展示 tooltip 内容。
 *
 */
export const MultipleLine: StoryObj<OverflowTooltipProps> = {
  name: "多行溢出",
  render: (props) => {
    return (
      <div style={{ marginTop: "30px", width: "200px" }}>
        <OverflowTooltip {...props} />
      </div>
    );
  },
  args: {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto adipisci necessitatibus magnam, natus alias voluptatum officiis at, et dolore quod, esse eveniet? Aperiam saepe sunt, odio dignissimos perspiciatis unde labore!",
    multiLines: 2,
    tooltip: "",
  },
};

/**
 *
 * 可以指定文本省略时要展示的 tooltip 内容，如不指定，会默认展示完整的文本内容(content)。
 *
 */
export const Tooltip: StoryObj<OverflowTooltipProps> = {
  name: "自定义 tooltip",
  render: (props) => {
    return (
      <div style={{ width: "200px" }}>
        <OverflowTooltip {...props} />
      </div>
    );
  },
  args: {
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto adipisci necessitatibus magnam, natus alias voluptatum officiis at, et dolore quod, esse eveniet? Aperiam saepe sunt, odio dignissimos perspiciatis unde labore!",
    multiLines: 0,
    tooltip: "tooltip",
  },
};
