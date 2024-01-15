import { Tag16GradientBlueIcon } from "@cloudtower/icons-react";
import { Icon } from "@src/core";
import { Meta } from "@storybook/react";
import React from "react";

import SegmentControl from "./";

const meta: Meta<typeof SegmentControl> = {
  title: "Core/SegmentControl | 分段控件",
  component: SegmentControl,
  parameters: {
    docs: {
      description: {
        component: "SegmentControl 与 SelectGroup 不同，注意区分",
      },
    },
  },
  argTypes: {
    size: {
      type: "string",
      options: ["small", "middle"],
      control: { type: "select" },
    },
  },
};

export default meta;

export const Simple = {
  docs: {
    description: {
      story: "简单的 options 选项",
    },
  },
  args: {
    options: ["a", "b", "c", "d"],
  },
};

export const SmallSize = {
  docs: {
    description: {
      story: "小尺寸的 Segment Control",
    },
  },
  args: {
    size: "small",
    options: ["a", "b", "c", "d"],
  },
};

const flexStyle = {
  display: "flex",
  alignItems: "center",
};

const textStyle = {
  marginLeft: "8px",
};

export const CustomRender = {
  docs: {
    description: {
      story: "自定义 item 渲染方式",
    },
  },
  args: {
    options: ["a", "b", "c", "d"].map((item) => {
      return {
        label: (
          <div style={flexStyle}>
            <Icon src={Tag16GradientBlueIcon} />
            <div style={textStyle}>custom render here</div>
          </div>
        ),
        value: item,
      };
    }),
  },
};
