import { css } from "@linaria/core";
import Tooltip from "@src/core/Tooltip";
import EllipsisTooltipContent from "@src/core/Tooltip/EllipsisTooltipContent";
import { OverflowTooltip } from "@src/coreX";
import { CoreMeta } from "@stories/types";
import { StoryObj } from "@storybook/react";
import React from "react";

const DefaultFontSize = css`
  font-size: 12px;
  line-height: 18px;
`;

/**
 * * Tooltip content 组件
 * * 搭配 Tooltip 与 OverflowTooltip 使用
 * * 使用时，Tooltip 与 OverflowTooltip 需要配合 destroyTooltipOnHide 为 true 使用
 * * 自定义 props 已在表格进行说明
 */
const meta = {
  component: EllipsisTooltipContent,
  title: "Core/EllipsisTooltipContent | Tooltip content 过长省略",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/B5fC0NEOB0J6wbFW3FEdZe/Tooltip-%7C-%E6%82%AC%E6%B5%AE%E6%8F%90%E7%A4%BA?node-id=1571-12807&node-type=FRAME&t=FhxTWglmH56ZODVz-0",
    },
  },
} satisfies CoreMeta<typeof EllipsisTooltipContent>;

export default meta;

type Story = StoryObj<typeof EllipsisTooltipContent>;

/*
 * 超长 Tooltips Content 省略
 */
export const ellipsisTooltipsContentInTooltip: Story = {
  name: "Tooltip Content 过长省略 in Tooltip",
  args: {
    tooltip: String().padStart(999, "空白"),
    contentWrapperClassName: DefaultFontSize,
    maxHeight: 360,
    ellipsisTips: "超过 20 行，后续省略……",
  },
  render: (args) => {
    return (
      <Tooltip
        destroyTooltipOnHide={true}
        title={<Tooltip.EllipsisContent {...args} />}
      >
        <button style={{ margin: "100px" }}>Hover Here</button>
      </Tooltip>
    );
  },
};

/*
 * 超长 Tooltips Content 省略
 */
export const ellipsisTooltipsContentInOverflowTooltip: Story = {
  name: "Tooltip Content 过长省略 in OverflowTooltip",
  args: {
    tooltip: String().padStart(999, "空白"),
    contentWrapperClassName: DefaultFontSize,
    maxHeight: 360,
    ellipsisTips: "超过 20 行，后续省略……",
  },
  render: (args) => {
    return (
      <OverflowTooltip
        destroyTooltipOnHide={true}
        content={args.tooltip}
        tooltip={<Tooltip.EllipsisContent {...args} />}
      >
        <button style={{ margin: "100px" }}>Hover Here</button>
      </OverflowTooltip>
    );
  },
};

/*
 * 超长 Tooltips Content 省略
 */
export const ellipsisTooltipsReactNodeContentInTooltip: Story = {
  name: "Tooltip Content 过长省略 with React Node",
  args: {
    tooltip: (
      <span style={{ lineHeight: "36px" }}>
        {String().padStart(999, "空白")}
      </span>
    ),
    contentWrapperClassName: DefaultFontSize,
    maxHeight: 360,
    ellipsisTips: "超过 10 行，后续省略……",
  },
  render: (args) => {
    return (
      <Tooltip
        destroyTooltipOnHide={true}
        title={<Tooltip.EllipsisContent {...args} />}
      >
        <button style={{ margin: "100px" }}>Hover Here</button>
      </Tooltip>
    );
  },
};
