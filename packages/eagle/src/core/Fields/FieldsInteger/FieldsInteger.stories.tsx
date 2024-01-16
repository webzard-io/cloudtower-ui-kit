import {
  ComponentMeta,
  ComponentStory,
  Meta,
  StoryObj,
} from "@storybook/react";
import React, { useState } from "react";

import FieldsInteger from ".";

const meta: Meta = {
  title: "Core/FieldsInteger",
  component: FieldsInteger,
};
export default meta;

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

type Story = StoryObj<typeof FieldsInteger>;
export const ValidInteger: Story = {
  render: Template,
  args: {
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
      value: 20,
    },
    meta: {},
  },
};

export const InvalidInteger: Story = {
  render: Template,
  args: {
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
  },
};
