import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "antd";
import { Calendar } from "antd";
import React from "react";

import UIKitProvider, { IProps } from ".";
import { Select } from "..";

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
    antdProviderConfig: {
      prefixCls: "custom ant",
    },
    children: (
      <div>
        <Pagination defaultCurrent={6} total={500} />
        <Calendar />
        <Select
          input={{}}
          options={[
            { label: "1", value: 1, key: 1 },
            { label: "2", value: 2, key: 2 },
          ]}
        />
      </div>
    ),
  },
};
