import SearchInput from "@src/core/SearchInput";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "SearchInput",
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchInput> = (args) => {
  const [value, setValue] = useState("");

  return (
    <SearchInput
      {...args}
      value={value}
      onChange={(v) => {
        console.log(v);
        setValue(v);
      }}
    />
  );
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {};
