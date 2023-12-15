import type { StoryObj, Meta } from "@storybook/react";
import React from "react";
import Cascader from ".";
import UIKitProvider from "../../UIKitProvider";

const meta: Meta<typeof UIKitProvider> = {
  component: UIKitProvider,
  title: "cascader",
};

type Story = StoryObj<typeof UIKitProvider>;
export const Chinese: Story = {
  args: {
    children: (
      <Cascader
        multiple
        prefixCls="antd5"
        options={[
          { value: "1", label: 1, children: [{ value: "2", label: 2 }] },
        ]}
      />
    ),
  },
};

export default meta;
