import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { Select as AntdSelect } from "antd";
import React from "react";

import Select from ".";

const options = [
  { key: "a11", value: "a11a" },
  { key: "b12", value: "b12b" },
  { key: "c13", value: "c13c" },
];

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Select> = (args) => {
  return (
    <Select {...args}>
      {options.map((option) => {
        return (
          <AntdSelect.Option
            key={option.key}
            value={option.value}
            // for search
            label={option.value}
          >
            {option.value} hello
          </AntdSelect.Option>
        );
      })}
    </Select>
  );
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Select> = {
  title: "Select/Simple",
  component: Template,
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Simple: Story = {
  args: {
    input: {},
    allowClear: true,
  },
};

export const Multiple: Story = {
  args: {
    style: {
      width: "100%",
    },
    input: {},
    allowClear: true,
    mode: "multiple",
  },
};

export const MultipleWithSearch: Story = {
  args: {
    style: {
      width: "100%",
    },
    input: {},
    // @ts-ignore
    defaultValue: ["a11a"],
    allowClear: true,
    mode: "multiple",
    showSearch: true,
  },
};

export const SizeSmall: Story = {
  args: {
    style: {
      width: "100%",
    },
    input: {},
    size: "small",
  },
};

export const SizeLarge: Story = {
  args: {
    style: {
      width: "100%",
    },
    input: {},
    size: "large",
  },
};
