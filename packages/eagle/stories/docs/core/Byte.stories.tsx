import Byte from "@src/core/Byte";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Core/Byte",
  component: Byte,
} as ComponentMeta<typeof Byte>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Byte> = (args) => {
  return <Byte {...args} />;
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
  rawValue: 1000,
};

export const Empty = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Empty.args = {
  emptyProps: {
    style: {
      color: "red",
    },
  },
};
