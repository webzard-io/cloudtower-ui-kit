import Percent from "@src/core/Percent";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Percent",
  component: Percent,
} as ComponentMeta<typeof Percent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Percent> = (args) => {
  return <Percent {...args} />;
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
  rawValue: 0.1,
  decimals: 2,
};

export const Saturated = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Saturated.args = {
  rawValue: 123.8,
  decimals: 2,
  saturated: false,
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

export const EmptyInfinity = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EmptyInfinity.args = {
  rawValue: Infinity,
};
