import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

import SimplePagination from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "SimplePagination",
  component: SimplePagination,
} as ComponentMeta<typeof SimplePagination>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SimplePagination> = (args) => {
  const [value, setValue] = useState(args.current);

  return (
    <SimplePagination
      {...args}
      current={value}
      onPageChange={(v) => {
        console.log(v);
        setValue(v);
      }}
    />
  );
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
  current: 1,
  count: 3000000,
  size: 50,
};
