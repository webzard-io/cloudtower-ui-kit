import Input from "@src/core/Input";
import { CoreMeta } from "@stories/types";
import { StoryObj } from "@storybook/react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Core/InputSimple",
  component: Input,
} as CoreMeta<typeof Input>;

type Story = StoryObj<typeof Input>;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const NumberInput: Story = {
  args: {
    type: "number",
  },
};
