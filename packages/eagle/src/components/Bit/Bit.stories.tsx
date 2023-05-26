import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Bit from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Bit",
  component: Bit,
} as ComponentMeta<typeof Bit>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Bit> = (args) => {
  return <Bit {...args} />;
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
  rawValue: 1000,
};
