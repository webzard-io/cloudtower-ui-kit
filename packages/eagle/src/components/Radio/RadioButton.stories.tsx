import { RadioButton, RadioGroup } from "@src/components/Radio";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React from "react";

const Template: StoryFn<typeof RadioGroup> = (args) => {
  return (
    <RadioGroup defaultValue={1} {...args}>
      <RadioButton value={1}>Label</RadioButton>
      <RadioButton value={2}>Label</RadioButton>
    </RadioGroup>
  );
};

const meta: Meta<typeof RadioGroup> = {
  title: "RadioButton",
  component: Template,
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Basic: Story = {
  args: {},
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};
