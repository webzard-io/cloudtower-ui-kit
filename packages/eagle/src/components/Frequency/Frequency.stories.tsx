import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Frequency from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Frequency",
  component: Frequency,
} as ComponentMeta<typeof Frequency>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Frequency> = (args) => {
  return <Frequency {...args} />;
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
  rawValue: 1000,
  decimals: 1,
};
