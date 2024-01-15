import { ComponentMeta, ComponentStory } from "@storybook/react";
import dayjs from "dayjs";
import React, { useState } from "react";

import FieldsTimePicker from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "FieldsTimePicker",
  component: FieldsTimePicker,
} as ComponentMeta<typeof FieldsTimePicker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FieldsTimePicker> = (args) => {
  const [value, setValue] = useState(args.input.value);
  return (
    <FieldsTimePicker
      {...args}
      input={{
        ...args.input,
        onChange: (time) => {
          args.input.onChange(time);
          setValue(time);
        },
        value,
      }}
    />
  );
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
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
    value: dayjs("2023 01 01 12:08:23", "YYYY MM DD HH:mm:ss"),
  },
  meta: {},
};
