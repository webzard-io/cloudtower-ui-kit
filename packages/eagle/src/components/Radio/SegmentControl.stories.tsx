import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { RadioButton, RadioGroup } from "./";
import { SegmentControl } from "./styles";

const Template = () => {
  return (
    <RadioGroup defaultValue={1} className={SegmentControl}>
      <RadioButton className={"segment-control-button"} value={1}>
        Label
      </RadioButton>
      <RadioButton className={"segment-control-button"} value={2}>
        Label
      </RadioButton>
      <RadioButton className={"segment-control-button"} value={3}>
        Label
      </RadioButton>
      <RadioButton className={"segment-control-button"} value={4}>
        Label
      </RadioButton>
    </RadioGroup>
  );
};

const meta: Meta<typeof Template> = {
  title: "SegmentControl",
  component: Template,

  parameters: {
    docs: {
      description: {
        component:
          "SegmentControl 在 UI-Kit 中基于 RadioGroup 实现。在设计的组件定义中，与 SelectGroup 不同，需要注意区分",
      },
    },
  },
};

export default meta;

export const Simple = {
  docs: {
    description: {
      story:
        "注意要添加两个 className，RadioGroup 补充 SegmentControl ，RadioButton 补充 segment-control-button",
    },
  },
};
