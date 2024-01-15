import SimplePagination from "@src/components/SimplePagination";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React, { useState } from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof SimplePagination> = (args) => {
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

const meta: Meta<typeof SimplePagination> = {
  title: "SimplePagination",
  component: Template,
};

export default meta;

type Story = StoryObj<typeof SimplePagination>;

export const Basic: Story = {
  parameters: {
    design: {
      type: "figspec",
      url: "https://www.figma.com/file/OoAcDQd2gX7gB1zel6MFbH/Pagination?type=design&node-id=1950-26203&mode=design&t=X9YgsPcknG7yxFcP-4",
    },
  },
  args: {
    current: 1,
    count: 3000000,
    size: 50,
  },
};

export const ZeroCount: Story = {
  parameters: {
    design: {
      type: "figspec",
      url: "https://www.figma.com/file/OoAcDQd2gX7gB1zel6MFbH/Pagination?type=design&node-id=1950-26203&mode=design&t=X9YgsPcknG7yxFcP-4",
    },
  },
  args: {
    current: 1,
    count: 0,
    size: 50,
  },
};
