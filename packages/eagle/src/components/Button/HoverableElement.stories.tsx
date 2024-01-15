import {
  ArrowChevronDownSmall16BlueIcon,
  FocusIndicator16BlueIcon,
} from "@cloudtower/icons-react";
import BaseIcon from "@src/components/BaseIcon";
import HoverableElement from "@src/components/Button/HoverableElement";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
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
  icon: <BaseIcon src={ArrowChevronDownSmall16BlueIcon} />,
  hoverEle: <BaseIcon src={FocusIndicator16BlueIcon} />,
  hover: false,
};
