import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

import FieldsEnum from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "FieldsEnum",
  component: FieldsEnum,
} as ComponentMeta<typeof FieldsEnum>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FieldsEnum> = (args) => {
  const [value, setValue] = useState(args.input.value);

  return (
    <FieldsEnum
      {...args}
      input={{
        ...args.input,
        onChange: (v) => {
          args.input?.onChange?.(v);
          setValue(v);
        },
        value,
      }}
    />
  );
};

export const NoneEnumValues = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoneEnumValues.args = {
  input: {
    name: "inputName1",
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
  enumValues: [],
};

export const WithEnumValuesString = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithEnumValuesString.args = {
  input: {
    name: "inputName1",
    onBlur: () => {
      console.log("onBlur");
    },
    onChange: () => {
      console.log("onChange");
    },
    onFocus: () => {
      console.log("onFocus");
    },
    value: "test value 2",
  },
  meta: {},
  enumValues: ["test enum string"],
};

export const WithEnumValuesObject = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithEnumValuesObject.args = {
  input: {
    name: "inputName1",
    onBlur: () => {
      console.log("onBlur");
    },
    onChange: () => {
      console.log("onChange");
    },
    onFocus: () => {
      console.log("onFocus");
    },
    value: "test value 3",
  },
  meta: {},
  enumValues: [{ value: "test_enum", text: "test enum object" }],
};
