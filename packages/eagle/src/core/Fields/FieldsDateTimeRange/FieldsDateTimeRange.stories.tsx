import { Meta, StoryObj } from "@storybook/react";

import FieldsDateTimeRange from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "FieldsDateTimeRange",
  component: FieldsDateTimeRange,
} as Meta;

export const Simple: StoryObj<typeof FieldsDateTimeRange> = {
  // @ts-ignore
  render: FieldsDateTimeRange,
  args: {
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
      value: ["2020-03-13", "2020-03-15"],
    },
    meta: {},
  },
};
