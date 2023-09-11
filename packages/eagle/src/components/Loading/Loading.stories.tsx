import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Loading from ".";

export default {
  title: "Loading",
  component: Loading,
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => {
  return <Loading {...args} />;
};

export const Basic = Template.bind({});

Basic.args = {
  fullView: false,
};
