import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Architecture } from "../../spec";
import Arch from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Arch",
  component: Arch,
} as ComponentMeta<typeof Arch>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Arch> = (args) => {
  return <Arch {...args} />;
};

export const Aarch64 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Aarch64.args = {
  architecture: Architecture.Aarch64,
};

export const X86_64 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
X86_64.args = {
  architecture: Architecture.X86_64,
};
