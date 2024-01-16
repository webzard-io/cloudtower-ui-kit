import Space from "@src/core/Space";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { Fragment } from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Core/Space",
  component: Space,
} as ComponentMeta<typeof Space>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Space> = (args) => {
  return <Space {...args} />;
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
  children: (
    <Fragment>
      <div style={{ backgroundColor: "black" }}>Space</div>

      <div style={{ backgroundColor: "blue" }}>Space</div>
    </Fragment>
  ),
};
