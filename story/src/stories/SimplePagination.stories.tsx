import { getAntdKit } from "@cloudtower/eagle";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

const kit = getAntdKit();

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "SimplePagination",
  component: kit.simplePagination,
} as ComponentMeta<typeof kit.simplePagination>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof kit.simplePagination> = (args) => {
  const [value, setValue] = useState(args.current);

  return (
    <kit.simplePagination
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
