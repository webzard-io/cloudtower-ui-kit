import { HoverableIcon } from "@cloudtower/eagle";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/HoverableIcon",
  component: HoverableIcon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof HoverableIcon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HoverableIcon> = (args) => (
  <HoverableIcon {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  icon: "os-logo/os-logo-archlinux",
  hoverIcon: "halo-appliance/1-all-menu-16-gradient-blue",
  hover: false,
};
