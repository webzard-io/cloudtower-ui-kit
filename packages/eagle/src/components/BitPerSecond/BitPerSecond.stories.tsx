import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import BitPerSecond from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "BitPerSecond",
  component: BitPerSecond,
} as ComponentMeta<typeof BitPerSecond>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BitPerSecond> = (args) => {
  return <BitPerSecond {...args} />;
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
  rawValue: 1000,
};
