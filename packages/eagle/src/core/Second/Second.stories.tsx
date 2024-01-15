import Second from "@src/core/Second";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Second",
  component: Second,
} as ComponentMeta<typeof Second>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Second> = (args) => {
  return <Second {...args} />;
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
  rawValue: 1000,
};

export const Abbreviation = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Abbreviation.args = {
  rawValue: 1000,
  abbreviate: true,
};

export const Empty = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Empty.args = {
  emptyProps: {
    style: {
      color: "red",
    },
  },
};
