import { css } from "@linaria/core";
import Tooltip from "@src/core/Tooltip";
import { CoreMeta } from "@stories/types";
import { StoryObj } from "@storybook/react";
import React from "react";

/**
 * * antd4 组件
 * * 更多 props 请参考：https://4x-ant-design.antgroup.com/components/tooltip-cn/#API
 * * 自定义 props 已在表格进行说明
 *
 */
const meta = {
  component: Tooltip,
  title: "Core/Tooltip | 悬浮提示",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/B5fC0NEOB0J6wbFW3FEdZe/Tooltip-%7C-%E6%82%AC%E6%B5%AE%E6%8F%90%E7%A4%BA?type=design&node-id=1311-1132&mode=design&t=b6KXs7SrrLvlSmpw-0",
    },
  },
} satisfies CoreMeta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof Tooltip>;

/**
 * Tooltip 与 按钮组件结合
 */
export const TooltipWithButton: Story = {
  name: "悬浮提示与按钮结合",
  render: (args) => {
    return (
      <Tooltip {...args} title={<div>hello tooltip</div>}>
        <button style={{ margin: "100px" }}>Hover Here</button>
      </Tooltip>
    );
  },
};

/**
 * 自定义 tooltip 放置位置
 */
export const Placement: Story = {
  name: "放置于左上方",
  args: {
    placement: "topLeft",
  },
  render: (args) => {
    return (
      <Tooltip {...args} title={<div>hello tooltip</div>}>
        <button style={{ margin: "100px" }}>Hover Here</button>
      </Tooltip>
    );
  },
};

/**
 * 自定义悬浮提示 overlay 部分样式
 */
export const CustomOverlay: Story = {
  name: "自定义 Overlay 样式",
  args: {
    overlayClassName: css`
      .ant-tooltip-inner {
        background-color: red;
      }
    `,
  },
  render: (args) => {
    return (
      <Tooltip {...args} title={<div>hello tooltip</div>}>
        <button style={{ margin: "100px" }}>Hover Here</button>
      </Tooltip>
    );
  },
};
