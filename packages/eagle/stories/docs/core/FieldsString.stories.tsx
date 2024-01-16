import FieldsString from "@src/core/Fields/FieldsString";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Core/FieldsString",
  component: FieldsString,
} as ComponentMeta<typeof FieldsString>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FieldsString> = (args) => (
  <FieldsString {...args} />
);

export const WithoutTags = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithoutTags.args = {
  onClick: () => {},
  focusIndicator: true,
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
    value: "WithoutTags",
  },
  meta: {},
};

export const WithOneTag = Template.bind({});

WithOneTag.args = {
  tags: ["story tag"],
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
    value: "WithOneTag",
  },
  meta: {},
};

export const WithTags = Template.bind({});

WithTags.args = {
  tags: ["story tag", "story tag2"],
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
    value: "WithTags",
  },
  meta: {},
};
