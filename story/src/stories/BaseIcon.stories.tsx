import { number1ActiveConnection16GradiendtBlue } from "@cloudtower/eagle/kit/images";
import { BaseIcon } from "@cloudtower/eagle/kit/smartx";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/BaseIcon",
  component: BaseIcon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof BaseIcon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BaseIcon> = (args) => (
  <BaseIcon {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  src: number1ActiveConnection16GradiendtBlue,
};
