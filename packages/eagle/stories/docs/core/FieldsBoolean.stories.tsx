import FieldsBoolean from "@src/core/Fields/FieldsBoolean";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Core/FieldsBoolean",
  component: FieldsBoolean,
} as ComponentMeta<typeof FieldsBoolean>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FieldsBoolean> = (args) => (
  <FieldsBoolean {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  input: {
    name: "inputName",
    onBlur: () => {
      console.log("onBlur");
    },
    onChange: () => {
      console.log("onChange");
    },
    onFocus: () => {
      console.log("onFocus");
    },
    value: "test value 1",
  },
  meta: {},
};
