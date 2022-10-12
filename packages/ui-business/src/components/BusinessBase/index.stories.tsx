import { Meta, Story } from "@storybook/react";

import type { IBusinessBaseProps } from ".";
import BusinessBase from ".";

const story: Meta<IBusinessBaseProps> = {
  title: "Example/BusinessBase",
  component: BusinessBase,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template: Story<IBusinessBaseProps> = (args) => (
  <BusinessBase {...args} />
);

export default story;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};
