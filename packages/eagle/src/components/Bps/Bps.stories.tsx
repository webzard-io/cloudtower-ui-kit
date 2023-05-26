import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Bps from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Bps",
  component: Bps,
} as ComponentMeta<typeof Bps>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Bps> = (args) => {
  return <Bps {...args} />;
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
  rawValue: 1000,
};
