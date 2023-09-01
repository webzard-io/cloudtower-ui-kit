import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Card from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Card",
  component: Card,
} as ComponentMeta<typeof Card>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Card> = (args) => {
  return (
    <div style={{ padding: "20px", backgroundColor: "beige" }}>
      <Card {...args}>Hello World</Card>
    </div>
  );
};

export const Shadow = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Shadow.args = {
  title: "hello",
  collapsible: true,
  shadow: true,
};

export const NoShadow = Template.bind({});

NoShadow.args = {
  title: "hello",
  collapsible: true,
  shadow: false,
};
