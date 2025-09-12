import UnderlineTooltip, {
  UnderlineTooltipProps,
} from "@src/coreX/UnderlineTootip";
import { Meta, StoryObj } from "@storybook/react";
import { loremIpsum } from "lorem-ipsum";
import React from "react";

const exampleContent = loremIpsum({
  count: 2,
  units: "paragraphs",
});

/**
 *
 * UnderlineTooltip 带可配置下划线的文字，悬停显示 tooltip 提示。
 *
 */
const meta: Meta<React.FC<UnderlineTooltipProps>> = {
  title: "CoreX/UnderlineTooltip | 带可配置下划线的文字提示",
  component: UnderlineTooltip,
};
export default meta;

export const Default: StoryObj<UnderlineTooltipProps> = {
  name: "基本用例",
  render: (props: UnderlineTooltipProps) => {
    return <UnderlineTooltip {...props} />;
  },
  args: {
    title: exampleContent,
    children: <span>文本</span>,
  },
  argTypes: {
    style: {
      control: {
        type: "select",
      },
      options: ["solid", "dashed", "dotted", "double", "none"],
      defaultValue: "dashed",
    },
    width: {
      defaultValue: "1px",
    },
    color: {
      defaultValue: "rgba(107, 128, 167, 0.6)",
    },
    contentColor: {
      control: {
        type: "select",
      },
      options: ["black", "gray"],
      description:
        "与 customContentColor 互斥，同时设置时只有 customContentColor 生效",
    },
    customContentColor: {
      control: {
        type: "color",
      },
      description:
        "与 contentColor 互斥，同时设置时只有 customContentColor 生效",
    },
    link: {
      control: {
        type: "boolean",
      },
    },
  },
};
