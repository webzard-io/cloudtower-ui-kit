import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

import SimplePagination from ".";
import { withDesign } from "storybook-addon-designs";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "SimplePagination",
  decorators: [withDesign],
} as ComponentMeta<typeof SimplePagination>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Simple = (args) => {
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

Simple.story = {
  name: "Basic",
  parameters: {
    design: {
      type: "figspec",
      accessToken: process.env.FIGMA_TOKEN,
      url: "https://www.figma.com/file/OoAcDQd2gX7gB1zel6MFbH/Pagination?type=design&node-id=1950-26203&mode=design&t=X9YgsPcknG7yxFcP-4",
    },
  },
};
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
  current: 1,
  count: 3000000,
  size: 50,
};
