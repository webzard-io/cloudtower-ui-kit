import OverflowTooltip from "@src/coreX/OverflowTooltip";
import { OverflowTooltipProps } from "@src/spec";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta<React.FC<OverflowTooltipProps>> = {
  title: "CoreX/OverflowTooltip",
  component: OverflowTooltip,
};
export default meta;

export const Default: StoryObj<{
  width: string;
  multiLines: number;
  content: string;
}> = {
  render: ({ width, content, ...rest }) => {
    return (
      <>
        <div style={{ width }}>
          <OverflowTooltip content={content} {...rest} />
        </div>
      </>
    );
  },
  args: {
    width: "300px",
    multiLines: 0,
    content: "LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabel",
  },
};

export const MultipleLine: StoryObj<{
  width: string;
  multiLines: number;
  content: string;
}> = {
  render: ({ width, content, ...rest }) => {
    return (
      <>
        <p>通过指定 multiLines 大于1，可以实现多行溢出</p>
        <div style={{ width, marginTop: "30px" }}>
          <OverflowTooltip content={content} {...rest} />
        </div>
      </>
    );
  },
  args: {
    width: "200px",
    multiLines: 2,
    content: "LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabel",
  },
};
