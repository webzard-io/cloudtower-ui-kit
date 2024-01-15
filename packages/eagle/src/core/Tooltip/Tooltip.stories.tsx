import Tooltip from "@src/core/Tooltip";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tooltip",
  component: Tooltip,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Tooltip>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tooltip> = (
  ...args: Parameters<typeof Tooltip>
) => (
  <Tooltip {...args} title={<div>hello tooltip</div>}>
    <button style={{ margin: "200px" }}>hello</button>
  </Tooltip>
);

export const TopLeft = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TopLeft.args = {
  placement: "topLeft",
};

export const Top = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Top.args = {
  placement: "top",
};
