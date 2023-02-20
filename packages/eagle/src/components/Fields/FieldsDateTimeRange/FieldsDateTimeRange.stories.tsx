import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

import FieldsDateTimeRange from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "FieldsDateTimeRange",
  component: FieldsDateTimeRange,
} as ComponentMeta<typeof FieldsDateTimeRange>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FieldsDateTimeRange> = (args) => {
  const [value, setValue] = useState(args.input.value);

  return (
    <FieldsDateTimeRange
      {...args}
      input={{
        ...args.input,
        onChange: (range) => {
          args.input.onChange(range);
          setValue(range);
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
    value: ["2020-03-13", "2020-03-15"],
  },
  meta: {},
};
