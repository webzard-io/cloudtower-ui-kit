import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

import FieldsInteger from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "FieldsInteger",
  component: FieldsInteger,
} as ComponentMeta<typeof FieldsInteger>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FieldsInteger> = (args) => {
  const [value, setValue] = useState(args.input.value);
  return (
    <FieldsInteger
      {...args}
      input={{
        ...args.input,
        onChange: (v) => {
          args.input.onChange(v);
          setValue(v);
        },
        value,
      }}
    />
  );
};

export const ValidInteger = Template.bind({});
let value = 20;
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ValidInteger.args = {
  onClick: () => {},
  tags: [],
  input: {
    name: "inputName",
    onBlur: () => {
      console.log("onBlur");
    },
    onChange: (v) => {
      console.log("onChange");
    },
    onFocus: () => {
      console.log("onFocus");
    },
    value: value,
  },
  meta: {},
};

export const InvalidInteger = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
InvalidInteger.args = {
  onClick: () => {},
  tags: [],
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
    value: 20.1,
  },
  meta: {},
};
