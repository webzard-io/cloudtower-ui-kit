import type { StoryObj, Meta } from "@storybook/react";
import { Pagination } from "antd";
import { Calendar } from "antd";
import React from "react";

import UIKitProvider, { IProps } from ".";

const meta: Meta<typeof UIKitProvider> = {
  component: UIKitProvider,
};

export default meta;

type Story = StoryObj<typeof UIKitProvider>;
export const Chinese: Story = {
  args: {
    children: (
      <div>
        <Pagination defaultCurrent={6} total={500} />
        <Calendar />
      </div>
    ),
    lng: "zh-CN",
  },
};

export const English: Story = {
  args: {
    children: (
      <div>
        <Pagination defaultCurrent={6} total={500} />
        <Calendar />
      </div>
    ),
  },
};
