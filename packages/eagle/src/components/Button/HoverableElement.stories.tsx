import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import BaseIcon from "../BaseIcon";
import { arrowChevronDownSmall16Blue, focusIndicator16Blue } from "../images";
import HoverableElement from "./HoverableElement";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "HoverableElement",
  component: HoverableElement,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof HoverableElement>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HoverableElement> = (args) => (
  <HoverableElement {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  icon: <BaseIcon src={arrowChevronDownSmall16Blue} />,
  hoverEle: <BaseIcon src={focusIndicator16Blue} />,
  hover: false,
};
