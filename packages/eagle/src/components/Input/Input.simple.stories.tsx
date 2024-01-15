import Input from "@src/components/Input";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "InputSimple",
  component: Input,
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = (args) => {
  return (
    <div style={{ width: "300px" }}>
      <Input {...args} />
    </div>
  );
};

export const NumberInput = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NumberInput.args = {
  type: "number",
};
