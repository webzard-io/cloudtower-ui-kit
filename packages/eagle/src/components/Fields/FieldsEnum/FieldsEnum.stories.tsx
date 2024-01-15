import { Meta, StoryObj } from "@storybook/react";

import FieldsEnum from ".";

const story: Meta<typeof FieldsEnum> = {
  title: "FieldsEnum",
  component: FieldsEnum,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/ZE1a32eYk89k4cfGEEOph2/Tag-%26-Token-%7C-%E6%A0%87%E7%AD%BE%E5%92%8C%E5%8F%AF%E7%BC%96%E8%BE%91%E6%A0%87%E7%AD%BE?type=design&node-id=1-41&mode=design&t=nnkSC0vipHqxIYf7-0",
    },
  },
};

export default story;

export const NoneEnumValues: StoryObj<typeof FieldsEnum> = {
  render: FieldsEnum,
  args: {
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
  },
};
export const WithEnumValuesString: StoryObj<typeof FieldsEnum> = {
  render: FieldsEnum,
  args: {
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
  },
};

export const WithEnumValuesObject: StoryObj<typeof FieldsEnum> = {
  render: FieldsEnum,
  args: {
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
  },
};
